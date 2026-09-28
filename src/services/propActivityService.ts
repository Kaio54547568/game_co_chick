import { PropCategory, PropActivityData, PlayerProfile } from '../types/game';
import { getUnitDataset } from '../../content/global-success';
import { getLevelConfig } from '../game/levels/levelConfig';

export interface PropCategoryMeta {
  category: PropCategory;
  label: string;
  icon: string;
  actionVerb: string;
  badgeBg: string;
  badgeText: string;
  borderColor: string;
  loreType: string;
}

export const PROP_CATEGORY_METAS: Record<PropCategory, PropCategoryMeta> = {
  vocab_discovery: {
    category: 'vocab_discovery',
    label: 'Khám Phá Từ Vựng',
    icon: '🔍',
    actionVerb: 'Lĩnh hội',
    badgeBg: 'bg-emerald-950/70',
    badgeText: 'text-emerald-400',
    borderColor: 'border-emerald-500/80',
    loreType: 'Bí Thư Từ Vựng',
  },
  reading_clue: {
    category: 'reading_clue',
    label: 'Manh Mối Đọc Hiểu',
    icon: '📜',
    actionVerb: 'Giải mã',
    badgeBg: 'bg-cyan-950/70',
    badgeText: 'text-cyan-400',
    borderColor: 'border-cyan-500/80',
    loreType: 'Minh Triết Điển Tích',
  },
  listening_clue: {
    category: 'listening_clue',
    label: 'Nghe & Nhịp Điệu',
    icon: '🎧',
    actionVerb: 'Thính âm',
    badgeBg: 'bg-amber-950/70',
    badgeText: 'text-amber-400',
    borderColor: 'border-amber-500/80',
    loreType: 'Huyền Âm Diệu Điệu',
  },
  dialogue: {
    category: 'dialogue',
    label: 'Đàm Đạo & Tình Huống',
    icon: '💬',
    actionVerb: 'Đàm đạo',
    badgeBg: 'bg-blue-950/70',
    badgeText: 'text-blue-400',
    borderColor: 'border-blue-500/80',
    loreType: 'Đàm Đạo Giang Hồ',
  },
  quest_clue: {
    category: 'quest_clue',
    label: 'Manh Mối Nhiệm Vụ',
    icon: '🗺️',
    actionVerb: 'Truy vết',
    badgeBg: 'bg-purple-950/70',
    badgeText: 'text-purple-400',
    borderColor: 'border-purple-500/80',
    loreType: 'Tông Tích Bí Mật',
  },
  decoration: {
    category: 'decoration',
    label: 'Cảnh Vật Trang Trí',
    icon: '🏮',
    actionVerb: 'Chiêm ngưỡng',
    badgeBg: 'bg-neutral-900/70',
    badgeText: 'text-neutral-400',
    borderColor: 'border-neutral-600/80',
    loreType: 'Cảnh Vật Phong Cảnh',
  },
};

export class PropActivityService {
  /**
   * Lấy thông tin hiển thị và danh xưng cho danh mục prop
   */
  static getCategoryMeta(category: PropCategory = 'vocab_discovery'): PropCategoryMeta {
    return PROP_CATEGORY_METAS[category] || PROP_CATEGORY_METAS.vocab_discovery;
  }

  /**
   * Kiểm tra xem đạo cụ đã được hoàn thành trước đó chưa để tránh trùng lặp phần thưởng
   */
  static isPropCompleted(
    profile: PlayerProfile,
    unitId: string,
    propId: string
  ): boolean {
    const key = `${unitId}:${propId}`;
    if (profile.completedPropIds && profile.completedPropIds.includes(key)) {
      return true;
    }
    const unitState = profile.unitStates?.[unitId];
    if (unitState?.completedPropIds && unitState.completedPropIds.includes(propId)) {
      return true;
    }
    return false;
  }

  /**
   * Xây dựng nội dung hoạt động học tập có ý nghĩa từ dữ liệu Global Success đã xác minh
   */
  static getPropActivity(
    unitId: string,
    propId: string
  ): PropActivityData | null {
    const dataset = getUnitDataset(unitId);
    if (!dataset) {
      console.warn(`[PropActivityService] Không tìm thấy dữ liệu bộ bài học cho Unit: ${unitId}`);
      return null;
    }

    const levelCfg = getLevelConfig(unitId);
    const configuredProp = levelCfg?.props.find((p) => p.id === propId);

    // Bỏ qua nếu đạo cụ không tồn tại trong cấu hình hoặc là đạo cụ trang trí thuần túy
    if (!configuredProp || configuredProp.category === 'decoration') {
      return null;
    }

    const isSecondary =
      propId.includes('secondary') ||
      propId.includes('herb_drying') ||
      propId.includes('ancestor_lantern') ||
      propId.includes('transit_marker') ||
      propId.includes('festival_boat') ||
      propId.includes('tide_gauge') ||
      propId.includes('restoration_scaffold') ||
      propId.includes('academy_signpost') ||
      propId.includes('road_milestone') ||
      propId.includes('aid_notice_board') ||
      propId.includes('mangrove_nest');

    // Xác định phân loại hoạt động
    let category: PropCategory = configuredProp?.category || 'vocab_discovery';
    if (!configuredProp?.category) {
      if (isSecondary) {
        if (unitId === 'g11-u02' || unitId === 'g12-u02') {
          category = 'dialogue';
        } else if (
          unitId === 'g11-u07' ||
          unitId === 'g11-u09' ||
          unitId === 'g12-u05' ||
          unitId === 'g12-u08' ||
          unitId === 'g12-u09'
        ) {
          category = 'quest_clue';
        } else {
          category = 'reading_clue';
        }
      } else {
        if (unitId === 'g10-u03' || unitId === 'g11-u06') {
          category = 'listening_clue';
        } else {
          category = 'vocab_discovery';
        }
      }
    }

    // Chọn câu hỏi từ dataset Global Success đã xác minh
    let questionItem: {
      id: string;
      prompt: string;
      options: string[];
      correctAnswer: string;
      explanation: string;
      knowledgeItemIds?: string[];
    } | null = null;

    if (!isSecondary) {
      // Prop 1: Tàng Kinh Các Garden - Sử dụng Question 1 của bài học
      const q = dataset.questions?.[0];
      if (q && q.prompt && q.options && q.correctAnswer && q.explanation) {
        questionItem = {
          id: q.id,
          prompt: q.prompt,
          options: [...q.options],
          correctAnswer: q.correctAnswer,
          explanation: q.explanation,
          knowledgeItemIds: q.knowledgeItemIds || [],
        };
      }
    } else {
      // Prop 2: Minh Triết Các - Sử dụng câu hỏi Đọc hiểu (Reading Game Question) hoặc Question 2
      const rq = dataset.reading?.game_questions?.[0];
      if (rq && rq.prompt && rq.options && rq.correctAnswer && rq.explanation) {
        questionItem = {
          id: `${unitId}-reading-q1`,
          prompt: rq.prompt,
          options: [...rq.options],
          correctAnswer: rq.correctAnswer,
          explanation: rq.explanation,
          knowledgeItemIds: dataset.reading?.keywords || [],
        };
      } else {
        const q2 = dataset.questions?.[1];
        if (q2 && q2.prompt && q2.options && q2.correctAnswer && q2.explanation) {
          questionItem = {
            id: q2.id,
            prompt: q2.prompt,
            options: [...q2.options],
            correctAnswer: q2.correctAnswer,
            explanation: q2.explanation,
            knowledgeItemIds: q2.knowledgeItemIds || [],
          };
        }
      }
    }

    // Báo lỗi cụ thể nếu thiếu dữ liệu câu hỏi
    if (!questionItem) {
      console.warn(
        `[PropActivityService] Thiếu dữ liệu câu hỏi xác minh cho đạo cụ ${propId} thuộc Unit ${unitId}`
      );
      return null;
    }

    // Tên đạo cụ
    const propName = configuredProp?.name || (isSecondary ? 'Bí Điển Minh Triết' : 'Cổ Vật Trấn Phái');

    // Lời dẫn nhập môn mang phong cách kiếm hiệp kết hợp ngữ liệu Unit
    let loreIntro = configuredProp?.loreIntro;
    if (!loreIntro) {
      if (category === 'listening_clue') {
        loreIntro = `Thính âm diệu điệu vọng ra từ ${propName}. Hãy lắng tai nghe nhịp điệu và ngữ âm đặc trưng của chủ đề ${dataset.metadata.title} để giải phóng linh khí!`;
      } else if (category === 'dialogue') {
        loreIntro = `Đứng trước ${propName}, hãy suy xét tình huống giao tiếp chuẩn mực trong bối cảnh ${dataset.metadata.topic}. Lời nói thấu tình đạt lý sẽ khai mở phong ấn!`;
      } else if (category === 'quest_clue') {
        loreIntro = `Trên ${propName} lưu lại những chỉ dẫn và manh mối quan trọng về ${dataset.metadata.topic}. Phân tích chính xác để nắm bắt cục diện!`;
      } else if (category === 'reading_clue') {
        loreIntro = `Từng nét chữ trên ${propName} ghi lại kiến thức đọc hiểu sâu sắc của ${dataset.metadata.title}. Hãy tìm đúng câu bằng chứng để thông suốt huyền cơ!`;
      } else {
        loreIntro = `Cổ vật ${propName} ẩn chứa tinh hoa từ vựng cốt lõi của ${dataset.metadata.title}. Hãy lĩnh hội chính xác để gia tăng căn cơ tu vi!`;
      }
    }

    return {
      unitId,
      propId,
      propName,
      category,
      loreIntro,
      question: questionItem,
      reward: {
        xp: 35,
        unitProgressGain: 5,
      },
    };
  }
}
