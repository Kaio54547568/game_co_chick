import { InventoryItem } from '../types/game';

export const INITIAL_ITEMS: Record<string, InventoryItem> = {
  novice_sword: {
    id: 'novice_sword',
    name: 'Thanh Phong Kiếm',
    slot: 'weapon',
    rarity: 'rare',
    description: 'Thanh kiếm khởi đầu của đệ tử chính phái, rèn bằng thép tinh luyện, tăng 18 Tấn Công và 180 Công Lực.',
    icon: '/assets/game/items/novice_sword.png',
    stats: {
      atkBonus: 18,
      congLucBonus: 180,
    },
  },
  jade_amulet: {
    id: 'jade_amulet',
    name: 'Bích Ngọc Bình An Phù',
    slot: 'accessory',
    rarity: 'epic',
    description: 'Ngọc bội cổ truyền tụ linh khí đất trời, gia tăng 12 Phòng Thủ, 60 Sinh Lực và 220 Công Lực.',
    icon: '/assets/game/items/jade_amulet.png',
    stats: {
      defBonus: 12,
      hpBonus: 60,
      congLucBonus: 220,
    },
  },
  secret_manual: {
    id: 'secret_manual',
    name: 'Anh Ngữ Bí Điển (Quyển 1)',
    slot: 'manual',
    rarity: 'legendary',
    description: 'Tàn quyển trấn phái ghi chép tinh hoa ngữ nghĩa tiếng Anh, tăng 10 Tấn Công, 10 Phòng Thủ và 350 Công Lực.',
    icon: '/assets/game/items/anh_ngu_bi_dien.png',
    stats: {
      atkBonus: 10,
      defBonus: 10,
      hpBonus: 40,
      congLucBonus: 350,
    },
  },
  loot_chest: {
    id: 'loot_chest',
    name: 'Rương Chiến Lợi Phẩm Ma Giáo',
    slot: 'loot',
    rarity: 'rare',
    description: 'Rương báu thu được sau khi dẹp loạn Ma Giáo, chứa nhiều đan dược và bí kíp võ học.',
    icon: '/assets/game/items/loot_chest.png',
    stats: {
      congLucBonus: 50,
    },
  },
};
