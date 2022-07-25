import React from "react";
import { render } from "react-dom";
import Modal from "react-bootstrap/Modal"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import './PlaninarskoDrustvo.css';

export default function ModalPrijavaReport(props) {

    // const [idKorisnika,setIdKorisnika] = React.useState(0);

    console.log("Crtam prijavi neprikladan dogadjaj modal");
    function otkaziDgm() {
        //ignorise unete podatke
        console.log("otkazi dugme");
        props.funkcijaGasi();
    }

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

    function prijaviDgm() {
        //pravi fetch sa unetim poljima i pravi novi dogadjaj
        console.log("prijavi dogadjaj dugme");
        console.log(props.komentarId);
        console.log("id korisnika:" + props.korisnikId);

        
        const res = fetch("https://localhost:5001/api/Prijava/PrijaviUtisak/"+ props.komentarId +"/Neprikladan%20sadrzaj/" + props.korisnikId,
        {
          method: 'POST'
        });
        console.log(res);
        props.funkcijaGasi();
    }

    return (
        <>
            {/* <h1>sdfhuiop</h1> */}
            <Modal show={props.show}>
                <Modal.Header>
                    <Modal.Title>Prijavi neprikladan dogadjaj</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Da li zelite da prijavite dogadjaj kao neprikladan?</Form.Label>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={otkaziDgm}>
                        Otkazi
                    </Button>
                    <Button variant="primary" onClick={prijaviDgm}>
                        Prijavi
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}