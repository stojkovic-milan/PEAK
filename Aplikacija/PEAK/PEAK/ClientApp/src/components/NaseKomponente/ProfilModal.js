import React from "react";
import { render } from "react-dom";
import Modal from "react-bootstrap/Modal"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import axios from "axios"

export default function ProfilModal(props) {
    console.log("Crtam profil modal")
    const [show, setShow] = React.useState(true);
    const [person, setPerson] = React.useState(props.person)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [slika, setSlika] = React.useState({});

    function onFileChange(event) {

        // Update the state
        //var slika = { ...person.profilnaSlika };
        //slika=event.target.files[0]
        //setPerson(slika);
        setSlika(event.target.files[0])
        console.log(slika);
    };
    //onFileUpload = () => {

    //    // Create an object of formData
    //    const formData = new FormData();

    //    // Update the formData object
    //    formData.append(
    //        "myFile",
    //        this.state.selectedFile,
    //        this.state.selectedFile.name
    //    );
  return (
        <>
          <Modal show={true} onHide={props.zatvori}>
                <Modal.Header closeButton>
                    <Modal.Title>Izmena podataka o korisniku</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Ime</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder={props.person.ime}
                              autoFocus
                              value={person.ime}
                              onChange={(event) => { setPerson({ ...person, ime:event.target.value})}}
                            />
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                          <Form.Label>Prezime</Form.Label>
                          <Form.Control
                              type="text"
                              placeholder={props.person.prezime}
                              value={person.prezime}
                              onChange={(event) => { setPerson({ ...person, prezime: event.target.value }) }}
                          />
                      </Form.Group>
                      <Form.Group className="mb-3">
                          <Form.Label>Email</Form.Label>
                          <Form.Control placeholder={props.person.email} disabled />
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                          <Form.Label>Broj Telefona</Form.Label>
                          <Form.Control
                              type="text"
                              placeholder={props.person.phoneNumber}
                              value={person.phoneNumber}
                              onChange={(event) => { setPerson({ ...person, phoneNumber: event.target.value }) }}
                          />
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
                          <Form.Label>Spremnost</Form.Label>
                          <Form.Control
                              type="number"
                              min="1"
                              max="10"
                              placeholder={props.person.spremnost}
                              value={person.spremnost}
                              onChange={(event) => { setPerson({ ...person, spremnost: event.target.value }) }}
                          />
                      </Form.Group>
                      <Form.Group controlId="formFile" className="mb-3" onChange={(event) => { setSlika(event.target.files[0]) }}>
                          <Form.Label>Profila slika</Form.Label>
                          <Form.Control type="file" />
                      </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.zatvori}>
                        Close
                  </Button>
                  <Button variant="primary" onClick={() => {
                      const formData = new FormData();
                      formData.append("file", slika)

                      const res = axios.post("https://localhost:5001/files/postaviSliku", formData)
                      var link;
                      res.then(p => {link=p.data
                          setPerson({
                              ime: document.getElementById("exampleForm.ControlInput1").value,
                              prezime: document.getElementById("exampleForm.ControlInput2").value,
                              phoneNumber: document.getElementById("exampleForm.ControlInput3").value,
                              spremnost: document.getElementById("exampleForm.ControlInput4").value,
                              id: props.person.id,
                              email: props.person.email,
                              profilnaSlika:link
                              })
                              props.cuvajIzmene(person);
                              props.zatvori
                      })
                  }}>
                        Sacuvaj izmene
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}