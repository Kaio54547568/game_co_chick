import { PlayerStats, EquipmentState, CombatEnemy } from '../types/game';
import { calculateCongLuc } from './storage';

export interface CombatTurnResult {
  isCorrect: boolean;
  isCritical: boolean;
  isWeak: boolean;
  damageToEnemy: number;
  damageToPlayer: number;
  comboCount: number;
  feedbackText: string;
}

export interface CombatTurnModifiers {
  hintUsed?: boolean;
  damageMultiplier?: number;
  enemyAttackMultiplier?: number;
}

export class CombatEngine {
  // Tính tổng chỉ số trang bị
  static getEquipmentBonus(equipment: EquipmentState) {
    let hpBonus = 0;
    let atkBonus = 0;
    let defBonus = 0;
    let congLucBonus = 0;

    Object.values(equipment).forEach((item) => {
      if (item && item.stats) {
        hpBonus += item.stats.hpBonus || 0;
        atkBonus += item.stats.atkBonus || 0;
        defBonus += item.stats.defBonus || 0;
        congLucBonus += item.stats.congLucBonus || 0;
      }
    });

    return { hp: hpBonus, atk: atkBonus, def: defBonus, bonus: congLucBonus };
  }

  // Tính sát thương khi người chơi trả lời câu hỏi
  static processTurn(
    isCorrect: boolean,
    responseTimeSec: number,
    currentCombo: number,
    playerStats: PlayerStats,
    equipment: EquipmentState,
    enemy: CombatEnemy,
    modifiers?: CombatTurnModifiers
  ): CombatTurnResult {
    const equipBonus = this.getEquipmentBonus(equipment);
    const totalAtk = playerStats.attack + equipBonus.atk;
    const totalDef = playerStats.defense + equipBonus.def;

    if (!isCorrect) {
      // Trả lời sai hoặc hết giờ: Kẻ địch đánh người chơi
      const enemyMult = modifiers?.enemyAttackMultiplier ?? 1.0;
      const baseEnemyDmg = Math.max(10, Math.round(enemy.attack * 1.2 - totalDef * 0.5));
      const enemyDmg = Math.max(5, Math.round(baseEnemyDmg * enemyMult));
      return {
        isCorrect: false,
        isCritical: false,
        isWeak: false,
        damageToEnemy: 0,
        damageToPlayer: enemyDmg,
        comboCount: 0,
        feedbackText: `Kiếm chiêu sai lạc! Kẻ địch phản công gây ${enemyDmg} sát thương!`,
      };
    }


    // Trả lời đúng: Tính toán Bạo Kích & Combo
    const nextCombo = currentCombo + 1;
    let comboMultiplier = 1.0;
    if (nextCombo === 2) comboMultiplier = 1.1;
    else if (nextCombo === 3) comboMultiplier = 1.25;
    else if (nextCombo >= 4) comboMultiplier = 1.5;

    let isCritical = false;
    let isWeak = false;
    let timeMultiplier = 1.0;

    // 0 - 3 giây: Bạo kích (Critical Hit)
    if (responseTimeSec <= 3.0) {
      isCritical = true;
      timeMultiplier = 1.8;
    } else if (responseTimeSec > 7.0) {
      // 7 - 10 giây: Đòn đánh yếu
      isWeak = true;
      timeMultiplier = 0.8;
    }

    const baseDmg = totalAtk * 1.5;
    const finalEnemyDef = enemy.defense * 0.4;
    const hintFactor = modifiers?.hintUsed ? 0.6 : 1.0;
    const buffFactor = modifiers?.damageMultiplier ?? 1.0;
    const rawDamage = Math.max(10, (baseDmg - finalEnemyDef) * timeMultiplier * comboMultiplier * hintFactor * buffFactor);
    const damageToEnemy = Math.round(rawDamage);

    let feedback = '';
    if (isCritical) {
      feedback = `Bạo kích xuất thế! Trả lời thần tốc trong ${responseTimeSec.toFixed(1)}s, gây ${damageToEnemy} sát thương!`;
    } else if (isWeak) {
      feedback = `Kiếm thế chậm trễ (${responseTimeSec.toFixed(1)}s), gây ${damageToEnemy} sát thương.`;
    } else {
      feedback = `Trúng đích chuẩn xác! Gây ${damageToEnemy} sát thương.`;
    }

    if (modifiers?.hintUsed) {
      feedback += ' (Đã dùng gợi ý: -40% uy lực)';
    }

    if (modifiers?.damageMultiplier && modifiers.damageMultiplier > 1) {
      feedback += ' [Bộc Phát Kiếm Ý!]';
    }

    if (nextCombo >= 3) {
      feedback += ` (Combo x${nextCombo}!)`;
    }

    return {
      isCorrect: true,
      isCritical,
      isWeak,
      damageToEnemy,
      damageToPlayer: 0,
      comboCount: nextCombo,
      feedbackText: feedback,
    };
  }

  // Xử lý cộng XP và thăng cấp (Level up)
  static addXp(currentStats: PlayerStats, equipment: EquipmentState, gainedXp: number): { stats: PlayerStats; didLevelUp: boolean } {
    const stats = { ...currentStats };
    stats.xp += gainedXp;
    let didLevelUp = false;

    while (stats.xp >= stats.xpToNextLevel && stats.level < 30) {
      stats.xp -= stats.xpToNextLevel;
      stats.level += 1;
      stats.xpToNextLevel = Math.round(stats.xpToNextLevel * 1.35);
      stats.maxHp += 20;
      stats.hp = stats.maxHp; // hồi đầy HP khi thăng cấp
      stats.attack += 5;
      stats.defense += 3;
      didLevelUp = true;
    }

    const equipBonus = this.getEquipmentBonus(equipment);
    stats.congLuc = calculateCongLuc(stats, equipBonus);

    return { stats, didLevelUp };
  }
}
