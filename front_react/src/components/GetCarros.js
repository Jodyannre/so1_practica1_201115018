import React, { Component } from "react";
import axios from "axios";
import { ModalEliminar } from "./EliminarModal";
import { ModalEditar } from "./EditarModal";

var colores = []
var marcas = []
var series = []
var modelos = []

export default class CreateCar extends Component {
  state = {
    cars: [],
    filtroColor: "",
    filtroMarca: "",
    filtroModelo: "",
    filtroSerie: "",
  };

  async componentDidMount() {
    const res = await axios.get(`http://${global.ip}:4000/cars`);
    this.setState({ cars: res.data });
    console.log(res);
  }

  cambioColor = event => {
    const value = event.target.value;
    console.log(value)
    this.setState({filtroColor:value})
  }  

  cambioModelo = event => {
    const value = event.target.value;
    console.log(value)
    this.setState({filtroModelo:value})
  }  

  cambioMarca = event => {
    const value = event.target.value;
    console.log(value)
    this.setState({filtroMarca:value})
  }  

  cambioSerie = event => {
    const value = event.target.value;
    console.log(value)
    this.setState({filtroSerie:value})
  }  


  //Tabla de resultados

  render() {
    colores = []
    marcas = []
    series = []
    modelos = []
    if (this.state.cars != null){
    return (
      <div className="row">
        <div className="row">
        <div>
        <select onChange={this.cambioColor} name="color" value={this.state.filtroColor}>
        <option key={""} value={""}>{""}</option>
        {this.state.cars.map((e, key) => {
            var repetido = colores.find(el => el == e.color) != undefined ? true:false
            colores.push(e.color)
            if (!repetido){
                return <option key={e.color} value={e.color}>{e.color}</option>;
            }
        })}
        </select>
        <select onChange={this.cambioMarca} name="marca" value={this.state.filtroMarca}>
        <option key={""} value={""}>{""}</option>
        {this.state.cars.map((e, key) => {
            var repetido = marcas.find(el => el == e.marca) != undefined ? true:false
            marcas.push(e.marca)
            if (!repetido){
                return <option key={e.marca} value={e.marca}>{e.marca}</option>;
            }      
        })}
        </select>
        <select onChange={this.cambioSerie} name="serie" value={this.state.filtroSerie}>
        <option key={""} value={""}>{""}</option>
        {this.state.cars.map((e, key) => {
            var repetido = series.find(el => el == e.serie) != undefined ? true:false
            series.push(e.serie)
            if (!repetido){
                return <option key={e.serie} value={e.serie}>{e.serie}</option>;
            }    
            
        })}
        </select>
        <select onChange={this.cambioModelo} name="modelo" value={this.state.filtroModelo}>
        <option key={""} value={""}>{""}</option>
        {this.state.cars.map((e, key) => {
            var repetido = modelos.find(el => el == e.modelo) != undefined ? true:false
            modelos.push(e.modelo)
            if (!repetido){
                return <option key={e.modelo} value={e.modelo}>{e.modelo}</option>;
            }    
            
        })}
        </select>
        </div>            

        </div>
        <table className="table table-striped table-dark">
          <thead>
            <tr>
              <th scope="col">Placa</th>
              <th scope="col">Marca</th>
              <th scope="col">Modelo</th>
              <th scope="col">Serie</th>
              <th scope="col">Color</th>
            </tr>
          </thead>
          <tbody>
            {this.state.cars
              .filter((car) =>
                this.state.filtroColor != ""
                  ? car.color.includes(this.state.filtroColor)
                  : car.color
              )
              .filter((car) =>
                this.state.filtroMarca != ""
                  ? car.marca.includes(this.state.filtroMarca)
                  : car.marca
              )
              .filter((car) =>
                this.state.filtroModelo != ""
                  ? car.modelo==(this.state.filtroModelo)
                  : car.modelo
              )
              .filter((car) =>
                this.state.filtroSerie != ""
                  ? car.serie.includes(this.state.filtroSerie)
                  : car.serie
              )
              .map((car) => (
                <tr>
                  <th scope="row">{car.placa}</th>
                  <td>{car.marca}</td>
                  <td>{car.modelo}</td>
                  <td>{car.serie}</td>
                  <td>{car.color}</td>
                  <td>
                    <ModalEliminar placa={car.placa} modelo={car.modelo}/>
                  </td>
                  <td>
                    <ModalEditar placa={car.placa} modelo={car.modelo} serie={car.serie} marca={car.marca} color={car.color}/>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    );
    }else{

        return (

<table className="table table-striped table-dark">
          <thead>
            <tr>
              <th scope="col">Placa</th>
              <th scope="col">Marca</th>
              <th scope="col">Modelo</th>
              <th scope="col">Serie</th>
              <th scope="col">Color</th>
            </tr>
          </thead>
          <tbody>
          </tbody>
        </table>
        )
    } 
  }
}
