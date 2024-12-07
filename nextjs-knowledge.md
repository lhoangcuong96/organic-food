# Nextjs knowledge

## Overview
This document outlines of the Nextjs.

## Table of Contents

1. [Rendering](#rendering)
    1. [Client Component](#client-component)
    2. [Server Component](#server-component)
    3. [Hydration](#hydration)
2. [Error handling](#error-handling)
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

### Hydration
- Hydration chính là quá trình làm cho client component có tể interactive
    - Đầu tiên Nextjs sẽ renders Server Component vào trong kiểu dữ liệu đặc biệt gọi là RSC(React server component payload)
    - Sau đó sử dụng RSC và phần "javascript hưỡng dẫn Client component" để render ra phần html trên server
    - Sau đó dưới client sẽ render phần HTML preview cho trang này
    - RSC(React server component payload) sẽ được sử dụng để điều hoà Server và Client component và cập nhật lại DOM 
    - Sau đó phần "javascript hưỡng dẫn Client component" hydrate làm cho client component có thể tương tác

### PPR(Partial prerendering)
- Hay còn gọi là static side generator
- PPR cho phép gửi prerender content(dữ liệu tĩnh k thay đổi theo thời gian) ngay lập tức(được build trong build time)
- Ngay khi đang render nội dung tĩnh đó PPR sẽ streaming những phần content động(thay đổi tuỳ vào điều kiện) ngay lập tức đảm bảo nó chạy trước khi client js được loaded
- Để sử dụng cần phải  pnpm install next@canary và update config trong next.config.ts
    + ```
        import type { NextConfig } from 'next'
        
        const nextConfig: NextConfig = {
        experimental: {
            ppr: 'incremental',
        },
        }
        
        export default nextConfig
    ```
- Những dymamic component sẽ được sử dụng trong suspense
    - ```
        <Suspense fallback={<Fallback />}>
            <DynamicComponent />
        </Suspense>
    ```

## Error handling
- Xử lý error trên server component
    ``` 
        export default async function Page() {
            const res = await fetch(`https://...`)
            const data = await res.json()
            
            if (!res.ok) {
                return 'There was an error.'
            }
            
            return '...'
        }
    ```
- Xử lý error trên client component
    - Sẽ sử dụng try catch như bình thường
- Nếu 1 unexpected error xuất hiện(Error không được catched)
    - Client: sẽ bị redirect qua trang error.tsx
    - Server: sẽ bị redirect qua trang 500.tsx<br/>
#### Lưu ý
-Lưu ý là nếu lỗi xảy ra trong layout thì 2 page này đều sẽ không catch được lỗi
- Để catch được error ở trong layout phải define ra global-error.tsx và sử dụng cấu trúc html khác
- error.tsx, global-error.tsx hay 500 chỉ được sử dụng trên production thôi 
- redirect không được gọi trong try catch block, vì nó sẽ throw error nếu catch thì nextjs không catch được và không redirect

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
