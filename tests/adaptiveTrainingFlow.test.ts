import { describe, it, expect, beforeEach } from 'vitest';
import { ProgressionEngine } from '../src/services/progressionEngine';
import { MasteryEngine } from '../src/services/masteryEngine';
import { StorageService, createDefaultProfile } from '../src/services/storage';
import { ALL_COMBAT_QUESTIONS } from '../src/data/demoLearningData';
import { PlayerProfile } from '../src/types/game';

describe('Adaptive Training Flow Integration: Học -> Đánh Sai -> Luyện Công -> Trả Lời Đúng -> Mastery Tăng -> Reload', () => {
  let profile: PlayerProfile;
  let localDb: Record<string, string>;

  beforeEach(() => {
    localDb = {};
    globalThis.localStorage = {
      getItem: (k: string) => localDb[k] ?? null,
      setItem: (k: string, v: string) => {
        localDb[k] = String(v);
      },
      removeItem: (k: string) => {
        delete localDb[k];
      },
      clear: () => {
        localDb = {};
      },
      key: () => null,
      length: 0,
    } as any;

    profile = createDefaultProfile('Hiệp Nữ Ánh Nguyệt', 'female');
  });

  it('thực hiện trọn vẹn chu trình ôn luyện thích ứng theo điểm yếu và bảo lưu dữ liệu', () => {
    // ------------------------------------------------------------------------
    // BƯỚC 1: Người chơi học từ vựng "household chores" (vocab_1) tại Tàng Kinh Các
    // ------------------------------------------------------------------------
    const learnRes = ProgressionEngine.learnVocab(profile, 'vocab_1');
    profile = learnRes.profile;

    expect(profile.learnedVocabIds).toContain('vocab_1');
    // Khi chỉ mở xem thẻ, Mastery khởi tạo bằng 0
    expect(profile.knowledgeMastery['vocab_1'].mastery).toBe(0);

    // ------------------------------------------------------------------------
    // BƯỚC 2: Người chơi gặp quái / thử thách và trả lời SAI từ vựng này
    // ------------------------------------------------------------------------
    profile = ProgressionEngine.recordKnowledgeAnswer(
      profile,
      ['vocab_1'],
      false, // Trả lời sai
      8.0
    );

    const afterWrong = profile.knowledgeMastery['vocab_1'];
    expect(afterWrong.lastAnsweredCorrectly).toBe(false);
    expect(afterWrong.timesIncorrect).toBe(1);
    expect(afterWrong.mastery).toBe(0); // Không thể giảm dưới 0
    expect(MasteryEngine.getMasteryTier(afterWrong.mastery)).toBe('needs_review');

    // ------------------------------------------------------------------------
    // BƯỚC 3: Người chơi đến Cọc Gỗ Trúc Lâm tham gia hoạt động "Luyện Công"
    // Thuật toán thích ứng tự động ưu tiên câu hỏi chứa điểm yếu vừa sai (vocab_1)
    // ------------------------------------------------------------------------
    const adaptiveQuestions = MasteryEngine.selectAdaptiveQuestions(
      ALL_COMBAT_QUESTIONS,
      profile.knowledgeMastery,
      5
    );

    expect(adaptiveQuestions).toHaveLength(5);
    // Điểm yếu 'vocab_1' phải được đưa vào danh sách ôn luyện
    const targetsWeakness = adaptiveQuestions.some((q) => q.knowledgeItemIds.includes('vocab_1'));
    expect(targetsWeakness).toBe(true);

    // ------------------------------------------------------------------------
    // BƯỚC 4: Người chơi trả lời ĐÚNG trong buổi Luyện Công
    // ------------------------------------------------------------------------
    // Lần 1: Trả lời đúng trong 2.5s (Critical) -> +25 điểm
    profile = ProgressionEngine.recordKnowledgeAnswer(
      profile,
      ['vocab_1'],
      true,
      2.5
    );

    let currentVocab1 = profile.knowledgeMastery['vocab_1'];
    expect(currentVocab1.mastery).toBe(25);
    expect(currentVocab1.lastAnsweredCorrectly).toBe(true);
    expect(currentVocab1.timesCorrect).toBe(1);

    // Lần 2: Trả lời đúng tiếp trong 3.5s (Normal + Streak) -> +15 + 5 = +20 điểm
    profile = ProgressionEngine.recordKnowledgeAnswer(
      profile,
      ['vocab_1'],
      true,
      3.5
    );

    currentVocab1 = profile.knowledgeMastery['vocab_1'];
    expect(currentVocab1.mastery).toBe(45); // 25 + 20 = 45
    expect(currentVocab1.timesCorrect).toBe(2);

    // Lần 3: Trả lời đúng bạo kích lần nữa (2.0s + Streak) -> +25 + 5 = +30 điểm
    profile = ProgressionEngine.recordKnowledgeAnswer(
      profile,
      ['vocab_1'],
      true,
      2.0
    );

    currentVocab1 = profile.knowledgeMastery['vocab_1'];
    expect(currentVocab1.mastery).toBe(75); // 45 + 30 = 75
    expect(MasteryEngine.getMasteryTier(currentVocab1.mastery)).toBe('developing');

    // Lần 4: Trả lời đúng bạo kích lần thứ 4 -> +25 + 5 = +30 -> 100 điểm (Mastered!)
    profile = ProgressionEngine.recordKnowledgeAnswer(
      profile,
      ['vocab_1'],
      true,
      1.8
    );

    currentVocab1 = profile.knowledgeMastery['vocab_1'];
    expect(currentVocab1.mastery).toBe(100);
    expect(MasteryEngine.getMasteryTier(currentVocab1.mastery)).toBe('mastered');

    // ------------------------------------------------------------------------
    // BƯỚC 5: Hoàn thành buổi Luyện Công, nhận Tu Vi (XP)
    // ------------------------------------------------------------------------
    const initialXp = profile.stats.xp;
    const trainingResult = ProgressionEngine.completeTrainingSession(profile, 25);
    profile = trainingResult.profile;

    expect(profile.stats.xp).toBe(initialXp + 25);
    expect(trainingResult.xpGained).toBe(25);

    // ------------------------------------------------------------------------
    // BƯỚC 6: Lưu vào LocalStorage và nạp lại (Reload persistence)
    // ------------------------------------------------------------------------
    StorageService.saveProfile(profile);

    const reloaded = StorageService.loadProfile();
    expect(reloaded).not.toBeNull();
    expect(reloaded!.name).toBe('Hiệp Nữ Ánh Nguyệt');
    expect(reloaded!.stats.xp).toBe(initialXp + 25);

    // Kiểm tra dữ liệu Mastery được bảo toàn nguyên vẹn sau khi nạp lại
    const reloadedVocab1 = reloaded!.knowledgeMastery['vocab_1'];
    expect(reloadedVocab1).toBeDefined();
    expect(reloadedVocab1.mastery).toBe(100);
    expect(reloadedVocab1.timesCorrect).toBe(4);
    expect(reloadedVocab1.timesIncorrect).toBe(1);
    expect(reloadedVocab1.lastAnsweredCorrectly).toBe(true);
    expect(reloadedVocab1.lastReviewedAt).toBeGreaterThan(0);
    expect(MasteryEngine.getMasteryTier(reloadedVocab1.mastery)).toBe('mastered');
  });
});
