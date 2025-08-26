---
title: "Golang Concurrency Basics"
description: "Learn the basics of Golang concurrency with goroutines and channels, including how to create and synchronize concurrent operations in Go programming."
date: 2025-08-17T10:00:00+08:00
draft: false
categories: ["Concurrency"]
tags: 
  - "concurrency"
  - "goroutines"
  - "channels"
  - "parallel"
  - "Code Example"
slug: "go-concurrency-basics"
keywords: "Golang concurrency, goroutines, channels, Golang parallel processing, concurrent programming in Go, Go concurrency patterns"
---

## Golang Concurrency Basics

Learn the basics of Golang concurrency with goroutines and channels, including how to create and synchronize concurrent operations in Go programming. This Golang code example demonstrates practical concurrency patterns that every Go developer should master.

```go
package main

import (
    "fmt"
    "time"
)

func printNumbers(prefix string) {
    for i := 1; i <= 5; i++ {
        fmt.Printf("%s: %d\n", prefix, i)
        time.Sleep(100 * time.Millisecond)
    }
}

func main() {
    // Run functions concurrently using goroutines
    go printNumbers("Goroutine 1")
    go printNumbers("Goroutine 2")
    
    // Run function in the main goroutine
    printNumbers("Main")
    
    // Give goroutines time to finish
    time.Sleep(1 * time.Second)
    fmt.Println("Done!")
}
```

### Explanation

1. Goroutines are lightweight threads managed by the Go runtime. Create one with the `go` keyword followed by a function call.

2. In this example, we start two goroutines that run concurrently with the main function.

3. Each goroutine executes the `printNumbers` function, printing numbers with a small delay between each.

4. Without the final `time.Sleep`, the main function might exit before the goroutines finish.

5. Goroutines are much cheaper than OS threads - you can easily create thousands of them.

For more advanced synchronization, you would typically use channels or other synchronization primitives from the `sync` package.