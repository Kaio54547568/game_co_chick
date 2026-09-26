import React, { useState, useMemo, useEffect } from 'react';
import { ALL_KNOWLEDGE_ITEMS, DEMO_VOCABULARY } from '../data/demoLearningData';
import { KnowledgeItem, Quest, KnowledgeMasteryState } from '../types/game';
import { UnitContentService } from '../services/unitContentService';
import { MasteryEngine } from '../services/masteryEngine';
import { soundService } from '../services/sound';
import { speechService } from '../services/speechService';
import { BookOpen, Volume2, CheckCircle2, ChevronRight, X, Sparkles, Filter, Award, AlertCircle } from 'lucide-react';

interface VocabularyModalProps {
  currentQuest: Quest | undefined;
  learnedVocabIds: string[];
  knowledgeMastery: Record<string, KnowledgeMasteryState>;
  selectedUnitId?: string;
  onLearnVocab: (vocabId: string) => void;
  onAdvanceQuest: (questId: string) => void;
  onStartChallenge: () => void;
  onClose: () => void;
}

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
  const knowledgeItems = useMemo(() => {
    const items = selectedUnitId ? UnitContentService.getUnitKnowledgeItems(selectedUnitId) : ALL_KNOWLEDGE_ITEMS;
    return items.length > 0 ? items : ALL_KNOWLEDGE_ITEMS;
  }, [selectedUnitId]);

  const vocabList = useMemo(() => {
    return knowledgeItems.filter((i) => i.type === 'vocabulary');
  }, [knowledgeItems]);

  const [selectedItem, setSelectedItem] = useState<KnowledgeItem>(knowledgeItems[0]);
  const [activeTab, setActiveTab] = useState<FilterTab>('all');

  useEffect(() => {
    if (knowledgeItems.length > 0) {
      setSelectedItem(knowledgeItems[0]);
    }
  }, [knowledgeItems]);

  const handleSpeak = (text: string) => {
    soundService.playClick();
    speechService.speak(text, {
      rate: 0.88,
    });
  };

  // Tự động ghi nhận từ đầu tiên vào Quest 2 nếu chưa học
  useEffect(() => {
    const firstVocab = vocabList[0];
    if (firstVocab && !learnedVocabIds.includes(firstVocab.id)) {
      onLearnVocab(firstVocab.id);
    }
  }, [vocabList, learnedVocabIds]);

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
        <div className="p-3.5 sm:p-5 border-b border-stone-800 flex items-center justify-between bg-stone-950/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-500/60 flex items-center justify-center text-emerald-400">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-black text-emerald-200 font-wuxia">
                  Bí Điển Tri Thức — Võ Lâm Anh Ngữ
                </h2>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  {selectedUnitId ? selectedUnitId.toUpperCase() : 'Unit 1'}
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-stone-400">
                Thủ hộ: Hộ Pháp Phương Tú • Lối Sống Gia Đình &amp; Môi Trường Xanh
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-100 hover:bg-stone-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

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
                      <span className="text-xs text-stone-400 font-mono">{selectedItem.ipa}</span>
                    )}
                    <span className="text-[10px] text-stone-400">ID: {selectedItem.id}</span>
                  </div>
                </div>

                {selectedItem.type === 'vocabulary' && (
                  <button
                    onClick={() => handleSpeak(selectedItem.title)}
                    className="p-2 sm:px-3 sm:py-2 rounded-xl bg-amber-600/30 hover:bg-amber-600/50 border border-amber-500/50 text-amber-300 transition flex items-center gap-1.5 active:scale-95 text-xs font-bold shrink-0"
                    title="Nghe phát âm"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span className="hidden sm:inline">Phát Âm</span>
                  </button>
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
                      ? '★ Mastered (&ge;90)'
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
                  <span className="text-[11px] font-bold text-amber-400 block">
                    Ví Dụ Ngữ Cảnh:
                  </span>
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
                    Học 6 từ khởi đầu ({learnedVocabIds.length}/6) để mở Thử Thách Phong Ấn.
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                {isQuest3Completed ? (
                  <button
                    disabled
                    className="flex-1 sm:flex-initial px-4 py-2 rounded-xl bg-stone-800 text-stone-500 font-bold text-xs tracking-wide border border-stone-700 cursor-not-allowed"
                  >
                    ✓ Phong Ấn Đã Khai Mở (Đã nhận kiếm)
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
                        ? 'Phá Phong Ấn Tri Thức'
                        : `Cần học 6 từ khởi đầu (${learnedVocabIds.length}/6)`}
                    </span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
