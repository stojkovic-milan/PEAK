import React from "react";
import HomeCard from "./HomeCard";
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
import ModalAdminUkloniSadrzaj from "./ModalAdminUkloniSadrzaj";

export default function AdministratorGridLokacijeHome(){
    const [planine, setPlanine] = React.useState([]);
    const [modal, setModal] = React.useState(false);
    // const [brojPlanina, setBrojPlanina] = React.useState(planine.length);
    React.useEffect(() => {
        const getplanine = async() => {
            const res = await fetch("https://localhost:5001/Planina/PreuzmiNajpopularnijeDestinacije");
            const getdata = await res.json();
            setPlanine(getdata);
            console.log(getdata);
        }
        getplanine();
    }
    ,[])

    function gasiModal() {
        setModal(false);
    }

    return (
        <div>
            <section className="w3l-grids-3 py-5">
          <div className="container py-md-5">
              <div className="title-content text-left mb-lg-5 mb-4">
              
                  <h6 className="sub-title">Poseti</h6>
                  <h3 className="hny-title">Popularne destinacije</h3>
              </div>
                    <div className="row bottom-ab-grids">
                        {
                            planine.map((slide,index) => {
                                return (
                                            
                                            <div className="col-lg-6 subject-card mt-4">
                                                <div className="subject-card-header p-4" key={slide.planina.id}>
                                                <div className={`ikonaZaZatvaranje`} id={`${slide.planina.id}`}>
                                                    <i className="fa fa-window-close " onClick={() => setModal(true)}/>
                                                </div>
                                    {modal && <ModalAdminUkloniSadrzaj show={modal} funkcijaGasi={gasiModal} podatak={slide.planina}/>}

                                                    <NavItem>
                                                        <NavLink tag={Link} to={`/planina/${slide.planina.id}`}>
                                                            <HomeCard planina={slide.planina} slika={slide.planina.slikaPlanine}/>
                                                        </NavLink>
                                                    </NavItem>
                                                </div>
                                            </div>                 
                                )
                            })
                        }
                    </div>
          </div>
      </section>
        </div>
    );
}