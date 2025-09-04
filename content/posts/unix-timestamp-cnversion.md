---
title: "How to Convert Unix Timestamp to Time in Golang? Simple Example"
description: "Learn how to convert Unix timestamp to time.Time in Golang using time.Unix(). Simple Go code example for working with epoch timestamps and milliseconds."
date: 2025-01-25T16:30:00+08:00
draft: false
categories: ["DateTime"]
tags:
  - "time"
  - "unix timestamp"
  - "time.Unix"
  - "epoch time"
  - "Code Example"
slug: "how-to-convert-unix-timestamp-golang"
keywords: "how to convert unix timestamp golang, golang time.Unix example, go epoch time to date, what is unix timestamp in golang, golang timestamp to time conversion, convert milliseconds to time go"
---

## How to Convert Unix Timestamp to Time in Golang?

Learn how to convert Unix timestamps to `time.Time` objects in Golang using the `time.Unix()` function. This Go code snippet shows you how to work with epoch timestamps and milliseconds.

```go
package main

import (
    "fmt"
    "time"
)

func main() {
    // Unix timestamp (seconds since epoch)
    timestamp := int64(1737886200) // Example timestamp
    
    // Convert to time.Time
    t := time.Unix(timestamp, 0)
    fmt.Println("From timestamp:", t.Format("2006-01-02 15:04:05"))
    fmt.Println("UTC:", t.UTC().Format("2006-01-02 15:04:05"))
    
    // Convert milliseconds timestamp
    timestampMs := int64(1737886200000) // Milliseconds
    tMs := time.Unix(timestampMs/1000, (timestampMs%1000)*1000000)
    fmt.Println("From milliseconds:", tMs.Format("2006-01-02 15:04:05"))
    
    // Get current timestamp
    now := time.Now()
    currentTimestamp := now.Unix()
    fmt.Println("Current timestamp:", currentTimestamp)
    
    // Convert back to verify
    backToTime := time.Unix(currentTimestamp, 0)
    fmt.Println("Back to time:", backToTime.Format("2006-01-02 15:04:05"))
    
    // Working with nanoseconds
    timestampNano := now.UnixNano()
    fmt.Println("Nano timestamp:", timestampNano)
    fromNano := time.Unix(0, timestampNano)
    fmt.Println("From nano:", fromNano.Format("2006-01-02 15:04:05.000"))
}
```


### Output
```shell
~ go run main.go
From timestamp: 2025-01-26 18:10:00
UTC: 2025-01-26 10:10:00
From milliseconds: 2025-01-26 18:10:00
Current timestamp: 1756980576
Back to time: 2025-09-04 18:09:36
Nano timestamp: 1756980576899152000
From nano: 2025-09-04 18:09:36.899
```

### How Does time.Unix() Work?

The `time.Unix(sec, nsec)` function creates a `time.Time` from Unix timestamp seconds and nanoseconds. Use `0` for nanoseconds when working with standard Unix timestamps.

### How to Handle Millisecond Timestamps?

For millisecond timestamps, divide by 1000 for seconds and multiply the remainder by 1,000,000 for nanoseconds. This is common when working with JavaScript timestamps or APIs.

Essential for working with databases, APIs, and systems that use Unix timestamps. Find more [Go programming tutorials](https://shuttercoach.com/) for time handling techniques.