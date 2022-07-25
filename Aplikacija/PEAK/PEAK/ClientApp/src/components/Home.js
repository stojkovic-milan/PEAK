import React, { Component } from "react";
import SearchHome from "./NaseKomponente/SearchHome";
import ImageSlider from "./NaseKomponente/ImageSlider";
import GridLokacijeHome from "./NaseKomponente/GridLokacijeHome";
import HomeGridDogadjaji from "./NaseKomponente/HomeGridDogadjaji";
import HomeMotivation from "./NaseKomponente/HomeMotivation";
import Footer from "./NaseKomponente/Footer";
import Slider from "./NaseKomponente/Slider";
import AdministratorPocetnaStranica from "./NaseKomponente/AdministratorPocetnaStranica";
import authService from "./api-authorization/AuthorizeService";
import LoaderAnim from "./NaseKomponente/LoaderAnim"

// export class Home extends Component {
//   static displayName = Home.name;

//   render() {
//     return (
//       <div className="prosiriNaCeoEkran">
//         {/* <ImageSlider slides={SliderData} /> */}
//         <Slider />
//         <GridLokacijeHome />
//         <HomeGridDogadjaji />
//         <HomeMotivation />
//         <Footer />
//       </div>
//     );
//   }
// }

export default function Home(){

  const [role,setRole] = React.useState(["Korisnik"]);
  const [loading, setLoading] = React.useState();

  React.useEffect(() => {
    setLoading(true);
    const getRole = async () => {
        const token = await authService.getAccessToken();
        const res = await fetch("https://localhost:5001/ApplicationUser/PreuzmiRoleKorisnika", {
            headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
        });
        setRole(await res.json());
    }
    getRole();
    console.log(role);
  },[]);

  function loaderAnim()
  {
    setLoading(false);
  }

  if(role!="Admin"){
    return(
      <div className="prosiriNaCeoEkran">
        {loading?<LoaderAnim/>:<div>
        {/* <ImageSlider slides={SliderData} /> */}
        <Slider />
        <GridLokacijeHome loaded={loaderAnim}/>
        <HomeGridDogadjaji />
        <HomeMotivation />
        <Footer />
        </div>}
      </div>
    )
  }
  else if(role=="Admin"){
    return (
      <div>
        <AdministratorPocetnaStranica />
      </div>
    )
    
  }

}
