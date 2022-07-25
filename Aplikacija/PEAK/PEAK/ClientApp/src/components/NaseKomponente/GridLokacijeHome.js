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

export default function GridLokacijeHome(props) {
    const [planine, setPlanine] = React.useState([]);
    // const [brojPlanina, setBrojPlanina] = React.useState(planine.length);
    React.useEffect(() => {
        const getplanine = async () => {
            const res = await fetch("https://localhost:5001/Planina/PreuzmiNajpopularnijeDestinacije");
            const getdata = await res.json();
            setPlanine(getdata);
            console.log(getdata);
            props.loaded();
        }
        getplanine();
    }
        , [])

    const [destinacije, setDestinacije] = React.useState([]);
    React.useEffect(() => {
        const getDestinacije = async () => {
            const res = await fetch("https://localhost:5001/Planina/")
        }
    })
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
                            planine.map((slide, index) => {
                                console.log(planine);
                                console.log("ovo je nesto" + slide.planina.id)
                                console.log("ovo je nesto" + slide.planina.slika);
                                return (

                                    <div className="col-lg-6 subject-card mt-4">
                                        <div className="subject-card-header p-4" key={slide.planina.id}>
                                            <NavItem>
                                                <NavLink tag={Link} to={`/planina/${slide.planina.id}`}>
                                                    <HomeCard planina={slide.planina} slika={slide.planina.slikaPlanine} />
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