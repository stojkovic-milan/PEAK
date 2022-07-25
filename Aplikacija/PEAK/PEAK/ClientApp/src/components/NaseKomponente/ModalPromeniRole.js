import React from "react";
import { render } from "react-dom";
import Modal from "react-bootstrap/Modal"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import './PlaninarskoDrustvo.css';
import authService from "../api-authorization/AuthorizeService";
import axios from "axios";

export default function ModalPromeniRole(props) {

    // const [idKorisnika,setIdKorisnika] = React.useState(0);
    const [slika, setSlika] = React.useState({});

    console.log("Crtam prijavi neprikladan dogadjaj modal");
    function otkaziDgm() {
        //ignorise unete podatke
        console.log("otkazi dugme");
        props.funkcijaGasi();
    }

    const [idKorisnika, setIdKorisnika] = React.useState("");
    React.useEffect(() => {
        const getDg = async () => {
            const token = await authService.getAccessToken();
            const res = await fetch("https://localhost:5001/ApplicationUser/PreuzmiPrijavljenogKorisnika/", {
                headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
            });
            //idKorisnika = await res.json();
            setIdKorisnika(await res.text());
        }
        getDg();
    }, []);

    // React.useEffect(() => {
    //     const getDg = async () => {
    //         const token = await authService.getAccessToken();
    //         const res = await fetch("https://localhost:5001/ApplicationUser/PreuzmiPrijavljenogKorisnika/", {
    //             headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
    //         });

    //         //idKorisnika = await res.json();
    //         setIdKorisnika(await res.text());
    //     }
    //     getDg();
    // }, []);

    async function prijaviDgm() {
        
        let naziv = document.getElementById("exampleForm.ControlInput1").value;
        console.log(naziv);
        let adresa = document.getElementById("exampleForm.ControlInput2").value;
        console.log(adresa);
        let brojTelefona = document.getElementById("exampleForm.ControlInput3").value;
        console.log(brojTelefona);
        let clanarina = document.getElementById("exampleForm.ControlInput4").value;
        console.log(clanarina);
        const formData = new FormData();
        formData.append("file", slika)

        const res = axios.post("https://localhost:5001/files/postaviSliku", formData)
        var link;
        const token = await authService.getAccessToken();
        res.then(p => {link=p.data
                let file=link;
                console.log(file);
                const res1 =  fetch("https://localhost:5001/PlaninarskoDrustvo/DodajPlaninarskoDrustvo/" + adresa + "/" + brojTelefona + "/" + naziv + "/" + clanarina + "/" + idKorisnika,{
                    method:"POST",
                    body: JSON.stringify(file),
                    headers: !token ? {} : { 'Authorization': `Bearer ${token}`,'Content-Type' : 'application/json' }
                });
                res1.then(p => console.log("RADI LI BRE"));
        })

        
        console.log(res);
        props.funkcijaGasi();
    }

    return (
        <>
            {/* <h1>sdfhuiop</h1> */}
            <Modal show={props.show}>
                <Modal.Header>
                    <Modal.Title>Posaljite zahtev administratoru da zelite da kreirate planinarsko drusto</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Da biste kreirali novo planinarsko drustvo morate da unesete odredjene informacije, a to su:</Form.Label>
                            <Form.Label>ime planinarskog drustva, adresu, broj telefona i clanarinu</Form.Label>
                            <Form.Label>Bitno je da se unesu sve informacije da bi se drustvo kreiralo korektno, inace ce biti odbacen zahtev od strane administratora!</Form.Label>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Naziv</Form.Label>
                            <Form.Control 
                                type="text"
                                placeholder="Naziv planinarskog drustva"
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                        <Form.Label>Adresa</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Adresa"
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                        <Form.Label>Broj telefona</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Broj telefona"
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
                        <Form.Label>Clanarina</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Clanarina"
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group controlId="formFile" className="mb-3" onChange={(event) => { setSlika(event.target.files[0]) }}>
                          <Form.Label>Profila slika</Form.Label>
                          <Form.Control type="file" />
                      </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={otkaziDgm}>
                        Otkazi
                    </Button>
                    <Button variant="primary" onClick={prijaviDgm}>
                        Posalji zahtev
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}