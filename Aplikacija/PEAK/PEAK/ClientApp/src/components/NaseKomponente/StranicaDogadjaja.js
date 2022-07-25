import React from "react";
import BasicTable from "./BasicTable";
import { NavItem } from "reactstrap";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
import Comments from "./Comments";
import authService from "../api-authorization/AuthorizeService";
import LoaderAnim from "./LoaderAnim"
import DogadjajStranicaCard from "./DogadjajStranicaCard";
import moment from "moment"
import TerminModal from '../NaseKomponente/IzmenaDatumaModal'


export default function StranicaDogadjaja(props) {

    const hederi = [
      "Redni broj", "Ime", "Prezime", "Spremnost"
    ]
    const [prijavljen, setPrijavljen] = React.useState(false);
    const [trenutnoPrijavljen, setTrenutnoPrijavljen] = React.useState(0);
    const [id, setId] = React.useState(props.id)
    const [dogadjaj, setDogadjaj] = React.useState({
        naziv: "Naziv"})
    const [ucesnici, setUcesnici] = React.useState([]);
    const [prognoza, setPrognoza] = React.useState({});
    const [loading, setLoading] = React.useState([]);
    const [prethodniDogadjaji, setPrethodniDogadjaji] = React.useState([]);
    const [slicniDogadjaji, setSlicniDogadjaji] = React.useState([]);
    const [organizator, setOrganizator] = React.useState(false);
    const [modal, setModal] = React.useState(false);

      React.useEffect(() => {
        setLoading(true);
        const getSlicni = async () => {
          const res = await fetch("https://localhost:5001/Dogadjaj/PreuzmiSlicneDogadjaje/" + props.id);
          const getdata = await res.json();
          setSlicniDogadjaji(getdata);
          setLoading(false);
        }
        getSlicni();
      },[]);

    // React.useEffect(() => {
    //   setLoading(true);
        // const getDg = async () => {
        //     let res = await fetch("https://localhost:5001/Dogadjaj/PreuzmiInformacijeZaDogadjaj/"+props.id);
        //     let getdata = await res.json();
        //     setDogadjaj(getdata);
        //     setLoading(false);
        //     console.log(dogadjaj);
        //     console.log(dogadjaj.organizatorId);
        //     res = await fetch("https://localhost:5001/Dogadjaj/PreuzmiPrethodneDogadjajeDrustva/" + dogadjaj.organizatorId + "/" + props.id);
        //     getdata = await res.json();
        //     setPrethodniDogadjaji(getdata);
        //     console.log(prethodniDogadjaji)
        // }
        // getDg();
        // fetch("https://localhost:5001/Dogadjaj/PreuzmiInformacijeZaDogadjaj/"+props.id)
        // .then(data => {
        //   data.json().then(info => {
        //     setDogadjaj(info);
        //     setLoading(false);
        //     fetch("https://localhost:5001/Dogadjaj/PreuzmiPrethodneDogadjajeDrustva/" + dogadjaj.organizatorId + "/" + props.id)
        //     .then(d => {
        //       d.json().then(elementi => {
        //         console.log(elementi);
        //         })
        //       })
        //     })
        //   })
        // },[]);
    const [organizatorId, setOrganizatorId] = React.useState(0);
    React.useEffect(() => {
      setLoading(true);
      const getDg = async () => {
        const res = await fetch("https://localhost:5001/Dogadjaj/PreuzmiInformacijeZaDogadjaj/"+props.id);
        const getdata =await res.json();
        setDogadjaj(getdata);
        setOrganizatorId(getdata.organizatorId);
        setNalogId(getdata.NalogOrganizatoraId);
        const res1 = await fetch("https://localhost:5001/Dogadjaj/PreuzmiPrethodneDogadjajeDrustva/" + getdata.organizatorId + "/" + props.id);
        const getdata1 =await res1.json();
        setPrethodniDogadjaji(getdata1);
        setLoading(false);
        getPret();
        console.log(prethodniDogadjaji);

      }
      const getPret = async () => {
        
      }
      getDg();
    },[])

    React.useEffect(() => {
      setLoading(true);
        const vratiPrognozu = async () => {
                const res = await fetch("https://api.weatherbit.io/v2.0/current?lat=" + dogadjaj.ruta.lokacije[0].xCord + "&lon=" + dogadjaj.ruta.lokacije[0].yCord + "&key=24bf0a99e411431f8c9450a961403f21")
                const vratiRez = await res.json()
                setPrognoza(vratiRez)
                setLoading(false);
        }
        vratiPrognozu()
    }, [dogadjaj])

    React.useEffect(() => {
      setLoading(true);
      const getucesnici = async () => {
          const res = await fetch("https://localhost:5001/Dogadjaj/PreuzmiSveUcensnikeDogadjaja/" + props.id);
          const getdata = await res.json();
          setUcesnici(getdata);
          setLoading(false);
      }
      getucesnici();
    }, [])
    
  // const { data, isLoading, errorMessage } = useWeatherBit({
  //  key: '24bf0a99e411431f8c9450a961403f21',
  //  lat: '43.310460',
  //  lon: '21.897809',
  //  lang: 'en',
  //  unit: 'M', // values are (M,S,I)
  // });

  React.useEffect(() => {
    const preuzmiKor = async () => {
      let iddr;
      const token = await authService.getAccessToken();
        const idKorisnika =await fetch("https://localhost:5001/ApplicationUser/ProveraKorisnikDogadjaj/" + props.id,
            {
          method: 'GET',
          headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
            });
        const res = await idKorisnika.text();
        console.log("ovo je stanje planinara:" + res);
        if (res == "org")
            setOrganizator(true)
        else {
            if (res == "da") {
                setPrijavljen(true);
            }
            else {
                setPrijavljen(false);
            }
        }
      //iddr = await idKorisnika.text();
        //setTrenutnoPrijavljen(iddr);
      }
      preuzmiKor()
  },[]);

  //React.useEffect(() => {
  //  const getDaLiJePrijavljen = async () => {
  //    const res = await fetch("https://localhost:5001/Dogadjaj/ProveraKorisnikDogadjaj/" + props.id + "/" + trenutnoPrijavljen,{
  //      method:"GET"
  //    });
  //    const getdata = await res.text();
  //    if(getdata=="da"){
  //      setPrijavljen(true);
  //    }
  //    else{
  //      setPrijavljen(false);
  //    }
  //React.useEffect(() => {
  //  const getDaLiJePrijavljen = async () => {
  //    const res = await fetch("https://localhost:5001/Dogadjaj/ProveraKorisnikDogadjaj/" + props.id + "/" + trenutnoPrijavljen,{
  //      method:"GET"
  //    });
  //    const getdata = await res.text();
  //    console.log("ovo je stanje planinara:"+getdata);
  //    if(getdata=="da"){
  //      setPrijavljen(true);
  //    }
  //    else{
  //      setPrijavljen(false);
  //    }
      
  //  }
  //  getDaLiJePrijavljen();
  // },[]);
  

  async function prijavaNaDogadjaj()
  {
      // let iddr;
      // const token = await authService.getAccessToken();
      // const idKorisnika = await fetch("https://localhost:5001/ApplicationUser/PreuzmiPrijavljenogKorisnika",
      // {
      //     method: 'GET',
      //     headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
      // });
      // iddr = await idKorisnika.text();
      // setTrenutnoPrijavljen(iddr);
      //const res = await fetch("https://localhost:5001/Dogadjaj/DodajPrijavljenogKorisnika/"+props.id+"/"+iddr,
      //{
      //  method: 'POST'
      //});
      //  let iddr;
        const token = await authService.getAccessToken();
      const idKorisnika =await fetch("https://localhost:5001/ApplicationUser/PrijaviKorisnikaDogadjaj/"+props.id,
        {
            method: 'PUT',
            headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
          });
      if (idKorisnika.ok)
          setPrijavljen(true)
      else (console.log(await idKorisnika.text()))
    }
    function izmeniVreme() {
        setModal(prev => !prev)
    }
    async function cuvajIzmeneVremena(datumNew) {
        console.log(datumNew)
        const token = await authService.getAccessToken();
        const res = await fetch("https://localhost:5001/Dogadjaj/PromeniDatumOdrzavanja/" + props.id + "/" + datumNew.toJSON(), {
            headers: !token ? {} : {
                'Authorization': `Bearer ${token}`,
            },
            method: 'PUT',
        });
        await console.log(await res.text());
        setDogadjaj({ ...dogadjaj, datum: datumNew.toLocaleDateString() })
        izmeniVreme();
    }

    async function otkaziDogadjaj() {
        let res = confirm("Da li zelite da obrisete ovaj dogadjaj?")
        if (res == true) {
            const token = await authService.getAccessToken();
            const req = await fetch("https://localhost:5001/Dogadjaj/OtkaziDogadjaj/" + props.id,
                {
                    method: 'DELETE',
                    headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
                });
            const getdata = await req.text();
        }
    }
    var pocetakIcon = L.icon({
        iconUrl: 'https://cdn-icons-png.flaticon.com/512/2017/2017144.png',
        iconSize: [50, 50],
        iconAnchor: [25, 50],
        popupAnchor: [-3, -76],
    });
    var krajIcon = L.icon({
        iconUrl: 'https://cdn1.iconfinder.com/data/icons/fitness-sport/512/finish_flag-512.png',
        iconSize: [50, 50],
        iconAnchor: [25, 50],
        popupAnchor: [-3, -76],
    });

    const [prosek,setProsek] = React.useState(0);
    const [prosecnaOcena, setProsecnaOcena] = React.useState(0);
    React.useEffect(() => {
      const getProsek = async () => {
        const res = await fetch("https://localhost:5001/api/Utisak/ProsecnaOcenaUtisakaDogadjaja/" + props.id);
        const getdata = await res.text();
        setProsecnaOcena(getdata);
      }
      getProsek();
    },[])

  return (
    <div>
      {loading?<LoaderAnim/>:<div>
      <section className="w3l-about-breadcrumb text-left">
        <div className="breadcrumb-bg breadcrumb-bg-about py-sm-5 py-4">
          <div className="container">
             <h2 className="title">{dogadjaj.naziv}</h2> 
          </div>
        </div>
      </section>

      <section className="contact-infbud py-5">
        <div className="container py-lg-3">
          <div className="partners margina">
            <div className="cont-details">
              <h3 className="hny-title mb-5 profKor">Informacije o dogadjaju</h3>
            </div>
            <div className="hours">

              <div className="info-flex">

                <div>

                  <h6 className="mt-4 veciFont">Naziv</h6>
                   <p className="veciFont">{dogadjaj.naziv}</p> 
                  <h6 className="mt-4 veciFont">Planina:</h6>
                   {dogadjaj.ruta && <p className="veciFont">{dogadjaj.ruta.planina.naziv}</p> }
                  <h6 className="mt-4 veciFont">Datum:</h6>
                  <p className="veciFont">{moment(dogadjaj.datum).utc().format('YYYY-MM-DD')}</p>
                  <h6 className="mt-4 veciFont">Tip:</h6>
                  <p className="margin-top veciFont">{dogadjaj.tip}</p>
                  <h6 className="mt-4 veciFont">Tezina:</h6>
                   <p className="margin-top veciFont">{dogadjaj.rutaTezina}</p> 
                  <h6 className="mt-4 veciFont">Planinarsko drustvo:</h6>
                  <NavItem>
                    <NavLink type={Link} to={`/planinarskoDrustvo/${dogadjaj.organizatorId}`}>
                      <p className="margin-top veciFont">{dogadjaj.organizator}</p>
                    </NavLink>
                  </NavItem>
                  <h6 className="mt-4 veciFont">Prosecna ocena:</h6>
                  <p className="margin-top veciFont">{prosecnaOcena}</p>
                                      <div className="text-right dugme">
                                          {modal && <TerminModal datum={new Date(dogadjaj.datum)} cuvajIzmene={cuvajIzmeneVremena} zatvori={izmeniVreme} />}

{
                                              organizator ? (
                                                  <div>
                                                  <button className="btn btn-style btn-secondary" onClick={izmeniVreme}>Izmeni vreme dogadjaja</button>
                                                      <button className="btn btn-style btn-secondary mrgL10" onClick={otkaziDogadjaj}>Otkazi dogadjaj</button>
                                                      </div>
                                              )
                                                  : (prijavljen ? <button className="btn btn-style btn-secondary" onClick={prijavaNaDogadjaj} disabled>PRIJAVLJENI STE</button> : <button className="btn btn-style btn-secondary" onClick={prijavaNaDogadjaj}>PRIJAVI SE</button>)
}
                  {/*{(prijavljen ? <button className="btn btn-style btn-secondary" onClick={prijavaNaDogadjaj} disabled>PRIJAVLJENI STE</button> : <button className="btn btn-style btn-secondary" onClick={prijavaNaDogadjaj}>PRIJAVI SE</button>)}*/}
                  
                    
                                      
                                      {/* {prognoza.data!=null &&
                                          <div>
                                          <p>{prognoza.data[0].temp+"°C"}</p>
                                          <img src={"https://www.weatherbit.io/static/img/icons/" + prognoza.data[0].weather.icon + ".png"}/>
                                        </div>} */}
                  </div>
                </div>

                <div className="prognoza col-lg-3 col-6 mt-lg-5 mt-4 slika">
                  <div className="box16">

                    <img src={dogadjaj.slikaDogadjaja} alt="" className="vecaSlika" />

                    {prognoza.data!=null &&
                                          <div className="vreme">
                                            <p className="vremeText">Vremenska prognoza</p>
                                          <p className="vremeText">{prognoza.data[0].temp+"°C"}</p>
                                          <img src={"https://www.weatherbit.io/static/img/icons/" + prognoza.data[0].weather.icon + ".png"}/>
                                        </div>}

                    <div className="box-content">
                       {/*<h3 className="title"><a href="#url">{dogadjaj.ruta.planina}</a></h3> */}
                    </div>
                  </div>
                </div>

              </div>
              <div>

                <div className="cont-details contact-infbud py-5">
                  <h3 className="hny-title mb-5 profKor">Ruta</h3>
                              </div>

                              {dogadjaj.ruta && <MapContainer center={[(dogadjaj.ruta.lokacije[0].xCord + dogadjaj.ruta.lokacije[dogadjaj.ruta.lokacije.length - 1].xCord) / 2
                                  , (dogadjaj.ruta.lokacije[0].yCord + dogadjaj.ruta.lokacije[dogadjaj.ruta.lokacije.length - 1].yCord)/2]} zoom={15} scrollWheelZoom={false} className="mapa">
                                  <TileLayer
                                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'

                                      url="https://api.maptiler.com/maps/outdoor/256/{z}/{x}/{y}.png?key=v4YRbPNezQckuRrQ6AGT"
                                  />
                                  <Marker icon={pocetakIcon} position={[dogadjaj.ruta.lokacije[0].xCord, dogadjaj.ruta.lokacije[0].yCord]}>
                                      <Popup>
                                          Pocetak rute
                                      </Popup>
                                  </Marker>
                                  {dogadjaj.ruta.lokacije.length>1&&<Marker icon={krajIcon} position={[dogadjaj.ruta.lokacije[dogadjaj.ruta.lokacije.length - 1].xCord, dogadjaj.ruta.lokacije[dogadjaj.ruta.lokacije.length - 1].yCord]}>
                                      <Popup>
                                          Kraj rute
                                      </Popup>
                                  </Marker>}
                              </MapContainer>}
              </div>

              <div className="prijatelji">

                <div>

                  <div className="cont-details contact-infbud py-5">
                    <h3 className="hny-title mb-5 profKor">Prethodni događaji drustva</h3>
                  </div>
                  <div>
                    <h3 className="hny-title mb-5 profKor">Lista ucesnika</h3>
                    <BasicTable hederi={hederi} podaci={ucesnici.korisnici} tip={1} />
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
            <div className="odvoji">
            <h3 className="hny-title mb-5">Slicni dogadjaji</h3>
            </div>
            <div className="row odvojiDog slicni">
                            {
                                slicniDogadjaji.map((element, index) => {
                                    return (
                                        <NavItem>
                                            <NavLink tag={Link} to={`/dogadjaj/${element.id}`}>
                                                <div key={index} className="karticeDog odvojiDog">
                                                    <DogadjajStranicaCard dog={element} />
                                                </div>
                                            </NavLink>
                                        </NavItem>
                                    );
                                })
                            }
                        </div>
          </div>
        </div>
      </section>

      <Comments dogadjajId={props.id} tip={1} updateZaProsek={prosek}/>

      <div className="dugme-dva">
        <button className="btn btn-style btn-secondary">Nazad</button>
      </div>
        </div>}
      

    </div>
  );
    
}

