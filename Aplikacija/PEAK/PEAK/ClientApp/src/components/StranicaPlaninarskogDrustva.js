import React from 'react'
import PlaninarskoDrustvo from './NaseKomponente/PlaninarskoDrustvo'
import Footer from './NaseKomponente/Footer';
import StranicaDrustvaObicanKorisnik from './StranicaDrustvaObicanKorisnik';
import PlaninarskoDrustvoSaNoviDogadjaj from './NaseKomponente/PlaninarskoDrustvoSaNoviDogadjaj';
import authService from './api-authorization/AuthorizeService';
import PlaninarskoDrustvoBezNoviDogadjaj from './NaseKomponente/PlaninarskoDrustvoBezNoviDogadjaj';

export default function StranicaPlaninarskogDrustva(props) {
  //   console.log("logovanje uspesno")
  // return (
  //   <div>
  //     <PlaninarskoDrustvo id={props.match.params.drustvoId}/>
  //   </div>
  // )
  const [role,setRole] = React.useState();
  const [drusto, setDrustvo] = React.useState();

  React.useEffect(() => {
    const getRole = async () => {
        const token = await authService.getAccessToken();
        const res = await fetch("https://localhost:5001/ApplicationUser/PreuzmiDrustvoUVlasnistvu", {
            headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
        });
        const getdata = await res.json();
        if(getdata==props.match.params.drustvoId){
            setDrustvo(true);
        }
        else{
            setDrustvo(false);
        }
    }
    getRole();
    console.log(role);
    },[]);

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
    console.log("USAO SAM OVDE");
    if(role=="Admin"){
        return (
            <div>
                <PlaninarskoDrustvo id={props.match.params.drustvoId} />
                <Footer />
            </div>
        )
        
    }
    else if(role=="Drustvo"){
        return(
            <div>
                {drusto ? <PlaninarskoDrustvoSaNoviDogadjaj id={props.match.params.drustvoId} /> : <PlaninarskoDrustvoBezNoviDogadjaj id={props.match.params.drustvoId} />}
                <Footer />
            </div>
        )
    }
    else if(role=="Korisnik")
    {
        return(
            <div>
                <PlaninarskoDrustvoBezNoviDogadjaj id={props.match.params.drustvoId} />
                <Footer />
            </div>
        )
    }
    else{
        return(
            <div>
                <StranicaDrustvaObicanKorisnik id={props.match.params.drustvoId} />
            </div>
        )
    }
}
