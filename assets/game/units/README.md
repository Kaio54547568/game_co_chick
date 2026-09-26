# Hình nền 30 Unit Global Success

Bộ này có 30 cảnh riêng, theo đúng thứ tự 10 Unit/lớp của Global Success 10, 11 và 12. Chủ đề được lấy từ danh mục Unit đối chiếu với ba sách do người dùng cung cấp. Mỗi cảnh được vẽ mới theo hướng cổ trang Việt Nam; không sao chép hình minh họa trong sách.

- `grade-10/`, `grade-11/`, `grade-12/`: mỗi Unit có ảnh nền 1280 x 720 (`unit-XX.jpg`) và ảnh thẻ 480 x 270 (`unit-XX-card.jpg`).
- `manifest.json`: tên chủ đề, đường dẫn và kích thước để màn chọn ải hoặc màn nội dung nạp ảnh.
- `contact-sheet.jpg`: bảng xem nhanh cả 30 ảnh.
- Ảnh PNG gốc nằm tại `assets/source/units/grade-XX/unit-XX.png` để chỉnh sửa hoặc xuất lại ở kích thước khác.

Các ảnh này là **cảnh nền/key art** của từng Unit. Nhân vật, quái, vật phẩm, UI và VFX dùng lại từ các nhóm asset hiện có trong `assets/game/`. Cảnh nền không phải tilemap top-down có collision. Khi triển khai 30 màn chơi có thể dùng ngay cho thẻ chọn ải, màn mở đầu, đấu trường hoặc màn kết quả; world map tương tác vẫn cần thiết kế layout và collision riêng.

Chạy `python tools/package_unit_scenes.py` từ thư mục gốc để xuất lại ảnh JPG, thẻ và manifest từ PNG gốc.

## Bộ mở rộng quái, Boss, mặt đất và đạo cụ

- `expansion-manifest.json` liệt kê các sprite và tile đã tạo, gồm đường dẫn, kích thước và điểm neo.
- `expansion-status.json` cho biết số asset đã có và còn thiếu của từng Unit theo chỉ tiêu 6 kẻ địch, 1 mặt đất, 1 đạo cụ và Boss tại Unit 3, 6, 10 mỗi lớp.
- `enemy-contact-sheet.jpg` là bảng xem nhanh các sprite kẻ địch đã tạo.
- `grade-11/asset-preview.jpg` cho xem toàn bộ đội hình, hai nền đất, hai đạo cụ và Boss của từng Unit lớp 11. Mỗi Unit lớp 11 hiện có 7 sprite địch riêng, 2 tile nền và 2 đạo cụ.
- `grade-12/asset-preview.jpg` cho xem toàn bộ tài nguyên lớp 12. Mỗi Unit lớp 12 có 7 sprite địch riêng, 2 tile nền và 2 đạo cụ; Boss xuất hiện tại Unit 3, 6 và 10.
- Ba Boss tại 10-03, 11-06 và 12-10 dùng lại các Boss trong `assets/game/characters/bosses/`; sáu Boss mốc còn lại có sprite mới trong thư mục Unit.

Ảnh quái/Boss hiện là **pose tĩnh**. Các tile mặt đất được AI tạo với yêu cầu lặp liền mạch nhưng chưa kiểm tra đường nối 2 x 2 hoặc sửa cạnh, nên `tileableVerified` trong manifest là `false`. Cần hoàn thiện tile, animation, hitbox và logic xuất hiện quái trước khi dùng trên map tương tác.

Chạy `python tools/package_unit_expansion.py` rồi `python tools/report_unit_expansion.py` để xuất lại ảnh và cập nhật trạng thái từ các catalog trong `tools/unit_expansion_sources*.json`.
