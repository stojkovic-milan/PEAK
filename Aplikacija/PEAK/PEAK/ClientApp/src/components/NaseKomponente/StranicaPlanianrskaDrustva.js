import React from "react";
import { Link } from "react-router-dom";
import LoaderAnim from "./LoaderAnim";
import {
  Collapse,
  Container,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink,
} from "reactstrap";
import DrustvoStranicaCard from "./DrustvoStranicaCrd";


export default function StranicaPlaninarskaDrustva() {
  
  const [drustva, setDrustva] = React.useState([]);
  const [loading, setLoading] = React.useState([]);

  // const [brojDogadjaja, setBrojDogadjaja] = React.useState(dogadjaj.length);
  React.useEffect(() => {
    setLoading(true);
    const getdrustva = async() =>{
      const res = await fetch("https://localhost:5001/PlaninarskoDrustvo/PreuzmiSvaPlaninarskaDrustva");
      const getdata = await res.json();
      setDrustva(getdata);
      console.log(getdata);
      setLoading(false);
    }
    getdrustva();

  },[])
  
  function dugmeFiltrirajPD()
    {
      let clanarinaod = document.getElementById("clanarinaOd").value;
      console.log(clanarinaod);
      let clanarinado = document.getElementById("clanarinaDo").value;
      console.log(clanarinado);

      const getdrustvaF = async() =>{
        const res = await fetch("https://localhost:5001/PlaninarskoDrustvo/PreuzmiPlaninarskaDrustvaFilter/"+clanarinaod+"/"+clanarinado);
        const getdata = await res.json();
        setDrustva(getdata);
        console.log(getdata);
      }
      getdrustvaF();
    }

    return (
    <div>
      {loading?
      (<LoaderAnim/>):
      (<div><section className="w3l-about-breadcrumb text-left">
        <div className="breadcrumb-bg breadcrumb-bg-about py-sm-5 py-4">
          <div className="container">
            <h2 className="title">Kalendar aktivnosti </h2>
          </div>
        </div>
      </section>
      <div className="drustva--filter">
        {/* <div className="align-center container">
          <label>Od:</label>
          <input className="rounded" type={"date"}></input>
        </div> */}
        {/* <div className="align-center container">
          <label>Od:</label>
          <input className="rounded" type={"date"}></input>
        </div> */}
        <div className="align-center container">
          <label className="align-center">Min cena clanarine:</label>
          <input id="clanarinaOd" className=" rounded h-50 align-center" type={"number"}></input>
        </div>
        <div className="align-center container">
          <label className="align-center">Max cena clanarine:</label>
          <input id="clanarinaDo" className="rounded h-50 align-center" type={"number"}></input>
        </div>
        <div className="container align-center">
          <button onClick={dugmeFiltrirajPD} className="btn-group align-center rounded btn-dark">
            Pretrazi
          </button>
        </div>
      </div>
      {/* <section className="grids-1 py-5">
        <div className="grids py-lg-5 py-md-4">
          <div className="container">
            <div className="row bottom-ab-grids"> */}
            {/* <div className="row">
              <Card />
              <Card />
              <Card />
            </div>
            <div className="row">
              <Card />
              <Card />
              <Card />
            </div> */}

        <div className="best-rooms py-5 centriraj">
            <div className="container py-md-5 centriraj">
                <div className="ban-content-inf row  srediDrustva">
                    <div className="maghny-gd-1 srediDrustva">
            {drustva.map((slide, index) => {
              console.log(slide);
              return (
                <div className="srediDrus odvoji">
                <NavItem>
                    <NavLink tag={Link} to={`/planinarskoDrustvo/${slide.id}`}>
                    <div className="maghny-gd-1 col-12 mt-4">
                                    <div className="maghny-grid">
                      <div key={index} className="srediDrus">
                        <DrustvoStranicaCard dog={slide} />
                      </div>
                      </div>
                      </div>
                    </NavLink>
                  </NavItem>
                  </div>
              );
            })}
        </div>
        </div>
        </div>
        </div>
        </div>)}
        </div>
  );
}

