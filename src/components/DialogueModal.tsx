import React from 'react';
import { soundService } from '../services/sound';
import { Shield, Sparkles, X, ChevronRight } from 'lucide-react';
import { Quest } from '../types/game';

interface DialogueModalProps {
  npcId: string;
  currentQuest: Quest | undefined;
  onAdvanceQuest: (questId: string) => void;
  onClose: () => void;
}

export const DialogueModal: React.FC<DialogueModalProps> = ({
  npcId,
  currentQuest,
  onAdvanceQuest,
  onClose,
}) => {
  const isQuest1 = currentQuest?.id === 'quest_1';

  const handleCompleteQuest1 = () => {
    soundService.playGong();
    onAdvanceQuest('quest_1');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-stone-900/95 border-2 border-amber-600/80 rounded-2xl p-6 sm:p-8 shadow-2xl text-stone-100 flex flex-col gap-4">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-stone-400 hover:text-amber-300 hover:bg-stone-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header: Chân dung Bang Chủ Hà Ánh Phượng & Tiêu đề */}
        <div className="flex items-center gap-4 border-b border-amber-800/40 pb-4">
          {npcId === 'bang_chu' ? (
            <div className="relative w-16 h-20 sm:w-20 sm:h-24 rounded-xl overflow-hidden border-2 border-amber-500/80 shadow-wuxia-gold shrink-0 bg-stone-950">
              <img
                src="/assets/game/characters/npc/portraits/bang_chu_ha_anh_phuong.png"
                alt="Bang Chủ Hà Ánh Phượng"
                className="w-full h-full object-cover object-top"
              />
            </div>
          ) : (
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-700 via-yellow-600 to-amber-900 border-2 border-yellow-300 flex items-center justify-center shadow-wuxia-gold text-stone-950 font-black text-2xl font-wuxia shrink-0">
              鳳
            </div>
          )}
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs text-amber-400 font-bold uppercase tracking-wider">
              <Shield className="w-3.5 h-3.5" />
              Lãnh Tụ Võ Lâm Chính Phái
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-amber-200 font-wuxia">
              Bang Chủ Hà Ánh Phượng
            </h2>
            <span className="text-xs text-stone-400 italic">
              "Tam Niên Anh Ngữ – Tụ hội hào kiệt, nhất thống giang hồ"
            </span>
          </div>
        </div>

        {/* Dialogue Body */}
        <div className="bg-stone-950/70 border border-stone-800 rounded-xl p-4 sm:p-5 text-sm sm:text-base leading-relaxed text-stone-200">
          {isQuest1 ? (
            <div className="space-y-3">
              <p>
                <b className="text-amber-300">Bang Chủ:</b> "Chào mừng thiếu hiệp đã bái nhập môn phái! Hiện nay, trong Võ Lâm xuất hiện một tà phái mang tên <b>Vô Ngôn Ma Giáo</b>."
              </p>
              <p>
                "Chúng luyện tà công khiến con người quên từ ngữ, xáo trộn văn phạm, khiến ai nấy đều hữu khẩu nan ngôn. Kẻ cầm đầu vùng này là <b>Loạn Ngữ Kiếm Ma</b> đang phong tỏa Ma Giáo Cấm Địa."
              </p>
              <p className="text-amber-200">
                "Muốn phá tan ma chướng, thiếu hiệp cần bắt đầu từ căn bản. Hãy đến ngay <b>Tàng Kinh Các</b> ở phía đông, gặp Hộ Pháp Phương Tú để học 6 bí kíp từ vựng và giải phá phong ấn tri thức!"
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              <p>
                <b className="text-amber-300">Bang Chủ:</b> "Thiếu hiệp hành sự rất quyết đoán! Hãy tiếp tục trau dồi bí điển tại Tàng Kinh Các và rèn luyện kiếm pháp tại Trúc Lâm."
              </p>
              <p className="text-amber-200">
                "Khi tiến độ tích lũy đạt từ <b>70%</b> trở lên, phong ấn Ma Giáo Cấm Địa sẽ tự khai mở. Lúc đó, hãy dốc toàn lực diệt trừ Loạn Ngữ Kiếm Ma!"
              </p>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 mt-2">
          {isQuest1 ? (
            <button
              onClick={handleCompleteQuest1}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-500 hover:to-yellow-500 text-stone-950 font-bold text-sm tracking-wide shadow-lg flex items-center gap-2 transform active:scale-95 transition"
            >
              <span>Lĩnh Ý Bang Chủ &amp; Nhận Nhiệm Vụ 2</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-amber-200 font-bold text-sm border border-stone-600 transition"
            >
              Đã Rõ, Xin Cáo Lui
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
