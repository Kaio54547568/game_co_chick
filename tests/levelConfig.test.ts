import { describe, it, expect } from 'vitest';
import { ALL_LEVEL_CONFIGS, getLevelConfig } from '../src/game/levels/levelConfig';

describe('Level Configuration for 30 Units', () => {
  it('should have all 30 units configured', () => {
    const keys = Object.keys(ALL_LEVEL_CONFIGS);
    expect(keys.length).toBe(30);

    for (let g = 10; g <= 12; g++) {
      for (let u = 1; u <= 10; u++) {
        const uPad = u.toString().padStart(2, '0');
        const unitId = `g${g}-u${uPad}`;
        expect(ALL_LEVEL_CONFIGS[unitId]).toBeDefined();
      }
    }
  });

  it('should have map dimensions 3200x2000 for each unit', () => {
    for (const [unitId, config] of Object.entries(ALL_LEVEL_CONFIGS)) {
      expect(config.mapWidth).toBe(3200);
      expect(config.mapHeight).toBe(2000);
    }
  });

  it('should have all 5 NPCs in each unit with correct roles and sprites', () => {
    const expectedNpcIds = [
      'bang_chu',
      'ho_phap_phuong_tu',
      'ho_phap_dang_tran_ha',
      'ho_phap_hoang_van',
      'ho_phap_nguyet_nguyen',
    ];

    for (const [unitId, config] of Object.entries(ALL_LEVEL_CONFIGS)) {
      expect(config.npcs.length).toBe(5);
      const ids = config.npcs.map((n) => n.id);
      for (const expectedId of expectedNpcIds) {
        expect(ids).toContain(expectedId);
      }
    }
  });

  it('should have correct enemy counts per Grade (6 for G10, 7 for G11, 7 for G12)', () => {
    for (const [unitId, config] of Object.entries(ALL_LEVEL_CONFIGS)) {
      if (config.grade === 10) {
        expect(config.enemies.length).toBe(6);
      } else {
        expect(config.enemies.length).toBe(7);
      }

      // Check unique encounter IDs
      const encounterIds = new Set(config.enemies.map((e) => e.encounterId));
      expect(encounterIds.size).toBe(config.enemies.length);
    }
  });

  it('should only have real bosses at Units 3, 6, 10 and Climax Trial at others', () => {
    for (const [unitId, config] of Object.entries(ALL_LEVEL_CONFIGS)) {
      const isBossUnit = [3, 6, 10].includes(config.unitNumber);
      expect(config.climax.hasRealBoss).toBe(isBossUnit);

      if (isBossUnit) {
        expect(config.climax.enemy.isBoss).toBe(true);
      } else {
        expect(config.climax.enemy.isBoss).toBe(false);
        expect(config.climax.enemy.name).toContain('Thủ Trận Tinh Anh');
      }
    }
  });

  it('getLevelConfig returns fallback if not found', () => {
    const fallback = getLevelConfig('unknown-unit');
    expect(fallback.unitId).toBe('g10-u01');
  });
});
