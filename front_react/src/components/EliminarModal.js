import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from "axios";

export function ModalEliminar({placa,modelo}) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleDelete = async function(){
    await axios.delete(`http://${global.ip}:4000/car/${placa}`,{ crossdomain: true });
    console.log("Eliminado")
    setShow(false);
    window.location.reload()
  }




  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Eliminar
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>¿Desea eliminar ese carro?</Modal.Title>
        </Modal.Header>
        <Modal.Body>Placa: {placa} <br></br> Modelo: {modelo}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleDelete}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}