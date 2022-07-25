import React from "react";
import LoaderAnim from "./LoaderAnim";
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

export default function StranicaDogadjajGrid() {
  
  const [dogadjajii, setDogadjajii] = React.useState([]);
  const [lokacije, setLokacije] = React.useState([]);
  const [loading, setLoading] = React.useState([]);
  // const [brojDogadjaja, setBrojDogadjaja] = React.useState(dogadjaj.length);
  let godina=new Date().getFullYear();
  var datumod=(godina-1)+"-01-01";
  var datumdo=(godina+1)+"-01-01";
  var idLokacije=-1;
  var tipSortiranja=0;

  function dugmePretraziFilter()
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
      
      const getdogadjajFilter = async() =>{
        // dugmePretrazi();
        const res = await fetch("https://localhost:5001/Dogadjaj/PreuzmiDogadjaje/"+datumod+"/"+datumdo+"/"+idLokacije+"/"+tipSortiranja);
        const getdata = await res.json();
        setDogadjajii(getdata);
        console.log(getdata);
      }
      getdogadjajFilter();
    }

  React.useEffect(() => {
    setLoading(true);
    const getdogadjaj = async() =>{
      // dugmePretrazi();
      const res = await fetch("https://localhost:5001/Dogadjaj/PreuzmiDogadjaje/");
      const getdata = await res.json();
      setDogadjajii(getdata);
      console.log(getdata);
      setLoading(false);
    }
    getdogadjaj();
  // },[])
  
  // React.useEffect(() => {
    const getlokacije = async() =>{
      const res = await fetch("https://localhost:5001/Lokacija/PreuzmiLokacije/");
      const getdata = await res.json();
      setLokacije(getdata);
      console.log(getdata);
      setLoading(false);
    }
    getlokacije();
    // setTimeout(()=>{
    //   setLoading(false);
    // },1500);
  },[])

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
      <div className="dogadjaji--filter">
        <div className="align-center container">
          <label>Od:</label>
          <input id="datumOd" className="rounded" type={"date"} defaultValue={datumod} onChange={dugmePretraziFilter}></input>
        </div>
        <div className="align-center container">
          <label className="align-center">Do:</label>
          <input id="datumDo" className=" align-center rounded" type={"date"} defaultValue={datumdo} onChange={dugmePretraziFilter}></input>
        </div>
        <label className="align-center">Lokacija:</label>
        <select id="lokacijaSelect"className="rounded h-50 align-center custom-select" onChange={dugmePretraziFilter}>
          <option value="-1">Sve</option>
        {lokacije.map((lokacija, index) => {
                return (
                  <option value={lokacija.id}>
                      {lokacija.naziv}
                  </option>
                );
            })}
          </select>
        <div className="container align-center">  
          <button onClick={dugmePretraziFilter} className="btn-group align-center rounded btn-dark">
            Pretrazi
          </button>
        </div>
        <label className="align-center">Sortiraj:</label>
        <div className="align-center container">
          <select id="tipSortiranja" className="custom-select" onChange={dugmePretraziFilter}>
            <option value="0">Popularni</option>
            <option value="1">Najskoriji</option>
            <option value="2">Najdavniji</option>
            <option value="3">Najlaksi</option>
            <option value="4">Najtezi</option>
          </select>
        </div>
      </div>

      <div className="margina">
                <section className="grids-1 py-5">
                    <div className="grids py-lg-5 py-md-4">
      
                            <div className="container dogadjaji">
                            {
                                dogadjajii.map((element, index) => {
                                    console.log(element.slikaDogadjaja);
                                    return (
                                        <NavItem>
                                            <NavLink tag={Link} to={`/dogadjaj/${element.id}`}>
                                                <div key={index} className="karticeDog">
                                                    <DogadjajStranicaCard dog={element} />
                                                </div>
                                            </NavLink>
                                        </NavItem>
                                    );
                                })
                            }
                        </div>
                    </div>
                </section>
            </div>

      </div>)}
    </div>
  );
}

