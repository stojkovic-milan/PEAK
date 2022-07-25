import React from "react";
import { render } from "react-dom";
import Modal from "react-bootstrap/Modal"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import './PlaninarskoDrustvo.css';

export default function ModalAdminUkloniSadrzaj(props) {

    const [dogadjaj, setDogadjaj] =React.useState({});



    console.log("Crtam prijavi neprikladan dogadjaj modal");
    function otkaziDgm()
    {
        //ignorise unete podatke
        console.log("otkazi dugme");
        props.funkcijaGasi();
    }
    

    function prijaviDgm()
        {
            //pravi fetch sa unetim poljima i pravi novi dogadjaj
            console.log("prijavi dogadjaj dugme");
            // let naziv = document.getElementById("exampleForm.ControlInput1").value;
            // console.log(naziv);
            // let datum = document.getElementById("exampleForm.ControlInput2").value;
            // console.log(datum);
            // let tip = document.getElementById("exampleForm.ControlInput3").value;
            // console.log(tip);
            // let rute = document.getElementById("opcijerute");
            // let idrute = rute.options[rute.selectedIndex].value;
            // console.log(idrute);
            // //POTREBNO JE DODATI MOGUCNOST ZA UPLOAD SLIKE DOGADJAJA
            // // link za fetch: "DodajDogadjaj/{naziv}/{datum}/{tip}/{ruta}/{organizator}"
            // const dodajDogadjaj = async() => {
            //     const res = await fetch("https://localhost:5001/Dogadjaj/DodajDogadjaj/"+naziv+"/"+datum+" 22:00:00.000000/"+tip+"/"+idrute+"/"+props.idpldrustva,
            //     {
            //         method: 'POST'
            //     });
            //     console.log("Dodat dogadjaj: "+res);
            // }
            // dodajDogadjaj();
            //window.location.reload(false);
            if(props.tip==1)
            {
                const idDogadjaja = "1b19a562-06de-4676-8aaa-0317051244de";
            const res = fetch("https://localhost:5001/Dogadjaj/PromeniStanjeDogadjaja/" + props.dogadjajId,
            {
                method: 'PUT'
            });
            alert("Uspesno sakriven dogadjaj!");
            location.reload();
            }
            else
            {
                console.log("OVO JE ID PLANIEN:"+ props.podatak.id);
                const res = fetch("https://localhost:5001/Planina/PromeniStanjePlanine/" + props.podatak.id,{
                    method:"PUT"
                });
                alert("Uspesno ste sakrili destinaciju");
                location.reload();
            }
            
            props.funkcijaGasi();
        }

    return (
        <>
        {/* <h1>sdfhuiop</h1> */}
            <Modal show={props.show}>
                <Modal.Header>
                    <Modal.Title>Uklanjanje sadrzaja</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Da li ste sigurni da zelite da se ovaj podatak vise ne prikazuje?</Form.Label>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={otkaziDgm}>
                        Otkazi
                    </Button>
                    <Button variant="primary" onClick={prijaviDgm}>
                        Ukloni
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}