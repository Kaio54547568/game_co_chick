import React from 'react';
import { soundService } from '../services/sound';
import { eventBus } from '../game/EventBus';

export interface InteractiveCandidateItem {
  id: string;
  name: string;
  type: string;
  icon: string;
  prompt: string;
  isSelected: boolean;
}

interface BottomNavProps {
  onOpenQuests: () => void;
  onOpenVocabulary: () => void;
  onOpenInventory: () => void;
  onOpenSettings: () => void;
  isNearZone: boolean;
  nearZonePrompt?: string;
  candidates?: InteractiveCandidateItem[];
  selectedIndex?: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  onOpenQuests,
  onOpenVocabulary,
  onOpenInventory,
  onOpenSettings,
  isNearZone,
  nearZonePrompt,
  candidates = [],
  selectedIndex = 0,
}) => {
  const handleAction = () => {
    soundService.playClick();
    eventBus.emit('interactAction');
  };

  const handleSelectCandidate = (id: string) => {
    soundService.playClick();
    eventBus.emit('selectInteractiveZone', id);
  };

  const handleCycleCandidate = () => {
    soundService.playClick();
    eventBus.emit('cycleInteractiveZone');
  };

  return (
    <div className="absolute bottom-2 left-0 right-0 z-40 px-3 sm:px-6 pointer-events-none flex flex-col items-center gap-2">
      {/* Interaction target selector & action button */}
      {isNearZone && (
        <div className="pointer-events-auto flex flex-col items-center gap-1.5 animate-fadeIn">
          {/* Multi-target Selector Chips when 2 or more targets in range */}
          {candidates.length >= 2 && (
            <div className="flex items-center gap-1.5 bg-stone-950/90 border border-amber-500/60 rounded-full px-2.5 py-1 shadow-xl backdrop-blur-md max-w-[95vw] overflow-x-auto">
              <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider px-1 hidden sm:inline">
                Đối tượng:
              </span>
              {candidates.map((cand) => (
                <button
                  key={cand.id}
                  onClick={() => handleSelectCandidate(cand.id)}
                  className={`flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs transition whitespace-nowrap border ${
                    cand.isSelected
                      ? 'bg-amber-500 text-stone-950 font-black border-yellow-200 shadow-wuxia-gold scale-105'
                      : 'bg-stone-900/80 text-stone-300 font-medium border-stone-700/60 hover:bg-stone-800 hover:text-amber-200'
                  }`}
                >
                  <span>{cand.icon || '✨'}</span>
                  <span>{cand.name}</span>
                </button>
              ))}
              <button
                onClick={handleCycleCandidate}
                title="Đổi đối tượng tiếp theo (Phím Tab / Q)"
                className="px-2 py-0.5 rounded-full bg-amber-950/80 hover:bg-amber-900 text-amber-300 text-[10px] font-bold border border-amber-700/60 transition active:scale-95"
              >
                Đổi [Tab] ⇄
              </button>
            </div>
          )}

          {/* Main Interaction Trigger Button */}
          <div className="animate-bounce-subtle">
            <button
              onClick={handleAction}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-600 via-yellow-600 to-amber-500 text-stone-950 font-black text-sm shadow-2xl border-2 border-yellow-200 active:scale-95 transition transform hover:brightness-105"
            >
              <img src="/assets/game/ui/controls/attack_button.png" alt="Interact" className="w-5 h-5" />
              <span>{nearZonePrompt || 'Tương tác [E]'}</span>
            </button>
          </div>
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
