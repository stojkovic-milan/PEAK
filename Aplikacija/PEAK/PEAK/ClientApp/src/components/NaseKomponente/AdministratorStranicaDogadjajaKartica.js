import React from "react";
import img from './images/g1.jpg';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function AdministratorStranicaDogadjajaKartica(props){


    console.log("slika dogadjaja " + props.slikaDogadjaja);
    const link="http://www.google.com"
    const linkDrustva="http://www.facebook.com"
    return(
        
            <div>
                <a href={link}><img src={props.dog.slikaDogadjaja} width="100%"/></a>
                <div className="info">
                    <h4>
                        <a href={link}>{props.dog.naziv}</a>
                    </h4>
                    <p>{props.dog.datum}</p>
                    <div className="dst-btm">
                        <a href={linkDrustva}><h6>{props.dog.tip}</h6></a>
                    </div>
                </div>
            </div>
    );
}