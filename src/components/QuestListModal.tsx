import React from 'react';
import { Quest, PlayerProfile } from '../types/game';
import { ScrollText, CheckCircle2, Lock, Sparkles, X, ChevronRight } from 'lucide-react';
import { questTitle, questAction } from '../utils/questCopy';

interface QuestListModalProps {
  profile: PlayerProfile;
  onClose: () => void;
}

export const QuestListModal: React.FC<QuestListModalProps> = ({ profile, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-stone-900/95 border-2 border-amber-600/70 rounded-2xl shadow-2xl flex flex-col max-h-[85vh] overflow-hidden text-stone-100">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-stone-800 flex items-center justify-between bg-stone-950/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-950/80 border border-amber-500/60 flex items-center justify-center text-amber-400">
              <ScrollText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-amber-200 font-wuxia">
                Việc cần làm
              </h2>
              <p className="text-xs text-stone-400">
                Học đến 70% để mở trận cuối.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-100 hover:bg-stone-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Overview Bar */}
        <div className="p-4 bg-stone-950/70 border-b border-stone-800">
          <div className="flex justify-between items-center text-xs font-bold mb-1.5">
            <span className="text-amber-300 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Đã học
            </span>
            <span
              className={`font-black text-sm ${
                profile.unitProgress >= 70 ? 'text-emerald-400' : 'text-amber-400'
              }`}
            >
              {profile.unitProgress}% / 100%
            </span>
          </div>

          <div className="w-full h-3 bg-stone-900 rounded-full overflow-hidden border border-stone-700">
            <div
              className={`h-full transition-all duration-500 rounded-full ${
                profile.unitProgress >= 70
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-300'
                  : 'bg-gradient-to-r from-amber-600 to-yellow-400'
              }`}
              style={{ width: `${profile.unitProgress}%` }}
            />
          </div>

          <div className="mt-2 text-[11px] text-stone-400 flex items-center justify-between">
            <span>Cứ đi từng bước nhé</span>
            {profile.unitProgress >= 70 ? (
              <span className="text-emerald-400 font-bold">✓ Trận cuối đã mở</span>
            ) : (
              <span className="text-amber-400">Còn {70 - profile.unitProgress}%</span>
            )}
          </div>
        </div>

        {/* Quest List */}
        <div className="p-4 overflow-y-auto space-y-3 flex-1">
          {profile.quests.map((quest) => {
            const isCompleted = quest.status === 'completed';
            const isCurrent = quest.status === 'available' || quest.status === 'in_progress';
            const isLocked = quest.status === 'locked';

            return (
              <div
                key={quest.id}
                className={`p-3.5 rounded-xl border transition flex flex-col gap-2 ${
                  isCompleted
                    ? 'bg-emerald-950/20 border-emerald-800/40 text-stone-300'
                    : isCurrent
                    ? 'bg-amber-950/30 border-amber-500/60 shadow-wuxia-gold'
                    : 'bg-stone-950/40 border-stone-800/60 text-stone-500 opacity-60'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {isCompleted ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : isLocked ? (
                      <Lock className="w-4 h-4 text-stone-600" />
                    ) : (
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
                    )}
                    <span
                      className={`text-xs font-bold ${
                        isCompleted
                          ? 'text-emerald-400'
                          : isCurrent
                          ? 'text-amber-400'
                          : 'text-stone-500'
                      }`}
                    >
                      Bước {quest.step}: {questTitle(quest)}
                    </span>
                  </div>

                  <span className="text-[11px] px-2 py-0.5 rounded bg-stone-900 border border-stone-800 font-semibold text-stone-300">
                    +{quest.unitProgressGain}%
                  </span>
                </div>

                <p className="text-xs sm:text-sm font-semibold text-stone-200">
                  {questAction(quest)}
                </p>

                <div className="flex items-center justify-between text-[11px] text-stone-400 border-t border-stone-800/60 pt-2">
                  <span>Nơi đến: <b className="text-stone-300">{quest.location}</b></span>
                  <span>+{quest.rewards.xp} điểm</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
