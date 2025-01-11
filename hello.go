package main

import (
    "fmt"
    "os"
    "log"
)

func main() {
    log.SetPrefix("LOG: ")
    log.SetFlags(0)

    if (len(os.Args) > 1) {
        result, err := generateTitle(os.Args[1])
        if err != nil {
            log.Fatal(err)
        }
        fmt.Println(result)
    } else {
        fmt.Printf("USAGE: %s NAME\n", os.Args[0])
    }
}

