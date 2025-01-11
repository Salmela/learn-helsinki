package main

import (
	"errors"
	"fmt"
)

func generateTitle(name string) (string, error) {
	if len(name) < 3 {
		return "", errors.New("Too short name")
	}
	message := fmt.Sprintf("Hello, %s! 👋", name)
	return message, nil
}
