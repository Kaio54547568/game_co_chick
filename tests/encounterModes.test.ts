import { describe, it, expect, beforeEach } from 'vitest';
import { ALL_LEVEL_CONFIGS, getLevelConfig } from '../src/game/levels/levelConfig';
import { UnitContentService } from '../src/services/unitContentService';
import { CombatEngine } from '../src/services/combatEngine';
import { ProgressionEngine } from '../src/services/progressionEngine';
import { StorageService, createDefaultProfile } from '../src/services/storage';
import { CombatEnemy, CombatMode } from '../src/types/game';

describe('Encounter Archetypes & Combat Modes Integration Tests', () => {
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

  it('1. Cấu hình 30 Unit đầy đủ 6-7 loại địch với 6 Combat Mode, kỹ năng học và hướng dẫn', () => {
    const allUnitIds = Object.keys(ALL_LEVEL_CONFIGS);
    expect(allUnitIds.length).toBe(30);

    const requiredModes: CombatMode[] = [
      'lost_word',
      'listening_pursuit',
      'unseal',
      'deception_pierce',
      'escort_dialogue',
      'triple_combo',
    ];

    allUnitIds.forEach((unitId) => {
      const cfg = ALL_LEVEL_CONFIGS[unitId];
      expect(cfg.enemies.length).toBeGreaterThanOrEqual(6);

      // Thu thập các mode xuất hiện trong unit
      const modesInUnit = new Set<CombatMode>();
      cfg.enemies.forEach((enemy, idx) => {
        expect(enemy.combatMode).toBeDefined();
        modesInUnit.add(enemy.combatMode!);
        expect(enemy.learningSkill).toBeTruthy();
        expect(enemy.difficulty).toMatch(/^(easy|medium|hard)$/);
        expect(enemy.winCondition).toBeTruthy();
        expect(enemy.tutorialBriefing).toBeTruthy();
        expect(enemy.requiredQuestionsCount).toBeGreaterThanOrEqual(1);

        // Địch thường (idx 0..4) chỉ cần 1 câu chuẩn xác để diệt, không kéo dài mệt mỏi
        if (idx < 5) {
          expect(enemy.requiredQuestionsCount).toBe(1);
        }
      });

      // Kiểm tra Climax enemy
      expect(cfg.climax).toBeDefined();
      expect(cfg.climax.enemy.combatMode).toBe('triple_combo');
      expect(cfg.climax.enemy.learningSkill).toBeTruthy();
      expect(cfg.climax.enemy.winCondition).toBeTruthy();
      expect(cfg.climax.enemy.tutorialBriefing).toBeTruthy();

      // Mỗi Unit phải bao phủ đầy đủ 6 combat modes
      requiredModes.forEach((mode) => {
        expect(modesInUnit.has(mode)).toBe(true);
      });
    });
  });

  it('2. Dữ liệu thật từ 30 Unit được map chính xác vào 6 Combat Mode', () => {
    const sampleUnits = ['g10-u01', 'g10-u03', 'g11-u01', 'g11-u06', 'g12-u01', 'g12-u10'];

    sampleUnits.forEach((unitId) => {
      const questions = UnitContentService.getUnitCombatQuestions(unitId);
      expect(questions.length).toBeGreaterThanOrEqual(6);

      // Mode 1: unseal (Phá Phong Ấn)
      const unsealQ = questions.find((q) => q.combatMode === 'unseal');
      expect(unsealQ).toBeDefined();
      expect(unsealQ?.wordsToOrder).toBeDefined();
      expect(unsealQ?.wordsToOrder!.length).toBeGreaterThanOrEqual(3);
      expect(unsealQ?.correctAnswer).toBeTruthy();

      // Mode 2: lost_word (Đoạt Lại Vong Từ)
      const lostWordQ = questions.find((q) => q.combatMode === 'lost_word');
      expect(lostWordQ).toBeDefined();
      expect(lostWordQ?.hintText).toBeTruthy();
      expect(lostWordQ?.correctAnswer).toBeTruthy();
      expect(lostWordQ?.options.length).toBeGreaterThanOrEqual(2);

      // Mode 3: listening_pursuit (Mê Âm Truy Kích)
      const listenQ = questions.find((q) => q.combatMode === 'listening_pursuit');
      expect(listenQ).toBeDefined();
      expect(listenQ?.listeningScript).toBeTruthy();
      expect(listenQ?.maxReplays).toBe(3);

      // Mode 4: deception_pierce (Thiên Diện Phá Ảo)
      const deceptionQ = questions.find((q) => q.combatMode === 'deception_pierce');
      expect(deceptionQ).toBeDefined();
      expect(deceptionQ?.readingPassage).toBeTruthy();
      expect(deceptionQ?.evidenceSentenceIndex).toBeDefined();
      expect(deceptionQ?.trapExplanation).toBeTruthy();

      // Mode 5: escort_dialogue (Hộ Tống Hội Thoại)
      const escortQ = questions.find((q) => q.combatMode === 'escort_dialogue');
      expect(escortQ).toBeDefined();
      expect(escortQ?.dialogueChoices).toBeDefined();
      expect(escortQ?.dialogueChoices!.length).toBeGreaterThanOrEqual(3);
      const effects = escortQ!.dialogueChoices!.map((c) => c.buffEffect);
      expect(effects).toContain('shield');
      expect(effects).toContain('weaken');
      expect(effects).toContain('atk_boost');

      // Mode 6: triple_combo (Liên Hoàn Tam Chiêu)
      const comboQ = questions.find((q) => q.combatMode === 'triple_combo');
      expect(comboQ).toBeDefined();
      expect(comboQ?.comboSteps?.length).toBe(3);
      expect(comboQ?.weaknessAnalysis).toBeTruthy();
    });
  });

  it('3. Phân bổ Boss: Chỉ Unit 3, 6, 10 mỗi lớp có Boss thật; các Unit khác có cơ chế kết thúc hợp lệ', () => {
    const allUnitIds = Object.keys(ALL_LEVEL_CONFIGS);

    allUnitIds.forEach((unitId) => {
      const cfg = ALL_LEVEL_CONFIGS[unitId];
      const match = unitId.match(/g(\d+)-u(\d+)/);
      if (!match) return;
      const unitNum = parseInt(match[2], 10);
      const isBossUnit = [3, 6, 10].includes(unitNum);

      expect(cfg.climax.hasRealBoss).toBe(isBossUnit);
      expect(cfg.climax.enemy.isBoss).toBe(isBossUnit);
    });

    // Kiểm tra cơ chế kết thúc của non-boss unit (ví dụ g10-u01)
    let profile = createDefaultProfile('Hiệp Khách Lớp 10', 'male');
    const u1Cfg = ALL_LEVEL_CONFIGS['g10-u01'];
    expect(u1Cfg.climax.hasRealBoss).toBe(false);

    // Mở đến Quest 5
    profile.quests[0].status = 'completed';
    profile.quests[1].status = 'completed';
    profile.quests[2].status = 'completed';
    profile.quests[3].status = 'completed';
    profile.quests[4].status = 'available';

    const climaxMob: CombatEnemy = {
      id: u1Cfg.climax.enemy.id,
      name: u1Cfg.climax.enemy.name,
      title: u1Cfg.climax.enemy.title,
      spriteKey: u1Cfg.climax.enemy.spriteKey,
      hp: u1Cfg.climax.enemy.hp,
      maxHp: u1Cfg.climax.enemy.maxHp,
      attack: u1Cfg.climax.enemy.attack,
      defense: u1Cfg.climax.enemy.defense,
      xpReward: u1Cfg.climax.enemy.xpReward,
      isBoss: false,
    };

    const res = ProgressionEngine.processCombatVictory(
      profile,
      climaxMob,
      false, // non-boss doesn't need phase 2
      100,
      'climax_g10_u01'
    );

    expect(res.didCompleteBoss).toBe(true);
    expect(res.profile.bossDefeated).toBe(true);
    expect(res.profile.unitProgress).toBe(100);
    expect(res.profile.quests[4].status).toBe('completed');
    expect(res.profile.inventory.some((i) => i.id === 'loot_chest')).toBe(true);
  });

  it('4. Kiểm thử đánh thử từng loại địch ở Grade 10 (g10-u01)', () => {
    let profile = createDefaultProfile('Hiệp Nữ Lớp 10', 'female');
    const cfg = ALL_LEVEL_CONFIGS['g10-u01'];
    const questions = UnitContentService.getUnitCombatQuestions('g10-u01');

    // 4.1 Địch 0: lost_word (Trinh Sát Ma)
    const e0 = cfg.enemies[0];
    expect(e0.combatMode).toBe('lost_word');
    const qLost = questions.find((q) => q.combatMode === 'lost_word')!;
    const turn0 = CombatEngine.processTurn(
      true,
      2.5,
      0,
      profile.stats,
      profile.equipment,
      { ...e0, id: e0.enemyId, name: e0.name, title: e0.title, spriteKey: e0.spritePath, isBoss: false }
    );
    expect(turn0.isCorrect).toBe(true);
    expect(turn0.damageToEnemy).toBeGreaterThanOrEqual(20);

    // 4.2 Địch 1: listening_pursuit (Âm Ba Tầm Ma)
    const e1 = cfg.enemies[1];
    expect(e1.combatMode).toBe('listening_pursuit');
    const qListen = questions.find((q) => q.combatMode === 'listening_pursuit')!;
    expect(qListen.listeningScript).toBeTruthy();
    const turn1 = CombatEngine.processTurn(
      true,
      1.8,
      1,
      profile.stats,
      profile.equipment,
      { ...e1, id: e1.enemyId, name: e1.name, title: e1.title, spriteKey: e1.spritePath, isBoss: false }
    );
    expect(turn1.isCorrect).toBe(true);

    // 4.3 Địch 2: unseal (Phong Ma Hộ Vệ)
    const e2 = cfg.enemies[2];
    expect(e2.combatMode).toBe('unseal');
    const qUnseal = questions.find((q) => q.combatMode === 'unseal')!;
    const assembledCorrect = qUnseal.wordsToOrder!.join(' ').replace(/[.,!?]/g, '').toLowerCase();
    const targetClean = qUnseal.correctAnswer.replace(/[.,!?]/g, '').toLowerCase();
    expect(assembledCorrect).toBe(targetClean);

    // 4.4 Địch 3: deception_pierce (Ảo Giác Khôi Lỗi)
    const e3 = cfg.enemies[3];
    expect(e3.combatMode).toBe('deception_pierce');
    const qDecept = questions.find((q) => q.combatMode === 'deception_pierce')!;
    expect(qDecept.evidenceSentenceIndex).toBeDefined();

    // 4.5 Địch 4: escort_dialogue (Du Hồn Thiểm Ảnh)
    const e4 = cfg.enemies[4];
    expect(e4.combatMode).toBe('escort_dialogue');
    const qEscort = questions.find((q) => q.combatMode === 'escort_dialogue')!;
    const shieldChoice = qEscort.dialogueChoices!.find((c) => c.buffEffect === 'shield')!;
    expect(shieldChoice).toBeDefined();

    // 4.6 Địch 5: triple_combo (Kiếm Hồn Tinh Anh)
    const e5 = cfg.enemies[5];
    expect(e5.combatMode).toBe('triple_combo');
    const qCombo = questions.find((q) => q.combatMode === 'triple_combo')!;
    expect(qCombo.comboSteps?.length).toBe(3);
  });

  it('5. Kiểm thử đánh thử từng loại địch và Boss ở Grade 11 (g11-u06)', () => {
    let profile = createDefaultProfile('Hiệp Khách Lớp 11', 'male');
    const cfg = ALL_LEVEL_CONFIGS['g11-u06'];
    const questions = UnitContentService.getUnitCombatQuestions('g11-u06');

    expect(cfg.climax.hasRealBoss).toBe(true);
    expect(cfg.climax.enemy.isBoss).toBe(true);

    // Đánh thử từng archetype địch
    cfg.enemies.forEach((enemy) => {
      const q = questions.find((item) => item.combatMode === enemy.combatMode);
      expect(q).toBeDefined();

      const turn = CombatEngine.processTurn(
        true,
        2.0,
        0,
        profile.stats,
        profile.equipment,
        { ...enemy, id: enemy.enemyId, name: enemy.name, title: enemy.title, spriteKey: enemy.spritePath, isBoss: false }
      );
      expect(turn.isCorrect).toBe(true);
      expect(turn.damageToEnemy).toBeGreaterThan(0);
    });

    // Thử thách Boss: Phase 1 & Phase 2
    const bossEnemy: CombatEnemy = {
      id: cfg.climax.enemy.id,
      name: cfg.climax.enemy.name,
      title: cfg.climax.enemy.title,
      spriteKey: cfg.climax.enemy.spriteKey,
      hp: cfg.climax.enemy.hp,
      maxHp: cfg.climax.enemy.maxHp,
      attack: cfg.climax.enemy.attack,
      defense: cfg.climax.enemy.defense,
      xpReward: cfg.climax.enemy.xpReward,
      isBoss: true,
    };

    // Phase 1 hạ nhưng chưa thắng hoàn toàn (chưa hạ Phase 2)
    profile.quests[4].status = 'available';
    const resP1 = ProgressionEngine.processCombatVictory(profile, bossEnemy, false, 80, 'climax_g11_u06');
    expect(resP1.didCompleteBoss).toBe(false);

    // Phase 2 hạ -> thắng toàn diện
    const resP2 = ProgressionEngine.processCombatVictory(profile, bossEnemy, true, 70, 'climax_g11_u06');
    expect(resP2.didCompleteBoss).toBe(true);
    expect(resP2.profile.bossDefeated).toBe(true);
    expect(resP2.profile.unitProgress).toBe(100);
    expect(resP2.profile.inventory.some((i) => i.id === 'loot_chest')).toBe(true);
  });

  it('6. Kiểm thử đánh thử từng loại địch và Boss chung cuộc Grade 12 (g12-u10)', () => {
    let profile = createDefaultProfile('Đại Hiệp Lớp 12', 'male');
    const cfg = ALL_LEVEL_CONFIGS['g12-u10'];
    const questions = UnitContentService.getUnitCombatQuestions('g12-u10');

    expect(cfg.climax.hasRealBoss).toBe(true);
    expect(cfg.climax.enemy.isBoss).toBe(true);

    // Kiểm tra tất cả các mode của g12-u10
    cfg.enemies.forEach((enemy) => {
      const q = questions.find((item) => item.combatMode === enemy.combatMode);
      expect(q).toBeDefined();
    });

    const bossEnemy: CombatEnemy = {
      id: cfg.climax.enemy.id,
      name: cfg.climax.enemy.name,
      title: cfg.climax.enemy.title,
      spriteKey: cfg.climax.enemy.spriteKey,
      hp: cfg.climax.enemy.hp,
      maxHp: cfg.climax.enemy.maxHp,
      attack: cfg.climax.enemy.attack,
      defense: cfg.climax.enemy.defense,
      xpReward: cfg.climax.enemy.xpReward,
      isBoss: true,
    };

    profile.quests[4].status = 'available';
    const finalRes = ProgressionEngine.processCombatVictory(profile, bossEnemy, true, 50, 'climax_g12_u10');
    expect(finalRes.didCompleteBoss).toBe(true);
    expect(finalRes.profile.bossDefeated).toBe(true);
    expect(finalRes.profile.unitProgress).toBe(100);
  });

  it('7. Cơ chế giải thích lỗi khi trả lời sai, luyện lại và chống cày thưởng vô hạn (anti-farming)', () => {
    let profile = createDefaultProfile('Hiệp Sĩ Kiểm Thử', 'female');
    const enemy: CombatEnemy = {
      id: 'test_scout',
      name: 'Thực Nghiệm Ma',
      title: 'Quái thử nghiệm',
      spriteKey: 'test_scout',
      hp: 100,
      maxHp: 100,
      attack: 20,
      defense: 5,
      xpReward: 50,
      isBoss: false,
    };

    // 7.1 Trả lời sai: nhận sát thương, combo bị reset
    const wrongTurn = CombatEngine.processTurn(
      false,
      3.0,
      5, // combo đang là 5
      profile.stats,
      profile.equipment,
      enemy
    );
    expect(wrongTurn.isCorrect).toBe(false);
    expect(wrongTurn.damageToEnemy).toBe(0);
    expect(wrongTurn.damageToPlayer).toBeGreaterThan(0);
    expect(wrongTurn.comboCount).toBe(0);

    // 7.2 Lần đầu thắng: nhận thưởng đầy đủ
    const vic1 = ProgressionEngine.processCombatVictory(profile, enemy, false, 80, 'test_scout_encounter_1');
    expect(vic1.wasAlreadyDefeated).toBeFalsy();
    expect(vic1.totalXpGained).toBe(50);
    expect(vic1.profile.defeatedEnemyIds).toContain('test_scout_encounter_1');
    expect(vic1.profile.defeatedEnemyIds).toContain('test_scout');

    // 7.3 Thắng lại kẻ địch đó (Anti-farming): không được thưởng XP lặp, không lên cấp
    const vic2 = ProgressionEngine.processCombatVictory(vic1.profile, enemy, false, 80, 'test_scout_encounter_1');
    expect(vic2.wasAlreadyDefeated).toBe(true);
    expect(vic2.totalXpGained).toBe(0);
    expect(vic2.didLevelUp).toBe(false);

    // Thắng lại bằng cùng enemy.id nhưng encounterId khác
    const vic3 = ProgressionEngine.processCombatVictory(vic1.profile, enemy, false, 80, 'test_scout_encounter_2');
    expect(vic3.wasAlreadyDefeated).toBe(true);
    expect(vic3.totalXpGained).toBe(0);
  });

  it('8. Lưu và Tải trạng thái profile sau chuỗi trận đánh trên nhiều Unit', () => {
    let profile = createDefaultProfile('Đại Hiệp Lưu Trữ', 'male');

    // Hạ 3 quái thường trong g10-u01
    const enemies = ALL_LEVEL_CONFIGS['g10-u01'].enemies.slice(0, 3);
    enemies.forEach((e, idx) => {
      const mob: CombatEnemy = {
        id: e.enemyId,
        name: e.name,
        title: e.title,
        spriteKey: e.spritePath,
        hp: e.hp,
        maxHp: e.maxHp,
        attack: e.attack,
        defense: e.defense,
        xpReward: e.xpReward,
        isBoss: false,
      };
      profile = ProgressionEngine.processCombatVictory(profile, mob, false, 90, `g10_u01_mob_${idx}`).profile;
    });

    // Lưu trữ
    StorageService.saveProfile(profile);

    // Đọc lại từ storage
    const loaded = StorageService.loadProfile();
    expect(loaded).not.toBeNull();
    expect(loaded?.name).toBe('Đại Hiệp Lưu Trữ');
    expect(loaded?.defeatedEnemyIds.length).toBeGreaterThanOrEqual(3);
    expect(loaded?.stats.xp).toBe(profile.stats.xp);
    expect(loaded?.inventory.length).toBe(profile.inventory.length);
  });
});
