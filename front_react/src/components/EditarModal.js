import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";

export function ModalEditar({ placa, modelo, color, marca, serie }) {
  const [show, setShow] = useState(false);
  const [colorA, setColor] = useState(color);
  const [marcaA, setMarca] = useState(marca);
  const [placaA, setPlaca] = useState(placa);
  const [modeloA, setModelo] = useState(modelo);
  const [serieA, setSerie] = useState(serie);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleUpdate = async function () {
    await axios.put(
      `http://${global.ip}:4000/car/${placaA}&${colorA}&${marcaA}&${serieA}&${modeloA.toString()}`,
      { crossdomain: true }
    );
    console.log("Actualizado");
    setShow(false);
    window.location.reload();
  };

  const onChangeColor = (e) => {setColor(e.target.value)};

  const onChangeMarca = (e) => {setMarca(e.target.value)};

  const onChangeModelo = (e) => {setModelo(e.target.value)};

  const onChangeSerie = (e) => {setSerie(e.target.value)};

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Editar
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Editar carro</Modal.Title>
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
                value={placaA}
                disabled
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
                value={marcaA}
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
                value={modeloA}
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
                value={serieA}
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
                value={colorA}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Actualizar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
