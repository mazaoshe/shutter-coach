---
title: "JSON Processing in Golang"
description: "Learn how to encode and decode JSON data in Golang using the encoding/json package with structs and maps. Practical Golang code examples for JSON handling."
date: 2025-08-16T15:30:00+08:00
draft: false
categories: ["Json"]
tags: 
  - "json"
  - "encoding"
  - "decoding"
  - "data"
  - "Code Example"
slug: "go-json-processing"
keywords: "Golang JSON processing, JSON encoding decoding, Go encoding/json package, JSON marshal unmarshal example, Golang data serialization"
---

## JSON Processing in Golang

Learn how to encode and decode JSON data in Golang using the encoding/json package with structs and maps. This practical Golang code example shows you how to handle JSON serialization and deserialization in Go programming.

```go
package main

import (
    "encoding/json"
    "fmt"
    "log"
)

// Define a struct that matches the JSON structure
type Person struct {
    Name    string `json:"name"`
    Age     int    `json:"age"`
    Email   string `json:"email"`
}

func main() {
    // Marshal (encode) a struct to JSON
    person := Person{
        Name:  "John Doe",
        Age:   30,
        Email: "john.doe@example.com",
    }
    
    jsonData, err := json.Marshal(person)
    if err != nil {
        log.Fatal("Error marshaling JSON:", err)
    }
    
    fmt.Println("Marshaled JSON:")
    fmt.Println(string(jsonData))
    
    // Unmarshal (decode) JSON to a struct
    var decodedPerson Person
    jsonStr := `{"name":"Jane Smith","age":25,"email":"jane.smith@example.com"}`
    
    err = json.Unmarshal([]byte(jsonStr), &decodedPerson)
    if err != nil {
        log.Fatal("Error unmarshaling JSON:", err)
    }
    
    fmt.Println("\nUnmarshaled struct:")
    fmt.Printf("Name: %s\n", decodedPerson.Name)
    fmt.Printf("Age: %d\n", decodedPerson.Age)
    fmt.Printf("Email: %s\n", decodedPerson.Email)
}
```

## Explanation

1. Define a struct with JSON tags to map Go fields to JSON keys. The tags specify the exact key names in the JSON.

2. Use `json.Marshal()` to convert a Go struct into JSON bytes. Check for errors during marshaling.

3. Use `json.Unmarshal()` to convert JSON bytes into a Go struct. Pass a pointer to the destination variable.

4. JSON tags in struct fields (like `json:"name"`) control how fields are serialized/deserialized.

5. The example shows both marshaling a struct to JSON and unmarshaling JSON back to a struct.

This approach works well with known data structures. For dynamic or unknown JSON structures, you can use `map[string]interface{}` instead of structs.