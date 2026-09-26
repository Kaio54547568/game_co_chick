import { describe, it, expect } from 'vitest';
import { UnitContentService } from '../src/services/unitContentService';
import { CombatEngine } from '../src/services/combatEngine';
import { createDefaultProfile, StorageService } from '../src/services/storage';

describe('UnitContentService & 30 Playable Units', () => {
  it('should list all 30 units across Grade 10, Grade 11, and Grade 12', () => {
    const allUnits = UnitContentService.getAllUnits();
    expect(allUnits.length).toBe(30);

    const g10 = UnitContentService.getAllUnits(10);
    expect(g10.length).toBe(10);
    expect(g10.map((u) => u.unitNumber)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

    const g11 = UnitContentService.getAllUnits(11);
    expect(g11.length).toBe(10);
    expect(g11.map((u) => u.unitNumber)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

    const g12 = UnitContentService.getAllUnits(12);
    expect(g12.length).toBe(10);
    expect(g12.map((u) => u.unitNumber)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  });

  it('should provide rich knowledge items for every unit without failure', () => {
    const allUnits = UnitContentService.getAllUnits();
    for (const unit of allUnits) {
      const items = UnitContentService.getUnitKnowledgeItems(unit.unitId);
      expect(items.length).toBeGreaterThan(0);
      const vocab = items.filter((i) => i.type === 'vocabulary');
      const grammar = items.filter((i) => i.type === 'grammar');
      expect(vocab.length).toBeGreaterThan(0);
      expect(grammar.length).toBeGreaterThan(0);
    }
  });

  it('should provide questions covering all 6 combat modes for every unit', () => {
    const testUnits = ['g10-u01', 'g10-u05', 'g10-u10', 'g11-u01', 'g11-u06', 'g11-u10'];

    for (const unitId of testUnits) {
      const questions = UnitContentService.getUnitCombatQuestions(unitId);
      expect(questions.length).toBeGreaterThan(5);

      // Mode 1: unseal
      const unseal = questions.find((q) => q.combatMode === 'unseal');
      expect(unseal).toBeDefined();
      expect(unseal?.wordsToOrder).toBeDefined();
      expect(unseal?.wordsToOrder!.length).toBeGreaterThan(2);

      // Mode 2: lost_word
      const lostWord = questions.find((q) => q.combatMode === 'lost_word');
      expect(lostWord).toBeDefined();
      expect(lostWord?.hintText).toBeDefined();

      // Mode 3: listening_pursuit
      const listening = questions.find((q) => q.combatMode === 'listening_pursuit');
      expect(listening).toBeDefined();
      expect(listening?.listeningScript).toBeDefined();
      expect(listening?.transcriptFallback).toBeDefined();
      expect(listening?.maxReplays).toBe(3);

      // Mode 4: deception_pierce
      const deception = questions.find((q) => q.combatMode === 'deception_pierce');
      expect(deception).toBeDefined();
      expect(deception?.readingPassage).toBeDefined();
      expect(deception?.passageSentences).toBeDefined();
      expect(deception?.evidenceSentenceIndex).toBeGreaterThan(0);
      expect(deception?.trapExplanation).toBeDefined();

      // Mode 5: escort_dialogue
      const escort = questions.find((q) => q.combatMode === 'escort_dialogue');
      expect(escort).toBeDefined();
      expect(escort?.dialogueChoices).toBeDefined();
      expect(escort?.dialogueChoices!.length).toBeGreaterThanOrEqual(3);

      // Mode 6: triple_combo
      const combo = questions.find((q) => q.combatMode === 'triple_combo');
      expect(combo).toBeDefined();
      expect(combo?.comboSteps).toBeDefined();
      expect(combo?.comboSteps!.length).toBe(3);
      expect(combo?.comboSteps![0].stepType).toBe('listen');
      expect(combo?.comboSteps![1].stepType).toBe('comprehend');
      expect(combo?.comboSteps![2].stepType).toBe('unseal');
    }
  });

  it('should provide enemies tailored per unit with proper boss configuration', () => {
    // Non-boss unit: Climax Guardian
    const u1 = UnitContentService.getUnitEnemies('g10-u01');
    expect(u1.boss.name).toContain('Thủ Trận Tinh Anh');
    expect(u1.boss.isBoss).toBe(false);
    expect(u1.allMobs.length).toBe(6);

    // Boss unit: Real Boss
    const u3 = UnitContentService.getUnitEnemies('g10-u03');
    expect(u3.boss.name).toBe('Mê Âm Yêu Cơ');
    expect(u3.boss.isBoss).toBe(true);

    const g11u6 = UnitContentService.getUnitEnemies('g11-u06');
    expect(g11u6.boss.name).toBe('Thiên Diện Huyễn Sư');
    expect(g11u6.boss.isBoss).toBe(true);
    expect(g11u6.allMobs.length).toBe(7);

    const g12u10 = UnitContentService.getUnitEnemies('g12-u10');
    expect(g12u10.boss.name).toBe('Vô Ngôn Ma Tôn');
    expect(g12u10.boss.isBoss).toBe(true);
    expect(g12u10.allMobs.length).toBe(7);
  });
});
