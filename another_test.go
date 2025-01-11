package main

import (
    "testing"
)

func TestGenerateTitle(t *testing.T) {
    name := "Aleksi"
    want := "Hello, Aleksi! 👋"
    result, err := generateTitle(name)
    if !(result == want && err == nil) {
        t.Fatalf(`Hello("%s") = %q, %v, want %s, nil`, name, result, err, want)
    }
}

func TestShortName(t *testing.T) {
    name := "ab"
    result, err := generateTitle(name)
    if !(result == "" && err != nil) {
        t.Fatalf(`Hello("%s") = %q, %v, want "", error`, name, result, err)
    }
}
