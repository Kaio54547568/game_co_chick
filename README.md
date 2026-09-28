# GLOBAL SUCCESS WULIN
> **Tam Niên Anh Ngữ – Nhất Thống Võ Lâm**  
> *Bản Thử Nghiệm Vertical Slice (1 Unit Demo — 10–15 phút trải nghiệm trên Desktop & Mobile)*

Dự án game nhập vai kiếm hiệp học tiếng Anh (Educational Wuxia RPG) kết hợp giữa **React + TypeScript + Vite**, **Phaser 3** (Top-down 2D World), và **Tailwind CSS** (Giao diện Kiếm hiệp cổ phong).

---

## 1. Hướng Dẫn Cài Đặt & Chạy Game

### Yêu cầu môi trường
- **Node.js**: Phiên bản 18 trở lên (khuyến nghị Node 20+)
- **NPM**: Đi kèm với Node.js

### Các lệnh thực thi
1. **Cài đặt thư viện:**
   ```bash
   npm install
   ```

2. **Chạy máy chủ phát triển (Dev Server):**
   ```bash
   npm run dev
   ```
   Trình duyệt sẽ mở tại: `http://localhost:3000` (hoặc cổng được hiển thị trong terminal). Hỗ trợ responsive cả giao diện desktop lẫn mobile.

3. **Chạy bộ kiểm thử tự động (Vitest Suite):**
   ```bash
   npm test
   ```
   Chạy 17 ca kiểm thử bao phủ toàn bộ logic Combat Engine, Quest Progression, Lưu trữ LocalStorage và Luồng End-to-End Vertical Slice 1 Unit.

4. **Build kiểm tra đóng gói (Production Build):**
   ```bash
   npm run build
   ```
   Đóng gói độc quyền thư mục `assets/game/` vào bản phân phối `dist/`, cách ly hoàn toàn tài liệu GDD, file source PSD và ảnh tham chiếu nhạy cảm.

5. **Xem bản build thử nghiệm:**
   ```bash
   npm run preview
   ```

---

## 2. Cấu Trúc Mã Nguồn

```text
game_co_chick/
├── assets/                          # Kho asset game chuẩn hóa
│   ├── game/                        # Nhân vật, quái, Boss, địa danh, đạo cụ, UI, VFX
│   │   ├── characters/              # Player (nam/nữ), NPC, Quái, Bosses
│   │   ├── combat/                  # Nền đấu trường courtyard_arena.jpg
│   │   ├── items/                   # Kiếm, ngọc bội, bí tịch, rương báu
│   │   ├── ui/                      # Icons HUD, panel 9-slice, controls joystick/nút đánh
│   │   ├── vfx/                     # Hit spark, critical spark, quest glow
│   │   └── world/                   # Địa danh (Sơn Môn, Tàng Kinh Các, Trúc Lâm, Cấm Địa)
│   ├── references/                  # GDD v1.0 và hình ảnh tham chiếu phong cách
│   ├── manifest.json                # Thông số kích thước, origin, frame của từng asset
│   └── NHAN_VAT_CHO_ANH_THAM_CHIEU.md # Bang Chủ và 4 Hộ Pháp đã có ảnh; Liên Phạm chờ ảnh thật
├── public/
│   └── assets                       # Directory junction liên kết tới thư mục assets
├── src/
│   ├── components/                  # Giao diện UI React (Tailwind Wuxia Style)
│   │   ├── StartScreen.tsx          # Chọn avatar Nam/Nữ, đặt tên, tiếp tục save
│   │   ├── TopHUD.tsx               # Avatar, Level, HP, XP, Công Lực, Tiến độ Unit
│   │   ├── BottomNav.tsx            # Thanh điều hướng nhanh & nút Tương Tác
│   │   ├── VirtualJoystickUI.tsx    # Cần điều khiển ảo cảm ứng cho Mobile
│   │   ├── DialogueModal.tsx        # Hội thoại Bang Chủ (marker trung tính, giao diện chữ)
│   │   ├── VocabularyModal.tsx      # Tàng Kinh Các: Tra cứu 6 từ vựng, phát âm speech
│   │   ├── ChallengeModal.tsx       # Phong Ấn Tri Thức: Thử thách 3 câu hỏi lấy Thần Binh
│   │   ├── CombatOverlay.tsx        # Đấu trường chiến đấu: Timer, Combo, Critical, Boss 2 Phase
│   │   ├── InventoryModal.tsx       # Hành Trang & Trang bị 3 slot (Vũ khí, Ngọc bội, Bí kíp)
│   │   ├── QuestListModal.tsx       # Danh sách 5 nhiệm vụ Onboarding & Tiến độ Unit
│   │   ├── VictoryModal.tsx         # Màn hình vinh quy khi đánh bại Boss
│   │   └── SettingsModal.tsx        # Cài đặt âm thanh, hướng dẫn & nút reset tiến độ
│   ├── game/                        # Nhân game Phaser 3
│   │   ├── config.ts                # Cấu hình Arcade Physics, Scale resize
│   │   ├── EventBus.ts              # Cầu nối truyền thông hai chiều giữa Phaser và React
│   │   └── scenes/
│   │       ├── BootScene.ts         # Preload toàn bộ sprite sheet, ảnh, landmarks, vfx
│   │       └── WorldScene.ts        # Thế giới top-down, camera follow, physics collision
│   ├── data/
│   │   ├── demoLearningData.ts      # Bộ từ vựng & câu hỏi chiến đấu [DEMO DATA]
│   │   ├── questsData.ts            # Chuỗi 5 nhiệm vụ Onboarding Unit 1
│   │   └── itemsData.ts             # Danh mục vật phẩm trang bị khởi đầu
│   ├── services/
│   │   ├── storage.ts               # Lớp trừu tượng StorageService lưu localStorage
│   │   ├── sound.ts                 # Web Audio API Synthesizer (SFX chém kiếm, bạo kích, chuông)
│   │   └── combatEngine.ts          # Tính sát thương, Bạo kích (<3s), Combo, Công Lực
│   ├── types/
│   │   └── game.ts                  # Toàn bộ định nghĩa TypeScript interfaces
│   ├── App.tsx                      # Component trung tâm điều phối trạng thái & Game Canvas
│   ├── main.tsx                     # Entry point React
│   └── index.css                    # Tailwind CSS & Kiếm hiệp custom animations
├── index.html                       # HTML Shell mobile-ready
├── package.json                     # Danh sách dependencies
├── tsconfig.json                    # Cấu hình TypeScript
├── tailwind.config.js               # Bảng màu Võ Lâm: Gold, Jade, Crimson, Slate
└── vite.config.ts                   # Cấu hình Vite & local asset middleware
```

---

## 3. Các Chức Năng Đã Hoạt Động Hoàn Chỉnh

1. **Màn hình bắt đầu & Tạo nhân vật:**
   - Chọn một trong hai avatar có sẵn: **Nam Tiêu Dao** (`male_idle.png`) hoặc **Nữ Linh Lung** (`female_idle.png`).
   - Đặt danh xưng thiếu hiệp; hỗ trợ nhận diện và khôi phục tiến độ cũ nếu đã từng chơi.
2. **Bản đồ 2D Top-Down trong Phaser 3:**
   - 4 khu vực chiến lược: **Sơn Môn**, **Tàng Kinh Các**, **Trúc Lâm**, và **Ma Giáo Cấm Địa (Cổng Boss)**.
   - Nền đất đá sân viện tông môn kết hợp nền rừng tự nhiên.
   - Di chuyển bằng **WASD / Phím mũi tên** trên máy tính và **Virtual Joystick cảm ứng** trên mobile.
   - Camera mượt mà bám sát người chơi (`startFollow`), có giới hạn bản đồ và va chạm vật lý (`Arcade physics colliders`) ngăn đi xuyên tường công trình.
   - Sprite nhân vật 4 hướng sử dụng pose tĩnh chuẩn theo hướng di chuyển: `down = frame 0`, `up = frame 1`, `left = frame 2`, `right = frame 3` (không giả định walk animation).
   - Điểm nhận diện tương tác tự động (`[E] Tương Tác`) khi lại gần NPC, phong ấn, quái hoặc cổng Boss.
3. **Chuỗi Nhiệm Vụ Onboarding (Unit 1):**
   - **Nhiệm vụ 1: Sơ Nhập Giang Hồ**: Bái kiến Bang Chủ Hà Ánh Phượng tại Sơn Môn -> Nhận hướng dẫn tới Tàng Kinh Các.
   - **Nhiệm vụ 2: Khai Ngộ Tàng Kinh Các**: Tra cứu và học 6 từ vựng tiếng Anh (nghe phát âm, IPA, ngữ nghĩa, ví dụ).
   - **Nhiệm vụ 3: Phá Giải Phong Ấn Tri Thức**: Giải khai 3 câu hỏi thử thách -> Nhận vũ khí **Thanh Phong Kiếm** (`novice_sword.png`).
   - **Nhiệm vụ 4: Thanh Trừng Trúc Lâm**: Tiêu diệt 2 quái thường (Ma Giáo Kiếm Đồ & Hắc Khí Yêu Ma) -> Nhận **Bích Ngọc Bình An Phù** (`jade_amulet.png`) và **Anh Ngữ Bí Điển** (`anh_ngu_bi_dien.png`). Tiến độ đạt trên 70% mở phong ấn Cổng Boss.
   - **Nhiệm vụ 5: Quyết Chiến Loạn Ngữ Kiếm Ma**: Khiêu chiến Boss 2 Phase tại Ma Giáo Cấm Địa -> Thắng trận hoàn thành Unit 1!
4. **Hệ Thống Combat Bằng Câu Hỏi Tiếng Anh:**
   - Đấu trường riêng biệt trên nền `courtyard_arena.jpg`.
   - Cơ chế câu hỏi với thanh đếm ngược:
     - **Bạo Kích (Critical Hit)**: Trả lời đúng trong vòng dưới 3 giây $\to$ x1.8 sát thương, hiệu ứng nổ bạo kích `critical_spark.png`, rung màn hình.
     - **Đòn Đánh Chuẩn**: Trả lời đúng trong 3–7 giây $\to$ x1.0 sát thương, hiệu ứng `hit_spark.png`.
     - **Hệ Thống Combo**: Trả lời đúng liên tiếp gia tăng hệ số sát thương (x1.1, x1.25, x1.5).
     - **Phản Công**: Trả lời sai hoặc hết giờ $\to$ Kẻ địch phản công, người chơi mất máu theo chỉ số Tấn công của địch trừ Phòng thủ của người chơi, màn hình nháy đỏ.
   - **2 loại quái thường**:
     - `sword_disciple` (Ma Giáo Kiếm Đồ): Kiểm tra nghĩa từ vựng cơ bản.
     - `mist_demon` (Hắc Khí Yêu Ma): Kiểm tra collocations và điền từ vào chỗ trống.
   - **Boss Loạn Ngữ Kiếm Ma (2 Phase)**:
     - **Phase 1: Ma Kiếm Loạn Ngữ** (HP 280, Timer 10s): Thử thách sắp xếp trật tự từ và thì của câu.
     - **Chuyển Phase**: Khi Boss hết máu Phase 1, hoạt cảnh bùng phát hắc khí xuất hiện, Boss gầm lên: *"Khá khen tiểu bối! Hãy nếm thử Cuồng Nộ Ma Kiếm!"*.
     - **Phase 2: Cuồng Nộ Ma Kiếm** (HP 340, Timer rút ngắn còn 7s): Tốc độ câu hỏi dồn dập, câu hỏi đảo ngữ phức tạp, sát thương Boss tăng cao.
5. **Chỉ Số Nhân Vật, Trang Bị & Công Lực:**
   - 3 Slot trang bị: **Vũ Khí**, **Bảo Vật**, **Bí Tịch**.
   - Chỉ số: Level (1-30), HP, Tấn Công, Phòng Thủ, XP.
   - **Công Lực**: Tính toán động tức thời theo công thức tổng hợp từ Level, Sinh lực, Tấn công, Phòng thủ và chỉ số cộng dồn của trang bị.
6. **Lưu Tiến Độ (Persistence):**
   - Đóng gói qua lớp `StorageService`, lưu tự động vào `localStorage` (hồ sơ nhân vật, cấp độ, trang bị, kho đồ, tiến trình nhiệm vụ).
   - Tải lại trang (F5) không mất tiến độ. Có nút "Xóa tiến độ & chơi lại từ đầu" trong menu Cài Đặt.
7. **Âm Thanh Kiếm Hiệp (Web Audio API Synthesizer):**
   - Tự động tổng hợp âm thanh bằng Web Audio API không phụ thuộc file MP3 bên ngoài: tiếng chém kiếm vút gió, tiếng trúng đòn, chuông đồng tông môn trầm hùng, tiếng bạo kích vang dội, tiếng thăng cấp và khúc khải hoàn.
   - Có nút bật/tắt âm thanh trong Cài Đặt.
8. **Tuân Thủ Tuyệt Đối Quy Chuẩn Thiết Kế:**
   - Bang Chủ Hà Ánh Phượng đã có portrait/sprite dựa trên ảnh mặt thật và đã được tích hợp. Bốn Hộ Pháp Đặng Trần Hà, Hoàng Vân, Phương Tú, Nguyệt Nguyễn đã có asset theo phong cách Việt Nam; chưa được đặt vào map.
   - Dữ liệu học tập được gắn thẻ rõ ràng `[DEMO DATA - Dữ liệu thử nghiệm]`.

---

## 4. Phần Còn Chờ Asset & Dữ Liệu Về Sau

1. **Tích hợp bốn Hộ Pháp và tạo hình Liên Phạm:**
   - Sprite và portrait của bốn Hộ Pháp đã nằm trong `assets/game/characters/npc/` và `assets/manifest.json`, nhưng chưa được nối vào game. Hộ Pháp Liên Phạm vẫn cần ảnh mặt thật riêng trước khi tạo hình.
2. **Dữ liệu 30 Unit chương trình Global Success:**
   - Hiện tại đang sử dụng bộ 8 từ vựng và 20 câu hỏi thử nghiệm Unit 1 Demo. Cần nhập liệu ngân hàng câu hỏi đầy đủ cho 30 Unit từ lớp 10 đến lớp 12 qua CMS.
3. **Bộ Sprite Animation đi bộ & xuất chiêu:**
   - Sprite nhân vật hiện tại là 4 hướng tĩnh (`male_4dir.png`, `female_4dir.png`). Sẽ bổ sung bộ spritesheet đa frame cho các trạng thái `walk`, `sword_slash`, `hit_react`, `death`.
4. **Cơ chế Server & Đấu trường PvP / Bang hội:**
   - `StorageService` đã được module hóa sẵn sàng để kết nối với Supabase Auth và PostgreSQL database khi triển khai giai đoạn Live-Service.
