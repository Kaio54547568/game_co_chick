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
import { Quest, PlayerProfile, StudentQuestStatus } from '../types/game';
import { getLevelConfig } from '../game/levels/levelConfig';
import {
  StudentMentorService,
  SENIOR_MENTOR_META,
  EXAM_HACKS,
  STUDENT_QUESTS,
  StudentQuestItem,
} from '../services/studentMentorService';

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
  const isSeniorMentor = StudentMentorService.isStudentMentor(npcId);
  const guardianMeta = GuardianService.getGuardianMeta(npcId);
  const seniorMeta = isSeniorMentor ? SENIOR_MENTOR_META : null;
  const level = getLevelConfig(selectedUnitId);

  const isBangChuQuest1 =
    !isGuardian &&
    !isSeniorMentor &&
    (currentQuest?.step === 1 ||
      currentQuest?.id === 'quest_1' ||
      Boolean(currentQuest?.id?.endsWith('quest_1')));

  // Senior Mentor State
  const [mentorTab, setMentorTab] = useState<'dialogue' | 'exam_hacks' | 'student_quests'>('dialogue');
  const [selectedHackCategory, setSelectedHackCategory] = useState<string>('all');
  const [selectedStudentQuestId, setSelectedStudentQuestId] = useState<string>('quest_softskills');
  const [selectedStudentOption, setSelectedStudentOption] = useState<string | null>(null);
  const [studentChallengeResult, setStudentChallengeResult] = useState<{ isCorrect: boolean; feedback: string } | null>(null);

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

  // Handler: Hoàn thành Quest 1 của Hồng y tông chủ
  const handleCompleteQuest1 = () => {
    soundService.playGong();
    const qId = currentQuest?.id || `${selectedUnitId}_quest_1`;
    onAdvanceQuest(qId);
    onClose();
  };

  // Senior Mentor Handlers
  const activeStudentQuest =
    STUDENT_QUESTS.find((q) => q.id === selectedStudentQuestId) || STUDENT_QUESTS[0];
  const activeStudentQuestStatus: StudentQuestStatus = profile
    ? StudentMentorService.getQuestStatus(profile, activeStudentQuest.id)
    : 'not_started';

  const handleAcceptStudentQuest = (qId: string) => {
    if (!profile || !onUpdateProfile) return;
    soundService.playHit();
    const updated = StudentMentorService.acceptQuest(profile, qId);
    onUpdateProfile(updated);
    setStudentChallengeResult(null);
    setSelectedStudentOption(null);
  };

  const handleSubmitStudentChallenge = (qId: string) => {
    if (!profile || !selectedStudentOption || !activeStudentQuest) return;
    const chosen = activeStudentQuest.challenge.options.find((o) => o.id === selectedStudentOption);
    if (!chosen) return;

    if (chosen.isCorrect) {
      soundService.playGong();
      setStudentChallengeResult({
        isCorrect: true,
        feedback: chosen.feedback + ' ' + activeStudentQuest.challenge.explanation,
      });
      if (onUpdateProfile) {
        const updated = StudentMentorService.solveQuest(profile, qId);
        onUpdateProfile(updated);
      }
    } else {
      soundService.playError();
      setStudentChallengeResult({
        isCorrect: false,
        feedback: chosen.feedback,
      });
    }
  };

  const handleClaimStudentReward = (qId: string) => {
    if (!profile || !onUpdateProfile) return;
    soundService.playVictory();
    const res = StudentMentorService.claimReward(profile, qId);
    onUpdateProfile(res.profile);
    setStudentChallengeResult(null);
    setSelectedStudentOption(null);
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
              isSeniorMentor
                ? 'border-purple-500 shadow-purple-950/60'
                : guardianMeta?.borderColor || 'border-amber-500'
            } shadow-wuxia-gold shrink-0 bg-stone-950`}
          >
            <img
              src={
                isSeniorMentor
                  ? seniorMeta?.portrait
                  : guardianMeta?.portrait ||
                    '/assets/game/characters/npc/portraits/bang_chu_ha_anh_phuong.png'
              }
              alt={isSeniorMentor ? seniorMeta?.name : guardianMeta?.name || 'Bang Chủ'}
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
                  isSeniorMentor
                    ? 'text-purple-300 bg-purple-950/80 border-purple-500/40'
                    : (guardianMeta?.badgeColor || 'text-amber-400') +
                      ' ' +
                      (guardianMeta?.badgeBg || 'bg-amber-950/70')
                } border border-stone-700/60`}
              >
                {isSeniorMentor ? <GraduationCap className="w-3.5 h-3.5 text-purple-400" /> : <Shield className="w-3 h-3" />}
                {isSeniorMentor ? seniorMeta?.badgeTitle : guardianMeta?.title || 'Lãnh Tụ Võ Lâm Chính Phái • Hồng Y Tông Chủ'}
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

              {/* Status Badge for Senior Mentor */}
              {isSeniorMentor && profile && (
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full border bg-purple-950/80 text-purple-300 border-purple-500/60 shadow flex items-center gap-1">
                  <Award className="w-3 h-3 text-amber-400" />
                  <span>
                    Kỳ Ngộ Đã Đạt:{' '}
                    {
                      Object.values(profile.studentQuestStates || {}).filter((s) => s === 'rewarded').length
                    }
                    /3
                  </span>
                </span>
              )}
            </div>

            <h2
              className={`text-xl sm:text-2xl font-black ${
                isSeniorMentor ? 'text-purple-200' : 'text-amber-200'
              } font-wuxia leading-tight`}
            >
              {isSeniorMentor ? seniorMeta?.name : guardianMeta?.name || 'Hồng y tông chủ Hà Ánh Phượng'}
            </h2>

            <p className="text-xs text-stone-400 italic mt-0.5">
              {isSeniorMentor
                ? seniorMeta?.mainQuote
                : guardianMeta?.quote || '"Tam Niên Anh Ngữ – Tụ hội hào kiệt, nhất thống giang hồ"'}
            </p>
          </div>
        </div>

        {/* 2. Senior Mentor Tab Switcher */}
        {isSeniorMentor && (
          <div className="flex items-center gap-1.5 bg-stone-950/70 p-1 rounded-xl border border-purple-900/50">
            <button
              onClick={() => {
                soundService.playClick();
                setMentorTab('dialogue');
              }}
              className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                mentorTab === 'dialogue'
                  ? 'bg-purple-900/60 text-purple-200 shadow border border-purple-500/50'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Hội Thoại &amp; Chia Sẻ</span>
            </button>

            <button
              onClick={() => {
                soundService.playClick();
                setMentorTab('exam_hacks');
              }}
              className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                mentorTab === 'exam_hacks'
                  ? 'bg-purple-900/60 text-purple-200 shadow border border-purple-500/50'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <Zap className="w-3.5 h-3.5 text-yellow-400" />
              <span>Bí Kíp Săn Điểm</span>
            </button>

            <button
              onClick={() => {
                soundService.playClick();
                setMentorTab('student_quests');
              }}
              className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                mentorTab === 'student_quests'
                  ? 'bg-purple-900/60 text-purple-200 shadow border border-purple-500/50'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5 text-purple-300" />
              <span>Kỳ Ngộ Giới Sinh Viên</span>
            </button>
          </div>
        )}

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
        {/* CASE A: HỒNG Y TÔNG CHỦ */}
        {!isGuardian && !isSeniorMentor && (
          <div className="bg-stone-950/80 border border-stone-800 rounded-xl p-4 text-sm leading-relaxed text-stone-200 space-y-2.5">
            {isBangChuQuest1 ? (
              <>
                <p>
                  <b className="text-amber-300">Hồng y tông chủ:</b> "Chào mừng thiếu hiệp đã bái nhập môn phái! Hiện nay, trong Võ Lâm xuất hiện một tà phái mang tên <b>Vô Ngôn Ma Giáo</b>."
                </p>
                <p>
                  "Chúng luyện tà công khiến con người quên từ ngữ, xáo trộn văn phạm. Khu vực hiện tại là{' '}
                  <b className="text-amber-300">{level.title}</b> (Chủ đề: <i>{level.topic}</i>)."
                </p>
                <p className="text-amber-200">
                  "Muốn phá tan ma chướng, thiếu hiệp cần thỉnh giáo <b>4 vị Hộ Pháp</b> phụ trách 4 phương pháp học: Phương Tú (Từ vựng), Đặng Trần Hà (Ngữ pháp), Hoàng Vân (Luyện nghe), Nguyệt Nguyên (Đọc hiểu) cùng Đại Sư Huynh <b>Bách Khoa thư Sinh Đinh Ngọc Khánh</b>!"
                </p>
              </>
            ) : (
              <>
                <p>
                  <b className="text-amber-300">Hồng y tông chủ:</b> "Thiếu hiệp hành sự rất quyết đoán! Hãy tiếp tục rèn luyện cùng 4 vị Hộ Pháp và khám phá bản đồ."
                </p>
                <p>
                  "Tại vùng dã ngoại có <b>{level.enemies.length} loại tà binh</b> tuần tra. Hãy tiêu diệt chúng để tích lũy tu vi. Khi tiến độ Unit đạt từ <b>70%</b> trở lên, cổng Cấm Địa sẽ mở ra để quyết chiến!"
                </p>
              </>
            )}
          </div>
        )}

        {/* CASE B: SENIOR MENTOR (BÁCH KHOA THƯ SINH ĐINH NGỌC KHÁNH) */}
        {isSeniorMentor && (
          <div className="space-y-3">
            {/* Tab 1: Hội Thoại & Chia Sẻ (Dialogue & Quotes) */}
            {mentorTab === 'dialogue' && (
              <div className="space-y-3">
                {/* Intro greeting */}
                <div className="bg-stone-950/80 border border-purple-900/50 rounded-xl p-3.5 sm:p-4 text-xs sm:text-sm leading-relaxed text-stone-200 space-y-2">
                  <p>
                    <b className="text-purple-300">Bách Khoa thư Sinh Đinh Ngọc Khánh: </b>
                    "{seniorMeta?.introGreeting}"
                  </p>
                </div>

                {/* 3 Required Quotes showcased in authentic narrative context */}
                <div className="space-y-2.5">
                  <div className="text-xs font-bold text-purple-300 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                    <span>Tâm Pháp Đại Sư Huynh Truyền Thụ:</span>
                  </div>

                  {/* Quote 1: University Reality & Motivation */}
                  <div className="p-3.5 rounded-xl bg-purple-950/30 border border-purple-600/40 text-xs sm:text-sm text-purple-100 space-y-1.5 shadow-sm">
                    <div className="flex items-center gap-2 font-bold text-amber-300">
                      <GraduationCap className="w-4 h-4 text-amber-400" />
                      <span>Ải Vũ Môn &amp; Chân Trời Mới</span>
                    </div>
                    <blockquote className="italic font-semibold text-purple-200 border-l-2 border-purple-400 pl-2.5 py-0.5">
                      “Đại học không nhàn như giang hồ đồn đâu các đệ... Nhưng qua được ải THPT này, thiên hạ sẽ mở rộng trước mắt!”
                    </blockquote>
                    <p className="text-stone-300 text-xs pt-1 leading-relaxed">
                      Lên đại học các đệ sẽ tự chủ thời gian, tiếp cận tri thức quốc tế và thỏa sức vẫy vùng. Nhưng muốn mở cánh cửa đó, ải thi tốt nghiệp và đại học trước mắt chính là trận quyết chiến định hình tương lai!
                    </p>
                  </div>

                  {/* Quote 2: Overcoming Grammar Pitfalls */}
                  <div className="p-3.5 rounded-xl bg-purple-950/30 border border-purple-600/40 text-xs sm:text-sm text-purple-100 space-y-1.5 shadow-sm">
                    <div className="flex items-center gap-2 font-bold text-yellow-300">
                      <Zap className="w-4 h-4 text-yellow-400" />
                      <span>Kinh Nghiệm Phá Bẫy Ma Chướng</span>
                    </div>
                    <blockquote className="italic font-semibold text-purple-200 border-l-2 border-yellow-400 pl-2.5 py-0.5">
                      “Xưa ta cũng từng bị Loạn Ngữ Kiếm Ma 'bón hành' thì Hiện tại Hoàn thành, nay đỗ đạt trở về truyền lại bí kíp cho sư đệ/sư muội.”
                    </blockquote>
                    <p className="text-stone-300 text-xs pt-1 leading-relaxed">
                      Đừng nản khi làm sai! Những câu hỏi thì động từ, cụm collocations hiểm hóc đều có quy luật phản xạ. Ta đã đúc kết toàn bộ ở mục <b>Bí Kíp Săn Điểm</b>.
                    </p>
                  </div>

                  {/* Quote 3: Student Hard Work & Resilience */}
                  <div className="p-3.5 rounded-xl bg-purple-950/30 border border-purple-600/40 text-xs sm:text-sm text-purple-100 space-y-1.5 shadow-sm">
                    <div className="flex items-center gap-2 font-bold text-cyan-300">
                      <BookOpen className="w-4 h-4 text-cyan-400" />
                      <span>Đồ Án Đêm Muộn &amp; Tôi Luyện Ý Chí</span>
                    </div>
                    <blockquote className="italic font-semibold text-purple-200 border-l-2 border-cyan-400 pl-2.5 py-0.5">
                      “Thức đêm cày đồ án với fix bug võ công mệt hơn luyện Cửu Âm Chân Kinh!”
                    </blockquote>
                    <p className="text-stone-300 text-xs pt-1 leading-relaxed">
                      Nhưng chính những đêm miệt mài gõ phím, nghiên cứu tài liệu tiếng Anh ấy đã rèn giũa bản lĩnh vững vàng nhất. Hãy bắt đầu ngay hôm nay từ những bài tập nhỏ!
                    </p>
                  </div>
                </div>

                {/* Quick Navigation Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                  <button
                    onClick={() => {
                      soundService.playClick();
                      setMentorTab('exam_hacks');
                    }}
                    className="p-3 rounded-xl bg-stone-900 border border-yellow-600/50 hover:border-yellow-400 hover:bg-stone-850 text-left transition flex items-center justify-between group"
                  >
                    <div>
                      <div className="font-bold text-yellow-300 text-xs flex items-center gap-1.5">
                        <Zap className="w-3.5 h-3.5 text-yellow-400" />
                        <span>Bí Kíp Săn Điểm THPT</span>
                      </div>
                      <p className="text-[11px] text-stone-400 mt-0.5">
                        4 tuyệt chiêu phá bẫy thì, collocation &amp; cấu trúc đề thi
                      </p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-stone-500 group-hover:text-yellow-300 group-hover:translate-x-0.5 transition" />
                  </button>

                  <button
                    onClick={() => {
                      soundService.playClick();
                      setMentorTab('student_quests');
                    }}
                    className="p-3 rounded-xl bg-stone-900 border border-purple-500/50 hover:border-purple-400 hover:bg-stone-850 text-left transition flex items-center justify-between group"
                  >
                    <div>
                      <div className="font-bold text-purple-300 text-xs flex items-center gap-1.5">
                        <GraduationCap className="w-3.5 h-3.5 text-purple-400" />
                        <span>Kỳ Ngộ Giới Sinh Viên</span>
                      </div>
                      <p className="text-[11px] text-stone-400 mt-0.5">
                        3 nhiệm vụ thử thách thực chiến giảng đường đại học
                      </p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-stone-500 group-hover:text-purple-300 group-hover:translate-x-0.5 transition" />
                  </button>
                </div>
              </div>
            )}

            {/* Tab 2: Bí Kíp Săn Điểm (Exam Hacks) */}
            {mentorTab === 'exam_hacks' && (
              <div className="space-y-3">
                {/* Category Filters */}
                <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                  {[
                    { id: 'all', label: 'Tất Cả' },
                    { id: 'grammar_traps', label: 'Bẫy Thì Động Từ' },
                    { id: 'collocations', label: 'Collocations' },
                    { id: 'confusing_words', label: 'Cặp Từ Dễ Nhầm' },
                    { id: 'reading_cloze', label: 'Đọc Điền & Sửa Lỗi' },
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        soundService.playClick();
                        setSelectedHackCategory(cat.id);
                      }}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold whitespace-nowrap transition ${
                        selectedHackCategory === cat.id
                          ? 'bg-purple-600 text-stone-100 shadow'
                          : 'bg-stone-900 text-stone-400 hover:text-stone-200 border border-stone-800'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>

                {/* Hack Cards List */}
                <div className="space-y-3 max-h-[50vh] overflow-y-auto pr-1">
                  {EXAM_HACKS.filter(
                    (h) => selectedHackCategory === 'all' || h.category === selectedHackCategory
                  ).map((hack) => (
                    <div
                      key={hack.id}
                      className="p-3.5 rounded-xl bg-stone-950/90 border border-stone-800 space-y-2.5 text-xs text-stone-200"
                    >
                      <div className="flex items-center justify-between border-b border-stone-800 pb-1.5">
                        <span className="font-bold text-amber-200 text-sm">{hack.title}</span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-950 text-purple-300 border border-purple-500/40">
                          {hack.categoryTitle}
                        </span>
                      </div>

                      {/* Trap warning */}
                      <div className="p-2.5 rounded-lg bg-red-950/20 border border-red-800/40 text-red-200 flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                        <div>
                          <b className="text-red-300">Bẫy đề thi: </b>
                          <span>{hack.trapWarning}</span>
                        </div>
                      </div>

                      {/* Mentor Tip */}
                      <div className="p-2.5 rounded-lg bg-purple-950/20 border border-purple-600/30 text-purple-100 flex items-start gap-2">
                        <Sparkles className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                        <div>
                          <b className="text-purple-300">Mẹo sư huynh: </b>
                          <span>{hack.mentorTip}</span>
                        </div>
                      </div>

                      {/* SGK Example */}
                      <div className="p-2.5 rounded-lg bg-stone-900 border border-stone-800 space-y-1">
                        <div className="text-[11px] text-cyan-300 font-bold">
                          📖 Ví Dụ Thực Tế Sách Giáo Khoa:
                        </div>
                        <p className="italic text-stone-300">{hack.curriculumExample.sentence}</p>
                        <div className="text-emerald-300 font-semibold pt-0.5">
                          ✓ {hack.curriculumExample.correctRule}
                        </div>
                        <p className="text-stone-400 text-[11px]">
                          {hack.curriculumExample.explanation}
                        </p>
                      </div>

                      {/* Key takeaway */}
                      <div className="p-2 rounded-lg bg-amber-950/20 border border-amber-500/30 text-amber-200 text-[11px] flex items-center gap-1.5">
                        <Award className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span>
                          <b>Quy tắc cốt lõi: </b>
                          {hack.keyTakeaway}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 3: Kỳ Ngộ Giới Sinh Viên (Student Quests) */}
            {mentorTab === 'student_quests' && activeStudentQuest && (
              <div className="space-y-3">
                {/* Quest Selector Buttons */}
                <div className="grid grid-cols-3 gap-1.5">
                  {STUDENT_QUESTS.map((q, idx) => {
                    const status = profile
                      ? StudentMentorService.getQuestStatus(profile, q.id)
                      : 'not_started';
                    const isSelected = selectedStudentQuestId === q.id;
                    return (
                      <button
                        key={q.id}
                        onClick={() => {
                          soundService.playClick();
                          setSelectedStudentQuestId(q.id);
                          setSelectedStudentOption(null);
                          setStudentChallengeResult(null);
                        }}
                        className={`p-2 rounded-xl border text-left transition flex flex-col justify-between ${
                          isSelected
                            ? 'bg-purple-950/70 border-purple-500 text-purple-200 shadow-md'
                            : 'bg-stone-900 border-stone-800 text-stone-400 hover:text-stone-200'
                        }`}
                      >
                        <div className="flex items-center justify-between w-full mb-1">
                          <span className="text-[10px] font-bold text-purple-400">
                            Kỳ Ngộ {idx + 1}
                          </span>
                          <span
                            className={`w-2 h-2 rounded-full ${
                              status === 'rewarded'
                                ? 'bg-purple-400 shadow-wuxia-gold'
                                : status === 'completed'
                                ? 'bg-emerald-400 animate-pulse'
                                : status === 'in_progress'
                                ? 'bg-blue-400'
                                : 'bg-stone-600'
                            }`}
                          />
                        </div>
                        <div className="font-bold text-xs truncate w-full">{q.badge}</div>
                      </button>
                    );
                  })}
                </div>

                {/* Active Quest Detailed Header */}
                <div className="p-3.5 rounded-xl bg-stone-950/90 border border-purple-900/50 space-y-2 text-xs">
                  <div className="flex items-center justify-between border-b border-stone-800 pb-1.5">
                    <span className="font-bold text-sm text-purple-200">
                      {activeStudentQuest.title}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                        activeStudentQuestStatus === 'not_started'
                          ? 'bg-stone-800 text-stone-300 border-stone-600'
                          : activeStudentQuestStatus === 'in_progress'
                          ? 'bg-blue-950 text-blue-300 border-blue-500 animate-pulse'
                          : activeStudentQuestStatus === 'completed'
                          ? 'bg-emerald-950 text-emerald-300 border-emerald-500'
                          : 'bg-purple-950 text-purple-300 border-purple-500'
                      }`}
                    >
                      {activeStudentQuestStatus === 'not_started' && 'Chưa Tiếp Nhận'}
                      {activeStudentQuestStatus === 'in_progress' && 'Đang Thử Thách'}
                      {activeStudentQuestStatus === 'completed' && 'Đã Vượt Qua - Chờ Báo Công'}
                      {activeStudentQuestStatus === 'rewarded' && 'Đã Lĩnh Hội Phần Thưởng'}
                    </span>
                  </div>

                  <p className="text-stone-300 leading-relaxed italic">
                    "{activeStudentQuest.storyPrompt}"
                  </p>

                  <div className="p-2.5 rounded-lg bg-purple-950/30 border border-purple-500/30 text-purple-200">
                    <b className="text-purple-300">💡 Lời khuyên sư huynh: </b>
                    <span>{activeStudentQuest.mentorGuidance}</span>
                  </div>

                  <div className="flex items-center justify-between text-[11px] pt-1 text-stone-400 border-t border-stone-800">
                    <span>Mục tiêu: {activeStudentQuest.objective}</span>
                    <span className="text-amber-400 font-bold flex items-center gap-1">
                      <Award className="w-3 h-3" />
                      +{activeStudentQuest.reward.xp} XP | +{activeStudentQuest.reward.congLuc} Công Lực
                    </span>
                  </div>
                </div>

                {/* Playable Challenge Question Box */}
                <div className="bg-stone-950/90 border border-stone-800 rounded-xl p-3.5 space-y-2.5 text-xs sm:text-sm">
                  {activeStudentQuest.challenge.contextText && (
                    <div className="p-2.5 rounded-lg bg-stone-900 border border-stone-800 text-cyan-200 text-xs italic">
                      {activeStudentQuest.challenge.contextText}
                    </div>
                  )}

                  <div className="font-bold text-amber-200">
                    {activeStudentQuest.challenge.prompt}
                  </div>

                  {/* Radio Choice Options */}
                  <div className="space-y-2">
                    {activeStudentQuest.challenge.options.map((opt) => {
                      const isSelected = selectedStudentOption === opt.id;
                      return (
                        <button
                          key={opt.id}
                          onClick={() => {
                            soundService.playClick();
                            setSelectedStudentOption(opt.id);
                          }}
                          className={`w-full p-2.5 rounded-xl border text-left text-xs transition flex items-start gap-2.5 ${
                            isSelected
                              ? 'bg-purple-950/80 border-purple-400 text-purple-100 shadow'
                              : 'bg-stone-900/80 border-stone-800 hover:border-purple-500/50 text-stone-200'
                          }`}
                        >
                          <div
                            className={`w-4 h-4 rounded-full border shrink-0 mt-0.5 flex items-center justify-center ${
                              isSelected
                                ? 'border-purple-400 bg-purple-600'
                                : 'border-stone-600 bg-stone-800'
                            }`}
                          >
                            {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                          </div>
                          <span className="flex-1">{opt.text}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Submit Button for Challenge */}
                  <div className="flex justify-end pt-1">
                    <button
                      onClick={() => handleSubmitStudentChallenge(activeStudentQuest.id)}
                      disabled={!selectedStudentOption}
                      className={`px-4 py-2 rounded-xl font-bold text-xs shadow transition flex items-center gap-1.5 ${
                        selectedStudentOption
                          ? 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 text-stone-100 cursor-pointer active:scale-95'
                          : 'bg-stone-800 text-stone-500 cursor-not-allowed border border-stone-700'
                      }`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Kiểm Tra Phương Án</span>
                    </button>
                  </div>

                  {/* Challenge Result Feedback */}
                  {studentChallengeResult && (
                    <div
                      className={`p-3 rounded-xl border text-xs animate-fadeIn ${
                        studentChallengeResult.isCorrect
                          ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200'
                          : 'bg-red-950/60 border-red-500 text-red-200'
                      }`}
                    >
                      <div className="font-bold flex items-center gap-1.5 mb-1">
                        {studentChallengeResult.isCorrect ? (
                          <>
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                            <span>Phương án xuất sắc! Đúng bản lĩnh sinh viên!</span>
                          </>
                        ) : (
                          <>
                            <AlertCircle className="w-4 h-4 text-red-400" />
                            <span>Chưa tối ưu! Hãy đọc kỹ gợi ý và thử lại.</span>
                          </>
                        )}
                      </div>
                      <p className="leading-relaxed">{studentChallengeResult.feedback}</p>
                    </div>
                  )}

                  {/* Claim Reward Banner if completed */}
                  {activeStudentQuestStatus === 'completed' && (
                    <div className="p-3 rounded-xl bg-gradient-to-r from-emerald-950/80 to-teal-950/80 border border-emerald-500 text-xs text-emerald-200 flex items-center justify-between gap-2 shadow-lg">
                      <div className="flex items-center gap-2">
                        <Award className="w-5 h-5 text-emerald-400 shrink-0" />
                        <div>
                          <div className="font-bold text-emerald-300">
                            Thử Thách Đã Vượt Qua Thành Công!
                          </div>
                          <span className="text-[11px] text-emerald-400">
                            Phần thưởng: +{activeStudentQuest.reward.xp} XP, +
                            {activeStudentQuest.reward.congLuc} Công Lực &amp; Tín Vật "
                            {activeStudentQuest.reward.itemTitle}"
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleClaimStudentReward(activeStudentQuest.id)}
                        className="px-3.5 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-black text-xs shadow active:scale-95 transition shrink-0"
                      >
                        Nhận Thưởng Ngay
                      </button>
                    </div>
                  )}

                  {activeStudentQuestStatus === 'rewarded' && (
                    <div className="p-2.5 rounded-lg bg-purple-950/30 border border-purple-500/30 text-purple-200 text-xs flex items-center gap-2">
                      <Award className="w-4 h-4 text-purple-400 shrink-0" />
                      <span>
                        Sư đệ/muội đã hoàn thành kỳ ngộ này và thu nhận tín vật <b>{activeStudentQuest.reward.itemTitle}</b>!
                      </span>
                    </div>
                  )}
                </div>
              </div>
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
            {isSeniorMentor && (
              <span className="text-purple-300 font-semibold flex items-center gap-1">
                <GraduationCap className="w-3.5 h-3.5 text-purple-400" />
                <span>Bí Kíp &amp; Kỳ Ngộ Sinh Viên (Độc Lập Không Ảnh Hưởng Đánh Boss)</span>
              </span>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Hồng y tông chủ Button */}
            {!isGuardian && !isSeniorMentor && isBangChuQuest1 && (
              <button
                onClick={handleCompleteQuest1}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-500 text-stone-950 font-bold text-xs shadow-lg flex items-center gap-1.5 active:scale-95 transition"
              >
                <span>Lĩnh Ý Tông Chủ &amp; Tiếp Nhận Nhiệm Vụ 2</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}

            {/* Senior Mentor Buttons */}
            {isSeniorMentor && (
              <>
                {mentorTab === 'dialogue' && (
                  <button
                    onClick={() => {
                      soundService.playClick();
                      setMentorTab('exam_hacks');
                    }}
                    className="px-4 py-2 rounded-xl bg-purple-700 hover:bg-purple-600 text-purple-100 font-bold text-xs shadow flex items-center gap-1.5 transition"
                  >
                    <Zap className="w-3.5 h-3.5 text-yellow-300" />
                    <span>Xem Bí Kíp Săn Điểm</span>
                  </button>
                )}

                {mentorTab === 'exam_hacks' && (
                  <button
                    onClick={() => {
                      soundService.playClick();
                      setMentorTab('student_quests');
                    }}
                    className="px-4 py-2 rounded-xl bg-purple-700 hover:bg-purple-600 text-purple-100 font-bold text-xs shadow flex items-center gap-1.5 transition"
                  >
                    <GraduationCap className="w-3.5 h-3.5 text-purple-300" />
                    <span>Làm Kỳ Ngộ Sinh Viên</span>
                  </button>
                )}

                {mentorTab === 'student_quests' && activeStudentQuest && (
                  <>
                    {activeStudentQuestStatus === 'not_started' && (
                      <button
                        onClick={() => handleAcceptStudentQuest(activeStudentQuest.id)}
                        className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 text-stone-100 font-bold text-xs shadow-lg flex items-center gap-1.5 active:scale-95 transition"
                      >
                        <span>Tiếp Nhận Kỳ Ngộ Này</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    )}

                    {activeStudentQuestStatus === 'completed' && (
                      <button
                        onClick={() => handleClaimStudentReward(activeStudentQuest.id)}
                        className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 text-stone-950 font-bold text-xs shadow-lg flex items-center gap-1.5 animate-bounce-subtle active:scale-95 transition"
                      >
                        <Award className="w-4 h-4" />
                        <span>Báo Công &amp; Thu Nhận Phần Thưởng</span>
                      </button>
                    )}

                    {activeStudentQuestStatus === 'rewarded' && (
                      <button
                        onClick={() => {
                          soundService.playClick();
                          setStudentChallengeResult(null);
                          setSelectedStudentOption(null);
                        }}
                        className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-purple-300 font-bold text-xs border border-purple-500/40 flex items-center gap-1.5 transition"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Ôn Luyện Lại Tình Huống</span>
                      </button>
                    )}
                  </>
                )}
              </>
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
