import { describe, it, expect, beforeEach } from 'vitest';
import {
  StudentMentorService,
  BACH_KHOA_THU_SINH_ID,
  SENIOR_MENTOR_META,
  EXAM_HACKS,
  STUDENT_QUESTS,
} from '../src/services/studentMentorService';
import { GuardianService, GUARDIAN_METAS } from '../src/services/guardianService';
import { ALL_LEVEL_CONFIGS } from '../src/game/levels/levelConfig';
import { createDefaultProfile, StorageService } from '../src/services/storage';
import { PlayerProfile } from '../src/types/game';

describe('Senior Mentor (Bách Khoa Thư Sinh) Test Suite', () => {
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
  describe('Metadata & Personality Quotes', () => {
    it('should have exact NPC id and role definitions', () => {
      expect(BACH_KHOA_THU_SINH_ID).toBe('bach_khoa_thu_sinh');
      expect(SENIOR_MENTOR_META.name).toBe('Bách Khoa thư Sinh Đinh Ngọc Khánh');
      expect(SENIOR_MENTOR_META.title).toBe('Đại Sư Huynh Tông Môn');
      expect(SENIOR_MENTOR_META.portrait).toBe('/assets/game/characters/npc/portraits/bach_khoa_thu_sinh_v2.png');
      expect(SENIOR_MENTOR_META.sprite).toBe('/assets/game/characters/npc/bach_khoa_thu_sinh_v2.png');
    });

    it('should contain all 3 required quotes verbatim', () => {
      const q1 = '“Đại học không nhàn như giang hồ đồn đâu các đệ... Nhưng qua được ải THPT này, thiên hạ sẽ mở rộng trước mắt!”';
      const q2 = '“Xưa ta cũng từng bị Loạn Ngữ Kiếm Ma \'bón hành\' thì Hiện tại Hoàn thành, nay đỗ đạt trở về truyền lại bí kíp cho sư đệ/sư muội.”';
      const q3 = '“Thức đêm cày đồ án với fix bug võ công mệt hơn luyện Cửu Âm Chân Kinh!”';

      expect(SENIOR_MENTOR_META.catchphrases.universityReality).toBe(q1);
      expect(SENIOR_MENTOR_META.catchphrases.grammarBattle).toBe(q2);
      expect(SENIOR_MENTOR_META.catchphrases.nightOwlCoding).toBe(q3);

      // Verify quotes appear in exam hacks / advice
      const allText = JSON.stringify(EXAM_HACKS) + JSON.stringify(SENIOR_MENTOR_META);
      expect(allText).toContain('Đại học không nhàn như giang hồ đồn đâu các đệ');
      expect(allText).toContain('bón hành');
      expect(allText).toContain('Cửu Âm Chân Kinh');
    });
  });

  describe('Guardian Independence & Non-interference', () => {
    it('Bách Khoa Thư Sinh must NOT be registered as a Guardian', () => {
      expect(GuardianService.isGuardianId('bach_khoa_thu_sinh')).toBe(false);
      expect(Object.keys(GUARDIAN_METAS)).not.toContain('bach_khoa_thu_sinh');
      expect(StudentMentorService.isStudentMentor('bach_khoa_thu_sinh')).toBe(true);
      expect(StudentMentorService.isStudentMentor('bang_chu')).toBe(false);
      expect(StudentMentorService.isStudentMentor('ho_phap_phuong_tu')).toBe(false);
    });

    it('NPC is positioned safely at (740, 480) across all 30 units', () => {
      const keys = Object.keys(ALL_LEVEL_CONFIGS);
      expect(keys.length).toBe(30);

      for (const [unitId, cfg] of Object.entries(ALL_LEVEL_CONFIGS)) {
        const npc = cfg.npcs.find((n) => n.id === 'bach_khoa_thu_sinh');
        expect(npc).toBeDefined();
        expect(npc?.x).toBe(740);
        expect(npc?.y).toBe(480);
        expect(npc?.name).toBe('Bách Khoa thư Sinh Đinh Ngọc Khánh');
      }
    });
  });

  describe('Bí Kíp Săn Điểm (Exam Hacks) Dataset', () => {
    it('should provide comprehensive exam hacks across 4 high-yield categories', () => {
      expect(EXAM_HACKS.length).toBeGreaterThanOrEqual(4);

      const categories = new Set(EXAM_HACKS.map((h) => h.category));
      expect(categories.has('grammar_traps')).toBe(true);
      expect(categories.has('collocations')).toBe(true);
      expect(categories.has('confusing_words')).toBe(true);
      expect(categories.has('reading_cloze')).toBe(true);

      for (const hack of EXAM_HACKS) {
        expect(hack.title.length).toBeGreaterThan(0);
        expect(hack.trapWarning.length).toBeGreaterThan(0);
        expect(hack.mentorTip.length).toBeGreaterThan(0);
        expect(hack.curriculumExample.sentence.length).toBeGreaterThan(0);
        expect(hack.curriculumExample.correctRule.length).toBeGreaterThan(0);
        expect(hack.keyTakeaway.length).toBeGreaterThan(0);
      }
    });
  });

  describe('Kỳ Ngộ Giới Sinh Viên (Side Quests)', () => {
    it('should have 3 fully playable quests with 4 options and 1 correct answer', () => {
      expect(STUDENT_QUESTS.length).toBe(3);

      for (const q of STUDENT_QUESTS) {
        expect(q.id).toBeDefined();
        expect(q.title).toBeDefined();
        expect(q.badge).toBeDefined();
        expect(q.storyPrompt.length).toBeGreaterThan(10);
        expect(q.mentorGuidance.length).toBeGreaterThan(10);

        expect(q.challenge.options.length).toBe(4);
        const correctOptions = q.challenge.options.filter((o) => o.isCorrect);
        expect(correctOptions.length).toBe(1);

        for (const opt of q.challenge.options) {
          expect(opt.text.length).toBeGreaterThan(0);
          expect(opt.feedback.length).toBeGreaterThan(0);
        }

        expect(q.reward.xp).toBeGreaterThan(0);
        expect(q.reward.congLuc).toBeGreaterThan(0);
        expect(q.reward.itemTitle.length).toBeGreaterThan(0);
      }
    });

    it('should manage complete quest lifecycle with non-repeatable rewards', () => {
      let profile: PlayerProfile = createDefaultProfile('Hero');
      const questId = STUDENT_QUESTS[0].id;
      const initialXp = profile.stats.xp;
      const initialCongLuc = profile.stats.congLuc;
      const initialInventoryCount = profile.inventory.length;

      // 1. Initial State
      expect(StudentMentorService.getQuestStatus(profile, questId)).toBe('not_started');

      // 2. Accept Quest
      profile = StudentMentorService.acceptQuest(profile, questId);
      expect(StudentMentorService.getQuestStatus(profile, questId)).toBe('in_progress');

      // 3. Solve Challenge Correctly
      profile = StudentMentorService.solveQuest(profile, questId);
      expect(StudentMentorService.getQuestStatus(profile, questId)).toBe('completed');

      // 4. Claim Reward
      const claimResult = StudentMentorService.claimReward(profile, questId);
      profile = claimResult.profile;

      expect(StudentMentorService.getQuestStatus(profile, questId)).toBe('rewarded');
      expect(claimResult.reward).not.toBeNull();
      expect(profile.stats.xp).toBe(initialXp + STUDENT_QUESTS[0].reward.xp);
      expect(profile.stats.congLuc).toBeGreaterThan(initialCongLuc);
      expect(profile.inventory.length).toBe(initialInventoryCount + 1);
      expect(profile.inventory.some((i) => i.name === STUDENT_QUESTS[0].reward.itemTitle)).toBe(true);

      // 5. Try to Claim Reward Again (Duplicate Reward Prevention)
      const duplicateClaim = StudentMentorService.claimReward(profile, questId);
      expect(duplicateClaim.reward).toBeNull();
      expect(duplicateClaim.profile.stats.xp).toBe(profile.stats.xp);
      expect(duplicateClaim.profile.stats.congLuc).toBe(profile.stats.congLuc);
      expect(duplicateClaim.profile.inventory.length).toBe(profile.inventory.length);
    });

    it('should persist studentQuestStates across localStorage save and load', () => {
      let profile = createDefaultProfile('Tester');
      profile = StudentMentorService.acceptQuest(profile, 'quest_softskills');
      profile = StudentMentorService.solveQuest(profile, 'quest_softskills');
      const res = StudentMentorService.claimReward(profile, 'quest_softskills');
      profile = res.profile;

      StorageService.saveProfile(profile);
      const loaded = StorageService.loadProfile();

      expect(loaded).not.toBeNull();
      expect(loaded?.studentQuestStates).toBeDefined();
      expect(loaded?.studentQuestStates?.['quest_softskills']).toBe('rewarded');
    });
  });
});
