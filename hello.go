package main

import (
    "fmt"
    "os"
)

func GenerateTitle(name string) string {
    message := fmt.Sprintf("Hello, %s! 👋", name)
    return message
}

func main() {
    fmt.Println(GenerateTitle(os.Args[1]))
}

