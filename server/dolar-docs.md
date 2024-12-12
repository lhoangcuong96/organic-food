# Dolar Flow Documentation

## Overview
This document outlines the flow of the Dolar application.

## Table of Contents

1. [Authentication](#authentication)
    1. [Sign In](#sign-in).
    2. [Sign Up](#sign-up)
    3. [Sign Out](#sign-out)
    4. [Tự động đăng xuất khi hết hạn](#tự-động-đăng-xuất-khi-hết-hạn)
2. [Xử lý lượng đồng thời cao](#xử-lý-lượng-đông-thời-cao)
    1. [Kiểm tra email tồn tại hay chưa](#kiểm-tra-email-tồn-tại-hay-chưa)
3. [Một số định nghĩa khác](#một-số-định-nghĩa-khác)
    1. [Bloom filter(kiểm tra một phần tử có nằm trong tập hợp không)](#bloom-filterkiểm-tra-một-phần-tử-có-nằm-trong-tập-hợp-không)
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



## Xử lý lượng đồng thời cao
### Kiểm tra email tồn tại hay chưa
- Bài toán: nếu có 100tr users và khi register phải kiểm tra quét hết database => hiệu năng kém
- Solution: sử dụng redis để lưu những user đã đăng kí
    - Sử dụng key là email và value = 1
        - Vấn đề xảy ra là sẽ mất quá nhiều bộ nhớ để chứa email đó(1 ký tự = 8 bytes)
    - Sử dụng hàm crypto.hash để biến email thánh chuỗi chữ số(1 ký tự = 8 bytes)
         nhưng lại ít kí tự để lưu hơn so với email, nhưng vẫn cao => sử dụng bloom filter
    - Sử dụng Bitmap(dãy nhị phân) để lưu, sử dụng thuật toán [Bloom Filter](#bloom-filterkiểm-tra-một-phần-tử-có-nằm-trong-tập-hợp-không)

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
