import { Home } from "./Home";
import React from "react";
import authService from "./api-authorization/AuthorizeService";
import Slider from "./NaseKomponente/Slider";
import GridLokacijeHome from "./NaseKomponente/GridLokacijeHome";
import HomeGridDogadjaji from "./NaseKomponente/HomeGridDogadjaji";
import HomeMotivation from "./NaseKomponente/HomeMotivation";
import Footer from "./NaseKomponente/Footer";
import AdministratorStranicaDogadjaji from "./NaseKomponente/AdministratorStranicaDogadjaja";
import AdministratorPocetnaStranica from "./NaseKomponente/AdministratorPocetnaStranica";

export default function HomeF(){
    const [role, setRole] = React.useState("Korisnik");

    React.useEffect(() => {
        const getRole=async () => {
            const token = await authService.getAccessToken();
            const res = await fetch("https://localhost:5001/ApplicationUser/PreuzmiRoleKorisnika", {
                    headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
            });
            const getdata = await res.json();
            console.log(getdata);
            setRole(getdata);
        }
        getRole();
    },[]);

    // return(
    //     <div>
    //         {
    //             role==="Korisnik" &&
    //             <div>
    //             <Slider /> 
    //             <GridLokacijeHome />
    //             <HomeGridDogadjaji />
    //             <HomeMotivation />
    //             <Footer />
    //             </div>
    //         }
    //         {
    //             role==="Admin" &&
    //             <div>
    //                 <AdministratorStranicaDogadjaji />
    //             </div>
    //         }
    //     </div>
        
    // )
    console.log("this is:" + role);
    if(role=="Korisnik"){
        return(
            <div>
                <Slider />
                <GridLokacijeHome />
                <HomeGridDogadjaji />
                <HomeMotivation />
            </div>
        )
    }
    else if(role=="Admin"){
        return(
            <div>
                <AdministratorPocetnaStranica />
            </div>
        )
    }
    // else{
    //     return (
    //         <div>
    //             <Slider />
    //             <GridLokacijeHome />
    //             <HomeGridDogadjaji />
    //             <HomeMotivation />
    //         </div>
    //     )
    // }
}