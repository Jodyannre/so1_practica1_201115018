package controllers

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"
	"time"

	model "crudGo/models"

	"github.com/gorilla/mux"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

//Create
/*
func Create(client *mongo.Client) http.HandlerFunc {
	return func(res http.ResponseWriter, req *http.Request) {
		res.Header().Add("content-type", "application/json")
		res.Header().Add("Access-Control-Allow-Origin", "*")
		res.Header().Add("Access-Control-Allow-Headers", "Content-Type")
		res.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
		res.Header().Set("Access-Control-Allow-Headers", "Accept, Accept-Language, Content-Type")
		enableCors(res)
		var car model.Car
		var placa string
		json.NewDecoder(req.Body).Decode(&car)
		fmt.Println("Si entro aqui")
		fmt.Println(car)
		placa = car.Placa
		collection := client.Database("practica1").Collection("cars")
		ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
		result, _ := collection.InsertOne(ctx, car)
		json.NewEncoder(res).Encode(result)
		createLog(client, placa, "Create")
	}
}
*/

func Create(client *mongo.Client) http.HandlerFunc {
	return func(res http.ResponseWriter, req *http.Request) {
		//res.Header().Set("content-type", "application/json")
		enableCors(res)
		res.Header().Add("content-type", "application/json")
		res.Header().Add("Access-Control-Allow-Origin", "*")
		res.Header().Add("Access-Control-Allow-Headers", "Content-Type")
		res.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
		res.Header().Set("Access-Control-Allow-Headers", "Accept, Accept-Language, Content-Type")
		/*
			params := mux.Vars(req)
			placa, _ := params["placa"]
			color, _ := params["color"]
			marca, _ := params["marca"]
			serie, _ := params["serie"]
			modelo, _ := strconv.Atoi(params["modelo"])
			var car model.Car = model.Car{
				Placa:  placa,
				Marca:  marca,
				Serie:  serie,
				Modelo: modelo,
				Color:  color,
			}
		*/
		var car model.Car
		var placa string
		fmt.Println(car)
		json.NewDecoder(req.Body).Decode(&car)
		placa = car.Placa
		collection := client.Database("practica1").Collection("cars")
		ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
		result, _ := collection.InsertOne(ctx, car)
		json.NewEncoder(res).Encode(result)
		createLog(client, placa, "Create")
	}
}

//Create Log
func createLog(client *mongo.Client, placa string, funcion string) {
	var log model.Log = model.Log{
		Placa: placa,
		Func:  funcion,
		Time:  time.Now().Format("2006-01-02 15:04:05"),
	}
	collection := client.Database("practica1").Collection("logs")
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	collection.InsertOne(ctx, log)
}

//Read
func GetCars(client *mongo.Client) http.HandlerFunc {
	return func(res http.ResponseWriter, req *http.Request) {
		res.Header().Add("content-type", "application/json")
		enableCors(res)
		var cars model.Cars
		collection := client.Database("practica1").Collection("cars")
		ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
		cursor, err := collection.Find(ctx, bson.M{})
		if err != nil {
			res.WriteHeader(http.StatusInternalServerError)
			res.Write([]byte(`{"mensaje": "` + err.Error() + `"}`))
			return
		}
		defer cursor.Close(ctx)
		for cursor.Next(ctx) {
			var car model.Car
			cursor.Decode(&car)
			cars = append(cars, car)
		}
		if err := cursor.Err(); err != nil {
			res.WriteHeader(http.StatusInternalServerError)
			res.Write([]byte(`{"mensaje": "` + err.Error() + `"}`))
			return
		}
		createLog(client, "", "Read")
		json.NewEncoder(res).Encode(cars)
	}
}

//Get logs
//Read
func GetLogs(client *mongo.Client) http.HandlerFunc {
	return func(res http.ResponseWriter, req *http.Request) {
		res.Header().Add("content-type", "application/json")
		enableCors(res)
		var cars model.Logs
		collection := client.Database("practica1").Collection("logs")
		ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
		cursor, err := collection.Find(ctx, bson.M{})
		if err != nil {
			res.WriteHeader(http.StatusInternalServerError)
			res.Write([]byte(`{"mensaje": "` + err.Error() + `"}`))
			return
		}
		defer cursor.Close(ctx)
		for cursor.Next(ctx) {
			var car model.Log
			cursor.Decode(&car)
			cars = append(cars, car)
		}
		if err := cursor.Err(); err != nil {
			res.WriteHeader(http.StatusInternalServerError)
			res.Write([]byte(`{"mensaje": "` + err.Error() + `"}`))
			return
		}
		json.NewEncoder(res).Encode(cars)
	}
}

//Get 1
func GetCar(client *mongo.Client) http.HandlerFunc {
	return func(res http.ResponseWriter, req *http.Request) {
		res.Header().Add("content-type", "application/json")
		enableCors(res)
		params := mux.Vars(req)
		placa, _ := params["placa"]
		filter := bson.M{"placa": placa}
		var car model.Car
		collection := client.Database("practica1").Collection("cars")
		ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)

		err := collection.FindOne(ctx, filter).Decode(&car)
		if err != nil {
			res.WriteHeader(http.StatusInternalServerError)
			res.Write([]byte(`{"mensaje": "` + err.Error() + `"}`))
			return
		}
		json.NewEncoder(res).Encode(car)
		createLog(client, placa, "Read")
	}

}

//Update
func Update(client *mongo.Client) http.HandlerFunc {
	return func(res http.ResponseWriter, req *http.Request) {
		res.Header().Add("content-type", "application/json")
		enableCors(res)
		params := mux.Vars(req)
		placa, _ := params["placa"]
		newColor, _ := params["color"]
		newMarca, _ := params["marca"]
		newSerie, _ := params["serie"]
		newModelo, _ := strconv.Atoi(params["modelo"])
		fmt.Println(newSerie)
		collection := client.Database("practica1").Collection("cars")
		ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
		filter := bson.M{"placa": placa}
		update := bson.M{
			"$set": bson.M{
				"marca":  newMarca,
				"modelo": newModelo,
				"serie:": newSerie,
				"color":  newColor,
			},
		}
		fmt.Println(filter)
		_, err := collection.UpdateOne(ctx, filter, update)
		if err != nil {
			res.WriteHeader(http.StatusInternalServerError)
			res.Write([]byte(`{"mensaje": "` + err.Error() + `"}`))
			return
		}
		json.NewEncoder(res).Encode("Valor actualizado")
		createLog(client, placa, "Update")
	}
}

//Delete
func Delete(client *mongo.Client) http.HandlerFunc {
	return func(res http.ResponseWriter, req *http.Request) {
		res.Header().Add("content-type", "application/json")
		res.Header().Add("Access-Control-Allow-Origin", "*")
		res.Header().Add("Access-Control-Allow-Headers", "Content-Type")
		res.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
		res.Header().Set("Access-Control-Allow-Headers", "Accept, Accept-Language, Content-Type")
		enableCors(res)
		params := mux.Vars(req)
		placa, _ := params["placa"]
		collection := client.Database("practica1").Collection("cars")
		ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
		filter := bson.M{"placa": placa}
		_, err := collection.DeleteOne(ctx, filter)
		if err != nil {
			res.WriteHeader(http.StatusInternalServerError)
			res.Write([]byte(`{"mensaje": "` + err.Error() + `"}`))
			return
		}

		json.NewEncoder(res).Encode("Operación realizada con éxito")
		createLog(client, placa, "Delete")
	}
}

func enableCors(w http.ResponseWriter) {
	(w).Header().Set("Access-Control-Allow-Origin", "*")
	//(w).Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
	(w).Header().Set("Content-Type", "application/json")
}
