# Dolar Flow Documentation

## Overview
This document outlines the flow of the Dolar application.

## Table of Contents

1. [Authentication](#authentication)
    1. [Sign In](#sign-in).
    2. [Sign Up](#sign-up)
    3. [Sign Out](#sign-out)
    4. [Tự động đăng xuất khi hết hạn](#tự-động-đăng-xuất-khi-hết-hạn)
2. [Setup](#setup)
3. [Flow Steps](#flow-steps)
4. [Conclusion](#conclusion)

## Authentication
### Sign In
### Sign Up
### Sign Out
- Vì client không thể tự xoá được cookie nên sẽ gọi tới Nextjs server
- Nextjs server sẽ gọi tới api của Nodejs server để xoá đi cookie
- Sau khi xoá thành công và trả về response cho Nextjs server
- Nextjs server sẽ set rỗng cho cookie và trả về cho client
### Tự động đăng xuất khi hết hạn
- Sau khi nhận về status 401(Unauthorized)
- Sẽ có 2 trường hợp là client gọi thẳng tới Nodejs server và gọi thông qua Server nextjs
    - Client:
        - Client sẽ gọi đến Nextjs server để force logout (set lại cookie) mà không cần phải gọi tới Nodejs vì sessionToken đã bị xoá r
    - Server nextjs:
        - Vì server không có cookie => redirect về 1 page logout để gửi request logout lên



## Setup
Describe the setup process for the application, including any prerequisites and installation steps.

## Flow Steps
Detail each step of the flow in the application. Use subheadings for each major step.

### Step 1: Initialization
Explain the initialization process.

### Step 2: Data Processing
Describe how data is processed in the application.

### Step 3: Output Generation
Detail how the output is generated and handled.

## Conclusion
Summarize the flow and any important notes or considerations.
