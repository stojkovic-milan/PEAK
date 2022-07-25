import React from "react";
import './PlaninarskoDrustvo.css';
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
import ModalDogadjaj from "./ModalDogadjaj";
import { render } from "react-dom";
import ListaClanova from "./ListaClanova";
import Comments from "./Comments";
import authService from '../api-authorization/AuthorizeService'
import LoaderAnim from "./LoaderAnim";
import moment from "moment";


function PlaninarskoDrustvo(props) {

    const [dogadjaji, setDogadjaji] = React.useState([]);
    const [drustvo, setDrustvo] = React.useState({});
    const [modal, setModal] = React.useState(false);
    const [loading, setLoading] = React.useState([]);
    const [prosecnaOcena, setProsecnaOcena] = React.useState(0);
    

    React.useEffect(() => {
        setLoading(true);
        const getProsek=async () => {
            const res = await fetch("https://localhost:5001/api/Utisak/ProsecnaOcenaUtisakDrustvo/" + props.id);
            const getdata = await res.text();
            setProsecnaOcena(getdata);
            setLoading(false);
        }
        getProsek();
    },[]);

    // const [clanovi, setClanovi] = React.useState({});
    // const [brojDogadjaja, setBrojDogadjaja] = React.useState(dogadjaj.length);
    React.useEffect(() => {
        setLoading(true);
        const getdrustvo = async () => {
            const res = await fetch("https://localhost:5001/PlaninarskoDrustvo/PreuzmiInformacijZaDrustvo/" + props.id);
            const getdata = await res.json();
            setDrustvo(getdata);
            console.log(getdata);
            setLoading(false);
        }
        getdrustvo();
    // }, [])

    // React.useEffect(() => {
        const getdogadjidrustva = async () => {
            const res = await fetch("https://localhost:5001/Dogadjaj/PreuzmiDogadjajeDrustva/" + props.id);
            const getdata = await res.json();
            setDogadjaji(getdata);
            setLoading(false);
        }
        getdogadjidrustva();
    }, []);

    console.log("ZDRAVO")

    // React.useEffect(() => {
    //     const getClanovi = async() =>{
    //         const res = await fetch("https://localhost:5001/PlaninarskoDrustvo/PreuzmiSveClanove/"+props.id);
    //         const getdata = await res.json();
    //         setClanovi(getdata);
    //         console.log(getdata);
    //     }
    //     getClanovi();
    // },[])

    const [dugme, setDugme] = React.useState(false);

    async function PrijavaNaProfilDrustva() {
        let iddr;
        const token = await authService.getAccessToken();
        const idKorisnika =await fetch("https://localhost:5001/ApplicationUser/PreuzmiPrijavljenogKorisnika",
            {
                method: 'GET',
                headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
            });
        let idKor =await idKorisnika.text();
        console.log(idKorisnika);
        const idDrustva = await fetch("https://localhost:5001/ApplicationUser/PreuzmiDrustvoKorisnika?id=" + idKor,
            {
                method: 'GET'
            });
        iddr=await idDrustva.text();
        if (!iddr) {
            console.log(props.id)
            const res = await fetch("https://localhost:5001/PlaninarskoDrustvo/DodajClana/" + idKor + "/" + props.id,
                {
                    method: 'POST'
                });
            console.log("DODAT NOVI CLAN" + res);
        }
        else {
            setDugme(!dugme);
        }
    }

    function gasiModal() {
        setModal(false);
    }

    // React.useEffect(() => {
    //     const getClanovi = async() => {
    //         const res = await fetch("https://localhost:5001/PlaninarskoDrustvo/PreuzmiClanove/"+props.id);
    //         const getdata = await res.json();
    //         setClanovi(getdata);
    //     }
    //     getClanovi();
    // })
    return (
        <div>
            {loading?<LoaderAnim/>:<div>
                {/* ovaj deo je dobar */}
            <section className="w3l-about-breadcrumb text-left">
                <div className="breadcrumb-bg breadcrumb-bg-about py-sm-5 py-4">
                    <div className="container">
                        <h2 className="title">{drustvo.naziv}</h2>
                    </div>
                </div>
            </section>

            {(modal && <ModalDogadjaj show={modal} funkcijaGasi={gasiModal} idpldrustva={props.id} />)}

            <section className="contact-infbud py-5">
                <div className="container py-lg-3">
                    <div className="partners margina">
                        <div className="cont-details">
                            <h3 className="hny-title mb-5 ttn">Osnovne informacije:</h3>
                        </div>
                        <div className="hours">
                            <div className="info-flex">
                                <div>
                                    <h6 className="mt-4 veciFont">Adresa:</h6>
                                    <p className="veciFont">{drustvo.adresa}</p>
                                    <h6 className="mt-4 veciFont">Broj telefona:</h6>
                                    <p className="margin-top veciFont"><a>{drustvo.brojTelefona}</a></p>
                                    <h6 className="mt-4 veciFont">Clanarina:</h6>
                                    <p className="veciFont">{drustvo.clanarina}</p>
                                    <h6 className="mt-4 veciFont">Prosecna ocena:</h6>
                                    <p className="veciFont">{prosecnaOcena}</p>

                                </div>
                                <div className="col-lg-3 col-6 mt-lg-5 mt-4 slika">
                                    <div className="box16">
                                        <img className="img-fluid" src={drustvo.slikaDrustva} alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="margina">
                <section className="grids-1 py-5">
                    <div className="grids py-lg-5 py-md-4">
                        <div className="cont-details">
                            <h3 className="hny-title mb-5">Dogadjaji</h3>
                            </div>
                            <div className="container dogadjaji">
                            {
                                dogadjaji.map((element, index) => {
                                    let danasnjiDatum = new Date();
                                    let date = danasnjiDatum.getFullYear()+'-'+(danasnjiDatum.getMonth()+1)+'-'+danasnjiDatum.getDate();
                                    let ddat = moment(date).utc().format('YYYY-MM-DD');
                                    let ddog = new Date();
                                    ddog = moment(element.datum).utc().format('YYYY-MM-DD');
                                    return (
                                        <div>
                                            {ddog<ddat?null:
                                            <NavItem>
                                            <NavLink tag={Link} to={`/dogadjaj/${element.id}`}>
                                                <div key={index} className="karticeDog">
                                                    <DogadjajStranicaCard dog={element} />
                                                </div>
                                            </NavLink>
                                            </NavItem>
                                            }
                                        </div>
                                    );
                                })
                            }
                        </div>
                    </div>
                </section>
            </div>

            <div className="margina">
                <section className="grids-1 py-5">
                    <div className="grids py-lg-5 py-md-4">
                        <div className="cont-details">
                            <h3 className="hny-title mb-5">Prethodni dogadjaji</h3>
                            </div>
                            <div className="container dogadjaji">
                            {
                                dogadjaji.map((element, index) => {
                                    let danasnjiDatum = new Date();
                                    let date = danasnjiDatum.getFullYear()+'-'+(danasnjiDatum.getMonth()+1)+'-'+danasnjiDatum.getDate();
                                    let ddat = moment(date).utc().format('YYYY-MM-DD');
                                    let ddog = new Date();
                                    ddog = moment(element.datum).utc().format('YYYY-MM-DD');
                                    return (
                                        <div>
                                            {ddog>ddat?null:
                                            <NavItem>
                                            <NavLink tag={Link} to={`/dogadjaj/${element.id}`}>
                                                <div key={index} className="karticeDog">
                                                    <DogadjajStranicaCard dog={element} />
                                                </div>
                                            </NavLink>
                                            </NavItem>
                                            }
                                        </div>
                                    );
                                })
                            }
                        </div>
                    </div>
                </section>
            </div>

            {/* do ovde ne treba da se diraju tagovi, samo da se srede parametri */}
            {/* dogadjaji, veoma nezgodan deo */}
            <div className="gornja">
                <section className="w3l-team" id="team">
                    <div className="team-block py-5">
                        <div className="container py-lg-5">

                            {/* provera da li je ulogovan nalog PD, ako jeste onda iscrtaj formu za dodavanje dogadjaja */}


                            <div className="srediListu">

                            <ListaClanova id={props.id} />

                            </div>

                            {/* <div className="title-content text-center mb-lg-3 mb-4">
                                <h3 className="hny-title ttn">Lista clanova</h3>
                            </div>
                            <div className="row">
                                <div className="col-lg-3 col-6 mt-lg-5 mt-4">
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
                                </div>
                                <div className="col-lg-3 col-6 mt-lg-5 mt-4">
                                    <div className="box16">
                                        <a href="#url"><img src="assets/images/team2.jpg" alt="" className="img-fluid" /></a>
                                        <div className="box-content">
                                            <h3 className="title"><a href="#url">Victoria</a></h3>
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
                                </div>
                                <div className="col-lg-3 col-6 mt-lg-5 mt-4">
                                    <div className="box16">
                                        <a href="#url"><img src="assets/images/team3.jpg" alt="" className="img-fluid" /></a>
                                        <div className="box-content">
                                            <h3 className="title"><a href="#url">Smith roy</a></h3>
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
                            </div>
                            <div className="col-lg-3 col-6 mt-lg-5 mt-4">
                                <div className="box16">
                                    <a href="#url"><img src="assets/images/team4.jpg" alt="" className="img-fluid" /></a>
                                    <div className="box-content">
                                        <h3 className="title"><a href="#url">Johnson</a></h3>
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
                        </div>
                    </div> */}
                        </div>
                        <div>
                            
                            <Comments drustvoId={props.id} tip={2}/>
                        </div>
                    </div>
                </section>
            </div>
                </div>}
            
        </div>
    )
}

export default PlaninarskoDrustvo;