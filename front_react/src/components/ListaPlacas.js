import React, { Component } from "react";
import axios from "axios";

export default class ListaPlacas extends Component {
  state = {
    cars: [],
  };

  async componentDidMount() {
    const res = await axios.get("http://localhost:4000/cars");
    this.setState({ cars: res.data });
  }
  onChangeHandler = event => {
    const value = event.target.value;
    console.log(value)
  }

  render() {
    return (
        <div>
        <select onChange={this.onChangeHandler} name="carros" value={this.state.cars.color}>
        {this.state.cars.map((e, key) => {
            return <option key={e.color} value={e.color}>{e.color}</option>;
        })}
        </select>
        <select onChange={this.onChangeHandler} name="carros" value={this.state.cars.marca}>
        {this.state.cars.map((e, key) => {
            return <option key={e.marca} value={e.marca}>{e.marca}</option>;
        })}
        </select>
        <select onChange={this.onChangeHandler} name="carros" value={this.state.cars.serie}>
        {this.state.cars.map((e, key) => {
            return <option key={e.serie} value={e.serie}>{e.serie}</option>;
        })}
        </select>
        </div>
    )
  }
}
