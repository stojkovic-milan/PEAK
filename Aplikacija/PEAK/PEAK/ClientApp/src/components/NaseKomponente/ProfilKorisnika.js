import React from "react";
import { render } from "react-dom";
import authService from '../api-authorization/AuthorizeService'
import ProfilModal from '../NaseKomponente/ProfilModal'
import ModalPromeniRole from "./ModalPromeniRole";
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
import { Link } from "react-router-dom";


import Prati from "./Prati";
import Pratitelj from "./Pratitelj";
function ProfilKorisnika(props) {

    console.log("CRTAM OBICAN PROFIL");
    const [modalPromenaRole, setModalPromenaRole]=React.useState(false);
    const [loading, setLoading] = React.useState([]);

    const [person, setPerson] = React.useState({
        id: props.id,
        ime: "",
        prezime: "",
        spremnost:0,
        email: "",
        profilnaSlika: "", 
        phoneNumber:""
    });
    const [drustvoId, setDrustvoId] = React.useState(-1);
    const [modal, setModal] = React.useState(false);
    React.useEffect(() => {
        setLoading(true);
        const getDg = async () => {
            const token = await authService.getAccessToken();
            const res = await fetch("https://localhost:5001/ApplicationUser/PreuzmiInformacijeKorisnika?id=" + props.id, {
                headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
            });
            //setPerson(await res.json());
            /*console.log(await res.json());*/
            setPerson(await res.json());
            setLoading(false);
        }

        getDg();
    }, [props.id]);

    React.useEffect(() => {
        setLoading(true);
        const getDg = async () => {
            const token = await authService.getAccessToken();
            const res = await fetch("https://localhost:5001/ApplicationUser/PreuzmiDrustvoUVlasnistvu", {
                headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
            });
            //setPerson(await res.json());
            /*console.log(await res.json());*/
            setDrustvoId(await res.text());
            setLoading(false);
            console.log(drustvoId);
        }
        getDg();
    }, []);

    function izmenaProfila() {
        setModal(prev=>!prev)
        //render(<ProfilModal/>, document.getElementById('root'))
    }
    async function cuvajIzmene(personNew) {
        console.log(personNew)
        const token = await authService.getAccessToken();
        const res = await fetch("https://localhost:5001/ApplicationUser/PromeniPodatkeKorisnika/" + person.id + "/" + personNew.ime + "/" + personNew.prezime + "/" + personNew.phoneNumber + "/" + personNew.spremnost, {
            headers: !token ? {} : {
                'Authorization': `Bearer ${token}`,
                'Content-Type' : 'application/json'
            },
            method: 'PUT',
            body: JSON.stringify(personNew.profilnaSlika)
        });
        await console.log(await res.text());
        setPerson(personNew)
    }
 
    // const [listaPrijatelja, setListaPrijatelja] = React.useState([]);

    // React.useEffect(() => {
    //     const getDg = async () => {
    //         const res = await fetch("https://localhost:5001/ApplicationUser/PreuzmiKogaKorisnikPrati/" + props.id,
    //             {
    //                 method: 'GET'
    //             });
    //             const getdata = res.json();
    //             setListaPrijatelja(getdata);
                
    //                 listaPrijatelja.map((slide, index) => {
    //                     console.log(slide);
    //                     console.log("ovo je nesto" + slide.id)
    //                     console.log("ovo je nesto" + slide.ime);
    //                 })
                
    //     }
    //     getDg();
    // }, []);

    function gasiModalPromenaRole() {
        setModalPromenaRole(false);
    }

    return (
        <div>
            {loading?<LoaderAnim/>:<div>
            <section className="w3l-about-breadcrumb text-left">
                <div className="breadcrumb-bg breadcrumb-bg-about py-sm-5 py-4">
                    <div className="container">
                        <h2 className="title">Vas profil </h2>
                    </div>
                </div>
            </section>

            {modal && <ProfilModal person={person} cuvajIzmene={cuvajIzmene} zatvori={izmenaProfila} />}
            {modalPromenaRole && <ModalPromeniRole show={modalPromenaRole} funkcijaGasi={gasiModalPromenaRole} korisnikId={props.id}/>}


            <section className="contact-infbud py-5">
              <div className="container py-lg-3">
            <div className="partners margina">
            <div className="cont-details">
              <h3 className="hny-title mb-5 profKor">Informacije o vama</h3>
            </div>
            <div className="hours">

            <div className="info-flex">

              <div>

            <h6 className="mt-4 text">Ime i prezime:</h6>
              <p className="text">{person.ime} {person.prezime}</p>
              <h6 className="mt-4 text">Email:</h6>
              <p className="text"> <a href={`mailto:${person.email}`}>
                        {person.email}</a></p>
              <h6 className="mt-4 text">Spremnost:</h6>
              <p>{person.spremnost}</p>
              <h6 className="mt-4 text">Broj telefona:</h6>
                                    {person.phoneNumber != null ? <p className="margin-top text">{person.phoneNumber}</p> : <p className="margin-top text">Neregistrovan</p>}
              <div className="text-right dugme">
                                            <button className="btn btn-style btn-secondary" onClick={izmenaProfila}>Izmeni</button>

                                            {drustvoId>-1 && <NavItem>
                                                <NavLink tag={Link} to={`/planinarskodrustvoprofil/${drustvoId}`}>
                                                    <button className="btn btn-style btn-secondary">Upravljaj drustvom</button>
                                                </NavLink>
                                            </NavItem>}
                                        </div>



            </div>

              <div className="col-lg-3 col-6 mt-lg-5 mt-4 slika">
              <div className="box16">
                  {person.profilnaSlika != null ? < img src={person.profilnaSlika} alt="" className="img-fluid" /> : < img src="https://th.bing.com/th/id/OIP.SxuyKL-Ca-_bXp1TC4c4-gHaF3?pid=ImgDet&rs=1" alt="" className="img-fluid" />}
              <div className="box-content">
                {/*<h3 class="title"><a href="#url">Alexander</a></h3>*/}
                </div>
              </div>
            </div>

            </div>

            <div>

              <div>

              <div className="cont-details contact-infbud py-5">
              <h3 className="hny-title mb-5 profKor">Prethodni dogadjaji</h3>

              <div>

                {/* <InfoDogadjaji /> */}

              </div>

              </div>
              </div>
             
              </div>
              <div className="pretragaPrijatelja">

              

            <div className="listaPrijatelja">
            {/* <div>
                <h3 className="hny-title mb-5 profKor">Lista prijatelja</h3>
                </div> */}
                <div className="">
                <section className="w3l-team" id="team">
                    <div className="team-block py-5">
                        <div className="container py-lg-5">
                            
                            <div className="pracenja">

                            <div className="pracenjaDrugog">
                        <h3 className="hny-title ttn">Prati</h3>
                    <Prati id={props.id} />
                    </div>
                    <div className="pracenjaDrugog">
                    <h3 className="hny-title ttn">Pratioci</h3>
                    <Pratitelj id={props.id} />
                    </div>

                    </div>
                    {/* LISTA CLANOVA PRIMA ID DRUSTVA */}
                {/* {
                    listaPrijatelja.map((slide, index) => {
                        console.log(slide);
                        console.log("ovo je nesto" + slide.id)
                        console.log("ovo je nesto" + slide.ime);
                        return (

                            <div className="col-lg-6 subject-card mt-4">
                                <div className="subject-card-header p-4" key={slide.id}>
                                    <ListaClanova id={slide.id} />
                                </div>
                            </div>
                        )
                    })
                } */}
                </div>
                </div>
                </section>
                </div>
              

              <div>

              {/*  <Prijatelji />*/}
              </div>

              </div>

            </div>


            </div>
            </div>
            </div>
            </section>

<div className="dugme-dva">
                    <button className="btn btn-style btn-secondary" onClick={() => setModalPromenaRole(true)}>Kreiraj svoje drustvo</button>

</div></div>}
            

            </div>
    )
}

export default ProfilKorisnika;