# Elasticsearch

## Table of Contents

1. [Các khái niệm cơ bản](#các-khái-niệm-cơ-bản)
    1. [Tổng quan tính năng](#tổng-quan-các-tính-năng)
    2. [Các khái niệm chính](#các-khái-niệm-chính)
2. [Cài đặt](#cài-đặt)
3. [Thêm index, mapping, data với elasticsearch](#thêm-index-mapping-data-với-elasticsearch)
    1. [Thêm index](#create-index)
    2. [Thêm data](#thêm-data)
4. [API convention](#api-convention)


## Các khái niệm cơ bản

### Tổng quan các tính năng
- Elasticsearch là một server tìm kiếm dựa trên Apache
- Elasticsearch có thể scale up lên tới hàng petabytes dữ liệu có cấu trúc hoặc không cấu trúc
- Có thể thay thế những document store như MongoDB hay RavenDB
- Sử dụng phi chuẩn hoá để tối ưu hiệu suất tìm kiếm
- Là một trong các engine được yêu thích nhất trong các doanh nghiệp 
- Là một open source 

### Các khái niệm chính
- Node:
    - Nó là 1 instance của elasticsearch, 1 server có thể có nhiều nodes
- Cluster:
    - Nó là một tập hợp của các nodes. Cluster có khả năng lập index hoặc tìm kiếm trên toàn bộ nodes cho toàn bộ dữ liệu
- Index:
    - Là tập hợp các kiểu document khác nhau và những thuộc tính của nó. Index có thể được xem là 1 table trong các hệ thống quản lý csdl truyền thống
- Document:
    - Document là tập hợp của các trường được định nghĩa cụ thể. Mỗi document sẽ thuộc về 1 type và nằm trong 1 index.
- Shard:
    - Index sẽ được phân mảnh thành các shards. Mỗi shard sẽ chứa 1 phần của 1 document()
    - Có nghĩa mỗi shard sẽ chứa các thông tin khác nhau của 1 index
    - Nếu vậy càng nhiều shards càng tốt?
        - Sai mỗi shard yêu cầu tài nguyên hệ thống, càng nhiều càng lãng phí mà thôi
        - Tăng độ phức tạp lên trong việc quản lý và bảo trì
    - Khi thực hiện tìm kiếm trong một hệ thống có nhiều shards, mỗi shard sẽ thực hiện tìm kiếm song song.
- Replicas:
    - Elasticsearch cho phép tạo ra các replicas(bản sao) của các indexes và shards. Nó giúp tăng tính sẵn sàng khi bị lỗi, và tăng hiệu năng tìm kiếm bằng cách tìm kiếm song song trên những replicas
    - Khác với shard là chia nhỏ index để tìm kiếm thì replicas nhân lên để tìm kiếm

- So sánh Elasticsearch và CSDL truyền thống
    + Cluster <=> Database
    + Shard <=> Shard
    + Index <=> Table
    + Field <=> Column
    + Document <=> Row

## Cài đặt
- Docker:
    - Pull:
        - docker pull elasticsearch:tag
        - docker pull kibana:tag        #Kibana là giao diện giành cho elasticsearch 
    - Run
        - docker network create elastic
        - docker run -d --name elasticsearch --net elastic -p 9200:9200 -p 9300:9300 -e "discovery.type=single-node" elasticsearch:<image_tag>
        - docker run -d --name kibana --net elastic -p 5601:5601 kibana:<image_tag>
    - Sử dụng kibana:
        - Truy cập http://localhost:5601/ để vào kibana(nếu k dc 127.0.0.1:5601)
            - Kibana sẽ yêu cầu enrollment token
                - Exec câu lệnh bin/elasticsearch-create-enrollment-token -s kibana trong elasticsearch container
                    - docker exec -it elasticsearch bin/elasticsearch-create-enrollment-token -s kibana
                    - hoặc có thể vào docker desktop=> container để exec câu lệnh
            - Kibana sẽ yêu cầu verification code:
                - Vào trong docker desktop phần log để xem
                - Hoặc có thể sử dụng: 
                    - docker logs kibana
            - Sau đó Kibana sẽ yêu cầu id, pass của elasticsearch
                - id: elastic
                - password:
                    - docker exec -it elasticsearch bin/elasticsearch-reset-password -u elastic

- Docker compose
    - Tạo file docker-compose.yaml
    ```
    elasticsearch:
        image: docker.elastic.co/elasticsearch/elasticsearch:8.17.0
        environment:
        - discovery.type=single-node
        - ES_JAVA_OPTS=-Xms512m -Xmx512m
        - ELASTIC_PASSWORD=123456
        volumes:
        - .esdata:/usr/share/elasticsearch/data
        ports:
        - "9200:9200"
        networks:
        - docker-network

    kibana:
        image: docker.elastic.co/kibana/kibana:8.17.0
        environment:
        - ELASTICSEARCH_URL=http://elasticsearch:9200
        - ELASTICSEARCH_USERNAME=elastic
        - ELASTICSEARCH_PASSWORD=123456
        ports:
        - "5601:5601"
        networks:
        - docker-network
    networks:
    docker-network:
        driver: bridge

    ```
    
## Thêm index, mapping, data với elasticsearch
- Có thể vào trong Kibana -> devtool

### Create index
- PUT <index_name>
    - PUT product

### Thêm data
- Thêm 1
```
POST school/_doc
{
    "name":"Saint Paul School", "description":"ICSE Afiliation",
   "street":"Dawarka", "city":"Delhi", "state":"Delhi", "zip":"110075",
   "location":[28.5733056, 77.0122136], "fees":5000,
   "tags":["Good Faculty", "Great Sports"], "rating":"4.5"
}
```
- Thêm nhiều
```
POST school/_bulk
{"create":{}}
{
    "name":"Saint Paul School2", "description":"ICSE Afiliation",
    "street":"Dawarka", "city":"Delhi", "state":"Delhi", "zip":"110075",
    "location":[28.5733056, 77.0122136], "fees":5000,
    "tags":["Good Faculty", "Great Sports"], "rating":"4.5"
}
{"create":{}}
{
    "name":"Saint Paul School3", "description":"ICSE Afiliation",
    "street":"Dawarka", "city":"Delhi", "state":"Delhi", "zip":"110075",
    "location":[28.5733056, 77.0122136], "fees":5000,
    "tags":["Good Faculty", "Great Sports"], "rating":"4.5"
}
```

## API convention

### Multiple Indices
- Elastic cho phép các tác động tới nhiều index trong cùng 1 query

#### Bằng dấu phẩy
```
POST /index1,index2,index3/_search
{
   "query":{
      "query_string":{
         "query":"Saint Paul School3"
      }
   }
}
```

#### Bằng keyword _all
```
POST /_all/_search
{
  "query":{
      "query_string":{
         "query":"Saint Paul School3"
      }
   }  
}
```

#### Bằng các kí tự(Wildcards)
```
POST /school*/_search
POST /school*,-schools_gov/_search
```
- Chặn error nếu như không có index match với kết quả
    - POST /schools_pri*/_search?allow_no_indices = true
- expand_wildcards
    - Tuỳ chọn này cho phép xác định index thuộc loại nào
        - open: index đang mở, có thể ghi
        - closed: index không hoạt động
        - none
        - all: tất cả, mặc định
    - POST /school*/_search?expand_wildcards = closed
    