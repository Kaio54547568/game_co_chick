import { describe, it, expect, beforeEach } from 'vitest';
import { MasteryEngine } from '../src/services/masteryEngine';
import { ProgressionEngine } from '../src/services/progressionEngine';
import { StorageService, createDefaultProfile } from '../src/services/storage';
import { CombatQuestion, KnowledgeMasteryState, PlayerProfile } from '../src/types/game';
import { ALL_COMBAT_QUESTIONS } from '../src/data/demoLearningData';

describe('Knowledge Mastery & Adaptive Engine Tests', () => {
  let profile: PlayerProfile;

  beforeEach(() => {
    profile = createDefaultProfile('Hiệp Khách Rèn Luyện', 'male');
  });

  it('cộng điểm Mastery chính xác theo thời gian phản xạ (Bạo Kích 0-3s, Chuẩn 3-7s, Chậm >7s, Streak)', () => {
    // 1. Trả lời đúng bạo kích (<= 3s) -> +25 điểm
    let state = MasteryEngine.calculateMasteryUpdate(undefined, true, 2.0);
    expect(state.mastery).toBe(25);
    expect(state.timesCorrect).toBe(1);
    expect(state.timesEncountered).toBe(1);
    expect(state.lastAnsweredCorrectly).toBe(true);

    // 2. Trả lời đúng lần 2 liên tiếp (streak bonus +5) với đòn chuẩn (4.0s -> +15 + 5 = +20)
    state = MasteryEngine.calculateMasteryUpdate(state, true, 4.0);
    expect(state.mastery).toBe(45); // 25 + 20 = 45
    expect(state.timesCorrect).toBe(2);

    // 3. Trả lời đúng chậm (>7s -> +10 + 5 streak = +15)
    state = MasteryEngine.calculateMasteryUpdate(state, true, 8.5);
    expect(state.mastery).toBe(60); // 45 + 15 = 60

    // 4. Kẹp tối đa ở mức 100
    state.mastery = 95;
    state = MasteryEngine.calculateMasteryUpdate(state, true, 2.0);
    expect(state.mastery).toBe(100);
  });

  it('trả lời sai trừ mạnh 35 điểm và rớt xuống nhóm cần ôn luyện (< 50)', () => {
    // Giả sử mục kiến thức đang có 60 điểm (nhóm developing)
    let state: KnowledgeMasteryState = {
      knowledgeItemId: 'vocab_1',
      mastery: 60,
      timesEncountered: 3,
      timesCorrect: 3,
      timesIncorrect: 0,
      lastAnsweredCorrectly: true,
      lastResponseTimeSec: 2.5,
      lastReviewedAt: Date.now() - 10000,
      history: [],
    };

    // Người chơi trả lời sai
    state = MasteryEngine.calculateMasteryUpdate(state, false, 5.0);

    expect(state.mastery).toBe(25); // 60 - 35 = 25 (< 50)
    expect(state.lastAnsweredCorrectly).toBe(false);
    expect(state.timesIncorrect).toBe(1);
    expect(MasteryEngine.getMasteryTier(state.mastery)).toBe('needs_review');

    // Nếu trả lời sai tiếp, không giảm dưới 0
    state = MasteryEngine.calculateMasteryUpdate(state, false, 12.0);
    expect(state.mastery).toBe(0);
  });

  it('mở xem thẻ từ tại Tàng Kinh Các KHÔNG được tự động tăng điểm Mastery', () => {
    // Ban đầu chưa có dữ liệu mastery
    expect(profile.knowledgeMastery['vocab_1']).toBeUndefined();

    // Mở xem/học thẻ từ vựng
    const learnRes = ProgressionEngine.learnVocab(profile, 'vocab_1');
    profile = learnRes.profile;

    // Đã được ghi nhận vào learnedVocabIds để mở khóa Quest 2
    expect(profile.learnedVocabIds).toContain('vocab_1');

    // Nhưng điểm Mastery khởi tạo PHẢI là 0, không được tăng khi chỉ mở xem thẻ
    expect(profile.knowledgeMastery['vocab_1']).toBeDefined();
    expect(profile.knowledgeMastery['vocab_1'].mastery).toBe(0);
    expect(profile.knowledgeMastery['vocab_1'].timesCorrect).toBe(0);
  });

  it('phân tầng Mastery chuẩn xác theo ngưỡng GDD (<50, 50-79, 80-89, >=90 Mastered)', () => {
    expect(MasteryEngine.getMasteryTier(0)).toBe('needs_review');
    expect(MasteryEngine.getMasteryTier(49)).toBe('needs_review');
    expect(MasteryEngine.getMasteryTier(50)).toBe('developing');
    expect(MasteryEngine.getMasteryTier(79)).toBe('developing');
    expect(MasteryEngine.getMasteryTier(80)).toBe('proficient');
    expect(MasteryEngine.getMasteryTier(89)).toBe('proficient');
    expect(MasteryEngine.getMasteryTier(90)).toBe('mastered');
    expect(MasteryEngine.getMasteryTier(100)).toBe('mastered');
  });

  it('thuật toán chọn câu hỏi thích ứng ưu tiên điểm yếu (<50) và hạn chế lặp câu liên tiếp', () => {
    const masteryMap: Record<string, KnowledgeMasteryState> = {
      vocab_1: {
        knowledgeItemId: 'vocab_1',
        mastery: 20, // Điểm yếu (<50)
        timesEncountered: 2,
        timesCorrect: 0,
        timesIncorrect: 2,
        lastAnsweredCorrectly: false,
        lastResponseTimeSec: 6.0,
        lastReviewedAt: Date.now(),
        history: [],
      },
      vocab_5: {
        knowledgeItemId: 'vocab_5',
        mastery: 95, // Đã Mastered (>=90)
        timesEncountered: 5,
        timesCorrect: 5,
        timesIncorrect: 0,
        lastAnsweredCorrectly: true,
        lastResponseTimeSec: 2.0,
        lastReviewedAt: Date.now(),
        history: [],
      },
    };

    // Chọn 5 câu hỏi thích ứng, loại trừ câu 'sd_1' vừa gặp ở lượt trước
    const selected = MasteryEngine.selectAdaptiveQuestions(ALL_COMBAT_QUESTIONS, masteryMap, 5, [
      'sd_1',
    ]);

    expect(selected).toHaveLength(5);
    // Câu 'sd_1' vừa gặp không được lặp lại
    expect(selected.some((q) => q.id === 'sd_1')).toBe(false);

    // Có ít nhất 1 câu hỏi nhắm vào điểm yếu 'vocab_1'
    const targetsWeakness = selected.some((q) => q.knowledgeItemIds.includes('vocab_1'));
    expect(targetsWeakness).toBe(true);
  });

  it('đảo ngẫu nhiên các phương án lựa chọn trong câu hỏi trắc nghiệm', () => {
    const originalQuestion: CombatQuestion = {
      id: 'test_q',
      knowledgeItemIds: ['vocab_1'],
      type: 'multiple_choice',
      prompt: 'Test prompt?',
      options: ['Đáp án A', 'Đáp án B', 'Đáp án C', 'Đáp án D'],
      correctAnswer: 'Đáp án A',
      explanation: 'Giải thích',
      timeLimit: 10,
      difficulty: 'easy',
    };

    const shuffled = MasteryEngine.shuffleQuestionOptions(originalQuestion);
    expect(shuffled.options).toHaveLength(4);
    // Phương án đúng vẫn phải nằm trong danh sách lựa chọn
    expect(shuffled.options).toContain(originalQuestion.correctAnswer);
    expect(shuffled.correctAnswer).toBe(originalQuestion.correctAnswer);
  });

  it('xử lý tương thích ngược khi nạp dữ liệu save cũ không có knowledgeMastery', () => {
    const memoryStore: Record<string, string> = {};
    globalThis.localStorage = {
      getItem: (k: string) => memoryStore[k] ?? null,
      setItem: (k: string, v: string) => {
        memoryStore[k] = String(v);
      },
      removeItem: (k: string) => {
        delete memoryStore[k];
      },
      clear: () => {},
      key: () => null,
      length: 0,
    } as any;

    // Giả lập dữ liệu save cũ từ phiên bản trước (hoàn toàn không có knowledgeMastery)
    const oldSaveData = {
      id: 'legacy_user',
      name: 'Tiêu Dao Kiếm Khách',
      gender: 'male',
      stats: {
        level: 2,
        xp: 150,
        xpToNextLevel: 250,
        hp: 140,
        maxHp: 140,
        attack: 30,
        defense: 15,
        speed: 160,
        criticalRate: 0.15,
        criticalDamage: 1.5,
        congLuc: 900,
      },
      inventory: [],
      equipment: { weapon: null, accessory: null, manual: null },
      unitProgress: 35,
      quests: [],
      currentQuestIndex: 1,
      defeatedMobs: 0,
      defeatedEnemyIds: [],
      bossDefeated: false,
      learnedVocabIds: ['vocab_1', 'vocab_2'],
      lastSavedAt: Date.now() - 100000,
      // KHÔNG CÓ knowledgeMastery
    };

    memoryStore['phuong_chick_english_wulin_save_v1'] = JSON.stringify(oldSaveData);

    // Nạp lại qua StorageService
    const loaded = StorageService.loadProfile();
    expect(loaded).not.toBeNull();
    expect(loaded!.name).toBe('Tiêu Dao Kiếm Khách');
    // Đã được tự động khởi tạo an toàn thành object rỗng không gây lỗi crash
    expect(loaded!.knowledgeMastery).toBeDefined();
    expect(typeof loaded!.knowledgeMastery).toBe('object');
  });
});
