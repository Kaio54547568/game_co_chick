import { describe, it, expect } from 'vitest';
import { ALL_LEVEL_CONFIGS, getLevelConfig } from '../src/game/levels/levelConfig';

interface SimulatedZone {
  id: string;
  name: string;
  type: string;
  x: number;
  y: number;
  radius: number;
  prompt: string;
  icon?: string;
  data?: any;
}

// Emulate the selection algorithm from WorldScene.ts
function scoreCandidate(
  zone: SimulatedZone,
  px: number,
  py: number,
  facing: { x: number; y: number },
  currentSelectedId: string | null,
  defeatedEnemyIds: string[]
): number {
  const dx = zone.x - px;
  const dy = zone.y - py;
  const dist = Math.hypot(dx, dy);
  const normDx = dist > 0 ? dx / dist : 0;
  const normDy = dist > 0 ? dy / dist : 1;
  const dot = normDx * facing.x + normDy * facing.y;

  const facingBonus = Math.max(0, dot) * 45;

  let typeBonus = 0;
  if (zone.type === 'npc') typeBonus = 50;
  else if (zone.type === 'landmark' || zone.type === 'training') typeBonus = 45;
  else if (zone.type === 'climax_gate') typeBonus = 40;
  else if (zone.type === 'mob') {
    const encId = zone.data?.encounterId || zone.id;
    const isDefeated = defeatedEnemyIds.includes(encId);
    typeBonus = isDefeated ? -300 : 25;
  } else if (zone.type === 'prop') {
    typeBonus = 20;
  }

  const stickinessBonus = currentSelectedId === zone.id ? 35 : 0;
  return zone.radius - dist + facingBonus + typeBonus + stickinessBonus;
}

function selectBestZone(
  zones: SimulatedZone[],
  px: number,
  py: number,
  facing: { x: number; y: number },
  currentSelectedId: string | null,
  manualId: string | null,
  defeatedEnemyIds: string[]
): { selected: SimulatedZone | null; candidates: SimulatedZone[] } {
  const inRange = zones.filter((z) => Math.hypot(z.x - px, z.y - py) <= z.radius);
  if (inRange.length === 0) return { selected: null, candidates: [] };

  const scored = inRange.map((z) => ({
    zone: z,
    score: scoreCandidate(z, px, py, facing, currentSelectedId, defeatedEnemyIds),
  }));

  scored.sort((a, b) => b.score - a.score);
  const sorted = scored.map((s) => s.zone);

  if (manualId) {
    const manualMatch = sorted.find((z) => z.id === manualId);
    if (manualMatch) {
      return { selected: manualMatch, candidates: sorted };
    }
  }

  return { selected: sorted[0], candidates: sorted };
}

describe('Interaction Selection & Layout Verification', () => {
  const sampleZones: SimulatedZone[] = [
    {
      id: 'ho_phap_phuong_tu',
      name: 'Hộ Pháp Phương Tú',
      type: 'npc',
      x: 920,
      y: 560,
      radius: 105,
      prompt: '[E] Tham Vấn Phương Tú',
    },
    {
      id: 'tang_kinh_cac_seal',
      name: 'Tàng Kinh Các',
      type: 'landmark',
      x: 1150,
      y: 520,
      radius: 105,
      prompt: '[E] Tra cứu Tàng Kinh Các',
    },
    {
      id: 'ho_phap_hoang_van',
      name: 'Hộ Pháp Hoàng Vân',
      type: 'npc',
      x: 2400,
      y: 760,
      radius: 105,
      prompt: '[E] Thỉnh Giáo Hoàng Vân',
    },
    {
      id: 'training_dummy',
      name: 'Cọc Luyện Công',
      type: 'training',
      x: 2700,
      y: 760,
      radius: 105,
      prompt: '[E] Luyện Công',
    },
  ];

  it('allows individual, non-overlapping interaction with Phương Tú and Tàng Kinh Các without pixel hunting', () => {
    // Distance between them
    const dist = Math.hypot(1150 - 920, 520 - 560);
    expect(dist).toBeGreaterThan(230); // 233.5px

    // Stand in front of Phương Tú at (920, 610)
    const resPhuongTu = selectBestZone(sampleZones, 920, 610, { x: 0, y: -1 }, null, null, []);
    expect(resPhuongTu.selected?.id).toBe('ho_phap_phuong_tu');

    // Stand in front of Tàng Kinh Các at (1150, 570)
    const resTKC = selectBestZone(sampleZones, 1150, 570, { x: 0, y: -1 }, null, null, []);
    expect(resTKC.selected?.id).toBe('tang_kinh_cac_seal');
  });

  it('allows individual, non-overlapping interaction with Hoàng Vân and Cọc Luyện Công without pixel hunting', () => {
    // Distance between them
    const dist = Math.hypot(2700 - 2400, 760 - 760);
    expect(dist).toBe(300); // 300px separation

    // Stand in front of Hoàng Vân at (2400, 810)
    const resHoangVan = selectBestZone(sampleZones, 2400, 810, { x: 0, y: -1 }, null, null, []);
    expect(resHoangVan.selected?.id).toBe('ho_phap_hoang_van');

    // Stand in front of Cọc Luyện Công at (2700, 810)
    const resDummy = selectBestZone(sampleZones, 2700, 810, { x: 0, y: -1 }, null, null, []);
    expect(resDummy.selected?.id).toBe('training_dummy');
  });

  it('prioritizes facing direction when candidate zones are equidistant', () => {
    // Construct a scenario with target A on the left and target B on the right
    const leftTarget: SimulatedZone = {
      id: 'target_left',
      name: 'Left NPC',
      type: 'npc',
      x: 100,
      y: 200,
      radius: 80,
      prompt: '[E] Left',
    };
    const rightTarget: SimulatedZone = {
      id: 'target_right',
      name: 'Right NPC',
      type: 'npc',
      x: 200,
      y: 200,
      radius: 80,
      prompt: '[E] Right',
    };

    // Player stands exactly midway at (150, 200)
    // When facing right:
    const resFacingRight = selectBestZone(
      [leftTarget, rightTarget],
      150,
      200,
      { x: 1, y: 0 },
      null,
      null,
      []
    );
    expect(resFacingRight.selected?.id).toBe('target_right');

    // When facing left:
    const resFacingLeft = selectBestZone(
      [leftTarget, rightTarget],
      150,
      200,
      { x: -1, y: 0 },
      null,
      null,
      []
    );
    expect(resFacingLeft.selected?.id).toBe('target_left');
  });

  it('preserves stickiness (hysteresis) to prevent flickering near boundaries', () => {
    const targetA: SimulatedZone = {
      id: 'target_a',
      name: 'Target A',
      type: 'npc',
      x: 100,
      y: 100,
      radius: 100,
      prompt: '[E] A',
    };
    const targetB: SimulatedZone = {
      id: 'target_b',
      name: 'Target B',
      type: 'npc',
      x: 100,
      y: 200,
      radius: 100,
      prompt: '[E] B',
    };

    // Player is slightly closer to B (y=155) but was already interacting with A
    // facing downwards towards B
    const resSticky = selectBestZone(
      [targetA, targetB],
      100,
      155, // distance to A = 55, distance to B = 45
      { x: 0, y: 0 },
      'target_a', // currently selected
      null,
      []
    );
    expect(resSticky.selected?.id).toBe('target_a');
  });

  it('prevents defeated mobs from hijacking interaction priority over NPCs and props', () => {
    const npc: SimulatedZone = {
      id: 'quest_npc',
      name: 'Trưởng Lão',
      type: 'npc',
      x: 500,
      y: 500,
      radius: 100,
      prompt: '[E] Nhận Nhiệm Vụ',
    };
    const mob: SimulatedZone = {
      id: 'corrupted_guard',
      name: 'Ma Binh',
      type: 'mob',
      x: 520,
      y: 500, // very close to player
      radius: 100,
      prompt: '[E] Quyết đấu',
      data: { encounterId: 'corrupted_guard' },
    };

    // If mob is active, it has its normal priority
    const resActive = selectBestZone([npc, mob], 515, 500, { x: 0, y: 1 }, null, null, []);
    // NPC has higher type bonus (50 vs 25), so NPC is preferred even if mob is slightly closer
    expect(resActive.selected?.id).toBe('quest_npc');

    // If mob is defeated, NPC is overwhelmingly chosen
    const resDefeated = selectBestZone(
      [npc, mob],
      518,
      500,
      { x: 1, y: 0 },
      null,
      null,
      ['corrupted_guard']
    );
    expect(resDefeated.selected?.id).toBe('quest_npc');
  });

  it('allows manual target cycling (Tab / touch) when multiple targets in range', () => {
    const cand1: SimulatedZone = {
      id: 'cand_1',
      name: 'Đạo Cụ 1',
      type: 'prop',
      x: 300,
      y: 300,
      radius: 100,
      prompt: '[E] Khám phá',
    };
    const cand2: SimulatedZone = {
      id: 'cand_2',
      name: 'Đạo Cụ 2',
      type: 'prop',
      x: 320,
      y: 300,
      radius: 100,
      prompt: '[E] Khám phá',
    };

    // Player at (310, 300) has both in range
    const initial = selectBestZone([cand1, cand2], 310, 300, { x: 0, y: 1 }, null, null, []);
    expect(initial.candidates.length).toBe(2);

    // Manual selection of cand_2
    const manual2 = selectBestZone(
      [cand1, cand2],
      310,
      300,
      { x: 0, y: 1 },
      null,
      'cand_2',
      []
    );
    expect(manual2.selected?.id).toBe('cand_2');

    // Manual selection of cand_1
    const manual1 = selectBestZone(
      [cand1, cand2],
      310,
      300,
      { x: 0, y: 1 },
      null,
      'cand_1',
      []
    );
    expect(manual1.selected?.id).toBe('cand_1');
  });

  it('verifies safe spacing and clearances across representative units: G10 (U1, U5, U10), G11 (U1, U5, U10), G12 (U1, U5, U10)', () => {
    const checkUnits = [
      'g10-u01',
      'g10-u05',
      'g10-u10',
      'g11-u01',
      'g11-u05',
      'g11-u10',
      'g12-u01',
      'g12-u05',
      'g12-u10',
    ];

    for (const uid of checkUnits) {
      const cfg = getLevelConfig(uid);

      const phuongTu = cfg.npcs.find((n) => n.id === 'ho_phap_phuong_tu')!;
      const hoangVan = cfg.npcs.find((n) => n.id === 'ho_phap_hoang_van')!;
      const nguyetNguyen = cfg.npcs.find((n) => n.id === 'ho_phap_nguyet_nguyen')!;
      const dangTranHa = cfg.npcs.find((n) => n.id === 'ho_phap_dang_tran_ha')!;
      const bangChu = cfg.npcs.find((n) => n.id === 'bang_chu')!;

      // Check Phương Tú (920, 560) vs Tàng Kinh Các seal (1150, 520)
      const distPhuongTuTKC = Math.hypot(1150 - phuongTu.x, 520 - phuongTu.y);
      expect(distPhuongTuTKC).toBeGreaterThanOrEqual(220);

      // Check Hoàng Vân (2400, 760) vs Cọc Luyện Công (2700, 760)
      const distHoangVanDummy = Math.hypot(2700 - hoangVan.x, 760 - hoangVan.y);
      expect(distHoangVanDummy).toBeGreaterThanOrEqual(280);

      // Check Bang Chủ vs Phương Tú
      const distBangChuPhuongTu = Math.hypot(phuongTu.x - bangChu.x, phuongTu.y - bangChu.y);
      expect(distBangChuPhuongTu).toBeGreaterThanOrEqual(300);

      // Check Prop 1 (1380, 580) clearance
      const prop1 = cfg.props[0];
      if (prop1) {
        const distProp1PhuongTu = Math.hypot(prop1.x - phuongTu.x, prop1.y - phuongTu.y);
        const distProp1TKC = Math.hypot(prop1.x - 1150, prop1.y - 520);
        expect(distProp1PhuongTu).toBeGreaterThan(400);
        expect(distProp1TKC).toBeGreaterThan(200);
      }

      // Check Prop 2 (860, 1300) in G11 and G12 vs Nguyệt Nguyên (660, 1260)
      if (cfg.props[1]) {
        const prop2 = cfg.props[1];
        const distProp2NguyetNguyen = Math.hypot(prop2.x - nguyetNguyen.x, prop2.y - nguyetNguyen.y);
        expect(distProp2NguyetNguyen).toBeGreaterThanOrEqual(200);
      }

      // Check that all enemies are separated in danger zones (Y >= 1050)
      for (const e of cfg.enemies) {
        expect(e.y).toBeGreaterThanOrEqual(1050);
        expect(e.patrolRange.minX).toBeGreaterThan(50);
        expect(e.patrolRange.maxX).toBeLessThan(3150);
      }
    }
  });
});
