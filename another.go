package main

import (
    "fmt"
)


func generateTitle(name string) string {
    message := fmt.Sprintf("Hello, %s! 👋", name)
    return message
}
