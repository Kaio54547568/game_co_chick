# GLOBAL SUCCESS 10–12 CURRICULUM DATASET
## PHƯỢNG CHICK ENGLISH WULIN (Tam Niên Anh Ngữ – Nhất Thống Võ Lâm)

Tài liệu và bộ dữ liệu học tập chuẩn hóa cho chương trình Tiếng Anh THPT Global Success (Lớp 10, 11 và 12), được số hóa, thẩm định từ 3 cuốn sách giáo khoa gốc và thiết kế tích hợp cho game RPG Giáo dục **Phượng Chick English Wulin**.

---

### 1. Nguồn Sách & Quy Trình Khai Thác (Data Provenance)

1. **Lớp 10**:
   - Tệp nguồn: `C:\Users\ADMIN\Downloads\1 - SGK Tiếng anh 10 - Global Success - MinhPhamBlog.pdf`
   - Số trang: 133 trang (Mục lục Book Map trang PDF 4–7, Sách trang 8–123, Glossary trang 124–133).
2. **Lớp 11**:
   - Tệp nguồn: `C:\Users\ADMIN\Downloads\Sách Tiếng anh 11 Global success - Sách học sinh.pdf`
   - Số trang: 134 trang (Mục lục Book Map trang PDF 5–8, Sách trang 8–124, Glossary trang 125–134).
3. **Lớp 12**:
   - Tệp nguồn: `C:\Users\ADMIN\Downloads\Sách học sinh Tiếng anh 12 - Global success.pdf`
   - Số trang: 155 trang (Mục lục Book Map trang PDF 4–7, Sách trang 8–143, Glossary trang 147–155).

**Quy trình xử lý số hóa:**
- Trích xuất quang học (OCR) từng trang bằng engine **Tesseract OCR v5.4.0** kết hợp **PyMuPDF (150–200 DPI)**.
- Đối chiếu song song số trang in trên sách (`book_page`) và số trang tệp scan PDF (`pdf_page`).
- Trích xuất bảng mục lục thực tế (Book Map & Table of Contents) làm khung chuẩn cho 30 Unit.
- Toàn bộ từ vựng và phiên âm IPA được trích xuất và đối chiếu trực tiếp từ bảng từ vựng `GLOSSARY` cuối mỗi cuốn sách; không tự suy đoán phiên âm.
- Câu hỏi luyện tập và chiến đấu được biên soạn mới dựa trên đúng mục tiêu bài học của SGK, tuyệt đối không sao chép nguyên văn văn bản đọc hiểu hoặc bài tập thương quyền vào dữ liệu phát hành.

---

### 2. Chuẩn Schema Dữ Liệu (Standardized Schema)

Mỗi Unit được lưu trữ dưới dạng một tệp JSON hoàn chỉnh tại `content/global-success/grade-{10|11|12}/unit-{01..10}.json` tuân thủ TypeScript Schema (`content/global-success/types.ts`) và JSON Schema (`content/global-success/schema.json`):

#### 2.1 Định danh ổn định (Stable IDs)
- **Từ vựng**: `g{grade}-u{unit:02d}-vocab-{idx:03d}` (Ví dụ: `g10-u01-vocab-001`)
- **Ngữ pháp**: `g{grade}-u{unit:02d}-grammar-{idx:03d}` (Ví dụ: `g10-u01-grammar-001`)
- **Đọc hiểu**: `g{grade}-u{unit:02d}-reading-{idx:03d}` (Ví dụ: `g10-u01-reading-001`)
- **Câu hỏi**: `g{grade}-u{unit:02d}-question-{idx:03d}` (Ví dụ: `g10-u01-question-001`)

#### 2.2 Các trường bắt buộc trong từng bản ghi
- `source_file`: Tên tệp PDF gốc làm nguồn chứng minh.
- `pdf_page`: Số trang trong tệp PDF.
- `book_page`: Số trang in trên sách giáo khoa.
- `source_section`: Phần bài học tương ứng (Getting Started, Language, Reading, Glossary,...).
- `provenance`: Nguồn gốc dữ liệu (`extracted` đối với ngữ liệu trích từ sách; `game_authored` đối với câu hỏi/bài đọc game hóa).
- `ocr_confidence`: Điểm tin cậy OCR (từ `0.0` đến `1.0`).
- `review_status`: Trạng thái thẩm định (`verified`, `needs_review`, `asset_required`).

---

### 3. Bảng Phủ Dữ Liệu 30 Unit (Curriculum Coverage Matrix)

#### Khối 10 (Sơ Nhập Giang Hồ)
| Unit | Tên Unit & Chủ đề | Trang SGK | Trang PDF | Từ vựng | Ngữ pháp | Đọc hiểu | Câu hỏi | Trạng thái |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **Unit 01** | Family Life | 8–17 | 8–17 | 12 | 2 | 1 | 10 | Verified |
| **Unit 02** | Humans and the Environment | 18–27 | 18–27 | 6 | 2 | 1 | 10 | Verified |
| **Unit 03** | Music | 28–37 | 28–37 | 6 | 2 | 1 | 10 | Verified |
| **Unit 04** | For a Better Community | 40–49 | 42–51 | 6 | 1 | 1 | 10 | Verified |
| **Unit 05** | Inventions | 50–59 | 52–61 | 6 | 1 | 1 | 10 | Verified |
| **Unit 06** | Gender Equality | 62–73 | 62–73 | 6 | 1 | 1 | 10 | Verified |
| **Unit 07** | Viet Nam and International Organisations | 76–85 | 76–85 | 6 | 1 | 1 | 10 | Verified |
| **Unit 08** | New Ways to Learn | 86–95 | 86–95 | 6 | 1 | 1 | 10 | Verified |
| **Unit 09** | Protecting the Environment | 100–109 | 102–111 | 6 | 1 | 1 | 10 | Verified |
| **Unit 10** | Ecotourism | 110–119 | 110–119 | 6 | 1 | 1 | 10 | Verified |

#### Khối 11 (Hành Tẩu Võ Lâm)
| Unit | Tên Unit & Chủ đề | Trang SGK | Trang PDF | Từ vựng | Ngữ pháp | Đọc hiểu | Câu hỏi | Trạng thái |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **Unit 01** | A Long and Healthy Life | 8–17 | 8–17 | 6 | 1 | 1 | 10 | Verified |
| **Unit 02** | The Generation Gap | 18–27 | 18–27 | 6 | 1 | 1 | 10 | Verified |
| **Unit 03** | Cities of the Future | 28–37 | 28–37 | 6 | 1 | 1 | 10 | Verified |
| **Unit 04** | ASEAN and Viet Nam | 40–49 | 40–49 | 6 | 1 | 1 | 10 | Verified |
| **Unit 05** | Global Warming | 50–59 | 50–59 | 6 | 1 | 1 | 10 | Verified |
| **Unit 06** | Preserving Our Heritage | 64–73 | 64–73 | 6 | 1 | 1 | 10 | Verified |
| **Unit 07** | Education Options for School-Leavers | 74–83 | 74–83 | 6 | 1 | 1 | 10 | Verified |
| **Unit 08** | Becoming Independent | 84–93 | 84–93 | 6 | 1 | 1 | 10 | Verified |
| **Unit 09** | Social Issues | 96–105 | 96–105 | 6 | 1 | 1 | 10 | Verified |
| **Unit 10** | The Ecosystem | 106–115 | 106–115 | 6 | 1 | 1 | 10 | Verified |

#### Khối 12 (Nhất Đại Cao Thủ)
| Unit | Tên Unit & Chủ đề | Trang SGK | Trang PDF | Từ vựng | Ngữ pháp | Đọc hiểu | Câu hỏi | Trạng thái |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **Unit 01** | Life Stories We Admire | 8–19 | 8–19 | 6 | 1 | 1 | 10 | Verified |
| **Unit 02** | A Multicultural World | 20–31 | 20–31 | 6 | 1 | 1 | 10 | Verified |
| **Unit 03** | Green Living | 32–43 | 32–43 | 6 | 1 | 1 | 10 | Verified |
| **Unit 04** | Urbanisation | 48–59 | 48–59 | 6 | 1 | 1 | 10 | Verified |
| **Unit 05** | The World of Work | 60–71 | 60–71 | 6 | 1 | 1 | 10 | Verified |
| **Unit 06** | Artificial Intelligence | 76–87 | 76–87 | 6 | 1 | 1 | 10 | Verified |
| **Unit 07** | The World of Mass Media | 88–99 | 88–99 | 6 | 1 | 1 | 10 | Verified |
| **Unit 08** | Wildlife Conservation | 100–111 | 100–111 | 6 | 1 | 1 | 10 | Verified |
| **Unit 09** | Career Paths | 116–127 | 116–127 | 6 | 1 | 1 | 10 | Verified |
| **Unit 10** | Lifelong Learning | 128–139 | 128–139 | 6 | 1 | 1 | 10 | Verified |

**Tổng cộng toàn bộ 30 Unit:**
- **Tổng số từ vựng**: 186 mục chuẩn hóa kèm IPA, định nghĩa, câu ví dụ và dịch nghĩa.
- **Tổng số chủ điểm ngữ pháp**: 33 cấu trúc trọng tâm (kèm công thức, lỗi sai thường gặp và phân tích).
- **Tổng số bài đọc hiểu game hóa**: 30 chuyên đề (kèm câu hỏi phân tích, từ khóa và kỹ năng đọc).
- **Tổng số câu hỏi chiến đấu/Tàng Kinh Các**: 300 câu hỏi trắc nghiệm, điền từ, sắp xếp câu phân cấp độ khó `easy`, `medium`, `hard` có giải thích cặn kẽ và liên kết ID kiến thức.

---

### 4. Danh Sách Chỗ OCR Cần Người Duyệt & Hạng Mục Cần Bổ Sung (Needs Review & Asset Required)

1. **Âm thanh bài nghe (Listening Audio Assets)**:
   - Các bài nghe ở cả 30 Unit (ví dụ: CD1 Track 06, Track 11, Track 21,...) chỉ có tiêu đề và bài tập trong bản in SGK scan; các tệp PDF scan không chứa tệp audio nhúng hay transcript đầy đủ.
   - Các mục này được đánh dấu rõ: `"asset_required": true` và `"review_status": "needs_review"`. Không tự sáng tác transcript rồi ghi là bài nghe SGK.
2. **Ký hiệu phiên âm OCR dễ nhầm lẫn (Phonetic Ambiguity Disambiguation)**:
   - Một số phụ âm ghép trên bản in scan như `/br/` dễ bị nhận nhầm thành `/or/`, `/kl/` thành `/kI/`, `/pr/` thành `/pt/`. Chúng tôi đã tra cứu chéo với bảng Pronunciation tại trang Language và Glossary để hiệu chỉnh.
   - Những từ ghép dài không có dòng riêng trong Glossary được để `ipa: null` và giữ nguyên trạng thái minh bạch để giáo viên/biên tập viên duyệt tiếp.
3. **Phần Speaking & Writing**:
   - Lưu trữ dạng đề bài mở, hướng dẫn thảo luận và dàn ý gợi ý theo chuẩn SGK. Khi người chơi làm nhiệm vụ nói/viết trong game, hệ thống có thể kết nối thêm Speech-to-Text API hoặc rubric chấm điểm giáo viên.

---

### 5. Công Cụ Kiểm Tra & Xác Minh Tự Động (Validation Script)

Tất cả các tệp dữ liệu được thẩm định định kỳ qua script:
```bash
python tools/validate_dataset.py
```

**Các tiêu chí kiểm tra nghiêm ngặt:**
1. **JSON Validity**: Không lỗi cú pháp JSON.
2. **Global Unique IDs**: Tuyệt đối không trùng ID giữa bất kỳ mục từ vựng, ngữ pháp, bài đọc hay câu hỏi nào trên toàn bộ 30 Unit.
3. **ID Format Strict Pattern**:
   - Vocab: `^g(10|11|12)-u(0[1-9]|10)-vocab-[0-9]{3}$`
   - Grammar: `^g(10|11|12)-u(0[1-9]|10)-grammar-[0-9]{3}$`
   - Reading: `^g(10|11|12)-u(0[1-9]|10)-reading-[0-9]{3}$`
   - Question: `^g(10|11|12)-u(0[1-9]|10)-question-[0-9]{3}$`
4. **Knowledge Linkage Integrity**: Mỗi câu hỏi phải có `knowledgeItemIds` liên kết đến ID từ vựng hoặc ngữ pháp tồn tại thực tế trong Unit tương ứng.
5. **Answer Consistency**:
   - Đối với câu hỏi trắc nghiệm `multiple_choice`, đáp án đúng `correctAnswer` bắt buộc phải là một trong các phương án trong mảng `options`.
   - Đối với `sentence_order`, bắt buộc phải có mảng `wordsToOrder` tương thích.
6. **No Duplicate Prompts**: Không có câu hỏi nào bị trùng lặp nội dung câu hỏi trong ngân hàng dữ liệu.
7. **OCR Confidence & Review Status Rule**: Các bản ghi có `ocr_confidence < 0.85` không được phép đánh dấu `verified`.

---

### 6. Kế Hoạch Tích Hợp Vào Game (Integration Plan)

Nhằm tuân thủ nguyên tắc không phá vỡ tiến trình chơi thử và quest demo hiện tại của game:
- Dữ liệu mới được đóng gói độc lập trong `content/global-success/`.
- Cung cấp sẵn các adapter hàm chuyển đổi trong `content/global-success/index.ts`:
  - `toGameKnowledgeItems(unit)`: Chuyển đổi từ vựng và ngữ pháp của Unit sang định dạng `KnowledgeItem[]` (tương thích trực tiếp với `src/types/game.ts`).
  - `toGameCombatQuestions(unit)`: Chuyển đổi câu hỏi sang định dạng `CombatQuestion[]` (tương thích trực tiếp với `CombatOverlay`, `ChallengeModal`, `TrainingModal`).
- Khi kích hoạt bản phát hành đầy đủ 30 ải:
  - Tạo service `UnitContentService` nạp động dữ liệu theo cấp độ lớp và Unit mà người chơi đang khám phá.
  - Kết nối Boss theo GDD (Loạn Ngữ Kiếm Ma, Vong Từ Quỷ Vương, Mê Âm Yêu Cơ,...) vào ngân hàng câu hỏi phân theo kỹ năng của Unit tương ứng.
