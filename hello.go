package main

import (
	"context"
	"fmt"
	"github.com/jackc/pgx/v5"
	"log"
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

	if len(os.Args) > 1 {
		result, err := generateTitle(os.Args[1])
		if err != nil {
			log.Fatal(err)
		}
		fmt.Println(result)
	} else {
		fmt.Printf("USAGE: %s NAME\n", os.Args[0])
	}
}
