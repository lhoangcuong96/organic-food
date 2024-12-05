# Dolar Flow Documentation

## Overview
This document outlines the flow of the Dolar application.

## Table of Contents

1. [Authentication](#authentication)
    1. [Sign In](#sign-in).
    2. [Sign Up](#sign-up)
    3. [Sign Out](#sign-out)
    4. [Tự động đăng xuất khi hết hạn](#tự-động-đăng-xuất-khi-hết-hạn)
    5. [Tự động refresh token khi hết hạn](#tự-động-refresh-token-khi-hết-hạn)
2. [Setup](#setup)
3. [Flow Steps](#flow-steps)
4. [Conclusion](#conclusion)

## Authentication
### Sign In
- Nextjs
    - User sẽ gửi email kèm mật khẩu lên server Nodejs để lấy token trả về
    - Sau khi nhận được token user sẽ gửi token lên trên Nextjs server để server set cookie trả về. 
    Nhu vậy dù gửi request từ Nextjs hay Nextjs server đều được
    - Set cookie
        - Đầu tiên là set sessionToken là điểu chắc chắn
        - Set Path=/ để tất cả các routes đều có thể sử dụng là gửi kèm cookie lên khi request
        - Set HttpOnly để chỉ có server mới có quyền đọc được cookie
        - Set Samesite
            - Strict => chỉ gửi cookie khi request từ cùng 1 domain
            - Lax => chỉ gửi cookie khi get còn post thì không nếu như là domain ngoài
            - None => gửi cookie cho tất cả các domain
        - Set Secure chỉ gửi cookie khi request từ https
        - Ví dụ: "Set-Cookie": `sessionToken=${sessionToken}; PATH=/; HttpOnly; Expires=${expiredTime}; SameSite=Strict; Secure`,

- Nodejs
    - Sau khi nhận được request thì kiểm tra user tồn tại hay không
    - Sau đó kiểm tra mật khẩu bằng hàm compare của bcrypt
        - ```export const comparePassword = async (password: string, hash: string) => bcrypt.compare(password, hash)```
        - Trong đó hash là password đã hash và lưu trong db
    - Sau đó sử dụng package fastjwt để tạo ra jwt trả về cho client
        - ``` export const signSessionToken = (payload: Pick<TokenPayload, 'userId'>, options?: SignerOptions) => {
                const signSync = createSigner({
                    key: envConfig.SESSION_TOKEN_SECRET,
                    algorithm: 'HS256',
                    expiresIn: ms(envConfig.SESSION_TOKEN_EXPIRES_IN),
                    ...options
                })
                return signSync({ ...payload, tokenType: TokenType.SessionToken })
            }
          ```
        - CreateSigner sẽ trả về 1 hàm để tạo chữ kí dựa theo payload
### Sign Up
- Nextjs
    - Xử lý tương tự Sign in
- Nodejs
    - Sau khi nhận đươc request từ client sẽ kiểm tra email hoặc số điện thoại tồn tại hay chưa
    - Sau đó sẽ hash password(băm mật khẩu) dựa vào package bcrypt và saltRound
        - salt là giá trị thêm vào ngẫu nhiên trước password
        - salt rounds: Số lượng vòng lặp mà thuật toán Bcrypt thực hiện để băm mật khẩu.
        - ```export const hashPassword = async (password: string) => bcrypt.hash(password, saltRounds)```
    - Sau đó sử dụng mật khẩu và email để tạo user
    - Sau đó sử dụng package fastjwt để tạo ra jwt trả về cho client
        - ``` export const signSessionToken = (payload: Pick<TokenPayload, 'userId'>, options?: SignerOptions) => {
                const signSync = createSigner({
                    key: envConfig.SESSION_TOKEN_SECRET,
                    algorithm: 'HS256',
                    expiresIn: ms(envConfig.SESSION_TOKEN_EXPIRES_IN),
                    ...options
                })
                return signSync({ ...payload, tokenType: TokenType.SessionToken })
            }
          ```
        - CreateSigner sẽ trả về 1 hàm để tạo chữ kí dựa theo payload
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


### Tự động refresh token khi hết hạn
- Sẽ có 2 trường gợp
    - TH1: Khi user sẽ vào lần đầu tiên và vào 1 private route cần call để lấy data
        - Vấn đề: Nếu call API server sẽ trả về 401 => logout luôn
        - Solution: Kiểm tra token ở middleware và gọi refresh token sau đó sẽ set lại cookie cho request và tiếp tục
    - TH2: Hết hạn dưới client
        - setInterval kiểm trả tra token nếu hết sẽ call lên API server lấy lại token và tiếp tục call api set cookie lên Nextjs server như login flow

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
