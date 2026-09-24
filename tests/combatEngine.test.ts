import { describe, it, expect } from 'vitest';
import { CombatEngine } from '../src/services/combatEngine';
import { calculateCongLuc } from '../src/services/storage';
import { PlayerStats, EquipmentState, CombatEnemy } from '../src/types/game';

describe('CombatEngine & Công Lực Tests', () => {
  const baseStats: PlayerStats = {
    level: 1,
    xp: 0,
    xpToNextLevel: 100,
    hp: 120,
    maxHp: 120,
    attack: 25,
    defense: 12,
    speed: 160,
    criticalRate: 0.15,
    criticalDamage: 1.5,
    congLuc: 0,
  };

  const emptyEquipment: EquipmentState = {
    weapon: null,
    accessory: null,
    manual: null,
  };

  const enemy: CombatEnemy = {
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

  it('tính Công Lực chính xác theo công thức GDD', () => {
    // Cong Luc = level*120 + hp*2 + atk*12 + def*10 + equipBonus
    // = 1*120 + 120*2 + 25*12 + 12*10 = 120 + 240 + 300 + 120 = 780
    const congLuc = calculateCongLuc(baseStats, { hp: 0, atk: 0, def: 0, bonus: 0 });
    expect(congLuc).toBe(780);
  });

  it('kích hoạt Bạo Kích (Critical Hit) khi trả lời trong 0-3 giây', () => {
    const turnResult = CombatEngine.processTurn(
      true,
      2.1, // 2.1s <= 3s -> Critical!
      0,
      baseStats,
      emptyEquipment,
      enemy
    );

    expect(turnResult.isCorrect).toBe(true);
    expect(turnResult.isCritical).toBe(true);
    expect(turnResult.damageToEnemy).toBeGreaterThan(50);
    expect(turnResult.damageToPlayer).toBe(0);
    expect(turnResult.comboCount).toBe(1);
  });

  it('đòn đánh chuẩn khi trả lời trong 3-7 giây', () => {
    const turnResult = CombatEngine.processTurn(
      true,
      4.5, // 4.5s -> Normal Hit
      0,
      baseStats,
      emptyEquipment,
      enemy
    );

    expect(turnResult.isCorrect).toBe(true);
    expect(turnResult.isCritical).toBe(false);
    expect(turnResult.isWeak).toBe(false);
  });

  it('tăng sát thương khi đạt chuỗi Combo liên tiếp', () => {
    const normalTurn = CombatEngine.processTurn(
      true,
      4.0,
      0, // combo 0 -> 1
      baseStats,
      emptyEquipment,
      enemy
    );

    const comboTurn = CombatEngine.processTurn(
      true,
      4.0,
      3, // combo 3 -> 4 (x1.5 multiplier)
      baseStats,
      emptyEquipment,
      enemy
    );

    expect(comboTurn.damageToEnemy).toBeGreaterThan(normalTurn.damageToEnemy);
    expect(comboTurn.comboCount).toBe(4);
  });

  it('kẻ địch phản công và gây sát thương khi người chơi trả lời sai', () => {
    const wrongTurn = CombatEngine.processTurn(
      false,
      5.0,
      3, // đang có combo
      baseStats,
      emptyEquipment,
      enemy
    );

    expect(wrongTurn.isCorrect).toBe(false);
    expect(wrongTurn.damageToEnemy).toBe(0);
    expect(wrongTurn.damageToPlayer).toBeGreaterThan(0);
    expect(wrongTurn.comboCount).toBe(0); // Combo bị reset về 0
  });

  it('xử lý thăng cấp (Level up), tăng thuộc tính và hồi đầy HP khi đủ XP', () => {
    const { stats, didLevelUp } = CombatEngine.addXp(baseStats, emptyEquipment, 120);

    expect(didLevelUp).toBe(true);
    expect(stats.level).toBe(2);
    expect(stats.xp).toBe(20); // 120 - 100 = 20
    expect(stats.maxHp).toBe(140);
    expect(stats.hp).toBe(140); // Hồi đầy máu khi thăng cấp
    expect(stats.attack).toBe(30);
    expect(stats.defense).toBe(15);
    expect(stats.congLuc).toBeGreaterThan(780);
  });
});
