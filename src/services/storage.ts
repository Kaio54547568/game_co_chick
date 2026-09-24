import { PlayerProfile, Gender, PlayerStats } from '../types/game';
import { INITIAL_QUESTS } from '../data/questsData';

const STORAGE_KEY = 'phuong_chick_english_wulin_save_v1';

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
    knowledgeMastery: {},
    lastSavedAt: Date.now(),
  };
}

export class StorageService {
  // Lưu tiến độ vào LocalStorage (chuẩn bị giao diện để nối Supabase)
  static saveProfile(profile: PlayerProfile): void {
    try {
      profile.lastSavedAt = Date.now();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    } catch (e) {
      console.error('Không thể lưu tiến độ:', e);
    }
  }

  // Tải tiến độ từ LocalStorage
  static loadProfile(): PlayerProfile | null {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) return null;
      const parsed = JSON.parse(data) as PlayerProfile;
      // Đảm bảo dữ liệu tương thích
      if (!parsed.quests || parsed.quests.length === 0) {
        parsed.quests = JSON.parse(JSON.stringify(INITIAL_QUESTS));
      }
      parsed.defeatedEnemyIds = parsed.defeatedEnemyIds || [];
      parsed.learnedVocabIds = parsed.learnedVocabIds || [];
      parsed.inventory = parsed.inventory || [];
      parsed.equipment = parsed.equipment || { weapon: null, accessory: null, manual: null };

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
