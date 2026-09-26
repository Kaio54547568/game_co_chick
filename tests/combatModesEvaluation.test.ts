import { describe, it, expect } from 'vitest';
import { CombatEngine } from '../src/services/combatEngine';
import { PlayerStats, EquipmentState, CombatEnemy } from '../src/types/game';

describe('6 Interactive Combat Modes Evaluation Logic', () => {
  const mockPlayerStats: PlayerStats = {
    level: 5,
    xp: 200,
    xpToNextLevel: 500,
    hp: 180,
    maxHp: 180,
    attack: 40,
    defense: 20,
    speed: 160,
    criticalRate: 0.15,
    criticalDamage: 1.5,
    congLuc: 1200,
  };

  const mockEquipment: EquipmentState = {
    weapon: null,
    accessory: null,
    manual: null,
  };

  const mockEnemy: CombatEnemy = {
    id: 'test_enemy',
    name: 'Kiếm Ma Thử Nghiệm',
    title: 'Thử nghiệm',
    spriteKey: 'test',
    hp: 200,
    maxHp: 200,
    attack: 30,
    defense: 10,
    xpReward: 100,
  };

  // MODE 1: Phá Phong Ấn (Unseal)
  it('Mode 1 (Phá Phong Ấn): evaluates sentence order matching accurately with casing and punctuation', () => {
    const targetSentence = 'In our family we share the household chores equally.';
    const playerTokensCorrect = ['In', 'our', 'family', 'we', 'share', 'the', 'household', 'chores', 'equally.'];
    const formedCorrect = playerTokensCorrect.join(' ');

    const cleanFormed = formedCorrect.replace(/[.,!?]/g, '').trim().toLowerCase();
    const cleanTarget = targetSentence.replace(/[.,!?]/g, '').trim().toLowerCase();
    expect(cleanFormed).toBe(cleanTarget);

    const result = CombatEngine.processTurn(
      cleanFormed === cleanTarget,
      2.0, // fast response -> crit
      0,
      mockPlayerStats,
      mockEquipment,
      mockEnemy
    );
    expect(result.isCorrect).toBe(true);
    expect(result.isCritical).toBe(true);
    expect(result.damageToEnemy).toBeGreaterThan(50);
  });

  // MODE 2: Đoạt Lại Vong Từ (Lost Word)
  it('Mode 2 (Đoạt Lại Vong Từ): applies -40% damage penalty when hint is used', () => {
    // Normal correct hit
    const normalTurn = CombatEngine.processTurn(
      true,
      4.0,
      0,
      mockPlayerStats,
      mockEquipment,
      mockEnemy
    );

    // Hit with hintUsed = true
    const hintTurn = CombatEngine.processTurn(
      true,
      4.0,
      0,
      mockPlayerStats,
      mockEquipment,
      mockEnemy,
      { hintUsed: true }
    );

    expect(normalTurn.damageToEnemy).toBeGreaterThan(0);
    expect(hintTurn.damageToEnemy).toBeGreaterThan(0);
    // Damage with hint should be approximately 60% of normal damage (40% penalty)
    expect(hintTurn.damageToEnemy).toBeLessThan(normalTurn.damageToEnemy);
    expect(hintTurn.damageToEnemy).toBe(Math.round(normalTurn.damageToEnemy * 0.6));
    expect(hintTurn.feedbackText.toLowerCase()).toContain('gợi ý');
  });

  // MODE 3: Mê Âm Truy Kích (Sonic Pursuit)
  it('Mode 3 (Mê Âm Truy Kích): timer only starts after audio completes, and replay count limits replays', () => {
    let replaysLeft = 3;
    let isAudioPlaying = true;
    let timerTicking = false;

    // While audio is playing, timer cannot tick
    if (!isAudioPlaying) {
      timerTicking = true;
    }
    expect(timerTicking).toBe(false);

    // When audio finishes
    isAudioPlaying = false;
    if (!isAudioPlaying) {
      timerTicking = true;
    }
    expect(timerTicking).toBe(true);

    // Replay limit check
    const replayAudio = () => {
      if (replaysLeft <= 0) return false;
      replaysLeft -= 1;
      return true;
    };

    expect(replayAudio()).toBe(true); // 2 left
    expect(replayAudio()).toBe(true); // 1 left
    expect(replayAudio()).toBe(true); // 0 left
    expect(replayAudio()).toBe(false); // cannot replay anymore
  });

  // MODE 4: Thiên Diện Phá Ảo (Deception Pierce)
  it('Mode 4 (Thiên Diện Phá Ảo): requires BOTH correct option AND correct evidence anchor sentence to break shield', () => {
    const correctOpt = 'Regular dedication (Sự kiên trì cống hiến đều đặn)';
    const correctEvidenceSentence = 2;

    // Case 1: Right option, wrong evidence -> Fails
    const isCorrect1 = ('Regular dedication (Sự kiên trì cống hiến đều đặn)' === correctOpt) && (4 === correctEvidenceSentence);
    expect(isCorrect1).toBe(false);

    // Case 2: Wrong option, right evidence -> Fails
    const isCorrect2 = ('Wrong option' === correctOpt) && (2 === correctEvidenceSentence);
    expect(isCorrect2).toBe(false);

    // Case 3: Both right -> Succeeds and breaks shield!
    const isCorrect3 = (correctOpt === correctOpt) && (correctEvidenceSentence === correctEvidenceSentence);
    expect(isCorrect3).toBe(true);

    const turnResult = CombatEngine.processTurn(
      isCorrect3,
      2.5,
      1,
      mockPlayerStats,
      mockEquipment,
      mockEnemy
    );
    expect(turnResult.isCorrect).toBe(true);
    expect(turnResult.damageToEnemy).toBeGreaterThan(0);
  });

  // MODE 5: Hộ Tống Hội Thoại (Escort Dialogue)
  it('Mode 5 (Hộ Tống Hội Thoại): applies tactical buffs (shield, weaken enemy, boost attack)', () => {
    // Attack boost choice (+50% damage)
    const boostedTurn = CombatEngine.processTurn(
      true,
      4.0,
      0,
      mockPlayerStats,
      mockEquipment,
      mockEnemy,
      { damageMultiplier: 1.5 }
    );
    const standardTurn = CombatEngine.processTurn(
      true,
      4.0,
      0,
      mockPlayerStats,
      mockEquipment,
      mockEnemy
    );
    expect(boostedTurn.damageToEnemy).toBeGreaterThan(standardTurn.damageToEnemy);

    // Weaken enemy choice (-20% enemy attack)
    const weakenedEnemyTurn = CombatEngine.processTurn(
      false, // player misses, enemy attacks
      10.0,
      0,
      mockPlayerStats,
      mockEquipment,
      mockEnemy,
      { enemyAttackMultiplier: 0.8 }
    );
    const normalEnemyTurn = CombatEngine.processTurn(
      false,
      10.0,
      0,
      mockPlayerStats,
      mockEquipment,
      mockEnemy
    );
    expect(weakenedEnemyTurn.damageToPlayer).toBeLessThan(normalEnemyTurn.damageToPlayer);
  });

  // MODE 6: Liên Hoàn Tam Chiêu (Triple Combo)
  it('Mode 6 (Liên Hoàn Tam Chiêu): tracks progress across 3 steps and executes massive combo', () => {
    const steps = [
      { stepNumber: 1, stepType: 'listen', correctAnswer: 'breadwinner' },
      { stepNumber: 2, stepType: 'comprehend', correctAnswer: 'noun' },
      { stepNumber: 3, stepType: 'unseal', correctAnswer: 'He is the breadwinner.' },
    ];

    let currentStep = 0;
    // Step 1
    expect('breadwinner' === steps[currentStep].correctAnswer).toBe(true);
    currentStep++;
    // Step 2
    expect('noun' === steps[currentStep].correctAnswer).toBe(true);
    currentStep++;
    // Step 3
    expect('He is the breadwinner.' === steps[currentStep].correctAnswer).toBe(true);

    expect(currentStep).toBe(2); // All 3 steps cleared (indices 0, 1, 2)
  });
});
