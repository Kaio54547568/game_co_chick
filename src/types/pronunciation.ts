/**
 * Global Success Pronunciation (Phát Âm) Types & Schema
 * Aligned with official Global Success curriculum (Grades 10, 11, 12 - NXB Giáo dục Việt Nam & Pearson)
 */

export type EnglishAccent = 'en-US' | 'en-GB';

export interface PronunciationPracticeWord {
  word: string;
  ipa: string;
  meaningVi: string;
  targetSound: string; // e.g. '/br/', '1st syllable', 'rising'
  audioText?: string; // Optional custom speech text if different
}

export interface PronunciationContrastPair {
  label: string;
  words: Array<{
    word: string;
    ipa: string;
    sound: string;
  }>;
  note?: string;
}

export interface PronunciationQuestion {
  prompt: string;
  audioScript?: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export interface UnitPronunciationData {
  unitId: string;
  grade: 10 | 11 | 12;
  unitNumber: number;
  unitTitle: string;
  focusTopic: string; // e.g. "Phụ âm ghép: /br/, /kr/, /tr/"
  focusTopicEn: string; // "Consonant blends: /br/, /kr/, and /tr/"
  targetSounds: string[]; // e.g. ['/br/', '/kr/', '/tr/']
  wuxiaSecretName: string; // e.g. "Tam Âm Hợp Nhất Kiếm Quyết"
  ruleSummary: string; // Pedagogical explanation of the rule
  mouthGuide: string; // Articulatory guide (vị trí lưỡi, môi, bật hơi)
  practiceWords: PronunciationPracticeWord[];
  contrastPairs: PronunciationContrastPair[];
  practiceSentences: Array<{
    en: string;
    vi: string;
    highlightWord?: string;
  }>;
  challengeQuestion: PronunciationQuestion;
}
