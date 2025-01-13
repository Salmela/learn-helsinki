package main

import (
	"context"
	"fmt"
	"github.com/jackc/pgx/v5"
	"io/ioutil"
	"log"
	"net/http"
	"os"
)

func main() {
	log.SetPrefix("LOG: ")
	log.SetFlags(0)

	conn, err := pgx.Connect(context.Background(), "postgres://postgres:example@172.17.0.1:5432/asker")
	if err != nil {
		fmt.Fprintf(os.Stderr, "Unable to connect to database: %v\n", err)
		os.Exit(1)
	}
	defer conn.Close(context.Background())

	address := ":8082"
	fmt.Printf("Starting server at port %s\n", address)

	mux_serve := http.NewServeMux()
	server := &http.Server{
		Addr:    address,
		Handler: mux_serve,
	}

	mux_serve.HandleFunc("/questions", func(response http.ResponseWriter, request *http.Request) {
		response.Header().Set("Access-Control-Allow-Origin", "*")

		if request.Method == "POST" {
			body, err := ioutil.ReadAll(request.Body)
			if err != nil {
				log.Fatal(err)
				return
			}
			fmt.Fprintf(response, string(body))
		} else {
			// We are sending the answer polygon to frontend which is not really secure nor necessary, but it makes the code easier for now
			fmt.Fprintf(response, "{\"type\": \"where\", \"subject\": \"steissi\", \"answer\": [[60.17289589344101,24.93902919252459],[60.173002620382846,24.943321029970306],[60.17195668140074,24.94338540753199],[60.17193533536047,24.94254849923009],[60.17072926155439,24.94269871354068],[60.17071858813724,24.94029528457108],[60.17225552450813,24.940166529447716],[60.17226619742596,24.93902919252459]]}")
		}
	})

	log.Fatal(server.ListenAndServe())
}
