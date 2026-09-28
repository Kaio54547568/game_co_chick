import { describe, it, expect, beforeEach } from 'vitest';
import {
  GuardianService,
  GUARDIAN_METAS,
  GuardianId,
} from '../src/services/guardianService';
import { StorageService, createDefaultProfile } from '../src/services/storage';
import { ALL_LEVEL_CONFIGS } from '../src/game/levels/levelConfig';
import { getUnitDataset } from '../content/global-success';
import fs from 'fs';
import path from 'path';

describe('Four Guardians (Hộ Pháp) System & Tutorials Integration Tests', () => {
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

  it('1. Bốn Hộ Pháp có đúng vai trò theo GDD, chân dung tồn tại và màu nhận diện chuẩn', () => {
    const guardianIds: GuardianId[] = [
      'ho_phap_dang_tran_ha',
      'ho_phap_hoang_van',
      'ho_phap_phuong_tu',
      'ho_phap_nguyet_nguyen',
    ];

    guardianIds.forEach((id) => {
      expect(GuardianService.isGuardianId(id)).toBe(true);
      const meta = GuardianService.getGuardianMeta(id);
      expect(meta).not.toBeNull();
      expect(meta?.name).toBeTruthy();
      expect(meta?.title).toBeTruthy();
      expect(meta?.domain).toBeTruthy();
      expect(meta?.quote).toBeTruthy();
      expect(meta?.skillName).toBeTruthy();
      expect(meta?.portrait).toMatch(/^\/assets\/game\/characters\/npc\/portraits\/.+\.png$/);

      // Kiểm tra file portrait thực sự tồn tại trên ổ đĩa
      const relPath = meta!.portrait.replace(/^\//, '');
      const diskPath = path.resolve(process.cwd(), 'public', relPath);
      expect(fs.existsSync(diskPath)).toBe(true);
    });

    // Kiểm tra vai trò cụ thể theo GDD:
    // Thầy Đặng Trần Hà: Ngữ pháp / Logic / Thử thách
    const ha = GUARDIAN_METAS.ho_phap_dang_tran_ha;
    expect(ha.title).toContain('Ngữ Pháp');
    expect(ha.elementColor).toBe('#3b82f6'); // Xanh navy

    // Cô Hoàng Vân: Nghe / Nhịp điệu / Năng lượng
    const van = GUARDIAN_METAS.ho_phap_hoang_van;
    expect(van.title).toContain('Nghe');
    expect(van.elementColor).toBe('#f59e0b'); // Vàng / cam

    // Cô Phương Tú: Từ vựng / Phát triển
    const tu = GUARDIAN_METAS.ho_phap_phuong_tu;
    expect(tu.title).toContain('Từ Vựng');
    expect(tu.elementColor).toBe('#10b981'); // Xanh lá

    // Cô Nguyệt Nguyên: Đọc hiểu / Trí tuệ
    const nguyen = GUARDIAN_METAS.ho_phap_nguyet_nguyen;
    expect(nguyen.title).toContain('Đọc Hiểu');
    expect(nguyen.elementColor).toBe('#06b6d4'); // Bạc / xanh nhạt
  });

  it('2. Lời thoại và bài tập không trùng lặp nguyên văn qua 30 Unit, tích hợp dữ liệu thật của từng Unit', () => {
    const allUnitIds = Object.keys(ALL_LEVEL_CONFIGS);
    expect(allUnitIds.length).toBe(30);

    const guardianIds: GuardianId[] = [
      'ho_phap_phuong_tu',
      'ho_phap_dang_tran_ha',
      'ho_phap_hoang_van',
      'ho_phap_nguyet_nguyen',
    ];

    guardianIds.forEach((guardianId) => {
      const generatedIntroTexts = new Set<string>();
      const generatedObjectives = new Set<string>();

      allUnitIds.forEach((unitId) => {
        const quest = GuardianService.getGuardianQuestData(guardianId, unitId);
        expect(quest).toBeDefined();
        expect(quest.title).toBeTruthy();
        expect(quest.objective).toBeTruthy();
        expect(quest.nextLocation).toBeTruthy();
        expect(quest.tutorialGuidance).toBeTruthy();

        // Kiểm tra hội thoại 4 trạng thái
        expect(quest.dialogueByStatus.not_started.length).toBeGreaterThanOrEqual(2);
        expect(quest.dialogueByStatus.in_progress.length).toBeGreaterThanOrEqual(1);
        expect(quest.dialogueByStatus.completed.length).toBeGreaterThanOrEqual(1);
        expect(quest.dialogueByStatus.rewarded.length).toBeGreaterThanOrEqual(1);

        // Bài tập có dữ liệu thật
        expect(quest.exercise).toBeDefined();
        expect(quest.exercise.prompt).toBeTruthy();
        expect(quest.exercise.correctAnswer).toBeTruthy();
        expect(quest.exercise.explanation).toBeTruthy();

        const notStartedText = quest.dialogueByStatus.not_started.join(' ');
        generatedIntroTexts.add(notStartedText);
        generatedObjectives.add(quest.objective);

        // Xác nhận có chứa dữ liệu thật của unit đó (ví dụ title hoặc vocabulary)
        const dataset = getUnitDataset(unitId);
        if (dataset) {
          expect(
            notStartedText.includes(dataset.metadata.title) ||
            quest.title.includes(dataset.metadata.title)
          ).toBe(true);
        }
      });

      // Đảm bảo không trùng lặp nguyên văn qua 30 Unit
      expect(generatedIntroTexts.size).toBe(30);
      expect(generatedObjectives.size).toBe(30);
    });
  });

  it('3. Toàn bộ vòng đời nhiệm vụ: Chưa nhận -> Đang làm -> Hoàn thành -> Nhận thưởng -> Ôn luyện lại', () => {
    let profile = createDefaultProfile('Hiệp Nữ Kiểm Thử', 'female');
    const unitId = 'g10-u01';
    const guardianId: GuardianId = 'ho_phap_phuong_tu';

    // 3.1 Ban đầu: not_started
    expect(GuardianService.getGuardianStatus(profile, unitId, guardianId)).toBe('not_started');

    // 3.2 Tiếp nhận nhiệm vụ -> in_progress
    profile = GuardianService.acceptQuest(profile, unitId, guardianId);
    expect(GuardianService.getGuardianStatus(profile, unitId, guardianId)).toBe('in_progress');

    // 3.3 Làm bài tập đúng -> completed
    const questData = GuardianService.getGuardianQuestData(guardianId, unitId);
    expect(questData.exercise.correctAnswer).toBeTruthy();
    profile = GuardianService.solveExercise(profile, unitId, guardianId);
    expect(GuardianService.getGuardianStatus(profile, unitId, guardianId)).toBe('completed');

    // 3.4 Báo công và nhận thưởng lần đầu -> rewarded
    const initialXp = profile.stats.xp;
    const initialProgress = profile.unitProgress;
    const claimResult = GuardianService.claimReward(profile, unitId, guardianId);

    expect(claimResult.isFirstTime).toBe(true);
    expect(claimResult.xpGained).toBeGreaterThan(0);
    expect(claimResult.progressGain).toBeGreaterThan(0);
    expect(claimResult.profile.stats.xp).toBe(initialXp + claimResult.xpGained);
    expect(claimResult.profile.unitProgress).toBe(initialProgress + claimResult.progressGain);
    expect(GuardianService.getGuardianStatus(claimResult.profile, unitId, guardianId)).toBe('rewarded');

    profile = claimResult.profile;

    // 3.5 Nhận thưởng lần 2 (Anti-farming): không nhận thêm XP
    const claimAgain = GuardianService.claimReward(profile, unitId, guardianId);
    expect(claimAgain.isFirstTime).toBe(false);
    expect(claimAgain.xpGained).toBe(0);
    expect(claimAgain.progressGain).toBe(0);

    // 3.6 Lối vào ôn luyện lại: trong trạng thái rewarded vẫn truy cập được bài tập và dữ liệu ôn tập
    const reviewData = GuardianService.getGuardianQuestData(guardianId, unitId);
    expect(reviewData.exercise.options.length).toBeGreaterThanOrEqual(2);
    expect(reviewData.dialogueByStatus.rewarded[1]).toContain('luyện tập');
  });

  it('4. Lưu và Tải trạng thái nhiệm vụ từng Hộ Pháp qua StorageService tương thích ngược', () => {
    let profile = createDefaultProfile('Đại Hiệp Giang Hồ', 'male');

    // Hoàn thành nhiệm vụ của 2 Hộ Pháp trong g10-u01
    profile = GuardianService.acceptQuest(profile, 'g10-u01', 'ho_phap_dang_tran_ha');
    profile = GuardianService.solveExercise(profile, 'g10-u01', 'ho_phap_dang_tran_ha');
    profile = GuardianService.claimReward(profile, 'g10-u01', 'ho_phap_dang_tran_ha').profile;

    profile = GuardianService.acceptQuest(profile, 'g10-u01', 'ho_phap_hoang_van');
    // ho_phap_hoang_van đang dừng ở in_progress

    // Lưu vào LocalStorage
    StorageService.saveProfile(profile);

    // Tải lại từ LocalStorage
    const loaded = StorageService.loadProfile();
    expect(loaded).not.toBeNull();
    expect(GuardianService.getGuardianStatus(loaded!, 'g10-u01', 'ho_phap_dang_tran_ha')).toBe('rewarded');
    expect(GuardianService.getGuardianStatus(loaded!, 'g10-u01', 'ho_phap_hoang_van')).toBe('in_progress');
    expect(GuardianService.getGuardianStatus(loaded!, 'g10-u01', 'ho_phap_nguyet_nguyen')).toBe('not_started');

    // Kiểm tra tương thích save cũ (không có guardianQuestStates)
    const oldSaveData = {
      id: 'old_player',
      name: 'Hiệp Khách Cũ',
      gender: 'male',
      stats: profile.stats,
      inventory: [],
      equipment: profile.equipment,
      unitProgress: 20,
      quests: profile.quests,
      currentQuestIndex: 0,
      defeatedMobs: 0,
      defeatedEnemyIds: [],
      bossDefeated: false,
      learnedVocabIds: [],
      lastSavedAt: Date.now(),
      // Không có guardianQuestStates
    };
    memoryStore['phuong_chick_wulin_save_v1'] = JSON.stringify(oldSaveData);

    const reloadedOld = StorageService.loadProfile();
    expect(reloadedOld).not.toBeNull();
    expect(reloadedOld?.guardianQuestStates).toBeDefined();
    expect(GuardianService.getGuardianStatus(reloadedOld!, 'g10-u01', 'ho_phap_phuong_tu')).toBe('not_started');
  });

  it('5. Thử nghiệm bài tập chuyên biệt của cả 4 Hộ Pháp (Từ vựng, Ngữ pháp, Nghe audio TTS, Đọc hiểu)', () => {
    const unitId = 'g11-u06';

    // 5.1 Cô Phương Tú: Từ vựng
    const qTu = GuardianService.getGuardianQuestData('ho_phap_phuong_tu', unitId);
    expect(qTu.exercise.type).toBe('vocab');
    expect(qTu.exercise.options).toContain(qTu.exercise.correctAnswer);

    // 5.2 Thầy Đặng Trần Hà: Ngữ pháp trật tự câu
    const qHa = GuardianService.getGuardianQuestData('ho_phap_dang_tran_ha', unitId);
    expect(qHa.exercise.type).toBe('grammar');
    expect(qHa.exercise.wordsToOrder).toBeDefined();
    expect(qHa.exercise.wordsToOrder!.length).toBeGreaterThanOrEqual(3);

    // 5.3 Cô Hoàng Vân: Nghe và audio script
    const qVan = GuardianService.getGuardianQuestData('ho_phap_hoang_van', unitId);
    expect(qVan.exercise.type).toBe('listening');
    expect(qVan.exercise.audioScript).toBeTruthy();

    // 5.4 Cô Nguyệt Nguyên: Đọc hiểu và dẫn chứng [1]-[4]
    const qNguyen = GuardianService.getGuardianQuestData('ho_phap_nguyet_nguyen', unitId);
    expect(qNguyen.exercise.type).toBe('reading');
    expect(qNguyen.exercise.readingPassage).toBeTruthy();
    expect(qNguyen.exercise.evidenceIndex).toBeGreaterThanOrEqual(1);
    expect(qNguyen.exercise.passageSentences?.length).toBe(4);
  });
});
