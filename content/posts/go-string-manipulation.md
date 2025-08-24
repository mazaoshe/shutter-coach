---
title: "Go String Manipulation"
description: "Learn common string manipulation techniques in Go, including formatting, searching, and modifying strings using the strings package."
date: 2025-08-17T17:00:00+08:00
draft: false
categories: ["Strings"]
tags: 
  - "strings"
  - "manipulation"
  - "formatting"
  - "text processing"
  - "Code Example"
slug: "go-string-manipulation"
keywords: "Go string manipulation, string formatting, strings package, text processing in Go, Go string functions"
---

## Go String Manipulation

Learn common string manipulation techniques in Go, including formatting, searching, and modifying strings using the strings package.

```go
package main

import (
    "fmt"
    "strings"
)

func main() {
    text := "Hello, World! Welcome to Go programming."
    
    // String formatting
    name := "Alice"
    age := 30
    formatted := fmt.Sprintf("Name: %s, Age: %d", name, age)
    fmt.Println(formatted)
    
    // String operations using strings package
    fmt.Println("Original text:", text)
    fmt.Println("To uppercase:", strings.ToUpper(text))
    fmt.Println("To lowercase:", strings.ToLower(text))
    fmt.Println("Length:", len(text))
    
    // Searching
    fmt.Println("Contains 'World':", strings.Contains(text, "World"))
    fmt.Println("Index of 'World':", strings.Index(text, "World"))
    
    // Splitting and joining
    words := strings.Fields(text) // Split by whitespace
    fmt.Println("Words:", words)
    
    parts := strings.Split(text, ",") // Split by comma
    fmt.Println("Parts:", parts)
    
    joined := strings.Join([]string{"Hello", "Go", "World"}, "-")
    fmt.Println("Joined:", joined)
    
    // Replacing
    replaced := strings.Replace(text, "World", "Go", -1) // -1 means replace all
    fmt.Println("Replaced:", replaced)
    
    // Trimming
    spacedText := "  Hello, World!  "
    fmt.Println("Trimmed:", strings.TrimSpace(spacedText))
}
```

### Explanation

1. Go strings are UTF-8 encoded and immutable. Operations that modify strings create new strings.

2. Use `fmt.Sprintf` for string formatting with placeholders like `%s` for strings and `%d` for integers.

3. The `strings` package provides many useful functions for string manipulation:
   - `ToUpper` and `ToLower` for case conversion
   - `Contains` and `Index` for searching
   - `Fields` and `Split` for breaking strings apart
   - `Join` for combining strings
   - `Replace` for substituting parts of strings
   - `TrimSpace` and other trimming functions

4. `len()` returns the number of bytes in a string, not necessarily the number of characters for multi-byte UTF-8 characters.

5. For more complex string operations, consider using regular expressions with the `regexp` package.

String manipulation is a fundamental part of most Go programs, especially when processing text data, parsing input, or generating output.