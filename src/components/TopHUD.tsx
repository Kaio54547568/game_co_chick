import React from 'react';
import { PlayerProfile, Quest } from '../types/game';
import { Heart, MapPin } from 'lucide-react';
import { questTitle } from '../utils/questCopy';

interface TopHUDProps {
  profile: PlayerProfile;
  currentQuest: Quest | undefined;
  onOpenQuestModal: () => void;
  onOpenUnitSelect?: () => void;
}

export const TopHUD: React.FC<TopHUDProps> = ({ profile, currentQuest, onOpenQuestModal, onOpenUnitSelect }) => {
  const hp = Math.min(100, Math.max(0, (profile.stats.hp / profile.stats.maxHp) * 100));
  const unit = parseInt((profile.selectedUnitId || 'g10-u01').split('-u')[1] || '1', 10);
  return (
    <header className="game-hud pointer-events-none absolute left-0 right-0 top-0 z-40 flex items-start justify-between gap-2 px-3 sm:px-5">
      <div className="pointer-events-auto flex min-w-0 max-w-[45vw] items-center gap-2 rounded-2xl border border-white/15 bg-stone-950/75 p-2 shadow-lg backdrop-blur-md sm:max-w-none">
        <img src={`/assets/game/characters/player/${profile.gender === 'female' ? 'female' : 'male'}_idle.png`} alt="" className="h-10 w-10 rounded-xl bg-white/10 object-contain sm:h-12 sm:w-12" />
        <div className="min-w-0 w-24 sm:w-36">
          <span className="block truncate text-xs font-semibold text-white sm:text-sm">{profile.name} <span className="text-amber-200">· {profile.stats.level}</span></span>
          <div className="mt-1 flex items-center gap-1" aria-label={`Máu ${profile.stats.hp} trên ${profile.stats.maxHp}`}>
            <Heart size={12} className="shrink-0 fill-rose-400 text-rose-400" />
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/20"><div className="h-full rounded-full bg-rose-400" style={{ width: `${hp}%` }} /></div>
          </div>
        </div>
      </div>
      <div className="pointer-events-auto flex min-w-0 flex-col items-end gap-2">
        <button onClick={onOpenUnitSelect} className="min-h-10 rounded-full border border-white/15 bg-stone-950/75 px-3 text-xs font-semibold text-white shadow-lg backdrop-blur-md sm:text-sm">Lớp {profile.selectedGrade || 10} · Bài {unit} <span className="text-amber-200">{Math.round(profile.unitProgress)}%</span> ▾</button>
        {currentQuest && <button onClick={onOpenQuestModal} className="hidden max-w-56 items-center gap-2 rounded-full border border-white/15 bg-stone-950/75 px-3 py-2 text-left text-xs text-white shadow-lg backdrop-blur-md sm:flex"><MapPin size={14} className="shrink-0 text-amber-300" /><span className="truncate">{questTitle(currentQuest)}</span></button>}
      </div>
    </header>
  );
};
