import React from "react";
import { render } from "react-dom";
import Modal from "react-bootstrap/Modal"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import axios from "axios"

export default function IzmenaDatumaModal(props) {
    console.log(props.datum)
    const [show, setShow] = React.useState(true);
    /*const [datum, setDatum] = React.useState(Date.parse();props.datum)*/
    const [datum, setDatum] = React.useState(new Date(Date.parse(props.datum)))
    console.log(datum);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Modal show={true} onHide={props.zatvori}>
                <Modal.Header closeButton>
                    <Modal.Title>Izmena termina dogadjaja</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="date">
                            <Form.Label>Datum</Form.Label>
                            <Form.Control
                                type="date"
                                autoFocus

                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="time">
                            <Form.Label>Vreme</Form.Label>
                            <Form.Control
                                type="time"

                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.zatvori}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => {
                        var ret = new Date(document.getElementById("date").value)
                        var hours = document.getElementById("time").value
                        ret.setHours(hours.split(':')[0], hours.split(':')[1])
                        console.log(ret)
                        setDatum(ret)
                        props.cuvajIzmene(ret)
                    }}>
                        Sacuvaj izmene
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}