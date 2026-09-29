export type Gender = 'male' | 'female';

export interface PlayerStats {
  level: number;
  xp: number;
  xpToNextLevel: number;
  hp: number;
  maxHp: number;
  attack: number;
  defense: number;
  speed: number;
  criticalRate: number;
  criticalDamage: number;
  congLuc: number;
}

export type ItemRarity = 'common' | 'rare' | 'epic' | 'legendary';
export type ItemSlot = 'weapon' | 'accessory' | 'manual' | 'loot';

export interface ItemStats {
  hpBonus?: number;
  atkBonus?: number;
  defBonus?: number;
  congLucBonus?: number;
}

export interface InventoryItem {
  id: string;
  name: string;
  slot: ItemSlot;
  rarity: ItemRarity;
  description: string;
  icon: string;
  stats: ItemStats;
  isEquipped?: boolean;
}

export interface EquipmentState {
  weapon: InventoryItem | null;
  accessory: InventoryItem | null;
  manual: InventoryItem | null;
}

export type KnowledgeItemType = 'vocabulary' | 'grammar';

export interface KnowledgeItem {
  id: string; // knowledgeItemId
  type: KnowledgeItemType;
  title: string;
  wordType?: string;
  ipa?: string;
  meaningVi: string;
  definitionEn?: string;
  exampleSentence?: string;
  exampleTranslation?: string;
  topic: string;
}

export interface KnowledgeAnswerRecord {
  isCorrect: boolean;
  responseTimeSec: number;
  timestamp: number;
}

export interface KnowledgeMasteryState {
  knowledgeItemId: string;
  mastery: number; // 0 - 100
  timesEncountered: number;
  timesCorrect: number;
  timesIncorrect: number;
  lastAnsweredCorrectly: boolean | null;
  lastResponseTimeSec: number;
  lastReviewedAt: number;
  history: KnowledgeAnswerRecord[];
}

export interface VocabularyItem extends KnowledgeItem {
  word: string;
  mastery: number; // 0 - 100
}

export type QuestionType = 'multiple_choice' | 'sentence_order' | 'fill_blank';

export type CombatMode =
  | 'unseal'             // Phá Phong Ấn (Sentence Order / Scramble)
  | 'lost_word'          // Đoạt Lại Vong Từ (Fill-in-blank / Collocation with hint)
  | 'listening_pursuit'  // Mê Âm Truy Kích (Listening comprehension + TTS)
  | 'deception_pierce'   // Thiên Diện Phá Ảo (Reading + Evidence Anchor sentence)
  | 'escort_dialogue'    // Hộ Tống Hội Thoại (Everyday English with tactical buffs)
  | 'triple_combo'       // Liên Hoàn Tam Chiêu (3-Phase Boss Rush: Listen -> Comprehend -> Strike)
  | 'standard';          // Standard multiple choice

export interface DialogueTacticalChoice {
  text: string;
  buffEffect: 'shield' | 'weaken' | 'atk_boost';
  buffValue: number;
  buffDescription: string;
  isOptimal?: boolean;
}

export interface ComboStepItem {
  stepNumber: 1 | 2 | 3;
  stepType: 'listen' | 'comprehend' | 'unseal';
  title: string;
  prompt: string;
  options?: string[];
  wordsToOrder?: string[];
  correctAnswer: string;
  listeningScript?: string;
  hint?: string;
}

export interface CombatQuestion {
  id: string;
  knowledgeItemIds: string[]; // Linked knowledge item IDs
  type: QuestionType;
  combatMode?: CombatMode;
  prompt: string;
  options: string[];
  correctAnswer: string; // The correct string choice or sentence
  explanation: string;
  timeLimit: number; // in seconds
  difficulty: 'easy' | 'medium' | 'hard';

  // Mode 1: Phá Phong Ấn (sentence_order)
  wordsToOrder?: string[];

  // Mode 2: Đoạt Lại Vong Từ (hint mechanic: -40% damage penalty)
  hintText?: string;
  missingWord?: string;

  // Mode 3: Mê Âm Truy Kích (listening comprehension)
  listeningScript?: string;
  transcriptFallback?: string;
  audioClipUrl?: string;
  maxReplays?: number;

  // Mode 4: Thiên Diện Phá Ảo (reading comprehension with evidence anchor)
  readingPassage?: string;
  passageSentences?: string[];
  evidenceSentenceIndex?: number;
  trapExplanation?: string;

  // Mode 5: Hộ Tống Hội Thoại (tactical buffs/debuffs)
  dialogueChoices?: DialogueTacticalChoice[];

  // Mode 6: Liên Hoàn Tam Chiêu (3-phase combo chain)
  comboSteps?: ComboStepItem[];
  weaknessAnalysis?: string;
}

export type QuestStatus = 'locked' | 'available' | 'in_progress' | 'completed';

export interface Quest {
  id: string;
  step: number;
  title: string;
  objective: string;
  description: string;
  location: string;
  npcName: string;
  status: QuestStatus;
  progress: number;
  maxProgress: number;
  unitProgressGain: number; // Percentage contribution
  rewards: {
    xp: number;
    items?: InventoryItem[];
  };
}

export type PropCategory =
  | 'decoration'
  | 'vocab_discovery'
  | 'reading_clue'
  | 'listening_clue'
  | 'dialogue'
  | 'quest_clue';

export interface PropActivityData {
  unitId: string;
  propId: string;
  propName: string;
  category: PropCategory;
  loreIntro: string;
  question: {
    id: string;
    prompt: string;
    options: string[];
    correctAnswer: string;
    explanation: string;
    knowledgeItemIds?: string[];
  };
  reward: {
    xp: number;
    unitProgressGain: number;
  };
}

export type GuardianId =
  | 'ho_phap_phuong_tu'
  | 'ho_phap_dang_tran_ha'
  | 'ho_phap_hoang_van'
  | 'ho_phap_nguyet_nguyen';

export type GuardianQuestStatus = 'not_started' | 'in_progress' | 'completed' | 'rewarded';
export type StudentQuestStatus = 'not_started' | 'in_progress' | 'completed' | 'rewarded';

export interface UnitProgressState {
  unitId: string;
  grade: 10 | 11 | 12;
  unitNumber: number;
  progress: number; // 0 - 100%
  isUnlocked: boolean;
  isCompleted: boolean;
  quests: Quest[];
  currentQuestIndex: number;
  defeatedMobs: number;
  defeatedEnemyIds: string[];
  bossDefeated: boolean;
  learnedVocabIds: string[];
  completedPropIds?: string[]; // IDs of completed props in this unit
  guardianQuestStates?: Record<string, GuardianQuestStatus>; // npcId -> status in this unit
  highScore?: number;
  lastPlayedAt: number;
}

export interface PlayerProfile {
  id: string;
  name: string;
  gender: Gender;
  stats: PlayerStats;
  inventory: InventoryItem[];
  equipment: EquipmentState;
  unitProgress: number; // Active unit progress: 0 - 100%
  quests: Quest[];
  currentQuestIndex: number;
  defeatedMobs: number;
  defeatedEnemyIds: string[];
  bossDefeated: boolean;
  learnedVocabIds: string[];
  completedPropIds?: string[]; // Stored as "unitId:propId" to prevent duplicate reward farming
  guardianQuestStates?: Record<string, Record<string, GuardianQuestStatus>>; // unitId -> npcId -> status
  studentQuestStates?: Record<string, StudentQuestStatus>; // questId -> status (independent mentor quests)
  knowledgeMastery: Record<string, KnowledgeMasteryState>;
  lastSavedAt: number;

  // Multi-unit system (Grades 10, 11 & 12)
  selectedGrade?: 10 | 11 | 12;
  selectedUnitId?: string;
  unitStates?: Record<string, UnitProgressState>;
}

export interface CombatEnemy {
  id: string;
  name: string;
  title: string;
  spriteKey: string;
  hp: number;
  maxHp: number;
  attack: number;
  defense: number;
  xpReward: number;
  isBoss?: boolean;
  bossPhase?: number;
  dialogueIntro?: string;
  dialoguePhase2?: string;
  combatMode?: CombatMode;
  learningSkill?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  winCondition?: string;
  tutorialBriefing?: string;
  requiredQuestionsCount?: number;
}

