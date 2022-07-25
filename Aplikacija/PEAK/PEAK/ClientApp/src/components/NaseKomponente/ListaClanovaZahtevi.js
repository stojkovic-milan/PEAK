import React from "react";
import Clan from "./Clan";
import { SliderData } from "./SliderData";
import { Link } from "react-router-dom";
import {
    Collapse,
    Container,
    Navbar,
    NavbarBrand,
    NavbarToggler,
    NavItem,
    NavLink
} from "reactstrap";
import slika from './images/g3.jpg'

export default function ListaClanovaZahtevi(props){
    const [clanovi, setClanovi] = React.useState([]);
    // const [brojPlanina, setBrojPlanina] = React.useState(planine.length);
    React.useEffect(() => {
        const getClanovi = async() => {
            const res = await fetch("https://localhost:5001/PlaninarskoDrustvo/PreuzmiZahteveZaUclanjivanje/"+props.id,
            {
                method: 'GET'
            });
            const getdata = await res.json();
            setClanovi(getdata);
            console.log(getdata);
        }
        getClanovi();
    }
    ,[])

    const prihvati = (korisnikId) => {
        // const idDogadjaja = "1b19a562-06de-4676-8aaa-0317051244de";
        console.log(korisnikId);
          const res = fetch("https://localhost:5001/ApplicationUser/PromeniStanjeClana/" + korisnikId,
          {
            method: 'PUT'
          });
          alert("Jos jedna korisnik je postao clan drustva!!!");
          
      }
      
      const odbaci = (korisnikId) => {
        console.log(korisnikId);
        // const idDogadjaja = "1b19a562-06de-4676-8aaa-0317051244de";
        //   const res = fetch("https://localhost:5001/Dogadjaj/OtkaziDogadjaj/" + props.podatak.id,
        //   {
        //     method: 'DELETE'
        //   });
        //   alert("Dogadjaj nije bio lepo ogranizovan pa ga je administrator uklonio");
      }
    return (
        <div className="container py-lg-5">
                            
                            
                            <div className="row srediListu  dogadjaji">

                            {
                            clanovi.map((slide,index) => {
                                console.log(clanovi);
                                console.log("ovo je nesto" + slide.id);
                                return (
                                    
                                            <div className="subject-card mt-4 SrediKor">
                                                <div className="subject-card-header p-4 SrediKor" key={slide.id}>
                                                    <NavItem>
                                                        <NavLink tag={Link} to={`/profilKorisnika/${slide.id}`}>
                                                        <div key={index} className="">
                                                            <Clan clan={slide} slika={slika}/>
                                                            </div>
                                                        </NavLink>
                                                    </NavItem>
                                                    <div>
                                                        <button type='button' className='btn btn-style btn-secondary promeniBojuDugmetu' onClick={() => prihvati(slide.id)}>Prihvati</button>
                                                        <button type='button' className='btn btn-style btn-secondary' onClick={() => odbaci(slide.id)}>Odbaci</button>
                                                    </div>

                                                </div>
                                            </div>                 
                                )
                            })
                        }
                                {/* <div className="col-lg-3 col-6 mt-lg-5 mt-4">
                                    <div className="box16">
                                        <a href="#url"><img src="assets/images/team1.jpg" alt="" className="img-fluid" /></a>
                                        <div className="box-content">
                                            <h3 className="title"><a href="#url">Alexander</a></h3>
                                            <span className="post">Description</span>
                                            <ul className="social">
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
                                </div> */}
                            
                    </div>
                </div>



    //     <div>
    //         <section className="w3l-grids-3 py-5">
    //       <div className="container py-md-5">
    //           <div className="title-content text-left mb-lg-5 mb-4">
    //               <h6 className="sub-title">Poseti</h6>
    //               <h3 className="hny-title">Popularne destinacije</h3>
    //           </div>
    //                 <div className="row bottom-ab-grids">
    //                     {
    //                         planine.map((slide,index) => {
    //                             console.log(planine);
    //                             console.log("ovo je nesto" + slide.id);
    //                             return (
                                    
    //                                         <div className="col-lg-6 subject-card mt-4">
    //                                             <div className="subject-card-header p-4" key={slide.id}>
    //                                                 <NavItem>
    //                                                     <NavLink tag={Link} to={`/planina/${slide.id}`}>
    //                                                         <HomeCard planina={slide} slika={slika}/>
    //                                                     </NavLink>
    //                                                 </NavItem>
    //                                             </div>
    //                                         </div>                 
    //                             )
    //                         })
    //                     }
    //                 </div>
    //       </div>
    //   </section>
    //     </div>
    );
}