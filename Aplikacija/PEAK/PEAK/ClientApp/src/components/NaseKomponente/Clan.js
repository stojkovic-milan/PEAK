import React from "react";
import { SliderData } from "./SliderData";
import slika from './images/g1.jpg'

export default function Clan(props){
    console.log("OVO JE CLAN"+props);
    return (
        <div className="SrediDog">
            <div className="row">

        <div className="col-lg-3 col-6 mt-lg-5 mt-4 neSmanjuj">
        <div className="box16  neSmanjuj">
            <a href="#url"><img src={props.clan.profilnaSlika} alt="" className="korisnik"/></a>
            <div className="box-content">
                <h3 className="title"><a href="#url">{props.clan.ime}</a></h3>
                <ul className="social faceInsta">
                    <li>
                        <a href="#" className="facebook">
                            <span className="fa fa-facebook-f"></span>
                        </a>
                    </li>
                    <li>
                        <a href="#" className="twitter">
                            <span className="fa fa-twitter"></span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    </div>
    </div>
    );
}