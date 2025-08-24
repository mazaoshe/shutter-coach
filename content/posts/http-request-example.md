---
title: "Making HTTP Requests in Go"
description: "Learn how to make HTTP requests in Go using the net/http package with proper error handling and response processing."
date: 2025-08-16T15:00:00+08:00
draft: false
categories: ["Http"]
tags: 
  - "http"
  - "networking"
  - "web"
  - "client"
slug: "go-http-requests"
keywords: "Go HTTP client, making HTTP requests in Go, Go net/http package, HTTP GET request example"
---

## Making HTTP Requests in Go

Learn how to make HTTP requests in Go using the net/http package with proper error handling and response processing.

```go
package main

import (
    "fmt"
    "io"
    "net/http"
)

func main() {
    // Make an HTTP GET request
    resp, err := http.Get("https://jsonplaceholder.typicode.com/posts/1")
    if err != nil {
        fmt.Println("Error making request:", err)
        return
    }
    defer resp.Body.Close()
    
    // Check the response status code
    if resp.StatusCode != http.StatusOK {
        fmt.Printf("Unexpected status code: %d\n", resp.StatusCode)
        return
    }
    
    // Read the response body
    body, err := io.ReadAll(resp.Body)
    if err != nil {
        fmt.Println("Error reading response body:", err)
        return
    }
    
    // Print the response
    fmt.Println("Response Status:", resp.Status)
    fmt.Println("Response Body:")
    fmt.Println(string(body))
}
```

### Explanation

1. Use `http.Get()` to make a simple GET request to a URL. Always check for errors.

2. It's important to close the response body with `defer resp.Body.Close()` to prevent resource leaks.

3. Check the response status code to ensure the request was successful.

4. Use `io.ReadAll()` to read the entire response body into a byte slice.

5. Convert the byte slice to a string to display or process the response content.

This example demonstrates a basic HTTP GET request. For more complex scenarios, you might need to set headers, use different HTTP methods, or handle timeouts.