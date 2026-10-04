# 👑 Princess Portfolio • Nguyễn Linh Giang ✨

Hồ sơ năng lực trực tuyến phong cách Công Chúa Hoàng Gia (Princess Theme) dành cho **Nguyễn Linh Giang** — E-commerce Intern & Marketing Communication từ Trường Đại học Ngoại thương (FTU).

---

## 🌸 Tính Năng Nổi Bật (Royal Features)

1. **🎶 Nhạc Hộp Gỗ Hoàng Gia (Princess Instrumental Music Box)**:
   - Bản hòa tấu nhạc hộp gỗ & đàn hạc (harp / music box waltz) nhẹ nhàng, du dương theo chuẩn Web Audio API.
   - Nút bật/tắt (Play / Mute) với hiệu ứng sóng âm nhạc (soundwaves equalizer).
   - Hoạt động 100% offline, không phụ thuộc file mp3 ngoài, không bao giờ bị lỗi kết nối mạng.

2. **✨ Hiệu Ứng Bụi Sao & Cánh Hoa Rơi (Sparkle Stardust Engine)**:
   - Canvas nền tự động tạo cánh hoa anh đào và bụi sao lấp lánh nhẹ nhàng trôi lơ lửng.
   - Con trỏ chuột tạo vệt sao ma thuật lấp lánh (`✨`, `🌸`, `💫`, `💖`, `⭐`) theo từng cử động.

3. **🌐 Chuyển Đổi Song Ngữ (Bilingual Toggle: Tiếng Việt 🇻🇳 / English 🇬🇧)**:
   - Dễ dàng chuyển đổi chỉ bằng 1 cú click giữa nội dung gốc tiếng Việt và bản dịch tiếng Anh chuẩn chuyên nghiệp dành cho nhà tuyển dụng quốc tế.
   - Tự động lưu thiết lập ngôn ngữ vào trình duyệt (`localStorage`).

4. **📸 Tùy Biến Chân Dung Hoàng Gia (Custom Portrait)**:
   - Khung ảnh dát vàng hoàng gia với vương miện lấp lánh.
   - Hỗ trợ đổi ảnh chân dung thực tế của Linh Giang trực tiếp ngay trên website (lưu tự động vào trình duyệt).

5. **💎 Kho Bảo Ngọc Dự Án (Interactive Project Showcase)**:
   - Bộ lọc phân loại: Tất cả, Vận hành TMĐT, Nội dung & Media, Tổ chức sự kiện.
   - Hộp thoại Modal xem chi tiết mục tiêu, quy mô, công cụ và kết quả đạt được.

6. **📜 Biên Niên Sử Sự Nghiệp (Royal Timeline)**:
   - Nhân viên Vận hành Sàn Thương Mại Điện Tử (02/2026 - 09/2026).
   - Sales Assistant & Warehouse Operations Executive tại IM FINE (09/2025 - 01/2026).
   - Thành viên Ban Tổ chức & Leader Hậu cần / Truyền thông CLB Truyền thông Ngoại thương (11/2023 - 12/2024).

7. **💌 Bồ Câu Đưa Thư (Royal Courier & One-Click Copy)**:
   - Nút sao chép 1 chạm thông tin Số điện thoại, Email, Địa chỉ với thông báo bong bóng hoàng gia.
   - Form gửi thư điện tử với phong cách niêm phong sáp đỏ hoàng triều.

---

## 🚀 Cách Mở & Xem Trang Web

### Cách 1: Mở Trực Tiếp Trên Trình Duyệt
- Nhấp đúp chuột vào file: `preview-portfolio.command`
- Hoặc mở trực tiếp file `index.html` bằng Google Chrome, Safari hoặc Edge.

### Cách 2: Chạy Bằng Dòng Lệnh Terminal
```bash
open /Users/macos/.gemini/antigravity/scratch/princess-portfolio-linhgiang/index.html
```

---

## 🌐 Triển Khai Lên GitHub Pages (Publish to GitHub)

### Cách 1: Chạy Script Tự Động
Chạy file script `deploy-github.sh` đi kèm (có thể truyền URL repo của bạn):
```bash
cd /Users/macos/.gemini/antigravity/scratch/princess-portfolio-linhgiang
./deploy-github.sh https://github.com/TÊN_NGƯỜI_DÙNG/TÊN_REPO.git
```

### Cách 2: Thực Hiện Từng Lệnh Git Thủ Công
```bash
cd /Users/macos/.gemini/antigravity/scratch/princess-portfolio-linhgiang

# 1. Khởi tạo Git & tạo nhánh main
git init
git branch -M main

# 2. Thêm toàn bộ mã nguồn & tạo commit
git add .
git commit -m "feat: Princess-Themed Online Portfolio for Nguyễn Linh Giang 👑✨"

# 3. Liên kết với kho GitHub (thay URL bằng link repo của bạn)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git

# 4. Đẩy mã nguồn lên GitHub
git push -u origin main
```

Sau khi đẩy mã nguồn:
1. Vào mục **Settings** trong kho GitHub của bạn.
2. Chọn **Pages** ở cột menu bên trái.
3. Tại phần **Branch**, chọn nhánh `main` và thư mục `/ (root)`, sau đó nhấn **Save**.
4. Website của nàng công chúa sẽ online tại: `https://<YOUR_USERNAME>.github.io/<YOUR_REPO>/`!

## 📂 Cấu Trúc Thư Mục
```
princess-portfolio-linhgiang/
├── index.html                      # Trang web chính
├── preview-portfolio.command       # Phím tắt mở nhanh trên macOS
├── README.md                       # Tài liệu hướng dẫn
└── assets/
    ├── css/
    │   └── princess-theme.css      # Toàn bộ hiệu ứng, font và màu sắc hoàng gia
    ├── js/
    │   └── princess-magic.js       # Bộ máy nhạc hộp gỗ, hạt sao, song ngữ & tương tác
    └── images/
        └── princess_avatar.svg     # Tranh minh họa chân dung công chúa hoàng gia
```
