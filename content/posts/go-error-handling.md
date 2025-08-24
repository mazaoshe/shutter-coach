---
title: "Go Error Handling"
description: "Learn how to handle errors in Go effectively, including creating custom errors and using error wrapping for better debugging."
date: 2025-08-17T11:00:00+08:00
draft: false
categories: ["concurrency"]
tags: 
  - "error"
  - "handling"
  - "custom errors"
  - "wrapping"
  - "Code Example"
slug: "go-error-handling"
keywords: "Go error handling, custom errors in Go, error wrapping, Go error patterns, Go programming errors"
---

## Go Error Handling

Learn how to handle errors in Go effectively, including creating custom errors and using error wrapping for better debugging.

```go
package main

import (
    "errors"
    "fmt"
)

// Custom error type
type ValidationError struct {
    Field   string
    Message string
}

func (e *ValidationError) Error() string {
    return fmt.Sprintf("Validation error in field '%s': %s", e.Field, e.Message)
}

// Function that can return an error
func divide(a, b float64) (float64, error) {
    if b == 0 {
        return 0, errors.New("division by zero is not allowed")
    }
    return a / b, nil
}

// Function that returns a custom error
func validateEmail(email string) error {
    if len(email) == 0 {
        return &ValidationError{
            Field:   "email",
            Message: "Email is required",
        }
    }
    if len(email) < 5 || !contains(email, "@") {
        return &ValidationError{
            Field:   "email",
            Message: "Email format is invalid",
        }
    }
    return nil
}

// Helper function
func contains(s, substr string) bool {
    for i := 0; i <= len(s)-len(substr); i++ {
        if s[i:i+len(substr)] == substr {
            return true
        }
    }
    return false
}

func main() {
    // Handle basic error
    result, err := divide(10, 0)
    if err != nil {
        fmt.Println("Error:", err)
        return
    }
    fmt.Printf("Result: %.2f\n", result)
    
    // Handle custom error
    email := "invalid-email"
    if err := validateEmail(email); err != nil {
        // Check for specific error type
        var validationErr *ValidationError
        if errors.As(err, &validationErr) {
            fmt.Printf("Field: %s, Error: %s\n", validationErr.Field, validationErr.Message)
        } else {
            fmt.Println("Error:", err)
        }
        return
    }
    
    fmt.Println("Email is valid!")
}
```

### Explanation

1. Go handles errors explicitly through return values. Functions that can fail typically return an `error` as their last return value.

2. Check errors immediately after calling functions that can return them. The idiom is `if err != nil`.

3. Create custom error types by implementing the `error` interface (which requires an `Error() string` method).

4. Use `errors.New()` for simple errors or create custom error types for more complex scenarios.

5. Use `errors.As()` to check for and convert to specific error types, which is useful for handling different error types differently.

6. Always handle errors - don't ignore them with `_` unless you have a specific reason and document it.

Proper error handling is crucial for writing robust Go applications.