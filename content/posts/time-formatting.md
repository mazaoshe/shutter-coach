---
title: How to Format Time to String in Golang? Complete Guide with Examples
description: Learn how to format time.Time objects into strings using Golang's time package. Master Go's unique reference time layout with practical code examples and common formatting patterns.
date: 2025-09-04T14:30:00+08:00
draft: false
categories:
  - DateTime
tags:
  - time
  - formatting
  - string
  - conversion
  - Code Example
slug: how-to-format-time-to-string-golang
keywords: how to format time in golang, golang time format examples, go time to string conversion, what is golang time format layout, how to display date in golang, golang format time to string
---

## How to Format Time to String in Golang?


Learn how to format `time.Time` objects into strings using Golang's time package. This essential Go code snippet shows you exactly how to convert time objects to formatted strings for display in your applications.
  

```go
package main

import (
	"fmt"
	"time"
)

func main() {
	// Create a time object
	t := time.Date(2025, 1, 25, 14, 30, 0, 0, time.UTC)

	// Format using Go's reference time layout
	layout := "2006-01-02 15:04:05"
	formatted := t.Format(layout)

	fmt.Println("Original time:", t)
	fmt.Println("Formatted string:", formatted)

	// Common format examples
	fmt.Println("ISO Date:", t.Format("2006-01-02"))
	fmt.Println("US Format:", t.Format("01/02/2006"))
	fmt.Println("Readable:", t.Format("January 2, 2006"))
	fmt.Println("With Weekday:", t.Format("Monday, Jan 2, 2006"))
	fmt.Println("Time Only:", t.Format("15:04:05"))
	fmt.Println("12-Hour Format:", t.Format("3:04 PM"))
}

```

### Output

  ```shell
~ go run main.go
Original time: 2025-01-25 14:30:00 +0000 UTC
Formatted string: 2025-01-25 14:30:00
ISO Date: 2025-01-25
US Format: 01/25/2025
Readable: January 25, 2025
With Weekday: Saturday, Jan 25, 2025
Time Only: 14:30:00
12-Hour Format: 2:30 PM
  ```

### What is Go's Reference Time Layout?

  

Go uses the specific reference time `"Mon Jan 2 15:04:05 MST 2006"` for formatting, which equals `01/02 03:04:05PM '06 -0700`. Use `t.Format(layout)` to convert any `time.Time` object to your desired string format.

  

### How to Remember the Format Pattern?

  

The reference time represents 1-2-3-4-5-6-7: `01/02 03:04:05PM '06 -0700`. This makes it easy to create custom date and time formats for your Go applications.

  

This formatting capability is essential when displaying dates in user interfaces or preparing data for APIs. Need more  [Go programming examples](/) ? Explore our complete collection.