import React from 'react';
import { PlayerProfile } from '../types/game';
import { soundService } from '../services/sound';
import { Trophy, Sparkles, Award, ArrowRight, ShieldCheck } from 'lucide-react';

interface VictoryModalProps {
  profile: PlayerProfile;
  onContinue: () => void;
  onOpenInventory: () => void;
}

export const VictoryModal: React.FC<VictoryModalProps> = ({
  profile,
  onContinue,
  onOpenInventory,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md select-none animate-fadeIn">
      {/* Background celebration atmosphere */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30 filter blur-sm"
        style={{ backgroundImage: 'url(/assets/game/combat/courtyard_arena.jpg)' }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/80 to-transparent" />

      <div className="relative z-10 w-full max-w-lg bg-stone-900/95 border-2 border-amber-500 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col items-center text-center gap-5 text-stone-100">
        {/* Trophy Icon */}
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-500 to-yellow-600 border-2 border-yellow-200 flex items-center justify-center text-stone-950 shadow-wuxia-gold animate-wuxia-float">
          <Trophy className="w-10 h-10" />
        </div>

        {/* Title */}
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            Đại Thắng Võ Lâm • Vertical Slice Hoàn Thành!
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-600 font-wuxia">
            Bình Định Ma Giáo
          </h2>
          <p className="text-xs sm:text-sm text-stone-300 mt-1 max-w-sm">
            Chúc mừng thiếu hiệp <b>{profile.name}</b> đã trảm sát Loạn Ngữ Kiếm Ma, phá tan tà pháp xáo trộn văn phạm và khôi phục sự thanh bình cho Unit 1!
          </p>
        </div>

        {/* Achievement Summary Cards */}
        <div className="grid grid-cols-3 gap-2.5 w-full">
          <div className="bg-stone-950/80 border border-stone-800 rounded-xl p-3">
            <span className="text-[11px] text-stone-400 block">Đẳng Cấp</span>
            <span className="text-base font-extrabold text-amber-400">Lv.{profile.stats.level}</span>
          </div>

          <div className="bg-stone-950/80 border border-stone-800 rounded-xl p-3">
            <span className="text-[11px] text-stone-400 block">Công Lực</span>
            <span className="text-base font-extrabold text-yellow-300">{profile.stats.congLuc}</span>
          </div>

          <div className="bg-stone-950/80 border border-stone-800 rounded-xl p-3">
            <span className="text-[11px] text-stone-400 block">Tiến Độ Unit</span>
            <span className="text-base font-extrabold text-emerald-400">100%</span>
          </div>
        </div>

        {/* Loot Acquired */}
        <div className="w-full bg-stone-950/90 border border-amber-600/50 rounded-2xl p-4 flex items-center gap-3.5 text-left">
          <img
            src="/assets/game/items/loot_chest.png"
            alt="Loot Chest"
            className="w-14 h-14 object-contain bg-stone-900 border border-amber-500/40 rounded-xl p-1 shrink-0"
          />
          <div>
            <span className="text-xs font-bold text-amber-400 block">
              Chiến Lợi Phẩm Boss Drop
            </span>
            <h4 className="text-sm font-bold text-amber-200">
              Rương Chiến Lợi Phẩm Ma Giáo
            </h4>
            <p className="text-xs text-stone-400">
              Đã tự động chuyển vào Hành Trang của thiếu hiệp.
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 w-full">
          <button
            onClick={() => {
              soundService.playClick();
              onOpenInventory();
            }}
            className="flex-1 py-3 px-4 rounded-xl bg-stone-800 hover:bg-stone-700 text-amber-300 font-bold text-xs border border-amber-600/50 active:scale-95 transition"
          >
            Mở Hành Trang Xem Đồ
          </button>

          <button
            onClick={() => {
              soundService.playGong();
              onContinue();
            }}
            className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-500 text-stone-950 font-bold text-xs shadow-lg flex items-center justify-center gap-1.5 active:scale-95 transition"
          >
            <span>Tiếp Tục Hành Tẩu</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
