import React from "react";
import { render } from "react-dom";
import Modal from "react-bootstrap/Modal"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import './PlaninarskoDrustvo.css';
import axios from "axios"

export default function ModalPredlogPlanine(props) {
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
            let vrh = document.getElementById("exampleForm.ControlInput2").value;
            console.log(vrh);
            let visina = document.getElementById("exampleForm.ControlInput3").value;
            console.log(visina);
            let xkord = document.getElementById("exampleForm.ControlInput4").value;
            console.log(xkord);
            let ykord = document.getElementById("exampleForm.ControlInput5").value;
            console.log(ykord);
            let nazivrute = document.getElementById("exampleForm.ControlInput6").value;
            console.log(nazivrute);
            let duzinarute = document.getElementById("exampleForm.ControlInput7").value;
            console.log(duzinarute);
            let tezinarute = document.getElementById("exampleForm.ControlInput8").value;
            console.log(tezinarute);

            res.then(p => {
                link = p.data;
                //PredloziPlaninu/{naziv}/{najvisiVrh}/{visina}/{xKord}/{yKord}/{nazivRute}/{duzinaRute}/{tezinaRute}
                const dodajPredlogPlanine = async () => {
                    const res = await fetch("https://localhost:5001/Planina/PredloziPlaninu/"+naziv+"/"+vrh+"/"+visina+"/"+xkord+"/"+ykord+"/"+nazivrute+"/"+duzinarute+"/"+tezinarute,
                        {
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            method: 'POST',
                            body: JSON.stringify(link)
                        });
                    console.log("Dodata planina: " + res);
                }
                dodajPredlogPlanine();
                window.location.reload(false);
                props.funkcijaGasi();
                })
    }
    
  return (
        <>
            <Modal show={props.show}>
                <Modal.Header>
                    <Modal.Title>Predlaganje planine</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Naziv planine</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Naziv planine"
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group controlId="formFile" className="mb-3" onChange={(event) => { setSlika(event.target.files[0]) }}>
                          <Form.Label>Slika planine</Form.Label>
                          <Form.Control type="file" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                            <Form.Label>Najvisi vrh planine</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Najvisi vrh planine"
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                          <Form.Label>Visina Najviseg vrha</Form.Label>
                          <Form.Control
                              type="number"
                              min="500"
                              max="9000"
                              autoFocus
                          />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
                          <Form.Label>X koordinata</Form.Label>
                          <Form.Control
                              type="number"
                              min="0"
                              max="180"
                              step="any"
                              autoFocus
                          />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput5">
                          <Form.Label>Y koordinata</Form.Label>
                          <Form.Control
                              type="number"
                              min="0"
                              max="90"
                              step="any"
                              autoFocus
                          />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput6">
                            <Form.Label>Naziv rute</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Naziv rute"
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput7">
                          <Form.Label>Duzina rute</Form.Label>
                          <Form.Control
                              type="number"
                              min="1"
                              autoFocus
                          />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput8">
                          <Form.Label>Tezina rute</Form.Label>
                          <Form.Control
                              type="number"
                              min="1"
                              max="10"
                              autoFocus
                          />
                        </Form.Group>
                      
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={otkaziDgm}>
                        Otkazi
                    </Button>
                    <Button variant="primary" onClick={dodajDgm}>
                        Predlozi
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}