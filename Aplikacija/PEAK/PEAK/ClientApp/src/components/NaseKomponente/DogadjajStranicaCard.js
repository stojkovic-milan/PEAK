import React from "react";
import img from './images/g1.jpg';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {FaFlag} from 'react-icons/fa'
import moment from "moment"

export default function DogadjajStranicaCard(props){


    console.log("slika dogadjaja " + props.slikaDogadjaja);
    const link="http://www.google.com"
    const linkDrustva="http://www.facebook.com"
    return(
        <div className="SrediDog">
        <div className="row">
        <div className="col-lg-4 col-md-4 col-6 SrediDog">
            <div className="column">
            <div className="dogadjaj--card odvoji">
                <a href={link}><img src={props.dog.slikaDogadjaja} width="100%" height="60%"/></a>
                <div className="info">
                    <h5>
                        <a href={link}>{props.dog.naziv}</a>
                    </h5>
                    <p>{moment(props.dog.datum).utc().format('YYYY-MM-DD')}</p>
                    <div className="dst-btm">
                        <a href={linkDrustva}><h6>{props.dog.tip}</h6></a>
                    </div>
                </div>
            </div>
            </div>
            </div>
        </div>
        </div>
    );
}