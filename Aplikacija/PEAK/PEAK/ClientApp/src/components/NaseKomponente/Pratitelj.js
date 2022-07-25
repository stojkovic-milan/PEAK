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

export default function Pratitelj(props){
    const [clanovi, setClanovi] = React.useState([]);
    // const [brojPlanina, setBrojPlanina] = React.useState(planine.length);
    React.useEffect(() => {
        const getClanovi = async() => {
            console.log(props.id);
            const res = await fetch("https://localhost:5001/ApplicationUser/PreuzmiSvePratitelje/"+props.id,
            {
                method: 'GET'
            });
            const getdata = await res.json();
            setClanovi(getdata);
            console.log("KOGA JA PRATIM"+getdata);
        }
        getClanovi();
    }
    ,[props.id])
    return (
        <div className="container py-lg-5 srediListu">
                            
                            <div className="title-content text-center mb-lg-3 mb-4">
                            </div>
                            <div className="row srediListu2">

                            {
                            clanovi.map((slide,index) => {
                                console.log(clanovi);
                                console.log(slide.profilnaSlika);
                                console.log("ovo je nesto" + slide.id);
                                return (
                                    
                                            <div className="col-lg-6 subject-card mt-4">
                                                <div className="subject-card-header p-4 neSmanjuj" key={slide.id}>
                                                    <NavItem>
                                                        <NavLink tag={Link} to={`/profilKorisnika/${slide.id}`}>
                                                            <Clan clan={slide}/>
                                                        </NavLink>
                                                    </NavItem>


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