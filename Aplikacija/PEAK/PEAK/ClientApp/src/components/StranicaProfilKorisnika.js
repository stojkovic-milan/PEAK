import React from 'react'
import ProfilKorisnika from './NaseKomponente/ProfilKorisnika'
import Footer from './NaseKomponente/Footer'
import authService from './api-authorization/AuthorizeService'
import ProfilNekogDrugogKorisnika from './NaseKomponente/ProfilNekogDrugogKorisnika'
import ProfilObicnogKorisnika from './NaseKomponente/ProfilObicnogKorisnika'
import StranicaPlaninarskoDrustvoProfil from './StranicaPlaninarskoDrustvoProfil'

export default function StranicaProfilKorisnika(props) {
    console.log("JEDAN RENDER STRANICA PROFIL KORISNIK");
    const [idKorisnika, setIdKorisnika] = React.useState("");
    const [korisnikIsti, setKorisnikIsti] = React.useState();
    const [nacrtan,setNacrtan]= React.useState(false)
    React.useEffect(() => {
        const getDg = async () => {
            const token = await authService.getAccessToken();
            const res = await fetch("https://localhost:5001/ApplicationUser/PreuzmiPrijavljenogKorisnika/", {
                headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
            });
            //idKorisnika = await res.json();
            setIdKorisnika(await res.text());
            const getdata = await res.text();
            if(getdata==props.match.params.korisnikId){
                setKorisnikIsti(true);
            }
            else{
                setKorisnikIsti(false);
            }
            console.log()
        }
        getDg();
    }, []);

    console.log("logujem id korisnika" + props.match.params.korisnikId);
//     return (
//         <div>
//             { 
//             props.match.params.korisnikId===undefined ? <ProfilKorisnika id={idKorisnika} /> 
//             : <ProfilNekogDrugogKorisnika id={props.match.params.korisnikId} />
//             }
//         <Footer />
//       </div>
//   )

  const [role,setRole] = React.useState();

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
    if (role == "Admin") {
        console.log("PROP "+props.match.params.korisnikId)
        return (
            <div>  
               { korisnikIsti ? <ProfilObicnogKorisnika id={props.match.params.korisnikId} /> : <ProfilNekogDrugogKorisnika id={props.match.params.korisnikId} />}
         <Footer />
       </div>
        )
        
    }
    else if (role != "Admin") {
        console.log("PROP " + props.match.params.korisnikId)
        return(
            <div>
                {
                    <ProfilNekogDrugogKorisnika id={props.match.params.korisnikId} />
             }
         <Footer />
       </div>
        )
        
    }
}
