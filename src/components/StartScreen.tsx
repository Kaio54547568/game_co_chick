import React, { useState } from 'react';
import { Gender, PlayerProfile } from '../types/game';
import { soundService } from '../services/sound';
import { ArrowRight, RotateCcw } from 'lucide-react';

interface StartScreenProps {
  existingProfile: PlayerProfile | null;
  onStartNewGame: (name: string, gender: Gender) => void;
  onResumeGame: () => void;
}

export const StartScreen: React.FC<StartScreenProps> = ({ existingProfile, onStartNewGame, onResumeGame }) => {
  const [gender, setGender] = useState<Gender>('male');
  const [name, setName] = useState('Tiểu Thiếu Hiệp');
  const [showForm, setShowForm] = useState(!existingProfile);
  const start = () => {
    soundService.playGong();
    onStartNewGame(name.trim() || 'Tiểu Thiếu Hiệp', gender);
  };

  return (
    <main className="start-screen fixed inset-0 z-50 overflow-y-auto text-white">
      <img src="/assets/game/story/opening-path.png" alt="Con đường dẫn đến ngôi làng" className="fixed inset-0 h-full w-full object-cover" />
      <div className="fixed inset-0 bg-gradient-to-r from-[#07110f]/95 via-[#07110f]/78 to-[#07110f]/25 max-sm:bg-gradient-to-t max-sm:from-[#07110f] max-sm:via-[#07110f]/85 max-sm:to-[#07110f]/20" />
      <div className="relative mx-auto flex min-h-full w-full max-w-6xl items-center px-5 py-12 sm:px-10" style={{ paddingBottom: 'max(3rem, env(safe-area-inset-bottom))' }}>
        <div className="w-full max-w-lg">
          <span className="text-xs font-bold uppercase tracking-[.2em] text-amber-200">Học tiếng Anh qua chuyến đi</span>
          <h1 className="mt-3 text-4xl font-bold leading-tight sm:text-6xl">Global Success<br /><span className="text-amber-300">Wulin</span></h1>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-stone-200 sm:text-base">Đi qua từng vùng đất, gặp gỡ bạn mới và học một chút mỗi ngày.</p>
          {existingProfile && !showForm ? (
            <div className="mt-8 space-y-3">
              <div className="flex items-center gap-3 rounded-2xl border border-white/15 bg-black/40 p-3 backdrop-blur-md">
                <img src={`/assets/game/characters/player/${existingProfile.gender === 'female' ? 'female' : 'male'}_idle.png`} alt="Nhân vật của bạn" className="h-14 w-14 rounded-xl bg-white/10 object-contain" />
                <div><strong className="block">{existingProfile.name}</strong><span className="text-xs text-stone-300">Lớp {existingProfile.selectedGrade || 10} · Bài {parseInt((existingProfile.selectedUnitId || 'g10-u01').split('-u')[1] || '1', 10)}</span></div>
              </div>
              <button onClick={() => { soundService.playGong(); onResumeGame(); }} className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-amber-300 px-5 font-bold text-stone-950 active:scale-[.98]">Chơi tiếp <ArrowRight size={18} /></button>
              <button onClick={() => setShowForm(true)} className="flex min-h-11 items-center gap-2 text-sm text-stone-200"><RotateCcw size={15} /> Chơi lại từ đầu</button>
            </div>
          ) : (
            <div className="mt-7 space-y-4">
              <div>
                <p className="mb-2 text-sm font-semibold text-stone-200">Chọn nhân vật</p>
                <div className="grid w-full grid-cols-2 gap-3">
                  {(['male', 'female'] as Gender[]).map((choice) => (
                    <button key={choice} onClick={() => setGender(choice)} aria-pressed={gender === choice} className={`flex min-h-28 min-w-0 flex-col items-center justify-center rounded-2xl border p-2 text-center backdrop-blur-md transition ${gender === choice ? 'border-amber-300 bg-amber-300/20' : 'border-white/20 bg-black/35'}`}>
                      <img src={`/assets/game/characters/player/${choice}_idle.png`} alt="" className="h-20 w-16 object-contain" />
                      <span className="text-sm font-semibold">{choice === 'male' ? 'Nam Tiêu Dao' : 'Nữ Linh Lung'}</span>
                    </button>
                  ))}
                </div>
              </div>
              <label className="block text-sm font-semibold">Tên của bạn
                <input value={name} onChange={(e) => setName(e.target.value)} maxLength={20} className="mt-2 min-h-12 w-full rounded-xl border border-white/25 bg-black/45 px-4 text-base text-white outline-none focus:border-amber-300" placeholder="Nhập tên" />
              </label>
              <button onClick={start} className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-amber-300 px-5 font-bold text-stone-950 active:scale-[.98]">Bắt đầu <ArrowRight size={18} /></button>
              {existingProfile && <button onClick={() => setShowForm(false)} className="min-h-10 text-sm text-stone-200">Quay lại</button>}
            </div>
          )}
        </div>
      </div>
    </main>
  );
};
