import React,{ Component } from "react";
import DogadjajStranicaCard from "./NaseKomponente/DogadjajStranicaCard";
import Footer from "./NaseKomponente/Footer";
import StranicaDogadjajGrid from "./NaseKomponente/StranicaDogadjajGrid";
import AdministratorStranicaDogadjaji from "./NaseKomponente/AdministratorStranicaDogadjaja";
import authService from "./api-authorization/AuthorizeService";



export default function StranicaDog() {

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
                <StranicaDogadjajGrid />
                <Footer />
            </div>
        )
        
    }
    else if(role=="Admin"){
        return(
            <div>
                <AdministratorStranicaDogadjaji />
                <Footer />
            </div>
        )
        
    }
}