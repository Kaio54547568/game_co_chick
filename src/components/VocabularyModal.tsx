import React, { useState, useMemo, useEffect } from 'react';
import { ALL_KNOWLEDGE_ITEMS, DEMO_VOCABULARY } from '../data/demoLearningData';
import { KnowledgeItem, Quest, KnowledgeMasteryState } from '../types/game';
import { UnitContentService } from '../services/unitContentService';
import { MasteryEngine } from '../services/masteryEngine';
import { soundService } from '../services/sound';
import { speechService } from '../services/speechService';
import { PronunciationService } from '../services/pronunciationService';
import { EnglishAccent } from '../types/pronunciation';
import {
  BookOpen,
  Volume2,
  CheckCircle2,
  ChevronRight,
  X,
  Sparkles,
  Filter,
  Award,
  AlertCircle,
  Headphones,
  Globe,
  Radio,
} from 'lucide-react';

interface VocabularyModalProps {
  currentQuest: Quest | undefined;
  learnedVocabIds: string[];
  knowledgeMastery: Record<string, KnowledgeMasteryState>;
  selectedUnitId?: string;
  onLearnVocab: (vocabId: string) => void;
  onAdvanceQuest?: (questId: string) => void;
  onStartChallenge: () => void;
  onClose: () => void;
}

type MainTab = 'vocab_grammar' | 'pronunciation';
type FilterTab = 'all' | 'needs_review' | 'developing' | 'mastered';

export const VocabularyModal: React.FC<VocabularyModalProps> = ({
  currentQuest,
  learnedVocabIds,
  knowledgeMastery,
  selectedUnitId,
  onLearnVocab,
  onStartChallenge,
  onClose,
}) => {
  const activeUnitId = selectedUnitId || 'g10-u01';

  const knowledgeItems = useMemo(() => {
    const items = UnitContentService.getUnitKnowledgeItems(activeUnitId);
    return items.length > 0 ? items : ALL_KNOWLEDGE_ITEMS;
  }, [activeUnitId]);

  const vocabList = useMemo(() => {
    return knowledgeItems.filter((i) => i.type === 'vocabulary');
  }, [knowledgeItems]);

  const [mainTab, setMainTab] = useState<MainTab>('vocab_grammar');
  const [selectedItem, setSelectedItem] = useState<KnowledgeItem>(knowledgeItems[0]);
  const [activeTab, setActiveTab] = useState<FilterTab>('all');
  const [accent, setAccent] = useState<EnglishAccent>(speechService.getAccent());
  const [playingWord, setPlayingWord] = useState<string | null>(null);

  const pronunciationData = useMemo(() => {
    return PronunciationService.getPronunciationByUnit(activeUnitId);
  }, [activeUnitId]);

  useEffect(() => {
    if (knowledgeItems.length > 0) {
      setSelectedItem(knowledgeItems[0]);
    }
  }, [knowledgeItems]);

  const handleSpeak = (text: string, customAccent?: EnglishAccent) => {
    soundService.playClick();
    setPlayingWord(text);
    speechService.speak(text, {
      rate: 0.88,
      accent: customAccent || accent,
      onStart: () => setPlayingWord(text),
      onEnd: () => setPlayingWord(null),
      onError: () => setPlayingWord(null),
    });
  };

  const handleToggleAccent = (newAccent: EnglishAccent) => {
    soundService.playClick();
    speechService.setAccent(newAccent);
    setAccent(newAccent);
  };

  // Tự động ghi nhận từ đầu tiên vào Quest 2 nếu chưa học
  useEffect(() => {
    const firstVocab = vocabList[0];
    if (firstVocab && !learnedVocabIds.includes(firstVocab.id)) {
      onLearnVocab(firstVocab.id);
    }
  }, [vocabList, learnedVocabIds, onLearnVocab]);

  const handleSelectItem = (item: KnowledgeItem) => {
    setSelectedItem(item);
    soundService.playClick();
    if (item.type === 'vocabulary' && !learnedVocabIds.includes(item.id)) {
      onLearnVocab(item.id);
    }
  };

  // Lọc danh sách theo tab
  const filteredItems = knowledgeItems.filter((item) => {
    const state = knowledgeMastery[item.id];
    const mastery = state ? state.mastery : 0;
    const tier = MasteryEngine.getMasteryTier(mastery);

    if (activeTab === 'needs_review') return tier === 'needs_review';
    if (activeTab === 'developing') return tier === 'developing' || tier === 'proficient';
    if (activeTab === 'mastered') return tier === 'mastered';
    return true;
  });

  // Đếm số lượng theo nhóm
  const counts = {
    all: knowledgeItems.length,
    needs_review: knowledgeItems.filter((i) => {
      const m = knowledgeMastery[i.id]?.mastery || 0;
      return MasteryEngine.getMasteryTier(m) === 'needs_review';
    }).length,
    developing: knowledgeItems.filter((i) => {
      const m = knowledgeMastery[i.id]?.mastery || 0;
      const t = MasteryEngine.getMasteryTier(m);
      return t === 'developing' || t === 'proficient';
    }).length,
    mastered: knowledgeItems.filter((i) => {
      const m = knowledgeMastery[i.id]?.mastery || 0;
      return MasteryEngine.getMasteryTier(m) === 'mastered';
    }).length,
  };

  const allInitialLearned = vocabList.slice(0, 6).every((v) => learnedVocabIds.includes(v.id));
  const isQuest3Completed = currentQuest ? currentQuest.step > 3 : false;

  const currentMasteryState = knowledgeMastery[selectedItem.id];
  const currentMastery = currentMasteryState ? currentMasteryState.mastery : 0;
  const currentTier = MasteryEngine.getMasteryTier(currentMastery);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-5xl bg-stone-900 border-2 border-emerald-600/70 rounded-2xl shadow-2xl flex flex-col max-h-[94vh] overflow-hidden text-stone-100">
        {/* Header */}
        <div className="p-3.5 sm:p-4 border-b border-stone-800 flex items-center justify-between bg-stone-950/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-500/60 flex items-center justify-center text-emerald-400">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-black text-emerald-200 font-wuxia">
                  Học từ tiếng Anh
                </h2>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  {activeUnitId.toUpperCase()}
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-stone-400">
                Chuẩn Giáo Trình Global Success (Bộ GD&ĐT &amp; Pearson) • Hộ Pháp Phương Tú &amp; Hoàng Vân
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Accent Selector */}
            <div className="hidden sm:flex items-center bg-stone-900 border border-stone-700/80 rounded-lg p-0.5 text-xs font-bold">
              <button
                onClick={() => handleToggleAccent('en-US')}
                className={`px-2 py-1 rounded transition flex items-center gap-1 ${
                  accent === 'en-US'
                    ? 'bg-amber-600 text-stone-950 shadow-sm'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
                title="Giọng chuẩn Mỹ (US English)"
              >
                <span>🇺🇸 US</span>
              </button>
              <button
                onClick={() => handleToggleAccent('en-GB')}
                className={`px-2 py-1 rounded transition flex items-center gap-1 ${
                  accent === 'en-GB'
                    ? 'bg-amber-600 text-stone-950 shadow-sm'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
                title="Giọng chuẩn Anh (UK English)"
              >
                <span>🇬🇧 UK</span>
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-stone-400 hover:text-stone-100 hover:bg-stone-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Mode Navigation Bar: Từ Vựng & Ngữ Pháp vs Phát Âm Chuẩn SGK */}
        <div className="px-3 pt-2 bg-stone-950 border-b border-stone-800 flex items-center justify-between gap-2 overflow-x-auto">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                soundService.playClick();
                setMainTab('vocab_grammar');
              }}
              className={`px-3.5 py-2 text-xs sm:text-sm font-bold rounded-t-xl transition-colors flex items-center gap-2 border-t-2 border-x-2 ${
                mainTab === 'vocab_grammar'
                  ? 'bg-stone-900 text-emerald-300 border-emerald-500 shadow-md'
                  : 'bg-stone-950 text-stone-400 border-transparent hover:text-stone-200 hover:bg-stone-900/50'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Từ và cách dùng</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                {counts.all}
              </span>
            </button>

            <button
              onClick={() => {
                soundService.playClick();
                setMainTab('pronunciation');
              }}
              className={`px-3.5 py-2 text-xs sm:text-sm font-bold rounded-t-xl transition-colors flex items-center gap-2 border-t-2 border-x-2 ${
                mainTab === 'pronunciation'
                  ? 'bg-stone-900 text-amber-300 border-amber-500 shadow-md'
                  : 'bg-stone-950 text-stone-400 border-transparent hover:text-stone-200 hover:bg-stone-900/50'
              }`}
            >
              <Headphones className="w-4 h-4 text-amber-400" />
              <span>Khẩu Quyết Phát Âm Chuẩn SGK</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-950 text-amber-300 border border-amber-800 font-mono">
                {pronunciationData.targetSounds.length} Âm
              </span>
            </button>
          </div>

          {/* Mobile accent switcher */}
          <div className="sm:hidden flex items-center bg-stone-900 border border-stone-700/80 rounded-lg p-0.5 text-[11px] font-bold">
            <button
              onClick={() => handleToggleAccent('en-US')}
              className={`px-1.5 py-0.5 rounded ${accent === 'en-US' ? 'bg-amber-600 text-stone-950' : 'text-stone-400'}`}
            >
              🇺🇸
            </button>
            <button
              onClick={() => handleToggleAccent('en-GB')}
              className={`px-1.5 py-0.5 rounded ${accent === 'en-GB' ? 'bg-amber-600 text-stone-950' : 'text-stone-400'}`}
            >
              🇬🇧
            </button>
          </div>
        </div>

        {/* TAB 1: VOCABULARY & GRAMMAR */}
        {mainTab === 'vocab_grammar' && (
          <>
            {/* Filter Tabs Header */}
            <div className="px-3 py-2 bg-stone-950/90 border-b border-stone-800 flex items-center gap-1.5 overflow-x-auto text-xs font-bold scrollbar-none">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-3 py-1.5 rounded-lg transition whitespace-nowrap flex items-center gap-1.5 ${
                  activeTab === 'all'
                    ? 'bg-emerald-600 text-stone-950 shadow-md'
                    : 'text-stone-300 hover:bg-stone-800'
                }`}
              >
                <span>Tất Cả ({counts.all})</span>
              </button>

              <button
                onClick={() => setActiveTab('needs_review')}
                className={`px-3 py-1.5 rounded-lg transition whitespace-nowrap flex items-center gap-1.5 ${
                  activeTab === 'needs_review'
                    ? 'bg-rose-600 text-white shadow-md'
                    : 'text-rose-300/80 hover:bg-rose-950/40'
                }`}
              >
                <AlertCircle className="w-3.5 h-3.5" />
                <span>Cần Ôn Lại &lt;50% ({counts.needs_review})</span>
              </button>

              <button
                onClick={() => setActiveTab('developing')}
                className={`px-3 py-1.5 rounded-lg transition whitespace-nowrap flex items-center gap-1.5 ${
                  activeTab === 'developing'
                    ? 'bg-amber-600 text-stone-950 shadow-md'
                    : 'text-amber-300/80 hover:bg-amber-950/40'
                }`}
              >
                <Filter className="w-3.5 h-3.5" />
                <span>Đang Rèn 50-89% ({counts.developing})</span>
              </button>

              <button
                onClick={() => setActiveTab('mastered')}
                className={`px-3 py-1.5 rounded-lg transition whitespace-nowrap flex items-center gap-1.5 ${
                  activeTab === 'mastered'
                    ? 'bg-yellow-500 text-stone-950 shadow-md'
                    : 'text-yellow-400 hover:bg-yellow-950/40'
                }`}
              >
                <Award className="w-3.5 h-3.5" />
                <span>Đã Mastered &ge;90% ({counts.mastered})</span>
              </button>
            </div>

            {/* Content: 2 Columns */}
            <div className="grid grid-cols-1 md:grid-cols-3 flex-1 overflow-hidden">
              {/* Left Column: Word & Grammar List */}
              <div className="p-2 sm:p-3 border-r border-stone-800 overflow-y-auto space-y-1.5 bg-stone-950/50 max-h-52 md:max-h-full">
                {filteredItems.map((item) => {
                  const isLearned = learnedVocabIds.includes(item.id);
                  const isSelected = selectedItem.id === item.id;
                  const state = knowledgeMastery[item.id];
                  const mastery = state ? state.mastery : 0;
                  const tier = MasteryEngine.getMasteryTier(mastery);

                  return (
                    <div
                      key={item.id}
                      onClick={() => handleSelectItem(item)}
                      className={`p-2 sm:p-2.5 rounded-xl border cursor-pointer transition flex items-center justify-between gap-2 ${
                        isSelected
                          ? 'bg-emerald-950/80 border-emerald-500 shadow-md'
                          : 'bg-stone-900/60 border-stone-800/80 hover:border-stone-700'
                      }`}
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-xs sm:text-sm text-stone-100 truncate">
                            {item.title}
                          </span>
                          {item.type === 'grammar' && (
                            <span className="text-[9px] px-1.5 py-0.2 rounded bg-purple-950 text-purple-300 border border-purple-700">
                              Ngữ pháp
                            </span>
                          )}
                        </div>
                        {/* Thanh Mastery nhỏ */}
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex-1 h-1.5 rounded-full bg-stone-800 overflow-hidden">
                            <div
                              className={`h-full rounded-full ${
                                tier === 'mastered'
                                  ? 'bg-yellow-400'
                                  : tier === 'proficient'
                                  ? 'bg-blue-400'
                                  : tier === 'developing'
                                  ? 'bg-emerald-400'
                                  : 'bg-rose-500'
                              }`}
                              style={{ width: `${mastery}%` }}
                            />
                          </div>
                          <span className="text-[10px] font-mono text-stone-400 font-bold shrink-0">
                            {mastery}%
                          </span>
                        </div>
                      </div>

                      {tier === 'mastered' ? (
                        <Award className="w-4 h-4 text-yellow-400 shrink-0" />
                      ) : isLearned ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      ) : null}
                    </div>
                  );
                })}
              </div>

              {/* Right Column: Detailed Card */}
              <div className="md:col-span-2 p-4 sm:p-6 overflow-y-auto flex flex-col justify-between bg-stone-900/80">
                <div className="space-y-4">
                  {/* Header Title & Pronunciation */}
                  <div className="flex items-start justify-between border-b border-stone-800 pb-3 gap-2">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-black text-amber-200 capitalize font-serif">
                        {selectedItem.title}
                      </h3>
                      <div className="flex items-center gap-2 mt-1 flex-wrap">
                        <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 text-xs font-semibold border border-emerald-800">
                          {selectedItem.type === 'vocabulary' ? selectedItem.wordType : 'Ngữ Pháp'}
                        </span>
                        {selectedItem.ipa && (
                          <span className="text-xs text-amber-300/90 font-mono bg-stone-950/80 px-2 py-0.5 rounded border border-stone-800">
                            {selectedItem.ipa}
                          </span>
                        )}
                        <span className="text-[10px] text-stone-400 font-mono">ID: {selectedItem.id}</span>
                      </div>
                    </div>

                    {selectedItem.type === 'vocabulary' && (
                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          onClick={() => handleSpeak(selectedItem.title)}
                          className={`p-2 sm:px-3 sm:py-2 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition active:scale-95 ${
                            playingWord === selectedItem.title
                              ? 'bg-amber-500 text-stone-950 border-amber-400 animate-pulse'
                              : 'bg-amber-600/30 hover:bg-amber-600/50 border-amber-500/50 text-amber-300'
                          }`}
                          title={`Nghe phát âm chuẩn (${accent === 'en-US' ? 'Mỹ 🇺🇸' : 'Anh 🇬🇧'})`}
                        >
                          <Volume2 className="w-4 h-4" />
                          <span className="hidden sm:inline">Phát Âm ({accent === 'en-US' ? 'US' : 'UK'})</span>
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Mastery Indicator Card */}
                  <div className="p-3.5 rounded-xl bg-stone-950/80 border border-stone-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-stone-300 flex items-center gap-1.5">
                        Mức Độ Thông Thạo (Mastery):
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                          currentTier === 'mastered'
                            ? 'bg-yellow-950 text-yellow-300 border border-yellow-500'
                            : currentTier === 'proficient'
                            ? 'bg-blue-950 text-blue-300 border border-blue-600'
                            : currentTier === 'developing'
                            ? 'bg-emerald-950 text-emerald-300 border border-emerald-600'
                            : 'bg-rose-950 text-rose-300 border border-rose-600'
                        }`}
                      >
                        {currentTier === 'mastered'
                          ? '★ Mastered (≥90)'
                          : currentTier === 'proficient'
                          ? 'Thành Thục (80-89%)'
                          : currentTier === 'developing'
                          ? 'Đang Rèn (50-79%)'
                          : 'Cần Ôn Lại (<50%)'}
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full h-3 rounded-full bg-stone-800 overflow-hidden relative border border-stone-700">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          currentTier === 'mastered'
                            ? 'bg-gradient-to-r from-yellow-500 to-amber-400'
                            : currentTier === 'proficient'
                            ? 'bg-gradient-to-r from-blue-500 to-cyan-400'
                            : currentTier === 'developing'
                            ? 'bg-gradient-to-r from-emerald-500 to-teal-400'
                            : 'bg-gradient-to-r from-rose-600 to-orange-500'
                        }`}
                        style={{ width: `${currentMastery}%` }}
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-2 pt-1 text-[11px] text-stone-400 border-t border-stone-800/80">
                      <div>
                        Số lần gặp:{' '}
                        <span className="text-stone-200 font-bold">
                          {currentMasteryState?.timesEncountered || 0}
                        </span>
                      </div>
                      <div>
                        Đúng / Sai:{' '}
                        <span className="text-emerald-400 font-bold">
                          {currentMasteryState?.timesCorrect || 0}
                        </span>
                        /
                        <span className="text-rose-400 font-bold">
                          {currentMasteryState?.timesIncorrect || 0}
                        </span>
                      </div>
                      <div>
                        Lần ôn gần nhất:{' '}
                        <span className="text-stone-200">
                          {currentMasteryState?.lastReviewedAt
                            ? new Date(currentMasteryState.lastReviewedAt).toLocaleDateString('vi-VN')
                            : 'Chưa ôn'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Meaning VN */}
                  <div>
                    <span className="text-[11px] font-bold text-stone-400 block mb-1">
                      Nghĩa Tiếng Việt:
                    </span>
                    <p className="text-sm sm:text-base font-bold text-emerald-300">
                      {selectedItem.meaningVi}
                    </p>
                  </div>

                  {/* Definition EN */}
                  {selectedItem.definitionEn && (
                    <div>
                      <span className="text-[11px] font-bold text-stone-400 block mb-1">
                        Định Nghĩa Tiếng Anh:
                      </span>
                      <p className="text-xs sm:text-sm text-stone-300 italic">
                        "{selectedItem.definitionEn}"
                      </p>
                    </div>
                  )}

                  {/* Example Sentence */}
                  {selectedItem.exampleSentence && (
                    <div className="bg-stone-950/80 border border-stone-800 rounded-xl p-3 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-amber-400">
                          Ví Dụ Ngữ Cảnh:
                        </span>
                        <button
                          onClick={() => handleSpeak(selectedItem.exampleSentence!)}
                          className="text-[11px] text-stone-400 hover:text-amber-300 flex items-center gap-1 transition"
                          title="Nghe câu ví dụ"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                          <span>Nghe câu</span>
                        </button>
                      </div>
                      <p className="text-xs sm:text-sm font-semibold text-stone-100">
                        "{selectedItem.exampleSentence}"
                      </p>
                      {selectedItem.exampleTranslation && (
                        <p className="text-[11px] sm:text-xs text-stone-400">
                          → {selectedItem.exampleTranslation}
                        </p>
                      )}
                    </div>
                  )}
                </div>

                {/* Bottom Actions for Quest 2 & Challenge */}
                <div className="pt-3 mt-3 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="text-[11px] text-stone-400 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
                    {allInitialLearned ? (
                      <span className="text-emerald-300 font-bold">
                        Đã khai ngộ đủ 6 từ vựng khởi đầu!
                      </span>
                    ) : (
                      <span>
                        Học 6 từ ({learnedVocabIds.length}/6) để mở câu hỏi.
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    {isQuest3Completed ? (
                      <button
                        disabled
                        className="flex-1 sm:flex-initial px-4 py-2 rounded-xl bg-stone-800 text-stone-500 font-bold text-xs tracking-wide border border-stone-700 cursor-not-allowed"
                      >
                        ✓ Đã mở và nhận kiếm
                      </button>
                    ) : (
                      <button
                        disabled={!allInitialLearned}
                        onClick={onStartChallenge}
                        className={`flex-1 sm:flex-initial px-4 py-2 rounded-xl font-bold text-xs sm:text-sm tracking-wide shadow-lg flex items-center justify-center gap-1.5 transition ${
                          allInitialLearned
                            ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-stone-950 hover:brightness-110 active:scale-95'
                            : 'bg-stone-800 text-stone-500 cursor-not-allowed border border-stone-700'
                        }`}
                      >
                        <span>
                          {allInitialLearned
                            ? 'Trả lời câu hỏi'
                            : `Cần học 6 từ khởi đầu (${learnedVocabIds.length}/6)`}
                        </span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* TAB 2: PRONUNCIATION SECTION (CHUYÊN MỤC PHÁT ÂM CHUẨN SGK) */}
        {mainTab === 'pronunciation' && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 bg-stone-900/90 text-stone-100">
            {/* Pronunciation Banner */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-950/80 via-stone-950 to-stone-900 border-2 border-amber-600/70 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-bold font-mono">
                    SGK GLOBAL SUCCESS • LANGUAGE
                  </span>
                  <span className="text-xs text-stone-400 font-wuxia">
                    {pronunciationData.wuxiaSecretName}
                  </span>
                </div>
                <h3 className="text-lg sm:text-2xl font-black text-amber-200 font-serif">
                  {pronunciationData.focusTopic}
                </h3>
                <p className="text-xs sm:text-sm text-stone-300 mt-1 italic font-sans">
                  {pronunciationData.focusTopicEn}
                </p>
              </div>

              {/* Target Sounds Pills */}
              <div className="flex items-center gap-2 flex-wrap">
                {pronunciationData.targetSounds.map((sound) => (
                  <button
                    key={sound}
                    onClick={() => handleSpeak(sound.replace(/[/]/g, ''))}
                    className="px-3.5 py-1.5 rounded-xl bg-amber-900/60 hover:bg-amber-800/80 border border-amber-500/70 text-amber-200 font-mono font-black text-sm sm:text-base flex items-center gap-1.5 shadow transition active:scale-95"
                    title={`Nghe âm ${sound}`}
                  >
                    <Radio className="w-3.5 h-3.5 text-amber-400" />
                    <span>{sound}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Phonetic Rules & Mouth Guide Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-stone-950/80 border border-stone-800 space-y-2">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
                  <Sparkles className="w-4 h-4" />
                  <span>Quy Tắc Phát Âm Trọng Yếu</span>
                </div>
                <p className="text-xs sm:text-sm text-stone-200 leading-relaxed font-sans">
                  {pronunciationData.ruleSummary}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-stone-950/80 border border-amber-800/50 space-y-2">
                <div className="flex items-center gap-2 text-cyan-300 font-bold text-xs uppercase tracking-wider">
                  <Headphones className="w-4 h-4" />
                  <span>Khẩu Hình &amp; Đặt Lưỡi Chuẩn</span>
                </div>
                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-sans">
                  {pronunciationData.mouthGuide}
                </p>
              </div>
            </div>

            {/* Official Practice Words Grid */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-black text-emerald-300 uppercase tracking-wider flex items-center gap-2 font-serif">
                  <BookOpen className="w-4 h-4" />
                  <span>Từ Luyện Âm Chuẩn SGK (Nghe &amp; Lặp Lại)</span>
                </h4>
                <span className="text-xs text-stone-400">
                  Nguồn: SGK Pearson &amp; NXB Giáo dục Việt Nam
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {pronunciationData.practiceWords.map((pw) => {
                  const isPlaying = playingWord === pw.word;
                  return (
                    <div
                      key={pw.word}
                      className="p-3 rounded-xl bg-stone-950/70 border border-stone-800 hover:border-amber-600/60 transition flex items-center justify-between gap-3 shadow-sm"
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-stone-100 text-sm sm:text-base">
                            {pw.word}
                          </span>
                          <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-amber-950 text-amber-300 border border-amber-800">
                            {pw.targetSound}
                          </span>
                        </div>
                        <div className="text-xs font-mono text-amber-400/90 mt-0.5">
                          {pw.ipa}
                        </div>
                        <div className="text-[11px] text-stone-400 truncate mt-0.5">
                          {pw.meaningVi}
                        </div>
                      </div>

                      <button
                        onClick={() => handleSpeak(pw.word)}
                        className={`p-2 rounded-xl border text-xs flex items-center justify-center transition shrink-0 active:scale-95 ${
                          isPlaying
                            ? 'bg-amber-500 text-stone-950 border-amber-400 animate-pulse'
                            : 'bg-stone-900 text-amber-300 border-amber-600/50 hover:bg-amber-600/30'
                        }`}
                        title={`Nghe phát âm từ "${pw.word}"`}
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Contrastive Pairs / Minimal Pairs (Bộ ba / cặp phân biệt) */}
            {pronunciationData.contrastPairs && pronunciationData.contrastPairs.length > 0 && (
              <div className="space-y-3 pt-2">
                <h4 className="text-sm font-black text-amber-300 uppercase tracking-wider flex items-center gap-2 font-serif">
                  <Radio className="w-4 h-4" />
                  <span>Bảng Đối Chiếu Phân Biệt Âm (Minimal Pairs)</span>
                </h4>

                <div className="space-y-2">
                  {pronunciationData.contrastPairs.map((pair, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-stone-950/80 border border-stone-800 space-y-2"
                    >
                      <span className="text-xs font-bold text-stone-300 block">
                        {pair.label}:
                      </span>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {pair.words.map((w) => (
                          <div
                            key={w.word}
                            onClick={() => handleSpeak(w.word)}
                            className="p-2 rounded-lg bg-stone-900 border border-stone-700/80 hover:border-amber-500 cursor-pointer flex items-center justify-between gap-2 transition"
                          >
                            <div>
                              <div className="font-bold text-xs sm:text-sm text-stone-100">
                                {w.word}
                              </div>
                              <div className="text-[10px] font-mono text-amber-400">
                                {w.ipa}
                              </div>
                            </div>
                            <Volume2 className="w-3.5 h-3.5 text-amber-400/80 shrink-0" />
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Practice Sentences in Context */}
            {pronunciationData.practiceSentences && pronunciationData.practiceSentences.length > 0 && (
              <div className="space-y-3 pt-2">
                <h4 className="text-sm font-black text-cyan-300 uppercase tracking-wider flex items-center gap-2 font-serif">
                  <Headphones className="w-4 h-4" />
                  <span>Luyện Âm Trong Câu Ngữ Cảnh (Sentences in Context)</span>
                </h4>

                <div className="space-y-2">
                  {pronunciationData.practiceSentences.map((s, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-stone-950/80 border border-stone-800 flex items-start justify-between gap-3"
                    >
                      <div className="space-y-1">
                        <p className="text-xs sm:text-sm font-semibold text-stone-100 leading-relaxed font-sans">
                          "{s.en}"
                        </p>
                        <p className="text-[11px] text-stone-400">→ {s.vi}</p>
                        {s.highlightWord && (
                          <span className="text-[10px] text-amber-400 font-mono">
                            Khẩu quyết trọng tâm: {s.highlightWord}
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => handleSpeak(s.en)}
                        className="p-2 rounded-xl bg-stone-900 text-amber-300 border border-amber-600/50 hover:bg-amber-600/30 transition shrink-0 active:scale-95"
                        title="Nghe câu này"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
