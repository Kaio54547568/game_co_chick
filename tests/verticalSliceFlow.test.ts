import { describe, it, expect } from 'vitest';
import { ProgressionEngine } from '../src/services/progressionEngine';
import { StorageService, createDefaultProfile } from '../src/services/storage';
import { CombatEngine } from '../src/services/combatEngine';
import { INITIAL_ITEMS } from '../src/data/itemsData';
import {
  DEMO_VOCABULARY,
  TANG_KINH_CAC_CHALLENGE_QUESTIONS,
} from '../src/data/demoLearningData';
import { CombatEnemy } from '../src/types/game';

describe('Vertical Slice Full Playthrough Simulation (End-to-End Flow)', () => {
  it('thực hiện trọn vẹn 1 Unit: từ tân thủ đến hạ Boss, kiểm tra tiến trình, chống farm và lưu trữ', () => {
    // ---------------------------------------------------------
    // BƯỚC 1: Khởi tạo nhân vật Nữ (Female Avatar test)
    // ---------------------------------------------------------
    let profile = createDefaultProfile('Linh Lung Nữ Hiệp', 'female');
    expect(profile.name).toBe('Linh Lung Nữ Hiệp');
    expect(profile.gender).toBe('female');
    expect(profile.stats.level).toBe(1);
    expect(profile.unitProgress).toBe(0);
    expect(profile.quests[0].status).toBe('available');
    expect(profile.quests[1].status).toBe('locked');

    // ---------------------------------------------------------
    // BƯỚC 2: Nhiệm vụ 1 - Bái kiến Bang Chủ Hà Ánh Phượng tại Sơn Môn
    // ---------------------------------------------------------
    const q1Res = ProgressionEngine.advanceQuest(profile, 'quest_1');
    profile = q1Res.profile;

    expect(profile.quests[0].status).toBe('completed');
    expect(profile.quests[0].progress).toBe(1);
    expect(profile.unitProgress).toBe(15);
    expect(profile.stats.xp).toBe(50);
    expect(profile.quests[1].status).toBe('available'); // Quest 2 mở khóa

    // ---------------------------------------------------------
    // BƯỚC 3: Nhiệm vụ 2 - Học đủ 6 từ vựng tại Tàng Kinh Các
    // ---------------------------------------------------------
    expect(DEMO_VOCABULARY.length).toBeGreaterThanOrEqual(20);
    const vocabIds = DEMO_VOCABULARY.slice(0, 6).map((v) => v.id);

    // Học từng từ một (6 từ khởi đầu)
    vocabIds.forEach((id, index) => {
      const learnRes = ProgressionEngine.learnVocab(profile, id);
      profile = learnRes.profile;
      if (index < 5) {
        expect(learnRes.didCompleteQuest2).toBe(false);
        expect(profile.quests[1].progress).toBe(index + 1);
      } else {
        // Từ thứ 6: hoàn thành Quest 2
        expect(learnRes.didCompleteQuest2).toBe(true);
      }
    });

    expect(profile.learnedVocabIds).toHaveLength(6);
    expect(profile.learnedVocabIds).toEqual(vocabIds);
    expect(profile.quests[1].status).toBe('completed');
    expect(profile.quests[1].progress).toBe(6);
    expect(profile.quests[2].status).toBe('available'); // Quest 3 mở khóa
    expect(profile.unitProgress).toBe(35); // 15 + 20 = 35%

    // 50 XP (q1) + 80 XP (q2) = 130 XP -> Level 2!
    expect(profile.stats.level).toBe(2);
    expect(profile.stats.hp).toBe(profile.stats.maxHp); // Hồi đầy HP khi thăng cấp

    // ---------------------------------------------------------
    // BƯỚC 4: Thử Thách Phong Ấn Tri Thức (Quest 3)
    // ---------------------------------------------------------
    // Điều kiện: phải học đủ 6 từ mới được mở nút Thử Thách
    expect(profile.learnedVocabIds.length >= 6).toBe(true);
    expect(TANG_KINH_CAC_CHALLENGE_QUESTIONS.length).toBeGreaterThanOrEqual(3);

    // Mô phỏng vượt qua thử thách (>= 2/3 câu đúng)
    const challengeRes = ProgressionEngine.completeChallenge(profile);
    profile = challengeRes.profile;

    expect(profile.quests[2].status).toBe('completed');
    expect(profile.quests[2].progress).toBe(3);
    expect(profile.quests[3].status).toBe('available'); // Quest 4 mở khóa
    expect(profile.unitProgress).toBe(55); // 35 + 20 = 55%

    // Nhận Thanh Phong Kiếm duy nhất 1 lần
    const swordItem = profile.inventory.find((i) => i.id === 'novice_sword');
    expect(swordItem).toBeDefined();
    expect(swordItem!.isEquipped).toBe(false);

    // Trang bị kiếm
    profile = ProgressionEngine.equipItem(profile, swordItem!);
    expect(profile.equipment.weapon?.id).toBe('novice_sword');
    const equippedSword = profile.inventory.find((i) => i.id === 'novice_sword');
    expect(equippedSword?.isEquipped).toBe(true);

    // ---------------------------------------------------------
    // BƯỚC 5: Nhiệm vụ 4 - Thanh Trừng Trúc Lâm (2 Quái Thường)
    // ---------------------------------------------------------
    const mob1: CombatEnemy = {
      id: 'sword_disciple',
      name: 'Ma Giáo Kiếm Đồ',
      title: 'Đệ tử tiền trạm',
      spriteKey: 'sword_disciple',
      hp: 120,
      maxHp: 120,
      attack: 16,
      defense: 6,
      xpReward: 80,
    };

    const mob2: CombatEnemy = {
      id: 'black_smoke_demon',
      name: 'Hắc Khí Yêu Ma',
      title: 'Quái vật Trúc Lâm',
      spriteKey: 'mist_demon',
      hp: 140,
      maxHp: 140,
      attack: 20,
      defense: 8,
      xpReward: 90,
    };

    // Diệt quái 1: Ma Giáo Kiếm Đồ (người chơi còn 120/140 HP)
    const mob1Victory = ProgressionEngine.processCombatVictory(profile, mob1, false, 120);
    profile = mob1Victory.profile;

    expect(profile.defeatedEnemyIds).toContain('sword_disciple');
    expect(profile.defeatedMobs).toBe(1);
    expect(profile.quests[3].progress).toBe(1);
    expect(profile.stats.hp).toBe(120);

    // Chống farm quái 1
    const farmAttempt = ProgressionEngine.processCombatVictory(profile, mob1, false, 120);
    expect(farmAttempt.wasAlreadyDefeated).toBe(true);
    expect(farmAttempt.profile.defeatedMobs).toBe(1);

    // Diệt quái 2: Hắc Khí Yêu Ma (người chơi còn 105/140 HP)
    const mob2Victory = ProgressionEngine.processCombatVictory(profile, mob2, false, 105);
    profile = mob2Victory.profile;

    expect(mob2Victory.didCompleteQuest4).toBe(true);
    expect(profile.defeatedEnemyIds).toContain('black_smoke_demon');
    expect(profile.defeatedMobs).toBe(2);
    expect(profile.quests[3].status).toBe('completed');
    expect(profile.quests[3].progress).toBe(2);
    expect(profile.quests[4].status).toBe('available'); // Cổng Boss mở khóa

    // Kiểm tra tiến độ đạt 80% (thỏa mãn yêu cầu >= 70% mở Cổng Boss)
    expect(profile.unitProgress).toBe(80);
    expect(profile.unitProgress >= 70).toBe(true);

    // Nhận thưởng Ngọc Bội và Bí Điển
    const jade = profile.inventory.find((i) => i.id === 'jade_amulet')!;
    const manual = profile.inventory.find((i) => i.id === 'secret_manual')!;
    expect(jade).toBeDefined();
    expect(manual).toBeDefined();

    // Trang bị cả hai món
    profile = ProgressionEngine.equipItem(profile, jade);
    profile = ProgressionEngine.equipItem(profile, manual);
    expect(profile.equipment.accessory?.id).toBe('jade_amulet');
    expect(profile.equipment.manual?.id).toBe('secret_manual');

    // ---------------------------------------------------------
    // BƯỚC 6: Nhiệm vụ 5 - Quyết Chiến Boss Loạn Ngữ Kiếm Ma
    // ---------------------------------------------------------
    const bossEnemy: CombatEnemy = {
      id: 'chaos_sword_demon',
      name: 'Loạn Ngữ Kiếm Ma',
      title: 'Đại Hộ Pháp Ma Giáo',
      spriteKey: 'boss_disorder',
      hp: 350,
      maxHp: 350,
      attack: 28,
      defense: 12,
      xpReward: 300,
      isBoss: true,
    };

    // Mô phỏng trận đấu với Boss: Phase 1 & Phase 2
    // Người chơi trả lời bạo kích (<3s) gây sát thương cực lớn
    const critTurn = CombatEngine.processTurn(
      true,
      2.0,
      0,
      profile.stats,
      profile.equipment,
      bossEnemy
    );
    expect(critTurn.isCritical).toBe(true);
    expect(critTurn.damageToEnemy).toBeGreaterThan(60);

    // Hạ Phase 2 của Boss (người chơi còn 80 HP)
    const bossVictory = ProgressionEngine.processCombatVictory(profile, bossEnemy, true, 80);
    profile = bossVictory.profile;

    expect(bossVictory.didCompleteBoss).toBe(true);
    expect(profile.bossDefeated).toBe(true);
    expect(profile.unitProgress).toBe(100); // 100% hoàn thành Unit!
    expect(profile.quests[4].status).toBe('completed');
    expect(profile.quests[4].progress).toBe(1);
    expect(profile.inventory.some((i) => i.id === 'loot_chest')).toBe(true);
    expect(profile.defeatedEnemyIds).toContain('chaos_sword_demon');

    // Chống farm Boss
    const repeatBoss = ProgressionEngine.processCombatVictory(profile, bossEnemy, true, 100);
    expect(repeatBoss.wasAlreadyDefeated).toBe(true);

    // ---------------------------------------------------------
    // BƯỚC 7: Kiểm tra lưu trữ & Nạp lại (Persistence & Reload)
    // ---------------------------------------------------------
    // Mock localStorage
    const localDb: Record<string, string> = {};
    globalThis.localStorage = {
      getItem: (k: string) => localDb[k] ?? null,
      setItem: (k: string, v: string) => {
        localDb[k] = String(v);
      },
      removeItem: (k: string) => {
        delete localDb[k];
      },
      clear: () => {},
      key: () => null,
      length: 0,
    } as any;

    StorageService.saveProfile(profile);

    const reloaded = StorageService.loadProfile();
    expect(reloaded).not.toBeNull();
    expect(reloaded!.name).toBe('Linh Lung Nữ Hiệp');
    expect(reloaded!.gender).toBe('female');
    expect(reloaded!.unitProgress).toBe(100);
    expect(reloaded!.bossDefeated).toBe(true);
    expect(reloaded!.learnedVocabIds).toHaveLength(6);
    expect(reloaded!.defeatedEnemyIds).toEqual([
      'sword_disciple',
      'black_smoke_demon',
      'chaos_sword_demon',
    ]);
    expect(reloaded!.equipment.weapon?.id).toBe('novice_sword');
    expect(reloaded!.equipment.accessory?.id).toBe('jade_amulet');
    expect(reloaded!.equipment.manual?.id).toBe('secret_manual');
    expect(reloaded!.inventory.some((i) => i.id === 'loot_chest')).toBe(true);
    expect(reloaded!.quests.every((q) => q.status === 'completed')).toBe(true);
  });
});
