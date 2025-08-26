---
title: "Golang Interfaces"
description: "Learn how to use interfaces in Golang to write flexible and testable code, including interface definition and implementation with practical Go programming examples."
date: 2025-08-17T12:00:00+08:00
draft: false
categories: ["concurrency"]
tags: 
  - "interface"
  - "polymorphism"
  - "abstraction"
  - "duck typing"
  - "Code Example"
slug: "go-interfaces"
keywords: "Golang interfaces, interface implementation, polymorphism in Go, Golang duck typing, interface design patterns, Go interface examples"
---

## Golang Interfaces

Learn how to use interfaces in Golang to write flexible and testable code, including interface definition and implementation with practical Go programming examples. These Golang code snippets demonstrate how to leverage interfaces for abstraction and polymorphism in your Go applications.

```go
package main

import "fmt"

// Define an interface
type Speaker interface {
    Speak() string
}

// Define structs that implement the interface
type Dog struct {
    Name string
}

func (d Dog) Speak() string {
    return "Woof! My name is " + d.Name
}

type Cat struct {
    Name string
}

func (c Cat) Speak() string {
    return "Meow! My name is " + c.Name
}

type Robot struct {
    Model string
}

func (r Robot) Speak() string {
    return "Beep! I am robot " + r.Model
}

// Function that accepts any Speaker
func introduce(speaker Speaker) {
    fmt.Println(speaker.Speak())
}

// Interface for shape calculations
type Shape interface {
    Area() float64
    Perimeter() float64
}

type Rectangle struct {
    Width, Height float64
}

func (r Rectangle) Area() float64 {
    return r.Width * r.Height
}

func (r Rectangle) Perimeter() float64 {
    return 2 * (r.Width + r.Height)
}

type Circle struct {
    Radius float64
}

func (c Circle) Area() float64 {
    return 3.14159 * c.Radius * c.Radius
}

func (c Circle) Perimeter() float64 {
    return 2 * 3.14159 * c.Radius
}

func printShapeInfo(s Shape) {
    fmt.Printf("Area: %.2f, Perimeter: %.2f\n", s.Area(), s.Perimeter())
}

func main() {
    // Create instances
    dog := Dog{Name: "Buddy"}
    cat := Cat{Name: "Whiskers"}
    robot := Robot{Model: "R2D2"}
    
    // Call introduce with different types
    introduce(dog)
    introduce(cat)
    introduce(robot)
    
    fmt.Println("\nShape calculations:")
    rect := Rectangle{Width: 10, Height: 5}
    circle := Circle{Radius: 3}
    
    printShapeInfo(rect)
    printShapeInfo(circle)
}
```

### Explanation

1. Interfaces in Go define behavior through method signatures. They're defined with the `type` keyword followed by the interface name and method signatures.

2. Any type that implements all methods of an interface automatically satisfies that interface - there's no explicit declaration of implementation.

3. Interfaces enable polymorphism - functions can accept any type that implements the interface.

4. The `Speaker` interface has one method `Speak() string`. Dog, Cat, and Robot all implement this method, so they all satisfy the Speaker interface.

5. The `Shape` interface demonstrates an interface with multiple methods. Both Rectangle and Circle implement Area() and Perimeter().

6. Interface values can hold any concrete value that implements the interface.

Interfaces are central to Go's type system and enable flexible, testable code through composition rather than inheritance.