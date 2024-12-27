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
8. [Triễn khai dự án](#triễn-khai-dự-án)
    1. [Khởi tạo 1 instance VPS](#khởi-tạo-1-instance-vps)
        1. [Cấu hình VPS](#cấu-hình-vps)
    2. [Tạo user mới](#tạo-user-mới)
    3. [Cài đặt VPS](#cài-đặt-vps)
        1. [NVM](#nvm)
        2. [PNPM](#pnpm)
        3. [Cài đặt unzip file](#cài-đặt-unzip-file)
        4. [Cài đặt pm2](#cài-đặt-pm2)
    4. [Cấu hình và khởi động pm2](#cấu-hình-và-khởi-động-pm2)
    5. [Cấu hình CI/CD](#cấu-hình-cicd)
    6. [Trỏ tên miền con về VPS](#trỏ-tên-miền-con-về-vps)
    7. [Cài đặt và cấu hình nginx](#cài-đặt-và-cấu-hình-nginx)
        1. [Cài đặt](#cài-đặt)
        2. [Thiết lập Reserve Proxy](#thiết-lập-reserve-proxy)
    8. [Cấu hình mã hóa HTTPS/SSL](#cấu-hình-mã-hóa-httpsssl)
    9. [Kích hoạt HTTP2 trong Nginx](#kích-hoạt-http2-trong-nginx)
9. [Sử dụng Docker để triễn khai dự án](#sử-dụng-docker-để-triễn-khai-dự-án)


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


## Triễn khai dự án
### Khởi tạo 1 instance VPS

- Truy cập đường [link](https://www.vultr.com/)
- Tạo instance
  - Chọn loại VPS là Cloud Compute cho rẻ
  - Lựa chọn các option như server image, server size ...
  - Bỏ tick chọn auto backups(cho rẻ)
  - Add thêm ssh key vào:
    - ssh-keygen -t rsa -b 4096 -C "lhoangcuong1996@gmail.com"
    - sau đó lựa điền file name:
      - Your identification has been saved in: C:\Users\P50\.ssh\id_rsa_vultr // đẩy đủ đường dẫn
    - update lại file config:
    ```
          #vultr.com
            Host vultr
            HostName 139.180.222.46
            User root
            IdentityFile ~/.ssh/id_rsa_vultr
    ```
    - Với hostname là ip mà vultr cung cấp user là root

### Cấu hình VPS

- Kến nối đến server thông qua ssh
  - ssh <username>@<ip_address> -i <path_to_private_key>
    - ssh root@139.180.222.46 -i C:/Users/P50/.ssh/id_rsa_vultr // nếu k có -i C:/Users/P50/.ssh/id_rsa_vultr sẽ bắt nhập pass
- Cách mỗi lần kết nối mà không cần tới mật khẩu(chỉ cần excute command 1 lần)
  - ssh-copy-id -i /c/Users/P50/.ssh/id_rsa_vultr.pub <username>@<ip_address>
  - Nó sẽ gửi thẳng public key lên cho server luôn nên không cần phải nhập password nữa

#### Thay đổi ssh key cho VPS

- Sau khi add public key cho VPS thì khi ssh thì nhận lỗi

  ```
          @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
          @    WARNING: REMOTE HOST IDENTIFICATION HAS CHANGED!     @
          @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
          IT IS POSSIBLE THAT SOMEONE IS DOING SOMETHING NASTY!
          Someone could be eavesdropping on you right now (man-in-the-middle attack)!
          It is also possible that a host key has just been changed.
          The fingerprint for the ED25519 key sent by the remote host is
  ```

- ssh-keygen -R vps_ip_address
- ssh-keyscan -H vps_ip_address >> ~/.ssh/known_hosts

#### Tạo user mới

- User root quyền rất lớn => không nên sử dụng do có thể thay đổi gây tổn hại server
- Sẽ tạo ra các user với các quyền hạn nhất định, ví dụ như FE account chỉ có quyền trong thư mục source FE...
- Syntax:
  - adduser <user_name>
- Thêm user mới vào trong 1 group gọi là sudo(quản trị) có thể thực hiện 1 số tác vụ yêu cầu quyền quản trị
  - usermod -aG sudo <user_name>
- Chuyển user
  - su - <user_name>

##### Chú ý

- Khi cài đặt một số package thì nó sẽ cài trong folder của user đó
- Khi chuyển user khác sẽ không có

##### Chú ý

- Mỗi user sẽ có 1 folder .ssh riêng để ssh
- Nếu như bị lỗi "ssh: handshake failed: ssh: unable to authenticate, attempted methods [none ...], no supported methods remain"
  - Đó là do user đó chưa có cài đặt ssh public key trên VPS
  - ssh-copy-id username@your_vps_ip //copy public key lên trên VPS

#### Cài đặt VPS

##### NVM

- sudo apt-get update // cập nhật lại các package mới
- sudo apt-get upgrade // cập nhật lại các package đã cài
- curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash // cài đặt nvm
- sau đó tắt terminal hoặc chuyển user để reset mới xài dc

##### PNPM

- npm install -g pnpm

##### Cài đặt unzip file

- apt install unzip

##### Cài đặt pm2
- Pm2 là trình quản lý process của nodejs
  - Quản lý quy trình
  - Tự động khởi động nếu ứng dụng gặp sự cố
- npm install pm2 -g

#### Cấu hình và khởi động pm2
- cd <project_path>
- pm2 start --name=<app_name> npm -- start //khởi động dự án nextjs
- pm2 startup systemd   //tự động khởi động lại nếu app crashed
- pm2 stop <app_id_or_name> //Tắt ứng dụng
- pm2 stop all  // Tắt tất cả
- pm2 kill // Tắt pm2 và tất cả ứng dụng

##### Chạy lại pm2 mỗi khi VPS reboot
- pm2 save
- pm2 startup systemd
- restart VPS: vào trong trang web VPS để restart
- systemctl status pm2-<user_name> //Kiểm tra lại pm2
  - Nếu status là active là được
  - Thoát ra press Q
- sau khi dự án build xong thì
  - pm2 restart <app_name>

#### Cấu hình CI/CD
- Tạo file .github/workflows/<file_name>.yml
- Cấu hình CI/CD

```
name: Deploy client to VPS

on:
  push:
    branches:
      - master  # hoặc tên nhánh bạn muốn trigger việc deploy
    paths:
      - 'client/**'  # Chỉ trigger khi có thay đổi trong thư mục client
      - ".github/workflows/client-deploy.yml"  # Trigger khi có thay đổi trong file workflow

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4
    - name: Use Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '20.11.1'  # hoặc phiên bản Node.js bạn đang sử dụng
    - name: Install pnpm  # nếu dự án xài pnpm thì phải install ở đây
      uses: pnpm/action-setup@v2
      with:
        version: 8
    - name: Install dependencies
      working-directory: ./client # vì src client nằm trong client nên phải chuyển đến thư mục client
      run: pnpm install
    # Nếu sử dụng npm thì sử dụng lệnh sau
    #- name: Install dependencies
    #  run: npm ci
    - name: Build
      working-directory: ./client
      run: npm run build
    - name: Compress .next folder
      run: |
        tar -czvf client.tar.gz --exclude='node_modules' client
    - name: List files in the directory
      run: |
        ls -1
    - name: Copy compressed folder to VPS
      uses: appleboy/scp-action@master
      with:
        host: ${{ secrets.HOST }}
        username: ${{ secrets.USEr }}
        key: ${{ secrets.SSH_PRIVATE_KEY }}
        source: "client.tar.gz"
        target: "/home/projects/organic-food/"
        # strip_components: 1 # loại bỏ folder client mà chỉ lấy next.tar.gz
    - name: Deploy to VPS
      uses: appleboy/ssh-action@master
      with:
        host: ${{ secrets.HOST }}
        username: ${{ secrets.USER }}
        key: ${{ secrets.SSH_PRIVATE_KEY }}
        script: |
          export NVM_DIR=~/.nvm
          source ~/.nvm/nvm.sh
          npm --help
          cd /home/projects/organic-food/
          tar -xzvf client.tar.gz
          rm client.tar.gz
          cd client
          ls -l
          pm2 restart nextjs
```

- Các bước bao gồm
  - Setup node cho github action
  - Install các dependencies dự án cho github action
  - Build dự án
  - Compress toàn bộ trừ node_modules
  - Đẩy file đã được compressed lên VPS
  - Chạy script install dependencies trong VPS và start dự án
  - restart lại pm2


### Trỏ tên miền con(<sub_domain>.<domain_name>) về VPS
-  Các loại records
  - A type: Trỏ một tên miền đến một địa chỉ IPv4.
    - Ví dụ: example.com → 192.0.2.1.
  - CNAME: Ánh xạ một tên miền đến một tên miền khác (bí danh).
  - AAAA Record (IPv6 Address Record): Tương tự như A Record, nhưng trỏ đến một địa chỉ IPv6.
  - MX Record (Mail Exchange Record): Chỉ định máy chủ xử lý email cho tên miền.
  - ...
- Chủ yếu sử dụng A type record
- Cài đặt lưu ý sử dụng  A type và destination trỏ về ip VPS

### Cài đặt và cấu hình nginx
- Khi user truy cập http/https thì sẽ trỏ tới port 80/443, nginx sẽ trở thành 1 Reserve proxy tiếp nhận request vào 2 ports này và chuyển tiếp tới 
server xử lý(nextjs/nodejs)

#### Cài đặt
- sudo apt-get update && sudo apt-get install nginx
- Cấu hình tường lửa
  - sudo ufw app list // list các profiles
  - sudo ufw allow 'Nginx Full' // sử dụng full
    - bao gồm http, https, openssh(truy cập từ xa bằng ssh(secure shell))
    - nếu lỡ chọn sai 
      - sudo ufw delete allow 'Nginx HTTP'
  - sudo ufw status // kiểm tra status
- sau khi cài đặt vào địa chỉ IP VPS sẽ hiển thị Welcome to nginx

#### Thiết lập Reserve Proxy
- cd /etc/nginx/sites-available
- sudo touch <server_name>
  - sudo touch organic-food.chickenkiller.com
- sudo nano <server_name>
  - sudo nano organic-food.chickenkiller.com
- Gắn đoạn code vào trong
```
server {
        listen 80;
        listen [::]:80;

        root /var/www/html;
        index index.html index.htm index.nginx-debian.html;

        server_name <server_name>;

        location / {
                proxy_pass http://localhost:3000;
                proxy_http_version 1.1;
                proxy_set_header Upgrade $http_upgrade;
                proxy_set_header Connection 'upgrade';
                proxy_set_header Host $host;
                proxy_cache_bypass $http_upgrade;
        }
}
```
- Kích hoạt file vừa tạo
  - sudo ln -s /etc/nginx/sites-available/<server_name> /etc/nginx/sites-enabled/
    - sudo ln -s /etc/nginx/sites-available/organic-food.chickenkiller.com /etc/nginx/sites-enabled/
- Để tránh vấn đề hash bucket memory trong tương lai khi chúng ta thêm app, chúng ta cần tinh chỉnh một dòng trong file /etc/nginx/nginx.conf
  - sudo nano /etc/nginx/nginx.conf
  - uncomment dòng: server_names_hash_bucket_size 64
- Kiểm tra lại có lỗi cú pháp trong nginx không
  - sudo nginx -t
- Restart nginx
- Sau đó vào bằng <server_name> là được
  - http://organic-food.chickenkiller.com/customer/home

### Cấu hình mã hóa HTTPS/SSL
- Cài đặt Snapd
  - sudo apt update
  - sudo apt install snapd // cài snapd
  - sudo apt-get remove certbot // gỡ bỏ cài đặt trc đó nếu có
  - sudo snap install --classic certbot // cái certbot
  - sudo ln -s /snap/bin/certbot /usr/bin/certbot // chuẩn bị cerbot command
  - sudo certbot --nginx  // cài và lấy chứng chỉ
    - trả lời các câu hỏi
  - kiểm tra tiến trình làm mới tự động
    - sudo certbot renew --dry-run

#### Hiện tại đang xài free nên chỉ đăng kí dc subdomain trong domain được cung cấp, nó đã cấp phát hết cer nên không đăng kí được nữa

### Kích hoạt HTTP2 trong Nginx
- HTTP/2 là phiên bản kế thừa của HTTP/1.x và cung cấp nhiều ưu điểm như xử lý song song, full multiplex, nén header và thậm chí là cả server push. Điều quan trọng là thiết lập HTTP2 trong NGINX để cải thiện tốc độ và hiệu suất trang web.
- Trước khi kích hoạt thì cần đảm bảo rằng
  - Bạn đang sử dụng Nginx 1.9.5 hoặc hơn. Có thể kiểm tra version bằng câu lệnh nginx -v
  - Bạn đã kích hoạt HTTPS/SSL.
- Đầu tiên cần mở file cấu hình Nginx. Thay thế <server_name> thành tên file cấu hình của bạn
  - sudo nano /etc/nginx/sites-enabled/<server_name>
- Nếu đã kích hoạt SSL trong Nginx rồi thì sẽ có cái dòng này
  - listen 443 ssl;
  - Thêm cái http2 ở phía cuối trước cái dấu ; để thành như thế này
    - listen 443 ssl http2;
  - Kiểm tra lại file cấu hình đúng không 
    - sudo nginx -t
  - Restart lại nginx
    - sudo systemctl restart nginx
  

## Sử dụng Docker để triễn khai dự án
- Xem thêm trong docker-document.md
### Install docker/docker-compose
  - Update system
    - sudo apt-get update
    - sudo apt upgrade -y
  - Install required packages
    - sudo apt install apt-transport-https ca-certificates curl software-properties-common -y
  - Add Docker's official GPG key
    - curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
  - Add the Docker repository
    - echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
  - Update the package database with Docker packages
    - sudo apt update
  - Install docker
    - sudo apt install docker-ce docker-ce-cli containerd.io -y
  - Start and enable Docker
    - sudo systemctl start docker
    - sudo systemctl enable docker
  - Verify Docker installation
    - sudo docker run hello-world
  - Add your user to the Docker group to run Docker without sudo
    - sudo usermod -aG docker ${USER}
  - Install docker-compose
    - sudo curl -L "https://github.com/docker/compose/releases/download/v2.17.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
  - Apply executable permissions to the Docker Compose binary
    - sudo chmod +x /usr/local/bin/docker-compose
  - Verify Docker Compose installation
    - docker-compose --version

### Tạo nginx.conf
- Source: "/docker-compose/docker-compose.yaml"
```
http {
    server {
        listen 80;
        listen [::]:80;
        server_name localhost organic-food.chickenkiller.com;  

        location / {
            proxy_pass http://frontend;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
        }

        location /api/ {
            proxy_pass http://backend;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
        }
    }
}
```

### Tạo docker-compose.yaml
- Source: "/docker-compose/docker-compose.yaml"
```
version: '3.8'

services:
  frontend:
    image: lhoangcuong1996/original_food_client:latest
    ports:
      - "3000:3000"
    networks:
      - docker-network

  backend:
    image: lhoangcuong1996/original_food_server:latest
    ports:
      - "4000:4000"
    networks:
      - docker-network

  nginx:
    image: nginx:latest
    ports:
      - "80:80"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
    networks:
      - docker-network

networks:
  docker-network:
    driver: bridge
```

### Update lại github action
- client:
```
name: Deploy client to VPS

on:
  push:
    branches:
      - master  # hoặc tên nhánh bạn muốn trigger việc deploy
    paths:
      - 'client/**'  # Chỉ trigger khi có thay đổi trong thư mục client
      - ".github/workflows/client-deploy.yml"  # Trigger khi có thay đổi trong file workflow

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout code
      uses: actions/checkout@v4

    - name: Create .env file
      run: |
        echo "My Analyze: ${{ vars.ANALYZE }}"
        echo "My Next Public Access Token Expires In: ${{ vars.NEXT_PUBLIC_ACCESS_TOKEN_EXPIRES_IN }}"
        echo "My Next Public API URL: ${{ vars.NEXT_PUBLIC_API_URL }}"
        echo "My Next Public URL: ${{ vars.NEXT_PUBLIC_URL }}"
        echo DATABASE_URL=${{ secrets.DATABASE_URL }} >> client/.env
        echo ANALYZE=${{ vars.ANALYZE }} >> client/.env
        echo NEXT_PUBLIC_ACCESS_TOKEN_EXPIRES_IN=${{ vars.NEXT_PUBLIC_ACCESS_TOKEN_EXPIRES_IN }} >> client/.env
        echo NEXT_PUBLIC_API_URL=${{ vars.NEXT_PUBLIC_API_URL }} >> client/.env
        echo NEXT_PUBLIC_URL=${{ vars.NEXT_PUBLIC_URL }} >> client/.env
        echo NEXT_PUBLIC_GOOGLE_CLIENT_ID=${{ secrets.NEXT_PUBLIC_GOOGLE_CLIENT_ID }} >> client/.env

    - name: Login to Docker Hub
      uses: docker/login-action@v1
      with:
        username: ${{ secrets.DOCKER_USERNAME }}
        password: ${{ secrets.DOCKER_PASSWORD }}

    - name: Build and push docker image
      uses: docker/build-push-action@v2
      with:
        context: client
        file: client/Dockerfile
        push: true
        tags: ${{ secrets.DOCKER_NAMESPACE }}/organic_food_client:latest # Namespace: lhoangcuong1996
    
    - name: SSH into VPS and deploy
      uses: appleboy/scp-action@master
      with:
        host: ${{ secrets.HOST }}
        username: ${{ secrets.USER }}
        key: ${{ secrets.SSH_PRIVATE_KEY }}
        port: 22
        source: "config/docker-compose.yml,config/nginx.conf"
        target: "/home/projects/organic-food/"
    
    - name: Deploy to VPS
      uses: appleboy/ssh-action@master
      with:
        host: ${{ secrets.HOST }}
        username: ${{ secrets.USER }}
        key: ${{ secrets.SSH_PRIVATE_KEY }}
        script: |
          cd /home/projects/organic-food/config
          docker-compose down
          docker-compose up -d

```