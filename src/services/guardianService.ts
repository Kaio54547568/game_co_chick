import {
  GuardianId,
  GuardianQuestStatus,
  PlayerProfile,
} from '../types/game';
import { getUnitDataset } from '../../content/global-success';
import { CombatEngine } from './combatEngine';
import { evaluateUnitUnlocks } from '../data/progressionBalance';
import { PronunciationService } from './pronunciationService';

export type { GuardianId, GuardianQuestStatus };

export interface GuardianMeta {
  id: GuardianId;
  name: string;
  title: string;
  domain: string;
  portrait: string;
  badgeColor: string;
  badgeBg: string;
  borderColor: string;
  elementColor: string;
  quote: string;
  skillName: string;
}

export interface GuardianExercise {
  type: 'vocab' | 'grammar' | 'listening' | 'reading';
  prompt: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  audioScript?: string;
  readingPassage?: string;
  passageSentences?: string[];
  evidenceIndex?: number;
  wordsToOrder?: string[];
  knowledgeItemIds?: string[];
}

export interface GuardianQuestData {
  id: string;
  npcId: GuardianId;
  unitId: string;
  title: string;
  skillName: string;
  objective: string;
  nextLocation: string;
  rewardXp: number;
  rewardProgressGain: number;
  tutorialGuidance: string;
  dialogueByStatus: {
    not_started: string[];
    in_progress: string[];
    completed: string[];
    rewarded: string[];
  };
  exercise: GuardianExercise;
}

export const GUARDIAN_METAS: Record<GuardianId, GuardianMeta> = {
  ho_phap_phuong_tu: {
    id: 'ho_phap_phuong_tu',
    name: 'Hộ Pháp Phương Tú',
    title: 'Hộ Pháp Từ Vựng & Trưởng Thành',
    domain: 'Tàng Kinh Các (Tây Bắc Sơn Môn)',
    portrait: '/assets/game/characters/npc/portraits/ho_phap_phuong_tu.png',
    badgeColor: 'text-emerald-400',
    badgeBg: 'bg-emerald-950/70',
    borderColor: 'border-emerald-500/80',
    elementColor: '#10b981',
    quote: '"Từ vựng là căn cơ võ học – Nắm chắc từ loại, công lực thăng tiến vượt bậc"',
    skillName: 'Tu Dưỡng Từ Vựng & Căn Cơ Ngôn Từ',
  },
  ho_phap_dang_tran_ha: {
    id: 'ho_phap_dang_tran_ha',
    name: 'Thầy Đặng Trần Hà',
    title: 'Hộ Pháp Ngữ Pháp & Thách Đấu',
    domain: 'Phong Ấn Thạch Trận (Trước Tàng Kinh Các)',
    portrait: '/assets/game/characters/npc/portraits/ho_phap_dang_tran_ha.png',
    badgeColor: 'text-blue-400',
    badgeBg: 'bg-blue-950/70',
    borderColor: 'border-blue-500/80',
    elementColor: '#3b82f6',
    quote: '"Cấu trúc chuẩn xác, kiếm pháp vô song – Ngữ pháp sáng tỏ, phá tan mê trận"',
    skillName: 'Cú Pháp Kiếm Quyết & Logic Trận Pháp',
  },
  ho_phap_hoang_van: {
    id: 'ho_phap_hoang_van',
    name: 'Cô Hoàng Vân',
    title: 'Hộ Pháp Nghe & Nhịp Điệu',
    domain: 'Võ Luyện Đài (Khu Vực Phía Đông)',
    portrait: '/assets/game/characters/npc/portraits/ho_phap_hoang_van.png',
    badgeColor: 'text-amber-300',
    badgeBg: 'bg-amber-950/70',
    borderColor: 'border-amber-500/80',
    elementColor: '#f59e0b',
    quote: '"Thính âm biện vị – Lắng nghe từng ngữ điệu, phản xạ xuất chiêu trong chớp mắt"',
    skillName: 'Thính Âm Biện Vị & Phản Xạ Nghe',
  },
  ho_phap_nguyet_nguyen: {
    id: 'ho_phap_nguyet_nguyen',
    name: 'Cô Nguyệt Nguyên',
    title: 'Hộ Pháp Đọc Hiểu & Minh Triết',
    domain: 'Minh Triết Các (Khu Vực Tây Nam)',
    portrait: '/assets/game/characters/npc/portraits/ho_phap_nguyet_nguyen.png',
    badgeColor: 'text-cyan-400',
    badgeBg: 'bg-cyan-950/70',
    borderColor: 'border-cyan-500/80',
    elementColor: '#06b6d4',
    quote: '"Minh triết soi rọi hư ảnh – Tìm đúng bằng chứng văn bản để phá vỡ ảo giác"',
    skillName: 'Minh Triết Thấu Thị & Đối Chiếu Bằng Chứng',
  },
};

export class GuardianService {
  /**
   * Kiểm tra xem ID có phải là một trong 4 Hộ Pháp không
   */
  static isGuardianId(id: string): id is GuardianId {
    return id in GUARDIAN_METAS;
  }

  /**
   * Lấy metadata của Hộ Pháp
   */
  static getGuardianMeta(id: string): GuardianMeta | null {
    if (this.isGuardianId(id)) {
      return GUARDIAN_METAS[id];
    }
    return null;
  }

  /**
   * Lấy trạng thái nhiệm vụ của Hộ Pháp trong Unit hiện tại
   */
  static getGuardianStatus(
    profile: PlayerProfile,
    unitId: string,
    npcId: string
  ): GuardianQuestStatus {
    const states = profile.guardianQuestStates?.[unitId];
    if (states && states[npcId]) {
      return states[npcId];
    }
    return 'not_started';
  }

  /**
   * Tiếp nhận nhiệm vụ Hộ Pháp (chuyển sang in_progress)
   */
  static acceptQuest(
    profile: PlayerProfile,
    unitId: string,
    npcId: GuardianId
  ): PlayerProfile {
    const guardianQuestStates = { ...(profile.guardianQuestStates || {}) };
    const unitStates = { ...(guardianQuestStates[unitId] || {}) };

    if (unitStates[npcId] !== 'completed' && unitStates[npcId] !== 'rewarded') {
      unitStates[npcId] = 'in_progress';
    }
    guardianQuestStates[unitId] = unitStates;

    return {
      ...profile,
      guardianQuestStates,
    };
  }

  /**
   * Giải bài tập thành công (chuyển sang completed, chờ nhận thưởng)
   */
  static solveExercise(
    profile: PlayerProfile,
    unitId: string,
    npcId: GuardianId
  ): PlayerProfile {
    const guardianQuestStates = { ...(profile.guardianQuestStates || {}) };
    const unitStates = { ...(guardianQuestStates[unitId] || {}) };

    if (unitStates[npcId] !== 'rewarded') {
      unitStates[npcId] = 'completed';
    }
    guardianQuestStates[unitId] = unitStates;

    return {
      ...profile,
      guardianQuestStates,
    };
  }

  /**
   * Báo công và nhận thưởng nhiệm vụ Hộ Pháp (chuyển sang rewarded)
   */
  static claimReward(
    profile: PlayerProfile,
    unitId: string,
    npcId: GuardianId
  ): {
    profile: PlayerProfile;
    xpGained: number;
    progressGain: number;
    didLevelUp: boolean;
    isFirstTime: boolean;
  } {
    const guardianQuestStates = { ...(profile.guardianQuestStates || {}) };
    const unitStates = { ...(guardianQuestStates[unitId] || {}) };
    const currentStatus = unitStates[npcId];

    // Chặn nhận thưởng lặp
    if (currentStatus === 'rewarded') {
      return {
        profile,
        xpGained: 0,
        progressGain: 0,
        didLevelUp: false,
        isFirstTime: false,
      };
    }

    const questData = this.getGuardianQuestData(npcId, unitId);
    unitStates[npcId] = 'rewarded';
    guardianQuestStates[unitId] = unitStates;

    const xpResult = CombatEngine.addXp(
      profile.stats,
      profile.equipment,
      questData.rewardXp
    );
    const newProgress = Math.min(100, profile.unitProgress + questData.rewardProgressGain);

    const currentUnitStates = { ...(profile.unitStates || {}) };
    if (currentUnitStates[unitId]) {
      const activeUnit = { ...currentUnitStates[unitId] };
      activeUnit.progress = newProgress;
      activeUnit.guardianQuestStates = unitStates;
      activeUnit.isCompleted = activeUnit.bossDefeated || newProgress >= 100;
      currentUnitStates[unitId] = activeUnit;
    }
    const evaluatedStates = evaluateUnitUnlocks(currentUnitStates);

    const updatedProfile: PlayerProfile = {
      ...profile,
      stats: xpResult.stats,
      unitProgress: newProgress,
      guardianQuestStates,
      unitStates: evaluatedStates,
    };

    return {
      profile: updatedProfile,
      xpGained: questData.rewardXp,
      progressGain: questData.rewardProgressGain,
      didLevelUp: xpResult.didLevelUp,
      isFirstTime: true,
    };
  }

  /**
   * Sinh nội dung nhiệm vụ, lời thoại và bài tập động theo Unit hiện tại
   */
  static getGuardianQuestData(
    npcId: GuardianId,
    unitId: string
  ): GuardianQuestData {
    const dataset = getUnitDataset(unitId);
    const unitNum = dataset?.metadata.unit_number || 1;
    const unitTitle = dataset?.metadata.title || 'VÕ HỌC CĂN BẢN';
    const topic = dataset?.metadata.topic || 'Học tập và tu luyện';

    const vocabs = dataset?.vocabulary || [];
    const grammars = dataset?.grammar || [];
    const reading = dataset?.reading;

    const v0 = vocabs[0] || {
      id: 'v_default_0',
      word: 'discipline',
      word_type: 'noun',
      meaning_vi: 'kỷ luật tu luyện',
      definition_en: 'the practice of training mind and body',
      example_sentence: 'Discipline is essential for every martial artist.',
    };

    const v1 = vocabs[1] || {
      id: 'v_default_1',
      word: 'perseverance',
      word_type: 'noun',
      meaning_vi: 'sự kiên trì bền bỉ',
      definition_en: 'continued effort to do or achieve something',
      example_sentence: 'With perseverance, you can conquer any obstacle.',
    };

    const g0 = grammars[0] || {
      id: 'g_default_0',
      title: 'Cấu Trúc Câu Chuẩn Xác',
      structure_name: 'Present Simple vs Present Continuous',
      rule_summary: 'Sử dụng hiện tại đơn cho thói quen và hiện tại tiếp diễn cho hành động đang diễn ra.',
      example_sentences: [
        {
          en: 'He practices swordsmanship every single morning.',
          vi: 'Hắn luyện kiếm thuật vào mỗi buổi sáng.',
        },
      ],
    };

    // 1. HỘ PHÁP PHƯƠNG TÚ (TỪ VỰNG)
    if (npcId === 'ho_phap_phuong_tu') {
      const vDistractors = [
        `hành vi sơ suất lơ đễnh`,
        `sự do dự thoái chí`,
        `phù phép hư ảo ma đạo`,
      ];

      return {
        id: `${unitId}_quest_phuong_tu`,
        npcId,
        unitId,
        title: `Khai Ngộ Từ Vựng: ${unitTitle}`,
        skillName: GUARDIAN_METAS.ho_phap_phuong_tu.skillName,
        objective: `Lĩnh hội từ vựng then chốt "${v0.word}" (${v0.meaning_vi}) của ${unitTitle} (Unit ${unitNum})`,
        nextLocation: `Tàng Kinh Các (Khu vực góc Tây Bắc)`,
        rewardXp: 60 + unitNum * 5,
        rewardProgressGain: 10,
        tutorialGuidance: `💡 Yếu Quyết Tu Từ: Đừng học vẹt từ riêng lẻ! Hãy nắm chắc từ loại (${v0.word_type}), phiên âm IPA (${v0.ipa || 'chuẩn'}), và đặt vào câu mẫu: "${v0.example_sentence}". Trong chủ đề ${unitTitle}, mỗi từ vựng là một mắt xích giúp công lực thăng hoa.`,
        dialogueByStatus: {
          not_started: [
            `Chào thiếu hiệp! Tàng Kinh Các lưu giữ toàn bộ bí tịch từ vựng của môn phái.`,
            `Tại ải Unit ${unitNum}: ${unitTitle} (${topic}), tà ma đang tìm cách xóa sạch các thuật ngữ cốt lõi như "${v0.word}".`,
            `Ta muốn giao cho thiếu hiệp nhiệm vụ đả thông căn cơ từ vựng. Thiếu hiệp đã sẵn sàng tiếp nhận chưa?`,
          ],
          in_progress: [
            `Thiếu hiệp vẫn đang trong hành trình đả thông từ vựng "${v0.word}"!`,
            `Hãy đến Tàng Kinh Các tra cứu kỹ bí điển, hoặc thiếu hiệp có thể thực hiện bài khảo thí từ vựng của ta ngay tại đây để hoàn thành nhiệm vụ!`,
          ],
          completed: [
            `Tốt lắm! Thiếu hiệp đã nắm vững ý nghĩa và ngữ cảnh chuẩn xác của "${v0.word}".`,
            `Căn cơ từ vựng đã thông suốt, khí lực dồi dào. Hãy thu nhận phần thưởng xứng đáng!`,
          ],
          rewarded: [
            `Thiếu hiệp đã hoàn thành xuất sắc nhiệm vụ từ vựng của ${unitTitle}.`,
            `Bất cứ lúc nào muốn ôn lại từ vựng để chuẩn bị quyết đấu, hãy bấm nút luyện tập bên dưới. Không cần phải đi săn quái chỉ để ôn kiến thức!`,
          ],
        },
        exercise: {
          type: 'vocab',
          prompt: `Khảo Thí Từ Vựng: Trong chủ đề "${unitTitle}", từ "${v0.word}" (${v0.word_type}) có nghĩa tiếng Việt chuẩn xác nhất là gì?`,
          options: [v0.meaning_vi, ...vDistractors].sort(() => 0.5 - Math.random()),
          correctAnswer: v0.meaning_vi,
          explanation: `Chính xác! "${v0.word}" (${v0.word_type}) nghĩa là "${v0.meaning_vi}". Ví dụ: "${v0.example_sentence}"`,
          knowledgeItemIds: [v0.id],
        },
      };
    }

    // 2. THẦY ĐẶNG TRẦN HÀ (NGỮ PHÁP & LOGIC)
    if (npcId === 'ho_phap_dang_tran_ha') {
      const gSentence = g0.example_sentences[0] || {
        en: 'True discipline leads to ultimate mastery.',
        vi: 'Kỷ luật chân chính dẫn tới đỉnh cao võ học.',
      };
      const cleanWords = gSentence.en.replace(/[.,!?]/g, '').split(/\s+/).filter(Boolean);

      return {
        id: `${unitId}_quest_dang_tran_ha`,
        npcId,
        unitId,
        title: `Phá Phong Ấn Ngữ Pháp: ${unitTitle}`,
        skillName: GUARDIAN_METAS.ho_phap_dang_tran_ha.skillName,
        objective: `Giải phá cấu trúc cú pháp "${g0.structure_name}" của ${unitTitle} (Unit ${unitNum})`,
        nextLocation: `Phong Ấn Thạch Trận (Trước Tàng Kinh Các)`,
        rewardXp: 75 + unitNum * 5,
        rewardProgressGain: 10,
        tutorialGuidance: `💡 Yếu Quyết Cú Pháp: Ngữ pháp chính là khung xương của kiếm chiêu! Trong ${unitTitle}, quy tắc trọng yếu là "${g0.rule_summary}". Hãy sắp xếp các mảnh từ đúng trật tự logic, phân định rõ chủ ngữ, trợ động từ và tân ngữ để kiếm ý không bị đứt đoạn.`,
        dialogueByStatus: {
          not_started: [
            `Võ học vô chiêu thắng hữu chiêu, nhưng cú pháp là quy luật bất biến của ngôn từ!`,
            `Tại ải Unit ${unitNum}: ${unitTitle}, Vô Ngôn Ma Giáo đã dùng tà thuật làm hỗn loạn cấu trúc: ${g0.structure_name}.`,
            `Ta giao cho thiếu hiệp nhiệm vụ sắp xếp lại kiếm quyết ngữ pháp để kích hoạt thạch trận hộ môn!`,
          ],
          in_progress: [
            `Thiếu hiệp vẫn chưa phá giải xong trận đồ ngữ pháp ${g0.structure_name}!`,
            `Hãy đến trước Phong Ấn Thạch Trận hoặc thực hiện bài xếp chữ ngay tại đây để mở khóa kinh mạch!`,
          ],
          completed: [
            `Tuyệt diệu! Từng câu chữ đã vào đúng vị trí, kiếm khí tuôn trào liền mạch.`,
            `Thiếu hiệp đã lĩnh hội trọn vẹn quy tắc "${g0.structure_name}". Mau thu nhận phần thưởng tu vi!`,
          ],
          rewarded: [
            `Khẩu quyết ngữ pháp của ${unitTitle} đã được khắc sâu.`,
            `Khi nào muốn trau dồi lại logic câu và phản xạ ngữ pháp, hãy vào luyện tập lại cùng ta bất cứ lúc nào!`,
          ],
        },
        exercise: {
          type: 'grammar',
          prompt: `Phá Phong Ấn Ngữ Pháp: Hãy sắp xếp các mảnh từ sau thành câu chuẩn xác theo cấu trúc "${g0.structure_name}":\n"${gSentence.vi}"`,
          options: cleanWords,
          wordsToOrder: cleanWords,
          correctAnswer: cleanWords.join(' '),
          explanation: `Chính xác! Câu hoàn chỉnh: "${gSentence.en}". Ý nghĩa: "${gSentence.vi}". Cấu trúc tuân theo quy tắc: ${g0.rule_summary}`,
          knowledgeItemIds: [g0.id],
        },
      };
    }

    // 3. CÔ HOÀNG VÂN (NGHE & PHÁT ÂM CHUẨN SGK)
    if (npcId === 'ho_phap_hoang_van') {
      const pronData = PronunciationService.getPronunciationByUnit(unitId);
      const challenge = pronData.challengeQuestion;
      const targetSoundList = pronData.targetSounds.join(', ');

      return {
        id: `${unitId}_quest_hoang_van`,
        npcId,
        unitId,
        title: `Thính Âm Luyện Khí: ${unitTitle} - ${pronData.focusTopic}`,
        skillName: GUARDIAN_METAS.ho_phap_hoang_van.skillName,
        objective: `Luyện nghe và lĩnh hội khẩu quyết phát âm "${pronData.focusTopic}" của ${unitTitle} (Unit ${unitNum})`,
        nextLocation: `Võ Luyện Đài (Khu Vực Phía Đông)`,
        rewardXp: 70 + unitNum * 5,
        rewardProgressGain: 10,
        tutorialGuidance: `💡 Khẩu Quyết Phát Âm Chuẩn SGK (${pronData.focusTopic}): ${pronData.ruleSummary} 👄 Hướng Dẫn Khẩu Hình: ${pronData.mouthGuide}`,
        dialogueByStatus: {
          not_started: [
            `Thính âm biện vị! Trên chiến trường vạn biến, phát âm chuẩn chính là chìa khóa để phân biệt chân tướng và ảo ảnh.`,
            `Tại Unit ${unitNum}: ${unitTitle}, ma chướng đang làm nhiễu loạn khẩu quyết phát âm: ${pronData.focusTopic}.`,
            `Ta truyền cho thiếu hiệp bí quyết "${pronData.wuxiaSecretName}". Hãy lắng nghe cẩn trọng và tiếp nhận thử thách phát âm!`,
          ],
          in_progress: [
            `Khẩu quyết phát âm ${pronData.focusTopic} vẫn đang đợi thiếu hiệp tại Võ Luyện Đài!`,
            `Hãy lắng nghe thật kỹ từng âm tiết khẩu quyết (${targetSoundList}). Thiếu hiệp có thể nghe và đối đáp ngay tại đây!`,
          ],
          completed: [
            `Nhĩ lực tuyệt đỉnh! Thiếu hiệp đã nghe rõ và phân định chuẩn xác khẩu quyết "${pronData.focusTopic}".`,
            `Khẩu âm và thính lực tăng tiến vượt bậc! Mau nhận thưởng tu vi xứng đáng!`,
          ],
          rewarded: [
            `Khẩu quyết phát âm của ${unitTitle} (${pronData.focusTopic}) đã đạt cảnh giới thuần thục.`,
            `Bất cứ lúc nào cần luyện tai nghe hoặc trau dồi lại các âm ${targetSoundList}, hãy vào luyện tập cùng ta bất cứ lúc nào!`,
          ],
        },
        exercise: {
          type: 'listening',
          prompt: `Thính Âm Biện Vị: ${challenge.prompt}`,
          audioScript: challenge.audioScript || v0.example_sentence,
          options: challenge.options,
          correctAnswer: challenge.correctAnswer,
          explanation: `Chính xác! ${challenge.explanation}`,
          knowledgeItemIds: [v0.id],
        },
      };
    }

    // 4. CÔ NGUYỆT NGUYÊN (ĐỌC HIỂU & MINH TRIẾT)
    const readKeywords = reading?.keywords || ['balance', 'responsibility'];
    const p1 = readKeywords[0] || 'harmony';
    const p2 = readKeywords[1] || 'dedication';
    const passageSentences = [
      `In the journey of ${unitTitle.toLowerCase()}, each disciple must cultivate dedication.`,
      `Ancient teachings reveal that consistent practice directly strengthens personal ${p1}.`,
      `Furthermore, legendary masters proved that real victory relies on collective ${p2}.`,
      `Those who disregard these principles inevitably succumb to mental illusions.`,
    ];

    return {
      id: `${unitId}_quest_nguyet_nguyen`,
      npcId,
      unitId,
      title: `Minh Triết Phá Ảo: ${unitTitle}`,
      skillName: GUARDIAN_METAS.ho_phap_nguyet_nguyen.skillName,
      objective: `Phân tích văn bản "${reading?.topic || unitTitle}" và định vị câu dẫn chứng của ${unitTitle} (Unit ${unitNum})`,
      nextLocation: `Minh Triết Các (Khu Vực Tây Nam)`,
      rewardXp: 80 + unitNum * 5,
      rewardProgressGain: 10,
      tutorialGuidance: `💡 Yếu Quyết Minh Triết: Đọc hiểu là soi tỏ chân tướng sau làn sương mờ! Luôn áp dụng 3 bước: 1. Đọc lướt (Skimming) để nắm ý chính "${reading?.main_idea || topic}"; 2. Đọc quét (Scanning) để dò từ khóa; 3. Neo bằng chứng (Evidence Anchor) - mọi đáp án phải có câu dẫn chứng bảo chứng, tuyệt đối không suy diễn cảm tính!`,
      dialogueByStatus: {
        not_started: [
          `Minh Triết Các soi rọi chân lý! Tà phái thường tung hỏa mù bằng những thông tin ngụy tạo trong chủ đề ${reading?.topic || unitTitle}.`,
          `Nhiệm vụ của thiếu hiệp là đọc trích lục văn bản cổ, vạch trần luận điểm sai lệch bằng cách chỉ ra đúng câu dẫn chứng!`,
          `Thiếu hiệp có dám thắp sáng ngọn đèn minh triết để phá ảo giác ma đạo không?`,
        ],
        in_progress: [
          `Ảo ảnh ma đạo vẫn chưa được xóa bỏ!`,
          `Hãy đọc kỹ đoạn văn bản bên dưới, đối chiếu từng câu để tìm ra bằng chứng xác đáng nhất. Thiếu hiệp có thể luận giải ngay tại đây!`,
        ],
        completed: [
          `Minh triết tuyệt luân! Thiếu hiệp đã đối chiếu đúng câu dẫn chứng, phá tan toàn bộ huyễn thuật của kẻ địch!`,
          `Trí tuệ sáng tỏ như gương đài. Mau thu nhận chiến lợi phẩm tu vi!`,
        ],
        rewarded: [
          `Tu vi đọc hiểu của thiếu hiệp tại ${unitTitle} đã khai thông toàn diện.`,
          `Bất cứ khi nào muốn rèn luyện kỹ năng đọc sâu và trích xuất bằng chứng, hãy quay lại Minh Triết Các luận đạo cùng ta!`,
        ],
      },
      exercise: {
        type: 'reading',
        prompt: `Minh Triết Phá Ảo: Theo văn bản bên dưới, điều gì trực tiếp củng cố "${p1}" của người tu luyện? Hãy chọn đáp án và xác định đúng câu dẫn chứng [1]-[4]!`,
        readingPassage: passageSentences.map((s, idx) => `[${idx + 1}] ${s}`).join(' '),
        passageSentences,
        evidenceIndex: 2, // 1-indexed
        options: [
          `Consistent practice (Luyện tập kiên định đều đặn)`,
          `Disregarding ancient teachings (Phớt lờ giáo huấn cổ xưa)`,
          `Succumbing to mental illusions (Đầu hàng trước ảo giác)`,
          `Wandering aimlessly (Hành động không phương hướng)`,
        ],
        correctAnswer: `Consistent practice (Luyện tập kiên định đều đặn)`,
        explanation: `Chính xác! Đáp án đúng là "Consistent practice", được dẫn chứng rõ ràng ở câu [2]: "${passageSentences[1]}"`,
        knowledgeItemIds: [reading?.id || 'reading_default'],
      },
    };
  }
}
