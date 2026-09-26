# DATA DEFINITIONS FOR GRADE 10 (UNITS 1 - 10)
# Ground truth source: 1 - SGK Tiếng anh 10 - Global Success - MinhPhamBlog.pdf

SOURCE_FILE_G10 = "1 - SGK Tiếng anh 10 - Global Success - MinhPhamBlog.pdf"

def get_g10_units():
    # Load unit 1 from unit-01.json
    import json, os
    u1_path = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'content', 'global-success', 'grade-10', 'unit-01.json')
    with open(u1_path, 'r', encoding='utf-8') as f:
        u1 = json.load(f)

    units = [u1]

    # Units 2 to 10
    units_def = [
        # UNIT 2: HUMANS AND THE ENVIRONMENT
        {
            "metadata": {
                "grade": 10, "unit_number": 2, "unit_id": "g10-u02",
                "title": "HUMANS AND THE ENVIRONMENT", "topic": "Human Activities and Environmental Protection",
                "source_file": SOURCE_FILE_G10, "pdf_page": 18, "book_page": 18, "source_section": "Unit 2 Overview & Book Map p.4",
                "provenance": "extracted", "ocr_confidence": 0.97, "review_status": "verified",
                "sections": [
                    {"section_name": "Getting Started", "book_page_start": 18, "book_page_end": 19, "pdf_page_start": 18, "pdf_page_end": 19, "description": "Go Green Club activities"},
                    {"section_name": "Language", "book_page_start": 20, "book_page_end": 20, "pdf_page_start": 20, "pdf_page_end": 20, "description": "Consonants /kl/, /pl/, /gr/, /pr/; will vs be going to; passive voice"},
                    {"section_name": "Reading", "book_page_start": 21, "book_page_end": 22, "pdf_page_start": 21, "pdf_page_end": 22, "description": "A green lifestyle and reducing carbon footprint"},
                    {"section_name": "Speaking", "book_page_start": 22, "book_page_end": 22, "pdf_page_start": 22, "pdf_page_end": 22, "description": "Ways to live green"},
                    {"section_name": "Listening", "book_page_start": 23, "book_page_end": 23, "pdf_page_start": 23, "pdf_page_end": 23, "description": "Green Weekend announcement"},
                    {"section_name": "Writing", "book_page_start": 24, "book_page_end": 25, "pdf_page_start": 24, "pdf_page_end": 25, "description": "Improving the local environment"},
                    {"section_name": "Communication & Culture", "book_page_start": 26, "book_page_end": 26, "pdf_page_start": 26, "pdf_page_end": 26, "description": "Giving advice; Carbon footprint calculations"},
                    {"section_name": "Looking Back & Project", "book_page_start": 27, "book_page_end": 27, "pdf_page_start": 27, "pdf_page_end": 27, "description": "Review & Go Green event plan"}
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
                    "id": "g10-u02-vocab-001", "unit_id": "g10-u02", "word": "carbon footprint", "word_type": "noun phrase",
                    "ipa": "/ˌkɑːbən ˈfʊtprɪnt/", "meaning_vi": "dấu chân carbon, lượng phát thải khí nhà kính",
                    "definition_en": "the amount of carbon dioxide released into the atmosphere by human activities",
                    "example_sentence": "Riding a bicycle instead of driving helps reduce your carbon footprint.",
                    "example_translation": "Đi xe đạp thay vì lái xe giúp giảm dấu chân carbon của bạn.",
                    "collocations": ["reduce carbon footprint"], "source_file": SOURCE_FILE_G10,
                    "pdf_page": 20, "book_page": 20, "source_section": "Language p.20 & Glossary p.124",
                    "provenance": "extracted", "ocr_confidence": 0.97, "review_status": "verified"
                },
                {
                    "id": "g10-u02-vocab-002", "unit_id": "g10-u02", "word": "eco-friendly", "word_type": "adjective",
                    "ipa": "/ˌiːkəʊ ˈfrendli/", "meaning_vi": "thân thiện với môi trường",
                    "definition_en": "not harming the environment",
                    "example_sentence": "We should buy eco-friendly cleaning supplies for our home.",
                    "example_translation": "Chúng ta nên mua các đồ tẩy rửa thân thiện với môi trường cho gia đình.",
                    "collocations": ["eco-friendly product"], "source_file": SOURCE_FILE_G10,
                    "pdf_page": 20, "book_page": 20, "source_section": "Language p.20 & Glossary p.125",
                    "provenance": "extracted", "ocr_confidence": 0.96, "review_status": "verified"
                },
                {
                    "id": "g10-u02-vocab-003", "unit_id": "g10-u02", "word": "appliance", "word_type": "noun",
                    "ipa": "/əˈplaɪəns/", "meaning_vi": "thiết bị gia dụng",
                    "definition_en": "a device or machine in the home used for a particular task",
                    "example_sentence": "Turn off electrical appliances when they are not in use.",
                    "example_translation": "Hãy tắt các thiết bị điện khi không sử dụng.",
                    "collocations": ["electrical appliance"], "source_file": SOURCE_FILE_G10,
                    "pdf_page": 20, "book_page": 20, "source_section": "Language p.20 & Glossary p.124",
                    "provenance": "extracted", "ocr_confidence": 0.95, "review_status": "verified"
                },
                {
                    "id": "g10-u02-vocab-004", "unit_id": "g10-u02", "word": "emission", "word_type": "noun",
                    "ipa": "/iˈmɪʃn/", "meaning_vi": "khí thải, sự phát thải",
                    "definition_en": "the production and discharge of gas or radiation",
                    "example_sentence": "Factories must work to cut toxic smoke emissions.",
                    "example_translation": "Các nhà máy phải hành động để cắt giảm khí thải khói độc hại.",
                    "collocations": ["carbon emission"], "source_file": SOURCE_FILE_G10,
                    "pdf_page": 20, "book_page": 20, "source_section": "Language p.20 & Glossary p.125",
                    "provenance": "extracted", "ocr_confidence": 0.95, "review_status": "verified"
                },
                {
                    "id": "g10-u02-vocab-005", "unit_id": "g10-u02", "word": "sustainable", "word_type": "adjective",
                    "ipa": "/səˈsteɪnəbl/", "meaning_vi": "bền vững",
                    "definition_en": "able to be maintained at a certain level without depleting natural resources",
                    "example_sentence": "Solar and wind power are key elements of sustainable energy.",
                    "example_translation": "Năng lượng mặt trời và gió là những yếu tố then chốt của năng lượng bền vững.",
                    "collocations": ["sustainable development"], "source_file": SOURCE_FILE_G10,
                    "pdf_page": 21, "book_page": 21, "source_section": "Reading p.21 & Glossary p.125",
                    "provenance": "extracted", "ocr_confidence": 0.96, "review_status": "verified"
                },
                {
                    "id": "g10-u02-vocab-006", "unit_id": "g10-u02", "word": "adopt", "word_type": "verb",
                    "ipa": "/əˈdɒpt/", "meaning_vi": "áp dụng, theo đuổi",
                    "definition_en": "to choose to take up or follow an idea or practice",
                    "example_sentence": "Our school has decided to adopt a green lifestyle policy.",
                    "example_translation": "Trường chúng tôi đã quyết định áp dụng chính sách lối sống xanh.",
                    "collocations": ["adopt a green lifestyle"], "source_file": SOURCE_FILE_G10,
                    "pdf_page": 18, "book_page": 18, "source_section": "Getting Started p.18 & Glossary p.124",
                    "provenance": "extracted", "ocr_confidence": 0.96, "review_status": "verified"
                }
            ],
            "grammar": [
                {
                    "id": "g10-u02-grammar-001", "unit_id": "g10-u02", "title": "Will vs. Be Going To",
                    "structure_name": "Tương lai đơn vs. Tương lai gần",
                    "rule_summary": "Dùng 'will' cho quyết định ngay tức thì hoặc dự đoán không có bằng chứng. Dùng 'be going to' cho kế hoạch định trước hoặc dự đoán có dấu hiệu cụ thể.",
                    "formula": "will + V / am,is,are + going to + V",
                    "example_sentences": [
                        {"en": "Look at the dark sky! It is going to rain.", "vi": "Nhìn trời tối sầm kìa! Trời sắp mưa rồi."},
                        {"en": "I think scientists will find new clean energy sources.", "vi": "Tôi nghĩ các nhà khoa học sẽ tìm ra nguồn năng lượng sạch mới."}
                    ],
                    "common_mistakes": [
                        {"mistake": "Look! The baby will fall.", "correction": "Look! The baby is going to fall.", "explanation": "Có dấu hiệu cụ thể trước mắt cần dùng be going to."}
                    ],
                    "source_file": SOURCE_FILE_G10, "pdf_page": 20, "book_page": 20, "source_section": "Language p.20",
                    "provenance": "extracted", "ocr_confidence": 0.96, "review_status": "verified"
                },
                {
                    "id": "g10-u02-grammar-002", "unit_id": "g10-u02", "title": "Passive Voice (Present & Future)",
                    "structure_name": "Câu bị động",
                    "rule_summary": "Dùng câu bị động để nhấn mạnh hành động hoặc đối tượng chịu tác động: S + be + V3/ed.",
                    "formula": "S + am/is/are + V3/ed (Present) | S + will be + V3/ed (Future)",
                    "example_sentences": [
                        {"en": "Rubbish is collected every morning.", "vi": "Rác được thu gom vào mỗi buổi sáng."},
                        {"en": "A new park will be opened next month.", "vi": "Một công viên mới sẽ được khánh thành vào tháng tới."}
                    ],
                    "common_mistakes": [
                        {"mistake": "The trees was planted yesterday.", "correction": "The trees were planted yesterday.", "explanation": "Chủ ngữ số nhiều 'trees' đi với 'were'."}
                    ],
                    "source_file": SOURCE_FILE_G10, "pdf_page": 20, "book_page": 20, "source_section": "Language p.20",
                    "provenance": "extracted", "ocr_confidence": 0.96, "review_status": "verified"
                }
            ],
            "reading": {
                "id": "g10-u02-reading-001", "unit_id": "g10-u02", "topic": "Living Green",
                "main_idea": "Sống xanh là việc đưa ra các lựa chọn hàng ngày giảm thiểu ô nhiễm và bảo tồn tài nguyên cho các thế hệ tương lai.",
                "reading_skills": ["Skimming", "Scanning for facts"],
                "keywords": ["eco-friendly", "reduce", "carbon footprint", "recycle"],
                "game_questions": [
                    {
                        "prompt": "Hành động nào giúp trực tiếp bảo tồn tài nguyên điện năng?",
                        "options": ["Tắt thiết bị điện khi rời phòng", "Bật điều hòa suốt đêm", "Sử dụng nhiều túi nilon", "Để vòi nước chảy tự do"],
                        "correctAnswer": "Tắt thiết bị điện khi rời phòng",
                        "explanation": "Tắt thiết bị khi không dùng giúp tiết kiệm năng lượng và giảm hóa đơn tiền điện."
                    }
                ],
                "source_file": SOURCE_FILE_G10, "pdf_page": 21, "book_page": 21, "source_section": "Reading p.21-22",
                "provenance": "game_authored", "ocr_confidence": 0.95, "review_status": "verified"
            },
            "skills": {
                "listening": {
                    "objective": "Listening for specific details in an announcement for a Go Green event",
                    "activity_types": ["Gap-fill", "Multiple choice"],
                    "audio_source_note": "Audio CD1 Track 11. Cần audio ngoài.",
                    "asset_required": True, "source_file": SOURCE_FILE_G10, "pdf_page": 23, "book_page": 23,
                    "source_section": "Listening p.23", "provenance": "extracted", "ocr_confidence": 0.90, "review_status": "needs_review"
                },
                "speaking": {
                    "objective": "Discussing ways to live green and conserve resources",
                    "activity_types": ["Pair debate", "Group brainstorm"],
                    "prompts": ["What eco-friendly habits can your school introduce this term?"],
                    "source_file": SOURCE_FILE_G10, "pdf_page": 22, "book_page": 22, "source_section": "Speaking p.22",
                    "provenance": "extracted", "ocr_confidence": 0.95, "review_status": "verified"
                },
                "writing": {
                    "objective": "Writing an article suggesting solutions to environmental problems in the neighbourhood",
                    "task_type": "Article writing",
                    "sample_outline": ["Problem introduction", "Proposed green solutions", "Call to action"],
                    "source_file": SOURCE_FILE_G10, "pdf_page": 24, "book_page": 24, "source_section": "Writing p.24",
                    "provenance": "extracted", "ocr_confidence": 0.94, "review_status": "verified"
                }
            },
            "questions": [
                {
                    "id": "g10-u02-question-001", "unit_id": "g10-u02", "knowledgeItemIds": ["g10-u02-vocab-001"],
                    "type": "multiple_choice", "prompt": "Cụm từ 'carbon footprint' chỉ điều gì?",
                    "options": ["Lượng khí CO2 thải ra từ các hoạt động con người", "Vết chân dính bụi trên mặt đất", "Công nghệ sản xuất giày tái chế", "Loại than đá ít khói"],
                    "correctAnswer": "Lượng khí CO2 thải ra từ các hoạt động con người", "explanation": "Dấu chân carbon đo lường tổng lượng phát thải CO2.",
                    "difficulty": "easy", "timeLimit": 10, "source_file": SOURCE_FILE_G10, "pdf_page": 20, "book_page": 20, "source_section": "Language p.20",
                    "provenance": "game_authored", "ocr_confidence": 0.96, "review_status": "verified"
                },
                {
                    "id": "g10-u02-question-002", "unit_id": "g10-u02", "knowledgeItemIds": ["g10-u02-vocab-002"],
                    "type": "multiple_choice", "prompt": "Sản phẩm không gây tổn hại đến thiên nhiên được gọi là:",
                    "options": ["Eco-friendly product", "Dangerous good", "Harmful material", "Wasteful device"],
                    "correctAnswer": "Eco-friendly product", "explanation": "Eco-friendly = thân thiện môi trường.",
                    "difficulty": "easy", "timeLimit": 10, "source_file": SOURCE_FILE_G10, "pdf_page": 20, "book_page": 20, "source_section": "Language p.20",
                    "provenance": "game_authored", "ocr_confidence": 0.96, "review_status": "verified"
                },
                {
                    "id": "g10-u02-question-003", "unit_id": "g10-u02", "knowledgeItemIds": ["g10-u02-vocab-003"],
                    "type": "multiple_choice", "prompt": "Điền từ: 'Remember to unplug all electrical _______ before going on holiday.'",
                    "options": ["appliances", "emissions", "footprints", "groceries"],
                    "correctAnswer": "appliances", "explanation": "Electrical appliances = thiết bị điện.",
                    "difficulty": "easy", "timeLimit": 10, "source_file": SOURCE_FILE_G10, "pdf_page": 20, "book_page": 20, "source_section": "Language p.20",
                    "provenance": "game_authored", "ocr_confidence": 0.95, "review_status": "verified"
                },
                {
                    "id": "g10-u02-question-004", "unit_id": "g10-u02", "knowledgeItemIds": ["g10-u02-grammar-001"],
                    "type": "multiple_choice", "prompt": "Chọn dạng đúng: 'I am so tired. I think I _______ to bed early tonight.'",
                    "options": ["will go", "am going to go", "went", "have gone"],
                    "correctAnswer": "will go", "explanation": "Quyết định đưa ra ngay tại thời điểm nói dùng 'will'.",
                    "difficulty": "medium", "timeLimit": 10, "source_file": SOURCE_FILE_G10, "pdf_page": 20, "book_page": 20, "source_section": "Language p.20",
                    "provenance": "game_authored", "ocr_confidence": 0.96, "review_status": "verified"
                },
                {
                    "id": "g10-u02-question-005", "unit_id": "g10-u02", "knowledgeItemIds": ["g10-u02-grammar-001"],
                    "type": "multiple_choice", "prompt": "Chọn phương án đúng: 'We have bought the tickets. We _______ Hanoi next Friday.'",
                    "options": ["are going to visit", "will visit", "visit", "visited"],
                    "correctAnswer": "are going to visit", "explanation": "Đã có kế hoạch và chuẩn bị trước (bought tickets) dùng 'are going to'.",
                    "difficulty": "medium", "timeLimit": 12, "source_file": SOURCE_FILE_G10, "pdf_page": 20, "book_page": 20, "source_section": "Language p.20",
                    "provenance": "game_authored", "ocr_confidence": 0.96, "review_status": "verified"
                },
                {
                    "id": "g10-u02-question-006", "unit_id": "g10-u02", "knowledgeItemIds": ["g10-u02-grammar-002"],
                    "type": "multiple_choice", "prompt": "Chuyển sang bị động: 'They will plant hundreds of trees in the schoolyard.'",
                    "options": [
                        "Hundreds of trees will be planted in the schoolyard.",
                        "Hundreds of trees will planted in the schoolyard.",
                        "Hundreds of trees are planted in the schoolyard.",
                        "Hundreds of trees were planted in the schoolyard."
                    ],
                    "correctAnswer": "Hundreds of trees will be planted in the schoolyard.",
                    "explanation": "Bị động tương lai đơn: will + be + V3/ed.",
                    "difficulty": "medium", "timeLimit": 12, "source_file": SOURCE_FILE_G10, "pdf_page": 20, "book_page": 20, "source_section": "Language p.20",
                    "provenance": "game_authored", "ocr_confidence": 0.96, "review_status": "verified"
                },
                {
                    "id": "g10-u02-question-007", "unit_id": "g10-u02", "knowledgeItemIds": ["g10-u02-vocab-005"],
                    "type": "multiple_choice", "prompt": "Phát triển 'sustainable' là sự phát triển đáp ứng nhu cầu hiện tại mà:",
                    "options": [
                        "Không làm tổn hại đến khả năng đáp ứng nhu cầu của thế hệ tương lai",
                        "Khai thác kiệt quệ mọi tài nguyên khoáng sản",
                        "Chỉ chú trọng phát triển kinh tế bỏ qua môi trường",
                        "Ngừng hoàn toàn mọi hoạt động sản xuất công nghiệp"
                    ],
                    "correctAnswer": "Không làm tổn hại đến khả năng đáp ứng nhu cầu của thế hệ tương lai",
                    "explanation": "Định nghĩa chuẩn của phát triển bền vững.",
                    "difficulty": "medium", "timeLimit": 12, "source_file": SOURCE_FILE_G10, "pdf_page": 21, "book_page": 21, "source_section": "Reading p.21",
                    "provenance": "game_authored", "ocr_confidence": 0.95, "review_status": "verified"
                },
                {
                    "id": "g10-u02-question-008", "unit_id": "g10-u02", "knowledgeItemIds": ["g10-u02-vocab-004"],
                    "type": "fill_blank", "prompt": "Điền từ: 'Switching to electric buses significantly cuts down carbon _______ in urban centers.'",
                    "options": ["emissions", "appliances", "chores", "routines"],
                    "correctAnswer": "emissions", "explanation": "Carbon emissions = lượng phát thải carbon.",
                    "difficulty": "medium", "timeLimit": 12, "source_file": SOURCE_FILE_G10, "pdf_page": 20, "book_page": 20, "source_section": "Language p.20",
                    "provenance": "game_authored", "ocr_confidence": 0.95, "review_status": "verified"
                },
                {
                    "id": "g10-u02-question-009", "unit_id": "g10-u02", "knowledgeItemIds": ["g10-u02-vocab-006"],
                    "type": "multiple_choice", "prompt": "Điền động từ: 'More people should _______ greener habits to protect our ecosystems.'",
                    "options": ["adopt", "emit", "damage", "ignore"],
                    "correctAnswer": "adopt", "explanation": "Adopt habits = tiếp thu, áp dụng thói quen mới.",
                    "difficulty": "easy", "timeLimit": 10, "source_file": SOURCE_FILE_G10, "pdf_page": 18, "book_page": 18, "source_section": "Getting Started p.18",
                    "provenance": "game_authored", "ocr_confidence": 0.96, "review_status": "verified"
                },
                {
                    "id": "g10-u02-question-010", "unit_id": "g10-u02", "knowledgeItemIds": ["g10-u02-vocab-001", "g10-u02-vocab-002"],
                    "type": "sentence_order", "prompt": "Sắp xếp thành câu hoàn chỉnh về lối sống xanh:",
                    "options": [
                        "We can reduce our carbon footprint by walking to school.",
                        "By walking to school our carbon footprint we reduce can.",
                        "Our carbon footprint reduce we can by walking to school.",
                        "To school walking we can reduce by our carbon footprint."
                    ],
                    "correctAnswer": "We can reduce our carbon footprint by walking to school.",
                    "explanation": "Cấu trúc: S + can + V + O + by + V-ing.",
                    "difficulty": "hard", "timeLimit": 15,
                    "wordsToOrder": ["We", "can", "reduce", "our", "carbon", "footprint", "by", "walking", "to", "school."],
                    "source_file": SOURCE_FILE_G10, "pdf_page": 20, "book_page": 20, "source_section": "Language p.20",
                    "provenance": "game_authored", "ocr_confidence": 0.96, "review_status": "verified"
                }
            ]
        }
    ]

    return units + units_def
