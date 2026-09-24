# Prompt art direction và asset

Các ảnh nguồn được tạo bằng công cụ `image_gen` tích hợp. Prompt đã dùng theo nhóm, với nội dung riêng cho từng đối tượng:

- **Phong cách chung:** “Cinematic semi-realistic painterly wuxia fantasy, rich layered robes, subtle embroidery, red-black-gold palette with jade and deep-purple accents, crisp silhouette, 3/4 top-down game view, no text, no watermark.”
- **Avatar người chơi:** hai thiếu hiệp nguyên bản, nam/nữ, áo đỏ–đen thêu vàng, kiếm đeo bên người; một pose full-body nền trong suốt. Dùng ảnh đó làm tham chiếu để tạo sheet bốn hướng cùng trang phục và tỷ lệ.
- **NPC phụ:** Lão Ngư Phu mặc đồ kem/xanh jade, nón lá và cần câu; thương nhân mặc đồ olive/kem, đeo túi hàng. Full-body, 3/4 top-down, alpha trong suốt.
- **Bang Chủ Hà Ánh Phượng:** ảnh người dùng gửi là tham chiếu nhận diện (gương mặt, tóc ngang vai, kính đen); ảnh phong cách kiếm hiệp là tham chiếu trang phục/ánh sáng. Tạo portrait hội thoại và sprite NPC toàn thân với áo đỏ–đen thêu vàng, chi tiết jade, alpha trong suốt. Giữ nhận diện của ảnh thật, không mượn gương mặt từ ảnh phong cách.
- **Quái:** kiếm đồ mặt nạ đen/tím; hắc khí yêu ma phi nhân dạng; kiếm đồ tinh anh giáp obsidian. Full-body, 3/4 top-down, alpha trong suốt.
- **Boss:** Loạn Ngữ Kiếm Ma với chữ vỡ và kiếm đỏ; Vong Từ Quỷ Vương với dải giấy trống; Mê Âm Yêu Cơ với chuông và sóng âm; Thiên Diện Huyễn Sư với mặt nạ ảo; Vô Ngôn Ma Tôn giáp obsidian và áo choàng đỏ. Mỗi Boss một sprite nguyên bản, alpha trong suốt.
- **Landmark:** Sơn Môn cột đỏ mái ngói đen; Tàng Kinh Các hai tầng; Trúc Lâm xanh jade; cổng Ma Giáo đá đen/tím. 3/4 top-down, vật thể độc lập, không chữ.
- **Ground:** sân đá cũ và đường đất rừng trúc, nhìn thẳng từ trên xuống, mẫu vuông, yêu cầu seamless/tileable.
- **Vật phẩm:** Anh Ngữ Bí Điển bìa đỏ khóa jade; kiếm khởi đầu thép đen/gác đồng; rương sơn đen khóa jade. 3/4 top-down, nền trong suốt.
- **Vật thể tương tác:** bệ phong ấn đá/jade, cọc luyện công gỗ bọc vải đỏ, đèn lồng đỏ ánh vàng; thêm ngọc bội làm phụ kiện. 3/4 top-down, nền trong suốt.
- **Combat:** sân đấu cổ buổi chiều, nền đá rộng ở giữa, mái ngói đen/cột đỏ phía sau, sương tím viền, không nhân vật, khung ngang 16:9.

Các prompt tránh sao chép khuôn mặt người thật trong ảnh phong cách. UI/VFX được vẽ bằng script trong `tools/package_assets.py` để kích thước và nét đồng nhất.

## Prompt đã dùng cho Bang Chủ Hà Ánh Phượng

**Portrait hội thoại — imagegen tích hợp, 2 ảnh tham chiếu:**

> Use case: identity-preserve. Asset type: dialogue portrait for a 2D wuxia educational RPG. Image 1 is the identity reference for the real adult woman Ms. Hà Ánh Phượng: preserve her recognizable face shape, natural age, skin tone, shoulder-length dark straight hair, black rectangular glasses, and warm composed expression. Image 2 is ONLY a visual style and wardrobe reference; do not use its person's face or identity. Create a polished waist-up portrait of Ms. Hà Ánh Phượng as the honorable Wulin sect leader, wearing layered crimson and black wuxia robes with fine restrained gold embroidery, subtle jade ornament, dignified but welcoming posture, facing 3/4 toward camera. Cinematic semi-realistic painted finish, detailed natural facial likeness, warm golden side lighting. Genuine transparent alpha background with clean cutout edges, no scenery, no lettering, no logos, no watermarks, no border. One person only.

**Sprite NPC — imagegen tích hợp, ảnh mặt thật và portrait đã tạo làm tham chiếu:**

> Use case: identity-preserve. Asset type: game-ready top-down 2D NPC sprite for the same adult Ms. Hà Ánh Phượng. Image 1 is the real face identity reference; image 2 is the approved costume and character design reference. Keep recognizable black rectangular glasses, shoulder-length dark straight hair, natural adult face and the same ornate layered crimson-black-gold wuxia sect-leader robes with jade detail. Create exactly ONE full-body idle pose, 3/4 top-down camera looking down about 35 degrees, feet fully visible, calm dignified leader stance, one hand resting on a sheathed sword, compact silhouette that reads clearly when rendered at 160x192 pixels. Cinematic semi-realistic painted game art matching image 2, with slightly simplified detail for small-scale readability. Genuine transparent alpha background, clean cutout edges, subtle contact shadow, no scenery, no text, no labels, no border, no other people.
