import React from 'react'

export default function AdministratorCardDogadjaj(props) {

  // const prihvati = () => {
  //   const idDogadjaja = "1b19a562-06de-4676-8aaa-0317051244de";
  //     const res = fetch("https://localhost:5001/Dogadjaj/PromeniStanjeDogadjaja/" + props.podatak.id,
  //     {
  //       method: 'PUT'
  //     });
  //     alert("Dogadjaj je potvrdjen od strane administratora");
  // }
  
  // const odbaci = () => {
  //   const idDogadjaja = "1b19a562-06de-4676-8aaa-0317051244de";
  //     const res = fetch("https://localhost:5001/Dogadjaj/OtkaziDogadjaj/" + props.podatak.id,
  //     {
  //       method: 'DELETE'
  //     });
  //     alert("Dogadjaj nije bio lepo ogranizovan pa ga je administrator uklonio");
  // }
  return (
    <div>
        <div className="col-lg-4 col-md-4 col-6 mt-lg-5 mt-4">
                <div className="column">
                    <a href="blog-single.html"><img src={props.podatak.slikaDogadjaja} alt="" className="img-fluid"></img></a>
                    <div className='podeli'>
                      <div className="info">
                          <h4><a href="blog-single.html">{props.podatak.naziv}</a></h4>
                          <p>{props.podatak.datum}</p>
                          <div className="dst-btm">
                          <h6 className=""> {props.podatak.tip} </h6>
                        </div>
                      </div>
                      
                    </div>
                </div>
            </div>
    </div>
  )
}
