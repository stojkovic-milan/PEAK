import React from 'react';
import Footer from './NaseKomponente/Footer';
import PlaninarskoDrustvoProfil from './NaseKomponente/PlaninarskoDrustvoProfil';

const StranicaPlaninarskoDrustvoProfil = (props) => {
    return (
        <div>
            <PlaninarskoDrustvoProfil id={props.match.params.drustvoId}/>
            <Footer />
        </div>
    );
}

export default StranicaPlaninarskoDrustvoProfil;
