import React from 'react'
import StranicaPlaninarskaDrustva from './NaseKomponente/StranicaPlanianrskaDrustva';
import Footer from './NaseKomponente/Footer';
import authService from './api-authorization/AuthorizeService'


export default function StranicaPlaninarskihDrustava() {
  //   console.log("OVa stranbica radi");
  // return (
  //   <div>
  //     <StranicaPlaninarskaDrustva />
  //     <Footer />
  //   </div>
  // )
  const [role,setRole] = React.useState(["Korisnik"]);

    React.useEffect(() => {
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
    if(role!="Admin"){
        return (
            <div>
                <StranicaPlaninarskaDrustva />
                <Footer />
            </div>
        )
        
    }
    else if(role=="Admin"){
        return(
            <div>
                <StranicaPlaninarskaDrustva />
                <Footer />
            </div>
        )
        
    }
}
