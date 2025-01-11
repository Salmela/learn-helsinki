package main

import (
    "fmt"
    "os"
)

func main() {
    if (len(os.Args) > 1) {
        fmt.Println(generateTitle(os.Args[1]))
    } else {
        fmt.Printf("USAGE: %s NAME\n", os.Args[0])
    }
}

