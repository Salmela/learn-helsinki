package main

import (
	"context"
	"encoding/json"
	"fmt"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
	"io/ioutil"
	"log"
	"net/http"
)

type Question struct {
	Type    string `json:"type"`
	Subject string `json:"subject"`
	Answer  string `json:"answer"`
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
			var parsedBody Question
			err2 := json.Unmarshal(body, &parsedBody)
			if err2 != nil {
				log.Panicf("Parsing failed: %v\n", err2)
			}
			_, err3 := connection.Query(context.Background(), "INSERT INTO questions (type, subject, answer) VALUES ($1, $2, $3)", parsedBody.Type, parsedBody.Subject, parsedBody.Answer)
			if err3 != nil {
				log.Panicf("Query failed: %v\n", err3)
			}
			fmt.Fprintf(response, string(body))
		} else {
			rows, err := connection.Query(context.Background(), "SELECT type, subject, answer FROM questions ORDER BY random() LIMIT 5")
			if err != nil {
				log.Panicf("QueryRow failed: %v\n", err)
			}

			questions, err := pgx.CollectRows(rows, pgx.RowToStructByName[Question])
			if err != nil {
				log.Panicf("Collecting rows failed: %v", err)
			}

			data, err2 := json.Marshal(questions)
			if err2 != nil {
				log.Panicf("Json stringify failed: %v\n", err2)
				return
			}
			response.Write(data)
		}
	})

	log.Fatal(server.ListenAndServe())
}
