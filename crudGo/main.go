package main

import (
	"context"
	"crudGo/controllers"
	"fmt"
	"net/http"
	"time"

	"github.com/gorilla/mux"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var (
	usr = "joddie"
	pwd = "Huitzi12"
	//host = "host.docker.internal"
	//host    = "172.17.0.2"
	host = "database"
	//host    = "localhost"
	port    = "27017"
	databse = "practica1"
)
var client *mongo.Client

func main() {
	uri := fmt.Sprintf("mongodb://%s:%s", host, port)
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	client, err := mongo.Connect(ctx, options.Client().ApplyURI(uri))
	if err != nil {
		fmt.Println(err)
		panic(err.Error())
	}
	//err = client.Connect(ctx)
	router := mux.NewRouter()
	/*
		router.HandleFunc("/create/{placa}&{color}&{marca}&{serie}&{modelo}", controllers.Create(client)).Methods("POST")
	*/
	router.HandleFunc("/car", controllers.Create(client)).Methods("POST")
	router.HandleFunc("/cars", controllers.GetCars(client)).Methods("GET")
	router.HandleFunc("/logs", controllers.GetLogs(client)).Methods("GET")
	router.HandleFunc("/car/{placa}", controllers.GetCar(client)).Methods("GET")
	router.HandleFunc("/car/{placa}&{color}&{marca}&{serie}&{modelo}",
		controllers.Update(client)).Methods("PUT")
	router.HandleFunc("/car/{placa}", controllers.Delete(client)).Methods("DELETE", "OPTIONS")
	fmt.Println("App running...")

	http.ListenAndServe(":4000", router)
}
