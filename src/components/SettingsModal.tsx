import React, { useState } from 'react';
import { soundService } from '../services/sound';
import { StorageService } from '../services/storage';
import { Settings, Volume2, VolumeX, RotateCcw, HelpCircle, X, Check } from 'lucide-react';

interface SettingsModalProps {
  onResetProgress: () => void;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ onResetProgress, onClose }) => {
  const [muted, setMuted] = useState(soundService.isMuted);
  const [confirmReset, setConfirmReset] = useState(false);

  const toggleSound = () => {
    soundService.isMuted = !soundService.isMuted;
    setMuted(soundService.isMuted);
    if (!soundService.isMuted) {
      soundService.playClick();
    }
  };

  const handleReset = () => {
    StorageService.clearProfile();
    onResetProgress();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md bg-stone-900/95 border-2 border-amber-600/70 rounded-2xl shadow-2xl p-5 sm:p-6 text-stone-100 flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-stone-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-stone-950 border border-amber-500/50 flex items-center justify-center text-amber-400">
              <Settings className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-amber-200 text-base font-wuxia">
              Cài Đặt Hệ Thống
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg text-stone-400 hover:text-stone-100 hover:bg-stone-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Settings options */}
        <div className="space-y-3">
          {/* Sound Toggle */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-stone-950/70 border border-stone-800">
            <div className="flex items-center gap-2.5">
              {muted ? (
                <VolumeX className="w-5 h-5 text-red-400" />
              ) : (
                <Volume2 className="w-5 h-5 text-amber-400" />
              )}
              <div>
                <span className="text-xs font-bold text-stone-200 block">Âm Thanh Hiệu Ứng (SFX)</span>
                <span className="text-[10px] text-stone-400">Tiếng kiếm chém, trúng đòn, chuông đồng</span>
              </div>
            </div>

            <button
              onClick={toggleSound}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                muted
                  ? 'bg-stone-800 text-stone-400 border border-stone-700'
                  : 'bg-amber-600 text-stone-950'
              }`}
            >
              {muted ? 'Đang Tắt' : 'Đang Bật'}
            </button>
          </div>

          {/* Guide / Controls */}
          <div className="p-3 rounded-xl bg-stone-950/70 border border-stone-800 space-y-1.5 text-xs">
            <span className="font-bold text-amber-300 flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
              Hướng Dẫn Thao Tác:
            </span>
            <ul className="text-stone-300 text-[11px] space-y-1 list-disc list-inside">
              <li><b>Máy tính:</b> Phím WASD hoặc Mũi tên để di chuyển, phím <b>[E]</b> để tương tác.</li>
              <li><b>Điện thoại:</b> Kéo Joystick góc trái để di chuyển, bấm nút <b>[Tương Tác]</b> góc dưới.</li>
              <li><b>Chiến đấu:</b> Trả lời đúng trong vòng 3 giây để kích hoạt <b>Bạo Kích (Critical)</b>!</li>
              <li><b>Cổng Boss:</b> Tự động mở khi tiến độ Unit đạt từ <b>70%</b> trở lên.</li>
            </ul>
          </div>

          {/* Reset Save Progress */}
          <div className="pt-2 border-t border-stone-800">
            {!confirmReset ? (
              <button
                onClick={() => setConfirmReset(true)}
                className="w-full py-2.5 px-4 rounded-xl bg-red-950/40 hover:bg-red-900/60 border border-red-800/60 text-red-300 text-xs font-bold flex items-center justify-center gap-2 transition"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Xóa Tiến Độ &amp; Chơi Lại Từ Đầu</span>
              </button>
            ) : (
              <div className="bg-red-950/70 border border-red-600 rounded-xl p-3 text-center space-y-2">
                <span className="text-xs text-red-200 font-bold block">
                  Xác nhận xóa toàn bộ tiến độ chơi thử?
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={handleReset}
                    className="flex-1 py-1.5 px-3 rounded-lg bg-red-600 hover:bg-red-500 text-stone-950 font-bold text-xs"
                  >
                    Xác Nhận Xóa
                  </button>
                  <button
                    onClick={() => setConfirmReset(false)}
                    className="flex-1 py-1.5 px-3 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-semibold"
                  >
                    Hủy
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
