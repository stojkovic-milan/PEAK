import React from "react";
import img from './images/g1.jpg';

export default function DrustvoStranicaCard(props){

    //ovde mora da se prosledi da li je slikadrustva ili slika drustva
    console.log("slika dogadjaja " + props.slikaDogadjaja);
    const link="http://www.google.com"
    const linkDrustva="http://www.facebook.com"
    return(
        <div className="srediDrus odvoji">
        <figure className="effect-lilyy border-radius">
          <img className="" src={props.dog.slikaDrustva} alt="" width="290px" height="280px"/>
          <figcaption>
            <div className="manjaSlova">
              <h4>{props.dog.naziv}</h4>
              <p>{props.dog.clanarina}</p>
              <p>{props.dog.adresa}</p>
            </div>
          </figcaption>
        </figure>
      </div>
    );
}