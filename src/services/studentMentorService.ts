import { PlayerProfile, StudentQuestStatus } from '../types/game';
import { calculateCongLuc } from './storage';
import { CombatEngine } from './combatEngine';

export const BACH_KHOA_THU_SINH_ID = 'bach_khoa_thu_sinh';

export interface SeniorMentorMeta {
  id: string;
  name: string;
  title: string;
  badgeTitle: string;
  badgeColor: string;
  badgeBg: string;
  borderColor: string;
  spriteKey: string;
  portrait: string;
  sprite: string;
  mainQuote: string;
  catchphrases: {
    universityReality: string;
    grammarBattle: string;
    nightOwlCoding: string;
  };
  introGreeting: string;
}

export const SENIOR_MENTOR_META: SeniorMentorMeta = {
  id: BACH_KHOA_THU_SINH_ID,
  name: 'Bách Khoa thư Sinh Đinh Ngọc Khánh',
  title: 'Đại Sư Huynh Tông Môn',
  badgeTitle: 'Tiền Bối Đại Học • Cố Vấn THPT',
  badgeColor: 'text-purple-300',
  badgeBg: 'bg-purple-950/80 border-purple-500/40',
  borderColor: 'border-purple-500',
  spriteKey: 'bach_khoa_thu_sinh',
  portrait: '/assets/game/characters/npc/portraits/bach_khoa_thu_sinh_v2.png',
  sprite: '/assets/game/characters/npc/bach_khoa_thu_sinh_v2.png',
  mainQuote: '“Đại học không nhàn như giang hồ đồn đâu các đệ... Nhưng qua được ải THPT này, thiên hạ sẽ mở rộng trước mắt!”',
  catchphrases: {
    universityReality: '“Đại học không nhàn như giang hồ đồn đâu các đệ... Nhưng qua được ải THPT này, thiên hạ sẽ mở rộng trước mắt!”',
    grammarBattle: '“Xưa ta cũng từng bị Loạn Ngữ Kiếm Ma \'bón hành\' thì Hiện tại Hoàn thành, nay đỗ đạt trở về truyền lại bí kíp cho sư đệ/sư muội.”',
    nightOwlCoding: '“Thức đêm cày đồ án với fix bug võ công mệt hơn luyện Cửu Âm Chân Kinh!”',
  },
  introGreeting:
    'Chào sư đệ/sư muội! Ta là Bách Khoa thư Sinh Đinh Ngọc Khánh, đệ tử tiền bối đã vượt qua kỳ thi THPT và chinh chiến chốn giảng đường Đại học. Thấy các đệ khổ luyện với Vô Ngôn Ma Giáo, ta trở về tiếp sức với những bí kíp thực chiến nhất!',
};

export interface ExamHackItem {
  id: string;
  category: 'grammar_traps' | 'collocations' | 'confusing_words' | 'reading_cloze';
  categoryTitle: string;
  title: string;
  trapWarning: string;
  mentorTip: string;
  curriculumExample: {
    sentence: string;
    highlight: string;
    correctRule: string;
    explanation: string;
  };
  keyTakeaway: string;
}

export const EXAM_HACKS: ExamHackItem[] = [
  {
    id: 'hack_tense_traps',
    category: 'grammar_traps',
    categoryTitle: 'Bẫy Thì Động Từ & Trạng Từ',
    title: 'Hiện Tại Hoàn Thành vs Quá Khứ Đơn (Bẫy Mốc Thời Gian)',
    trapWarning: 'Đề thi thường lừa học sinh bằng cách chèn từ chỉ thời gian trong quá khứ vào câu có ngữ cảnh kéo dài đến hiện tại!',
    mentorTip: '“Xưa ta cũng từng bị Loạn Ngữ Kiếm Ma \'bón hành\' thì Hiện tại Hoàn thành, nay đỗ đạt trở về truyền lại bí kíp cho sư đệ/sư muội.” Nhớ quy tắc then chốt: Mốc thời gian đã chấm dứt (yesterday, in 2020, ago, when I was...) -> Quá khứ đơn. Ngược lại, có since, for, so far, up to now, over the past years -> Hiện tại hoàn thành!',
    curriculumExample: {
      sentence: '“My father (work) in this eco-friendly factory for 10 years, and he still loves his job.”',
      highlight: 'for 10 years + and he still loves his job',
      correctRule: 'Dùng Present Perfect: "has worked" (hoặc "has been working")',
      explanation: 'Hành động bắt đầu trong quá khứ, kéo dài 10 năm và hiện tại vẫn đang tiếp diễn. Nếu đề đổi thành "...but he retired last year" thì lập tức phải chia Quá khứ đơn "worked"!',
    },
    keyTakeaway: 'Nhớ cấu trúc bẫy đề đại học: "It is the first/second time + S + have/has + V3/ed" (không bao giờ chia thì tương lai hay hiện tại đơn)!',
  },
  {
    id: 'hack_collocations',
    category: 'collocations',
    categoryTitle: 'Cụm Từ Cố Định (Collocations)',
    title: 'Collocations "Vàng" Chủ Đề Gia Đình & Môi Trường',
    trapWarning: 'Dịch word-by-word từ tiếng Việt sang tiếng Anh sẽ chọn sai động từ đi kèm trong câu hỏi trắc nghiệm từ vựng!',
    mentorTip: 'Đừng bao giờ nói "make household chores" hay "destroy carbon footprint"! Trong tiếng Anh học thuật, mỗi danh từ chỉ "kết duyên" với một số động từ nhất định.',
    curriculumExample: {
      sentence: '“Young people should learn to _______ household chores and reduce their _______ footprint.”',
      highlight: 'DO chores / REDUCE carbon footprint',
      correctRule: 'DO (hoặc SPLIT/SHARE) chores + REDUCE (hoặc CALCULATE/OFFSET) carbon footprint',
      explanation: 'Trong SGK Lớp 10 Unit 1 & 2: "do chores" (làm việc nhà), "heavy lifting" (việc nặng nhọc), "raise public awareness of" (nâng cao nhận thức). Không dùng make, lower, hay rise.',
    },
    keyTakeaway: 'Ghi sổ tay võ học: DO the laundry/washing-up/dishes, nhưng MAKE the bed/a mess/an effort!',
  },
  {
    id: 'hack_confusing_words',
    category: 'confusing_words',
    categoryTitle: 'Cặp Từ Cực Kỳ Dễ Nhầm',
    title: 'Economic vs Economical & Adopt vs Adapt',
    trapWarning: 'Hai từ nhìn mặt chữ na ná nhau nhưng nghĩa khác một trời một vực, xuất hiện dày đặc ở bài đọc hiểu và sửa lỗi sai!',
    mentorTip: 'Chỉ cần nhớ mẹo nhớ nhanh: Economic có chữ "c" cuối nghĩa là thuộc về Kinh Tế (vĩ mô). Economical dài hơn có đuôi "al" nghĩa là Tiết kiệm (chi tiêu, nhiên liệu)!',
    curriculumExample: {
      sentence: '“Buying a small hybrid car is a very _______ choice for city dwellers during the _______ crisis.”',
      highlight: 'economical (tiết kiệm) vs economic (thuộc kinh tế)',
      correctRule: 'Vị trí 1: economical (tiết kiệm xăng/chi phí) | Vị trí 2: economic (khủng hoảng kinh tế)',
      explanation: 'Tương tự: "adopt a green lifestyle" (áp dụng/tiếp nhận lối sống xanh) khác với "adapt to climate change" (thích nghi với biến đổi khí hậu).',
    },
    keyTakeaway: 'Sensible (biết điều, khôn ngoan) # Sensitive (nhạy cảm, dễ tổn thương/dị ứng).',
  },
  {
    id: 'hack_reading_cloze',
    category: 'reading_cloze',
    categoryTitle: 'Tuyệt Chiêu Đọc Điền & Sửa Lỗi',
    title: 'Quy Tắc Song Hành (Parallelism) & Mệnh Đề Rút Gọn',
    trapWarning: 'Câu dài nhiều thành phần khiến thí sinh hoa mắt và không nhận ra cấu trúc ngữ pháp bị lệch cân đối.',
    mentorTip: '“Thức đêm cày đồ án với fix bug võ công mệt hơn luyện Cửu Âm Chân Kinh!” Nhưng khi làm đề, hễ thấy AND, OR, BUT thì hai vế phải song song đồng dạng: V-ing and V-ing, Adj and Adj, Noun and Noun.',
    curriculumExample: {
      sentence: '“The community project focuses on cleaning streets, planting trees, and _______ local awareness.”',
      highlight: 'cleaning..., planting..., and RAISING...',
      correctRule: 'Chọn "raising" để đồng dạng với cleaning và planting.',
      explanation: 'Nếu đề thi cho các phương án: A. raise, B. to raise, C. raising, D. raised -> Chọn ngay C nhờ quy tắc song hành!',
    },
    keyTakeaway: 'Rút gọn mệnh đề: Nếu chủ ngữ tự làm hành động -> dùng V-ing; Nếu chủ ngữ bị tác động -> dùng V3/ed.',
  },
];

export interface StudentQuestChallenge {
  prompt: string;
  contextText?: string;
  options: Array<{
    id: string;
    text: string;
    isCorrect: boolean;
    feedback: string;
  }>;
  explanation: string;
}

export interface StudentQuestItem {
  id: string;
  title: string;
  badge: string;
  objective: string;
  storyPrompt: string;
  mentorGuidance: string;
  challenge: StudentQuestChallenge;
  reward: {
    xp: number;
    congLuc: number;
    itemTitle: string;
  };
}

export const STUDENT_QUESTS: StudentQuestItem[] = [
  {
    id: 'quest_softskills',
    title: 'Kỳ Ngộ 1: Phản Biện Học Thuật & Đàm Phán Dự Án Nhóm',
    badge: 'Kỹ Năng Mềm Đại Học',
    objective: 'Xử lý tình huống bất đồng ý kiến về deadline bài tập lớn bằng tiếng Anh mang tính xây dựng',
    storyPrompt:
      'Lên đại học, "bài tập nhóm" (group assignment) là thử thách cam go nhất giang hồ! Thành viên trong nhóm của bạn trễ hạn nộp phần việc quan trọng. Đại Sư Huynh muốn xem bạn dùng ngôn từ tiếng Anh nào để nhắc nhở chuyên nghiệp, lịch thiệp mà vẫn đảm bảo tiến độ chung.',
    mentorGuidance:
      'Tuyệt đối không dùng ngôn từ công kích cá nhân hay đổ lỗi. Hãy áp dụng nguyên tắc "Empathy + Urgency + Support" (Thấu cảm + Nêu rõ tính cấp bách + Đề xuất cùng gỡ khó).',
    challenge: {
      prompt: 'Bạn gửi tin nhắn nào sau đây vào kênh chat nhóm để xử lý việc đồng đội trễ hạn nộp slide?',
      contextText: 'Tình huống: Buổi thuyết trình diễn ra sau 2 ngày nữa. Bạn cùng nhóm chưa gửi phần nội dung slide đã hẹn.',
      options: [
        {
          id: 'opt_a',
          text: '“You are completely ruining our team GPA! Finish your part immediately or I will report you to the professor!”',
          isCorrect: false,
          feedback: 'Quá hung hăng và mang tính đe dọa (Aggressive). Cách này chỉ gây rạn nứt tinh thần làm việc nhóm và không giải quyết được vấn đề.',
        },
        {
          id: 'opt_b',
          text: '“Whatever, it’s not my problem anyway. If we fail this project, everyone will know it is your fault.”',
          isCorrect: false,
          feedback: 'Thái độ thờ ơ, vô trách nhiệm (Passive-aggressive). Trong môi trường đại học và làm việc, đây là điều tối kỵ.',
        },
        {
          id: 'opt_c',
          text: '“I understand you might be dealing with a busy schedule. However, our presentation is in two days, so could you please share what you have drafted so far so the team can assist you?”',
          isCorrect: true,
          feedback: 'Xuất sắc! Lời lẽ lịch thiệp, thấu hiểu khó khăn nhưng nêu rõ mốc thời gian và đề xuất hỗ trợ để cả nhóm cùng về đích đúng hạn.',
        },
        {
          id: 'opt_d',
          text: '“Don’t worry at all! Take a rest and do nothing. We will do all your slides for you.”',
          isCorrect: false,
          feedback: 'Dung túng cho sự thiếu kỷ luật và tạo thói quen ỷ lại (Free-riding). Cả nhóm sẽ phải gánh việc bất công.',
        },
      ],
      explanation:
        'Kỹ năng giao tiếp xây dựng (Constructive Communication) trong môi trường đại học yêu cầu tách bạch giữa cảm xúc cá nhân và mục tiêu chung, dùng câu hỏi lịch sự (could you please...) và đề xuất giải pháp cụ thể.',
    },
    reward: {
      xp: 120,
      congLuc: 300,
      itemTitle: 'Bí Điển Kỹ Năng Mềm Đại Học',
    },
  },
  {
    id: 'quest_presentation',
    title: 'Kỳ Ngộ 2: Khí Phách Hùng Biện & Ngôn Ngữ Điều Hướng',
    badge: 'Thuyết Trình Học Thuật',
    objective: 'Làm chủ các cụm từ điều hướng bài thuyết trình (Signposting Language) và xử lý câu hỏi khó từ hội đồng',
    storyPrompt:
      'Đứng trước giảng đường hàng trăm sinh viên và giáo sư phản biện, bài thuyết trình tiếng Anh cần ngôn ngữ điều hướng (Signposting language) để thính giả theo dõi mạch lạc như kiếm pháp lưu chuyển!',
    mentorGuidance:
      'Signposting là những "biển chỉ đường" bằng ngôn từ giúp người nghe biết bạn đang ở phần mở đầu, chuyển ý, dẫn chứng hay tổng kết.',
    challenge: {
      prompt: 'Khi chuyển sang một luận điểm hoàn toàn mới trong bài thuyết trình về phát triển bền vững, câu điều hướng nào sau đây là chuẩn mực nhất?',
      contextText: 'Ngữ cảnh: Bạn vừa trình bày xong phần nguyên nhân rác thải nhựa và muốn chuyển sang phần giải pháp công nghệ.',
      options: [
        {
          id: 'opt_a',
          text: '“Okay, that is done. Now I will speak another random thing about technology.”',
          isCorrect: false,
          feedback: 'Khẩu ngữ vụng về (random thing), thiếu tính học thuật và không tạo được sự liền mạch cho thính giả.',
        },
        {
          id: 'opt_b',
          text: '“Now that we have examined the root causes, let us turn our attention to the innovative technological solutions currently being deployed.”',
          isCorrect: true,
          feedback: 'Rất chuẩn mực! Cụm "Now that we have examined... let us turn our attention to..." là mẫu câu Signposting điểm 10 kết nối mượt mà giữa nguyên nhân và giải pháp.',
        },
        {
          id: 'opt_c',
          text: '“Stop listening to the causes! Solutions are much cooler so listen to me now.”',
          isCorrect: false,
          feedback: 'Thiếu tôn trọng người nghe và dùng từ ngữ suồng sã.',
        },
        {
          id: 'opt_d',
          text: '“I forget what comes next, but maybe we can talk about technology if you guys want.”',
          isCorrect: false,
          feedback: 'Thể hiện sự thiếu chuẩn bị và thiếu tự tin của người thuyết trình.',
        },
      ],
      explanation:
        'Cấu trúc chuyển đoạn thuyết trình kinh điển: [Tóm tắt ý vừa xong] + [Động từ điều hướng: turn to / move on to / focus on] + [Ý mới tiếp theo].',
    },
    reward: {
      xp: 150,
      congLuc: 350,
      itemTitle: 'Ngọc Bội Hùng Biện Giảng Đường',
    },
  },
  {
    id: 'quest_academic_essay',
    title: 'Kỳ Ngộ 3: Bút Trận Luận Văn & Cấu Trúc Câu Luận Đề',
    badge: 'Viết Luận Học Thuật',
    objective: 'Nhận diện câu Luận Đề (Thesis Statement) sắc bén và loại trừ văn phong khẩu ngữ trong bài luận học thuật',
    storyPrompt:
      'Bài luận đại học (Academic Essay) tối kỵ lối viết cảm tính và khẩu ngữ nói chuyện phiếm. Câu Luận Đề (Thesis Statement) ở cuối đoạn mở bài phải như mũi tên nhắm trúng hồng tâm, vạch rõ lập trường và phạm vi nghị luận.',
    mentorGuidance:
      'Một Thesis Statement đạt chuẩn phải có: Chủ đề + Lập trường rõ ràng + Các nhánh luận điểm chính (hoặc mệnh đề nhượng bộ While/Although). Tránh dùng "I think", "super cool", "a lot of stuff".',
    challenge: {
      prompt: 'Đề bài: "Should secondary schools integrate Artificial Intelligence into learning?" Câu nào sau đây là Thesis Statement đạt chuẩn học thuật cao nhất?',
      contextText: 'Yêu cầu: Chọn câu thể hiện tư duy đa chiều, văn phong trang trọng (formal academic tone) và tính lập luận chặt chẽ.',
      options: [
        {
          id: 'opt_a',
          text: '“In this essay I will talk about AI and I think it is super awesome for high school students because it is fun.”',
          isCorrect: false,
          feedback: 'Văn phong khẩu ngữ (super awesome, fun) và thông báo lộ trình thô sơ (In this essay I will talk about...), thiếu chiều sâu lập luận.',
        },
        {
          id: 'opt_b',
          text: '“AI is totally evil and will definitely replace all human teachers tomorrow so we must ban it immediately.”',
          isCorrect: false,
          feedback: 'Khẳng định cực đoan cảm tính (totally evil, ban immediately), không phù hợp với văn phong học thuật khách quan.',
        },
        {
          id: 'opt_c',
          text: '“While the integration of Artificial Intelligence poses challenges regarding academic integrity, it significantly enhances personalized learning and critical thinking when supported by proper pedagogical guidelines.”',
          isCorrect: true,
          feedback: 'Tuyệt đỉnh! Cấu trúc câu phức hoàn hảo: Mệnh đề nhượng bộ (While... academic integrity) + Lập trường chính (enhances personalized learning) + Điều kiện bổ trợ (when supported by proper guidelines).',
        },
        {
          id: 'opt_d',
          text: '“There are many pros and cons of AI in schools and I will discuss some of them.”',
          isCorrect: false,
          feedback: 'Quá chung chung, mơ hồ, không thể hiện lập trường rõ ràng của tác giả bài viết.',
        },
      ],
      explanation:
        'Thesis Statement chuẩn Band 8.0+ / học thuật quốc tế luôn sử dụng cấu trúc nhượng bộ (Concession Clause) để chứng minh tác giả đã cân nhắc mọi khía cạnh trước khi đưa ra luận điểm bảo vệ.',
    },
    reward: {
      xp: 200,
      congLuc: 400,
      itemTitle: 'Thanh Phong Bút Thần (Tín Vật Đại Học)',
    },
  },
];

export class StudentMentorService {
  /**
   * Check if NPC is Bách Khoa Thư Sinh
   */
  static isStudentMentor(npcId: string): boolean {
    return npcId === BACH_KHOA_THU_SINH_ID;
  }

  /**
   * Get quest status for a specific student quest
   */
  static getQuestStatus(profile: PlayerProfile, questId: string): StudentQuestStatus {
    if (!profile.studentQuestStates) return 'not_started';
    return profile.studentQuestStates[questId] || 'not_started';
  }

  /**
   * Accept a student quest
   */
  static acceptQuest(profile: PlayerProfile, questId: string): PlayerProfile {
    const updated: PlayerProfile = JSON.parse(JSON.stringify(profile));
    updated.studentQuestStates = updated.studentQuestStates || {};

    const current = updated.studentQuestStates[questId] || 'not_started';
    if (current === 'not_started') {
      updated.studentQuestStates[questId] = 'in_progress';
    }
    return updated;
  }

  /**
   * Mark a student quest exercise solved/completed
   */
  static solveQuest(profile: PlayerProfile, questId: string): PlayerProfile {
    const updated: PlayerProfile = JSON.parse(JSON.stringify(profile));
    updated.studentQuestStates = updated.studentQuestStates || {};

    const current = updated.studentQuestStates[questId] || 'not_started';
    if (current === 'in_progress' || current === 'not_started') {
      updated.studentQuestStates[questId] = 'completed';
    }
    return updated;
  }

  /**
   * Claim reward for a completed student quest (Prevents duplicate reward farming!)
   */
  static claimReward(
    profile: PlayerProfile,
    questId: string
  ): {
    profile: PlayerProfile;
    reward: { xp: number; congLuc: number; itemTitle: string } | null;
  } {
    const quest = STUDENT_QUESTS.find((q) => q.id === questId);
    if (!quest) return { profile, reward: null };

    const updated: PlayerProfile = JSON.parse(JSON.stringify(profile));
    updated.studentQuestStates = updated.studentQuestStates || {};

    const current = updated.studentQuestStates[questId];

    // Already rewarded: return without awarding duplicate stats!
    if (current === 'rewarded') {
      return { profile: updated, reward: null };
    }

    if (current === 'completed') {
      updated.studentQuestStates[questId] = 'rewarded';

      // Grant XP and Cong Luc rewards
      updated.stats = CombatEngine.addXp(updated.stats, updated.equipment, quest.reward.xp).stats;
      updated.stats.congLuc = calculateCongLuc(updated.stats, {
        ...CombatEngine.getEquipmentBonus(updated.equipment),
        bonus: CombatEngine.getEquipmentBonus(updated.equipment).bonus + quest.reward.congLuc,
      });

      // Add item to inventory if not already present
      const itemExists = updated.inventory.some((it) => it.name === quest.reward.itemTitle);
      if (!itemExists) {
        updated.inventory.push({
          id: `item_${quest.id}`,
          name: quest.reward.itemTitle,
          slot: 'accessory',
          rarity: 'rare',
          description: `Tín vật ghi nhận sự tinh thông từ Đại Sư Huynh Bách Khoa thư Sinh Đinh Ngọc Khánh (${quest.badge}).`,
          icon: 'scroll',
          stats: {
            atkBonus: 5,
            defBonus: 5,
            hpBonus: 20,
          },
          isEquipped: false,
        });
      }

      return { profile: updated, reward: quest.reward };
    }

    return { profile: updated, reward: null };
  }
}
