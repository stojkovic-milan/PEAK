
import React from 'react';
import Footer from './NaseKomponente/Footer';
import ObicanKorisnikDrustvo from './NaseKomponente/ObicanKorisnikDrustvo';

const StranicaDrustvaObicanKorisnik = (props) => {
    return (
        <div>
            <ObicanKorisnikDrustvo id={props.id}/>
            <Footer />
        </div>
    );
}

export default StranicaDrustvaObicanKorisnik;
