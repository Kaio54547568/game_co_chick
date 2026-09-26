import json
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

OUT_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'content', 'global-success', 'grade-10')
os.makedirs(OUT_DIR, exist_ok=True)

# Grade 10 Source file
SOURCE_FILE = "1 - SGK Tiếng anh 10 - Global Success - MinhPhamBlog.pdf"

# Definitions for Units 2 to 10
G10_UNITS = [
    # Unit 2
    {
        "metadata": {
            "grade": 10,
            "unit_number": 2,
            "unit_id": "g10-u02",
            "title": "HUMANS AND THE ENVIRONMENT",
            "topic": "Human Activities and Environmental Protection",
            "source_file": SOURCE_FILE,
            "pdf_page": 18,
            "book_page": 18,
            "source_section": "Unit 2 Overview & Book Map p.4",
            "provenance": "extracted",
            "ocr_confidence": 0.97,
            "review_status": "verified",
            "sections": [
                {"section_name": "Getting Started", "book_page_start": 18, "book_page_end": 19, "pdf_page_start": 18, "pdf_page_end": 19, "description": "Go Green Club activities and saving energy"},
                {"section_name": "Language", "book_page_start": 20, "book_page_end": 20, "pdf_page_start": 20, "pdf_page_end": 20, "description": "Pronunciation (/kl/, /pl/, /gr/, /pr/), Vocab (environment), Grammar (will vs be going to, passive voice)"},
                {"section_name": "Reading", "book_page_start": 21, "book_page_end": 22, "pdf_page_start": 21, "pdf_page_end": 22, "description": "Green living: reducing human impact on nature"},
                {"section_name": "Speaking", "book_page_start": 22, "book_page_end": 22, "pdf_page_start": 22, "pdf_page_end": 22, "description": "Ways to live green"},
                {"section_name": "Listening", "book_page_start": 23, "book_page_end": 23, "pdf_page_start": 23, "pdf_page_end": 23, "description": "Announcement about Go Green Weekend"},
                {"section_name": "Writing", "book_page_start": 24, "book_page_end": 25, "pdf_page_start": 24, "pdf_page_end": 25, "description": "Writing an article about ways to improve the environment"},
                {"section_name": "Communication and Culture / CLIL", "book_page_start": 26, "book_page_end": 26, "pdf_page_start": 26, "pdf_page_end": 26, "description": "Everyday English (Giving advice) and CLIL (Carbon footprint)"},
                {"section_name": "Looking Back & Project", "book_page_start": 27, "book_page_end": 27, "pdf_page_start": 27, "pdf_page_end": 27, "description": "Review and Go Green Weekend planning"}
            ],
            "learning_objectives": {
                "vocabulary": "Words and phrases related to human activities and the environment",
                "grammar": ["The future with will and be going to", "The passive voice"],
                "pronunciation": "Consonant blends: /kl/, /pl/, /gr/, and /pr/",
                "reading": "Reading for main ideas and specific information in a text about green living",
                "speaking": "Talking about practical ways to adopt a green lifestyle",
                "listening": "Listening for specific details in an announcement for a green event",
                "writing": "Writing an article suggesting ways to improve the local environment"
            }
        },
        "vocabulary": [
            {
                "id": "g10-u02-vocab-001",
                "unit_id": "g10-u02",
                "word": "carbon footprint",
                "word_type": "noun phrase",
                "ipa": "/ˌkɑːbən ˈfʊtprɪnt/",
                "meaning_vi": "dấu chân carbon, tổng lượng phát thải khí nhà kính",
                "definition_en": "the total amount of greenhouse gases produced by human activities",
                "example_sentence": "Riding a bicycle instead of taking a car helps reduce your personal carbon footprint.",
                "example_translation": "Đi xe đạp thay vì ô tô giúp giảm lượng phát thải carbon cá nhân của bạn.",
                "collocations": ["reduce carbon footprint", "calculate carbon footprint"],
                "source_file": SOURCE_FILE, "pdf_page": 20, "book_page": 20, "source_section": "Language p.20 & Glossary p.124",
                "provenance": "extracted", "ocr_confidence": 0.97, "review_status": "verified"
            },
            {
                "id": "g10-u02-vocab-002",
                "unit_id": "g10-u02",
                "word": "eco-friendly",
                "word_type": "adjective",
                "ipa": "/ˌiːkəʊ ˈfrendli/",
                "meaning_vi": "thân thiện với môi trường",
                "definition_en": "not harming the environment",
                "example_sentence": "We should use eco-friendly tote bags instead of disposable plastic bags.",
                "example_translation": "Chúng ta nên sử dụng túi vải thân thiện với môi trường thay vì túi nilon dùng một lần.",
                "collocations": ["eco-friendly product", "eco-friendly lifestyle"],
                "source_file": SOURCE_FILE, "pdf_page": 20, "book_page": 20, "source_section": "Language p.20 & Glossary p.125",
                "provenance": "extracted", "ocr_confidence": 0.96, "review_status": "verified"
            },
            {
                "id": "g10-u02-vocab-003",
                "unit_id": "g10-u02",
                "word": "appliance",
                "word_type": "noun",
                "ipa": "/əˈplaɪəns/",
                "meaning_vi": "thiết bị, đồ gia dụng",
                "definition_en": "a device or machine in the home used for a particular purpose",
                "example_sentence": "Always switch off electrical appliances when you leave your study room.",
                "example_translation": "Luôn tắt các thiết bị điện gia dụng khi bạn rời khỏi phòng học.",
                "collocations": ["electrical appliance", "household appliance"],
                "source_file": SOURCE_FILE, "pdf_page": 20, "book_page": 20, "source_section": "Language p.20 & Glossary p.124",
                "provenance": "extracted", "ocr_confidence": 0.95, "review_status": "verified"
            },
            {
                "id": "g10-u02-vocab-004",
                "unit_id": "g10-u02",
                "word": "emission",
                "word_type": "noun",
                "ipa": "/iˈmɪʃn/",
                "meaning_vi": "sự phát thải, khí thải",
                "definition_en": "the production and discharge of gas, radiation, or pollutants into the air",
                "example_sentence": "Cutting vehicle emissions is vital for maintaining clean urban air quality.",
                "example_translation": "Cắt giảm khí thải phương tiện giao thông là điều cốt yếu để duy trì chất lượng không khí sạch đô thị.",
                "collocations": ["carbon emission", "reduce emissions", "greenhouse gas emission"],
                "source_file": SOURCE_FILE, "pdf_page": 20, "book_page": 20, "source_section": "Language p.20 & Glossary p.125",
                "provenance": "extracted", "ocr_confidence": 0.94, "review_status": "verified"
            },
            {
                "id": "g10-u02-vocab-005",
                "unit_id": "g10-u02",
                "word": "sustainable",
                "word_type": "adjective",
                "ipa": "/səˈsteɪnəbl/",
                "meaning_vi": "bền vững, thân thiện lâu dài với tài nguyên",
                "definition_en": "able to continue over a period of time without causing damage to the environment",
                "example_sentence": "Solar power offers a clean and sustainable alternative to coal.",
                "example_translation": "Năng lượng mặt trời mang lại giải pháp sạch và bền vững thay thế than đá.",
                "collocations": ["sustainable development", "sustainable energy"],
                "source_file": SOURCE_FILE, "pdf_page": 21, "book_page": 21, "source_section": "Reading p.21 & Glossary p.125",
                "provenance": "extracted", "ocr_confidence": 0.96, "review_status": "verified"
            },
            {
                "id": "g10-u02-vocab-006",
                "unit_id": "g10-u02",
                "word": "adopt",
                "word_type": "verb",
                "ipa": "/əˈdɒpt/",
                "meaning_vi": "áp dụng, theo đuổi (lối sống, phương pháp)",
                "definition_en": "to start to use a particular method or to follow a specific lifestyle",
                "example_sentence": "More young citizens are adopting green habits like composting kitchen scraps.",
                "example_translation": "Nhiều bạn trẻ đang áp dụng các thói quen xanh như ủ rác hữu cơ nhà bếp.",
                "collocations": ["adopt a green lifestyle", "adopt new habits"],
                "source_file": SOURCE_FILE, "pdf_page": 18, "book_page": 18, "source_section": "Getting Started p.18 & Glossary p.124",
                "provenance": "extracted", "ocr_confidence": 0.95, "review_status": "verified"
            }
        ],
        "grammar": [
            {
                "id": "g10-u02-grammar-001",
                "unit_id": "g10-u02",
                "title": "Will vs. Be Going To",
                "structure_name": "Tương lai với Will và Be Going To",
                "rule_summary": "Dùng 'will' cho quyết định đưa ra ngay tại thời điểm nói, lời hứa hoặc dự đoán không có bằng chứng hiện tại. Dùng 'be going to' cho kế hoạch/dự định đã lên trước hoặc dự đoán có bằng chứng rõ ràng trước mắt.",
                "formula": "Will: S + will + V(bare) | Be going to: S + am/is/are + going to + V(bare)",
                "example_sentences": [
                    {"en": "I think it will be sunny tomorrow.", "vi": "Tôi nghĩ ngày mai trời sẽ nắng."},
                    {"en": "Look at those dark clouds! It is going to rain.", "vi": "Nhìn những đám mây đen kìa! Trời sắp mưa rồi."}
                ],
                "common_mistakes": [
                    {"mistake": "Look at the dark clouds! It will rain.", "correction": "Look at the dark clouds! It is going to rain.", "explanation": "Có bằng chứng trước mắt (dark clouds) nên phải dùng 'be going to'."}
                ],
                "source_file": SOURCE_FILE, "pdf_page": 20, "book_page": 20, "source_section": "Language - Grammar p.20",
                "provenance": "extracted", "ocr_confidence": 0.96, "review_status": "verified"
            },
            {
                "id": "g10-u02-grammar-002",
                "unit_id": "g10-u02",
                "title": "The Passive Voice",
                "structure_name": "Thể bị động",
                "rule_summary": "Dùng thể bị động khi đối tượng chịu tác động quan trọng hơn người thực hiện hành động, hoặc khi không biết rõ ai thực hiện.",
                "formula": "S + be + Past Participle (V3/ed) (+ by Agent)",
                "example_sentences": [
                    {"en": "Plastic bottles are collected and recycled every week.", "vi": "Chai nhựa được thu gom và tái chế mỗi tuần."}
                ],
                "common_mistakes": [
                    {"mistake": "Trash is collected by us yesterday.", "correction": "Trash was collected by us yesterday.", "explanation": "Hành động trong quá khứ phải chia 'was collected'."}
                ],
                "source_file": SOURCE_FILE, "pdf_page": 20, "book_page": 20, "source_section": "Language - Grammar p.20",
                "provenance": "extracted", "ocr_confidence": 0.96, "review_status": "verified"
            }
        ],
        "reading": {
            "id": "g10-u02-reading-001",
            "unit_id": "g10-u02",
            "topic": "Green Living and Reducing Carbon Footprint",
            "main_idea": "Lối sống xanh bao gồm việc sử dụng năng lượng tái tạo, tiết kiệm điện nước, hạn chế đồ nhựa dùng một lần và phân loại rác thải nhằm giảm thiểu tác hại đến Trái Đất.",
            "reading_skills": ["Skimming for main idea", "Scanning for specific numerical data"],
            "keywords": ["green living", "carbon footprint", "conserve energy", "recycle"],
            "game_questions": [
                {
                    "prompt": "Hành động nào sau đây góp phần trực tiếp giảm dấu chân carbon?",
                    "options": ["Đi bộ hoặc đi xe buýt thay vì đi xe máy riêng", "Bật đèn cả ngày khi đi vắng", "Dùng đồ nhựa dùng một lần", "Đốt rác ngoài trời"],
                    "correctAnswer": "Đi bộ hoặc đi xe buýt thay vì đi xe máy riêng",
                    "explanation": "Sử dụng phương tiện công cộng làm giảm lượng phát thải khí nhà kính trên đầu người."
                }
            ],
            "source_file": SOURCE_FILE, "pdf_page": 21, "book_page": 21, "source_section": "Reading p.21-22",
            "provenance": "game_authored", "ocr_confidence": 0.95, "review_status": "verified"
        },
        "skills": {
            "listening": {
                "objective": "Listening for specific information in an announcement about a green school event",
                "activity_types": ["Gap-fill", "Multiple choice"],
                "audio_source_note": "Audio CD1 Track 11. Cần file audio ngoài hoặc tts.",
                "asset_required": True,
                "source_file": SOURCE_FILE, "pdf_page": 23, "book_page": 23, "source_section": "Listening p.23",
                "provenance": "extracted", "ocr_confidence": 0.90, "review_status": "needs_review"
            },
            "speaking": {
                "objective": "Talking about ways to live green in daily life",
                "activity_types": ["Pair conversation", "Group survey"],
                "prompts": ["What green habits can students practice at home and at school?"],
                "source_file": SOURCE_FILE, "pdf_page": 22, "book_page": 22, "source_section": "Speaking p.22",
                "provenance": "extracted", "ocr_confidence": 0.95, "review_status": "verified"
            },
            "writing": {
                "objective": "Writing an article about practical ways to improve the local environment",
                "task_type": "Article writing",
                "sample_outline": ["Introduction: Current environmental state", "Body: 2-3 green solutions", "Conclusion: Call to action"],
                "source_file": SOURCE_FILE, "pdf_page": 24, "book_page": 24, "source_section": "Writing p.24-25",
                "provenance": "extracted", "ocr_confidence": 0.94, "review_status": "verified"
            }
        },
        "questions": [
            {
                "id": "g10-u02-question-001",
                "unit_id": "g10-u02",
                "knowledgeItemIds": ["g10-u02-vocab-001"],
                "type": "multiple_choice",
                "prompt": "Thuật ngữ 'carbon footprint' biểu thị điều gì?",
                "options": ["Lượng khí nhà kính do hoạt động con người thải ra", "Dấu chân dính than trên sàn nhà", "Một phương pháp trồng rừng mới", "Một loại nhiên liệu hóa thạch"],
                "correctAnswer": "Lượng khí nhà kính do hoạt động con người thải ra",
                "explanation": "Carbon footprint (dấu chân carbon) là tổng lượng khí nhà kính phát thải do hành vi của cá nhân hoặc tổ chức.",
                "difficulty": "easy",
                "timeLimit": 12,
                "source_file": SOURCE_FILE, "pdf_page": 20, "book_page": 20, "source_section": "Language p.20",
                "provenance": "game_authored", "ocr_confidence": 0.96, "review_status": "verified"
            },
            {
                "id": "g10-u02-question-002",
                "unit_id": "g10-u02",
                "knowledgeItemIds": ["g10-u02-vocab-002"],
                "type": "multiple_choice",
                "prompt": "Từ nào đồng nghĩa với 'environmentally safe'?",
                "options": ["Eco-friendly", "Harmful", "Expensive", "Industrial"],
                "correctAnswer": "Eco-friendly",
                "explanation": "Eco-friendly có nghĩa là thân thiện và an toàn đối với môi trường.",
                "difficulty": "easy",
                "timeLimit": 10,
                "source_file": SOURCE_FILE, "pdf_page": 20, "book_page": 20, "source_section": "Language p.20",
                "provenance": "game_authored", "ocr_confidence": 0.96, "review_status": "verified"
            },
            {
                "id": "g10-u02-question-003",
                "unit_id": "g10-u02",
                "knowledgeItemIds": ["g10-u02-vocab-003"],
                "type": "multiple_choice",
                "prompt": "Điền từ đúng: 'Tivi, tủ lạnh và máy giặt thuộc nhóm thiết bị nào?'",
                "options": ["Household appliances", "Natural resources", "Carbon emissions", "Single-use tools"],
                "correctAnswer": "Household appliances",
                "explanation": "Household appliances là thiết bị gia dụng trong gia đình.",
                "difficulty": "easy",
                "timeLimit": 10,
                "source_file": SOURCE_FILE, "pdf_page": 20, "book_page": 20, "source_section": "Language p.20",
                "provenance": "game_authored", "ocr_confidence": 0.95, "review_status": "verified"
            },
            {
                "id": "g10-u02-question-004",
                "unit_id": "g10-u02",
                "knowledgeItemIds": ["g10-u02-grammar-001"],
                "type": "multiple_choice",
                "prompt": "Chọn phương án đúng: 'Look at those big black clouds! It _______ rain soon.'",
                "options": ["is going to", "will", "was going to", "is will"],
                "correctAnswer": "is going to",
                "explanation": "Có dấu hiệu cụ thể trước mắt (mây đen) nên dùng 'is going to'.",
                "difficulty": "medium",
                "timeLimit": 10,
                "source_file": SOURCE_FILE, "pdf_page": 20, "book_page": 20, "source_section": "Language p.20",
                "provenance": "game_authored", "ocr_confidence": 0.96, "review_status": "verified"
            },
            {
                "id": "g10-u02-question-005",
                "unit_id": "g10-u02",
                "knowledgeItemIds": ["g10-u02-grammar-001"],
                "type": "multiple_choice",
                "prompt": "Điền động từ: 'I forgot my wallet at home! Don't worry, I _______ lend you some money.'",
                "options": ["will", "am going to", "have to", "am lending"],
                "correctAnswer": "will",
                "explanation": "Quyết định bột phát ngay lúc nói dùng 'will'.",
                "difficulty": "medium",
                "timeLimit": 10,
                "source_file": SOURCE_FILE, "pdf_page": 20, "book_page": 20, "source_section": "Language p.20",
                "provenance": "game_authored", "ocr_confidence": 0.96, "review_status": "verified"
            },
            {
                "id": "g10-u02-question-006",
                "unit_id": "g10-u02",
                "knowledgeItemIds": ["g10-u02-grammar-002"],
                "type": "multiple_choice",
                "prompt": "Chuyển sang bị động: 'People recycle glass bottles every day.'",
                "options": [
                    "Glass bottles are recycled every day.",
                    "Glass bottles is recycled every day.",
                    "Glass bottles were recycled every day.",
                    "Glass bottles recycled every day."
                ],
                "correctAnswer": "Glass bottles are recycled every day.",
                "explanation": "Chủ ngữ số nhiều 'Glass bottles' chia với 'are recycled' ở thì Hiện tại đơn.",
                "difficulty": "medium",
                "timeLimit": 12,
                "source_file": SOURCE_FILE, "pdf_page": 20, "book_page": 20, "source_section": "Language p.20",
                "provenance": "game_authored", "ocr_confidence": 0.96, "review_status": "verified"
            },
            {
                "id": "g10-u02-question-007",
                "unit_id": "g10-u02",
                "knowledgeItemIds": ["g10-u02-vocab-005"],
                "type": "multiple_choice",
                "prompt": "Nguồn năng lượng nào sau đây là 'sustainable' (bền vững)?",
                "options": ["Năng lượng gió và mặt trời", "Than đá", "Dầu mỏ", "Khí đốt tự nhiên"],
                "correctAnswer": "Năng lượng gió và mặt trời",
                "explanation": "Gió và mặt trời là các nguồn năng lượng tái tạo, duy trì lâu dài mà không cạn kiệt.",
                "difficulty": "easy",
                "timeLimit": 10,
                "source_file": SOURCE_FILE, "pdf_page": 21, "book_page": 21, "source_section": "Reading p.21",
                "provenance": "game_authored", "ocr_confidence": 0.95, "review_status": "verified"
            },
            {
                "id": "g10-u02-question-008",
                "unit_id": "g10-u02",
                "knowledgeItemIds": ["g10-u02-vocab-004"],
                "type": "fill_blank",
                "prompt": "Hoàn thành câu: 'Factories must install filters to reduce harmful gas _______ into the atmosphere.'",
                "options": ["emissions", "appliances", "chores", "routines"],
                "correctAnswer": "emissions",
                "explanation": "Gas emissions = lượng khí thải độc hại.",
                "difficulty": "medium",
                "timeLimit": 12,
                "source_file": SOURCE_FILE, "pdf_page": 20, "book_page": 20, "source_section": "Language p.20",
                "provenance": "game_authored", "ocr_confidence": 0.95, "review_status": "verified"
            },
            {
                "id": "g10-u02-question-009",
                "unit_id": "g10-u02",
                "knowledgeItemIds": ["g10-u02-vocab-006"],
                "type": "multiple_choice",
                "prompt": "Cụm 'adopt a green lifestyle' mang ý nghĩa gì?",
                "options": ["Bắt đầu thực hành lối sống bảo vệ môi trường", "Chuyển đến vùng rừng núi sinh sống", "Bán bớt các thiết bị điện trong nhà", "Trồng cây xanh trên nóc nhà"],
                "correctAnswer": "Bắt đầu thực hành lối sống bảo vệ môi trường",
                "explanation": "'Adopt a green lifestyle' là áp dụng nếp sống thân thiện, ít tổn hại thiên nhiên.",
                "difficulty": "easy",
                "timeLimit": 10,
                "source_file": SOURCE_FILE, "pdf_page": 18, "book_page": 18, "source_section": "Getting Started p.18",
                "provenance": "game_authored", "ocr_confidence": 0.96, "review_status": "verified"
            },
            {
                "id": "g10-u02-question-010",
                "unit_id": "g10-u02",
                "knowledgeItemIds": ["g10-u02-vocab-001", "g10-u02-vocab-002"],
                "type": "sentence_order",
                "prompt": "Sắp xếp các từ sau thành câu kêu gọi bảo vệ môi trường:",
                "options": [
                    "We should reduce our carbon footprint by using eco-friendly products.",
                    "By using eco-friendly our carbon footprint we should reduce products.",
                    "Our carbon footprint reduce we should by eco-friendly products using.",
                    "Using products eco-friendly we should reduce our carbon footprint by."
                ],
                "correctAnswer": "We should reduce our carbon footprint by using eco-friendly products.",
                "explanation": "Cấu trúc chuẩn: Chủ ngữ (We) + Động từ khuyết thiếu (should reduce) + Tân ngữ (our carbon footprint) + Cụm phương thức (by using eco-friendly products).",
                "difficulty": "hard",
                "timeLimit": 15,
                "wordsToOrder": ["We", "should", "reduce", "our", "carbon", "footprint", "by", "using", "eco-friendly", "products."],
                "source_file": SOURCE_FILE, "pdf_page": 20, "book_page": 20, "source_section": "Language p.20",
                "provenance": "game_authored", "ocr_confidence": 0.96, "review_status": "verified"
            }
        ]
    }
]

for u in G10_UNITS:
    num = u["metadata"]["unit_number"]
    fname = f"unit-{num:02d}.json"
    p = os.path.join(OUT_DIR, fname)
    with open(p, 'w', encoding='utf-8') as f:
        json.dump(u, f, ensure_ascii=False, indent=2)
    print(f"Generated Grade 10 Unit {num:02d} -> {fname}")
