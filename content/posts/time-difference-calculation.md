---
title: "How to Calculate Time Difference in Golang? Duration Between Two Times"
description: "Learn how to calculate time difference in Golang using time.Sub(). Simple Go code example showing how to find duration between two time objects."
date: 2025-09-01T16:00:00+08:00
draft: false
categories: ["DateTime"]
tags:
  - "time"
  - "duration"
  - "time.Sub"
  - "time difference"
  - "Code Example"
slug: "how-to-calculate-time-difference-golang"
keywords: "how to calculate time difference golang, golang time.Sub example, go duration between two times, how to find time elapsed golang, golang calculate hours between dates, time diff in go"
---

## How to Calculate Time Difference in Golang?

Learn how to calculate the time difference between two time objects in Golang using the `time.Sub()` method. This Go code snippet shows you how to find the duration between two times and extract meaningful values.

```go
package main

import (
    "fmt"
    "time"
)

func main() {
    // Define two time points
    start := time.Date(2025, 1, 25, 10, 30, 0, 0, time.UTC)
    end := time.Date(2025, 1, 25, 14, 45, 30, 0, time.UTC)
    
    fmt.Println("Start time:", start.Format("2006-01-02 15:04:05"))
    fmt.Println("End time:", end.Format("2006-01-02 15:04:05"))
    
    // Calculate difference
    diff := end.Sub(start)
    
    fmt.Println("Time difference:", diff)
    fmt.Println("Total hours:", diff.Hours())
    fmt.Println("Total minutes:", diff.Minutes())
    fmt.Println("Total seconds:", diff.Seconds())
    
    // Extract components
    hours := int(diff.Hours())
    minutes := int(diff.Minutes()) % 60
    seconds := int(diff.Seconds()) % 60
    
    fmt.Printf("Formatted: %d hours, %d minutes, %d seconds\n", hours, minutes, seconds)
    
    // Check if time has passed
    now := time.Now()
    if now.After(start) {
        elapsed := now.Sub(start)
        fmt.Println("Time elapsed since start:", elapsed)
    }
}
```

### Output
```shell
~ go run main.go
Start time: 2025-01-25 10:30:00
End time: 2025-01-25 14:45:30
Time difference: 4h15m30s
Total hours: 4.258333333333334
Total minutes: 255.5
Total seconds: 15330
Formatted: 4 hours, 15 minutes, 30 seconds
Time elapsed since start: 5327h37m37.991377s
```

### How Does time.Sub() Work?

The `time.Sub(earlier)` method returns a `time.Duration` representing the difference between two times. The result is positive if the time is later than the parameter.

### What Can I Do with Duration?

Duration objects provide methods like `.Hours()`, `.Minutes()`, and `.Seconds()` to get the total time in different units. Use modulo operations to extract individual components.

Perfect for measuring execution time, calculating ages, or determining time intervals in your Go applications. Explore more [Go time examples](https://shuttercoach.com/) for advanced techniques.
