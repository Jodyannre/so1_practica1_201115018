import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";

export function ModalCrear() {
  const [show, setShow] = useState(false);
  const [color, setColor] = useState("");
  const [marca, setMarca] = useState("");
  const [placa, setPlaca] = useState("");
  const [modelo, setModelo] = useState("");
  const [serie, setSerie] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCreate = async function () {
    const data = {
      placa: placa,
      marca: marca,
      serie: serie,
      color: color,
      modelo: modelo,
    };
    /*
    await axios.post(
      `http://${global.ip}:4000/car/`,
      newCar,{ crossdomain: true }
    );
    */

    const res = axios.get(
        `http://${global.ip}:4000/create/${placa}&${color}&${marca}&${serie}&${modelo}`,
        { crossdomain: true, headers: {"Access-Control-Allow-Origin": "*"} }
      );
  

    console.log("Creado.");
    setShow(false);
    //window.location.reload();
  };

  const onChangeColor = (e) => {
    setColor(e.target.value);
  };

  const onChangeMarca = (e) => {
    setMarca(e.target.value);
  };

  const onChangeModelo = (e) => {
    setModelo(e.target.value);
  };

  const onChangeSerie = (e) => {
    setSerie(e.target.value);
  };

  const onChangePlaca = (e) => {
    setPlaca(e.target.value);
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Crear nuevo
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Crear carro</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="form-group">
              <label for="formGroupExampleInput">Placa</label>
              <input
                type="text"
                className="form-control"
                id="disabledInput"
                placeholder="Example input"
                onChange={onChangePlaca}
                value={placa}
              />
            </div>
            <div className="form-group">
              <label for="formGroupExampleInput2">Marca</label>
              <input
                type="text"
                className="form-control"
                id="formGroupExampleInput2"
                placeholder="Another input"
                onChange={onChangeMarca}
                value={marca}
              />
            </div>
            <div className="form-group">
              <label for="formGroupExampleInput2">Modelo</label>
              <input
                type="text"
                className="form-control"
                id="formGroupExampleInput2"
                placeholder="Another input"
                onChange={onChangeModelo}
                value={modelo}
              />
            </div>
            <div className="form-group">
              <label for="formGroupExampleInput2">Serie</label>
              <input
                type="text"
                className="form-control"
                id="formGroupExampleInput2"
                placeholder="Another input"
                onChange={onChangeSerie}
                value={serie}
              />
            </div>
            <div className="form-group">
              <label for="formGroupExampleInput2">Color</label>
              <input
                type="text"
                className="form-control"
                id="formGroupExampleInput2"
                placeholder="Another input"
                onChange={onChangeColor}
                value={color}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleCreate}>
            Crear
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
