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

## Prompt đã dùng cho bốn Hộ Pháp Việt Nam

Mỗi nhân vật được tạo riêng **hai lần bằng imagegen tích hợp**: chân dung dùng ảnh mặt thật làm tham chiếu; sprite dùng ảnh mặt thật và chân dung vừa duyệt. Cả hai yêu cầu nền alpha trong suốt, một nhân vật, không chữ/khung/watermark. Hướng thiết kế mới ưu tiên cảm hứng Việt Nam, tránh hanfu, chữ Hán, mái chùa Trung Hoa và rồng kiểu Trung Hoa.

**Mẫu chân dung:** `Use case: stylized-concept. Asset type: polished waist-up dialogue portrait for a 2D educational RPG. Input image: facial identity reference for this character only. Create [character-specific description]. Distinctly Vietnamese cultural art direction, Vietnamese historical clothing inspiration reimagined as tasteful fantasy game art. Semi-realistic cinematic painting, detailed fabric, clean silhouette, three-quarter view, head and upper body fully inside frame, hands and thematic prop visible. Preserve the person's identity, natural age, hair and glasses where present; do not copy the modern outfit or photo background. Truly transparent background, no scenery, frame, text or watermark. Avoid hanfu, Chinese characters, pagodas and dragon motifs.`

**Mẫu sprite:** `Use case: stylized-concept. Asset type: single idle NPC sprite for a top-down 3/4 2D game. Image 1: real facial identity; Image 2: approved portrait/costume. Create one full-body [character-specific description]. Preserve face, hair, glasses and outfit palette. Vietnamese áo ngũ thân/áo tứ thân-inspired tailoring with lotus and Đông Sơn decorative motifs. Elevated camera, entire head, legs, shoes and both feet visible, readable silhouette at 160×192 px, compact prop away from face. Semi-realistic painterly art, genuine transparent background, no scenery, lettering, watermark or other people.`

| Nhân vật | Mô tả riêng đưa vào cả hai prompt |
| --- | --- |
| Đặng Trần Hà | Male Vietnamese Hộ Pháp of grammar and logic; round black glasses, short side-parted black hair; navy blue and muted bronze áo ngũ thân/áo giao lĩnh-inspired scholarly robes with Đông Sơn embroidery; bamboo ruler and manuscript scroll; calm thoughtful expression. |
| Hoàng Vân | Female Vietnamese Hộ Pháp of listening, rhythm and energy; rectangular glasses, shoulder-length chestnut hair, warm smile; saffron yellow and orange áo tứ thân-inspired outfit with lotus motifs; small bronze bell and restrained sound-wave ribbons. |
| Phương Tú | Female Vietnamese Hộ Pháp of vocabulary and growth; wavy black bob and red lips; leaf-green áo ngũ thân-inspired scholar outfit with bamboo and lotus embroidery; small book and bamboo brush; confident gentle expression. |
| Nguyệt Nguyễn | Female Vietnamese Hộ Pháp of reading and wisdom; long wavy dark brown hair and calm smile; moon-white, silver and pale-blue áo ngũ thân-inspired scholar robes with lotus and Đông Sơn trim; open manuscript book. |
