import React, { useState, useEffect } from 'react';
import { soundService } from '../services/sound';
import { speechService } from '../services/speechService';
import {
  GuardianService,
  GUARDIAN_METAS,
  GuardianId,
  GuardianQuestData,
} from '../services/guardianService';
import {
  Shield,
  BookOpen,
  Sparkles,
  X,
  ChevronRight,
  Volume2,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  MapPin,
  Award,
  Zap,
  Eye,
  GraduationCap,
} from 'lucide-react';
import { Quest, PlayerProfile } from '../types/game';
import { getLevelConfig } from '../game/levels/levelConfig';

interface DialogueModalProps {
  npcId: string;
  selectedUnitId?: string;
  currentQuest: Quest | undefined;
  profile?: PlayerProfile;
  onUpdateProfile?: (updated: PlayerProfile) => void;
  onAdvanceQuest: (questId: string) => void;
  onOpenVocabulary?: () => void;
  onOpenChallenge?: () => void;
  onOpenTraining?: () => void;
  onAnswerKnowledge?: (knowledgeItemIds: string[], isCorrect: boolean, responseTimeSec: number) => void;
  onClose: () => void;
}

export const DialogueModal: React.FC<DialogueModalProps> = ({
  npcId,
  selectedUnitId = 'g10-u01',
  currentQuest,
  profile,
  onUpdateProfile,
  onAdvanceQuest,
  onOpenVocabulary,
  onOpenChallenge,
  onOpenTraining,
  onAnswerKnowledge,
  onClose,
}) => {
  const isGuardian = GuardianService.isGuardianId(npcId);
  const guardianMeta = GuardianService.getGuardianMeta(npcId);
  const level = getLevelConfig(selectedUnitId);

  // Guardian Quest State
  const [questData, setQuestData] = useState<GuardianQuestData | null>(null);
  const [activeTab, setActiveTab] = useState<'dialogue' | 'exercise'>('dialogue');

  // Exercise interaction state
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [selectedEvidence, setSelectedEvidence] = useState<number | null>(null);
  const [exerciseResult, setExerciseResult] = useState<{ isCorrect: boolean; feedback: string } | null>(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);
  const [orderedWords, setOrderedWords] = useState<string[]>([]);
  const [availableWords, setAvailableWords] = useState<string[]>([]);

  // Lấy dữ liệu nhiệm vụ Hộ Pháp theo Unit
  useEffect(() => {
    if (isGuardian) {
      const q = GuardianService.getGuardianQuestData(npcId as GuardianId, selectedUnitId);
      setQuestData(q);
      setSelectedOption(null);
      setSelectedEvidence(null);
      setExerciseResult(null);
      setActiveTab('dialogue');

      if (q.exercise.wordsToOrder) {
        setAvailableWords([...q.exercise.wordsToOrder].sort(() => 0.5 - Math.random()));
        setOrderedWords([]);
      }
    }
    return () => {
      speechService.stop();
    };
  }, [npcId, selectedUnitId]);

  // Trạng thái hiện tại của Hộ Pháp
  const currentStatus =
    isGuardian && profile
      ? GuardianService.getGuardianStatus(profile, selectedUnitId, npcId)
      : 'not_started';

  // Handler: Tiếp nhận nhiệm vụ
  const handleAcceptQuest = () => {
    if (!profile || !isGuardian || !onUpdateProfile) return;
    soundService.playHit();
    const updated = GuardianService.acceptQuest(profile, selectedUnitId, npcId as GuardianId);
    onUpdateProfile(updated);
  };

  // Handler: Phát âm audio (cho Hoàng Vân)
  const handlePlayAudio = (script: string) => {
    if (isAudioPlaying) return;
    setIsAudioPlaying(true);
    speechService.speak(script, {
      onStart: () => setIsAudioPlaying(true),
      onEnd: () => setIsAudioPlaying(false),
      onError: () => setIsAudioPlaying(false),
    });
  };

  // Handler: Nộp đáp án bài tập Hộ Pháp
  const handleSubmitExercise = (option: string) => {
    if (!questData || exerciseResult?.isCorrect) return;
    setSelectedOption(option);

    let isCorrect = false;
    let feedback = '';

    if (questData.exercise.type === 'reading') {
      const isOptionCorrect = option === questData.exercise.correctAnswer;
      const isEvCorrect = selectedEvidence === questData.exercise.evidenceIndex;
      isCorrect = isOptionCorrect && isEvCorrect;
      if (!isOptionCorrect) {
        feedback = 'Đáp án chưa chuẩn xác, hãy đọc kỹ lại đoạn văn!';
      } else if (!isEvCorrect) {
        feedback = `Đáp án đúng nhưng chưa chọn đúng câu dẫn chứng [${questData.exercise.evidenceIndex}]!`;
      } else {
        feedback = questData.exercise.explanation;
      }
    } else {
      isCorrect = option === questData.exercise.correctAnswer;
      feedback = isCorrect
        ? questData.exercise.explanation
        : 'Chưa chuẩn xác! Hãy xem lại hướng dẫn yếu quyết võ học và thử lại.';
    }

    if (isCorrect) {
      soundService.playGong();
      setExerciseResult({ isCorrect: true, feedback });

      if (onAnswerKnowledge && questData.exercise.knowledgeItemIds) {
        onAnswerKnowledge(questData.exercise.knowledgeItemIds, true, 3);
      }

      // Nếu đang trong tiến trình làm quest, tự động cập nhật sang 'completed'
      if (profile && onUpdateProfile && currentStatus === 'in_progress') {
        const updated = GuardianService.solveExercise(profile, selectedUnitId, npcId as GuardianId);
        onUpdateProfile(updated);
      }
    } else {
      soundService.playError();
      setExerciseResult({ isCorrect: false, feedback });
      if (onAnswerKnowledge && questData.exercise.knowledgeItemIds) {
        onAnswerKnowledge(questData.exercise.knowledgeItemIds, false, 5);
      }
    }
  };

  // Handler: Sắp xếp từ (cho Đặng Trần Hà)
  const handleAddWord = (word: string, idx: number) => {
    soundService.playClick();
    const newAvail = [...availableWords];
    newAvail.splice(idx, 1);
    setAvailableWords(newAvail);
    setOrderedWords((prev) => [...prev, word]);
  };

  const handleRemoveWord = (word: string, idx: number) => {
    soundService.playClick();
    const newOrdered = [...orderedWords];
    newOrdered.splice(idx, 1);
    setOrderedWords(newOrdered);
    setAvailableWords((prev) => [...prev, word]);
  };

  const handleSubmitOrderedSentence = () => {
    if (!questData || orderedWords.length === 0) return;
    const formed = orderedWords.join(' ');
    handleSubmitExercise(formed);
  };

  // Handler: Báo công và nhận thưởng
  const handleClaimReward = () => {
    if (!profile || !isGuardian || !onUpdateProfile) return;
    soundService.playVictory();
    const result = GuardianService.claimReward(profile, selectedUnitId, npcId as GuardianId);
    onUpdateProfile(result.profile);
    setActiveTab('dialogue');
  };

  // Handler: Hoàn thành Quest 1 của Bang Chủ
  const handleCompleteQuest1 = () => {
    soundService.playGong();
    onAdvanceQuest('quest_1');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn select-none">
      <div
        className={`relative w-full max-w-2xl bg-stone-900/95 border-2 ${
          guardianMeta?.borderColor || 'border-amber-500/80'
        } rounded-2xl p-4 sm:p-6 shadow-2xl text-stone-100 flex flex-col gap-3.5 max-h-[92vh] overflow-y-auto`}
      >
        {/* Close Button */}
        <button
          onClick={() => {
            soundService.playClick();
            onClose();
          }}
          className="absolute top-3.5 right-3.5 p-1.5 rounded-lg text-stone-400 hover:text-amber-300 hover:bg-stone-800 transition z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* 1. Header: Portrait, Name, Title, Quote & Status */}
        <div className="flex items-start gap-3.5 border-b border-stone-800 pb-3">
          <div
            className={`relative w-16 h-20 sm:w-20 sm:h-24 rounded-xl overflow-hidden border-2 ${
              guardianMeta?.borderColor || 'border-amber-500'
            } shadow-wuxia-gold shrink-0 bg-stone-950`}
          >
            <img
              src={
                guardianMeta?.portrait ||
                '/assets/game/characters/npc/portraits/bang_chu_ha_anh_phuong.png'
              }
              alt={guardianMeta?.name || 'Bang Chủ'}
              className="w-full h-full object-cover object-top"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  '/assets/game/characters/npc/portraits/bang_chu_ha_anh_phuong.png';
              }}
            />
          </div>

          <div className="flex-1 pr-6">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span
                className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                  guardianMeta?.badgeColor || 'text-amber-400'
                } ${guardianMeta?.badgeBg || 'bg-amber-950/70'} border border-stone-700/60`}
              >
                <Shield className="w-3 h-3" />
                {guardianMeta?.title || 'Lãnh Tụ Võ Lâm Chính Phái'}
              </span>

              {/* Status Badge */}
              {isGuardian && (
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                    currentStatus === 'not_started'
                      ? 'bg-stone-800 text-stone-300 border-stone-600'
                      : currentStatus === 'in_progress'
                      ? 'bg-blue-950 text-blue-300 border-blue-500 animate-pulse'
                      : currentStatus === 'completed'
                      ? 'bg-emerald-950 text-emerald-300 border-emerald-500 shadow-wuxia-gold'
                      : 'bg-purple-950 text-purple-300 border-purple-500'
                  }`}
                >
                  {currentStatus === 'not_started' && 'Chưa Tiếp Nhận'}
                  {currentStatus === 'in_progress' && 'Đang Thực Hiện'}
                  {currentStatus === 'completed' && 'Đã Hoàn Thành - Chờ Báo Công'}
                  {currentStatus === 'rewarded' && 'Đã Lĩnh Hội - Sẵn Sàng Ôn Luyện'}
                </span>
              )}
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-amber-200 font-wuxia leading-tight">
              {guardianMeta?.name || 'Bang Chủ Hà Ánh Phượng'}
            </h2>

            <p className="text-xs text-stone-400 italic mt-0.5">
              {guardianMeta?.quote || '"Tam Niên Anh Ngữ – Tụ hội hào kiệt, nhất thống giang hồ"'}
            </p>
          </div>
        </div>

        {/* 2. Guardian Content Tab Toggle (if Guardian) */}
        {isGuardian && questData && (
          <div className="flex items-center gap-2 bg-stone-950/70 p-1 rounded-xl border border-stone-800">
            <button
              onClick={() => {
                soundService.playClick();
                setActiveTab('dialogue');
              }}
              className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                activeTab === 'dialogue'
                  ? 'bg-stone-800 text-amber-300 shadow border border-amber-600/40'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Hội Thoại &amp; Hướng Dẫn</span>
            </button>

            <button
              onClick={() => {
                soundService.playClick();
                setActiveTab('exercise');
              }}
              className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                activeTab === 'exercise'
                  ? 'bg-stone-800 text-amber-300 shadow border border-amber-600/40'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>
                {currentStatus === 'rewarded'
                  ? 'Ôn Luyện Kỹ Năng'
                  : 'Khảo Thí / Bài Tập Nhiệm Vụ'}
              </span>
            </button>
          </div>
        )}

        {/* 3. Main Body */}
        {/* CASE A: BANG CHỦ */}
        {!isGuardian && (
          <div className="bg-stone-950/80 border border-stone-800 rounded-xl p-4 text-sm leading-relaxed text-stone-200 space-y-2.5">
            {currentQuest?.id === 'quest_1' ? (
              <>
                <p>
                  <b className="text-amber-300">Bang Chủ:</b> "Chào mừng thiếu hiệp đã bái nhập môn phái! Hiện nay, trong Võ Lâm xuất hiện một tà phái mang tên <b>Vô Ngôn Ma Giáo</b>."
                </p>
                <p>
                  "Chúng luyện tà công khiến con người quên từ ngữ, xáo trộn văn phạm. Khu vực hiện tại là{' '}
                  <b className="text-amber-300">{level.title}</b> (Chủ đề: <i>{level.topic}</i>)."
                </p>
                <p className="text-amber-200">
                  "Muốn phá tan ma chướng, thiếu hiệp cần thỉnh giáo <b>4 vị Hộ Pháp</b> phụ trách 4 phương pháp học: Phương Tú (Từ vựng), Đặng Trần Hà (Ngữ pháp), Hoàng Vân (Luyện nghe) và Nguyệt Nguyên (Đọc hiểu)!"
                </p>
              </>
            ) : (
              <>
                <p>
                  <b className="text-amber-300">Bang Chủ:</b> "Thiếu hiệp hành sự rất quyết đoán! Hãy tiếp tục rèn luyện cùng 4 vị Hộ Pháp và khám phá bản đồ."
                </p>
                <p>
                  "Tại vùng dã ngoại có <b>{level.enemies.length} loại tà binh</b> tuần tra. Hãy tiêu diệt chúng để tích lũy tu vi. Khi tiến độ Unit đạt từ <b>70%</b> trở lên, cổng Cấm Địa sẽ mở ra để quyết chiến!"
                </p>
              </>
            )}
          </div>
        )}

        {/* CASE B: GUARDIAN DIALOGUE TAB */}
        {isGuardian && questData && activeTab === 'dialogue' && (
          <div className="space-y-3">
            {/* Dialogue text by status */}
            <div className="bg-stone-950/80 border border-stone-800 rounded-xl p-3.5 sm:p-4 text-xs sm:text-sm leading-relaxed text-stone-200 space-y-2">
              {questData.dialogueByStatus[currentStatus].map((line, idx) => (
                <p key={idx}>
                  {idx === 0 ? <b className={guardianMeta?.badgeColor}>{guardianMeta?.name}: </b> : null}
                  "{line}"
                </p>
              ))}
            </div>

            {/* Tutorial Guidance Box (Tuyến Hướng Dẫn Kỹ Năng) */}
            <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-600/40 text-xs text-amber-100 leading-relaxed">
              <div className="font-bold text-amber-300 mb-1 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Phương Pháp Tu Luyện: {questData.skillName}</span>
              </div>
              <p>{questData.tutorialGuidance}</p>
            </div>

            {/* Quest Briefing Card (Hiển thị rõ mục tiêu & nơi cần tới tiếp theo) */}
            <div className="p-3.5 rounded-xl bg-stone-950 border border-stone-800 space-y-2 text-xs">
              <div className="flex items-center justify-between border-b border-stone-800 pb-1.5">
                <span className="font-bold text-stone-200">{questData.title}</span>
                <span className="text-[11px] font-bold text-amber-400 flex items-center gap-1">
                  <Award className="w-3 h-3" />
                  +{questData.rewardXp} XP &amp; +{questData.rewardProgressGain}% Tiến Độ
                </span>
              </div>

              <div className="flex items-start gap-1.5 text-stone-300">
                <span className="font-bold text-amber-400 shrink-0">🎯 Mục tiêu:</span>
                <span>{questData.objective}</span>
              </div>

              <div className="flex items-center gap-1.5 text-cyan-300">
                <MapPin className="w-3.5 h-3.5 shrink-0 text-cyan-400" />
                <span className="font-bold">Nơi cần tới:</span>
                <span className="text-stone-200">{questData.nextLocation}</span>
              </div>
            </div>
          </div>
        )}

        {/* CASE C: GUARDIAN EXERCISE / DIRECT PRACTICE TAB */}
        {isGuardian && questData && activeTab === 'exercise' && (
          <div className="bg-stone-950/90 border border-stone-800 rounded-xl p-3.5 sm:p-4 space-y-3 text-xs sm:text-sm">
            {/* Prompt & Audio Controls if listening */}
            <div className="space-y-2">
              <div className="font-bold text-amber-200 whitespace-pre-line leading-relaxed">
                {questData.exercise.prompt}
              </div>

              {/* Reading Passage display (for Nguyệt Nguyên) */}
              {questData.exercise.readingPassage && (
                <div className="p-3 rounded-xl bg-stone-900 border border-cyan-800/40 text-cyan-100 text-xs leading-relaxed italic space-y-1.5">
                  <div className="font-bold text-cyan-300 not-italic">📖 Trích Đoạn Minh Triết:</div>
                  <p>{questData.exercise.readingPassage}</p>
                </div>
              )}

              {/* Audio Playback button (for Hoàng Vân) */}
              {questData.exercise.audioScript && (
                <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-500/40 flex items-center justify-between gap-2">
                  <button
                    onClick={() => handlePlayAudio(questData.exercise.audioScript!)}
                    disabled={isAudioPlaying}
                    className="px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs flex items-center gap-1.5 shadow active:scale-95 transition"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>{isAudioPlaying ? 'Đang phát khẩu quyết...' : 'Nghe Khẩu Quyết TTS'}</span>
                  </button>
                  <span className="text-[11px] text-stone-400 italic">
                    🔊 Bấm nghe để nhận diện từ khóa
                  </span>
                </div>
              )}
            </div>

            {/* Evidence Selector for Reading Mode */}
            {questData.exercise.passageSentences && (
              <div className="space-y-1">
                <span className="text-xs text-cyan-400 font-bold block">
                  Chọn câu dẫn chứng bảo chứng đáp án [1]–[4]:
                </span>
                <div className="flex gap-2">
                  {[1, 2, 3, 4].map((num) => (
                    <button
                      key={num}
                      onClick={() => {
                        soundService.playClick();
                        setSelectedEvidence(num);
                      }}
                      className={`flex-1 py-1.5 rounded-lg border text-xs font-bold transition ${
                        selectedEvidence === num
                          ? 'bg-cyan-500 text-stone-950 border-cyan-300'
                          : 'bg-stone-800 text-stone-300 border-stone-700 hover:border-cyan-500'
                      }`}
                    >
                      Câu [{num}]
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Sentence Unscramble Mode (for Đặng Trần Hà) */}
            {questData.exercise.wordsToOrder ? (
              <div className="space-y-2.5">
                <div className="min-h-12 p-2.5 rounded-xl border-2 border-dashed border-blue-500/60 bg-stone-900 flex flex-wrap gap-1.5 items-center">
                  {orderedWords.length === 0 ? (
                    <span className="text-xs text-stone-500 italic">
                      Nhấn vào các từ bên dưới để ghép thành câu hoàn chỉnh...
                    </span>
                  ) : (
                    orderedWords.map((word, wIdx) => (
                      <button
                        key={wIdx}
                        onClick={() => handleRemoveWord(word, wIdx)}
                        className="px-2.5 py-1 rounded-lg bg-blue-900 border border-blue-400 text-blue-100 text-xs font-semibold hover:bg-blue-800 transition"
                      >
                        {word} ✕
                      </button>
                    ))
                  )}
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {availableWords.map((word, wIdx) => (
                    <button
                      key={wIdx}
                      onClick={() => handleAddWord(word, wIdx)}
                      className="px-2.5 py-1 rounded-lg bg-stone-800 border border-stone-700 hover:border-blue-400 text-stone-200 text-xs font-semibold active:scale-95 transition"
                    >
                      {word}
                    </button>
                  ))}
                </div>

                <div className="flex justify-between items-center pt-1">
                  <button
                    onClick={() => {
                      soundService.playClick();
                      if (questData.exercise.wordsToOrder) {
                        setAvailableWords([...questData.exercise.wordsToOrder]);
                        setOrderedWords([]);
                      }
                    }}
                    className="text-xs text-stone-400 hover:text-stone-200"
                  >
                    Xếp lại
                  </button>

                  <button
                    onClick={handleSubmitOrderedSentence}
                    disabled={orderedWords.length === 0}
                    className="px-4 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-stone-100 font-bold text-xs shadow active:scale-95 transition"
                  >
                    Xác Nhận Kiếm Quyết
                  </button>
                </div>
              </div>
            ) : (
              /* Multiple Choice Options */
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {questData.exercise.options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSubmitExercise(opt)}
                    className={`w-full p-2.5 rounded-xl border text-left text-xs sm:text-sm font-semibold transition flex items-center justify-between ${
                      selectedOption === opt
                        ? exerciseResult?.isCorrect
                          ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                          : 'bg-red-950/80 border-red-500 text-red-200'
                        : 'bg-stone-800/90 border-stone-700 hover:border-amber-400 text-stone-100'
                    }`}
                  >
                    <span>{opt}</span>
                    {selectedOption === opt && exerciseResult?.isCorrect && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    )}
                  </button>
                ))}
              </div>
            )}

            {/* Exercise Result Feedback */}
            {exerciseResult && (
              <div
                className={`p-3 rounded-xl border text-xs animate-fadeIn ${
                  exerciseResult.isCorrect
                    ? 'bg-emerald-950/50 border-emerald-500/60 text-emerald-200'
                    : 'bg-red-950/50 border-red-500/60 text-red-200'
                }`}
              >
                <div className="font-bold flex items-center gap-1.5 mb-0.5">
                  {exerciseResult.isCorrect ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Tuyệt chiêu chuẩn xác!</span>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-4 h-4 text-red-400" />
                      <span>Cần điều chỉnh lại!</span>
                    </>
                  )}
                </div>
                <p>{exerciseResult.feedback}</p>
              </div>
            )}
          </div>
        )}

        {/* 4. Action Buttons Footer */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-stone-800">
          <div className="text-xs text-stone-400">
            {isGuardian && currentStatus === 'rewarded' && (
              <span className="text-purple-300 font-semibold">
                ✨ Lối vào ôn luyện tự do mở 24/7
              </span>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Bang Chủ Button */}
            {!isGuardian && currentQuest?.id === 'quest_1' && (
              <button
                onClick={handleCompleteQuest1}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-500 text-stone-950 font-bold text-xs shadow-lg flex items-center gap-1.5 active:scale-95 transition"
              >
                <span>Lĩnh Ý Bang Chủ &amp; Tiếp Nhận Nhiệm Vụ 2</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}

            {/* Guardian: Accept Quest (not_started) */}
            {isGuardian && currentStatus === 'not_started' && (
              <button
                onClick={handleAcceptQuest}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-500 text-stone-950 font-bold text-xs shadow-lg flex items-center gap-1.5 active:scale-95 transition"
              >
                <span>Tiếp Nhận Nhiệm Vụ Hộ Pháp</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}

            {/* Guardian: Switch to exercise or pavilion (in_progress) */}
            {isGuardian && currentStatus === 'in_progress' && (
              <>
                {activeTab === 'dialogue' ? (
                  <button
                    onClick={() => {
                      soundService.playClick();
                      setActiveTab('exercise');
                    }}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 text-stone-100 font-bold text-xs shadow flex items-center gap-1.5 active:scale-95 transition"
                  >
                    <span>Làm Khảo Thí Ngay Tại Chỗ</span>
                  </button>
                ) : null}

                {/* Direct facility buttons */}
                {npcId === 'ho_phap_phuong_tu' && onOpenVocabulary && (
                  <button
                    onClick={() => {
                      soundService.playClick();
                      onClose();
                      onOpenVocabulary();
                    }}
                    className="px-3.5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-stone-100 font-bold text-xs shadow flex items-center gap-1.5 transition"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Đến Tàng Kinh Các</span>
                  </button>
                )}

                {npcId === 'ho_phap_dang_tran_ha' && onOpenChallenge && (
                  <button
                    onClick={() => {
                      soundService.playClick();
                      onClose();
                      onOpenChallenge();
                    }}
                    className="px-3.5 py-2 rounded-xl bg-blue-700 hover:bg-blue-600 text-stone-100 font-bold text-xs shadow flex items-center gap-1.5 transition"
                  >
                    <Zap className="w-3.5 h-3.5" />
                    <span>Đến Phong Ấn Thạch Trận</span>
                  </button>
                )}

                {npcId === 'ho_phap_hoang_van' && onOpenTraining && (
                  <button
                    onClick={() => {
                      soundService.playClick();
                      onClose();
                      onOpenTraining();
                    }}
                    className="px-3.5 py-2 rounded-xl bg-amber-700 hover:bg-amber-600 text-stone-100 font-bold text-xs shadow flex items-center gap-1.5 transition"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Đến Võ Luyện Đài</span>
                  </button>
                )}
              </>
            )}

            {/* Guardian: Claim Reward (completed) */}
            {isGuardian && currentStatus === 'completed' && (
              <button
                onClick={handleClaimReward}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 text-stone-950 font-bold text-xs shadow-lg flex items-center gap-1.5 animate-bounce-subtle active:scale-95 transition"
              >
                <Award className="w-4 h-4" />
                <span>Báo Công &amp; Thu Nhận Phần Thưởng</span>
              </button>
            )}

            {/* Guardian: Repeat Practice Mode (rewarded) */}
            {isGuardian && currentStatus === 'rewarded' && (
              <button
                onClick={() => {
                  soundService.playClick();
                  setActiveTab('exercise');
                  setExerciseResult(null);
                  setSelectedOption(null);
                }}
                className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-amber-300 font-bold text-xs border border-amber-600/40 flex items-center gap-1.5 transition"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Ôn Luyện Lại (Không Cần Đánh Quái)</span>
              </button>
            )}

            {/* Close Button */}
            <button
              onClick={() => {
                soundService.playClick();
                onClose();
              }}
              className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 font-bold text-xs border border-stone-600 transition"
            >
              Cáo Lui
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DialogueModal;
