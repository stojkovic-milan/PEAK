import React from 'react';
import PlaninaStrana from './NaseKomponente/PlaninaStrana';
import Footer from './NaseKomponente/Footer';

export default function StranicaPlanine(props) {
    console.log("ULAZI OVDE");
    console.log(props.match.params.planinaId);
  return (
    <div>
        <PlaninaStrana id={props.match.params.planinaId} />
        <Footer />
    </div>
  )
}
