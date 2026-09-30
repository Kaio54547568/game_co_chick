import React from 'react';
import { BookOpen, Backpack, ListTodo, Settings2, Hand, Repeat2 } from 'lucide-react';
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

export const BottomNav: React.FC<BottomNavProps> = ({ onOpenQuests, onOpenVocabulary, onOpenInventory, onOpenSettings, isNearZone, nearZonePrompt, candidates = [] }) => {
  const action = () => { soundService.playClick(); eventBus.emit('interactAction'); };
  const buttons = [
    { label: 'Việc cần làm', icon: ListTodo, onClick: onOpenQuests },
    { label: 'Học từ', icon: BookOpen, onClick: onOpenVocabulary },
    { label: 'Đồ của bạn', icon: Backpack, onClick: onOpenInventory },
    { label: 'Cài đặt', icon: Settings2, onClick: onOpenSettings },
  ];
  return (
    <div className="game-controls pointer-events-none absolute bottom-0 right-0 z-40 flex flex-col items-end gap-2 p-3 sm:p-5">
      {isNearZone && <div className="pointer-events-auto flex max-w-[min(55vw,22rem)] flex-col items-end gap-2">
        {candidates.length > 1 && <div className="flex max-w-full items-center gap-1 overflow-x-auto rounded-full border border-white/15 bg-stone-950/85 p-1 backdrop-blur-md">
          {candidates.map(c => <button key={c.id} onClick={() => eventBus.emit('selectInteractiveZone', c.id)} className={`min-h-9 shrink-0 rounded-full px-3 text-xs ${c.isSelected ? 'bg-amber-300 font-bold text-stone-950' : 'text-white'}`}>{c.name}</button>)}
          <button aria-label="Đổi chỗ chọn" onClick={() => eventBus.emit('cycleInteractiveZone')} className="min-h-9 shrink-0 px-2 text-white"><Repeat2 size={16} /></button>
        </div>}
        <button onClick={action} className="flex min-h-12 items-center gap-2 rounded-full bg-amber-300 px-4 font-bold text-stone-950 shadow-xl active:scale-95"><Hand size={18} /> <span className="max-w-36 truncate">{nearZonePrompt || 'Nói chuyện'}</span></button>
      </div>}
      <nav aria-label="Công cụ" className="pointer-events-auto grid grid-cols-4 gap-1 rounded-2xl border border-white/15 bg-stone-950/78 p-1.5 shadow-xl backdrop-blur-md">
        {buttons.map(({ label, icon: Icon, onClick }) => <button key={label} onClick={() => { soundService.playClick(); onClick(); }} title={label} aria-label={label} className="flex min-h-11 min-w-11 flex-col items-center justify-center rounded-xl text-stone-100 hover:bg-white/10 active:scale-95 sm:min-w-16"><Icon size={20} /><span className="hidden text-[10px] sm:block">{label}</span></button>)}
      </nav>
    </div>
  );
};
