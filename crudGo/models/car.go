package models

import "time"

//Datos de los carros
type Car struct {
	//ID   primitive.ObjectID `json:"_id,omitempty" bison:"_id,omitempty"`
	Placa  string `json:"placa" bison:"placa,omitempty"`
	Marca  string `json:"marca" bison:"marca,omitempty"`
	Modelo int    `json:"modelo" bison:"modelo,omitempty"`
	Serie  string `json:"serie" bison:"serie,omitempty"`
	Color  string `json:"color" bison:"color,omitempty"`
}

//Lista de carros
type Cars []Car

//Log
type Log struct {
	Placa string    `json:"placa" bison:"placa,omitempty"`
	Func  string    `json:"func" bison:"func,omitempty"`
	Time  time.Time `json:"time" bison:"time,omitempty"`
}

//Lista de logs
type Logs []Log
