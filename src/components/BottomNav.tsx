import React from 'react';
import { soundService } from '../services/sound';
import { eventBus } from '../game/EventBus';

interface BottomNavProps {
  onOpenQuests: () => void;
  onOpenVocabulary: () => void;
  onOpenInventory: () => void;
  onOpenSettings: () => void;
  isNearZone: boolean;
  nearZonePrompt?: string;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  onOpenQuests,
  onOpenVocabulary,
  onOpenInventory,
  onOpenSettings,
  isNearZone,
  nearZonePrompt,
}) => {
  const handleAction = () => {
    soundService.playClick();
    eventBus.emit('interactAction');
  };

  return (
    <div className="absolute bottom-2 left-0 right-0 z-40 px-3 sm:px-6 pointer-events-none flex flex-col items-center gap-2">
      {/* Interaction button popup on mobile or desktop */}
      {isNearZone && (
        <div className="pointer-events-auto animate-bounce-subtle">
          <button
            onClick={handleAction}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-600 via-yellow-600 to-amber-500 text-stone-950 font-black text-sm tracking-wider shadow-2xl border-2 border-yellow-200 active:scale-95 transition transform"
          >
            <img src="/assets/game/ui/controls/attack_button.png" alt="Interact" className="w-5 h-5" />
            <span>{nearZonePrompt || 'TƯƠNG TÁC [E]'}</span>
          </button>
        </div>
      )}

      {/* Navigation Dock */}
      <div className="pointer-events-auto bg-stone-900/90 border border-amber-600/60 rounded-2xl px-3 py-1.5 shadow-2xl backdrop-blur-md flex items-center gap-2 sm:gap-4">
        {/* Nhiệm Vụ */}
        <button
          onClick={() => {
            soundService.playClick();
            onOpenQuests();
          }}
          className="flex flex-col items-center gap-0.5 px-2.5 py-1 rounded-xl hover:bg-amber-500/20 text-stone-300 hover:text-amber-300 transition active:scale-95"
        >
          <img src="/assets/game/ui/icons/quest.png" alt="Nhiệm vụ" className="w-6 h-6 object-contain" />
          <span className="text-[10px] font-bold">Nhiệm Vụ</span>
        </button>

        {/* Tàng Kinh Các */}
        <button
          onClick={() => {
            soundService.playClick();
            onOpenVocabulary();
          }}
          className="flex flex-col items-center gap-0.5 px-2.5 py-1 rounded-xl hover:bg-amber-500/20 text-stone-300 hover:text-amber-300 transition active:scale-95"
        >
          <img src="/assets/game/ui/icons/book.png" alt="Tàng Kinh Các" className="w-6 h-6 object-contain" />
          <span className="text-[10px] font-bold">Bí Điển</span>
        </button>

        {/* Hành Trang */}
        <button
          onClick={() => {
            soundService.playClick();
            onOpenInventory();
          }}
          className="flex flex-col items-center gap-0.5 px-2.5 py-1 rounded-xl hover:bg-amber-500/20 text-stone-300 hover:text-amber-300 transition active:scale-95"
        >
          <img src="/assets/game/ui/icons/inventory.png" alt="Hành Trang" className="w-6 h-6 object-contain" />
          <span className="text-[10px] font-bold">Hành Trang</span>
        </button>

        {/* Cài Đặt */}
        <button
          onClick={() => {
            soundService.playClick();
            onOpenSettings();
          }}
          className="flex flex-col items-center gap-0.5 px-2.5 py-1 rounded-xl hover:bg-amber-500/20 text-stone-300 hover:text-amber-300 transition active:scale-95"
        >
          <img src="/assets/game/ui/icons/settings.png" alt="Cài Đặt" className="w-6 h-6 object-contain" />
          <span className="text-[10px] font-bold">Cài Đặt</span>
        </button>
      </div>
    </div>
  );
};
