Thông tin Sinh Viên:
Đặng Minh Triết - 25730155

Phạm Trần Đức Trọng - 25730156

Hoàng Chí Công - 25730101 

# Snake Game

Game rắn săn mồi chạy trên trình duyệt (HTML5 Canvas). Điều khiển con rắn ăn thức ăn để dài ra và tăng điểm; tránh đâm tường và cắn vào thân mình.

## Nội dung & luật chơi

- Lưới **30×30 ô**, mỗi bước di chuyển theo chu kỳ cố định.
- **Ăn mồi** (chấm đỏ): +1 điểm, rắn dài thêm một ô.
- **Game over** khi đâm **biên** màn hình hoặc **cắn vào thân**.
- Có màn **bắt đầu** và màn **game over** với nút chơi lại.

## Điều khiển

| Phím / thao tác | Chức năng |
|-----------------|-----------|
| **Mũi tên** (↑ ↓ ← →) | Đổi hướng di chuyển (không quay ngược 180° ngay lập tức). |
| **Phím cách (Space)** | Tạm dừng / tiếp tục khi đang chơi. |
| **R** | Khi đã game over: bắt đầu ván mới (tương tự nút “Chơi lại”). |
| **Bắt đầu** / **Chơi lại** | Nút trên giao diện. |

## Cách chạy game (start)

Không cần cài dependency. Chọn một trong hai cách:

### 1. Mở trực tiếp file HTML

Mở file `index.html` bằng trình duyệt (kéo thả vào cửa sổ trình duyệt hoặc chuột phải → Open With).

### 2. Dùng server cục bộ (khuyến nghị nếu trình duyệt chặn một số tính năng)

Trong thư mục dự án, chạy ví dụ:

```bash
python3 -m http.server 8080
```

Sau đó truy cập: `http://localhost:8080` và mở `index.html` (hoặc trang mặc định nếu bạn đặt tên `index.html` ở gốc thì vào `http://localhost:8080/`).

Trên màn hình game, nhấn **“Bắt đầu”** để vào ván chơi.
