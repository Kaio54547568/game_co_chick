import React, { useState, useEffect } from 'react';
import { TANG_KINH_CAC_CHALLENGE_QUESTIONS } from '../data/demoLearningData';
import { CombatQuestion, Quest, KnowledgeMasteryState } from '../types/game';
import { UnitContentService } from '../services/unitContentService';
import { MasteryEngine } from '../services/masteryEngine';
import { soundService } from '../services/sound';
import { speechService } from '../services/speechService';
import { ShieldCheck, Timer, AlertCircle, X, ChevronRight, Award, Volume2, Eye } from 'lucide-react';
import { INITIAL_ITEMS } from '../data/itemsData';

interface ChallengeModalProps {
  currentQuest: Quest | undefined;
  knowledgeMastery?: Record<string, KnowledgeMasteryState>;
  selectedUnitId?: string;
  onCompleteChallenge: () => void;
  onAnswerKnowledge?: (knowledgeItemIds: string[], isCorrect: boolean, responseTimeSec: number) => void;
  onClose: () => void;
}

export const ChallengeModal: React.FC<ChallengeModalProps> = ({
  currentQuest,
  knowledgeMastery,
  selectedUnitId,
  onCompleteChallenge,
  onAnswerKnowledge,
  onClose,
}) => {
  const unitQuestions = selectedUnitId ? UnitContentService.getUnitChallengeQuestions(selectedUnitId) : TANG_KINH_CAC_CHALLENGE_QUESTIONS;
  const pool = unitQuestions.length >= 3 ? unitQuestions : TANG_KINH_CAC_CHALLENGE_QUESTIONS;
  const [questions, setQuestions] = useState<CombatQuestion[]>(() => MasteryEngine.selectAdaptiveQuestions(pool, knowledgeMastery || {}, 3));

  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(30);
  const [startTime, setStartTime] = useState(Date.now());
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFailed, setIsFailed] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);

  const question = questions[currentIdx] || questions[0];

  // Dọn dẹp audio khi unmount
  useEffect(() => {
    return () => {
      speechService.stop();
    };
  }, []);

  // Xử lý chuyển câu & phát âm thanh câu hỏi nghe
  useEffect(() => {
    speechService.stop();
    setIsAudioPlaying(false);
    setShowTranscript(false);

    if (question?.listeningScript && !isAnswered && !isSuccess && !isFailed) {
      const timer = setTimeout(() => {
        handlePlayAudio(question.listeningScript!);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [currentIdx, question, isAnswered, isSuccess, isFailed]);

  const handlePlayAudio = (text: string) => {
    if (isAudioPlaying) return;
    setIsAudioPlaying(true);
    speechService.speak(text, {
      onStart: () => setIsAudioPlaying(true),
      onEnd: () => setIsAudioPlaying(false),
      onError: () => setIsAudioPlaying(false),
    });
  };

  // Timer countdown: tạm dừng khi audio đang phát
  useEffect(() => {
    if (isAnswered || isSuccess || isFailed || isAudioPlaying) return;

    if (timeLeft <= 0) {
      handleAnswerTimeout();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isAnswered, isSuccess, isFailed, isAudioPlaying]);

  const handleAnswerTimeout = () => {
    setIsAnswered(true);
    setIsCorrect(false);
    soundService.playError();
    if (onAnswerKnowledge && question?.knowledgeItemIds) {
      onAnswerKnowledge(question.knowledgeItemIds, false, 30);
    }
  };

  const handleSelectOption = (opt: string) => {
    if (isAnswered || !question) return;
    const responseTimeSec = Math.max(0.5, (Date.now() - startTime) / 1000);
    setSelectedOption(opt);
    setIsAnswered(true);

    const correct = opt === question.correctAnswer;
    setIsCorrect(correct);

    if (onAnswerKnowledge && question.knowledgeItemIds) {
      onAnswerKnowledge(question.knowledgeItemIds, correct, responseTimeSec);
    }

    if (correct) {
      setCorrectCount((prev) => prev + 1);
      soundService.playHit();
    } else {
      soundService.playError();
    }
  };

  const handleNext = () => {
    speechService.stop();
    setIsAudioPlaying(false);
    setShowTranscript(false);
    if (currentIdx + 1 < questions.length) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
      setTimeLeft(30);
      setStartTime(Date.now());
    } else {
      // Đã hết 3 câu: Kiểm tra điều kiện vượt qua (tối thiểu 2/3 câu đúng)
      const finalCount = correctCount;
      if (finalCount >= 2) {
        setIsSuccess(true);
        soundService.playVictory();
      } else {
        setIsFailed(true);
        soundService.playError();
      }
    }
  };

  const handleRetry = () => {
    setQuestions(
      MasteryEngine.selectAdaptiveQuestions(
        pool,
        knowledgeMastery || {},
        3
      )
    );
    setCurrentIdx(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setIsCorrect(false);
    setCorrectCount(0);
    setIsFailed(false);
    setIsSuccess(false);
    setTimeLeft(30);
    setStartTime(Date.now());
  };

  const handleFinish = () => {
    if (isSuccess) {
      onCompleteChallenge();
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-xl bg-stone-900/95 border-2 border-emerald-500/80 rounded-2xl shadow-2xl max-h-[90dvh] overflow-y-auto p-5 sm:p-7 text-stone-100 flex flex-col gap-4">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-stone-400 hover:text-stone-100 hover:bg-stone-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSuccess && !isFailed ? (
          <>
            {/* Header */}
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <h3 className="font-bold text-emerald-300 text-lg font-wuxia">
                  Câu {currentIdx + 1}/{questions.length}
                </h3>
              </div>

              {/* Timer Bar */}
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-950 border border-stone-700 text-xs font-bold">
                <Timer className={`w-3.5 h-3.5 ${timeLeft <= 4 ? 'text-red-400 animate-pulse' : 'text-amber-400'}`} />
                <span className={timeLeft <= 4 ? 'text-red-400 font-extrabold' : 'text-stone-300'}>
                  {timeLeft}s
                </span>
              </div>
            </div>

            {/* Question prompt */}
            <div className="bg-stone-950/80 border border-stone-800 rounded-xl p-4">
              <p className="text-base sm:text-lg font-bold text-stone-100">
                {question.prompt}
              </p>
            </div>

            {/* Audio controls for listening questions */}
            {(question.listeningScript || question.combatMode === 'listening_pursuit') && (
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between p-3 rounded-xl bg-stone-950 border border-emerald-500/40">
                  <button
                    disabled={isAudioPlaying}
                    onClick={() => handlePlayAudio(question.listeningScript || question.prompt)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 shadow transition active:scale-95 ${
                      !isAudioPlaying
                        ? 'bg-emerald-600 hover:bg-emerald-500 text-stone-950 font-bold'
                        : 'bg-stone-800 text-stone-500 cursor-not-allowed'
                    }`}
                  >
                    <Volume2 className={`w-4 h-4 ${isAudioPlaying ? 'animate-bounce text-emerald-300' : ''}`} />
                    <span>{isAudioPlaying ? 'Đang Phát Khẩu Quyết...' : 'Phát Lại Khẩu Quyết'}</span>
                  </button>

                  {/* Transcript toggle */}
                  {(question.transcriptFallback || question.hintText) && (
                    <button
                      onClick={() => {
                        soundService.playClick();
                        setShowTranscript(!showTranscript);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-semibold border border-stone-700 flex items-center gap-1.5"
                    >
                      <Eye className="w-3.5 h-3.5 text-stone-400" />
                      <span>{showTranscript ? 'Ẩn Lời Thoại' : 'Bản Chép Lời'}</span>
                    </button>
                  )}
                </div>

                {/* Transcript Box */}
                {showTranscript && (question.transcriptFallback || question.hintText) && (
                  <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-600/40 text-emerald-200 text-xs italic animate-fadeIn">
                    💡 <b>Lời thoại:</b> {question.transcriptFallback || question.hintText}
                  </div>
                )}
              </div>
            )}

            {/* Options */}
            <div className="grid grid-cols-1 gap-2.5">
              {question.options.map((opt, idx) => {
                let btnStyle = 'bg-stone-800/80 border-stone-700 hover:border-emerald-500 hover:bg-stone-800 text-stone-200';
                if (isAnswered) {
                  if (opt === question.correctAnswer) {
                    btnStyle = 'bg-emerald-950 border-emerald-400 text-emerald-200 shadow-wuxia-jade font-bold';
                  } else if (selectedOption === opt) {
                    btnStyle = 'bg-red-950 border-red-500 text-red-200';
                  } else {
                    btnStyle = 'bg-stone-900/50 border-stone-800 text-stone-500 opacity-60';
                  }
                }

                return (
                  <button
                    key={idx}
                    disabled={isAnswered}
                    onClick={() => handleSelectOption(opt)}
                    className={`w-full p-3 rounded-xl border text-left text-sm font-semibold transition flex items-center justify-between ${btnStyle}`}
                  >
                    <span>{opt}</span>
                    {isAnswered && opt === question.correctAnswer && (
                      <span className="text-xs text-emerald-400 font-bold">✓ Chuẩn xác</span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Explanation & Next */}
            {isAnswered && (
              <div className="bg-stone-950/90 border border-stone-700 rounded-xl p-3.5 space-y-2 animate-fadeIn">
                <div className="flex items-center gap-2">
                  {isCorrect ? (
                    <span className="text-xs font-bold text-emerald-400">
                      Chính xác! Kiếm ý thông suốt.
                    </span>
                  ) : (
                    <span className="text-xs font-bold text-red-400">
                      Chưa chính xác! Hãy ghi nhớ kiến thức sau:
                    </span>
                  )}
                </div>
                <p className="text-xs text-stone-300 italic">
                  {question.explanation}
                </p>

                <div className="flex justify-end pt-1">
                  <button
                    onClick={handleNext}
                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-stone-950 font-bold text-xs tracking-wider shadow flex items-center gap-1.5 active:scale-95 transition"
                  >
                    <span>Tiếp tục</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </>
        ) : isFailed ? (
          /* Failure Screen */
          <div className="flex flex-col items-center text-center py-4 gap-4 animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-red-950/80 border-2 border-red-500 flex items-center justify-center text-red-400 shadow-wuxia-red">
              <AlertCircle className="w-8 h-8" />
            </div>

            <div>
              <h3 className="text-2xl font-black text-red-400 font-wuxia">
                Thử lại nhé
              </h3>
              <p className="text-xs sm:text-sm text-stone-300 mt-2 max-w-sm">
                Thiếu hiệp chỉ trả lời đúng <b className="text-amber-400">{correctCount}/3</b> câu.
                Trả lời đúng ít nhất <b className="text-emerald-400">2/3</b> câu để nhận kiếm nhé!
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full mt-2">
              <button
                onClick={handleRetry}
                className="flex-1 py-3 px-4 rounded-xl bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs shadow active:scale-95 transition"
              >
                Thử Thách Lại
              </button>
              <button
                onClick={onClose}
                className="flex-1 py-3 px-4 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 font-bold text-xs border border-stone-600 active:scale-95 transition"
              >
                Quay Lại Ôn Tập
              </button>
            </div>
          </div>
        ) : (
          /* Victory & Reward Screen */
          <div className="flex flex-col items-center text-center py-4 gap-4 animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-emerald-950 border-2 border-emerald-400 flex items-center justify-center text-emerald-300 shadow-wuxia-jade animate-wuxia-float">
              <Award className="w-8 h-8" />
            </div>

            <div>
              <h3 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-200 to-amber-300 font-wuxia">
                Bạn làm được rồi!
              </h3>
              <p className="text-xs sm:text-sm text-stone-300 mt-1">
                Bạn đúng {correctCount}/3 câu và nhận được kiếm mới.
              </p>
            </div>

            {/* Reward Preview */}
            <div className="bg-stone-950/90 border border-amber-500/60 rounded-xl p-4 flex items-center gap-4 w-full">
              <img
                src={INITIAL_ITEMS.novice_sword.icon}
                alt="Thanh Phong Kiếm"
                className="w-16 h-16 object-contain bg-stone-900 rounded-lg border border-amber-600/50 p-1"
              />
              <div className="text-left flex-1">
                <span className="text-xs font-bold text-amber-400 block">
                  Vật Phẩm Thu Được
                </span>
                <h4 className="text-base font-bold text-amber-200">
                  {INITIAL_ITEMS.novice_sword.name}
                </h4>
                <p className="text-xs text-stone-400">
                  +18 đánh mạnh hơn • +180 sức mạnh
                </p>
              </div>
            </div>

            <button
              onClick={handleFinish}
              className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-500 text-stone-950 font-bold text-sm shadow-lg flex items-center justify-center gap-2 transform active:scale-95 transition"
            >
              <span>Thu Nhận Kiếm &amp; Tiến Đến Trúc Lâm</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
