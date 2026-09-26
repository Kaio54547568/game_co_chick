import { UnitDataset, VocabItem, GrammarItem, QuestionItem } from './types';
import { GRADE_10_UNITS } from './grade-10';
import { GRADE_11_UNITS } from './grade-11';
import { GRADE_12_UNITS } from './grade-12';
import { KnowledgeItem, CombatQuestion } from '../../src/types/game';

export * from './types';
export { GRADE_10_UNITS } from './grade-10';
export { GRADE_11_UNITS } from './grade-11';
export { GRADE_12_UNITS } from './grade-12';

export const ALL_GLOBAL_SUCCESS_UNITS: UnitDataset[] = [
  ...GRADE_10_UNITS,
  ...GRADE_11_UNITS,
  ...GRADE_12_UNITS,
];

/**
 * Get a specific Unit dataset by stable unit ID (e.g. 'g10-u01', 'g11-u05', 'g12-u10')
 */
export function getUnitDataset(unitId: string): UnitDataset | undefined {
  return ALL_GLOBAL_SUCCESS_UNITS.find((u) => u.metadata.unit_id === unitId);
}

/**
 * Adapter: Convert a Unit dataset's vocabulary and grammar items into the game's KnowledgeItem[] format
 */
export function toGameKnowledgeItems(unit: UnitDataset): KnowledgeItem[] {
  const vocabItems: KnowledgeItem[] = unit.vocabulary.map((v: VocabItem) => ({
    id: v.id,
    type: 'vocabulary',
    title: v.word,
    wordType: v.word_type,
    ipa: v.ipa || undefined,
    meaningVi: v.meaning_vi,
    definitionEn: v.definition_en,
    exampleSentence: v.example_sentence,
    exampleTranslation: v.example_translation,
    topic: `${unit.metadata.title} - Vocab`,
  }));

  const grammarItems: KnowledgeItem[] = unit.grammar.map((g: GrammarItem) => ({
    id: g.id,
    type: 'grammar',
    title: g.title,
    meaningVi: g.structure_name,
    definitionEn: g.rule_summary,
    exampleSentence: g.example_sentences[0]?.en,
    exampleTranslation: g.example_sentences[0]?.vi,
    topic: `${unit.metadata.title} - Grammar`,
  }));

  return [...vocabItems, ...grammarItems];
}

/**
 * Adapter: Convert a Unit dataset's questions into the game's CombatQuestion[] format
 */
export function toGameCombatQuestions(unit: UnitDataset): CombatQuestion[] {
  return unit.questions.map((q: QuestionItem) => ({
    id: q.id,
    knowledgeItemIds: q.knowledgeItemIds,
    type: q.type,
    prompt: q.prompt,
    options: q.options,
    correctAnswer: q.correctAnswer,
    explanation: q.explanation,
    timeLimit: q.timeLimit,
    wordsToOrder: q.wordsToOrder,
    difficulty: q.difficulty,
  }));
}
