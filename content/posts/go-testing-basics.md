---
title: "Go Testing Basics"
description: "Learn how to write tests in Go using the testing package, including table-driven tests and benchmarking."
date: 2025-08-17T15:00:00+08:00
draft: false
categories: ["Testing"]
tags: 
  - "testing"
  - "unit test"
  - "benchmark"
  - "table driven"
  - "Code Example"
slug: "go-testing-basics"
keywords: "Go testing, unit testing in Go, Go benchmarking, table-driven tests, Go test package"
---

## Go Testing Basics

Learn how to write tests in Go using the testing package, including table-driven tests and benchmarking.

```go
package main

import (
    "fmt"
    "strings"
)

// Functions to test
func Add(a, b int) int {
    return a + b
}

func Reverse(s string) string {
    runes := []rune(s)
    for i, j := 0, len(runes)-1; i < j; i, j = i+1, j-1 {
        runes[i], runes[j] = runes[j], runes[i]
    }
    return string(runes)
}

func IsPalindrome(s string) bool {
    s = strings.ToLower(s)
    return s == Reverse(s)
}

func Fibonacci(n int) int {
    if n <= 1 {
        return n
    }
    return Fibonacci(n-1) + Fibonacci(n-2)
}

func main() {
    fmt.Println("Add(2, 3) =", Add(2, 3))
    fmt.Println("Reverse('hello') =", Reverse("hello"))
    fmt.Println("IsPalindrome('racecar') =", IsPalindrome("racecar"))
    fmt.Println("Fibonacci(10) =", Fibonacci(10))
}
```

To test this code, create a separate file named `main_test.go`:

```go
package main

import (
    "testing"
)

// Basic unit test
func TestAdd(t *testing.T) {
    result := Add(2, 3)
    expected := 5
    if result != expected {
        t.Errorf("Add(2, 3) = %d; expected %d", result, expected)
    }
}

// Table-driven test
func TestReverse(t *testing.T) {
    tests := []struct {
        input    string
        expected string
    }{
        {"hello", "olleh"},
        {"Go", "oG"},
        {"", ""},
        {"12345", "54321"},
    }
    
    for _, test := range tests {
        result := Reverse(test.input)
        if result != test.expected {
            t.Errorf("Reverse(%q) = %q; expected %q", test.input, result, test.expected)
        }
    }
}

// Test with subtests
func TestIsPalindrome(t *testing.T) {
    tests := []struct {
        name     string
        input    string
        expected bool
    }{
        {"racecar", "racecar", true},
        {"hello", "hello", false},
        {"empty", "", true},
        {"single", "a", true},
        {"mixed case", "RaceCar", true},
    }
    
    for _, test := range tests {
        t.Run(test.name, func(t *testing.T) {
            result := IsPalindrome(test.input)
            if result != test.expected {
                t.Errorf("IsPalindrome(%q) = %t; expected %t", test.input, result, test.expected)
            }
        })
    }
}

// Benchmark test
func BenchmarkFibonacci(b *testing.B) {
    for i := 0; i < b.N; i++ {
        Fibonacci(10)
    }
}

// Example test (shows example usage)
func ExampleAdd() {
    fmt.Println(Add(1, 2))
    // Output: 3
}
```

### Explanation

1. Test files must end with `_test.go` and belong to the same package as the code being tested.

2. Test functions must start with `Test` followed by a capital letter (e.g., `TestFunctionName`).

3. Test functions accept a single parameter of type `*testing.T`.

4. Table-driven tests are a common Go pattern where you define a slice of test cases and iterate through them.

5. Subtests (using `t.Run`) allow you to group related tests and provide better test output.

6. Benchmark functions start with `Benchmark` and accept `*testing.B`. They measure performance.

7. Example functions (starting with `Example`) show how to use your code and can be verified by the testing framework.

8. Use `t.Errorf` or `t.Fatalf` to report test failures. `Errorf` continues execution, `Fatalf` stops the test.

9. Run tests with `go test` command:
   - `go test` - run all tests
   - `go test -v` - run with verbose output
   - `go test -bench=.` - run benchmarks
   - `go test -run=TestName` - run specific test

Testing is crucial for ensuring code quality and preventing regressions in Go applications.