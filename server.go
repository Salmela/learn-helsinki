package main

import (
	"context"
	"encoding/json"
	"fmt"
	"github.com/jackc/pgx/v5/pgxpool"
	"io/ioutil"
	"log"
	"net/http"
)

type QuestionCreationRequest struct {
	Type    string
	Subject string
	Answer  string
}

func initDatabase(connection *pgxpool.Pool) {
	_, err := connection.Query(context.Background(), "CREATE TABLE IF NOT EXISTS questions (type varchar(40), subject varchar(256), answer varchar(4096))")
	if err != nil {
		log.Panicf("QueryRow failed: %v\n", err)
	}
}

func main() {
	log.SetPrefix("LOG: ")
	log.SetFlags(0)

	// TODO: is there some nice ORM for go
	connection, err := pgxpool.New(context.Background(), "postgres://postgres:example@172.17.0.1:5432/asker")
	if err != nil {
		log.Panicf("Unable to connect to database: %v\n", err)
	}
	defer connection.Close()

	initDatabase(connection)

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
				log.Panicf("Reading response body failed: %v\n", err)
			}
			var parsedBody QuestionCreationRequest
			err2 := json.Unmarshal(body, &parsedBody)
			if err2 != nil {
				log.Panicf("Parsing failed: %v\n", err2)
			}
			_, err3 := connection.Query(context.Background(), "INSERT INTO questions (type, subject, answer) VALUES ($1, $2, $3)", parsedBody.Type, parsedBody.Subject, parsedBody.Answer)
			if err3 != nil {
				log.Panicf("QueryRow failed: %v\n", err3)
			}
			fmt.Fprintf(response, string(body))
		} else {
			// We are sending the answer polygon to frontend which is not really secure nor necessary, but it makes the code easier for now
			fmt.Fprintf(response, "{\"type\": \"where\", \"subject\": \"steissi\", \"answer\": [[60.17289589344101,24.93902919252459],[60.173002620382846,24.943321029970306],[60.17195668140074,24.94338540753199],[60.17193533536047,24.94254849923009],[60.17072926155439,24.94269871354068],[60.17071858813724,24.94029528457108],[60.17225552450813,24.940166529447716],[60.17226619742596,24.93902919252459]]}")
		}
	})

	log.Fatal(server.ListenAndServe())
}
