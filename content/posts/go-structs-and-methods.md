---
title: "Go Structs and Methods"
description: "Learn how to define and use structs and methods in Go, including struct embedding and method receivers."
date: 2025-08-17T14:00:00+08:00
draft: false
categories: ["concurrency"]
tags: 
  - "struct"
  - "method"
  - "embedding"
  - "receiver"
  - "Code Example"
slug: "go-structs-and-methods"
keywords: "Go structs, Go methods, struct embedding, method receivers, Go programming structs"
---

## Go Structs and Methods

Learn how to define and use structs and methods in Go, including struct embedding and method receivers.

```go
package main

import (
    "fmt"
    "math"
)

// Define a struct
type Person struct {
    FirstName string
    LastName  string
    Age       int
}

// Method with value receiver
func (p Person) FullName() string {
    return p.FirstName + " " + p.LastName
}

// Method with pointer receiver
func (p *Person) HaveBirthday() {
    p.Age++
}

// Define another struct
type Point struct {
    X, Y float64
}

// Method with value receiver
func (p Point) Distance(q Point) float64 {
    return math.Sqrt(math.Pow(p.X-q.X, 2) + math.Pow(p.Y-q.Y, 2))
}

// Struct embedding
type Employee struct {
    Person
    Position string
    Salary   float64
}

// Method that overrides embedded struct method
func (e Employee) FullName() string {
    return fmt.Sprintf("%s (%s)", e.Person.FullName(), e.Position)
}

// Interface for demonstration
type Greeter interface {
    Greet() string
}

// Method that satisfies the Greeter interface
func (p Person) Greet() string {
    return "Hello, my name is " + p.FullName()
}

func (e Employee) Greet() string {
    return "Hello, I'm " + e.FullName() + " and I work here"
}

// Function that takes the interface
func introduce(g Greeter) {
    fmt.Println(g.Greet())
}

func main() {
    // Create instances of structs
    person := Person{
        FirstName: "John",
        LastName:  "Doe",
        Age:       30,
    }
    
    point1 := Point{X: 0, Y: 0}
    point2 := Point{X: 3, Y: 4}
    
    // Use methods
    fmt.Println("Person's full name:", person.FullName())
    fmt.Printf("Distance between points: %.2f\n", point1.Distance(point2))
    
    // Use pointer receiver method
    fmt.Printf("Age before birthday: %d\n", person.Age)
    person.HaveBirthday()
    fmt.Printf("Age after birthday: %d\n", person.Age)
    
    // Struct embedding
    employee := Employee{
        Person: Person{
            FirstName: "Jane",
            LastName:  "Smith",
            Age:       25,
        },
        Position: "Software Engineer",
        Salary:   75000,
    }
    
    fmt.Println("Employee's full name:", employee.FullName())
    fmt.Printf("Employee's age: %d\n", employee.Age) // Access embedded field
    
    // Interface usage
    introduce(person)
    introduce(employee)
}
```

### Explanation

1. Structs in Go are collections of fields. They're defined with the `type` keyword followed by the struct name and fields.

2. Methods are functions with a receiver argument. The receiver appears between the `func` keyword and the method name.

3. There are two types of receivers:
   - Value receivers: `func (p Person) MethodName()` - operates on a copy of the struct
   - Pointer receivers: `func (p *Person) MethodName()` - operates on the original struct, allowing modifications

4. Struct embedding allows one struct to include another struct anonymously, inheriting its fields and methods.

5. When embedding structs, methods of the embedded struct become available on the embedding struct.

6. Methods can satisfy interfaces automatically if their signatures match.

7. In the example, both Person and Employee have Greet() methods, so both satisfy the Greeter interface.

Structs and methods are fundamental to object-oriented programming in Go, providing encapsulation and behavior definition.