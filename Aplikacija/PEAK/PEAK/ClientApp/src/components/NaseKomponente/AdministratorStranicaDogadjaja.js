import React from "react";
import DogadjajStranicaCard from "./DogadjajStranicaCard";
import { Link } from "react-router-dom";
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
import AdministratorStranicaDogadjajaKartica from "./AdministratorStranicaDogadjajaKartica";
import ModalAdminUkloniSadrzaj from "./ModalAdminUkloniSadrzaj";

export default function AdministratorStranicaDogadjaji() {
  
  const [dogadjajii, setDogadjajii] = React.useState([]);
  const [lokacije, setLokacije] = React.useState([]);
  const [modal, setModal] = React.useState(false);
  // const [brojDogadjaja, setBrojDogadjaja] = React.useState(dogadjaj.length);
  
  var datumod="2027-02-20 22:00:00.000000";
  var datumdo="2027-02-20 22:00:00.000000";
  var idLokacije=1;
  var tipSortiranja=0;

  function dugmePretrazi()
    {
      //console.log(datumod);
      datumod = document.getElementById("datumOd").value;
      console.log(datumod);
      //console.log(datumdo);
      datumdo = document.getElementById("datumDo").value;
      console.log(datumdo);
      var select1 = document.getElementById("lokacijaSelect");
      idLokacije = select1.options[select1.selectedIndex].value;
      console.log("ID LOKACIJE: " + idLokacije);
      var select2 = document.getElementById("tipSortiranja");
      tipSortiranja = select2.options[select2.selectedIndex].value;
      console.log("TIP SORTIRANJA: " + tipSortiranja);

      // React.useEffect(() => {
    
      //   const getdogadjaj = async() =>{
      //     // dugmePretrazi();
      //     const res = await fetch("https://localhost:5001/Dogadjaj/PreuzmiDogadjaje/"+datumod+"/"+datumdo+"/"+idLokacije+"/"+tipSortiranja);
      //     const getdata = await res.json();
      //     setDogadjajii(getdata);
      //     console.log(getdata);
      //   }
      //   getdogadjaj();
      // },[])
    }

  React.useEffect(() => {
    
    const getdogadjaj = async() =>{
      // dugmePretrazi();
      const res = await fetch("https://localhost:5001/Dogadjaj/PreuzmiDogadjaje/");
      const getdata = await res.json();
      setDogadjajii(getdata);
      console.log(getdata);
    }
    getdogadjaj();
  },[])
  
  React.useEffect(() => {
    const getlokacije = async() =>{
      const res = await fetch("https://localhost:5001/Lokacija/PreuzmiLokacije");
      const getdata = await res.json();
      setLokacije(getdata);
      console.log(getdata);
    }
    getlokacije();
    
  },[])

  function gasiModal() {
    setModal(false);
}

    return (
    <div>
      <section className="w3l-about-breadcrumb text-left">
        <div className="breadcrumb-bg breadcrumb-bg-about py-sm-5 py-4">
          <div className="container">
            <h2 className="title">Kalendar aktivnosti </h2>
          </div>
        </div>
      </section>
      <div className="dogadjaji--filter">
        <div className="align-center container">
          <label>Od:</label>
          <input id="datumOd" className="rounded" type={"date"}></input>
        </div>
        <div className="align-center container">
          <label className="align-center">Do:</label>
          <input id="datumDo" className=" align-center rounded" type={"date"}></input>
        </div>
        <label className="align-center">Lokacija:</label>
        <select id="lokacijaSelect"className="rounded h-50 align-center custom-select">
        {lokacije.map((lokacija, index) => {
                return (
                  <option value={lokacija.id}>
                      {lokacija.naziv}
                  </option>
                );
            })}
          </select>
        <div className="container align-center">  
          <button onClick={dugmePretrazi} className="btn-group align-center rounded btn-dark">
            Pretrazi
          </button>
        </div>
        <div className="align-center container">
          <label>Sortiraj:</label>
          <select id="tipSortiranja" className="custom-select">
            <option value="0">Popularni</option>
            <option value="1">Najskoriji</option>
            <option value="2">Najdavniji</option>
            <option value="3">Najlaksi</option>
            <option value="4">Najtezi</option>
          </select>
        </div>
      </div>
      <section className="grids-1 py-5">
        <div className="grids py-lg-5 py-md-4">
          <div className="container">
            <div className="row bottom-ab-grids">
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
            {dogadjajii.map((slide, index) => {
              console.log(slide);
              return (
                <div className="row">
        <div className="col-lg-4 col-md-4 col-6">
        
            <div className="column">
            <div className="dogadjaj--card">
            <div className="ikonaZaZatvaranje">
                <i className="fa fa-window-close " onClick={()=> setModal(true)}/>
                
              {modal && <ModalAdminUkloniSadrzaj show={modal} funkcijaGasi={gasiModal} dogadjajId={slide.id} tip={1}/>}
            </div>
                <NavItem>
                    <NavLink tag={Link} to={`/dogadjaj/${slide.id}`}>
                      <div key={index}>
                        <AdministratorStranicaDogadjajaKartica dog={slide} />
                      </div>
                    </NavLink>
                  </NavItem>
                  </div>
                  </div>
                  </div>
                  </div>
              );
            })}
          </div>
          </div>
        </div>
      </section>
    </div>
  );
}

