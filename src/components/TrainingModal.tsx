import React, { useState, useEffect } from 'react';
import {
  PlayerProfile,
  CombatQuestion,
  KnowledgeMasteryState,
} from '../types/game';
import { ALL_COMBAT_QUESTIONS, ALL_KNOWLEDGE_ITEMS } from '../data/demoLearningData';
import { UnitContentService } from '../services/unitContentService';
import { MasteryEngine } from '../services/masteryEngine';
import { soundService } from '../services/sound';
import { speechService } from '../services/speechService';
import { Volume2, Eye } from 'lucide-react';

interface TrainingModalProps {
  profile: PlayerProfile;
  isOpen: boolean;
  onClose: () => void;
  onAnswerKnowledge: (
    knowledgeItemIds: string[],
    isCorrect: boolean,
    responseTimeSec: number
  ) => void;
  onCompleteTraining: () => void;
}

interface ItemMasteryDiff {
  knowledgeItemId: string;
  title: string;
  before: number;
  after: number;
}

export const TrainingModal: React.FC<TrainingModalProps> = ({
  profile,
  isOpen,
  onClose,
  onAnswerKnowledge,
  onCompleteTraining,
}) => {
  const [questions, setQuestions] = useState<CombatQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [correctCount, setCorrectCount] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(12);
  const [startTime, setStartTime] = useState<number>(Date.now());
  const [isSessionFinished, setIsSessionFinished] = useState<boolean>(false);
  const [masteryDiffs, setMasteryDiffs] = useState<ItemMasteryDiff[]>([]);
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);
  const [showTranscript, setShowTranscript] = useState<boolean>(false);

  // Khởi tạo buổi luyện 5 câu thích ứng khi mở modal
  useEffect(() => {
    if (isOpen) {
      const unitPool = UnitContentService.getUnitCombatQuestions(profile.selectedUnitId || 'g10-u01');
      const questionPool = unitPool.length > 0 ? unitPool : ALL_COMBAT_QUESTIONS;
      const selected = MasteryEngine.selectAdaptiveQuestions(
        questionPool,
        profile.knowledgeMastery || {},
        5
      );
      setQuestions(selected);

      setCurrentIndex(0);
      setSelectedOption(null);
      setIsAnswered(false);
      setCorrectCount(0);
      setTimeLeft(12);
      setStartTime(Date.now());
      setIsSessionFinished(false);
      setMasteryDiffs([]);
      setIsAudioPlaying(false);
      setShowTranscript(false);
    } else {
      speechService.stop();
      setIsAudioPlaying(false);
    }
  }, [isOpen, profile]);

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

    const q = questions[currentIndex];
    if (isOpen && !isSessionFinished && q?.listeningScript) {
      const timer = setTimeout(() => {
        handlePlayAudio(q.listeningScript!);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, isOpen, isSessionFinished, questions]);

  const handlePlayAudio = (text: string) => {
    if (isAudioPlaying) return;
    setIsAudioPlaying(true);
    speechService.speak(text, {
      onStart: () => setIsAudioPlaying(true),
      onEnd: () => setIsAudioPlaying(false),
      onError: () => setIsAudioPlaying(false),
    });
  };

  // Bộ đếm thời gian cho mỗi câu: TẠM DỪNG khi đang phát âm thanh
  useEffect(() => {
    if (!isOpen || isAnswered || isSessionFinished || questions.length === 0 || isAudioPlaying) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleAnswer(null, true); // Hết giờ = tính là trả lời sai
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, isAnswered, currentIndex, isSessionFinished, questions, isAudioPlaying]);

  if (!isOpen) return null;

  const currentQ = questions[currentIndex];

  const handleAnswer = (option: string | null, isTimeout: boolean = false) => {
    if (isAnswered || !currentQ) return;

    const responseTimeSec = Math.max(0.5, (Date.now() - startTime) / 1000);
    const isCorrect = !isTimeout && option === currentQ.correctAnswer;

    setSelectedOption(option);
    setIsAnswered(true);

    if (isCorrect) {
      soundService.playCritical();
      setCorrectCount((prev) => prev + 1);
    } else {
      soundService.playHit();
    }

    // Ghi nhận diff mastery trước và sau
    const diffs: ItemMasteryDiff[] = [];
    const activeUnitItems = profile.selectedUnitId
      ? UnitContentService.getUnitKnowledgeItems(profile.selectedUnitId)
      : [];
    const allKnowledgePool = [...activeUnitItems, ...ALL_KNOWLEDGE_ITEMS];

    currentQ.knowledgeItemIds.forEach((kid) => {
      const kInfo = allKnowledgePool.find((k) => k.id === kid);
      const title = kInfo ? kInfo.title : kid;
      const beforeState = profile.knowledgeMastery[kid];
      const before = beforeState ? beforeState.mastery : 0;
      const afterState = MasteryEngine.calculateMasteryUpdate(beforeState, isCorrect, responseTimeSec);
      diffs.push({
        knowledgeItemId: kid,
        title,
        before,
        after: afterState.mastery,
      });
    });

    setMasteryDiffs((prev) => {
      const filtered = prev.filter((p) => !diffs.some((d) => d.knowledgeItemId === p.knowledgeItemId));
      return [...filtered, ...diffs];
    });

    // Cập nhật lên profile
    onAnswerKnowledge(currentQ.knowledgeItemIds, isCorrect, responseTimeSec);
  };

  const handleNext = () => {
    soundService.playClick();
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
      setTimeLeft(12);
      setStartTime(Date.now());
    } else {
      // Kết thúc buổi luyện 5 câu
      soundService.playVictory();
      setIsSessionFinished(true);
    }
  };

  const handleFinish = () => {
    soundService.playGong();
    onCompleteTraining();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-950/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-xl bg-gradient-to-b from-stone-900 via-stone-900 to-stone-950 border-2 border-amber-600/70 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header Kiếm Hiệp */}
        <div className="px-5 py-4 bg-gradient-to-r from-amber-950/80 via-stone-900 to-amber-950/80 border-b border-amber-600/50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-amber-600/30 border border-amber-500/80 flex items-center justify-center text-amber-300 font-bold text-lg">
              🎯
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-amber-200 tracking-wide font-serif">
                Võ Trường Trúc Lâm — Luyện Công
              </h2>
              <p className="text-[11px] sm:text-xs text-stone-400">
                Ôn luyện 5 thức thích ứng theo sơ hở tri thức [DEMO]
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              soundService.playClick();
              onClose();
            }}
            className="text-stone-400 hover:text-amber-300 transition text-lg p-1.5 rounded-lg hover:bg-stone-800/80"
          >
            ✕
          </button>
        </div>

        {/* Nội dung chính */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 flex flex-col justify-between">
          {!isSessionFinished ? (
            currentQ && (
              <div className="flex flex-col gap-4">
                {/* Thanh tiến trình thức & đếm giờ */}
                <div className="flex items-center justify-between text-xs font-bold text-stone-300">
                  <span className="px-2.5 py-1 rounded-full bg-stone-800 border border-amber-600/40 text-amber-300">
                    Thức {currentIndex + 1} / {questions.length}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-stone-400">Thời gian:</span>
                    <span
                      className={`px-2 py-0.5 rounded font-mono text-xs font-bold ${
                        timeLeft <= 4
                          ? 'bg-rose-950 text-rose-300 border border-rose-600/80 animate-pulse'
                          : 'bg-stone-800 text-amber-300 border border-stone-700'
                      }`}
                    >
                      {timeLeft}s
                    </span>
                  </div>
                </div>

                {/* Khung câu hỏi */}
                <div className="p-4 rounded-xl bg-stone-950/70 border border-amber-600/40 shadow-inner">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-600/40">
                      Điểm Yếu Cần Rèn
                    </span>
                    <span className="text-[11px] text-stone-400">
                      Mục: {currentQ.knowledgeItemIds.join(', ')}
                    </span>
                  </div>
                  <p className="text-sm sm:text-base font-bold text-stone-100 leading-relaxed">
                    {currentQ.prompt}
                  </p>
                </div>

                {/* Audio controls for listening questions */}
                {(currentQ.listeningScript || currentQ.combatMode === 'listening_pursuit') && (
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between p-3 rounded-xl bg-stone-950 border border-amber-500/40">
                      <button
                        disabled={isAudioPlaying}
                        onClick={() => handlePlayAudio(currentQ.listeningScript || currentQ.prompt)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 shadow transition active:scale-95 ${
                          !isAudioPlaying
                            ? 'bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold'
                            : 'bg-stone-800 text-stone-500 cursor-not-allowed'
                        }`}
                      >
                        <Volume2 className={`w-4 h-4 ${isAudioPlaying ? 'animate-bounce text-amber-300' : ''}`} />
                        <span>{isAudioPlaying ? 'Đang Phát Khẩu Quyết...' : 'Phát Lại Khẩu Quyết'}</span>
                      </button>

                      {/* Transcript toggle */}
                      {(currentQ.transcriptFallback || currentQ.hintText) && (
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
                    {showTranscript && (currentQ.transcriptFallback || currentQ.hintText) && (
                      <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-600/40 text-amber-200 text-xs italic animate-fadeIn">
                        💡 <b>Lời thoại:</b> {currentQ.transcriptFallback || currentQ.hintText}
                      </div>
                    )}
                  </div>
                )}

                {/* Danh sách 4 phương án */}
                <div className="grid grid-cols-1 gap-2.5">
                  {currentQ.options.map((opt, idx) => {
                    const isSelected = selectedOption === opt;
                    const isCorrect = opt === currentQ.correctAnswer;
                    let btnStyle =
                      'bg-stone-800/80 border-stone-700/80 text-stone-200 hover:border-amber-500 hover:bg-stone-800';

                    if (isAnswered) {
                      if (isCorrect) {
                        btnStyle =
                          'bg-emerald-950/90 border-emerald-500 text-emerald-200 font-bold shadow-lg shadow-emerald-950/50';
                      } else if (isSelected) {
                        btnStyle =
                          'bg-rose-950/90 border-rose-500 text-rose-200 line-through';
                      } else {
                        btnStyle = 'opacity-40 bg-stone-900 border-stone-800 text-stone-400';
                      }
                    }

                    return (
                      <button
                        key={idx}
                        disabled={isAnswered}
                        onClick={() => handleAnswer(opt, false)}
                        className={`w-full text-left px-4 py-3 rounded-xl border text-xs sm:text-sm transition flex items-center justify-between ${btnStyle}`}
                      >
                        <span>{opt}</span>
                        {isAnswered && isCorrect && <span className="text-emerald-400">✓ Đúng</span>}
                        {isAnswered && isSelected && !isCorrect && (
                          <span className="text-rose-400">✗ Sai</span>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Giải thích sau khi trả lời */}
                {isAnswered && (
                  <div
                    className={`p-3.5 rounded-xl border text-xs leading-relaxed animate-fade-in ${
                      selectedOption === currentQ.correctAnswer
                        ? 'bg-emerald-950/40 border-emerald-600/50 text-emerald-200'
                        : 'bg-amber-950/40 border-amber-600/50 text-amber-200'
                    }`}
                  >
                    <div className="font-bold mb-1 flex items-center gap-1.5">
                      {selectedOption === currentQ.correctAnswer ? (
                        <>⚡ Chiêu thức chuẩn xác! Kiếm ý ngưng tụ (+Mastery)!</>
                      ) : (
                        <>⚠️ Chiêu thức còn sơ hở! Cần ghi nhớ điểm mấu chốt:</>
                      )}
                    </div>
                    <div>{currentQ.explanation}</div>
                  </div>
                )}
              </div>
            )
          ) : (
            /* Màn hình tổng kết buổi luyện công */
            <div className="flex flex-col gap-4 text-center py-2 animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-500 to-yellow-600 mx-auto flex items-center justify-center text-3xl shadow-xl shadow-amber-600/30">
                🥋
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-black text-amber-200 font-serif">
                  Tu Luyện Viên Mãn!
                </h3>
                <p className="text-xs text-stone-300 mt-1">
                  Đã hoàn thành 5 thức đối luyện tại Cọc Gỗ Trúc Lâm.
                </p>
              </div>

              {/* Thống kê kết quả */}
              <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-stone-950/80 border border-amber-600/30">
                <div className="p-2.5 rounded-lg bg-stone-900/90 border border-stone-800">
                  <div className="text-[11px] text-stone-400">Số thức đắc ý</div>
                  <div className="text-lg font-black text-amber-300">
                    {correctCount} / {questions.length}
                  </div>
                </div>
                <div className="p-2.5 rounded-lg bg-stone-900/90 border border-stone-800">
                  <div className="text-[11px] text-stone-400">Điểm đã có</div>
                  <div className="text-lg font-black text-emerald-300">+25 XP</div>
                </div>
              </div>

              {/* Bảng so sánh biến chuyển Mastery */}
              <div className="text-left mt-1">
                <h4 className="text-xs font-bold text-amber-300 mb-2">
                  Biến Chuyển Điểm Mastery Sau Buổi Luyện:
                </h4>
                <div className="flex flex-col gap-2 max-h-48 overflow-y-auto pr-1">
                  {masteryDiffs.map((diff) => {
                    const delta = diff.after - diff.before;
                    const tier = MasteryEngine.getMasteryTier(diff.after);
                    return (
                      <div
                        key={diff.knowledgeItemId}
                        className="p-2.5 rounded-lg bg-stone-950/70 border border-stone-800 flex items-center justify-between text-xs"
                      >
                        <div className="flex flex-col">
                          <span className="font-bold text-stone-200">{diff.title}</span>
                          <span className="text-[10px] text-stone-400">
                            Trạng thái:{' '}
                            {tier === 'mastered' ? (
                              <span className="text-yellow-400 font-bold">★ Mastered (&ge;90)</span>
                            ) : tier === 'proficient' ? (
                              <span className="text-blue-400 font-bold">Thành thục</span>
                            ) : tier === 'developing' ? (
                              <span className="text-emerald-400 font-bold">Đang rèn</span>
                            ) : (
                              <span className="text-rose-400 font-bold">Cần ôn</span>
                            )}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-stone-300">
                            {diff.before}% → <span className="font-bold text-amber-300">{diff.after}%</span>
                          </span>
                          <span
                            className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                              delta >= 0
                                ? 'bg-emerald-950 text-emerald-300 border border-emerald-600/40'
                                : 'bg-rose-950 text-rose-300 border border-rose-600/40'
                            }`}
                          >
                            {delta >= 0 ? `+${delta}%` : `${delta}%`}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer nút chuyển tiếp */}
        <div className="px-5 py-3.5 bg-stone-950 border-t border-amber-600/40 flex justify-end">
          {!isSessionFinished ? (
            <button
              disabled={!isAnswered}
              onClick={handleNext}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition ${
                isAnswered
                  ? 'bg-gradient-to-r from-amber-600 to-yellow-600 text-stone-950 shadow-lg shadow-amber-600/30 hover:brightness-110 active:scale-95'
                  : 'bg-stone-800 text-stone-500 cursor-not-allowed'
              }`}
            >
              {currentIndex + 1 < questions.length ? 'Chiêu Tiếp Theo ➔' : 'Xem Kết Quả Tu Luyện ➔'}
            </button>
          ) : (
            <button
              onClick={handleFinish}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-amber-600 to-yellow-600 text-stone-950 shadow-lg shadow-amber-600/40 hover:brightness-110 active:scale-95"
            >
              Thu Kiếm Nhập Bao (Hoàn Tất)
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
