/**
 * GLOBAL SUCCESS CURRICULUM DATASET SCHEMA (GRADES 10-12)
 * FOR GLOBAL SUCCESS WULIN GAME INTEGRATION
 */

export type GradeLevel = 10 | 11 | 12;
export type ProvenanceType = 'extracted' | 'game_authored';
export type ReviewStatusType = 'verified' | 'needs_review' | 'asset_required';
export type QuestionType = 'multiple_choice' | 'fill_blank' | 'sentence_order';
export type QuestionDifficulty = 'easy' | 'medium' | 'hard';

export interface SourceProvenance {
  source_file: string;
  pdf_page: number;
  book_page: number | null;
  source_section: string;
  provenance: ProvenanceType;
  ocr_confidence: number; // 0.0 - 1.0
  review_status: ReviewStatusType;
}

export interface UnitSectionInfo {
  section_name: string; // e.g. "Getting Started", "Language", "Reading", etc.
  book_page_start: number;
  book_page_end: number;
  pdf_page_start: number;
  pdf_page_end: number;
  description: string;
}

export interface LearningObjectives {
  vocabulary: string;
  grammar: string[];
  pronunciation: string;
  reading: string;
  speaking: string;
  listening: string;
  writing: string;
}

export interface UnitMetadata extends SourceProvenance {
  grade: GradeLevel;
  unit_number: number;
  unit_id: string; // e.g. "g10-u01"
  title: string; // e.g. "FAMILY LIFE"
  topic: string;
  sections: UnitSectionInfo[];
  learning_objectives: LearningObjectives;
}

export interface VocabItem extends SourceProvenance {
  id: string; // e.g. "g10-u01-vocab-001"
  unit_id: string;
  word: string;
  word_type: string; // "noun", "verb", "adjective", "noun phrase", etc.
  ipa: string | null; // e.g. "/ˈbredˌwɪn.ər/", null if unverified
  meaning_vi: string;
  definition_en: string;
  example_sentence: string; // Original contextual example
  example_translation: string;
  collocations?: string[];
  word_family?: string[];
}

export interface GrammarMistakeItem {
  mistake: string;
  correction: string;
  explanation: string;
}

export interface GrammarItem extends SourceProvenance {
  id: string; // e.g. "g10-u01-grammar-001"
  unit_id: string;
  title: string;
  structure_name: string;
  rule_summary: string;
  formula: string;
  example_sentences: Array<{
    en: string;
    vi: string;
  }>;
  common_mistakes: GrammarMistakeItem[];
}

export interface ReadingGameQuestion {
  prompt: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export interface ReadingItem extends SourceProvenance {
  id: string; // e.g. "g10-u01-reading-001"
  unit_id: string;
  topic: string;
  main_idea: string;
  reading_skills: string[];
  keywords: string[];
  game_questions: ReadingGameQuestion[]; // Game-authored, not verbatim reproduction
}

export interface ListeningSkillInfo extends SourceProvenance {
  objective: string;
  activity_types: string[];
  audio_source_note: string;
  asset_required: boolean;
}

export interface SpeakingSkillInfo extends SourceProvenance {
  objective: string;
  activity_types: string[];
  prompts: string[];
}

export interface WritingSkillInfo extends SourceProvenance {
  objective: string;
  task_type: string;
  sample_outline?: string[];
}

export interface UnitSkillsData {
  listening: ListeningSkillInfo;
  speaking: SpeakingSkillInfo;
  writing: WritingSkillInfo;
}

export interface QuestionItem extends SourceProvenance {
  id: string; // e.g. "g10-u01-question-001"
  unit_id: string;
  knowledgeItemIds: string[]; // references VocabItem.id or GrammarItem.id
  type: QuestionType;
  prompt: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  difficulty: QuestionDifficulty;
  timeLimit: number; // in seconds
  wordsToOrder?: string[]; // for sentence_order
}

export interface UnitDataset {
  metadata: UnitMetadata;
  vocabulary: VocabItem[];
  grammar: GrammarItem[];
  reading: ReadingItem;
  skills: UnitSkillsData;
  questions: QuestionItem[];
}
