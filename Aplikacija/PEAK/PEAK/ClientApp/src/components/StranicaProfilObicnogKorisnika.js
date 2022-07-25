import React from 'react'
import ProfilKorisnika from './NaseKomponente/ProfilKorisnika'
import Footer from './NaseKomponente/Footer'
import authService from './api-authorization/AuthorizeService'
import ProfilNekogDrugogKorisnika from './NaseKomponente/ProfilNekogDrugogKorisnika'
import ProfilObicnogKorisnika from './NaseKomponente/ProfilObicnogKorisnika'

export default function StranicaProfilObicnogKorisnika(props) {
    const [idKorisnika, setIdKorisnika] = React.useState("");
    React.useEffect(() => {
        const getDg = async () => {
            const token = await authService.getAccessToken();
            const res = await fetch("https://localhost:5001/ApplicationUser/PreuzmiPrijavljenogKorisnika/", {
                headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
            });
            //idKorisnika = await res.json();
            setIdKorisnika(await res.text());
        }
        getDg();
    }, []);

    console.log("logujem id korisnika" + props.match.params.korisnikId);
    return (
        <div>
            { 
            props.match.params.korisnikId===undefined ? <ProfilObicnogKorisnika id={idKorisnika} /> 
            : <ProfilNekogDrugogKorisnika id={props.match.params.korisnikId} />
            }
        <Footer />
      </div>
  )
}
