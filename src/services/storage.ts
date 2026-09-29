import { PlayerProfile, Gender, PlayerStats, UnitProgressState } from '../types/game';
import { INITIAL_QUESTS, createUnitQuests } from '../data/questsData';
import { evaluateUnitUnlocks } from '../data/progressionBalance';

const STORAGE_KEY = 'phuong_chick_english_wulin_save_v1';

export function createDefaultUnitStates(): Record<string, UnitProgressState> {
  const states: Record<string, UnitProgressState> = {};

  // Grade 10: Units 1 to 10
  for (let u = 1; u <= 10; u++) {
    const unitId = `g10-u${u.toString().padStart(2, '0')}`;
    states[unitId] = {
      unitId,
      grade: 10,
      unitNumber: u,
      progress: 0,
      isUnlocked: u === 1,
      isCompleted: false,
      quests: u === 1 ? JSON.parse(JSON.stringify(INITIAL_QUESTS)) : createUnitQuests(unitId, u, `Unit ${u}`),
      currentQuestIndex: 0,
      defeatedMobs: 0,
      defeatedEnemyIds: [],
      bossDefeated: false,
      learnedVocabIds: [],
      completedPropIds: [],
      lastPlayedAt: Date.now(),
    };
  }

  // Grade 11: Units 1 to 10
  for (let u = 1; u <= 10; u++) {
    const unitId = `g11-u${u.toString().padStart(2, '0')}`;
    states[unitId] = {
      unitId,
      grade: 11,
      unitNumber: u,
      progress: 0,
      isUnlocked: u === 1,
      isCompleted: false,
      quests: createUnitQuests(unitId, u, `Unit ${u}`),
      currentQuestIndex: 0,
      defeatedMobs: 0,
      defeatedEnemyIds: [],
      bossDefeated: false,
      learnedVocabIds: [],
      completedPropIds: [],
      lastPlayedAt: Date.now(),
    };
  }

  // Grade 12: Units 1 to 10
  for (let u = 1; u <= 10; u++) {
    const unitId = `g12-u${u.toString().padStart(2, '0')}`;
    states[unitId] = {
      unitId,
      grade: 12,
      unitNumber: u,
      progress: 0,
      isUnlocked: u === 1,
      isCompleted: false,
      quests: createUnitQuests(unitId, u, `Unit ${u}`),
      currentQuestIndex: 0,
      defeatedMobs: 0,
      defeatedEnemyIds: [],
      bossDefeated: false,
      learnedVocabIds: [],
      completedPropIds: [],
      lastPlayedAt: Date.now(),
    };
  }

  return states;
}

export function calculateCongLuc(stats: PlayerStats, equipmentStatsTotal: { hp: number; atk: number; def: number; bonus: number }): number {
  const levelPart = stats.level * 120;
  const hpPart = (stats.maxHp + equipmentStatsTotal.hp) * 2;
  const atkPart = (stats.attack + equipmentStatsTotal.atk) * 12;
  const defPart = (stats.defense + equipmentStatsTotal.def) * 10;
  return levelPart + hpPart + atkPart + defPart + equipmentStatsTotal.bonus;
}

export function createDefaultProfile(name: string, gender: Gender): PlayerProfile {
  const baseStats: PlayerStats = {
    level: 1,
    xp: 0,
    xpToNextLevel: 100,
    hp: 120,
    maxHp: 120,
    attack: 25,
    defense: 12,
    speed: 160,
    criticalRate: 0.15,
    criticalDamage: 1.5,
    congLuc: 0,
  };

  const initialCongLuc = calculateCongLuc(baseStats, { hp: 0, atk: 0, def: 0, bonus: 0 });
  baseStats.congLuc = initialCongLuc;

  const defaultUnitStates = createDefaultUnitStates();

  return {
    id: 'user_' + Date.now(),
    name: name.trim() || (gender === 'male' ? 'Tiêu Dao Kiếm Khách' : 'Linh Lung Nữ Hiệp'),
    gender,
    stats: baseStats,
    inventory: [],
    equipment: {
      weapon: null,
      accessory: null,
      manual: null,
    },
    unitProgress: 0,
    quests: JSON.parse(JSON.stringify(INITIAL_QUESTS)),
    currentQuestIndex: 0,
    defeatedMobs: 0,
    defeatedEnemyIds: [],
    bossDefeated: false,
    learnedVocabIds: [],
    completedPropIds: [],
    guardianQuestStates: {},
    studentQuestStates: {},
    knowledgeMastery: {},
    lastSavedAt: Date.now(),
    selectedGrade: 10,
    selectedUnitId: 'g10-u01',
    unitStates: defaultUnitStates,
  };
}

export class StorageService {
  // Lưu tiến độ vào LocalStorage
  static saveProfile(profile: PlayerProfile): void {
    try {
      profile.lastSavedAt = Date.now();
      // Synchronize active unit state into unitStates before saving
      if (profile.selectedUnitId && profile.unitStates) {
        const active = profile.unitStates[profile.selectedUnitId];
        if (active) {
          active.progress = Math.max(active.progress || 0, profile.unitProgress || 0);
          profile.unitProgress = active.progress;
          active.quests = profile.quests || active.quests;
          active.currentQuestIndex = profile.currentQuestIndex || active.currentQuestIndex;
          active.defeatedMobs = profile.defeatedMobs || active.defeatedMobs;
          active.defeatedEnemyIds = profile.defeatedEnemyIds || active.defeatedEnemyIds;
          active.bossDefeated = profile.bossDefeated || active.bossDefeated;
          active.learnedVocabIds = profile.learnedVocabIds || active.learnedVocabIds;
          active.completedPropIds = active.completedPropIds || [];
          active.guardianQuestStates = (profile.guardianQuestStates && profile.guardianQuestStates[profile.selectedUnitId]) || active.guardianQuestStates || {};
          active.isCompleted = active.bossDefeated || active.progress >= 100;
          active.lastPlayedAt = Date.now();
        }
        profile.unitStates = evaluateUnitUnlocks(profile.unitStates);
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    } catch (e) {
      console.error('Không thể lưu tiến độ:', e);
    }
  }

  // Tải tiến độ từ LocalStorage với migration an toàn không mất dữ liệu
  static loadProfile(): PlayerProfile | null {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) return null;
      const parsed = JSON.parse(data) as PlayerProfile;

      // Đảm bảo dữ liệu tương thích cơ bản
      if (!parsed.quests || parsed.quests.length === 0) {
        parsed.quests = JSON.parse(JSON.stringify(INITIAL_QUESTS));
      }
      parsed.defeatedEnemyIds = parsed.defeatedEnemyIds || [];
      parsed.learnedVocabIds = parsed.learnedVocabIds || [];
      parsed.completedPropIds = parsed.completedPropIds || [];
      parsed.guardianQuestStates = parsed.guardianQuestStates || {};
      parsed.studentQuestStates = parsed.studentQuestStates || {};
      parsed.inventory = parsed.inventory || [];
      parsed.equipment = parsed.equipment || { weapon: null, accessory: null, manual: null };

      // Migration Multi-Unit: nếu chưa có unitStates, tạo và map save cũ vào Unit 1
      if (!parsed.unitStates) {
        parsed.unitStates = createDefaultUnitStates();
        const u1 = parsed.unitStates['g10-u01'];
        if (u1) {
          u1.progress = parsed.unitProgress || 0;
          u1.quests = parsed.quests || u1.quests;
          u1.currentQuestIndex = parsed.currentQuestIndex || 0;
          u1.defeatedMobs = parsed.defeatedMobs || 0;
          u1.defeatedEnemyIds = parsed.defeatedEnemyIds || [];
          u1.bossDefeated = parsed.bossDefeated || false;
          u1.learnedVocabIds = parsed.learnedVocabIds || [];
          u1.isCompleted = parsed.bossDefeated || (parsed.unitProgress || 0) >= 100;
        }
      }

      // Đảm bảo đủ 20 Unit của lớp 10 và 11
      const defaultStates = createDefaultUnitStates();
      for (const [uid, defState] of Object.entries(defaultStates)) {
        if (!parsed.unitStates[uid]) {
          parsed.unitStates[uid] = defState;
        }
      }

      // Cập nhật điều kiện mở khóa theo quy tắc 70% GDD cho toàn bộ 30 Unit
      parsed.unitStates = evaluateUnitUnlocks(parsed.unitStates);

      parsed.selectedGrade = parsed.selectedGrade || 10;
      parsed.selectedUnitId = parsed.selectedUnitId || 'g10-u01';

      // Khởi tạo và chuẩn hóa knowledgeMastery cho dữ liệu save cũ
      parsed.knowledgeMastery = parsed.knowledgeMastery || {};
      Object.keys(parsed.knowledgeMastery).forEach((key) => {
        const item = parsed.knowledgeMastery[key];
        if (item) {
          if (typeof item.mastery !== 'number' || isNaN(item.mastery)) {
            item.mastery = 0;
          } else {
            item.mastery = Math.min(100, Math.max(0, item.mastery));
          }
          item.history = item.history || [];
        }
      });

      // Đảm bảo HP hợp lệ
      if (typeof parsed.stats.hp !== 'number' || isNaN(parsed.stats.hp) || parsed.stats.hp <= 0) {
        parsed.stats.hp = parsed.stats.maxHp;
      } else {
        parsed.stats.hp = Math.min(parsed.stats.maxHp, Math.max(1, parsed.stats.hp));
      }

      return parsed;
    } catch (e) {
      console.error('Không thể nạp tiến độ:', e);
      return null;
    }
  }

  // Xóa toàn bộ tiến độ (Reset chơi lại từ đầu)
  static clearProfile(): void {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.error('Không thể xóa tiến độ:', e);
    }
  }
}

