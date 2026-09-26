import { describe, it, expect, beforeEach } from 'vitest';
import { StorageService, createDefaultProfile, createDefaultUnitStates } from '../src/services/storage';
import { PlayerProfile } from '../src/types/game';

describe('Multi-Unit Progression & Non-destructive Save Migration', () => {
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


  it('should initialize a default profile with all 20 units and correct initial unlock states', () => {
    const profile = createDefaultProfile('Thiếu Hiệp', 'male');
    expect(profile.selectedGrade).toBe(10);
    expect(profile.selectedUnitId).toBe('g10-u01');
    expect(profile.unitStates).toBeDefined();

    const states = profile.unitStates!;
    // 10 units in G10 + 10 units in G11 + 10 units in G12 = 30 units
    expect(Object.keys(states).length).toBe(30);

    // G10: U1 unlocked, U2-10 locked initially
    expect(states['g10-u01'].isUnlocked).toBe(true);
    expect(states['g10-u02'].isUnlocked).toBe(false);
    expect(states['g10-u10'].isUnlocked).toBe(false);

    // G11: U1 unlocked, U2-10 locked initially
    expect(states['g11-u01'].isUnlocked).toBe(true);
    expect(states['g11-u02'].isUnlocked).toBe(false);

    // G12: U1 unlocked, U2-10 locked initially
    expect(states['g12-u01'].isUnlocked).toBe(true);
    expect(states['g12-u02'].isUnlocked).toBe(false);
  });

  it('should unlock the next unit when current unit reaches >= 70% progress', () => {
    const profile = createDefaultProfile('Thiếu Hiệp', 'male');
    profile.unitStates!['g10-u01'].progress = 75;

    // Save and load
    StorageService.saveProfile(profile);
    const loaded = StorageService.loadProfile();
    expect(loaded).not.toBeNull();

    // g10-u02 should now be unlocked!
    expect(loaded!.unitStates!['g10-u02'].isUnlocked).toBe(true);
    // g10-u03 still locked because u02 is at 0%
    expect(loaded!.unitStates!['g10-u03'].isUnlocked).toBe(false);
  });

  it('should perform non-destructive migration from legacy save format without wiping progress', () => {
    // Simulate legacy save format before multi-unit system
    const legacySave = {
      id: 'legacy_user_123',
      name: 'Cao Thủ Cũ',
      gender: 'male',
      stats: {
        level: 5,
        xp: 450,
        xpToNextLevel: 600,
        hp: 200,
        maxHp: 200,
        attack: 45,
        defense: 25,
        speed: 160,
        criticalRate: 0.15,
        criticalDamage: 1.5,
        congLuc: 1500,
      },
      inventory: [
        {
          id: 'novice_sword',
          name: 'Thanh Phong Kiếm',
          slot: 'weapon',
          rarity: 'rare',
          description: 'Kiếm sắc bén',
          icon: 'sword',
          stats: { atkBonus: 10 },
          isEquipped: true,
        },
      ],
      equipment: { weapon: null, accessory: null, manual: null },
      unitProgress: 85,
      quests: [],
      currentQuestIndex: 3,
      defeatedMobs: 2,
      defeatedEnemyIds: ['sword_disciple', 'mist_demon'],
      bossDefeated: true,
      learnedVocabIds: ['v1', 'v2', 'v3'],
      knowledgeMastery: {
        v1: {
          knowledgeItemId: 'v1',
          mastery: 80,
          timesEncountered: 5,
          timesCorrect: 4,
          timesIncorrect: 1,
          lastAnsweredCorrectly: true,
          lastResponseTimeSec: 2.1,
          lastReviewedAt: 1234567,
          history: [],
        },
      },
      lastSavedAt: 1234500,
    };

    localStorage.setItem('phuong_chick_english_wulin_save_v1', JSON.stringify(legacySave));

    const loaded = StorageService.loadProfile();
    expect(loaded).not.toBeNull();

    // Verify all original user data is completely preserved
    expect(loaded!.name).toBe('Cao Thủ Cũ');
    expect(loaded!.stats.level).toBe(5);
    expect(loaded!.inventory.length).toBe(1);
    expect(loaded!.inventory[0].name).toBe('Thanh Phong Kiếm');
    expect(loaded!.knowledgeMastery['v1'].mastery).toBe(80);

    // Verify migration into unitStates
    expect(loaded!.unitStates).toBeDefined();
    const u1 = loaded!.unitStates!['g10-u01'];
    expect(u1.progress).toBe(85);
    expect(u1.bossDefeated).toBe(true);
    expect(u1.defeatedMobs).toBe(2);
    expect(u1.learnedVocabIds).toEqual(['v1', 'v2', 'v3']);

    // Because u1 was at 85% (>70%), u2 is unlocked!
    expect(loaded!.unitStates!['g10-u02'].isUnlocked).toBe(true);
  });
});
