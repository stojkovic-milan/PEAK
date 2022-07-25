import React from "react";
import '../../custom.css';
import slikatrem from './images/zimskiusponanatrem.jpg'
import moment from "moment";

function HomeCardDogadjaji(props) {
  return (
    <div>
      <figure className="effect-lilyy border-radius">
        <img className="img-fluid velicina--slike--home" src={props.slika} alt="" />
        <figcaption>
          <div className="manjaSlova">
            <h4 className="manjaSlova">{props.dogadjaj.naziv}</h4>
            <p className="manjaSlova">{moment(props.dogadjaj.datum).utc().format('YYYY-MM-DD')}</p>
          </div>
        </figcaption>
      </figure>
    </div>
  );
}

export default HomeCardDogadjaji;
