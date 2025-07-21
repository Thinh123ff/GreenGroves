# Green Groves - Hướng dẫn cài đặt & chạy dự án

## 1. Yêu cầu hệ thống
- **PHP** >= 7.4 (khuyến nghị dùng XAMPP, Laragon, MAMP...)
- **MySQL/MariaDB**
- **Composer** (quản lý thư viện PHP)
- **Node.js** >= 16.x và **npm**

## 2. Clone mã nguồn
```bash
git clone <link-repo>
cd <tên-thư-mục-dự-án>
```

## 3. Cài đặt backend PHP
### a. Cài đặt thư viện PHP
```bash
cd project
composer install
```
> Đảm bảo file `composer.json` có dòng sau:
> ```json
> {
>   "require": {
>     "google/apiclient": "2.0"
>   }
> }
> ```

### b. Tạo database và import dữ liệu
- Tạo database mới, ví dụ: `greentools_db`
- Import các file SQL:
  - `project/backend/config/database.sql`
  - `project/backend/config/user.sql`
  - `project/backend/config/cart.sql`

### c. Cấu hình kết nối database
- Sửa file `project/backend/config/config.php` cho đúng thông tin:
  ```php
  $host = 'localhost';
  $db = 'greentools_db';
  $user = 'root';
  $pass = '';
  ```

## 4. Cài đặt Node.js cho email-server
### a. Cài thư viện Node.js
```bash
npm install
```
> Thư mục gốc có file `package.json` với các thư viện: express, nodemailer, dotenv, cors...

### b. Tạo file `.env` ở thư mục gốc:
```
SHOP_EMAIL=yourshop@gmail.com
SHOP_EMAIL_PASSWORD=your_app_password
```
> Lưu ý: SHOP_EMAIL_PASSWORD là app password (không phải mật khẩu Gmail thông thường, xem hướng dẫn tạo app password cho Gmail).

### c. Chạy server email:
```bash
node email-server.cjs
```
> Server sẽ chạy tại http://localhost:3000

## 5. Cài đặt & chạy frontend React (Vite)
```bash
cd project/project
npm install
npm run dev
```
- Truy cập: http://localhost:5173 (hoặc port Vite báo)

## 6. Cấu hình Google Login
- Đăng ký OAuth 2.0 trên Google Cloud Platform để lấy `client_id` và `client_secret`.
- Sửa các file:
  - `project/backend/auth/google_login.php`
  - `project/backend/auth/google_callback.php`
- Đảm bảo `client_id`, `client_secret`, và `redirect_uri` đúng với domain/máy bạn.

## 7. Một số lưu ý khác
- Nếu dùng XAMPP/Laragon, copy dự án vào `htdocs` hoặc `www`.
- Đảm bảo các port không bị trùng (3000 cho email-server, 5173 cho Vite, 80/8080 cho Apache).
- Nếu có lỗi CORS, kiểm tra lại cấu hình `origin` trong email-server.cjs và các file PHP.

---

## 8. Tổng hợp lệnh cài đặt nhanh
```bash
# Backend PHP
cd project
composer install

# Node.js (email-server)
npm install
node email-server.cjs

# Frontend React
cd project/project
npm install
npm run dev
```

---

## 9. Liên hệ hỗ trợ
- Nếu gặp lỗi, hãy kiểm tra lại các bước trên hoặc liên hệ quản trị dự án. 