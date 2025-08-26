---
title: "Golang File Operations"
description: "Learn how to perform file operations in Golang, including reading, writing, and manipulating files and directories with practical Go code examples."
date: 2025-08-17T13:00:00+08:00
draft: false
categories: ["Files"]
tags: 
  - "file"
  - "io"
  - "read"
  - "write"
  - "filesystem"
  - "Code Example"
slug: "go-file-operations"
keywords: "Golang file operations, reading files in Go, writing files in Go, Golang filesystem operations, file IO in Go, Go file manipulation"
---

## Golang File Operations

Learn how to perform file operations in Golang, including reading, writing, and manipulating files and directories with practical Go code examples. These Golang code snippets demonstrate common file operations that Go developers encounter in everyday development.

```go
package main

import (
    "bufio"
    "fmt"
    "io"
    "io/ioutil"
    "os"
    "strings"
)

func main() {
    filename := "example.txt"
    
    // Write string to file
    content := "Hello, World!\nThis is a test file.\nGo is awesome!"
    err := ioutil.WriteFile(filename, []byte(content), 0644)
    if err != nil {
        fmt.Println("Error writing file:", err)
        return
    }
    fmt.Println("File written successfully")
    
    // Read entire file
    data, err := ioutil.ReadFile(filename)
    if err != nil {
        fmt.Println("Error reading file:", err)
        return
    }
    fmt.Println("File contents:")
    fmt.Println(string(data))
    
    // Read file line by line
    fmt.Println("\nReading line by line:")
    file, err := os.Open(filename)
    if err != nil {
        fmt.Println("Error opening file:", err)
        return
    }
    defer file.Close()
    
    scanner := bufio.NewScanner(file)
    lineNum := 1
    for scanner.Scan() {
        fmt.Printf("Line %d: %s\n", lineNum, scanner.Text())
        lineNum++
    }
    
    if err := scanner.Err(); err != nil {
        fmt.Println("Error reading file:", err)
    }
    
    // Append to file
    f, err := os.OpenFile(filename, os.O_APPEND|os.O_WRONLY, 0644)
    if err != nil {
        fmt.Println("Error opening file for append:", err)
        return
    }
    defer f.Close()
    
    if _, err = f.WriteString("\nAppended line!"); err != nil {
        fmt.Println("Error appending to file:", err)
        return
    }
    fmt.Println("Line appended successfully")
    
    // Create directory
    dirName := "testdir"
    if err := os.Mkdir(dirName, 0755); err != nil {
        fmt.Println("Error creating directory:", err)
    } else {
        fmt.Println("Directory created successfully")
    }
    
    // Check if file exists
    if _, err := os.Stat(filename); err == nil {
        fmt.Printf("File %s exists\n", filename)
    } else if os.IsNotExist(err) {
        fmt.Printf("File %s does not exist\n", filename)
    }
    
    // Clean up
    os.Remove(filename)
    os.Remove(dirName)
}
```

### Explanation

1. `ioutil.WriteFile` is a simple way to write data to a file. It takes the filename, data as bytes, and file permissions.

2. `ioutil.ReadFile` reads the entire file into memory. Good for small files but not recommended for large ones.

3. For line-by-line reading, open the file with `os.Open` and use `bufio.NewScanner` to scan through it.

4. To append to a file, use `os.OpenFile` with the `os.O_APPEND|os.O_WRONLY` flags.

5. `os.Mkdir` creates a directory with specified permissions.

6. `os.Stat` checks if a file exists - if the error is `os.IsNotExist`, the file doesn't exist.

7. Always close files with `defer file.Close()` to ensure resources are released.

8. Handle errors for all file operations as they can fail for various reasons (permissions, disk space, etc.).

For large files, consider using streaming approaches with `io.Reader` and `io.Writer` interfaces instead of reading everything into memory.