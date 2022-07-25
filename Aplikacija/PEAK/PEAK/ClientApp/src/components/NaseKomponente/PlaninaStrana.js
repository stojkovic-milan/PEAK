import React from "react";
import ReactWeather, { useWeatherBit } from "react-open-weather"
import Forecast from "./Weather/WeatherWidget";
import customStyles from './Weather/WidgetTheme';
import BasicTable from "./BasicTable";
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
import DogadjajStranicaCard from "./DogadjajStranicaCard";
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
import LoaderAnim from "./LoaderAnim";



export default function PlaninaStrana(props) {

    const hederi = [
      "Redni broj", "Naziv", "Nadmorska visina"
    ]
    const hederiRute = [
      "Redni broj", "Naziv", "Duzina", "Tezina"
    ]
    const [id, setId] = React.useState(props.id)
    const [vrhovi, setVrhovi] = React.useState([]);
    const [ dogadjaji, setDogadjaji] = React.useState([]);
    const [rute, setRute] = React.useState([]);
    const [planina, setPlanina] = React.useState({});
    const [loading, setLoading] = React.useState([]);

    React.useEffect(() => {
      setLoading(true);
        const getDg = async () => {

            const res = await fetch("https://localhost:5001/Planina/PreuzmiInformacijeZaPlaninu/"+props.id);

            const getdata = await res.json();
            console.log(getdata);
            setPlanina(getdata);
            setLoading(false);
        }
        getDg();
    }, [])

    React.useEffect(() => {
      const getVrhovi = async () => {

          const res = await fetch("https://localhost:5001/Planina/PreuzmiSveVrhovePlanine/" + props.id);

          const getdata = await res.json();

          setVrhovi(getdata);
          setLoading(false);

      }
      getVrhovi();
  }, [])
  React.useEffect(() => {
    const getRute = async () => {

        const res = await fetch("https://localhost:5001/Planina/PreuzmiSveRutePlanine/" + props.id);

        const getdata = await res.json();

        setRute(getdata);
        setLoading(false);

    }
    getRute();
}, [])
  React.useEffect(() => {
    const getdogadjaji = async () => {
      const res = await fetch("https://localhost:5001/Dogadjaj/PreuzmiDogadjajeNaPlanini/" + props.id);

      const getdata = await res.json();

      setDogadjaji(getdata);
      setLoading(false);

    }
    getdogadjaji();
  },[])
  //const { data, isLoading, errorMessage } = useWeatherBit({
  //  key: '24bf0a99e411431f8c9450a961403f21',
  //  lat: '43.310460',
  //  lon: '21.897809',
  //  lang: 'en',
  //  unit: 'M', // values are (M,S,I)
  //});
  console.log(planina);
  return (
    <div>
      {loading?
      (<LoaderAnim/>):
      (<div>
        <section className="w3l-about-breadcrumb text-left">
        <div className="breadcrumb-bg breadcrumb-bg-about py-sm-5 py-4">
          <div className="container">
             <h2 className="title">{planina.naziv}</h2> 
          </div>
        </div>
      </section>

      <section className="contact-infbud py-5">
        <div className="container py-lg-3">
          <div className="partners margina">
            <div className="cont-details">
              <h3 className="hny-title mb-5 profKor">Informacije o planini</h3>
            </div>
            <div className="hours">

              <div className="info-flex">

                <div>

                  <h6 className="mt-4 veciFont">Naziv:</h6>
                   <p className="veciFont">{planina.naziv}</p> 
                  <h6 className="mt-4">Vrhovi:</h6>
                  <BasicTable hederi={hederi} podaci={vrhovi} tip={2}/>
                </div>


                <div className="col-lg-3 col-6 mt-lg-5 mt-4 slika">
                  <div className="box16">
                    <img src={""} alt="" className="img-fluid" />
                    <div className="box-content">
                       {/*<h3 className="title"><a href="#url">{dogadjaj.ruta.planina}</a></h3> */}
                    </div>
                  </div>
                </div>

              </div>
              <div>

                <div className="cont-details contact-infbud py-5">
                  <h3 className="hny-title mb-5 profKor">Rute</h3>
                  <BasicTable hederi={hederiRute} podaci={rute} tip={3}/>
                </div>
                    {planina.rute/*.rute[0].lokacije.Length>1*/ && <MapContainer center={[(planina.rute[0].lokacije[0].xCord)
                        , (planina.rute[0].lokacije[0].yCord)]} zoom={13} scrollWheelZoom={false} className="mapa">
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'

                            url="https://api.maptiler.com/maps/outdoor/256/{z}/{x}/{y}.png?key=v4YRbPNezQckuRrQ6AGT"
                        />
                    </MapContainer>}
              </div>

              <div className="prijatelji">

                <div>

                  <div className="cont-details contact-infbud py-5">
                    <h3 className="hny-title mb-5 profKor">Mapa</h3>
                  </div>
                  <div>
                    
                  </div>

                </div>

                {/* <div className="col-lg-6 col-md-12 column pl-lg-5 column4 mt-lg-0 mt-5 centriraj">
                  <h3 className="hny-title mb-5 profKor">Dodajte prijatelje </h3>
                  <div className="end-column">
                    <h4>Unesite email vašeg prijatelja:</h4>
                    <form action="#" className="subscribe pretraga" method="post">
                      <input type="email" name="email" placeholder="Email Address" required=""></input>
                      <button type="submit">Dodaj</button>
                    </form>
                  </div>
                </div> */}

              </div>


            </div>
          </div>
        </div>
      </section>

      <section className="grids-1 py-5">
        <div className="grids py-lg-5 py-md-4">
          <div className="container">
            <h3 className="hny-title mb-5">Prethodni dogadjaji na planini</h3>
            <div className="row">
              
                {
                  dogadjaji.map((element, index) => {
                    return (
                      <NavItem>
                      <NavLink tag={Link} to={`/dogadjaj/${element.id}`}>
                        <div key={index}>
                          <DogadjajStranicaCard dog={element} />
                        </div>
                      </NavLink>
                    </NavItem>
                  )
                  })
                }
              
            </div>
          </div>
        </div>
      </section>

      <div className="dugme-dva">
        <button className="btn btn-style btn-secondary">Nazad</button>
      </div>
        </div>)}
      

    </div>
  )
}
