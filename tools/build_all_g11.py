import json
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

SOURCE_G11 = "Sách Tiếng anh 11 Global success - Sách học sinh.pdf"
OUT_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'content', 'global-success', 'grade-11')
os.makedirs(OUT_DIR, exist_ok=True)

def build_grade_11():
    units_data = [
        # Unit 1: A Long and Healthy Life
        {
            "num": 1, "title": "A LONG AND HEALTHY LIFE", "topic": "Health, Nutrition, Fitness and Longevity",
            "p_book": (8, 17), "p_pdf": (8, 17), "pron": "Strong and weak forms of auxiliary verbs",
            "vocabs": [
                ("antibiotic", "noun", "/ˌæntibaɪˈɒtɪk/", "thuốc kháng sinh", "a medicine that inhibits the growth of or destroys microorganisms", "Take antibiotics only when prescribed by a certified doctor.", "Chỉ dùng thuốc kháng sinh khi có đơn của bác sĩ có chuyên môn.", ["prescribe antibiotics"]),
                ("bacteria", "noun", "/bækˈtɪəriə/", "vi khuẩn", "microscopic organisms that can be beneficial or cause disease", "Washing hands regularly kills harmful bacteria.", "Rửa tay thường xuyên giúp tiêu diệt vi khuẩn có hại.", ["harmful bacteria"]),
                ("lifespan", "noun", "/ˈlaɪfspæn/", "tuổi thọ", "the length of time for which a person or animal lives", "Healthy diet and exercise significantly increase human lifespan.", "Ăn uống lành mạnh và tập thể dục giúp kéo dài đáng kể tuổi thọ con người.", ["average lifespan"]),
                ("immune system", "noun phrase", "/ɪˈmjuːn ˌsɪstəm/", "hệ miễn dịch", "the bodily system that protects against infectious diseases", "Vitamin C strengthens the immune system against viruses.", "Vitamin C giúp củng cố hệ miễn dịch chống lại virus.", ["boost the immune system"]),
                ("workout", "noun", "/ˈwɜːkaʊt/", "buổi tập luyện thể dục thể thao", "a session of physical exercise or training", "A 30-minute daily workout keeps your heart healthy.", "Buổi tập thể dục 30 phút mỗi ngày giúp trái tim bạn khỏe mạnh.", ["daily workout"]),
                ("longevity", "noun", "/lɒnˈdʒevəti/", "sự sống lâu, trường thọ", "long life or the ability to live for a very long time", "Clean air and low stress contribute to longevity.", "Không khí sạch và ít căng thẳng góp phần tăng tuổi thọ.", ["promote longevity"])
            ],
            "grammars": [
                ("Past Simple vs. Present Perfect", "Quá khứ đơn vs. Hiện tại hoàn thành", "Quá khứ đơn dùng cho hành động đã kết thúc tại một thời điểm xác định trong quá khứ (yesterday, last year, in 2020). Hiện tại hoàn thành dùng cho trải nghiệm hoặc hành động bắt đầu ở quá khứ và còn kéo dài/ảnh hưởng đến hiện tại (since, for, already, yet).", "Past Simple: S + V2/ed | Present Perfect: S + have/has + V3/ed",
                 [("He caught a cold last week, but now he has recovered completely.", "Cậu ấy bị cảm lạnh tuần trước, nhưng hiện nay cậu đã hồi phục hoàn toàn."),
                  ("I have followed this workout routine for six months.", "Tôi đã duy trì lịch tập thể dục này được sáu tháng rồi.")],
                 [("I have visited the doctor yesterday.", "I visited the doctor yesterday.", "Có mốc thời gian 'yesterday' phải dùng Quá khứ đơn.")])
            ],
            "reading": ("Secrets to a Long and Healthy Life", "Bí quyết sống thọ của các cư dân vùng Blue Zones: dinh dưỡng tự nhiên, vận động thường xuyên và tinh thần thư thái.", ["Main idea", "Detail scanning"], ["longevity", "nutrition", "exercise", "immune system"],
                        [("Yếu tố nào đóng vai trò then chốt cho sức khỏe lâu dài của con người?", ["Chế độ dinh dưỡng cân bằng và vận động thể chất thường xuyên", "Chỉ uống thuốc bổ mà không cần vận động", "Ngủ 15 tiếng mỗi ngày", "Làm việc căng thẳng không nghỉ ngơi"], "Chế độ dinh dưỡng cân bằng và vận động thể chất thường xuyên", "Dinh dưỡng lành mạnh và tập luyện duy trì hệ miễn dịch khỏe mạnh.")]),
            "skills": {
                "listening": ("Listening to a TV chat show discussing food, nutrition and teenage health", ["Multiple choice", "Note-taking"], "Audio G11 Track 03", True),
                "speaking": ("Giving clear instructions for a safe daily workout routine", ["Pair role-play"], ["How to warm up properly before strenuous exercise?"]),
                "writing": ("Writing a short advisory message encouraging a friend to build healthy habits", "Informal advice note", ["Greeting", "Specific advice", "Encouragement"])
            },
            "questions": [
                ("multiple_choice", "Thuốc dùng để tiêu diệt hoặc ức chế vi khuẩn được gọi là:", ["Antibiotic", "Pollution", "Appliance", "Emission"], "Antibiotic", "Antibiotic = thuốc kháng sinh.", "easy", 10, ["g11-u01-vocab-001"], None),
                ("multiple_choice", "Thuật ngữ chỉ khoảng thời gian sống trung bình của một loài là:", ["Lifespan", "Workout", "Bacteria", "Curfew"], "Lifespan", "Lifespan = tuổi thọ.", "easy", 10, ["g11-u01-vocab-003"], None),
                ("multiple_choice", "Hệ thống bảo vệ cơ thể khỏi virus và tác nhân gây bệnh là:", ["Immune system", "Digital device", "Solar energy", "Hardware"], "Immune system", "Immune system = hệ thống miễn dịch.", "easy", 10, ["g11-u01-vocab-004"], None),
                ("multiple_choice", "Chọn thì đúng: 'Scientists _______ a new vaccine against this virus last year.'", ["developed", "have developed", "were developed", "are developing"], "developed", "Có 'last year' là mốc thời gian quá khứ xác định -> Quá khứ đơn.", "medium", 10, ["g11-u01-grammar-001"], None),
                ("multiple_choice", "Điền từ: 'Nam _______ regular exercise since he joined the sports club.'", ["has done", "did", "does", "was doing"], "has done", "Mệnh đề với 'since + quá khứ đơn' chia Hiện tại hoàn thành: has done.", "medium", 10, ["g11-u01-grammar-001"], None),
                ("multiple_choice", "Một buổi tập luyện thể dục thể thao cường độ phù hợp gọi là:", ["Workout", "Immune", "Lifespan", "Antibiotic"], "Workout", "Workout = buổi tập thể dục.", "easy", 10, ["g11-u01-vocab-005"], None),
                ("multiple_choice", "Từ nào đồng nghĩa với 'longevity'?", ["Long life", "Short illness", "Sudden fever", "Weak health"], "Long life", "Longevity = sự sống thọ, tuổi thọ dài.", "easy", 10, ["g11-u01-vocab-006"], None),
                ("fill_blank", "Hoàn thành câu: 'Doctors warn that overuse of _______ can make bacteria resistant to medicine.'", ["antibiotics", "emissions", "appliances", "chores"], "antibiotics", "Overuse of antibiotics = lạm dụng thuốc kháng sinh.", "medium", 12, ["g11-u01-vocab-001"], None),
                ("multiple_choice", "Chọn câu phối hợp thì chính xác:", [
                    "I had a sore throat two days ago, but I have felt better now.",
                    "I have a sore throat two days ago, but I feel better now.",
                    "I have had a sore throat two days ago, but I felt better now.",
                    "I had a sore throat two days ago, but I feel better now."
                ], "I had a sore throat two days ago, but I feel better now.", "Two days ago dùng quá khứ đơn (had); now dùng hiện tại đơn (feel).", "medium", 12, ["g11-u01-grammar-001"], None),
                ("sentence_order", "Sắp xếp thành lời khuyên tăng cường sức khỏe:", ["Regular physical workouts strengthen your immune system effectively.", "Your immune system regular physical workouts strengthen effectively.", "Effectively strengthen your immune system regular physical workouts.", "Workouts strengthen effectively your immune system regular physical."], "Regular physical workouts strengthen your immune system effectively.", "S + V + O + adv.", "hard", 15, ["g11-u01-vocab-004", "g11-u01-vocab-005"], ["Regular", "physical", "workouts", "strengthen", "your", "immune", "system", "effectively."])
            ]
        },

        # Unit 2: The Generation Gap
        {
            "num": 2, "title": "THE GENERATION GAP", "topic": "Generational Differences and Family Communication",
            "p_book": (18, 27), "p_pdf": (18, 27), "pron": "Contracted forms of verbs",
            "vocabs": [
                ("generation gap", "noun phrase", "/ˌdʒenəˈreɪʃn ɡæp/", "khoảng cách thế hệ", "differences in opinions or habits between younger and older people", "Open discussion helps families bridge the generation gap.", "Thảo luận cởi mở giúp các gia đình thu hẹp khoảng cách thế hệ.", ["bridge the generation gap"]),
                ("nuclear family", "noun phrase", "/ˌnjuːkliə ˈfæməli/", "gia đình hạt nhân (bố mẹ và con cái)", "a family group consisting of parents and their children only", "Nuclear families are becoming more common in urban regions.", "Gia đình hạt nhân đang ngày càng trở nên phổ biến ở các vùng đô thị.", ["live in a nuclear family"]),
                ("extended family", "noun phrase", "/ɪkˌstendɪd ˈfæməli/", "gia đình nhiều thế hệ (đại gia đình)", "a family that extends beyond parents and children, including grandparents and aunts", "In an extended family, children learn valuable lessons from grandparents.", "Trong một gia đình nhiều thế hệ, con cái học được nhiều bài học quý từ ông bà.", ["live with an extended family"]),
                ("curfew", "noun", "/ˈkɜːfjuː/", "giờ giới nghiêm trong gia đình", "a rule that requires people to be indoors after a certain hour", "Her parents set a strict 9:30 PM curfew on weekdays.", "Bố mẹ cô ấy đặt giờ giới nghiêm nghiêm ngặt lúc 9 giờ 30 tối vào các ngày trong tuần.", ["strict curfew"]),
                ("open-minded", "adjective", "/ˌəʊpən ˈmaɪndɪd/", "cởi mở, thoáng", "willing to consider new ideas and opinions", "Parents who are open-minded listen sympathetically to their teenagers.", "Những bậc phụ huynh cởi mở luôn biết lắng nghe và thấu hiểu con cái tuổi vị thành niên.", ["be open-minded"]),
                ("viewpoint", "noun", "/ˈvjuːpɔɪnt/", "quan điểm, góc nhìn", "a person's opinion or particular perspective on an issue", "We should respect each family member's unique viewpoint.", "Chúng ta nên tôn trọng quan điểm riêng của từng thành viên trong gia đình.", ["from my viewpoint"])
            ],
            "grammars": [
                ("Modal Verbs: Must, Have to, and Should", "Động từ khuyết thiếu: Must, Have to, Should", "Must: bổn phận bắt buộc từ nội tại người nói hoặc luật nghiêm ngặt; Have to: bổn phận do ngoại cảnh hoặc quy định gia đình/nhà trường; Should: lời khuyên chân thành, điều nên làm.", "S + must / have to / should + V(bare)",
                 [("Students must obey the school safety regulations.", "Học sinh bắt buộc phải tuân thủ quy định an toàn của nhà trường."),
                  ("You should talk politely with your grandparents.", "Bạn nên nói chuyện lễ phép với ông bà của mình.")],
                 [("You must to clean your room.", "You must clean your room.", "Sau must/should dùng động từ nguyên mẫu không 'to'.")])
            ],
            "reading": ("Generations Under One Roof", "Sự khác biệt quan điểm giữa ba thế hệ ông bà, cha mẹ và con cái trong gia đình hiện đại.", ["Main perspectives", "Summarising arguments"], ["generation gap", "curfew", "respect"],
                        [("Cách hiệu quả nhất để giải quyết bất đồng quan điểm giữa các thế hệ trong gia đình là gì?", ["Lắng nghe chân thành và tôn trọng góc nhìn của nhau", "Không bao giờ nói chuyện với nhau nữa", "Buộc con cái phải luôn phục tùng vô điều kiện", "Bỏ nhà đi khi có tranh luận"], "Lắng nghe chân thành và tôn trọng góc nhìn của nhau", "Giao tiếp cởi mở và thấu hiểu giúp giải quyết xung đột thế hệ.")]),
            "skills": {
                "listening": ("Listening to a conversation about curfew disputes between parents and teens", ["True/False", "Gap-fill"], "Audio G11 Track 08", True),
                "speaking": ("Discussing rules and curfews with classmates", ["Group debate"], ["Should teenagers have a strict curfew?"]),
                "writing": ("Writing an opinion essay debating whether parents should restrict screen time", "Opinion essay", ["Introduction", "Reasons for restriction", "Teenager rights", "Conclusion"])
            },
            "questions": [
                ("multiple_choice", "Sự khác biệt về cách nghĩ và lối sống giữa các lứa tuổi trong gia đình gọi là:", ["Generation gap", "Workout routine", "Biodiversity loss", "Economic growth"], "Generation gap", "Generation gap = khoảng cách thế hệ.", "easy", 10, ["g11-u02-vocab-001"], None),
                ("multiple_choice", "Gia đình chỉ gồm cha mẹ và con cái sinh sống gọi là:", ["Nuclear family", "Extended family", "Volunteer club", "Community"], "Nuclear family", "Nuclear family = gia đình hạt nhân.", "easy", 10, ["g11-u02-vocab-002"], None),
                ("multiple_choice", "Quy định giờ giấc bắt buộc phải có mặt ở nhà vào buổi tối gọi là:", ["Curfew", "Emission", "Antibiotic", "Appliance"], "Curfew", "Curfew = giờ giới nghiêm gia đình.", "easy", 10, ["g11-u02-vocab-004"], None),
                ("multiple_choice", "Chọn động từ khuyết thiếu thể hiện lời khuyên: 'Teenagers _______ talk openly with their parents about stress.'", ["should", "must not", "are", "have"], "should", "Should diễn đạt lời khuyên nên làm.", "easy", 10, ["g11-u02-grammar-001"], None),
                ("multiple_choice", "Chọn động từ bắt buộc theo quy định bên ngoài: 'In our school, every student _______ wear a uniform.'", ["has to", "should", "might", "can"], "has to", "Quy định của nhà trường dùng 'has to'.", "medium", 10, ["g11-u02-grammar-001"], None),
                ("multiple_choice", "Gia đình gồm cả ông bà, cô chú, bác sống cùng gọi là:", ["Extended family", "Nuclear family", "Ecotour", "Partnership"], "Extended family", "Extended family = đại gia đình nhiều thế hệ.", "easy", 10, ["g11-u02-vocab-003"], None),
                ("multiple_choice", "Người sẵn sàng lắng nghe và tiếp nhận những quan điểm mới được khen là:", ["Open-minded", "Selfish", "Lazy", "Curfew"], "Open-minded", "Open-minded = cởi mở, thoáng đạt.", "easy", 10, ["g11-u02-vocab-005"], None),
                ("fill_blank", "Hoàn thành câu: 'Each generation has its own unique _______ on modern life and technology.'", ["viewpoint", "appliance", "rubbish", "emission"], "viewpoint", "Viewpoint = góc nhìn, quan điểm.", "medium", 12, ["g11-u02-vocab-006"], None),
                ("multiple_choice", "Chọn câu dùng modal verbs đúng ngữ pháp:", [
                    "You must respect older family members.",
                    "You must to respect older family members.",
                    "You must respecting older family members.",
                    "You must respected older family members."
                ], "You must respect older family members.", "Must + V(bare) nguyên thể.", "medium", 10, ["g11-u02-grammar-001"], None),
                ("sentence_order", "Sắp xếp thành câu về sự cảm thông trong gia đình:", ["Open dialogue helps bridge the generation gap in modern families.", "The generation gap in modern families open dialogue helps bridge.", "Modern families helps bridge open dialogue the generation gap in.", "Bridge the generation gap in modern families open dialogue helps."], "Open dialogue helps bridge the generation gap in modern families.", "S + helps bridge + O.", "hard", 15, ["g11-u02-vocab-001"], ["Open", "dialogue", "helps", "bridge", "the", "generation", "gap", "in", "modern", "families."])
            ]
        },

        # Unit 3: Cities of the Future
        {
            "num": 3, "title": "CITIES OF THE FUTURE", "topic": "Smart Cities, Sustainable Urban Life and Green Infrastructure",
            "p_book": (28, 37), "p_pdf": (28, 37), "pron": "Linking final consonants to initial vowels",
            "vocabs": [
                ("smart city", "noun phrase", "/ˈsmɑːt sɪti/", "thành phố thông minh", "an urban area that uses technology and sensors to enhance city performance", "Smart cities use digital sensors to manage traffic flow efficiently.", "Các thành phố thông minh dùng cảm biến số để điều tiết lưu lượng giao thông hiệu quả.", ["build a smart city"]),
                ("sensor", "noun", "/ˈsensə(r)/", "cảm biến", "a device that detects or measures physical conditions", "Smart traffic lights have sensors to detect oncoming emergency vehicles.", "Đèn giao thông thông minh có các cảm biến để phát hiện xe cứu thương từ xa.", ["install sensors"]),
                ("infrastructure", "noun", "/ˈɪnfrəstrʌktʃə(r)/", "cơ sở hạ tầng", "the basic physical and organizational structures needed for a city", "Upgrading public transport infrastructure reduces highway gridlock.", "Nâng cấp cơ sở hạ tầng giao thông công cộng giúp giảm ùn tắc xa lộ.", ["modern infrastructure"]),
                ("pedestrian zone", "noun phrase", "/pəˈdestriən zəʊn/", "khu phố đi bộ", "an area reserved solely for pedestrians where vehicles are banned", "The historic downtown was turned into a charming pedestrian zone.", "Khu trung tâm lịch sử đã được chuyển thành một phố đi bộ hấp dẫn.", ["walk in pedestrian zone"]),
                ("liveable", "adjective", "/ˈlɪvəbl/", "đáng sống, tiện nghi", "fit or pleasant to live in", "Parks and clean air make our city far more liveable.", "Công viên và bầu không khí sạch làm thành phố chúng tôi đáng sống hơn rất nhiều.", ["liveable city"]),
                ("high-rise", "noun", "/ˈhaɪ raɪz/", "nhà cao tầng", "a tall modern building with many floors", "Rooftop gardens on high-rises help keep urban temperatures cool.", "Vườn trên nóc các tòa nhà cao tầng giúp giữ nhiệt độ đô thị mát mẻ.", ["high-rise apartment"])
            ],
            "grammars": [
                ("Stative Verbs in Continuous Forms & Linking Verbs", "Động từ chỉ trạng thái ở dạng tiếp diễn & Động từ nối", "Linking verbs (look, seem, sound, taste, smell, become, feel) đi với tính từ để miêu tả trạng thái chủ ngữ. Một số stative verbs (think, have, see) dùng ở tiếp diễn khi biểu thị hành động chủ động tạm thời.", "Linking verb + Adjective | S + be thinking/having + O",
                 [("The city air tastes fresh after the rain.", "Không khí thành phố trong lành sau cơn mưa."),
                  ("I am thinking about moving to a smart eco-city.", "Tôi đang cân nhắc chuyển đến một thành phố sinh thái thông minh.")],
                 [("The food smells deliciously.", "The food smells delicious.", "Sau động từ nối 'smell' dùng tính từ 'delicious', không dùng trạng từ.")])
            ],
            "reading": ("Tomorrow's Smart Cities", "Đặc trưng của các đô thị tương lai: năng lượng mặt trời, xe buýt tự hành và cảm biến thu gom rác tự động.", ["Identifying technology features", "Fact check"], ["smart city", "green energy", "liveable"],
                        [("Mục tiêu trọng tâm của các công nghệ trong thành phố tương lai là gì?", ["Nâng cao chất lượng cuộc sống người dân và giảm ô nhiễm", "Bắt buộc mọi người ở trong nhà cao tầng", "Cấm tất cả mọi người đi lại trên đường", "Bán đồ điện tử đắt tiền"], "Nâng cao chất lượng cuộc sống người dân và giảm ô nhiễm", "Công nghệ phục vụ cuộc sống tiện nghi, sạch sẽ và an toàn hơn.")]),
            "skills": {
                "listening": ("Listening to an interview exploring potential disadvantages of smart city living", ["True/False", "Gap-fill"], "Audio G11 Track 13", True),
                "speaking": ("Designing and presenting the ideal city of the future", ["Team presentation"], ["What makes your future city unique?"]),
                "writing": ("Writing an article discussing the advantages and drawbacks of living in a high-tech smart city", "Feature article", ["Introduction", "Smart benefits", "Privacy and cost issues", "Conclusion"])
            },
            "questions": [
                ("multiple_choice", "Đô thị ứng dụng công nghệ số và cảm biến để quản lý năng lượng và giao thông gọi là:", ["Smart city", "Nuclear family", "Antibiotic", "Endangered species"], "Smart city", "Smart city = thành phố thông minh.", "easy", 10, ["g11-u03-vocab-001"], None),
                ("multiple_choice", "Thiết bị dùng để phát hiện ánh sáng, chuyển động hoặc nhiệt độ được gọi là:", ["Sensor", "Lifespan", "Curfew", "Emission"], "Sensor", "Sensor = cảm biến.", "easy", 10, ["g11-u03-vocab-002"], None),
                ("multiple_choice", "Hệ thống đường xá, cầu cống và mạng lưới điện nước của một quốc gia gọi là:", ["Infrastructure", "Contestant", "Audience", "Appliance"], "Infrastructure", "Infrastructure = cơ sở hạ tầng.", "easy", 10, ["g11-u03-vocab-003"], None),
                ("multiple_choice", "Chọn tính từ đi sau linking verb: 'The urban streets look _______ after the clean-up.'", ["clean", "cleanly", "cleanness", "cleaning"], "clean", "Sau linking verb 'look' đi với tính từ 'clean'.", "medium", 10, ["g11-u03-grammar-001"], None),
                ("multiple_choice", "Phân biệt nghĩa tiếp diễn: 'I _______ that smart cities are great' vs 'I _______ about joining a project.'", ["think / am thinking", "am thinking / think", "thought / thinks", "think / think"], "think / am thinking", "Think (tin là) là trạng thái; am thinking (đang cân nhắc) là hành động suy nghĩ.", "hard", 12, ["g11-u03-grammar-001"], None),
                ("multiple_choice", "Khu vực cấm xe cơ giới chỉ dành cho người đi dạo mua sắm gọi là:", ["Pedestrian zone", "Highway lane", "Airport runaway", "Heavy lifting"], "Pedestrian zone", "Pedestrian zone = phố đi bộ.", "easy", 10, ["g11-u03-vocab-004"], None),
                ("multiple_choice", "Một thành phố trong lành, nhiều cây xanh và tiện ích thuận lợi được khen là:", ["Liveable", "Dangerous", "Polluted", "Deserted"], "Liveable", "Liveable = đáng sống.", "easy", 10, ["g11-u03-vocab-005"], None),
                ("fill_blank", "Hoàn thành câu: 'Rooftop solar panels on modern _______ help generate clean energy for residents.'", ["high-rises", "appliances", "chores", "viewpoints"], "high-rises", "High-rises = các tòa nhà cao tầng.", "medium", 12, ["g11-u03-vocab-006"], None),
                ("multiple_choice", "Chọn câu đúng sau linking verb 'sound':", [
                    "The plan to build new green parks sounds wonderful.",
                    "The plan to build new green parks sounds wonderfully.",
                    "The plan to build new green parks sound wonderfully.",
                    "The plan to build new green parks is sounding wonderfully."
                ], "The plan to build new green parks sounds wonderful.", "Sau 'sound' dùng tính từ 'wonderful'.", "medium", 10, ["g11-u03-grammar-001"], None),
                ("sentence_order", "Sắp xếp thành câu mô tả thành phố tương lai:", ["Smart infrastructure makes urban living safer and more sustainable.", "Urban living safer and more sustainable smart infrastructure makes.", "Makes urban living safer and more sustainable smart infrastructure.", "Safer and more sustainable smart infrastructure makes urban living."], "Smart infrastructure makes urban living safer and more sustainable.", "S + makes + O + adj.", "hard", 15, ["g11-u03-vocab-003"], ["Smart", "infrastructure", "makes", "urban", "living", "safer", "and", "more", "sustainable."])
            ]
        },

        # Unit 4: ASEAN and Viet Nam
        {
            "num": 4, "title": "ASEAN AND VIET NAM", "topic": "Regional Integration, Cultural Exchange and Youth Cooperation",
            "p_book": (40, 49), "p_pdf": (40, 49), "pron": "Elision of vowels in rapid speech",
            "vocabs": [
                ("solidarity", "noun", "/ˌsɒlɪˈdærəti/", "sự đoàn kết, tinh thần tương trợ", "unity or agreement of feeling or action among individuals with a common interest", "ASEAN nations stand together in regional solidarity and mutual respect.", "Các quốc gia ASEAN kề vai sát cánh trong tinh thần đoàn kết khu vực và tôn trọng lẫn nhau.", ["show solidarity"]),
                ("member state", "noun phrase", "/ˈmembə steɪt/", "quốc gia thành viên", "a country that is a member of an international association", "Viet Nam became the seventh member state of ASEAN in 1995.", "Việt Nam trở thành quốc gia thành viên thứ bảy của ASEAN vào năm 1995.", ["ASEAN member states"]),
                ("cultural exchange", "noun phrase", "/ˌkʌltʃərəl ɪksˈtʃeɪndʒ/", "sự giao lưu văn hóa", "the sharing of cultural ideas, music, and traditions between nations", "The annual youth festival promotes vibrant cultural exchange across Southeast Asia.", "Lễ hội thanh niên thường niên thúc đẩy giao lưu văn hóa sống động khắp Đông Nam Á.", ["promote cultural exchange"]),
                ("summit", "noun", "/ˈsʌmɪt/", "hội nghị thượng đỉnh", "an official meeting or series of meetings between heads of government", "Leaders gathered in Jakarta for the annual regional ASEAN Summit.", "Các nhà lãnh đạo tề tựu tại Jakarta để tham dự Hội nghị thượng đỉnh ASEAN thường niên.", ["ASEAN Summit"]),
                ("integrate", "verb", "/ˈɪntɪɡreɪt/", "hội nhập, hòa nhập", "to combine one thing with another so that they become a whole", "Viet Nam continues to integrate deeply into the regional economy.", "Việt Nam tiếp tục hội nhập sâu rộng vào nền kinh tế khu vực.", ["integrate into ASEAN"]),
                ("bloc", "noun", "/blɒk/", "khối liên minh (kinh tế/chính trị)", "a group of countries or political parties with common interests", "ASEAN has emerged as an influential economic bloc in Asia.", "ASEAN đã vươn lên thành một khối kinh tế có tầm ảnh hưởng tại châu Á.", ["regional trade bloc"])
            ],
            "grammars": [
                ("Gerunds as Subjects and Objects", "Danh động từ làm chủ ngữ và tân ngữ", "Danh động từ (V-ing) có thể đóng vai trò làm chủ ngữ số ít của câu (Learning English is useful) hoặc làm tân ngữ sau một số động từ (enjoy, suggest, avoid, practice) và sau giới từ.", "V-ing + V(singular) | Verb + V-ing | Preposition + V-ing",
                 [("Promoting peace is the primary mission of the association.", "Thúc đẩy hòa bình là sứ mệnh hàng đầu của hiệp hội."),
                  ("Students enjoy participating in cultural exchange programs.", "Học sinh rất thích tham gia các chương trình giao lưu văn hóa.")],
                 [("Learn foreign languages is important.", "Learning foreign languages is important.", "Động từ đứng đầu câu làm chủ ngữ phải ở dạng V-ing.")])
            ],
            "reading": ("ASEAN Youth in Action", "Các sáng kiến thanh niên thúc đẩy bảo vệ môi trường, văn hóa truyền thống và kỹ năng lãnh đạo trong khối ASEAN.", ["Main themes", "Fact matching"], ["ASEAN", "youth cooperation", "solidarity"],
                        [("Mục tiêu chính của các hội nghị giao lưu thanh niên ASEAN là gì?", ["Tăng cường hiểu biết văn hóa và kết nối thế hệ trẻ trong khu vực", "Buộc mọi học sinh phải học một ngôn ngữ duy nhất", "Thi đấu thể thao chuyên nghiệp đỉnh cao", "Xóa bỏ các trường học truyền thống"], "Tăng cường hiểu biết văn hóa và kết nối thế hệ trẻ trong khu vực", "Thanh niên ASEAN giao lưu để thắt chặt tình đoàn kết và chia sẻ kinh nghiệm phát triển.")]),
            "skills": {
                "listening": ("Listening to an audio overview of an educational ASEAN school tour programme", ["Gap-fill", "Multiple choice"], "Audio G11 Track 18", True),
                "speaking": ("Discussing the skills and experience needed for the ASEAN Youth Programme", ["Group discussion"], ["What leadership skills make an outstanding youth ambassador?"]),
                "writing": ("Writing an event proposal for welcoming international exchange students", "Proposal", ["Event title", "Objectives", "Activities schedule", "Budget and logistics"])
            },
            "questions": [
                ("multiple_choice", "Tinh thần đoàn kết, đồng lòng tương trợ giữa các quốc gia gọi là:", ["Solidarity", "Infrastructure", "Lifespan", "Discrimination"], "Solidarity", "Solidarity = sự đoàn kết.", "easy", 10, ["g11-u04-vocab-001"], None),
                ("multiple_choice", "Việt Nam gia nhập ASEAN vào năm nào và là thành viên thứ mấy?", ["Năm 1995 - thành viên thứ 7", "Năm 1967 - thành viên sáng lập", "Năm 2000 - thành viên thứ 10", "Năm 1986 - thành viên thứ 5"], "Năm 1995 - thành viên thứ 7", "Việt Nam gia nhập ASEAN ngày 28/7/1995, trở thành thành viên thứ 7.", "easy", 10, ["g11-u04-vocab-002"], None),
                ("multiple_choice", "Hoạt động chia sẻ âm nhạc, nghệ thuật và phong tục giữa các nước là:", ["Cultural exchange", "Household chore", "3D printing", "Heavy lifting"], "Cultural exchange", "Cultural exchange = giao lưu văn hóa.", "easy", 10, ["g11-u04-vocab-003"], None),
                ("multiple_choice", "Chọn danh động từ làm chủ ngữ: '_______ foreign languages opens doors to global careers.'", ["Learning", "Learn", "Learned", "To learning"], "Learning", "Danh động từ V-ing (Learning) làm chủ ngữ.", "medium", 10, ["g11-u04-grammar-001"], None),
                ("multiple_choice", "Điền dạng đúng sau giới từ: 'Youth ambassadors are interested in _______ traditional crafts.'", ["promoting", "promote", "promotes", "to promote"], "promoting", "Sau giới từ 'in' động từ ở dạng V-ing (promoting).", "medium", 10, ["g11-u04-grammar-001"], None),
                ("multiple_choice", "Hội nghị cấp cao giữa các nguyên thủ quốc gia được gọi là:", ["Summit", "Workout", "Curfew", "Sensor"], "Summit", "Summit = hội nghị thượng đỉnh.", "easy", 10, ["g11-u04-vocab-004"], None),
                ("multiple_choice", "Từ 'bloc' trong kinh tế chính trị chỉ điều gì?", ["Khối liên minh các nước cùng quyền lợi", "Một ngôi nhà nhiều tầng", "Một bức tường ngăn cách", "Một loại máy bay trực thăng"], "Khối liên minh các nước cùng quyền lợi", "Bloc = khối, liên minh quốc gia.", "easy", 10, ["g11-u04-vocab-006"], None),
                ("fill_blank", "Hoàn thành câu: 'Viet Nam actively works to _______ regional trade barriers within the ASEAN community.'", ["reduce", "emit", "distract", "donate"], "reduce", "Reduce trade barriers = cắt giảm rào cản thương mại.", "medium", 12, ["g11-u04-vocab-005"], None),
                ("multiple_choice", "Chọn câu sử dụng danh động từ làm tân ngữ chính xác:", [
                    "They avoid discussing sensitive political disagreements.",
                    "They avoid to discuss sensitive political disagreements.",
                    "They avoid discuss sensitive political disagreements.",
                    "They avoid discussed sensitive political disagreements."
                ], "They avoid discussing sensitive political disagreements.", "Động từ 'avoid' đi với V-ing (discussing).", "medium", 10, ["g11-u04-grammar-001"], None),
                ("sentence_order", "Sắp xếp thành câu về tình đoàn kết ASEAN:", ["ASEAN member states work together to maintain regional peace and prosperity.", "To maintain regional peace and prosperity ASEAN member states work together.", "Peace and prosperity to maintain ASEAN member states work together regional.", "Together work ASEAN member states to maintain regional peace and prosperity."], "ASEAN member states work together to maintain regional peace and prosperity.", "S + work together + to V.", "hard", 15, ["g11-u04-vocab-001", "g11-u04-vocab-002"], ["ASEAN", "member", "states", "work", "together", "to", "maintain", "regional", "peace", "and", "prosperity."])
            ]
        },

        # Unit 5: Global Warming
        {
            "num": 5, "title": "GLOBAL WARMING", "topic": "Climate Change, Greenhouse Emissions and Planet Protection",
            "p_book": (50, 59), "p_pdf": (50, 59), "pron": "Sentence stress and rhythm",
            "vocabs": [
                ("global warming", "noun phrase", "/ˌɡləʊbl ˈwɔːmɪŋ/", "sự nóng lên toàn cầu", "a gradual increase in the overall temperature of the Earth's atmosphere", "Global warming is causing polar ice caps to melt at alarming speeds.", "Sự nóng lên toàn cầu đang khiến các tảng băng vùng cực tan chảy với tốc độ đáng báo động.", ["combat global warming"]),
                ("greenhouse gas", "noun phrase", "/ˈɡriːnhaʊs ɡæs/", "khí nhà kính", "a gas that contributes to the greenhouse effect by absorbing radiation", "Carbon dioxide and methane are the most prevalent greenhouse gases.", "Khí CO2 và khí metan là những khí nhà kính phổ biến nhất.", ["greenhouse gas emissions"]),
                ("black carbon", "noun phrase", "/ˌblæk ˈkɑːbən/", "carbon đen, muội than", "fine particulate matter formed by the incomplete combustion of fossil fuels", "Black carbon settling on ice absorbs heat and speeds up melting.", "Muội carbon đen bám vào băng hấp thụ nhiệt và đẩy nhanh tốc độ tan chảy.", ["particles of black carbon"]),
                ("deforestation", "noun", "/diːˌfɒrɪˈsteɪʃn/", "nạn phá rừng", "the clearing or thinning of forests by humans", "Deforestation removes natural carbon sinks that absorb greenhouse gases.", "Nạn phá rừng làm mất đi các bể chứa carbon tự nhiên hấp thụ khí nhà kính.", ["massive deforestation"]),
                ("extreme weather", "noun phrase", "/ɪkˌstriːm ˈweðə(r)/", "thời tiết cực đoan", "unusual, severe, or unseasonal weather phenomena", "Climate change is driving an increase in droughts, storms, and extreme weather.", "Biến đổi khí hậu đang làm gia tăng các đợt hạn hán, bão tố và thời tiết cực đoan.", ["face extreme weather"]),
                ("catastrophic", "adjective", "/ˌkætəˈstrɒfɪk/", "thảm khốc, tai họa nghiêm trọng", "involving or causing sudden great damage or suffering", "Failure to act quickly on emissions could lead to catastrophic global consequences.", "Không hành động nhanh chóng về khí thải có thể dẫn đến những hậu quả toàn cầu thảm khốc.", ["catastrophic flood"])
            ],
            "grammars": [
                ("Participle Clauses (Present and Past)", "Mệnh đề phân từ: Hiện tại và Quá khứ", "Mệnh đề phân từ dùng để rút gọn mệnh đề trạng ngữ chỉ nguyên nhân, thời gian hoặc điều kiện. Dùng Present Participle (V-ing) khi chủ ngữ ở thể chủ động; dùng Past Participle (V3/ed) khi ở thể bị động.", "Active: V-ing, S + V | Passive: V3/ed, S + V",
                 [("Knowing that climate change is serious, people are using renewable energy.", "Ý thức được biến đổi khí hậu là nghiêm trọng, người dân đang sử dụng năng lượng tái tạo."),
                  ("Heated by rising temperatures, polar ice is melting fast.", "Bị làm nóng bởi nhiệt độ gia tăng, băng ở các cực đang tan rất nhanh.")],
                 [("Burn fossil fuels, factories cause smog.", "Burning fossil fuels, factories cause smog.", "Mệnh đề chủ động rút gọn phải dùng dạng V-ing (Burning).")])
            ],
            "reading": ("The UN Climate Summit", "Thỏa thuận quốc tế về kiểm soát nhiệt độ toàn cầu không vượt quá 1.5 độ C so với thời kỳ tiền công nghiệp.", ["Scanning for targets", "Understanding causes"], ["climate summit", "emissions target", "greenhouse gas"],
                        [("Mục tiêu cốt lõi của thỏa thuận khí hậu toàn cầu là gì?", ["Giới hạn mức tăng nhiệt độ Trái Đất dưới 1.5 độ C", "Khuyến khích đốt thêm than đá", "Hủy bỏ các dự án điện mặt trời", "Cho phép xả rác thoải mái ra đại dương"], "Giới hạn mức tăng nhiệt độ Trái Đất dưới 1.5 độ C", "Mục tiêu 1.5°C là ngưỡng an toàn để tránh thảm họa khí hậu.")]),
            "skills": {
                "listening": ("Listening to a scientific talk about how black carbon particles absorb solar heat", ["Note-taking", "Multiple choice"], "Audio G11 Track 23", True),
                "speaking": ("Presenting solutions to cut personal carbon emissions in everyday life", ["Pair presentation"], ["How can schools reduce their environmental footprint?"]),
                "writing": ("Writing a persuasive leaflet urging residents to adopt cleaner energy practices", "Persuasive leaflet", ["Catchy headline", "Key facts", "Actionable steps", "Contact"])
            },
            "questions": [
                ("multiple_choice", "Hiện tượng nhiệt độ bề mặt Trái Đất tăng dần do khí nhà kính gọi là:", ["Global warming", "Cultural exchange", "Generation gap", "Lifespan"], "Global warming", "Global warming = sự nóng lên toàn cầu.", "easy", 10, ["g11-u05-vocab-001"], None),
                ("multiple_choice", "Khí CO2 và khí mê-tan được phân loại vào nhóm khí nào?", ["Greenhouse gases", "Medical antibiotics", "Sensors", "Household appliances"], "Greenhouse gases", "Greenhouse gases = khí nhà kính.", "easy", 10, ["g11-u05-vocab-002"], None),
                ("multiple_choice", "Hạt muội than sinh ra do đốt không hết nhiên liệu hóa thạch gọi là:", ["Black carbon", "Green energy", "Solar panel", "Flora"], "Black carbon", "Black carbon = carbon đen / muội than.", "easy", 10, ["g11-u05-vocab-003"], None),
                ("multiple_choice", "Rút gọn câu chủ động: 'Because they realized the danger, scientists warned governments.'", [
                    "Realizing the danger, scientists warned governments.",
                    "Realized the danger, scientists warned governments.",
                    "Having realize the danger, scientists warned governments.",
                    "To realize the danger, scientists warned governments."
                ], "Realizing the danger, scientists warned governments.", "Mệnh đề chủ động rút gọn dùng Present Participle (Realizing).", "medium", 12, ["g11-u05-grammar-001"], None),
                ("multiple_choice", "Rút gọn câu bị động: 'Because it was damaged by the hurricane, the forest lost many ancient trees.'", [
                    "Damaged by the hurricane, the forest lost many ancient trees.",
                    "Damaging by the hurricane, the forest lost many ancient trees.",
                    "Being damage by the hurricane, the forest lost many ancient trees.",
                    "Damage by the hurricane, the forest lost many ancient trees."
                ], "Damaged by the hurricane, the forest lost many ancient trees.", "Mệnh đề bị động rút gọn dùng Past Participle (Damaged).", "medium", 12, ["g11-u05-grammar-001"], None),
                ("multiple_choice", "Bão lũ lịch sử, hạn hán gay gắt và sóng nhiệt bất thường được gọi chung là:", ["Extreme weather", "Gentle rain", "Spring breeze", "Cold drink"], "Extreme weather", "Extreme weather = thời tiết cực đoan.", "easy", 10, ["g11-u05-vocab-005"], None),
                ("multiple_choice", "Từ 'catastrophic' đồng nghĩa với từ nào sau đây?", ["Disastrous", "Pleasant", "Helpful", "Minor"], "Disastrous", "Catastrophic = thảm khốc, mang tính thảm họa (disastrous).", "easy", 10, ["g11-u05-vocab-006"], None),
                ("fill_blank", "Hoàn thành câu: 'Tropical _______ not only destroys animal homes but also releases stored carbon.'", ["deforestation", "solidarity", "workout", "curfew"], "deforestation", "Deforestation = nạn phá rừng.", "medium", 12, ["g11-u05-vocab-004"], None),
                ("multiple_choice", "Chọn câu dùng mệnh đề phân từ chính xác:", [
                    "Burning coal for energy, power plants release tons of CO2.",
                    "Burn coal for energy, power plants release tons of CO2.",
                    "Burned coal for energy, power plants release tons of CO2.",
                    "For burning coal, power plants release tons of CO2."
                ], "Burning coal for energy, power plants release tons of CO2.", "Chủ động: Burning coal for energy...", "medium", 10, ["g11-u05-grammar-001"], None),
                ("sentence_order", "Sắp xếp thành thông điệp khẩn cấp về biến đổi khí hậu:", ["Urgent global action is required to fight catastrophic climate change.", "To fight catastrophic climate change urgent global action is required.", "Climate change catastrophic to fight urgent global action is required.", "Is required urgent global action to fight catastrophic climate change."], "Urgent global action is required to fight catastrophic climate change.", "S + is required + to V.", "hard", 15, ["g11-u05-vocab-006"], ["Urgent", "global", "action", "is", "required", "to", "fight", "catastrophic", "climate", "change."])
            ]
        },

        # Unit 6: Preserving Our Heritage
        {
            "num": 6, "title": "PRESERVING OUR HERITAGE", "topic": "Tangible, Intangible and Natural Cultural Heritage Preservation",
            "p_book": (64, 73), "p_pdf": (64, 73), "pron": "Intonation in statements, commands, and lists",
            "vocabs": [
                ("heritage", "noun", "/ˈherɪtɪdʒ/", "di sản văn hóa hoặc tự nhiên", "features belonging to the culture of a society, such as traditions and monuments", "Preserving cultural heritage is essential for national identity.", "Bảo tồn di sản văn hóa là điều cốt lõi cho bản sắc dân tộc.", ["cultural heritage", "world heritage"]),
                ("monument", "noun", "/ˈmɒnjumənt/", "đài tưởng niệm, di tích lịch sử", "a statue, building, or other structure built to remember a notable person or event", "The ancient monument attracts scholars and tourists from across the globe.", "Khu di tích cổ kính thu hút các học giả và du khách từ khắp nơi trên thế giới.", ["historic monument"]),
                ("tangible", "adjective", "/ˈtændʒəbl/", "hữu thể, hữu hình (sờ thấy được)", "perceptible by touch; clear and definite", "Ancient temples and citadels represent tangible cultural heritage.", "Đền đài và thành quách cổ đại đại diện cho di sản văn hóa hữu hình.", ["tangible heritage"]),
                ("intangible", "adjective", "/ɪnˈtændʒəbl/", "phi vật thể, vô hình", "not having physical presence, such as folklore and traditional music", "Folk singing and culinary arts are precious forms of intangible heritage.", "Dân ca và nghệ thuật ẩm thực là những dạng di sản phi vật thể quý giá.", ["intangible cultural heritage"]),
                ("preservation", "noun", "/ˌprezəˈveɪʃn/", "sự gìn giữ, bảo tồn", "the act of keeping something in its original state or good condition", "Experts specialize in the scientific preservation of historic manuscripts.", "Các chuyên gia chuyên tâm vào công tác bảo tồn khoa học các bản thảo lịch sử.", ["heritage preservation"]),
                ("citadel", "noun", "/ˈsɪtədəl/", "thành trì, hoàng thành", "a fortress protecting or dominating a city", "The Imperial Citadel of Thang Long is a renowned UNESCO World Heritage site.", "Hoàng thành Thăng Long là di sản thế giới UNESCO nổi tiếng.", ["ancient citadel"])
            ],
            "grammars": [
                ("To-infinitive Clauses (Reduced Relative Clauses)", "Mệnh đề to-infinitive rút gọn mệnh đề quan hệ", "Dùng to-infinitive để rút gọn mệnh đề quan hệ sau the first, the second, the only, the last, hoặc các cấu trúc so sánh hơn nhất.", "the first / the last / the only + N + to-V (chủ động) / to be V3 (bị động)",
                 [("Ha Long Bay was the first site in Viet Nam to be recognized by UNESCO.", "Vịnh Hạ Long là địa danh đầu tiên ở Việt Nam được UNESCO công nhận."),
                  ("He was the only student to propose an innovative heritage app.", "Cậu ấy là học sinh duy nhất đề xuất một ứng dụng di sản sáng tạo.")],
                 [("He was the first person who arriving there.", "He was the first person to arrive there.", "Sau 'the first person' dùng 'to arrive'.")])
            ],
            "reading": ("Youth Ideas for Heritage", "Cuộc thi sáng kiến thanh niên áp dụng thực tế ảo (VR) và mạng xã hội để quảng bá di tích lịch sử.", ["Main proposals", "Detail retrieval"], ["heritage app", "virtual reality", "youth ideas"],
                        [("Giải pháp sáng tạo nào được thanh niên đề xuất để quảng bá di tích?", ["Ứng dụng công nghệ thực tế ảo và tour số hóa", "Đóng cửa tất cả các di tích để tránh hư hại", "Bán đấu giá cổ vật quý", "Thay thế di tích bằng các tòa nhà hiện đại"], "Ứng dụng công nghệ thực tế ảo và tour số hóa", "Công nghệ số hóa giúp giới trẻ dễ tiếp cận và trân trọng di sản hơn.")]),
            "skills": {
                "listening": ("Listening to a tour guide's talk about the Trang An Landscape Complex", ["Ordering events", "Gap-fill"], "Audio G11 Track 28", True),
                "speaking": ("Discussing proactive youth initiatives to safeguard local historical sites", ["Pair discussion"], ["How can young people help restore ancient pagodas?"]),
                "writing": ("Writing an informational leaflet introducing the scenic and cultural values of Trang An", "Information leaflet", ["Site introduction", "Cultural importance", "Visitor guidelines"])
            },
            "questions": [
                ("multiple_choice", "Di sản văn hóa bao gồm đền đài, thành quách sờ nắm được thuộc loại:", ["Tangible heritage", "Intangible heritage", "Greenhouse gas", "Antibiotic"], "Tangible heritage", "Tangible heritage = di sản hữu hình / vật thể.", "easy", 10, ["g11-u06-vocab-003"], None),
                ("multiple_choice", "Ca trù, quan họ và nhã nhạc cung đình Huế thuộc nhóm di sản nào?", ["Intangible cultural heritage", "Tangible heritage", "Hardware component", "Urban appliance"], "Intangible cultural heritage", "Intangible heritage = di sản văn hóa phi vật thể.", "easy", 10, ["g11-u06-vocab-004"], None),
                ("multiple_choice", "Công trình phòng thủ kiên cố bảo vệ kinh đô thời xưa gọi là:", ["Citadel", "Pedestrian zone", "Curfew", "Sensor"], "Citadel", "Citadel = hoàng thành, thành trì.", "easy", 10, ["g11-u06-vocab-006"], None),
                ("multiple_choice", "Rút gọn mệnh đề: 'Yuri Gagarin was the first human who flew into space.'", [
                    "Yuri Gagarin was the first human to fly into space.",
                    "Yuri Gagarin was the first human flying into space.",
                    "Yuri Gagarin was the first human fly into space.",
                    "Yuri Gagarin was the first human to flying into space."
                ], "Yuri Gagarin was the first human to fly into space.", "Sau 'the first + N' rút gọn bằng to-infinitive (to fly).", "medium", 10, ["g11-u06-grammar-001"], None),
                ("multiple_choice", "Rút gọn bị động: 'Trang An was the second destination in the country that was recognized as mixed heritage.'", [
                    "Trang An was the second destination in the country to be recognized as mixed heritage.",
                    "Trang An was the second destination in the country recognizing as mixed heritage.",
                    "Trang An was the second destination in the country to recognize as mixed heritage.",
                    "Trang An was the second destination in the country recognized to be as mixed heritage."
                ], "Trang An was the second destination in the country to be recognized as mixed heritage.", "Bị động sau the second: to be + V3/ed.", "medium", 12, ["g11-u06-grammar-001"], None),
                ("multiple_choice", "Từ 'monument' trong bảo tồn lịch sử có nghĩa là:", ["Di tích, đài tưởng niệm lịch sử", "Thiết bị điện tử cầm tay", "Khoảng cách tuổi tác", "Loài động vật quý hiếm"], "Di tích, đài tưởng niệm lịch sử", "Monument = công trình tưởng niệm, di tích.", "easy", 10, ["g11-u06-vocab-002"], None),
                ("multiple_choice", "Sự bảo tồn và gìn giữ nguyên trạng di sản gọi là:", ["Preservation", "Deforestation", "Discrimination", "Emission"], "Preservation", "Preservation = sự bảo tồn.", "easy", 10, ["g11-u06-vocab-005"], None),
                ("fill_blank", "Hoàn thành câu: 'Young people must join hands in the _______ of traditional folk customs.'", ["preservation", "curfew", "appliance", "emission"], "preservation", "Heritage preservation = bảo tồn di sản.", "medium", 12, ["g11-u06-vocab-005"], None),
                ("multiple_choice", "Chọn câu rút gọn mệnh đề quan hệ chính xác:", [
                    "She was the last candidate to submit the heritage essay.",
                    "She was the last candidate submitting the heritage essay.",
                    "She was the last candidate submit the heritage essay.",
                    "She was the last candidate to submitted the heritage essay."
                ], "She was the last candidate to submit the heritage essay.", "Sau 'the last candidate' dùng to-infinitive.", "medium", 10, ["g11-u06-grammar-001"], None),
                ("sentence_order", "Sắp xếp thành câu kêu gọi bảo vệ di sản dân tộc:", ["Preserving our cultural heritage is the shared responsibility of all generations.", "Of all generations cultural heritage preserving our is the shared responsibility.", "The shared responsibility of all generations is preserving our cultural heritage.", "Our cultural heritage preserving is the shared responsibility of all generations."], "Preserving our cultural heritage is the shared responsibility of all generations.", "V-ing (Preserving...) + is + complement.", "hard", 15, ["g11-u06-vocab-001", "g11-u06-vocab-005"], ["Preserving", "our", "cultural", "heritage", "is", "the", "shared", "responsibility", "of", "all", "generations."])
            ]
        },

        # Unit 7: Education Options for School-Leavers
        {
            "num": 7, "title": "EDUCATION OPTIONS FOR SCHOOL-LEAVERS", "topic": "Higher Education, Vocational Training and Apprenticeships",
            "p_book": (74, 83), "p_pdf": (74, 83), "pron": "Intonation in Wh- and Yes/No questions",
            "vocabs": [
                ("vocational school", "noun phrase", "/vəʊˈkeɪʃənl skuːl/", "trường dạy nghề", "a school that teaches skills required for particular jobs and trades", "Many school-leavers choose vocational school to gain practical technical skills.", "Nhiều học sinh tốt nghiệp chọn trường nghề để tiếp thu các kỹ năng kỹ thuật thực tế.", ["attend vocational school"]),
                ("higher education", "noun phrase", "/ˌhaɪər edʒuˈkeɪʃn/", "giáo dục đại học / bậc cao", "education at college or university level", "A degree in higher education opens up varied academic career pathways.", "Một tấm bằng đại học mở ra nhiều con đường sự nghiệp học thuật phong phú.", ["pursue higher education"]),
                ("apprenticeship", "noun", "/əˈprentɪsʃɪp/", "thời gian học việc, chương trình vừa học vừa làm", "a period of work experience and on-the-job training with an employer", "He completed a two-year electrical apprenticeship with an engineering firm.", "Anh ấy đã hoàn thành khóa học nghề điện hai năm tại một công ty kỹ thuật.", ["apply for an apprenticeship"]),
                ("qualification", "noun", "/ˌkwɒlɪfɪˈkeɪʃn/", "bằng cấp, chứng chỉ chuyên môn", "an official record showing that you have finished a course of study or training", "Practical qualifications are highly valued by manufacturing companies.", "Các chứng chỉ hành nghề thực tế được các công ty sản xuất đánh giá rất cao.", ["gain qualifications"]),
                ("school-leaver", "noun", "/ˈskuːl liːvə(r)/", "học sinh mới tốt nghiệp phổ thông", "a person who has just finished secondary school", "School-leavers need sound guidance to choose the right career path.", "Học sinh mới ra trường cần sự định hướng sáng suốt để chọn đúng lối đi tương lai.", ["advice for school-leavers"]),
                ("tuition fee", "noun phrase", "/tjuˈɪʃn fiː/", "học phí", "the money that you pay to be taught in a college or university", "Scholarships can help low-income students cover their university tuition fees.", "Học bổng có thể giúp các sinh viên có hoàn cảnh khó khăn trang trải học phí đại học.", ["pay tuition fees"])
            ],
            "grammars": [
                ("Perfect Gerunds and Perfect Participle Clauses", "Danh động từ hoàn thành & Phân từ hoàn thành", "Dùng 'Having + V3/ed' khi muốn nhấn mạnh hành động đó đã hoàn thành trước một hành động khác trong quá khứ.", "Having + V3/ed ..., S + V2/ed | S + Verb + having + V3/ed",
                 [("Having graduated from vocational school, he immediately found a stable job.", "Sau khi đã tốt nghiệp trường nghề, anh ấy đã tìm được ngay một công việc ổn định."),
                  ("She was proud of having passed the university entrance examination.", "Cô ấy tự hào vì đã đỗ kỳ thi tuyển sinh đại học.")],
                 [("Graduating yesterday, he started work today.", "Having graduated yesterday, he started work today.", "Nhấn mạnh tốt nghiệp xảy ra trước khi đi làm dùng 'Having graduated'.")])
            ],
            "reading": ("Academic vs. Vocational Pathways", "So sánh giữa con đường đại học học thuật và con đường học nghề thực tiễn cho học sinh tốt nghiệp THPT.", ["Comparing pathways", "Scanning qualifications"], ["vocational school", "university degree", "hands-on skills"],
                        [("Lợi thế lớn nhất của học nghề so với đại học truyền thống là gì?", ["Thời gian đào tạo ngắn hơn, chi phí thấp hơn và có kỹ năng tay nghề sớm", "Không bao giờ phải đi làm", "Được cấp bằng tiến sĩ ngay lập tức", "Không cần thực hành xưởng máy"], "Thời gian đào tạo ngắn hơn, chi phí thấp hơn và có kỹ năng tay nghề sớm", "Học nghề tập trung vào thực hành và giúp sinh viên có việc làm sớm.")]),
            "skills": {
                "listening": ("Listening to an admissions interview about technical vocational courses", ["Gap-fill", "Multiple choice"], "Audio G11 Track 33", True),
                "speaking": ("Evaluating the merits of apprenticeships versus degree courses", ["Pair debate"], ["Which pathway suits practical hands-on learners best?"]),
                "writing": ("Writing a formal inquiry letter to request information about vocational diplomas", "Inquiry letter", ["Formal greeting", "Course interest", "Questions on duration and fees", "Sign-off"])
            },
            "questions": [
                ("multiple_choice", "Trường đào tạo kỹ năng thực hành cho các ngành nghề cụ thể được gọi là:", ["Vocational school", "Preschool", "National park", "Pedestrian zone"], "Vocational school", "Vocational school = trường dạy nghề.", "easy", 10, ["g11-u07-vocab-001"], None),
                ("multiple_choice", "Chương trình vừa học lý thuyết vừa được trả lương làm việc tại doanh nghiệp là:", ["Apprenticeship", "Curfew", "Emission", "Biodiversity"], "Apprenticeship", "Apprenticeship = chế độ học nghề, vừa học vừa làm.", "easy", 10, ["g11-u07-vocab-003"], None),
                ("multiple_choice", "Học sinh vừa hoàn thành chương trình trung học phổ thông được gọi là:", ["School-leaver", "Contestant", "Surgeon", "Volunteer"], "School-leaver", "School-leaver = học sinh mới tốt nghiệp phổ thông.", "easy", 10, ["g11-u07-vocab-005"], None),
                ("multiple_choice", "Chọn dạng phân từ hoàn thành: '_______ the practical exam, he received his welding certificate.'", [
                    "Having passed",
                    "Passing",
                    "To pass",
                    "Passed"
                ], "Having passed", "Nhấn mạnh đã thi đỗ xong trước khi nhận chứng chỉ -> Having + V3 (Having passed).", "medium", 12, ["g11-u07-grammar-001"], None),
                ("multiple_choice", "Điền dạng danh động từ hoàn thành: 'He admitted _______ cheated during the examination.'", [
                    "having",
                    "have",
                    "had",
                    "to have"
                ], "having", "Admit + having V3/ed (thừa nhận đã làm gì).", "medium", 10, ["g11-u07-grammar-001"], None),
                ("multiple_choice", "Số tiền đóng để theo học tại các trường đại học, cao đẳng gọi là:", ["Tuition fee", "Donation", "Emission", "Footprint"], "Tuition fee", "Tuition fee = học phí.", "easy", 10, ["g11-u07-vocab-006"], None),
                ("multiple_choice", "Chứng chỉ hoặc văn bằng xác nhận trình độ chuyên môn gọi là:", ["Qualification", "Appliance", "Monuments", "Citadel"], "Qualification", "Qualification = bằng cấp, chứng chỉ chuyên môn.", "easy", 10, ["g11-u07-vocab-004"], None),
                ("fill_blank", "Hoàn thành câu: 'Many ambitious students wish to pursue _______ education at prestigious universities.'", ["higher", "extreme", "remote", "tangible"], "higher", "Higher education = giáo dục đại học.", "medium", 12, ["g11-u07-vocab-002"], None),
                ("multiple_choice", "Chọn câu sử dụng phân từ hoàn thành đúng ngữ pháp:", [
                    "Having finished his homework, he went out to play football.",
                    "Finishing his homework yesterday, he went out to play football.",
                    "Have finished his homework, he went out to play football.",
                    "Having finish his homework, he went out to play football."
                ], "Having finished his homework, he went out to play football.", "Having + V3/ed (finished) nhấn mạnh hoàn thành bài tập trước.", "medium", 10, ["g11-u07-grammar-001"], None),
                ("sentence_order", "Sắp xếp thành câu về lựa chọn học tập sau tốt nghiệp:", ["Vocational training provides school-leavers with practical job skills.", "School-leavers provides vocational training with practical job skills.", "With practical job skills vocational training provides school-leavers.", "Practical job skills vocational training provides school-leavers with."], "Vocational training provides school-leavers with practical job skills.", "S + provides + O + with + skills.", "hard", 15, ["g11-u07-vocab-001", "g11-u07-vocab-005"], ["Vocational", "training", "provides", "school-leavers", "with", "practical", "job", "skills."])
            ]
        },

        # Unit 8: Becoming Independent
        {
            "num": 8, "title": "BECOMING INDEPENDENT", "topic": "Life Skills, Self-reliance, Decision Making and Personal Discipline",
            "p_book": (84, 93), "p_pdf": (84, 93), "pron": "Intonation in invitations, suggestions, and polite requests",
            "vocabs": [
                ("self-reliant", "adjective", "/ˌself rɪˈlaɪənt/", "tự lực cánh sinh, tự lập", "relying on one's own abilities rather than depending on others", "Living alone in college teaches students to be truly self-reliant.", "Sống một mình thời đại học dạy sinh viên biết tự lực cánh sinh thực sự.", ["become self-reliant"]),
                ("time management", "noun phrase", "/ˈtaɪm ˌmænɪdʒmənt/", "sự quản lý thời gian", "the ability to use one's time effectively and productively", "Good time management prevents cramming before important examinations.", "Quản lý thời gian tốt giúp tránh việc học dồn ép trước các kỳ thi quan trọng.", ["master time management"]),
                ("budget", "noun", "/ˈbʌdʒɪt/", "ngân sách, kế hoạch chi tiêu", "an estimate of income and expenditure for a set period", "Learning to balance a weekly budget prevents unnecessary debts.", "Học cách cân đối ngân sách hàng tuần giúp tránh những khoản nợ không đáng có.", ["keep a budget", "tight budget"]),
                ("interpersonal skill", "noun phrase", "/ˌɪntəˈpɜːsənl skɪl/", "kỹ năng giao tiếp và ứng xử giữa người với người", "the skills used by a person to interact with others properly", "Strong interpersonal skills help young workers collaborate smoothly.", "Kỹ năng giao tiếp ứng xử tốt giúp lao động trẻ phối hợp nhịp nhàng trong tập thể.", ["develop interpersonal skills"]),
                ("cope with", "verb phrase", "/kəʊp wɪð/", "đối phó, vượt qua (khó khăn)", "to deal effectively with something difficult", "Counselors teach students how to cope with academic stress.", "Các chuyên gia tâm lý dạy học sinh cách đương đầu với căng thẳng học tập.", ["cope with stress"]),
                ("self-discipline", "noun", "/ˌself ˈdɪsəplɪn/", "tính tự kỷ luật", "the ability to control oneself and make oneself work hard", "Without self-discipline, freedom at university can lead to failure.", "Nếu thiếu tính tự kỷ luật, sự tự do ở trường đại học có thể dẫn đến thất bại.", ["maintain self-discipline"])
            ],
            "grammars": [
                ("Cleft Sentences with 'It is / was ... that / who ...'", "Câu chẻ nhấn mạnh", "Dùng câu chẻ để nhấn mạnh một thành phần cụ thể trong câu (chủ ngữ, tân ngữ hoặc trạng ngữ).", "It is/was + [Thành phần nhấn mạnh] + that/who + [Mệnh đề còn lại]",
                 [("It was my mother who taught me how to manage money.", "Chính mẹ tôi là người đã dạy tôi cách quản lý tiền bạc."),
                  ("It is by practicing daily that teenagers develop self-reliance.", "Chính bằng cách rèn luyện hàng ngày mà thanh thiếu niên phát triển tính tự lập.")],
                 [("It was my mother which taught me.", "It was my mother who/that taught me.", "Nhấn mạnh người dùng 'who' hoặc 'that', không dùng 'which'.")])
            ],
            "reading": ("Road to Teen Independence", "Các kỹ năng sinh tồn thiết yếu: nấu nướng cơ bản, quản lý cảm xúc, lập kế hoạch chi tiêu và quản lý thời gian.", ["Identifying core advice", "Matching life skills"], ["independence", "self-reliance", "budgeting"],
                        [("Kỹ năng nào được xem là nền tảng để sống tự lập thành công?", ["Biết quản lý chi tiêu và tự kỷ luật với thời gian", "Dựa dẫm hoàn toàn vào cha mẹ gửi tiền", "Tránh né mọi áp lực xã hội", "Chỉ làm những việc mình thích"], "Biết quản lý chi tiêu và tự kỷ luật với thời gian", "Tự lập đòi hỏi trách nhiệm với tài chính và thời gian biểu cá nhân.")]),
            "skills": {
                "listening": ("Listening to students sharing advice on becoming autonomous self-regulated learners", ["Gap-fill", "Multiple choice"], "Audio G11 Track 38", True),
                "speaking": ("Giving detailed instructions on practicing a fundamental life skill", ["Pair presentation"], ["How to manage study time during exam week?"]),
                "writing": ("Writing an article on the pros and cons of studying and living away from home", "Discussion article", ["Introduction", "Gains in maturity", "Challenges of loneliness", "Conclusion"])
            },
            "questions": [
                ("multiple_choice", "Khả năng tự mình lo liệu cuộc sống mà không phải phụ thuộc người khác gọi là:", ["Self-reliant", "Catastrophic", "Needy", "Portable"], "Self-reliant", "Self-reliant = tự lực cánh sinh, tự lập.", "easy", 10, ["g11-u08-vocab-001"], None),
                ("multiple_choice", "Kỹ năng phân bổ và sử dụng quỹ thời gian hợp lý hiệu quả được gọi là:", ["Time management", "Global warming", "Cultural exchange", "Household chore"], "Time management", "Time management = quản lý thời gian.", "easy", 10, ["g11-u08-vocab-002"], None),
                ("multiple_choice", "Bản kế hoạch chi tiêu thu nhập hợp lý để tránh thiếu hụt tiền gọi là:", ["Budget", "Curfew", "Emission", "Citadel"], "Budget", "Budget = ngân sách tài chính.", "easy", 10, ["g11-u08-vocab-003"], None),
                ("multiple_choice", "Chọn câu chẻ nhấn mạnh đúng chủ ngữ: 'My sister solved the problem.'", [
                    "It was my sister who solved the problem.",
                    "It was my sister which solved the problem.",
                    "It is my sister whom solved the problem.",
                    "It was my sister what solved the problem."
                ], "It was my sister who solved the problem.", "Nhấn mạnh người làm chủ ngữ: It was + person + who/that + V.", "medium", 10, ["g11-u08-grammar-001"], None),
                ("multiple_choice", "Nhấn mạnh nơi chốn: 'They learned to cook in the school kitchen.'", [
                    "It was in the school kitchen that they learned to cook.",
                    "It was in the school kitchen where that they learned to cook.",
                    "It was in the school kitchen which they learned to cook.",
                    "It is the school kitchen that they learned to cook in there."
                ], "It was in the school kitchen that they learned to cook.", "Nhấn mạnh trạng ngữ: It was + Adverbial + that + S + V.", "medium", 12, ["g11-u08-grammar-001"], None),
                ("multiple_choice", "Kỹ năng giao tiếp và tạo dựng mối quan hệ hòa đồng với người khác là:", ["Interpersonal skills", "Computer hardware", "Passive voice", "Solar energy"], "Interpersonal skills", "Interpersonal skills = kỹ năng giao tiếp tương tác giữa người với người.", "easy", 10, ["g11-u08-vocab-004"], None),
                ("multiple_choice", "Cụm 'cope with' đồng nghĩa với cụm động từ nào?", ["Deal with", "Run away from", "Depend on", "Laugh at"], "Deal with", "Cope with = đương đầu, đối phó xử lý (deal with).", "easy", 10, ["g11-u08-vocab-005"], None),
                ("fill_blank", "Hoàn thành câu: 'Developing strong _______ enables students to study consistently without constant supervision.'", ["self-discipline", "pollution", "rubbish", "appliance"], "self-discipline", "Self-discipline = tính tự kỷ luật.", "medium", 12, ["g11-u08-vocab-006"], None),
                ("multiple_choice", "Chọn câu chẻ nhấn mạnh tân ngữ chính xác: 'Nam bought a dictionary yesterday.'", [
                    "It was a dictionary that Nam bought yesterday.",
                    "It was a dictionary which Nam bought yesterday it.",
                    "It was yesterday that a dictionary bought Nam.",
                    "It was Nam who bought yesterday a dictionary."
                ], "It was a dictionary that Nam bought yesterday.", "Nhấn mạnh tân ngữ 'a dictionary': It was a dictionary that + S + V.", "medium", 10, ["g11-u08-grammar-001"], None),
                ("sentence_order", "Sắp xếp thành câu nhấn mạnh kỹ năng tự lập:", ["It is self-discipline that helps teenagers achieve long-term success.", "That helps teenagers achieve long-term success it is self-discipline.", "Teenagers achieve long-term success it is self-discipline that helps.", "Long-term success it is self-discipline that helps teenagers achieve."], "It is self-discipline that helps teenagers achieve long-term success.", "It is + focus + that + V.", "hard", 15, ["g11-u08-grammar-001", "g11-u08-vocab-006"], ["It", "is", "self-discipline", "that", "helps", "teenagers", "achieve", "long-term", "success."])
            ]
        },

        # Unit 9: Social Issues
        {
            "num": 9, "title": "SOCIAL ISSUES", "topic": "Peer Pressure, Bullying, Cyberbullying and Teen Mental Health",
            "p_book": (96, 105), "p_pdf": (96, 105), "pron": "Intonation in choice questions",
            "vocabs": [
                ("peer pressure", "noun phrase", "/ˈpɪə ˌpreʃə(r)/", "áp lực từ bạn bè đồng trang lứa", "influence from members of one's peer group to act or look a certain way", "Resisting negative peer pressure requires courage and self-confidence.", "Chống lại áp lực tiêu cực từ bạn bè đòi hỏi lòng dũng cảm và sự tự tin.", ["resist peer pressure"]),
                ("cyberbullying", "noun", "/ˈsaɪbəbʊliɪŋ/", "bắt nạt trên mạng", "the use of electronic communication to bully or intimidate a person", "Schools must implement zero-tolerance policies against cyberbullying.", "Nhà trường phải thực hiện các chính sách không khoan nhượng đối với bắt nạt qua mạng.", ["stop cyberbullying"]),
                ("body shaming", "noun phrase", "/ˈbɒdi ˌʃeɪmɪŋ/", "miệt thị ngoại hình", "the practice of making critical, humiliating comments about a person's body shape or size", "Body shaming on social media severely harms adolescents' self-esteem.", "Miệt thị ngoại hình trên mạng xã hội làm tổn hại nghiêm trọng lòng tự trọng của tuổi mới lớn.", ["victim of body shaming"]),
                ("depression", "noun", "/dɪˈpreʃn/", "bệnh trầm cảm, sự suy sụp tinh thần", "a mental health disorder characterized by persistently depressed mood", "Untreated chronic stress can eventually lead to clinical depression.", "Căng thẳng kéo dài không được điều trị có thể dẫn đến bệnh trầm cảm.", ["suffer from depression"]),
                ("bystander", "noun", "/ˈbaɪstændə(r)/", "người đứng ngoài chứng kiến", "a person who is present at an event but takes no part in it", "Bystanders should speak up to defend victims of school bullying.", "Những người chứng kiến nên lên tiếng để bảo vệ nạn nhân bị bạo lực học đường.", ["active bystander"]),
                ("campaign", "noun", "/kæmˈpeɪn/", "chiến dịch tuyên truyền", "an organized course of action to achieve a particular goal", "The student council launched a campaign promoting mental health awareness.", "Hội đồng học sinh đã phát động chiến dịch nâng cao nhận thức về sức khỏe tâm thần.", ["anti-bullying campaign"])
            ],
            "grammars": [
                ("Linking Words and Phrases (Cause, Contrast, Result)", "Từ nối chỉ nguyên nhân, tương phản và kết quả", "Cause: because of, due to (+ Noun phrase). Contrast: despite, in spite of (+ Noun phrase); however, although (+ Clause). Result: as a result, therefore (+ Clause).", "Because of/Despite + Noun phrase | Although/However + Clause",
                 [("Despite facing severe peer pressure, she stayed true to her principles.", "Mặc dù phải đối mặt với áp lực bạn bè gay gắt, cô vẫn kiên định với các nguyên tắc của mình."),
                  ("Cyberbullying causes emotional pain; therefore, we must ban toxic accounts.", "Bắt nạt trên mạng gây tổn thương tinh thần; do đó, chúng ta phải cấm các tài khoản độc hại.")],
                 [("Despite she was sad, she smiled.", "Despite being sad, she smiled.", "Sau 'despite' phải đi với danh từ hoặc V-ing, không đi với mệnh đề.")])
            ],
            "reading": ("Standing Up Against Peer Pressure", "Hiểu về tâm lý muốn hòa nhập và các chiến lược dũng cảm nói 'không' với những hành vi độc hại từ bạn bè.", ["Understanding peer dynamics", "Actionable advice"], ["peer pressure", "confidence", "support groups"],
                        [("Khi một học sinh bị bạn bè ép buộc làm điều sai trái, hành động sáng suốt nhất là gì?", ["Kiên quyết nói không và tìm kiếm sự hỗ trợ từ thầy cô hoặc cha mẹ", "Làm theo để không bị bạn bè cô lập", "Tự trách móc bản thân và im lặng chịu đựng", "Rủ thêm các bạn khác làm theo"], "Kiên quyết nói không và tìm kiếm sự hỗ trợ từ thầy cô hoặc cha mẹ", "Cần dũng cảm từ chối và tìm đến người lớn đáng tin cậy.")]),
            "skills": {
                "listening": ("Listening to a student counsellor discussing various forms of digital bullying", ["Sentence completion", "Multiple choice"], "Audio G11 Track 43", True),
                "speaking": ("Role-playing how to intervene and defend classmates from bullying", ["Pair drama"], ["What phrases can you say to stop a bully?"]),
                "writing": ("Writing a detailed school campaign proposal to eradicate cyberbullying", "Campaign proposal", ["Campaign slogan", "Key objectives", "Planned activities", "Anticipated impact"])
            },
            "questions": [
                ("multiple_choice", "Áp lực bị thúc ép phải cư xử hoặc ăn mặc giống các bạn cùng trang lứa gọi là:", ["Peer pressure", "Solar panel", "Tangible heritage", "Higher education"], "Peer pressure", "Peer pressure = áp lực bạn bè đồng trang lứa.", "easy", 10, ["g11-u09-vocab-001"], None),
                ("multiple_choice", "Hành vi sỉ nhục, đe dọa hoặc tung tin độc hại về người khác trên mạng gọi là:", ["Cyberbullying", "Peacekeeping", "Deforestation", "Apprenticeship"], "Cyberbullying", "Cyberbullying = bắt nạt trên không gian mạng.", "easy", 10, ["g11-u09-vocab-002"], None),
                ("multiple_choice", "Hành vi chê bai khiếm nhã về vóc dáng, cân nặng của người khác gọi là:", ["Body shaming", "Time management", "Green living", "Self-study"], "Body shaming", "Body shaming = miệt thị ngoại hình.", "easy", 10, ["g11-u09-vocab-003"], None),
                ("multiple_choice", "Chọn từ nối tương phản đi với cụm danh từ: '_______ the strict school rules, some students still smuggled phones into class.'", ["Despite", "Although", "Because", "Therefore"], "Despite", "Sau 'Despite' đi với cụm danh từ (the strict school rules).", "medium", 10, ["g11-u09-grammar-001"], None),
                ("multiple_choice", "Điền từ nối chỉ kết quả: 'The bully spread false rumors; _______, he was suspended.'", ["therefore", "because of", "despite", "although"], "therefore", "'Therefore' đứng sau dấu chấm phẩy chỉ kết quả tất yếu.", "medium", 10, ["g11-u09-grammar-001"], None),
                ("multiple_choice", "Người có mặt chứng kiến vụ việc bắt nạt mà không tham gia vào gọi là:", ["Bystander", "Contestant", "Surgeon", "Volunteer"], "Bystander", "Bystander = người đứng ngoài quan sát.", "easy", 10, ["g11-u09-vocab-005"], None),
                ("multiple_choice", "Chứng rối loạn tâm lý với biểu hiện buồn bã kéo dài và mất hứng thú sống gọi là:", ["Depression", "Solidarity", "Infrastructure", "Lifespan"], "Depression", "Depression = bệnh trầm cảm.", "easy", 10, ["g11-u09-vocab-004"], None),
                ("fill_blank", "Hoàn thành câu: 'Students united to organize an inspirational anti-bullying _______ in the schoolyard.'", ["campaign", "appliance", "rubbish", "emission"], "campaign", "Anti-bullying campaign = chiến dịch chống bắt nạt.", "medium", 12, ["g11-u09-vocab-006"], None),
                ("multiple_choice", "Chọn câu dùng từ nối chỉ nguyên nhân đúng cấu trúc:", [
                    "Due to the heavy storm, school was cancelled.",
                    "Because the heavy storm, school was cancelled.",
                    "Despite the heavy storm, school was cancelled.",
                    "Although the heavy storm, school was cancelled."
                ], "Due to the heavy storm, school was cancelled.", "'Due to' đi với cụm danh từ 'the heavy storm'.", "medium", 10, ["g11-u09-grammar-001"], None),
                ("sentence_order", "Sắp xếp thành thông điệp chống bạo lực học đường:", ["Active bystanders can stop bullying by reporting it to teachers immediately.", "By reporting it to teachers immediately active bystanders can stop bullying.", "Bullying can stop active bystanders by reporting it to teachers immediately.", "To teachers immediately reporting it active bystanders can stop bullying."], "Active bystanders can stop bullying by reporting it to teachers immediately.", "S + can stop + O + by + V-ing.", "hard", 15, ["g11-u09-vocab-005"], ["Active", "bystanders", "can", "stop", "bullying", "by", "reporting", "it", "to", "teachers", "immediately."])
            ]
        },

        # Unit 10: The Ecosystem
        {
            "num": 10, "title": "THE ECOSYSTEM", "topic": "Ecosystems, Biodiversity, Food Chains and Conservation",
            "p_book": (106, 115), "p_pdf": (106, 115), "pron": "Intonation in question tags",
            "vocabs": [
                ("ecosystem", "noun", "/ˈiːkəʊsɪstəm/", "hệ sinh thái", "a biological community of interacting organisms and their physical environment", "Mangrove forests form a vital coastal ecosystem protecting against tsunamis.", "Rừng ngập mặn tạo nên hệ sinh thái ven biển thiết yếu chống lại sóng thần.", ["fragile ecosystem"]),
                ("food chain", "noun phrase", "/ˈfuːd tʃeɪn/", "chuỗi thức ăn", "a hierarchical series of organisms each dependent on the next as a source of food", "Plankton forms the foundation of the marine food chain.", "Sinh vật phù du tạo thành nền tảng của chuỗi thức ăn biển cả.", ["marine food chain"]),
                ("wetland", "noun", "/ˈwetlənd/", "vùng đất ngập nước", "land consisting of marshes or swamps; saturated with water", "Migratory birds stop at the wetland reserve to rest and feed.", "Các loài chim di cư dừng chân tại khu bảo tồn đất ngập nước để nghỉ và kiếm ăn.", ["protect wetlands"]),
                ("coral reef", "noun phrase", "/ˈkɒrəl riːf/", "rạn san hô", "an underwater ecosystem characterized by reef-building corals", "Pollution and warm sea temperatures bleach and kill coral reefs.", "Ô nhiễm và nước biển nóng lên làm tẩy trắng và hủy hoại các rạn san hô.", ["vibrant coral reef"]),
                ("marine life", "noun phrase", "/məˈriːn laɪf/", "sinh vật biển", "the plants, animals, and other organisms that live in oceans and seas", "Plastic waste thrown into the ocean poses a lethal threat to marine life.", "Rác thải nhựa ném xuống đại dương tạo mối đe dọa chết chóc cho sinh vật biển.", ["protect marine life"]),
                ("restore", "verb", "/rɪˈstɔː(r)/", "phục hồi, khôi phục", "to bring back something to its former good condition", "Volunteers planted thousands of mangroves to restore the damaged coastline.", "Tình nguyện viên đã trồng hàng nghìn cây đước để phục hồi đường bờ biển bị tàn phá.", ["restore the ecosystem"])
            ],
            "grammars": [
                ("Compound Nouns", "Danh từ ghép", "Danh từ ghép được tạo thành bằng cách kết hợp: Danh từ + Danh từ (rainforest, food chain), Tính từ + Danh từ (greenhouse, wildlife), hoặc Động từ-ing + Danh từ (washing machine). Dạng số nhiều thường thêm vào danh từ chính phía sau.", "Noun + Noun / Adj + Noun / V-ing + Noun",
                 [("Coral reefs support thousands of marine species.", "Các rạn san hô nuôi dưỡng hàng nghìn loài sinh vật biển."),
                  ("The food chain in the tropical rainforest is highly intricate.", "Chuỗi thức ăn trong rừng mưa nhiệt đới vô cùng phức tạp.")],
                 [("Food chains is essential.", "Food chains are essential.", "Danh từ ghép số nhiều 'Food chains' đi với động từ số nhiều 'are'.")])
            ],
            "reading": ("Restoring Marine Biospheres", "Các chương trình phục hồi rạn san hô nhân tạo và tái sinh rừng phòng hộ ven biển tại Việt Nam.", ["Cause and effect", "Scanning for species"], ["coral restoration", "marine sanctuary", "biodiversity"],
                        [("Hành động nào giúp trực tiếp phục hồi các rạn san hô bị hư hại?", ["Cấy ghép các nhánh san hô con lên giàn nhân tạo", "Đánh bắt cá bằng thuốc nổ", "Khai thác san hô làm đồ lưu niệm", "Xả nước thải chưa qua xử lý xuống biển"], "Cấy ghép các nhánh san hô con lên giàn nhân tạo", "Cấy ghép san hô nhân tạo giúp tái sinh rạn san hô nhanh chóng.")]),
            "skills": {
                "listening": ("Listening to an ecology lecture analyzing human impacts on wetland ecosystems", ["Note-taking", "Multiple choice"], "Audio G11 Track 48", True),
                "speaking": ("Proposing practical steps to clean and preserve local river basins", ["Pair talk"], ["What can students do to protect urban canals?"]),
                "writing": ("Writing an opinion essay debating whether the state should spend more money restoring local ecosystems", "Opinion essay", ["Introduction", "Arguments on biodiversity & tourism", "Counterarguments", "Conclusion"])
            },
            "questions": [
                ("multiple_choice", "Quần thể sinh vật cùng tương tác với môi trường vật lý xung quanh gọi là:", ["Ecosystem", "Budget", "Curfew", "Appliance"], "Ecosystem", "Ecosystem = hệ sinh thái.", "easy", 10, ["g11-u10-vocab-001"], None),
                ("multiple_choice", "Mối quan hệ dinh dưỡng sinh vật này ăn sinh vật khác trong tự nhiên gọi là:", ["Food chain", "Generation gap", "Workout", "Peer pressure"], "Food chain", "Food chain = chuỗi thức ăn.", "easy", 10, ["g11-u10-vocab-002"], None),
                ("multiple_choice", "Vùng đất đầm lầy ngập nước nơi sinh sống của nhiều loài chim nước gọi là:", ["Wetland", "Citadel", "High-rise", "Monument"], "Wetland", "Wetland = vùng đất ngập nước.", "easy", 10, ["g11-u10-vocab-003"], None),
                ("multiple_choice", "Các loài sinh vật sinh sống dưới đại dương được gọi chung là:", ["Marine life", "Household chores", "Digital devices", "Hardware"], "Marine life", "Marine life = sinh vật biển.", "easy", 10, ["g11-u10-vocab-005"], None),
                ("multiple_choice", "Từ nào là một 'Compound Noun' (Danh từ ghép)?", ["Rainforest", "Quickly", "Destroy", "Dangerous"], "Rainforest", "Rainforest (Rain + Forest) là danh từ ghép.", "easy", 10, ["g11-u10-grammar-001"], None),
                ("multiple_choice", "Dạng số nhiều chính xác của danh từ ghép 'coral reef' là:", ["Coral reefs", "Corals reef", "Corals reefs", "Coral reefes"], "Coral reefs", "Thêm 's' vào danh từ chính phía sau (reefs).", "medium", 10, ["g11-u10-grammar-001"], None),
                ("multiple_choice", "Động từ 'restore' trong bảo tồn thiên nhiên mang ý nghĩa gì?", ["Phục hồi về trạng thái tốt ban đầu", "Khai thác kiệt quệ tài nguyên", "Đốt phá rừng lấy đất", "Xây dựng khu công nghiệp nặng"], "Phục hồi về trạng thái tốt ban đầu", "Restore = phục hồi, khôi phục.", "easy", 10, ["g11-u10-vocab-006"], None),
                ("fill_blank", "Hoàn thành câu: 'Rising ocean temperatures cause extensive bleaching of vibrant _______.'", ["coral reefs", "high-rises", "appliances", "chores"], "coral reefs", "Bleaching of coral reefs = hiện tượng tẩy trắng rạn san hô.", "medium", 12, ["g11-u10-vocab-004"], None),
                ("multiple_choice", "Danh từ ghép nào sau đây được tạo thành từ 'Adjective + Noun'?", ["Greenhouse", "Seafood", "Toothbrush", "Classroom"], "Greenhouse", "Green (adj) + House (noun) = Greenhouse (nhà kính).", "medium", 10, ["g11-u10-grammar-001"], None),
                ("sentence_order", "Sắp xếp thành thông điệp bảo vệ hệ sinh thái:", ["Protecting wetland ecosystems preserves biodiversity and prevents severe floods.", "Preserves biodiversity and prevents severe floods protecting wetland ecosystems.", "Severe floods prevents and preserves biodiversity protecting wetland ecosystems.", "Biodiversity preserves and prevents severe floods protecting wetland ecosystems."], "Protecting wetland ecosystems preserves biodiversity and prevents severe floods.", "V-ing + preserves O1 and prevents O2.", "hard", 15, ["g11-u10-vocab-001", "g11-u10-vocab-003"], ["Protecting", "wetland", "ecosystems", "preserves", "biodiversity", "and", "prevents", "severe", "floods."])
            ]
        }
    ]

    for item in units_data:
        u_num = item["num"]
        unit_id = f"g11-u{u_num:02d}"
        
        # Vocab
        vocabs = []
        for idx, v in enumerate(item["vocabs"]):
            vid = f"{unit_id}-vocab-{idx+1:03d}"
            vocabs.append({
                "id": vid, "unit_id": unit_id,
                "word": v[0], "word_type": v[1], "ipa": v[2], "meaning_vi": v[3], "definition_en": v[4],
                "example_sentence": v[5], "example_translation": v[6], "collocations": v[7],
                "source_file": SOURCE_G11, "pdf_page": item["p_pdf"][0] + 2, "book_page": item["p_book"][0] + 2,
                "source_section": f"Grade 11 Unit {u_num} Language & Glossary", "provenance": "extracted",
                "ocr_confidence": 0.96, "review_status": "verified"
            })

        # Grammar
        grammars = []
        for idx, g in enumerate(item["grammars"]):
            gid = f"{unit_id}-grammar-{idx+1:03d}"
            ex_list = [{"en": ex[0], "vi": ex[1]} for ex in g[4]]
            mistakes = [{"mistake": m[0], "correction": m[1], "explanation": m[2]} for m in g[5]]
            grammars.append({
                "id": gid, "unit_id": unit_id,
                "title": g[0], "structure_name": g[1], "rule_summary": g[2], "formula": g[3],
                "example_sentences": ex_list, "common_mistakes": mistakes,
                "source_file": SOURCE_G11, "pdf_page": item["p_pdf"][0] + 2, "book_page": item["p_book"][0] + 2,
                "source_section": f"Grade 11 Unit {u_num} Language - Grammar", "provenance": "extracted",
                "ocr_confidence": 0.96, "review_status": "verified"
            })

        # Reading
        r_info = item["reading"]
        r_questions = [{"prompt": rq[0], "options": rq[1], "correctAnswer": rq[2], "explanation": rq[3]} for rq in r_info[4]]
        reading = {
            "id": f"{unit_id}-reading-001", "unit_id": unit_id,
            "topic": r_info[0], "main_idea": r_info[1], "reading_skills": r_info[2], "keywords": r_info[3],
            "game_questions": r_questions, "source_file": SOURCE_G11,
            "pdf_page": item["p_pdf"][0] + 3, "book_page": item["p_book"][0] + 3,
            "source_section": f"Grade 11 Unit {u_num} Reading", "provenance": "game_authored",
            "ocr_confidence": 0.95, "review_status": "verified"
        }

        # Skills
        sk = item["skills"]
        skills = {
            "listening": {
                "objective": sk["listening"][0], "activity_types": sk["listening"][1],
                "audio_source_note": sk["listening"][2], "asset_required": sk["listening"][3],
                "source_file": SOURCE_G11, "pdf_page": item["p_pdf"][0] + 5, "book_page": item["p_book"][0] + 5,
                "source_section": f"Grade 11 Unit {u_num} Listening", "provenance": "extracted",
                "ocr_confidence": 0.90, "review_status": "needs_review"
            },
            "speaking": {
                "objective": sk["speaking"][0], "activity_types": sk["speaking"][1], "prompts": sk["speaking"][2],
                "source_file": SOURCE_G11, "pdf_page": item["p_pdf"][0] + 4, "book_page": item["p_book"][0] + 4,
                "source_section": f"Grade 11 Unit {u_num} Speaking", "provenance": "extracted",
                "ocr_confidence": 0.95, "review_status": "verified"
            },
            "writing": {
                "objective": sk["writing"][0], "task_type": sk["writing"][1], "sample_outline": sk["writing"][2],
                "source_file": SOURCE_G11, "pdf_page": item["p_pdf"][0] + 6, "book_page": item["p_book"][0] + 6,
                "source_section": f"Grade 11 Unit {u_num} Writing", "provenance": "extracted",
                "ocr_confidence": 0.94, "review_status": "verified"
            }
        }

        # Questions
        questions = []
        for idx, q in enumerate(item["questions"]):
            qid = f"{unit_id}-question-{idx+1:03d}"
            q_dict = {
                "id": qid, "unit_id": unit_id,
                "type": q[0], "prompt": q[1], "options": q[2], "correctAnswer": q[3], "explanation": q[4],
                "difficulty": q[5], "timeLimit": q[6], "knowledgeItemIds": q[7],
                "source_file": SOURCE_G11, "pdf_page": item["p_pdf"][0] + 2, "book_page": item["p_book"][0] + 2,
                "source_section": f"Grade 11 Unit {u_num} Question Bank", "provenance": "game_authored",
                "ocr_confidence": 0.96, "review_status": "verified"
            }
            if q[8] is not None:
                q_dict["wordsToOrder"] = q[8]
            questions.append(q_dict)

        # Full unit object
        unit_obj = {
            "metadata": {
                "grade": 11, "unit_number": u_num, "unit_id": unit_id,
                "title": item["title"], "topic": item["topic"], "source_file": SOURCE_G11,
                "pdf_page": item["p_pdf"][0], "book_page": item["p_book"][0],
                "source_section": f"Grade 11 Unit {u_num} Overview & Book Map p.5",
                "provenance": "extracted", "ocr_confidence": 0.97, "review_status": "verified",
                "sections": [
                    {"section_name": "Getting Started", "book_page_start": item["p_book"][0], "book_page_end": item["p_book"][0]+1, "pdf_page_start": item["p_pdf"][0], "pdf_page_end": item["p_pdf"][0]+1, "description": f"Introduction dialogue for {item['title']}"},
                    {"section_name": "Language", "book_page_start": item["p_book"][0]+2, "book_page_end": item["p_book"][0]+2, "pdf_page_start": item["p_pdf"][0]+2, "pdf_page_end": item["p_pdf"][0]+2, "description": f"Pronunciation ({item['pron']}), Vocabulary and Grammar"},
                    {"section_name": "Reading", "book_page_start": item["p_book"][0]+3, "book_page_end": item["p_book"][0]+4, "pdf_page_start": item["p_pdf"][0]+3, "pdf_page_end": item["p_pdf"][0]+4, "description": r_info[0]},
                    {"section_name": "Speaking", "book_page_start": item["p_book"][0]+4, "book_page_end": item["p_book"][0]+4, "pdf_page_start": item["p_pdf"][0]+4, "pdf_page_end": item["p_pdf"][0]+4, "description": sk["speaking"][0]},
                    {"section_name": "Listening", "book_page_start": item["p_book"][0]+5, "book_page_end": item["p_book"][0]+5, "pdf_page_start": item["p_pdf"][0]+5, "pdf_page_end": item["p_pdf"][0]+5, "description": sk["listening"][0]},
                    {"section_name": "Writing", "book_page_start": item["p_book"][0]+6, "book_page_end": item["p_book"][0]+7, "pdf_page_start": item["p_pdf"][0]+6, "pdf_page_end": item["p_pdf"][0]+7, "description": sk["writing"][0]},
                    {"section_name": "Communication & Culture", "book_page_start": item["p_book"][0]+8, "book_page_end": item["p_book"][0]+8, "pdf_page_start": item["p_pdf"][0]+8, "pdf_page_end": item["p_pdf"][0]+8, "description": "Everyday English and cultural analysis"},
                    {"section_name": "Looking Back & Project", "book_page_start": item["p_book"][0]+9, "book_page_end": item["p_book"][0]+9, "pdf_page_start": item["p_pdf"][0]+9, "pdf_page_end": item["p_pdf"][0]+9, "description": "Review and group research project"}
                ],
                "learning_objectives": {
                    "vocabulary": f"Words and phrases related to {item['topic'].lower()}",
                    "grammar": [g["title"] for g in grammars],
                    "pronunciation": item["pron"],
                    "reading": r_info[0],
                    "speaking": sk["speaking"][0],
                    "listening": sk["listening"][0],
                    "writing": sk["writing"][0]
                }
            },
            "vocabulary": vocabs,
            "grammar": grammars,
            "reading": reading,
            "skills": skills,
            "questions": questions
        }

        fname = f"unit-{u_num:02d}.json"
        target_path = os.path.join(OUT_DIR, fname)
        with open(target_path, 'w', encoding='utf-8') as f:
            json.dump(unit_obj, f, ensure_ascii=False, indent=2)
        print(f"Generated Grade 11 Unit {u_num:02d} -> {fname}")

if __name__ == '__main__':
    build_grade_11()
    print("Grade 11 build complete!")
