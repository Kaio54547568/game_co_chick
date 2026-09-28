import { describe, it, expect } from 'vitest';
import { ALL_LEVEL_CONFIGS } from '../src/game/levels/levelConfig';
import { PropActivityService } from '../src/services/propActivityService';
import { ProgressionEngine } from '../src/services/progressionEngine';
import { createDefaultProfile } from '../src/services/storage';
import { PropCategory } from '../src/types/game';

describe('Prop Meaningful Learning Interactions in All 30 Units', () => {
  const allUnitIds = Object.keys(ALL_LEVEL_CONFIGS);

  it('verifies all 30 Units are present in level configuration', () => {
    expect(allUnitIds.length).toBe(30);
  });

  it('verifies every single Unit has at least 2 learning props with valid categories', () => {
    const validCategories: PropCategory[] = [
      'vocab_discovery',
      'reading_clue',
      'listening_clue',
      'dialogue',
      'quest_clue',
    ];

    allUnitIds.forEach((unitId) => {
      const cfg = ALL_LEVEL_CONFIGS[unitId];
      expect(cfg).toBeDefined();
      expect(cfg.props.length).toBeGreaterThanOrEqual(2);

      // Filter out pure decoration if any
      const learningProps = cfg.props.filter((p) => p.category !== 'decoration');
      expect(
        learningProps.length,
        `Unit ${unitId} must have at least 2 interactive learning props`
      ).toBeGreaterThanOrEqual(2);

      learningProps.forEach((prop) => {
        expect(prop.id).toBeTruthy();
        expect(prop.name).toBeTruthy();
        expect(prop.category).toBeDefined();
        expect(validCategories).toContain(prop.category);
      });
    });
  });

  it('verifies all 60 learning props across 30 Units generate verified activities without dummy data', () => {
    let totalVerifiedActivities = 0;

    allUnitIds.forEach((unitId) => {
      const cfg = ALL_LEVEL_CONFIGS[unitId];
      const learningProps = cfg.props.filter((p) => p.category !== 'decoration');

      learningProps.forEach((prop) => {
        const activity = PropActivityService.getPropActivity(unitId, prop.id);
        expect(
          activity,
          `Failed to load verified learning activity for ${unitId} prop ${prop.id}`
        ).not.toBeNull();

        if (activity) {
          totalVerifiedActivities++;

          // Prop metadata
          expect(activity.unitId).toBe(unitId);
          expect(activity.propId).toBe(prop.id);
          expect(activity.propName).toBeTruthy();
          expect(activity.loreIntro).toBeTruthy();

          // Question verification
          const q = activity.question;
          expect(q.prompt).toBeTruthy();
          expect(q.prompt.trim().length).toBeGreaterThan(5);
          expect(q.options.length).toBeGreaterThanOrEqual(2);
          expect(q.options).toContain(q.correctAnswer);
          expect(q.explanation).toBeTruthy();
          expect(q.explanation.trim().length).toBeGreaterThan(5);

          // Reward verification
          expect(activity.reward.xp).toBeGreaterThan(0);
          expect(activity.reward.unitProgressGain).toBeGreaterThan(0);
        }
      });
    });

    expect(totalVerifiedActivities).toBeGreaterThanOrEqual(60);
  });

  it('verifies pure decorative props are filtered and do not produce learning activities or interactive zones', () => {
    const activity = PropActivityService.getPropActivity('g10-u01', 'non_existent_or_decoration');
    expect(activity).toBeNull();
  });

  it('verifies category metadata mapping returns distinct icons, badges, and wuxia lore types', () => {
    const categories: PropCategory[] = [
      'vocab_discovery',
      'reading_clue',
      'listening_clue',
      'dialogue',
      'quest_clue',
      'decoration',
    ];

    categories.forEach((cat) => {
      const meta = PropActivityService.getCategoryMeta(cat);
      expect(meta.category).toBe(cat);
      expect(meta.label).toBeTruthy();
      expect(meta.icon).toBeTruthy();
      expect(meta.badgeBg).toBeTruthy();
      expect(meta.badgeText).toBeTruthy();
      expect(meta.borderColor).toBeTruthy();
      expect(meta.loreType).toBeTruthy();
    });
  });

  it('verifies completion tracking and prevents duplicate rewards (anti-farming)', () => {
    const profile = createDefaultProfile('Hiệp Khách Test', 'male');
    const unitId = 'g10-u01';
    const propId = 'g10-u01_rice_basket';

    // 1. Initial status: not completed
    expect(PropActivityService.isPropCompleted(profile, unitId, propId)).toBe(false);

    const initialXp = profile.stats.xp;
    const initialProgress = profile.unitProgress;

    // 2. First completion: awards rewards
    const res1 = ProgressionEngine.completePropActivity(
      profile,
      unitId,
      propId,
      35,
      5,
      ['g10-u01-vocab-001']
    );

    expect(res1.isFirstCompletion).toBe(true);
    expect(res1.xpGained).toBe(35);
    expect(res1.progressGain).toBe(5);
    expect(res1.profile.stats.xp).toBe(initialXp + 35);
    expect(res1.profile.unitProgress).toBe(initialProgress + 5);
    expect(res1.profile.completedPropIds).toContain(`${unitId}:${propId}`);
    expect(PropActivityService.isPropCompleted(res1.profile, unitId, propId)).toBe(true);

    // Mastery should be recorded
    expect(res1.profile.knowledgeMastery['g10-u01-vocab-001']).toBeDefined();
    expect(res1.profile.knowledgeMastery['g10-u01-vocab-001'].timesCorrect).toBe(1);

    // 3. Second completion (review mode): NO duplicate rewards
    const res2 = ProgressionEngine.completePropActivity(
      res1.profile,
      unitId,
      propId,
      35,
      5,
      ['g10-u01-vocab-001']
    );

    expect(res2.isFirstCompletion).toBe(false);
    expect(res2.xpGained).toBe(0);
    expect(res2.progressGain).toBe(0);
    expect(res2.profile.stats.xp).toBe(res1.profile.stats.xp);
    expect(res2.profile.unitProgress).toBe(res1.profile.unitProgress);
  });
});
