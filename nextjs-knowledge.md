# Nextjs knowledge

## Overview
This document outlines of the Nextjs.

## Table of Contents

1. [Rendering](#rendering)
    1. [Client Component](#client-component)
    2. [Server Component](#server-component)
2. [Setup](#setup)
3. [Flow Steps](#flow-steps)
4. [Conclusion](#conclusion)

## Rendering
- Có 2 môi trường để web có thể rendering:
    - Client: trình duyệt người dùng
    - Server: đại diện cho máy chủ nơi chứa data và trả về response
- 2 môi trường này tách biệt nhau gọi là network boundary(Ranh giới mạng)
- 2 môi trường này phân biệt rõ ràng bằng 2 từ khoá "use client", "use server". Use server là mặc định

### Client Component
- Dùng client component khi:
    - Cần tương tác: dùng hook(useState, useEffect...) các event listener(onClick, onSubmit, onChange...)
    - Cần dùng các API từ trình duyệt: document, window, location, history... 
- Trong Nextjs mặc định các component đều được render trên server(khác với react) dù là client hay server component nên sẽ thấy UI liền sau đó thì nó mới render một lần nữa để đồng bộ DOM và các sự kiện, effect, state...
    - => Ở client component thì phần tĩnh sẽ được render trên server và phần này sẽ được "hydrate" trên client để cho phép tương tác.
    - Giảm gánh nặng cho server khi gặp những logic tốn chi phí và tài nguyên
- Nhược điểm
    - SEO kém, Nextjs không đảm bảo tất cả nội dung đều được render khi lần đầu tiên load dù rằng nó được render sẵn r
    - Tăng bundle size javascript
    - Thiết bị client kém sẽ dễ làm trải nghiệm người dùng kém
- => Dùng Server component nhiều nhất có thể để trải nghiệm người dùng tốt nhất
### Server Component
- Fetch data ở server => Do các server sẽ nằm gần nhau sẽ fetch nhanh hơn so với từ client => giảm thời gian render => tăn UX người dùng
- Bảo mật: Server cho phép giữ các data nhạy cảm, logic đặc biệt không muốn public với người dùng
- Caching: Vì được render ở server rồi nên có thể lưu giữ cache  cho nhiều người dùng khác nhau => không cần render trên mỗi request
- Bundle size: giảm thiểu bundle size vì không cần chứa logic render html cho client
- Load trang lần đầu nhanh và chỉ số FCP(First contentful paint) thấp do dùng sẽ thấy content luôn
- Search engine optimization(SEO) and social network shareability
- <u>**Streaming: (Cần xem)**</u>







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
