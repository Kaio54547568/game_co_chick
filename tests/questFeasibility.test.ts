import { describe, it, expect } from 'vitest';
import { ALL_LEVEL_CONFIGS } from '../src/game/levels/levelConfig';
import { createUnitQuests } from '../src/data/questsData';
import { createDefaultProfile } from '../src/services/storage';
import { UnitContentService } from '../src/services/unitContentService';
import { ProgressionEngine } from '../src/services/progressionEngine';
import { GuardianService, GUARDIAN_METAS, GuardianId } from '../src/services/guardianService';
import { STUDENT_QUESTS, StudentMentorService } from '../src/services/studentMentorService';

describe('Quest feasibility with the actual content of all 30 units', () => {
  for (const [unitId, level] of Object.entries(ALL_LEVEL_CONFIGS)) {
    it(`${unitId}: the main route opens the final gate and every side exercise is solvable`, () => {
      let profile = createDefaultProfile('Thiếu Hiệp', 'male');
      profile.selectedUnitId = unitId;
      profile.quests = createUnitQuests(unitId, level.unitNumber, level.title);
      profile = ProgressionEngine.advanceQuest(profile, profile.quests[0].id).profile;
      const words = UnitContentService.getUnitKnowledgeItems(unitId).filter(item => item.type === 'vocabulary');
      expect(new Set(words.map(word => word.id)).size).toBeGreaterThanOrEqual(6);
      for (const word of words.slice(0, 6)) profile = ProgressionEngine.learnVocab(profile, word.id).profile;
      expect(profile.quests[1].status).toBe('completed');
      const questions = UnitContentService.getUnitChallengeQuestions(unitId);
      expect(questions.length).toBeGreaterThanOrEqual(3);
      for (const question of questions) expect(question.options).toContain(question.correctAnswer);
      profile = ProgressionEngine.completeChallenge(profile).profile;
      const enemies = level.enemies.filter((enemy, index, all) => all.findIndex(other => other.enemyId === enemy.enemyId) === index).slice(0, 2);
      expect(enemies).toHaveLength(2);
      for (const enemy of enemies) {
        profile = ProgressionEngine.processCombatVictory(profile, { ...enemy, id: enemy.enemyId, spriteKey: enemy.spritePath }, false, profile.stats.maxHp, enemy.encounterId).profile;
      }
      expect(profile.quests[3].status).toBe('completed');
      expect(profile.unitProgress).toBeGreaterThanOrEqual(70);
      profile = ProgressionEngine.processCombatVictory(profile, level.climax.enemy, true, profile.stats.maxHp, level.climax.encounterId).profile;
      expect(profile.bossDefeated).toBe(true);
      expect(profile.quests.every(quest => quest.status === 'completed')).toBe(true);

      for (const guardianId of Object.keys(GUARDIAN_METAS) as GuardianId[]) {
        const exercise = GuardianService.getGuardianQuestData(guardianId, unitId).exercise;
        if (exercise.wordsToOrder) expect(exercise.wordsToOrder.join(' ')).toBe(exercise.correctAnswer);
        else expect(exercise.options).toContain(exercise.correctAnswer);
        if (exercise.evidenceIndex) expect(exercise.passageSentences?.[exercise.evidenceIndex - 1]).toBeTruthy();
        profile = GuardianService.acceptQuest(profile, unitId, guardianId);
        profile = GuardianService.solveExercise(profile, unitId, guardianId);
        const reward = GuardianService.claimReward(profile, unitId, guardianId);
        expect(reward.isFirstTime).toBe(true);
        profile = reward.profile;
        expect(GuardianService.claimReward(profile, unitId, guardianId).isFirstTime).toBe(false);
      }
    });
  }

  it('does not grant guardian rewards before accepting and solving the exercise', () => {
    let profile = createDefaultProfile('Thiếu Hiệp', 'female');
    const npc = 'ho_phap_phuong_tu';
    expect(GuardianService.claimReward(profile, 'g10-u01', npc).progressGain).toBe(0);
    profile = GuardianService.acceptQuest(profile, 'g10-u01', npc);
    expect(GuardianService.claimReward(profile, 'g10-u01', npc).xpGained).toBe(0);
    expect(GuardianService.solveExercise(profile, 'g10-u02', npc).guardianQuestStates?.['g10-u02']?.[npc]).not.toBe('completed');
  });

  it('all three student quests have exactly one correct choice and can be completed and rewarded once', () => {
    let profile = createDefaultProfile('Thiếu Hiệp', 'male');
    for (const quest of STUDENT_QUESTS) {
      expect(quest.challenge.options.filter(option => option.isCorrect)).toHaveLength(1);
      profile = StudentMentorService.solveQuest(profile, quest.id);
      const result = StudentMentorService.claimReward(profile, quest.id);
      expect(result.reward).not.toBeNull();
      profile = result.profile;
      expect(StudentMentorService.claimReward(profile, quest.id).reward).toBeNull();
    }
  });
});
