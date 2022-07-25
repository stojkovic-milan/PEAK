import React from "react";
import { render } from "react-dom";
import Modal from "react-bootstrap/Modal"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import './PlaninarskoDrustvo.css';
import axios from "axios"

export default function ModalDogadjaj(props) {
    console.log("Crtam novi dogadjaj modal");
    const [options, setOptions] = React.useState([]);
    const [slika, setSlika] = React.useState({});
    function otkaziDgm()
    {
        //ignorise unete podatke
        console.log("otkazi dugme");
        props.funkcijaGasi();
    }

    React.useEffect(() => {
        const getdrustvo = async() =>{
            const res = await fetch("https://localhost:5001/api/Ruta/PreuzmiRute");
            const rute = await res.json();
            console.log("###PROVERA JEL SE UCITAVAJU RUTE###");
            console.log(rute);
            let opcije = rute.map((el,index)=> 
            {
                console.log(el.id);
                return (<option value={el.id}>{el.naziv}</option>);
            });
            //console.log(opcije);
            setOptions(opcije);
        }
        getdrustvo();
    },[])

    function dodajDgm()
    {
            const formData = new FormData();
            formData.append("file", slika)

            const res = axios.post("https://localhost:5001/files/postaviSliku", formData);
            var link;
            
            //pravi fetch sa unetim poljima i pravi novi dogadjaj
            console.log("dodaj dugme");
            let naziv = document.getElementById("exampleForm.ControlInput1").value;
            console.log(naziv);
            let datum = document.getElementById("exampleForm.ControlInput2").value;
            console.log(datum);
            let tip = document.getElementById("exampleForm.ControlInput3").value;
            console.log(tip);
            let rute = document.getElementById("opcijerute");
            let idrute = rute.options[rute.selectedIndex].value;
            console.log(idrute);

            res.then(p => {
                link = p.data
                // link za fetch: "DodajDogadjaj/{naziv}/{datum}/{tip}/{ruta}/{organizator}"
                const dodajDogadjaj = async () => {
                    const res = await fetch("https://localhost:5001/Dogadjaj/DodajDogadjaj/" + naziv + "/" + datum + " 22:00:00.000000/" + tip + "/" + idrute + "/" + props.idpldrustva,
                        {
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            method: 'POST',
                            body: JSON.stringify(link)
                        });
                    console.log("Dodat dogadjaj: " + res);
                }
                dodajDogadjaj();
                window.location.reload(false);
                props.funkcijaGasi();
                })
    }
    
  return (
        <>
        {/* <h1>sdfhuiop</h1> */}
            <Modal show={props.show}>
                <Modal.Header>
                    <Modal.Title>Dodaj novi dogadjaj</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Naziv</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Naziv dogadjaja"
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                            <Form.Label>Datum odrzavanja</Form.Label>
                            <Form.Control
                                type="date"
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                            <Form.Label>Tip</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Tip dogadjaja"
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
                            <Form.Label>Ruta</Form.Label>
                            <select name="selectpicker" className="ruteselekt mb-3" id="opcijerute">
                                {options}
                            </select>
                      </Form.Group>
                      <Form.Group controlId="formFile" className="mb-3" onChange={(event) => { setSlika(event.target.files[0]) }}>
                          <Form.Label>Slika dogadjaja</Form.Label>
                          <Form.Control type="file" />
                      </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={otkaziDgm}>
                        Otkazi
                    </Button>
                    <Button variant="primary" onClick={dodajDgm}>
                        Dodaj dogadjaj
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}