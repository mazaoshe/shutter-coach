---
title: "How to Add Time Duration in Golang? Add Hours, Minutes, Seconds"
description: "Learn how to add duration to time in Golang using time.Add(). Simple Go code example showing how to add hours, minutes, seconds, and days to time objects."
date: 2025-01-25T15:30:00+08:00
draft: false
categories: ["DateTime"]
tags:
  - "time"
  - "duration"
  - "time.Add"
  - "time calculation"
  - "Code Example"
slug: "how-to-add-duration-to-time-golang"
keywords: "how to add time duration golang, golang time.Add example, go add hours to time, how to add minutes to time golang, golang add days to date, time calculation in go"
---

## How to Add Time Duration in Golang?

Learn how to add duration to time objects in Golang using the `time.Add()` method. This Go code snippet shows you how to perform time calculations by adding hours, minutes, seconds, and days.

```go
package main

import (
    "fmt"
    "time"
)

func main() {
    // Starting time
    start := time.Date(2025, 1, 25, 10, 30, 0, 0, time.UTC)
    fmt.Println("Start time:", start.Format("2006-01-02 15:04:05"))
    
    // Add different durations
    fmt.Println("Add 2 hours:", start.Add(2*time.Hour).Format("2006-01-02 15:04:05"))
    fmt.Println("Add 30 minutes:", start.Add(30*time.Minute).Format("2006-01-02 15:04:05"))
    fmt.Println("Add 45 seconds:", start.Add(45*time.Second).Format("2006-01-02 15:04:05"))
    
    // Add days (24 hours each)
    fmt.Println("Add 7 days:", start.Add(7*24*time.Hour).Format("2006-01-02 15:04:05"))
    
    // Add combined duration
    combined := 2*time.Hour + 30*time.Minute + 15*time.Second
    fmt.Println("Add 2h 30m 15s:", start.Add(combined).Format("2006-01-02 15:04:05"))
    
    // Subtract time (negative duration)
    fmt.Println("Subtract 1 hour:", start.Add(-1*time.Hour).Format("2006-01-02 15:04:05"))
}
```

### Output

```shell
~ go run main.go
Start time: 2025-01-25 10:30:00
Add 2 hours: 2025-01-25 12:30:00
Add 30 minutes: 2025-01-25 11:00:00
Add 45 seconds: 2025-01-25 10:30:45
Add 7 days: 2025-02-01 10:30:00
Add 2h 30m 15s: 2025-01-25 13:00:15
Subtract 1 hour: 2025-01-25 09:30:00
```
### How Does time.Add() Work?

The `time.Add(duration)` method returns a new `time.Time` object with the specified duration added. Use positive durations to add time and negative durations to subtract time.

### What Duration Units Can I Use?

Go provides constants for `time.Second`, `time.Minute`, and `time.Hour`. For days, multiply hours by 24. You can combine multiple durations using addition.

Essential for scheduling, expiration times, and time-based calculations in your Go applications. Discover more [Go programming snippets](https://shuttercoach.com/) for time manipulation.
