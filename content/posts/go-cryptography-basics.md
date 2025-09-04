---
title: Golang Cryptography Basics
description: Learn how to perform basic cryptographic operations in Golang, including hashing, encryption, and decryption using the crypto packages with practical Go code examples.
date: 2025-08-17T16:00:00+08:00
draft: false
categories:
  - Concurrency
tags:
  - cryptography
  - hashing
  - encryption
  - security
  - Code Example
slug: go-cryptography-basics
keywords: Golang cryptography, hashing in Go, encryption in Go, Golang crypto package, secure coding in Go, Go security examples
---

## Golang Cryptography Basics

Learn how to perform basic cryptographic operations in Golang, including hashing, encryption, and decryption using the crypto packages with practical Go code examples. These Golang code snippets demonstrate essential security practices for protecting data in your Go applications.

```go
package main

import (
    "crypto/md5"
    "crypto/sha256"
    "fmt"
    "io"
)

func main() {
    text := "Hello, World!"
    
    // MD5 Hashing
    md5Hash := md5.Sum([]byte(text))
    fmt.Printf("MD5: %x\n", md5Hash)
    
    // SHA256 Hashing
    sha256Hash := sha256.Sum256([]byte(text))
    fmt.Printf("SHA256: %x\n", sha256Hash)
    
    // Using hash interface for more control
    h := sha256.New()
    io.WriteString(h, text)
    fmt.Printf("SHA256 (interface): %x\n", h.Sum(nil))
}
```

### Explanation

1. Go's standard library provides several cryptographic packages under the `crypto` namespace.

2. For hashing, you can use functions like `md5.Sum()` or `sha256.Sum256()` which return fixed-size arrays.

3. Alternatively, you can use the hash interface (like `sha256.New()`) which provides more flexibility.

4. Always use cryptographically secure random number generators when needed (from `crypto/rand`).

5. For encryption/decryption, consider packages like `crypto/aes` for symmetric encryption or `crypto/rsa` for asymmetric encryption.

Hashing is commonly used for:
- Password storage (with salt)
- Data integrity verification
- Creating unique identifiers
- Digital signatures

When working with passwords, always use slow hashing algorithms like bcrypt or scrypt with salt, rather than fast algorithms like MD5 or SHA256.