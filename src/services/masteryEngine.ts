import {
  CombatQuestion,
  KnowledgeMasteryState,
} from '../types/game';

export type MasteryTier = 'needs_review' | 'developing' | 'proficient' | 'mastered';

export class MasteryEngine {
  /**
   * Tạo bản ghi khởi tạo cho một knowledge item
   */
  static createInitialMasteryRecord(knowledgeItemId: string): KnowledgeMasteryState {
    return {
      knowledgeItemId,
      mastery: 0,
      timesEncountered: 0,
      timesCorrect: 0,
      timesIncorrect: 0,
      lastAnsweredCorrectly: null,
      lastResponseTimeSec: 0,
      lastReviewedAt: 0,
      history: [],
    };
  }

  /**
   * Xác định phân tầng Mastery theo GDD:
   * - < 50: Cần ôn lại (Xuất hiện thường xuyên)
   * - 50 - 79: Đang rèn luyện (Xuất hiện bình thường)
   * - 80 - 89: Thành thục (Xuất hiện ít hơn)
   * - >= 90: Mastered / Đột Phá Viên Mãn (Đánh dấu Mastered)
   */
  static getMasteryTier(mastery: number): MasteryTier {
    if (mastery >= 90) return 'mastered';
    if (mastery >= 80) return 'proficient';
    if (mastery >= 50) return 'developing';
    return 'needs_review';
  }

  /**
   * Tính toán cập nhật điểm Mastery cho một mục kiến thức:
   * - Trả lời đúng trong 0-3s (Bạo kích): +25 điểm
   * - Trả lời đúng trong 3-7s (Chuẩn): +15 điểm
   * - Trả lời đúng > 7s (Chậm): +10 điểm
   * - Chuỗi đúng liên tiếp: +5 điểm thưởng
   * - Trả lời sai hoặc hết giờ: -35 điểm (giảm mạnh để rơi vào nhóm cần ôn lại)
   */
  static calculateMasteryUpdate(
    current: KnowledgeMasteryState | undefined,
    isCorrect: boolean,
    responseTimeSec: number
  ): KnowledgeMasteryState {
    const state: KnowledgeMasteryState = current
      ? { ...current, history: [...(current.history || [])] }
      : this.createInitialMasteryRecord('unknown');

    const now = Date.now();

    if (isCorrect) {
      let gain = 15;
      if (responseTimeSec <= 3.0) {
        gain = 25; // Critical response
      } else if (responseTimeSec > 7.0) {
        gain = 10; // Slow response
      }

      // Thưởng chuỗi đúng liên tiếp
      if (state.lastAnsweredCorrectly === true) {
        gain += 5;
      }

      state.mastery = Math.min(100, Math.max(0, state.mastery + gain));
      state.timesCorrect += 1;
      state.lastAnsweredCorrectly = true;
    } else {
      // Phạt khi trả lời sai: giảm 35 điểm hoặc rớt xuống nhóm cần ôn luyện (< 50)
      const penalty = 35;
      state.mastery = Math.max(0, state.mastery - penalty);
      state.timesIncorrect += 1;
      state.lastAnsweredCorrectly = false;
    }

    state.timesEncountered += 1;
    state.lastResponseTimeSec = responseTimeSec;
    state.lastReviewedAt = now;

    // Giữ lại 10 lượt trả lời gần nhất trong lịch sử
    state.history.push({
      isCorrect,
      responseTimeSec,
      timestamp: now,
    });
    if (state.history.length > 10) {
      state.history = state.history.slice(-10);
    }

    return state;
  }

  /**
   * Cập nhật điểm Mastery cho danh sách các knowledge items liên kết với câu hỏi
   */
  static recordAnswer(
    masteryMap: Record<string, KnowledgeMasteryState>,
    knowledgeItemIds: string[],
    isCorrect: boolean,
    responseTimeSec: number
  ): Record<string, KnowledgeMasteryState> {
    const updatedMap: Record<string, KnowledgeMasteryState> = { ...masteryMap };

    knowledgeItemIds.forEach((kid) => {
      const current = updatedMap[kid] || this.createInitialMasteryRecord(kid);
      current.knowledgeItemId = kid;
      updatedMap[kid] = this.calculateMasteryUpdate(current, isCorrect, responseTimeSec);
    });

    return updatedMap;
  }

  /**
   * Đảo ngẫu nhiên các phương án lựa chọn trong câu hỏi trắc nghiệm
   */
  static shuffleQuestionOptions(question: CombatQuestion): CombatQuestion {
    if (question.type !== 'multiple_choice' || !question.options || question.options.length <= 1) {
      return { ...question };
    }

    const shuffled = [...question.options];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return {
      ...question,
      options: shuffled,
    };
  }

  /**
   * Lựa chọn câu hỏi thích ứng (Adaptive Selection):
   * 1. Hạn chế lặp lại các câu hỏi vừa gặp gần đây (recentQuestionIds)
   * 2. Phân loại theo mức độ thông thạo:
   *    - Nhóm 1: Cần ôn lại (mastery < 50 hoặc vừa làm sai) -> Ưu tiên cao nhất (~50%)
   *    - Nhóm 2: Đang rèn luyện (mastery 50 - 79) -> Ưu tiên vừa (~30%)
   *    - Nhóm 3: Kiến thức mới chưa từng gặp -> Đảm bảo người chơi luôn gặp điều mới (~15%)
   *    - Nhóm 4: Đã Mastered (>= 90) -> Giảm tần suất xuất hiện (~5%)
   * 3. Trả về mảng câu hỏi đã được đảo ngẫu nhiên thứ tự các phương án lựa chọn
   */
  static selectAdaptiveQuestions(
    allQuestions: CombatQuestion[],
    masteryMap: Record<string, KnowledgeMasteryState>,
    count: number,
    recentQuestionIds: string[] = []
  ): CombatQuestion[] {
    if (!allQuestions || allQuestions.length === 0) return [];
    if (allQuestions.length <= count) {
      return allQuestions.map((q) => this.shuffleQuestionOptions(q));
    }

    // 1. Lọc bỏ các câu vừa gặp gần nhất (nếu pool đủ rộng)
    let candidates = allQuestions.filter((q) => !recentQuestionIds.includes(q.id));
    if (candidates.length < count) {
      candidates = [...allQuestions];
    }

    // 2. Tính điểm ưu tiên (priority score) cho từng câu hỏi:
    // Điểm càng cao càng được ưu tiên chọn
    const scoredQuestions = candidates.map((q) => {
      let minMastery = 100;
      let hasUnseen = false;
      let hasRecentMistake = false;

      q.knowledgeItemIds.forEach((kid) => {
        const state = masteryMap[kid];
        if (!state || state.timesEncountered === 0) {
          hasUnseen = true;
          minMastery = Math.min(minMastery, 0);
        } else {
          minMastery = Math.min(minMastery, state.mastery);
          if (state.lastAnsweredCorrectly === false) {
            hasRecentMistake = true;
          }
        }
      });

      let weight = 10;
      if (hasRecentMistake) {
        weight = 100; // Vừa sai gần đây -> ưu tiên tối đa
      } else if (minMastery < 50) {
        weight = 75; // Cần ôn lại
      } else if (hasUnseen) {
        weight = 60; // Kiến thức mới chưa gặp
      } else if (minMastery < 80) {
        weight = 40; // Đang rèn luyện
      } else if (minMastery < 90) {
        weight = 20; // Thành thục
      } else {
        weight = 5; // Đã Mastered -> xuất hiện hiếm
      }

      // Thêm yếu tố ngẫu nhiên nhỏ để tránh thứ tự cứng nhắc
      const randomizedScore = weight * (0.8 + Math.random() * 0.4);

      return {
        question: q,
        score: randomizedScore,
      };
    });

    // Sắp xếp theo điểm ưu tiên giảm dần
    scoredQuestions.sort((a, b) => b.score - a.score);

    // Lấy `count` câu hỏi đầu tiên và đảo đáp án
    const selected = scoredQuestions.slice(0, count).map((item) => this.shuffleQuestionOptions(item.question));

    return selected;
  }
}
