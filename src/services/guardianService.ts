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
    name: 'Hộ Pháp Đặng Trần Hà',
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
    name: 'Hộ Pháp Hoàng Vân',
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
    name: 'Hộ Pháp Nguyệt Nguyên',
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

    if (unitStates[npcId] === 'in_progress') {
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
    if (currentStatus !== 'completed' || unitId !== profile.selectedUnitId) {
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
        `làm việc thiếu cẩn thận`,
        `ngại thử và bỏ cuộc`,
        `phép làm người khác nhìn nhầm`,
      ];

      return {
        id: `${unitId}_quest_phuong_tu`,
        npcId,
        unitId,
        title: `Tìm lại từ mới: ${unitTitle}`,
        skillName: GUARDIAN_METAS.ho_phap_phuong_tu.skillName,
        objective: `Học từ "${v0.word}" (${v0.meaning_vi}) của ${unitTitle} (Unit ${unitNum})`,
        nextLocation: `Tàng Kinh Các (Khu vực góc Tây Bắc)`,
        rewardXp: 60 + unitNum * 5,
        rewardProgressGain: 10,
        tutorialGuidance: `Học "${v0.word}" cùng nghĩa và câu mẫu: "${v0.example_sentence}". Xem từ loại (${v0.word_type}) rồi thử tự đặt một câu; đừng chỉ nhớ mặt chữ.`,
        dialogueByStatus: {
          not_started: [
            `Chào thiếu hiệp! Ở bài ${unitNum}: ${unitTitle}, ta giữ nhà sách. Kiếm có thể cùn, nhưng vốn từ thì đừng để cùn nhé!`,
            `Vô Ngôn Ma Giáo đang giấu từ "${v0.word}". Nó nghĩa là "${v0.meaning_vi}" — nhớ được từ này là giành lại một trang sách.`,
            `Đọc câu "${v0.example_sentence}" rồi thử chọn nghĩa đúng. Cứ làm tại đây; ta chưa bắt đệ leo núi tìm sách đâu!`,
          ],
          in_progress: [
            `Từ "${v0.word}" vẫn chờ đệ giải cứu. Đừng đoán theo vẻ ngoài: từ tiếng Anh cũng biết cải trang như người trong giang hồ!`,
            `Mở nhà sách xem nghĩa và câu mẫu, rồi quay lại làm bài ở đây. Sai thì thử lại, ta không thu thêm học phí.`,
          ],
          completed: [
            `Đúng rồi! "${v0.word}" nghĩa là "${v0.meaning_vi}". Một trang sách đã trở về, Ma Giáo chắc đang vò đầu.`,
            `Nhận thưởng nhé! Muốn nhớ lâu, hãy tự đặt thêm một câu tiếng Anh với từ này.`,
          ],
          rewarded: [
            `Bài ${unitTitle} đã có thêm một người giữ chữ. Phần thưởng đã trao rồi, nhưng nhà sách vẫn mở cửa cho đệ.`,
            `Cần ôn lại thì luyện tập lần nữa. Luyện từ mỗi ngày vài phút cũng được, không cần ngồi thiền với từ điển cả đêm!`,
          ],
        },
        exercise: {
          type: 'vocab',
          prompt: `Chọn nghĩa của từ: Trong chủ đề "${unitTitle}", từ "${v0.word}" (${v0.word_type}) có nghĩa tiếng Việt chuẩn xác nhất là gì?`,
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
        title: `Xếp lại câu: ${unitTitle}`,
        skillName: GUARDIAN_METAS.ho_phap_dang_tran_ha.skillName,
        objective: `Xếp câu theo "${g0.structure_name}" của ${unitTitle} (Unit ${unitNum})`,
        nextLocation: `Phong Ấn Thạch Trận (Trước Tàng Kinh Các)`,
        rewardXp: 75 + unitNum * 5,
        rewardProgressGain: 10,
        tutorialGuidance: `Quy tắc: ${g0.rule_summary} Đọc nghĩa tiếng Việt, tìm chủ ngữ và động từ, rồi xếp từng từ. Chạm từ đã chọn để lấy ra nếu cần sửa.`,
        dialogueByStatus: {
          not_started: [
            `Thiếu hiệp đến đúng lúc! Bài ${unitNum}: ${unitTitle} đang bị Ma Giáo đảo chữ. Kiếm chưa rút mà câu đã rối!`,
            `Hôm nay ta luyện "${g0.structure_name}". Nhớ nhé: ${g0.rule_summary}`,
            `Xếp các từ thành câu theo nghĩa tiếng Việt. Từ nào đứng sai chỗ thì chạm để lấy ra; đừng dùng kiếm chém bàn phím!`,
          ],
          in_progress: [
            `Trận xếp chữ "${g0.structure_name}" còn chưa mở. Bình tĩnh, câu tiếng Anh không chạy trốn đâu.`,
            `Tìm ai làm việc gì trước, rồi xem động từ và các từ còn lại. Có thể làm bài ngay tại đây và thử lại nếu sai.`,
          ],
          completed: [
            `Hay lắm! Các từ đã đứng đúng hàng, còn ngay ngắn hơn đệ tử môn phái lúc xếp hàng ăn cơm.`,
            `Đệ đã hiểu "${g0.structure_name}". Nhận thưởng rồi thử tự viết một câu tương tự nhé!`,
          ],
          rewarded: [
            `Bài ${unitTitle} đã xếp lại gọn gàng. Thưởng thì chỉ một lần, luyện câu thì bao nhiêu lần cũng được.`,
            `Gặp câu khó cứ quay lại. Chậm mà hiểu còn hơn xuất chiêu nhanh rồi quên mất chủ ngữ!`,
          ],
        },
        exercise: {
          type: 'grammar',
          prompt: `Xếp lại câu: Hãy sắp xếp các mảnh từ sau thành câu chuẩn xác theo cấu trúc "${g0.structure_name}":\n"${gSentence.vi}"`,
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
        title: `Luyện nghe: ${unitTitle} - ${pronData.focusTopic}`,
        skillName: GUARDIAN_METAS.ho_phap_hoang_van.skillName,
        objective: `Nghe và học cách phát âm "${pronData.focusTopic}" của ${unitTitle} (Unit ${unitNum})`,
        nextLocation: `Võ Luyện Đài (Khu Vực Phía Đông)`,
        rewardXp: 70 + unitNum * 5,
        rewardProgressGain: 10,
        tutorialGuidance: `Cách phát âm (${pronData.focusTopic}): ${pronData.ruleSummary} Cách đặt miệng: ${pronData.mouthGuide} Có thể nghe lại nhiều lần trước khi chọn.`,
        dialogueByStatus: {
          not_started: [
            `Chào thiếu hiệp! Bài ${unitNum}: ${unitTitle} luyện "${pronData.focusTopic}". Tai nghe tốt cũng là một món võ công đấy.`,
            `Ma Giáo hay nuốt âm để làm người nghe nhầm. Nghe rõ các âm ${targetSoundList}, đừng để nó đọc một đằng mà đệ chọn một nẻo!`,
            `Bấm nghe, xem mẹo phát âm rồi chọn đáp án. Có thể nghe lại nhiều lần; ta không bắt đệ nghe tiếng muỗi bằng tiếng Anh đâu.`,
          ],
          in_progress: [
            `Bài nghe "${pronData.focusTopic}" đang đợi. Tai chưa quen thì nghe lại, cao thủ cũng từng nghe nhầm mà!`,
            `Chú ý âm ${targetSoundList}. Nếu máy không phát được tiếng, xem phần chữ và mẹo phát âm để tiếp tục.`,
          ],
          completed: [
            `Chuẩn rồi! Đệ nghe ra "${pronData.focusTopic}". Ma Giáo định đánh lừa tai, cuối cùng tự nghe tiếng thua cuộc.`,
            `Nhận thưởng nhé! Thử đọc lại thật chậm rồi tăng tốc; rõ tiếng trước, oai phong sau.`,
          ],
          rewarded: [
            `Bài ${unitTitle} đã luyện xong. Đệ cứ quay lại nghe và đọc các âm ${targetSoundList} khi cần.`,
            `Nghe tiếng Anh vài phút mỗi ngày nhé. Nghe xong hiểu được mới là thắng, bật thật to thì chỉ làm hàng xóm giật mình!`,
          ],
        },
        exercise: {
          type: 'listening',
          prompt: `Nghe và chọn: ${challenge.prompt}`,
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
      title: `Tìm bằng chứng: ${unitTitle}`,
      skillName: GUARDIAN_METAS.ho_phap_nguyet_nguyen.skillName,
      objective: `Đọc đoạn văn "${reading?.topic || unitTitle}" và tìm câu làm bằng chứng của ${unitTitle} (Unit ${unitNum})`,
      nextLocation: `Minh Triết Các (Khu Vực Tây Nam)`,
      rewardXp: 80 + unitNum * 5,
      rewardProgressGain: 10,
      tutorialGuidance: `Đọc câu hỏi trước, tìm từ quan trọng trong đoạn văn rồi đọc cả câu chứa từ đó. Chọn đáp án và số câu làm bằng chứng. Không thêm ý ngoài bài.`,
      dialogueByStatus: {
        not_started: [
          `Thiếu hiệp! Bài ${unitNum}: ${unitTitle} có chuyện về "${reading?.topic || topic}". Ma Giáo đang trộn lời thật với lời bịa.`,
          `Đọc đoạn tiếng Anh, chọn câu trả lời rồi chỉ ra câu làm bằng chứng. Đoán đúng mà không có bằng chứng thì vẫn dễ bị lừa!`,
          `Cứ đọc từng câu. Sách không phải đối thủ biết chạy, đệ không cần đuổi theo nó bằng khinh công.`,
        ],
        in_progress: [
          `Đoạn văn vẫn còn một lời cần kiểm chứng. Đừng tin đáp án chỉ vì nó viết dài và trông có vẻ thông thái.`,
          `Tìm từ trong câu hỏi ở đoạn văn, đọc cả câu đó rồi chọn đáp án cùng số câu dẫn chứng. Có thể thử lại ngay tại đây.`,
        ],
        completed: [
          `Đúng cả đáp án lẫn bằng chứng! Lời bịa của Ma Giáo hết chỗ trốn rồi.`,
          `Nhận thưởng nhé. Nhớ cách này khi đọc tiếng Anh: tìm câu nói rõ điều mình cần, đừng tự thêm ý ngoài bài.`,
        ],
        rewarded: [
          `Bài ${unitTitle} đã rõ thật giả. Thưởng đã trao, còn đoạn văn vẫn ở đây để đệ đọc lại.`,
          `Đọc đều mỗi ngày nhé. Võ công đọc hiểu không cần áo choàng bay trong gió, chỉ cần mắt tinh và đầu tỉnh!`,
        ],
      },
      exercise: {
        type: 'reading',
        prompt: `Tìm bằng chứng: Theo văn bản bên dưới, điều gì trực tiếp củng cố "${p1}" của người tu luyện? Hãy chọn đáp án và xác định đúng câu dẫn chứng [1]-[4]!`,
        readingPassage: passageSentences.map((s, idx) => `[${idx + 1}] ${s}`).join(' '),
        passageSentences,
        evidenceIndex: 2, // 1-indexed
        options: [
          `Consistent practice (Luyện tập đều đặn)`,
          `Disregarding ancient teachings (Bỏ qua lời dạy cũ)`,
          `Succumbing to mental illusions (Đầu hàng trước ảo giác)`,
          `Wandering aimlessly (Đi lang thang)`,
        ],
        correctAnswer: `Consistent practice (Luyện tập đều đặn)`,
        explanation: `Chính xác! Đáp án đúng là "Consistent practice", được dẫn chứng rõ ràng ở câu [2]: "${passageSentences[1]}"`,
        knowledgeItemIds: [reading?.id || 'reading_default'],
      },
    };
  }
}
