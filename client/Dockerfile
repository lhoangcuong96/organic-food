# Sử dụng Node.js làm base image
FROM node:22-alpine

# Tạo thư mục làm việc trong container
WORKDIR /app

# Cài đặt pnpm
RUN npm install -g pnpm

# Sao chép package.json và package-lock.json (nếu có)
COPY package*.json ./

# Cài đặt dependencies
RUN pnpm install


# Sao chép toàn bộ mã nguồn
COPY . .

# Chạy lệnh generate cho prisma
RUN npx prisma generate

# Build ứng dụng Next.js
RUN npm run build

# Expose cổng mà ứng dụng sẽ chạy
EXPOSE 3000

# Chạy ứng dụng
CMD ["npm", "start"]