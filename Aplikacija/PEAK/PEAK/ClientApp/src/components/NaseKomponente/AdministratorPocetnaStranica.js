import React from 'react';
import Slider from './Slider';
import GridLokacijeHome from './GridLokacijeHome';
import HomeGridDogadjaji from './HomeGridDogadjaji';
import HomeMotivation from './HomeMotivation';
import Footer from './Footer';
import AdministratorGridLokacijeHome from './AdministratorGridLokacijeHome';

const AdministratorPocetnaStranica = () => {
    return (
        <div>
            <Slider />
            <AdministratorGridLokacijeHome />
            <HomeGridDogadjaji />
            <HomeMotivation />
            <Footer />
        </div>
    );
}

export default AdministratorPocetnaStranica;
