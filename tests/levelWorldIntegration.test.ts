import { describe, it, expect, beforeEach } from 'vitest';
import { ALL_LEVEL_CONFIGS, getLevelConfig } from '../src/game/levels/levelConfig';
import { UnitContentService } from '../src/services/unitContentService';
import { ProgressionEngine } from '../src/services/progressionEngine';
import { createDefaultProfile, StorageService } from '../src/services/storage';

describe('30 Units Level System & 4 Hộ Pháp Integration', () => {
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

  it('all 30 units have full level configurations with dimensions 3200x2000', () => {
    const unitIds = Object.keys(ALL_LEVEL_CONFIGS);
    expect(unitIds.length).toBe(30);

    for (const uid of unitIds) {
      const cfg = getLevelConfig(uid);
      expect(cfg.mapWidth).toBe(3200);
      expect(cfg.mapHeight).toBe(2000);
      expect(cfg.ground.primaryPath).toBeDefined();
      expect(cfg.npcs.length).toBe(5);
      expect(cfg.climax).toBeDefined();
    }
  });

  it('all 5 NPCs (Bang Chủ and 4 Hộ Pháp) are present in every map', () => {
    const requiredNpcs = [
      'bang_chu',
      'ho_phap_phuong_tu',
      'ho_phap_dang_tran_ha',
      'ho_phap_hoang_van',
      'ho_phap_nguyet_nguyen',
    ];

    for (const [uid, cfg] of Object.entries(ALL_LEVEL_CONFIGS)) {
      const npcIds = cfg.npcs.map((n) => n.id);
      for (const req of requiredNpcs) {
        expect(npcIds).toContain(req);
      }
    }
  });

  it('every unit spawns all of its specific enemies with unique encounter IDs', () => {
    for (const [uid, cfg] of Object.entries(ALL_LEVEL_CONFIGS)) {
      const expectedCount = cfg.grade === 10 ? 6 : 7;
      expect(cfg.enemies.length).toBe(expectedCount);

      const encounterIds = new Set<string>();
      for (const enemy of cfg.enemies) {
        expect(enemy.encounterId).toMatch(new RegExp(`^${uid}_enc_`));
        expect(enemy.name.length).toBeGreaterThan(0);
        expect(enemy.hp).toBeGreaterThan(50);
        expect(enemy.attack).toBeGreaterThan(10);
        expect(enemy.patrolRange.maxX).toBeGreaterThan(enemy.patrolRange.minX);
        encounterIds.add(enemy.encounterId);
      }
      expect(encounterIds.size).toBe(expectedCount);
    }
  });

  it('real bosses are placed ONLY at Units 3, 6, 10; non-boss units have Climax Trials', () => {
    for (const [uid, cfg] of Object.entries(ALL_LEVEL_CONFIGS)) {
      const isBossUnit = [3, 6, 10].includes(cfg.unitNumber);
      expect(cfg.climax.hasRealBoss).toBe(isBossUnit);

      if (isBossUnit) {
        expect(cfg.climax.enemy.isBoss).toBe(true);
        expect(cfg.climax.barrierPrompt).toContain('Ma Khí Cấm Địa');
      } else {
        expect(cfg.climax.enemy.isBoss).toBe(false);
        expect(cfg.climax.enemy.name).toContain('Thủ Trận Tinh Anh');
        expect(cfg.climax.barrierPrompt).toContain('Phong Ấn Trận Đỉnh Điểm');
      }
    }
  });

  it('defeating an enemy tracks its encounterId and prevents duplicate reward farm', () => {
    const profile = createDefaultProfile('Hiệp Khách', 'male');
    const u1 = getLevelConfig('g10-u01');
    const firstEnemyCfg = u1.enemies[0];
    const enemyObj = {
      id: firstEnemyCfg.enemyId,
      name: firstEnemyCfg.name,
      title: firstEnemyCfg.title,
      spriteKey: firstEnemyCfg.spritePath,
      hp: firstEnemyCfg.hp,
      maxHp: firstEnemyCfg.maxHp,
      attack: firstEnemyCfg.attack,
      defense: firstEnemyCfg.defense,
      xpReward: firstEnemyCfg.xpReward,
      isBoss: false,
    };

    // First victory: should grant XP and record encounterId
    const res1 = ProgressionEngine.processCombatVictory(
      profile,
      enemyObj,
      false,
      120,
      firstEnemyCfg.encounterId
    );
    expect(res1.wasAlreadyDefeated).toBe(false);
    expect(res1.totalXpGained).toBe(firstEnemyCfg.xpReward);
    expect(res1.profile.defeatedEnemyIds).toContain(firstEnemyCfg.encounterId);

    // Second victory against the same encounterId: should block reward!
    const res2 = ProgressionEngine.processCombatVictory(
      res1.profile,
      enemyObj,
      false,
      120,
      firstEnemyCfg.encounterId
    );
    expect(res2.wasAlreadyDefeated).toBe(true);
    expect(res2.totalXpGained).toBe(0);
  });

  it('Grade 12 units can be selected, played, saved, and loaded with persistence', () => {
    const profile = createDefaultProfile('Hiệp Khách G12', 'female');
    profile.selectedGrade = 12;
    profile.selectedUnitId = 'g12-u01';

    // Verify Grade 12 Unit 1 metadata
    const g12u1 = getLevelConfig('g12-u01');
    expect(g12u1.grade).toBe(12);
    expect(g12u1.unitNumber).toBe(1);
    expect(g12u1.enemies.length).toBe(7);

    // Save and reload profile
    StorageService.saveProfile(profile);
    const loaded = StorageService.loadProfile();
    expect(loaded).not.toBeNull();
    expect(loaded!.selectedGrade).toBe(12);
    expect(loaded!.selectedUnitId).toBe('g12-u01');
    expect(loaded!.unitStates!['g12-u01'].isUnlocked).toBe(true);

    // Reach 70% progress in G12-U01, saving should unlock G12-U02
    loaded!.unitStates!['g12-u01'].progress = 75;
    StorageService.saveProfile(loaded!);
    const reloaded = StorageService.loadProfile();
    expect(reloaded!.unitStates!['g12-u02'].isUnlocked).toBe(true);
  });
});
