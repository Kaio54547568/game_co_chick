import React, { useState } from 'react';
import { Gender, PlayerProfile } from '../types/game';
import { soundService } from '../services/sound';
import { Sparkles, Shield, Sword, Play, RotateCcw } from 'lucide-react';

interface StartScreenProps {
  existingProfile: PlayerProfile | null;
  onStartNewGame: (name: string, gender: Gender) => void;
  onResumeGame: () => void;
}

export const StartScreen: React.FC<StartScreenProps> = ({
  existingProfile,
  onStartNewGame,
  onResumeGame,
}) => {
  const [selectedGender, setSelectedGender] = useState<Gender>('male');
  const [playerName, setPlayerName] = useState('Tiểu Thiếu Hiệp');
  const [showNewGameForm, setShowNewGameForm] = useState(!existingProfile);

  const handleStart = () => {
    soundService.playGong();
    onStartNewGame(playerName, selectedGender);
  };

  const handleResume = () => {
    soundService.playGong();
    onResumeGame();
  };

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/90 p-4 select-none overflow-y-auto">
      {/* Background decoration with arena art */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30 filter blur-sm"
        style={{ backgroundImage: 'url(/assets/game/combat/courtyard_arena.jpg)' }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/60" />

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-xl bg-stone-900/90 border-2 border-amber-600/70 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-md text-stone-100 flex flex-col items-center">
        {/* Title */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            Bản Thử Nghiệm • 30 Unit Võ Lâm
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-600 font-wuxia drop-shadow-md">
            Phượng Chick
          </h1>
          <h2 className="text-xl sm:text-3xl font-bold text-amber-300 font-wuxia mt-0.5">
            English Wulin
          </h2>
          <p className="text-xs sm:text-sm text-stone-400 italic mt-1">
            "Tam Niên Anh Ngữ – Nhất Thống Võ Lâm"
          </p>
        </div>

        {/* Existing save option */}
        {existingProfile && !showNewGameForm ? (
          <div className="w-full flex flex-col items-center gap-4 py-4">
            <div className="w-full bg-stone-800/80 border border-amber-500/40 rounded-xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={
                    existingProfile.gender === 'female'
                      ? '/assets/game/characters/player/female_idle.png'
                      : '/assets/game/characters/player/male_idle.png'
                  }
                  alt="Avatar"
                  className="w-14 h-14 rounded-lg bg-stone-900 border border-amber-500/50 object-contain p-1"
                />
                <div>
                  <h3 className="font-bold text-amber-200 text-lg">{existingProfile.name}</h3>
                  <div className="flex items-center gap-3 text-xs text-stone-400 mt-0.5">
                    <span>Cấp độ: <b className="text-amber-400">{existingProfile.stats.level}</b></span>
                    <span>Công Lực: <b className="text-yellow-400">{existingProfile.stats.congLuc}</b></span>
                    <span>Tiến độ Unit: <b className="text-emerald-400">{existingProfile.unitProgress}%</b></span>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={handleResume}
              className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-500 hover:to-yellow-500 text-stone-900 font-bold text-lg shadow-lg flex items-center justify-center gap-2 transform active:scale-98 transition duration-150"
            >
              <Play className="w-5 h-5 fill-current" />
              Tiếp Tục Hành Trình
            </button>

            <button
              onClick={() => setShowNewGameForm(true)}
              className="text-xs text-stone-400 hover:text-amber-300 underline flex items-center gap-1.5 transition"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Tạo nhân vật mới (Chơi lại từ đầu)
            </button>
          </div>
        ) : (
          /* Character creation */
          <div className="w-full flex flex-col items-center gap-5">
            <p className="text-xs sm:text-sm text-stone-300 text-center max-w-md">
              Vô Ngôn Ma Giáo đang mưu đồ đảo lộn trật tự văn phạm và xóa sạch tri thức tiếng Anh. Hãy chọn diện mạo thiếu hiệp và bắt đầu bước vào giang hồ!
            </p>

            {/* Avatar choice */}
            <div className="grid grid-cols-2 gap-4 w-full">
              {/* Male option */}
              <div
                onClick={() => {
                  setSelectedGender('male');
                  soundService.playClick();
                }}
                className={`relative flex flex-col items-center p-3 rounded-xl border-2 cursor-pointer transition-all ${
                  selectedGender === 'male'
                    ? 'border-amber-400 bg-amber-950/40 shadow-wuxia-gold'
                    : 'border-stone-700 bg-stone-800/50 hover:border-stone-500'
                }`}
              >
                <div className="w-24 h-28 flex items-center justify-center overflow-hidden">
                  <img
                    src="/assets/game/characters/player/male_idle.png"
                    alt="Nam Tiêu Dao"
                    className="h-full object-contain filter drop-shadow"
                  />
                </div>
                <span className="font-bold text-sm mt-2 text-amber-200">Nam Tiêu Dao</span>
                <span className="text-[11px] text-stone-400">Kiếm khí cương trực</span>
              </div>

              {/* Female option */}
              <div
                onClick={() => {
                  setSelectedGender('female');
                  soundService.playClick();
                }}
                className={`relative flex flex-col items-center p-3 rounded-xl border-2 cursor-pointer transition-all ${
                  selectedGender === 'female'
                    ? 'border-amber-400 bg-amber-950/40 shadow-wuxia-gold'
                    : 'border-stone-700 bg-stone-800/50 hover:border-stone-500'
                }`}
              >
                <div className="w-24 h-28 flex items-center justify-center overflow-hidden">
                  <img
                    src="/assets/game/characters/player/female_idle.png"
                    alt="Nữ Linh Lung"
                    className="h-full object-contain filter drop-shadow"
                  />
                </div>
                <span className="font-bold text-sm mt-2 text-amber-200">Nữ Linh Lung</span>
                <span className="text-[11px] text-stone-400">Tâm trí thông tuệ</span>
              </div>
            </div>

            {/* Name input */}
            <div className="w-full">
              <label className="block text-xs font-semibold text-amber-300 mb-1">
                Danh Xưng Thiếu Hiệp
              </label>
              <input
                type="text"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                maxLength={20}
                className="w-full px-4 py-2.5 rounded-lg bg-stone-950/80 border border-stone-600 focus:border-amber-500 focus:outline-none text-stone-100 text-sm font-semibold"
                placeholder="Nhập tên nhân vật..."
              />
            </div>

            {/* Start Button */}
            <button
              onClick={handleStart}
              className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-500 hover:to-yellow-500 text-stone-900 font-bold text-lg shadow-lg flex items-center justify-center gap-2 transform active:scale-98 transition duration-150 mt-1"
            >
              <Play className="w-5 h-5 fill-current" />
              Bước Vào Giang Hồ
            </button>

            {existingProfile && (
              <button
                onClick={() => setShowNewGameForm(false)}
                className="text-xs text-stone-400 hover:text-stone-200 transition"
              >
                Quay lại tài khoản cũ
              </button>
            )}
          </div>
        )}

        {/* Note */}
        <div className="mt-6 text-center text-[11px] text-stone-500 border-t border-stone-800 pt-3 w-full">
          Phát triển bởi đội ngũ Phượng Chick English Wulin • Lưu tiến độ tự động trên trình duyệt
        </div>
      </div>
    </div>
  );
};
