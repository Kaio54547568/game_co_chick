import { describe, it, expect, beforeEach } from 'vitest';
import { ProgressionEngine } from '../src/services/progressionEngine';
import { StorageService, createDefaultProfile } from '../src/services/storage';
import { GuardianService } from '../src/services/guardianService';
import {
  UNIT_BALANCE_TABLE,
  PROGRESSION_THRESHOLDS,
  PROGRESSION_POINTS,
  REWARD_CONFIG,
  RemediationAdvisor,
  AntiFarmingGuard,
  evaluateUnitUnlocks,
  getUnitBalance,
} from '../src/data/progressionBalance';
import { CombatEnemy, PlayerProfile } from '../src/types/game';

describe('Progression Review & Balance: 30 Units Audit', () => {
  it('verifies balance configuration is valid and complete for all 30 units across Grades 10, 11, 12', () => {
    const grades = [10, 11, 12];
    for (const grade of grades) {
      for (let u = 1; u <= 10; u++) {
        const unitId = `g${grade}-u${u.toString().padStart(2, '0')}`;
        const balance = getUnitBalance(unitId);

        expect(balance, `${unitId} balance profile`).toBeDefined();
        expect(balance.grade).toBe(grade);
        expect(balance.unitNumber).toBe(u);
        expect(balance.title.length).toBeGreaterThan(0);
        expect(balance.topic.length).toBeGreaterThan(0);

        // Learning activities >= 6 (Vocab, Challenge, 2-3 Props, 4 Guardians)
        expect(balance.learningActivitiesCount).toBeGreaterThanOrEqual(6);
        // Encounters >= 6 (5-6 mobs + 1 boss/master)
        expect(balance.encountersCount).toBeGreaterThanOrEqual(6);

        // Thresholds
        expect(balance.climaxUnlockThreshold).toBe(70);
        expect(balance.nextUnitUnlockThreshold).toBe(70);
        expect(balance.maxUnitProgress).toBe(100);

        // Reasonable playtime: 12 to 18 minutes
        expect(balance.estimatedPlaytimeMinutes).toBeGreaterThanOrEqual(12);
        expect(balance.estimatedPlaytimeMinutes).toBeLessThanOrEqual(18);

        // Rewards scale properly
        expect(balance.xpRewards.grandTotalXp).toBeGreaterThanOrEqual(1600);
      }
    }
  });
});

describe('Non-Combat Clear Path & Side Branch Learning Rewards', () => {
  let profile: PlayerProfile;

  beforeEach(() => {
    profile = createDefaultProfile('Hiệp Khách Thử Nghiệm', 'male');
    profile.selectedUnitId = 'g10-u01';
  });

  it('allows completing unit climax threshold (70%) purely via quests, props, and guardian studies without mob grinding', () => {
    // 1. Step 1: Bái kiến Bang Chủ (+15%)
    const resQ1 = ProgressionEngine.advanceQuest(profile, 'quest_1');
    profile = resQ1.profile;
    expect(profile.unitProgress).toBe(15);

    // 2. Step 2: Học 6 từ vựng Tàng Kinh Các (+20%)
    for (let i = 1; i <= 6; i++) {
      const resV = ProgressionEngine.learnVocab(profile, `vocab_g10u01_${i}`);
      profile = resV.profile;
    }
    expect(profile.unitProgress).toBe(35); // 15 + 20

    // 3. Step 3: Phá Giải Phong Ấn Tri Thức (+20%)
    const resQ3 = ProgressionEngine.completeChallenge(profile);
    profile = resQ3.profile;
    expect(profile.unitProgress).toBe(55); // 35 + 20

    // At 55%, player chooses NOT to fight any mobs in Quest 4.
    // Instead, player explores Branch A & B:
    // 4. Branch A: Đạo cụ học tập 1 (+5%)
    const resProp1 = ProgressionEngine.completePropActivity(profile, 'g10-u01', 'prop_ancient_scroll', 35, 5);
    profile = resProp1.profile;
    expect(profile.unitProgress).toBe(60);

    // 5. Branch B: Đạo cụ học tập 2 (+5%)
    const resProp2 = ProgressionEngine.completePropActivity(profile, 'g10-u01', 'prop_family_heirloom', 35, 5);
    profile = resProp2.profile;
    expect(profile.unitProgress).toBe(65);

    // 6. Hoàn thành 1 nhiệm vụ Hộ Pháp (Thầy Đặng Trần Hà cú pháp) (+10%)
    profile = GuardianService.acceptQuest(profile, 'g10-u01', 'ho_phap_dang_tran_ha');
    profile = GuardianService.solveExercise(profile, 'g10-u01', 'ho_phap_dang_tran_ha');
    const resG = GuardianService.claimReward(profile, 'g10-u01', 'ho_phap_dang_tran_ha');
    profile = resG.profile;

    // Tiến độ đạt 75% mà KHÔNG cần tiêu diệt bất kỳ con quái nào!
    expect(profile.unitProgress).toBe(75);
    expect(profile.unitProgress).toBeGreaterThanOrEqual(PROGRESSION_THRESHOLDS.CLIMAX_UNLOCK_PERCENT);
    expect(profile.defeatedMobs).toBe(0);

    // Khi đạt 75%, cổng Ma Giáo Cấm Địa đã mở, và Unit 2 cũng được mở khóa ngay lập tức!
    expect(profile.unitStates?.['g10-u02']?.isUnlocked).toBe(true);

    // 7. Quyết chiến Climax (Quest 5 / Boss):
    const dummyBoss: CombatEnemy = {
      id: 'boss_loan_ngu_kiem_ma',
      name: 'Loạn Ngữ Kiếm Ma',
      title: 'Ma Đầu Trấn Giữ Cấm Địa',
      spriteKey: '/assets/game/characters/bosses/loan_ngu_kiem_ma.png',
      hp: 200,
      maxHp: 200,
      attack: 30,
      defense: 20,
      xpReward: 500,
      isBoss: true,
    };

    const resBoss = ProgressionEngine.processCombatVictory(
      profile,
      dummyBoss,
      true,
      100,
      'climax_encounter'
    );
    profile = resBoss.profile;

    expect(profile.unitProgress).toBe(100);
    expect(profile.bossDefeated).toBe(true);
    expect(profile.unitStates?.['g10-u01']?.isCompleted).toBe(true);
  });
});

describe('Anti-Farming & Duplicate Reward Protection', () => {
  let profile: PlayerProfile;

  beforeEach(() => {
    profile = createDefaultProfile('Hiệp Khách Diệt Farm', 'female');
    profile.selectedUnitId = 'g10-u01';
  });

  it('prevents duplicate XP and progress farming from repeated Prop interactions', () => {
    const propId = 'prop_heirloom_chest';

    // Lần 1: Nhận đủ +35 XP và +5% tiến độ
    const res1 = ProgressionEngine.completePropActivity(profile, 'g10-u01', propId, 35, 5);
    profile = res1.profile;

    expect(res1.isFirstCompletion).toBe(true);
    expect(res1.xpGained).toBe(35);
    expect(res1.progressGain).toBe(5);
    expect(profile.unitProgress).toBe(5);

    // Lần 2: Tương tác lại cùng đạo cụ
    const xpBefore = profile.stats.xp;
    const progressBefore = profile.unitProgress;

    const res2 = ProgressionEngine.completePropActivity(profile, 'g10-u01', propId, 35, 5);
    expect(res2.isFirstCompletion).toBe(false);
    expect(res2.xpGained).toBe(0);
    expect(res2.progressGain).toBe(0);
    expect(res2.profile.stats.xp).toBe(xpBefore);
    expect(res2.profile.unitProgress).toBe(progressBefore);
  });

  it('prevents duplicate XP farming from defeating the same encounter multiple times', () => {
    const dummyEnemy: CombatEnemy = {
      id: 'mob_broom_raider_1',
      name: 'Tảo Trượng Đạo Tặc',
      title: 'Đệ tử tiền trạm',
      spriteKey: '/assets/game/units/grade-10/unit-01/enemies/broom_raider.png',
      hp: 80,
      maxHp: 80,
      attack: 15,
      defense: 8,
      xpReward: 40,
    };

    // Lần 1: Hạ quái nhận 40 XP
    const res1 = ProgressionEngine.processCombatVictory(profile, dummyEnemy, false, 100, 'enc_broom_1');
    profile = res1.profile;

    expect(res1.wasAlreadyDefeated).toBe(false);
    expect(res1.totalXpGained).toBe(40);
    expect(profile.defeatedMobs).toBe(1);

    // Lần 2: Gặp lại cùng encounterId
    const res2 = ProgressionEngine.processCombatVictory(profile, dummyEnemy, false, 100, 'enc_broom_1');
    expect(res2.wasAlreadyDefeated).toBe(true);
    expect(res2.totalXpGained).toBe(0);
    expect(res2.profile.defeatedMobs).toBe(1);
  });

  it('prevents duplicate Guardian quest claiming and allows free practice', () => {
    // Nhận và hoàn thành lần đầu
    profile = GuardianService.acceptQuest(profile, 'g10-u01', 'ho_phap_hoang_van');
    profile = GuardianService.solveExercise(profile, 'g10-u01', 'ho_phap_hoang_van');
    const claim1 = GuardianService.claimReward(profile, 'g10-u01', 'ho_phap_hoang_van');
    profile = claim1.profile;

    expect(claim1.isFirstTime).toBe(true);
    expect(claim1.xpGained).toBeGreaterThan(0);
    expect(claim1.progressGain).toBe(10);

    // Thử claim lần 2
    const claim2 = GuardianService.claimReward(profile, 'g10-u01', 'ho_phap_hoang_van');
    expect(claim2.isFirstTime).toBe(false);
    expect(claim2.xpGained).toBe(0);
    expect(claim2.progressGain).toBe(0);
  });
});

describe('Unit Transition, Save/Load & State Isolation', () => {
  let profile: PlayerProfile;

  beforeEach(() => {
    // Reset localStorage mock
    const storageMock: Record<string, string> = {};
    global.localStorage = {
      getItem: (key: string) => storageMock[key] || null,
      setItem: (key: string, value: string) => {
        storageMock[key] = value;
      },
      removeItem: (key: string) => {
        delete storageMock[key];
      },
      clear: () => {
        Object.keys(storageMock).forEach((k) => delete storageMock[k]);
      },
      length: 0,
      key: () => null,
    };

    profile = createDefaultProfile('Đại Hiệp Đa Năng', 'male');
  });

  it('persists and rehydrates profile accurately across units', () => {
    // 1. Chơi ở Unit 1 đạt 75%
    profile.selectedUnitId = 'g10-u01';
    profile.unitProgress = 75;
    profile.inventory.push({
      id: 'novice_sword',
      name: 'Thanh Phong Kiếm',
      description: 'Kiếm pháp sơ nhập',
      type: 'equipment',
      slot: 'weapon',
      rarity: 'common',
      stats: { attack: 15, congLuc: 180 },
      isEquipped: true,
      price: 100,
    });

    StorageService.saveProfile(profile);

    // 2. Tải lại save
    const loaded = StorageService.loadProfile();
    expect(loaded).not.toBeNull();
    expect(loaded!.unitProgress).toBe(75);
    expect(loaded!.unitStates?.['g10-u01']?.progress).toBe(75);
    expect(loaded!.unitStates?.['g10-u02']?.isUnlocked).toBe(true);
    expect(loaded!.inventory.some((i) => i.id === 'novice_sword')).toBe(true);
  });

  it('evaluates unit unlocks across all 30 units seamlessly', () => {
    const states = profile.unitStates || {};

    // Unit 1 hoàn thành 70%
    states['g10-u01'].progress = 70;
    // Unit 2 hoàn thành 100%
    states['g10-u02'].progress = 100;
    states['g10-u02'].isCompleted = true;

    const evaluated = evaluateUnitUnlocks(states);

    expect(evaluated['g10-u01'].isUnlocked).toBe(true);
    expect(evaluated['g10-u02'].isUnlocked).toBe(true);
    expect(evaluated['g10-u03'].isUnlocked).toBe(true);
    expect(evaluated['g10-u04'].isUnlocked).toBe(false);
  });
});

describe('Targeted Remediation Advisor', () => {
  it('directs player to appropriate Guardian and pedagogical technique based on error skill', () => {
    // 1. Lỗi Listening / Thính Âm
    const listenAdvice = RemediationAdvisor.getAdvice('auditory reflexes listening stress', 'Family Life');
    expect(listenAdvice.guardianId).toBe('ho_phap_hoang_van');
    expect(listenAdvice.skillCategory).toBe('Luyện nghe');
    expect(listenAdvice.guardianLocation).toContain('Võ Luyện Đài');

    // 2. Lỗi Grammar / Ngữ Pháp
    const grammarAdvice = RemediationAdvisor.getAdvice('passive voice tense structure grammar', 'Inventions');
    expect(grammarAdvice.guardianId).toBe('ho_phap_dang_tran_ha');
    expect(grammarAdvice.skillCategory).toBe('Ngữ pháp');
    expect(grammarAdvice.guardianLocation).toContain('Phong Ấn Thạch Trận');

    // 3. Lỗi Reading / Đọc Hiểu
    const readAdvice = RemediationAdvisor.getAdvice('reading comprehension evidence passage', 'Ecotourism');
    expect(readAdvice.guardianId).toBe('ho_phap_nguyet_nguyen');
    expect(readAdvice.skillCategory).toBe('Đọc hiểu');
    expect(readAdvice.guardianLocation).toContain('Minh Triết Các');

    // 4. Lỗi Từ Vựng / Vocab (Mặc định)
    const vocabAdvice = RemediationAdvisor.getAdvice('word prefix suffix vocabulary', 'Life Stories');
    expect(vocabAdvice.guardianId).toBe('ho_phap_phuong_tu');
    expect(vocabAdvice.skillCategory).toBe('Từ vựng');
    expect(vocabAdvice.guardianLocation).toContain('Tàng Kinh Các');
  });
});
