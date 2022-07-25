import React from "react";
import img from './images/g1.jpg';

export default function AdminCardDrustvo(props){


    // async function prihvati(drustvoId){
    //     console.log(drustvoId);
    //     const res = await fetch("https://localhost:5001/PlaninarskoDrustvo/PromeniStanjeDrustva/" + drustvoId,{
    //         method:"PUT"
    //     });
    //     alert("Uspesno je kreirano novo drustvo");
    //     location.reload();
    // }

    // async function odbaci(drustvoId){
    //     console.log("Nije proihvaceno");
    //     const res = await fetch("https://localhost:5001/PlaninarskoDrustvo/ObrisiDrustvo/" + drustvoId,{
    //         method:"DELETE"
    //     });
    //     alert("Drustvo je odbaceno!!");
    //     location.reload();
        
    // }
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
              <p>Clanarina: {props.dog.clanarina}</p>
              <p>Adresa: {props.dog.adresa}</p>
            </div>
          </figcaption>
        </figure>
        
      </div>
    );
}