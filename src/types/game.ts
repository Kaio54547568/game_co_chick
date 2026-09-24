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

export interface CombatQuestion {
  id: string;
  knowledgeItemIds: string[]; // Linked knowledge item IDs
  type: QuestionType;
  prompt: string;
  options: string[];
  correctAnswer: string; // The correct string choice or sentence
  explanation: string;
  timeLimit: number; // in seconds
  wordsToOrder?: string[];
  difficulty: 'easy' | 'medium' | 'hard';
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

export interface PlayerProfile {
  id: string;
  name: string;
  gender: Gender;
  stats: PlayerStats;
  inventory: InventoryItem[];
  equipment: EquipmentState;
  unitProgress: number; // 0 - 100%
  quests: Quest[];
  currentQuestIndex: number;
  defeatedMobs: number;
  defeatedEnemyIds: string[];
  bossDefeated: boolean;
  learnedVocabIds: string[];
  knowledgeMastery: Record<string, KnowledgeMasteryState>;
  lastSavedAt: number;
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
}
