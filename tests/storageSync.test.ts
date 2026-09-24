import { describe, it, expect, beforeEach } from 'vitest';
import { StorageService, createDefaultProfile } from '../src/services/storage';
import { ProgressionEngine } from '../src/services/progressionEngine';
import { INITIAL_ITEMS } from '../src/data/itemsData';

describe('StorageService Persistence & State Synchronization Tests', () => {
  let memoryStore: Record<string, string> = {};

  beforeEach(() => {
    memoryStore = {};
    globalThis.localStorage = {
      getItem: (key: string) => memoryStore[key] ?? null,
      setItem: (key: string, val: string) => {
        memoryStore[key] = String(val);
      },
      removeItem: (key: string) => {
        delete memoryStore[key];
      },
      clear: () => {
        memoryStore = {};
      },
      key: (i: number) => Object.keys(memoryStore)[i] ?? null,
      length: Object.keys(memoryStore).length,
    } as Storage;
  });

  it('lưu và tải lại profile đầy đủ sau chuỗi nhiệm vụ', () => {
    let profile = createDefaultProfile('Hiệp Nữ Lưu Trữ', 'female');

    // Tiến hành Quest 1 & 2
    profile = ProgressionEngine.advanceQuest(profile, 'quest_1').profile;
    const vocabs = ['w1', 'w2', 'w3', 'w4', 'w5', 'w6'];
    vocabs.forEach((w) => {
      profile = ProgressionEngine.learnVocab(profile, w).profile;
    });

    // Hoàn thành Thử Thách và trang bị kiếm
    profile = ProgressionEngine.completeChallenge(profile).profile;
    profile = ProgressionEngine.equipItem(profile, INITIAL_ITEMS.novice_sword);

    // Diệt quái và ghi nhận defeatedEnemyIds
    const mob = {
      id: 'sword_disciple',
      name: 'Kiếm Đồ',
      title: 'Đệ tử',
      spriteKey: 'sword_disciple',
      hp: 120,
      maxHp: 120,
      attack: 16,
      defense: 6,
      xpReward: 80,
    };
    profile = ProgressionEngine.processCombatVictory(profile, mob, false, 95).profile;

    // Lưu vào localStorage
    StorageService.saveProfile(profile);

    // Nạp lại từ localStorage
    const reloaded = StorageService.loadProfile();
    expect(reloaded).not.toBeNull();
    expect(reloaded!.name).toBe('Hiệp Nữ Lưu Trữ');
    expect(reloaded!.gender).toBe('female');
    expect(reloaded!.learnedVocabIds).toEqual(vocabs);
    expect(reloaded!.defeatedEnemyIds).toContain('sword_disciple');
    expect(reloaded!.equipment.weapon?.id).toBe('novice_sword');
    expect(reloaded!.quests[0].status).toBe('completed');
    expect(reloaded!.quests[1].status).toBe('completed');
    expect(reloaded!.quests[2].status).toBe('completed');
    expect(reloaded!.stats.hp).toBe(95);
  });

  it('lưu giữ HP chính xác giữa các lần reload và chặn HP bất hợp lệ', () => {
    let profile = createDefaultProfile('Lữ Khách', 'male');
    profile.stats.hp = 65; // Đang mất máu còn 65/120

    StorageService.saveProfile(profile);

    let reloaded = StorageService.loadProfile();
    expect(reloaded!.stats.hp).toBe(65);

    // Test tự phục hồi khi dữ liệu HP bị lỗi (<= 0 hoặc NaN)
    const rawData = JSON.parse(memoryStore['phuong_chick_english_wulin_save_v1']);
    rawData.stats.hp = 0;
    memoryStore['phuong_chick_english_wulin_save_v1'] = JSON.stringify(rawData);

    reloaded = StorageService.loadProfile();
    expect(reloaded!.stats.hp).toBe(reloaded!.stats.maxHp); // Phục hồi về maxHp an toàn
  });

  it('xóa toàn bộ tiến độ (clearProfile) khi người chơi chọn chơi lại', () => {
    const profile = createDefaultProfile('Tiêu Dao', 'male');
    StorageService.saveProfile(profile);
    expect(StorageService.loadProfile()).not.toBeNull();

    StorageService.clearProfile();
    expect(StorageService.loadProfile()).toBeNull();
  });
});
