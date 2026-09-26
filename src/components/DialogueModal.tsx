import React from 'react';
import { soundService } from '../services/sound';
import {
  Shield,
  BookOpen,
  Sparkles,
  X,
  ChevronRight,
  Flame,
  Zap,
  Volume2,
  Eye,
} from 'lucide-react';
import { Quest } from '../types/game';
import { getLevelConfig } from '../game/levels/levelConfig';
import { getUnitDataset } from '../../content/global-success';

interface DialogueModalProps {
  npcId: string;
  selectedUnitId?: string;
  currentQuest: Quest | undefined;
  onAdvanceQuest: (questId: string) => void;
  onOpenVocabulary?: () => void;
  onOpenChallenge?: () => void;
  onOpenTraining?: () => void;
  onClose: () => void;
}

interface NpcMeta {
  name: string;
  title: string;
  portrait: string;
  badgeColor: string;
  badgeBg: string;
  borderColor: string;
  quote: string;
}

const NPC_INFO: Record<string, NpcMeta> = {
  bang_chu: {
    name: 'Bang Chủ Hà Ánh Phượng',
    title: 'Lãnh Tụ Võ Lâm Chính Phái',
    portrait: '/assets/game/characters/npc/portraits/bang_chu_ha_anh_phuong.png',
    badgeColor: 'text-amber-400',
    badgeBg: 'bg-amber-950/60',
    borderColor: 'border-amber-500/80',
    quote: '"Tam Niên Anh Ngữ – Tụ hội hào kiệt, nhất thống giang hồ"',
  },
  ho_phap_phuong_tu: {
    name: 'Hộ Pháp Phương Tú',
    title: 'Hộ Pháp Từ Vựng & Trưởng Thành',
    portrait: '/assets/game/characters/npc/portraits/ho_phap_phuong_tu.png',
    badgeColor: 'text-emerald-400',
    badgeBg: 'bg-emerald-950/60',
    borderColor: 'border-emerald-500/80',
    quote: '"Từ vựng là căn cơ võ học – Nắm chắc từ loại, công lực thăng tiến vượt bậc"',
  },
  ho_phap_dang_tran_ha: {
    name: 'Hộ Pháp Đặng Trần Hà',
    title: 'Hộ Pháp Ngữ Pháp & Thách Đấu',
    portrait: '/assets/game/characters/npc/portraits/ho_phap_dang_tran_ha.png',
    badgeColor: 'text-blue-400',
    badgeBg: 'bg-blue-950/60',
    borderColor: 'border-blue-500/80',
    quote: '"Cấu trúc chuẩn xác, kiếm pháp vô song – Ngữ pháp sáng tỏ, phá tan mê trận"',
  },
  ho_phap_hoang_van: {
    name: 'Hộ Pháp Hoàng Vân',
    title: 'Hộ Pháp Nghe & Nhịp Điệu',
    portrait: '/assets/game/characters/npc/portraits/ho_phap_hoang_van.png',
    badgeColor: 'text-amber-300',
    badgeBg: 'bg-amber-950/60',
    borderColor: 'border-amber-500/80',
    quote: '"Thính âm biện vị – Lắng nghe từng ngữ điệu, phản xạ xuất chiêu trong chớp mắt"',
  },
  ho_phap_nguyet_nguyen: {
    name: 'Hộ Pháp Nguyệt Nguyên',
    title: 'Hộ Pháp Đọc Hiểu & Minh Triết',
    portrait: '/assets/game/characters/npc/portraits/ho_phap_nguyet_nguyen.png',
    badgeColor: 'text-cyan-400',
    badgeBg: 'bg-cyan-950/60',
    borderColor: 'border-cyan-500/80',
    quote: '"Minh triết soi rọi hư ảnh – Tìm đúng bằng chứng văn bản để phá vỡ ảo giác"',
  },
};

export const DialogueModal: React.FC<DialogueModalProps> = ({
  npcId,
  selectedUnitId = 'g10-u01',
  currentQuest,
  onAdvanceQuest,
  onOpenVocabulary,
  onOpenChallenge,
  onOpenTraining,
  onClose,
}) => {
  const npc = NPC_INFO[npcId] || NPC_INFO.bang_chu;
  const level = getLevelConfig(selectedUnitId);
  const dataset = getUnitDataset(selectedUnitId);
  const isQuest1 = currentQuest?.id === 'quest_1';

  const handleCompleteQuest1 = () => {
    soundService.playGong();
    onAdvanceQuest('quest_1');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn select-none">
      <div
        className={`relative w-full max-w-2xl bg-stone-900/95 border-2 ${npc.borderColor} rounded-2xl p-5 sm:p-8 shadow-2xl text-stone-100 flex flex-col gap-4 max-h-[92vh] overflow-y-auto`}
      >
        {/* Close button */}
        <button
          onClick={() => {
            soundService.playClick();
            onClose();
          }}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-stone-400 hover:text-amber-300 hover:bg-stone-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header: Portrait & Title */}
        <div className="flex items-center gap-4 border-b border-stone-800 pb-4">
          <div
            className={`relative w-16 h-20 sm:w-20 sm:h-24 rounded-xl overflow-hidden border-2 ${npc.borderColor} shadow-wuxia-gold shrink-0 bg-stone-950`}
          >
            <img
              src={npc.portrait}
              alt={npc.name}
              className="w-full h-full object-cover object-top"
              onError={(e) => {
                // Fallback avatar icon if image fails
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          </div>
          <div>
            <div
              className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold ${npc.badgeColor} ${npc.badgeBg} border border-stone-700/60 mb-1`}
            >
              <Shield className="w-3.5 h-3.5" />
              {npc.title}
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-amber-200 font-wuxia">
              {npc.name}
            </h2>
            <span className="text-xs text-stone-400 italic block mt-0.5">
              {npc.quote}
            </span>
          </div>
        </div>

        {/* Dialogue Body */}
        <div className="bg-stone-950/80 border border-stone-800 rounded-xl p-4 sm:p-5 text-sm sm:text-base leading-relaxed text-stone-200 space-y-3">
          {npcId === 'bang_chu' && (
            <>
              {isQuest1 ? (
                <>
                  <p>
                    <b className="text-amber-300">Bang Chủ:</b> "Chào mừng thiếu hiệp đã bái nhập môn phái! Hiện nay, trong Võ Lâm xuất hiện một tà phái mang tên <b>Vô Ngôn Ma Giáo</b>."
                  </p>
                  <p>
                    "Chúng luyện tà công khiến con người quên từ ngữ, xáo trộn văn phạm. Khu vực hiện tại là{' '}
                    <b className="text-amber-300">{level.title}</b> (Chủ đề: <i>{level.topic}</i>)."
                  </p>
                  <p className="text-amber-200">
                    "Muốn phá tan ma chướng, thiếu hiệp cần bắt đầu từ căn bản. Hãy đến ngay <b>Tàng Kinh Các</b> gặp Hộ Pháp Phương Tú để học từ vựng và giải trừ phong ấn!"
                  </p>
                </>
              ) : (
                <>
                  <p>
                    <b className="text-amber-300">Bang Chủ:</b> "Thiếu hiệp hành sự rất quyết đoán! Hãy tiếp tục rèn luyện cùng 4 vị Hộ Pháp tại các phân khu trong bản đồ."
                  </p>
                  <p>
                    "Tại vùng dã ngoại có <b>{level.enemies.length} loại tà binh</b> tuần tra. Hãy tiêu diệt chúng để tích lũy tu vi. Khi tiến độ Unit đạt từ <b>70%</b> trở lên, cổng Cấm Địa sẽ mở ra để quyết chiến!"
                  </p>
                </>
              )}
            </>
          )}

          {npcId === 'ho_phap_phuong_tu' && (
            <>
              <p>
                <b className="text-emerald-400">Hộ Pháp Phương Tú:</b> "Chào thiếu hiệp! Tàng Kinh Các lưu giữ toàn bộ bí điển từ vựng của môn phái."
              </p>
              <p>
                "Tại <b>{level.title}</b>, chúng ta có <b>{dataset?.vocabulary.length || 6} thuật ngữ trọng yếu</b>. Học kỹ từng từ, phiên âm IPA, nghĩa và ngữ cảnh câu mẫu sẽ giúp công lực của thiếu hiệp tăng tiến vượt bậc."
              </p>
              <p className="text-emerald-200">
                "Hãy nhấp nút bên dưới để tiến vào Tàng Kinh Các tra cứu và luyện tập các bí điển từ vựng ngay bây giờ!"
              </p>
            </>
          )}

          {npcId === 'ho_phap_dang_tran_ha' && (
            <>
              <p>
                <b className="text-blue-400">Hộ Pháp Đặng Trần Hà:</b> "Võ học vô chiêu thắng hữu chiêu, nhưng ngữ pháp là cốt lõi bất biến của ngôn từ!"
              </p>
              <p>
                "Chủ đề <b>{level.title}</b> thử thách thiếu hiệp qua cấu trúc ngữ pháp:{' '}
                <b className="text-blue-300">{dataset?.grammar[0]?.structure_name || 'Quy tắc ngữ pháp chuẩn'}</b>. Thiếu hiệp cần sắp xếp trật tự từ ngữ chuẩn xác, giải phá câu đố để khai mở sức mạnh."
              </p>
              <p className="text-blue-200">
                "Thiếu hiệp đã sẵn sàng khiêu chiến Phong Ấn Thạch Trận chưa?"
              </p>
            </>
          )}

          {npcId === 'ho_phap_hoang_van' && (
            <>
              <p>
                <b className="text-amber-300">Hộ Pháp Hoàng Vân:</b> "Thính âm biện vị! Trên chiến trường khốc liệt, nghe rõ từng âm tiết và ngữ điệu của đối phương sẽ giúp thiếu hiệp phản ứng kịp thời trước mọi sát chiêu."
              </p>
              <p>
                "Tại Võ Luyện Đài, ta đã chuẩn bị các cọc luyện công và bài tập phản xạ âm thanh thích ứng theo năng lực của thiếu hiệp. Càng luyện nhiều, nhĩ lực càng sắc bén."
              </p>
              <p className="text-amber-200">
                "Hãy vào Võ Luyện Đài rèn luyện ngay để nhận thêm Tu Vi!"
              </p>
            </>
          )}

          {npcId === 'ho_phap_nguyet_nguyen' && (
            <>
              <p>
                <b className="text-cyan-400">Hộ Pháp Nguyệt Nguyên:</b> "Minh Triết Các soi rọi chân lý. Khi đối mặt với thuật ngụy tạo (Deception Pierce), kẻ địch sẽ tung hỏa mù bằng những luận điệu sai lệch."
              </p>
              {dataset?.reading ? (
                <div className="p-3 bg-stone-900/90 rounded-lg border border-cyan-800/40 text-xs sm:text-sm text-cyan-200 space-y-1">
                  <div className="font-bold text-cyan-300">
                    📖 Chủ Đề Đọc Hiểu: {dataset.reading.topic}
                  </div>
                  <p className="text-stone-300 italic">
                    "{dataset.reading.main_idea}"
                  </p>
                  <p className="text-cyan-400 text-xs">
                    💡 Kỹ năng then chốt: {dataset.reading.reading_skills?.join(', ') || 'Xác minh thông tin'}. Luôn đối chiếu câu bằng chứng (evidence anchor) để phá giải tà thuật!
                  </p>
                </div>
              ) : (
                <p>
                  "Hãy đọc sâu hiểu kỹ văn bản của Unit, tìm ra câu then chốt làm bằng chứng để phá vỡ mọi chiêu thức lừa gạt!"
                </p>
              )}
            </>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-end gap-3 mt-2">
          {npcId === 'bang_chu' && isQuest1 && (
            <button
              onClick={handleCompleteQuest1}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-500 hover:to-yellow-500 text-stone-950 font-bold text-sm tracking-wide shadow-lg flex items-center gap-2 transform active:scale-95 transition"
            >
              <span>Lĩnh Ý Bang Chủ &amp; Nhận Nhiệm Vụ 2</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          )}

          {npcId === 'ho_phap_phuong_tu' && onOpenVocabulary && (
            <button
              onClick={() => {
                soundService.playClick();
                onClose();
                onOpenVocabulary();
              }}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-stone-950 font-bold text-sm tracking-wide shadow-lg flex items-center gap-2 transform active:scale-95 transition"
            >
              <BookOpen className="w-4 h-4" />
              <span>Vào Tàng Kinh Các (Học Từ Vựng)</span>
            </button>
          )}

          {npcId === 'ho_phap_dang_tran_ha' && onOpenChallenge && (
            <button
              onClick={() => {
                soundService.playClick();
                onClose();
                onOpenChallenge();
              }}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-stone-100 font-bold text-sm tracking-wide shadow-lg flex items-center gap-2 transform active:scale-95 transition"
            >
              <Zap className="w-4 h-4" />
              <span>Khiêu Chiến Phong Ấn Ngữ Pháp</span>
            </button>
          )}

          {npcId === 'ho_phap_hoang_van' && onOpenTraining && (
            <button
              onClick={() => {
                soundService.playClick();
                onClose();
                onOpenTraining();
              }}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-stone-950 font-bold text-sm tracking-wide shadow-lg flex items-center gap-2 transform active:scale-95 transition"
            >
              <Volume2 className="w-4 h-4" />
              <span>Vào Võ Luyện Đài (Luyện Công Thính Âm)</span>
            </button>
          )}

          <button
            onClick={() => {
              soundService.playClick();
              onClose();
            }}
            className="px-5 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-amber-200 font-bold text-sm border border-stone-600 transition"
          >
            Đã Rõ, Xin Cáo Lui
          </button>
        </div>
      </div>
    </div>
  );
};
