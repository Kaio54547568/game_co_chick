import { describe, it, expect, beforeEach } from 'vitest';
import fs from 'fs';
import path from 'path';
import { ALL_LEVEL_CONFIGS, getLevelConfig } from '../src/game/levels/levelConfig';
import { getUnitDataset, ALL_GLOBAL_SUCCESS_UNITS } from '../content/global-success';
import {
  evaluateUnitUnlocks,
  AntiFarmingGuard,
  PROGRESSION_THRESHOLDS,
  RemediationAdvisor,
} from '../src/data/progressionBalance';
import { createDefaultProfile, StorageService } from '../src/services/storage';
import { ProgressionEngine } from '../src/services/progressionEngine';
import { speechService } from '../src/services/speechService';
import { soundService } from '../src/services/sound';
import { CombatEnemy, PlayerProfile } from '../src/types/game';

// Helper to check if file exists in public/ or assets/
function checkDiskAsset(url: string | null | undefined): boolean {
  if (!url) return true; // optional secondary path
  const clean = url.startsWith('/') ? url.slice(1) : url;
  const projectRoot = path.resolve(__dirname, '..');
  const inPublic = path.join(projectRoot, 'public', clean);
  const inAssets = path.join(projectRoot, clean);
  return fs.existsSync(inPublic) || fs.existsSync(inAssets);
}

describe('QA 1: Asset Existence Across All 30 Units (Kiểm tra ảnh thiếu)', () => {
  for (const [unitId, cfg] of Object.entries(ALL_LEVEL_CONFIGS)) {
    it(`verifies all assets exist on disk for ${unitId}`, () => {
      // 1. Ground asset
      expect(
        checkDiskAsset(cfg.ground.primaryPath),
        `${unitId} ground.primaryPath missing: ${cfg.ground.primaryPath}`
      ).toBe(true);

      if (cfg.ground.secondaryPath) {
        expect(
          checkDiskAsset(cfg.ground.secondaryPath),
          `${unitId} ground.secondaryPath missing: ${cfg.ground.secondaryPath}`
        ).toBe(true);
      }

      // 2. NPC portraits
      for (const npc of cfg.npcs) {
        expect(
          checkDiskAsset(npc.portraitPath),
          `${unitId} NPC ${npc.id} portrait missing: ${npc.portraitPath}`
        ).toBe(true);
      }

      // 3. Props
      for (const prop of cfg.props) {
        expect(
          checkDiskAsset(prop.path),
          `${unitId} Prop ${prop.id} image missing: ${prop.path}`
        ).toBe(true);
      }

      // 4. Enemies
      for (const enemy of cfg.enemies) {
        expect(
          checkDiskAsset(enemy.spritePath),
          `${unitId} Enemy ${enemy.enemyId} sprite missing: ${enemy.spritePath}`
        ).toBe(true);
      }

      // 5. Climax Boss/Master enemy
      expect(
        checkDiskAsset(cfg.climax.enemy.spriteKey),
        `${unitId} Climax enemy sprite missing: ${cfg.climax.enemy.spriteKey}`
      ).toBe(true);
    });
  }
});

describe('QA 2: Sprite Scale, Hitboxes & Obstacle Clearances (Sprite quá to/nhỏ & Nhãn che nhau)', () => {
  for (const [unitId, cfg] of Object.entries(ALL_LEVEL_CONFIGS)) {
    it(`verifies layout, hitboxes, and scaling sanity for ${unitId}`, () => {
      // Prop sizes sanity (32px to 250px)
      for (const prop of cfg.props) {
        expect(prop.size[0], `${unitId} prop ${prop.id} width`).toBeGreaterThanOrEqual(32);
        expect(prop.size[0], `${unitId} prop ${prop.id} width`).toBeLessThanOrEqual(250);
        expect(prop.size[1], `${unitId} prop ${prop.id} height`).toBeGreaterThanOrEqual(32);
        expect(prop.size[1], `${unitId} prop ${prop.id} height`).toBeLessThanOrEqual(250);
      }

      // NPC-to-NPC distance >= 120px to prevent overlapping labels & sprites
      for (let i = 0; i < cfg.npcs.length; i++) {
        for (let j = i + 1; j < cfg.npcs.length; j++) {
          const n1 = cfg.npcs[i];
          const n2 = cfg.npcs[j];
          const dist = Math.hypot(n1.x - n2.x, n1.y - n2.y);
          expect(
            dist,
            `${unitId}: NPC ${n1.id} and ${n2.id} overlap (${dist.toFixed(1)}px, min: 120px)`
          ).toBeGreaterThanOrEqual(120);
        }
      }

      // Safe Haven margin: 0 enemies in x < 850 && y < 850
      const safeHavenEnemies = cfg.enemies.filter((e) => e.x < 850 && e.y < 850);
      expect(safeHavenEnemies.length, `${unitId} must not have enemies inside Safe Haven`).toBe(0);

      // NPC to enemy margin >= 220px
      for (const npc of cfg.npcs) {
        for (const enemy of cfg.enemies) {
          const dist = Math.hypot(npc.x - enemy.x, npc.y - enemy.y);
          expect(
            dist,
            `${unitId}: NPC ${npc.id} too close to enemy ${enemy.enemyId} (${dist.toFixed(1)}px, min: 220px)`
          ).toBeGreaterThanOrEqual(220);
        }
      }
    });
  }
});

describe('QA 3: Enemy Patrol Range Safety (Quái tuần tra vào vật cản)', () => {
  for (const [unitId, cfg] of Object.entries(ALL_LEVEL_CONFIGS)) {
    it(`verifies patrol bounds for ${unitId}`, () => {
      for (const enemy of cfg.enemies) {
        expect(
          enemy.patrolRange.minX,
          `${unitId} enemy ${enemy.enemyId} minX must be less than maxX`
        ).toBeLessThan(enemy.patrolRange.maxX);

        const patrolLength = enemy.patrolRange.maxX - enemy.patrolRange.minX;
        expect(
          patrolLength,
          `${unitId} enemy ${enemy.enemyId} patrol length between 60 and 400`
        ).toBeGreaterThanOrEqual(60);
        expect(patrolLength).toBeLessThanOrEqual(400);

        // Enemy must not patrol into the Safe Haven (x < 850 && y < 850)
        if (enemy.y < 850) {
          expect(
            enemy.patrolRange.minX,
            `${unitId} enemy ${enemy.enemyId} patrols into Safe Haven minX`
          ).toBeGreaterThanOrEqual(850);
        }
      }
    });
  }
});

describe('QA 4: Unit Curriculum Alignment (Câu hỏi đúng Unit)', () => {
  for (const [unitId, cfg] of Object.entries(ALL_LEVEL_CONFIGS)) {
    it(`verifies questions and dataset coverage for ${unitId}`, () => {
      const dataset = getUnitDataset(unitId);
      expect(dataset, `Dataset for ${unitId} must exist`).toBeDefined();

      if (dataset) {
        expect(
          dataset.vocabulary.length,
          `${unitId} must have at least 6 vocabulary words`
        ).toBeGreaterThanOrEqual(6);

        expect(
          dataset.grammar.length,
          `${unitId} must have at least 1 grammar point`
        ).toBeGreaterThanOrEqual(1);

        expect(
          dataset.questions.length,
          `${unitId} must have at least 3 practice questions`
        ).toBeGreaterThanOrEqual(3);

        // Ensure questions contain prompt, options, and correctAnswer
        for (const q of dataset.questions) {
          expect(q.prompt.length, `${unitId} question prompt`).toBeGreaterThan(0);
          expect(q.options.length, `${unitId} question options`).toBeGreaterThanOrEqual(2);
          expect(q.options, `${unitId} question options contain correct answer`).toContain(q.correctAnswer);
        }
      }
    });
  }
});

describe('QA 5: Boss Milestone Rules (Boss đúng mốc Unit 3, 6, 10)', () => {
  for (const [unitId, cfg] of Object.entries(ALL_LEVEL_CONFIGS)) {
    it(`verifies boss milestone logic for ${unitId}`, () => {
      const isBossMilestone = cfg.unitNumber === 3 || cfg.unitNumber === 6 || cfg.unitNumber === 10;
      if (isBossMilestone) {
        expect(
          cfg.climax.hasRealBoss,
          `${unitId} (Unit ${cfg.unitNumber}) is a boss milestone and must have hasRealBoss = true`
        ).toBe(true);
        expect(
          cfg.climax.enemy.isBoss,
          `${unitId} climax enemy isBoss must be true`
        ).toBe(true);
      } else {
        expect(
          cfg.climax.hasRealBoss,
          `${unitId} (Unit ${cfg.unitNumber}) is not a boss milestone and must have hasRealBoss = false`
        ).toBe(false);
      }
    });
  }
});

describe('QA 6: Audio & Speech Service Robustness (Âm thanh không phát)', () => {
  it('speechService gracefully handles missing browser SpeechSynthesis', () => {
    expect(() => {
      speechService.stop();
      speechService.speak('Test sentence', {
        onEnd: () => {},
        onError: () => {},
      });
    }).not.toThrow();
  });

  it('soundService handles muted state and does not crash when AudioContext is missing', () => {
    expect(() => {
      soundService.toggleMute();
      soundService.playClick();
      soundService.playHit();
      soundService.playLevelUp();
      soundService.playVictory();
      soundService.toggleMute(); // unmute back
    }).not.toThrow();
  });
});

describe('QA 7: Anti-Farming & Duplicate Rewards (Phần thưởng lặp)', () => {
  let profile: PlayerProfile;

  beforeEach(() => {
    profile = createDefaultProfile('Hiệp Khách Kiểm Định', 'male');
  });

  it('AntiFarmingGuard blocks second reward claims on props, enemies, and guardian quests', () => {
    const unitId = 'g10-u01';
    const propId = 'test_prop_1';
    const enemyId = 'test_enemy_1';
    const guardianId = 'ho_phap_dang_tran_ha';

    // Before: All can earn
    expect(AntiFarmingGuard.canEarnPropReward(profile, unitId, propId)).toBe(true);
    expect(AntiFarmingGuard.canEarnEnemyReward(profile, enemyId)).toBe(true);
    expect(AntiFarmingGuard.canEarnGuardianQuestReward(profile, unitId, guardianId)).toBe(true);

    // Complete prop
    const resProp = ProgressionEngine.completePropActivity(profile, unitId, propId, 35, 5);
    profile = resProp.profile;
    expect(AntiFarmingGuard.canEarnPropReward(profile, unitId, propId)).toBe(false);

    // Defeat enemy
    const dummyEnemy: CombatEnemy = {
      id: enemyId,
      name: 'Quái Thử Nghiệm',
      title: 'Tà đồ',
      spriteKey: '/assets/game/characters/enemies/sword_disciple.png',
      hp: 100,
      maxHp: 100,
      attack: 10,
      defense: 5,
      xpReward: 30,
    };
    const resCombat = ProgressionEngine.processCombatVictory(profile, dummyEnemy, false, 100);
    profile = resCombat.profile;
    expect(AntiFarmingGuard.canEarnEnemyReward(profile, enemyId)).toBe(false);

    // Claim guardian quest
    profile.guardianQuestStates = {
      [unitId]: {
        [guardianId]: 'rewarded',
      },
    };
    expect(AntiFarmingGuard.canEarnGuardianQuestReward(profile, unitId, guardianId)).toBe(false);
  });
});

describe('QA 8: Rapid Unit Switching Stability (Lỗi đổi Unit liên tục)', () => {
  it('switches between 5 different units consecutively without state corruption or leakage', () => {
    let profile = createDefaultProfile('Hiệp Khách Du Đấu', 'male');

    const testUnits = ['g10-u01', 'g10-u02', 'g10-u03', 'g11-u01', 'g12-u01'];

    for (const targetUnit of testUnits) {
      // Simulate player gaining some progress in targetUnit
      profile.selectedUnitId = targetUnit;
      profile.unitProgress = 35;
      profile.defeatedMobs = 2;
      profile.defeatedEnemyIds = [`${targetUnit}_mob_1`];

      // Save state into unitStates
      const updatedStates = { ...(profile.unitStates || {}) };
      if (updatedStates[targetUnit]) {
        updatedStates[targetUnit] = {
          ...updatedStates[targetUnit],
          progress: 35,
          defeatedMobs: 2,
          defeatedEnemyIds: [`${targetUnit}_mob_1`],
        };
      }
      profile.unitStates = evaluateUnitUnlocks(updatedStates);
    }

    // Verify all 5 units retained their exact independent progress
    for (const targetUnit of testUnits) {
      expect(profile.unitStates?.[targetUnit]?.progress).toBe(35);
      expect(profile.unitStates?.[targetUnit]?.defeatedMobs).toBe(2);
      expect(profile.unitStates?.[targetUnit]?.defeatedEnemyIds).toContain(`${targetUnit}_mob_1`);
    }
  });
});

describe('QA 9: Mid-Combat Modal Exit Safety (Lỗi đóng modal giữa trận)', () => {
  it('retreats cleanly without awarding XP or advancing quest', () => {
    let profile = createDefaultProfile('Hiệp Khách Quyết Đấu', 'female');
    const initialXp = profile.stats.xp;
    const initialProgress = profile.unitProgress;

    // Simulate taking damage and then retreating
    profile = ProgressionEngine.takeDamage(profile, 30);
    expect(profile.stats.hp).toBe(profile.stats.maxHp - 30);

    // Player retreats: HP synced safely, no XP or victory awarded
    profile = ProgressionEngine.syncHp(profile, profile.stats.hp);

    expect(profile.stats.xp).toBe(initialXp);
    expect(profile.unitProgress).toBe(initialProgress);
    expect(profile.bossDefeated).toBe(false);
  });
});
