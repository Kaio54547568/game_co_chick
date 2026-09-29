import { UnitPronunciationData } from '../types/pronunciation';

/**
 * OFFICIAL GLOBAL SUCCESS PRONUNCIATION DATASET (GRADES 10, 11, 12)
 * Source: Official SGK Tiếng Anh 10, 11, 12 - NXB Giáo dục Việt Nam & Pearson
 * Each unit contains authentic phonetic rules, IPA symbols, practice words,
 * contrastive minimal pairs, contextual sentences, and listening challenges.
 */
export const ALL_PRONUNCIATION_DATA: Record<string, UnitPronunciationData> = {
  // ==========================================================================
  // GRADE 10
  // ==========================================================================
  'g10-u01': {
    unitId: 'g10-u01',
    grade: 10,
    unitNumber: 1,
    unitTitle: 'FAMILY LIFE',
    focusTopic: 'Phụ âm ghép: /br/, /kr/, /tr/',
    focusTopicEn: 'Consonant blends: /br/, /kr/, and /tr/',
    targetSounds: ['/br/', '/kr/', '/tr/'],
    wuxiaSecretName: 'Tam Âm Hợp Nhất Kiếm Quyết',
    ruleSummary: 'Phụ âm ghép /br/, /kr/, /tr/ gồm hai phụ âm đứng liền nhau. Khi phát âm, hai âm phải nối liền mạch không ngắt quãng và tuyệt đối không chèn nguyên âm ngắn /ə/ vào giữa (ví dụ không đọc là /bə-r/).',
    mouthGuide: 'Khép môi tạo âm /b/ hoặc nâng cuống lưỡi tạo /k/ hoặc đầu lưỡi chạm nướu tạo /t/, sau đó lập tức uốn cong đầu lưỡi về sau tạo âm /r/. Luồng hơi bật dứt khoát.',
    practiceWords: [
      { word: 'breadwinner', ipa: '/ˈbredwɪnə(r)/', meaningVi: 'người trụ cột gia đình', targetSound: '/br/' },
      { word: 'breakfast', ipa: '/ˈbrekfəst/', meaningVi: 'bữa ăn sáng', targetSound: '/br/' },
      { word: 'brown', ipa: '/braʊn/', meaningVi: 'màu nâu', targetSound: '/br/' },
      { word: 'crash', ipa: '/kræʃ/', meaningVi: 'va chạm, đâm sầm', targetSound: '/kr/' },
      { word: 'crane', ipa: '/kreɪn/', meaningVi: 'con sếu / cần cẩu', targetSound: '/kr/' },
      { word: 'cream', ipa: '/kriːm/', meaningVi: 'kem, váng sữa', targetSound: '/kr/' },
      { word: 'track', ipa: '/træk/', meaningVi: 'đường mòn, đường ray', targetSound: '/tr/' },
      { word: 'tree', ipa: '/triː/', meaningVi: 'cây cối', targetSound: '/tr/' },
      { word: 'train', ipa: '/treɪn/', meaningVi: 'xe lửa / đào tạo', targetSound: '/tr/' },
    ],
    contrastPairs: [
      {
        label: 'Bộ ba phân biệt /br/ - /kr/ - /tr/',
        words: [
          { word: 'brush', ipa: '/brʌʃ/', sound: '/br/' },
          { word: 'crash', ipa: '/kræʃ/', sound: '/kr/' },
          { word: 'trash', ipa: '/træʃ/', sound: '/tr/' },
        ],
      },
      {
        label: 'Bộ ba biến âm nguyên âm đôi',
        words: [
          { word: 'brain', ipa: '/breɪn/', sound: '/br/' },
          { word: 'crane', ipa: '/kreɪn/', sound: '/kr/' },
          { word: 'train', ipa: '/treɪn/', sound: '/tr/' },
        ],
      },
    ],
    practiceSentences: [
      { en: 'I like ice cream, but my brother likes bread pudding.', vi: 'Tôi thích kem, nhưng anh trai tôi lại thích bánh mì pudding.', highlightWord: 'ice cream, brother, bread' },
      { en: 'Tracy crashed her car into a tree and broke her leg.', vi: 'Tracy đâm xe vào một cái cây và bị gãy chân.', highlightWord: 'Tracy, crashed, tree, broke' },
      { en: 'They often have crab soup for breakfast.', vi: 'Họ thường ăn súp cua vào bữa sáng.', highlightWord: 'crab, breakfast' },
    ],
    challengeQuestion: {
      prompt: 'Nghe khẩu quyết phát âm: Từ nào sau đây có phụ âm đầu bắt đầu bằng cụm /kr/?',
      audioScript: 'cream and breakfast',
      options: ['cream', 'breadwinner', 'train', 'track'],
      correctAnswer: 'cream',
      explanation: 'Từ "cream" bắt đầu bằng phụ âm ghép /kr/ (/kriːm/), trong khi "breadwinner" bắt đầu bằng /br/ và "train", "track" bắt đầu bằng /tr/.',
    },
  },

  'g10-u02': {
    unitId: 'g10-u02',
    grade: 10,
    unitNumber: 2,
    unitTitle: 'HUMANS AND THE ENVIRONMENT',
    focusTopic: 'Phụ âm ghép: /kl/, /pl/, /gr/, /pr/',
    focusTopicEn: 'Consonant blends: /kl/, /pl/, /gr/, and /pr/',
    targetSounds: ['/kl/', '/pl/,', '/gr/', '/pr/'],
    wuxiaSecretName: 'Tứ Phong Quy Nhất Kiếm Quyết',
    ruleSummary: 'Các phụ âm ghép kết hợp với âm bên /l/ và âm tiếp cận /r/. Phải chuyển vị trí từ âm chặn /k, p, g/ sang /l, r/ nhanh chóng, không phát âm đứt đoạn.',
    mouthGuide: 'Với /kl/, /pl/: đầu lưỡi nhanh chóng chạm chân răng trên sau khi bật âm đầu. Với /gr/, /pr/: môi chụm nhẹ và lưỡi co về sau tạo âm /r/.',
    practiceWords: [
      { word: 'clean', ipa: '/kliːn/', meaningVi: 'sạch sẽ, lau dọn', targetSound: '/kl/' },
      { word: 'club', ipa: '/klʌb/', meaningVi: 'câu lạc bộ', targetSound: '/kl/' },
      { word: 'climate', ipa: '/ˈklaɪmət/', meaningVi: 'khí hậu', targetSound: '/kl/' },
      { word: 'please', ipa: '/pliːz/', meaningVi: 'làm ơn, vui lòng', targetSound: '/pl/' },
      { word: 'plastic', ipa: '/ˈplæstɪk/', meaningVi: 'nhựa, chất dẻo', targetSound: '/pl/' },
      { word: 'planet', ipa: '/ˈplænɪt/', meaningVi: 'hành tinh', targetSound: '/pl/' },
      { word: 'green', ipa: '/ɡriːn/', meaningVi: 'màu xanh lá', targetSound: '/gr/' },
      { word: 'group', ipa: '/ɡruːp/', meaningVi: 'nhóm', targetSound: '/gr/' },
      { word: 'protect', ipa: '/prəˈtekt/', meaningVi: 'bảo vệ', targetSound: '/pr/' },
      { word: 'practice', ipa: '/ˈpræktɪs/', meaningVi: 'thực hành', targetSound: '/pr/' },
    ],
    contrastPairs: [
      {
        label: 'Phân biệt /pl/ và /pr/',
        words: [
          { word: 'play', ipa: '/pleɪ/', sound: '/pl/' },
          { word: 'pray', ipa: '/preɪ/', sound: '/pr/' },
        ],
      },
      {
        label: 'Phân biệt /kl/ và /gr/',
        words: [
          { word: 'class', ipa: '/klɑːs/', sound: '/kl/' },
          { word: 'grass', ipa: '/ɡrɑːs/', sound: '/gr/' },
        ],
      },
    ],
    practiceSentences: [
      { en: 'Please protect our green planet by planting more trees.', vi: 'Xin hãy bảo vệ hành tinh xanh của chúng ta bằng cách trồng thêm cây xanh.', highlightWord: 'Please, protect, green, planet, planting' },
      { en: 'The clean club presented practical solutions for plastic waste.', vi: 'Câu lạc bộ vì môi trường sạch đã trình bày các giải pháp thực tế cho rác thải nhựa.', highlightWord: 'clean, club, presented, practical, plastic' },
    ],
    challengeQuestion: {
      prompt: 'Từ nào sau đây có phụ âm đầu chứa âm /pl/ thay vì /pr/?',
      audioScript: 'plastic and protect',
      options: ['plastic', 'practice', 'protect', 'produce'],
      correctAnswer: 'plastic',
      explanation: '"Plastic" phát âm với phụ âm ghép /pl/ (/ˈplæstɪk/), trong khi ba từ còn lại đều bắt đầu bằng /pr/.',
    },
  },

  'g10-u03': {
    unitId: 'g10-u03',
    grade: 10,
    unitNumber: 3,
    unitTitle: 'MUSIC',
    focusTopic: 'Trọng âm từ 2 âm tiết (Stress in two-syllable words)',
    focusTopicEn: 'Stress in two-syllable words',
    targetSounds: ['ˈƠ-ơ (Âm 1)', 'ơ-ˈƠ (Âm 2)'],
    wuxiaSecretName: 'Khúc Điệu Trọng Âm Cầm Phổ',
    ruleSummary: 'Quy tắc vàng: Hầu hết Danh từ và Tính từ 2 âm tiết có trọng âm rơi vào âm tiết THỨ NHẤT (ˈmusic, ˈsinger, ˈfamous). Hầu hết Động từ 2 âm tiết có trọng âm rơi vào âm tiết THỨ HAI (perˈform, reˈlax, atˈtract).',
    mouthGuide: 'Âm tiết mang trọng âm được phát âm: CAO hơn, TO hơn và KÉO DÀI hơn âm tiết không mang trọng âm.',
    practiceWords: [
      { word: 'music', ipa: '/ˈmjuːzɪk/', meaningVi: 'âm nhạc (Danh từ)', targetSound: 'Âm 1' },
      { word: 'singer', ipa: '/ˈsɪŋə(r)/', meaningVi: 'ca sĩ (Danh từ)', targetSound: 'Âm 1' },
      { word: 'famous', ipa: '/ˈfeɪməs/', meaningVi: 'nổi tiếng (Tính từ)', targetSound: 'Âm 1' },
      { word: 'concert', ipa: '/ˈkɒnsət/', meaningVi: 'buổi hòa nhạc (Danh từ)', targetSound: 'Âm 1' },
      { word: 'perform', ipa: '/pəˈfɔːm/', meaningVi: 'biểu diễn (Động từ)', targetSound: 'Âm 2' },
      { word: 'relax', ipa: '/rɪˈlæks/', meaningVi: 'thư giãn (Động từ)', targetSound: 'Âm 2' },
      { word: 'attract', ipa: '/əˈtrækt/', meaningVi: 'thu hút (Động từ)', targetSound: 'Âm 2' },
      { word: 'enjoy', ipa: '/ɪnˈdʒɔɪ/', meaningVi: 'thưởng thức (Động từ)', targetSound: 'Âm 2' },
    ],
    contrastPairs: [
      {
        label: 'Danh từ (Âm 1) vs Động từ (Âm 2)',
        words: [
          { word: 'artist', ipa: '/ˈɑːtɪst/', sound: 'Âm 1 (Danh từ)' },
          { word: 'perform', ipa: '/pəˈfɔːm/', sound: 'Âm 2 (Động từ)' },
        ],
      },
    ],
    practiceSentences: [
      { en: 'The famous singer will perform at the concert tonight.', vi: 'Ca sĩ nổi tiếng sẽ biểu diễn tại buổi hòa nhạc tối nay.', highlightWord: 'famous, singer, perform, concert' },
    ],
    challengeQuestion: {
      prompt: 'Từ nào sau đây có vị trí trọng âm KHÁC với các từ còn lại?',
      audioScript: 'perform, singer, music, concert',
      options: ['perform', 'singer', 'music', 'concert'],
      correctAnswer: 'perform',
      explanation: '"Perform" có trọng âm ở âm tiết thứ 2 (động từ), còn "singer", "music", "concert" đều có trọng âm ở âm tiết thứ nhất (danh từ).',
    },
  },

  'g10-u04': {
    unitId: 'g10-u04',
    grade: 10,
    unitNumber: 4,
    unitTitle: 'FOR A BETTER COMMUNITY',
    focusTopic: 'Trọng âm từ cùng chữ viết (Danh từ vs Động từ)',
    focusTopicEn: 'Stress in two-syllable words with the same spelling',
    targetSounds: ['ˈN-v (Noun/Adj)', 'v-ˈV (Verb)'],
    wuxiaSecretName: 'Lưỡng Diện Biến Ảo Kiếm Quyết',
    ruleSummary: 'Một số từ có 2 âm tiết giữ nguyên cách viết nhưng đổi trọng âm tùy từ loại: Khi là Danh từ thì nhấn âm 1 (ˈrecord: đĩa hát/kỷ lục); khi là Động từ thì nhấn âm 2 (reˈcord: ghi âm/ghi chép).',
    mouthGuide: 'Nhấn mạnh dứt khoát âm 1 khi nói về sự vật/sự việc; đẩy hơi và nâng cao độ ở âm 2 khi diễn tả hành động.',
    practiceWords: [
      { word: 'record (n)', ipa: '/ˈrekɔːd/', meaningVi: 'kỷ lục, hồ sơ (Danh từ)', targetSound: 'Âm 1' },
      { word: 'record (v)', ipa: '/rɪˈkɔːd/', meaningVi: 'ghi lại, thu âm (Động từ)', targetSound: 'Âm 2' },
      { word: 'present (n)', ipa: '/ˈpreznt/', meaningVi: 'món quà (Danh từ)', targetSound: 'Âm 1' },
      { word: 'present (v)', ipa: '/prɪˈzent/', meaningVi: 'trình bày, trao tặng (Động từ)', targetSound: 'Âm 2' },
      { word: 'increase (n)', ipa: '/ˈɪŋkriːs/', meaningVi: 'sự gia tăng (Danh từ)', targetSound: 'Âm 1' },
      { word: 'increase (v)', ipa: '/ɪnˈkriːs/', meaningVi: 'gia tăng (Động từ)', targetSound: 'Âm 2' },
      { word: 'project (n)', ipa: '/ˈprɒdʒekt/', meaningVi: 'dự án (Danh từ)', targetSound: 'Âm 1' },
      { word: 'project (v)', ipa: '/prəˈdʒekt/', meaningVi: 'phóng chiếu, dự phóng (Động từ)', targetSound: 'Âm 2' },
    ],
    contrastPairs: [
      {
        label: 'Cặp từ biến đổi trọng âm: ˈrecord vs reˈcord',
        words: [
          { word: 'record (Danh từ)', ipa: '/ˈrekɔːd/', sound: 'Âm 1' },
          { word: 'record (Động từ)', ipa: '/rɪˈkɔːd/', sound: 'Âm 2' },
        ],
      },
    ],
    practiceSentences: [
      { en: 'They will preˈsent a wonderful ˈpresent to the volunteers.', vi: 'Họ sẽ trao tặng một món quà tuyệt vời cho các tình nguyện viên.', highlightWord: 'present' },
      { en: 'We need to reˈcord a new ˈrecord for community service.', vi: 'Chúng ta cần xác lập một kỷ lục mới cho hoạt động vì cộng đồng.', highlightWord: 'record' },
    ],
    challengeQuestion: {
      prompt: 'Trong câu: "They want to _______ the meeting", từ "record" mang trọng âm ở đâu?',
      audioScript: 'They want to record the meeting.',
      options: ['Âm tiết thứ hai (/rɪˈkɔːd/)', 'Âm tiết thứ nhất (/ˈrekɔːd/)', 'Đều nhau cả hai âm', 'Không có trọng âm'],
      correctAnswer: 'Âm tiết thứ hai (/rɪˈkɔːd/)',
      explanation: 'Trong câu này "record" là động từ (ghi âm/ghi lại), do đó trọng âm rơi vào âm tiết thứ hai: /rɪˈkɔːd/.',
    },
  },

  'g10-u05': {
    unitId: 'g10-u05',
    grade: 10,
    unitNumber: 5,
    unitTitle: 'INVENTIONS',
    focusTopic: 'Trọng âm danh từ ba âm tiết (Stress in three-syllable nouns)',
    focusTopicEn: 'Stress in three-syllable nouns',
    targetSounds: ['ˈƠ-ơ-ơ (Âm 1)', 'ơ-ˈƠ-ơ (Âm 2)'],
    wuxiaSecretName: 'Tam Tiết Khí Kình Trọng Âm Quyết',
    ruleSummary: 'Đa số danh từ ba âm tiết thông dụng trong chủ đề khoa học & sáng chế có trọng âm rơi vào âm tiết THỨ NHẤT (ˈprocessor, ˈbattery, ˈtelephone, ˈhardware, ˈinternet).',
    mouthGuide: 'Phát âm dứt khoát âm đầu tiên với cao độ nổi bật, sau đó hạ giọng nhẹ nhàng ở hai âm tiết tiếp theo.',
    practiceWords: [
      { word: 'processor', ipa: '/ˈprəʊsesə(r)/', meaningVi: 'bộ vi xử lý', targetSound: 'Âm 1' },
      { word: 'battery', ipa: '/ˈbætəri/', meaningVi: 'pin, ắc quy', targetSound: 'Âm 1' },
      { word: 'telephone', ipa: '/ˈtelɪfəʊn/', meaningVi: 'điện thoại', targetSound: 'Âm 1' },
      { word: 'hardware', ipa: '/ˈhɑːdweə(r)/', meaningVi: 'phần cứng', targetSound: 'Âm 1' },
      { word: 'internet', ipa: '/ˈɪntənet/', meaningVi: 'mạng internet', targetSound: 'Âm 1' },
      { word: 'computer', ipa: '/kəmˈpjuːtə(r)/', meaningVi: 'máy vi tính (ngoại lệ: Âm 2)', targetSound: 'Âm 2' },
    ],
    contrastPairs: [
      {
        label: 'Danh từ âm 1 vs Danh từ âm 2',
        words: [
          { word: 'processor', ipa: '/ˈprəʊsesə(r)/', sound: 'Âm 1' },
          { word: 'computer', ipa: '/kəmˈpjuːtə(r)/', sound: 'Âm 2' },
        ],
      },
    ],
    practiceSentences: [
      { en: 'The new smartphone has a powerful ˈprocessor and a long-lasting ˈbattery.', vi: 'Chiếc điện thoại mới có bộ xử lý mạnh mẽ và pin dung lượng lớn.', highlightWord: 'processor, battery' },
    ],
    challengeQuestion: {
      prompt: 'Danh từ nào sau đây có trọng âm rơi vào âm tiết thứ HAI thay vì âm tiết thứ nhất?',
      audioScript: 'computer, battery, processor, telephone',
      options: ['computer', 'battery', 'processor', 'telephone'],
      correctAnswer: 'computer',
      explanation: '"Computer" nhấn âm 2 (/kəmˈpjuːtə(r)/), trong khi battery, processor và telephone đều nhấn âm 1.',
    },
  },

  'g10-u06': {
    unitId: 'g10-u06',
    grade: 10,
    unitNumber: 6,
    unitTitle: 'GENDER EQUALITY',
    focusTopic: 'Trọng âm tính từ & động từ ba âm tiết',
    focusTopicEn: 'Stress in three-syllable adjectives and verbs',
    targetSounds: ['ˈƠ-ơ-ơ (Âm 1)', 'ơ-ˈƠ-ơ (Âm 2)'],
    wuxiaSecretName: 'Bình Đẳng Âm Luật Kiếm Quyết',
    ruleSummary: 'Đa số tính từ 3 âm tiết kết thúc bằng -ful, -al, -ent nhấn vào âm tiết THỨ NHẤT (ˈwonderful, ˈphysical, ˈexcellent). Động từ 3 âm tiết có thể nhấn âm 1 (ˈeducate, ˈorganise) hoặc âm 2 (conˈsider).',
    mouthGuide: 'Giữ nhịp điệu đều đặn, chú ý nhận diện các hậu tố nhận biết trọng âm như -ful, -al, -ic.',
    practiceWords: [
      { word: 'excellent', ipa: '/ˈeksələnt/', meaningVi: 'xuất sắc', targetSound: 'Âm 1' },
      { word: 'wonderful', ipa: '/ˈwʌndəfl/', meaningVi: 'tuyệt vời', targetSound: 'Âm 1' },
      { word: 'physical', ipa: '/ˈfɪzɪkl/', meaningVi: 'thuộc thể chất', targetSound: 'Âm 1' },
      { word: 'educate', ipa: '/ˈedʒukeɪt/', meaningVi: 'giáo dục', targetSound: 'Âm 1' },
      { word: 'consider', ipa: '/kənˈsɪdə(r)/', meaningVi: 'cân nhắc (Âm 2)', targetSound: 'Âm 2' },
      { word: 'encourage', ipa: '/ɪnˈkʌrɪdʒ/', meaningVi: 'khuyến khích (Âm 2)', targetSound: 'Âm 2' },
    ],
    contrastPairs: [
      {
        label: 'Tính từ âm 1 vs Động từ âm 2',
        words: [
          { word: 'excellent', ipa: '/ˈeksələnt/', sound: 'Âm 1' },
          { word: 'encourage', ipa: '/ɪnˈkʌrɪdʒ/', sound: 'Âm 2' },
        ],
      },
    ],
    practiceSentences: [
      { en: 'We should enˈcourage women to pursue ˈexcellent careers.', vi: 'Chúng ta nên khuyến khích phụ nữ theo đuổi các sự nghiệp xuất sắc.', highlightWord: 'encourage, excellent' },
    ],
    challengeQuestion: {
      prompt: 'Từ nào sau đây có trọng âm rơi vào âm tiết thứ 1?',
      audioScript: 'excellent, consider, encourage, remember',
      options: ['excellent', 'consider', 'encourage', 'remember'],
      correctAnswer: 'excellent',
      explanation: '"Excellent" nhấn âm 1 (/ˈeksələnt/), còn consider, encourage, remember đều nhấn âm 2.',
    },
  },

  'g10-u07': {
    unitId: 'g10-u07',
    grade: 10,
    unitNumber: 7,
    unitTitle: 'VIET NAM AND INTERNATIONAL ORGANISATIONS',
    focusTopic: 'Trọng âm từ trên ba âm tiết (Words with > 3 syllables)',
    focusTopicEn: 'Stress in words with more than three syllables',
    targetSounds: ['-tion, -sion (Âm áp chót)', '-ic, -ical (Âm trước hậu tố)'],
    wuxiaSecretName: 'Vạn Dặm Bôn Ba Hậu Tố Quyết',
    ruleSummary: 'Quy tắc hậu tố: Các từ kết thúc bằng -tion, -sion luôn có trọng âm rơi vào âm tiết NGAY TRƯỚC HẬU TỐ (organiˈzation, particiˈpation). Từ kết thúc bằng -al, -ic có trọng âm rơi vào âm liền trước (ecoˈnomic, interˈnational).',
    mouthGuide: 'Đếm ngược từ đuôi từ để xác định âm tiết được nhấn. Phát âm rõ ràng âm phụ (secondary stress) và âm chính (primary stress).',
    practiceWords: [
      { word: 'international', ipa: '/ˌɪntəˈnæʃnəl/', meaningVi: 'quốc tế', targetSound: 'Âm 3' },
      { word: 'organization', ipa: '/ˌɔːɡənaɪˈzeɪʃn/', meaningVi: 'tổ chức', targetSound: 'Âm 4' },
      { word: 'participation', ipa: '/pɑːˌtɪsɪˈpeɪʃn/', meaningVi: 'sự tham gia', targetSound: 'Âm 4' },
      { word: 'economic', ipa: '/ˌiːkəˈnɒmɪk/', meaningVi: 'thuộc kinh tế', targetSound: 'Âm 3' },
      { word: 'cooperation', ipa: '/kəʊˌɒpəˈreɪʃn/', meaningVi: 'sự hợp tác', targetSound: 'Âm 4' },
    ],
    contrastPairs: [
      {
        label: 'Từ gốc vs Từ phái sinh hậu tố -tion',
        words: [
          { word: 'organize', ipa: '/ˈɔːɡənaɪz/', sound: 'Âm 1' },
          { word: 'organization', ipa: '/ˌɔːɡənaɪˈzeɪʃn/', sound: 'Âm 4' },
        ],
      },
    ],
    practiceSentences: [
      { en: 'Viet Nam actively joins international organiˈzations.', vi: 'Việt Nam tích cực tham gia vào các tổ chức quốc tế.', highlightWord: 'international, organizations' },
    ],
    challengeQuestion: {
      prompt: 'Hậu tố "-tion" làm cho trọng âm của từ "cooperation" rơi vào âm tiết thứ mấy?',
      audioScript: 'cooperation',
      options: ['Âm tiết thứ tư (ra- /reɪ/)', 'Âm tiết thứ nhất (co-)', 'Âm tiết thứ hai (op-)', 'Âm tiết cuối cùng (-tion)'],
      correctAnswer: 'Âm tiết thứ tư (ra- /reɪ/)',
      explanation: 'Quy tắc hậu tố -tion: trọng âm rơi vào âm tiết đứng ngay trước nó. "Co-o-pe-RA-tion" nhấn vào âm thứ 4 (/reɪ/).',
    },
  },

  'g10-u08': {
    unitId: 'g10-u08',
    grade: 10,
    unitNumber: 8,
    unitTitle: 'NEW WAYS TO LEARN',
    focusTopic: 'Trọng âm câu (Sentence stress)',
    focusTopicEn: 'Sentence stress',
    targetSounds: ['Content words (Nhấn)', 'Structure words (Lướt)'],
    wuxiaSecretName: 'Khẩu Khí Hư Thực Câu Pháp Quyết',
    ruleSummary: 'Trong câu tiếng Anh: Từ mang nội dung (Content words: danh từ, động từ chính, tính từ, trạng từ) ĐƯỢC NHẤN; Từ mang ngữ pháp/chức năng (Structure words: đại từ, giới từ, mạo từ, to-be) KHÔNG NHẤN và được lướt qua.',
    mouthGuide: 'Phát âm to rõ và ngân dài các từ nội dung quan trọng; hạ nhỏ giọng và đọc lướt nhanh các mạo từ "a, an, the", giới từ "to, in, at".',
    practiceWords: [
      { word: 'ˈsmartphones (noun)', ipa: '/ˈsmɑːtfəʊnz/', meaningVi: 'điện thoại thông minh (nhấn)', targetSound: 'Content word' },
      { word: 'are (auxiliary)', ipa: '/ə(r)/', meaningVi: 'thì, là (không nhấn)', targetSound: 'Structure word' },
      { word: 'ˈuseful (adj)', ipa: '/ˈjuːsfl/', meaningVi: 'hữu ích (nhấn)', targetSound: 'Content word' },
      { word: 'for (prep)', ipa: '/fə(r)/', meaningVi: 'cho (không nhấn)', targetSound: 'Structure word' },
      { word: 'ˈlearning (noun)', ipa: '/ˈlɜːnɪŋ/', meaningVi: 'việc học tập (nhấn)', targetSound: 'Content word' },
    ],
    contrastPairs: [
      {
        label: 'Từ được nhấn vs Từ lướt nhẹ',
        words: [
          { word: 'LEARN (động từ)', ipa: '/lɜːn/', sound: 'Nhấn mạnh' },
          { word: 'can (trợ từ)', ipa: '/kən/', sound: 'Đọc lướt' },
        ],
      },
    ],
    practiceSentences: [
      { en: 'ˈSmartphones are ˈuseful for ˈlearning.', vi: 'Điện thoại thông minh rất hữu ích cho việc học tập.', highlightWord: 'Smartphones, useful, learning' },
    ],
    challengeQuestion: {
      prompt: 'Trong câu "We use tablets for study", những từ nào mang trọng âm chính của câu?',
      audioScript: 'We use tablets for study.',
      options: ['use, tablets, study', 'we, for', 'we, use, for', 'chỉ mỗi từ tablets'],
      correctAnswer: 'use, tablets, study',
      explanation: 'Trong tiếng Anh, danh từ (tablets, study) và động từ chính (use) là từ chỉ nội dung (content words) nên được nhấn trọng âm.',
    },
  },

  'g10-u09': {
    unitId: 'g10-u09',
    grade: 10,
    unitNumber: 9,
    unitTitle: 'PROTECTING THE ENVIRONMENT',
    focusTopic: 'Nhịp điệu câu tiếng Anh (Rhythm in English sentences)',
    focusTopicEn: 'Rhythm in English sentences',
    targetSounds: ['Stress-timed rhythm', 'Isochrony'],
    wuxiaSecretName: 'Đạp Lãng Bộ Pháp Nhịp Điệu Quyết',
    ruleSummary: 'Tiếng Anh là ngôn ngữ đẳng thời theo trọng âm (stress-timed language). Khoảng cách thời gian giữa các từ có trọng âm là xấp xỉ bằng nhau, bất kể ở giữa có bao nhiêu từ không mang trọng âm.',
    mouthGuide: 'Gõ nhịp đều đặn theo các âm tiết có trọng âm. Ép ngắn thời gian phát âm các từ phụ ở giữa để giữ đúng nhịp phách.',
    practiceWords: [
      { word: 'ˈWalk', ipa: '/wɔːk/', meaningVi: 'Đi bộ (nhịp 1)', targetSound: 'Beat 1' },
      { word: 'ˈschool', ipa: '/skuːl/', meaningVi: 'Trường học (nhịp 2)', targetSound: 'Beat 2' },
      { word: 'ˈsave', ipa: '/seɪv/', meaningVi: 'Cứu, tiết kiệm (nhịp 3)', targetSound: 'Beat 3' },
      { word: 'ˈearth', ipa: '/ɜːθ/', meaningVi: 'Trái đất (nhịp 4)', targetSound: 'Beat 4' },
    ],
    contrastPairs: [
      {
        label: 'Giữ nguyên nhịp phách dù số chữ tăng',
        words: [
          { word: 'Walk to school', ipa: '/wɔːk tə skuːl/', sound: '2 nhịp' },
          { word: 'Walk quickly to the school', ipa: '/wɔːk ˈkwɪkli tə ðə skuːl/', sound: 'Vẫn cùng thời gian' },
        ],
      },
    ],
    practiceSentences: [
      { en: 'ˈPlant ˈtrees to ˈsave our ˈplanet.', vi: 'Trồng cây để cứu lấy hành tinh của chúng ta.', highlightWord: 'Plant, trees, save, planet' },
    ],
    challengeQuestion: {
      prompt: 'Tiếng Anh là ngôn ngữ theo nhịp điệu nào?',
      audioScript: 'Plant trees to save our planet.',
      options: ['Nhịp điệu theo trọng âm (Stress-timed)', 'Nhịp điệu theo từng âm tiết (Syllable-timed)', 'Không có nhịp điệu', 'Nhịp điệu bằng phẳng'],
      correctAnswer: 'Nhịp điệu theo trọng âm (Stress-timed)',
      explanation: 'Tiếng Anh là ngôn ngữ Stress-timed: các khoảng thời gian giữa các trọng âm chính là đều đặn nhau.',
    },
  },

  'g10-u10': {
    unitId: 'g10-u10',
    grade: 10,
    unitNumber: 10,
    unitTitle: 'ECOTOURISM',
    focusTopic: 'Ngữ điệu câu hỏi và câu trần thuật (Intonation)',
    focusTopicEn: 'Intonation in questions and statements',
    targetSounds: ['Falling ↘ (Xuống)', 'Rising ↗ (Lên)'],
    wuxiaSecretName: 'Khởi Lạc Âm Ba Ngữ Điệu Quyết',
    ruleSummary: 'Quy tắc ngữ điệu chuẩn: Câu trần thuật (Statements) và câu hỏi Wh- có ngữ điệu XUỐNG ở cuối câu (↘). Câu hỏi Yes/No có ngữ điệu LÊN ở cuối câu (↗).',
    mouthGuide: 'Hạ giọng nhẹ ở âm tiết cuối cùng của câu trần thuật và Wh-question. Nâng thanh quản và cao độ ở âm tiết cuối của câu hỏi Yes/No.',
    practiceWords: [
      { word: 'ecotourism', ipa: '/ˈiːkəʊtʊərɪzəm/', meaningVi: 'du lịch sinh thái (Câu trần thuật hạ giọng ↘)', targetSound: 'Falling ↘' },
      { word: 'destination', ipa: '/ˌdestɪˈneɪʃn/', meaningVi: 'điểm đến (Câu trần thuật hạ giọng ↘)', targetSound: 'Falling ↘' },
      { word: 'Where are you going?', ipa: '/weər ɑː juː ˈɡəʊɪŋ ↘/', meaningVi: 'Bạn đang đi đâu? (Wh-question hạ giọng ↘)', targetSound: 'Falling ↘' },
      { word: 'Do you like nature?', ipa: '/duː juː laɪk ˈneɪtʃə ↗/', meaningVi: 'Bạn có thích thiên nhiên không? (Yes/No lên giọng ↗)', targetSound: 'Rising ↗' },
    ],
    contrastPairs: [
      {
        label: 'Ngữ điệu Wh-question ↘ vs Yes/No question ↗',
        words: [
          { word: 'Where are you going? ↘', ipa: '[Falling tone]', sound: 'Xuống giọng' },
          { word: 'Are you going home? ↗', ipa: '[Rising tone]', sound: 'Lên giọng' },
        ],
      },
    ],
    practiceSentences: [
      { en: 'Do you enjoy ecotourism? ↗', vi: 'Bạn có thích du lịch sinh thái không? (Lên giọng)', highlightWord: 'ecotourism ↗' },
      { en: 'Where did you buy this handicraft? ↘', vi: 'Bạn đã mua món đồ thủ công này ở đâu? (Xuống giọng)', highlightWord: 'handicraft ↘' },
    ],
    challengeQuestion: {
      prompt: 'Câu hỏi "Did you visit the national park?" có ngữ điệu chuẩn như thế nào ở cuối câu?',
      audioScript: 'Did you visit the national park?',
      options: ['Lên giọng ở cuối câu (Rising ↗)', 'Xuống giọng ở cuối câu (Falling ↘)', 'Giữ nguyên giọng ngang', 'Hạ trầm đột ngột'],
      correctAnswer: 'Lên giọng ở cuối câu (Rising ↗)',
      explanation: 'Đây là câu hỏi Yes/No (bắt đầu bằng trợ động từ "Did"), do đó theo quy tắc chuẩn cần lên giọng ở cuối câu (Rising ↗).',
    },
  },

  // ==========================================================================
  // GRADE 11
  // ==========================================================================
  'g11-u01': {
    unitId: 'g11-u01',
    grade: 11,
    unitNumber: 1,
    unitTitle: 'A LONG AND HEALTHY LIFE',
    focusTopic: 'Dạng mạnh và dạng yếu của trợ động từ (Strong/Weak forms)',
    focusTopicEn: 'Strong and weak forms of auxiliary verbs',
    targetSounds: ['Strong /hæv, kæn/', 'Weak /həv, kən/'],
    wuxiaSecretName: 'Hư Thực Khí Kình Trợ Động Quyết',
    ruleSummary: 'Trong giao tiếp tự nhiên, các trợ động từ (have, has, can, do, was, were) thường dùng DẠNG YẾU (Weak form với nguyên âm /ə/). Chúng chỉ dùng DẠNG MẠNH (Strong form) khi đứng cuối câu hoặc khi người nói muốn nhấn mạnh.',
    mouthGuide: 'Ở dạng yếu, thả lỏng khẩu hình miệng và dùng âm schwa /ə/ thật ngắn. Ở dạng mạnh, mở rộng khẩu hình và nhấn âm rõ nét.',
    practiceWords: [
      { word: 'can (weak)', ipa: '/kən/', meaningVi: 'có thể (trong câu khẳng định thường)', targetSound: 'Weak form' },
      { word: 'can (strong)', ipa: '/kæn/', meaningVi: 'có thể (cuối câu hoặc nhấn mạnh)', targetSound: 'Strong form' },
      { word: 'have (weak)', ipa: '/həv, əv/', meaningVi: 'đã (trợ động từ thì hoàn thành)', targetSound: 'Weak form' },
      { word: 'have (strong)', ipa: '/hæv/', meaningVi: 'có / nhấn mạnh', targetSound: 'Strong form' },
      { word: 'was (weak)', ipa: '/wəz/', meaningVi: 'đã là (dạng yếu)', targetSound: 'Weak form' },
      { word: 'was (strong)', ipa: '/wɒz/', meaningVi: 'đã là (dạng mạnh)', targetSound: 'Strong form' },
    ],
    contrastPairs: [
      {
        label: 'Can weak (/kən/) vs Can strong (/kæn/)',
        words: [
          { word: 'I can swim /kən/', ipa: '/aɪ kən swɪm/', sound: 'Weak form' },
          { word: 'Yes, I can! /kæn/', ipa: '/jes aɪ kæn/', sound: 'Strong form' },
        ],
      },
    ],
    practiceSentences: [
      { en: 'I can /kən/ run fast, and yes, I can /kæn/!', vi: 'Tôi có thể chạy nhanh, và đúng thế, tôi làm được!', highlightWord: 'can' },
      { en: 'What have /həv/ you done? — Yes, I have /hæv/.', vi: 'Bạn đã làm gì thế? — Đúng, tôi đã làm rồi.', highlightWord: 'have' },
    ],
    challengeQuestion: {
      prompt: 'Trong câu trả lời ngắn: "Yes, she can.", từ "can" được phát âm theo dạng nào?',
      audioScript: 'Yes, she can.',
      options: ['Dạng mạnh (Strong form: /kæn/)', 'Dạng yếu (Weak form: /kən/)', 'Bị nuốt âm hoàn toàn', 'Dạng câm'],
      correctAnswer: 'Dạng mạnh (Strong form: /kæn/)',
      explanation: 'Khi trợ động từ đứng ở vị trí cuối câu, nó bắt buộc phải được phát âm ở dạng mạnh (Strong form: /kæn/).',
    },
  },

  'g11-u02': {
    unitId: 'g11-u02',
    grade: 11,
    unitNumber: 2,
    unitTitle: 'THE GENERATION GAP',
    focusTopic: 'Dạng rút gọn của động từ (Contracted forms of verbs)',
    focusTopicEn: 'Contracted forms of verbs',
    targetSounds: ["'m, 're, 've, n't, 'll, 'd"],
    wuxiaSecretName: 'Thuấn Tức Ngưng Âm Súc Khẩu Quyết',
    ruleSummary: 'Trong văn nói và thư từ thân mật, đại từ và trợ động từ thường được ghép lại thành dạng viết tắt: I am -> I\'m, they are -> they\'re, we have -> we\'ve, do not -> don\'t. Âm rút gọn tạo nhịp điệu tự nhiên.',
    mouthGuide: 'Phát âm liền khối không dừng giữa đại từ và phụ âm rút gọn: I\'m /aɪm/, you\'re /jɔː(r)/, they\'ve /ðeɪv/.',
    practiceWords: [
      { word: "I'm", ipa: '/aɪm/', meaningVi: 'Tôi là (I am)', targetSound: 'Contracted' },
      { word: "you're", ipa: '/jɔː(r)/', meaningVi: 'Bạn là (you are)', targetSound: 'Contracted' },
      { word: "they've", ipa: '/ðeɪv/', meaningVi: 'Họ đã (they have)', targetSound: 'Contracted' },
      { word: "don't", ipa: '/dəʊnt/', meaningVi: 'Không (do not)', targetSound: 'Contracted' },
      { word: "won't", ipa: '/wəʊnt/', meaningVi: 'Sẽ không (will not)', targetSound: 'Contracted' },
      { word: "didn't", ipa: '/ˈdɪdnt/', meaningVi: 'Đã không (did not)', targetSound: 'Contracted' },
    ],
    contrastPairs: [
      {
        label: 'Dạng đầy đủ vs Dạng rút gọn',
        words: [
          { word: 'do not', ipa: '/duː nɒt/', sound: 'Full form' },
          { word: "don't", ipa: '/dəʊnt/', sound: 'Contracted form' },
        ],
      },
    ],
    practiceSentences: [
      { en: "They've lived here for years, but they don't understand us.", vi: 'Họ đã sống ở đây nhiều năm nhưng họ không hiểu chúng tôi.', highlightWord: "They've, don't" },
    ],
    challengeQuestion: {
      prompt: 'Từ "won\'t" là dạng viết tắt của cụm từ nào sau đây?',
      audioScript: "won't",
      options: ['will not', 'would not', 'was not', 'were not'],
      correctAnswer: 'will not',
      explanation: '"Won\'t" /wəʊnt/ là dạng rút gọn chính thức của "will not".',
    },
  },

  'g11-u03': {
    unitId: 'g11-u03',
    grade: 11,
    unitNumber: 3,
    unitTitle: 'CITIES OF THE FUTURE',
    focusTopic: 'Nối âm: Phụ âm cuối sang nguyên âm đầu (Linking)',
    focusTopicEn: 'Linking final consonants to initial vowels',
    targetSounds: ['C + V Linking: /C‿V/'],
    wuxiaSecretName: 'Khí Tức Liên Hoàn Nối Âm Quyết',
    ruleSummary: 'Khi một từ kết thúc bằng một phụ âm và từ tiếp theo bắt đầu bằng một nguyên âm, phụ âm cuối sẽ được nối liền với nguyên âm đầu của từ sau (Consonant-to-Vowel linking), tạo dòng chảy lời nói mượt mà.',
    mouthGuide: 'Không ngắt hơi giữa hai từ. Di chuyển khẩu hình trực tiếp từ phụ âm cuối sang nguyên âm tiếp theo: "live in" -> /lɪ.vɪn/, "hold on" -> /həʊl.dɒn/.',
    practiceWords: [
      { word: 'live in', ipa: '/lɪv‿ɪn/', meaningVi: 'sống ở', targetSound: 'v‿ɪ' },
      { word: 'hold on', ipa: '/həʊld‿ɒn/', meaningVi: 'chờ một chút', targetSound: 'd‿ɒ' },
      { word: 'look at', ipa: '/lʊk‿æt/', meaningVi: 'nhìn vào', targetSound: 'k‿æ' },
      { word: 'turn off', ipa: '/tɜːn‿ɒf/', meaningVi: 'tắt đi', targetSound: 'n‿ɒ' },
      { word: 'think of', ipa: '/θɪŋk‿əv/', meaningVi: 'nghĩ về', targetSound: 'k‿ə' },
    ],
    contrastPairs: [
      {
        label: 'Ngắt từ rời rạc vs Nối âm mượt mà',
        words: [
          { word: 'live... in', ipa: '/lɪv | ɪn/', sound: 'Rời rạc' },
          { word: 'live in', ipa: '/lɪv‿ɪn/', sound: 'Nối âm chuẩn' },
        ],
      },
    ],
    practiceSentences: [
      { en: 'More people will live in smart cities in the future.', vi: 'Nhiều người hơn sẽ sống trong các thành phố thông minh trong tương lai.', highlightWord: 'live in' },
    ],
    challengeQuestion: {
      prompt: 'Hiện tượng nối âm xảy ra ở cặp từ nào trong cụm: "Turn off the lights"?',
      audioScript: 'Turn off the lights.',
      options: ['Turn off (/tɜːn‿ɒf/)', 'the lights', 'off the', 'không có nối âm'],
      correctAnswer: 'Turn off (/tɜːn‿ɒf/)',
      explanation: 'Từ "turn" kết thúc bằng phụ âm /n/ và "off" bắt đầu bằng nguyên âm /ɒ/, tạo nên hiện tượng nối âm /tɜːn‿ɒf/.',
    },
  },

  'g11-u04': {
    unitId: 'g11-u04',
    grade: 11,
    unitNumber: 4,
    unitTitle: 'ASEAN AND VIET NAM',
    focusTopic: 'Hiện tượng nuốt nguyên âm (Elision of vowels)',
    focusTopicEn: 'Elision of vowels in rapid speech',
    targetSounds: ['Elision: ə/ɪ drop'],
    wuxiaSecretName: 'Hư Không Ẩn Âm Đoạt Khí Quyết',
    ruleSummary: 'Trong lời nói nhanh tự nhiên của người bản ngữ, một số nguyên âm yếu (thường là /ə/ hoặc /ɪ/) bị nuốt hoặc tiêu biến (Elision) trong các từ đa âm tiết: camera /ˈkæmərə/ -> /ˈkæmrə/, history /ˈhɪstəri/ -> /ˈhɪstri/.',
    mouthGuide: 'Bỏ qua nguyên âm yếu không mang trọng âm, trượt nhanh từ phụ âm trước thẳng sang phụ âm kế tiếp.',
    practiceWords: [
      { word: 'camera', ipa: '/ˈkæmrə/ (từ /ˈkæmərə/)', meaningVi: 'máy ảnh', targetSound: 'Nuốt /ə/' },
      { word: 'history', ipa: '/ˈhɪstri/ (từ /ˈhɪstəri/)', meaningVi: 'lịch sử', targetSound: 'Nuốt /ə/' },
      { word: 'family', ipa: '/ˈfæmli/ (từ /ˈfæməli/)', meaningVi: 'gia đình', targetSound: 'Nuốt /ə/' },
      { word: 'different', ipa: '/ˈdɪfrənt/ (từ /ˈdɪfərənt/)', meaningVi: 'khác biệt', targetSound: 'Nuốt /ə/' },
      { word: 'interesting', ipa: '/ˈɪntrəstɪŋ/', meaningVi: 'thú vị', targetSound: 'Nuốt /ə/' },
    ],
    contrastPairs: [
      {
        label: 'Phát âm chậm từng âm vs Phát âm tự nhiên nuốt âm',
        words: [
          { word: 'different (chậm)', ipa: '/ˈdɪfərənt/', sound: '3 âm tiết' },
          { word: 'different (chuẩn)', ipa: '/ˈdɪfrənt/', sound: '2 âm tiết' },
        ],
      },
    ],
    practiceSentences: [
      { en: 'We learned about the history of different ASEAN countries.', vi: 'Chúng tôi đã tìm hiểu về lịch sử của các quốc gia ASEAN khác nhau.', highlightWord: 'history, different' },
    ],
    challengeQuestion: {
      prompt: 'Khi phát âm tự nhiên trong tiếng Anh, từ "family" thường chỉ còn bao nhiêu âm tiết do nuốt âm?',
      audioScript: 'family',
      options: ['2 âm tiết (/ˈfæm-li/)', '3 âm tiết (/ˈfæ-mə-li/)', '1 âm tiết', '4 âm tiết'],
      correctAnswer: '2 âm tiết (/ˈfæm-li/)',
      explanation: 'Nguyên âm giữa /ə/ bị nuốt đi trong lời nói tự nhiên, khiến từ "family" được phát âm thành 2 âm tiết: /ˈfæmli/.',
    },
  },

  'g11-u05': {
    unitId: 'g11-u05',
    grade: 11,
    unitNumber: 5,
    unitTitle: 'GLOBAL WARMING',
    focusTopic: 'Trọng âm câu và nhịp điệu (Sentence stress and rhythm)',
    focusTopicEn: 'Sentence stress and rhythm',
    targetSounds: ['Stress beats', 'Connected rhythm'],
    wuxiaSecretName: 'Khí Phách Sơn Hà Trọng Âm Cương Quyết',
    ruleSummary: 'Kết hợp hài hòa giữa việc nhấn các từ khóa biểu thị sự cảnh báo (warning, climate, planet) và đọc lướt các hư từ để tạo nhịp điệu dồn dập, mạnh mẽ khi trình bày về chủ đề biến đổi khí hậu.',
    mouthGuide: 'Phát âm các từ vựng cốt lõi với âm lượng dõng dạc và trường độ dài hơn gấp rưỡi các từ phụ.',
    practiceWords: [
      { word: 'ˈglobal ˈwarming', ipa: '/ˌɡləʊbl ˈwɔːmɪŋ/', meaningVi: 'sự nóng lên toàn cầu', targetSound: 'Double stress' },
      { word: 'ˈgreenhouse ˈgases', ipa: '/ˈɡriːnhaʊs ˌɡæsɪz/', meaningVi: 'khí nhà kính', targetSound: 'Compound stress' },
      { word: 'ˈcarbon ˈfootprint', ipa: '/ˌkɑːbən ˈfʊtprɪnt/', meaningVi: 'vết carbon', targetSound: 'Compound stress' },
    ],
    contrastPairs: [
      {
        label: 'Nhấn sai từng chữ vs Nhấn đúng từ khóa',
        words: [
          { word: 'WE MUST STOP THIS', ipa: '[Monotone]', sound: 'Ngang phè' },
          { word: 'We must ˈSTOP ˈglobal ˈwarming', ipa: '[Natural stress]', sound: 'Chuẩn nhịp' },
        ],
      },
    ],
    practiceSentences: [
      { en: 'We must ˈreduce our ˈcarbon ˈfootprint to ˈprotect the ˈplanet.', vi: 'Chúng ta phải cắt giảm vết carbon để bảo vệ hành tinh.', highlightWord: 'reduce, carbon, footprint, protect, planet' },
    ],
    challengeQuestion: {
      prompt: 'Trong câu: "We should cut down on emissions", từ nào nhận trọng âm chính?',
      audioScript: 'We should cut down on emissions.',
      options: ['cut, down, emissions', 'we, should, on', 'chỉ từ we', 'chỉ từ should'],
      correctAnswer: 'cut, down, emissions',
      explanation: '"Cut down" (cụm động từ chính) và "emissions" (danh từ) là các từ chỉ nội dung quan trọng nên nhận trọng âm câu.',
    },
  },

  'g11-u06': {
    unitId: 'g11-u06',
    grade: 11,
    unitNumber: 6,
    unitTitle: 'PRESERVING OUR HERITAGE',
    focusTopic: 'Ngữ điệu trong câu trần thuật, mệnh lệnh và liệt kê',
    focusTopicEn: 'Intonation in statements, commands, and lists',
    targetSounds: ['List: ↗ ↗ ↘', 'Command: ↘'],
    wuxiaSecretName: 'Lệnh Xuất Như Sơn Ngữ Điệu Trận',
    ruleSummary: 'Trong câu liệt kê (Lists): Lên giọng nhẹ (↗) ở mỗi mục kể ra, và HẠ GIỌNG (↘) ở mục cuối cùng để báo hiệu danh sách đã kết thúc. Trong câu mệnh lệnh (Commands): Dứt khoát hạ giọng (↘).',
    mouthGuide: 'Nâng nhẹ cao độ khi liệt kê từng di sản, và hạ độ cao rõ rệt ở di sản cuối cùng kèm dấu chấm hết.',
    practiceWords: [
      { word: 'monument', ipa: '/ˈmɒnjumənt/', meaningVi: 'đài tưởng niệm (Hạ giọng ↘ cuối câu)', targetSound: 'Falling ↘' },
      { word: 'heritage', ipa: '/ˈherɪtɪdʒ/', meaningVi: 'di sản văn hóa (Hạ giọng ↘)', targetSound: 'Falling ↘' },
      { word: 'Protect our heritage!', ipa: '/prəˈtekt aʊə ˈherɪtɪdʒ ↘/', meaningVi: 'Hãy bảo vệ di sản! (Câu mệnh lệnh hạ giọng ↘)', targetSound: 'Command ↘' },
      { word: 'citadels, temples, and caves', ipa: '/ˈsɪtədəlz ↗, ˈtemplz ↗, ənd keɪvz ↘/', meaningVi: 'thành quách, đền miếu và hang động (Liệt kê)', targetSound: 'List: ↗ ↗ ↘' },
    ],
    contrastPairs: [
      {
        label: 'Ngữ điệu liệt kê 3 mục',
        words: [
          { word: 'citadels ↗, temples ↗, and monuments ↘', ipa: '[↗, ↗, ↘]', sound: 'Liệt kê chuẩn' },
        ],
      },
    ],
    practiceSentences: [
      { en: 'We visited the citadel ↗, ancient temples ↗, and historic monuments ↘.', vi: 'Chúng tôi đã thăm hoàng thành, các ngôi đền cổ và các di tích lịch sử.', highlightWord: 'citadel ↗, temples ↗, monuments ↘' },
      { en: 'Protect our cultural heritage now! ↘', vi: 'Hãy bảo vệ di sản văn hóa của chúng ta ngay bây giờ! (Hạ giọng)', highlightWord: 'heritage now ↘' },
    ],
    challengeQuestion: {
      prompt: 'Khi đọc một danh sách liệt kê 3 món đồ trong tiếng Anh, ngữ điệu ở món cuối cùng là gì?',
      audioScript: 'Apples, oranges, and bananas.',
      options: ['Xuống giọng (Falling ↘)', 'Lên giọng (Rising ↗)', 'Lên giọng cao vút', 'Giữ nguyên không đổi'],
      correctAnswer: 'Xuống giọng (Falling ↘)',
      explanation: 'Theo quy tắc ngữ điệu liệt kê chuẩn: các mục trước lên giọng nhẹ để báo hiệu danh sách còn tiếp tục, mục cuối cùng hạ giọng (Falling ↘) báo hiệu danh sách kết thúc.',
    },
  },

  'g11-u07': {
    unitId: 'g11-u07',
    grade: 11,
    unitNumber: 7,
    unitTitle: 'EDUCATION OPTIONS FOR SCHOOL-LEAVERS',
    focusTopic: 'Ngữ điệu trong câu hỏi Wh- và Yes/No',
    focusTopicEn: 'Intonation in Wh- and Yes/No questions',
    targetSounds: ['Wh-question: ↘', 'Yes/No: ↗'],
    wuxiaSecretName: 'Vấn Đạo Xuất Thần Ngữ Điệu Quyết',
    ruleSummary: 'Ôn tập và nâng cao: Câu hỏi mở bắt đầu bằng từ để hỏi (What, Where, Which university) xuống giọng ở cuối (↘). Câu hỏi đóng xác nhận Yes/No (Do you want to go to vocational school?) lên giọng ở cuối (↗).',
    mouthGuide: 'Phân định rõ loại câu hỏi trước khi nói để điều tiết luồng hơi và độ cao thanh quản chính xác.',
    practiceWords: [
      { word: 'career', ipa: '/kəˈrɪə(r)/', meaningVi: 'nghề nghiệp (Hạ giọng ↘)', targetSound: 'Falling ↘' },
      { word: 'university', ipa: '/ˌjuːnɪˈvɜːsəti/', meaningVi: 'trường đại học (Hạ giọng ↘)', targetSound: 'Falling ↘' },
      { word: 'What will you choose?', ipa: '/wɒt wɪl juː tʃuːz ↘/', meaningVi: 'Bạn sẽ chọn gì? (Wh-question hạ giọng ↘)', targetSound: 'Wh- ↘' },
      { word: 'Will you go to college?', ipa: '/wɪl juː ɡəʊ tə ˈkɒlɪdʒ ↗/', meaningVi: 'Bạn sẽ học đại học chứ? (Yes/No lên giọng ↗)', targetSound: 'Yes/No ↗' },
    ],
    contrastPairs: [
      {
        label: 'Wh- ↘ vs Yes/No ↗',
        words: [
          { word: 'What is your degree? ↘', ipa: '[Falling]', sound: 'Wh-question' },
          { word: 'Is this your bachelor degree? ↗', ipa: '[Rising]', sound: 'Yes/No question' },
        ],
      },
    ],
    practiceSentences: [
      { en: 'What will you do after leaving school? ↘', vi: 'Bạn sẽ làm gì sau khi tốt nghiệp cấp 3? (Xuống)', highlightWord: 'leaving school ↘' },
      { en: 'Have you applied for university yet? ↗', vi: 'Bạn đã nộp đơn vào đại học chưa? (Lên)', highlightWord: 'university yet ↗' },
    ],
    challengeQuestion: {
      prompt: 'Câu hỏi: "Which career path are you interested in?" có ngữ điệu kết thúc như thế nào?',
      audioScript: 'Which career path are you interested in?',
      options: ['Xuống giọng ở cuối câu (Falling ↘)', 'Lên giọng ở cuối câu (Rising ↗)', 'Giọng đều đều', 'Lên giọng ở giữa câu'],
      correctAnswer: 'Xuống giọng ở cuối câu (Falling ↘)',
      explanation: 'Câu hỏi bắt đầu bằng từ để hỏi "Which" (Wh-question) luôn có ngữ điệu xuống ở cuối câu (Falling ↘).',
    },
  },

  'g11-u08': {
    unitId: 'g11-u08',
    grade: 11,
    unitNumber: 8,
    unitTitle: 'BECOMING INDEPENDENT',
    focusTopic: 'Ngữ điệu trong lời mời, đề xuất và yêu cầu lịch sự',
    focusTopicEn: 'Intonation in invitations, suggestions, and polite requests',
    targetSounds: ['Polite Rising-Falling ↗↘', 'Friendly Rising ↗'],
    wuxiaSecretName: 'Ôn Nhu Nhã Nhặn Ngữ Thanh Quyết',
    ruleSummary: 'Khi đưa ra lời mời (invitations), gợi ý (suggestions) hoặc yêu cầu lịch sự (polite requests với Would you, Could you), ngữ điệu thường mềm mại, lên giọng ở cuối hoặc uốn nhẹ để thể hiện sự thân thiện, tôn trọng.',
    mouthGuide: 'Thả lỏng cơ hàm, kéo nhẹ thanh điệu lên ở cuối câu để tránh cảm giác cộc lốc hay ra lệnh.',
    practiceWords: [
      { word: 'independent', ipa: '/ˌɪndɪˈpendənt/', meaningVi: 'tự lập (Hạ giọng ↘)', targetSound: 'Falling ↘' },
      { word: 'Would you like some tea?', ipa: '/wʊd juː laɪk səm tiː ↗/', meaningVi: 'Bạn dùng trà nhé? (Lời mời lên giọng ↗)', targetSound: 'Invitation ↗' },
      { word: 'Could you give me a hand?', ipa: '/kʊd juː ɡɪv miː ə hænd ↗/', meaningVi: 'Bạn giúp tôi một tay được không? (Yêu cầu lịch sự ↗)', targetSound: 'Request ↗' },
      { word: 'Shall we discuss skills?', ipa: '/ʃæl wiː dɪˈskʌs skɪlz ↗/', meaningVi: 'Chúng ta thảo luận kỹ năng nhé? (Đề xuất ↗)', targetSound: 'Suggestion ↗' },
    ],
    contrastPairs: [
      {
        label: 'Ra lệnh cộc cằn (↘) vs Yêu cầu lịch thiệp (↗)',
        words: [
          { word: 'Help me! ↘', ipa: '[Blunt command]', sound: 'Gắt gỏng' },
          { word: 'Could you please help me? ↗', ipa: '[Polite request]', sound: 'Lịch sự' },
        ],
      },
    ],
    practiceSentences: [
      { en: 'Could you please show me how to manage my time? ↗', vi: 'Bạn có thể vui lòng chỉ cho tôi cách quản lý thời gian không?', highlightWord: 'manage my time ↗' },
    ],
    challengeQuestion: {
      prompt: 'Để thể hiện lời yêu cầu lịch thiệp và nhã nhặn, ta nên dùng ngữ điệu nào cho câu "Could you help me with this task?"',
      audioScript: 'Could you help me with this task?',
      options: ['Lên giọng nhẹ nhàng ở cuối câu (↗)', 'Xuống giọng gay gắt ở cuối câu (↘)', 'Quát to âm cuối', 'Đọc không có cảm xúc'],
      correctAnswer: 'Lên giọng nhẹ nhàng ở cuối câu (↗)',
      explanation: 'Trong tiếng Anh giao tiếp chuẩn mực, lời yêu cầu lịch sự (polite requests) kết thúc bằng ngữ điệu lên nhẹ để biểu thị sự tôn trọng người nghe.',
    },
  },

  'g11-u09': {
    unitId: 'g11-u09',
    grade: 11,
    unitNumber: 9,
    unitTitle: 'SOCIAL ISSUES',
    focusTopic: 'Ngữ điệu trong câu hỏi lựa chọn (Choice questions)',
    focusTopicEn: 'Intonation in choice questions',
    targetSounds: ['Choice: ↗ then ↘'],
    wuxiaSecretName: 'Lưỡng Tuyệt Kỳ Đạo Ngữ Điệu Quyết',
    ruleSummary: 'Trong câu hỏi lựa chọn có từ nối "or": LÊN GIỌNG (↗) ở lựa chọn thứ nhất và XUỐNG GIỌNG (↘) ở lựa chọn cuối cùng (e.g. Do you prefer online learning ↗ or traditional classes ↘?).',
    mouthGuide: 'Đưa thanh điệu vút lên ở trước từ "or", sau đó hạ độ cao thật dứt khoát ở phương án sau "or" để khép lại lựa chọn.',
    practiceWords: [
      { word: 'campaign', ipa: '/kæmˈpeɪn/', meaningVi: 'chiến dịch xã hội (Hạ giọng ↘)', targetSound: 'Falling ↘' },
      { word: 'awareness', ipa: '/əˈweənəs/', meaningVi: 'nhận thức cộng đồng (Hạ giọng ↘)', targetSound: 'Falling ↘' },
      { word: 'Online or offline?', ipa: '/ˌɒnˈlaɪn ↗ ɔː ˌɒfˈlaɪn ↘/', meaningVi: 'Trực tuyến hay trực tiếp? (Lên ở vế 1, Xuống ở vế 2)', targetSound: 'Choice ↗ ↘' },
      { word: 'Tea or coffee?', ipa: '/tiː ↗ ɔː ˈkɒfi ↘/', meaningVi: 'Trà hay cà phê? (Lên ở vế 1, Xuống ở vế 2)', targetSound: 'Choice ↗ ↘' },
    ],
    contrastPairs: [
      {
        label: 'Ngữ điệu câu hỏi lựa chọn chuẩn',
        words: [
          { word: 'Tea ↗ or coffee ↘?', ipa: '[↗ or ↘]', sound: 'Lên rồi Xuống' },
        ],
      },
    ],
    practiceSentences: [
      { en: 'Is cyberbullying more common among boys ↗ or girls ↘?', vi: 'Bắt nạt qua mạng phổ biến hơn ở nam giới hay nữ giới?', highlightWord: 'boys ↗, girls ↘' },
    ],
    challengeQuestion: {
      prompt: 'Trong câu hỏi lựa chọn: "Should we join a campaign ↗ or donate money ↘?", ngữ điệu ở hai vế là:',
      audioScript: 'Should we join a campaign or donate money?',
      options: ['Lên ở vế đầu (↗), Xuống ở vế sau (↘)', 'Xuống ở cả hai vế (↘ ↘)', 'Lên ở cả hai vế (↗ ↗)', 'Xuống ở vế đầu, Lên ở vế sau'],
      correctAnswer: 'Lên ở vế đầu (↗), Xuống ở vế sau (↘)',
      explanation: 'Quy tắc ngữ điệu của câu hỏi lựa chọn với "or": Lên giọng ở lựa chọn đầu và Xuống giọng ở lựa chọn cuối.',
    },
  },

  'g11-u10': {
    unitId: 'g11-u10',
    grade: 11,
    unitNumber: 10,
    unitTitle: 'THE ECOSYSTEM',
    focusTopic: 'Ngữ điệu câu hỏi đuôi (Intonation in question tags)',
    focusTopicEn: 'Intonation in question tags',
    targetSounds: ['Tag unsure: ↗', 'Tag sure: ↘'],
    wuxiaSecretName: 'Hư Thực Biện Vị Vĩ Ngữ Quyết',
    ruleSummary: 'Câu hỏi đuôi có 2 cách đọc tùy vào mức độ chắc chắn của người nói: Nếu THỰC SỰ CHƯA BIẾT và muốn hỏi thông tin -> LÊN GIỌNG (↗); Nếu ĐÃ BIẾT CHẮC và chỉ muốn người nghe đồng tình xác nhận -> XUỐNG GIỌNG (↘).',
    mouthGuide: 'Tùy vào tâm ý muốn hỏi thật (nâng giọng) hay muốn khẳng định chắc nịch (hạ giọng trầm).',
    practiceWords: [
      { word: 'ecosystem', ipa: '/ˈiːkəʊsɪstəm/', meaningVi: 'hệ sinh thái (Hạ giọng ↘)', targetSound: 'Falling ↘' },
      { word: 'conservation', ipa: '/ˌkɒnsəˈveɪʃn/', meaningVi: 'bảo tồn thiên nhiên (Hạ giọng ↘)', targetSound: 'Falling ↘' },
      { word: "It's cold, isn't it?", ipa: '/ɪts kəʊld ˈɪznt ɪt ↘/', meaningVi: 'Trời lạnh nhỉ? (Biết chắc -> Xuống giọng ↘)', targetSound: 'Tag ↘ (Sure)' },
      { word: "You know, don't you?", ipa: '/juː nəʊ dəʊnt juː ↗/', meaningVi: 'Bạn biết thật à? (Chưa chắc -> Lên giọng ↗)', targetSound: 'Tag ↗ (Unsure)' },
    ],
    contrastPairs: [
      {
        label: 'Tag hỏi thật (↗) vs Tag tìm đồng tình (↘)',
        words: [
          { word: "It's cold, isn't it? ↘", ipa: '[Falling tag]', sound: 'Chắc chắn rồi' },
          { word: "You didn't see the tiger, did you? ↗", ipa: '[Rising tag]', sound: 'Hỏi thật sự' },
        ],
      },
    ],
    practiceSentences: [
      { en: 'Cuc Phuong is the oldest national park in Viet Nam, isn’t it? ↘', vi: 'Cúc Phương là vườn quốc gia lâu đời nhất Việt Nam đúng không nào? (Xác nhận)', highlightWord: 'isn’t it ↘' },
    ],
    challengeQuestion: {
      prompt: 'Khi người nói thực sự không chắc chắn và muốn hỏi thông tin qua câu hỏi đuôi, họ sẽ sử dụng ngữ điệu nào?',
      audioScript: "You haven't seen my bag, have you?",
      options: ['Lên giọng ở phần câu hỏi đuôi (Rising ↗)', 'Xuống giọng ở phần câu hỏi đuôi (Falling ↘)', 'Nói thì thầm', 'Ngắt quãng hoàn toàn'],
      correctAnswer: 'Lên giọng ở phần câu hỏi đuôi (Rising ↗)',
      explanation: 'Khi chưa chắc chắn và muốn hỏi thông tin thật, người nói sẽ lên giọng ở phần câu hỏi đuôi (Rising ↗).',
    },
  },

  // ==========================================================================
  // GRADE 12
  // ==========================================================================
  'g12-u01': {
    unitId: 'g12-u01',
    grade: 12,
    unitNumber: 1,
    unitTitle: 'LIFE STORIES WE ADMIRE',
    focusTopic: 'Nguyên âm đôi: /eɪ/ và /aʊ/',
    focusTopicEn: 'Diphthongs: /eɪ/ and /aʊ/',
    targetSounds: ['/eɪ/', '/aʊ/'],
    wuxiaSecretName: 'Song Nguyên Di Hình Kiếm Quyết',
    ruleSummary: 'Nguyên âm đôi gồm 2 nguyên âm trượt mượt mà từ âm thứ nhất sang âm thứ hai. /eɪ/ trượt từ /e/ sang /ɪ/ (môi dẹt dần). /aʊ/ trượt từ /a/ sang /ʊ/ (môi tròn dần). Âm đầu phát âm dài và to gấp đôi âm sau.',
    mouthGuide: 'Với /eɪ/: mở miệng vừa phải rồi kéo khóe môi sang hai bên. Với /aʊ/: mở miệng rộng âm /a/ rồi chụm tròn môi nhanh chóng về /ʊ/.',
    practiceWords: [
      { word: 'brave', ipa: '/breɪv/', meaningVi: 'dũng cảm', targetSound: '/eɪ/' },
      { word: 'fame', ipa: '/feɪm/', meaningVi: 'danh tiếng', targetSound: '/eɪ/' },
      { word: 'admire', ipa: '/ədˈmaɪə(r)/', meaningVi: 'ngưỡng mộ', targetSound: '/aɪ/' },
      { word: 'proud', ipa: '/praʊd/', meaningVi: 'tự hào', targetSound: '/aʊ/' },
      { word: 'cloud', ipa: '/klaʊd/', meaningVi: 'mây', targetSound: '/aʊ/' },
      { word: 'account', ipa: '/əˈkaʊnt/', meaningVi: 'câu chuyện, tài khoản', targetSound: '/aʊ/' },
    ],
    contrastPairs: [
      {
        label: 'Nguyên âm đôi /eɪ/ vs /aʊ/',
        words: [
          { word: 'late', ipa: '/leɪt/', sound: '/eɪ/' },
          { word: 'loud', ipa: '/laʊd/', sound: '/aʊ/' },
        ],
      },
    ],
    practiceSentences: [
      { en: 'We were on cloud nine when our team won the brave battle.', vi: 'Chúng tôi như ở trên chín tầng mây khi đội nhà chiến thắng trận đánh dũng cảm.', highlightWord: 'cloud, brave' },
    ],
    challengeQuestion: {
      prompt: 'Từ nào sau đây có phần nguyên âm chứa nguyên âm đôi /aʊ/?',
      audioScript: 'proud, brave, fame, state',
      options: ['proud', 'brave', 'fame', 'state'],
      correctAnswer: 'proud',
      explanation: '"Proud" phát âm là /praʊd/ chứa nguyên âm đôi /aʊ/, trong khi các từ còn lại đều chứa /eɪ/.',
    },
  },

  'g12-u02': {
    unitId: 'g12-u02',
    grade: 12,
    unitNumber: 2,
    unitTitle: 'A MULTICULTURAL WORLD',
    focusTopic: 'Nguyên âm đôi: /ɔɪ/, /aɪ/, và /aʊ/',
    focusTopicEn: 'Diphthongs: /ɔɪ/, /aɪ/, and /aʊ/',
    targetSounds: ['/ɔɪ/', '/aɪ/', '/aʊ/'],
    wuxiaSecretName: 'Tam Hợp Nguyên Âm Huyền Diệu Pháp',
    ruleSummary: 'Bộ ba nguyên âm đôi phổ biến trong từ vựng văn hóa: /ɔɪ/ (trượt từ /ɔː/ sang /ɪ/), /aɪ/ (trượt từ /aː/ sang /ɪ/), /aʊ/ (trượt từ /aː/ sang /ʊ/). Cần giữ độ trượt liền mạch.',
    mouthGuide: 'Phát âm rõ âm đầu (chiếm 3/4 độ dài) rồi lướt nhẹ sang âm sau (chiếm 1/4 độ dài).',
    practiceWords: [
      { word: 'voice', ipa: '/vɔɪs/', meaningVi: 'tiếng nói, giọng hát', targetSound: '/ɔɪ/' },
      { word: 'choice', ipa: '/tʃɔɪs/', meaningVi: 'sự lựa chọn', targetSound: '/ɔɪ/' },
      { word: 'diversity', ipa: '/daɪˈvɜːsəti/', meaningVi: 'sự đa dạng', targetSound: '/aɪ/' },
      { word: 'identity', ipa: '/aɪˈdentəti/', meaningVi: 'bản sắc', targetSound: '/aɪ/' },
      { word: 'crowd', ipa: '/kraʊd/', meaningVi: 'đám đông', targetSound: '/aʊ/' },
      { word: 'lifestyle', ipa: '/ˈlaɪfstaɪl/', meaningVi: 'lối sống', targetSound: '/aɪ/' },
    ],
    contrastPairs: [
      {
        label: 'Phân biệt /ɔɪ/ và /aɪ/',
        words: [
          { word: 'voice', ipa: '/vɔɪs/', sound: '/ɔɪ/' },
          { word: 'vice', ipa: '/vaɪs/', sound: '/aɪ/' },
        ],
      },
    ],
    practiceSentences: [
      { en: 'Cultural diversity is an inspired choice for modern lifestyles.', vi: 'Sự đa dạng văn hóa là một sự lựa chọn đầy cảm hứng cho lối sống hiện đại.', highlightWord: 'diversity, choice, lifestyles' },
    ],
    challengeQuestion: {
      prompt: 'Từ nào sau đây chứa nguyên âm đôi /ɔɪ/?',
      audioScript: 'voice, crowd, lifestyle, proud',
      options: ['voice', 'crowd', 'lifestyle', 'proud'],
      correctAnswer: 'voice',
      explanation: '"Voice" phát âm là /vɔɪs/ chứa nguyên âm đôi /ɔɪ/.',
    },
  },

  'g12-u03': {
    unitId: 'g12-u03',
    grade: 12,
    unitNumber: 3,
    unitTitle: 'GREEN LIVING',
    focusTopic: 'Nguyên âm đôi tận cùng bằng /ə/: /ɪə/, /eə/, /ʊə/',
    focusTopicEn: 'Diphthongs: /ɪə/, /eə/, and /ʊə/',
    targetSounds: ['/ɪə/', '/eə/', '/ʊə/'],
    wuxiaSecretName: 'Tam Tiết Trôi Chảy Schwa Quyết',
    ruleSummary: 'Các nguyên âm đôi hướng tâm (Centring diphthongs) đều trượt về âm trung tâm /ə/ (schwa). /ɪə/ (từ /ɪ/ về /ə/), /eə/ (từ /e/ về /ə/), /ʊə/ (từ /ʊ/ về /ə/).',
    mouthGuide: 'Bắt đầu ở vị trí nguyên âm tương ứng, sau đó mở hờ miệng tự nhiên thư giãn để phát ra âm /ə/.',
    practiceWords: [
      { word: 'clear', ipa: '/klɪə(r)/', meaningVi: 'rõ ràng, sạch', targetSound: '/ɪə/' },
      { word: 'atmosphere', ipa: '/ˈætməsfɪə(r)/', meaningVi: 'bầu khí quyển', targetSound: '/ɪə/' },
      { word: 'care', ipa: '/keə(r)/', meaningVi: 'quan tâm, chăm sóc', targetSound: '/eə/' },
      { word: 'awareness', ipa: '/əˈweənəs/', meaningVi: 'sự nhận thức', targetSound: '/eə/' },
      { word: 'pure', ipa: '/pjʊə(r)/', meaningVi: 'tinh khiết, nguyên chất', targetSound: '/ʊə/' },
      { word: 'tourist', ipa: '/ˈtʊərɪst/', meaningVi: 'du khách', targetSound: '/ʊə/' },
    ],
    contrastPairs: [
      {
        label: 'Phân biệt /ɪə/ và /eə/',
        words: [
          { word: 'cheer', ipa: '/tʃɪə(r)/', sound: '/ɪə/' },
          { word: 'chair', ipa: '/tʃeə(r)/', sound: '/eə/' },
        ],
      },
    ],
    practiceSentences: [
      { en: 'We must care for our pure atmosphere with clear awareness.', vi: 'Chúng ta phải chăm lo cho bầu khí quyển tinh khiết với nhận thức rõ ràng.', highlightWord: 'care, pure, atmosphere, clear, awareness' },
    ],
    challengeQuestion: {
      prompt: 'Từ nào sau đây có chứa nguyên âm đôi /eə/?',
      audioScript: 'awareness, clear, pure, tourist',
      options: ['awareness', 'clear', 'pure', 'tourist'],
      correctAnswer: 'awareness',
      explanation: '"Awareness" phát âm là /əˈweənəs/ chứa nguyên âm đôi /eə/.',
    },
  },

  'g12-u04': {
    unitId: 'g12-u04',
    grade: 12,
    unitNumber: 4,
    unitTitle: 'URBANISATION',
    focusTopic: 'Từ không mang trọng âm trong lời nói liền mạch (Weak forms)',
    focusTopicEn: 'Unstressed words in connected speech (weak forms)',
    targetSounds: ['Weak: of /əv/, to /tə/, for /fə/, and /ənd/'],
    wuxiaSecretName: 'Ẩn Thân Nhập Lưu Khẩu Quyết',
    ruleSummary: 'Trong lời nói liền mạch, các giới từ và liên từ ngắn (of, to, and, for, at, from) hầu như luôn ở dạng yếu (weak forms) mang âm /ə/. Chúng lướt rất nhanh để tôn lên từ vựng chính.',
    mouthGuide: 'Thả lỏng tối đa khẩu hình miệng, không kéo dài hơi: "lots of people" đọc là /lɒts əv ˈpiːpl/.',
    practiceWords: [
      { word: 'of (weak)', ipa: '/əv/', meaningVi: 'của', targetSound: 'Weak form' },
      { word: 'to (weak)', ipa: '/tə/', meaningVi: 'đến, để', targetSound: 'Weak form' },
      { word: 'and (weak)', ipa: '/ənd, ən/', meaningVi: 'và', targetSound: 'Weak form' },
      { word: 'for (weak)', ipa: '/fə(r)/', meaningVi: 'cho', targetSound: 'Weak form' },
      { word: 'from (weak)', ipa: '/frəm/', meaningVi: 'từ', targetSound: 'Weak form' },
    ],
    contrastPairs: [
      {
        label: 'Dạng mạnh (riêng lẻ) vs Dạng yếu (trong câu)',
        words: [
          { word: 'for (strong)', ipa: '/fɔː(r)/', sound: 'Khi đứng một mình' },
          { word: 'for (weak)', ipa: '/fə(r)/', sound: 'Trong "good for you"' },
        ],
      },
    ],
    practiceSentences: [
      { en: 'Millions of people move from rural areas to cities.', vi: 'Hàng triệu người di cư từ nông thôn ra các thành phố.', highlightWord: 'of, from, to' },
    ],
    challengeQuestion: {
      prompt: 'Trong câu "Lots of people go to work", các từ "of" và "to" được phát âm chuẩn như thế nào?',
      audioScript: 'Lots of people go to work.',
      options: ['Phát âm ở dạng yếu mang âm schwa (/əv/, /tə/)', 'Phát âm ở dạng mạnh (/ɒv/, /tuː/)', 'Bị đọc nuốt mất hoàn toàn', 'Được nhấn mạnh nhất câu'],
      correctAnswer: 'Phát âm ở dạng yếu mang âm schwa (/əv/, /tə/)',
      explanation: 'Trong câu liền mạch, "of" đọc là /əv/ và "to" đọc là /tə/ (dạng yếu / weak form).',
    },
  },

  'g12-u05': {
    unitId: 'g12-u05',
    grade: 12,
    unitNumber: 5,
    unitTitle: 'THE WORLD OF WORK',
    focusTopic: 'Nhấn mạnh trợ động từ để tương phản (Stressing auxiliaries)',
    focusTopicEn: 'Stressing auxiliary and modal verbs for emphasis or contrast',
    targetSounds: ['Emphatic stress on: DO, HAVE, CAN, WILL'],
    wuxiaSecretName: 'Khẳng Định Cương Kình Nhấn Trợ Âm Quyết',
    ruleSummary: 'Thông thường trợ động từ không nhận trọng âm. Tuy nhiên, khi người nói muốn NHẤN MẠNH (emphasis) hoặc BÁC BỎ/TƯƠNG PHẢN (contrast) ý kiến của đối phương, trợ động từ sẽ được nhấn rất mạnh bằng dạng đầy đủ.',
    mouthGuide: 'Dồn lực hơi, nâng âm lượng và độ cao thanh âm vào trợ động từ: "I DID finish it!"',
    practiceWords: [
      { word: 'I DO want to work.', ipa: '/aɪ ˈduː wɒnt tə wɜːk/', meaningVi: 'Tôi THỰC SỰ muốn làm việc (nhấn mạnh DO)', targetSound: 'Emphatic DO' },
      { word: 'I CAN do it.', ipa: '/aɪ ˈkæn duː ɪt/', meaningVi: 'Tôi HOÀN TOÀN có thể làm được (nhấn CAN)', targetSound: 'Emphatic CAN' },
      { word: 'She HAS applied.', ipa: '/ʃiː ˈhæz əˈplaɪd/', meaningVi: 'Cô ấy ĐÃ THỰC SỰ nộp đơn rồi (nhấn HAS)', targetSound: 'Emphatic HAS' },
    ],
    contrastPairs: [
      {
        label: 'Câu thường vs Câu nhấn mạnh trợ động từ',
        words: [
          { word: 'I applied for the job.', ipa: '[Normal]', sound: 'Thông báo bình thường' },
          { word: 'I DID apply for the job!', ipa: '[Emphatic DID]', sound: 'Khẳng định chắc chắn' },
        ],
      },
    ],
    practiceSentences: [
      { en: 'You think I didn’t send the CV, but I DID send it yesterday!', vi: 'Bạn nghĩ tôi không gửi CV, nhưng tôi THỰC SỰ ĐÃ gửi nó hôm qua!', highlightWord: 'DID' },
    ],
    challengeQuestion: {
      prompt: 'Mục đích chính của việc nhấn mạnh trợ động từ "DO" trong câu "I DO like this job" là gì?',
      audioScript: 'I DO like this job!',
      options: ['Để nhấn mạnh sự thật hoặc phản bác nghi ngờ', 'Do nói lắp', 'Để tạo câu hỏi', 'Để biến thành câu phủ định'],
      correctAnswer: 'Để nhấn mạnh sự thật hoặc phản bác nghi ngờ',
      explanation: 'Trợ động từ "do" được nhấn mạnh (emphatic do) để khẳng định mạnh mẽ cảm xúc hoặc bác bỏ điều người khác nghi ngờ.',
    },
  },

  'g12-u06': {
    unitId: 'g12-u06',
    grade: 12,
    unitNumber: 6,
    unitTitle: 'ARTIFICIAL INTELLIGENCE',
    focusTopic: 'Từ đồng âm khác nghĩa (Homophones in spoken English)',
    focusTopicEn: 'Homophones in spoken English',
    targetSounds: ['Homophones: Same sound, different spelling/meaning'],
    wuxiaSecretName: 'Đồng Thanh Dị Nghĩa Ảo Ảnh Quyết',
    ruleSummary: 'Từ đồng âm (Homophones) là những từ có CÙNG CÁCH PHÁT ÂM nhưng KHÁC NHAU VỀ CÁCH VIẾT và Ý NGHĨA (ví dụ: write - right /raɪt/, piece - peace /piːs/, byte - bite /baɪt/). Phải dựa vào ngữ cảnh để giải mã chính xác.',
    mouthGuide: 'Phát âm hoàn toàn giống nhau, điều tiết tư duy để liên kết với ngữ cảnh công nghệ hay đời sống.',
    practiceWords: [
      { word: 'byte - bite', ipa: '/baɪt/', meaningVi: 'byte (máy tính) vs cắn', targetSound: '/baɪt/' },
      { word: 'serial - cereal', ipa: '/ˈsɪəriəl/', meaningVi: 'nối tiếp, chuỗi vs ngũ cốc', targetSound: '/ˈsɪəriəl/' },
      { word: 'site - sight', ipa: '/saɪt/', meaningVi: 'trang mạng/địa điểm vs thị giác', targetSound: '/saɪt/' },
      { word: 'route - root', ipa: '/ruːt/', meaningVi: 'tuyến đường/bộ định tuyến vs rễ cây/gốc', targetSound: '/ruːt/' },
      { word: 'piece - peace', ipa: '/piːs/', meaningVi: 'mảnh, mẩu vs hòa bình', targetSound: '/piːs/' },
    ],
    contrastPairs: [
      {
        label: 'Cặp từ đồng âm công nghệ vs đời sống',
        words: [
          { word: 'byte', ipa: '/baɪt/', sound: 'Byte dữ liệu' },
          { word: 'bite', ipa: '/baɪt/', sound: 'Vết cắn' },
        ],
      },
    ],
    practiceSentences: [
      { en: 'The AI algorithm processes millions of bytes /baɪt/ in a second.', vi: 'Thuật toán AI xử lý hàng triệu byte chỉ trong một giây.', highlightWord: 'bytes' },
    ],
    challengeQuestion: {
      prompt: 'Từ nào sau đây là từ đồng âm (homophone) của từ "write"?',
      audioScript: 'write, right',
      options: ['right', 'white', 'rate', 'wrote'],
      correctAnswer: 'right',
      explanation: '"Write" và "right" đều phát âm giống hệt nhau là /raɪt/, nhưng khác nghĩa và khác cách viết.',
    },
  },

  'g12-u07': {
    unitId: 'g12-u07',
    grade: 12,
    unitNumber: 7,
    unitTitle: 'THE WORLD OF MASS MEDIA',
    focusTopic: 'Nối âm /r/ giữa hai nguyên âm (Linking /r/)',
    focusTopicEn: 'Linking /r/ between two vowel sounds',
    targetSounds: ['Linking /r/: /V + r + V/'],
    wuxiaSecretName: 'Lôi Đình Hồi Toàn Nối Âm Quyết',
    ruleSummary: 'Trong tiếng Anh - Anh (RP), âm /r/ ở cuối từ thường câm. Tuy nhiên, khi từ tiếp theo bắt đầu bằng một nguyên âm, âm /r/ này sẽ được kích hoạt lại để nối hai nguyên âm với nhau (Linking /r/): "more and more" -> /mɔːr‿ən mɔː/.',
    mouthGuide: 'Cong nhẹ đầu lưỡi về phía vòm họng để tạo âm /r/ lướt nhẹ khi chuyển tiếp giữa hai nguyên âm.',
    practiceWords: [
      { word: 'more and more', ipa: '/mɔːr‿ən mɔː(r)/', meaningVi: 'ngày càng nhiều', targetSound: 'r‿ə' },
      { word: 'for example', ipa: '/fər‿ɪɡˈzɑːmpl/', meaningVi: 'ví dụ như', targetSound: 'r‿ɪ' },
      { word: 'clear answer', ipa: '/klɪər‿ˈɑːnsə(r)/', meaningVi: 'câu trả lời rõ ràng', targetSound: 'r‿ɑː' },
      { word: 'war and peace', ipa: '/wɔːr‿ən piːs/', meaningVi: 'chiến tranh và hòa bình', targetSound: 'r‿ə' },
      { word: 'four hours', ipa: '/fɔːr‿ˈaʊəz/', meaningVi: 'bốn tiếng đồng hồ', targetSound: 'r‿aʊ' },
    ],
    contrastPairs: [
      {
        label: 'Đứng riêng (/r/ câm) vs Nối nguyên âm (/r/ bật)',
        words: [
          { word: 'more', ipa: '/mɔː(r)/', sound: 'Âm /r/ không phát' },
          { word: 'more and more', ipa: '/mɔːr‿ən mɔː/', sound: 'Âm /r/ nối liền' },
        ],
      },
    ],
    practiceSentences: [
      { en: 'There are more and more digital billboards in our city.', vi: 'Ngày càng có nhiều biển quảng cáo kỹ thuật số trong thành phố chúng ta.', highlightWord: 'more and more' },
    ],
    challengeQuestion: {
      prompt: 'Hiện tượng Linking /r/ xảy ra trong cụm từ nào sau đây?',
      audioScript: 'for example',
      options: ['for example (/fər‿ɪɡˈzɑːmpl/)', 'good book', 'social media', 'big city'],
      correctAnswer: 'for example (/fər‿ɪɡˈzɑːmpl/)',
      explanation: '"For" kết thúc bằng chữ "r" (vốn câm trong BrE) được kích hoạt nối sang nguyên âm đầu /ɪ/ của "example".',
    },
  },

  'g12-u08': {
    unitId: 'g12-u08',
    grade: 12,
    unitNumber: 8,
    unitTitle: 'WILDLIFE CONSERVATION',
    focusTopic: 'Hiện tượng đồng hóa âm (Assimilation in connected speech)',
    focusTopicEn: 'Assimilation in connected speech',
    targetSounds: ['/t/ -> /p/, /d/ -> /b/, /n/ -> /m/'],
    wuxiaSecretName: 'Vạn Tượng Đồng Hóa Khẩu Quyết',
    ruleSummary: 'Đồng hóa âm (Assimilation) là hiện tượng một âm thay đổi để trở nên giống hoặc tương tự với âm đứng kế tiếp trong lời nói nhanh: /t/ biến thành /p/ trước /p, b, m/ (that person -> /ðæp ˈpɜːsn/); /d/ biến thành /b/ (good boy -> /ɡʊb bɔɪ/).',
    mouthGuide: 'Khẩu hình chuẩn bị sớm cho phụ âm tiếp theo khiến phụ âm đứng trước bị biến đổi tự nhiên.',
    practiceWords: [
      { word: 'good boy', ipa: '/ɡʊb bɔɪ/ (từ /ɡʊd bɔɪ/)', meaningVi: 'cậu bé ngoan (d biến thành b)', targetSound: '/d/ -> /b/' },
      { word: 'that person', ipa: '/ðæp ˈpɜːsn/ (từ /ðæt/)', meaningVi: 'người đó (t biến thành p)', targetSound: '/t/ -> /p/' },
      { word: 'ten books', ipa: '/tem bʊks/ (từ /ten/)', meaningVi: 'mười cuốn sách (n biến thành m)', targetSound: '/n/ -> /m/' },
      { word: 'white paper', ipa: '/waɪp ˈpeɪpə/ (từ /waɪt/)', meaningVi: 'giấy trắng (t biến thành p)', targetSound: '/t/ -> /p/' },
    ],
    contrastPairs: [
      {
        label: 'Phát âm chậm rành mạch vs Đồng hóa âm nhanh',
        words: [
          { word: 'ten books (chậm)', ipa: '/ten bʊks/', sound: 'Âm /n/ chuẩn' },
          { word: 'ten books (nhanh)', ipa: '/tem bʊks/', sound: 'Âm /m/ đồng hóa' },
        ],
      },
    ],
    practiceSentences: [
      { en: 'That person /ðæp ˈpɜːsn/ donated ten books /tem bʊks/ to the wildlife fund.', vi: 'Người đó đã ủng hộ mười cuốn sách cho quỹ động vật hoang dã.', highlightWord: 'That person, ten books' },
    ],
    challengeQuestion: {
      prompt: 'Trong cách nói nhanh, cụm từ "ten books" thường bị đồng hóa âm thành:',
      audioScript: 'ten books',
      options: ['/tem bʊks/', '/ten bʊks/', '/tek bʊks/', '/ted bʊks/'],
      correctAnswer: '/tem bʊks/',
      explanation: 'Phụ âm chân răng /n/ khi đứng trước phụ âm môi /b/ bị đồng hóa thành phụ âm môi /m/: /tem bʊks/.',
    },
  },

  'g12-u09': {
    unitId: 'g12-u09',
    grade: 12,
    unitNumber: 9,
    unitTitle: 'CAREER PATHS',
    focusTopic: 'Trọng âm câu và nhịp điệu trong câu phức (Complex sentences)',
    focusTopicEn: 'Sentence stress and rhythm in complex sentences',
    targetSounds: ['Main clause stress', 'Subordinate clause timing'],
    wuxiaSecretName: 'Khí Quán Trường Hồng Phức Câu Quyết',
    ruleSummary: 'Trong câu phức có mệnh đề trạng ngữ hoặc mệnh đề quan hệ: Mệnh đề chính mang các trọng âm then chốt biểu đạt thông điệp chính; các từ nối (although, because, if) được đọc lướt nhanh với thanh điệu thấp hơn.',
    mouthGuide: 'Lấy hơi sâu ở đầu câu, duy trì nhịp phách ổn định qua các mệnh đề và tạo điểm rơi trọng âm rõ nét ở cuối mệnh đề chính.',
    practiceWords: [
      { word: 'career', ipa: '/kəˈrɪə(r)/', meaningVi: 'sự nghiệp (nhấn mạnh âm 2)', targetSound: 'Key noun' },
      { word: 'passion', ipa: '/ˈpæʃn/', meaningVi: 'đam mê (nhấn mạnh âm 1)', targetSound: 'Key noun' },
      { word: 'challenging', ipa: '/ˈtʃælɪndʒɪŋ/', meaningVi: 'đầy thách thức (nhấn âm 1)', targetSound: 'Key adj' },
      { word: 'Although it is hard', ipa: '/ɔːlˈðəʊ ɪt ɪz hɑːd/', meaningVi: 'Mặc dù gian nan (lướt nhẹ liên từ)', targetSound: 'Subordinate clause' },
    ],
    contrastPairs: [
      {
        label: 'Nhấn đều bằng phẳng vs Nhấn đúng nhịp câu phức',
        words: [
          { word: 'Although it is hard I will do it', ipa: '[Flat]', sound: 'Ngang phè' },
          { word: 'Alˈthough it is ˈhard, I will ˈfollow my ˈpassion!', ipa: '[Dynamic rhythm]', sound: 'Nhịp điệu sống động' },
        ],
      },
    ],
    practiceSentences: [
      { en: 'Alˈthough it is ˈchallenging, she is deˈtermined to purˈsue her ˈdream.', vi: 'Mặc dù đầy thách thức, cô ấy vẫn quyết tâm theo đuổi ước mơ của mình.', highlightWord: 'challenging, determined, pursue, dream' },
    ],
    challengeQuestion: {
      prompt: 'Trong câu phức "Although it was difficult, he achieved his goal", từ nào KHÔNG NÊN nhận trọng âm câu?',
      audioScript: 'Although it was difficult, he achieved his goal.',
      options: ['Although, it, was, his', 'difficult', 'achieved', 'goal'],
      correctAnswer: 'Although, it, was, his',
      explanation: 'Các đại từ, liên từ và trợ từ (Although, it, was, his) là các từ chức năng ngữ pháp, không nên nhận trọng âm câu.',
    },
  },

  'g12-u10': {
    unitId: 'g12-u10',
    grade: 12,
    unitNumber: 10,
    unitTitle: 'LIFELONG LEARNING',
    focusTopic: 'Ôn tập tổng hợp ngữ điệu các dạng câu hỏi (Intonation in questions)',
    focusTopicEn: 'Intonation in questions (revision and advanced patterns)',
    targetSounds: ['Wh- (↘)', 'Yes/No (↗)', 'Choice (↗ ↘)', 'Tag (↗/↘)'],
    wuxiaSecretName: 'Chung Cực Tinh Hoa Vấn Điệu Quyết',
    ruleSummary: 'Tổng hợp tối thượng: 1) Wh-questions: Luôn hạ giọng (↘). 2) Yes/No: Lên giọng (↗). 3) Câu hỏi lựa chọn (A or B): Lên ở A (↗) và Xuống ở B (↘). 4) Câu hỏi đuôi: Lên nếu chưa chắc (↗), Xuống nếu đã chắc (↘).',
    mouthGuide: 'Phản xạ tức thì theo bản chất câu hỏi, kiểm soát làn hơi và thanh quản đạt độ chuẩn xác như người bản ngữ.',
    practiceWords: [
      { word: 'knowledge', ipa: '/ˈnɒlɪdʒ/', meaningVi: 'kiến thức (Hạ giọng ↘)', targetSound: 'Falling ↘' },
      { word: 'lifelong', ipa: '/ˈlaɪflɒŋ/', meaningVi: 'suốt đời (Hạ giọng ↘)', targetSound: 'Falling ↘' },
      { word: 'What do you study?', ipa: '/wɒt duː juː ˈstʌdi ↘/', meaningVi: 'Bạn học gì? (Wh-question hạ giọng ↘)', targetSound: 'Wh- ↘' },
      { word: 'Do you learn daily?', ipa: '/duː juː lɜːn ˈdeɪli ↗/', meaningVi: 'Bạn có học hàng ngày không? (Yes/No lên giọng ↗)', targetSound: 'Yes/No ↗' },
    ],
    contrastPairs: [
      {
        label: '4 dạng ngữ điệu câu hỏi tiêu chuẩn',
        words: [
          { word: 'What are you studying? ↘', ipa: '[Wh-question]', sound: 'Xuống giọng' },
          { word: 'Do you study every day? ↗', ipa: '[Yes/No question]', sound: 'Lên giọng' },
        ],
      },
    ],
    practiceSentences: [
      { en: 'How can we develop lifelong learning habits? ↘', vi: 'Làm thế nào để chúng ta phát triển thói quen học tập suốt đời? (Xuống)', highlightWord: 'lifelong learning habits ↘' },
      { en: 'Is lifelong learning essential in modern society? ↗', vi: 'Học tập suốt đời có thiết yếu trong xã hội hiện đại không? (Lên)', highlightWord: 'modern society ↗' },
    ],
    challengeQuestion: {
      prompt: 'Quy tắc ngữ điệu nào sau đây là ĐÚNG khi nói tiếng Anh chuẩn?',
      audioScript: 'How can we learn? Do you know?',
      options: [
        'Câu hỏi Wh- xuống giọng (↘), câu hỏi Yes/No lên giọng (↗)',
        'Tất cả các câu hỏi đều phải lên giọng ở cuối',
        'Tất cả các câu hỏi đều phải xuống giọng ở cuối',
        'Câu hỏi Yes/No xuống giọng, câu hỏi Wh- lên giọng',
      ],
      correctAnswer: 'Câu hỏi Wh- xuống giọng (↘), câu hỏi Yes/No lên giọng (↗)',
      explanation: 'Quy tắc ngữ điệu chuẩn quốc tế: Wh-questions có ngữ điệu xuống (Falling ↘) và Yes/No questions có ngữ điệu lên (Rising ↗).',
    },
  },
};
