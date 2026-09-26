import React, { useState } from 'react';
import { UnitContentService, UnitMetaSummary } from '../services/unitContentService';
import { PlayerProfile, UnitProgressState } from '../types/game';
import { soundService } from '../services/sound';
import {
  X,
  BookOpen,
  Lock,
  Unlock,
  CheckCircle2,
  ChevronRight,
  Flame,
  Award,
  Sparkles,
} from 'lucide-react';

interface UnitSelectModalProps {
  profile: PlayerProfile;
  isOpen: boolean;
  onClose: () => void;
  onSelectUnit: (unitId: string, grade: 10 | 11 | 12) => void;
}

export const UnitSelectModal: React.FC<UnitSelectModalProps> = ({
  profile,
  isOpen,
  onClose,
  onSelectUnit,
}) => {
  const [selectedGradeTab, setSelectedGradeTab] = useState<10 | 11 | 12>(
    (profile.selectedGrade as 10 | 11 | 12) || 10
  );

  if (!isOpen) return null;

  const units = UnitContentService.getAllUnits(selectedGradeTab);
  const currentUnitId = profile.selectedUnitId || 'g10-u01';

  const handleUnitClick = (unit: UnitMetaSummary, isUnlocked: boolean) => {
    if (!isUnlocked) {
      soundService.playError();
      return;
    }
    soundService.playClick();
    onSelectUnit(unit.unitId, unit.grade);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn select-none">
      <div className="relative w-full max-w-5xl bg-stone-900/95 border-2 border-amber-500/80 rounded-2xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden text-stone-100">
        {/* Top Header */}
        <div className="p-4 border-b border-stone-800 flex items-center justify-between bg-stone-950/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/50 flex items-center justify-center text-amber-300">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-amber-200 font-wuxia">
                Bản Đồ Giang Hồ - 30 Unit Global Success
              </h2>
              <p className="text-xs text-stone-400">
                Lựa chọn Unit (Lớp 10, 11, 12) để rèn luyện võ học. Cần đạt tối thiểu 70% để giải khai Unit kế tiếp!
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              soundService.playClick();
              onClose();
            }}
            className="p-1.5 rounded-lg bg-stone-800/80 hover:bg-stone-700 text-stone-400 hover:text-stone-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Grade Selection Tabs */}
        <div className="flex border-b border-stone-800 bg-stone-950/40 px-4 pt-2 gap-3">
          <button
            onClick={() => {
              soundService.playClick();
              setSelectedGradeTab(10);
            }}
            className={`px-5 py-2.5 rounded-t-xl font-bold text-xs sm:text-sm tracking-wide transition flex items-center gap-2 border-t-2 border-x-2 ${
              selectedGradeTab === 10
                ? 'bg-stone-900 border-amber-500 text-amber-300 shadow-wuxia-gold'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <Flame className="w-4 h-4 text-orange-400" />
            <span>Lớp 10 (10 Units)</span>
          </button>

          <button
            onClick={() => {
              soundService.playClick();
              setSelectedGradeTab(11);
            }}
            className={`px-5 py-2.5 rounded-t-xl font-bold text-xs sm:text-sm tracking-wide transition flex items-center gap-2 border-t-2 border-x-2 ${
              selectedGradeTab === 11
                ? 'bg-stone-900 border-amber-500 text-amber-300 shadow-wuxia-gold'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>Lớp 11 (10 Units)</span>
          </button>

          <button
            onClick={() => {
              soundService.playClick();
              setSelectedGradeTab(12);
            }}
            className={`px-5 py-2.5 rounded-t-xl font-bold text-xs sm:text-sm tracking-wide transition flex items-center gap-2 border-t-2 border-x-2 ${
              selectedGradeTab === 12
                ? 'bg-stone-900 border-amber-500 text-amber-300 shadow-wuxia-gold'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <Award className="w-4 h-4 text-purple-400" />
            <span>Lớp 12 (10 Units)</span>
          </button>
        </div>

        {/* Units Grid */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {units.map((unit) => {
            const unitState: UnitProgressState | undefined =
              profile.unitStates?.[unit.unitId];
            const isUnlocked = unitState ? unitState.isUnlocked : unit.unitNumber === 1;
            const progress = unitState ? unitState.progress : 0;
            const isCompleted = unitState ? unitState.isCompleted || unitState.bossDefeated : false;
            const isCurrent = currentUnitId === unit.unitId;

            return (
              <div
                key={unit.unitId}
                onClick={() => handleUnitClick(unit, isUnlocked)}
                className={`relative rounded-xl border overflow-hidden transition-all flex flex-col justify-between group ${
                  isCurrent
                    ? 'border-amber-400 bg-amber-950/30 shadow-wuxia-gold ring-1 ring-amber-400'
                    : isUnlocked
                    ? 'border-stone-700 hover:border-amber-500/70 bg-stone-950/60 hover:bg-stone-950/90 cursor-pointer hover:scale-[1.02]'
                    : 'border-stone-800 bg-stone-950/40 opacity-60 cursor-not-allowed'
                }`}
              >
                {/* Unit Card Header & Art */}
                <div className="relative h-32 w-full overflow-hidden bg-stone-950">
                  <img
                    src={unit.card}
                    alt={unit.title}
                    onError={(e) => {
                      // Fallback if specific unit card fails
                      (e.target as HTMLImageElement).src = '/assets/game/combat/courtyard_arena.jpg';
                    }}
                    className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${
                      !isUnlocked ? 'filter grayscale contrast-75' : ''
                    }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />

                  {/* Badge top-left */}
                  <div className="absolute top-2 left-2 flex items-center gap-1.5">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-stone-900/90 border border-amber-500/50 text-amber-300">
                      Unit {unit.unitNumber}
                    </span>
                    {isCurrent && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500 text-stone-950">
                        Đang Chơi
                      </span>
                    )}
                  </div>

                  {/* Badge top-right: Status */}
                  <div className="absolute top-2 right-2">
                    {isCompleted ? (
                      <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-950/90 border border-emerald-500 text-emerald-300">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                        Đã Bình Định
                      </span>
                    ) : isUnlocked ? (
                      <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-stone-900/90 border border-stone-600 text-stone-300">
                        <Unlock className="w-3 h-3 text-amber-400" />
                        {Math.round(progress)}%
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-950/90 border border-red-800 text-red-300">
                        <Lock className="w-3 h-3 text-red-400" />
                        Khóa (70%)
                      </span>
                    )}
                  </div>

                  {/* Boss Info overlay */}
                  <div className="absolute bottom-1.5 left-2 right-2 flex items-center justify-between text-[11px] text-stone-300 font-semibold drop-shadow">
                    <span className="truncate max-w-[140px]">Boss: {unit.bossName}</span>
                  </div>
                </div>

                {/* Unit Details */}
                <div className="p-3.5 flex flex-col justify-between flex-1 gap-2">
                  <div>
                    <h3 className="text-sm font-black text-amber-100 group-hover:text-amber-300 transition">
                      {unit.title}
                    </h3>
                    <p className="text-[11px] text-stone-400 line-clamp-2 mt-0.5">
                      {unit.topic}
                    </p>
                  </div>

                  {/* Progress bar */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] font-bold text-stone-400">
                      <span>Tiến độ Unit</span>
                      <span>{Math.round(progress)}% / 70% mở khóa</span>
                    </div>
                    <div className="w-full h-1.5 bg-stone-900 rounded-full overflow-hidden border border-stone-800">
                      <div
                        className={`h-full transition-all duration-300 ${
                          progress >= 70 ? 'bg-emerald-500' : 'bg-amber-500'
                        }`}
                        style={{ width: `${Math.min(100, progress)}%` }}
                      />
                    </div>
                  </div>

                  {/* Bottom Action Button */}
                  <div className="pt-1">
                    {isUnlocked ? (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleUnitClick(unit, true);
                        }}
                        className={`w-full py-1.5 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                          isCurrent
                            ? 'bg-amber-500/20 border border-amber-500/50 text-amber-300 hover:bg-amber-500/30'
                            : 'bg-stone-800 hover:bg-amber-600 hover:text-stone-950 text-stone-200'
                        }`}
                      >
                        <span>{isCurrent ? 'Tiếp Tục Hành Trình' : 'Chọn Chinh Phục'}</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    ) : (
                      <div className="w-full py-1.5 rounded-lg text-xs font-bold bg-stone-900 text-stone-500 border border-stone-800 flex items-center justify-center gap-1.5">
                        <Lock className="w-3.5 h-3.5" />
                        <span>Cần hoàn thành 70% Unit trước</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal Footer */}
        <div className="p-3 bg-stone-950/80 border-t border-stone-800 flex items-center justify-between text-xs text-stone-400 px-6">
          <span>
            Đang chơi:{' '}
            <b className="text-amber-300">
              Lớp {profile.selectedGrade || 10} - {units.find((u) => u.unitId === currentUnitId)?.title || 'Gia Đình & Lối Sống'}
            </b>
          </span>
          <span className="text-[11px] italic">
            Người chơi có thể tự do quay lại các Unit đã mở khóa để ôn tập và nâng cao Tu Vi!
          </span>
        </div>
      </div>
    </div>
  );
};
