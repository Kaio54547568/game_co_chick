import { describe, it, expect, beforeEach } from 'vitest';
import { ProgressionEngine } from '../src/services/progressionEngine';
import { createDefaultProfile } from '../src/services/storage';
import { PlayerProfile, CombatEnemy } from '../src/types/game';
import { INITIAL_ITEMS } from '../src/data/itemsData';

describe('Quest Progression & Anti-Farm Flow', () => {
  let profile: PlayerProfile;

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

  const boss: CombatEnemy = {
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

  beforeEach(() => {
    profile = createDefaultProfile('Hiệp Khách Test', 'male');
  });

  it('khởi tạo nhân vật với Quest 1 khả dụng và các Quest 2-5 bị khóa', () => {
    expect(profile.quests[0].status).toBe('available');
    expect(profile.quests[1].status).toBe('locked');
    expect(profile.quests[2].status).toBe('locked');
    expect(profile.quests[3].status).toBe('locked');
    expect(profile.quests[4].status).toBe('locked');
    expect(profile.unitProgress).toBe(0);
    expect(profile.stats.level).toBe(1);
  });

  it('hoàn thành Quest 1: nhận 50 XP, +15% tiến độ và mở khóa Quest 2', () => {
    const res = ProgressionEngine.advanceQuest(profile, 'quest_1');
    profile = res.profile;

    expect(profile.quests[0].status).toBe('completed');
    expect(profile.quests[0].progress).toBe(1);
    expect(profile.quests[1].status).toBe('available');
    expect(profile.unitProgress).toBe(15);
    expect(profile.stats.xp).toBe(50);
    expect(res.xpGained).toBe(50);

    // Kiểm tra tính lũy đẳng: gọi lại không được nhận thêm XP hay tiến độ
    const repeatRes = ProgressionEngine.advanceQuest(profile, 'quest_1');
    expect(repeatRes.xpGained).toBe(0);
    expect(repeatRes.profile.unitProgress).toBe(15);
  });

  it('học 6 từ vựng: lưu đủ 6 ID duy nhất, hoàn thành Quest 2 và mở Quest 3', () => {
    // Hoàn thành quest 1 trước
    profile = ProgressionEngine.advanceQuest(profile, 'quest_1').profile;

    const vocabList = [
      'lifestyle',
      'nutrition',
      'meditation',
      'discipline',
      'vitality',
      'resilience',
    ];

    // Học 5 từ đầu
    for (let i = 0; i < 5; i++) {
      const res = ProgressionEngine.learnVocab(profile, vocabList[i]);
      profile = res.profile;
      expect(res.didCompleteQuest2).toBe(false);
      expect(profile.quests[1].progress).toBe(i + 1);
      expect(profile.quests[1].status).toBe('available');
    }

    // Thử học lại từ đã học -> không trùng lặp
    const duplicateRes = ProgressionEngine.learnVocab(profile, 'lifestyle');
    expect(duplicateRes.profile.learnedVocabIds.length).toBe(5);

    // Học từ thứ 6
    const res6 = ProgressionEngine.learnVocab(profile, vocabList[5]);
    profile = res6.profile;

    expect(res6.didCompleteQuest2).toBe(true);
    expect(profile.learnedVocabIds.length).toBe(6);
    expect(profile.learnedVocabIds).toEqual(vocabList);
    expect(profile.quests[1].status).toBe('completed');
    expect(profile.quests[1].progress).toBe(6);
    expect(profile.quests[2].status).toBe('available');
    expect(profile.unitProgress).toBe(35); // 15 + 20 = 35%
  });

  it('hoàn thành Thử Thách Quest 3: nhận Thanh Phong Kiếm và mở Quest 4', () => {
    // Đi qua quest 1 & 2
    profile = ProgressionEngine.advanceQuest(profile, 'quest_1').profile;
    const vocabList = ['w1', 'w2', 'w3', 'w4', 'w5', 'w6'];
    vocabList.forEach((w) => {
      profile = ProgressionEngine.learnVocab(profile, w).profile;
    });

    const res = ProgressionEngine.completeChallenge(profile);
    profile = res.profile;

    expect(profile.quests[2].status).toBe('completed');
    expect(profile.quests[3].status).toBe('available');
    expect(profile.unitProgress).toBe(55); // 35 + 20 = 55%
    expect(profile.inventory.some((i) => i.id === 'novice_sword')).toBe(true);

    // Chặn nhận 2 kiếm khi gọi lại
    const repeatRes = ProgressionEngine.completeChallenge(profile);
    const swordCount = repeatRes.profile.inventory.filter((i) => i.id === 'novice_sword').length;
    expect(swordCount).toBe(1);
  });

  it('hệ thống trang bị & tháo trang bị cập nhật đúng Công Lực', () => {
    // Thêm kiếm vào hành trang
    profile.inventory.push({ ...INITIAL_ITEMS.novice_sword, isEquipped: false });
    const initialCongLuc = profile.stats.congLuc;

    // Trang bị kiếm (+18 ATK -> +216, +180 bonus -> +396 Công Lực)
    profile = ProgressionEngine.equipItem(profile, INITIAL_ITEMS.novice_sword);
    expect(profile.equipment.weapon?.id).toBe('novice_sword');
    expect(profile.stats.congLuc).toBe(initialCongLuc + 18 * 12 + 180);

    // Tháo kiếm
    profile = ProgressionEngine.unequipItem(profile, 'weapon');
    expect(profile.equipment.weapon).toBeNull();
    expect(profile.stats.congLuc).toBe(initialCongLuc);
  });

  it('Quest 4: diệt 2 quái Trúc Lâm, đạt tiến độ 80% (>= 70% mở cổng Boss), chặn farm quái', () => {
    // Chuẩn bị: hoàn thành Quest 1-3
    profile = ProgressionEngine.advanceQuest(profile, 'quest_1').profile;
    ['w1', 'w2', 'w3', 'w4', 'w5', 'w6'].forEach((w) => {
      profile = ProgressionEngine.learnVocab(profile, w).profile;
    });
    profile = ProgressionEngine.completeChallenge(profile).profile;

    // 1. Diệt Mob 1 (Ma Giáo Kiếm Đồ)
    const mob1Res = ProgressionEngine.processCombatVictory(profile, mob1, false, 100);
    profile = mob1Res.profile;

    expect(profile.defeatedEnemyIds).toContain('sword_disciple');
    expect(profile.defeatedMobs).toBe(1);
    expect(profile.quests[3].progress).toBe(1);
    expect(profile.quests[3].status).toBe('available');

    // Chặn farm: đánh lại Mob 1 không được cộng thêm gì
    const farmAttempt = ProgressionEngine.processCombatVictory(profile, mob1, false, 100);
    expect(farmAttempt.wasAlreadyDefeated).toBe(true);
    expect(farmAttempt.profile.defeatedMobs).toBe(1);

    // 2. Diệt Mob 2 (Hắc Khí Yêu Ma)
    const mob2Res = ProgressionEngine.processCombatVictory(profile, mob2, false, 85);
    profile = mob2Res.profile;

    expect(mob2Res.didCompleteQuest4).toBe(true);
    expect(profile.defeatedEnemyIds).toContain('black_smoke_demon');
    expect(profile.defeatedMobs).toBe(2);
    expect(profile.quests[3].status).toBe('completed');
    expect(profile.quests[3].progress).toBe(2);
    expect(profile.quests[4].status).toBe('available');

    // Tiến độ phải đạt 80% (55% + 25%), đủ điều kiện >= 70% để mở Cổng Boss
    expect(profile.unitProgress).toBe(80);
    expect(profile.unitProgress >= 70).toBe(true);

    // Kiểm tra nhận thưởng Ngọc Bội và Bí Điển
    expect(profile.inventory.some((i) => i.id === 'jade_amulet')).toBe(true);
    expect(profile.inventory.some((i) => i.id === 'secret_manual')).toBe(true);
  });

  it('Quest 5: đại chiến Boss Loạn Ngữ Kiếm Ma 2 Phase -> đạt 100% tiến độ & nhận Rương', () => {
    // Thiết lập trạng thái sẵn sàng vào Boss
    profile = ProgressionEngine.advanceQuest(profile, 'quest_1').profile;
    ['w1', 'w2', 'w3', 'w4', 'w5', 'w6'].forEach((w) => {
      profile = ProgressionEngine.learnVocab(profile, w).profile;
    });
    profile = ProgressionEngine.completeChallenge(profile).profile;
    profile = ProgressionEngine.processCombatVictory(profile, mob1, false, 100).profile;
    profile = ProgressionEngine.processCombatVictory(profile, mob2, false, 100).profile;

    expect(profile.unitProgress).toBe(80);

    // Đánh Boss: chỉ khi Phase 2 bị hạ mới tính chiến thắng hoàn toàn
    const bossRes = ProgressionEngine.processCombatVictory(profile, boss, true, 45);
    profile = bossRes.profile;

    expect(bossRes.didCompleteBoss).toBe(true);
    expect(profile.bossDefeated).toBe(true);
    expect(profile.unitProgress).toBe(100);
    expect(profile.quests[4].status).toBe('completed');
    expect(profile.inventory.some((i) => i.id === 'loot_chest')).toBe(true);
    expect(profile.defeatedEnemyIds).toContain('chaos_sword_demon');

    // Chặn farm Boss
    const repeatBoss = ProgressionEngine.processCombatVictory(profile, boss, true, 100);
    expect(repeatBoss.wasAlreadyDefeated).toBe(true);
  });
});
