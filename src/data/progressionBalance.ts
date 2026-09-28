/**
 * PROGRESSION BALANCE & CONFIGURATION FOR ALL 30 UNITS (GRADES 10, 11, 12)
 * Centralizes all progression rules, point allocations, thresholds, rewards,
 * anti-farming safeguards, and targeted remediation logic.
 */
import { PlayerProfile, UnitProgressState, GuardianId } from '../types/game';
import { ALL_LEVEL_CONFIGS } from '../game/levels/levelConfig';
import { getUnitDataset } from '../../content/global-success';

export interface UnitBalanceProfile {
  unitId: string;
  grade: 10 | 11 | 12;
  unitNumber: number;
  title: string;
  topic: string;
  learningActivitiesCount: number;
  encountersCount: number;
  difficulty: 'easy' | 'medium' | 'hard';
  climaxUnlockThreshold: number; // 70%
  nextUnitUnlockThreshold: number; // 70% or Boss defeated
  maxUnitProgress: number; // 100%
  progressionPoints: {
    questStep1: number;
    questStep2: number;
    questStep3: number;
    questStep4: number;
    questStep5: number;
    propActivityPerItem: number;
    guardianQuestPerNpc: number;
    totalAvailablePoints: number;
  };
  xpRewards: {
    questsTotal: number;
    propsTotal: number;
    guardiansTotal: number;
    mobsTotal: number;
    bossXp: number;
    grandTotalXp: number;
  };
  keyItems: string[];
  estimatedPlaytimeMinutes: number;
}

export const PROGRESSION_THRESHOLDS = {
  CLIMAX_UNLOCK_PERCENT: 70,
  NEXT_UNIT_UNLOCK_PERCENT: 70,
  MAX_UNIT_PROGRESS: 100,
} as const;

export const PROGRESSION_POINTS = {
  QUEST_STEP_1_INTRO: 15,
  QUEST_STEP_2_VOCAB: 20,
  QUEST_STEP_3_CHALLENGE: 20,
  QUEST_STEP_4_MOBS: 25,
  QUEST_STEP_5_BOSS: 20,
  PROP_ACTIVITY: 5,
  GUARDIAN_QUEST: 10,
  GUARDIAN_TRAINING: 0, // 0% tiến độ để chống cày lặp
} as const;

export const REWARD_CONFIG = {
  PROP_XP: 35,
  GUARDIAN_TRAINING_XP: 25,
  getQuestXp: (step: number, unitNumber: number): number => {
    const delta = Math.max(0, unitNumber - 1);
    switch (step) {
      case 1:
        return 50 + delta * 10;
      case 2:
        return 80 + delta * 10;
      case 3:
        return 120 + delta * 10;
      case 4:
        return 200 + delta * 15;
      case 5:
        return 500 + delta * 30;
      default:
        return 50;
    }
  },
  getGuardianQuestXp: (unitNumber: number): number => {
    return 75 + Math.max(0, unitNumber - 1) * 5;
  },
};

/**
 * Tạo dữ liệu cân bằng chuẩn cho toàn bộ 30 Unit
 */
function buildAllUnitBalanceProfiles(): Record<string, UnitBalanceProfile> {
  const result: Record<string, UnitBalanceProfile> = {};

  const grades: Array<10 | 11 | 12> = [10, 11, 12];

  for (const grade of grades) {
    for (let u = 1; u <= 10; u++) {
      const unitId = `g${grade}-u${u.toString().padStart(2, '0')}`;
      const levelCfg = ALL_LEVEL_CONFIGS[unitId];
      const rawDataset = getUnitDataset(unitId);

      const title = levelCfg?.title || rawDataset?.metadata?.title || `Unit ${u}`;
      const topic = levelCfg?.topic || rawDataset?.metadata?.topic || `Chủ đề bài học ${u}`;

      // Độ khó tăng dần theo số thứ tự Unit trong năm học
      let difficulty: 'easy' | 'medium' | 'hard' = 'easy';
      if (grade === 12) {
        difficulty = u <= 3 ? 'medium' : 'hard';
      } else if (grade === 11) {
        difficulty = u <= 3 ? 'easy' : u <= 7 ? 'medium' : 'hard';
      } else {
        difficulty = u <= 4 ? 'easy' : u <= 8 ? 'medium' : 'hard';
      }

      const activePropsCount = levelCfg?.props ? levelCfg.props.filter((p) => p.category && p.category !== 'decoration').length : 2;
      const guardianQuestsCount = 4; // 4 Hộ Pháp: Phương Tú, Đặng Trần Hà, Hoàng Vân, Nguyệt Nguyên
      const learningActivitiesCount = 1 /* Vocab */ + 1 /* Challenge */ + activePropsCount + guardianQuestsCount;

      const encountersCount = levelCfg?.enemies ? levelCfg.enemies.length : 6;

      // Tính tổng điểm khả dụng
      const totalQuestPoints = 15 + 20 + 20 + 25 + 20; // 100
      const totalPropPoints = activePropsCount * PROGRESSION_POINTS.PROP_ACTIVITY; // 10 - 15
      const totalGuardianPoints = guardianQuestsCount * PROGRESSION_POINTS.GUARDIAN_QUEST; // 40
      const totalAvailablePoints = totalQuestPoints + totalPropPoints + totalGuardianPoints; // ~150 - 155

      // XP calculation
      const questsTotalXp =
        REWARD_CONFIG.getQuestXp(1, u) +
        REWARD_CONFIG.getQuestXp(2, u) +
        REWARD_CONFIG.getQuestXp(3, u) +
        REWARD_CONFIG.getQuestXp(4, u) +
        REWARD_CONFIG.getQuestXp(5, u);
      const propsTotalXp = activePropsCount * REWARD_CONFIG.PROP_XP;
      const guardiansTotalXp = guardianQuestsCount * REWARD_CONFIG.getGuardianQuestXp(u);

      const mobsXp = levelCfg?.enemies
        ? levelCfg.enemies.reduce((acc, e) => acc + (e.xpReward || 50), 0)
        : 350;
      const bossXp = levelCfg?.climax?.enemy?.xpReward || (500 + u * 30);
      const grandTotalXp = questsTotalXp + propsTotalXp + guardiansTotalXp + mobsXp;

      // Key Items by Unit milestones
      const keyItems: string[] = ['Thanh Phong Kiếm', 'Bích Ngọc Bình An Phù'];
      if (u >= 3) keyItems.push('Anh Ngữ Bí Điển');
      if (u === 3 || u === 6 || u === 10) keyItems.push('Rương Thần Binh Ma Giáo');

      // Estimated Playtime: ~12-18 phút tùy độ khó và số lượng hoạt động
      const baseMinutes = 12;
      const difficultyBonus = difficulty === 'hard' ? 4 : difficulty === 'medium' ? 2 : 0;
      const estimatedPlaytimeMinutes = baseMinutes + (u % 3) + difficultyBonus;

      result[unitId] = {
        unitId,
        grade,
        unitNumber: u,
        title,
        topic,
        learningActivitiesCount,
        encountersCount,
        difficulty,
        climaxUnlockThreshold: PROGRESSION_THRESHOLDS.CLIMAX_UNLOCK_PERCENT,
        nextUnitUnlockThreshold: PROGRESSION_THRESHOLDS.NEXT_UNIT_UNLOCK_PERCENT,
        maxUnitProgress: PROGRESSION_THRESHOLDS.MAX_UNIT_PROGRESS,
        progressionPoints: {
          questStep1: PROGRESSION_POINTS.QUEST_STEP_1_INTRO,
          questStep2: PROGRESSION_POINTS.QUEST_STEP_2_VOCAB,
          questStep3: PROGRESSION_POINTS.QUEST_STEP_3_CHALLENGE,
          questStep4: PROGRESSION_POINTS.QUEST_STEP_4_MOBS,
          questStep5: PROGRESSION_POINTS.QUEST_STEP_5_BOSS,
          propActivityPerItem: PROGRESSION_POINTS.PROP_ACTIVITY,
          guardianQuestPerNpc: PROGRESSION_POINTS.GUARDIAN_QUEST,
          totalAvailablePoints,
        },
        xpRewards: {
          questsTotal: questsTotalXp,
          propsTotal: propsTotalXp,
          guardiansTotal: guardiansTotalXp,
          mobsTotal: mobsXp,
          bossXp,
          grandTotalXp,
        },
        keyItems,
        estimatedPlaytimeMinutes,
      };
    }
  }

  return result;
}

export const UNIT_BALANCE_TABLE: Record<string, UnitBalanceProfile> = buildAllUnitBalanceProfiles();

export function getUnitBalance(unitId: string): UnitBalanceProfile {
  return (
    UNIT_BALANCE_TABLE[unitId] ||
    UNIT_BALANCE_TABLE['g10-u01'] || {
      unitId,
      grade: 10,
      unitNumber: 1,
      title: 'FAMILY LIFE',
      topic: 'Family Life',
      learningActivitiesCount: 6,
      encountersCount: 6,
      difficulty: 'easy',
      climaxUnlockThreshold: 70,
      nextUnitUnlockThreshold: 70,
      maxUnitProgress: 100,
      progressionPoints: {
        questStep1: 15,
        questStep2: 20,
        questStep3: 20,
        questStep4: 25,
        questStep5: 20,
        propActivityPerItem: 5,
        guardianQuestPerNpc: 10,
        totalAvailablePoints: 150,
      },
      xpRewards: {
        questsTotal: 950,
        propsTotal: 70,
        guardiansTotal: 320,
        mobsTotal: 350,
        bossXp: 530,
        grandTotalXp: 1690,
      },
      keyItems: ['Thanh Phong Kiếm'],
      estimatedPlaytimeMinutes: 14,
    }
  );
}

/**
 * Hệ thống Cố Vấn Khắc Phục Lỗi (Targeted Remediation Advisor)
 * Định vị chính xác điểm yếu của người chơi và chỉ đường tới Hộ Pháp phụ trách
 */
export interface RemediationGuidance {
  guardianId: GuardianId;
  guardianName: string;
  guardianLocation: string;
  skillCategory: 'Từ vựng' | 'Ngữ pháp' | 'Luyện nghe' | 'Đọc hiểu' | 'Tổng hợp';
  actionPrompt: string;
  pedagogicalAdvice: string;
}

export class RemediationAdvisor {
  static getAdvice(
    skillOrConcept: string = '',
    unitTopic: string = ''
  ): RemediationGuidance {
    const text = skillOrConcept.toLowerCase();

    // 1. NGHE & PHÁT ÂM (Listening & Pronunciation)
    if (
      text.includes('listen') ||
      text.includes('nghe') ||
      text.includes('sound') ||
      text.includes('pronun') ||
      text.includes('stress') ||
      text.includes('thính âm')
    ) {
      return {
        guardianId: 'ho_phap_hoang_van',
        guardianName: 'Cô Hoàng Vân',
        guardianLocation: 'Võ Luyện Đài (Khu Vực Phía Đông)',
        skillCategory: 'Luyện nghe',
        actionPrompt: 'Đến gặp Cô Hoàng Vân tại Võ Luyện Đài để luyện nghe khẩu quyết trọng tâm.',
        pedagogicalAdvice:
          'Tập trung lắng nghe trọng âm từ khóa, các âm nối tự nhiên và ngữ điệu câu. Bấm nút loa phát âm nhiều lần trước khi chọn đáp án.',
      };
    }

    // 2. NGỮ PHÁP & CÚ PHÁP (Grammar & Sentence Syntax)
    if (
      text.includes('grammar') ||
      text.includes('ngữ pháp') ||
      text.includes('tense') ||
      text.includes('cú pháp') ||
      text.includes('clause') ||
      text.includes('passive') ||
      text.includes('conditional') ||
      text.includes('structure') ||
      text.includes('phong ấn')
    ) {
      return {
        guardianId: 'ho_phap_dang_tran_ha',
        guardianName: 'Thầy Đặng Trần Hà',
        guardianLocation: 'Phong Ấn Thạch Trận (Trước Tàng Kinh Các)',
        skillCategory: 'Ngữ pháp',
        actionPrompt: 'Đến gặp Thầy Đặng Trần Hà để giải phá quy tắc cấu trúc ngữ pháp.',
        pedagogicalAdvice:
          'Xác định rõ trật tự: Chủ ngữ (Subject) + Trợ động từ (Auxiliary) + Động từ chính (Main Verb) + Tân ngữ (Object). Chú ý thì của động từ và sự hòa hợp chủ vị.',
      };
    }

    // 3. ĐỌC HIỂU & DẪN CHỨNG (Reading & Text Evidence)
    if (
      text.includes('reading') ||
      text.includes('đọc') ||
      text.includes('passage') ||
      text.includes('evidence') ||
      text.includes('dẫn chứng') ||
      text.includes('minh triết')
    ) {
      return {
        guardianId: 'ho_phap_nguyet_nguyen',
        guardianName: 'Cô Nguyệt Nguyên',
        guardianLocation: 'Minh Triết Các (Khu Vực Tây Nam)',
        skillCategory: 'Đọc hiểu',
        actionPrompt: 'Đến gặp Cô Nguyệt Nguyên tại Minh Triết Các để rèn luyện kỹ năng định vị dẫn chứng.',
        pedagogicalAdvice:
          'Áp dụng nguyên tắc "Neo Dẫn Chứng": Đọc lướt (Skimming) để nắm ý chính, quét từ khóa (Scanning), và chọn đáp án có câu trích dẫn bảo chứng trong đoạn.',
      };
    }

    // 4. MẶC ĐỊNH: TỪ VỰNG & CĂN CƠ (Vocabulary Mastery)
    return {
      guardianId: 'ho_phap_phuong_tu',
      guardianName: 'Cô Phương Tú',
      guardianLocation: 'Tàng Kinh Các (Tây Bắc Sơn Môn)',
      skillCategory: 'Từ vựng',
      actionPrompt: 'Đến Tàng Kinh Các gặp Cô Phương Tú hoặc mở Bí Điển Tri Thức để trau dồi từ vựng.',
      pedagogicalAdvice:
        `Ghi nhớ từ vựng theo ngữ cảnh của ${unitTopic || 'bài học'}. Chú ý từ loại (danh từ, tính từ, động từ) và các tiền tố / hậu tố biến đổi nghĩa.`,
    };
  }
}

/**
 * Kiểm soát Chống Nhận Thưởng Lặp (Anti-Farming Safeguard)
 */
export class AntiFarmingGuard {
  static canEarnPropReward(
    profile: PlayerProfile,
    unitId: string,
    propId: string
  ): boolean {
    const key = `${unitId}:${propId}`;
    if (profile.completedPropIds?.includes(key)) return false;
    const unitState = profile.unitStates?.[unitId];
    if (unitState?.completedPropIds?.includes(propId)) return false;
    return true;
  }

  static canEarnEnemyReward(
    profile: PlayerProfile,
    enemyId: string,
    encounterId?: string
  ): boolean {
    const encKey = encounterId || enemyId;
    if (profile.defeatedEnemyIds?.includes(encKey)) return false;
    if (profile.defeatedEnemyIds?.includes(enemyId)) return false;
    return true;
  }

  static canEarnGuardianQuestReward(
    profile: PlayerProfile,
    unitId: string,
    npcId: string
  ): boolean {
    const unitGuardianState = profile.guardianQuestStates?.[unitId];
    return unitGuardianState?.[npcId] !== 'rewarded';
  }
}

/**
 * Đánh giá và cập nhật trạng thái mở khóa cho toàn bộ 30 Unit
 * (Đảm bảo người chơi mở màn kế tiếp ngay lập tức khi đạt ngưỡng 70% hoặc hoàn thành)
 */
export function evaluateUnitUnlocks(
  unitStates: Record<string, UnitProgressState>
): Record<string, UnitProgressState> {
  const updated = { ...unitStates };
  const grades: Array<10 | 11 | 12> = [10, 11, 12];

  for (const grade of grades) {
    // Unit 1 luôn luôn mở khóa
    const u1Id = `g${grade}-u01`;
    if (updated[u1Id]) {
      updated[u1Id] = { ...updated[u1Id], isUnlocked: true };
    }

    // Các Unit từ 2 đến 10 mở khóa nếu Unit liền trước đạt >= 70% hoặc đã thắng Boss / hoàn thành
    for (let u = 2; u <= 10; u++) {
      const prevId = `g${grade}-u${(u - 1).toString().padStart(2, '0')}`;
      const currId = `g${grade}-u${u.toString().padStart(2, '0')}`;

      const prev = updated[prevId];
      if (prev && (prev.progress >= PROGRESSION_THRESHOLDS.NEXT_UNIT_UNLOCK_PERCENT || prev.isCompleted || prev.bossDefeated)) {
        if (updated[currId]) {
          updated[currId] = { ...updated[currId], isUnlocked: true };
        }
      }
    }
  }

  return updated;
}
