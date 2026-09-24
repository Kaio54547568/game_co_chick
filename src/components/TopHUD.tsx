import React from 'react';
import { PlayerProfile, Quest } from '../types/game';
import { Sparkles, ScrollText, AlertCircle } from 'lucide-react';

interface TopHUDProps {
  profile: PlayerProfile;
  currentQuest: Quest | undefined;
  onOpenQuestModal: () => void;
}

export const TopHUD: React.FC<TopHUDProps> = ({ profile, currentQuest, onOpenQuestModal }) => {
  const hpPercent = Math.min(100, Math.max(0, (profile.stats.hp / profile.stats.maxHp) * 100));
  const xpPercent = Math.min(100, Math.max(0, (profile.stats.xp / profile.stats.xpToNextLevel) * 100));

  return (
    <div className="absolute top-0 left-0 right-0 z-40 p-2 sm:p-4 pointer-events-none flex flex-col sm:flex-row items-start justify-between gap-2">
      {/* Left: Player Profile & Stats */}
      <div className="pointer-events-auto bg-stone-900/90 border border-amber-600/60 rounded-xl p-2 sm:p-3 shadow-xl backdrop-blur-md flex items-center gap-3">
        {/* Avatar */}
        <div className="relative">
          <img
            src={
              profile.gender === 'female'
                ? '/assets/game/characters/player/female_idle.png'
                : '/assets/game/characters/player/male_idle.png'
            }
            alt="Avatar"
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg bg-stone-950 border border-amber-500/70 object-contain p-0.5"
          />
          <div className="absolute -bottom-1 -right-1 bg-amber-600 text-stone-950 font-black text-[10px] px-1.5 py-0.2 rounded-full border border-amber-300">
            Lv.{profile.stats.level}
          </div>
        </div>

        {/* Name, HP, XP, Cong Luc */}
        <div className="flex flex-col min-w-[140px] sm:min-w-[180px]">
          <div className="flex items-center justify-between gap-2">
            <span className="font-bold text-amber-200 text-xs sm:text-sm truncate max-w-[110px]">
              {profile.name}
            </span>
            {/* Cong Luc Badge */}
            <div className="flex items-center gap-1 bg-yellow-950/60 border border-yellow-500/40 px-1.5 py-0.5 rounded text-[11px] text-amber-300 font-bold">
              <img src="/assets/game/ui/icons/power.png" alt="Lực" className="w-3.5 h-3.5" />
              <span>{profile.stats.congLuc}</span>
            </div>
          </div>

          {/* HP Bar */}
          <div className="w-full mt-1">
            <div className="flex justify-between text-[10px] text-red-300 font-semibold mb-0.5">
              <span className="flex items-center gap-1">
                <img src="/assets/game/ui/icons/heart.png" alt="HP" className="w-3 h-3" />
                Sinh Lực
              </span>
              <span>
                {profile.stats.hp}/{profile.stats.maxHp}
              </span>
            </div>
            <div className="w-full h-2 bg-stone-950 rounded-full overflow-hidden border border-red-900/60">
              <div
                className="h-full bg-gradient-to-r from-red-600 to-rose-400 transition-all duration-300 rounded-full"
                style={{ width: `${hpPercent}%` }}
              />
            </div>
          </div>

          {/* XP Bar */}
          <div className="w-full mt-1">
            <div className="flex justify-between text-[10px] text-amber-300 font-semibold mb-0.5">
              <span className="flex items-center gap-1">
                <img src="/assets/game/ui/icons/xp.png" alt="XP" className="w-3 h-3" />
                Tu Vi (XP)
              </span>
              <span>
                {profile.stats.xp}/{profile.stats.xpToNextLevel}
              </span>
            </div>
            <div className="w-full h-1.5 bg-stone-950 rounded-full overflow-hidden border border-amber-900/50">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-yellow-300 transition-all duration-300 rounded-full"
                style={{ width: `${xpPercent}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Center/Right: Unit Progress & Active Quest */}
      <div className="pointer-events-auto flex flex-col sm:items-end gap-1.5 max-w-sm">
        {/* Unit Progress */}
        <div className="bg-stone-900/90 border border-amber-600/50 rounded-xl px-3 py-1.5 shadow-lg backdrop-blur-md flex items-center gap-3">
          <span className="text-[11px] font-bold text-stone-300 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Tiến độ Unit 1:
          </span>
          <div className="w-24 sm:w-32 h-2 bg-stone-950 rounded-full overflow-hidden border border-amber-800/40">
            <div
              className={`h-full transition-all duration-500 rounded-full ${
                profile.unitProgress >= 70
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-300 animate-pulse'
                  : 'bg-gradient-to-r from-amber-600 to-yellow-400'
              }`}
              style={{ width: `${profile.unitProgress}%` }}
            />
          </div>
          <span
            className={`text-xs font-black ${
              profile.unitProgress >= 70 ? 'text-emerald-400' : 'text-amber-400'
            }`}
          >
            {profile.unitProgress}%
          </span>
          {profile.unitProgress >= 70 && (
            <span className="hidden sm:inline-block text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-950/80 border border-emerald-500 text-emerald-300">
              Cổng Boss Đã Mở!
            </span>
          )}
        </div>

        {/* Current Quest Tracker */}
        {currentQuest && (
          <div
            onClick={onOpenQuestModal}
            className="cursor-pointer bg-stone-900/90 hover:bg-stone-850 border border-amber-600/40 hover:border-amber-400 rounded-xl p-2.5 shadow-lg backdrop-blur-md flex items-start gap-2.5 transition group"
          >
            <div className="p-1 rounded bg-amber-500/20 text-amber-400 mt-0.5">
              <ScrollText className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">
                  Nhiệm Vụ #{currentQuest.step}
                </span>
                <span className="text-[10px] text-amber-200/70 group-hover:text-amber-200">
                  Chi tiết &gt;
                </span>
              </div>
              <span className="text-xs font-bold text-stone-100">{currentQuest.title}</span>
              <p className="text-[11px] text-stone-300 line-clamp-1">{currentQuest.objective}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
