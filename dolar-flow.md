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
2. [Model](#Model)
2. [SEO](#seo)
4. [Caching](#caching)
    1. [LRU caching](#lru-caching)
    2. [Kiểm tra email tồn tại hay chưa](#kiểm-tra-email-tồn-tại-hay-chưa)
5. [Giải pháp an toàn dữ liệu](#giải-pháp-an-toàn-dữ-liệu)
    1. [Rate limits(giới hạn tần suất)](#rate-limits)
6. [Các thuật toán sử dụng](#các-thuật-toán-sử-dụng)
7. [Một số định nghĩa khác](#một-số-định-nghĩa-khác)
    1. [Bloom filter(kiểm tra một phần tử có nằm trong tập hợp không)](#bloom-filterkiểm-tra-một-phần-tử-có-nằm-trong-tập-hợp-không)

## Authentication
### Sign In
- Nextjs
    - User sẽ gửi email kèm mật khẩu lên server Fastify để lấy token trả về
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

- Fastify
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
- Fastify
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
- Nextjs server sẽ gọi tới api của Fastify server để xoá đi cookie
- Sau khi xoá thành công và trả về response cho Nextjs server
- Nextjs server sẽ set rỗng cho cookie và trả về cho client
### Tự động đăng xuất khi hết hạn
- Sau khi nhận về status 401(Unauthorized)
- Sẽ có 2 trường hợp là client gọi thẳng tới Fastify server và gọi thông qua Server nextjs
    - Client:
        - Client sẽ gọi đến Nextjs server để force logout (set lại cookie) mà không cần phải gọi tới Fastify vì sessionToken đã bị xoá r
    - Server nextjs:
        - Vì server không có cookie => redirect về 1 page logout để gửi request logout lên


### Tự động refresh token khi hết hạn
- Sẽ có 2 trường gợp
    - TH1: Khi user sẽ vào lần đầu tiên và vào 1 private route cần call để lấy data
        - Vấn đề: Nếu call API server sẽ trả về 401 => logout luôn
        - Solution: Kiểm tra token ở middleware và gọi refresh token sau đó sẽ set lại cookie cho request và tiếp tục
    - TH2: Hết hạn dưới client
        - setInterval kiểm trả tra token nếu hết sẽ call lên API server lấy lại token và tiếp tục call api set cookie lên Nextjs server như login flow


## Model
- Product:
    - Product bao gồm 

## SEO
- Các thuộc tính
    - Title:  gồm thông tin chính như sản phẩm và sau đó là thông tin như lợi ích, xuất xứ, hoặc ưu đãi
        - "Mua Táo Mỹ Tươi Ngon - Giàu Vitamin, Giao Hàng Tận Nơi"
        - "Táo Mỹ - Trái Cây Tươi Ngon, Lợi Ích Sức Khỏe Tuyệt Vời"
    - Description: Tóm tắt ngắn gọn về sản phẩm, bao gồm các lợi ích và lý do tại sao khách hàng nên chọn sản phẩm này. Khuyến khích người dùng thực hiện hành động, chẳng hạn như "Mua ngay" hoặc "Khám phá thêm"
        - Khám phá táo Mỹ tươi ngon, giàu vitamin và chất xơ. Đặt hàng ngay hôm nay để nhận ưu đãi giao hàng miễn phí!
        - Tận hưởng hương vị ngọt ngào của táo Mỹ, trái cây bổ dưỡng cho sức khỏe. Mua ngay để không bỏ lỡ!
    - alternate > canonical:
        - Lập chỉ mục cho trang
        - Ví dụ nhiều trang với nội dung tương tự(VD như là query params, dù trang 1 hay 2, có filter hay không thì nó đều là 1 trang)
            - Như vậy lượng traffic sẽ được gộp chung hết vào 1 => tăng điểm tìm kiếm
- Open graph: Cho phép trang web hiển thị nội dung khi chia sẽ trên mạng xã hội, tăng khả năng hiển và tương tác của nó => nhiều lượt truy cập => trang web uy tín
    - Sử dụng chrome extension SEO META in 1 ClICK để kiểm tra xem còn thiếu những gì
    - **LƯU Ý** Lấn đầu post link chia sẽ thì FB sẽ tự động cache lại, nếu muốn cập nhật lại những metadata đó những lần sau thì vào search "trình gỡ lỗi chia sẽ" 
    - Code ví dụ
        - ```return {
        title: product?.name || "Không tìm thấy sản phẩm",
        description: product?.description || "Không tìm thấy sản phẩm",
        openGraph: {
            title: product?.name || "Không tìm thấy sản phẩm",
            description: product?.description || "Không tìm thấy sản phẩm",
            site_name: "Dolar Organic",
            url: url,
            images: [
            {
                url: product?.image.thumbnail,
            },
            ],
            type: "website",
            locale: "vi_VN",
        },
        alternates: {
            canonical: url,
        }}```
- robots.txt: có thể sử dụng robots.ts để nextjs generate ra, đặt trong folder app
    - Sử dụng để hướng dẫn công cụ search nên truy cập và không nên truy cập vào trang nào
    - Tăng tốc độ lập chỉ mục các trang quan trọng

- sitemap.xml: có thể sử dụng sitemap.ts để nextjs generate ra, đặt trong folder app
    - Cung cấp danh sách các urls mà muốn lập chỉ mục và độ ưu tiên của nó
    - Nó chứa các thông tin bổ sung của trang, ngày cập nhập, tần suất thay đổi

## Caching
### LRU caching
- Khi bộ nhớ caching có 1 giới hạn nhất định thì việc cache sẽ phải ưu tiên những dữ liệu truy xuất nhiều nhất
- LRU caching sẽ làm việc đó, những dữ liệu được put vào hay get ra thường xuyên sẽ luôn nằm trên đầu và đẩy những dữ liệu khác xuống=> khi tới mức giới hạn => data ít dc dùng sẽ bị xoá
- Config cho redis:
 
### Kiểm tra email tồn tại hay chưa
- Bài toán: nếu có 100tr users và khi register phải kiểm tra quét hết database => hiệu năng kém
- Solution: sử dụng redis để lưu những user đã đăng kí
    - Sử dụng key là email và value = 1
        - Vấn đề xảy ra là sẽ mất quá nhiều bộ nhớ để chứa email đó(1 ký tự = 8 bytes)
    - Sử dụng hàm crypto.hash để biến email thánh chuỗi chữ số(1 ký tự = 8 bytes)
         nhưng lại ít kí tự để lưu hơn so với email, nhưng vẫn cao => sử dụng bloom filter
    - Sử dụng Bitmap(dãy nhị phân) để lưu, sử dụng thuật toán [Bloom Filter](#bloom-filterkiểm-tra-một-phần-tử-có-nằm-trong-tập-hợp-không)

## Giải pháp an toàn dữ liệu
### Rate limits
- Giới hạn tuần suất truy cập trong 1 khoảng thời gian nhất định
- Gồm nhiều cách nhưng hiện tại trang web sử dụng Fixed Window


## Các thuật toán sử dụng
- [LRU caching](#lru-caching)
- [Bloom Filter](#bloom-filterkiểm-tra-một-phần-tử-có-nằm-trong-tập-hợp-không)

## Một số định nghĩa khác
### Bloom filter(kiểm tra một phần tử có nằm trong tập hợp không)
- Bloom filter sẽ tạo ra mảng với kích thước "m" bit(0,1) với giá trị là 0 hết và "k" hàm băm(môĩ hàm băm trả về 1 chỉ số index)
- Khi thêm phần tử sẽ băm nó làm "k" chỉ số(index) đặt các bit ở index đó thành 1 hết
- Khi kiểm tra sẽ băm phần tử thành "k" chỉ số
    - Sau đó kiểm tra nếu tất cả bằng 1 => tồn tại(có thể là false positive)=> dương tính giả vẫn có thể sai
    - Nếu ít nhất 1 chỉ số là 0 => không tồn tại, chắc chắn(không phải là false negative)
- Ở đây sử dụng để kiểm tra email có tồn tại hay chưa trong redis
- VD
    - Băm "apple" thành 1,3,5 => set các bit vị trí 1,3,5 là 1
- Cách tính toán bloom filter
    - Nếu sử dụng cho 10000 users với tỷ lệ false positive là 0.01(1%)
    - m = - (10000 * ln(0.01)) / (ln(2))^2 = ~11.8KB
    - Trong khi đó lưu cả email vào trong redis thì tốn 2,540 KB=2.54MB
