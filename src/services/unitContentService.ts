import {
  UnitDataset,
  VocabItem,
  GrammarItem,
  QuestionItem,
} from '../../content/global-success/types';
import {
  ALL_GLOBAL_SUCCESS_UNITS,
  getUnitDataset,
} from '../../content/global-success';
import {
  KnowledgeItem,
  CombatQuestion,
  CombatEnemy,
  CombatMode,
  DialogueTacticalChoice,
  ComboStepItem,
} from '../types/game';
import { getLevelConfig, ALL_LEVEL_CONFIGS } from '../game/levels/levelConfig';

export interface UnitMetaSummary {
  unitId: string;
  grade: 10 | 11 | 12;
  unitNumber: number;
  title: string;
  topic: string;
  background: string;
  card: string;
  bossName: string;
  bossSprite: string;
  mobs: Array<{ id: string; name: string; sprite: string; title: string }>;
}

// Boss & Mob manifest per unit with asset fallbacks
const UNIT_CUSTOM_DATA: Record<
  string,
  {
    bossName: string;
    bossSprite: string;
    bossTitle: string;
    mobs: Array<{ id: string; name: string; sprite: string; title: string }>;
  }
> = {
  'g10-u01': {
    bossName: 'Loạn Ngữ Kiếm Ma',
    bossSprite: '/assets/game/characters/bosses/loan_ngu_kiem_ma.png',
    bossTitle: 'Ma Đầu Trấn Giữ Cấm Địa',
    mobs: [
      { id: 'broom_raider', name: 'Tảo Trượng Đạo Tặc', sprite: '/assets/game/units/grade-10/unit-01/enemies/broom_raider.png', title: 'Đệ tử tiền trạm' },
      { id: 'smoke_wraith', name: 'Yên Hồn Oán Quỷ', sprite: '/assets/game/units/grade-10/unit-01/enemies/smoke_wraith.png', title: 'Yêu ma hắc khí' },
    ],
  },
  'g10-u02': {
    bossName: 'U Ám Ô Nhiễm Ma',
    bossSprite: '/assets/game/characters/bosses/vong_tu_quy_vuong.png',
    bossTitle: 'Tà Ma Hủy Hoại Môi Trường',
    mobs: [
      { id: 'scout_g10u02', name: 'Thanh Phong Thám Tử', sprite: '/assets/game/units/grade-10/unit-02/enemies/scout.png', title: 'Tiền trạm lâm môn' },
      { id: 'brute_g10u02', name: 'Cự Thạch Ma Nhân', sprite: '/assets/game/units/grade-10/unit-02/enemies/brute.png', title: 'Hộ vệ hoang dã' },
    ],
  },
  'g10-u03': {
    bossName: 'Mê Âm Yêu Cơ',
    bossSprite: '/assets/game/characters/bosses/me_am_yeu_co.png',
    bossTitle: 'Yêu Nữ Tiếng Đàn Huyễn Mị',
    mobs: [
      { id: 'sound_banshee', name: 'Nhiễu Âm Yêu Nữ', sprite: '/assets/game/units/grade-10/unit-03/enemies/sound_banshee.png', title: 'Âm binh tà phái' },
      { id: 'horn_demon', name: 'Loa Giác Ma Vương', sprite: '/assets/game/units/grade-10/unit-03/enemies/horn_demon.png', title: 'Chiến cổ quỷ tướng' },
    ],
  },
  'g10-u04': {
    bossName: 'Hắc Ám Vô Tình Tôn',
    bossSprite: '/assets/game/characters/bosses/loan_ngu_kiem_ma.png',
    bossTitle: 'Tà Tôn Phá Hoại Cộng Đồng',
    mobs: [
      { id: 'scout_g10u04', name: 'Đoạt Lương Tặc Đồ', sprite: '/assets/game/units/grade-10/unit-04/enemies/scout.png', title: 'Tặc đồ phá rối' },
      { id: 'brute_g10u04', name: 'Cuồng Nộ Hung Đồ', sprite: '/assets/game/units/grade-10/unit-04/enemies/brute.png', title: 'Hung hãn sơn tặc' },
    ],
  },
  'g10-u05': {
    bossName: 'Cơ Quan Khôi Lỗi Tôn',
    bossSprite: '/assets/game/characters/bosses/vong_tu_quy_vuong.png',
    bossTitle: 'Bá Chủ Phát Minh Tà Thuật',
    mobs: [
      { id: 'construct_g10u05', name: 'Thiết Giáp Khôi Lỗi', sprite: '/assets/game/units/grade-10/unit-05/enemies/construct.png', title: 'Máy móc biến dị' },
      { id: 'spirit_g10u05', name: 'Lôi Điện U Hồn', sprite: '/assets/game/units/grade-10/unit-05/enemies/spirit.png', title: 'Tia sét hắc ám' },
    ],
  },
  'g10-u06': {
    bossName: 'Bất Bình Huyễn Ảnh',
    bossSprite: '/assets/game/units/grade-10/unit-06/bosses/balance_phantom.png',
    bossTitle: 'Ảo Ảnh Mất Cân Bằng',
    mobs: [
      { id: 'elite_g10u06', name: 'Cố Chấp Kiếm Sĩ', sprite: '/assets/game/units/grade-10/unit-06/enemies/elite.png', title: 'Cuồng sĩ tà phái' },
      { id: 'spirit_g10u06', name: 'Bất Minh Oán Linh', sprite: '/assets/game/units/grade-10/unit-06/enemies/spirit.png', title: 'Oán linh thiên kiến' },
    ],
  },
  'g10-u07': {
    bossName: 'Văn Hóa Nghịch Đạo Tôn',
    bossSprite: '/assets/game/characters/bosses/thien_dien_huyen_su.png',
    bossTitle: 'Tà Ma Đảo Lộn Phong Tục',
    mobs: [
      { id: 'scout_g10u07', name: 'Tà Lễ Vu Sư', sprite: '/assets/game/units/grade-10/unit-07/enemies/scout.png', title: 'Thầy cúng ma giáo' },
      { id: 'brute_g10u07', name: 'Hắc Lễ Hộ Pháp', sprite: '/assets/game/units/grade-10/unit-07/enemies/brute.png', title: 'Vệ binh cổ tục' },
    ],
  },
  'g10-u08': {
    bossName: 'Vô Tri Thao Túng Ma',
    bossSprite: '/assets/game/characters/bosses/loan_ngu_kiem_ma.png',
    bossTitle: 'Ma Đầu Ngăn Trở Học Vấn',
    mobs: [
      { id: 'construct_g10u08', name: 'Phong Tỏa Thiết Nhân', sprite: '/assets/game/units/grade-10/unit-08/enemies/construct.png', title: 'Thiết giáp hộ thành' },
      { id: 'spirit_g10u08', name: 'Mê Muội U Hồn', sprite: '/assets/game/units/grade-10/unit-08/enemies/spirit.png', title: 'Bóng ma u tối' },
    ],
  },
  'g10-u09': {
    bossName: 'Tuyệt Chủng Ma Tôn',
    bossSprite: '/assets/game/characters/bosses/vong_tu_quy_vuong.png',
    bossTitle: 'Tà Tôn Tận Diệt Sinh Linh',
    mobs: [
      { id: 'brute_g10u09', name: 'Săn Bắt Hung Đồ', sprite: '/assets/game/units/grade-10/unit-09/enemies/brute.png', title: 'Đồ tể rừng xanh' },
      { id: 'scout_g10u09', name: 'Ô Nhiễm Tầm Môn', sprite: '/assets/game/units/grade-10/unit-09/enemies/scout.png', title: 'Tầm độc yêu ma' },
    ],
  },
  'g10-u10': {
    bossName: 'Lạc Lối Đao Vương',
    bossSprite: '/assets/game/units/grade-10/unit-10/bosses/lost_trail_warlord.png',
    bossTitle: 'Chiến Tướng Rừng Hoang Cấm Địa',
    mobs: [
      { id: 'elite_g10u10', name: 'Sơn Lâm Khôi Lỗi', sprite: '/assets/game/units/grade-10/unit-10/enemies/elite.png', title: 'Đao khách lạc lối' },
      { id: 'spirit_g10u10', name: 'Huyễn Vực Mê Vụ', sprite: '/assets/game/units/grade-10/unit-10/enemies/spirit.png', title: 'Khói độc rừng già' },
    ],
  },
  // GRADE 11
  'g11-u01': {
    bossName: 'Suy Kiệt Dịch Bệnh Tôn',
    bossSprite: '/assets/game/characters/bosses/vong_tu_quy_vuong.png',
    bossTitle: 'Tà Thần Đầu Độc Sinh Khí',
    mobs: [
      { id: 'scout_g11u01', name: 'Trọc Khí Yêu Ma', sprite: '/assets/game/units/grade-11/unit-01/enemies/scout.png', title: 'Quái vật sinh lực' },
      { id: 'brute_g11u01', name: 'Hủ Bại Ma Binh', sprite: '/assets/game/units/grade-11/unit-01/enemies/brute.png', title: 'Chiến binh dịch hạch' },
    ],
  },
  'g11-u02': {
    bossName: 'Thời Gian Bất Hòa Vương',
    bossSprite: '/assets/game/characters/bosses/loan_ngu_kiem_ma.png',
    bossTitle: 'Ma Thần Khoảng Cách Thế Hệ',
    mobs: [
      { id: 'elite_g11u02', name: 'Cố Chấp Trưởng Lão', sprite: '/assets/game/units/grade-11/unit-02/enemies/elite.png', title: 'Đệ tử gia quy' },
      { id: 'spirit_g11u02', name: 'Đoạn Tuyệt Linh Hồn', sprite: '/assets/game/units/grade-11/unit-02/enemies/spirit.png', title: 'Bóng ma chia rẽ' },
    ],
  },
  'g11-u03': {
    bossName: 'Hư Không Cơ Giới Thần',
    bossSprite: '/assets/game/units/grade-11/unit-03/bosses/hollow_city_engine.png',
    bossTitle: 'Cơ Quan Trấn Thủ Đô Thị Tương Lai',
    mobs: [
      { id: 'construct_g11u03', name: 'Đô Thị Cơ Quan Nhân', sprite: '/assets/game/units/grade-11/unit-03/enemies/construct.png', title: 'Người máy mất kiểm soát' },
      { id: 'ranged_g11u03', name: 'Lôi Điện Xạ Thủ', sprite: '/assets/game/units/grade-11/unit-03/enemies/ranged.png', title: 'Cung thủ năng lượng' },
    ],
  },
  'g11-u04': {
    bossName: 'Ly Gián Hiệp Hội Ma',
    bossSprite: '/assets/game/characters/bosses/vong_tu_quy_vuong.png',
    bossTitle: 'Tà Ma Phá Hoại Hòa Bình ASEAN',
    mobs: [
      { id: 'scout_g11u04', name: 'Xâm Nhập Gian Điệp', sprite: '/assets/game/units/grade-11/unit-04/enemies/scout.png', title: 'Thích khách lẩn khuất' },
      { id: 'brute_g11u04', name: 'Khuấy Đảo Trọng Binh', sprite: '/assets/game/units/grade-11/unit-04/enemies/brute.png', title: 'Đao phủ phá hoại' },
    ],
  },
  'g11-u05': {
    bossName: 'Ô Nhiễm Toàn Cầu Ma',
    bossSprite: '/assets/game/characters/bosses/loan_ngu_kiem_ma.png',
    bossTitle: 'Tà Linh Biến Đổi Khí Hậu',
    mobs: [
      { id: 'spirit_g11u05', name: 'Hắc Hỏa Tà Linh', sprite: '/assets/game/units/grade-11/unit-05/enemies/spirit.png', title: 'Khí nóng độc hại' },
      { id: 'construct_g11u05', name: 'Than Đá Thạch Quái', sprite: '/assets/game/units/grade-11/unit-05/enemies/construct.png', title: 'Khổng lồ khói bụi' },
    ],
  },
  'g11-u06': {
    bossName: 'Thiên Diện Huyễn Sư',
    bossSprite: '/assets/game/characters/bosses/thien_dien_huyen_su.png',
    bossTitle: 'Bá Chủ Ảo Ảnh Xâm Hại Di Sản',
    mobs: [
      { id: 'elite_g11u06', name: 'Huyễn Kính Ma Đồ', sprite: '/assets/game/units/grade-11/unit-06/enemies/elite.png', title: 'Kẻ ngụy tạo cổ vật' },
      { id: 'spirit_g11u06', name: 'Phong Hóa Tà Linh', sprite: '/assets/game/units/grade-11/unit-06/enemies/spirit.png', title: 'Hủy diệt di tích' },
    ],
  },
  'g11-u07': {
    bossName: 'Bất Đạt Học Giả Ma',
    bossSprite: '/assets/game/characters/bosses/vong_tu_quy_vuong.png',
    bossTitle: 'Ma Đầu Ngăn Chặn Đại Học',
    mobs: [
      { id: 'scout_g11u07', name: 'Lạc Lối Khảo Sinh', sprite: '/assets/game/units/grade-11/unit-07/enemies/scout.png', title: 'Huyễn ảnh thi cử' },
      { id: 'brute_g11u07', name: 'Xiềng Xích Hộ Môn', sprite: '/assets/game/units/grade-11/unit-07/enemies/brute.png', title: 'Hộ vệ cấm viện' },
    ],
  },
  'g11-u08': {
    bossName: 'Tự Lập Băng Phong Tôn',
    bossSprite: '/assets/game/characters/bosses/loan_ngu_kiem_ma.png',
    bossTitle: 'Tà Ma Kìm Hãm Trưởng Thành',
    mobs: [
      { id: 'elite_g11u08', name: 'Ỷ Lại Oán Quỷ', sprite: '/assets/game/units/grade-11/unit-08/enemies/elite.png', title: 'Bóng ma phụ thuộc' },
      { id: 'spirit_g11u08', name: 'Sợ Hãi Huyễn Ảnh', sprite: '/assets/game/units/grade-11/unit-08/enemies/spirit.png', title: 'Nỗi lo trưởng thành' },
    ],
  },
  'g11-u09': {
    bossName: 'Bạo Lực Thao Túng Ma',
    bossSprite: '/assets/game/characters/bosses/thien_dien_huyen_su.png',
    bossTitle: 'Chúa Tể Bắt Nạt Học Đường',
    mobs: [
      { id: 'brute_g11u09', name: 'Bạo Lực Hung Đồ', sprite: '/assets/game/units/grade-11/unit-09/enemies/brute.png', title: 'Bắt nạt tà binh' },
      { id: 'scout_g11u09', name: 'Khẩu Thiệt Vu Sư', sprite: '/assets/game/units/grade-11/unit-09/enemies/scout.png', title: 'Tung tin bịa đặt' },
    ],
  },
  'g11-u10': {
    bossName: 'Đầm Lầy Nuốt Chửng',
    bossSprite: '/assets/game/units/grade-11/unit-10/bosses/marsh_devourer.png',
    bossTitle: 'Cổ Thú Tàn Phá Hệ Sinh Thái',
    mobs: [
      { id: 'elite_g11u10', name: 'Đầm Lầy Yêu Đồ', sprite: '/assets/game/units/grade-11/unit-10/enemies/elite.png', title: 'Đồ tể vùng đầm' },
      { id: 'spirit_g11u10', name: 'Héo Úa Tà Hồn', sprite: '/assets/game/units/grade-11/unit-10/enemies/spirit.png', title: 'Sinh vật biến dị' },
    ],
  },
};

export class UnitContentService {
  /**
   * Get metadata summary of all 30 units (Grade 10: 10 units, Grade 11: 10 units, Grade 12: 10 units)
   */
  static getAllUnits(targetGrade?: 10 | 11 | 12): UnitMetaSummary[] {
    const list: UnitMetaSummary[] = [];

    ALL_GLOBAL_SUCCESS_UNITS.forEach((unit) => {
      const g = unit.metadata.grade as 10 | 11 | 12;
      if (targetGrade && g !== targetGrade) return;

      const uNum = unit.metadata.unit_number;
      const uId = unit.metadata.unit_id;
      const uPad = uNum.toString().padStart(2, '0');
      const levelCfg = getLevelConfig(uId);

      list.push({
        unitId: uId,
        grade: g,
        unitNumber: uNum,
        title: unit.metadata.title,
        topic: unit.metadata.topic,
        background: `/assets/game/units/grade-${g}/unit-${uPad}.jpg`,
        card: `/assets/game/units/grade-${g}/unit-${uPad}-card.jpg`,
        bossName: levelCfg.climax.enemy.name,
        bossSprite: levelCfg.climax.enemy.spriteKey,
        mobs: levelCfg.enemies.map((e) => ({
          id: e.enemyId,
          name: e.name,
          sprite: e.spritePath,
          title: e.title,
        })),
      });
    });

    return list;
  }

  /**
   * Get knowledge items for a unit
   */
  static getUnitKnowledgeItems(unitId: string): KnowledgeItem[] {
    const dataset = getUnitDataset(unitId);
    if (!dataset) return [];

    const vocab: KnowledgeItem[] = dataset.vocabulary.map((v: VocabItem) => ({
      id: v.id,
      type: 'vocabulary',
      title: v.word,
      wordType: v.word_type,
      ipa: v.ipa || undefined,
      meaningVi: v.meaning_vi,
      definitionEn: v.definition_en,
      exampleSentence: v.example_sentence,
      exampleTranslation: v.example_translation,
      topic: `${dataset.metadata.title} - Từ Vựng`,
    }));

    const grammar: KnowledgeItem[] = dataset.grammar.map((g: GrammarItem) => ({
      id: g.id,
      type: 'grammar',
      title: g.title,
      meaningVi: g.structure_name,
      definitionEn: g.rule_summary,
      exampleSentence: g.example_sentences[0]?.en,
      exampleTranslation: g.example_sentences[0]?.vi,
      topic: `${dataset.metadata.title} - Ngữ Pháp`,
    }));

    return [...vocab, ...grammar];
  }

  /**
   * Generates and returns a rich set of combat questions mapped to the 6 combat modes
   */
  static getUnitCombatQuestions(unitId: string): CombatQuestion[] {
    const dataset = getUnitDataset(unitId);
    if (!dataset) return [];

    const vocab = dataset.vocabulary;
    const grammar = dataset.grammar;
    const reading = dataset.reading;
    const rawQuestions = dataset.questions;
    const unitTitle = dataset.metadata.title;

    const result: CombatQuestion[] = [];

    // 1. Phá Phong Ấn (sentence_order / unseal)
    // Map raw sentence_order or build from grammar example
    const sentenceOrderRaw = rawQuestions.find((q) => q.type === 'sentence_order');
    if (sentenceOrderRaw && sentenceOrderRaw.wordsToOrder) {
      result.push({
        id: `${unitId}_unseal_01`,
        knowledgeItemIds: sentenceOrderRaw.knowledgeItemIds,
        type: 'sentence_order',
        combatMode: 'unseal',
        prompt: sentenceOrderRaw.prompt,
        options: sentenceOrderRaw.options,
        correctAnswer: sentenceOrderRaw.correctAnswer,
        explanation: sentenceOrderRaw.explanation,
        timeLimit: 18,
        difficulty: 'medium',
        wordsToOrder: [...sentenceOrderRaw.wordsToOrder],
      });
    } else if (grammar[0]?.example_sentences[0]) {
      const sent = grammar[0].example_sentences[0].en;
      const cleanWords = sent.replace(/[.,!?]/g, '').split(/\s+/).filter(Boolean);
      result.push({
        id: `${unitId}_unseal_01`,
        knowledgeItemIds: [grammar[0].id],
        type: 'sentence_order',
        combatMode: 'unseal',
        prompt: `Sắp xếp các từ sau thành câu đúng ngữ pháp chủ đề ${unitTitle}:`,
        options: [sent],
        correctAnswer: sent,
        explanation: `Cấu trúc chuẩn: ${grammar[0].structure_name}.`,
        timeLimit: 18,
        difficulty: 'medium',
        wordsToOrder: [...cleanWords].sort(() => Math.random() - 0.5),
      });
    }

    // 2. Đoạt Lại Vong Từ (lost_word - fill blank with hint)
    const fillBlankRaw = rawQuestions.find((q) => q.type === 'fill_blank');
    if (fillBlankRaw) {
      const vocabTarget = vocab.find((v) => fillBlankRaw.knowledgeItemIds.includes(v.id)) || vocab[0];
      result.push({
        id: `${unitId}_lostword_01`,
        knowledgeItemIds: fillBlankRaw.knowledgeItemIds,
        type: 'fill_blank',
        combatMode: 'lost_word',
        prompt: fillBlankRaw.prompt,
        options: fillBlankRaw.options,
        correctAnswer: fillBlankRaw.correctAnswer,
        explanation: fillBlankRaw.explanation,
        timeLimit: 15,
        difficulty: 'medium',
        hintText: vocabTarget
          ? `Gợi ý: Nghĩa là "${vocabTarget.meaning_vi}", bắt đầu bằng chữ '${vocabTarget.word.charAt(0).toUpperCase()}'.`
          : 'Gợi ý: Chú ý cấu trúc cụm từ cố định trong bài học.',
        missingWord: fillBlankRaw.correctAnswer,
      });
    } else if (vocab[1]) {
      const v = vocab[1];
      const sentenceWithBlank = v.example_sentence.replace(new RegExp(v.word, 'i'), '_______');
      result.push({
        id: `${unitId}_lostword_01`,
        knowledgeItemIds: [v.id],
        type: 'fill_blank',
        combatMode: 'lost_word',
        prompt: `Đoạt Lại Vong Từ: Điền từ chính xác vào chỗ trống:\n"${sentenceWithBlank}"`,
        options: [v.word, 'alternative', 'consequence', 'tradition'].sort(() => Math.random() - 0.5),
        correctAnswer: v.word,
        explanation: `Từ cần điền là "${v.word}" (${v.meaning_vi}).`,
        timeLimit: 15,
        difficulty: 'medium',
        hintText: `Gợi ý: Nghĩa là "${v.meaning_vi}", gồm ${v.word.length} chữ cái bắt đầu bằng '${v.word[0]}'.`,
        missingWord: v.word,
      });
    }

    // 3. Mê Âm Truy Kích (listening_pursuit)
    const primaryVocab = vocab[0] || { word: 'cooperation', meaning_vi: 'sự hợp tác', example_sentence: 'Cooperation brings success to our team.' };
    result.push({
      id: `${unitId}_listening_01`,
      knowledgeItemIds: [primaryVocab.id],
      type: 'multiple_choice',
      combatMode: 'listening_pursuit',
      prompt: `Mê Âm Truy Kích: Lắng nghe khẩu quyết và nhận diện yếu nghĩa của thông điệp phát ra!`,
      options: [
        `Nhắc đến "${primaryVocab.meaning_vi}" trong câu khẩu quyết`,
        'Bác bỏ mọi nỗ lực và phủ nhận hành động',
        'Cảnh báo nguy hiểm khi ra ngoài vào ban đêm',
        'Yêu cầu dừng lại và chuyển hướng khác',
      ],
      correctAnswer: `Nhắc đến "${primaryVocab.meaning_vi}" trong câu khẩu quyết`,
      explanation: `Khẩu quyết vừa phát: "${primaryVocab.example_sentence}". Thông điệp chính là ${primaryVocab.meaning_vi}.`,
      timeLimit: 12,
      difficulty: 'medium',
      listeningScript: primaryVocab.example_sentence,
      transcriptFallback: `Bản chép lời khẩu quyết: "${primaryVocab.example_sentence}" (Ý nghĩa: ${primaryVocab.meaning_vi})`,
      maxReplays: 3,
    });

    // 4. Thiên Diện Phá Ảo (deception_pierce - reading with evidence anchor)
    const readingP1 = reading.keywords[0] || 'harmony';
    const readingP2 = reading.keywords[1] || 'responsibility';
    const passageSentences = [
      `In the practice of ${unitTitle.toLowerCase()}, each disciple must cultivate dedication.`,
      `Recent findings show that regular dedication directly reinforces personal ${readingP1}.`,
      `Moreover, ancient masters emphasized that true power comes from collective ${readingP2}.`,
      `Those who neglect these fundamentals inevitably succumb to confusion.`,
    ];
    result.push({
      id: `${unitId}_deception_01`,
      knowledgeItemIds: [reading.id],
      type: 'multiple_choice',
      combatMode: 'deception_pierce',
      prompt: `Thiên Diện Phá Ảo: Theo văn tịch bên dưới, điều gì trực tiếp củng cố "${readingP1}" của người luyện võ? Hãy chọn đáp án và bấm đúng CÂU DẪN CHỨNG [1]-[4] trong đoạn văn!`,
      options: [
        `Regular dedication (Sự kiên trì cống hiến đều đặn)`,
        `Neglecting ancient principles (Phớt lờ các nguyên tắc cổ)`,
        `Isolating oneself from collective practice (Tách biệt khỏi tập thể)`,
        `Randomly jumping between techniques (Luyện tập ngẫu hứng)`,
      ],
      correctAnswer: `Regular dedication (Sự kiên trì cống hiến đều đặn)`,
      explanation: `Đáp án đúng là "Regular dedication", được dẫn chứng xác đáng ở câu [2]: "Recent findings show that regular dedication directly reinforces personal ${readingP1}."`,
      timeLimit: 25,
      difficulty: 'hard',
      readingPassage: passageSentences.map((s, idx) => `[${idx + 1}] ${s}`).join(' '),
      passageSentences,
      evidenceSentenceIndex: 2, // 1-indexed
      trapExplanation: `Bẫy ảo ảnh: Câu [4] chỉ nhắc tới hậu quả khi lơ là ("succumb to confusion"), không phải là nguyên nhân củng cố "${readingP1}". Đừng để ảo thuật dẫn dụ!`,
    });

    // 5. Hộ Tống Hội Thoại (escort_dialogue)
    const dialogueVocab = vocab[2] || vocab[0];
    const choices: DialogueTacticalChoice[] = [
      {
        text: `“Ta hiểu rõ tầm quan trọng của ${dialogueVocab.meaning_vi}. Hãy cùng ta giữ vững trận thế!”`,
        buffEffect: 'shield',
        buffValue: 30,
        buffDescription: '🛡️ Tâm Lý Khiên Hộ (+30 HP cho nhân vật)',
        isOptimal: true,
      },
      {
        text: `“Ngươi phát ngôn hàm hồ, từ ${dialogueVocab.word} không thể tùy tiện áp dụng như vậy!”`,
        buffEffect: 'weaken',
        buffValue: 20,
        buffDescription: '⚡ Phá Vỡ Luận Điểm (-20% Công Kích Địch)',
        isOptimal: false,
      },
      {
        text: `“Nói nhiều vô ích, hãy nếm thử kiếm khí tinh thông của môn phái ta!”`,
        buffEffect: 'atk_boost',
        buffValue: 50,
        buffDescription: '💥 Kiếm Ý Bộc Phát (+50% Sát Thương Bạo Kích)',
        isOptimal: false,
      },
    ];

    result.push({
      id: `${unitId}_escort_01`,
      knowledgeItemIds: [dialogueVocab.id],
      type: 'multiple_choice',
      combatMode: 'escort_dialogue',
      prompt: `Hộ Tống Hội Thoại: Đối thủ buông lời khiêu khích về khái niệm "${dialogueVocab.word}". Hãy đưa ra phản hồi mang tính chiến thuật để xoay chuyển cục diện!`,
      options: choices.map((c) => c.text),
      correctAnswer: choices[0].text,
      explanation: `Lựa chọn đàm phán điềm tĩnh kết hợp tri thức từ vựng "${dialogueVocab.word}" tạo nên khiên phòng hộ tinh thần vững chắc nhất.`,
      timeLimit: 14,
      difficulty: 'medium',
      dialogueChoices: choices,
    });

    // 6. Liên Hoàn Tam Chiêu (triple_combo)
    const comboVocab = vocab[3] || vocab[0];
    const comboGrammar = grammar[0];
    const comboSent = comboGrammar?.example_sentences[0]?.en || `${comboVocab.word} plays an essential role in our life.`;
    const comboTokens = comboSent.replace(/[.,!?]/g, '').split(/\s+/).filter(Boolean);

    const comboSteps: ComboStepItem[] = [
      {
        stepNumber: 1,
        stepType: 'listen',
        title: 'Chiêu 1: Thính Phong Biện Vị',
        prompt: `Lắng nghe âm thanh và xác định từ vựng trọng tâm vừa được truyền đến:`,
        options: [comboVocab.word, 'disorder', 'obstacle', 'mirage'].sort(() => Math.random() - 0.5),
        correctAnswer: comboVocab.word,
        listeningScript: comboVocab.word,
        hint: `Từ mang nghĩa: "${comboVocab.meaning_vi}"`,
      },
      {
        stepNumber: 2,
        stepType: 'comprehend',
        title: 'Chiêu 2: Luận Giải Pháp Tắc',
        prompt: `Chọn cách dùng hoặc dạng thức ngữ pháp chính xác của "${comboVocab.word}":`,
        options: [
          `Là ${comboVocab.word_type}, mang ý nghĩa "${comboVocab.meaning_vi}"`,
          'Là trạng từ chỉ thời gian bất định',
          'Chỉ được dùng trong thể phủ định hoàn toàn',
          'Luôn đi kèm giới từ không xác định',
        ],
        correctAnswer: `Là ${comboVocab.word_type}, mang ý nghĩa "${comboVocab.meaning_vi}"`,
        hint: `Tra cứu định nghĩa: ${comboVocab.definition_en}`,
      },
      {
        stepNumber: 3,
        stepType: 'unseal',
        title: 'Chiêu 3: Xuất Chiêu Phá Trận',
        prompt: `Sắp xếp các chữ sau thành kiếm chiêu hoàn chỉnh để kết liễu:`,
        options: [comboSent],
        wordsToOrder: [...comboTokens].sort(() => Math.random() - 0.5),
        correctAnswer: comboSent,
        hint: `Cấu trúc: ${comboGrammar?.structure_name || 'Câu hoàn chỉnh'}`,
      },
    ];

    result.push({
      id: `${unitId}_triple_combo_01`,
      knowledgeItemIds: [comboVocab.id, comboGrammar?.id || comboVocab.id],
      type: 'multiple_choice',
      combatMode: 'triple_combo',
      prompt: `Liên Hoàn Tam Chiêu: Kích hoạt liên kích 3 bước đối đầu Cao Thủ Cấm Địa!`,
      options: ['Chiêu 1', 'Chiêu 2', 'Chiêu 3'],
      correctAnswer: 'Chiêu 3',
      explanation: `Đã hoàn thành Liên Hoàn Tam Chiêu: Nghe chuẩn -> Hiểu sâu -> Sắp câu chính xác!`,
      timeLimit: 30,
      difficulty: 'hard',
      comboSteps,
      weaknessAnalysis: `Tổng kết điểm yếu: Cần củng cố thêm phát âm của "${comboVocab.word}" và cấu trúc "${comboGrammar?.structure_name || 'ngữ pháp'}".`,
    });

    // Also include remaining raw multiple_choice questions from dataset for extra pool
    rawQuestions.forEach((q: QuestionItem) => {
      if (q.type === 'multiple_choice') {
        result.push({
          id: q.id,
          knowledgeItemIds: q.knowledgeItemIds,
          type: 'multiple_choice',
          combatMode: 'standard',
          prompt: q.prompt,
          options: q.options,
          correctAnswer: q.correctAnswer,
          explanation: q.explanation,
          timeLimit: q.timeLimit || 12,
          difficulty: q.difficulty || 'medium',
        });
      }
    });

    return result;
  }

  /**
   * Get 3 curated challenge questions for Quest 3 of the unit
   */
  static getUnitChallengeQuestions(unitId: string): CombatQuestion[] {
    const all = this.getUnitCombatQuestions(unitId);
    // Take 1 unseal, 1 lost_word, and 1 standard/deception
    const unseal = all.find((q) => q.combatMode === 'unseal');
    const lostWord = all.find((q) => q.combatMode === 'lost_word');
    const third = all.find((q) => q.combatMode === 'listening_pursuit' || q.combatMode === 'standard');

    const challengePool = [unseal, lostWord, third].filter(Boolean) as CombatQuestion[];
    if (challengePool.length >= 3) return challengePool.slice(0, 3);
    return all.slice(0, 3);
  }

  /**
   * Get enemy definitions for a specific unit
   */
  static getUnitEnemies(unitId: string): {
    mob1: CombatEnemy;
    mob2: CombatEnemy;
    boss: CombatEnemy;
    allMobs: CombatEnemy[];
  } {
    const levelCfg = getLevelConfig(unitId);
    const enemies: CombatEnemy[] = levelCfg.enemies.map((e) => ({
      id: e.enemyId,
      name: e.name,
      title: e.title,
      spriteKey: e.spritePath,
      hp: e.hp,
      maxHp: e.maxHp,
      attack: e.attack,
      defense: e.defense,
      xpReward: e.xpReward,
    }));

    const mob1 = enemies[0] || {
      id: 'sword_disciple',
      name: 'Ma Giáo Kiếm Đồ',
      title: 'Đệ tử tiền trạm',
      spriteKey: '/assets/game/characters/enemies/sword_disciple.png',
      hp: 120,
      maxHp: 120,
      attack: 16,
      defense: 6,
      xpReward: 80,
    };

    const mob2 = enemies[1] || enemies[0] || mob1;
    const boss = levelCfg.climax.enemy;

    return { mob1, mob2, boss, allMobs: enemies };
  }
}
