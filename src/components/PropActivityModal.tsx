import React, { useState, useEffect } from 'react';
import {
  PropActivityData,
  PlayerProfile,
} from '../types/game';
import { PropActivityService, PropCategoryMeta } from '../services/propActivityService';
import { soundService } from '../services/sound';
import { speechService } from '../services/speechService';
import {
  X,
  Volume2,
  CheckCircle2,
  XCircle,
  Sparkles,
  Award,
  RotateCcw,
  ArrowRight,
  BookOpen,
} from 'lucide-react';

interface PropActivityModalProps {
  activity: PropActivityData | null;
  profile: PlayerProfile;
  isOpen: boolean;
  onClose: () => void;
  onComplete: (activity: PropActivityData) => void;
}

export const PropActivityModal: React.FC<PropActivityModalProps> = ({
  activity,
  profile,
  isOpen,
  onClose,
  onComplete,
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);

  const isAlreadyCompleted = activity
    ? PropActivityService.isPropCompleted(profile, activity.unitId, activity.propId)
    : false;

  // Reset trạng thái khi mở modal hoặc đổi hoạt động
  useEffect(() => {
    if (isOpen && activity) {
      setSelectedOption(null);
      setIsAnswered(false);
      setIsCorrect(false);
      setIsAudioPlaying(false);
    } else {
      speechService.stop();
      setIsAudioPlaying(false);
    }
  }, [isOpen, activity]);

  // Dọn dẹp audio khi unmount
  useEffect(() => {
    return () => {
      speechService.stop();
    };
  }, []);

  // Xử lý phím tắt PC: 1, 2, 3, 4 để chọn đáp án; Enter để gửi; Esc để thoát
  useEffect(() => {
    if (!isOpen || !activity) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }

      if (!isAnswered) {
        const keyNum = parseInt(e.key, 10);
        if (keyNum >= 1 && keyNum <= activity.question.options.length) {
          const opt = activity.question.options[keyNum - 1];
          setSelectedOption(opt);
          soundService.playHit();
        } else if (e.key === 'Enter' && selectedOption) {
          handleSubmitAnswer();
        }
      } else {
        if (e.key === 'Enter') {
          if (isCorrect) {
            handleConfirmFinish();
          } else {
            handleRetry();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, activity, isAnswered, selectedOption, isCorrect]);

  if (!isOpen || !activity) return null;

  const meta: PropCategoryMeta = PropActivityService.getCategoryMeta(activity.category);
  const options = activity.question.options;

  const handleSelectOption = (opt: string) => {
    if (isAnswered) return;
    soundService.playHit();
    setSelectedOption(opt);
  };

  const handlePlayAudio = (text: string) => {
    if (isAudioPlaying) {
      speechService.stop();
      setIsAudioPlaying(false);
      return;
    }
    setIsAudioPlaying(true);
    speechService.speak(text, { lang: 'en-US', rate: 0.95 });
    // Tự động tắt indicator sau thời gian ngắn
    setTimeout(() => {
      setIsAudioPlaying(false);
    }, 2800);
  };

  const handleSubmitAnswer = () => {
    if (!selectedOption || isAnswered) return;

    const correct = selectedOption === activity.question.correctAnswer;
    setIsAnswered(true);
    setIsCorrect(correct);

    if (correct) {
      soundService.playVictory();
      onComplete(activity);
    } else {
      soundService.playError();
    }
  };

  const handleRetry = () => {
    setSelectedOption(null);
    setIsAnswered(false);
    setIsCorrect(false);
    soundService.playHit();
  };

  const handleConfirmFinish = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div
        className={`relative w-full max-w-xl bg-gradient-to-b from-[#181310] via-[#120d0a] to-[#0c0907] border-2 ${meta.borderColor} rounded-2xl shadow-2xl p-5 md:p-6 overflow-hidden flex flex-col max-h-[92vh]`}
      >
        {/* Glow hiệu ứng nền */}
        <div className="absolute -top-24 -right-24 w-60 h-60 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-amber-900/40 relative z-10">
          <div className="flex items-center gap-3">
            <span className="text-2xl p-2 bg-amber-950/60 border border-amber-600/50 rounded-xl shadow-inner">
              {meta.icon}
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span
                  className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${meta.borderColor} ${meta.badgeBg} ${meta.badgeText}`}
                >
                  {meta.label}
                </span>
                {isAlreadyCompleted && (
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full border border-emerald-500/60 bg-emerald-950/60 text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Đã hoàn thành
                  </span>
                )}
              </div>
              <h2 className="text-lg md:text-xl font-bold text-amber-200 mt-0.5 tracking-wide">
                {activity.propName}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white rounded-lg bg-neutral-900/60 hover:bg-neutral-800 transition-colors border border-neutral-700/50"
            aria-label="Đóng"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content - Scrollable if needed */}
        <div className="mt-4 flex-1 overflow-y-auto space-y-4 pr-1 relative z-10">
          {/* Lore / Giới thiệu bối cảnh */}
          <div className="p-3.5 rounded-xl bg-amber-950/30 border border-amber-800/40 text-amber-200/90 text-sm leading-relaxed flex items-start gap-2.5">
            <BookOpen className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <p className="italic">{activity.loreIntro}</p>
          </div>

          {/* Question Prompt Card */}
          <div className="p-4 rounded-xl bg-[#1b1510] border border-amber-700/50 shadow-md">
            <div className="flex items-start justify-between gap-3">
              <span className="text-xs font-bold text-amber-500 tracking-wider uppercase">
                Khảo Hạch Ngữ Liệu
              </span>
              <button
                onClick={() => handlePlayAudio(activity.question.prompt)}
                className={`p-1.5 rounded-lg border text-xs flex items-center gap-1.5 transition-colors ${
                  isAudioPlaying
                    ? 'bg-amber-500 text-black border-amber-400 animate-pulse'
                    : 'bg-neutral-800 text-amber-300 border-amber-700/60 hover:bg-neutral-700'
                }`}
                title="Phát âm tiếng Anh"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline font-mono">Nghe</span>
              </button>
            </div>
            <p className="text-white text-base md:text-lg font-medium mt-2 leading-relaxed">
              {activity.question.prompt}
            </p>
          </div>

          {/* Options Grid */}
          <div className="space-y-2">
            <div className="text-xs font-semibold text-neutral-400 px-1 flex items-center justify-between">
              <span>Lựa chọn đáp án đúng:</span>
              <span className="text-[11px] text-neutral-500 hidden sm:inline">
                [Phím 1-4 trên bàn phím]
              </span>
            </div>

            <div className="grid grid-cols-1 gap-2.5">
              {options.map((opt, idx) => {
                const label = String.fromCharCode(65 + idx); // A, B, C, D
                const isSelected = selectedOption === opt;
                const isCorrectOption = isAnswered && opt === activity.question.correctAnswer;
                const isWrongSelection = isAnswered && isSelected && !isCorrect;

                let btnStyle =
                  'border-amber-900/50 bg-[#16120e] hover:bg-[#221c16] text-neutral-200 hover:border-amber-600/70';

                if (isSelected && !isAnswered) {
                  btnStyle =
                    'border-amber-400 bg-amber-950/60 text-amber-200 ring-2 ring-amber-400/40';
                } else if (isCorrectOption) {
                  btnStyle =
                    'border-emerald-500 bg-emerald-950/70 text-emerald-200 ring-2 ring-emerald-500/50';
                } else if (isWrongSelection) {
                  btnStyle =
                    'border-red-500 bg-red-950/70 text-red-200 ring-2 ring-red-500/50';
                }

                return (
                  <button
                    key={idx}
                    disabled={isAnswered}
                    onClick={() => handleSelectOption(opt)}
                    className={`w-full text-left p-3 md:p-3.5 rounded-xl border transition-all flex items-center justify-between group active:scale-[0.99] ${btnStyle}`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 transition-colors ${
                          isSelected && !isAnswered
                            ? 'bg-amber-500 text-black'
                            : isCorrectOption
                            ? 'bg-emerald-500 text-black'
                            : isWrongSelection
                            ? 'bg-red-500 text-white'
                            : 'bg-neutral-800 text-amber-300 group-hover:bg-amber-900/60'
                        }`}
                      >
                        {label}
                      </span>
                      <span className="font-medium text-sm md:text-base leading-snug">
                        {opt}
                      </span>
                    </div>

                    {isAnswered && (
                      <span className="shrink-0 ml-2">
                        {isCorrectOption ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                        ) : isWrongSelection ? (
                          <XCircle className="w-5 h-5 text-red-400" />
                        ) : null}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Feedback & Explanation Card */}
          {isAnswered && (
            <div
              className={`p-4 rounded-xl border animate-slideDown ${
                isCorrect
                  ? 'bg-emerald-950/40 border-emerald-600/70'
                  : 'bg-red-950/40 border-red-600/70'
              }`}
            >
              <div className="flex items-center gap-2">
                {isCorrect ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    <span className="font-bold text-emerald-300">
                      Chính xác! Lĩnh hội thành công!
                    </span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-5 h-5 text-red-400" />
                    <span className="font-bold text-red-300">
                      Chưa chính xác! Thử suy luận lại chiêu thức.
                    </span>
                  </>
                )}
              </div>

              <div className="mt-2 text-sm text-neutral-200 leading-relaxed pl-7">
                <p>
                  <strong className="text-amber-400">Giải thích:</strong>{' '}
                  {activity.question.explanation}
                </p>
              </div>

              {/* Reward pill */}
              {isCorrect && (
                <div className="mt-3 pl-7 flex flex-wrap items-center gap-2 text-xs font-semibold">
                  {!isAlreadyCompleted ? (
                    <>
                      <span className="px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/50 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-amber-400" /> +
                        {activity.reward.xp} Tu Vi (XP)
                      </span>
                      <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 flex items-center gap-1.5">
                        <Award className="w-3.5 h-3.5 text-emerald-400" /> +
                        {activity.reward.unitProgressGain}% Tiến độ Unit
                      </span>
                    </>
                  ) : (
                    <span className="px-2.5 py-1 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/50">
                      ✨ Ôn tập thành công (Phần thưởng đã nhận ở lần đầu hoàn thành)
                    </span>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Actions Footer */}
        <div className="mt-4 pt-3 border-t border-amber-900/40 flex items-center justify-between gap-3 relative z-10">
          <div className="text-xs text-neutral-400 font-mono hidden sm:inline">
            Unit: {activity.unitId.toUpperCase()} • Đạo cụ: {activity.propId}
          </div>

          <div className="flex items-center gap-2.5 ml-auto">
            {!isAnswered ? (
              <>
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-sm rounded-xl border border-neutral-700 bg-neutral-800/80 text-neutral-300 hover:bg-neutral-700 transition-colors"
                >
                  Rời đi
                </button>
                <button
                  disabled={!selectedOption}
                  onClick={handleSubmitAnswer}
                  className={`px-5 py-2 text-sm font-semibold rounded-xl border flex items-center gap-2 transition-all ${
                    selectedOption
                      ? 'border-amber-400 bg-gradient-to-r from-amber-600 to-amber-500 text-black shadow-lg shadow-amber-500/20 hover:brightness-110 active:scale-95'
                      : 'border-neutral-800 bg-neutral-900 text-neutral-500 cursor-not-allowed'
                  }`}
                >
                  <span>{meta.actionVerb}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </>
            ) : isCorrect ? (
              <button
                onClick={handleConfirmFinish}
                className="px-6 py-2 text-sm font-semibold rounded-xl border border-emerald-400 bg-gradient-to-r from-emerald-600 to-emerald-500 text-black shadow-lg shadow-emerald-500/20 hover:brightness-110 flex items-center gap-2 active:scale-95"
              >
                <span>Thu hoạch & Hoàn tất</span>
                <CheckCircle2 className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleRetry}
                className="px-5 py-2 text-sm font-semibold rounded-xl border border-amber-500 bg-neutral-800 text-amber-300 hover:bg-neutral-700 flex items-center gap-2 transition-colors active:scale-95"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Thử lại chiêu thức</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
