import { PlayerProfile, InventoryItem, CombatEnemy, UnitProgressState } from '../types/game';
import { CombatEngine } from './combatEngine';
import { calculateCongLuc } from './storage';
import { MasteryEngine } from './masteryEngine';
import { INITIAL_ITEMS } from '../data/itemsData';
import {
  evaluateUnitUnlocks,
  AntiFarmingGuard,
  PROGRESSION_POINTS,
  REWARD_CONFIG,
} from '../data/progressionBalance';

export interface QuestAdvanceResult {
  profile: PlayerProfile;
  didLevelUp: boolean;
  questCompletedTitle?: string;
  xpGained: number;
  progressGain: number;
}

export interface LearnVocabResult {
  profile: PlayerProfile;
  didCompleteQuest2: boolean;
  didLevelUp: boolean;
  xpGained: number;
  progressGain: number;
}

export interface ChallengeResult {
  profile: PlayerProfile;
  didLevelUp: boolean;
  xpGained: number;
  progressGain: number;
  rewardItem?: InventoryItem;
}

export interface CombatVictoryResult {
  profile: PlayerProfile;
  didLevelUp: boolean;
  didCompleteQuest4: boolean;
  didCompleteBoss: boolean;
  totalXpGained: number;
  wasAlreadyDefeated: boolean;
}

export class ProgressionEngine {
  /**
   * Đồng bộ trạng thái Unit đang chọn vào unitStates và tự động tính toán mở khóa các màn tiếp theo
   */
  static syncUnitStates(
    profile: PlayerProfile,
    unitProgress: number,
    quests: any[],
    extra?: {
      defeatedMobs?: number;
      defeatedEnemyIds?: string[];
      bossDefeated?: boolean;
      learnedVocabIds?: string[];
      completedPropIds?: string[];
    }
  ): Record<string, UnitProgressState> {
    const currentUnitStates = { ...(profile.unitStates || {}) };
    if (profile.selectedUnitId && currentUnitStates[profile.selectedUnitId]) {
      const activeUnit = { ...currentUnitStates[profile.selectedUnitId] };
      activeUnit.progress = unitProgress;
      activeUnit.quests = quests;
      if (extra?.defeatedMobs !== undefined) activeUnit.defeatedMobs = extra.defeatedMobs;
      if (extra?.defeatedEnemyIds !== undefined) activeUnit.defeatedEnemyIds = extra.defeatedEnemyIds;
      if (extra?.bossDefeated !== undefined) activeUnit.bossDefeated = extra.bossDefeated;
      if (extra?.learnedVocabIds !== undefined) activeUnit.learnedVocabIds = extra.learnedVocabIds;
      if (extra?.completedPropIds !== undefined) activeUnit.completedPropIds = extra.completedPropIds;
      activeUnit.isCompleted = activeUnit.bossDefeated || unitProgress >= 100;
      activeUnit.lastPlayedAt = Date.now();
      currentUnitStates[profile.selectedUnitId] = activeUnit;
    }
    return evaluateUnitUnlocks(currentUnitStates);
  }

  /**
   * Hoàn thành một quest theo ID (ví dụ quest_1 bái kiến Bang Chủ)
   */
  static advanceQuest(profile: PlayerProfile, questId: string): QuestAdvanceResult {
    const quests = [...profile.quests];
    const questIdx = quests.findIndex((q) => q.id === questId);
    if (questIdx === -1 || quests[questIdx].status === 'completed') {
      return { profile, didLevelUp: false, xpGained: 0, progressGain: 0 };
    }

    const currentQuest = quests[questIdx];
    quests[questIdx] = {
      ...currentQuest,
      status: 'completed',
      progress: currentQuest.maxProgress,
    };

    // Mở khóa quest tiếp theo nếu có
    if (questIdx + 1 < quests.length && quests[questIdx + 1].status === 'locked') {
      quests[questIdx + 1] = {
        ...quests[questIdx + 1],
        status: 'available',
      };
    }

    const xpReward = currentQuest.rewards.xp;
    const progressGain = currentQuest.unitProgressGain;
    const newUnitProgress = Math.min(100, profile.unitProgress + progressGain);

    const xpResult = CombatEngine.addXp(profile.stats, profile.equipment, xpReward);
    const stats = xpResult.stats;

    // Thưởng vật phẩm nếu có
    const updatedInventory = [...profile.inventory];
    if (currentQuest.rewards.items) {
      currentQuest.rewards.items.forEach((it) => {
        if (!updatedInventory.some((inv) => inv.id === it.id)) {
          updatedInventory.push({ ...it, isEquipped: false });
        }
      });
    }

    const updatedUnitStates = this.syncUnitStates(profile, newUnitProgress, quests);

    const newProfile: PlayerProfile = {
      ...profile,
      stats,
      inventory: updatedInventory,
      quests,
      unitProgress: newUnitProgress,
      unitStates: updatedUnitStates,
    };

    return {
      profile: newProfile,
      didLevelUp: xpResult.didLevelUp,
      questCompletedTitle: currentQuest.title,
      xpGained: xpReward,
      progressGain,
    };
  }

  /**
   * Học từ vựng tại Tàng Kinh Các (Quest 2)
   */
  static learnVocab(profile: PlayerProfile, vocabId: string): LearnVocabResult {
    if (profile.learnedVocabIds.includes(vocabId)) {
      return {
        profile,
        didCompleteQuest2: false,
        didLevelUp: false,
        xpGained: 0,
        progressGain: 0,
      };
    }

    const nextLearned = [...profile.learnedVocabIds, vocabId];
    let quests = [...profile.quests];
    let stats = { ...profile.stats };
    let unitProgress = profile.unitProgress;
    const inventory = [...profile.inventory];
    let didCompleteQuest2 = false;
    let didLevelUp = false;
    let xpGained = 0;
    let progressGain = 0;

    if (quests[1] && quests[1].status !== 'completed') {
      const q2 = { ...quests[1] };
      q2.progress = nextLearned.length;
      if (nextLearned.length >= 6) {
        q2.status = 'completed';
        q2.progress = 6;
        didCompleteQuest2 = true;

        // Mở Quest 3
        if (quests[2] && quests[2].status === 'locked') {
          quests[2] = { ...quests[2], status: 'available' };
        }
        progressGain = q2.unitProgressGain;
        unitProgress = Math.min(100, unitProgress + progressGain);
        xpGained = q2.rewards.xp;
        const xpResult = CombatEngine.addXp(stats, profile.equipment, xpGained);
        stats = xpResult.stats;
        didLevelUp = xpResult.didLevelUp;
      }
      quests[1] = q2;
    }

    const knowledgeMastery = { ...(profile.knowledgeMastery || {}) };
    if (!knowledgeMastery[vocabId]) {
      knowledgeMastery[vocabId] = MasteryEngine.createInitialMasteryRecord(vocabId);
    }

    const updatedUnitStates = this.syncUnitStates(profile, unitProgress, quests, {
      learnedVocabIds: nextLearned,
    });

    const newProfile: PlayerProfile = {
      ...profile,
      learnedVocabIds: nextLearned,
      knowledgeMastery,
      quests,
      stats,
      inventory,
      unitProgress,
      unitStates: updatedUnitStates,
    };

    return {
      profile: newProfile,
      didCompleteQuest2,
      didLevelUp,
      xpGained,
      progressGain,
    };
  }

  /**
   * Hoàn thành Thử Thách Phong Ấn Tri Thức (Quest 3)
   */
  static completeChallenge(profile: PlayerProfile): ChallengeResult {
    const quests = [...profile.quests];
    if (!quests[2] || quests[2].status === 'completed') {
      return {
        profile,
        didLevelUp: false,
        xpGained: 0,
        progressGain: 0,
      };
    }

    let stats = { ...profile.stats };
    let unitProgress = profile.unitProgress;
    const inventory = [...profile.inventory];

    const q3 = { ...quests[2] };
    q3.status = 'completed';
    q3.progress = q3.maxProgress;
    quests[2] = q3;

    // Mở Quest 4
    if (quests[3] && quests[3].status === 'locked') {
      quests[3] = { ...quests[3], status: 'available' };
    }

    const progressGain = q3.unitProgressGain;
    unitProgress = Math.min(100, unitProgress + progressGain);
    const xpGained = q3.rewards.xp;
    const xpResult = CombatEngine.addXp(stats, profile.equipment, xpGained);
    stats = xpResult.stats;

    // Thưởng Thanh Phong Kiếm duy nhất 1 lần nếu chưa có
    let rewardItem: InventoryItem | undefined;
    if (!inventory.some((i) => i.id === 'novice_sword')) {
      rewardItem = { ...INITIAL_ITEMS.novice_sword, isEquipped: false };
      inventory.push(rewardItem);
    }

    const updatedUnitStates = this.syncUnitStates(profile, unitProgress, quests);

    const newProfile: PlayerProfile = {
      ...profile,
      quests,
      stats,
      inventory,
      unitProgress,
      unitStates: updatedUnitStates,
    };

    return {
      profile: newProfile,
      didLevelUp: xpResult.didLevelUp,
      xpGained,
      progressGain,
      rewardItem,
    };
  }

  /**
   * Xử lý kết quả thắng trận: diệt quái thường hoặc Boss
   */
  static processCombatVictory(
    profile: PlayerProfile,
    enemy: CombatEnemy,
    isBossPhase2Defeated: boolean,
    remainingPlayerHp: number,
    encounterId?: string
  ): CombatVictoryResult {
    const encKey = encounterId || enemy.id;
    // Chặn farm: nếu kẻ địch hoặc encounterId này đã bị hạ trước đó, không cấp thêm thưởng
    if (profile.defeatedEnemyIds.includes(encKey) || profile.defeatedEnemyIds.includes(enemy.id)) {
      return {
        profile,
        didLevelUp: false,
        didCompleteQuest4: false,
        didCompleteBoss: false,
        totalXpGained: 0,
        wasAlreadyDefeated: true,
      };
    }

    const defeatedEnemyIds = [...profile.defeatedEnemyIds, encKey];
    if (!defeatedEnemyIds.includes(enemy.id)) {
      defeatedEnemyIds.push(enemy.id);
    }
    let quests = [...profile.quests];
    let stats = {
      ...profile.stats,
      hp: Math.min(profile.stats.maxHp, Math.max(1, remainingPlayerHp)),
    };
    let inventory = [...profile.inventory];
    let unitProgress = profile.unitProgress;
    const defeatedMobs = profile.defeatedMobs + (enemy.isBoss ? 0 : 1);
    let bossDefeated = profile.bossDefeated;

    // 1. XP diệt quái/boss
    let totalXpGained = enemy.xpReward;

    // 2. Xử lý Quest 4: Thanh Trừng Trúc Lâm (step 4, index 3)
    let didCompleteQuest4 = false;
    if (!enemy.isBoss && quests[3] && quests[3].status !== 'completed') {
      const q4 = { ...quests[3] };
      q4.progress = Math.min(q4.maxProgress, q4.progress + 1);
      if (q4.progress >= q4.maxProgress) {
        q4.status = 'completed';
        // Mở Quest 5
        if (quests[4] && quests[4].status === 'locked') {
          quests[4] = { ...quests[4], status: 'available' };
        }
        unitProgress = Math.min(100, unitProgress + q4.unitProgressGain);
        totalXpGained += q4.rewards.xp;
        // Thưởng Bích Ngọc Bình An Phù & Anh Ngữ Bí Điển
        if (!inventory.some((i) => i.id === 'jade_amulet')) {
          inventory.push({ ...INITIAL_ITEMS.jade_amulet, isEquipped: false });
        }
        if (!inventory.some((i) => i.id === 'secret_manual')) {
          inventory.push({ ...INITIAL_ITEMS.secret_manual, isEquipped: false });
        }
        didCompleteQuest4 = true;
      }
      quests[3] = q4;
    }

    // 3. Xử lý Quest 5: Quyết Chiến Boss / Thủ Trận Tinh Anh (step 5, index 4)
    let didCompleteBoss = false;
    const isClimaxEncounter =
      encKey.includes('climax') ||
      encKey === 'climax_gate' ||
      enemy.id.startsWith('climax_') ||
      Boolean(enemy.isBoss);

    if (isClimaxEncounter) {
      const isDefeatedClimax = enemy.isBoss ? isBossPhase2Defeated : true;
      if (isDefeatedClimax) {
        bossDefeated = true;
        unitProgress = 100;
        if (quests[4] && quests[4].status !== 'completed') {
          const q5 = { ...quests[4] };
          q5.status = 'completed';
          q5.progress = 1;
          quests[4] = q5;
          totalXpGained += q5.rewards.xp;
        }
        // Thưởng Rương Chiến Lợi Phẩm
        if (!inventory.some((i) => i.id === 'loot_chest')) {
          inventory.push({ ...INITIAL_ITEMS.loot_chest, isEquipped: false });
        }
        didCompleteBoss = true;
      }
    }

    // 4. Cộng toàn bộ XP tổng hợp và tính Level up
    const xpResult = CombatEngine.addXp(stats, profile.equipment, totalXpGained);
    stats = xpResult.stats;

    if (xpResult.didLevelUp) {
      stats.hp = stats.maxHp;
    }

    // Đồng bộ trạng thái active unit vào unitStates và tự động mở khóa các màn tiếp theo
    const updatedUnitStates = this.syncUnitStates(profile, unitProgress, quests, {
      defeatedEnemyIds,
      defeatedMobs,
      bossDefeated,
    });

    const newProfile: PlayerProfile = {
      ...profile,
      stats,
      inventory,
      quests,
      unitProgress,
      defeatedMobs,
      defeatedEnemyIds,
      bossDefeated,
      unitStates: updatedUnitStates,
    };

    return {
      profile: newProfile,
      didLevelUp: xpResult.didLevelUp,
      didCompleteQuest4,
      didCompleteBoss,
      totalXpGained,
      wasAlreadyDefeated: false,
    };
  }

  /**
   * Đồng bộ HP người chơi (kẹp từ 1 đến maxHp)
   */
  static syncHp(profile: PlayerProfile, hp: number): PlayerProfile {
    const clampedHp = Math.min(profile.stats.maxHp, Math.max(1, hp));
    return {
      ...profile,
      stats: {
        ...profile.stats,
        hp: clampedHp,
      },
    };
  }

  /**
   * Người chơi nhận sát thương (không giảm dưới 1 khi ở overworld)
   */
  static takeDamage(profile: PlayerProfile, damage: number): PlayerProfile {
    const nextHp = Math.max(1, profile.stats.hp - damage);
    return {
      ...profile,
      stats: {
        ...profile.stats,
        hp: nextHp,
      },
    };
  }

  /**
   * Trang bị vật phẩm vào slot tương ứng và cập nhật Công Lực
   */
  static equipItem(profile: PlayerProfile, item: InventoryItem): PlayerProfile {
    const currentEquip = { ...profile.equipment };
    const currentInv = [...profile.inventory];

    // Tháo món cũ trong cùng slot nếu có
    if (item.slot === 'weapon' && currentEquip.weapon) {
      const oldItem = currentInv.find((i) => i.id === currentEquip.weapon!.id);
      if (oldItem) oldItem.isEquipped = false;
    } else if (item.slot === 'accessory' && currentEquip.accessory) {
      const oldItem = currentInv.find((i) => i.id === currentEquip.accessory!.id);
      if (oldItem) oldItem.isEquipped = false;
    } else if (item.slot === 'manual' && currentEquip.manual) {
      const oldItem = currentInv.find((i) => i.id === currentEquip.manual!.id);
      if (oldItem) oldItem.isEquipped = false;
    }

    // Đánh dấu món mới được trang bị
    const newItem = currentInv.find((i) => i.id === item.id);
    if (newItem) newItem.isEquipped = true;

    if (item.slot === 'weapon') currentEquip.weapon = item;
    else if (item.slot === 'accessory') currentEquip.accessory = item;
    else if (item.slot === 'manual') currentEquip.manual = item;

    // Tính toán lại Công Lực
    const equipBonus = CombatEngine.getEquipmentBonus(currentEquip);
    const newCongLuc = calculateCongLuc(profile.stats, equipBonus);

    return {
      ...profile,
      equipment: currentEquip,
      inventory: currentInv,
      stats: {
        ...profile.stats,
        congLuc: newCongLuc,
      },
    };
  }

  /**
   * Tháo trang bị khỏi slot và cập nhật lại Công Lực
   */
  static unequipItem(
    profile: PlayerProfile,
    slot: 'weapon' | 'accessory' | 'manual'
  ): PlayerProfile {
    const currentEquip = { ...profile.equipment };
    const currentInv = [...profile.inventory];

    const itemToUnequip = currentEquip[slot];
    if (!itemToUnequip) return profile;

    const invItem = currentInv.find((i) => i.id === itemToUnequip.id);
    if (invItem) invItem.isEquipped = false;

    currentEquip[slot] = null;

    const equipBonus = CombatEngine.getEquipmentBonus(currentEquip);
    const newCongLuc = calculateCongLuc(profile.stats, equipBonus);

    return {
      ...profile,
      equipment: currentEquip,
      inventory: currentInv,
      stats: {
        ...profile.stats,
        congLuc: newCongLuc,
      },
    };
  }

  /**
   * Cập nhật điểm Mastery khi người chơi trả lời một câu hỏi (trong Combat, Thử Thách hoặc Luyện Công)
   */
  static recordKnowledgeAnswer(
    profile: PlayerProfile,
    knowledgeItemIds: string[],
    isCorrect: boolean,
    responseTimeSec: number
  ): PlayerProfile {
    const updatedMastery = MasteryEngine.recordAnswer(
      profile.knowledgeMastery || {},
      knowledgeItemIds,
      isCorrect,
      responseTimeSec
    );

    return {
      ...profile,
      knowledgeMastery: updatedMastery,
    };
  }

  /**
   * Hoàn thành một buổi Luyện Công (nhận Tu Vi / XP và tăng cường thuộc tính)
   */
  static completeTrainingSession(
    profile: PlayerProfile,
    xpReward: number = 25
  ): { profile: PlayerProfile; didLevelUp: boolean; xpGained: number } {
    const xpResult = CombatEngine.addXp(profile.stats, profile.equipment, xpReward);

    return {
      profile: {
        ...profile,
        stats: xpResult.stats,
      },
      didLevelUp: xpResult.didLevelUp,
      xpGained: xpReward,
    };
  }

  /**
   * Hoàn thành tương tác học tập với Đạo cụ (Prop Activity)
   * Đảm bảo lưu trạng thái theo unitId + propId để tránh nhận thưởng lặp
   */
  static completePropActivity(
    profile: PlayerProfile,
    unitId: string,
    propId: string,
    xpReward: number = REWARD_CONFIG.PROP_XP,
    progressReward: number = PROGRESSION_POINTS.PROP_ACTIVITY,
    knowledgeItemIds: string[] = []
  ): PropActivityResult {
    // Chặn farm bằng AntiFarmingGuard
    if (!AntiFarmingGuard.canEarnPropReward(profile, unitId, propId)) {
      return {
        profile,
        didLevelUp: false,
        xpGained: 0,
        progressGain: 0,
        isFirstCompletion: false,
      };
    }

    const propKey = `${unitId}:${propId}`;
    const completedIds = profile.completedPropIds || [];
    const updatedCompletedIds = [...completedIds, propKey];

    const newUnitProgress = Math.min(100, (profile.unitProgress || 0) + progressReward);
    const xpResult = CombatEngine.addXp(profile.stats, profile.equipment, xpReward);

    // Cập nhật unitStates nếu có và tự động đánh giá mở khóa màn tiếp theo
    const currentUnitStates = { ...(profile.unitStates || {}) };
    if (currentUnitStates[unitId]) {
      const activeUnit = { ...currentUnitStates[unitId] };
      const currentUnitProps = activeUnit.completedPropIds || [];
      if (!currentUnitProps.includes(propId)) {
        activeUnit.completedPropIds = [...currentUnitProps, propId];
      }
      activeUnit.progress = newUnitProgress;
      activeUnit.isCompleted = activeUnit.bossDefeated || newUnitProgress >= 100;
      activeUnit.lastPlayedAt = Date.now();
      currentUnitStates[unitId] = activeUnit;
    }
    const evaluatedStates = evaluateUnitUnlocks(currentUnitStates);

    // Ghi nhận điểm Mastery cho từ vựng / ngữ pháp liên quan
    let updatedMastery = profile.knowledgeMastery || {};
    if (knowledgeItemIds.length > 0) {
      updatedMastery = MasteryEngine.recordAnswer(
        updatedMastery,
        knowledgeItemIds,
        true,
        5
      );
    }

    const updatedProfile: PlayerProfile = {
      ...profile,
      stats: xpResult.stats,
      unitProgress: newUnitProgress,
      completedPropIds: updatedCompletedIds,
      unitStates: evaluatedStates,
      knowledgeMastery: updatedMastery,
    };

    return {
      profile: updatedProfile,
      didLevelUp: xpResult.didLevelUp,
      xpGained: xpReward,
      progressGain: progressReward,
      isFirstCompletion: true,
    };
  }
}

export interface PropActivityResult {
  profile: PlayerProfile;
  didLevelUp: boolean;
  xpGained: number;
  progressGain: number;
  isFirstCompletion: boolean;
}
