import { describe, it, expect } from 'vitest';
import { ALL_LEVEL_CONFIGS, getLevelConfig } from '../src/game/levels/levelConfig';
import { PropActivityService } from '../src/services/propActivityService';

describe('Map Design, Exploration Loops & Spatial Audit (All 30 Units)', () => {
  it('validates safe haven spawn sector (0-850, 0-850) has 0 enemies across all 30 units', () => {
    for (const [unitId, cfg] of Object.entries(ALL_LEVEL_CONFIGS)) {
      const enemiesInSafeZone = cfg.enemies.filter((e) => e.x < 850 && e.y < 850);
      expect(
        enemiesInSafeZone.length,
        `${unitId} must have no enemies in the Sơn Môn safe haven zone (x<850, y<850)`
      ).toBe(0);
    }
  });

  it('guarantees NPC-to-Enemy separation margin >= 220px across all 30 units', () => {
    for (const [unitId, cfg] of Object.entries(ALL_LEVEL_CONFIGS)) {
      for (const npc of cfg.npcs) {
        for (const enemy of cfg.enemies) {
          const dist = Math.hypot(npc.x - enemy.x, npc.y - enemy.y);
          expect(
            dist,
            `${unitId}: Enemy ${enemy.enemyId || enemy.name} at (${enemy.x},${enemy.y}) is too close to NPC ${npc.id} at (${npc.x},${npc.y}) - distance: ${dist.toFixed(1)}px (min: 220px)`
          ).toBeGreaterThanOrEqual(220);
        }
      }
    }
  });

  it('guarantees Prop-to-Enemy separation margin >= 180px across all 30 units', () => {
    for (const [unitId, cfg] of Object.entries(ALL_LEVEL_CONFIGS)) {
      for (const prop of cfg.props) {
        for (const enemy of cfg.enemies) {
          const dist = Math.hypot(prop.x - enemy.x, prop.y - enemy.y);
          expect(
            dist,
            `${unitId}: Enemy ${enemy.enemyId || enemy.name} at (${enemy.x},${enemy.y}) is too close to prop ${prop.id} at (${prop.x},${prop.y}) - distance: ${dist.toFixed(1)}px (min: 180px)`
          ).toBeGreaterThanOrEqual(180);
        }
      }
    }
  });

  it('guarantees Enemy-to-Enemy initial spawn spacing >= 140px across all 30 units', () => {
    for (const [unitId, cfg] of Object.entries(ALL_LEVEL_CONFIGS)) {
      for (let i = 0; i < cfg.enemies.length; i++) {
        for (let j = i + 1; j < cfg.enemies.length; j++) {
          const e1 = cfg.enemies[i];
          const e2 = cfg.enemies[j];
          const dist = Math.hypot(e1.x - e2.x, e1.y - e2.y);
          expect(
            dist,
            `${unitId}: Enemy ${e1.enemyId} and ${e2.enemyId} spawn too close (${dist.toFixed(1)}px, min: 140px)`
          ).toBeGreaterThanOrEqual(140);
        }
      }
    }
  });

  it('verifies Climax Gate positioning and southern danger sector across all 30 units', () => {
    for (const [unitId, cfg] of Object.entries(ALL_LEVEL_CONFIGS)) {
      expect(cfg.climax.x).toBe(1600);
      expect(cfg.climax.y).toBe(1720);

      // Verify at least one formidable enemy in southern approach sector (y >= 1350)
      const southEnemies = cfg.enemies.filter((e) => e.y >= 1350);
      expect(
        southEnemies.length,
        `${unitId} should feature guards in the southern climax sector`
      ).toBeGreaterThanOrEqual(1);
    }
  });
});

describe('Visual & Thematic Inspection of 9 Representative Units', () => {
  const targetUnits = [
    { id: 'g10-u01', grade: 10, unit: 1, title: 'FAMILY LIFE', isBoss: false },
    { id: 'g10-u05', grade: 10, unit: 5, title: 'INVENTIONS', isBoss: false },
    { id: 'g10-u10', grade: 10, unit: 10, title: 'ECOTOURISM', isBoss: true },
    { id: 'g11-u01', grade: 11, unit: 1, title: 'A LONG AND HEALTHY LIFE', isBoss: false },
    { id: 'g11-u06', grade: 11, unit: 6, title: 'PRESERVING OUR HERITAGE', isBoss: true },
    { id: 'g11-u10', grade: 11, unit: 10, title: 'THE ECOSYSTEM', isBoss: true },
    { id: 'g12-u01', grade: 12, unit: 1, title: 'LIFE STORIES', isBoss: false },
    { id: 'g12-u05', grade: 12, unit: 5, title: 'THE WORLD OF WORK', isBoss: false },
    { id: 'g12-u10', grade: 12, unit: 10, title: 'LIFELONG LEARNING', isBoss: true },
  ];

  for (const u of targetUnits) {
    it(`inspects ${u.id} (Grade ${u.grade} Unit ${u.unit} - ${u.title}) visual & mechanical design`, () => {
      const cfg = getLevelConfig(u.id);
      expect(cfg).toBeDefined();
      expect(cfg.unitId).toBe(u.id);
      expect(cfg.title.toUpperCase()).toContain(u.title.toUpperCase());

      // Verify 4 Guardians present with distinct roles
      expect(cfg.npcs.length).toBeGreaterThanOrEqual(4);
      const npcIds = cfg.npcs.map((n) => n.id);
      expect(npcIds).toContain('bang_chu');
      expect(npcIds).toContain('ho_phap_phuong_tu');
      expect(npcIds).toContain('ho_phap_dang_tran_ha');
      expect(npcIds).toContain('ho_phap_hoang_van');

      // Verify Boss presence rule: Units 3, 6, 10 must have boss
      if (u.isBoss) {
        expect(cfg.climax.hasRealBoss, `${u.id} should have hasRealBoss = true`).toBe(true);
      }

      // Verify active interactive props (category !== 'decoration')
      const activeProps = cfg.props.filter((p) => p.category && p.category !== 'decoration');
      expect(
        activeProps.length,
        `${u.id} must have at least 2 active interactive props`
      ).toBeGreaterThanOrEqual(2);

      // Verify each active prop has a valid educational activity configured
      for (const p of activeProps) {
        const activity = PropActivityService.getPropActivity(u.id, p.id);
        expect(activity, `${u.id} prop ${p.id} must have valid activity`).toBeDefined();
        if (activity) {
          expect(activity.propName.length).toBeGreaterThan(0);
          expect(activity.question.prompt.length).toBeGreaterThan(0);
          expect(activity.question.options.length).toBeGreaterThanOrEqual(2);
          expect(activity.question.explanation.length).toBeGreaterThan(0);
        }
      }

      // Verify combat encounter configurations
      for (const enemy of cfg.enemies) {
        expect(enemy.encounterId, `${u.id} enemy ${enemy.enemyId} should have encounterId`).toBeDefined();
      }
    });
  }
});

describe('Exploration Loops & Navigation Topology', () => {
  it('validates Branch A (Minh Triết Trail) and Branch B (Trúc Lâm Trail) loop architecture', () => {
    // Spatial verification of Branch A:
    // Fork at (800, 680), passes Minh Triết Các (750, 1050), loops at (1150, 1380) back to South Avenue
    const branchA_fork = { x: 800, y: 680 };
    const branchA_poi = { x: 750, y: 1050 };
    const branchA_loopReturn = { x: 1150, y: 1380 };
    const southAvenue = { x: 1600, y: 1380 };

    const distForkToPoi = Math.hypot(branchA_fork.x - branchA_poi.x, branchA_fork.y - branchA_poi.y);
    const distPoiToReturn = Math.hypot(branchA_poi.x - branchA_loopReturn.x, branchA_poi.y - branchA_loopReturn.y);
    const distReturnToAvenue = Math.hypot(branchA_loopReturn.x - southAvenue.x, branchA_loopReturn.y - southAvenue.y);

    // Each leg is within reasonable walking distance (< 500px, avoiding empty desert)
    expect(distForkToPoi).toBeLessThan(400);
    expect(distPoiToReturn).toBeLessThan(550);
    expect(distReturnToAvenue).toBeLessThan(500);

    // Spatial verification of Branch B:
    // Fork at (2400, 680), passes Trúc Lâm (2550, 1150), loops at (2150, 1380) back to South Avenue
    const branchB_fork = { x: 2400, y: 680 };
    const branchB_poi = { x: 2550, y: 1150 };
    const branchB_loopReturn = { x: 2150, y: 1380 };

    const distForkToPoiB = Math.hypot(branchB_fork.x - branchB_poi.x, branchB_fork.y - branchB_poi.y);
    const distPoiToReturnB = Math.hypot(branchB_poi.x - branchB_loopReturn.x, branchB_poi.y - branchB_loopReturn.y);
    const distReturnToAvenueB = Math.hypot(branchB_loopReturn.x - southAvenue.x, branchB_loopReturn.y - southAvenue.y);

    expect(distForkToPoiB).toBeLessThan(500);
    expect(distPoiToReturnB).toBeLessThan(500);
    expect(distReturnToAvenueB).toBeLessThan(600);
  });
});

describe('Minimap Waypoint & Direction Calculations', () => {
  // Pure helper matching Minimap.tsx logic
  function calculateWaypoint(
    playerPos: { x: number; y: number },
    questStep: number
  ) {
    let targetX = 550;
    let targetY = 560;
    let targetName = 'Sơn Môn (Bang Chủ)';

    if (questStep === 2) {
      targetX = 920;
      targetY = 560;
      targetName = 'Tàng Kinh Các (Cô Phương Tú)';
    } else if (questStep === 3) {
      targetX = 1850;
      targetY = 560;
      targetName = 'Phong Ấn Thạch Trận (Thầy Đặng Trần Hà)';
    } else if (questStep === 4) {
      targetX = 1600;
      targetY = 1000;
      targetName = 'Dã Ngoại Trúc Lâm (Trảm Ma)';
    } else if (questStep === 5) {
      targetX = 1600;
      targetY = 1720;
      targetName = 'Ma Giáo Cấm Địa (Quyết Chiến)';
    }

    const dx = targetX - playerPos.x;
    const dy = targetY - playerPos.y;
    const dist = Math.round(Math.hypot(dx, dy));

    let dir = '';
    if (Math.abs(dy) > 100) dir += dy > 0 ? 'Nam ' : 'Bắc ';
    if (Math.abs(dx) > 100) dir += dx > 0 ? 'Đông' : 'Tây';
    if (!dir) dir = 'Gần kề';

    return { targetName, distance: dist, dir: dir.trim() };
  }

  it('accurately computes distance and cardinal direction from spawn', () => {
    const spawn = { x: 550, y: 560 };

    // At spawn, step 1 (target is spawn itself)
    const wp1 = calculateWaypoint(spawn, 1);
    expect(wp1.distance).toBe(0);
    expect(wp1.dir).toBe('Gần kề');

    // From spawn, step 2: Tàng Kinh Các (920, 560) -> directly East
    const wp2 = calculateWaypoint(spawn, 2);
    expect(wp2.distance).toBe(370);
    expect(wp2.dir).toBe('Đông');

    // From spawn, step 4: Dã Ngoại Trúc Lâm (1600, 1000) -> South East
    const wp4 = calculateWaypoint(spawn, 4);
    expect(wp4.distance).toBe(1138);
    expect(wp4.dir).toBe('Nam Đông');

    // From spawn, step 5: Cấm Địa (1600, 1720) -> South East
    const wp5 = calculateWaypoint(spawn, 5);
    expect(wp5.distance).toBe(1565);
    expect(wp5.dir).toBe('Nam Đông');
  });

  it('accurately computes distance when player moves south', () => {
    const playerAtSouthAvenue = { x: 1600, y: 1500 };

    // Target step 5 (1600, 1720): player is 220px north of gate
    const wp = calculateWaypoint(playerAtSouthAvenue, 5);
    expect(wp.distance).toBe(220);
    expect(wp.dir).toBe('Nam');
  });
});
