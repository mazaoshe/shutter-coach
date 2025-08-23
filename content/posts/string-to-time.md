---
title: "Convert String to Time"
description: "Learn how to convert a string into a time.Time object using Go's time package with proper error handling."
date: 2025-08-16T14:30:00+08:00
draft: false
categories: ["Go"]
tags: ["time", "parsing", "string", "conversion", "Code Example"]
slug: "go-string-to-time"
keywords: "Go time parsing, string to time conversion, Go time package, time parsing example"
---

## Convert String to Time

Learn how to convert a string into a time.Time object using Go's time package with proper error handling.

```go
package main

import (
    "fmt"
    "time"
)

func main() {
    // Define the layout that matches your input string
    layout := "2006-01-02 15:04:05"
    str := "2025-08-16 14:30:00"
    
    // Parse the string into a time.Time object
    t, err := time.Parse(layout, str)
    
    if err != nil {
        fmt.Println("Error:", err)
        return
    }
    
    fmt.Println("Parsed Time:", t)
    fmt.Println("Year:", t.Year())
    fmt.Println("Month:", t.Month())
    fmt.Println("Day:", t.Day())
}
```

### Explanation

1. Define a layout string that matches the format of your input string. Go uses a specific reference time: "Mon Jan 2 15:04:05 MST 2006".

2. Use time.Parse() to convert the string to a time.Time object. Always check for parsing errors.

3. Once parsed, you can access individual components like Year(), Month(), Day(), Hour(), etc.

4. The layout "2006-01-02 15:04:05" corresponds to "YYYY-MM-DD HH:MM:SS" format.