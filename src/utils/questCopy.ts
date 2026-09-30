import { Quest } from '../types/game';

const shortSteps: Record<number, { title: string; action: string }> = {
  1: { title: 'Gặp Hồng Y Tông Chủ', action: 'Đến đầu làng gặp Hà Ánh Phượng.' },
  2: { title: 'Học từ mới', action: 'Tìm và học 6 từ tiếng Anh.' },
  3: { title: 'Thử sức', action: 'Trả lời 3 câu hỏi.' },
  4: { title: 'Đi qua rừng tre', action: 'Vượt qua 2 đối thủ.' },
  5: { title: 'Trận cuối', action: 'Dùng điều đã học để chiến thắng.' },
};

export const questTitle = (quest: Quest) => shortSteps[quest.step]?.title || quest.title;
export const questAction = (quest: Quest) => shortSteps[quest.step]?.action || quest.objective;
