/**
 * LEVEL CONFIGURATION FOR ALL 30 UNITS (GRADES 10, 11, 12)
 * Auto-generated and verified against Global Success dataset & expansion manifests.
 */
import { CombatEnemy, PropCategory, CombatMode } from '../../types/game';

export interface LevelEnemyConfig {
  encounterId: string;
  enemyId: string;
  name: string;
  title: string;
  concept: string;
  spritePath: string;
  x: number;
  y: number;
  patrolRange: { minX: number; maxX: number };
  hp: number;
  maxHp: number;
  attack: number;
  defense: number;
  xpReward: number;
  combatMode?: CombatMode;
  learningSkill?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  requiredQuestionsCount?: number;
  winCondition?: string;
  tutorialBriefing?: string;
}

export interface LevelNpcConfig {
  id: string;
  name: string;
  title: string;
  elementColor: string;
  spriteKey: string;
  portraitPath: string;
  x: number;
  y: number;
  prompt: string;
  dialogueIntro: string;
}

export interface LevelPropConfig {
  id: string;
  name: string;
  path: string;
  x: number;
  y: number;
  size: [number, number];
  category?: PropCategory;
  loreIntro?: string;
}

export interface LevelClimaxConfig {
  hasRealBoss: boolean;
  encounterId: string;
  enemy: CombatEnemy;
  x: number;
  y: number;
  barrierPrompt: string;
  unlockedPrompt: string;
}

export interface LevelMapConfig {
  unitId: string;
  grade: 10 | 11 | 12;
  unitNumber: number;
  title: string;
  topic: string;
  mapWidth: number;
  mapHeight: number;
  ground: {
    primaryPath: string;
    secondaryPath?: string | null;
    tileable: boolean;
  };
  npcs: LevelNpcConfig[];
  props: LevelPropConfig[];
  enemies: LevelEnemyConfig[];
  climax: LevelClimaxConfig;
}

export const ALL_LEVEL_CONFIGS: Record<string, LevelMapConfig> = {
  "g10-u01": {
    "unitId": "g10-u01",
    "grade": 10,
    "unitNumber": 1,
    "title": "FAMILY LIFE",
    "topic": "Family Life and Household Responsibilities",
    "mapWidth": 3200,
    "mapHeight": 2000,
    "ground": {
      "primaryPath": "/assets/game/units/grade-10/unit-01/ground/courtyard_brick.png",
      "secondaryPath": null,
      "tileable": false
    },
    "npcs": [
      {
        "id": "bang_chu",
        "name": "Hồng y tông chủ Hà Ánh Phượng",
        "title": "Lãnh Tụ Võ Lâm Chính Phái",
        "elementColor": "#fbe285",
        "spriteKey": "bang_chu_ha_anh_phuong",
        "portraitPath": "/assets/game/characters/npc/portraits/bang_chu_ha_anh_phuong.png",
        "x": 550,
        "y": 560,
        "prompt": "[E] Bái kiến Hồng y tông chủ Hà Ánh Phượng",
        "dialogueIntro": "Chào mừng thiếu hiệp! Hôm nay chúng ta cùng khám phá Unit 1: FAMILY LIFE (Family Life and Household Responsibilities). Hãy rèn luyện võ học, giải trừ ma chướng!"
      },
      {
        "id": "bach_khoa_thu_sinh",
        "name": "Bách Khoa thư Sinh Đinh Ngọc Khánh",
        "title": "Đại Sư Huynh Tông Môn",
        "elementColor": "#c084fc",
        "spriteKey": "bach_khoa_thu_sinh",
        "portraitPath": "/assets/game/characters/npc/portraits/bach_khoa_thu_sinh_v2.png",
        "x": 740,
        "y": 480,
        "prompt": "[E] Thỉnh Giáo Bách Khoa thư Sinh Đinh Ngọc Khánh",
        "dialogueIntro": "Chào sư đệ/sư muội! Đại học không nhàn như giang hồ đồn đâu các đệ... Nhưng qua được ải THPT này, thiên hạ sẽ mở rộng trước mắt! Có gì vướng mắc về bẫy thi cử hay kỹ năng thực chiến, cứ hỏi ta!"
      },
      {
        "id": "ho_phap_phuong_tu",
        "name": "Hộ Pháp Phương Tú",
        "title": "Hộ Pháp Từ Vựng & Trưởng Thành",
        "elementColor": "#59caa0",
        "spriteKey": "ho_phap_phuong_tu",
        "portraitPath": "/assets/game/characters/npc/portraits/ho_phap_phuong_tu.png",
        "x": 920,
        "y": 560,
        "prompt": "[E] Tham Vấn Hộ Pháp Phương Tú",
        "dialogueIntro": "Tàng Kinh Các lưu giữ toàn bộ bí điển từ vựng của FAMILY LIFE. Hãy lĩnh hội từng câu chữ để tích lũy công lực căn bản!"
      },
      {
        "id": "ho_phap_dang_tran_ha",
        "name": "Hộ Pháp Đặng Trần Hà",
        "title": "Hộ Pháp Ngữ Pháp & Thách Đấu",
        "elementColor": "#60a5fa",
        "spriteKey": "ho_phap_dang_tran_ha",
        "portraitPath": "/assets/game/characters/npc/portraits/ho_phap_dang_tran_ha.png",
        "x": 1850,
        "y": 560,
        "prompt": "[E] Bái Kiến Hộ Pháp Đặng Trần Hà",
        "dialogueIntro": "Ngữ pháp là xương sống của kiếm chiêu! Muốn phá phong ấn thạch trận của FAMILY LIFE, tâm ý phải chuẩn xác, cú pháp không được sai lệch một ly!"
      },
      {
        "id": "ho_phap_hoang_van",
        "name": "Hộ Pháp Hoàng Vân",
        "title": "Hộ Pháp Nghe & Nhịp Điệu",
        "elementColor": "#fbbf24",
        "spriteKey": "ho_phap_hoang_van",
        "portraitPath": "/assets/game/characters/npc/portraits/ho_phap_hoang_van.png",
        "x": 2400,
        "y": 760,
        "prompt": "[E] Thỉnh Giáo Hộ Pháp Hoàng Vân",
        "dialogueIntro": "Lắng nghe âm điệu tự nhiên, nghe rõ từng ngữ âm để thấu suốt chiêu thức địch nhân. Hãy vào Võ Luyện Đài luyện tập cùng ta!"
      },
      {
        "id": "ho_phap_nguyet_nguyen",
        "name": "Hộ Pháp Nguyệt Nguyên",
        "title": "Hộ Pháp Đọc Hiểu & Minh Triết",
        "elementColor": "#38bdf8",
        "spriteKey": "ho_phap_nguyet_nguyen",
        "portraitPath": "/assets/game/characters/npc/portraits/ho_phap_nguyet_nguyen.png",
        "x": 660,
        "y": 1260,
        "prompt": "[E] Luận Đạo Hộ Pháp Nguyệt Nguyên",
        "dialogueIntro": "Minh Triết Các soi rọi chân lý. Khi đối mặt với thuật ngụy tạo và mê trận thông tin của FAMILY LIFE, hãy tìm đúng câu bằng chứng để phá tan ảo ảnh!"
      }
    ],
    "props": [
        {
                "id": "g10-u01_rice_basket",
                "name": "Vietnamese bamboo basket with rice and herbs",
                "path": "/assets/game/units/grade-10/unit-01/props/rice_basket.png",
                "x": 1380,
                "y": 580,
                "size": [
                        160,
                        160
                ],
                "category": "vocab_discovery"
        },
        {
                "id": "g10-u01_secondary_prop",
                "name": "Bí Điển Gia Phong & Nếp Nhà",
                "path": "/assets/game/items/anh_ngu_bi_dien.png",
                "x": 860,
                "y": 1300,
                "size": [
                        128,
                        128
                ],
                "category": "reading_clue"
        }
      ],
    "enemies": [
        {
                "encounterId": "g10-u01_enc_broom_raider",
                "enemyId": "broom_raider",
                "name": "Tảo Trượng Đạo Tặc",
                "title": "Tà Binh Tuần Tra",
                "concept": "corrupted household-chores bandit with broom spear",
                "spritePath": "/assets/game/units/grade-10/unit-01/enemies/broom_raider.png",
                "x": 1450,
                "y": 1050,
                "patrolRange": {
                        "minX": 1380,
                        "maxX": 1540
                },
                "hp": 130,
                "maxHp": 130,
                "attack": 17,
                "defense": 7,
                "xpReward": 88,
                "combatMode": "lost_word",
                "learningSkill": "Đoạt Lại Vong Từ (Từ Vựng & Cụm Từ Cốt Lõi)",
                "difficulty": "easy",
                "requiredQuestionsCount": 1,
                "winCondition": "Điền chính xác từ khuyết thiếu để đoạt lại vong từ",
                "tutorialBriefing": "Đoạt Lại Vong Từ: Kẻ địch che giấu một từ vựng trọng tâm. Dùng manh mối gợi ý và kiến thức để điền chính xác!"
        },
        {
                "encounterId": "g10-u01_enc_smoke_wraith",
                "enemyId": "smoke_wraith",
                "name": "Yên Hồn Oán Quỷ",
                "title": "Tà Binh Tuần Tra",
                "concept": "cooking-smoke wraith with clay stove embers",
                "spritePath": "/assets/game/units/grade-10/unit-01/enemies/smoke_wraith.png",
                "x": 1950,
                "y": 1050,
                "patrolRange": {
                        "minX": 1870,
                        "maxX": 2030
                },
                "hp": 145,
                "maxHp": 145,
                "attack": 19,
                "defense": 8,
                "xpReward": 98,
                "combatMode": "listening_pursuit",
                "learningSkill": "Mê Âm Truy Kích (Luyện Nghe & Nhận Diện Ngữ Âm)",
                "difficulty": "easy",
                "requiredQuestionsCount": 1,
                "winCondition": "Lắng nghe thông điệp âm thanh và nhận diện chính xác yếu nghĩa",
                "tutorialBriefing": "Mê Âm Truy Kích: Kẻ địch truyền âm huyễn hoặc! Bấm nút Nghe để phát âm thanh khẩu quyết và giải mã ý nghĩa!"
        },
        {
                "encounterId": "g10-u01_enc_water_jar_golem",
                "enemyId": "water_jar_golem",
                "name": "Thủy Bình Thạch Nhân",
                "title": "Tà Binh Tuần Tra",
                "concept": "cracked terracotta water jar guardian",
                "spritePath": "/assets/game/units/grade-10/unit-01/enemies/water_jar_golem.png",
                "x": 2450,
                "y": 1150,
                "patrolRange": {
                        "minX": 2370,
                        "maxX": 2530
                },
                "hp": 160,
                "maxHp": 160,
                "attack": 21,
                "defense": 9,
                "xpReward": 108,
                "combatMode": "unseal",
                "learningSkill": "Phá Phong Ấn (Cấu Trúc Cú Pháp & Trật Tự Câu)",
                "difficulty": "medium",
                "requiredQuestionsCount": 1,
                "winCondition": "Sắp xếp các phiến đá từ ngữ thành câu đúng ngữ pháp",
                "tutorialBriefing": "Phá Phong Ấn: Giáp hộ thân của Thạch Nhân chỉ bị phá vỡ khi sắp xếp các từ ngữ theo đúng trật tự cú pháp!"
        },
        {
                "encounterId": "g10-u01_enc_basket_mimic",
                "enemyId": "basket_mimic",
                "name": "Trúc Lung Huyễn Quái",
                "title": "Tà Binh Tuần Tra",
                "concept": "mischievous woven bamboo basket mimic",
                "spritePath": "/assets/game/units/grade-10/unit-01/enemies/basket_mimic.png",
                "x": 2850,
                "y": 1300,
                "patrolRange": {
                        "minX": 2770,
                        "maxX": 2930
                },
                "hp": 175,
                "maxHp": 175,
                "attack": 23,
                "defense": 10,
                "xpReward": 118,
                "combatMode": "deception_pierce",
                "learningSkill": "Thiên Diện Phá Ảo (Đọc Hiểu & Định Vị Câu Dẫn Chứng)",
                "difficulty": "medium",
                "requiredQuestionsCount": 1,
                "winCondition": "Chọn đáp án đúng VÀ định vị đúng câu dẫn chứng [1]-[4]",
                "tutorialBriefing": "Thiên Diện Phá Ảo: Ảo ảnh che mắt! Đọc kỹ đoạn văn bản, chọn đáp án đúng và bấm chọn đúng CÂU DẪN CHỨNG [1]-[4]!"
        },
        {
                "encounterId": "g10-u01_enc_lantern_archer",
                "enemyId": "lantern_archer",
                "name": "Đăng Lung Xạ Thủ",
                "title": "Tà Binh Tuần Tra",
                "concept": "corrupted village lantern archer",
                "spritePath": "/assets/game/units/grade-10/unit-01/enemies/lantern_archer.png",
                "x": 1750,
                "y": 1380,
                "patrolRange": {
                        "minX": 1670,
                        "maxX": 1830
                },
                "hp": 190,
                "maxHp": 190,
                "attack": 25,
                "defense": 11,
                "xpReward": 128,
                "combatMode": "escort_dialogue",
                "learningSkill": "Hộ Tống Hội Thoại (Giao Tiếp Tình Huống & Phản Hồi Chiến Thuật)",
                "difficulty": "medium",
                "requiredQuestionsCount": 1,
                "winCondition": "Lựa chọn câu đối đáp thấu tình đạt lý, kích hoạt khiên hộ thể",
                "tutorialBriefing": "Hộ Tống Hội Thoại: Đối thủ dùng lời kích động tâm trí! Chọn phương án đối đáp chuẩn mực để kích hoạt khiên bảo hộ!"
        },
        {
                "encounterId": "g10-u01_enc_steward_elite",
                "enemyId": "steward_elite",
                "name": "Quản Gia Hộ Vệ",
                "title": "Hộ Vệ Tinh Anh",
                "concept": "elite possessed household steward",
                "spritePath": "/assets/game/units/grade-10/unit-01/enemies/steward_elite.png",
                "x": 2250,
                "y": 1450,
                "patrolRange": {
                        "minX": 2170,
                        "maxX": 2330
                },
                "hp": 235,
                "maxHp": 235,
                "attack": 26,
                "defense": 11,
                "xpReward": 195,
                "combatMode": "triple_combo",
                "learningSkill": "Liên Hoàn Tam Chiêu (Tổng Hợp Nghe - Hiểu - Xuất Chiêu)",
                "difficulty": "hard",
                "requiredQuestionsCount": 1,
                "winCondition": "Hoàn thành chuỗi 3 chiêu thức: Thính âm -> Luận giải -> Xuất chiêu phá trận",
                "tutorialBriefing": "Liên Hoàn Tam Chiêu: Hộ vệ tinh anh sở hữu kiếm pháp liên hoàn! Hoàn thành liên tiếp 3 chiêu thức để trảm địch!"
        }
      ],
    "climax": {
      "hasRealBoss": false,
      "encounterId": "g10-u01_climax_1",
      "enemy": {
          "id": "climax_g10-u01",
        "name": "Thủ Trận Tinh Anh - FAMILY LIFE",
        "title": "Trấn Thủ Trận Đỉnh Điểm",
        "spriteKey": "/assets/game/units/grade-10/unit-01/enemies/steward_elite.png",
        "hp": 300,
        "maxHp": 300,
        "attack": 28,
        "defense": 13,
        "xpReward": 345,
        "isBoss": false,
        "bossPhase": 1,
        "dialogueIntro": "“Ta là Thủ Trận Tinh Anh trấn giữ thạch trận đỉnh điểm của FAMILY LIFE. Hãy dốc toàn lực chiến thắng để chứng minh sự tinh thông!”",
        "dialoguePhase2": "“Ngươi quả thực có thực lực! Đỡ chiêu biến hóa cuối cùng này!”",
        "combatMode": "triple_combo",
        "learningSkill": "Quyết Chiến Thủ Trận Tinh Anh (Thạch Trận Đỉnh Điểm)",
        "difficulty": "hard",
        "requiredQuestionsCount": 1,
        "winCondition": "Đánh bại Thủ Trận Tinh Anh để giải phóng toàn bộ Unit",
        "tutorialBriefing": "Phong Ấn Trận Đỉnh Điểm: Hoàn thành Liên Hoàn Tam Chiêu để phá tan kết giới, hoàn thành Unit và mở ra cảnh giới mới!"
        },
      "x": 1600,
      "y": 1720,
      "barrierPrompt": "🔒 Phong Ấn Trận Đỉnh Điểm (Cần >= 70% tiến độ)",
      "unlockedPrompt": "⚡ Phong Ấn Đỉnh Điểm ĐÃ MỞ! Thách đấu Thủ Trận Tinh Anh!"
    }
  },
  "g10-u02": {
    "unitId": "g10-u02",
    "grade": 10,
    "unitNumber": 2,
    "title": "HUMANS AND THE ENVIRONMENT",
    "topic": "Human Activities and Environmental Protection",
    "mapWidth": 3200,
    "mapHeight": 2000,
    "ground": {
      "primaryPath": "/assets/game/units/grade-10/unit-02/ground/main_ground.png",
      "secondaryPath": null,
      "tileable": false
    },
    "npcs": [
      {
        "id": "bang_chu",
        "name": "Hồng y tông chủ Hà Ánh Phượng",
        "title": "Lãnh Tụ Võ Lâm Chính Phái",
        "elementColor": "#fbe285",
        "spriteKey": "bang_chu_ha_anh_phuong",
        "portraitPath": "/assets/game/characters/npc/portraits/bang_chu_ha_anh_phuong.png",
        "x": 550,
        "y": 560,
        "prompt": "[E] Bái kiến Hồng y tông chủ Hà Ánh Phượng",
        "dialogueIntro": "Chào mừng thiếu hiệp! Hôm nay chúng ta cùng khám phá Unit 2: HUMANS AND THE ENVIRONMENT (Human Activities and Environmental Protection). Hãy rèn luyện võ học, giải trừ ma chướng!"
      },
      {
        "id": "bach_khoa_thu_sinh",
        "name": "Bách Khoa thư Sinh Đinh Ngọc Khánh",
        "title": "Đại Sư Huynh Tông Môn",
        "elementColor": "#c084fc",
        "spriteKey": "bach_khoa_thu_sinh",
        "portraitPath": "/assets/game/characters/npc/portraits/bach_khoa_thu_sinh_v2.png",
        "x": 740,
        "y": 480,
        "prompt": "[E] Thỉnh Giáo Bách Khoa thư Sinh Đinh Ngọc Khánh",
        "dialogueIntro": "Chào sư đệ/sư muội! Đại học không nhàn như giang hồ đồn đâu các đệ... Nhưng qua được ải THPT này, thiên hạ sẽ mở rộng trước mắt! Có gì vướng mắc về bẫy thi cử hay kỹ năng thực chiến, cứ hỏi ta!"
      },
      {
        "id": "ho_phap_phuong_tu",
        "name": "Hộ Pháp Phương Tú",
        "title": "Hộ Pháp Từ Vựng & Trưởng Thành",
        "elementColor": "#59caa0",
        "spriteKey": "ho_phap_phuong_tu",
        "portraitPath": "/assets/game/characters/npc/portraits/ho_phap_phuong_tu.png",
        "x": 920,
        "y": 560,
        "prompt": "[E] Tham Vấn Hộ Pháp Phương Tú",
        "dialogueIntro": "Tàng Kinh Các lưu giữ toàn bộ bí điển từ vựng của HUMANS AND THE ENVIRONMENT. Hãy lĩnh hội từng câu chữ để tích lũy công lực căn bản!"
      },
      {
        "id": "ho_phap_dang_tran_ha",
        "name": "Hộ Pháp Đặng Trần Hà",
        "title": "Hộ Pháp Ngữ Pháp & Thách Đấu",
        "elementColor": "#60a5fa",
        "spriteKey": "ho_phap_dang_tran_ha",
        "portraitPath": "/assets/game/characters/npc/portraits/ho_phap_dang_tran_ha.png",
        "x": 1850,
        "y": 560,
        "prompt": "[E] Bái Kiến Hộ Pháp Đặng Trần Hà",
        "dialogueIntro": "Ngữ pháp là xương sống của kiếm chiêu! Muốn phá phong ấn thạch trận của HUMANS AND THE ENVIRONMENT, tâm ý phải chuẩn xác, cú pháp không được sai lệch một ly!"
      },
      {
        "id": "ho_phap_hoang_van",
        "name": "Hộ Pháp Hoàng Vân",
        "title": "Hộ Pháp Nghe & Nhịp Điệu",
        "elementColor": "#fbbf24",
        "spriteKey": "ho_phap_hoang_van",
        "portraitPath": "/assets/game/characters/npc/portraits/ho_phap_hoang_van.png",
        "x": 2400,
        "y": 760,
        "prompt": "[E] Thỉnh Giáo Hộ Pháp Hoàng Vân",
        "dialogueIntro": "Lắng nghe âm điệu tự nhiên, nghe rõ từng ngữ âm để thấu suốt chiêu thức địch nhân. Hãy vào Võ Luyện Đài luyện tập cùng ta!"
      },
      {
        "id": "ho_phap_nguyet_nguyen",
        "name": "Hộ Pháp Nguyệt Nguyên",
        "title": "Hộ Pháp Đọc Hiểu & Minh Triết",
        "elementColor": "#38bdf8",
        "spriteKey": "ho_phap_nguyet_nguyen",
        "portraitPath": "/assets/game/characters/npc/portraits/ho_phap_nguyet_nguyen.png",
        "x": 660,
        "y": 1260,
        "prompt": "[E] Luận Đạo Hộ Pháp Nguyệt Nguyên",
        "dialogueIntro": "Minh Triết Các soi rọi chân lý. Khi đối mặt với thuật ngụy tạo và mê trận thông tin của HUMANS AND THE ENVIRONMENT, hãy tìm đúng câu bằng chứng để phá tan ảo ảnh!"
      }
    ],
    "props": [
        {
                "id": "g10-u02_theme_prop",
                "name": "bamboo waterwheel",
                "path": "/assets/game/units/grade-10/unit-02/props/theme_prop.png",
                "x": 1380,
                "y": 580,
                "size": [
                        160,
                        160
                ],
                "category": "vocab_discovery"
        },
        {
                "id": "g10-u02_secondary_prop",
                "name": "Bí Điển Lối Sống Xanh",
                "path": "/assets/game/items/anh_ngu_bi_dien.png",
                "x": 860,
                "y": 1300,
                "size": [
                        128,
                        128
                ],
                "category": "reading_clue"
        }
      ],
    "enemies": [
        {
                "encounterId": "g10-u02_enc_scout",
                "enemyId": "scout",
                "name": "Thanh Phong Thám Tử",
                "title": "Tà Binh Tuần Tra",
                "concept": "a swift human scout with a short blade, light Vietnamese clothing and a distinctive headwrap; motifs: polluted river reeds, broken nets and water spirits",
                "spritePath": "/assets/game/units/grade-10/unit-02/enemies/scout.png",
                "x": 1450,
                "y": 1050,
                "patrolRange": {
                        "minX": 1380,
                        "maxX": 1540
                },
                "hp": 140,
                "maxHp": 140,
                "attack": 18,
                "defense": 8,
                "xpReward": 96,
                "combatMode": "lost_word",
                "learningSkill": "Đoạt Lại Vong Từ (Từ Vựng & Cụm Từ Cốt Lõi)",
                "difficulty": "easy",
                "requiredQuestionsCount": 1,
                "winCondition": "Điền chính xác từ khuyết thiếu để đoạt lại vong từ",
                "tutorialBriefing": "Đoạt Lại Vong Từ: Kẻ địch che giấu một từ vựng trọng tâm. Dùng manh mối gợi ý và kiến thức để điền chính xác!"
        },
        {
                "encounterId": "g10-u02_enc_ranged",
                "enemyId": "ranged",
                "name": "Tầm Độc Xạ Thủ",
                "title": "Tà Binh Tuần Tra",
                "concept": "a human ranged attacker with a bamboo bow or sling and light gear; motifs: polluted river reeds, broken nets and water spirits",
                "spritePath": "/assets/game/units/grade-10/unit-02/enemies/ranged.png",
                "x": 1950,
                "y": 1050,
                "patrolRange": {
                        "minX": 1870,
                        "maxX": 2030
                },
                "hp": 155,
                "maxHp": 155,
                "attack": 20,
                "defense": 9,
                "xpReward": 106,
                "combatMode": "listening_pursuit",
                "learningSkill": "Mê Âm Truy Kích (Luyện Nghe & Nhận Diện Ngữ Âm)",
                "difficulty": "easy",
                "requiredQuestionsCount": 1,
                "winCondition": "Lắng nghe thông điệp âm thanh và nhận diện chính xác yếu nghĩa",
                "tutorialBriefing": "Mê Âm Truy Kích: Kẻ địch truyền âm huyễn hoặc! Bấm nút Nghe để phát âm thanh khẩu quyết và giải mã ý nghĩa!"
        },
        {
                "encounterId": "g10-u02_enc_brute",
                "enemyId": "brute",
                "name": "Cự Thạch Ma Nhân",
                "title": "Tà Binh Tuần Tra",
                "concept": "a large armored human bruiser with a heavy club and broad silhouette; motifs: polluted river reeds, broken nets and water spirits",
                "spritePath": "/assets/game/units/grade-10/unit-02/enemies/brute.png",
                "x": 2450,
                "y": 1150,
                "patrolRange": {
                        "minX": 2370,
                        "maxX": 2530
                },
                "hp": 170,
                "maxHp": 170,
                "attack": 22,
                "defense": 10,
                "xpReward": 116,
                "combatMode": "unseal",
                "learningSkill": "Phá Phong Ấn (Cấu Trúc Cú Pháp & Trật Tự Câu)",
                "difficulty": "medium",
                "requiredQuestionsCount": 1,
                "winCondition": "Sắp xếp các phiến đá từ ngữ thành câu đúng ngữ pháp",
                "tutorialBriefing": "Phá Phong Ấn: Giáp hộ thân của Thạch Nhân chỉ bị phá vỡ khi sắp xếp các từ ngữ theo đúng trật tự cú pháp!"
        },
        {
                "encounterId": "g10-u02_enc_construct",
                "enemyId": "construct",
                "name": "Cơ Quan Thạch Quái",
                "title": "Tà Binh Tuần Tra",
                "concept": "a nonhuman golem assembled from the unit's material motifs; motifs: polluted river reeds, broken nets and water spirits",
                "spritePath": "/assets/game/units/grade-10/unit-02/enemies/construct.png",
                "x": 2850,
                "y": 1300,
                "patrolRange": {
                        "minX": 2770,
                        "maxX": 2930
                },
                "hp": 185,
                "maxHp": 185,
                "attack": 24,
                "defense": 11,
                "xpReward": 126,
                "combatMode": "deception_pierce",
                "learningSkill": "Thiên Diện Phá Ảo (Đọc Hiểu & Định Vị Câu Dẫn Chứng)",
                "difficulty": "medium",
                "requiredQuestionsCount": 1,
                "winCondition": "Chọn đáp án đúng VÀ định vị đúng câu dẫn chứng [1]-[4]",
                "tutorialBriefing": "Thiên Diện Phá Ảo: Ảo ảnh che mắt! Đọc kỹ đoạn văn bản, chọn đáp án đúng và bấm chọn đúng CÂU DẪN CHỨNG [1]-[4]!"
        },
        {
                "encounterId": "g10-u02_enc_spirit",
                "enemyId": "spirit",
                "name": "Ô Nhiễm Tà Linh",
                "title": "Tà Binh Tuần Tra",
                "concept": "an eerie floating nonhuman spirit formed from the unit's motifs; motifs: polluted river reeds, broken nets and water spirits",
                "spritePath": "/assets/game/units/grade-10/unit-02/enemies/spirit.png",
                "x": 1750,
                "y": 1380,
                "patrolRange": {
                        "minX": 1670,
                        "maxX": 1830
                },
                "hp": 200,
                "maxHp": 200,
                "attack": 26,
                "defense": 12,
                "xpReward": 136,
                "combatMode": "escort_dialogue",
                "learningSkill": "Hộ Tống Hội Thoại (Giao Tiếp Tình Huống & Phản Hồi Chiến Thuật)",
                "difficulty": "medium",
                "requiredQuestionsCount": 1,
                "winCondition": "Lựa chọn câu đối đáp thấu tình đạt lý, kích hoạt khiên hộ thể",
                "tutorialBriefing": "Hộ Tống Hội Thoại: Đối thủ dùng lời kích động tâm trí! Chọn phương án đối đáp chuẩn mực để kích hoạt khiên bảo hộ!"
        },
        {
                "encounterId": "g10-u02_enc_elite",
                "enemyId": "elite",
                "name": "Trấn Sơn Tinh Anh",
                "title": "Hộ Vệ Tinh Anh",
                "concept": "an elite commander with ornate armor, a distinctive polearm and imposing silhouette; motifs: polluted river reeds, broken nets and water spirits",
                "spritePath": "/assets/game/units/grade-10/unit-02/enemies/elite.png",
                "x": 2250,
                "y": 1450,
                "patrolRange": {
                        "minX": 2170,
                        "maxX": 2330
                },
                "hp": 250,
                "maxHp": 250,
                "attack": 28,
                "defense": 12,
                "xpReward": 210,
                "combatMode": "triple_combo",
                "learningSkill": "Liên Hoàn Tam Chiêu (Tổng Hợp Nghe - Hiểu - Xuất Chiêu)",
                "difficulty": "hard",
                "requiredQuestionsCount": 1,
                "winCondition": "Hoàn thành chuỗi 3 chiêu thức: Thính âm -> Luận giải -> Xuất chiêu phá trận",
                "tutorialBriefing": "Liên Hoàn Tam Chiêu: Hộ vệ tinh anh sở hữu kiếm pháp liên hoàn! Hoàn thành liên tiếp 3 chiêu thức để trảm địch!"
        }
      ],
    "climax": {
      "hasRealBoss": false,
      "encounterId": "g10-u02_climax_2",
      "enemy": {
          "id": "climax_g10-u02",
        "name": "Thủ Trận Tinh Anh - HUMANS AND THE ENVIRONMENT",
        "title": "Trấn Thủ Trận Đỉnh Điểm",
        "spriteKey": "/assets/game/units/grade-10/unit-02/enemies/elite.png",
        "hp": 320,
        "maxHp": 320,
        "attack": 30,
        "defense": 14,
        "xpReward": 370,
        "isBoss": false,
        "bossPhase": 1,
        "dialogueIntro": "“Ta là Thủ Trận Tinh Anh trấn giữ thạch trận đỉnh điểm của HUMANS AND THE ENVIRONMENT. Hãy dốc toàn lực chiến thắng để chứng minh sự tinh thông!”",
        "dialoguePhase2": "“Ngươi quả thực có thực lực! Đỡ chiêu biến hóa cuối cùng này!”",
        "combatMode": "triple_combo",
        "learningSkill": "Quyết Chiến Thủ Trận Tinh Anh (Thạch Trận Đỉnh Điểm)",
        "difficulty": "hard",
        "requiredQuestionsCount": 1,
        "winCondition": "Đánh bại Thủ Trận Tinh Anh để giải phóng toàn bộ Unit",
        "tutorialBriefing": "Phong Ấn Trận Đỉnh Điểm: Hoàn thành Liên Hoàn Tam Chiêu để phá tan kết giới, hoàn thành Unit và mở ra cảnh giới mới!"
        },
      "x": 1600,
      "y": 1720,
      "barrierPrompt": "🔒 Phong Ấn Trận Đỉnh Điểm (Cần >= 70% tiến độ)",
      "unlockedPrompt": "⚡ Phong Ấn Đỉnh Điểm ĐÃ MỞ! Thách đấu Thủ Trận Tinh Anh!"
    }
  },
  "g10-u03": {
    "unitId": "g10-u03",
    "grade": 10,
    "unitNumber": 3,
    "title": "MUSIC",
    "topic": "Music, Art and Famous Talent Shows",
    "mapWidth": 3200,
    "mapHeight": 2000,
    "ground": {
      "primaryPath": "/assets/game/units/grade-10/unit-03/ground/main_ground.png",
      "secondaryPath": null,
      "tileable": false
    },
    "npcs": [
      {
        "id": "bang_chu",
        "name": "Hồng y tông chủ Hà Ánh Phượng",
        "title": "Lãnh Tụ Võ Lâm Chính Phái",
        "elementColor": "#fbe285",
        "spriteKey": "bang_chu_ha_anh_phuong",
        "portraitPath": "/assets/game/characters/npc/portraits/bang_chu_ha_anh_phuong.png",
        "x": 550,
        "y": 560,
        "prompt": "[E] Bái kiến Hồng y tông chủ Hà Ánh Phượng",
        "dialogueIntro": "Chào mừng thiếu hiệp! Hôm nay chúng ta cùng khám phá Unit 3: MUSIC (Music, Art and Famous Talent Shows). Hãy rèn luyện võ học, giải trừ ma chướng!"
      },
      {
        "id": "bach_khoa_thu_sinh",
        "name": "Bách Khoa thư Sinh Đinh Ngọc Khánh",
        "title": "Đại Sư Huynh Tông Môn",
        "elementColor": "#c084fc",
        "spriteKey": "bach_khoa_thu_sinh",
        "portraitPath": "/assets/game/characters/npc/portraits/bach_khoa_thu_sinh_v2.png",
        "x": 740,
        "y": 480,
        "prompt": "[E] Thỉnh Giáo Bách Khoa thư Sinh Đinh Ngọc Khánh",
        "dialogueIntro": "Chào sư đệ/sư muội! Đại học không nhàn như giang hồ đồn đâu các đệ... Nhưng qua được ải THPT này, thiên hạ sẽ mở rộng trước mắt! Có gì vướng mắc về bẫy thi cử hay kỹ năng thực chiến, cứ hỏi ta!"
      },
      {
        "id": "ho_phap_phuong_tu",
        "name": "Hộ Pháp Phương Tú",
        "title": "Hộ Pháp Từ Vựng & Trưởng Thành",
        "elementColor": "#59caa0",
        "spriteKey": "ho_phap_phuong_tu",
        "portraitPath": "/assets/game/characters/npc/portraits/ho_phap_phuong_tu.png",
        "x": 920,
        "y": 560,
        "prompt": "[E] Tham Vấn Hộ Pháp Phương Tú",
        "dialogueIntro": "Tàng Kinh Các lưu giữ toàn bộ bí điển từ vựng của MUSIC. Hãy lĩnh hội từng câu chữ để tích lũy công lực căn bản!"
      },
      {
        "id": "ho_phap_dang_tran_ha",
        "name": "Hộ Pháp Đặng Trần Hà",
        "title": "Hộ Pháp Ngữ Pháp & Thách Đấu",
        "elementColor": "#60a5fa",
        "spriteKey": "ho_phap_dang_tran_ha",
        "portraitPath": "/assets/game/characters/npc/portraits/ho_phap_dang_tran_ha.png",
        "x": 1850,
        "y": 560,
        "prompt": "[E] Bái Kiến Hộ Pháp Đặng Trần Hà",
        "dialogueIntro": "Ngữ pháp là xương sống của kiếm chiêu! Muốn phá phong ấn thạch trận của MUSIC, tâm ý phải chuẩn xác, cú pháp không được sai lệch một ly!"
      },
      {
        "id": "ho_phap_hoang_van",
        "name": "Hộ Pháp Hoàng Vân",
        "title": "Hộ Pháp Nghe & Nhịp Điệu",
        "elementColor": "#fbbf24",
        "spriteKey": "ho_phap_hoang_van",
        "portraitPath": "/assets/game/characters/npc/portraits/ho_phap_hoang_van.png",
        "x": 2400,
        "y": 760,
        "prompt": "[E] Thỉnh Giáo Hộ Pháp Hoàng Vân",
        "dialogueIntro": "Lắng nghe âm điệu tự nhiên, nghe rõ từng ngữ âm để thấu suốt chiêu thức địch nhân. Hãy vào Võ Luyện Đài luyện tập cùng ta!"
      },
      {
        "id": "ho_phap_nguyet_nguyen",
        "name": "Hộ Pháp Nguyệt Nguyên",
        "title": "Hộ Pháp Đọc Hiểu & Minh Triết",
        "elementColor": "#38bdf8",
        "spriteKey": "ho_phap_nguyet_nguyen",
        "portraitPath": "/assets/game/characters/npc/portraits/ho_phap_nguyet_nguyen.png",
        "x": 660,
        "y": 1260,
        "prompt": "[E] Luận Đạo Hộ Pháp Nguyệt Nguyên",
        "dialogueIntro": "Minh Triết Các soi rọi chân lý. Khi đối mặt với thuật ngụy tạo và mê trận thông tin của MUSIC, hãy tìm đúng câu bằng chứng để phá tan ảo ảnh!"
      }
    ],
    "props": [
        {
                "id": "g10-u03_theme_prop",
                "name": "đàn bầu monochord",
                "path": "/assets/game/units/grade-10/unit-03/props/theme_prop.png",
                "x": 1380,
                "y": 580,
                "size": [
                        160,
                        160
                ],
                "category": "listening_clue"
        },
        {
                "id": "g10-u03_secondary_prop",
                "name": "Bí Điển Âm Nhạc & Nghệ Thuật",
                "path": "/assets/game/items/anh_ngu_bi_dien.png",
                "x": 860,
                "y": 1300,
                "size": [
                        128,
                        128
                ],
                "category": "reading_clue"
        }
      ],
    "enemies": [
        {
                "encounterId": "g10-u03_enc_scout",
                "enemyId": "scout",
                "name": "Đoạt Âm Thám Tử",
                "title": "Tà Binh Tuần Tra",
                "concept": "a swift human scout with a short blade, light Vietnamese clothing and a distinctive headwrap; motifs: distorted Vietnamese musical instruments, sound waves and bronze drums",
                "spritePath": "/assets/game/units/grade-10/unit-03/enemies/scout.png",
                "x": 1450,
                "y": 1050,
                "patrolRange": {
                        "minX": 1380,
                        "maxX": 1540
                },
                "hp": 150,
                "maxHp": 150,
                "attack": 19,
                "defense": 9,
                "xpReward": 104,
                "combatMode": "lost_word",
                "learningSkill": "Đoạt Lại Vong Từ (Từ Vựng & Cụm Từ Cốt Lõi)",
                "difficulty": "easy",
                "requiredQuestionsCount": 1,
                "winCondition": "Điền chính xác từ khuyết thiếu để đoạt lại vong từ",
                "tutorialBriefing": "Đoạt Lại Vong Từ: Kẻ địch che giấu một từ vựng trọng tâm. Dùng manh mối gợi ý và kiến thức để điền chính xác!"
        },
        {
                "encounterId": "g10-u03_enc_ranged",
                "enemyId": "ranged",
                "name": "Nhiễu Âm Cung Thủ",
                "title": "Tà Binh Tuần Tra",
                "concept": "a human ranged attacker with a bamboo bow or sling and light gear; motifs: distorted Vietnamese musical instruments, sound waves and bronze drums",
                "spritePath": "/assets/game/units/grade-10/unit-03/enemies/ranged.png",
                "x": 1950,
                "y": 1050,
                "patrolRange": {
                        "minX": 1870,
                        "maxX": 2030
                },
                "hp": 165,
                "maxHp": 165,
                "attack": 21,
                "defense": 10,
                "xpReward": 114,
                "combatMode": "listening_pursuit",
                "learningSkill": "Mê Âm Truy Kích (Luyện Nghe & Nhận Diện Ngữ Âm)",
                "difficulty": "easy",
                "requiredQuestionsCount": 1,
                "winCondition": "Lắng nghe thông điệp âm thanh và nhận diện chính xác yếu nghĩa",
                "tutorialBriefing": "Mê Âm Truy Kích: Kẻ địch truyền âm huyễn hoặc! Bấm nút Nghe để phát âm thanh khẩu quyết và giải mã ý nghĩa!"
        },
        {
                "encounterId": "g10-u03_enc_brute",
                "enemyId": "brute",
                "name": "Loa Giác Ma Vương",
                "title": "Tà Binh Tuần Tra",
                "concept": "a large armored human bruiser with a heavy club and broad silhouette; motifs: distorted Vietnamese musical instruments, sound waves and bronze drums",
                "spritePath": "/assets/game/units/grade-10/unit-03/enemies/brute.png",
                "x": 2450,
                "y": 1150,
                "patrolRange": {
                        "minX": 2370,
                        "maxX": 2530
                },
                "hp": 180,
                "maxHp": 180,
                "attack": 23,
                "defense": 11,
                "xpReward": 124,
                "combatMode": "unseal",
                "learningSkill": "Phá Phong Ấn (Cấu Trúc Cú Pháp & Trật Tự Câu)",
                "difficulty": "medium",
                "requiredQuestionsCount": 1,
                "winCondition": "Sắp xếp các phiến đá từ ngữ thành câu đúng ngữ pháp",
                "tutorialBriefing": "Phá Phong Ấn: Giáp hộ thân của Thạch Nhân chỉ bị phá vỡ khi sắp xếp các từ ngữ theo đúng trật tự cú pháp!"
        },
        {
                "encounterId": "g10-u03_enc_construct",
                "enemyId": "construct",
                "name": "Đồng Cổ Khôi Lỗi",
                "title": "Tà Binh Tuần Tra",
                "concept": "a nonhuman golem assembled from the unit's material motifs; motifs: distorted Vietnamese musical instruments, sound waves and bronze drums",
                "spritePath": "/assets/game/units/grade-10/unit-03/enemies/construct.png",
                "x": 2850,
                "y": 1300,
                "patrolRange": {
                        "minX": 2770,
                        "maxX": 2930
                },
                "hp": 195,
                "maxHp": 195,
                "attack": 25,
                "defense": 12,
                "xpReward": 134,
                "combatMode": "deception_pierce",
                "learningSkill": "Thiên Diện Phá Ảo (Đọc Hiểu & Định Vị Câu Dẫn Chứng)",
                "difficulty": "medium",
                "requiredQuestionsCount": 1,
                "winCondition": "Chọn đáp án đúng VÀ định vị đúng câu dẫn chứng [1]-[4]",
                "tutorialBriefing": "Thiên Diện Phá Ảo: Ảo ảnh che mắt! Đọc kỹ đoạn văn bản, chọn đáp án đúng và bấm chọn đúng CÂU DẪN CHỨNG [1]-[4]!"
        },
        {
                "encounterId": "g10-u03_enc_spirit",
                "enemyId": "spirit",
                "name": "Mê Âm U Linh",
                "title": "Tà Binh Tuần Tra",
                "concept": "an eerie floating nonhuman spirit formed from the unit's motifs; motifs: distorted Vietnamese musical instruments, sound waves and bronze drums",
                "spritePath": "/assets/game/units/grade-10/unit-03/enemies/spirit.png",
                "x": 1750,
                "y": 1380,
                "patrolRange": {
                        "minX": 1670,
                        "maxX": 1830
                },
                "hp": 210,
                "maxHp": 210,
                "attack": 27,
                "defense": 13,
                "xpReward": 144,
                "combatMode": "escort_dialogue",
                "learningSkill": "Hộ Tống Hội Thoại (Giao Tiếp Tình Huống & Phản Hồi Chiến Thuật)",
                "difficulty": "medium",
                "requiredQuestionsCount": 1,
                "winCondition": "Lựa chọn câu đối đáp thấu tình đạt lý, kích hoạt khiên hộ thể",
                "tutorialBriefing": "Hộ Tống Hội Thoại: Đối thủ dùng lời kích động tâm trí! Chọn phương án đối đáp chuẩn mực để kích hoạt khiên bảo hộ!"
        },
        {
                "encounterId": "g10-u03_enc_elite",
                "enemyId": "elite",
                "name": "Tà Cầm Tinh Anh",
                "title": "Hộ Vệ Tinh Anh",
                "concept": "an elite commander with ornate armor, a distinctive polearm and imposing silhouette; motifs: distorted Vietnamese musical instruments, sound waves and bronze drums",
                "spritePath": "/assets/game/units/grade-10/unit-03/enemies/elite.png",
                "x": 2250,
                "y": 1450,
                "patrolRange": {
                        "minX": 2170,
                        "maxX": 2330
                },
                "hp": 265,
                "maxHp": 265,
                "attack": 30,
                "defense": 13,
                "xpReward": 225,
                "combatMode": "triple_combo",
                "learningSkill": "Liên Hoàn Tam Chiêu (Tổng Hợp Nghe - Hiểu - Xuất Chiêu)",
                "difficulty": "hard",
                "requiredQuestionsCount": 1,
                "winCondition": "Hoàn thành chuỗi 3 chiêu thức: Thính âm -> Luận giải -> Xuất chiêu phá trận",
                "tutorialBriefing": "Liên Hoàn Tam Chiêu: Hộ vệ tinh anh sở hữu kiếm pháp liên hoàn! Hoàn thành liên tiếp 3 chiêu thức để trảm địch!"
        }
      ],
    "climax": {
      "hasRealBoss": true,
      "encounterId": "g10-u03_boss_3",
      "enemy": {
          "id": "boss_g10-u03",
        "name": "Mê Âm Yêu Cơ",
        "title": "Yêu Nữ Tiếng Đàn Huyễn Mị",
        "spriteKey": "/assets/game/characters/bosses/me_am_yeu_co.png",
        "hp": 415,
        "maxHp": 415,
        "attack": 41,
        "defense": 20,
        "xpReward": 570,
        "isBoss": true,
        "bossPhase": 1,
        "dialogueIntro": "“Khá khen tiểu bối dám bước vào Cấm Địa MUSIC! Hãy nếm thử kiếm khí của Mê Âm Yêu Cơ!”",
        "dialoguePhase2": "“Cuồng Nộ Huyết Ma kích hoạt! Tuyệt kỹ MUSIC sẽ biến ngươi thành tro bụi!”",
        "combatMode": "triple_combo",
        "learningSkill": "Quyết Chiến Đại Ma Đầu (2 Phase Liên Hoàn Tam Chiêu)",
        "difficulty": "hard",
        "requiredQuestionsCount": 1,
        "winCondition": "Đánh bại Ma Đầu qua 2 Phase sinh tử",
        "tutorialBriefing": "Quyết Chiến Boss: Đại Ma Đầu sở hữu 2 Phase cuồng nộ! Hãy hoàn thành Liên Hoàn Tam Chiêu và vượt qua tốc độ xuất chiêu bão táp!"
        },
      "x": 1600,
      "y": 1720,
      "barrierPrompt": "🔒 Ma Khí Cấm Địa (Cần >= 70% tiến độ)",
      "unlockedPrompt": "⚡ Cổng Ma Giáo Cấm Địa ĐÃ MỞ! Quyết chiến Mê Âm Yêu Cơ!"
    }
  },
  "g10-u04": {
    "unitId": "g10-u04",
    "grade": 10,
    "unitNumber": 4,
    "title": "FOR A BETTER COMMUNITY",
    "topic": "Community Development and Volunteer Work",
    "mapWidth": 3200,
    "mapHeight": 2000,
    "ground": {
      "primaryPath": "/assets/game/units/grade-10/unit-04/ground/main_ground.png",
      "secondaryPath": null,
      "tileable": false
    },
    "npcs": [
      {
        "id": "bang_chu",
        "name": "Hồng y tông chủ Hà Ánh Phượng",
        "title": "Lãnh Tụ Võ Lâm Chính Phái",
        "elementColor": "#fbe285",
        "spriteKey": "bang_chu_ha_anh_phuong",
        "portraitPath": "/assets/game/characters/npc/portraits/bang_chu_ha_anh_phuong.png",
        "x": 550,
        "y": 560,
        "prompt": "[E] Bái kiến Hồng y tông chủ Hà Ánh Phượng",
        "dialogueIntro": "Chào mừng thiếu hiệp! Hôm nay chúng ta cùng khám phá Unit 4: FOR A BETTER COMMUNITY (Community Development and Volunteer Work). Hãy rèn luyện võ học, giải trừ ma chướng!"
      },
      {
        "id": "bach_khoa_thu_sinh",
        "name": "Bách Khoa thư Sinh Đinh Ngọc Khánh",
        "title": "Đại Sư Huynh Tông Môn",
        "elementColor": "#c084fc",
        "spriteKey": "bach_khoa_thu_sinh",
        "portraitPath": "/assets/game/characters/npc/portraits/bach_khoa_thu_sinh_v2.png",
        "x": 740,
        "y": 480,
        "prompt": "[E] Thỉnh Giáo Bách Khoa thư Sinh Đinh Ngọc Khánh",
        "dialogueIntro": "Chào sư đệ/sư muội! Đại học không nhàn như giang hồ đồn đâu các đệ... Nhưng qua được ải THPT này, thiên hạ sẽ mở rộng trước mắt! Có gì vướng mắc về bẫy thi cử hay kỹ năng thực chiến, cứ hỏi ta!"
      },
      {
        "id": "ho_phap_phuong_tu",
        "name": "Hộ Pháp Phương Tú",
        "title": "Hộ Pháp Từ Vựng & Trưởng Thành",
        "elementColor": "#59caa0",
        "spriteKey": "ho_phap_phuong_tu",
        "portraitPath": "/assets/game/characters/npc/portraits/ho_phap_phuong_tu.png",
        "x": 920,
        "y": 560,
        "prompt": "[E] Tham Vấn Hộ Pháp Phương Tú",
        "dialogueIntro": "Tàng Kinh Các lưu giữ toàn bộ bí điển từ vựng của FOR A BETTER COMMUNITY. Hãy lĩnh hội từng câu chữ để tích lũy công lực căn bản!"
      },
      {
        "id": "ho_phap_dang_tran_ha",
        "name": "Hộ Pháp Đặng Trần Hà",
        "title": "Hộ Pháp Ngữ Pháp & Thách Đấu",
        "elementColor": "#60a5fa",
        "spriteKey": "ho_phap_dang_tran_ha",
        "portraitPath": "/assets/game/characters/npc/portraits/ho_phap_dang_tran_ha.png",
        "x": 1850,
        "y": 560,
        "prompt": "[E] Bái Kiến Hộ Pháp Đặng Trần Hà",
        "dialogueIntro": "Ngữ pháp là xương sống của kiếm chiêu! Muốn phá phong ấn thạch trận của FOR A BETTER COMMUNITY, tâm ý phải chuẩn xác, cú pháp không được sai lệch một ly!"
      },
      {
        "id": "ho_phap_hoang_van",
        "name": "Hộ Pháp Hoàng Vân",
        "title": "Hộ Pháp Nghe & Nhịp Điệu",
        "elementColor": "#fbbf24",
        "spriteKey": "ho_phap_hoang_van",
        "portraitPath": "/assets/game/characters/npc/portraits/ho_phap_hoang_van.png",
        "x": 2400,
        "y": 760,
        "prompt": "[E] Thỉnh Giáo Hộ Pháp Hoàng Vân",
        "dialogueIntro": "Lắng nghe âm điệu tự nhiên, nghe rõ từng ngữ âm để thấu suốt chiêu thức địch nhân. Hãy vào Võ Luyện Đài luyện tập cùng ta!"
      },
      {
        "id": "ho_phap_nguyet_nguyen",
        "name": "Hộ Pháp Nguyệt Nguyên",
        "title": "Hộ Pháp Đọc Hiểu & Minh Triết",
        "elementColor": "#38bdf8",
        "spriteKey": "ho_phap_nguyet_nguyen",
        "portraitPath": "/assets/game/characters/npc/portraits/ho_phap_nguyet_nguyen.png",
        "x": 660,
        "y": 1260,
        "prompt": "[E] Luận Đạo Hộ Pháp Nguyệt Nguyên",
        "dialogueIntro": "Minh Triết Các soi rọi chân lý. Khi đối mặt với thuật ngụy tạo và mê trận thông tin của FOR A BETTER COMMUNITY, hãy tìm đúng câu bằng chứng để phá tan ảo ảnh!"
      }
    ],
    "props": [
        {
                "id": "g10-u04_theme_prop",
                "name": "repair tools and food basket",
                "path": "/assets/game/units/grade-10/unit-04/props/theme_prop.png",
                "x": 1380,
                "y": 580,
                "size": [
                        160,
                        160
                ],
                "category": "vocab_discovery"
        },
        {
                "id": "g10-u04_secondary_prop",
                "name": "Bí Điển Tương Thân Tương Ái",
                "path": "/assets/game/items/anh_ngu_bi_dien.png",
                "x": 860,
                "y": 1300,
                "size": [
                        128,
                        128
                ],
                "category": "reading_clue"
        }
      ],
    "enemies": [
        {
                "encounterId": "g10-u04_enc_scout",
                "enemyId": "scout",
                "name": "Đoạt Lương Tặc Đồ",
                "title": "Tà Binh Tuần Tra",
                "concept": "swift human scout with a short blade and light Vietnamese clothing; motifs: broken bridge timbers, stolen supplies and twisted charity seals",
                "spritePath": "/assets/game/units/grade-10/unit-04/enemies/scout.png",
                "x": 1450,
                "y": 1050,
                "patrolRange": {
                        "minX": 1380,
                        "maxX": 1540
                },
                "hp": 160,
                "maxHp": 160,
                "attack": 20,
                "defense": 10,
                "xpReward": 112,
                "combatMode": "lost_word",
                "learningSkill": "Đoạt Lại Vong Từ (Từ Vựng & Cụm Từ Cốt Lõi)",
                "difficulty": "easy",
                "requiredQuestionsCount": 1,
                "winCondition": "Điền chính xác từ khuyết thiếu để đoạt lại vong từ",
                "tutorialBriefing": "Đoạt Lại Vong Từ: Kẻ địch che giấu một từ vựng trọng tâm. Dùng manh mối gợi ý và kiến thức để điền chính xác!"
        },
        {
                "encounterId": "g10-u04_enc_ranged",
                "enemyId": "ranged",
                "name": "Ám Tiễn Đạo Tặc",
                "title": "Tà Binh Tuần Tra",
                "concept": "human ranged attacker with a bamboo bow or sling; motifs: broken bridge timbers, stolen supplies and twisted charity seals",
                "spritePath": "/assets/game/units/grade-10/unit-04/enemies/ranged.png",
                "x": 1950,
                "y": 1050,
                "patrolRange": {
                        "minX": 1870,
                        "maxX": 2030
                },
                "hp": 175,
                "maxHp": 175,
                "attack": 22,
                "defense": 11,
                "xpReward": 122,
                "combatMode": "listening_pursuit",
                "learningSkill": "Mê Âm Truy Kích (Luyện Nghe & Nhận Diện Ngữ Âm)",
                "difficulty": "easy",
                "requiredQuestionsCount": 1,
                "winCondition": "Lắng nghe thông điệp âm thanh và nhận diện chính xác yếu nghĩa",
                "tutorialBriefing": "Mê Âm Truy Kích: Kẻ địch truyền âm huyễn hoặc! Bấm nút Nghe để phát âm thanh khẩu quyết và giải mã ý nghĩa!"
        },
        {
                "encounterId": "g10-u04_enc_brute",
                "enemyId": "brute",
                "name": "Cuồng Nộ Hung Đồ",
                "title": "Tà Binh Tuần Tra",
                "concept": "large armored bruiser with a heavy club; motifs: broken bridge timbers, stolen supplies and twisted charity seals",
                "spritePath": "/assets/game/units/grade-10/unit-04/enemies/brute.png",
                "x": 2450,
                "y": 1150,
                "patrolRange": {
                        "minX": 2370,
                        "maxX": 2530
                },
                "hp": 190,
                "maxHp": 190,
                "attack": 24,
                "defense": 12,
                "xpReward": 132,
                "combatMode": "unseal",
                "learningSkill": "Phá Phong Ấn (Cấu Trúc Cú Pháp & Trật Tự Câu)",
                "difficulty": "medium",
                "requiredQuestionsCount": 1,
                "winCondition": "Sắp xếp các phiến đá từ ngữ thành câu đúng ngữ pháp",
                "tutorialBriefing": "Phá Phong Ấn: Giáp hộ thân của Thạch Nhân chỉ bị phá vỡ khi sắp xếp các từ ngữ theo đúng trật tự cú pháp!"
        },
        {
                "encounterId": "g10-u04_enc_construct",
                "enemyId": "construct",
                "name": "Phá Kiều Cơ Quan",
                "title": "Tà Binh Tuần Tra",
                "concept": "nonhuman golem assembled from the unit's material motifs; motifs: broken bridge timbers, stolen supplies and twisted charity seals",
                "spritePath": "/assets/game/units/grade-10/unit-04/enemies/construct.png",
                "x": 2850,
                "y": 1300,
                "patrolRange": {
                        "minX": 2770,
                        "maxX": 2930
                },
                "hp": 205,
                "maxHp": 205,
                "attack": 26,
                "defense": 13,
                "xpReward": 142,
                "combatMode": "deception_pierce",
                "learningSkill": "Thiên Diện Phá Ảo (Đọc Hiểu & Định Vị Câu Dẫn Chứng)",
                "difficulty": "medium",
                "requiredQuestionsCount": 1,
                "winCondition": "Chọn đáp án đúng VÀ định vị đúng câu dẫn chứng [1]-[4]",
                "tutorialBriefing": "Thiên Diện Phá Ảo: Ảo ảnh che mắt! Đọc kỹ đoạn văn bản, chọn đáp án đúng và bấm chọn đúng CÂU DẪN CHỨNG [1]-[4]!"
        },
        {
                "encounterId": "g10-u04_enc_spirit",
                "enemyId": "spirit",
                "name": "Ly Gián Tà Linh",
                "title": "Tà Binh Tuần Tra",
                "concept": "eerie floating nonhuman spirit formed from the unit's motifs; motifs: broken bridge timbers, stolen supplies and twisted charity seals",
                "spritePath": "/assets/game/units/grade-10/unit-04/enemies/spirit.png",
                "x": 1750,
                "y": 1380,
                "patrolRange": {
                        "minX": 1670,
                        "maxX": 1830
                },
                "hp": 220,
                "maxHp": 220,
                "attack": 28,
                "defense": 14,
                "xpReward": 152,
                "combatMode": "escort_dialogue",
                "learningSkill": "Hộ Tống Hội Thoại (Giao Tiếp Tình Huống & Phản Hồi Chiến Thuật)",
                "difficulty": "medium",
                "requiredQuestionsCount": 1,
                "winCondition": "Lựa chọn câu đối đáp thấu tình đạt lý, kích hoạt khiên hộ thể",
                "tutorialBriefing": "Hộ Tống Hội Thoại: Đối thủ dùng lời kích động tâm trí! Chọn phương án đối đáp chuẩn mực để kích hoạt khiên bảo hộ!"
        },
        {
                "encounterId": "g10-u04_enc_elite",
                "enemyId": "elite",
                "name": "Nghịch Đạo Tinh Anh",
                "title": "Hộ Vệ Tinh Anh",
                "concept": "elite commander with ornate armor and distinctive polearm; motifs: broken bridge timbers, stolen supplies and twisted charity seals",
                "spritePath": "/assets/game/units/grade-10/unit-04/enemies/elite.png",
                "x": 2250,
                "y": 1450,
                "patrolRange": {
                        "minX": 2170,
                        "maxX": 2330
                },
                "hp": 280,
                "maxHp": 280,
                "attack": 32,
                "defense": 14,
                "xpReward": 240,
                "combatMode": "triple_combo",
                "learningSkill": "Liên Hoàn Tam Chiêu (Tổng Hợp Nghe - Hiểu - Xuất Chiêu)",
                "difficulty": "hard",
                "requiredQuestionsCount": 1,
                "winCondition": "Hoàn thành chuỗi 3 chiêu thức: Thính âm -> Luận giải -> Xuất chiêu phá trận",
                "tutorialBriefing": "Liên Hoàn Tam Chiêu: Hộ vệ tinh anh sở hữu kiếm pháp liên hoàn! Hoàn thành liên tiếp 3 chiêu thức để trảm địch!"
        }
      ],
    "climax": {
      "hasRealBoss": false,
      "encounterId": "g10-u04_climax_4",
      "enemy": {
          "id": "climax_g10-u04",
        "name": "Thủ Trận Tinh Anh - FOR A BETTER COMMUNITY",
        "title": "Trấn Thủ Trận Đỉnh Điểm",
        "spriteKey": "/assets/game/units/grade-10/unit-04/enemies/elite.png",
        "hp": 360,
        "maxHp": 360,
        "attack": 34,
        "defense": 16,
        "xpReward": 420,
        "isBoss": false,
        "bossPhase": 1,
        "dialogueIntro": "“Ta là Thủ Trận Tinh Anh trấn giữ thạch trận đỉnh điểm của FOR A BETTER COMMUNITY. Hãy dốc toàn lực chiến thắng để chứng minh sự tinh thông!”",
        "dialoguePhase2": "“Ngươi quả thực có thực lực! Đỡ chiêu biến hóa cuối cùng này!”",
        "combatMode": "triple_combo",
        "learningSkill": "Quyết Chiến Thủ Trận Tinh Anh (Thạch Trận Đỉnh Điểm)",
        "difficulty": "hard",
        "requiredQuestionsCount": 1,
        "winCondition": "Đánh bại Thủ Trận Tinh Anh để giải phóng toàn bộ Unit",
        "tutorialBriefing": "Phong Ấn Trận Đỉnh Điểm: Hoàn thành Liên Hoàn Tam Chiêu để phá tan kết giới, hoàn thành Unit và mở ra cảnh giới mới!"
        },
      "x": 1600,
      "y": 1720,
      "barrierPrompt": "🔒 Phong Ấn Trận Đỉnh Điểm (Cần >= 70% tiến độ)",
      "unlockedPrompt": "⚡ Phong Ấn Đỉnh Điểm ĐÃ MỞ! Thách đấu Thủ Trận Tinh Anh!"
    }
  },
  "g10-u05": {
    "unitId": "g10-u05",
    "grade": 10,
    "unitNumber": 5,
    "title": "INVENTIONS",
    "topic": "Science, Technology and Modern Inventions",
    "mapWidth": 3200,
    "mapHeight": 2000,
    "ground": {
      "primaryPath": "/assets/game/units/grade-10/unit-05/ground/main_ground.png",
      "secondaryPath": null,
      "tileable": false
    },
    "npcs": [
      {
        "id": "bang_chu",
        "name": "Hồng y tông chủ Hà Ánh Phượng",
        "title": "Lãnh Tụ Võ Lâm Chính Phái",
        "elementColor": "#fbe285",
        "spriteKey": "bang_chu_ha_anh_phuong",
        "portraitPath": "/assets/game/characters/npc/portraits/bang_chu_ha_anh_phuong.png",
        "x": 550,
        "y": 560,
        "prompt": "[E] Bái kiến Hồng y tông chủ Hà Ánh Phượng",
        "dialogueIntro": "Chào mừng thiếu hiệp! Hôm nay chúng ta cùng khám phá Unit 5: INVENTIONS (Science, Technology and Modern Inventions). Hãy rèn luyện võ học, giải trừ ma chướng!"
      },
      {
        "id": "bach_khoa_thu_sinh",
        "name": "Bách Khoa thư Sinh Đinh Ngọc Khánh",
        "title": "Đại Sư Huynh Tông Môn",
        "elementColor": "#c084fc",
        "spriteKey": "bach_khoa_thu_sinh",
        "portraitPath": "/assets/game/characters/npc/portraits/bach_khoa_thu_sinh_v2.png",
        "x": 740,
        "y": 480,
        "prompt": "[E] Thỉnh Giáo Bách Khoa thư Sinh Đinh Ngọc Khánh",
        "dialogueIntro": "Chào sư đệ/sư muội! Đại học không nhàn như giang hồ đồn đâu các đệ... Nhưng qua được ải THPT này, thiên hạ sẽ mở rộng trước mắt! Có gì vướng mắc về bẫy thi cử hay kỹ năng thực chiến, cứ hỏi ta!"
      },
      {
        "id": "ho_phap_phuong_tu",
        "name": "Hộ Pháp Phương Tú",
        "title": "Hộ Pháp Từ Vựng & Trưởng Thành",
        "elementColor": "#59caa0",
        "spriteKey": "ho_phap_phuong_tu",
        "portraitPath": "/assets/game/characters/npc/portraits/ho_phap_phuong_tu.png",
        "x": 920,
        "y": 560,
        "prompt": "[E] Tham Vấn Hộ Pháp Phương Tú",
        "dialogueIntro": "Tàng Kinh Các lưu giữ toàn bộ bí điển từ vựng của INVENTIONS. Hãy lĩnh hội từng câu chữ để tích lũy công lực căn bản!"
      },
      {
        "id": "ho_phap_dang_tran_ha",
        "name": "Hộ Pháp Đặng Trần Hà",
        "title": "Hộ Pháp Ngữ Pháp & Thách Đấu",
        "elementColor": "#60a5fa",
        "spriteKey": "ho_phap_dang_tran_ha",
        "portraitPath": "/assets/game/characters/npc/portraits/ho_phap_dang_tran_ha.png",
        "x": 1850,
        "y": 560,
        "prompt": "[E] Bái Kiến Hộ Pháp Đặng Trần Hà",
        "dialogueIntro": "Ngữ pháp là xương sống của kiếm chiêu! Muốn phá phong ấn thạch trận của INVENTIONS, tâm ý phải chuẩn xác, cú pháp không được sai lệch một ly!"
      },
      {
        "id": "ho_phap_hoang_van",
        "name": "Hộ Pháp Hoàng Vân",
        "title": "Hộ Pháp Nghe & Nhịp Điệu",
        "elementColor": "#fbbf24",
        "spriteKey": "ho_phap_hoang_van",
        "portraitPath": "/assets/game/characters/npc/portraits/ho_phap_hoang_van.png",
        "x": 2400,
        "y": 760,
        "prompt": "[E] Thỉnh Giáo Hộ Pháp Hoàng Vân",
        "dialogueIntro": "Lắng nghe âm điệu tự nhiên, nghe rõ từng ngữ âm để thấu suốt chiêu thức địch nhân. Hãy vào Võ Luyện Đài luyện tập cùng ta!"
      },
      {
        "id": "ho_phap_nguyet_nguyen",
        "name": "Hộ Pháp Nguyệt Nguyên",
        "title": "Hộ Pháp Đọc Hiểu & Minh Triết",
        "elementColor": "#38bdf8",
        "spriteKey": "ho_phap_nguyet_nguyen",
        "portraitPath": "/assets/game/characters/npc/portraits/ho_phap_nguyet_nguyen.png",
        "x": 660,
        "y": 1260,
        "prompt": "[E] Luận Đạo Hộ Pháp Nguyệt Nguyên",
        "dialogueIntro": "Minh Triết Các soi rọi chân lý. Khi đối mặt với thuật ngụy tạo và mê trận thông tin của INVENTIONS, hãy tìm đúng câu bằng chứng để phá tan ảo ảnh!"
      }
    ],
    "props": [
        {
                "id": "g10-u05_theme_prop",
                "name": "miniature wooden waterwheel",
                "path": "/assets/game/units/grade-10/unit-05/props/theme_prop.png",
                "x": 1380,
                "y": 580,
                "size": [
                        160,
                        160
                ],
                "category": "vocab_discovery"
        },
        {
                "id": "g10-u05_secondary_prop",
                "name": "Bí Điển Phát Minh & Đổi Mới",
                "path": "/assets/game/items/anh_ngu_bi_dien.png",
                "x": 860,
                "y": 1300,
                "size": [
                        128,
                        128
                ],
                "category": "reading_clue"
        }
      ],
    "enemies": [
        {
                "encounterId": "g10-u05_enc_scout",
                "enemyId": "scout",
                "name": "Trộm Cơ Thám Tử",
                "title": "Tà Binh Tuần Tra",
                "concept": "swift human scout with a short blade and light Vietnamese clothing; motifs: runaway wooden mechanisms, gear fragments and craft tools",
                "spritePath": "/assets/game/units/grade-10/unit-05/enemies/scout.png",
                "x": 1450,
                "y": 1050,
                "patrolRange": {
                        "minX": 1380,
                        "maxX": 1540
                },
                "hp": 170,
                "maxHp": 170,
                "attack": 21,
                "defense": 11,
                "xpReward": 120,
                "combatMode": "lost_word",
                "learningSkill": "Đoạt Lại Vong Từ (Từ Vựng & Cụm Từ Cốt Lõi)",
                "difficulty": "easy",
                "requiredQuestionsCount": 1,
                "winCondition": "Điền chính xác từ khuyết thiếu để đoạt lại vong từ",
                "tutorialBriefing": "Đoạt Lại Vong Từ: Kẻ địch che giấu một từ vựng trọng tâm. Dùng manh mối gợi ý và kiến thức để điền chính xác!"
        },
        {
                "encounterId": "g10-u05_enc_ranged",
                "enemyId": "ranged",
                "name": "Lôi Hỏa Xạ Thủ",
                "title": "Tà Binh Tuần Tra",
                "concept": "human ranged attacker with a bamboo bow or sling; motifs: runaway wooden mechanisms, gear fragments and craft tools",
                "spritePath": "/assets/game/units/grade-10/unit-05/enemies/ranged.png",
                "x": 1950,
                "y": 1050,
                "patrolRange": {
                        "minX": 1870,
                        "maxX": 2030
                },
                "hp": 185,
                "maxHp": 185,
                "attack": 23,
                "defense": 12,
                "xpReward": 130,
                "combatMode": "listening_pursuit",
                "learningSkill": "Mê Âm Truy Kích (Luyện Nghe & Nhận Diện Ngữ Âm)",
                "difficulty": "easy",
                "requiredQuestionsCount": 1,
                "winCondition": "Lắng nghe thông điệp âm thanh và nhận diện chính xác yếu nghĩa",
                "tutorialBriefing": "Mê Âm Truy Kích: Kẻ địch truyền âm huyễn hoặc! Bấm nút Nghe để phát âm thanh khẩu quyết và giải mã ý nghĩa!"
        },
        {
                "encounterId": "g10-u05_enc_brute",
                "enemyId": "brute",
                "name": "Thiết Giáp Cuồng Nhân",
                "title": "Tà Binh Tuần Tra",
                "concept": "large armored bruiser with a heavy club; motifs: runaway wooden mechanisms, gear fragments and craft tools",
                "spritePath": "/assets/game/units/grade-10/unit-05/enemies/brute.png",
                "x": 2450,
                "y": 1150,
                "patrolRange": {
                        "minX": 2370,
                        "maxX": 2530
                },
                "hp": 200,
                "maxHp": 200,
                "attack": 25,
                "defense": 13,
                "xpReward": 140,
                "combatMode": "unseal",
                "learningSkill": "Phá Phong Ấn (Cấu Trúc Cú Pháp & Trật Tự Câu)",
                "difficulty": "medium",
                "requiredQuestionsCount": 1,
                "winCondition": "Sắp xếp các phiến đá từ ngữ thành câu đúng ngữ pháp",
                "tutorialBriefing": "Phá Phong Ấn: Giáp hộ thân của Thạch Nhân chỉ bị phá vỡ khi sắp xếp các từ ngữ theo đúng trật tự cú pháp!"
        },
        {
                "encounterId": "g10-u05_enc_construct",
                "enemyId": "construct",
                "name": "Biến Dị Khôi Lỗi",
                "title": "Tà Binh Tuần Tra",
                "concept": "nonhuman golem assembled from the unit's material motifs; motifs: runaway wooden mechanisms, gear fragments and craft tools",
                "spritePath": "/assets/game/units/grade-10/unit-05/enemies/construct.png",
                "x": 2850,
                "y": 1300,
                "patrolRange": {
                        "minX": 2770,
                        "maxX": 2930
                },
                "hp": 215,
                "maxHp": 215,
                "attack": 27,
                "defense": 14,
                "xpReward": 150,
                "combatMode": "deception_pierce",
                "learningSkill": "Thiên Diện Phá Ảo (Đọc Hiểu & Định Vị Câu Dẫn Chứng)",
                "difficulty": "medium",
                "requiredQuestionsCount": 1,
                "winCondition": "Chọn đáp án đúng VÀ định vị đúng câu dẫn chứng [1]-[4]",
                "tutorialBriefing": "Thiên Diện Phá Ảo: Ảo ảnh che mắt! Đọc kỹ đoạn văn bản, chọn đáp án đúng và bấm chọn đúng CÂU DẪN CHỨNG [1]-[4]!"
        },
        {
                "encounterId": "g10-u05_enc_spirit",
                "enemyId": "spirit",
                "name": "Lôi Điện U Hồn",
                "title": "Tà Binh Tuần Tra",
                "concept": "eerie floating nonhuman spirit formed from the unit's motifs; motifs: runaway wooden mechanisms, gear fragments and craft tools",
                "spritePath": "/assets/game/units/grade-10/unit-05/enemies/spirit.png",
                "x": 1750,
                "y": 1380,
                "patrolRange": {
                        "minX": 1670,
                        "maxX": 1830
                },
                "hp": 230,
                "maxHp": 230,
                "attack": 29,
                "defense": 15,
                "xpReward": 160,
                "combatMode": "escort_dialogue",
                "learningSkill": "Hộ Tống Hội Thoại (Giao Tiếp Tình Huống & Phản Hồi Chiến Thuật)",
                "difficulty": "medium",
                "requiredQuestionsCount": 1,
                "winCondition": "Lựa chọn câu đối đáp thấu tình đạt lý, kích hoạt khiên hộ thể",
                "tutorialBriefing": "Hộ Tống Hội Thoại: Đối thủ dùng lời kích động tâm trí! Chọn phương án đối đáp chuẩn mực để kích hoạt khiên bảo hộ!"
        },
        {
                "encounterId": "g10-u05_enc_elite",
                "enemyId": "elite",
                "name": "Thần Cơ Tinh Anh",
                "title": "Hộ Vệ Tinh Anh",
                "concept": "elite commander with ornate armor and distinctive polearm; motifs: runaway wooden mechanisms, gear fragments and craft tools",
                "spritePath": "/assets/game/units/grade-10/unit-05/enemies/elite.png",
                "x": 2250,
                "y": 1450,
                "patrolRange": {
                        "minX": 2170,
                        "maxX": 2330
                },
                "hp": 295,
                "maxHp": 295,
                "attack": 34,
                "defense": 15,
                "xpReward": 255,
                "combatMode": "triple_combo",
                "learningSkill": "Liên Hoàn Tam Chiêu (Tổng Hợp Nghe - Hiểu - Xuất Chiêu)",
                "difficulty": "hard",
                "requiredQuestionsCount": 1,
                "winCondition": "Hoàn thành chuỗi 3 chiêu thức: Thính âm -> Luận giải -> Xuất chiêu phá trận",
                "tutorialBriefing": "Liên Hoàn Tam Chiêu: Hộ vệ tinh anh sở hữu kiếm pháp liên hoàn! Hoàn thành liên tiếp 3 chiêu thức để trảm địch!"
        }
      ],
    "climax": {
      "hasRealBoss": false,
      "encounterId": "g10-u05_climax_5",
      "enemy": {
          "id": "climax_g10-u05",
        "name": "Thủ Trận Tinh Anh - INVENTIONS",
        "title": "Trấn Thủ Trận Đỉnh Điểm",
        "spriteKey": "/assets/game/units/grade-10/unit-05/enemies/elite.png",
        "hp": 380,
        "maxHp": 380,
        "attack": 36,
        "defense": 17,
        "xpReward": 445,
        "isBoss": false,
        "bossPhase": 1,
        "dialogueIntro": "“Ta là Thủ Trận Tinh Anh trấn giữ thạch trận đỉnh điểm của INVENTIONS. Hãy dốc toàn lực chiến thắng để chứng minh sự tinh thông!”",
        "dialoguePhase2": "“Ngươi quả thực có thực lực! Đỡ chiêu biến hóa cuối cùng này!”",
        "combatMode": "triple_combo",
        "learningSkill": "Quyết Chiến Thủ Trận Tinh Anh (Thạch Trận Đỉnh Điểm)",
        "difficulty": "hard",
        "requiredQuestionsCount": 1,
        "winCondition": "Đánh bại Thủ Trận Tinh Anh để giải phóng toàn bộ Unit",
        "tutorialBriefing": "Phong Ấn Trận Đỉnh Điểm: Hoàn thành Liên Hoàn Tam Chiêu để phá tan kết giới, hoàn thành Unit và mở ra cảnh giới mới!"
        },
      "x": 1600,
      "y": 1720,
      "barrierPrompt": "🔒 Phong Ấn Trận Đỉnh Điểm (Cần >= 70% tiến độ)",
      "unlockedPrompt": "⚡ Phong Ấn Đỉnh Điểm ĐÃ MỞ! Thách đấu Thủ Trận Tinh Anh!"
    }
  },
  "g10-u06": {
    "unitId": "g10-u06",
    "grade": 10,
    "unitNumber": 6,
    "title": "GENDER EQUALITY",
    "topic": "Gender Equality in Education, Career, and Society",
    "mapWidth": 3200,
    "mapHeight": 2000,
    "ground": {
      "primaryPath": "/assets/game/units/grade-10/unit-06/ground/main_ground.png",
      "secondaryPath": null,
      "tileable": false
    },
    "npcs": [
      {
        "id": "bang_chu",
        "name": "Hồng y tông chủ Hà Ánh Phượng",
        "title": "Lãnh Tụ Võ Lâm Chính Phái",
        "elementColor": "#fbe285",
        "spriteKey": "bang_chu_ha_anh_phuong",
        "portraitPath": "/assets/game/characters/npc/portraits/bang_chu_ha_anh_phuong.png",
        "x": 550,
        "y": 560,
        "prompt": "[E] Bái kiến Hồng y tông chủ Hà Ánh Phượng",
        "dialogueIntro": "Chào mừng thiếu hiệp! Hôm nay chúng ta cùng khám phá Unit 6: GENDER EQUALITY (Gender Equality in Education, Career, and Society). Hãy rèn luyện võ học, giải trừ ma chướng!"
      },
      {
        "id": "bach_khoa_thu_sinh",
        "name": "Bách Khoa thư Sinh Đinh Ngọc Khánh",
        "title": "Đại Sư Huynh Tông Môn",
        "elementColor": "#c084fc",
        "spriteKey": "bach_khoa_thu_sinh",
        "portraitPath": "/assets/game/characters/npc/portraits/bach_khoa_thu_sinh_v2.png",
        "x": 740,
        "y": 480,
        "prompt": "[E] Thỉnh Giáo Bách Khoa thư Sinh Đinh Ngọc Khánh",
        "dialogueIntro": "Chào sư đệ/sư muội! Đại học không nhàn như giang hồ đồn đâu các đệ... Nhưng qua được ải THPT này, thiên hạ sẽ mở rộng trước mắt! Có gì vướng mắc về bẫy thi cử hay kỹ năng thực chiến, cứ hỏi ta!"
      },
      {
        "id": "ho_phap_phuong_tu",
        "name": "Hộ Pháp Phương Tú",
        "title": "Hộ Pháp Từ Vựng & Trưởng Thành",
        "elementColor": "#59caa0",
        "spriteKey": "ho_phap_phuong_tu",
        "portraitPath": "/assets/game/characters/npc/portraits/ho_phap_phuong_tu.png",
        "x": 920,
        "y": 560,
        "prompt": "[E] Tham Vấn Hộ Pháp Phương Tú",
        "dialogueIntro": "Tàng Kinh Các lưu giữ toàn bộ bí điển từ vựng của GENDER EQUALITY. Hãy lĩnh hội từng câu chữ để tích lũy công lực căn bản!"
      },
      {
        "id": "ho_phap_dang_tran_ha",
        "name": "Hộ Pháp Đặng Trần Hà",
        "title": "Hộ Pháp Ngữ Pháp & Thách Đấu",
        "elementColor": "#60a5fa",
        "spriteKey": "ho_phap_dang_tran_ha",
        "portraitPath": "/assets/game/characters/npc/portraits/ho_phap_dang_tran_ha.png",
        "x": 1850,
        "y": 560,
        "prompt": "[E] Bái Kiến Hộ Pháp Đặng Trần Hà",
        "dialogueIntro": "Ngữ pháp là xương sống của kiếm chiêu! Muốn phá phong ấn thạch trận của GENDER EQUALITY, tâm ý phải chuẩn xác, cú pháp không được sai lệch một ly!"
      },
      {
        "id": "ho_phap_hoang_van",
        "name": "Hộ Pháp Hoàng Vân",
        "title": "Hộ Pháp Nghe & Nhịp Điệu",
        "elementColor": "#fbbf24",
        "spriteKey": "ho_phap_hoang_van",
        "portraitPath": "/assets/game/characters/npc/portraits/ho_phap_hoang_van.png",
        "x": 2400,
        "y": 760,
        "prompt": "[E] Thỉnh Giáo Hộ Pháp Hoàng Vân",
        "dialogueIntro": "Lắng nghe âm điệu tự nhiên, nghe rõ từng ngữ âm để thấu suốt chiêu thức địch nhân. Hãy vào Võ Luyện Đài luyện tập cùng ta!"
      },
      {
        "id": "ho_phap_nguyet_nguyen",
        "name": "Hộ Pháp Nguyệt Nguyên",
        "title": "Hộ Pháp Đọc Hiểu & Minh Triết",
        "elementColor": "#38bdf8",
        "spriteKey": "ho_phap_nguyet_nguyen",
        "portraitPath": "/assets/game/characters/npc/portraits/ho_phap_nguyet_nguyen.png",
        "x": 660,
        "y": 1260,
        "prompt": "[E] Luận Đạo Hộ Pháp Nguyệt Nguyên",
        "dialogueIntro": "Minh Triết Các soi rọi chân lý. Khi đối mặt với thuật ngụy tạo và mê trận thông tin của GENDER EQUALITY, hãy tìm đúng câu bằng chứng để phá tan ảo ảnh!"
      }
    ],
    "props": [
        {
                "id": "g10-u06_theme_prop",
                "name": "paired training swords",
                "path": "/assets/game/units/grade-10/unit-06/props/theme_prop.png",
                "x": 1380,
                "y": 580,
                "size": [
                        160,
                        160
                ],
                "category": "vocab_discovery"
        },
        {
                "id": "g10-u06_secondary_prop",
                "name": "Bí Điển Bình Đẳng Giới",
                "path": "/assets/game/items/anh_ngu_bi_dien.png",
                "x": 860,
                "y": 1300,
                "size": [
                        128,
                        128
                ],
                "category": "reading_clue"
        }
      ],
    "enemies": [
        {
                "encounterId": "g10-u06_enc_scout",
                "enemyId": "scout",
                "name": "Thiên Kiến Thám Đồ",
                "title": "Tà Binh Tuần Tra",
                "concept": "swift human scout with a short blade and light Vietnamese clothing; motifs: magical imbalance, broken balance scales and mirrored armor; avoid gender stereotypes",
                "spritePath": "/assets/game/units/grade-10/unit-06/enemies/scout.png",
                "x": 1450,
                "y": 1050,
                "patrolRange": {
                        "minX": 1380,
                        "maxX": 1540
                },
                "hp": 180,
                "maxHp": 180,
                "attack": 22,
                "defense": 12,
                "xpReward": 128,
                "combatMode": "lost_word",
                "learningSkill": "Đoạt Lại Vong Từ (Từ Vựng & Cụm Từ Cốt Lõi)",
                "difficulty": "easy",
                "requiredQuestionsCount": 1,
                "winCondition": "Điền chính xác từ khuyết thiếu để đoạt lại vong từ",
                "tutorialBriefing": "Đoạt Lại Vong Từ: Kẻ địch che giấu một từ vựng trọng tâm. Dùng manh mối gợi ý và kiến thức để điền chính xác!"
        },
        {
                "encounterId": "g10-u06_enc_ranged",
                "enemyId": "ranged",
                "name": "Định Kiến Cung Thủ",
                "title": "Tà Binh Tuần Tra",
                "concept": "human ranged attacker with a bamboo bow or sling; motifs: magical imbalance, broken balance scales and mirrored armor; avoid gender stereotypes",
                "spritePath": "/assets/game/units/grade-10/unit-06/enemies/ranged.png",
                "x": 1950,
                "y": 1050,
                "patrolRange": {
                        "minX": 1870,
                        "maxX": 2030
                },
                "hp": 195,
                "maxHp": 195,
                "attack": 24,
                "defense": 13,
                "xpReward": 138,
                "combatMode": "listening_pursuit",
                "learningSkill": "Mê Âm Truy Kích (Luyện Nghe & Nhận Diện Ngữ Âm)",
                "difficulty": "easy",
                "requiredQuestionsCount": 1,
                "winCondition": "Lắng nghe thông điệp âm thanh và nhận diện chính xác yếu nghĩa",
                "tutorialBriefing": "Mê Âm Truy Kích: Kẻ địch truyền âm huyễn hoặc! Bấm nút Nghe để phát âm thanh khẩu quyết và giải mã ý nghĩa!"
        },
        {
                "encounterId": "g10-u06_enc_brute",
                "enemyId": "brute",
                "name": "Bất Bình Ma Nhân",
                "title": "Tà Binh Tuần Tra",
                "concept": "large armored bruiser with a heavy club; motifs: magical imbalance, broken balance scales and mirrored armor; avoid gender stereotypes",
                "spritePath": "/assets/game/units/grade-10/unit-06/enemies/brute.png",
                "x": 2450,
                "y": 1150,
                "patrolRange": {
                        "minX": 2370,
                        "maxX": 2530
                },
                "hp": 210,
                "maxHp": 210,
                "attack": 26,
                "defense": 14,
                "xpReward": 148,
                "combatMode": "unseal",
                "learningSkill": "Phá Phong Ấn (Cấu Trúc Cú Pháp & Trật Tự Câu)",
                "difficulty": "medium",
                "requiredQuestionsCount": 1,
                "winCondition": "Sắp xếp các phiến đá từ ngữ thành câu đúng ngữ pháp",
                "tutorialBriefing": "Phá Phong Ấn: Giáp hộ thân của Thạch Nhân chỉ bị phá vỡ khi sắp xếp các từ ngữ theo đúng trật tự cú pháp!"
        },
        {
                "encounterId": "g10-u06_enc_construct",
                "enemyId": "construct",
                "name": "Thất Xứng Cơ Quan",
                "title": "Tà Binh Tuần Tra",
                "concept": "nonhuman golem assembled from the unit's material motifs; motifs: magical imbalance, broken balance scales and mirrored armor; avoid gender stereotypes",
                "spritePath": "/assets/game/units/grade-10/unit-06/enemies/construct.png",
                "x": 2850,
                "y": 1300,
                "patrolRange": {
                        "minX": 2770,
                        "maxX": 2930
                },
                "hp": 225,
                "maxHp": 225,
                "attack": 28,
                "defense": 15,
                "xpReward": 158,
                "combatMode": "deception_pierce",
                "learningSkill": "Thiên Diện Phá Ảo (Đọc Hiểu & Định Vị Câu Dẫn Chứng)",
                "difficulty": "medium",
                "requiredQuestionsCount": 1,
                "winCondition": "Chọn đáp án đúng VÀ định vị đúng câu dẫn chứng [1]-[4]",
                "tutorialBriefing": "Thiên Diện Phá Ảo: Ảo ảnh che mắt! Đọc kỹ đoạn văn bản, chọn đáp án đúng và bấm chọn đúng CÂU DẪN CHỨNG [1]-[4]!"
        },
        {
                "encounterId": "g10-u06_enc_spirit",
                "enemyId": "spirit",
                "name": "Oán Hồn Thiên Kiến",
                "title": "Tà Binh Tuần Tra",
                "concept": "eerie floating nonhuman spirit formed from the unit's motifs; motifs: magical imbalance, broken balance scales and mirrored armor; avoid gender stereotypes",
                "spritePath": "/assets/game/units/grade-10/unit-06/enemies/spirit.png",
                "x": 1750,
                "y": 1380,
                "patrolRange": {
                        "minX": 1670,
                        "maxX": 1830
                },
                "hp": 240,
                "maxHp": 240,
                "attack": 30,
                "defense": 16,
                "xpReward": 168,
                "combatMode": "escort_dialogue",
                "learningSkill": "Hộ Tống Hội Thoại (Giao Tiếp Tình Huống & Phản Hồi Chiến Thuật)",
                "difficulty": "medium",
                "requiredQuestionsCount": 1,
                "winCondition": "Lựa chọn câu đối đáp thấu tình đạt lý, kích hoạt khiên hộ thể",
                "tutorialBriefing": "Hộ Tống Hội Thoại: Đối thủ dùng lời kích động tâm trí! Chọn phương án đối đáp chuẩn mực để kích hoạt khiên bảo hộ!"
        },
        {
                "encounterId": "g10-u06_enc_elite",
                "enemyId": "elite",
                "name": "Cố Chấp Kiếm Sĩ",
                "title": "Hộ Vệ Tinh Anh",
                "concept": "elite commander with ornate armor and distinctive polearm; motifs: magical imbalance, broken balance scales and mirrored armor; avoid gender stereotypes",
                "spritePath": "/assets/game/units/grade-10/unit-06/enemies/elite.png",
                "x": 2250,
                "y": 1450,
                "patrolRange": {
                        "minX": 2170,
                        "maxX": 2330
                },
                "hp": 310,
                "maxHp": 310,
                "attack": 36,
                "defense": 16,
                "xpReward": 270,
                "combatMode": "triple_combo",
                "learningSkill": "Liên Hoàn Tam Chiêu (Tổng Hợp Nghe - Hiểu - Xuất Chiêu)",
                "difficulty": "hard",
                "requiredQuestionsCount": 1,
                "winCondition": "Hoàn thành chuỗi 3 chiêu thức: Thính âm -> Luận giải -> Xuất chiêu phá trận",
                "tutorialBriefing": "Liên Hoàn Tam Chiêu: Hộ vệ tinh anh sở hữu kiếm pháp liên hoàn! Hoàn thành liên tiếp 3 chiêu thức để trảm địch!"
        }
      ],
    "climax": {
      "hasRealBoss": true,
      "encounterId": "g10-u06_boss_6",
      "enemy": {
          "id": "boss_g10-u06",
        "name": "Bất Bình Huyễn Ảnh",
        "title": "Ảo Ảnh Mất Cân Bằng",
        "spriteKey": "/assets/game/units/grade-10/unit-06/bosses/balance_phantom.png",
        "hp": 490,
        "maxHp": 490,
        "attack": 50,
        "defense": 26,
        "xpReward": 690,
        "isBoss": true,
        "bossPhase": 1,
        "dialogueIntro": "“Khá khen tiểu bối dám bước vào Cấm Địa GENDER EQUALITY! Hãy nếm thử kiếm khí của Bất Bình Huyễn Ảnh!”",
        "dialoguePhase2": "“Cuồng Nộ Huyết Ma kích hoạt! Tuyệt kỹ GENDER EQUALITY sẽ biến ngươi thành tro bụi!”",
        "combatMode": "triple_combo",
        "learningSkill": "Quyết Chiến Đại Ma Đầu (2 Phase Liên Hoàn Tam Chiêu)",
        "difficulty": "hard",
        "requiredQuestionsCount": 1,
        "winCondition": "Đánh bại Ma Đầu qua 2 Phase sinh tử",
        "tutorialBriefing": "Quyết Chiến Boss: Đại Ma Đầu sở hữu 2 Phase cuồng nộ! Hãy hoàn thành Liên Hoàn Tam Chiêu và vượt qua tốc độ xuất chiêu bão táp!"
        },
      "x": 1600,
      "y": 1720,
      "barrierPrompt": "🔒 Ma Khí Cấm Địa (Cần >= 70% tiến độ)",
      "unlockedPrompt": "⚡ Cổng Ma Giáo Cấm Địa ĐÃ MỞ! Quyết chiến Bất Bình Huyễn Ảnh!"
    }
  },
  "g10-u07": {
    "unitId": "g10-u07",
    "grade": 10,
    "unitNumber": 7,
    "title": "VIET NAM AND INTERNATIONAL ORGANISATIONS",
    "topic": "International Cooperation and Global Partnerships",
    "mapWidth": 3200,
    "mapHeight": 2000,
    "ground": {
      "primaryPath": "/assets/game/units/grade-10/unit-07/ground/main_ground.png",
      "secondaryPath": null,
      "tileable": false
    },
    "npcs": [
      {
        "id": "bang_chu",
        "name": "Hồng y tông chủ Hà Ánh Phượng",
        "title": "Lãnh Tụ Võ Lâm Chính Phái",
        "elementColor": "#fbe285",
        "spriteKey": "bang_chu_ha_anh_phuong",
        "portraitPath": "/assets/game/characters/npc/portraits/bang_chu_ha_anh_phuong.png",
        "x": 550,
        "y": 560,
        "prompt": "[E] Bái kiến Hồng y tông chủ Hà Ánh Phượng",
        "dialogueIntro": "Chào mừng thiếu hiệp! Hôm nay chúng ta cùng khám phá Unit 7: VIET NAM AND INTERNATIONAL ORGANISATIONS (International Cooperation and Global Partnerships). Hãy rèn luyện võ học, giải trừ ma chướng!"
      },
      {
        "id": "bach_khoa_thu_sinh",
        "name": "Bách Khoa thư Sinh Đinh Ngọc Khánh",
        "title": "Đại Sư Huynh Tông Môn",
        "elementColor": "#c084fc",
        "spriteKey": "bach_khoa_thu_sinh",
        "portraitPath": "/assets/game/characters/npc/portraits/bach_khoa_thu_sinh_v2.png",
        "x": 740,
        "y": 480,
        "prompt": "[E] Thỉnh Giáo Bách Khoa thư Sinh Đinh Ngọc Khánh",
        "dialogueIntro": "Chào sư đệ/sư muội! Đại học không nhàn như giang hồ đồn đâu các đệ... Nhưng qua được ải THPT này, thiên hạ sẽ mở rộng trước mắt! Có gì vướng mắc về bẫy thi cử hay kỹ năng thực chiến, cứ hỏi ta!"
      },
      {
        "id": "ho_phap_phuong_tu",
        "name": "Hộ Pháp Phương Tú",
        "title": "Hộ Pháp Từ Vựng & Trưởng Thành",
        "elementColor": "#59caa0",
        "spriteKey": "ho_phap_phuong_tu",
        "portraitPath": "/assets/game/characters/npc/portraits/ho_phap_phuong_tu.png",
        "x": 920,
        "y": 560,
        "prompt": "[E] Tham Vấn Hộ Pháp Phương Tú",
        "dialogueIntro": "Tàng Kinh Các lưu giữ toàn bộ bí điển từ vựng của VIET NAM AND INTERNATIONAL ORGANISATIONS. Hãy lĩnh hội từng câu chữ để tích lũy công lực căn bản!"
      },
      {
        "id": "ho_phap_dang_tran_ha",
        "name": "Hộ Pháp Đặng Trần Hà",
        "title": "Hộ Pháp Ngữ Pháp & Thách Đấu",
        "elementColor": "#60a5fa",
        "spriteKey": "ho_phap_dang_tran_ha",
        "portraitPath": "/assets/game/characters/npc/portraits/ho_phap_dang_tran_ha.png",
        "x": 1850,
        "y": 560,
        "prompt": "[E] Bái Kiến Hộ Pháp Đặng Trần Hà",
        "dialogueIntro": "Ngữ pháp là xương sống của kiếm chiêu! Muốn phá phong ấn thạch trận của VIET NAM AND INTERNATIONAL ORGANISATIONS, tâm ý phải chuẩn xác, cú pháp không được sai lệch một ly!"
      },
      {
        "id": "ho_phap_hoang_van",
        "name": "Hộ Pháp Hoàng Vân",
        "title": "Hộ Pháp Nghe & Nhịp Điệu",
        "elementColor": "#fbbf24",
        "spriteKey": "ho_phap_hoang_van",
        "portraitPath": "/assets/game/characters/npc/portraits/ho_phap_hoang_van.png",
        "x": 2400,
        "y": 760,
        "prompt": "[E] Thỉnh Giáo Hộ Pháp Hoàng Vân",
        "dialogueIntro": "Lắng nghe âm điệu tự nhiên, nghe rõ từng ngữ âm để thấu suốt chiêu thức địch nhân. Hãy vào Võ Luyện Đài luyện tập cùng ta!"
      },
      {
        "id": "ho_phap_nguyet_nguyen",
        "name": "Hộ Pháp Nguyệt Nguyên",
        "title": "Hộ Pháp Đọc Hiểu & Minh Triết",
        "elementColor": "#38bdf8",
        "spriteKey": "ho_phap_nguyet_nguyen",
        "portraitPath": "/assets/game/characters/npc/portraits/ho_phap_nguyet_nguyen.png",
        "x": 660,
        "y": 1260,
        "prompt": "[E] Luận Đạo Hộ Pháp Nguyệt Nguyên",
        "dialogueIntro": "Minh Triết Các soi rọi chân lý. Khi đối mặt với thuật ngụy tạo và mê trận thông tin của VIET NAM AND INTERNATIONAL ORGANISATIONS, hãy tìm đúng câu bằng chứng để phá tan ảo ảnh!"
      }
    ],
    "props": [
        {
                "id": "g10-u07_theme_prop",
                "name": "bronze lotus seal",
                "path": "/assets/game/units/grade-10/unit-07/props/theme_prop.png",
                "x": 1380,
                "y": 580,
                "size": [
                        160,
                        160
                ],
                "category": "vocab_discovery"
        },
        {
                "id": "g10-u07_secondary_prop",
                "name": "Bí Điển Hội Nhập Quốc Tế",
                "path": "/assets/game/items/anh_ngu_bi_dien.png",
                "x": 860,
                "y": 1300,
                "size": [
                        128,
                        128
                ],
                "category": "reading_clue"
        }
      ],
    "enemies": [
        {
                "encounterId": "g10-u07_enc_scout",
                "enemyId": "scout",
                "name": "Xâm Nhập Gian Điệp",
                "title": "Tà Binh Tuần Tra",
                "concept": "swift human scout with a short blade and light Vietnamese clothing; motifs: corrupted treaties, masked envoys and torn pennants; no real organisation logos",
                "spritePath": "/assets/game/units/grade-10/unit-07/enemies/scout.png",
                "x": 1450,
                "y": 1050,
                "patrolRange": {
                        "minX": 1380,
                        "maxX": 1540
                },
                "hp": 190,
                "maxHp": 190,
                "attack": 23,
                "defense": 13,
                "xpReward": 136,
                "combatMode": "lost_word",
                "learningSkill": "Đoạt Lại Vong Từ (Từ Vựng & Cụm Từ Cốt Lõi)",
                "difficulty": "easy",
                "requiredQuestionsCount": 1,
                "winCondition": "Điền chính xác từ khuyết thiếu để đoạt lại vong từ",
                "tutorialBriefing": "Đoạt Lại Vong Từ: Kẻ địch che giấu một từ vựng trọng tâm. Dùng manh mối gợi ý và kiến thức để điền chính xác!"
        },
        {
                "encounterId": "g10-u07_enc_ranged",
                "enemyId": "ranged",
                "name": "Phong Tỏa Xạ Thủ",
                "title": "Tà Binh Tuần Tra",
                "concept": "human ranged attacker with a bamboo bow or sling; motifs: corrupted treaties, masked envoys and torn pennants; no real organisation logos",
                "spritePath": "/assets/game/units/grade-10/unit-07/enemies/ranged.png",
                "x": 1950,
                "y": 1050,
                "patrolRange": {
                        "minX": 1870,
                        "maxX": 2030
                },
                "hp": 205,
                "maxHp": 205,
                "attack": 25,
                "defense": 14,
                "xpReward": 146,
                "combatMode": "listening_pursuit",
                "learningSkill": "Mê Âm Truy Kích (Luyện Nghe & Nhận Diện Ngữ Âm)",
                "difficulty": "easy",
                "requiredQuestionsCount": 1,
                "winCondition": "Lắng nghe thông điệp âm thanh và nhận diện chính xác yếu nghĩa",
                "tutorialBriefing": "Mê Âm Truy Kích: Kẻ địch truyền âm huyễn hoặc! Bấm nút Nghe để phát âm thanh khẩu quyết và giải mã ý nghĩa!"
        },
        {
                "encounterId": "g10-u07_enc_brute",
                "enemyId": "brute",
                "name": "Trọng Binh Phá Hoại",
                "title": "Tà Binh Tuần Tra",
                "concept": "large armored bruiser with a heavy club; motifs: corrupted treaties, masked envoys and torn pennants; no real organisation logos",
                "spritePath": "/assets/game/units/grade-10/unit-07/enemies/brute.png",
                "x": 2450,
                "y": 1150,
                "patrolRange": {
                        "minX": 2370,
                        "maxX": 2530
                },
                "hp": 220,
                "maxHp": 220,
                "attack": 27,
                "defense": 15,
                "xpReward": 156,
                "combatMode": "unseal",
                "learningSkill": "Phá Phong Ấn (Cấu Trúc Cú Pháp & Trật Tự Câu)",
                "difficulty": "medium",
                "requiredQuestionsCount": 1,
                "winCondition": "Sắp xếp các phiến đá từ ngữ thành câu đúng ngữ pháp",
                "tutorialBriefing": "Phá Phong Ấn: Giáp hộ thân của Thạch Nhân chỉ bị phá vỡ khi sắp xếp các từ ngữ theo đúng trật tự cú pháp!"
        },
        {
                "encounterId": "g10-u07_enc_construct",
                "enemyId": "construct",
                "name": "Cấm Giới Thiết Nhân",
                "title": "Tà Binh Tuần Tra",
                "concept": "nonhuman golem assembled from the unit's material motifs; motifs: corrupted treaties, masked envoys and torn pennants; no real organisation logos",
                "spritePath": "/assets/game/units/grade-10/unit-07/enemies/construct.png",
                "x": 2850,
                "y": 1300,
                "patrolRange": {
                        "minX": 2770,
                        "maxX": 2930
                },
                "hp": 235,
                "maxHp": 235,
                "attack": 29,
                "defense": 16,
                "xpReward": 166,
                "combatMode": "deception_pierce",
                "learningSkill": "Thiên Diện Phá Ảo (Đọc Hiểu & Định Vị Câu Dẫn Chứng)",
                "difficulty": "medium",
                "requiredQuestionsCount": 1,
                "winCondition": "Chọn đáp án đúng VÀ định vị đúng câu dẫn chứng [1]-[4]",
                "tutorialBriefing": "Thiên Diện Phá Ảo: Ảo ảnh che mắt! Đọc kỹ đoạn văn bản, chọn đáp án đúng và bấm chọn đúng CÂU DẪN CHỨNG [1]-[4]!"
        },
        {
                "encounterId": "g10-u07_enc_spirit",
                "enemyId": "spirit",
                "name": "Tù Đày U Linh",
                "title": "Tà Binh Tuần Tra",
                "concept": "eerie floating nonhuman spirit formed from the unit's motifs; motifs: corrupted treaties, masked envoys and torn pennants; no real organisation logos",
                "spritePath": "/assets/game/units/grade-10/unit-07/enemies/spirit.png",
                "x": 1750,
                "y": 1380,
                "patrolRange": {
                        "minX": 1670,
                        "maxX": 1830
                },
                "hp": 250,
                "maxHp": 250,
                "attack": 31,
                "defense": 17,
                "xpReward": 176,
                "combatMode": "escort_dialogue",
                "learningSkill": "Hộ Tống Hội Thoại (Giao Tiếp Tình Huống & Phản Hồi Chiến Thuật)",
                "difficulty": "medium",
                "requiredQuestionsCount": 1,
                "winCondition": "Lựa chọn câu đối đáp thấu tình đạt lý, kích hoạt khiên hộ thể",
                "tutorialBriefing": "Hộ Tống Hội Thoại: Đối thủ dùng lời kích động tâm trí! Chọn phương án đối đáp chuẩn mực để kích hoạt khiên bảo hộ!"
        },
        {
                "encounterId": "g10-u07_enc_elite",
                "enemyId": "elite",
                "name": "Nghịch Lễ Tinh Anh",
                "title": "Hộ Vệ Tinh Anh",
                "concept": "elite commander with ornate armor and distinctive polearm; motifs: corrupted treaties, masked envoys and torn pennants; no real organisation logos",
                "spritePath": "/assets/game/units/grade-10/unit-07/enemies/elite.png",
                "x": 2250,
                "y": 1450,
                "patrolRange": {
                        "minX": 2170,
                        "maxX": 2330
                },
                "hp": 325,
                "maxHp": 325,
                "attack": 38,
                "defense": 17,
                "xpReward": 285,
                "combatMode": "triple_combo",
                "learningSkill": "Liên Hoàn Tam Chiêu (Tổng Hợp Nghe - Hiểu - Xuất Chiêu)",
                "difficulty": "hard",
                "requiredQuestionsCount": 1,
                "winCondition": "Hoàn thành chuỗi 3 chiêu thức: Thính âm -> Luận giải -> Xuất chiêu phá trận",
                "tutorialBriefing": "Liên Hoàn Tam Chiêu: Hộ vệ tinh anh sở hữu kiếm pháp liên hoàn! Hoàn thành liên tiếp 3 chiêu thức để trảm địch!"
        }
      ],
    "climax": {
      "hasRealBoss": false,
      "encounterId": "g10-u07_climax_7",
      "enemy": {
          "id": "climax_g10-u07",
        "name": "Thủ Trận Tinh Anh - VIET NAM AND INTERNATIONAL ORGANISATIONS",
        "title": "Trấn Thủ Trận Đỉnh Điểm",
        "spriteKey": "/assets/game/units/grade-10/unit-07/enemies/elite.png",
        "hp": 420,
        "maxHp": 420,
        "attack": 40,
        "defense": 19,
        "xpReward": 495,
        "isBoss": false,
        "bossPhase": 1,
        "dialogueIntro": "“Ta là Thủ Trận Tinh Anh trấn giữ thạch trận đỉnh điểm của VIET NAM AND INTERNATIONAL ORGANISATIONS. Hãy dốc toàn lực chiến thắng để chứng minh sự tinh thông!”",
        "dialoguePhase2": "“Ngươi quả thực có thực lực! Đỡ chiêu biến hóa cuối cùng này!”",
        "combatMode": "triple_combo",
        "learningSkill": "Quyết Chiến Thủ Trận Tinh Anh (Thạch Trận Đỉnh Điểm)",
        "difficulty": "hard",
        "requiredQuestionsCount": 1,
        "winCondition": "Đánh bại Thủ Trận Tinh Anh để giải phóng toàn bộ Unit",
        "tutorialBriefing": "Phong Ấn Trận Đỉnh Điểm: Hoàn thành Liên Hoàn Tam Chiêu để phá tan kết giới, hoàn thành Unit và mở ra cảnh giới mới!"
        },
      "x": 1600,
      "y": 1720,
      "barrierPrompt": "🔒 Phong Ấn Trận Đỉnh Điểm (Cần >= 70% tiến độ)",
      "unlockedPrompt": "⚡ Phong Ấn Đỉnh Điểm ĐÃ MỞ! Thách đấu Thủ Trận Tinh Anh!"
    }
  },
  "g10-u08": {
    "unitId": "g10-u08",
    "grade": 10,
    "unitNumber": 8,
    "title": "NEW WAYS TO LEARN",
    "topic": "Digital Education, Blended Learning and Modern Study Tools",
    "mapWidth": 3200,
    "mapHeight": 2000,
    "ground": {
      "primaryPath": "/assets/game/units/grade-10/unit-08/ground/main_ground.png",
      "secondaryPath": null,
      "tileable": false
    },
    "npcs": [
      {
        "id": "bang_chu",
        "name": "Hồng y tông chủ Hà Ánh Phượng",
        "title": "Lãnh Tụ Võ Lâm Chính Phái",
        "elementColor": "#fbe285",
        "spriteKey": "bang_chu_ha_anh_phuong",
        "portraitPath": "/assets/game/characters/npc/portraits/bang_chu_ha_anh_phuong.png",
        "x": 550,
        "y": 560,
        "prompt": "[E] Bái kiến Hồng y tông chủ Hà Ánh Phượng",
        "dialogueIntro": "Chào mừng thiếu hiệp! Hôm nay chúng ta cùng khám phá Unit 8: NEW WAYS TO LEARN (Digital Education, Blended Learning and Modern Study Tools). Hãy rèn luyện võ học, giải trừ ma chướng!"
      },
      {
        "id": "bach_khoa_thu_sinh",
        "name": "Bách Khoa thư Sinh Đinh Ngọc Khánh",
        "title": "Đại Sư Huynh Tông Môn",
        "elementColor": "#c084fc",
        "spriteKey": "bach_khoa_thu_sinh",
        "portraitPath": "/assets/game/characters/npc/portraits/bach_khoa_thu_sinh_v2.png",
        "x": 740,
        "y": 480,
        "prompt": "[E] Thỉnh Giáo Bách Khoa thư Sinh Đinh Ngọc Khánh",
        "dialogueIntro": "Chào sư đệ/sư muội! Đại học không nhàn như giang hồ đồn đâu các đệ... Nhưng qua được ải THPT này, thiên hạ sẽ mở rộng trước mắt! Có gì vướng mắc về bẫy thi cử hay kỹ năng thực chiến, cứ hỏi ta!"
      },
      {
        "id": "ho_phap_phuong_tu",
        "name": "Hộ Pháp Phương Tú",
        "title": "Hộ Pháp Từ Vựng & Trưởng Thành",
        "elementColor": "#59caa0",
        "spriteKey": "ho_phap_phuong_tu",
        "portraitPath": "/assets/game/characters/npc/portraits/ho_phap_phuong_tu.png",
        "x": 920,
        "y": 560,
        "prompt": "[E] Tham Vấn Hộ Pháp Phương Tú",
        "dialogueIntro": "Tàng Kinh Các lưu giữ toàn bộ bí điển từ vựng của NEW WAYS TO LEARN. Hãy lĩnh hội từng câu chữ để tích lũy công lực căn bản!"
      },
      {
        "id": "ho_phap_dang_tran_ha",
        "name": "Hộ Pháp Đặng Trần Hà",
        "title": "Hộ Pháp Ngữ Pháp & Thách Đấu",
        "elementColor": "#60a5fa",
        "spriteKey": "ho_phap_dang_tran_ha",
        "portraitPath": "/assets/game/characters/npc/portraits/ho_phap_dang_tran_ha.png",
        "x": 1850,
        "y": 560,
        "prompt": "[E] Bái Kiến Hộ Pháp Đặng Trần Hà",
        "dialogueIntro": "Ngữ pháp là xương sống của kiếm chiêu! Muốn phá phong ấn thạch trận của NEW WAYS TO LEARN, tâm ý phải chuẩn xác, cú pháp không được sai lệch một ly!"
      },
      {
        "id": "ho_phap_hoang_van",
        "name": "Hộ Pháp Hoàng Vân",
        "title": "Hộ Pháp Nghe & Nhịp Điệu",
        "elementColor": "#fbbf24",
        "spriteKey": "ho_phap_hoang_van",
        "portraitPath": "/assets/game/characters/npc/portraits/ho_phap_hoang_van.png",
        "x": 2400,
        "y": 760,
        "prompt": "[E] Thỉnh Giáo Hộ Pháp Hoàng Vân",
        "dialogueIntro": "Lắng nghe âm điệu tự nhiên, nghe rõ từng ngữ âm để thấu suốt chiêu thức địch nhân. Hãy vào Võ Luyện Đài luyện tập cùng ta!"
      },
      {
        "id": "ho_phap_nguyet_nguyen",
        "name": "Hộ Pháp Nguyệt Nguyên",
        "title": "Hộ Pháp Đọc Hiểu & Minh Triết",
        "elementColor": "#38bdf8",
        "spriteKey": "ho_phap_nguyet_nguyen",
        "portraitPath": "/assets/game/characters/npc/portraits/ho_phap_nguyet_nguyen.png",
        "x": 660,
        "y": 1260,
        "prompt": "[E] Luận Đạo Hộ Pháp Nguyệt Nguyên",
        "dialogueIntro": "Minh Triết Các soi rọi chân lý. Khi đối mặt với thuật ngụy tạo và mê trận thông tin của NEW WAYS TO LEARN, hãy tìm đúng câu bằng chứng để phá tan ảo ảnh!"
      }
    ],
    "props": [
        {
                "id": "g10-u08_theme_prop",
                "name": "astronomy teaching sphere",
                "path": "/assets/game/units/grade-10/unit-08/props/theme_prop.png",
                "x": 1380,
                "y": 580,
                "size": [
                        160,
                        160
                ],
                "category": "vocab_discovery"
        },
        {
                "id": "g10-u08_secondary_prop",
                "name": "Bí Điển Giáo Dục Tân Thời",
                "path": "/assets/game/items/anh_ngu_bi_dien.png",
                "x": 860,
                "y": 1300,
                "size": [
                        128,
                        128
                ],
                "category": "reading_clue"
        }
      ],
    "enemies": [
        {
                "encounterId": "g10-u08_enc_scout",
                "enemyId": "scout",
                "name": "Trì Trệ Thám Tử",
                "title": "Tà Binh Tuần Tra",
                "concept": "swift human scout with a short blade and light Vietnamese clothing; motifs: enchanted scrolls, broken learning instruments and illusion tablets",
                "spritePath": "/assets/game/units/grade-10/unit-08/enemies/scout.png",
                "x": 1450,
                "y": 1050,
                "patrolRange": {
                        "minX": 1380,
                        "maxX": 1540
                },
                "hp": 200,
                "maxHp": 200,
                "attack": 24,
                "defense": 14,
                "xpReward": 144,
                "combatMode": "lost_word",
                "learningSkill": "Đoạt Lại Vong Từ (Từ Vựng & Cụm Từ Cốt Lõi)",
                "difficulty": "easy",
                "requiredQuestionsCount": 1,
                "winCondition": "Điền chính xác từ khuyết thiếu để đoạt lại vong từ",
                "tutorialBriefing": "Đoạt Lại Vong Từ: Kẻ địch che giấu một từ vựng trọng tâm. Dùng manh mối gợi ý và kiến thức để điền chính xác!"
        },
        {
                "encounterId": "g10-u08_enc_ranged",
                "enemyId": "ranged",
                "name": "Mê Huyễn Cung Nhân",
                "title": "Tà Binh Tuần Tra",
                "concept": "human ranged attacker with a bamboo bow or sling; motifs: enchanted scrolls, broken learning instruments and illusion tablets",
                "spritePath": "/assets/game/units/grade-10/unit-08/enemies/ranged.png",
                "x": 1950,
                "y": 1050,
                "patrolRange": {
                        "minX": 1870,
                        "maxX": 2030
                },
                "hp": 215,
                "maxHp": 215,
                "attack": 26,
                "defense": 15,
                "xpReward": 154,
                "combatMode": "listening_pursuit",
                "learningSkill": "Mê Âm Truy Kích (Luyện Nghe & Nhận Diện Ngữ Âm)",
                "difficulty": "easy",
                "requiredQuestionsCount": 1,
                "winCondition": "Lắng nghe thông điệp âm thanh và nhận diện chính xác yếu nghĩa",
                "tutorialBriefing": "Mê Âm Truy Kích: Kẻ địch truyền âm huyễn hoặc! Bấm nút Nghe để phát âm thanh khẩu quyết và giải mã ý nghĩa!"
        },
        {
                "encounterId": "g10-u08_enc_brute",
                "enemyId": "brute",
                "name": "Phong Tỏa Cự Thạch",
                "title": "Tà Binh Tuần Tra",
                "concept": "large armored bruiser with a heavy club; motifs: enchanted scrolls, broken learning instruments and illusion tablets",
                "spritePath": "/assets/game/units/grade-10/unit-08/enemies/brute.png",
                "x": 2450,
                "y": 1150,
                "patrolRange": {
                        "minX": 2370,
                        "maxX": 2530
                },
                "hp": 230,
                "maxHp": 230,
                "attack": 28,
                "defense": 16,
                "xpReward": 164,
                "combatMode": "unseal",
                "learningSkill": "Phá Phong Ấn (Cấu Trúc Cú Pháp & Trật Tự Câu)",
                "difficulty": "medium",
                "requiredQuestionsCount": 1,
                "winCondition": "Sắp xếp các phiến đá từ ngữ thành câu đúng ngữ pháp",
                "tutorialBriefing": "Phá Phong Ấn: Giáp hộ thân của Thạch Nhân chỉ bị phá vỡ khi sắp xếp các từ ngữ theo đúng trật tự cú pháp!"
        },
        {
                "encounterId": "g10-u08_enc_construct",
                "enemyId": "construct",
                "name": "Cơ Quan Ngăn Trở",
                "title": "Tà Binh Tuần Tra",
                "concept": "nonhuman golem assembled from the unit's material motifs; motifs: enchanted scrolls, broken learning instruments and illusion tablets",
                "spritePath": "/assets/game/units/grade-10/unit-08/enemies/construct.png",
                "x": 2850,
                "y": 1300,
                "patrolRange": {
                        "minX": 2770,
                        "maxX": 2930
                },
                "hp": 245,
                "maxHp": 245,
                "attack": 30,
                "defense": 17,
                "xpReward": 174,
                "combatMode": "deception_pierce",
                "learningSkill": "Thiên Diện Phá Ảo (Đọc Hiểu & Định Vị Câu Dẫn Chứng)",
                "difficulty": "medium",
                "requiredQuestionsCount": 1,
                "winCondition": "Chọn đáp án đúng VÀ định vị đúng câu dẫn chứng [1]-[4]",
                "tutorialBriefing": "Thiên Diện Phá Ảo: Ảo ảnh che mắt! Đọc kỹ đoạn văn bản, chọn đáp án đúng và bấm chọn đúng CÂU DẪN CHỨNG [1]-[4]!"
        },
        {
                "encounterId": "g10-u08_enc_spirit",
                "enemyId": "spirit",
                "name": "Mê Muội U Hồn",
                "title": "Tà Binh Tuần Tra",
                "concept": "eerie floating nonhuman spirit formed from the unit's motifs; motifs: enchanted scrolls, broken learning instruments and illusion tablets",
                "spritePath": "/assets/game/units/grade-10/unit-08/enemies/spirit.png",
                "x": 1750,
                "y": 1380,
                "patrolRange": {
                        "minX": 1670,
                        "maxX": 1830
                },
                "hp": 260,
                "maxHp": 260,
                "attack": 32,
                "defense": 18,
                "xpReward": 184,
                "combatMode": "escort_dialogue",
                "learningSkill": "Hộ Tống Hội Thoại (Giao Tiếp Tình Huống & Phản Hồi Chiến Thuật)",
                "difficulty": "medium",
                "requiredQuestionsCount": 1,
                "winCondition": "Lựa chọn câu đối đáp thấu tình đạt lý, kích hoạt khiên hộ thể",
                "tutorialBriefing": "Hộ Tống Hội Thoại: Đối thủ dùng lời kích động tâm trí! Chọn phương án đối đáp chuẩn mực để kích hoạt khiên bảo hộ!"
        },
        {
                "encounterId": "g10-u08_enc_elite",
                "enemyId": "elite",
                "name": "Hủ Nho Tinh Anh",
                "title": "Hộ Vệ Tinh Anh",
                "concept": "elite commander with ornate armor and distinctive polearm; motifs: enchanted scrolls, broken learning instruments and illusion tablets",
                "spritePath": "/assets/game/units/grade-10/unit-08/enemies/elite.png",
                "x": 2250,
                "y": 1450,
                "patrolRange": {
                        "minX": 2170,
                        "maxX": 2330
                },
                "hp": 340,
                "maxHp": 340,
                "attack": 40,
                "defense": 18,
                "xpReward": 300,
                "combatMode": "triple_combo",
                "learningSkill": "Liên Hoàn Tam Chiêu (Tổng Hợp Nghe - Hiểu - Xuất Chiêu)",
                "difficulty": "hard",
                "requiredQuestionsCount": 1,
                "winCondition": "Hoàn thành chuỗi 3 chiêu thức: Thính âm -> Luận giải -> Xuất chiêu phá trận",
                "tutorialBriefing": "Liên Hoàn Tam Chiêu: Hộ vệ tinh anh sở hữu kiếm pháp liên hoàn! Hoàn thành liên tiếp 3 chiêu thức để trảm địch!"
        }
      ],
    "climax": {
      "hasRealBoss": false,
      "encounterId": "g10-u08_climax_8",
      "enemy": {
          "id": "climax_g10-u08",
        "name": "Thủ Trận Tinh Anh - NEW WAYS TO LEARN",
        "title": "Trấn Thủ Trận Đỉnh Điểm",
        "spriteKey": "/assets/game/units/grade-10/unit-08/enemies/elite.png",
        "hp": 440,
        "maxHp": 440,
        "attack": 42,
        "defense": 20,
        "xpReward": 520,
        "isBoss": false,
        "bossPhase": 1,
        "dialogueIntro": "“Ta là Thủ Trận Tinh Anh trấn giữ thạch trận đỉnh điểm của NEW WAYS TO LEARN. Hãy dốc toàn lực chiến thắng để chứng minh sự tinh thông!”",
        "dialoguePhase2": "“Ngươi quả thực có thực lực! Đỡ chiêu biến hóa cuối cùng này!”",
        "combatMode": "triple_combo",
        "learningSkill": "Quyết Chiến Thủ Trận Tinh Anh (Thạch Trận Đỉnh Điểm)",
        "difficulty": "hard",
        "requiredQuestionsCount": 1,
        "winCondition": "Đánh bại Thủ Trận Tinh Anh để giải phóng toàn bộ Unit",
        "tutorialBriefing": "Phong Ấn Trận Đỉnh Điểm: Hoàn thành Liên Hoàn Tam Chiêu để phá tan kết giới, hoàn thành Unit và mở ra cảnh giới mới!"
        },
      "x": 1600,
      "y": 1720,
      "barrierPrompt": "🔒 Phong Ấn Trận Đỉnh Điểm (Cần >= 70% tiến độ)",
      "unlockedPrompt": "⚡ Phong Ấn Đỉnh Điểm ĐÃ MỞ! Thách đấu Thủ Trận Tinh Anh!"
    }
  },
  "g10-u09": {
    "unitId": "g10-u09",
    "grade": 10,
    "unitNumber": 9,
    "title": "PROTECTING THE ENVIRONMENT",
    "topic": "Environmental Issues, Climate Action and Biodiversity",
    "mapWidth": 3200,
    "mapHeight": 2000,
    "ground": {
      "primaryPath": "/assets/game/units/grade-10/unit-09/ground/main_ground.png",
      "secondaryPath": null,
      "tileable": false
    },
    "npcs": [
      {
        "id": "bang_chu",
        "name": "Hồng y tông chủ Hà Ánh Phượng",
        "title": "Lãnh Tụ Võ Lâm Chính Phái",
        "elementColor": "#fbe285",
        "spriteKey": "bang_chu_ha_anh_phuong",
        "portraitPath": "/assets/game/characters/npc/portraits/bang_chu_ha_anh_phuong.png",
        "x": 550,
        "y": 560,
        "prompt": "[E] Bái kiến Hồng y tông chủ Hà Ánh Phượng",
        "dialogueIntro": "Chào mừng thiếu hiệp! Hôm nay chúng ta cùng khám phá Unit 9: PROTECTING THE ENVIRONMENT (Environmental Issues, Climate Action and Biodiversity). Hãy rèn luyện võ học, giải trừ ma chướng!"
      },
      {
        "id": "bach_khoa_thu_sinh",
        "name": "Bách Khoa thư Sinh Đinh Ngọc Khánh",
        "title": "Đại Sư Huynh Tông Môn",
        "elementColor": "#c084fc",
        "spriteKey": "bach_khoa_thu_sinh",
        "portraitPath": "/assets/game/characters/npc/portraits/bach_khoa_thu_sinh_v2.png",
        "x": 740,
        "y": 480,
        "prompt": "[E] Thỉnh Giáo Bách Khoa thư Sinh Đinh Ngọc Khánh",
        "dialogueIntro": "Chào sư đệ/sư muội! Đại học không nhàn như giang hồ đồn đâu các đệ... Nhưng qua được ải THPT này, thiên hạ sẽ mở rộng trước mắt! Có gì vướng mắc về bẫy thi cử hay kỹ năng thực chiến, cứ hỏi ta!"
      },
      {
        "id": "ho_phap_phuong_tu",
        "name": "Hộ Pháp Phương Tú",
        "title": "Hộ Pháp Từ Vựng & Trưởng Thành",
        "elementColor": "#59caa0",
        "spriteKey": "ho_phap_phuong_tu",
        "portraitPath": "/assets/game/characters/npc/portraits/ho_phap_phuong_tu.png",
        "x": 920,
        "y": 560,
        "prompt": "[E] Tham Vấn Hộ Pháp Phương Tú",
        "dialogueIntro": "Tàng Kinh Các lưu giữ toàn bộ bí điển từ vựng của PROTECTING THE ENVIRONMENT. Hãy lĩnh hội từng câu chữ để tích lũy công lực căn bản!"
      },
      {
        "id": "ho_phap_dang_tran_ha",
        "name": "Hộ Pháp Đặng Trần Hà",
        "title": "Hộ Pháp Ngữ Pháp & Thách Đấu",
        "elementColor": "#60a5fa",
        "spriteKey": "ho_phap_dang_tran_ha",
        "portraitPath": "/assets/game/characters/npc/portraits/ho_phap_dang_tran_ha.png",
        "x": 1850,
        "y": 560,
        "prompt": "[E] Bái Kiến Hộ Pháp Đặng Trần Hà",
        "dialogueIntro": "Ngữ pháp là xương sống của kiếm chiêu! Muốn phá phong ấn thạch trận của PROTECTING THE ENVIRONMENT, tâm ý phải chuẩn xác, cú pháp không được sai lệch một ly!"
      },
      {
        "id": "ho_phap_hoang_van",
        "name": "Hộ Pháp Hoàng Vân",
        "title": "Hộ Pháp Nghe & Nhịp Điệu",
        "elementColor": "#fbbf24",
        "spriteKey": "ho_phap_hoang_van",
        "portraitPath": "/assets/game/characters/npc/portraits/ho_phap_hoang_van.png",
        "x": 2400,
        "y": 760,
        "prompt": "[E] Thỉnh Giáo Hộ Pháp Hoàng Vân",
        "dialogueIntro": "Lắng nghe âm điệu tự nhiên, nghe rõ từng ngữ âm để thấu suốt chiêu thức địch nhân. Hãy vào Võ Luyện Đài luyện tập cùng ta!"
      },
      {
        "id": "ho_phap_nguyet_nguyen",
        "name": "Hộ Pháp Nguyệt Nguyên",
        "title": "Hộ Pháp Đọc Hiểu & Minh Triết",
        "elementColor": "#38bdf8",
        "spriteKey": "ho_phap_nguyet_nguyen",
        "portraitPath": "/assets/game/characters/npc/portraits/ho_phap_nguyet_nguyen.png",
        "x": 660,
        "y": 1260,
        "prompt": "[E] Luận Đạo Hộ Pháp Nguyệt Nguyên",
        "dialogueIntro": "Minh Triết Các soi rọi chân lý. Khi đối mặt với thuật ngụy tạo và mê trận thông tin của PROTECTING THE ENVIRONMENT, hãy tìm đúng câu bằng chứng để phá tan ảo ảnh!"
      }
    ],
    "props": [
        {
                "id": "g10-u09_theme_prop",
                "name": "native tree sapling",
                "path": "/assets/game/units/grade-10/unit-09/props/theme_prop.png",
                "x": 1380,
                "y": 580,
                "size": [
                        160,
                        160
                ],
                "category": "vocab_discovery"
        },
        {
                "id": "g10-u09_secondary_prop",
                "name": "Bí Điển Sinh Thái & Bảo Tồn",
                "path": "/assets/game/items/anh_ngu_bi_dien.png",
                "x": 860,
                "y": 1300,
                "size": [
                        128,
                        128
                ],
                "category": "reading_clue"
        }
      ],
    "enemies": [
        {
                "encounterId": "g10-u09_enc_scout",
                "enemyId": "scout",
                "name": "Tầm Độc Yêu Ma",
                "title": "Tà Binh Tuần Tra",
                "concept": "swift human scout with a short blade and light Vietnamese clothing; motifs: poisoned roots, discarded nets and dark forest smoke",
                "spritePath": "/assets/game/units/grade-10/unit-09/enemies/scout.png",
                "x": 1450,
                "y": 1050,
                "patrolRange": {
                        "minX": 1380,
                        "maxX": 1540
                },
                "hp": 210,
                "maxHp": 210,
                "attack": 25,
                "defense": 15,
                "xpReward": 152,
                "combatMode": "lost_word",
                "learningSkill": "Đoạt Lại Vong Từ (Từ Vựng & Cụm Từ Cốt Lõi)",
                "difficulty": "easy",
                "requiredQuestionsCount": 1,
                "winCondition": "Điền chính xác từ khuyết thiếu để đoạt lại vong từ",
                "tutorialBriefing": "Đoạt Lại Vong Từ: Kẻ địch che giấu một từ vựng trọng tâm. Dùng manh mối gợi ý và kiến thức để điền chính xác!"
        },
        {
                "encounterId": "g10-u09_enc_ranged",
                "enemyId": "ranged",
                "name": "Hủ Độc Xạ Thủ",
                "title": "Tà Binh Tuần Tra",
                "concept": "human ranged attacker with a bamboo bow or sling; motifs: poisoned roots, discarded nets and dark forest smoke",
                "spritePath": "/assets/game/units/grade-10/unit-09/enemies/ranged.png",
                "x": 1950,
                "y": 1050,
                "patrolRange": {
                        "minX": 1870,
                        "maxX": 2030
                },
                "hp": 225,
                "maxHp": 225,
                "attack": 27,
                "defense": 16,
                "xpReward": 162,
                "combatMode": "listening_pursuit",
                "learningSkill": "Mê Âm Truy Kích (Luyện Nghe & Nhận Diện Ngữ Âm)",
                "difficulty": "easy",
                "requiredQuestionsCount": 1,
                "winCondition": "Lắng nghe thông điệp âm thanh và nhận diện chính xác yếu nghĩa",
                "tutorialBriefing": "Mê Âm Truy Kích: Kẻ địch truyền âm huyễn hoặc! Bấm nút Nghe để phát âm thanh khẩu quyết và giải mã ý nghĩa!"
        },
        {
                "encounterId": "g10-u09_enc_brute",
                "enemyId": "brute",
                "name": "Săn Bắt Hung Đồ",
                "title": "Tà Binh Tuần Tra",
                "concept": "large armored bruiser with a heavy club; motifs: poisoned roots, discarded nets and dark forest smoke",
                "spritePath": "/assets/game/units/grade-10/unit-09/enemies/brute.png",
                "x": 2450,
                "y": 1150,
                "patrolRange": {
                        "minX": 2370,
                        "maxX": 2530
                },
                "hp": 240,
                "maxHp": 240,
                "attack": 29,
                "defense": 17,
                "xpReward": 172,
                "combatMode": "unseal",
                "learningSkill": "Phá Phong Ấn (Cấu Trúc Cú Pháp & Trật Tự Câu)",
                "difficulty": "medium",
                "requiredQuestionsCount": 1,
                "winCondition": "Sắp xếp các phiến đá từ ngữ thành câu đúng ngữ pháp",
                "tutorialBriefing": "Phá Phong Ấn: Giáp hộ thân của Thạch Nhân chỉ bị phá vỡ khi sắp xếp các từ ngữ theo đúng trật tự cú pháp!"
        },
        {
                "encounterId": "g10-u09_enc_construct",
                "enemyId": "construct",
                "name": "Than Đá Thạch Quái",
                "title": "Tà Binh Tuần Tra",
                "concept": "nonhuman golem assembled from the unit's material motifs; motifs: poisoned roots, discarded nets and dark forest smoke",
                "spritePath": "/assets/game/units/grade-10/unit-09/enemies/construct.png",
                "x": 2850,
                "y": 1300,
                "patrolRange": {
                        "minX": 2770,
                        "maxX": 2930
                },
                "hp": 255,
                "maxHp": 255,
                "attack": 31,
                "defense": 18,
                "xpReward": 182,
                "combatMode": "deception_pierce",
                "learningSkill": "Thiên Diện Phá Ảo (Đọc Hiểu & Định Vị Câu Dẫn Chứng)",
                "difficulty": "medium",
                "requiredQuestionsCount": 1,
                "winCondition": "Chọn đáp án đúng VÀ định vị đúng câu dẫn chứng [1]-[4]",
                "tutorialBriefing": "Thiên Diện Phá Ảo: Ảo ảnh che mắt! Đọc kỹ đoạn văn bản, chọn đáp án đúng và bấm chọn đúng CÂU DẪN CHỨNG [1]-[4]!"
        },
        {
                "encounterId": "g10-u09_enc_spirit",
                "enemyId": "spirit",
                "name": "Hắc Khí Tà Linh",
                "title": "Tà Binh Tuần Tra",
                "concept": "eerie floating nonhuman spirit formed from the unit's motifs; motifs: poisoned roots, discarded nets and dark forest smoke",
                "spritePath": "/assets/game/units/grade-10/unit-09/enemies/spirit.png",
                "x": 1750,
                "y": 1380,
                "patrolRange": {
                        "minX": 1670,
                        "maxX": 1830
                },
                "hp": 270,
                "maxHp": 270,
                "attack": 33,
                "defense": 19,
                "xpReward": 192,
                "combatMode": "escort_dialogue",
                "learningSkill": "Hộ Tống Hội Thoại (Giao Tiếp Tình Huống & Phản Hồi Chiến Thuật)",
                "difficulty": "medium",
                "requiredQuestionsCount": 1,
                "winCondition": "Lựa chọn câu đối đáp thấu tình đạt lý, kích hoạt khiên hộ thể",
                "tutorialBriefing": "Hộ Tống Hội Thoại: Đối thủ dùng lời kích động tâm trí! Chọn phương án đối đáp chuẩn mực để kích hoạt khiên bảo hộ!"
        },
        {
                "encounterId": "g10-u09_enc_elite",
                "enemyId": "elite",
                "name": "Lâm Hải Tinh Anh",
                "title": "Hộ Vệ Tinh Anh",
                "concept": "elite commander with ornate armor and distinctive polearm; motifs: poisoned roots, discarded nets and dark forest smoke",
                "spritePath": "/assets/game/units/grade-10/unit-09/enemies/elite.png",
                "x": 2250,
                "y": 1450,
                "patrolRange": {
                        "minX": 2170,
                        "maxX": 2330
                },
                "hp": 355,
                "maxHp": 355,
                "attack": 42,
                "defense": 19,
                "xpReward": 315,
                "combatMode": "triple_combo",
                "learningSkill": "Liên Hoàn Tam Chiêu (Tổng Hợp Nghe - Hiểu - Xuất Chiêu)",
                "difficulty": "hard",
                "requiredQuestionsCount": 1,
                "winCondition": "Hoàn thành chuỗi 3 chiêu thức: Thính âm -> Luận giải -> Xuất chiêu phá trận",
                "tutorialBriefing": "Liên Hoàn Tam Chiêu: Hộ vệ tinh anh sở hữu kiếm pháp liên hoàn! Hoàn thành liên tiếp 3 chiêu thức để trảm địch!"
        }
      ],
    "climax": {
      "hasRealBoss": false,
      "encounterId": "g10-u09_climax_9",
      "enemy": {
          "id": "climax_g10-u09",
        "name": "Thủ Trận Tinh Anh - PROTECTING THE ENVIRONMENT",
        "title": "Trấn Thủ Trận Đỉnh Điểm",
        "spriteKey": "/assets/game/units/grade-10/unit-09/enemies/elite.png",
        "hp": 460,
        "maxHp": 460,
        "attack": 44,
        "defense": 21,
        "xpReward": 545,
        "isBoss": false,
        "bossPhase": 1,
        "dialogueIntro": "“Ta là Thủ Trận Tinh Anh trấn giữ thạch trận đỉnh điểm của PROTECTING THE ENVIRONMENT. Hãy dốc toàn lực chiến thắng để chứng minh sự tinh thông!”",
        "dialoguePhase2": "“Ngươi quả thực có thực lực! Đỡ chiêu biến hóa cuối cùng này!”",
        "combatMode": "triple_combo",
        "learningSkill": "Quyết Chiến Thủ Trận Tinh Anh (Thạch Trận Đỉnh Điểm)",
        "difficulty": "hard",
        "requiredQuestionsCount": 1,
        "winCondition": "Đánh bại Thủ Trận Tinh Anh để giải phóng toàn bộ Unit",
        "tutorialBriefing": "Phong Ấn Trận Đỉnh Điểm: Hoàn thành Liên Hoàn Tam Chiêu để phá tan kết giới, hoàn thành Unit và mở ra cảnh giới mới!"
        },
      "x": 1600,
      "y": 1720,
      "barrierPrompt": "🔒 Phong Ấn Trận Đỉnh Điểm (Cần >= 70% tiến độ)",
      "unlockedPrompt": "⚡ Phong Ấn Đỉnh Điểm ĐÃ MỞ! Thách đấu Thủ Trận Tinh Anh!"
    }
  },
  "g10-u10": {
    "unitId": "g10-u10",
    "grade": 10,
    "unitNumber": 10,
    "title": "ECOTOURISM",
    "topic": "Sustainable Travel, Eco-tours and Cultural Respect",
    "mapWidth": 3200,
    "mapHeight": 2000,
    "ground": {
      "primaryPath": "/assets/game/units/grade-10/unit-10/ground/main_ground.png",
      "secondaryPath": null,
      "tileable": false
    },
    "npcs": [
      {
        "id": "bang_chu",
        "name": "Hồng y tông chủ Hà Ánh Phượng",
        "title": "Lãnh Tụ Võ Lâm Chính Phái",
        "elementColor": "#fbe285",
        "spriteKey": "bang_chu_ha_anh_phuong",
        "portraitPath": "/assets/game/characters/npc/portraits/bang_chu_ha_anh_phuong.png",
        "x": 550,
        "y": 560,
        "prompt": "[E] Bái kiến Hồng y tông chủ Hà Ánh Phượng",
        "dialogueIntro": "Chào mừng thiếu hiệp! Hôm nay chúng ta cùng khám phá Unit 10: ECOTOURISM (Sustainable Travel, Eco-tours and Cultural Respect). Hãy rèn luyện võ học, giải trừ ma chướng!"
      },
      {
        "id": "bach_khoa_thu_sinh",
        "name": "Bách Khoa thư Sinh Đinh Ngọc Khánh",
        "title": "Đại Sư Huynh Tông Môn",
        "elementColor": "#c084fc",
        "spriteKey": "bach_khoa_thu_sinh",
        "portraitPath": "/assets/game/characters/npc/portraits/bach_khoa_thu_sinh_v2.png",
        "x": 740,
        "y": 480,
        "prompt": "[E] Thỉnh Giáo Bách Khoa thư Sinh Đinh Ngọc Khánh",
        "dialogueIntro": "Chào sư đệ/sư muội! Đại học không nhàn như giang hồ đồn đâu các đệ... Nhưng qua được ải THPT này, thiên hạ sẽ mở rộng trước mắt! Có gì vướng mắc về bẫy thi cử hay kỹ năng thực chiến, cứ hỏi ta!"
      },
      {
        "id": "ho_phap_phuong_tu",
        "name": "Hộ Pháp Phương Tú",
        "title": "Hộ Pháp Từ Vựng & Trưởng Thành",
        "elementColor": "#59caa0",
        "spriteKey": "ho_phap_phuong_tu",
        "portraitPath": "/assets/game/characters/npc/portraits/ho_phap_phuong_tu.png",
        "x": 920,
        "y": 560,
        "prompt": "[E] Tham Vấn Hộ Pháp Phương Tú",
        "dialogueIntro": "Tàng Kinh Các lưu giữ toàn bộ bí điển từ vựng của ECOTOURISM. Hãy lĩnh hội từng câu chữ để tích lũy công lực căn bản!"
      },
      {
        "id": "ho_phap_dang_tran_ha",
        "name": "Hộ Pháp Đặng Trần Hà",
        "title": "Hộ Pháp Ngữ Pháp & Thách Đấu",
        "elementColor": "#60a5fa",
        "spriteKey": "ho_phap_dang_tran_ha",
        "portraitPath": "/assets/game/characters/npc/portraits/ho_phap_dang_tran_ha.png",
        "x": 1850,
        "y": 560,
        "prompt": "[E] Bái Kiến Hộ Pháp Đặng Trần Hà",
        "dialogueIntro": "Ngữ pháp là xương sống của kiếm chiêu! Muốn phá phong ấn thạch trận của ECOTOURISM, tâm ý phải chuẩn xác, cú pháp không được sai lệch một ly!"
      },
      {
        "id": "ho_phap_hoang_van",
        "name": "Hộ Pháp Hoàng Vân",
        "title": "Hộ Pháp Nghe & Nhịp Điệu",
        "elementColor": "#fbbf24",
        "spriteKey": "ho_phap_hoang_van",
        "portraitPath": "/assets/game/characters/npc/portraits/ho_phap_hoang_van.png",
        "x": 2400,
        "y": 760,
        "prompt": "[E] Thỉnh Giáo Hộ Pháp Hoàng Vân",
        "dialogueIntro": "Lắng nghe âm điệu tự nhiên, nghe rõ từng ngữ âm để thấu suốt chiêu thức địch nhân. Hãy vào Võ Luyện Đài luyện tập cùng ta!"
      },
      {
        "id": "ho_phap_nguyet_nguyen",
        "name": "Hộ Pháp Nguyệt Nguyên",
        "title": "Hộ Pháp Đọc Hiểu & Minh Triết",
        "elementColor": "#38bdf8",
        "spriteKey": "ho_phap_nguyet_nguyen",
        "portraitPath": "/assets/game/characters/npc/portraits/ho_phap_nguyet_nguyen.png",
        "x": 660,
        "y": 1260,
        "prompt": "[E] Luận Đạo Hộ Pháp Nguyệt Nguyên",
        "dialogueIntro": "Minh Triết Các soi rọi chân lý. Khi đối mặt với thuật ngụy tạo và mê trận thông tin của ECOTOURISM, hãy tìm đúng câu bằng chứng để phá tan ảo ảnh!"
      }
    ],
    "props": [
        {
                "id": "g10-u10_theme_prop",
                "name": "bamboo trail sign without text",
                "path": "/assets/game/units/grade-10/unit-10/props/theme_prop.png",
                "x": 1380,
                "y": 580,
                "size": [
                        160,
                        160
                ],
                "category": "vocab_discovery"
        },
        {
                "id": "g10-u10_secondary_prop",
                "name": "Bí Điển Du Lịch Sinh Thái",
                "path": "/assets/game/items/anh_ngu_bi_dien.png",
                "x": 860,
                "y": 1300,
                "size": [
                        128,
                        128
                ],
                "category": "reading_clue"
        }
      ],
    "enemies": [
        {
                "encounterId": "g10-u10_enc_scout",
                "enemyId": "scout",
                "name": "Phá Hoại Thám Tử",
                "title": "Tà Binh Tuần Tra",
                "concept": "swift human scout with a short blade and light Vietnamese clothing; motifs: reckless trail raiders, trapped wildlife motifs and limestone spirits",
                "spritePath": "/assets/game/units/grade-10/unit-10/enemies/scout.png",
                "x": 1450,
                "y": 1050,
                "patrolRange": {
                        "minX": 1380,
                        "maxX": 1540
                },
                "hp": 220,
                "maxHp": 220,
                "attack": 26,
                "defense": 16,
                "xpReward": 160,
                "combatMode": "lost_word",
                "learningSkill": "Đoạt Lại Vong Từ (Từ Vựng & Cụm Từ Cốt Lõi)",
                "difficulty": "easy",
                "requiredQuestionsCount": 1,
                "winCondition": "Điền chính xác từ khuyết thiếu để đoạt lại vong từ",
                "tutorialBriefing": "Đoạt Lại Vong Từ: Kẻ địch che giấu một từ vựng trọng tâm. Dùng manh mối gợi ý và kiến thức để điền chính xác!"
        },
        {
                "encounterId": "g10-u10_enc_ranged",
                "enemyId": "ranged",
                "name": "Tiễn Độc Thợ Săn",
                "title": "Tà Binh Tuần Tra",
                "concept": "human ranged attacker with a bamboo bow or sling; motifs: reckless trail raiders, trapped wildlife motifs and limestone spirits",
                "spritePath": "/assets/game/units/grade-10/unit-10/enemies/ranged.png",
                "x": 1950,
                "y": 1050,
                "patrolRange": {
                        "minX": 1870,
                        "maxX": 2030
                },
                "hp": 235,
                "maxHp": 235,
                "attack": 28,
                "defense": 17,
                "xpReward": 170,
                "combatMode": "listening_pursuit",
                "learningSkill": "Mê Âm Truy Kích (Luyện Nghe & Nhận Diện Ngữ Âm)",
                "difficulty": "easy",
                "requiredQuestionsCount": 1,
                "winCondition": "Lắng nghe thông điệp âm thanh và nhận diện chính xác yếu nghĩa",
                "tutorialBriefing": "Mê Âm Truy Kích: Kẻ địch truyền âm huyễn hoặc! Bấm nút Nghe để phát âm thanh khẩu quyết và giải mã ý nghĩa!"
        },
        {
                "encounterId": "g10-u10_enc_brute",
                "enemyId": "brute",
                "name": "Cương Nghạnh Đao Khách",
                "title": "Tà Binh Tuần Tra",
                "concept": "large armored bruiser with a heavy club; motifs: reckless trail raiders, trapped wildlife motifs and limestone spirits",
                "spritePath": "/assets/game/units/grade-10/unit-10/enemies/brute.png",
                "x": 2450,
                "y": 1150,
                "patrolRange": {
                        "minX": 2370,
                        "maxX": 2530
                },
                "hp": 250,
                "maxHp": 250,
                "attack": 30,
                "defense": 18,
                "xpReward": 180,
                "combatMode": "unseal",
                "learningSkill": "Phá Phong Ấn (Cấu Trúc Cú Pháp & Trật Tự Câu)",
                "difficulty": "medium",
                "requiredQuestionsCount": 1,
                "winCondition": "Sắp xếp các phiến đá từ ngữ thành câu đúng ngữ pháp",
                "tutorialBriefing": "Phá Phong Ấn: Giáp hộ thân của Thạch Nhân chỉ bị phá vỡ khi sắp xếp các từ ngữ theo đúng trật tự cú pháp!"
        },
        {
                "encounterId": "g10-u10_enc_construct",
                "enemyId": "construct",
                "name": "Sơn Lâm Khôi Lỗi",
                "title": "Tà Binh Tuần Tra",
                "concept": "nonhuman golem assembled from the unit's material motifs; motifs: reckless trail raiders, trapped wildlife motifs and limestone spirits",
                "spritePath": "/assets/game/units/grade-10/unit-10/enemies/construct.png",
                "x": 2850,
                "y": 1300,
                "patrolRange": {
                        "minX": 2770,
                        "maxX": 2930
                },
                "hp": 265,
                "maxHp": 265,
                "attack": 32,
                "defense": 19,
                "xpReward": 190,
                "combatMode": "deception_pierce",
                "learningSkill": "Thiên Diện Phá Ảo (Đọc Hiểu & Định Vị Câu Dẫn Chứng)",
                "difficulty": "medium",
                "requiredQuestionsCount": 1,
                "winCondition": "Chọn đáp án đúng VÀ định vị đúng câu dẫn chứng [1]-[4]",
                "tutorialBriefing": "Thiên Diện Phá Ảo: Ảo ảnh che mắt! Đọc kỹ đoạn văn bản, chọn đáp án đúng và bấm chọn đúng CÂU DẪN CHỨNG [1]-[4]!"
        },
        {
                "encounterId": "g10-u10_enc_spirit",
                "enemyId": "spirit",
                "name": "Huyễn Vực Mê Vụ",
                "title": "Tà Binh Tuần Tra",
                "concept": "eerie floating nonhuman spirit formed from the unit's motifs; motifs: reckless trail raiders, trapped wildlife motifs and limestone spirits",
                "spritePath": "/assets/game/units/grade-10/unit-10/enemies/spirit.png",
                "x": 1750,
                "y": 1380,
                "patrolRange": {
                        "minX": 1670,
                        "maxX": 1830
                },
                "hp": 280,
                "maxHp": 280,
                "attack": 34,
                "defense": 20,
                "xpReward": 200,
                "combatMode": "escort_dialogue",
                "learningSkill": "Hộ Tống Hội Thoại (Giao Tiếp Tình Huống & Phản Hồi Chiến Thuật)",
                "difficulty": "medium",
                "requiredQuestionsCount": 1,
                "winCondition": "Lựa chọn câu đối đáp thấu tình đạt lý, kích hoạt khiên hộ thể",
                "tutorialBriefing": "Hộ Tống Hội Thoại: Đối thủ dùng lời kích động tâm trí! Chọn phương án đối đáp chuẩn mực để kích hoạt khiên bảo hộ!"
        },
        {
                "encounterId": "g10-u10_enc_elite",
                "enemyId": "elite",
                "name": "Đao Khách Lạc Lối",
                "title": "Hộ Vệ Tinh Anh",
                "concept": "elite commander with ornate armor and distinctive polearm; motifs: reckless trail raiders, trapped wildlife motifs and limestone spirits",
                "spritePath": "/assets/game/units/grade-10/unit-10/enemies/elite.png",
                "x": 2250,
                "y": 1450,
                "patrolRange": {
                        "minX": 2170,
                        "maxX": 2330
                },
                "hp": 370,
                "maxHp": 370,
                "attack": 44,
                "defense": 20,
                "xpReward": 330,
                "combatMode": "triple_combo",
                "learningSkill": "Liên Hoàn Tam Chiêu (Tổng Hợp Nghe - Hiểu - Xuất Chiêu)",
                "difficulty": "hard",
                "requiredQuestionsCount": 1,
                "winCondition": "Hoàn thành chuỗi 3 chiêu thức: Thính âm -> Luận giải -> Xuất chiêu phá trận",
                "tutorialBriefing": "Liên Hoàn Tam Chiêu: Hộ vệ tinh anh sở hữu kiếm pháp liên hoàn! Hoàn thành liên tiếp 3 chiêu thức để trảm địch!"
        }
      ],
    "climax": {
      "hasRealBoss": true,
      "encounterId": "g10-u10_boss_10",
      "enemy": {
          "id": "boss_g10-u10",
        "name": "Lạc Lối Đao Vương",
        "title": "Chiến Tướng Rừng Hoang Cấm Địa",
        "spriteKey": "/assets/game/units/grade-10/unit-10/bosses/lost_trail_warlord.png",
        "hp": 590,
        "maxHp": 590,
        "attack": 62,
        "defense": 34,
        "xpReward": 850,
        "isBoss": true,
        "bossPhase": 1,
        "dialogueIntro": "“Khá khen tiểu bối dám bước vào Cấm Địa ECOTOURISM! Hãy nếm thử kiếm khí của Lạc Lối Đao Vương!”",
        "dialoguePhase2": "“Cuồng Nộ Huyết Ma kích hoạt! Tuyệt kỹ ECOTOURISM sẽ biến ngươi thành tro bụi!”",
        "combatMode": "triple_combo",
        "learningSkill": "Quyết Chiến Đại Ma Đầu (2 Phase Liên Hoàn Tam Chiêu)",
        "difficulty": "hard",
        "requiredQuestionsCount": 1,
        "winCondition": "Đánh bại Ma Đầu qua 2 Phase sinh tử",
        "tutorialBriefing": "Quyết Chiến Boss: Đại Ma Đầu sở hữu 2 Phase cuồng nộ! Hãy hoàn thành Liên Hoàn Tam Chiêu và vượt qua tốc độ xuất chiêu bão táp!"
        },
      "x": 1600,
      "y": 1720,
      "barrierPrompt": "🔒 Ma Khí Cấm Địa (Cần >= 70% tiến độ)",
      "unlockedPrompt": "⚡ Cổng Ma Giáo Cấm Địa ĐÃ MỞ! Quyết chiến Lạc Lối Đao Vương!"
    }
  },
  "g11-u01": {
    "unitId": "g11-u01",
    "grade": 11,
    "unitNumber": 1,
    "title": "A LONG AND HEALTHY LIFE",
    "topic": "Health, Nutrition, Fitness and Longevity",
    "mapWidth": 3200,
    "mapHeight": 2000,
    "ground": {
      "primaryPath": "/assets/game/units/grade-11/unit-01/ground/main_ground.png",
      "secondaryPath": "/assets/game/units/grade-11/unit-01/ground/herbal_stone_path.png",
      "tileable": false
    },
    "npcs": [
      {
        "id": "bang_chu",
        "name": "Hồng y tông chủ Hà Ánh Phượng",
        "title": "Lãnh Tụ Võ Lâm Chính Phái",
        "elementColor": "#fbe285",
        "spriteKey": "bang_chu_ha_anh_phuong",
        "portraitPath": "/assets/game/characters/npc/portraits/bang_chu_ha_anh_phuong.png",
        "x": 550,
        "y": 560,
        "prompt": "[E] Bái kiến Hồng y tông chủ Hà Ánh Phượng",
        "dialogueIntro": "Chào mừng thiếu hiệp! Hôm nay chúng ta cùng khám phá Unit 1: A LONG AND HEALTHY LIFE (Health, Nutrition, Fitness and Longevity). Hãy rèn luyện võ học, giải trừ ma chướng!"
      },
      {
        "id": "bach_khoa_thu_sinh",
        "name": "Bách Khoa thư Sinh Đinh Ngọc Khánh",
        "title": "Đại Sư Huynh Tông Môn",
        "elementColor": "#c084fc",
        "spriteKey": "bach_khoa_thu_sinh",
        "portraitPath": "/assets/game/characters/npc/portraits/bach_khoa_thu_sinh_v2.png",
        "x": 740,
        "y": 480,
        "prompt": "[E] Thỉnh Giáo Bách Khoa thư Sinh Đinh Ngọc Khánh",
        "dialogueIntro": "Chào sư đệ/sư muội! Đại học không nhàn như giang hồ đồn đâu các đệ... Nhưng qua được ải THPT này, thiên hạ sẽ mở rộng trước mắt! Có gì vướng mắc về bẫy thi cử hay kỹ năng thực chiến, cứ hỏi ta!"
      },
      {
        "id": "ho_phap_phuong_tu",
        "name": "Hộ Pháp Phương Tú",
        "title": "Hộ Pháp Từ Vựng & Trưởng Thành",
        "elementColor": "#59caa0",
        "spriteKey": "ho_phap_phuong_tu",
        "portraitPath": "/assets/game/characters/npc/portraits/ho_phap_phuong_tu.png",
        "x": 920,
        "y": 560,
        "prompt": "[E] Tham Vấn Hộ Pháp Phương Tú",
        "dialogueIntro": "Tàng Kinh Các lưu giữ toàn bộ bí điển từ vựng của A LONG AND HEALTHY LIFE. Hãy lĩnh hội từng câu chữ để tích lũy công lực căn bản!"
      },
      {
        "id": "ho_phap_dang_tran_ha",
        "name": "Hộ Pháp Đặng Trần Hà",
        "title": "Hộ Pháp Ngữ Pháp & Thách Đấu",
        "elementColor": "#60a5fa",
        "spriteKey": "ho_phap_dang_tran_ha",
        "portraitPath": "/assets/game/characters/npc/portraits/ho_phap_dang_tran_ha.png",
        "x": 1850,
        "y": 560,
        "prompt": "[E] Bái Kiến Hộ Pháp Đặng Trần Hà",
        "dialogueIntro": "Ngữ pháp là xương sống của kiếm chiêu! Muốn phá phong ấn thạch trận của A LONG AND HEALTHY LIFE, tâm ý phải chuẩn xác, cú pháp không được sai lệch một ly!"
      },
      {
        "id": "ho_phap_hoang_van",
        "name": "Hộ Pháp Hoàng Vân",
        "title": "Hộ Pháp Nghe & Nhịp Điệu",
        "elementColor": "#fbbf24",
        "spriteKey": "ho_phap_hoang_van",
        "portraitPath": "/assets/game/characters/npc/portraits/ho_phap_hoang_van.png",
        "x": 2400,
        "y": 760,
        "prompt": "[E] Thỉnh Giáo Hộ Pháp Hoàng Vân",
        "dialogueIntro": "Lắng nghe âm điệu tự nhiên, nghe rõ từng ngữ âm để thấu suốt chiêu thức địch nhân. Hãy vào Võ Luyện Đài luyện tập cùng ta!"
      },
      {
        "id": "ho_phap_nguyet_nguyen",
        "name": "Hộ Pháp Nguyệt Nguyên",
        "title": "Hộ Pháp Đọc Hiểu & Minh Triết",
        "elementColor": "#38bdf8",
        "spriteKey": "ho_phap_nguyet_nguyen",
        "portraitPath": "/assets/game/characters/npc/portraits/ho_phap_nguyet_nguyen.png",
        "x": 660,
        "y": 1260,
        "prompt": "[E] Luận Đạo Hộ Pháp Nguyệt Nguyên",
        "dialogueIntro": "Minh Triết Các soi rọi chân lý. Khi đối mặt với thuật ngụy tạo và mê trận thông tin của A LONG AND HEALTHY LIFE, hãy tìm đúng câu bằng chứng để phá tan ảo ảnh!"
      }
    ],
    "props": [
        {
                "id": "g11-u01_theme_prop",
                "name": "herbal medicine mortar",
                "path": "/assets/game/units/grade-11/unit-01/props/theme_prop.png",
                "x": 1380,
                "y": 580,
                "size": [
                        160,
                        160
                ],
                "category": "vocab_discovery"
        },
        {
                "id": "g11-u01_herb_drying_rack",
                "name": "bamboo rack with medicinal herbs drying",
                "path": "/assets/game/units/grade-11/unit-01/props/herb_drying_rack.png",
                "x": 860,
                "y": 1300,
                "size": [
                        160,
                        160
                ],
                "category": "reading_clue"
        }
      ],
    "enemies": [
        {
                "encounterId": "g11-u01_enc_scout",
                "enemyId": "scout",
                "name": "Trọc Khí Thám Tử",
                "title": "Tà Binh Tuần Tra",
                "concept": "swift human scout with a short blade and light Vietnamese clothing; motifs: spoiled herbs, fever miasma and corrupted apothecary tools",
                "spritePath": "/assets/game/units/grade-11/unit-01/enemies/scout.png",
                "x": 1450,
                "y": 1050,
                "patrolRange": {
                        "minX": 1380,
                        "maxX": 1540
                },
                "hp": 130,
                "maxHp": 130,
                "attack": 17,
                "defense": 7,
                "xpReward": 88,
                "combatMode": "lost_word",
                "learningSkill": "Đoạt Lại Vong Từ (Từ Vựng & Cụm Từ Cốt Lõi)",
                "difficulty": "easy",
                "requiredQuestionsCount": 1,
                "winCondition": "Điền chính xác từ khuyết thiếu để đoạt lại vong từ",
                "tutorialBriefing": "Đoạt Lại Vong Từ: Kẻ địch che giấu một từ vựng trọng tâm. Dùng manh mối gợi ý và kiến thức để điền chính xác!"
        },
        {
                "encounterId": "g11-u01_enc_ranged",
                "enemyId": "ranged",
                "name": "Độc Trụ Xạ Thủ",
                "title": "Tà Binh Tuần Tra",
                "concept": "human ranged attacker with a bamboo bow or sling; motifs: spoiled herbs, fever miasma and corrupted apothecary tools",
                "spritePath": "/assets/game/units/grade-11/unit-01/enemies/ranged.png",
                "x": 1950,
                "y": 1050,
                "patrolRange": {
                        "minX": 1870,
                        "maxX": 2030
                },
                "hp": 145,
                "maxHp": 145,
                "attack": 19,
                "defense": 8,
                "xpReward": 98,
                "combatMode": "listening_pursuit",
                "learningSkill": "Mê Âm Truy Kích (Luyện Nghe & Nhận Diện Ngữ Âm)",
                "difficulty": "easy",
                "requiredQuestionsCount": 1,
                "winCondition": "Lắng nghe thông điệp âm thanh và nhận diện chính xác yếu nghĩa",
                "tutorialBriefing": "Mê Âm Truy Kích: Kẻ địch truyền âm huyễn hoặc! Bấm nút Nghe để phát âm thanh khẩu quyết và giải mã ý nghĩa!"
        },
        {
                "encounterId": "g11-u01_enc_brute",
                "enemyId": "brute",
                "name": "Hủ Bại Ma Binh",
                "title": "Tà Binh Tuần Tra",
                "concept": "large armored bruiser with a heavy club; motifs: spoiled herbs, fever miasma and corrupted apothecary tools",
                "spritePath": "/assets/game/units/grade-11/unit-01/enemies/brute.png",
                "x": 2450,
                "y": 1150,
                "patrolRange": {
                        "minX": 2370,
                        "maxX": 2530
                },
                "hp": 160,
                "maxHp": 160,
                "attack": 21,
                "defense": 9,
                "xpReward": 108,
                "combatMode": "unseal",
                "learningSkill": "Phá Phong Ấn (Cấu Trúc Cú Pháp & Trật Tự Câu)",
                "difficulty": "medium",
                "requiredQuestionsCount": 1,
                "winCondition": "Sắp xếp các phiến đá từ ngữ thành câu đúng ngữ pháp",
                "tutorialBriefing": "Phá Phong Ấn: Giáp hộ thân của Thạch Nhân chỉ bị phá vỡ khi sắp xếp các từ ngữ theo đúng trật tự cú pháp!"
        },
        {
                "encounterId": "g11-u01_enc_construct",
                "enemyId": "construct",
                "name": "Dược Thạch Khôi Lỗi",
                "title": "Tà Binh Tuần Tra",
                "concept": "nonhuman golem assembled from the unit's material motifs; motifs: spoiled herbs, fever miasma and corrupted apothecary tools",
                "spritePath": "/assets/game/units/grade-11/unit-01/enemies/construct.png",
                "x": 2850,
                "y": 1300,
                "patrolRange": {
                        "minX": 2770,
                        "maxX": 2930
                },
                "hp": 175,
                "maxHp": 175,
                "attack": 23,
                "defense": 10,
                "xpReward": 118,
                "combatMode": "deception_pierce",
                "learningSkill": "Thiên Diện Phá Ảo (Đọc Hiểu & Định Vị Câu Dẫn Chứng)",
                "difficulty": "medium",
                "requiredQuestionsCount": 1,
                "winCondition": "Chọn đáp án đúng VÀ định vị đúng câu dẫn chứng [1]-[4]",
                "tutorialBriefing": "Thiên Diện Phá Ảo: Ảo ảnh che mắt! Đọc kỹ đoạn văn bản, chọn đáp án đúng và bấm chọn đúng CÂU DẪN CHỨNG [1]-[4]!"
        },
        {
                "encounterId": "g11-u01_enc_spirit",
                "enemyId": "spirit",
                "name": "Tật Bệnh U Hồn",
                "title": "Tà Binh Tuần Tra",
                "concept": "eerie floating nonhuman spirit formed from the unit's motifs; motifs: spoiled herbs, fever miasma and corrupted apothecary tools",
                "spritePath": "/assets/game/units/grade-11/unit-01/enemies/spirit.png",
                "x": 1750,
                "y": 1380,
                "patrolRange": {
                        "minX": 1670,
                        "maxX": 1830
                },
                "hp": 190,
                "maxHp": 190,
                "attack": 25,
                "defense": 11,
                "xpReward": 128,
                "combatMode": "escort_dialogue",
                "learningSkill": "Hộ Tống Hội Thoại (Giao Tiếp Tình Huống & Phản Hồi Chiến Thuật)",
                "difficulty": "medium",
                "requiredQuestionsCount": 1,
                "winCondition": "Lựa chọn câu đối đáp thấu tình đạt lý, kích hoạt khiên hộ thể",
                "tutorialBriefing": "Hộ Tống Hội Thoại: Đối thủ dùng lời kích động tâm trí! Chọn phương án đối đáp chuẩn mực để kích hoạt khiên bảo hộ!"
        },
        {
                "encounterId": "g11-u01_enc_elite",
                "enemyId": "elite",
                "name": "Trụy Lạc Y Sư",
                "title": "Hộ Vệ Tinh Anh",
                "concept": "elite commander with ornate armor and distinctive polearm; motifs: spoiled herbs, fever miasma and corrupted apothecary tools",
                "spritePath": "/assets/game/units/grade-11/unit-01/enemies/elite.png",
                "x": 2250,
                "y": 1450,
                "patrolRange": {
                        "minX": 2170,
                        "maxX": 2330
                },
                "hp": 235,
                "maxHp": 235,
                "attack": 26,
                "defense": 11,
                "xpReward": 195,
                "combatMode": "triple_combo",
                "learningSkill": "Liên Hoàn Tam Chiêu (Tổng Hợp Nghe - Hiểu - Xuất Chiêu)",
                "difficulty": "hard",
                "requiredQuestionsCount": 1,
                "winCondition": "Hoàn thành chuỗi 3 chiêu thức: Thính âm -> Luận giải -> Xuất chiêu phá trận",
                "tutorialBriefing": "Liên Hoàn Tam Chiêu: Hộ vệ tinh anh sở hữu kiếm pháp liên hoàn! Hoàn thành liên tiếp 3 chiêu thức để trảm địch!"
        },
        {
                "encounterId": "g11-u01_enc_fever_miasma",
                "enemyId": "fever_miasma",
                "name": "Sốt Nhiệt Chướng Khí",
                "title": "Hộ Vệ Tinh Anh",
                "concept": "a translucent fever miasma creature rising from spoiled medicinal herbs, with glowing ember eyes and drifting leaf shapes",
                "spritePath": "/assets/game/units/grade-11/unit-01/enemies/fever_miasma.png",
                "x": 1350,
                "y": 1450,
                "patrolRange": {
                        "minX": 1270,
                        "maxX": 1430
                },
                "hp": 235,
                "maxHp": 235,
                "attack": 26,
                "defense": 11,
                "xpReward": 195,
                "combatMode": "deception_pierce",
                "learningSkill": "Thiên Diện Phá Ảo (Đọc Hiểu & Phá Bẫy Ngụy Tạo)",
                "difficulty": "hard",
                "requiredQuestionsCount": 1,
                "winCondition": "Giải mã bản văn tịch cổ và chỉ ra câu bằng chứng",
                "tutorialBriefing": "Thiên Diện Phá Ảo: Chướng khí biến ảo khôn lường! Đọc văn tịch và xác định đúng câu dẫn chứng để trừ tà!"
        }
      ],
    "climax": {
      "hasRealBoss": false,
      "encounterId": "g11-u01_climax_1",
      "enemy": {
          "id": "climax_g11-u01",
        "name": "Thủ Trận Tinh Anh - A LONG AND HEALTHY LIFE",
        "title": "Trấn Thủ Trận Đỉnh Điểm",
        "spriteKey": "/assets/game/units/grade-11/unit-01/enemies/fever_miasma.png",
        "hp": 300,
        "maxHp": 300,
        "attack": 28,
        "defense": 13,
        "xpReward": 345,
        "isBoss": false,
        "bossPhase": 1,
        "dialogueIntro": "“Ta là Thủ Trận Tinh Anh trấn giữ thạch trận đỉnh điểm của A LONG AND HEALTHY LIFE. Hãy dốc toàn lực chiến thắng để chứng minh sự tinh thông!”",
        "dialoguePhase2": "“Ngươi quả thực có thực lực! Đỡ chiêu biến hóa cuối cùng này!”",
        "combatMode": "triple_combo",
        "learningSkill": "Quyết Chiến Thủ Trận Tinh Anh (Thạch Trận Đỉnh Điểm)",
        "difficulty": "hard",
        "requiredQuestionsCount": 1,
        "winCondition": "Đánh bại Thủ Trận Tinh Anh để giải phóng toàn bộ Unit",
        "tutorialBriefing": "Phong Ấn Trận Đỉnh Điểm: Hoàn thành Liên Hoàn Tam Chiêu để phá tan kết giới, hoàn thành Unit và mở ra cảnh giới mới!"
        },
      "x": 1600,
      "y": 1720,
      "barrierPrompt": "🔒 Phong Ấn Trận Đỉnh Điểm (Cần >= 70% tiến độ)",
      "unlockedPrompt": "⚡ Phong Ấn Đỉnh Điểm ĐÃ MỞ! Thách đấu Thủ Trận Tinh Anh!"
    }
  },
  "g11-u02": {
    "unitId": "g11-u02",
    "grade": 11,
    "unitNumber": 2,
    "title": "THE GENERATION GAP",
    "topic": "Generational Differences and Family Communication",
    "mapWidth": 3200,
    "mapHeight": 2000,
    "ground": {
      "primaryPath": "/assets/game/units/grade-11/unit-02/ground/main_ground.png",
      "secondaryPath": "/assets/game/units/grade-11/unit-02/ground/family_wood_floor.png",
      "tileable": false
    },
    "npcs": [
      {
        "id": "bang_chu",
        "name": "Hồng y tông chủ Hà Ánh Phượng",
        "title": "Lãnh Tụ Võ Lâm Chính Phái",
        "elementColor": "#fbe285",
        "spriteKey": "bang_chu_ha_anh_phuong",
        "portraitPath": "/assets/game/characters/npc/portraits/bang_chu_ha_anh_phuong.png",
        "x": 550,
        "y": 560,
        "prompt": "[E] Bái kiến Hồng y tông chủ Hà Ánh Phượng",
        "dialogueIntro": "Chào mừng thiếu hiệp! Hôm nay chúng ta cùng khám phá Unit 2: THE GENERATION GAP (Generational Differences and Family Communication). Hãy rèn luyện võ học, giải trừ ma chướng!"
      },
      {
        "id": "bach_khoa_thu_sinh",
        "name": "Bách Khoa thư Sinh Đinh Ngọc Khánh",
        "title": "Đại Sư Huynh Tông Môn",
        "elementColor": "#c084fc",
        "spriteKey": "bach_khoa_thu_sinh",
        "portraitPath": "/assets/game/characters/npc/portraits/bach_khoa_thu_sinh_v2.png",
        "x": 740,
        "y": 480,
        "prompt": "[E] Thỉnh Giáo Bách Khoa thư Sinh Đinh Ngọc Khánh",
        "dialogueIntro": "Chào sư đệ/sư muội! Đại học không nhàn như giang hồ đồn đâu các đệ... Nhưng qua được ải THPT này, thiên hạ sẽ mở rộng trước mắt! Có gì vướng mắc về bẫy thi cử hay kỹ năng thực chiến, cứ hỏi ta!"
      },
      {
        "id": "ho_phap_phuong_tu",
        "name": "Hộ Pháp Phương Tú",
        "title": "Hộ Pháp Từ Vựng & Trưởng Thành",
        "elementColor": "#59caa0",
        "spriteKey": "ho_phap_phuong_tu",
        "portraitPath": "/assets/game/characters/npc/portraits/ho_phap_phuong_tu.png",
        "x": 920,
        "y": 560,
        "prompt": "[E] Tham Vấn Hộ Pháp Phương Tú",
        "dialogueIntro": "Tàng Kinh Các lưu giữ toàn bộ bí điển từ vựng của THE GENERATION GAP. Hãy lĩnh hội từng câu chữ để tích lũy công lực căn bản!"
      },
      {
        "id": "ho_phap_dang_tran_ha",
        "name": "Hộ Pháp Đặng Trần Hà",
        "title": "Hộ Pháp Ngữ Pháp & Thách Đấu",
        "elementColor": "#60a5fa",
        "spriteKey": "ho_phap_dang_tran_ha",
        "portraitPath": "/assets/game/characters/npc/portraits/ho_phap_dang_tran_ha.png",
        "x": 1850,
        "y": 560,
        "prompt": "[E] Bái Kiến Hộ Pháp Đặng Trần Hà",
        "dialogueIntro": "Ngữ pháp là xương sống của kiếm chiêu! Muốn phá phong ấn thạch trận của THE GENERATION GAP, tâm ý phải chuẩn xác, cú pháp không được sai lệch một ly!"
      },
      {
        "id": "ho_phap_hoang_van",
        "name": "Hộ Pháp Hoàng Vân",
        "title": "Hộ Pháp Nghe & Nhịp Điệu",
        "elementColor": "#fbbf24",
        "spriteKey": "ho_phap_hoang_van",
        "portraitPath": "/assets/game/characters/npc/portraits/ho_phap_hoang_van.png",
        "x": 2400,
        "y": 760,
        "prompt": "[E] Thỉnh Giáo Hộ Pháp Hoàng Vân",
        "dialogueIntro": "Lắng nghe âm điệu tự nhiên, nghe rõ từng ngữ âm để thấu suốt chiêu thức địch nhân. Hãy vào Võ Luyện Đài luyện tập cùng ta!"
      },
      {
        "id": "ho_phap_nguyet_nguyen",
        "name": "Hộ Pháp Nguyệt Nguyên",
        "title": "Hộ Pháp Đọc Hiểu & Minh Triết",
        "elementColor": "#38bdf8",
        "spriteKey": "ho_phap_nguyet_nguyen",
        "portraitPath": "/assets/game/characters/npc/portraits/ho_phap_nguyet_nguyen.png",
        "x": 660,
        "y": 1260,
        "prompt": "[E] Luận Đạo Hộ Pháp Nguyệt Nguyên",
        "dialogueIntro": "Minh Triết Các soi rọi chân lý. Khi đối mặt với thuật ngụy tạo và mê trận thông tin của THE GENERATION GAP, hãy tìm đúng câu bằng chứng để phá tan ảo ảnh!"
      }
    ],
    "props": [
        {
                "id": "g11-u02_theme_prop",
                "name": "ancestral tea table",
                "path": "/assets/game/units/grade-11/unit-02/props/theme_prop.png",
                "x": 1380,
                "y": 580,
                "size": [
                        160,
                        160
                ],
                "category": "vocab_discovery"
        },
        {
                "id": "g11-u02_ancestor_lantern",
                "name": "small ancestral brass oil lantern, no symbols or writing",
                "path": "/assets/game/units/grade-11/unit-02/props/ancestor_lantern.png",
                "x": 860,
                "y": 1300,
                "size": [
                        160,
                        160
                ],
                "category": "dialogue"
        }
      ],
    "enemies": [
        {
                "encounterId": "g11-u02_enc_scout",
                "enemyId": "scout",
                "name": "Tranh Chấp Thám Đồ",
                "title": "Tà Binh Tuần Tra",
                "concept": "swift human scout with a short blade and light Vietnamese clothing; motifs: shattered heirlooms, misunderstanding mist and echo masks",
                "spritePath": "/assets/game/units/grade-11/unit-02/enemies/scout.png",
                "x": 1450,
                "y": 1050,
                "patrolRange": {
                        "minX": 1380,
                        "maxX": 1540
                },
                "hp": 140,
                "maxHp": 140,
                "attack": 18,
                "defense": 8,
                "xpReward": 96,
                "combatMode": "lost_word",
                "learningSkill": "Đoạt Lại Vong Từ (Từ Vựng & Cụm Từ Cốt Lõi)",
                "difficulty": "easy",
                "requiredQuestionsCount": 1,
                "winCondition": "Điền chính xác từ khuyết thiếu để đoạt lại vong từ",
                "tutorialBriefing": "Đoạt Lại Vong Từ: Kẻ địch che giấu một từ vựng trọng tâm. Dùng manh mối gợi ý và kiến thức để điền chính xác!"
        },
        {
                "encounterId": "g11-u02_enc_ranged",
                "enemyId": "ranged",
                "name": "Tùy Tiện Cung Nhân",
                "title": "Tà Binh Tuần Tra",
                "concept": "human ranged attacker with a bamboo bow or sling; motifs: shattered heirlooms, misunderstanding mist and echo masks",
                "spritePath": "/assets/game/units/grade-11/unit-02/enemies/ranged.png",
                "x": 1950,
                "y": 1050,
                "patrolRange": {
                        "minX": 1870,
                        "maxX": 2030
                },
                "hp": 155,
                "maxHp": 155,
                "attack": 20,
                "defense": 9,
                "xpReward": 106,
                "combatMode": "listening_pursuit",
                "learningSkill": "Mê Âm Truy Kích (Luyện Nghe & Nhận Diện Ngữ Âm)",
                "difficulty": "easy",
                "requiredQuestionsCount": 1,
                "winCondition": "Lắng nghe thông điệp âm thanh và nhận diện chính xác yếu nghĩa",
                "tutorialBriefing": "Mê Âm Truy Kích: Kẻ địch truyền âm huyễn hoặc! Bấm nút Nghe để phát âm thanh khẩu quyết và giải mã ý nghĩa!"
        },
        {
                "encounterId": "g11-u02_enc_brute",
                "enemyId": "brute",
                "name": "Cố Chấp Trưởng Lão",
                "title": "Tà Binh Tuần Tra",
                "concept": "large armored bruiser with a heavy club; motifs: shattered heirlooms, misunderstanding mist and echo masks",
                "spritePath": "/assets/game/units/grade-11/unit-02/enemies/brute.png",
                "x": 2450,
                "y": 1150,
                "patrolRange": {
                        "minX": 2370,
                        "maxX": 2530
                },
                "hp": 170,
                "maxHp": 170,
                "attack": 22,
                "defense": 10,
                "xpReward": 116,
                "combatMode": "unseal",
                "learningSkill": "Phá Phong Ấn (Cấu Trúc Cú Pháp & Trật Tự Câu)",
                "difficulty": "medium",
                "requiredQuestionsCount": 1,
                "winCondition": "Sắp xếp các phiến đá từ ngữ thành câu đúng ngữ pháp",
                "tutorialBriefing": "Phá Phong Ấn: Giáp hộ thân của Thạch Nhân chỉ bị phá vỡ khi sắp xếp các từ ngữ theo đúng trật tự cú pháp!"
        },
        {
                "encounterId": "g11-u02_enc_construct",
                "enemyId": "construct",
                "name": "Gia Quy Thiết Nhân",
                "title": "Tà Binh Tuần Tra",
                "concept": "nonhuman golem assembled from the unit's material motifs; motifs: shattered heirlooms, misunderstanding mist and echo masks",
                "spritePath": "/assets/game/units/grade-11/unit-02/enemies/construct.png",
                "x": 2850,
                "y": 1300,
                "patrolRange": {
                        "minX": 2770,
                        "maxX": 2930
                },
                "hp": 185,
                "maxHp": 185,
                "attack": 24,
                "defense": 11,
                "xpReward": 126,
                "combatMode": "deception_pierce",
                "learningSkill": "Thiên Diện Phá Ảo (Đọc Hiểu & Định Vị Câu Dẫn Chứng)",
                "difficulty": "medium",
                "requiredQuestionsCount": 1,
                "winCondition": "Chọn đáp án đúng VÀ định vị đúng câu dẫn chứng [1]-[4]",
                "tutorialBriefing": "Thiên Diện Phá Ảo: Ảo ảnh che mắt! Đọc kỹ đoạn văn bản, chọn đáp án đúng và bấm chọn đúng CÂU DẪN CHỨNG [1]-[4]!"
        },
        {
                "encounterId": "g11-u02_enc_spirit",
                "enemyId": "spirit",
                "name": "Đoạn Tuyệt Linh Hồn",
                "title": "Tà Binh Tuần Tra",
                "concept": "eerie floating nonhuman spirit formed from the unit's motifs; motifs: shattered heirlooms, misunderstanding mist and echo masks",
                "spritePath": "/assets/game/units/grade-11/unit-02/enemies/spirit.png",
                "x": 1750,
                "y": 1380,
                "patrolRange": {
                        "minX": 1670,
                        "maxX": 1830
                },
                "hp": 200,
                "maxHp": 200,
                "attack": 26,
                "defense": 12,
                "xpReward": 136,
                "combatMode": "escort_dialogue",
                "learningSkill": "Hộ Tống Hội Thoại (Giao Tiếp Tình Huống & Phản Hồi Chiến Thuật)",
                "difficulty": "medium",
                "requiredQuestionsCount": 1,
                "winCondition": "Lựa chọn câu đối đáp thấu tình đạt lý, kích hoạt khiên hộ thể",
                "tutorialBriefing": "Hộ Tống Hội Thoại: Đối thủ dùng lời kích động tâm trí! Chọn phương án đối đáp chuẩn mực để kích hoạt khiên bảo hộ!"
        },
        {
                "encounterId": "g11-u02_enc_elite",
                "enemyId": "elite",
                "name": "Bất Hòa Trưởng Môn",
                "title": "Hộ Vệ Tinh Anh",
                "concept": "elite commander with ornate armor and distinctive polearm; motifs: shattered heirlooms, misunderstanding mist and echo masks",
                "spritePath": "/assets/game/units/grade-11/unit-02/enemies/elite.png",
                "x": 2250,
                "y": 1450,
                "patrolRange": {
                        "minX": 2170,
                        "maxX": 2330
                },
                "hp": 250,
                "maxHp": 250,
                "attack": 28,
                "defense": 12,
                "xpReward": 210,
                "combatMode": "triple_combo",
                "learningSkill": "Liên Hoàn Tam Chiêu (Tổng Hợp Nghe - Hiểu - Xuất Chiêu)",
                "difficulty": "hard",
                "requiredQuestionsCount": 1,
                "winCondition": "Hoàn thành chuỗi 3 chiêu thức: Thính âm -> Luận giải -> Xuất chiêu phá trận",
                "tutorialBriefing": "Liên Hoàn Tam Chiêu: Hộ vệ tinh anh sở hữu kiếm pháp liên hoàn! Hoàn thành liên tiếp 3 chiêu thức để trảm địch!"
        },
        {
                "encounterId": "g11-u02_enc_heirloom_mimic",
                "enemyId": "heirloom_mimic",
                "name": "Gia Bảo Huyễn Quái",
                "title": "Hộ Vệ Tinh Anh",
                "concept": "a cracked blue-and-white Vietnamese heirloom ceramic vessel awakened as a cunning mimic with short clay limbs",
                "spritePath": "/assets/game/units/grade-11/unit-02/enemies/heirloom_mimic.png",
                "x": 1350,
                "y": 1450,
                "patrolRange": {
                        "minX": 1270,
                        "maxX": 1430
                },
                "hp": 250,
                "maxHp": 250,
                "attack": 28,
                "defense": 12,
                "xpReward": 210,
                "combatMode": "deception_pierce",
                "learningSkill": "Thiên Diện Phá Ảo (Đọc Hiểu & Phá Bẫy Ngụy Tạo)",
                "difficulty": "hard",
                "requiredQuestionsCount": 1,
                "winCondition": "Giải mã bản văn tịch cổ và chỉ ra câu bằng chứng",
                "tutorialBriefing": "Thiên Diện Phá Ảo: Chướng khí biến ảo khôn lường! Đọc văn tịch và xác định đúng câu dẫn chứng để trừ tà!"
        }
      ],
    "climax": {
      "hasRealBoss": false,
      "encounterId": "g11-u02_climax_2",
      "enemy": {
          "id": "climax_g11-u02",
        "name": "Thủ Trận Tinh Anh - THE GENERATION GAP",
        "title": "Trấn Thủ Trận Đỉnh Điểm",
        "spriteKey": "/assets/game/units/grade-11/unit-02/enemies/heirloom_mimic.png",
        "hp": 320,
        "maxHp": 320,
        "attack": 30,
        "defense": 14,
        "xpReward": 370,
        "isBoss": false,
        "bossPhase": 1,
        "dialogueIntro": "“Ta là Thủ Trận Tinh Anh trấn giữ thạch trận đỉnh điểm của THE GENERATION GAP. Hãy dốc toàn lực chiến thắng để chứng minh sự tinh thông!”",
        "dialoguePhase2": "“Ngươi quả thực có thực lực! Đỡ chiêu biến hóa cuối cùng này!”",
        "combatMode": "triple_combo",
        "learningSkill": "Quyết Chiến Thủ Trận Tinh Anh (Thạch Trận Đỉnh Điểm)",
        "difficulty": "hard",
        "requiredQuestionsCount": 1,
        "winCondition": "Đánh bại Thủ Trận Tinh Anh để giải phóng toàn bộ Unit",
        "tutorialBriefing": "Phong Ấn Trận Đỉnh Điểm: Hoàn thành Liên Hoàn Tam Chiêu để phá tan kết giới, hoàn thành Unit và mở ra cảnh giới mới!"
        },
      "x": 1600,
      "y": 1720,
      "barrierPrompt": "🔒 Phong Ấn Trận Đỉnh Điểm (Cần >= 70% tiến độ)",
      "unlockedPrompt": "⚡ Phong Ấn Đỉnh Điểm ĐÃ MỞ! Thách đấu Thủ Trận Tinh Anh!"
    }
  },
  "g11-u03": {
    "unitId": "g11-u03",
    "grade": 11,
    "unitNumber": 3,
    "title": "CITIES OF THE FUTURE",
    "topic": "Smart Cities, Sustainable Urban Life and Green Infrastructure",
    "mapWidth": 3200,
    "mapHeight": 2000,
    "ground": {
      "primaryPath": "/assets/game/units/grade-11/unit-03/ground/main_ground.png",
      "secondaryPath": "/assets/game/units/grade-11/unit-03/ground/eco_transit_paving.png",
      "tileable": false
    },
    "npcs": [
      {
        "id": "bang_chu",
        "name": "Hồng y tông chủ Hà Ánh Phượng",
        "title": "Lãnh Tụ Võ Lâm Chính Phái",
        "elementColor": "#fbe285",
        "spriteKey": "bang_chu_ha_anh_phuong",
        "portraitPath": "/assets/game/characters/npc/portraits/bang_chu_ha_anh_phuong.png",
        "x": 550,
        "y": 560,
        "prompt": "[E] Bái kiến Hồng y tông chủ Hà Ánh Phượng",
        "dialogueIntro": "Chào mừng thiếu hiệp! Hôm nay chúng ta cùng khám phá Unit 3: CITIES OF THE FUTURE (Smart Cities, Sustainable Urban Life and Green Infrastructure). Hãy rèn luyện võ học, giải trừ ma chướng!"
      },
      {
        "id": "bach_khoa_thu_sinh",
        "name": "Bách Khoa thư Sinh Đinh Ngọc Khánh",
        "title": "Đại Sư Huynh Tông Môn",
        "elementColor": "#c084fc",
        "spriteKey": "bach_khoa_thu_sinh",
        "portraitPath": "/assets/game/characters/npc/portraits/bach_khoa_thu_sinh_v2.png",
        "x": 740,
        "y": 480,
        "prompt": "[E] Thỉnh Giáo Bách Khoa thư Sinh Đinh Ngọc Khánh",
        "dialogueIntro": "Chào sư đệ/sư muội! Đại học không nhàn như giang hồ đồn đâu các đệ... Nhưng qua được ải THPT này, thiên hạ sẽ mở rộng trước mắt! Có gì vướng mắc về bẫy thi cử hay kỹ năng thực chiến, cứ hỏi ta!"
      },
      {
        "id": "ho_phap_phuong_tu",
        "name": "Hộ Pháp Phương Tú",
        "title": "Hộ Pháp Từ Vựng & Trưởng Thành",
        "elementColor": "#59caa0",
        "spriteKey": "ho_phap_phuong_tu",
        "portraitPath": "/assets/game/characters/npc/portraits/ho_phap_phuong_tu.png",
        "x": 920,
        "y": 560,
        "prompt": "[E] Tham Vấn Hộ Pháp Phương Tú",
        "dialogueIntro": "Tàng Kinh Các lưu giữ toàn bộ bí điển từ vựng của CITIES OF THE FUTURE. Hãy lĩnh hội từng câu chữ để tích lũy công lực căn bản!"
      },
      {
        "id": "ho_phap_dang_tran_ha",
        "name": "Hộ Pháp Đặng Trần Hà",
        "title": "Hộ Pháp Ngữ Pháp & Thách Đấu",
        "elementColor": "#60a5fa",
        "spriteKey": "ho_phap_dang_tran_ha",
        "portraitPath": "/assets/game/characters/npc/portraits/ho_phap_dang_tran_ha.png",
        "x": 1850,
        "y": 560,
        "prompt": "[E] Bái Kiến Hộ Pháp Đặng Trần Hà",
        "dialogueIntro": "Ngữ pháp là xương sống của kiếm chiêu! Muốn phá phong ấn thạch trận của CITIES OF THE FUTURE, tâm ý phải chuẩn xác, cú pháp không được sai lệch một ly!"
      },
      {
        "id": "ho_phap_hoang_van",
        "name": "Hộ Pháp Hoàng Vân",
        "title": "Hộ Pháp Nghe & Nhịp Điệu",
        "elementColor": "#fbbf24",
        "spriteKey": "ho_phap_hoang_van",
        "portraitPath": "/assets/game/characters/npc/portraits/ho_phap_hoang_van.png",
        "x": 2400,
        "y": 760,
        "prompt": "[E] Thỉnh Giáo Hộ Pháp Hoàng Vân",
        "dialogueIntro": "Lắng nghe âm điệu tự nhiên, nghe rõ từng ngữ âm để thấu suốt chiêu thức địch nhân. Hãy vào Võ Luyện Đài luyện tập cùng ta!"
      },
      {
        "id": "ho_phap_nguyet_nguyen",
        "name": "Hộ Pháp Nguyệt Nguyên",
        "title": "Hộ Pháp Đọc Hiểu & Minh Triết",
        "elementColor": "#38bdf8",
        "spriteKey": "ho_phap_nguyet_nguyen",
        "portraitPath": "/assets/game/characters/npc/portraits/ho_phap_nguyet_nguyen.png",
        "x": 660,
        "y": 1260,
        "prompt": "[E] Luận Đạo Hộ Pháp Nguyệt Nguyên",
        "dialogueIntro": "Minh Triết Các soi rọi chân lý. Khi đối mặt với thuật ngụy tạo và mê trận thông tin của CITIES OF THE FUTURE, hãy tìm đúng câu bằng chứng để phá tan ảo ảnh!"
      }
    ],
    "props": [
        {
                "id": "g11-u03_theme_prop",
                "name": "solar lantern tower",
                "path": "/assets/game/units/grade-11/unit-03/props/theme_prop.png",
                "x": 1380,
                "y": 580,
                "size": [
                        160,
                        160
                ],
                "category": "vocab_discovery"
        },
        {
                "id": "g11-u03_transit_marker",
                "name": "small bamboo-bronze transit wayfinding sculpture without text",
                "path": "/assets/game/units/grade-11/unit-03/props/transit_marker.png",
                "x": 860,
                "y": 1300,
                "size": [
                        160,
                        160
                ],
                "category": "reading_clue"
        }
      ],
    "enemies": [
        {
                "encounterId": "g11-u03_enc_scout",
                "enemyId": "scout",
                "name": "Tuần Thành Cơ Quan",
                "title": "Tà Binh Tuần Tra",
                "concept": "swift human scout with a short blade and light Vietnamese clothing; motifs: runaway transit devices, smog drones and corrupted civic machinery",
                "spritePath": "/assets/game/units/grade-11/unit-03/enemies/scout.png",
                "x": 1450,
                "y": 1050,
                "patrolRange": {
                        "minX": 1380,
                        "maxX": 1540
                },
                "hp": 150,
                "maxHp": 150,
                "attack": 19,
                "defense": 9,
                "xpReward": 104,
                "combatMode": "lost_word",
                "learningSkill": "Đoạt Lại Vong Từ (Từ Vựng & Cụm Từ Cốt Lõi)",
                "difficulty": "easy",
                "requiredQuestionsCount": 1,
                "winCondition": "Điền chính xác từ khuyết thiếu để đoạt lại vong từ",
                "tutorialBriefing": "Đoạt Lại Vong Từ: Kẻ địch che giấu một từ vựng trọng tâm. Dùng manh mối gợi ý và kiến thức để điền chính xác!"
        },
        {
                "encounterId": "g11-u03_enc_ranged",
                "enemyId": "ranged",
                "name": "Lôi Điện Xạ Thủ",
                "title": "Tà Binh Tuần Tra",
                "concept": "human ranged attacker with a bamboo bow or sling; motifs: runaway transit devices, smog drones and corrupted civic machinery",
                "spritePath": "/assets/game/units/grade-11/unit-03/enemies/ranged.png",
                "x": 1950,
                "y": 1050,
                "patrolRange": {
                        "minX": 1870,
                        "maxX": 2030
                },
                "hp": 165,
                "maxHp": 165,
                "attack": 21,
                "defense": 10,
                "xpReward": 114,
                "combatMode": "listening_pursuit",
                "learningSkill": "Mê Âm Truy Kích (Luyện Nghe & Nhận Diện Ngữ Âm)",
                "difficulty": "easy",
                "requiredQuestionsCount": 1,
                "winCondition": "Lắng nghe thông điệp âm thanh và nhận diện chính xác yếu nghĩa",
                "tutorialBriefing": "Mê Âm Truy Kích: Kẻ địch truyền âm huyễn hoặc! Bấm nút Nghe để phát âm thanh khẩu quyết và giải mã ý nghĩa!"
        },
        {
                "encounterId": "g11-u03_enc_brute",
                "enemyId": "brute",
                "name": "Cơ Giới Cự Nhân",
                "title": "Tà Binh Tuần Tra",
                "concept": "large armored bruiser with a heavy club; motifs: runaway transit devices, smog drones and corrupted civic machinery",
                "spritePath": "/assets/game/units/grade-11/unit-03/enemies/brute.png",
                "x": 2450,
                "y": 1150,
                "patrolRange": {
                        "minX": 2370,
                        "maxX": 2530
                },
                "hp": 180,
                "maxHp": 180,
                "attack": 23,
                "defense": 11,
                "xpReward": 124,
                "combatMode": "unseal",
                "learningSkill": "Phá Phong Ấn (Cấu Trúc Cú Pháp & Trật Tự Câu)",
                "difficulty": "medium",
                "requiredQuestionsCount": 1,
                "winCondition": "Sắp xếp các phiến đá từ ngữ thành câu đúng ngữ pháp",
                "tutorialBriefing": "Phá Phong Ấn: Giáp hộ thân của Thạch Nhân chỉ bị phá vỡ khi sắp xếp các từ ngữ theo đúng trật tự cú pháp!"
        },
        {
                "encounterId": "g11-u03_enc_construct",
                "enemyId": "construct",
                "name": "Đô Thị Cơ Quan Nhân",
                "title": "Tà Binh Tuần Tra",
                "concept": "nonhuman golem assembled from the unit's material motifs; motifs: runaway transit devices, smog drones and corrupted civic machinery",
                "spritePath": "/assets/game/units/grade-11/unit-03/enemies/construct.png",
                "x": 2850,
                "y": 1300,
                "patrolRange": {
                        "minX": 2770,
                        "maxX": 2930
                },
                "hp": 195,
                "maxHp": 195,
                "attack": 25,
                "defense": 12,
                "xpReward": 134,
                "combatMode": "deception_pierce",
                "learningSkill": "Thiên Diện Phá Ảo (Đọc Hiểu & Định Vị Câu Dẫn Chứng)",
                "difficulty": "medium",
                "requiredQuestionsCount": 1,
                "winCondition": "Chọn đáp án đúng VÀ định vị đúng câu dẫn chứng [1]-[4]",
                "tutorialBriefing": "Thiên Diện Phá Ảo: Ảo ảnh che mắt! Đọc kỹ đoạn văn bản, chọn đáp án đúng và bấm chọn đúng CÂU DẪN CHỨNG [1]-[4]!"
        },
        {
                "encounterId": "g11-u03_enc_spirit",
                "enemyId": "spirit",
                "name": "Năng Lượng Oán Linh",
                "title": "Tà Binh Tuần Tra",
                "concept": "eerie floating nonhuman spirit formed from the unit's motifs; motifs: runaway transit devices, smog drones and corrupted civic machinery",
                "spritePath": "/assets/game/units/grade-11/unit-03/enemies/spirit.png",
                "x": 1750,
                "y": 1380,
                "patrolRange": {
                        "minX": 1670,
                        "maxX": 1830
                },
                "hp": 210,
                "maxHp": 210,
                "attack": 27,
                "defense": 13,
                "xpReward": 144,
                "combatMode": "escort_dialogue",
                "learningSkill": "Hộ Tống Hội Thoại (Giao Tiếp Tình Huống & Phản Hồi Chiến Thuật)",
                "difficulty": "medium",
                "requiredQuestionsCount": 1,
                "winCondition": "Lựa chọn câu đối đáp thấu tình đạt lý, kích hoạt khiên hộ thể",
                "tutorialBriefing": "Hộ Tống Hội Thoại: Đối thủ dùng lời kích động tâm trí! Chọn phương án đối đáp chuẩn mực để kích hoạt khiên bảo hộ!"
        },
        {
                "encounterId": "g11-u03_enc_elite",
                "enemyId": "elite",
                "name": "Trí Năng Hộ Vệ",
                "title": "Hộ Vệ Tinh Anh",
                "concept": "elite commander with ornate armor and distinctive polearm; motifs: runaway transit devices, smog drones and corrupted civic machinery",
                "spritePath": "/assets/game/units/grade-11/unit-03/enemies/elite.png",
                "x": 2250,
                "y": 1450,
                "patrolRange": {
                        "minX": 2170,
                        "maxX": 2330
                },
                "hp": 265,
                "maxHp": 265,
                "attack": 30,
                "defense": 13,
                "xpReward": 225,
                "combatMode": "triple_combo",
                "learningSkill": "Liên Hoàn Tam Chiêu (Tổng Hợp Nghe - Hiểu - Xuất Chiêu)",
                "difficulty": "hard",
                "requiredQuestionsCount": 1,
                "winCondition": "Hoàn thành chuỗi 3 chiêu thức: Thính âm -> Luận giải -> Xuất chiêu phá trận",
                "tutorialBriefing": "Liên Hoàn Tam Chiêu: Hộ vệ tinh anh sở hữu kiếm pháp liên hoàn! Hoàn thành liên tiếp 3 chiêu thức để trảm địch!"
        },
        {
                "encounterId": "g11-u03_enc_transit_drone",
                "enemyId": "transit_drone",
                "name": "Lưu Động Cơ Quan",
                "title": "Hộ Vệ Tinh Anh",
                "concept": "a rogue bamboo-and-bronze elevated transit guardian automaton with spinning ring wheels and jade energy",
                "spritePath": "/assets/game/units/grade-11/unit-03/enemies/transit_drone.png",
                "x": 1350,
                "y": 1450,
                "patrolRange": {
                        "minX": 1270,
                        "maxX": 1430
                },
                "hp": 265,
                "maxHp": 265,
                "attack": 30,
                "defense": 13,
                "xpReward": 225,
                "combatMode": "deception_pierce",
                "learningSkill": "Thiên Diện Phá Ảo (Đọc Hiểu & Phá Bẫy Ngụy Tạo)",
                "difficulty": "hard",
                "requiredQuestionsCount": 1,
                "winCondition": "Giải mã bản văn tịch cổ và chỉ ra câu bằng chứng",
                "tutorialBriefing": "Thiên Diện Phá Ảo: Chướng khí biến ảo khôn lường! Đọc văn tịch và xác định đúng câu dẫn chứng để trừ tà!"
        }
      ],
    "climax": {
      "hasRealBoss": true,
      "encounterId": "g11-u03_boss_3",
      "enemy": {
          "id": "boss_g11-u03",
        "name": "Hư Không Cơ Giới Thần",
        "title": "Cơ Quan Trấn Thủ Đô Thị Tương Lai",
        "spriteKey": "/assets/game/units/grade-11/unit-03/bosses/hollow_city_engine.png",
        "hp": 415,
        "maxHp": 415,
        "attack": 41,
        "defense": 20,
        "xpReward": 570,
        "isBoss": true,
        "bossPhase": 1,
        "dialogueIntro": "“Khá khen tiểu bối dám bước vào Cấm Địa CITIES OF THE FUTURE! Hãy nếm thử kiếm khí của Hư Không Cơ Giới Thần!”",
        "dialoguePhase2": "“Cuồng Nộ Huyết Ma kích hoạt! Tuyệt kỹ CITIES OF THE FUTURE sẽ biến ngươi thành tro bụi!”",
        "combatMode": "triple_combo",
        "learningSkill": "Quyết Chiến Đại Ma Đầu (2 Phase Liên Hoàn Tam Chiêu)",
        "difficulty": "hard",
        "requiredQuestionsCount": 1,
        "winCondition": "Đánh bại Ma Đầu qua 2 Phase sinh tử",
        "tutorialBriefing": "Quyết Chiến Boss: Đại Ma Đầu sở hữu 2 Phase cuồng nộ! Hãy hoàn thành Liên Hoàn Tam Chiêu và vượt qua tốc độ xuất chiêu bão táp!"
        },
      "x": 1600,
      "y": 1720,
      "barrierPrompt": "🔒 Ma Khí Cấm Địa (Cần >= 70% tiến độ)",
      "unlockedPrompt": "⚡ Cổng Ma Giáo Cấm Địa ĐÃ MỞ! Quyết chiến Hư Không Cơ Giới Thần!"
    }
  },
  "g11-u04": {
    "unitId": "g11-u04",
    "grade": 11,
    "unitNumber": 4,
    "title": "ASEAN AND VIET NAM",
    "topic": "Regional Integration, Cultural Exchange and Youth Cooperation",
    "mapWidth": 3200,
    "mapHeight": 2000,
    "ground": {
      "primaryPath": "/assets/game/units/grade-11/unit-04/ground/main_ground.png",
      "secondaryPath": "/assets/game/units/grade-11/unit-04/ground/wet_harbor_stone.png",
      "tileable": false
    },
    "npcs": [
      {
        "id": "bang_chu",
        "name": "Hồng y tông chủ Hà Ánh Phượng",
        "title": "Lãnh Tụ Võ Lâm Chính Phái",
        "elementColor": "#fbe285",
        "spriteKey": "bang_chu_ha_anh_phuong",
        "portraitPath": "/assets/game/characters/npc/portraits/bang_chu_ha_anh_phuong.png",
        "x": 550,
        "y": 560,
        "prompt": "[E] Bái kiến Hồng y tông chủ Hà Ánh Phượng",
        "dialogueIntro": "Chào mừng thiếu hiệp! Hôm nay chúng ta cùng khám phá Unit 4: ASEAN AND VIET NAM (Regional Integration, Cultural Exchange and Youth Cooperation). Hãy rèn luyện võ học, giải trừ ma chướng!"
      },
      {
        "id": "bach_khoa_thu_sinh",
        "name": "Bách Khoa thư Sinh Đinh Ngọc Khánh",
        "title": "Đại Sư Huynh Tông Môn",
        "elementColor": "#c084fc",
        "spriteKey": "bach_khoa_thu_sinh",
        "portraitPath": "/assets/game/characters/npc/portraits/bach_khoa_thu_sinh_v2.png",
        "x": 740,
        "y": 480,
        "prompt": "[E] Thỉnh Giáo Bách Khoa thư Sinh Đinh Ngọc Khánh",
        "dialogueIntro": "Chào sư đệ/sư muội! Đại học không nhàn như giang hồ đồn đâu các đệ... Nhưng qua được ải THPT này, thiên hạ sẽ mở rộng trước mắt! Có gì vướng mắc về bẫy thi cử hay kỹ năng thực chiến, cứ hỏi ta!"
      },
      {
        "id": "ho_phap_phuong_tu",
        "name": "Hộ Pháp Phương Tú",
        "title": "Hộ Pháp Từ Vựng & Trưởng Thành",
        "elementColor": "#59caa0",
        "spriteKey": "ho_phap_phuong_tu",
        "portraitPath": "/assets/game/characters/npc/portraits/ho_phap_phuong_tu.png",
        "x": 920,
        "y": 560,
        "prompt": "[E] Tham Vấn Hộ Pháp Phương Tú",
        "dialogueIntro": "Tàng Kinh Các lưu giữ toàn bộ bí điển từ vựng của ASEAN AND VIET NAM. Hãy lĩnh hội từng câu chữ để tích lũy công lực căn bản!"
      },
      {
        "id": "ho_phap_dang_tran_ha",
        "name": "Hộ Pháp Đặng Trần Hà",
        "title": "Hộ Pháp Ngữ Pháp & Thách Đấu",
        "elementColor": "#60a5fa",
        "spriteKey": "ho_phap_dang_tran_ha",
        "portraitPath": "/assets/game/characters/npc/portraits/ho_phap_dang_tran_ha.png",
        "x": 1850,
        "y": 560,
        "prompt": "[E] Bái Kiến Hộ Pháp Đặng Trần Hà",
        "dialogueIntro": "Ngữ pháp là xương sống của kiếm chiêu! Muốn phá phong ấn thạch trận của ASEAN AND VIET NAM, tâm ý phải chuẩn xác, cú pháp không được sai lệch một ly!"
      },
      {
        "id": "ho_phap_hoang_van",
        "name": "Hộ Pháp Hoàng Vân",
        "title": "Hộ Pháp Nghe & Nhịp Điệu",
        "elementColor": "#fbbf24",
        "spriteKey": "ho_phap_hoang_van",
        "portraitPath": "/assets/game/characters/npc/portraits/ho_phap_hoang_van.png",
        "x": 2400,
        "y": 760,
        "prompt": "[E] Thỉnh Giáo Hộ Pháp Hoàng Vân",
        "dialogueIntro": "Lắng nghe âm điệu tự nhiên, nghe rõ từng ngữ âm để thấu suốt chiêu thức địch nhân. Hãy vào Võ Luyện Đài luyện tập cùng ta!"
      },
      {
        "id": "ho_phap_nguyet_nguyen",
        "name": "Hộ Pháp Nguyệt Nguyên",
        "title": "Hộ Pháp Đọc Hiểu & Minh Triết",
        "elementColor": "#38bdf8",
        "spriteKey": "ho_phap_nguyet_nguyen",
        "portraitPath": "/assets/game/characters/npc/portraits/ho_phap_nguyet_nguyen.png",
        "x": 660,
        "y": 1260,
        "prompt": "[E] Luận Đạo Hộ Pháp Nguyệt Nguyên",
        "dialogueIntro": "Minh Triết Các soi rọi chân lý. Khi đối mặt với thuật ngụy tạo và mê trận thông tin của ASEAN AND VIET NAM, hãy tìm đúng câu bằng chứng để phá tan ảo ảnh!"
      }
    ],
    "props": [
        {
                "id": "g11-u04_theme_prop",
                "name": "ornate trade crate",
                "path": "/assets/game/units/grade-11/unit-04/props/theme_prop.png",
                "x": 1380,
                "y": 580,
                "size": [
                        160,
                        160
                ],
                "category": "vocab_discovery"
        },
        {
                "id": "g11-u04_festival_boat_lantern",
                "name": "small colorful Southeast Asian festival boat lantern, no national flags",
                "path": "/assets/game/units/grade-11/unit-04/props/festival_boat_lantern.png",
                "x": 860,
                "y": 1300,
                "size": [
                        160,
                        160
                ],
                "category": "reading_clue"
        }
      ],
    "enemies": [
        {
                "encounterId": "g11-u04_enc_scout",
                "enemyId": "scout",
                "name": "Gian Điệp Ngoại Vi",
                "title": "Tà Binh Tuần Tra",
                "concept": "swift human scout with a short blade and light Vietnamese clothing; motifs: storm-torn sails, trade pirates and spectral harbor masks",
                "spritePath": "/assets/game/units/grade-11/unit-04/enemies/scout.png",
                "x": 1450,
                "y": 1050,
                "patrolRange": {
                        "minX": 1380,
                        "maxX": 1540
                },
                "hp": 160,
                "maxHp": 160,
                "attack": 20,
                "defense": 10,
                "xpReward": 112,
                "combatMode": "lost_word",
                "learningSkill": "Đoạt Lại Vong Từ (Từ Vựng & Cụm Từ Cốt Lõi)",
                "difficulty": "easy",
                "requiredQuestionsCount": 1,
                "winCondition": "Điền chính xác từ khuyết thiếu để đoạt lại vong từ",
                "tutorialBriefing": "Đoạt Lại Vong Từ: Kẻ địch che giấu một từ vựng trọng tâm. Dùng manh mối gợi ý và kiến thức để điền chính xác!"
        },
        {
                "encounterId": "g11-u04_enc_ranged",
                "enemyId": "ranged",
                "name": "Thích Khách Phóng Tiễn",
                "title": "Tà Binh Tuần Tra",
                "concept": "human ranged attacker with a bamboo bow or sling; motifs: storm-torn sails, trade pirates and spectral harbor masks",
                "spritePath": "/assets/game/units/grade-11/unit-04/enemies/ranged.png",
                "x": 1950,
                "y": 1050,
                "patrolRange": {
                        "minX": 1870,
                        "maxX": 2030
                },
                "hp": 175,
                "maxHp": 175,
                "attack": 22,
                "defense": 11,
                "xpReward": 122,
                "combatMode": "listening_pursuit",
                "learningSkill": "Mê Âm Truy Kích (Luyện Nghe & Nhận Diện Ngữ Âm)",
                "difficulty": "easy",
                "requiredQuestionsCount": 1,
                "winCondition": "Lắng nghe thông điệp âm thanh và nhận diện chính xác yếu nghĩa",
                "tutorialBriefing": "Mê Âm Truy Kích: Kẻ địch truyền âm huyễn hoặc! Bấm nút Nghe để phát âm thanh khẩu quyết và giải mã ý nghĩa!"
        },
        {
                "encounterId": "g11-u04_enc_brute",
                "enemyId": "brute",
                "name": "Khuấy Đảo Trọng Binh",
                "title": "Tà Binh Tuần Tra",
                "concept": "large armored bruiser with a heavy club; motifs: storm-torn sails, trade pirates and spectral harbor masks",
                "spritePath": "/assets/game/units/grade-11/unit-04/enemies/brute.png",
                "x": 2450,
                "y": 1150,
                "patrolRange": {
                        "minX": 2370,
                        "maxX": 2530
                },
                "hp": 190,
                "maxHp": 190,
                "attack": 24,
                "defense": 12,
                "xpReward": 132,
                "combatMode": "unseal",
                "learningSkill": "Phá Phong Ấn (Cấu Trúc Cú Pháp & Trật Tự Câu)",
                "difficulty": "medium",
                "requiredQuestionsCount": 1,
                "winCondition": "Sắp xếp các phiến đá từ ngữ thành câu đúng ngữ pháp",
                "tutorialBriefing": "Phá Phong Ấn: Giáp hộ thân của Thạch Nhân chỉ bị phá vỡ khi sắp xếp các từ ngữ theo đúng trật tự cú pháp!"
        },
        {
                "encounterId": "g11-u04_enc_construct",
                "enemyId": "construct",
                "name": "Hải Phòng Cơ Quan",
                "title": "Tà Binh Tuần Tra",
                "concept": "nonhuman golem assembled from the unit's material motifs; motifs: storm-torn sails, trade pirates and spectral harbor masks",
                "spritePath": "/assets/game/units/grade-11/unit-04/enemies/construct.png",
                "x": 2850,
                "y": 1300,
                "patrolRange": {
                        "minX": 2770,
                        "maxX": 2930
                },
                "hp": 205,
                "maxHp": 205,
                "attack": 26,
                "defense": 13,
                "xpReward": 142,
                "combatMode": "deception_pierce",
                "learningSkill": "Thiên Diện Phá Ảo (Đọc Hiểu & Định Vị Câu Dẫn Chứng)",
                "difficulty": "medium",
                "requiredQuestionsCount": 1,
                "winCondition": "Chọn đáp án đúng VÀ định vị đúng câu dẫn chứng [1]-[4]",
                "tutorialBriefing": "Thiên Diện Phá Ảo: Ảo ảnh che mắt! Đọc kỹ đoạn văn bản, chọn đáp án đúng và bấm chọn đúng CÂU DẪN CHỨNG [1]-[4]!"
        },
        {
                "encounterId": "g11-u04_enc_spirit",
                "enemyId": "spirit",
                "name": "Chia Rẽ Tà Linh",
                "title": "Tà Binh Tuần Tra",
                "concept": "eerie floating nonhuman spirit formed from the unit's motifs; motifs: storm-torn sails, trade pirates and spectral harbor masks",
                "spritePath": "/assets/game/units/grade-11/unit-04/enemies/spirit.png",
                "x": 1750,
                "y": 1380,
                "patrolRange": {
                        "minX": 1670,
                        "maxX": 1830
                },
                "hp": 220,
                "maxHp": 220,
                "attack": 28,
                "defense": 14,
                "xpReward": 152,
                "combatMode": "escort_dialogue",
                "learningSkill": "Hộ Tống Hội Thoại (Giao Tiếp Tình Huống & Phản Hồi Chiến Thuật)",
                "difficulty": "medium",
                "requiredQuestionsCount": 1,
                "winCondition": "Lựa chọn câu đối đáp thấu tình đạt lý, kích hoạt khiên hộ thể",
                "tutorialBriefing": "Hộ Tống Hội Thoại: Đối thủ dùng lời kích động tâm trí! Chọn phương án đối đáp chuẩn mực để kích hoạt khiên bảo hộ!"
        },
        {
                "encounterId": "g11-u04_enc_elite",
                "enemyId": "elite",
                "name": "Nghịch Băng Đô Đốc",
                "title": "Hộ Vệ Tinh Anh",
                "concept": "elite commander with ornate armor and distinctive polearm; motifs: storm-torn sails, trade pirates and spectral harbor masks",
                "spritePath": "/assets/game/units/grade-11/unit-04/enemies/elite.png",
                "x": 2250,
                "y": 1450,
                "patrolRange": {
                        "minX": 2170,
                        "maxX": 2330
                },
                "hp": 280,
                "maxHp": 280,
                "attack": 32,
                "defense": 14,
                "xpReward": 240,
                "combatMode": "triple_combo",
                "learningSkill": "Liên Hoàn Tam Chiêu (Tổng Hợp Nghe - Hiểu - Xuất Chiêu)",
                "difficulty": "hard",
                "requiredQuestionsCount": 1,
                "winCondition": "Hoàn thành chuỗi 3 chiêu thức: Thính âm -> Luận giải -> Xuất chiêu phá trận",
                "tutorialBriefing": "Liên Hoàn Tam Chiêu: Hộ vệ tinh anh sở hữu kiếm pháp liên hoàn! Hoàn thành liên tiếp 3 chiêu thức để trảm địch!"
        },
        {
                "encounterId": "g11-u04_enc_harbor_junk_spirit",
                "enemyId": "harbor_junk_spirit",
                "name": "Hải Cảng Hạm Linh",
                "title": "Hộ Vệ Tinh Anh",
                "concept": "a spectral Vietnamese trading boat spirit made of torn sail cloth and weathered teak, compact humanoid form",
                "spritePath": "/assets/game/units/grade-11/unit-04/enemies/harbor_junk_spirit.png",
                "x": 1350,
                "y": 1450,
                "patrolRange": {
                        "minX": 1270,
                        "maxX": 1430
                },
                "hp": 280,
                "maxHp": 280,
                "attack": 32,
                "defense": 14,
                "xpReward": 240,
                "combatMode": "deception_pierce",
                "learningSkill": "Thiên Diện Phá Ảo (Đọc Hiểu & Phá Bẫy Ngụy Tạo)",
                "difficulty": "hard",
                "requiredQuestionsCount": 1,
                "winCondition": "Giải mã bản văn tịch cổ và chỉ ra câu bằng chứng",
                "tutorialBriefing": "Thiên Diện Phá Ảo: Chướng khí biến ảo khôn lường! Đọc văn tịch và xác định đúng câu dẫn chứng để trừ tà!"
        }
      ],
    "climax": {
      "hasRealBoss": false,
      "encounterId": "g11-u04_climax_4",
      "enemy": {
          "id": "climax_g11-u04",
        "name": "Thủ Trận Tinh Anh - ASEAN AND VIET NAM",
        "title": "Trấn Thủ Trận Đỉnh Điểm",
        "spriteKey": "/assets/game/units/grade-11/unit-04/enemies/harbor_junk_spirit.png",
        "hp": 360,
        "maxHp": 360,
        "attack": 34,
        "defense": 16,
        "xpReward": 420,
        "isBoss": false,
        "bossPhase": 1,
        "dialogueIntro": "“Ta là Thủ Trận Tinh Anh trấn giữ thạch trận đỉnh điểm của ASEAN AND VIET NAM. Hãy dốc toàn lực chiến thắng để chứng minh sự tinh thông!”",
        "dialoguePhase2": "“Ngươi quả thực có thực lực! Đỡ chiêu biến hóa cuối cùng này!”",
        "combatMode": "triple_combo",
        "learningSkill": "Quyết Chiến Thủ Trận Tinh Anh (Thạch Trận Đỉnh Điểm)",
        "difficulty": "hard",
        "requiredQuestionsCount": 1,
        "winCondition": "Đánh bại Thủ Trận Tinh Anh để giải phóng toàn bộ Unit",
        "tutorialBriefing": "Phong Ấn Trận Đỉnh Điểm: Hoàn thành Liên Hoàn Tam Chiêu để phá tan kết giới, hoàn thành Unit và mở ra cảnh giới mới!"
        },
      "x": 1600,
      "y": 1720,
      "barrierPrompt": "🔒 Phong Ấn Trận Đỉnh Điểm (Cần >= 70% tiến độ)",
      "unlockedPrompt": "⚡ Phong Ấn Đỉnh Điểm ĐÃ MỞ! Thách đấu Thủ Trận Tinh Anh!"
    }
  },
  "g11-u05": {
    "unitId": "g11-u05",
    "grade": 11,
    "unitNumber": 5,
    "title": "GLOBAL WARMING",
    "topic": "Climate Change, Greenhouse Emissions and Planet Protection",
    "mapWidth": 3200,
    "mapHeight": 2000,
    "ground": {
      "primaryPath": "/assets/game/units/grade-11/unit-05/ground/main_ground.png",
      "secondaryPath": "/assets/game/units/grade-11/unit-05/ground/salt_marsh_water.png",
      "tileable": false
    },
    "npcs": [
      {
        "id": "bang_chu",
        "name": "Hồng y tông chủ Hà Ánh Phượng",
        "title": "Lãnh Tụ Võ Lâm Chính Phái",
        "elementColor": "#fbe285",
        "spriteKey": "bang_chu_ha_anh_phuong",
        "portraitPath": "/assets/game/characters/npc/portraits/bang_chu_ha_anh_phuong.png",
        "x": 550,
        "y": 560,
        "prompt": "[E] Bái kiến Hồng y tông chủ Hà Ánh Phượng",
        "dialogueIntro": "Chào mừng thiếu hiệp! Hôm nay chúng ta cùng khám phá Unit 5: GLOBAL WARMING (Climate Change, Greenhouse Emissions and Planet Protection). Hãy rèn luyện võ học, giải trừ ma chướng!"
      },
      {
        "id": "bach_khoa_thu_sinh",
        "name": "Bách Khoa thư Sinh Đinh Ngọc Khánh",
        "title": "Đại Sư Huynh Tông Môn",
        "elementColor": "#c084fc",
        "spriteKey": "bach_khoa_thu_sinh",
        "portraitPath": "/assets/game/characters/npc/portraits/bach_khoa_thu_sinh_v2.png",
        "x": 740,
        "y": 480,
        "prompt": "[E] Thỉnh Giáo Bách Khoa thư Sinh Đinh Ngọc Khánh",
        "dialogueIntro": "Chào sư đệ/sư muội! Đại học không nhàn như giang hồ đồn đâu các đệ... Nhưng qua được ải THPT này, thiên hạ sẽ mở rộng trước mắt! Có gì vướng mắc về bẫy thi cử hay kỹ năng thực chiến, cứ hỏi ta!"
      },
      {
        "id": "ho_phap_phuong_tu",
        "name": "Hộ Pháp Phương Tú",
        "title": "Hộ Pháp Từ Vựng & Trưởng Thành",
        "elementColor": "#59caa0",
        "spriteKey": "ho_phap_phuong_tu",
        "portraitPath": "/assets/game/characters/npc/portraits/ho_phap_phuong_tu.png",
        "x": 920,
        "y": 560,
        "prompt": "[E] Tham Vấn Hộ Pháp Phương Tú",
        "dialogueIntro": "Tàng Kinh Các lưu giữ toàn bộ bí điển từ vựng của GLOBAL WARMING. Hãy lĩnh hội từng câu chữ để tích lũy công lực căn bản!"
      },
      {
        "id": "ho_phap_dang_tran_ha",
        "name": "Hộ Pháp Đặng Trần Hà",
        "title": "Hộ Pháp Ngữ Pháp & Thách Đấu",
        "elementColor": "#60a5fa",
        "spriteKey": "ho_phap_dang_tran_ha",
        "portraitPath": "/assets/game/characters/npc/portraits/ho_phap_dang_tran_ha.png",
        "x": 1850,
        "y": 560,
        "prompt": "[E] Bái Kiến Hộ Pháp Đặng Trần Hà",
        "dialogueIntro": "Ngữ pháp là xương sống của kiếm chiêu! Muốn phá phong ấn thạch trận của GLOBAL WARMING, tâm ý phải chuẩn xác, cú pháp không được sai lệch một ly!"
      },
      {
        "id": "ho_phap_hoang_van",
        "name": "Hộ Pháp Hoàng Vân",
        "title": "Hộ Pháp Nghe & Nhịp Điệu",
        "elementColor": "#fbbf24",
        "spriteKey": "ho_phap_hoang_van",
        "portraitPath": "/assets/game/characters/npc/portraits/ho_phap_hoang_van.png",
        "x": 2400,
        "y": 760,
        "prompt": "[E] Thỉnh Giáo Hộ Pháp Hoàng Vân",
        "dialogueIntro": "Lắng nghe âm điệu tự nhiên, nghe rõ từng ngữ âm để thấu suốt chiêu thức địch nhân. Hãy vào Võ Luyện Đài luyện tập cùng ta!"
      },
      {
        "id": "ho_phap_nguyet_nguyen",
        "name": "Hộ Pháp Nguyệt Nguyên",
        "title": "Hộ Pháp Đọc Hiểu & Minh Triết",
        "elementColor": "#38bdf8",
        "spriteKey": "ho_phap_nguyet_nguyen",
        "portraitPath": "/assets/game/characters/npc/portraits/ho_phap_nguyet_nguyen.png",
        "x": 660,
        "y": 1260,
        "prompt": "[E] Luận Đạo Hộ Pháp Nguyệt Nguyên",
        "dialogueIntro": "Minh Triết Các soi rọi chân lý. Khi đối mặt với thuật ngụy tạo và mê trận thông tin của GLOBAL WARMING, hãy tìm đúng câu bằng chứng để phá tan ảo ảnh!"
      }
    ],
    "props": [
        {
                "id": "g11-u05_theme_prop",
                "name": "mangrove seedling",
                "path": "/assets/game/units/grade-11/unit-05/props/theme_prop.png",
                "x": 1380,
                "y": 580,
                "size": [
                        160,
                        160
                ],
                "category": "vocab_discovery"
        },
        {
                "id": "g11-u05_tide_gauge",
                "name": "simple weathered bronze tide gauge, no numbers",
                "path": "/assets/game/units/grade-11/unit-05/props/tide_gauge.png",
                "x": 860,
                "y": 1300,
                "size": [
                        160,
                        160
                ],
                "category": "reading_clue"
        }
      ],
    "enemies": [
        {
                "encounterId": "g11-u05_enc_scout",
                "enemyId": "scout",
                "name": "Hỏa Diệm Thám Tử",
                "title": "Tà Binh Tuần Tra",
                "concept": "swift human scout with a short blade and light Vietnamese clothing; motifs: heat haze, rising tide spirits and scorched mangrove debris",
                "spritePath": "/assets/game/units/grade-11/unit-05/enemies/scout.png",
                "x": 1450,
                "y": 1050,
                "patrolRange": {
                        "minX": 1380,
                        "maxX": 1540
                },
                "hp": 170,
                "maxHp": 170,
                "attack": 21,
                "defense": 11,
                "xpReward": 120,
                "combatMode": "lost_word",
                "learningSkill": "Đoạt Lại Vong Từ (Từ Vựng & Cụm Từ Cốt Lõi)",
                "difficulty": "easy",
                "requiredQuestionsCount": 1,
                "winCondition": "Điền chính xác từ khuyết thiếu để đoạt lại vong từ",
                "tutorialBriefing": "Đoạt Lại Vong Từ: Kẻ địch che giấu một từ vựng trọng tâm. Dùng manh mối gợi ý và kiến thức để điền chính xác!"
        },
        {
                "encounterId": "g11-u05_enc_ranged",
                "enemyId": "ranged",
                "name": "Khói Độc Xạ Thủ",
                "title": "Tà Binh Tuần Tra",
                "concept": "human ranged attacker with a bamboo bow or sling; motifs: heat haze, rising tide spirits and scorched mangrove debris",
                "spritePath": "/assets/game/units/grade-11/unit-05/enemies/ranged.png",
                "x": 1950,
                "y": 1050,
                "patrolRange": {
                        "minX": 1870,
                        "maxX": 2030
                },
                "hp": 185,
                "maxHp": 185,
                "attack": 23,
                "defense": 12,
                "xpReward": 130,
                "combatMode": "listening_pursuit",
                "learningSkill": "Mê Âm Truy Kích (Luyện Nghe & Nhận Diện Ngữ Âm)",
                "difficulty": "easy",
                "requiredQuestionsCount": 1,
                "winCondition": "Lắng nghe thông điệp âm thanh và nhận diện chính xác yếu nghĩa",
                "tutorialBriefing": "Mê Âm Truy Kích: Kẻ địch truyền âm huyễn hoặc! Bấm nút Nghe để phát âm thanh khẩu quyết và giải mã ý nghĩa!"
        },
        {
                "encounterId": "g11-u05_enc_brute",
                "enemyId": "brute",
                "name": "Nham Thạch Ma Nhân",
                "title": "Tà Binh Tuần Tra",
                "concept": "large armored bruiser with a heavy club; motifs: heat haze, rising tide spirits and scorched mangrove debris",
                "spritePath": "/assets/game/units/grade-11/unit-05/enemies/brute.png",
                "x": 2450,
                "y": 1150,
                "patrolRange": {
                        "minX": 2370,
                        "maxX": 2530
                },
                "hp": 200,
                "maxHp": 200,
                "attack": 25,
                "defense": 13,
                "xpReward": 140,
                "combatMode": "unseal",
                "learningSkill": "Phá Phong Ấn (Cấu Trúc Cú Pháp & Trật Tự Câu)",
                "difficulty": "medium",
                "requiredQuestionsCount": 1,
                "winCondition": "Sắp xếp các phiến đá từ ngữ thành câu đúng ngữ pháp",
                "tutorialBriefing": "Phá Phong Ấn: Giáp hộ thân của Thạch Nhân chỉ bị phá vỡ khi sắp xếp các từ ngữ theo đúng trật tự cú pháp!"
        },
        {
                "encounterId": "g11-u05_enc_construct",
                "enemyId": "construct",
                "name": "Khí Thải Cơ Quan",
                "title": "Tà Binh Tuần Tra",
                "concept": "nonhuman golem assembled from the unit's material motifs; motifs: heat haze, rising tide spirits and scorched mangrove debris",
                "spritePath": "/assets/game/units/grade-11/unit-05/enemies/construct.png",
                "x": 2850,
                "y": 1300,
                "patrolRange": {
                        "minX": 2770,
                        "maxX": 2930
                },
                "hp": 215,
                "maxHp": 215,
                "attack": 27,
                "defense": 14,
                "xpReward": 150,
                "combatMode": "deception_pierce",
                "learningSkill": "Thiên Diện Phá Ảo (Đọc Hiểu & Định Vị Câu Dẫn Chứng)",
                "difficulty": "medium",
                "requiredQuestionsCount": 1,
                "winCondition": "Chọn đáp án đúng VÀ định vị đúng câu dẫn chứng [1]-[4]",
                "tutorialBriefing": "Thiên Diện Phá Ảo: Ảo ảnh che mắt! Đọc kỹ đoạn văn bản, chọn đáp án đúng và bấm chọn đúng CÂU DẪN CHỨNG [1]-[4]!"
        },
        {
                "encounterId": "g11-u05_enc_spirit",
                "enemyId": "spirit",
                "name": "Hắc Hỏa Tà Linh",
                "title": "Tà Binh Tuần Tra",
                "concept": "eerie floating nonhuman spirit formed from the unit's motifs; motifs: heat haze, rising tide spirits and scorched mangrove debris",
                "spritePath": "/assets/game/units/grade-11/unit-05/enemies/spirit.png",
                "x": 1750,
                "y": 1380,
                "patrolRange": {
                        "minX": 1670,
                        "maxX": 1830
                },
                "hp": 230,
                "maxHp": 230,
                "attack": 29,
                "defense": 15,
                "xpReward": 160,
                "combatMode": "escort_dialogue",
                "learningSkill": "Hộ Tống Hội Thoại (Giao Tiếp Tình Huống & Phản Hồi Chiến Thuật)",
                "difficulty": "medium",
                "requiredQuestionsCount": 1,
                "winCondition": "Lựa chọn câu đối đáp thấu tình đạt lý, kích hoạt khiên hộ thể",
                "tutorialBriefing": "Hộ Tống Hội Thoại: Đối thủ dùng lời kích động tâm trí! Chọn phương án đối đáp chuẩn mực để kích hoạt khiên bảo hộ!"
        },
        {
                "encounterId": "g11-u05_enc_elite",
                "enemyId": "elite",
                "name": "Ô Nhiễm Tôn Giả",
                "title": "Hộ Vệ Tinh Anh",
                "concept": "elite commander with ornate armor and distinctive polearm; motifs: heat haze, rising tide spirits and scorched mangrove debris",
                "spritePath": "/assets/game/units/grade-11/unit-05/enemies/elite.png",
                "x": 2250,
                "y": 1450,
                "patrolRange": {
                        "minX": 2170,
                        "maxX": 2330
                },
                "hp": 295,
                "maxHp": 295,
                "attack": 34,
                "defense": 15,
                "xpReward": 255,
                "combatMode": "triple_combo",
                "learningSkill": "Liên Hoàn Tam Chiêu (Tổng Hợp Nghe - Hiểu - Xuất Chiêu)",
                "difficulty": "hard",
                "requiredQuestionsCount": 1,
                "winCondition": "Hoàn thành chuỗi 3 chiêu thức: Thính âm -> Luận giải -> Xuất chiêu phá trận",
                "tutorialBriefing": "Liên Hoàn Tam Chiêu: Hộ vệ tinh anh sở hữu kiếm pháp liên hoàn! Hoàn thành liên tiếp 3 chiêu thức để trảm địch!"
        },
        {
                "encounterId": "g11-u05_enc_heat_tide_beast",
                "enemyId": "heat_tide_beast",
                "name": "Nhiệt Triều Hung Thú",
                "title": "Hộ Vệ Tinh Anh",
                "concept": "a monstrous heat-wave crab from a flooded coast, cracked salt armor and glowing hot claws",
                "spritePath": "/assets/game/units/grade-11/unit-05/enemies/heat_tide_beast.png",
                "x": 1350,
                "y": 1450,
                "patrolRange": {
                        "minX": 1270,
                        "maxX": 1430
                },
                "hp": 295,
                "maxHp": 295,
                "attack": 34,
                "defense": 15,
                "xpReward": 255,
                "combatMode": "deception_pierce",
                "learningSkill": "Thiên Diện Phá Ảo (Đọc Hiểu & Phá Bẫy Ngụy Tạo)",
                "difficulty": "hard",
                "requiredQuestionsCount": 1,
                "winCondition": "Giải mã bản văn tịch cổ và chỉ ra câu bằng chứng",
                "tutorialBriefing": "Thiên Diện Phá Ảo: Chướng khí biến ảo khôn lường! Đọc văn tịch và xác định đúng câu dẫn chứng để trừ tà!"
        }
      ],
    "climax": {
      "hasRealBoss": false,
      "encounterId": "g11-u05_climax_5",
      "enemy": {
          "id": "climax_g11-u05",
        "name": "Thủ Trận Tinh Anh - GLOBAL WARMING",
        "title": "Trấn Thủ Trận Đỉnh Điểm",
        "spriteKey": "/assets/game/units/grade-11/unit-05/enemies/heat_tide_beast.png",
        "hp": 380,
        "maxHp": 380,
        "attack": 36,
        "defense": 17,
        "xpReward": 445,
        "isBoss": false,
        "bossPhase": 1,
        "dialogueIntro": "“Ta là Thủ Trận Tinh Anh trấn giữ thạch trận đỉnh điểm của GLOBAL WARMING. Hãy dốc toàn lực chiến thắng để chứng minh sự tinh thông!”",
        "dialoguePhase2": "“Ngươi quả thực có thực lực! Đỡ chiêu biến hóa cuối cùng này!”",
        "combatMode": "triple_combo",
        "learningSkill": "Quyết Chiến Thủ Trận Tinh Anh (Thạch Trận Đỉnh Điểm)",
        "difficulty": "hard",
        "requiredQuestionsCount": 1,
        "winCondition": "Đánh bại Thủ Trận Tinh Anh để giải phóng toàn bộ Unit",
        "tutorialBriefing": "Phong Ấn Trận Đỉnh Điểm: Hoàn thành Liên Hoàn Tam Chiêu để phá tan kết giới, hoàn thành Unit và mở ra cảnh giới mới!"
        },
      "x": 1600,
      "y": 1720,
      "barrierPrompt": "🔒 Phong Ấn Trận Đỉnh Điểm (Cần >= 70% tiến độ)",
      "unlockedPrompt": "⚡ Phong Ấn Đỉnh Điểm ĐÃ MỞ! Thách đấu Thủ Trận Tinh Anh!"
    }
  },
  "g11-u06": {
    "unitId": "g11-u06",
    "grade": 11,
    "unitNumber": 6,
    "title": "PRESERVING OUR HERITAGE",
    "topic": "Tangible, Intangible and Natural Cultural Heritage Preservation",
    "mapWidth": 3200,
    "mapHeight": 2000,
    "ground": {
      "primaryPath": "/assets/game/units/grade-11/unit-06/ground/main_ground.png",
      "secondaryPath": "/assets/game/units/grade-11/unit-06/ground/heritage_wood_floor.png",
      "tileable": false
    },
    "npcs": [
      {
        "id": "bang_chu",
        "name": "Hồng y tông chủ Hà Ánh Phượng",
        "title": "Lãnh Tụ Võ Lâm Chính Phái",
        "elementColor": "#fbe285",
        "spriteKey": "bang_chu_ha_anh_phuong",
        "portraitPath": "/assets/game/characters/npc/portraits/bang_chu_ha_anh_phuong.png",
        "x": 550,
        "y": 560,
        "prompt": "[E] Bái kiến Hồng y tông chủ Hà Ánh Phượng",
        "dialogueIntro": "Chào mừng thiếu hiệp! Hôm nay chúng ta cùng khám phá Unit 6: PRESERVING OUR HERITAGE (Tangible, Intangible and Natural Cultural Heritage Preservation). Hãy rèn luyện võ học, giải trừ ma chướng!"
      },
      {
        "id": "bach_khoa_thu_sinh",
        "name": "Bách Khoa thư Sinh Đinh Ngọc Khánh",
        "title": "Đại Sư Huynh Tông Môn",
        "elementColor": "#c084fc",
        "spriteKey": "bach_khoa_thu_sinh",
        "portraitPath": "/assets/game/characters/npc/portraits/bach_khoa_thu_sinh_v2.png",
        "x": 740,
        "y": 480,
        "prompt": "[E] Thỉnh Giáo Bách Khoa thư Sinh Đinh Ngọc Khánh",
        "dialogueIntro": "Chào sư đệ/sư muội! Đại học không nhàn như giang hồ đồn đâu các đệ... Nhưng qua được ải THPT này, thiên hạ sẽ mở rộng trước mắt! Có gì vướng mắc về bẫy thi cử hay kỹ năng thực chiến, cứ hỏi ta!"
      },
      {
        "id": "ho_phap_phuong_tu",
        "name": "Hộ Pháp Phương Tú",
        "title": "Hộ Pháp Từ Vựng & Trưởng Thành",
        "elementColor": "#59caa0",
        "spriteKey": "ho_phap_phuong_tu",
        "portraitPath": "/assets/game/characters/npc/portraits/ho_phap_phuong_tu.png",
        "x": 920,
        "y": 560,
        "prompt": "[E] Tham Vấn Hộ Pháp Phương Tú",
        "dialogueIntro": "Tàng Kinh Các lưu giữ toàn bộ bí điển từ vựng của PRESERVING OUR HERITAGE. Hãy lĩnh hội từng câu chữ để tích lũy công lực căn bản!"
      },
      {
        "id": "ho_phap_dang_tran_ha",
        "name": "Hộ Pháp Đặng Trần Hà",
        "title": "Hộ Pháp Ngữ Pháp & Thách Đấu",
        "elementColor": "#60a5fa",
        "spriteKey": "ho_phap_dang_tran_ha",
        "portraitPath": "/assets/game/characters/npc/portraits/ho_phap_dang_tran_ha.png",
        "x": 1850,
        "y": 560,
        "prompt": "[E] Bái Kiến Hộ Pháp Đặng Trần Hà",
        "dialogueIntro": "Ngữ pháp là xương sống của kiếm chiêu! Muốn phá phong ấn thạch trận của PRESERVING OUR HERITAGE, tâm ý phải chuẩn xác, cú pháp không được sai lệch một ly!"
      },
      {
        "id": "ho_phap_hoang_van",
        "name": "Hộ Pháp Hoàng Vân",
        "title": "Hộ Pháp Nghe & Nhịp Điệu",
        "elementColor": "#fbbf24",
        "spriteKey": "ho_phap_hoang_van",
        "portraitPath": "/assets/game/characters/npc/portraits/ho_phap_hoang_van.png",
        "x": 2400,
        "y": 760,
        "prompt": "[E] Thỉnh Giáo Hộ Pháp Hoàng Vân",
        "dialogueIntro": "Lắng nghe âm điệu tự nhiên, nghe rõ từng ngữ âm để thấu suốt chiêu thức địch nhân. Hãy vào Võ Luyện Đài luyện tập cùng ta!"
      },
      {
        "id": "ho_phap_nguyet_nguyen",
        "name": "Hộ Pháp Nguyệt Nguyên",
        "title": "Hộ Pháp Đọc Hiểu & Minh Triết",
        "elementColor": "#38bdf8",
        "spriteKey": "ho_phap_nguyet_nguyen",
        "portraitPath": "/assets/game/characters/npc/portraits/ho_phap_nguyet_nguyen.png",
        "x": 660,
        "y": 1260,
        "prompt": "[E] Luận Đạo Hộ Pháp Nguyệt Nguyên",
        "dialogueIntro": "Minh Triết Các soi rọi chân lý. Khi đối mặt với thuật ngụy tạo và mê trận thông tin của PRESERVING OUR HERITAGE, hãy tìm đúng câu bằng chứng để phá tan ảo ảnh!"
      }
    ],
    "props": [
        {
                "id": "g11-u06_theme_prop",
                "name": "bronze drum on stand",
                "path": "/assets/game/units/grade-11/unit-06/props/theme_prop.png",
                "x": 1380,
                "y": 580,
                "size": [
                        160,
                        160
                ],
                "category": "listening_clue"
        },
        {
                "id": "g11-u06_restoration_scaffold",
                "name": "compact bamboo heritage-restoration scaffold with repair tools",
                "path": "/assets/game/units/grade-11/unit-06/props/restoration_scaffold.png",
                "x": 860,
                "y": 1300,
                "size": [
                        160,
                        160
                ],
                "category": "reading_clue"
        }
      ],
    "enemies": [
        {
                "encounterId": "g11-u06_enc_scout",
                "enemyId": "scout",
                "name": "Đạo Mộ Tặc Đồ",
                "title": "Tà Binh Tuần Tra",
                "concept": "swift human scout with a short blade and light Vietnamese clothing; motifs: looted relics, carved stone guardians and damaged heritage woodwork",
                "spritePath": "/assets/game/units/grade-11/unit-06/enemies/scout.png",
                "x": 1450,
                "y": 1050,
                "patrolRange": {
                        "minX": 1380,
                        "maxX": 1540
                },
                "hp": 180,
                "maxHp": 180,
                "attack": 22,
                "defense": 12,
                "xpReward": 128,
                "combatMode": "lost_word",
                "learningSkill": "Đoạt Lại Vong Từ (Từ Vựng & Cụm Từ Cốt Lõi)",
                "difficulty": "easy",
                "requiredQuestionsCount": 1,
                "winCondition": "Điền chính xác từ khuyết thiếu để đoạt lại vong từ",
                "tutorialBriefing": "Đoạt Lại Vong Từ: Kẻ địch che giấu một từ vựng trọng tâm. Dùng manh mối gợi ý và kiến thức để điền chính xác!"
        },
        {
                "encounterId": "g11-u06_enc_ranged",
                "enemyId": "ranged",
                "name": "Phá Cổ Xạ Thủ",
                "title": "Tà Binh Tuần Tra",
                "concept": "human ranged attacker with a bamboo bow or sling; motifs: looted relics, carved stone guardians and damaged heritage woodwork",
                "spritePath": "/assets/game/units/grade-11/unit-06/enemies/ranged.png",
                "x": 1950,
                "y": 1050,
                "patrolRange": {
                        "minX": 1870,
                        "maxX": 2030
                },
                "hp": 195,
                "maxHp": 195,
                "attack": 24,
                "defense": 13,
                "xpReward": 138,
                "combatMode": "listening_pursuit",
                "learningSkill": "Mê Âm Truy Kích (Luyện Nghe & Nhận Diện Ngữ Âm)",
                "difficulty": "easy",
                "requiredQuestionsCount": 1,
                "winCondition": "Lắng nghe thông điệp âm thanh và nhận diện chính xác yếu nghĩa",
                "tutorialBriefing": "Mê Âm Truy Kích: Kẻ địch truyền âm huyễn hoặc! Bấm nút Nghe để phát âm thanh khẩu quyết và giải mã ý nghĩa!"
        },
        {
                "encounterId": "g11-u06_enc_brute",
                "enemyId": "brute",
                "name": "Toái Thạch Ma Đồ",
                "title": "Tà Binh Tuần Tra",
                "concept": "large armored bruiser with a heavy club; motifs: looted relics, carved stone guardians and damaged heritage woodwork",
                "spritePath": "/assets/game/units/grade-11/unit-06/enemies/brute.png",
                "x": 2450,
                "y": 1150,
                "patrolRange": {
                        "minX": 2370,
                        "maxX": 2530
                },
                "hp": 210,
                "maxHp": 210,
                "attack": 26,
                "defense": 14,
                "xpReward": 148,
                "combatMode": "unseal",
                "learningSkill": "Phá Phong Ấn (Cấu Trúc Cú Pháp & Trật Tự Câu)",
                "difficulty": "medium",
                "requiredQuestionsCount": 1,
                "winCondition": "Sắp xếp các phiến đá từ ngữ thành câu đúng ngữ pháp",
                "tutorialBriefing": "Phá Phong Ấn: Giáp hộ thân của Thạch Nhân chỉ bị phá vỡ khi sắp xếp các từ ngữ theo đúng trật tự cú pháp!"
        },
        {
                "encounterId": "g11-u06_enc_construct",
                "enemyId": "construct",
                "name": "Di Tích Cơ Quan",
                "title": "Tà Binh Tuần Tra",
                "concept": "nonhuman golem assembled from the unit's material motifs; motifs: looted relics, carved stone guardians and damaged heritage woodwork",
                "spritePath": "/assets/game/units/grade-11/unit-06/enemies/construct.png",
                "x": 2850,
                "y": 1300,
                "patrolRange": {
                        "minX": 2770,
                        "maxX": 2930
                },
                "hp": 225,
                "maxHp": 225,
                "attack": 28,
                "defense": 15,
                "xpReward": 158,
                "combatMode": "deception_pierce",
                "learningSkill": "Thiên Diện Phá Ảo (Đọc Hiểu & Định Vị Câu Dẫn Chứng)",
                "difficulty": "medium",
                "requiredQuestionsCount": 1,
                "winCondition": "Chọn đáp án đúng VÀ định vị đúng câu dẫn chứng [1]-[4]",
                "tutorialBriefing": "Thiên Diện Phá Ảo: Ảo ảnh che mắt! Đọc kỹ đoạn văn bản, chọn đáp án đúng và bấm chọn đúng CÂU DẪN CHỨNG [1]-[4]!"
        },
        {
                "encounterId": "g11-u06_enc_spirit",
                "enemyId": "spirit",
                "name": "Phong Hóa Tà Linh",
                "title": "Tà Binh Tuần Tra",
                "concept": "eerie floating nonhuman spirit formed from the unit's motifs; motifs: looted relics, carved stone guardians and damaged heritage woodwork",
                "spritePath": "/assets/game/units/grade-11/unit-06/enemies/spirit.png",
                "x": 1750,
                "y": 1380,
                "patrolRange": {
                        "minX": 1670,
                        "maxX": 1830
                },
                "hp": 240,
                "maxHp": 240,
                "attack": 30,
                "defense": 16,
                "xpReward": 168,
                "combatMode": "escort_dialogue",
                "learningSkill": "Hộ Tống Hội Thoại (Giao Tiếp Tình Huống & Phản Hồi Chiến Thuật)",
                "difficulty": "medium",
                "requiredQuestionsCount": 1,
                "winCondition": "Lựa chọn câu đối đáp thấu tình đạt lý, kích hoạt khiên hộ thể",
                "tutorialBriefing": "Hộ Tống Hội Thoại: Đối thủ dùng lời kích động tâm trí! Chọn phương án đối đáp chuẩn mực để kích hoạt khiên bảo hộ!"
        },
        {
                "encounterId": "g11-u06_enc_elite",
                "enemyId": "elite",
                "name": "Huyễn Kính Ma Đồ",
                "title": "Hộ Vệ Tinh Anh",
                "concept": "elite commander with ornate armor and distinctive polearm; motifs: looted relics, carved stone guardians and damaged heritage woodwork",
                "spritePath": "/assets/game/units/grade-11/unit-06/enemies/elite.png",
                "x": 2250,
                "y": 1450,
                "patrolRange": {
                        "minX": 2170,
                        "maxX": 2330
                },
                "hp": 310,
                "maxHp": 310,
                "attack": 36,
                "defense": 16,
                "xpReward": 270,
                "combatMode": "triple_combo",
                "learningSkill": "Liên Hoàn Tam Chiêu (Tổng Hợp Nghe - Hiểu - Xuất Chiêu)",
                "difficulty": "hard",
                "requiredQuestionsCount": 1,
                "winCondition": "Hoàn thành chuỗi 3 chiêu thức: Thính âm -> Luận giải -> Xuất chiêu phá trận",
                "tutorialBriefing": "Liên Hoàn Tam Chiêu: Hộ vệ tinh anh sở hữu kiếm pháp liên hoàn! Hoàn thành liên tiếp 3 chiêu thức để trảm địch!"
        },
        {
                "encounterId": "g11-u06_enc_bronze_drum_guardian",
                "enemyId": "bronze_drum_guardian",
                "name": "Đồng Cổ Thủ Hộ Thú",
                "title": "Hộ Vệ Tinh Anh",
                "concept": "an awakened Đông Sơn bronze drum guardian golem with carved bird motifs and heavy drum arms",
                "spritePath": "/assets/game/units/grade-11/unit-06/enemies/bronze_drum_guardian.png",
                "x": 1350,
                "y": 1450,
                "patrolRange": {
                        "minX": 1270,
                        "maxX": 1430
                },
                "hp": 310,
                "maxHp": 310,
                "attack": 36,
                "defense": 16,
                "xpReward": 270,
                "combatMode": "deception_pierce",
                "learningSkill": "Thiên Diện Phá Ảo (Đọc Hiểu & Phá Bẫy Ngụy Tạo)",
                "difficulty": "hard",
                "requiredQuestionsCount": 1,
                "winCondition": "Giải mã bản văn tịch cổ và chỉ ra câu bằng chứng",
                "tutorialBriefing": "Thiên Diện Phá Ảo: Chướng khí biến ảo khôn lường! Đọc văn tịch và xác định đúng câu dẫn chứng để trừ tà!"
        }
      ],
    "climax": {
      "hasRealBoss": true,
      "encounterId": "g11-u06_boss_6",
      "enemy": {
          "id": "boss_g11-u06",
        "name": "Thiên Diện Huyễn Sư",
        "title": "Bá Chủ Ảo Ảnh Xâm Hại Di Sản",
        "spriteKey": "/assets/game/characters/bosses/thien_dien_huyen_su.png",
        "hp": 490,
        "maxHp": 490,
        "attack": 50,
        "defense": 26,
        "xpReward": 690,
        "isBoss": true,
        "bossPhase": 1,
        "dialogueIntro": "“Khá khen tiểu bối dám bước vào Cấm Địa PRESERVING OUR HERITAGE! Hãy nếm thử kiếm khí của Thiên Diện Huyễn Sư!”",
        "dialoguePhase2": "“Cuồng Nộ Huyết Ma kích hoạt! Tuyệt kỹ PRESERVING OUR HERITAGE sẽ biến ngươi thành tro bụi!”",
        "combatMode": "triple_combo",
        "learningSkill": "Quyết Chiến Đại Ma Đầu (2 Phase Liên Hoàn Tam Chiêu)",
        "difficulty": "hard",
        "requiredQuestionsCount": 1,
        "winCondition": "Đánh bại Ma Đầu qua 2 Phase sinh tử",
        "tutorialBriefing": "Quyết Chiến Boss: Đại Ma Đầu sở hữu 2 Phase cuồng nộ! Hãy hoàn thành Liên Hoàn Tam Chiêu và vượt qua tốc độ xuất chiêu bão táp!"
        },
      "x": 1600,
      "y": 1720,
      "barrierPrompt": "🔒 Ma Khí Cấm Địa (Cần >= 70% tiến độ)",
      "unlockedPrompt": "⚡ Cổng Ma Giáo Cấm Địa ĐÃ MỞ! Quyết chiến Thiên Diện Huyễn Sư!"
    }
  },
  "g11-u07": {
    "unitId": "g11-u07",
    "grade": 11,
    "unitNumber": 7,
    "title": "EDUCATION OPTIONS FOR SCHOOL-LEAVERS",
    "topic": "Higher Education, Vocational Training and Apprenticeships",
    "mapWidth": 3200,
    "mapHeight": 2000,
    "ground": {
      "primaryPath": "/assets/game/units/grade-11/unit-07/ground/main_ground.png",
      "secondaryPath": "/assets/game/units/grade-11/unit-07/ground/crossroads_cobbles.png",
      "tileable": false
    },
    "npcs": [
      {
        "id": "bang_chu",
        "name": "Hồng y tông chủ Hà Ánh Phượng",
        "title": "Lãnh Tụ Võ Lâm Chính Phái",
        "elementColor": "#fbe285",
        "spriteKey": "bang_chu_ha_anh_phuong",
        "portraitPath": "/assets/game/characters/npc/portraits/bang_chu_ha_anh_phuong.png",
        "x": 550,
        "y": 560,
        "prompt": "[E] Bái kiến Hồng y tông chủ Hà Ánh Phượng",
        "dialogueIntro": "Chào mừng thiếu hiệp! Hôm nay chúng ta cùng khám phá Unit 7: EDUCATION OPTIONS FOR SCHOOL-LEAVERS (Higher Education, Vocational Training and Apprenticeships). Hãy rèn luyện võ học, giải trừ ma chướng!"
      },
      {
        "id": "bach_khoa_thu_sinh",
        "name": "Bách Khoa thư Sinh Đinh Ngọc Khánh",
        "title": "Đại Sư Huynh Tông Môn",
        "elementColor": "#c084fc",
        "spriteKey": "bach_khoa_thu_sinh",
        "portraitPath": "/assets/game/characters/npc/portraits/bach_khoa_thu_sinh_v2.png",
        "x": 740,
        "y": 480,
        "prompt": "[E] Thỉnh Giáo Bách Khoa thư Sinh Đinh Ngọc Khánh",
        "dialogueIntro": "Chào sư đệ/sư muội! Đại học không nhàn như giang hồ đồn đâu các đệ... Nhưng qua được ải THPT này, thiên hạ sẽ mở rộng trước mắt! Có gì vướng mắc về bẫy thi cử hay kỹ năng thực chiến, cứ hỏi ta!"
      },
      {
        "id": "ho_phap_phuong_tu",
        "name": "Hộ Pháp Phương Tú",
        "title": "Hộ Pháp Từ Vựng & Trưởng Thành",
        "elementColor": "#59caa0",
        "spriteKey": "ho_phap_phuong_tu",
        "portraitPath": "/assets/game/characters/npc/portraits/ho_phap_phuong_tu.png",
        "x": 920,
        "y": 560,
        "prompt": "[E] Tham Vấn Hộ Pháp Phương Tú",
        "dialogueIntro": "Tàng Kinh Các lưu giữ toàn bộ bí điển từ vựng của EDUCATION OPTIONS FOR SCHOOL-LEAVERS. Hãy lĩnh hội từng câu chữ để tích lũy công lực căn bản!"
      },
      {
        "id": "ho_phap_dang_tran_ha",
        "name": "Hộ Pháp Đặng Trần Hà",
        "title": "Hộ Pháp Ngữ Pháp & Thách Đấu",
        "elementColor": "#60a5fa",
        "spriteKey": "ho_phap_dang_tran_ha",
        "portraitPath": "/assets/game/characters/npc/portraits/ho_phap_dang_tran_ha.png",
        "x": 1850,
        "y": 560,
        "prompt": "[E] Bái Kiến Hộ Pháp Đặng Trần Hà",
        "dialogueIntro": "Ngữ pháp là xương sống của kiếm chiêu! Muốn phá phong ấn thạch trận của EDUCATION OPTIONS FOR SCHOOL-LEAVERS, tâm ý phải chuẩn xác, cú pháp không được sai lệch một ly!"
      },
      {
        "id": "ho_phap_hoang_van",
        "name": "Hộ Pháp Hoàng Vân",
        "title": "Hộ Pháp Nghe & Nhịp Điệu",
        "elementColor": "#fbbf24",
        "spriteKey": "ho_phap_hoang_van",
        "portraitPath": "/assets/game/characters/npc/portraits/ho_phap_hoang_van.png",
        "x": 2400,
        "y": 760,
        "prompt": "[E] Thỉnh Giáo Hộ Pháp Hoàng Vân",
        "dialogueIntro": "Lắng nghe âm điệu tự nhiên, nghe rõ từng ngữ âm để thấu suốt chiêu thức địch nhân. Hãy vào Võ Luyện Đài luyện tập cùng ta!"
      },
      {
        "id": "ho_phap_nguyet_nguyen",
        "name": "Hộ Pháp Nguyệt Nguyên",
        "title": "Hộ Pháp Đọc Hiểu & Minh Triết",
        "elementColor": "#38bdf8",
        "spriteKey": "ho_phap_nguyet_nguyen",
        "portraitPath": "/assets/game/characters/npc/portraits/ho_phap_nguyet_nguyen.png",
        "x": 660,
        "y": 1260,
        "prompt": "[E] Luận Đạo Hộ Pháp Nguyệt Nguyên",
        "dialogueIntro": "Minh Triết Các soi rọi chân lý. Khi đối mặt với thuật ngụy tạo và mê trận thông tin của EDUCATION OPTIONS FOR SCHOOL-LEAVERS, hãy tìm đúng câu bằng chứng để phá tan ảo ảnh!"
      }
    ],
    "props": [
        {
                "id": "g11-u07_theme_prop",
                "name": "craft apprenticeship toolkit",
                "path": "/assets/game/units/grade-11/unit-07/props/theme_prop.png",
                "x": 1380,
                "y": 580,
                "size": [
                        160,
                        160
                ],
                "category": "vocab_discovery"
        },
        {
                "id": "g11-u07_academy_signpost",
                "name": "three-way wooden academy signpost with blank plaques",
                "path": "/assets/game/units/grade-11/unit-07/props/academy_signpost.png",
                "x": 860,
                "y": 1300,
                "size": [
                        160,
                        160
                ],
                "category": "quest_clue"
        }
      ],
    "enemies": [
        {
                "encounterId": "g11-u07_enc_scout",
                "enemyId": "scout",
                "name": "Lạc Lối Khảo Sinh",
                "title": "Tà Binh Tuần Tra",
                "concept": "swift human scout with a short blade and light Vietnamese clothing; motifs: confusing path signs, false diplomas and shadowy recruiters; no readable text",
                "spritePath": "/assets/game/units/grade-11/unit-07/enemies/scout.png",
                "x": 1450,
                "y": 1050,
                "patrolRange": {
                        "minX": 1380,
                        "maxX": 1540
                },
                "hp": 190,
                "maxHp": 190,
                "attack": 23,
                "defense": 13,
                "xpReward": 136,
                "combatMode": "lost_word",
                "learningSkill": "Đoạt Lại Vong Từ (Từ Vựng & Cụm Từ Cốt Lõi)",
                "difficulty": "easy",
                "requiredQuestionsCount": 1,
                "winCondition": "Điền chính xác từ khuyết thiếu để đoạt lại vong từ",
                "tutorialBriefing": "Đoạt Lại Vong Từ: Kẻ địch che giấu một từ vựng trọng tâm. Dùng manh mối gợi ý và kiến thức để điền chính xác!"
        },
        {
                "encounterId": "g11-u07_enc_ranged",
                "enemyId": "ranged",
                "name": "Huyễn Mộng Xạ Thủ",
                "title": "Tà Binh Tuần Tra",
                "concept": "human ranged attacker with a bamboo bow or sling; motifs: confusing path signs, false diplomas and shadowy recruiters; no readable text",
                "spritePath": "/assets/game/units/grade-11/unit-07/enemies/ranged.png",
                "x": 1950,
                "y": 1050,
                "patrolRange": {
                        "minX": 1870,
                        "maxX": 2030
                },
                "hp": 205,
                "maxHp": 205,
                "attack": 25,
                "defense": 14,
                "xpReward": 146,
                "combatMode": "listening_pursuit",
                "learningSkill": "Mê Âm Truy Kích (Luyện Nghe & Nhận Diện Ngữ Âm)",
                "difficulty": "easy",
                "requiredQuestionsCount": 1,
                "winCondition": "Lắng nghe thông điệp âm thanh và nhận diện chính xác yếu nghĩa",
                "tutorialBriefing": "Mê Âm Truy Kích: Kẻ địch truyền âm huyễn hoặc! Bấm nút Nghe để phát âm thanh khẩu quyết và giải mã ý nghĩa!"
        },
        {
                "encounterId": "g11-u07_enc_brute",
                "enemyId": "brute",
                "name": "Xiềng Xích Hộ Môn",
                "title": "Tà Binh Tuần Tra",
                "concept": "large armored bruiser with a heavy club; motifs: confusing path signs, false diplomas and shadowy recruiters; no readable text",
                "spritePath": "/assets/game/units/grade-11/unit-07/enemies/brute.png",
                "x": 2450,
                "y": 1150,
                "patrolRange": {
                        "minX": 2370,
                        "maxX": 2530
                },
                "hp": 220,
                "maxHp": 220,
                "attack": 27,
                "defense": 15,
                "xpReward": 156,
                "combatMode": "unseal",
                "learningSkill": "Phá Phong Ấn (Cấu Trúc Cú Pháp & Trật Tự Câu)",
                "difficulty": "medium",
                "requiredQuestionsCount": 1,
                "winCondition": "Sắp xếp các phiến đá từ ngữ thành câu đúng ngữ pháp",
                "tutorialBriefing": "Phá Phong Ấn: Giáp hộ thân của Thạch Nhân chỉ bị phá vỡ khi sắp xếp các từ ngữ theo đúng trật tự cú pháp!"
        },
        {
                "encounterId": "g11-u07_enc_construct",
                "enemyId": "construct",
                "name": "Cấm Viện Khôi Lỗi",
                "title": "Tà Binh Tuần Tra",
                "concept": "nonhuman golem assembled from the unit's material motifs; motifs: confusing path signs, false diplomas and shadowy recruiters; no readable text",
                "spritePath": "/assets/game/units/grade-11/unit-07/enemies/construct.png",
                "x": 2850,
                "y": 1300,
                "patrolRange": {
                        "minX": 2770,
                        "maxX": 2930
                },
                "hp": 235,
                "maxHp": 235,
                "attack": 29,
                "defense": 16,
                "xpReward": 166,
                "combatMode": "deception_pierce",
                "learningSkill": "Thiên Diện Phá Ảo (Đọc Hiểu & Định Vị Câu Dẫn Chứng)",
                "difficulty": "medium",
                "requiredQuestionsCount": 1,
                "winCondition": "Chọn đáp án đúng VÀ định vị đúng câu dẫn chứng [1]-[4]",
                "tutorialBriefing": "Thiên Diện Phá Ảo: Ảo ảnh che mắt! Đọc kỹ đoạn văn bản, chọn đáp án đúng và bấm chọn đúng CÂU DẪN CHỨNG [1]-[4]!"
        },
        {
                "encounterId": "g11-u07_enc_spirit",
                "enemyId": "spirit",
                "name": "Mông Lung Oán Linh",
                "title": "Tà Binh Tuần Tra",
                "concept": "eerie floating nonhuman spirit formed from the unit's motifs; motifs: confusing path signs, false diplomas and shadowy recruiters; no readable text",
                "spritePath": "/assets/game/units/grade-11/unit-07/enemies/spirit.png",
                "x": 1750,
                "y": 1380,
                "patrolRange": {
                        "minX": 1670,
                        "maxX": 1830
                },
                "hp": 250,
                "maxHp": 250,
                "attack": 31,
                "defense": 17,
                "xpReward": 176,
                "combatMode": "escort_dialogue",
                "learningSkill": "Hộ Tống Hội Thoại (Giao Tiếp Tình Huống & Phản Hồi Chiến Thuật)",
                "difficulty": "medium",
                "requiredQuestionsCount": 1,
                "winCondition": "Lựa chọn câu đối đáp thấu tình đạt lý, kích hoạt khiên hộ thể",
                "tutorialBriefing": "Hộ Tống Hội Thoại: Đối thủ dùng lời kích động tâm trí! Chọn phương án đối đáp chuẩn mực để kích hoạt khiên bảo hộ!"
        },
        {
                "encounterId": "g11-u07_enc_elite",
                "enemyId": "elite",
                "name": "Trở Ngại Viện Trưởng",
                "title": "Hộ Vệ Tinh Anh",
                "concept": "elite commander with ornate armor and distinctive polearm; motifs: confusing path signs, false diplomas and shadowy recruiters; no readable text",
                "spritePath": "/assets/game/units/grade-11/unit-07/enemies/elite.png",
                "x": 2250,
                "y": 1450,
                "patrolRange": {
                        "minX": 2170,
                        "maxX": 2330
                },
                "hp": 325,
                "maxHp": 325,
                "attack": 38,
                "defense": 17,
                "xpReward": 285,
                "combatMode": "triple_combo",
                "learningSkill": "Liên Hoàn Tam Chiêu (Tổng Hợp Nghe - Hiểu - Xuất Chiêu)",
                "difficulty": "hard",
                "requiredQuestionsCount": 1,
                "winCondition": "Hoàn thành chuỗi 3 chiêu thức: Thính âm -> Luận giải -> Xuất chiêu phá trận",
                "tutorialBriefing": "Liên Hoàn Tam Chiêu: Hộ vệ tinh anh sở hữu kiếm pháp liên hoàn! Hoàn thành liên tiếp 3 chiêu thức để trảm địch!"
        },
        {
                "encounterId": "g11-u07_enc_false_certificate_wraith",
                "enemyId": "false_certificate_wraith",
                "name": "Hư Danh Oán Linh",
                "title": "Hộ Vệ Tinh Anh",
                "concept": "a floating false-certificate phantom made of blank scroll ribbons and broken wax seals, no readable writing",
                "spritePath": "/assets/game/units/grade-11/unit-07/enemies/false_certificate_wraith.png",
                "x": 1350,
                "y": 1450,
                "patrolRange": {
                        "minX": 1270,
                        "maxX": 1430
                },
                "hp": 325,
                "maxHp": 325,
                "attack": 38,
                "defense": 17,
                "xpReward": 285,
                "combatMode": "deception_pierce",
                "learningSkill": "Thiên Diện Phá Ảo (Đọc Hiểu & Phá Bẫy Ngụy Tạo)",
                "difficulty": "hard",
                "requiredQuestionsCount": 1,
                "winCondition": "Giải mã bản văn tịch cổ và chỉ ra câu bằng chứng",
                "tutorialBriefing": "Thiên Diện Phá Ảo: Chướng khí biến ảo khôn lường! Đọc văn tịch và xác định đúng câu dẫn chứng để trừ tà!"
        }
      ],
    "climax": {
      "hasRealBoss": false,
      "encounterId": "g11-u07_climax_7",
      "enemy": {
          "id": "climax_g11-u07",
        "name": "Thủ Trận Tinh Anh - EDUCATION OPTIONS FOR SCHOOL-LEAVERS",
        "title": "Trấn Thủ Trận Đỉnh Điểm",
        "spriteKey": "/assets/game/units/grade-11/unit-07/enemies/false_certificate_wraith.png",
        "hp": 420,
        "maxHp": 420,
        "attack": 40,
        "defense": 19,
        "xpReward": 495,
        "isBoss": false,
        "bossPhase": 1,
        "dialogueIntro": "“Ta là Thủ Trận Tinh Anh trấn giữ thạch trận đỉnh điểm của EDUCATION OPTIONS FOR SCHOOL-LEAVERS. Hãy dốc toàn lực chiến thắng để chứng minh sự tinh thông!”",
        "dialoguePhase2": "“Ngươi quả thực có thực lực! Đỡ chiêu biến hóa cuối cùng này!”",
        "combatMode": "triple_combo",
        "learningSkill": "Quyết Chiến Thủ Trận Tinh Anh (Thạch Trận Đỉnh Điểm)",
        "difficulty": "hard",
        "requiredQuestionsCount": 1,
        "winCondition": "Đánh bại Thủ Trận Tinh Anh để giải phóng toàn bộ Unit",
        "tutorialBriefing": "Phong Ấn Trận Đỉnh Điểm: Hoàn thành Liên Hoàn Tam Chiêu để phá tan kết giới, hoàn thành Unit và mở ra cảnh giới mới!"
        },
      "x": 1600,
      "y": 1720,
      "barrierPrompt": "🔒 Phong Ấn Trận Đỉnh Điểm (Cần >= 70% tiến độ)",
      "unlockedPrompt": "⚡ Phong Ấn Đỉnh Điểm ĐÃ MỞ! Thách đấu Thủ Trận Tinh Anh!"
    }
  },
  "g11-u08": {
    "unitId": "g11-u08",
    "grade": 11,
    "unitNumber": 8,
    "title": "BECOMING INDEPENDENT",
    "topic": "Life Skills, Self-reliance, Decision Making and Personal Discipline",
    "mapWidth": 3200,
    "mapHeight": 2000,
    "ground": {
      "primaryPath": "/assets/game/units/grade-11/unit-08/ground/main_ground.png",
      "secondaryPath": "/assets/game/units/grade-11/unit-08/ground/mountain_trail_gravel.png",
      "tileable": false
    },
    "npcs": [
      {
        "id": "bang_chu",
        "name": "Hồng y tông chủ Hà Ánh Phượng",
        "title": "Lãnh Tụ Võ Lâm Chính Phái",
        "elementColor": "#fbe285",
        "spriteKey": "bang_chu_ha_anh_phuong",
        "portraitPath": "/assets/game/characters/npc/portraits/bang_chu_ha_anh_phuong.png",
        "x": 550,
        "y": 560,
        "prompt": "[E] Bái kiến Hồng y tông chủ Hà Ánh Phượng",
        "dialogueIntro": "Chào mừng thiếu hiệp! Hôm nay chúng ta cùng khám phá Unit 8: BECOMING INDEPENDENT (Life Skills, Self-reliance, Decision Making and Personal Discipline). Hãy rèn luyện võ học, giải trừ ma chướng!"
      },
      {
        "id": "bach_khoa_thu_sinh",
        "name": "Bách Khoa thư Sinh Đinh Ngọc Khánh",
        "title": "Đại Sư Huynh Tông Môn",
        "elementColor": "#c084fc",
        "spriteKey": "bach_khoa_thu_sinh",
        "portraitPath": "/assets/game/characters/npc/portraits/bach_khoa_thu_sinh_v2.png",
        "x": 740,
        "y": 480,
        "prompt": "[E] Thỉnh Giáo Bách Khoa thư Sinh Đinh Ngọc Khánh",
        "dialogueIntro": "Chào sư đệ/sư muội! Đại học không nhàn như giang hồ đồn đâu các đệ... Nhưng qua được ải THPT này, thiên hạ sẽ mở rộng trước mắt! Có gì vướng mắc về bẫy thi cử hay kỹ năng thực chiến, cứ hỏi ta!"
      },
      {
        "id": "ho_phap_phuong_tu",
        "name": "Hộ Pháp Phương Tú",
        "title": "Hộ Pháp Từ Vựng & Trưởng Thành",
        "elementColor": "#59caa0",
        "spriteKey": "ho_phap_phuong_tu",
        "portraitPath": "/assets/game/characters/npc/portraits/ho_phap_phuong_tu.png",
        "x": 920,
        "y": 560,
        "prompt": "[E] Tham Vấn Hộ Pháp Phương Tú",
        "dialogueIntro": "Tàng Kinh Các lưu giữ toàn bộ bí điển từ vựng của BECOMING INDEPENDENT. Hãy lĩnh hội từng câu chữ để tích lũy công lực căn bản!"
      },
      {
        "id": "ho_phap_dang_tran_ha",
        "name": "Hộ Pháp Đặng Trần Hà",
        "title": "Hộ Pháp Ngữ Pháp & Thách Đấu",
        "elementColor": "#60a5fa",
        "spriteKey": "ho_phap_dang_tran_ha",
        "portraitPath": "/assets/game/characters/npc/portraits/ho_phap_dang_tran_ha.png",
        "x": 1850,
        "y": 560,
        "prompt": "[E] Bái Kiến Hộ Pháp Đặng Trần Hà",
        "dialogueIntro": "Ngữ pháp là xương sống của kiếm chiêu! Muốn phá phong ấn thạch trận của BECOMING INDEPENDENT, tâm ý phải chuẩn xác, cú pháp không được sai lệch một ly!"
      },
      {
        "id": "ho_phap_hoang_van",
        "name": "Hộ Pháp Hoàng Vân",
        "title": "Hộ Pháp Nghe & Nhịp Điệu",
        "elementColor": "#fbbf24",
        "spriteKey": "ho_phap_hoang_van",
        "portraitPath": "/assets/game/characters/npc/portraits/ho_phap_hoang_van.png",
        "x": 2400,
        "y": 760,
        "prompt": "[E] Thỉnh Giáo Hộ Pháp Hoàng Vân",
        "dialogueIntro": "Lắng nghe âm điệu tự nhiên, nghe rõ từng ngữ âm để thấu suốt chiêu thức địch nhân. Hãy vào Võ Luyện Đài luyện tập cùng ta!"
      },
      {
        "id": "ho_phap_nguyet_nguyen",
        "name": "Hộ Pháp Nguyệt Nguyên",
        "title": "Hộ Pháp Đọc Hiểu & Minh Triết",
        "elementColor": "#38bdf8",
        "spriteKey": "ho_phap_nguyet_nguyen",
        "portraitPath": "/assets/game/characters/npc/portraits/ho_phap_nguyet_nguyen.png",
        "x": 660,
        "y": 1260,
        "prompt": "[E] Luận Đạo Hộ Pháp Nguyệt Nguyên",
        "dialogueIntro": "Minh Triết Các soi rọi chân lý. Khi đối mặt với thuật ngụy tạo và mê trận thông tin của BECOMING INDEPENDENT, hãy tìm đúng câu bằng chứng để phá tan ảo ảnh!"
      }
    ],
    "props": [
        {
                "id": "g11-u08_theme_prop",
                "name": "traveler backpack and compass",
                "path": "/assets/game/units/grade-11/unit-08/props/theme_prop.png",
                "x": 1380,
                "y": 580,
                "size": [
                        160,
                        160
                ],
                "category": "vocab_discovery"
        },
        {
                "id": "g11-u08_road_milestone",
                "name": "small carved roadside stone milestone with no text",
                "path": "/assets/game/units/grade-11/unit-08/props/road_milestone.png",
                "x": 860,
                "y": 1300,
                "size": [
                        160,
                        160
                ],
                "category": "reading_clue"
        }
      ],
    "enemies": [
        {
                "encounterId": "g11-u08_enc_scout",
                "enemyId": "scout",
                "name": "Ỷ Lại Ma Đồ",
                "title": "Tà Binh Tuần Tra",
                "concept": "swift road scout with lost-map motifs and traveler satchel",
                "spritePath": "/assets/game/units/grade-11/unit-08/enemies/scout.png",
                "x": 1450,
                "y": 1050,
                "patrolRange": {
                        "minX": 1380,
                        "maxX": 1540
                },
                "hp": 200,
                "maxHp": 200,
                "attack": 24,
                "defense": 14,
                "xpReward": 144,
                "combatMode": "lost_word",
                "learningSkill": "Đoạt Lại Vong Từ (Từ Vựng & Cụm Từ Cốt Lõi)",
                "difficulty": "easy",
                "requiredQuestionsCount": 1,
                "winCondition": "Điền chính xác từ khuyết thiếu để đoạt lại vong từ",
                "tutorialBriefing": "Đoạt Lại Vong Từ: Kẻ địch che giấu một từ vựng trọng tâm. Dùng manh mối gợi ý và kiến thức để điền chính xác!"
        },
        {
                "encounterId": "g11-u08_enc_ranged",
                "enemyId": "ranged",
                "name": "Lạc Hướng Xạ Nhân",
                "title": "Tà Binh Tuần Tra",
                "concept": "human ranged attacker with a bamboo bow or sling; motifs: lost-map phantoms, deceptive signposts and road bandits",
                "spritePath": "/assets/game/units/grade-11/unit-08/enemies/ranged.png",
                "x": 1950,
                "y": 1050,
                "patrolRange": {
                        "minX": 1870,
                        "maxX": 2030
                },
                "hp": 215,
                "maxHp": 215,
                "attack": 26,
                "defense": 15,
                "xpReward": 154,
                "combatMode": "listening_pursuit",
                "learningSkill": "Mê Âm Truy Kích (Luyện Nghe & Nhận Diện Ngữ Âm)",
                "difficulty": "easy",
                "requiredQuestionsCount": 1,
                "winCondition": "Lắng nghe thông điệp âm thanh và nhận diện chính xác yếu nghĩa",
                "tutorialBriefing": "Mê Âm Truy Kích: Kẻ địch truyền âm huyễn hoặc! Bấm nút Nghe để phát âm thanh khẩu quyết và giải mã ý nghĩa!"
        },
        {
                "encounterId": "g11-u08_enc_brute",
                "enemyId": "brute",
                "name": "Bó Buộc Trọng Binh",
                "title": "Tà Binh Tuần Tra",
                "concept": "large armored bruiser with a heavy club; motifs: lost-map phantoms, deceptive signposts and road bandits",
                "spritePath": "/assets/game/units/grade-11/unit-08/enemies/brute.png",
                "x": 2450,
                "y": 1150,
                "patrolRange": {
                        "minX": 2370,
                        "maxX": 2530
                },
                "hp": 230,
                "maxHp": 230,
                "attack": 28,
                "defense": 16,
                "xpReward": 164,
                "combatMode": "unseal",
                "learningSkill": "Phá Phong Ấn (Cấu Trúc Cú Pháp & Trật Tự Câu)",
                "difficulty": "medium",
                "requiredQuestionsCount": 1,
                "winCondition": "Sắp xếp các phiến đá từ ngữ thành câu đúng ngữ pháp",
                "tutorialBriefing": "Phá Phong Ấn: Giáp hộ thân của Thạch Nhân chỉ bị phá vỡ khi sắp xếp các từ ngữ theo đúng trật tự cú pháp!"
        },
        {
                "encounterId": "g11-u08_enc_construct",
                "enemyId": "construct",
                "name": "Cương Cực Cơ Quan",
                "title": "Tà Binh Tuần Tra",
                "concept": "nonhuman golem assembled from the unit's material motifs; motifs: lost-map phantoms, deceptive signposts and road bandits",
                "spritePath": "/assets/game/units/grade-11/unit-08/enemies/construct.png",
                "x": 2850,
                "y": 1300,
                "patrolRange": {
                        "minX": 2770,
                        "maxX": 2930
                },
                "hp": 245,
                "maxHp": 245,
                "attack": 30,
                "defense": 17,
                "xpReward": 174,
                "combatMode": "deception_pierce",
                "learningSkill": "Thiên Diện Phá Ảo (Đọc Hiểu & Định Vị Câu Dẫn Chứng)",
                "difficulty": "medium",
                "requiredQuestionsCount": 1,
                "winCondition": "Chọn đáp án đúng VÀ định vị đúng câu dẫn chứng [1]-[4]",
                "tutorialBriefing": "Thiên Diện Phá Ảo: Ảo ảnh che mắt! Đọc kỹ đoạn văn bản, chọn đáp án đúng và bấm chọn đúng CÂU DẪN CHỨNG [1]-[4]!"
        },
        {
                "encounterId": "g11-u08_enc_spirit",
                "enemyId": "spirit",
                "name": "Sợ Hãi Huyễn Ảnh",
                "title": "Tà Binh Tuần Tra",
                "concept": "eerie floating nonhuman spirit formed from the unit's motifs; motifs: lost-map phantoms, deceptive signposts and road bandits",
                "spritePath": "/assets/game/units/grade-11/unit-08/enemies/spirit.png",
                "x": 1750,
                "y": 1380,
                "patrolRange": {
                        "minX": 1670,
                        "maxX": 1830
                },
                "hp": 260,
                "maxHp": 260,
                "attack": 32,
                "defense": 18,
                "xpReward": 184,
                "combatMode": "escort_dialogue",
                "learningSkill": "Hộ Tống Hội Thoại (Giao Tiếp Tình Huống & Phản Hồi Chiến Thuật)",
                "difficulty": "medium",
                "requiredQuestionsCount": 1,
                "winCondition": "Lựa chọn câu đối đáp thấu tình đạt lý, kích hoạt khiên hộ thể",
                "tutorialBriefing": "Hộ Tống Hội Thoại: Đối thủ dùng lời kích động tâm trí! Chọn phương án đối đáp chuẩn mực để kích hoạt khiên bảo hộ!"
        },
        {
                "encounterId": "g11-u08_enc_elite",
                "enemyId": "elite",
                "name": "Băng Phong Tôn Giả",
                "title": "Hộ Vệ Tinh Anh",
                "concept": "elite commander with ornate armor and distinctive polearm; motifs: lost-map phantoms, deceptive signposts and road bandits",
                "spritePath": "/assets/game/units/grade-11/unit-08/enemies/elite.png",
                "x": 2250,
                "y": 1450,
                "patrolRange": {
                        "minX": 2170,
                        "maxX": 2330
                },
                "hp": 340,
                "maxHp": 340,
                "attack": 40,
                "defense": 18,
                "xpReward": 300,
                "combatMode": "triple_combo",
                "learningSkill": "Liên Hoàn Tam Chiêu (Tổng Hợp Nghe - Hiểu - Xuất Chiêu)",
                "difficulty": "hard",
                "requiredQuestionsCount": 1,
                "winCondition": "Hoàn thành chuỗi 3 chiêu thức: Thính âm -> Luận giải -> Xuất chiêu phá trận",
                "tutorialBriefing": "Liên Hoàn Tam Chiêu: Hộ vệ tinh anh sở hữu kiếm pháp liên hoàn! Hoàn thành liên tiếp 3 chiêu thức để trảm địch!"
        },
        {
                "encounterId": "g11-u08_enc_compass_golem",
                "enemyId": "compass_golem",
                "name": "La Bàn Thạch Nhân",
                "title": "Hộ Vệ Tinh Anh",
                "concept": "a deceptive stone-and-bronze compass golem with shifting arrows and road dust",
                "spritePath": "/assets/game/units/grade-11/unit-08/enemies/compass_golem.png",
                "x": 1350,
                "y": 1450,
                "patrolRange": {
                        "minX": 1270,
                        "maxX": 1430
                },
                "hp": 340,
                "maxHp": 340,
                "attack": 40,
                "defense": 18,
                "xpReward": 300,
                "combatMode": "deception_pierce",
                "learningSkill": "Thiên Diện Phá Ảo (Đọc Hiểu & Phá Bẫy Ngụy Tạo)",
                "difficulty": "hard",
                "requiredQuestionsCount": 1,
                "winCondition": "Giải mã bản văn tịch cổ và chỉ ra câu bằng chứng",
                "tutorialBriefing": "Thiên Diện Phá Ảo: Chướng khí biến ảo khôn lường! Đọc văn tịch và xác định đúng câu dẫn chứng để trừ tà!"
        }
      ],
    "climax": {
      "hasRealBoss": false,
      "encounterId": "g11-u08_climax_8",
      "enemy": {
          "id": "climax_g11-u08",
        "name": "Thủ Trận Tinh Anh - BECOMING INDEPENDENT",
        "title": "Trấn Thủ Trận Đỉnh Điểm",
        "spriteKey": "/assets/game/units/grade-11/unit-08/enemies/compass_golem.png",
        "hp": 440,
        "maxHp": 440,
        "attack": 42,
        "defense": 20,
        "xpReward": 520,
        "isBoss": false,
        "bossPhase": 1,
        "dialogueIntro": "“Ta là Thủ Trận Tinh Anh trấn giữ thạch trận đỉnh điểm của BECOMING INDEPENDENT. Hãy dốc toàn lực chiến thắng để chứng minh sự tinh thông!”",
        "dialoguePhase2": "“Ngươi quả thực có thực lực! Đỡ chiêu biến hóa cuối cùng này!”",
        "combatMode": "triple_combo",
        "learningSkill": "Quyết Chiến Thủ Trận Tinh Anh (Thạch Trận Đỉnh Điểm)",
        "difficulty": "hard",
        "requiredQuestionsCount": 1,
        "winCondition": "Đánh bại Thủ Trận Tinh Anh để giải phóng toàn bộ Unit",
        "tutorialBriefing": "Phong Ấn Trận Đỉnh Điểm: Hoàn thành Liên Hoàn Tam Chiêu để phá tan kết giới, hoàn thành Unit và mở ra cảnh giới mới!"
        },
      "x": 1600,
      "y": 1720,
      "barrierPrompt": "🔒 Phong Ấn Trận Đỉnh Điểm (Cần >= 70% tiến độ)",
      "unlockedPrompt": "⚡ Phong Ấn Đỉnh Điểm ĐÃ MỞ! Thách đấu Thủ Trận Tinh Anh!"
    }
  },
  "g11-u09": {
    "unitId": "g11-u09",
    "grade": 11,
    "unitNumber": 9,
    "title": "SOCIAL ISSUES",
    "topic": "Peer Pressure, Bullying, Cyberbullying and Teen Mental Health",
    "mapWidth": 3200,
    "mapHeight": 2000,
    "ground": {
      "primaryPath": "/assets/game/units/grade-11/unit-09/ground/main_ground.png",
      "secondaryPath": "/assets/game/units/grade-11/unit-09/ground/market_packed_dirt.png",
      "tileable": false
    },
    "npcs": [
      {
        "id": "bang_chu",
        "name": "Hồng y tông chủ Hà Ánh Phượng",
        "title": "Lãnh Tụ Võ Lâm Chính Phái",
        "elementColor": "#fbe285",
        "spriteKey": "bang_chu_ha_anh_phuong",
        "portraitPath": "/assets/game/characters/npc/portraits/bang_chu_ha_anh_phuong.png",
        "x": 550,
        "y": 560,
        "prompt": "[E] Bái kiến Hồng y tông chủ Hà Ánh Phượng",
        "dialogueIntro": "Chào mừng thiếu hiệp! Hôm nay chúng ta cùng khám phá Unit 9: SOCIAL ISSUES (Peer Pressure, Bullying, Cyberbullying and Teen Mental Health). Hãy rèn luyện võ học, giải trừ ma chướng!"
      },
      {
        "id": "bach_khoa_thu_sinh",
        "name": "Bách Khoa thư Sinh Đinh Ngọc Khánh",
        "title": "Đại Sư Huynh Tông Môn",
        "elementColor": "#c084fc",
        "spriteKey": "bach_khoa_thu_sinh",
        "portraitPath": "/assets/game/characters/npc/portraits/bach_khoa_thu_sinh_v2.png",
        "x": 740,
        "y": 480,
        "prompt": "[E] Thỉnh Giáo Bách Khoa thư Sinh Đinh Ngọc Khánh",
        "dialogueIntro": "Chào sư đệ/sư muội! Đại học không nhàn như giang hồ đồn đâu các đệ... Nhưng qua được ải THPT này, thiên hạ sẽ mở rộng trước mắt! Có gì vướng mắc về bẫy thi cử hay kỹ năng thực chiến, cứ hỏi ta!"
      },
      {
        "id": "ho_phap_phuong_tu",
        "name": "Hộ Pháp Phương Tú",
        "title": "Hộ Pháp Từ Vựng & Trưởng Thành",
        "elementColor": "#59caa0",
        "spriteKey": "ho_phap_phuong_tu",
        "portraitPath": "/assets/game/characters/npc/portraits/ho_phap_phuong_tu.png",
        "x": 920,
        "y": 560,
        "prompt": "[E] Tham Vấn Hộ Pháp Phương Tú",
        "dialogueIntro": "Tàng Kinh Các lưu giữ toàn bộ bí điển từ vựng của SOCIAL ISSUES. Hãy lĩnh hội từng câu chữ để tích lũy công lực căn bản!"
      },
      {
        "id": "ho_phap_dang_tran_ha",
        "name": "Hộ Pháp Đặng Trần Hà",
        "title": "Hộ Pháp Ngữ Pháp & Thách Đấu",
        "elementColor": "#60a5fa",
        "spriteKey": "ho_phap_dang_tran_ha",
        "portraitPath": "/assets/game/characters/npc/portraits/ho_phap_dang_tran_ha.png",
        "x": 1850,
        "y": 560,
        "prompt": "[E] Bái Kiến Hộ Pháp Đặng Trần Hà",
        "dialogueIntro": "Ngữ pháp là xương sống của kiếm chiêu! Muốn phá phong ấn thạch trận của SOCIAL ISSUES, tâm ý phải chuẩn xác, cú pháp không được sai lệch một ly!"
      },
      {
        "id": "ho_phap_hoang_van",
        "name": "Hộ Pháp Hoàng Vân",
        "title": "Hộ Pháp Nghe & Nhịp Điệu",
        "elementColor": "#fbbf24",
        "spriteKey": "ho_phap_hoang_van",
        "portraitPath": "/assets/game/characters/npc/portraits/ho_phap_hoang_van.png",
        "x": 2400,
        "y": 760,
        "prompt": "[E] Thỉnh Giáo Hộ Pháp Hoàng Vân",
        "dialogueIntro": "Lắng nghe âm điệu tự nhiên, nghe rõ từng ngữ âm để thấu suốt chiêu thức địch nhân. Hãy vào Võ Luyện Đài luyện tập cùng ta!"
      },
      {
        "id": "ho_phap_nguyet_nguyen",
        "name": "Hộ Pháp Nguyệt Nguyên",
        "title": "Hộ Pháp Đọc Hiểu & Minh Triết",
        "elementColor": "#38bdf8",
        "spriteKey": "ho_phap_nguyet_nguyen",
        "portraitPath": "/assets/game/characters/npc/portraits/ho_phap_nguyet_nguyen.png",
        "x": 660,
        "y": 1260,
        "prompt": "[E] Luận Đạo Hộ Pháp Nguyệt Nguyên",
        "dialogueIntro": "Minh Triết Các soi rọi chân lý. Khi đối mặt với thuật ngụy tạo và mê trận thông tin của SOCIAL ISSUES, hãy tìm đúng câu bằng chứng để phá tan ảo ảnh!"
      }
    ],
    "props": [
        {
                "id": "g11-u09_theme_prop",
                "name": "community aid supply chest",
                "path": "/assets/game/units/grade-11/unit-09/props/theme_prop.png",
                "x": 1380,
                "y": 580,
                "size": [
                        160,
                        160
                ],
                "category": "vocab_discovery"
        },
        {
                "id": "g11-u09_aid_notice_board",
                "name": "wooden public-aid notice board with blank paper sheets",
                "path": "/assets/game/units/grade-11/unit-09/props/aid_notice_board.png",
                "x": 860,
                "y": 1300,
                "size": [
                        160,
                        160
                ],
                "category": "quest_clue"
        }
      ],
    "enemies": [
        {
                "encounterId": "g11-u09_enc_scout",
                "enemyId": "scout",
                "name": "Khẩu Thiệt Vu Sư",
                "title": "Tà Binh Tuần Tra",
                "concept": "swift human scout with a short blade and light Vietnamese clothing; motifs: corruption chains, isolation masks and stolen market supplies",
                "spritePath": "/assets/game/units/grade-11/unit-09/enemies/scout.png",
                "x": 1450,
                "y": 1050,
                "patrolRange": {
                        "minX": 1380,
                        "maxX": 1540
                },
                "hp": 210,
                "maxHp": 210,
                "attack": 25,
                "defense": 15,
                "xpReward": 152,
                "combatMode": "lost_word",
                "learningSkill": "Đoạt Lại Vong Từ (Từ Vựng & Cụm Từ Cốt Lõi)",
                "difficulty": "easy",
                "requiredQuestionsCount": 1,
                "winCondition": "Điền chính xác từ khuyết thiếu để đoạt lại vong từ",
                "tutorialBriefing": "Đoạt Lại Vong Từ: Kẻ địch che giấu một từ vựng trọng tâm. Dùng manh mối gợi ý và kiến thức để điền chính xác!"
        },
        {
                "encounterId": "g11-u09_enc_ranged",
                "enemyId": "ranged",
                "name": "Thị Phi Xạ Thủ",
                "title": "Tà Binh Tuần Tra",
                "concept": "human ranged attacker with a bamboo bow or sling; motifs: corruption chains, isolation masks and stolen market supplies",
                "spritePath": "/assets/game/units/grade-11/unit-09/enemies/ranged.png",
                "x": 1950,
                "y": 1050,
                "patrolRange": {
                        "minX": 1870,
                        "maxX": 2030
                },
                "hp": 225,
                "maxHp": 225,
                "attack": 27,
                "defense": 16,
                "xpReward": 162,
                "combatMode": "listening_pursuit",
                "learningSkill": "Mê Âm Truy Kích (Luyện Nghe & Nhận Diện Ngữ Âm)",
                "difficulty": "easy",
                "requiredQuestionsCount": 1,
                "winCondition": "Lắng nghe thông điệp âm thanh và nhận diện chính xác yếu nghĩa",
                "tutorialBriefing": "Mê Âm Truy Kích: Kẻ địch truyền âm huyễn hoặc! Bấm nút Nghe để phát âm thanh khẩu quyết và giải mã ý nghĩa!"
        },
        {
                "encounterId": "g11-u09_enc_brute",
                "enemyId": "brute",
                "name": "Bạo Lực Hung Đồ",
                "title": "Tà Binh Tuần Tra",
                "concept": "large armored bruiser with a heavy club; motifs: corruption chains, isolation masks and stolen market supplies",
                "spritePath": "/assets/game/units/grade-11/unit-09/enemies/brute.png",
                "x": 2450,
                "y": 1150,
                "patrolRange": {
                        "minX": 2370,
                        "maxX": 2530
                },
                "hp": 240,
                "maxHp": 240,
                "attack": 29,
                "defense": 17,
                "xpReward": 172,
                "combatMode": "unseal",
                "learningSkill": "Phá Phong Ấn (Cấu Trúc Cú Pháp & Trật Tự Câu)",
                "difficulty": "medium",
                "requiredQuestionsCount": 1,
                "winCondition": "Sắp xếp các phiến đá từ ngữ thành câu đúng ngữ pháp",
                "tutorialBriefing": "Phá Phong Ấn: Giáp hộ thân của Thạch Nhân chỉ bị phá vỡ khi sắp xếp các từ ngữ theo đúng trật tự cú pháp!"
        },
        {
                "encounterId": "g11-u09_enc_construct",
                "enemyId": "construct",
                "name": "Áp Bức Khôi Lỗi",
                "title": "Tà Binh Tuần Tra",
                "concept": "nonhuman golem assembled from the unit's material motifs; motifs: corruption chains, isolation masks and stolen market supplies",
                "spritePath": "/assets/game/units/grade-11/unit-09/enemies/construct.png",
                "x": 2850,
                "y": 1300,
                "patrolRange": {
                        "minX": 2770,
                        "maxX": 2930
                },
                "hp": 255,
                "maxHp": 255,
                "attack": 31,
                "defense": 18,
                "xpReward": 182,
                "combatMode": "deception_pierce",
                "learningSkill": "Thiên Diện Phá Ảo (Đọc Hiểu & Định Vị Câu Dẫn Chứng)",
                "difficulty": "medium",
                "requiredQuestionsCount": 1,
                "winCondition": "Chọn đáp án đúng VÀ định vị đúng câu dẫn chứng [1]-[4]",
                "tutorialBriefing": "Thiên Diện Phá Ảo: Ảo ảnh che mắt! Đọc kỹ đoạn văn bản, chọn đáp án đúng và bấm chọn đúng CÂU DẪN CHỨNG [1]-[4]!"
        },
        {
                "encounterId": "g11-u09_enc_spirit",
                "enemyId": "spirit",
                "name": "Cô Lập Oán Hồn",
                "title": "Tà Binh Tuần Tra",
                "concept": "eerie floating nonhuman spirit formed from the unit's motifs; motifs: corruption chains, isolation masks and stolen market supplies",
                "spritePath": "/assets/game/units/grade-11/unit-09/enemies/spirit.png",
                "x": 1750,
                "y": 1380,
                "patrolRange": {
                        "minX": 1670,
                        "maxX": 1830
                },
                "hp": 270,
                "maxHp": 270,
                "attack": 33,
                "defense": 19,
                "xpReward": 192,
                "combatMode": "escort_dialogue",
                "learningSkill": "Hộ Tống Hội Thoại (Giao Tiếp Tình Huống & Phản Hồi Chiến Thuật)",
                "difficulty": "medium",
                "requiredQuestionsCount": 1,
                "winCondition": "Lựa chọn câu đối đáp thấu tình đạt lý, kích hoạt khiên hộ thể",
                "tutorialBriefing": "Hộ Tống Hội Thoại: Đối thủ dùng lời kích động tâm trí! Chọn phương án đối đáp chuẩn mực để kích hoạt khiên bảo hộ!"
        },
        {
                "encounterId": "g11-u09_enc_elite",
                "enemyId": "elite",
                "name": "Bắt Nạt Bá Vương",
                "title": "Hộ Vệ Tinh Anh",
                "concept": "elite commander with ornate armor and distinctive polearm; motifs: corruption chains, isolation masks and stolen market supplies",
                "spritePath": "/assets/game/units/grade-11/unit-09/enemies/elite.png",
                "x": 2250,
                "y": 1450,
                "patrolRange": {
                        "minX": 2170,
                        "maxX": 2330
                },
                "hp": 355,
                "maxHp": 355,
                "attack": 42,
                "defense": 19,
                "xpReward": 315,
                "combatMode": "triple_combo",
                "learningSkill": "Liên Hoàn Tam Chiêu (Tổng Hợp Nghe - Hiểu - Xuất Chiêu)",
                "difficulty": "hard",
                "requiredQuestionsCount": 1,
                "winCondition": "Hoàn thành chuỗi 3 chiêu thức: Thính âm -> Luận giải -> Xuất chiêu phá trận",
                "tutorialBriefing": "Liên Hoàn Tam Chiêu: Hộ vệ tinh anh sở hữu kiếm pháp liên hoàn! Hoàn thành liên tiếp 3 chiêu thức để trảm địch!"
        },
        {
                "encounterId": "g11-u09_enc_isolation_chain_beast",
                "enemyId": "isolation_chain_beast",
                "name": "Cô Lập Tỏa Liên Thú",
                "title": "Hộ Vệ Tinh Anh",
                "concept": "a hulking spirit made from tangled broken chains and abandoned market baskets, dark yet redeemable",
                "spritePath": "/assets/game/units/grade-11/unit-09/enemies/isolation_chain_beast.png",
                "x": 1350,
                "y": 1450,
                "patrolRange": {
                        "minX": 1270,
                        "maxX": 1430
                },
                "hp": 355,
                "maxHp": 355,
                "attack": 42,
                "defense": 19,
                "xpReward": 315,
                "combatMode": "deception_pierce",
                "learningSkill": "Thiên Diện Phá Ảo (Đọc Hiểu & Phá Bẫy Ngụy Tạo)",
                "difficulty": "hard",
                "requiredQuestionsCount": 1,
                "winCondition": "Giải mã bản văn tịch cổ và chỉ ra câu bằng chứng",
                "tutorialBriefing": "Thiên Diện Phá Ảo: Chướng khí biến ảo khôn lường! Đọc văn tịch và xác định đúng câu dẫn chứng để trừ tà!"
        }
      ],
    "climax": {
      "hasRealBoss": false,
      "encounterId": "g11-u09_climax_9",
      "enemy": {
          "id": "climax_g11-u09",
        "name": "Thủ Trận Tinh Anh - SOCIAL ISSUES",
        "title": "Trấn Thủ Trận Đỉnh Điểm",
        "spriteKey": "/assets/game/units/grade-11/unit-09/enemies/isolation_chain_beast.png",
        "hp": 460,
        "maxHp": 460,
        "attack": 44,
        "defense": 21,
        "xpReward": 545,
        "isBoss": false,
        "bossPhase": 1,
        "dialogueIntro": "“Ta là Thủ Trận Tinh Anh trấn giữ thạch trận đỉnh điểm của SOCIAL ISSUES. Hãy dốc toàn lực chiến thắng để chứng minh sự tinh thông!”",
        "dialoguePhase2": "“Ngươi quả thực có thực lực! Đỡ chiêu biến hóa cuối cùng này!”",
        "combatMode": "triple_combo",
        "learningSkill": "Quyết Chiến Thủ Trận Tinh Anh (Thạch Trận Đỉnh Điểm)",
        "difficulty": "hard",
        "requiredQuestionsCount": 1,
        "winCondition": "Đánh bại Thủ Trận Tinh Anh để giải phóng toàn bộ Unit",
        "tutorialBriefing": "Phong Ấn Trận Đỉnh Điểm: Hoàn thành Liên Hoàn Tam Chiêu để phá tan kết giới, hoàn thành Unit và mở ra cảnh giới mới!"
        },
      "x": 1600,
      "y": 1720,
      "barrierPrompt": "🔒 Phong Ấn Trận Đỉnh Điểm (Cần >= 70% tiến độ)",
      "unlockedPrompt": "⚡ Phong Ấn Đỉnh Điểm ĐÃ MỞ! Thách đấu Thủ Trận Tinh Anh!"
    }
  },
  "g11-u10": {
    "unitId": "g11-u10",
    "grade": 11,
    "unitNumber": 10,
    "title": "THE ECOSYSTEM",
    "topic": "Ecosystems, Biodiversity, Food Chains and Conservation",
    "mapWidth": 3200,
    "mapHeight": 2000,
    "ground": {
      "primaryPath": "/assets/game/units/grade-11/unit-10/ground/main_ground.png",
      "secondaryPath": "/assets/game/units/grade-11/unit-10/ground/wetland_water.png",
      "tileable": false
    },
    "npcs": [
      {
        "id": "bang_chu",
        "name": "Hồng y tông chủ Hà Ánh Phượng",
        "title": "Lãnh Tụ Võ Lâm Chính Phái",
        "elementColor": "#fbe285",
        "spriteKey": "bang_chu_ha_anh_phuong",
        "portraitPath": "/assets/game/characters/npc/portraits/bang_chu_ha_anh_phuong.png",
        "x": 550,
        "y": 560,
        "prompt": "[E] Bái kiến Hồng y tông chủ Hà Ánh Phượng",
        "dialogueIntro": "Chào mừng thiếu hiệp! Hôm nay chúng ta cùng khám phá Unit 10: THE ECOSYSTEM (Ecosystems, Biodiversity, Food Chains and Conservation). Hãy rèn luyện võ học, giải trừ ma chướng!"
      },
      {
        "id": "bach_khoa_thu_sinh",
        "name": "Bách Khoa thư Sinh Đinh Ngọc Khánh",
        "title": "Đại Sư Huynh Tông Môn",
        "elementColor": "#c084fc",
        "spriteKey": "bach_khoa_thu_sinh",
        "portraitPath": "/assets/game/characters/npc/portraits/bach_khoa_thu_sinh_v2.png",
        "x": 740,
        "y": 480,
        "prompt": "[E] Thỉnh Giáo Bách Khoa thư Sinh Đinh Ngọc Khánh",
        "dialogueIntro": "Chào sư đệ/sư muội! Đại học không nhàn như giang hồ đồn đâu các đệ... Nhưng qua được ải THPT này, thiên hạ sẽ mở rộng trước mắt! Có gì vướng mắc về bẫy thi cử hay kỹ năng thực chiến, cứ hỏi ta!"
      },
      {
        "id": "ho_phap_phuong_tu",
        "name": "Hộ Pháp Phương Tú",
        "title": "Hộ Pháp Từ Vựng & Trưởng Thành",
        "elementColor": "#59caa0",
        "spriteKey": "ho_phap_phuong_tu",
        "portraitPath": "/assets/game/characters/npc/portraits/ho_phap_phuong_tu.png",
        "x": 920,
        "y": 560,
        "prompt": "[E] Tham Vấn Hộ Pháp Phương Tú",
        "dialogueIntro": "Tàng Kinh Các lưu giữ toàn bộ bí điển từ vựng của THE ECOSYSTEM. Hãy lĩnh hội từng câu chữ để tích lũy công lực căn bản!"
      },
      {
        "id": "ho_phap_dang_tran_ha",
        "name": "Hộ Pháp Đặng Trần Hà",
        "title": "Hộ Pháp Ngữ Pháp & Thách Đấu",
        "elementColor": "#60a5fa",
        "spriteKey": "ho_phap_dang_tran_ha",
        "portraitPath": "/assets/game/characters/npc/portraits/ho_phap_dang_tran_ha.png",
        "x": 1850,
        "y": 560,
        "prompt": "[E] Bái Kiến Hộ Pháp Đặng Trần Hà",
        "dialogueIntro": "Ngữ pháp là xương sống của kiếm chiêu! Muốn phá phong ấn thạch trận của THE ECOSYSTEM, tâm ý phải chuẩn xác, cú pháp không được sai lệch một ly!"
      },
      {
        "id": "ho_phap_hoang_van",
        "name": "Hộ Pháp Hoàng Vân",
        "title": "Hộ Pháp Nghe & Nhịp Điệu",
        "elementColor": "#fbbf24",
        "spriteKey": "ho_phap_hoang_van",
        "portraitPath": "/assets/game/characters/npc/portraits/ho_phap_hoang_van.png",
        "x": 2400,
        "y": 760,
        "prompt": "[E] Thỉnh Giáo Hộ Pháp Hoàng Vân",
        "dialogueIntro": "Lắng nghe âm điệu tự nhiên, nghe rõ từng ngữ âm để thấu suốt chiêu thức địch nhân. Hãy vào Võ Luyện Đài luyện tập cùng ta!"
      },
      {
        "id": "ho_phap_nguyet_nguyen",
        "name": "Hộ Pháp Nguyệt Nguyên",
        "title": "Hộ Pháp Đọc Hiểu & Minh Triết",
        "elementColor": "#38bdf8",
        "spriteKey": "ho_phap_nguyet_nguyen",
        "portraitPath": "/assets/game/characters/npc/portraits/ho_phap_nguyet_nguyen.png",
        "x": 660,
        "y": 1260,
        "prompt": "[E] Luận Đạo Hộ Pháp Nguyệt Nguyên",
        "dialogueIntro": "Minh Triết Các soi rọi chân lý. Khi đối mặt với thuật ngụy tạo và mê trận thông tin của THE ECOSYSTEM, hãy tìm đúng câu bằng chứng để phá tan ảo ảnh!"
      }
    ],
    "props": [
        {
                "id": "g11-u10_theme_prop",
                "name": "lotus pond stone marker",
                "path": "/assets/game/units/grade-11/unit-10/props/theme_prop.png",
                "x": 1380,
                "y": 580,
                "size": [
                        160,
                        160
                ],
                "category": "vocab_discovery"
        },
        {
                "id": "g11-u10_mangrove_nest",
                "name": "small mangrove-root shelter for wildlife",
                "path": "/assets/game/units/grade-11/unit-10/props/mangrove_nest.png",
                "x": 860,
                "y": 1300,
                "size": [
                        160,
                        160
                ],
                "category": "reading_clue"
        }
      ],
    "enemies": [
        {
                "encounterId": "g11-u10_enc_scout",
                "enemyId": "scout",
                "name": "Hủy Hoại Thám Tử",
                "title": "Tà Binh Tuần Tra",
                "concept": "swift human scout with a short blade and light Vietnamese clothing; motifs: invasive vines, dark marsh spirits and disrupted animal forms",
                "spritePath": "/assets/game/units/grade-11/unit-10/enemies/scout.png",
                "x": 1450,
                "y": 1050,
                "patrolRange": {
                        "minX": 1380,
                        "maxX": 1540
                },
                "hp": 220,
                "maxHp": 220,
                "attack": 26,
                "defense": 16,
                "xpReward": 160,
                "combatMode": "lost_word",
                "learningSkill": "Đoạt Lại Vong Từ (Từ Vựng & Cụm Từ Cốt Lõi)",
                "difficulty": "easy",
                "requiredQuestionsCount": 1,
                "winCondition": "Điền chính xác từ khuyết thiếu để đoạt lại vong từ",
                "tutorialBriefing": "Đoạt Lại Vong Từ: Kẻ địch che giấu một từ vựng trọng tâm. Dùng manh mối gợi ý và kiến thức để điền chính xác!"
        },
        {
                "encounterId": "g11-u10_enc_ranged",
                "enemyId": "ranged",
                "name": "Đầm Lầy Xạ Nhân",
                "title": "Tà Binh Tuần Tra",
                "concept": "human ranged attacker with a bamboo bow or sling; motifs: invasive vines, dark marsh spirits and disrupted animal forms",
                "spritePath": "/assets/game/units/grade-11/unit-10/enemies/ranged.png",
                "x": 1950,
                "y": 1050,
                "patrolRange": {
                        "minX": 1870,
                        "maxX": 2030
                },
                "hp": 235,
                "maxHp": 235,
                "attack": 28,
                "defense": 17,
                "xpReward": 170,
                "combatMode": "listening_pursuit",
                "learningSkill": "Mê Âm Truy Kích (Luyện Nghe & Nhận Diện Ngữ Âm)",
                "difficulty": "easy",
                "requiredQuestionsCount": 1,
                "winCondition": "Lắng nghe thông điệp âm thanh và nhận diện chính xác yếu nghĩa",
                "tutorialBriefing": "Mê Âm Truy Kích: Kẻ địch truyền âm huyễn hoặc! Bấm nút Nghe để phát âm thanh khẩu quyết và giải mã ý nghĩa!"
        },
        {
                "encounterId": "g11-u10_enc_brute",
                "enemyId": "brute",
                "name": "Nuốt Chửng Đao Khách",
                "title": "Tà Binh Tuần Tra",
                "concept": "large armored bruiser with a heavy club; motifs: invasive vines, dark marsh spirits and disrupted animal forms",
                "spritePath": "/assets/game/units/grade-11/unit-10/enemies/brute.png",
                "x": 2450,
                "y": 1150,
                "patrolRange": {
                        "minX": 2370,
                        "maxX": 2530
                },
                "hp": 250,
                "maxHp": 250,
                "attack": 30,
                "defense": 18,
                "xpReward": 180,
                "combatMode": "unseal",
                "learningSkill": "Phá Phong Ấn (Cấu Trúc Cú Pháp & Trật Tự Câu)",
                "difficulty": "medium",
                "requiredQuestionsCount": 1,
                "winCondition": "Sắp xếp các phiến đá từ ngữ thành câu đúng ngữ pháp",
                "tutorialBriefing": "Phá Phong Ấn: Giáp hộ thân của Thạch Nhân chỉ bị phá vỡ khi sắp xếp các từ ngữ theo đúng trật tự cú pháp!"
        },
        {
                "encounterId": "g11-u10_enc_construct",
                "enemyId": "construct",
                "name": "Hủ Mộc Khôi Lỗi",
                "title": "Tà Binh Tuần Tra",
                "concept": "nonhuman golem assembled from the unit's material motifs; motifs: invasive vines, dark marsh spirits and disrupted animal forms",
                "spritePath": "/assets/game/units/grade-11/unit-10/enemies/construct.png",
                "x": 2850,
                "y": 1300,
                "patrolRange": {
                        "minX": 2770,
                        "maxX": 2930
                },
                "hp": 265,
                "maxHp": 265,
                "attack": 32,
                "defense": 19,
                "xpReward": 190,
                "combatMode": "deception_pierce",
                "learningSkill": "Thiên Diện Phá Ảo (Đọc Hiểu & Định Vị Câu Dẫn Chứng)",
                "difficulty": "medium",
                "requiredQuestionsCount": 1,
                "winCondition": "Chọn đáp án đúng VÀ định vị đúng câu dẫn chứng [1]-[4]",
                "tutorialBriefing": "Thiên Diện Phá Ảo: Ảo ảnh che mắt! Đọc kỹ đoạn văn bản, chọn đáp án đúng và bấm chọn đúng CÂU DẪN CHỨNG [1]-[4]!"
        },
        {
                "encounterId": "g11-u10_enc_spirit",
                "enemyId": "spirit",
                "name": "Héo Úa Tà Hồn",
                "title": "Tà Binh Tuần Tra",
                "concept": "eerie floating nonhuman spirit formed from the unit's motifs; motifs: invasive vines, dark marsh spirits and disrupted animal forms",
                "spritePath": "/assets/game/units/grade-11/unit-10/enemies/spirit.png",
                "x": 1750,
                "y": 1380,
                "patrolRange": {
                        "minX": 1670,
                        "maxX": 1830
                },
                "hp": 280,
                "maxHp": 280,
                "attack": 34,
                "defense": 20,
                "xpReward": 200,
                "combatMode": "escort_dialogue",
                "learningSkill": "Hộ Tống Hội Thoại (Giao Tiếp Tình Huống & Phản Hồi Chiến Thuật)",
                "difficulty": "medium",
                "requiredQuestionsCount": 1,
                "winCondition": "Lựa chọn câu đối đáp thấu tình đạt lý, kích hoạt khiên hộ thể",
                "tutorialBriefing": "Hộ Tống Hội Thoại: Đối thủ dùng lời kích động tâm trí! Chọn phương án đối đáp chuẩn mực để kích hoạt khiên bảo hộ!"
        },
        {
                "encounterId": "g11-u10_enc_elite",
                "enemyId": "elite",
                "name": "Đầm Lầy Yêu Đồ",
                "title": "Hộ Vệ Tinh Anh",
                "concept": "elite commander with ornate armor and distinctive polearm; motifs: invasive vines, dark marsh spirits and disrupted animal forms",
                "spritePath": "/assets/game/units/grade-11/unit-10/enemies/elite.png",
                "x": 2250,
                "y": 1450,
                "patrolRange": {
                        "minX": 2170,
                        "maxX": 2330
                },
                "hp": 370,
                "maxHp": 370,
                "attack": 44,
                "defense": 20,
                "xpReward": 330,
                "combatMode": "triple_combo",
                "learningSkill": "Liên Hoàn Tam Chiêu (Tổng Hợp Nghe - Hiểu - Xuất Chiêu)",
                "difficulty": "hard",
                "requiredQuestionsCount": 1,
                "winCondition": "Hoàn thành chuỗi 3 chiêu thức: Thính âm -> Luận giải -> Xuất chiêu phá trận",
                "tutorialBriefing": "Liên Hoàn Tam Chiêu: Hộ vệ tinh anh sở hữu kiếm pháp liên hoàn! Hoàn thành liên tiếp 3 chiêu thức để trảm địch!"
        },
        {
                "encounterId": "g11-u10_enc_invasive_root_predator",
                "enemyId": "invasive_root_predator",
                "name": "Ký Sinh Thực Căn Quái",
                "title": "Hộ Vệ Tinh Anh",
                "concept": "a twisted invasive mangrove-root predator with muddy claws and reed-covered back",
                "spritePath": "/assets/game/units/grade-11/unit-10/enemies/invasive_root_predator.png",
                "x": 1350,
                "y": 1450,
                "patrolRange": {
                        "minX": 1270,
                        "maxX": 1430
                },
                "hp": 370,
                "maxHp": 370,
                "attack": 44,
                "defense": 20,
                "xpReward": 330,
                "combatMode": "deception_pierce",
                "learningSkill": "Thiên Diện Phá Ảo (Đọc Hiểu & Phá Bẫy Ngụy Tạo)",
                "difficulty": "hard",
                "requiredQuestionsCount": 1,
                "winCondition": "Giải mã bản văn tịch cổ và chỉ ra câu bằng chứng",
                "tutorialBriefing": "Thiên Diện Phá Ảo: Chướng khí biến ảo khôn lường! Đọc văn tịch và xác định đúng câu dẫn chứng để trừ tà!"
        }
      ],
    "climax": {
      "hasRealBoss": true,
      "encounterId": "g11-u10_boss_10",
      "enemy": {
          "id": "boss_g11-u10",
        "name": "Đầm Lầy Nuốt Chửng",
        "title": "Cổ Thú Tàn Phá Hệ Sinh Thái",
        "spriteKey": "/assets/game/units/grade-11/unit-10/bosses/marsh_devourer.png",
        "hp": 590,
        "maxHp": 590,
        "attack": 62,
        "defense": 34,
        "xpReward": 850,
        "isBoss": true,
        "bossPhase": 1,
        "dialogueIntro": "“Khá khen tiểu bối dám bước vào Cấm Địa THE ECOSYSTEM! Hãy nếm thử kiếm khí của Đầm Lầy Nuốt Chửng!”",
        "dialoguePhase2": "“Cuồng Nộ Huyết Ma kích hoạt! Tuyệt kỹ THE ECOSYSTEM sẽ biến ngươi thành tro bụi!”",
        "combatMode": "triple_combo",
        "learningSkill": "Quyết Chiến Đại Ma Đầu (2 Phase Liên Hoàn Tam Chiêu)",
        "difficulty": "hard",
        "requiredQuestionsCount": 1,
        "winCondition": "Đánh bại Ma Đầu qua 2 Phase sinh tử",
        "tutorialBriefing": "Quyết Chiến Boss: Đại Ma Đầu sở hữu 2 Phase cuồng nộ! Hãy hoàn thành Liên Hoàn Tam Chiêu và vượt qua tốc độ xuất chiêu bão táp!"
        },
      "x": 1600,
      "y": 1720,
      "barrierPrompt": "🔒 Ma Khí Cấm Địa (Cần >= 70% tiến độ)",
      "unlockedPrompt": "⚡ Cổng Ma Giáo Cấm Địa ĐÃ MỞ! Quyết chiến Đầm Lầy Nuốt Chửng!"
    }
  },
  "g12-u01": {
    "unitId": "g12-u01",
    "grade": 12,
    "unitNumber": 1,
    "title": "LIFE STORIES WE ADMIRE",
    "topic": "Biographies, Role Models, Overcoming Adversity and Great Achievements",
    "mapWidth": 3200,
    "mapHeight": 2000,
    "ground": {
      "primaryPath": "/assets/game/units/grade-12/unit-01/ground/main_ground.png",
      "secondaryPath": "/assets/game/units/grade-12/unit-01/ground/side_ground.png",
      "tileable": false
    },
    "npcs": [
      {
        "id": "bang_chu",
        "name": "Hồng y tông chủ Hà Ánh Phượng",
        "title": "Lãnh Tụ Võ Lâm Chính Phái",
        "elementColor": "#fbe285",
        "spriteKey": "bang_chu_ha_anh_phuong",
        "portraitPath": "/assets/game/characters/npc/portraits/bang_chu_ha_anh_phuong.png",
        "x": 550,
        "y": 560,
        "prompt": "[E] Bái kiến Hồng y tông chủ Hà Ánh Phượng",
        "dialogueIntro": "Chào mừng thiếu hiệp! Hôm nay chúng ta cùng khám phá Unit 1: LIFE STORIES WE ADMIRE (Biographies, Role Models, Overcoming Adversity and Great Achievements). Hãy rèn luyện võ học, giải trừ ma chướng!"
      },
      {
        "id": "bach_khoa_thu_sinh",
        "name": "Bách Khoa thư Sinh Đinh Ngọc Khánh",
        "title": "Đại Sư Huynh Tông Môn",
        "elementColor": "#c084fc",
        "spriteKey": "bach_khoa_thu_sinh",
        "portraitPath": "/assets/game/characters/npc/portraits/bach_khoa_thu_sinh_v2.png",
        "x": 740,
        "y": 480,
        "prompt": "[E] Thỉnh Giáo Bách Khoa thư Sinh Đinh Ngọc Khánh",
        "dialogueIntro": "Chào sư đệ/sư muội! Đại học không nhàn như giang hồ đồn đâu các đệ... Nhưng qua được ải THPT này, thiên hạ sẽ mở rộng trước mắt! Có gì vướng mắc về bẫy thi cử hay kỹ năng thực chiến, cứ hỏi ta!"
      },
      {
        "id": "ho_phap_phuong_tu",
        "name": "Hộ Pháp Phương Tú",
        "title": "Hộ Pháp Từ Vựng & Trưởng Thành",
        "elementColor": "#59caa0",
        "spriteKey": "ho_phap_phuong_tu",
        "portraitPath": "/assets/game/characters/npc/portraits/ho_phap_phuong_tu.png",
        "x": 920,
        "y": 560,
        "prompt": "[E] Tham Vấn Hộ Pháp Phương Tú",
        "dialogueIntro": "Tàng Kinh Các lưu giữ toàn bộ bí điển từ vựng của LIFE STORIES WE ADMIRE. Hãy lĩnh hội từng câu chữ để tích lũy công lực căn bản!"
      },
      {
        "id": "ho_phap_dang_tran_ha",
        "name": "Hộ Pháp Đặng Trần Hà",
        "title": "Hộ Pháp Ngữ Pháp & Thách Đấu",
        "elementColor": "#60a5fa",
        "spriteKey": "ho_phap_dang_tran_ha",
        "portraitPath": "/assets/game/characters/npc/portraits/ho_phap_dang_tran_ha.png",
        "x": 1850,
        "y": 560,
        "prompt": "[E] Bái Kiến Hộ Pháp Đặng Trần Hà",
        "dialogueIntro": "Ngữ pháp là xương sống của kiếm chiêu! Muốn phá phong ấn thạch trận của LIFE STORIES WE ADMIRE, tâm ý phải chuẩn xác, cú pháp không được sai lệch một ly!"
      },
      {
        "id": "ho_phap_hoang_van",
        "name": "Hộ Pháp Hoàng Vân",
        "title": "Hộ Pháp Nghe & Nhịp Điệu",
        "elementColor": "#fbbf24",
        "spriteKey": "ho_phap_hoang_van",
        "portraitPath": "/assets/game/characters/npc/portraits/ho_phap_hoang_van.png",
        "x": 2400,
        "y": 760,
        "prompt": "[E] Thỉnh Giáo Hộ Pháp Hoàng Vân",
        "dialogueIntro": "Lắng nghe âm điệu tự nhiên, nghe rõ từng ngữ âm để thấu suốt chiêu thức địch nhân. Hãy vào Võ Luyện Đài luyện tập cùng ta!"
      },
      {
        "id": "ho_phap_nguyet_nguyen",
        "name": "Hộ Pháp Nguyệt Nguyên",
        "title": "Hộ Pháp Đọc Hiểu & Minh Triết",
        "elementColor": "#38bdf8",
        "spriteKey": "ho_phap_nguyet_nguyen",
        "portraitPath": "/assets/game/characters/npc/portraits/ho_phap_nguyet_nguyen.png",
        "x": 660,
        "y": 1260,
        "prompt": "[E] Luận Đạo Hộ Pháp Nguyệt Nguyên",
        "dialogueIntro": "Minh Triết Các soi rọi chân lý. Khi đối mặt với thuật ngụy tạo và mê trận thông tin của LIFE STORIES WE ADMIRE, hãy tìm đúng câu bằng chứng để phá tan ảo ảnh!"
      }
    ],
    "props": [
        {
                "id": "g12-u01_theme_prop",
                "name": "memorial bronze plaque without text",
                "path": "/assets/game/units/grade-12/unit-01/props/theme_prop.png",
                "x": 1380,
                "y": 580,
                "size": [
                        160,
                        160
                ],
                "category": "vocab_discovery"
        },
        {
                "id": "g12-u01_secondary_prop",
                "name": "small empty portrait display frame",
                "path": "/assets/game/units/grade-12/unit-01/props/secondary_prop.png",
                "x": 860,
                "y": 1300,
                "size": [
                        160,
                        160
                ],
                "category": "reading_clue"
        }
      ],
    "enemies": [
        {
                "encounterId": "g12-u01_enc_scout",
                "enemyId": "scout",
                "name": "Quên Lãng Thám Đồ",
                "title": "Tà Binh Tuần Tra",
                "concept": "portrait thief in torn scholar robes carrying a stolen blank portrait frame",
                "spritePath": "/assets/game/units/grade-12/unit-01/enemies/scout.png",
                "x": 1450,
                "y": 1050,
                "patrolRange": {
                        "minX": 1380,
                        "maxX": 1540
                },
                "hp": 130,
                "maxHp": 130,
                "attack": 17,
                "defense": 7,
                "xpReward": 88,
                "combatMode": "lost_word",
                "learningSkill": "Đoạt Lại Vong Từ (Từ Vựng & Cụm Từ Cốt Lõi)",
                "difficulty": "easy",
                "requiredQuestionsCount": 1,
                "winCondition": "Điền chính xác từ khuyết thiếu để đoạt lại vong từ",
                "tutorialBriefing": "Đoạt Lại Vong Từ: Kẻ địch che giấu một từ vựng trọng tâm. Dùng manh mối gợi ý và kiến thức để điền chính xác!"
        },
        {
                "encounterId": "g12-u01_enc_ranged",
                "enemyId": "ranged",
                "name": "Bất Trí Cung Nhân",
                "title": "Tà Binh Tuần Tra",
                "concept": "archer firing strips of dark memory scroll from a bamboo bow",
                "spritePath": "/assets/game/units/grade-12/unit-01/enemies/ranged.png",
                "x": 1950,
                "y": 1050,
                "patrolRange": {
                        "minX": 1870,
                        "maxX": 2030
                },
                "hp": 145,
                "maxHp": 145,
                "attack": 19,
                "defense": 8,
                "xpReward": 98,
                "combatMode": "listening_pursuit",
                "learningSkill": "Mê Âm Truy Kích (Luyện Nghe & Nhận Diện Ngữ Âm)",
                "difficulty": "easy",
                "requiredQuestionsCount": 1,
                "winCondition": "Lắng nghe thông điệp âm thanh và nhận diện chính xác yếu nghĩa",
                "tutorialBriefing": "Mê Âm Truy Kích: Kẻ địch truyền âm huyễn hoặc! Bấm nút Nghe để phát âm thanh khẩu quyết và giải mã ý nghĩa!"
        },
        {
                "encounterId": "g12-u01_enc_brute",
                "enemyId": "brute",
                "name": "Bại Hoang Ma Binh",
                "title": "Tà Binh Tuần Tra",
                "concept": "broad stone memorial guard with cracked heroic relief armor",
                "spritePath": "/assets/game/units/grade-12/unit-01/enemies/brute.png",
                "x": 2450,
                "y": 1150,
                "patrolRange": {
                        "minX": 2370,
                        "maxX": 2530
                },
                "hp": 160,
                "maxHp": 160,
                "attack": 21,
                "defense": 9,
                "xpReward": 108,
                "combatMode": "unseal",
                "learningSkill": "Phá Phong Ấn (Cấu Trúc Cú Pháp & Trật Tự Câu)",
                "difficulty": "medium",
                "requiredQuestionsCount": 1,
                "winCondition": "Sắp xếp các phiến đá từ ngữ thành câu đúng ngữ pháp",
                "tutorialBriefing": "Phá Phong Ấn: Giáp hộ thân của Thạch Nhân chỉ bị phá vỡ khi sắp xếp các từ ngữ theo đúng trật tự cú pháp!"
        },
        {
                "encounterId": "g12-u01_enc_construct",
                "enemyId": "construct",
                "name": "Anh Hùng Khôi Lỗi",
                "title": "Tà Binh Tuần Tra",
                "concept": "animated gilt portrait frame golem with empty center",
                "spritePath": "/assets/game/units/grade-12/unit-01/enemies/construct.png",
                "x": 2850,
                "y": 1300,
                "patrolRange": {
                        "minX": 2770,
                        "maxX": 2930
                },
                "hp": 175,
                "maxHp": 175,
                "attack": 23,
                "defense": 10,
                "xpReward": 118,
                "combatMode": "deception_pierce",
                "learningSkill": "Thiên Diện Phá Ảo (Đọc Hiểu & Định Vị Câu Dẫn Chứng)",
                "difficulty": "medium",
                "requiredQuestionsCount": 1,
                "winCondition": "Chọn đáp án đúng VÀ định vị đúng câu dẫn chứng [1]-[4]",
                "tutorialBriefing": "Thiên Diện Phá Ảo: Ảo ảnh che mắt! Đọc kỹ đoạn văn bản, chọn đáp án đúng và bấm chọn đúng CÂU DẪN CHỨNG [1]-[4]!"
        },
        {
                "encounterId": "g12-u01_enc_spirit",
                "enemyId": "spirit",
                "name": "Bi Thương Oán Hồn",
                "title": "Tà Binh Tuần Tra",
                "concept": "fading memory wraith with drifting scroll fragments",
                "spritePath": "/assets/game/units/grade-12/unit-01/enemies/spirit.png",
                "x": 1750,
                "y": 1380,
                "patrolRange": {
                        "minX": 1670,
                        "maxX": 1830
                },
                "hp": 190,
                "maxHp": 190,
                "attack": 25,
                "defense": 11,
                "xpReward": 128,
                "combatMode": "escort_dialogue",
                "learningSkill": "Hộ Tống Hội Thoại (Giao Tiếp Tình Huống & Phản Hồi Chiến Thuật)",
                "difficulty": "medium",
                "requiredQuestionsCount": 1,
                "winCondition": "Lựa chọn câu đối đáp thấu tình đạt lý, kích hoạt khiên hộ thể",
                "tutorialBriefing": "Hộ Tống Hội Thoại: Đối thủ dùng lời kích động tâm trí! Chọn phương án đối đáp chuẩn mực để kích hoạt khiên bảo hộ!"
        },
        {
                "encounterId": "g12-u01_enc_elite",
                "enemyId": "elite",
                "name": "Nghịch Cảnh Đao Khách",
                "title": "Hộ Vệ Tinh Anh",
                "concept": "false hero captain in ornate Vietnamese ceremonial armor with a fractured bronze medal",
                "spritePath": "/assets/game/units/grade-12/unit-01/enemies/elite.png",
                "x": 2250,
                "y": 1450,
                "patrolRange": {
                        "minX": 2170,
                        "maxX": 2330
                },
                "hp": 235,
                "maxHp": 235,
                "attack": 26,
                "defense": 11,
                "xpReward": 195,
                "combatMode": "triple_combo",
                "learningSkill": "Liên Hoàn Tam Chiêu (Tổng Hợp Nghe - Hiểu - Xuất Chiêu)",
                "difficulty": "hard",
                "requiredQuestionsCount": 1,
                "winCondition": "Hoàn thành chuỗi 3 chiêu thức: Thính âm -> Luận giải -> Xuất chiêu phá trận",
                "tutorialBriefing": "Liên Hoàn Tam Chiêu: Hộ vệ tinh anh sở hữu kiếm pháp liên hoàn! Hoàn thành liên tiếp 3 chiêu thức để trảm địch!"
        },
        {
                "encounterId": "g12-u01_enc_memory_chimera",
                "enemyId": "memory_chimera",
                "name": "Hồi Ức Huyễn Thú",
                "title": "Hộ Vệ Tinh Anh",
                "concept": "a nonhuman chimera assembled from torn blank portrait canvases and bronze memorial fragments",
                "spritePath": "/assets/game/units/grade-12/unit-01/enemies/memory_chimera.png",
                "x": 1350,
                "y": 1450,
                "patrolRange": {
                        "minX": 1270,
                        "maxX": 1430
                },
                "hp": 235,
                "maxHp": 235,
                "attack": 26,
                "defense": 11,
                "xpReward": 195,
                "combatMode": "deception_pierce",
                "learningSkill": "Thiên Diện Phá Ảo (Đọc Hiểu & Phá Bẫy Ngụy Tạo)",
                "difficulty": "hard",
                "requiredQuestionsCount": 1,
                "winCondition": "Giải mã bản văn tịch cổ và chỉ ra câu bằng chứng",
                "tutorialBriefing": "Thiên Diện Phá Ảo: Chướng khí biến ảo khôn lường! Đọc văn tịch và xác định đúng câu dẫn chứng để trừ tà!"
        }
      ],
    "climax": {
      "hasRealBoss": false,
      "encounterId": "g12-u01_climax_1",
      "enemy": {
          "id": "climax_g12-u01",
        "name": "Thủ Trận Tinh Anh - LIFE STORIES WE ADMIRE",
        "title": "Trấn Thủ Trận Đỉnh Điểm",
        "spriteKey": "/assets/game/units/grade-12/unit-01/enemies/memory_chimera.png",
        "hp": 300,
        "maxHp": 300,
        "attack": 28,
        "defense": 13,
        "xpReward": 345,
        "isBoss": false,
        "bossPhase": 1,
        "dialogueIntro": "“Ta là Thủ Trận Tinh Anh trấn giữ thạch trận đỉnh điểm của LIFE STORIES WE ADMIRE. Hãy dốc toàn lực chiến thắng để chứng minh sự tinh thông!”",
        "dialoguePhase2": "“Ngươi quả thực có thực lực! Đỡ chiêu biến hóa cuối cùng này!”",
        "combatMode": "triple_combo",
        "learningSkill": "Quyết Chiến Thủ Trận Tinh Anh (Thạch Trận Đỉnh Điểm)",
        "difficulty": "hard",
        "requiredQuestionsCount": 1,
        "winCondition": "Đánh bại Thủ Trận Tinh Anh để giải phóng toàn bộ Unit",
        "tutorialBriefing": "Phong Ấn Trận Đỉnh Điểm: Hoàn thành Liên Hoàn Tam Chiêu để phá tan kết giới, hoàn thành Unit và mở ra cảnh giới mới!"
        },
      "x": 1600,
      "y": 1720,
      "barrierPrompt": "🔒 Phong Ấn Trận Đỉnh Điểm (Cần >= 70% tiến độ)",
      "unlockedPrompt": "⚡ Phong Ấn Đỉnh Điểm ĐÃ MỞ! Thách đấu Thủ Trận Tinh Anh!"
    }
  },
  "g12-u02": {
    "unitId": "g12-u02",
    "grade": 12,
    "unitNumber": 2,
    "title": "A MULTICULTURAL WORLD",
    "topic": "Cultural Diversity, Traditions, Globalisation and Intercultural Respect",
    "mapWidth": 3200,
    "mapHeight": 2000,
    "ground": {
      "primaryPath": "/assets/game/units/grade-12/unit-02/ground/main_ground.png",
      "secondaryPath": "/assets/game/units/grade-12/unit-02/ground/side_ground.png",
      "tileable": false
    },
    "npcs": [
      {
        "id": "bang_chu",
        "name": "Hồng y tông chủ Hà Ánh Phượng",
        "title": "Lãnh Tụ Võ Lâm Chính Phái",
        "elementColor": "#fbe285",
        "spriteKey": "bang_chu_ha_anh_phuong",
        "portraitPath": "/assets/game/characters/npc/portraits/bang_chu_ha_anh_phuong.png",
        "x": 550,
        "y": 560,
        "prompt": "[E] Bái kiến Hồng y tông chủ Hà Ánh Phượng",
        "dialogueIntro": "Chào mừng thiếu hiệp! Hôm nay chúng ta cùng khám phá Unit 2: A MULTICULTURAL WORLD (Cultural Diversity, Traditions, Globalisation and Intercultural Respect). Hãy rèn luyện võ học, giải trừ ma chướng!"
      },
      {
        "id": "bach_khoa_thu_sinh",
        "name": "Bách Khoa thư Sinh Đinh Ngọc Khánh",
        "title": "Đại Sư Huynh Tông Môn",
        "elementColor": "#c084fc",
        "spriteKey": "bach_khoa_thu_sinh",
        "portraitPath": "/assets/game/characters/npc/portraits/bach_khoa_thu_sinh_v2.png",
        "x": 740,
        "y": 480,
        "prompt": "[E] Thỉnh Giáo Bách Khoa thư Sinh Đinh Ngọc Khánh",
        "dialogueIntro": "Chào sư đệ/sư muội! Đại học không nhàn như giang hồ đồn đâu các đệ... Nhưng qua được ải THPT này, thiên hạ sẽ mở rộng trước mắt! Có gì vướng mắc về bẫy thi cử hay kỹ năng thực chiến, cứ hỏi ta!"
      },
      {
        "id": "ho_phap_phuong_tu",
        "name": "Hộ Pháp Phương Tú",
        "title": "Hộ Pháp Từ Vựng & Trưởng Thành",
        "elementColor": "#59caa0",
        "spriteKey": "ho_phap_phuong_tu",
        "portraitPath": "/assets/game/characters/npc/portraits/ho_phap_phuong_tu.png",
        "x": 920,
        "y": 560,
        "prompt": "[E] Tham Vấn Hộ Pháp Phương Tú",
        "dialogueIntro": "Tàng Kinh Các lưu giữ toàn bộ bí điển từ vựng của A MULTICULTURAL WORLD. Hãy lĩnh hội từng câu chữ để tích lũy công lực căn bản!"
      },
      {
        "id": "ho_phap_dang_tran_ha",
        "name": "Hộ Pháp Đặng Trần Hà",
        "title": "Hộ Pháp Ngữ Pháp & Thách Đấu",
        "elementColor": "#60a5fa",
        "spriteKey": "ho_phap_dang_tran_ha",
        "portraitPath": "/assets/game/characters/npc/portraits/ho_phap_dang_tran_ha.png",
        "x": 1850,
        "y": 560,
        "prompt": "[E] Bái Kiến Hộ Pháp Đặng Trần Hà",
        "dialogueIntro": "Ngữ pháp là xương sống của kiếm chiêu! Muốn phá phong ấn thạch trận của A MULTICULTURAL WORLD, tâm ý phải chuẩn xác, cú pháp không được sai lệch một ly!"
      },
      {
        "id": "ho_phap_hoang_van",
        "name": "Hộ Pháp Hoàng Vân",
        "title": "Hộ Pháp Nghe & Nhịp Điệu",
        "elementColor": "#fbbf24",
        "spriteKey": "ho_phap_hoang_van",
        "portraitPath": "/assets/game/characters/npc/portraits/ho_phap_hoang_van.png",
        "x": 2400,
        "y": 760,
        "prompt": "[E] Thỉnh Giáo Hộ Pháp Hoàng Vân",
        "dialogueIntro": "Lắng nghe âm điệu tự nhiên, nghe rõ từng ngữ âm để thấu suốt chiêu thức địch nhân. Hãy vào Võ Luyện Đài luyện tập cùng ta!"
      },
      {
        "id": "ho_phap_nguyet_nguyen",
        "name": "Hộ Pháp Nguyệt Nguyên",
        "title": "Hộ Pháp Đọc Hiểu & Minh Triết",
        "elementColor": "#38bdf8",
        "spriteKey": "ho_phap_nguyet_nguyen",
        "portraitPath": "/assets/game/characters/npc/portraits/ho_phap_nguyet_nguyen.png",
        "x": 660,
        "y": 1260,
        "prompt": "[E] Luận Đạo Hộ Pháp Nguyệt Nguyên",
        "dialogueIntro": "Minh Triết Các soi rọi chân lý. Khi đối mặt với thuật ngụy tạo và mê trận thông tin của A MULTICULTURAL WORLD, hãy tìm đúng câu bằng chứng để phá tan ảo ảnh!"
      }
    ],
    "props": [
        {
                "id": "g12-u02_theme_prop",
                "name": "multicultural textile bundle",
                "path": "/assets/game/units/grade-12/unit-02/props/theme_prop.png",
                "x": 1380,
                "y": 580,
                "size": [
                        160,
                        160
                ],
                "category": "vocab_discovery"
        },
        {
                "id": "g12-u02_secondary_prop",
                "name": "bundled trade textiles on a wooden stall",
                "path": "/assets/game/units/grade-12/unit-02/props/secondary_prop.png",
                "x": 860,
                "y": 1300,
                "size": [
                        160,
                        160
                ],
                "category": "dialogue"
        }
      ],
    "enemies": [
        {
                "encounterId": "g12-u02_enc_scout",
                "enemyId": "scout",
                "name": "Cực Đoan Thám Tử",
                "title": "Tà Binh Tuần Tra",
                "concept": "masked market rogue stealing trade wares",
                "spritePath": "/assets/game/units/grade-12/unit-02/enemies/scout.png",
                "x": 1450,
                "y": 1050,
                "patrolRange": {
                        "minX": 1380,
                        "maxX": 1540
                },
                "hp": 140,
                "maxHp": 140,
                "attack": 18,
                "defense": 8,
                "xpReward": 96,
                "combatMode": "lost_word",
                "learningSkill": "Đoạt Lại Vong Từ (Từ Vựng & Cụm Từ Cốt Lõi)",
                "difficulty": "easy",
                "requiredQuestionsCount": 1,
                "winCondition": "Điền chính xác từ khuyết thiếu để đoạt lại vong từ",
                "tutorialBriefing": "Đoạt Lại Vong Từ: Kẻ địch che giấu một từ vựng trọng tâm. Dùng manh mối gợi ý và kiến thức để điền chính xác!"
        },
        {
                "encounterId": "g12-u02_enc_ranged",
                "enemyId": "ranged",
                "name": "Tạp Âm Xạ Thủ",
                "title": "Tà Binh Tuần Tra",
                "concept": "silk-dart hunter wearing mixed but respectful Vietnamese port textiles",
                "spritePath": "/assets/game/units/grade-12/unit-02/enemies/ranged.png",
                "x": 1950,
                "y": 1050,
                "patrolRange": {
                        "minX": 1870,
                        "maxX": 2030
                },
                "hp": 155,
                "maxHp": 155,
                "attack": 20,
                "defense": 9,
                "xpReward": 106,
                "combatMode": "listening_pursuit",
                "learningSkill": "Mê Âm Truy Kích (Luyện Nghe & Nhận Diện Ngữ Âm)",
                "difficulty": "easy",
                "requiredQuestionsCount": 1,
                "winCondition": "Lắng nghe thông điệp âm thanh và nhận diện chính xác yếu nghĩa",
                "tutorialBriefing": "Mê Âm Truy Kích: Kẻ địch truyền âm huyễn hoặc! Bấm nút Nghe để phát âm thanh khẩu quyết và giải mã ý nghĩa!"
        },
        {
                "encounterId": "g12-u02_enc_brute",
                "enemyId": "brute",
                "name": "Cự Tuyệt Ma Nhân",
                "title": "Tà Binh Tuần Tra",
                "concept": "large cargo porter corrupted by dark trade magic",
                "spritePath": "/assets/game/units/grade-12/unit-02/enemies/brute.png",
                "x": 2450,
                "y": 1150,
                "patrolRange": {
                        "minX": 2370,
                        "maxX": 2530
                },
                "hp": 170,
                "maxHp": 170,
                "attack": 22,
                "defense": 10,
                "xpReward": 116,
                "combatMode": "unseal",
                "learningSkill": "Phá Phong Ấn (Cấu Trúc Cú Pháp & Trật Tự Câu)",
                "difficulty": "medium",
                "requiredQuestionsCount": 1,
                "winCondition": "Sắp xếp các phiến đá từ ngữ thành câu đúng ngữ pháp",
                "tutorialBriefing": "Phá Phong Ấn: Giáp hộ thân của Thạch Nhân chỉ bị phá vỡ khi sắp xếp các từ ngữ theo đúng trật tự cú pháp!"
        },
        {
                "encounterId": "g12-u02_enc_construct",
                "enemyId": "construct",
                "name": "Tường Đá Cơ Quan",
                "title": "Tà Binh Tuần Tra",
                "concept": "animated stacked trade crates and textile-bale golem",
                "spritePath": "/assets/game/units/grade-12/unit-02/enemies/construct.png",
                "x": 2850,
                "y": 1300,
                "patrolRange": {
                        "minX": 2770,
                        "maxX": 2930
                },
                "hp": 185,
                "maxHp": 185,
                "attack": 24,
                "defense": 11,
                "xpReward": 126,
                "combatMode": "deception_pierce",
                "learningSkill": "Thiên Diện Phá Ảo (Đọc Hiểu & Định Vị Câu Dẫn Chứng)",
                "difficulty": "medium",
                "requiredQuestionsCount": 1,
                "winCondition": "Chọn đáp án đúng VÀ định vị đúng câu dẫn chứng [1]-[4]",
                "tutorialBriefing": "Thiên Diện Phá Ảo: Ảo ảnh che mắt! Đọc kỹ đoạn văn bản, chọn đáp án đúng và bấm chọn đúng CÂU DẪN CHỨNG [1]-[4]!"
        },
        {
                "encounterId": "g12-u02_enc_spirit",
                "enemyId": "spirit",
                "name": "Kỳ Thị Tà Linh",
                "title": "Tà Binh Tuần Tra",
                "concept": "festival mask spirit swirling with colorful cloth ribbons",
                "spritePath": "/assets/game/units/grade-12/unit-02/enemies/spirit.png",
                "x": 1750,
                "y": 1380,
                "patrolRange": {
                        "minX": 1670,
                        "maxX": 1830
                },
                "hp": 200,
                "maxHp": 200,
                "attack": 26,
                "defense": 12,
                "xpReward": 136,
                "combatMode": "escort_dialogue",
                "learningSkill": "Hộ Tống Hội Thoại (Giao Tiếp Tình Huống & Phản Hồi Chiến Thuật)",
                "difficulty": "medium",
                "requiredQuestionsCount": 1,
                "winCondition": "Lựa chọn câu đối đáp thấu tình đạt lý, kích hoạt khiên hộ thể",
                "tutorialBriefing": "Hộ Tống Hội Thoại: Đối thủ dùng lời kích động tâm trí! Chọn phương án đối đáp chuẩn mực để kích hoạt khiên bảo hộ!"
        },
        {
                "encounterId": "g12-u02_enc_elite",
                "enemyId": "elite",
                "name": "Bế Quan Trưởng Lão",
                "title": "Hộ Vệ Tinh Anh",
                "concept": "elite masked harbor captain carrying a bronze trade seal",
                "spritePath": "/assets/game/units/grade-12/unit-02/enemies/elite.png",
                "x": 2250,
                "y": 1450,
                "patrolRange": {
                        "minX": 2170,
                        "maxX": 2330
                },
                "hp": 250,
                "maxHp": 250,
                "attack": 28,
                "defense": 12,
                "xpReward": 210,
                "combatMode": "triple_combo",
                "learningSkill": "Liên Hoàn Tam Chiêu (Tổng Hợp Nghe - Hiểu - Xuất Chiêu)",
                "difficulty": "hard",
                "requiredQuestionsCount": 1,
                "winCondition": "Hoàn thành chuỗi 3 chiêu thức: Thính âm -> Luận giải -> Xuất chiêu phá trận",
                "tutorialBriefing": "Liên Hoàn Tam Chiêu: Hộ vệ tinh anh sở hữu kiếm pháp liên hoàn! Hoàn thành liên tiếp 3 chiêu thức để trảm địch!"
        },
        {
                "encounterId": "g12-u02_enc_sail_spirit",
                "enemyId": "sail_spirit",
                "name": "Viễn Dương Phong Linh",
                "title": "Hộ Vệ Tinh Anh",
                "concept": "a small ghostly Vietnamese river sailboat creature with torn canvas wings",
                "spritePath": "/assets/game/units/grade-12/unit-02/enemies/sail_spirit.png",
                "x": 1350,
                "y": 1450,
                "patrolRange": {
                        "minX": 1270,
                        "maxX": 1430
                },
                "hp": 250,
                "maxHp": 250,
                "attack": 28,
                "defense": 12,
                "xpReward": 210,
                "combatMode": "deception_pierce",
                "learningSkill": "Thiên Diện Phá Ảo (Đọc Hiểu & Phá Bẫy Ngụy Tạo)",
                "difficulty": "hard",
                "requiredQuestionsCount": 1,
                "winCondition": "Giải mã bản văn tịch cổ và chỉ ra câu bằng chứng",
                "tutorialBriefing": "Thiên Diện Phá Ảo: Chướng khí biến ảo khôn lường! Đọc văn tịch và xác định đúng câu dẫn chứng để trừ tà!"
        }
      ],
    "climax": {
      "hasRealBoss": false,
      "encounterId": "g12-u02_climax_2",
      "enemy": {
          "id": "climax_g12-u02",
        "name": "Thủ Trận Tinh Anh - A MULTICULTURAL WORLD",
        "title": "Trấn Thủ Trận Đỉnh Điểm",
        "spriteKey": "/assets/game/units/grade-12/unit-02/enemies/sail_spirit.png",
        "hp": 320,
        "maxHp": 320,
        "attack": 30,
        "defense": 14,
        "xpReward": 370,
        "isBoss": false,
        "bossPhase": 1,
        "dialogueIntro": "“Ta là Thủ Trận Tinh Anh trấn giữ thạch trận đỉnh điểm của A MULTICULTURAL WORLD. Hãy dốc toàn lực chiến thắng để chứng minh sự tinh thông!”",
        "dialoguePhase2": "“Ngươi quả thực có thực lực! Đỡ chiêu biến hóa cuối cùng này!”",
        "combatMode": "triple_combo",
        "learningSkill": "Quyết Chiến Thủ Trận Tinh Anh (Thạch Trận Đỉnh Điểm)",
        "difficulty": "hard",
        "requiredQuestionsCount": 1,
        "winCondition": "Đánh bại Thủ Trận Tinh Anh để giải phóng toàn bộ Unit",
        "tutorialBriefing": "Phong Ấn Trận Đỉnh Điểm: Hoàn thành Liên Hoàn Tam Chiêu để phá tan kết giới, hoàn thành Unit và mở ra cảnh giới mới!"
        },
      "x": 1600,
      "y": 1720,
      "barrierPrompt": "🔒 Phong Ấn Trận Đỉnh Điểm (Cần >= 70% tiến độ)",
      "unlockedPrompt": "⚡ Phong Ấn Đỉnh Điểm ĐÃ MỞ! Thách đấu Thủ Trận Tinh Anh!"
    }
  },
  "g12-u03": {
    "unitId": "g12-u03",
    "grade": 12,
    "unitNumber": 3,
    "title": "GREEN LIVING",
    "topic": "Zero Waste, Composting, Sustainable Consumption and Eco-habits",
    "mapWidth": 3200,
    "mapHeight": 2000,
    "ground": {
      "primaryPath": "/assets/game/units/grade-12/unit-03/ground/main_ground.png",
      "secondaryPath": "/assets/game/units/grade-12/unit-03/ground/side_ground.png",
      "tileable": false
    },
    "npcs": [
      {
        "id": "bang_chu",
        "name": "Hồng y tông chủ Hà Ánh Phượng",
        "title": "Lãnh Tụ Võ Lâm Chính Phái",
        "elementColor": "#fbe285",
        "spriteKey": "bang_chu_ha_anh_phuong",
        "portraitPath": "/assets/game/characters/npc/portraits/bang_chu_ha_anh_phuong.png",
        "x": 550,
        "y": 560,
        "prompt": "[E] Bái kiến Hồng y tông chủ Hà Ánh Phượng",
        "dialogueIntro": "Chào mừng thiếu hiệp! Hôm nay chúng ta cùng khám phá Unit 3: GREEN LIVING (Zero Waste, Composting, Sustainable Consumption and Eco-habits). Hãy rèn luyện võ học, giải trừ ma chướng!"
      },
      {
        "id": "bach_khoa_thu_sinh",
        "name": "Bách Khoa thư Sinh Đinh Ngọc Khánh",
        "title": "Đại Sư Huynh Tông Môn",
        "elementColor": "#c084fc",
        "spriteKey": "bach_khoa_thu_sinh",
        "portraitPath": "/assets/game/characters/npc/portraits/bach_khoa_thu_sinh_v2.png",
        "x": 740,
        "y": 480,
        "prompt": "[E] Thỉnh Giáo Bách Khoa thư Sinh Đinh Ngọc Khánh",
        "dialogueIntro": "Chào sư đệ/sư muội! Đại học không nhàn như giang hồ đồn đâu các đệ... Nhưng qua được ải THPT này, thiên hạ sẽ mở rộng trước mắt! Có gì vướng mắc về bẫy thi cử hay kỹ năng thực chiến, cứ hỏi ta!"
      },
      {
        "id": "ho_phap_phuong_tu",
        "name": "Hộ Pháp Phương Tú",
        "title": "Hộ Pháp Từ Vựng & Trưởng Thành",
        "elementColor": "#59caa0",
        "spriteKey": "ho_phap_phuong_tu",
        "portraitPath": "/assets/game/characters/npc/portraits/ho_phap_phuong_tu.png",
        "x": 920,
        "y": 560,
        "prompt": "[E] Tham Vấn Hộ Pháp Phương Tú",
        "dialogueIntro": "Tàng Kinh Các lưu giữ toàn bộ bí điển từ vựng của GREEN LIVING. Hãy lĩnh hội từng câu chữ để tích lũy công lực căn bản!"
      },
      {
        "id": "ho_phap_dang_tran_ha",
        "name": "Hộ Pháp Đặng Trần Hà",
        "title": "Hộ Pháp Ngữ Pháp & Thách Đấu",
        "elementColor": "#60a5fa",
        "spriteKey": "ho_phap_dang_tran_ha",
        "portraitPath": "/assets/game/characters/npc/portraits/ho_phap_dang_tran_ha.png",
        "x": 1850,
        "y": 560,
        "prompt": "[E] Bái Kiến Hộ Pháp Đặng Trần Hà",
        "dialogueIntro": "Ngữ pháp là xương sống của kiếm chiêu! Muốn phá phong ấn thạch trận của GREEN LIVING, tâm ý phải chuẩn xác, cú pháp không được sai lệch một ly!"
      },
      {
        "id": "ho_phap_hoang_van",
        "name": "Hộ Pháp Hoàng Vân",
        "title": "Hộ Pháp Nghe & Nhịp Điệu",
        "elementColor": "#fbbf24",
        "spriteKey": "ho_phap_hoang_van",
        "portraitPath": "/assets/game/characters/npc/portraits/ho_phap_hoang_van.png",
        "x": 2400,
        "y": 760,
        "prompt": "[E] Thỉnh Giáo Hộ Pháp Hoàng Vân",
        "dialogueIntro": "Lắng nghe âm điệu tự nhiên, nghe rõ từng ngữ âm để thấu suốt chiêu thức địch nhân. Hãy vào Võ Luyện Đài luyện tập cùng ta!"
      },
      {
        "id": "ho_phap_nguyet_nguyen",
        "name": "Hộ Pháp Nguyệt Nguyên",
        "title": "Hộ Pháp Đọc Hiểu & Minh Triết",
        "elementColor": "#38bdf8",
        "spriteKey": "ho_phap_nguyet_nguyen",
        "portraitPath": "/assets/game/characters/npc/portraits/ho_phap_nguyet_nguyen.png",
        "x": 660,
        "y": 1260,
        "prompt": "[E] Luận Đạo Hộ Pháp Nguyệt Nguyên",
        "dialogueIntro": "Minh Triết Các soi rọi chân lý. Khi đối mặt với thuật ngụy tạo và mê trận thông tin của GREEN LIVING, hãy tìm đúng câu bằng chứng để phá tan ảo ảnh!"
      }
    ],
    "props": [
        {
                "id": "g12-u03_theme_prop",
                "name": "reusable woven market basket",
                "path": "/assets/game/units/grade-12/unit-03/props/theme_prop.png",
                "x": 1380,
                "y": 580,
                "size": [
                        160,
                        160
                ],
                "category": "vocab_discovery"
        },
        {
                "id": "g12-u03_secondary_prop",
                "name": "ceramic rainwater collection jar",
                "path": "/assets/game/units/grade-12/unit-03/props/secondary_prop.png",
                "x": 860,
                "y": 1300,
                "size": [
                        160,
                        160
                ],
                "category": "reading_clue"
        }
      ],
    "enemies": [
        {
                "encounterId": "g12-u03_enc_scout",
                "enemyId": "scout",
                "name": "Phế Khí Thám Tử",
                "title": "Tà Binh Tuần Tra",
                "concept": "waste scavenger with patched indigo clothes and discarded metal blade",
                "spritePath": "/assets/game/units/grade-12/unit-03/enemies/scout.png",
                "x": 1450,
                "y": 1050,
                "patrolRange": {
                        "minX": 1380,
                        "maxX": 1540
                },
                "hp": 150,
                "maxHp": 150,
                "attack": 19,
                "defense": 9,
                "xpReward": 104,
                "combatMode": "lost_word",
                "learningSkill": "Đoạt Lại Vong Từ (Từ Vựng & Cụm Từ Cốt Lõi)",
                "difficulty": "easy",
                "requiredQuestionsCount": 1,
                "winCondition": "Điền chính xác từ khuyết thiếu để đoạt lại vong từ",
                "tutorialBriefing": "Đoạt Lại Vong Từ: Kẻ địch che giấu một từ vựng trọng tâm. Dùng manh mối gợi ý và kiến thức để điền chính xác!"
        },
        {
                "encounterId": "g12-u03_enc_ranged",
                "enemyId": "ranged",
                "name": "Hủ Độc Cung Nhân",
                "title": "Tà Binh Tuần Tra",
                "concept": "soot archer firing smoky darts from a bamboo bow",
                "spritePath": "/assets/game/units/grade-12/unit-03/enemies/ranged.png",
                "x": 1950,
                "y": 1050,
                "patrolRange": {
                        "minX": 1870,
                        "maxX": 2030
                },
                "hp": 165,
                "maxHp": 165,
                "attack": 21,
                "defense": 10,
                "xpReward": 114,
                "combatMode": "listening_pursuit",
                "learningSkill": "Mê Âm Truy Kích (Luyện Nghe & Nhận Diện Ngữ Âm)",
                "difficulty": "easy",
                "requiredQuestionsCount": 1,
                "winCondition": "Lắng nghe thông điệp âm thanh và nhận diện chính xác yếu nghĩa",
                "tutorialBriefing": "Mê Âm Truy Kích: Kẻ địch truyền âm huyễn hoặc! Bấm nút Nghe để phát âm thanh khẩu quyết và giải mã ý nghĩa!"
        },
        {
                "encounterId": "g12-u03_enc_brute",
                "enemyId": "brute",
                "name": "Rác Thải Cuồng Nhân",
                "title": "Tà Binh Tuần Tra",
                "concept": "bulky landfill guardian wrapped in discarded pottery and cloth",
                "spritePath": "/assets/game/units/grade-12/unit-03/enemies/brute.png",
                "x": 2450,
                "y": 1150,
                "patrolRange": {
                        "minX": 2370,
                        "maxX": 2530
                },
                "hp": 180,
                "maxHp": 180,
                "attack": 23,
                "defense": 11,
                "xpReward": 124,
                "combatMode": "unseal",
                "learningSkill": "Phá Phong Ấn (Cấu Trúc Cú Pháp & Trật Tự Câu)",
                "difficulty": "medium",
                "requiredQuestionsCount": 1,
                "winCondition": "Sắp xếp các phiến đá từ ngữ thành câu đúng ngữ pháp",
                "tutorialBriefing": "Phá Phong Ấn: Giáp hộ thân của Thạch Nhân chỉ bị phá vỡ khi sắp xếp các từ ngữ theo đúng trật tự cú pháp!"
        },
        {
                "encounterId": "g12-u03_enc_construct",
                "enemyId": "construct",
                "name": "Ô Uế Khôi Lỗi",
                "title": "Tà Binh Tuần Tra",
                "concept": "golem of glass bottles and bamboo waste bins",
                "spritePath": "/assets/game/units/grade-12/unit-03/enemies/construct.png",
                "x": 2850,
                "y": 1300,
                "patrolRange": {
                        "minX": 2770,
                        "maxX": 2930
                },
                "hp": 195,
                "maxHp": 195,
                "attack": 25,
                "defense": 12,
                "xpReward": 134,
                "combatMode": "deception_pierce",
                "learningSkill": "Thiên Diện Phá Ảo (Đọc Hiểu & Định Vị Câu Dẫn Chứng)",
                "difficulty": "medium",
                "requiredQuestionsCount": 1,
                "winCondition": "Chọn đáp án đúng VÀ định vị đúng câu dẫn chứng [1]-[4]",
                "tutorialBriefing": "Thiên Diện Phá Ảo: Ảo ảnh che mắt! Đọc kỹ đoạn văn bản, chọn đáp án đúng và bấm chọn đúng CÂU DẪN CHỨNG [1]-[4]!"
        },
        {
                "encounterId": "g12-u03_enc_spirit",
                "enemyId": "spirit",
                "name": "Trọc Lưu Tà Linh",
                "title": "Tà Binh Tuần Tra",
                "concept": "dark smoke spirit with ember eyes and leaf edges",
                "spritePath": "/assets/game/units/grade-12/unit-03/enemies/spirit.png",
                "x": 1750,
                "y": 1380,
                "patrolRange": {
                        "minX": 1670,
                        "maxX": 1830
                },
                "hp": 210,
                "maxHp": 210,
                "attack": 27,
                "defense": 13,
                "xpReward": 144,
                "combatMode": "escort_dialogue",
                "learningSkill": "Hộ Tống Hội Thoại (Giao Tiếp Tình Huống & Phản Hồi Chiến Thuật)",
                "difficulty": "medium",
                "requiredQuestionsCount": 1,
                "winCondition": "Lựa chọn câu đối đáp thấu tình đạt lý, kích hoạt khiên hộ thể",
                "tutorialBriefing": "Hộ Tống Hội Thoại: Đối thủ dùng lời kích động tâm trí! Chọn phương án đối đáp chuẩn mực để kích hoạt khiên bảo hộ!"
        },
        {
                "encounterId": "g12-u03_enc_elite",
                "enemyId": "elite",
                "name": "Hoang Phí Ma Vương",
                "title": "Hộ Vệ Tinh Anh",
                "concept": "smog priest commanding polluted air with cracked green lantern",
                "spritePath": "/assets/game/units/grade-12/unit-03/enemies/elite.png",
                "x": 2250,
                "y": 1450,
                "patrolRange": {
                        "minX": 2170,
                        "maxX": 2330
                },
                "hp": 265,
                "maxHp": 265,
                "attack": 30,
                "defense": 13,
                "xpReward": 225,
                "combatMode": "triple_combo",
                "learningSkill": "Liên Hoàn Tam Chiêu (Tổng Hợp Nghe - Hiểu - Xuất Chiêu)",
                "difficulty": "hard",
                "requiredQuestionsCount": 1,
                "winCondition": "Hoàn thành chuỗi 3 chiêu thức: Thính âm -> Luận giải -> Xuất chiêu phá trận",
                "tutorialBriefing": "Liên Hoàn Tam Chiêu: Hộ vệ tinh anh sở hữu kiếm pháp liên hoàn! Hoàn thành liên tiếp 3 chiêu thức để trảm địch!"
        },
        {
                "encounterId": "g12-u03_enc_recycling_crab",
                "enemyId": "recycling_crab",
                "name": "Tuần Hoàn Cự Giải",
                "title": "Hộ Vệ Tinh Anh",
                "concept": "a bright-eyed crab-like construct built from salvaged bamboo and terracotta, corrupted by dark smoke",
                "spritePath": "/assets/game/units/grade-12/unit-03/enemies/recycling_crab.png",
                "x": 1350,
                "y": 1450,
                "patrolRange": {
                        "minX": 1270,
                        "maxX": 1430
                },
                "hp": 265,
                "maxHp": 265,
                "attack": 30,
                "defense": 13,
                "xpReward": 225,
                "combatMode": "deception_pierce",
                "learningSkill": "Thiên Diện Phá Ảo (Đọc Hiểu & Phá Bẫy Ngụy Tạo)",
                "difficulty": "hard",
                "requiredQuestionsCount": 1,
                "winCondition": "Giải mã bản văn tịch cổ và chỉ ra câu bằng chứng",
                "tutorialBriefing": "Thiên Diện Phá Ảo: Chướng khí biến ảo khôn lường! Đọc văn tịch và xác định đúng câu dẫn chứng để trừ tà!"
        }
      ],
    "climax": {
      "hasRealBoss": true,
      "encounterId": "g12-u03_boss_3",
      "enemy": {
          "id": "boss_g12-u03",
        "name": "Khói Độc Ma Quân",
        "title": "Chúa Tể Khói Thải & Rác Rưởi",
        "spriteKey": "/assets/game/units/grade-12/unit-03/bosses/smoke_sovereign.png",
        "hp": 415,
        "maxHp": 415,
        "attack": 41,
        "defense": 20,
        "xpReward": 570,
        "isBoss": true,
        "bossPhase": 1,
        "dialogueIntro": "“Khá khen tiểu bối dám bước vào Cấm Địa GREEN LIVING! Hãy nếm thử kiếm khí của Khói Độc Ma Quân!”",
        "dialoguePhase2": "“Cuồng Nộ Huyết Ma kích hoạt! Tuyệt kỹ GREEN LIVING sẽ biến ngươi thành tro bụi!”",
        "combatMode": "triple_combo",
        "learningSkill": "Quyết Chiến Đại Ma Đầu (2 Phase Liên Hoàn Tam Chiêu)",
        "difficulty": "hard",
        "requiredQuestionsCount": 1,
        "winCondition": "Đánh bại Ma Đầu qua 2 Phase sinh tử",
        "tutorialBriefing": "Quyết Chiến Boss: Đại Ma Đầu sở hữu 2 Phase cuồng nộ! Hãy hoàn thành Liên Hoàn Tam Chiêu và vượt qua tốc độ xuất chiêu bão táp!"
        },
      "x": 1600,
      "y": 1720,
      "barrierPrompt": "🔒 Ma Khí Cấm Địa (Cần >= 70% tiến độ)",
      "unlockedPrompt": "⚡ Cổng Ma Giáo Cấm Địa ĐÃ MỞ! Quyết chiến Khói Độc Ma Quân!"
    }
  },
  "g12-u04": {
    "unitId": "g12-u04",
    "grade": 12,
    "unitNumber": 4,
    "title": "URBANISATION",
    "topic": "Urban Migration, Megacities, Slums and Infrastructure Modernisation",
    "mapWidth": 3200,
    "mapHeight": 2000,
    "ground": {
      "primaryPath": "/assets/game/units/grade-12/unit-04/ground/main_ground.png",
      "secondaryPath": "/assets/game/units/grade-12/unit-04/ground/side_ground.png",
      "tileable": false
    },
    "npcs": [
      {
        "id": "bang_chu",
        "name": "Hồng y tông chủ Hà Ánh Phượng",
        "title": "Lãnh Tụ Võ Lâm Chính Phái",
        "elementColor": "#fbe285",
        "spriteKey": "bang_chu_ha_anh_phuong",
        "portraitPath": "/assets/game/characters/npc/portraits/bang_chu_ha_anh_phuong.png",
        "x": 550,
        "y": 560,
        "prompt": "[E] Bái kiến Hồng y tông chủ Hà Ánh Phượng",
        "dialogueIntro": "Chào mừng thiếu hiệp! Hôm nay chúng ta cùng khám phá Unit 4: URBANISATION (Urban Migration, Megacities, Slums and Infrastructure Modernisation). Hãy rèn luyện võ học, giải trừ ma chướng!"
      },
      {
        "id": "bach_khoa_thu_sinh",
        "name": "Bách Khoa thư Sinh Đinh Ngọc Khánh",
        "title": "Đại Sư Huynh Tông Môn",
        "elementColor": "#c084fc",
        "spriteKey": "bach_khoa_thu_sinh",
        "portraitPath": "/assets/game/characters/npc/portraits/bach_khoa_thu_sinh_v2.png",
        "x": 740,
        "y": 480,
        "prompt": "[E] Thỉnh Giáo Bách Khoa thư Sinh Đinh Ngọc Khánh",
        "dialogueIntro": "Chào sư đệ/sư muội! Đại học không nhàn như giang hồ đồn đâu các đệ... Nhưng qua được ải THPT này, thiên hạ sẽ mở rộng trước mắt! Có gì vướng mắc về bẫy thi cử hay kỹ năng thực chiến, cứ hỏi ta!"
      },
      {
        "id": "ho_phap_phuong_tu",
        "name": "Hộ Pháp Phương Tú",
        "title": "Hộ Pháp Từ Vựng & Trưởng Thành",
        "elementColor": "#59caa0",
        "spriteKey": "ho_phap_phuong_tu",
        "portraitPath": "/assets/game/characters/npc/portraits/ho_phap_phuong_tu.png",
        "x": 920,
        "y": 560,
        "prompt": "[E] Tham Vấn Hộ Pháp Phương Tú",
        "dialogueIntro": "Tàng Kinh Các lưu giữ toàn bộ bí điển từ vựng của URBANISATION. Hãy lĩnh hội từng câu chữ để tích lũy công lực căn bản!"
      },
      {
        "id": "ho_phap_dang_tran_ha",
        "name": "Hộ Pháp Đặng Trần Hà",
        "title": "Hộ Pháp Ngữ Pháp & Thách Đấu",
        "elementColor": "#60a5fa",
        "spriteKey": "ho_phap_dang_tran_ha",
        "portraitPath": "/assets/game/characters/npc/portraits/ho_phap_dang_tran_ha.png",
        "x": 1850,
        "y": 560,
        "prompt": "[E] Bái Kiến Hộ Pháp Đặng Trần Hà",
        "dialogueIntro": "Ngữ pháp là xương sống của kiếm chiêu! Muốn phá phong ấn thạch trận của URBANISATION, tâm ý phải chuẩn xác, cú pháp không được sai lệch một ly!"
      },
      {
        "id": "ho_phap_hoang_van",
        "name": "Hộ Pháp Hoàng Vân",
        "title": "Hộ Pháp Nghe & Nhịp Điệu",
        "elementColor": "#fbbf24",
        "spriteKey": "ho_phap_hoang_van",
        "portraitPath": "/assets/game/characters/npc/portraits/ho_phap_hoang_van.png",
        "x": 2400,
        "y": 760,
        "prompt": "[E] Thỉnh Giáo Hộ Pháp Hoàng Vân",
        "dialogueIntro": "Lắng nghe âm điệu tự nhiên, nghe rõ từng ngữ âm để thấu suốt chiêu thức địch nhân. Hãy vào Võ Luyện Đài luyện tập cùng ta!"
      },
      {
        "id": "ho_phap_nguyet_nguyen",
        "name": "Hộ Pháp Nguyệt Nguyên",
        "title": "Hộ Pháp Đọc Hiểu & Minh Triết",
        "elementColor": "#38bdf8",
        "spriteKey": "ho_phap_nguyet_nguyen",
        "portraitPath": "/assets/game/characters/npc/portraits/ho_phap_nguyet_nguyen.png",
        "x": 660,
        "y": 1260,
        "prompt": "[E] Luận Đạo Hộ Pháp Nguyệt Nguyên",
        "dialogueIntro": "Minh Triết Các soi rọi chân lý. Khi đối mặt với thuật ngụy tạo và mê trận thông tin của URBANISATION, hãy tìm đúng câu bằng chứng để phá tan ảo ảnh!"
      }
    ],
    "props": [
        {
                "id": "g12-u04_theme_prop",
                "name": "urban tree planter",
                "path": "/assets/game/units/grade-12/unit-04/props/theme_prop.png",
                "x": 1380,
                "y": 580,
                "size": [
                        160,
                        160
                ],
                "category": "vocab_discovery"
        },
        {
                "id": "g12-u04_secondary_prop",
                "name": "small urban tree planter with bamboo support",
                "path": "/assets/game/units/grade-12/unit-04/props/secondary_prop.png",
                "x": 860,
                "y": 1300,
                "size": [
                        160,
                        160
                ],
                "category": "reading_clue"
        }
      ],
    "enemies": [
        {
                "encounterId": "g12-u04_enc_scout",
                "enemyId": "scout",
                "name": "Tắc Nghẽn Thám Đồ",
                "title": "Tà Binh Tuần Tra",
                "concept": "rooftop construction scout with short blade and rope",
                "spritePath": "/assets/game/units/grade-12/unit-04/enemies/scout.png",
                "x": 1450,
                "y": 1050,
                "patrolRange": {
                        "minX": 1380,
                        "maxX": 1540
                },
                "hp": 160,
                "maxHp": 160,
                "attack": 20,
                "defense": 10,
                "xpReward": 112,
                "combatMode": "lost_word",
                "learningSkill": "Đoạt Lại Vong Từ (Từ Vựng & Cụm Từ Cốt Lõi)",
                "difficulty": "easy",
                "requiredQuestionsCount": 1,
                "winCondition": "Điền chính xác từ khuyết thiếu để đoạt lại vong từ",
                "tutorialBriefing": "Đoạt Lại Vong Từ: Kẻ địch che giấu một từ vựng trọng tâm. Dùng manh mối gợi ý và kiến thức để điền chính xác!"
        },
        {
                "encounterId": "g12-u04_enc_ranged",
                "enemyId": "ranged",
                "name": "Huyên Náo Xạ Thủ",
                "title": "Tà Binh Tuần Tra",
                "concept": "masked signal slinger on a narrow urban platform",
                "spritePath": "/assets/game/units/grade-12/unit-04/enemies/ranged.png",
                "x": 1950,
                "y": 1050,
                "patrolRange": {
                        "minX": 1870,
                        "maxX": 2030
                },
                "hp": 175,
                "maxHp": 175,
                "attack": 22,
                "defense": 11,
                "xpReward": 122,
                "combatMode": "listening_pursuit",
                "learningSkill": "Mê Âm Truy Kích (Luyện Nghe & Nhận Diện Ngữ Âm)",
                "difficulty": "easy",
                "requiredQuestionsCount": 1,
                "winCondition": "Lắng nghe thông điệp âm thanh và nhận diện chính xác yếu nghĩa",
                "tutorialBriefing": "Mê Âm Truy Kích: Kẻ địch truyền âm huyễn hoặc! Bấm nút Nghe để phát âm thanh khẩu quyết và giải mã ý nghĩa!"
        },
        {
                "encounterId": "g12-u04_enc_brute",
                "enemyId": "brute",
                "name": "Thành Thị Ma Đồ",
                "title": "Tà Binh Tuần Tra",
                "concept": "hulking construction debris bruiser with stone slab shield",
                "spritePath": "/assets/game/units/grade-12/unit-04/enemies/brute.png",
                "x": 2450,
                "y": 1150,
                "patrolRange": {
                        "minX": 2370,
                        "maxX": 2530
                },
                "hp": 190,
                "maxHp": 190,
                "attack": 24,
                "defense": 12,
                "xpReward": 132,
                "combatMode": "unseal",
                "learningSkill": "Phá Phong Ấn (Cấu Trúc Cú Pháp & Trật Tự Câu)",
                "difficulty": "medium",
                "requiredQuestionsCount": 1,
                "winCondition": "Sắp xếp các phiến đá từ ngữ thành câu đúng ngữ pháp",
                "tutorialBriefing": "Phá Phong Ấn: Giáp hộ thân của Thạch Nhân chỉ bị phá vỡ khi sắp xếp các từ ngữ theo đúng trật tự cú pháp!"
        },
        {
                "encounterId": "g12-u04_enc_construct",
                "enemyId": "construct",
                "name": "Bê Tông Khôi Lỗi",
                "title": "Tà Binh Tuần Tra",
                "concept": "concrete-and-bronze transit golem",
                "spritePath": "/assets/game/units/grade-12/unit-04/enemies/construct.png",
                "x": 2850,
                "y": 1300,
                "patrolRange": {
                        "minX": 2770,
                        "maxX": 2930
                },
                "hp": 205,
                "maxHp": 205,
                "attack": 26,
                "defense": 13,
                "xpReward": 142,
                "combatMode": "deception_pierce",
                "learningSkill": "Thiên Diện Phá Ảo (Đọc Hiểu & Định Vị Câu Dẫn Chứng)",
                "difficulty": "medium",
                "requiredQuestionsCount": 1,
                "winCondition": "Chọn đáp án đúng VÀ định vị đúng câu dẫn chứng [1]-[4]",
                "tutorialBriefing": "Thiên Diện Phá Ảo: Ảo ảnh che mắt! Đọc kỹ đoạn văn bản, chọn đáp án đúng và bấm chọn đúng CÂU DẪN CHỨNG [1]-[4]!"
        },
        {
                "encounterId": "g12-u04_enc_spirit",
                "enemyId": "spirit",
                "name": "Bụi Mù Oán Hồn",
                "title": "Tà Binh Tuần Tra",
                "concept": "floating smog shade with street-lamp glow",
                "spritePath": "/assets/game/units/grade-12/unit-04/enemies/spirit.png",
                "x": 1750,
                "y": 1380,
                "patrolRange": {
                        "minX": 1670,
                        "maxX": 1830
                },
                "hp": 220,
                "maxHp": 220,
                "attack": 28,
                "defense": 14,
                "xpReward": 152,
                "combatMode": "escort_dialogue",
                "learningSkill": "Hộ Tống Hội Thoại (Giao Tiếp Tình Huống & Phản Hồi Chiến Thuật)",
                "difficulty": "medium",
                "requiredQuestionsCount": 1,
                "winCondition": "Lựa chọn câu đối đáp thấu tình đạt lý, kích hoạt khiên hộ thể",
                "tutorialBriefing": "Hộ Tống Hội Thoại: Đối thủ dùng lời kích động tâm trí! Chọn phương án đối đáp chuẩn mực để kích hoạt khiên bảo hộ!"
        },
        {
                "encounterId": "g12-u04_enc_elite",
                "enemyId": "elite",
                "name": "Đô Thị Bá Chủ",
                "title": "Hộ Vệ Tinh Anh",
                "concept": "corrupt riverfront transit captain in dark uniform",
                "spritePath": "/assets/game/units/grade-12/unit-04/enemies/elite.png",
                "x": 2250,
                "y": 1450,
                "patrolRange": {
                        "minX": 2170,
                        "maxX": 2330
                },
                "hp": 280,
                "maxHp": 280,
                "attack": 32,
                "defense": 14,
                "xpReward": 240,
                "combatMode": "triple_combo",
                "learningSkill": "Liên Hoàn Tam Chiêu (Tổng Hợp Nghe - Hiểu - Xuất Chiêu)",
                "difficulty": "hard",
                "requiredQuestionsCount": 1,
                "winCondition": "Hoàn thành chuỗi 3 chiêu thức: Thính âm -> Luận giải -> Xuất chiêu phá trận",
                "tutorialBriefing": "Liên Hoàn Tam Chiêu: Hộ vệ tinh anh sở hữu kiếm pháp liên hoàn! Hoàn thành liên tiếp 3 chiêu thức để trảm địch!"
        },
        {
                "encounterId": "g12-u04_enc_traffic_serpent",
                "enemyId": "traffic_serpent",
                "name": "Lạc Dịch Xà Tinh",
                "title": "Hộ Vệ Tinh Anh",
                "concept": "a mechanical city transit serpent made of bamboo rails and bronze wheels",
                "spritePath": "/assets/game/units/grade-12/unit-04/enemies/traffic_serpent.png",
                "x": 1350,
                "y": 1450,
                "patrolRange": {
                        "minX": 1270,
                        "maxX": 1430
                },
                "hp": 280,
                "maxHp": 280,
                "attack": 32,
                "defense": 14,
                "xpReward": 240,
                "combatMode": "deception_pierce",
                "learningSkill": "Thiên Diện Phá Ảo (Đọc Hiểu & Phá Bẫy Ngụy Tạo)",
                "difficulty": "hard",
                "requiredQuestionsCount": 1,
                "winCondition": "Giải mã bản văn tịch cổ và chỉ ra câu bằng chứng",
                "tutorialBriefing": "Thiên Diện Phá Ảo: Chướng khí biến ảo khôn lường! Đọc văn tịch và xác định đúng câu dẫn chứng để trừ tà!"
        }
      ],
    "climax": {
      "hasRealBoss": false,
      "encounterId": "g12-u04_climax_4",
      "enemy": {
          "id": "climax_g12-u04",
        "name": "Thủ Trận Tinh Anh - URBANISATION",
        "title": "Trấn Thủ Trận Đỉnh Điểm",
        "spriteKey": "/assets/game/units/grade-12/unit-04/enemies/traffic_serpent.png",
        "hp": 360,
        "maxHp": 360,
        "attack": 34,
        "defense": 16,
        "xpReward": 420,
        "isBoss": false,
        "bossPhase": 1,
        "dialogueIntro": "“Ta là Thủ Trận Tinh Anh trấn giữ thạch trận đỉnh điểm của URBANISATION. Hãy dốc toàn lực chiến thắng để chứng minh sự tinh thông!”",
        "dialoguePhase2": "“Ngươi quả thực có thực lực! Đỡ chiêu biến hóa cuối cùng này!”",
        "combatMode": "triple_combo",
        "learningSkill": "Quyết Chiến Thủ Trận Tinh Anh (Thạch Trận Đỉnh Điểm)",
        "difficulty": "hard",
        "requiredQuestionsCount": 1,
        "winCondition": "Đánh bại Thủ Trận Tinh Anh để giải phóng toàn bộ Unit",
        "tutorialBriefing": "Phong Ấn Trận Đỉnh Điểm: Hoàn thành Liên Hoàn Tam Chiêu để phá tan kết giới, hoàn thành Unit và mở ra cảnh giới mới!"
        },
      "x": 1600,
      "y": 1720,
      "barrierPrompt": "🔒 Phong Ấn Trận Đỉnh Điểm (Cần >= 70% tiến độ)",
      "unlockedPrompt": "⚡ Phong Ấn Đỉnh Điểm ĐÃ MỞ! Thách đấu Thủ Trận Tinh Anh!"
    }
  },
  "g12-u05": {
    "unitId": "g12-u05",
    "grade": 12,
    "unitNumber": 5,
    "title": "THE WORLD OF WORK",
    "topic": "Modern Workplace, Career Requirements, Freelancing and Job Interviews",
    "mapWidth": 3200,
    "mapHeight": 2000,
    "ground": {
      "primaryPath": "/assets/game/units/grade-12/unit-05/ground/main_ground.png",
      "secondaryPath": "/assets/game/units/grade-12/unit-05/ground/side_ground.png",
      "tileable": false
    },
    "npcs": [
      {
        "id": "bang_chu",
        "name": "Hồng y tông chủ Hà Ánh Phượng",
        "title": "Lãnh Tụ Võ Lâm Chính Phái",
        "elementColor": "#fbe285",
        "spriteKey": "bang_chu_ha_anh_phuong",
        "portraitPath": "/assets/game/characters/npc/portraits/bang_chu_ha_anh_phuong.png",
        "x": 550,
        "y": 560,
        "prompt": "[E] Bái kiến Hồng y tông chủ Hà Ánh Phượng",
        "dialogueIntro": "Chào mừng thiếu hiệp! Hôm nay chúng ta cùng khám phá Unit 5: THE WORLD OF WORK (Modern Workplace, Career Requirements, Freelancing and Job Interviews). Hãy rèn luyện võ học, giải trừ ma chướng!"
      },
      {
        "id": "bach_khoa_thu_sinh",
        "name": "Bách Khoa thư Sinh Đinh Ngọc Khánh",
        "title": "Đại Sư Huynh Tông Môn",
        "elementColor": "#c084fc",
        "spriteKey": "bach_khoa_thu_sinh",
        "portraitPath": "/assets/game/characters/npc/portraits/bach_khoa_thu_sinh_v2.png",
        "x": 740,
        "y": 480,
        "prompt": "[E] Thỉnh Giáo Bách Khoa thư Sinh Đinh Ngọc Khánh",
        "dialogueIntro": "Chào sư đệ/sư muội! Đại học không nhàn như giang hồ đồn đâu các đệ... Nhưng qua được ải THPT này, thiên hạ sẽ mở rộng trước mắt! Có gì vướng mắc về bẫy thi cử hay kỹ năng thực chiến, cứ hỏi ta!"
      },
      {
        "id": "ho_phap_phuong_tu",
        "name": "Hộ Pháp Phương Tú",
        "title": "Hộ Pháp Từ Vựng & Trưởng Thành",
        "elementColor": "#59caa0",
        "spriteKey": "ho_phap_phuong_tu",
        "portraitPath": "/assets/game/characters/npc/portraits/ho_phap_phuong_tu.png",
        "x": 920,
        "y": 560,
        "prompt": "[E] Tham Vấn Hộ Pháp Phương Tú",
        "dialogueIntro": "Tàng Kinh Các lưu giữ toàn bộ bí điển từ vựng của THE WORLD OF WORK. Hãy lĩnh hội từng câu chữ để tích lũy công lực căn bản!"
      },
      {
        "id": "ho_phap_dang_tran_ha",
        "name": "Hộ Pháp Đặng Trần Hà",
        "title": "Hộ Pháp Ngữ Pháp & Thách Đấu",
        "elementColor": "#60a5fa",
        "spriteKey": "ho_phap_dang_tran_ha",
        "portraitPath": "/assets/game/characters/npc/portraits/ho_phap_dang_tran_ha.png",
        "x": 1850,
        "y": 560,
        "prompt": "[E] Bái Kiến Hộ Pháp Đặng Trần Hà",
        "dialogueIntro": "Ngữ pháp là xương sống của kiếm chiêu! Muốn phá phong ấn thạch trận của THE WORLD OF WORK, tâm ý phải chuẩn xác, cú pháp không được sai lệch một ly!"
      },
      {
        "id": "ho_phap_hoang_van",
        "name": "Hộ Pháp Hoàng Vân",
        "title": "Hộ Pháp Nghe & Nhịp Điệu",
        "elementColor": "#fbbf24",
        "spriteKey": "ho_phap_hoang_van",
        "portraitPath": "/assets/game/characters/npc/portraits/ho_phap_hoang_van.png",
        "x": 2400,
        "y": 760,
        "prompt": "[E] Thỉnh Giáo Hộ Pháp Hoàng Vân",
        "dialogueIntro": "Lắng nghe âm điệu tự nhiên, nghe rõ từng ngữ âm để thấu suốt chiêu thức địch nhân. Hãy vào Võ Luyện Đài luyện tập cùng ta!"
      },
      {
        "id": "ho_phap_nguyet_nguyen",
        "name": "Hộ Pháp Nguyệt Nguyên",
        "title": "Hộ Pháp Đọc Hiểu & Minh Triết",
        "elementColor": "#38bdf8",
        "spriteKey": "ho_phap_nguyet_nguyen",
        "portraitPath": "/assets/game/characters/npc/portraits/ho_phap_nguyet_nguyen.png",
        "x": 660,
        "y": 1260,
        "prompt": "[E] Luận Đạo Hộ Pháp Nguyệt Nguyên",
        "dialogueIntro": "Minh Triết Các soi rọi chân lý. Khi đối mặt với thuật ngụy tạo và mê trận thông tin của THE WORLD OF WORK, hãy tìm đúng câu bằng chứng để phá tan ảo ảnh!"
      }
    ],
    "props": [
        {
                "id": "g12-u05_theme_prop",
                "name": "artisan tool rack",
                "path": "/assets/game/units/grade-12/unit-05/props/theme_prop.png",
                "x": 1380,
                "y": 580,
                "size": [
                        160,
                        160
                ],
                "category": "vocab_discovery"
        },
        {
                "id": "g12-u05_secondary_prop",
                "name": "blacksmith forge tool stand",
                "path": "/assets/game/units/grade-12/unit-05/props/secondary_prop.png",
                "x": 860,
                "y": 1300,
                "size": [
                        160,
                        160
                ],
                "category": "quest_clue"
        }
      ],
    "enemies": [
        {
                "encounterId": "g12-u05_enc_scout",
                "enemyId": "scout",
                "name": "Thất Nghiệp Thám Tử",
                "title": "Tà Binh Tuần Tra",
                "concept": "forged-contract thief in artisan apron",
                "spritePath": "/assets/game/units/grade-12/unit-05/enemies/scout.png",
                "x": 1450,
                "y": 1050,
                "patrolRange": {
                        "minX": 1380,
                        "maxX": 1540
                },
                "hp": 170,
                "maxHp": 170,
                "attack": 21,
                "defense": 11,
                "xpReward": 120,
                "combatMode": "lost_word",
                "learningSkill": "Đoạt Lại Vong Từ (Từ Vựng & Cụm Từ Cốt Lõi)",
                "difficulty": "easy",
                "requiredQuestionsCount": 1,
                "winCondition": "Điền chính xác từ khuyết thiếu để đoạt lại vong từ",
                "tutorialBriefing": "Đoạt Lại Vong Từ: Kẻ địch che giấu một từ vựng trọng tâm. Dùng manh mối gợi ý và kiến thức để điền chính xác!"
        },
        {
                "encounterId": "g12-u05_enc_ranged",
                "enemyId": "ranged",
                "name": "Trì Trệ Xạ Thủ",
                "title": "Tà Binh Tuần Tra",
                "concept": "ranged tool thrower using small wooden hammers",
                "spritePath": "/assets/game/units/grade-12/unit-05/enemies/ranged.png",
                "x": 1950,
                "y": 1050,
                "patrolRange": {
                        "minX": 1870,
                        "maxX": 2030
                },
                "hp": 185,
                "maxHp": 185,
                "attack": 23,
                "defense": 12,
                "xpReward": 130,
                "combatMode": "listening_pursuit",
                "learningSkill": "Mê Âm Truy Kích (Luyện Nghe & Nhận Diện Ngữ Âm)",
                "difficulty": "easy",
                "requiredQuestionsCount": 1,
                "winCondition": "Lắng nghe thông điệp âm thanh và nhận diện chính xác yếu nghĩa",
                "tutorialBriefing": "Mê Âm Truy Kích: Kẻ địch truyền âm huyễn hoặc! Bấm nút Nghe để phát âm thanh khẩu quyết và giải mã ý nghĩa!"
        },
        {
                "encounterId": "g12-u05_enc_brute",
                "enemyId": "brute",
                "name": "Lao Dịch Trọng Binh",
                "title": "Tà Binh Tuần Tra",
                "concept": "forge bruiser carrying a cracked anvil hammer",
                "spritePath": "/assets/game/units/grade-12/unit-05/enemies/brute.png",
                "x": 2450,
                "y": 1150,
                "patrolRange": {
                        "minX": 2370,
                        "maxX": 2530
                },
                "hp": 200,
                "maxHp": 200,
                "attack": 25,
                "defense": 13,
                "xpReward": 140,
                "combatMode": "unseal",
                "learningSkill": "Phá Phong Ấn (Cấu Trúc Cú Pháp & Trật Tự Câu)",
                "difficulty": "medium",
                "requiredQuestionsCount": 1,
                "winCondition": "Sắp xếp các phiến đá từ ngữ thành câu đúng ngữ pháp",
                "tutorialBriefing": "Phá Phong Ấn: Giáp hộ thân của Thạch Nhân chỉ bị phá vỡ khi sắp xếp các từ ngữ theo đúng trật tự cú pháp!"
        },
        {
                "encounterId": "g12-u05_enc_construct",
                "enemyId": "construct",
                "name": "Công Xưởng Thiết Nhân",
                "title": "Tà Binh Tuần Tra",
                "concept": "animated workbench and craft-tool golem",
                "spritePath": "/assets/game/units/grade-12/unit-05/enemies/construct.png",
                "x": 2850,
                "y": 1300,
                "patrolRange": {
                        "minX": 2770,
                        "maxX": 2930
                },
                "hp": 215,
                "maxHp": 215,
                "attack": 27,
                "defense": 14,
                "xpReward": 150,
                "combatMode": "deception_pierce",
                "learningSkill": "Thiên Diện Phá Ảo (Đọc Hiểu & Định Vị Câu Dẫn Chứng)",
                "difficulty": "medium",
                "requiredQuestionsCount": 1,
                "winCondition": "Chọn đáp án đúng VÀ định vị đúng câu dẫn chứng [1]-[4]",
                "tutorialBriefing": "Thiên Diện Phá Ảo: Ảo ảnh che mắt! Đọc kỹ đoạn văn bản, chọn đáp án đúng và bấm chọn đúng CÂU DẪN CHỨNG [1]-[4]!"
        },
        {
                "encounterId": "g12-u05_enc_spirit",
                "enemyId": "spirit",
                "name": "Áp Lực Oán Linh",
                "title": "Tà Binh Tuần Tra",
                "concept": "floating furnace-soot spirit with ember eyes",
                "spritePath": "/assets/game/units/grade-12/unit-05/enemies/spirit.png",
                "x": 1750,
                "y": 1380,
                "patrolRange": {
                        "minX": 1670,
                        "maxX": 1830
                },
                "hp": 230,
                "maxHp": 230,
                "attack": 29,
                "defense": 15,
                "xpReward": 160,
                "combatMode": "escort_dialogue",
                "learningSkill": "Hộ Tống Hội Thoại (Giao Tiếp Tình Huống & Phản Hồi Chiến Thuật)",
                "difficulty": "medium",
                "requiredQuestionsCount": 1,
                "winCondition": "Lựa chọn câu đối đáp thấu tình đạt lý, kích hoạt khiên hộ thể",
                "tutorialBriefing": "Hộ Tống Hội Thoại: Đối thủ dùng lời kích động tâm trí! Chọn phương án đối đáp chuẩn mực để kích hoạt khiên bảo hộ!"
        },
        {
                "encounterId": "g12-u05_enc_elite",
                "enemyId": "elite",
                "name": "Nghiêm Khắc Giám Thị",
                "title": "Hộ Vệ Tinh Anh",
                "concept": "corrupt guildmaster with ornate tool belt and heavy staff",
                "spritePath": "/assets/game/units/grade-12/unit-05/enemies/elite.png",
                "x": 2250,
                "y": 1450,
                "patrolRange": {
                        "minX": 2170,
                        "maxX": 2330
                },
                "hp": 295,
                "maxHp": 295,
                "attack": 34,
                "defense": 15,
                "xpReward": 255,
                "combatMode": "triple_combo",
                "learningSkill": "Liên Hoàn Tam Chiêu (Tổng Hợp Nghe - Hiểu - Xuất Chiêu)",
                "difficulty": "hard",
                "requiredQuestionsCount": 1,
                "winCondition": "Hoàn thành chuỗi 3 chiêu thức: Thính âm -> Luận giải -> Xuất chiêu phá trận",
                "tutorialBriefing": "Liên Hoàn Tam Chiêu: Hộ vệ tinh anh sở hữu kiếm pháp liên hoàn! Hoàn thành liên tiếp 3 chiêu thức để trảm địch!"
        },
        {
                "encounterId": "g12-u05_enc_tool_mimic",
                "enemyId": "tool_mimic",
                "name": "Bách Nghệ Huyễn Khí",
                "title": "Hộ Vệ Tinh Anh",
                "concept": "a lively artisan tool chest mimic with wooden jaws and tiny tool limbs",
                "spritePath": "/assets/game/units/grade-12/unit-05/enemies/tool_mimic.png",
                "x": 1350,
                "y": 1450,
                "patrolRange": {
                        "minX": 1270,
                        "maxX": 1430
                },
                "hp": 295,
                "maxHp": 295,
                "attack": 34,
                "defense": 15,
                "xpReward": 255,
                "combatMode": "deception_pierce",
                "learningSkill": "Thiên Diện Phá Ảo (Đọc Hiểu & Phá Bẫy Ngụy Tạo)",
                "difficulty": "hard",
                "requiredQuestionsCount": 1,
                "winCondition": "Giải mã bản văn tịch cổ và chỉ ra câu bằng chứng",
                "tutorialBriefing": "Thiên Diện Phá Ảo: Chướng khí biến ảo khôn lường! Đọc văn tịch và xác định đúng câu dẫn chứng để trừ tà!"
        }
      ],
    "climax": {
      "hasRealBoss": false,
      "encounterId": "g12-u05_climax_5",
      "enemy": {
          "id": "climax_g12-u05",
        "name": "Thủ Trận Tinh Anh - THE WORLD OF WORK",
        "title": "Trấn Thủ Trận Đỉnh Điểm",
        "spriteKey": "/assets/game/units/grade-12/unit-05/enemies/tool_mimic.png",
        "hp": 380,
        "maxHp": 380,
        "attack": 36,
        "defense": 17,
        "xpReward": 445,
        "isBoss": false,
        "bossPhase": 1,
        "dialogueIntro": "“Ta là Thủ Trận Tinh Anh trấn giữ thạch trận đỉnh điểm của THE WORLD OF WORK. Hãy dốc toàn lực chiến thắng để chứng minh sự tinh thông!”",
        "dialoguePhase2": "“Ngươi quả thực có thực lực! Đỡ chiêu biến hóa cuối cùng này!”",
        "combatMode": "triple_combo",
        "learningSkill": "Quyết Chiến Thủ Trận Tinh Anh (Thạch Trận Đỉnh Điểm)",
        "difficulty": "hard",
        "requiredQuestionsCount": 1,
        "winCondition": "Đánh bại Thủ Trận Tinh Anh để giải phóng toàn bộ Unit",
        "tutorialBriefing": "Phong Ấn Trận Đỉnh Điểm: Hoàn thành Liên Hoàn Tam Chiêu để phá tan kết giới, hoàn thành Unit và mở ra cảnh giới mới!"
        },
      "x": 1600,
      "y": 1720,
      "barrierPrompt": "🔒 Phong Ấn Trận Đỉnh Điểm (Cần >= 70% tiến độ)",
      "unlockedPrompt": "⚡ Phong Ấn Đỉnh Điểm ĐÃ MỞ! Thách đấu Thủ Trận Tinh Anh!"
    }
  },
  "g12-u06": {
    "unitId": "g12-u06",
    "grade": 12,
    "unitNumber": 6,
    "title": "ARTIFICIAL INTELLIGENCE",
    "topic": "AI Breakthroughs, Machine Learning, Automation and Ethical Questions",
    "mapWidth": 3200,
    "mapHeight": 2000,
    "ground": {
      "primaryPath": "/assets/game/units/grade-12/unit-06/ground/main_ground.png",
      "secondaryPath": "/assets/game/units/grade-12/unit-06/ground/side_ground.png",
      "tileable": false
    },
    "npcs": [
      {
        "id": "bang_chu",
        "name": "Hồng y tông chủ Hà Ánh Phượng",
        "title": "Lãnh Tụ Võ Lâm Chính Phái",
        "elementColor": "#fbe285",
        "spriteKey": "bang_chu_ha_anh_phuong",
        "portraitPath": "/assets/game/characters/npc/portraits/bang_chu_ha_anh_phuong.png",
        "x": 550,
        "y": 560,
        "prompt": "[E] Bái kiến Hồng y tông chủ Hà Ánh Phượng",
        "dialogueIntro": "Chào mừng thiếu hiệp! Hôm nay chúng ta cùng khám phá Unit 6: ARTIFICIAL INTELLIGENCE (AI Breakthroughs, Machine Learning, Automation and Ethical Questions). Hãy rèn luyện võ học, giải trừ ma chướng!"
      },
      {
        "id": "bach_khoa_thu_sinh",
        "name": "Bách Khoa thư Sinh Đinh Ngọc Khánh",
        "title": "Đại Sư Huynh Tông Môn",
        "elementColor": "#c084fc",
        "spriteKey": "bach_khoa_thu_sinh",
        "portraitPath": "/assets/game/characters/npc/portraits/bach_khoa_thu_sinh_v2.png",
        "x": 740,
        "y": 480,
        "prompt": "[E] Thỉnh Giáo Bách Khoa thư Sinh Đinh Ngọc Khánh",
        "dialogueIntro": "Chào sư đệ/sư muội! Đại học không nhàn như giang hồ đồn đâu các đệ... Nhưng qua được ải THPT này, thiên hạ sẽ mở rộng trước mắt! Có gì vướng mắc về bẫy thi cử hay kỹ năng thực chiến, cứ hỏi ta!"
      },
      {
        "id": "ho_phap_phuong_tu",
        "name": "Hộ Pháp Phương Tú",
        "title": "Hộ Pháp Từ Vựng & Trưởng Thành",
        "elementColor": "#59caa0",
        "spriteKey": "ho_phap_phuong_tu",
        "portraitPath": "/assets/game/characters/npc/portraits/ho_phap_phuong_tu.png",
        "x": 920,
        "y": 560,
        "prompt": "[E] Tham Vấn Hộ Pháp Phương Tú",
        "dialogueIntro": "Tàng Kinh Các lưu giữ toàn bộ bí điển từ vựng của ARTIFICIAL INTELLIGENCE. Hãy lĩnh hội từng câu chữ để tích lũy công lực căn bản!"
      },
      {
        "id": "ho_phap_dang_tran_ha",
        "name": "Hộ Pháp Đặng Trần Hà",
        "title": "Hộ Pháp Ngữ Pháp & Thách Đấu",
        "elementColor": "#60a5fa",
        "spriteKey": "ho_phap_dang_tran_ha",
        "portraitPath": "/assets/game/characters/npc/portraits/ho_phap_dang_tran_ha.png",
        "x": 1850,
        "y": 560,
        "prompt": "[E] Bái Kiến Hộ Pháp Đặng Trần Hà",
        "dialogueIntro": "Ngữ pháp là xương sống của kiếm chiêu! Muốn phá phong ấn thạch trận của ARTIFICIAL INTELLIGENCE, tâm ý phải chuẩn xác, cú pháp không được sai lệch một ly!"
      },
      {
        "id": "ho_phap_hoang_van",
        "name": "Hộ Pháp Hoàng Vân",
        "title": "Hộ Pháp Nghe & Nhịp Điệu",
        "elementColor": "#fbbf24",
        "spriteKey": "ho_phap_hoang_van",
        "portraitPath": "/assets/game/characters/npc/portraits/ho_phap_hoang_van.png",
        "x": 2400,
        "y": 760,
        "prompt": "[E] Thỉnh Giáo Hộ Pháp Hoàng Vân",
        "dialogueIntro": "Lắng nghe âm điệu tự nhiên, nghe rõ từng ngữ âm để thấu suốt chiêu thức địch nhân. Hãy vào Võ Luyện Đài luyện tập cùng ta!"
      },
      {
        "id": "ho_phap_nguyet_nguyen",
        "name": "Hộ Pháp Nguyệt Nguyên",
        "title": "Hộ Pháp Đọc Hiểu & Minh Triết",
        "elementColor": "#38bdf8",
        "spriteKey": "ho_phap_nguyet_nguyen",
        "portraitPath": "/assets/game/characters/npc/portraits/ho_phap_nguyet_nguyen.png",
        "x": 660,
        "y": 1260,
        "prompt": "[E] Luận Đạo Hộ Pháp Nguyệt Nguyên",
        "dialogueIntro": "Minh Triết Các soi rọi chân lý. Khi đối mặt với thuật ngụy tạo và mê trận thông tin của ARTIFICIAL INTELLIGENCE, hãy tìm đúng câu bằng chứng để phá tan ảo ảnh!"
      }
    ],
    "props": [
        {
                "id": "g12-u06_theme_prop",
                "name": "bronze bamboo automaton core",
                "path": "/assets/game/units/grade-12/unit-06/props/theme_prop.png",
                "x": 1380,
                "y": 580,
                "size": [
                        160,
                        160
                ],
                "category": "vocab_discovery"
        },
        {
                "id": "g12-u06_secondary_prop",
                "name": "small bronze-and-bamboo logic device",
                "path": "/assets/game/units/grade-12/unit-06/props/secondary_prop.png",
                "x": 860,
                "y": 1300,
                "size": [
                        160,
                        160
                ],
                "category": "reading_clue"
        }
      ],
    "enemies": [
        {
                "encounterId": "g12-u06_enc_scout",
                "enemyId": "scout",
                "name": "Dữ Liệu Thám Đồ",
                "title": "Tà Binh Tuần Tra",
                "concept": "stealth bamboo-bronze automaton with narrow legs and red eye",
                "spritePath": "/assets/game/units/grade-12/unit-06/enemies/scout.png",
                "x": 1450,
                "y": 1050,
                "patrolRange": {
                        "minX": 1380,
                        "maxX": 1540
                },
                "hp": 180,
                "maxHp": 180,
                "attack": 22,
                "defense": 12,
                "xpReward": 128,
                "combatMode": "lost_word",
                "learningSkill": "Đoạt Lại Vong Từ (Từ Vựng & Cụm Từ Cốt Lõi)",
                "difficulty": "easy",
                "requiredQuestionsCount": 1,
                "winCondition": "Điền chính xác từ khuyết thiếu để đoạt lại vong từ",
                "tutorialBriefing": "Đoạt Lại Vong Từ: Kẻ địch che giấu một từ vựng trọng tâm. Dùng manh mối gợi ý và kiến thức để điền chính xác!"
        },
        {
                "encounterId": "g12-u06_enc_ranged",
                "enemyId": "ranged",
                "name": "Tia Sáng Xạ Thủ",
                "title": "Tà Binh Tuần Tra",
                "concept": "ranged bronze automaton firing jade energy bolts",
                "spritePath": "/assets/game/units/grade-12/unit-06/enemies/ranged.png",
                "x": 1950,
                "y": 1050,
                "patrolRange": {
                        "minX": 1870,
                        "maxX": 2030
                },
                "hp": 195,
                "maxHp": 195,
                "attack": 24,
                "defense": 13,
                "xpReward": 138,
                "combatMode": "listening_pursuit",
                "learningSkill": "Mê Âm Truy Kích (Luyện Nghe & Nhận Diện Ngữ Âm)",
                "difficulty": "easy",
                "requiredQuestionsCount": 1,
                "winCondition": "Lắng nghe thông điệp âm thanh và nhận diện chính xác yếu nghĩa",
                "tutorialBriefing": "Mê Âm Truy Kích: Kẻ địch truyền âm huyễn hoặc! Bấm nút Nghe để phát âm thanh khẩu quyết và giải mã ý nghĩa!"
        },
        {
                "encounterId": "g12-u06_enc_brute",
                "enemyId": "brute",
                "name": "Lập Trình Cuồng Nhân",
                "title": "Tà Binh Tuần Tra",
                "concept": "heavy logic guardian automaton with huge bronze arms",
                "spritePath": "/assets/game/units/grade-12/unit-06/enemies/brute.png",
                "x": 2450,
                "y": 1150,
                "patrolRange": {
                        "minX": 2370,
                        "maxX": 2530
                },
                "hp": 210,
                "maxHp": 210,
                "attack": 26,
                "defense": 14,
                "xpReward": 148,
                "combatMode": "unseal",
                "learningSkill": "Phá Phong Ấn (Cấu Trúc Cú Pháp & Trật Tự Câu)",
                "difficulty": "medium",
                "requiredQuestionsCount": 1,
                "winCondition": "Sắp xếp các phiến đá từ ngữ thành câu đúng ngữ pháp",
                "tutorialBriefing": "Phá Phong Ấn: Giáp hộ thân của Thạch Nhân chỉ bị phá vỡ khi sắp xếp các từ ngữ theo đúng trật tự cú pháp!"
        },
        {
                "encounterId": "g12-u06_enc_construct",
                "enemyId": "construct",
                "name": "Toán Pháp Khôi Lỗi",
                "title": "Tà Binh Tuần Tra",
                "concept": "geometric bamboo-and-bronze computation golem",
                "spritePath": "/assets/game/units/grade-12/unit-06/enemies/construct.png",
                "x": 2850,
                "y": 1300,
                "patrolRange": {
                        "minX": 2770,
                        "maxX": 2930
                },
                "hp": 225,
                "maxHp": 225,
                "attack": 28,
                "defense": 15,
                "xpReward": 158,
                "combatMode": "deception_pierce",
                "learningSkill": "Thiên Diện Phá Ảo (Đọc Hiểu & Định Vị Câu Dẫn Chứng)",
                "difficulty": "medium",
                "requiredQuestionsCount": 1,
                "winCondition": "Chọn đáp án đúng VÀ định vị đúng câu dẫn chứng [1]-[4]",
                "tutorialBriefing": "Thiên Diện Phá Ảo: Ảo ảnh che mắt! Đọc kỹ đoạn văn bản, chọn đáp án đúng và bấm chọn đúng CÂU DẪN CHỨNG [1]-[4]!"
        },
        {
                "encounterId": "g12-u06_enc_spirit",
                "enemyId": "spirit",
                "name": "Linh Hồn Kỹ Thuật Số",
                "title": "Tà Binh Tuần Tra",
                "concept": "luminous corrupted diagram spirit made of geometric light",
                "spritePath": "/assets/game/units/grade-12/unit-06/enemies/spirit.png",
                "x": 1750,
                "y": 1380,
                "patrolRange": {
                        "minX": 1670,
                        "maxX": 1830
                },
                "hp": 240,
                "maxHp": 240,
                "attack": 30,
                "defense": 16,
                "xpReward": 168,
                "combatMode": "escort_dialogue",
                "learningSkill": "Hộ Tống Hội Thoại (Giao Tiếp Tình Huống & Phản Hồi Chiến Thuật)",
                "difficulty": "medium",
                "requiredQuestionsCount": 1,
                "winCondition": "Lựa chọn câu đối đáp thấu tình đạt lý, kích hoạt khiên hộ thể",
                "tutorialBriefing": "Hộ Tống Hội Thoại: Đối thủ dùng lời kích động tâm trí! Chọn phương án đối đáp chuẩn mực để kích hoạt khiên bảo hộ!"
        },
        {
                "encounterId": "g12-u06_enc_elite",
                "enemyId": "elite",
                "name": "Trí Tuệ Nhân Tạo Tôn",
                "title": "Hộ Vệ Tinh Anh",
                "concept": "rogue cognition officer automaton with cracked scholarly mask",
                "spritePath": "/assets/game/units/grade-12/unit-06/enemies/elite.png",
                "x": 2250,
                "y": 1450,
                "patrolRange": {
                        "minX": 2170,
                        "maxX": 2330
                },
                "hp": 310,
                "maxHp": 310,
                "attack": 36,
                "defense": 16,
                "xpReward": 270,
                "combatMode": "triple_combo",
                "learningSkill": "Liên Hoàn Tam Chiêu (Tổng Hợp Nghe - Hiểu - Xuất Chiêu)",
                "difficulty": "hard",
                "requiredQuestionsCount": 1,
                "winCondition": "Hoàn thành chuỗi 3 chiêu thức: Thính âm -> Luận giải -> Xuất chiêu phá trận",
                "tutorialBriefing": "Liên Hoàn Tam Chiêu: Hộ vệ tinh anh sở hữu kiếm pháp liên hoàn! Hoàn thành liên tiếp 3 chiêu thức để trảm địch!"
        },
        {
                "encounterId": "g12-u06_enc_data_core",
                "enemyId": "data_core",
                "name": "Trí Tuệ Hạch Ma",
                "title": "Hộ Vệ Tinh Anh",
                "concept": "a hovering cracked bamboo-bronze computation core with many delicate mechanical arms",
                "spritePath": "/assets/game/units/grade-12/unit-06/enemies/data_core.png",
                "x": 1350,
                "y": 1450,
                "patrolRange": {
                        "minX": 1270,
                        "maxX": 1430
                },
                "hp": 310,
                "maxHp": 310,
                "attack": 36,
                "defense": 16,
                "xpReward": 270,
                "combatMode": "deception_pierce",
                "learningSkill": "Thiên Diện Phá Ảo (Đọc Hiểu & Phá Bẫy Ngụy Tạo)",
                "difficulty": "hard",
                "requiredQuestionsCount": 1,
                "winCondition": "Giải mã bản văn tịch cổ và chỉ ra câu bằng chứng",
                "tutorialBriefing": "Thiên Diện Phá Ảo: Chướng khí biến ảo khôn lường! Đọc văn tịch và xác định đúng câu dẫn chứng để trừ tà!"
        }
      ],
    "climax": {
      "hasRealBoss": true,
      "encounterId": "g12-u06_boss_6",
      "enemy": {
          "id": "boss_g12-u06",
        "name": "Ngụy Trí Ma Tôn",
        "title": "Trí Tuệ Giả Mạo Thao Túng Nhân Gian",
        "spriteKey": "/assets/game/units/grade-12/unit-06/bosses/false_intellect.png",
        "hp": 490,
        "maxHp": 490,
        "attack": 50,
        "defense": 26,
        "xpReward": 690,
        "isBoss": true,
        "bossPhase": 1,
        "dialogueIntro": "“Khá khen tiểu bối dám bước vào Cấm Địa ARTIFICIAL INTELLIGENCE! Hãy nếm thử kiếm khí của Ngụy Trí Ma Tôn!”",
        "dialoguePhase2": "“Cuồng Nộ Huyết Ma kích hoạt! Tuyệt kỹ ARTIFICIAL INTELLIGENCE sẽ biến ngươi thành tro bụi!”",
        "combatMode": "triple_combo",
        "learningSkill": "Quyết Chiến Đại Ma Đầu (2 Phase Liên Hoàn Tam Chiêu)",
        "difficulty": "hard",
        "requiredQuestionsCount": 1,
        "winCondition": "Đánh bại Ma Đầu qua 2 Phase sinh tử",
        "tutorialBriefing": "Quyết Chiến Boss: Đại Ma Đầu sở hữu 2 Phase cuồng nộ! Hãy hoàn thành Liên Hoàn Tam Chiêu và vượt qua tốc độ xuất chiêu bão táp!"
        },
      "x": 1600,
      "y": 1720,
      "barrierPrompt": "🔒 Ma Khí Cấm Địa (Cần >= 70% tiến độ)",
      "unlockedPrompt": "⚡ Cổng Ma Giáo Cấm Địa ĐÃ MỞ! Quyết chiến Ngụy Trí Ma Tôn!"
    }
  },
  "g12-u07": {
    "unitId": "g12-u07",
    "grade": 12,
    "unitNumber": 7,
    "title": "THE WORLD OF MASS MEDIA",
    "topic": "Digital Media, Social Networks, Journalism, Fake News and Media Literacy",
    "mapWidth": 3200,
    "mapHeight": 2000,
    "ground": {
      "primaryPath": "/assets/game/units/grade-12/unit-07/ground/main_ground.png",
      "secondaryPath": "/assets/game/units/grade-12/unit-07/ground/side_ground.png",
      "tileable": false
    },
    "npcs": [
      {
        "id": "bang_chu",
        "name": "Hồng y tông chủ Hà Ánh Phượng",
        "title": "Lãnh Tụ Võ Lâm Chính Phái",
        "elementColor": "#fbe285",
        "spriteKey": "bang_chu_ha_anh_phuong",
        "portraitPath": "/assets/game/characters/npc/portraits/bang_chu_ha_anh_phuong.png",
        "x": 550,
        "y": 560,
        "prompt": "[E] Bái kiến Hồng y tông chủ Hà Ánh Phượng",
        "dialogueIntro": "Chào mừng thiếu hiệp! Hôm nay chúng ta cùng khám phá Unit 7: THE WORLD OF MASS MEDIA (Digital Media, Social Networks, Journalism, Fake News and Media Literacy). Hãy rèn luyện võ học, giải trừ ma chướng!"
      },
      {
        "id": "bach_khoa_thu_sinh",
        "name": "Bách Khoa thư Sinh Đinh Ngọc Khánh",
        "title": "Đại Sư Huynh Tông Môn",
        "elementColor": "#c084fc",
        "spriteKey": "bach_khoa_thu_sinh",
        "portraitPath": "/assets/game/characters/npc/portraits/bach_khoa_thu_sinh_v2.png",
        "x": 740,
        "y": 480,
        "prompt": "[E] Thỉnh Giáo Bách Khoa thư Sinh Đinh Ngọc Khánh",
        "dialogueIntro": "Chào sư đệ/sư muội! Đại học không nhàn như giang hồ đồn đâu các đệ... Nhưng qua được ải THPT này, thiên hạ sẽ mở rộng trước mắt! Có gì vướng mắc về bẫy thi cử hay kỹ năng thực chiến, cứ hỏi ta!"
      },
      {
        "id": "ho_phap_phuong_tu",
        "name": "Hộ Pháp Phương Tú",
        "title": "Hộ Pháp Từ Vựng & Trưởng Thành",
        "elementColor": "#59caa0",
        "spriteKey": "ho_phap_phuong_tu",
        "portraitPath": "/assets/game/characters/npc/portraits/ho_phap_phuong_tu.png",
        "x": 920,
        "y": 560,
        "prompt": "[E] Tham Vấn Hộ Pháp Phương Tú",
        "dialogueIntro": "Tàng Kinh Các lưu giữ toàn bộ bí điển từ vựng của THE WORLD OF MASS MEDIA. Hãy lĩnh hội từng câu chữ để tích lũy công lực căn bản!"
      },
      {
        "id": "ho_phap_dang_tran_ha",
        "name": "Hộ Pháp Đặng Trần Hà",
        "title": "Hộ Pháp Ngữ Pháp & Thách Đấu",
        "elementColor": "#60a5fa",
        "spriteKey": "ho_phap_dang_tran_ha",
        "portraitPath": "/assets/game/characters/npc/portraits/ho_phap_dang_tran_ha.png",
        "x": 1850,
        "y": 560,
        "prompt": "[E] Bái Kiến Hộ Pháp Đặng Trần Hà",
        "dialogueIntro": "Ngữ pháp là xương sống của kiếm chiêu! Muốn phá phong ấn thạch trận của THE WORLD OF MASS MEDIA, tâm ý phải chuẩn xác, cú pháp không được sai lệch một ly!"
      },
      {
        "id": "ho_phap_hoang_van",
        "name": "Hộ Pháp Hoàng Vân",
        "title": "Hộ Pháp Nghe & Nhịp Điệu",
        "elementColor": "#fbbf24",
        "spriteKey": "ho_phap_hoang_van",
        "portraitPath": "/assets/game/characters/npc/portraits/ho_phap_hoang_van.png",
        "x": 2400,
        "y": 760,
        "prompt": "[E] Thỉnh Giáo Hộ Pháp Hoàng Vân",
        "dialogueIntro": "Lắng nghe âm điệu tự nhiên, nghe rõ từng ngữ âm để thấu suốt chiêu thức địch nhân. Hãy vào Võ Luyện Đài luyện tập cùng ta!"
      },
      {
        "id": "ho_phap_nguyet_nguyen",
        "name": "Hộ Pháp Nguyệt Nguyên",
        "title": "Hộ Pháp Đọc Hiểu & Minh Triết",
        "elementColor": "#38bdf8",
        "spriteKey": "ho_phap_nguyet_nguyen",
        "portraitPath": "/assets/game/characters/npc/portraits/ho_phap_nguyet_nguyen.png",
        "x": 660,
        "y": 1260,
        "prompt": "[E] Luận Đạo Hộ Pháp Nguyệt Nguyên",
        "dialogueIntro": "Minh Triết Các soi rọi chân lý. Khi đối mặt với thuật ngụy tạo và mê trận thông tin của THE WORLD OF MASS MEDIA, hãy tìm đúng câu bằng chứng để phá tan ảo ảnh!"
      }
    ],
    "props": [
        {
                "id": "g12-u07_theme_prop",
                "name": "woodblock printing press",
                "path": "/assets/game/units/grade-12/unit-07/props/theme_prop.png",
                "x": 1380,
                "y": 580,
                "size": [
                        160,
                        160
                ],
                "category": "vocab_discovery"
        },
        {
                "id": "g12-u07_secondary_prop",
                "name": "stack of blank illustrated broadsheets",
                "path": "/assets/game/units/grade-12/unit-07/props/secondary_prop.png",
                "x": 860,
                "y": 1300,
                "size": [
                        160,
                        160
                ],
                "category": "reading_clue"
        }
      ],
    "enemies": [
        {
                "encounterId": "g12-u07_enc_scout",
                "enemyId": "scout",
                "name": "Hư Giả Thám Tử",
                "title": "Tà Binh Tuần Tra",
                "concept": "rumor-spreading town crier with blank broadsheets",
                "spritePath": "/assets/game/units/grade-12/unit-07/enemies/scout.png",
                "x": 1450,
                "y": 1050,
                "patrolRange": {
                        "minX": 1380,
                        "maxX": 1540
                },
                "hp": 190,
                "maxHp": 190,
                "attack": 23,
                "defense": 13,
                "xpReward": 136,
                "combatMode": "lost_word",
                "learningSkill": "Đoạt Lại Vong Từ (Từ Vựng & Cụm Từ Cốt Lõi)",
                "difficulty": "easy",
                "requiredQuestionsCount": 1,
                "winCondition": "Điền chính xác từ khuyết thiếu để đoạt lại vong từ",
                "tutorialBriefing": "Đoạt Lại Vong Từ: Kẻ địch che giấu một từ vựng trọng tâm. Dùng manh mối gợi ý và kiến thức để điền chính xác!"
        },
        {
                "encounterId": "g12-u07_enc_ranged",
                "enemyId": "ranged",
                "name": "Khuấy Đảo Cung Thủ",
                "title": "Tà Binh Tuần Tra",
                "concept": "woodblock dart thrower carrying an ink-stained sling",
                "spritePath": "/assets/game/units/grade-12/unit-07/enemies/ranged.png",
                "x": 1950,
                "y": 1050,
                "patrolRange": {
                        "minX": 1870,
                        "maxX": 2030
                },
                "hp": 205,
                "maxHp": 205,
                "attack": 25,
                "defense": 14,
                "xpReward": 146,
                "combatMode": "listening_pursuit",
                "learningSkill": "Mê Âm Truy Kích (Luyện Nghe & Nhận Diện Ngữ Âm)",
                "difficulty": "easy",
                "requiredQuestionsCount": 1,
                "winCondition": "Lắng nghe thông điệp âm thanh và nhận diện chính xác yếu nghĩa",
                "tutorialBriefing": "Mê Âm Truy Kích: Kẻ địch truyền âm huyễn hoặc! Bấm nút Nghe để phát âm thanh khẩu quyết và giải mã ý nghĩa!"
        },
        {
                "encounterId": "g12-u07_enc_brute",
                "enemyId": "brute",
                "name": "Dư Luận Hung Đồ",
                "title": "Tà Binh Tuần Tra",
                "concept": "heavy printing-press enforcer with wooden roller",
                "spritePath": "/assets/game/units/grade-12/unit-07/enemies/brute.png",
                "x": 2450,
                "y": 1150,
                "patrolRange": {
                        "minX": 2370,
                        "maxX": 2530
                },
                "hp": 220,
                "maxHp": 220,
                "attack": 27,
                "defense": 15,
                "xpReward": 156,
                "combatMode": "unseal",
                "learningSkill": "Phá Phong Ấn (Cấu Trúc Cú Pháp & Trật Tự Câu)",
                "difficulty": "medium",
                "requiredQuestionsCount": 1,
                "winCondition": "Sắp xếp các phiến đá từ ngữ thành câu đúng ngữ pháp",
                "tutorialBriefing": "Phá Phong Ấn: Giáp hộ thân của Thạch Nhân chỉ bị phá vỡ khi sắp xếp các từ ngữ theo đúng trật tự cú pháp!"
        },
        {
                "encounterId": "g12-u07_enc_construct",
                "enemyId": "construct",
                "name": "Truyền Thông Khôi Lỗi",
                "title": "Tà Binh Tuần Tra",
                "concept": "animated woodblock printing plate golem",
                "spritePath": "/assets/game/units/grade-12/unit-07/enemies/construct.png",
                "x": 2850,
                "y": 1300,
                "patrolRange": {
                        "minX": 2770,
                        "maxX": 2930
                },
                "hp": 235,
                "maxHp": 235,
                "attack": 29,
                "defense": 16,
                "xpReward": 166,
                "combatMode": "deception_pierce",
                "learningSkill": "Thiên Diện Phá Ảo (Đọc Hiểu & Định Vị Câu Dẫn Chứng)",
                "difficulty": "medium",
                "requiredQuestionsCount": 1,
                "winCondition": "Chọn đáp án đúng VÀ định vị đúng câu dẫn chứng [1]-[4]",
                "tutorialBriefing": "Thiên Diện Phá Ảo: Ảo ảnh che mắt! Đọc kỹ đoạn văn bản, chọn đáp án đúng và bấm chọn đúng CÂU DẪN CHỨNG [1]-[4]!"
        },
        {
                "encounterId": "g12-u07_enc_spirit",
                "enemyId": "spirit",
                "name": "Tin Đồn Tà Linh",
                "title": "Tà Binh Tuần Tra",
                "concept": "phantom echo lantern with drifting blank paper",
                "spritePath": "/assets/game/units/grade-12/unit-07/enemies/spirit.png",
                "x": 1750,
                "y": 1380,
                "patrolRange": {
                        "minX": 1670,
                        "maxX": 1830
                },
                "hp": 250,
                "maxHp": 250,
                "attack": 31,
                "defense": 17,
                "xpReward": 176,
                "combatMode": "escort_dialogue",
                "learningSkill": "Hộ Tống Hội Thoại (Giao Tiếp Tình Huống & Phản Hồi Chiến Thuật)",
                "difficulty": "medium",
                "requiredQuestionsCount": 1,
                "winCondition": "Lựa chọn câu đối đáp thấu tình đạt lý, kích hoạt khiên hộ thể",
                "tutorialBriefing": "Hộ Tống Hội Thoại: Đối thủ dùng lời kích động tâm trí! Chọn phương án đối đáp chuẩn mực để kích hoạt khiên bảo hộ!"
        },
        {
                "encounterId": "g12-u07_enc_elite",
                "enemyId": "elite",
                "name": "Thao Túng Bá Tôn",
                "title": "Hộ Vệ Tinh Anh",
                "concept": "false editor commander in dark scholar robes and ink-brush staff",
                "spritePath": "/assets/game/units/grade-12/unit-07/enemies/elite.png",
                "x": 2250,
                "y": 1450,
                "patrolRange": {
                        "minX": 2170,
                        "maxX": 2330
                },
                "hp": 325,
                "maxHp": 325,
                "attack": 38,
                "defense": 17,
                "xpReward": 285,
                "combatMode": "triple_combo",
                "learningSkill": "Liên Hoàn Tam Chiêu (Tổng Hợp Nghe - Hiểu - Xuất Chiêu)",
                "difficulty": "hard",
                "requiredQuestionsCount": 1,
                "winCondition": "Hoàn thành chuỗi 3 chiêu thức: Thính âm -> Luận giải -> Xuất chiêu phá trận",
                "tutorialBriefing": "Liên Hoàn Tam Chiêu: Hộ vệ tinh anh sở hữu kiếm pháp liên hoàn! Hoàn thành liên tiếp 3 chiêu thức để trảm địch!"
        },
        {
                "encounterId": "g12-u07_enc_rumor_swarm",
                "enemyId": "rumor_swarm",
                "name": "Thị Phi Quỷ Đàn",
                "title": "Hộ Vệ Tinh Anh",
                "concept": "a vortex of blank paper butterflies and ink drops shaped like one enemy",
                "spritePath": "/assets/game/units/grade-12/unit-07/enemies/rumor_swarm.png",
                "x": 1350,
                "y": 1450,
                "patrolRange": {
                        "minX": 1270,
                        "maxX": 1430
                },
                "hp": 325,
                "maxHp": 325,
                "attack": 38,
                "defense": 17,
                "xpReward": 285,
                "combatMode": "deception_pierce",
                "learningSkill": "Thiên Diện Phá Ảo (Đọc Hiểu & Phá Bẫy Ngụy Tạo)",
                "difficulty": "hard",
                "requiredQuestionsCount": 1,
                "winCondition": "Giải mã bản văn tịch cổ và chỉ ra câu bằng chứng",
                "tutorialBriefing": "Thiên Diện Phá Ảo: Chướng khí biến ảo khôn lường! Đọc văn tịch và xác định đúng câu dẫn chứng để trừ tà!"
        }
      ],
    "climax": {
      "hasRealBoss": false,
      "encounterId": "g12-u07_climax_7",
      "enemy": {
          "id": "climax_g12-u07",
        "name": "Thủ Trận Tinh Anh - THE WORLD OF MASS MEDIA",
        "title": "Trấn Thủ Trận Đỉnh Điểm",
        "spriteKey": "/assets/game/units/grade-12/unit-07/enemies/rumor_swarm.png",
        "hp": 420,
        "maxHp": 420,
        "attack": 40,
        "defense": 19,
        "xpReward": 495,
        "isBoss": false,
        "bossPhase": 1,
        "dialogueIntro": "“Ta là Thủ Trận Tinh Anh trấn giữ thạch trận đỉnh điểm của THE WORLD OF MASS MEDIA. Hãy dốc toàn lực chiến thắng để chứng minh sự tinh thông!”",
        "dialoguePhase2": "“Ngươi quả thực có thực lực! Đỡ chiêu biến hóa cuối cùng này!”",
        "combatMode": "triple_combo",
        "learningSkill": "Quyết Chiến Thủ Trận Tinh Anh (Thạch Trận Đỉnh Điểm)",
        "difficulty": "hard",
        "requiredQuestionsCount": 1,
        "winCondition": "Đánh bại Thủ Trận Tinh Anh để giải phóng toàn bộ Unit",
        "tutorialBriefing": "Phong Ấn Trận Đỉnh Điểm: Hoàn thành Liên Hoàn Tam Chiêu để phá tan kết giới, hoàn thành Unit và mở ra cảnh giới mới!"
        },
      "x": 1600,
      "y": 1720,
      "barrierPrompt": "🔒 Phong Ấn Trận Đỉnh Điểm (Cần >= 70% tiến độ)",
      "unlockedPrompt": "⚡ Phong Ấn Đỉnh Điểm ĐÃ MỞ! Thách đấu Thủ Trận Tinh Anh!"
    }
  },
  "g12-u08": {
    "unitId": "g12-u08",
    "grade": 12,
    "unitNumber": 8,
    "title": "WILDLIFE CONSERVATION",
    "topic": "Endangered Species, IUCN Red List, Anti-poaching and Nature Sanctuaries",
    "mapWidth": 3200,
    "mapHeight": 2000,
    "ground": {
      "primaryPath": "/assets/game/units/grade-12/unit-08/ground/main_ground.png",
      "secondaryPath": "/assets/game/units/grade-12/unit-08/ground/side_ground.png",
      "tileable": false
    },
    "npcs": [
      {
        "id": "bang_chu",
        "name": "Hồng y tông chủ Hà Ánh Phượng",
        "title": "Lãnh Tụ Võ Lâm Chính Phái",
        "elementColor": "#fbe285",
        "spriteKey": "bang_chu_ha_anh_phuong",
        "portraitPath": "/assets/game/characters/npc/portraits/bang_chu_ha_anh_phuong.png",
        "x": 550,
        "y": 560,
        "prompt": "[E] Bái kiến Hồng y tông chủ Hà Ánh Phượng",
        "dialogueIntro": "Chào mừng thiếu hiệp! Hôm nay chúng ta cùng khám phá Unit 8: WILDLIFE CONSERVATION (Endangered Species, IUCN Red List, Anti-poaching and Nature Sanctuaries). Hãy rèn luyện võ học, giải trừ ma chướng!"
      },
      {
        "id": "bach_khoa_thu_sinh",
        "name": "Bách Khoa thư Sinh Đinh Ngọc Khánh",
        "title": "Đại Sư Huynh Tông Môn",
        "elementColor": "#c084fc",
        "spriteKey": "bach_khoa_thu_sinh",
        "portraitPath": "/assets/game/characters/npc/portraits/bach_khoa_thu_sinh_v2.png",
        "x": 740,
        "y": 480,
        "prompt": "[E] Thỉnh Giáo Bách Khoa thư Sinh Đinh Ngọc Khánh",
        "dialogueIntro": "Chào sư đệ/sư muội! Đại học không nhàn như giang hồ đồn đâu các đệ... Nhưng qua được ải THPT này, thiên hạ sẽ mở rộng trước mắt! Có gì vướng mắc về bẫy thi cử hay kỹ năng thực chiến, cứ hỏi ta!"
      },
      {
        "id": "ho_phap_phuong_tu",
        "name": "Hộ Pháp Phương Tú",
        "title": "Hộ Pháp Từ Vựng & Trưởng Thành",
        "elementColor": "#59caa0",
        "spriteKey": "ho_phap_phuong_tu",
        "portraitPath": "/assets/game/characters/npc/portraits/ho_phap_phuong_tu.png",
        "x": 920,
        "y": 560,
        "prompt": "[E] Tham Vấn Hộ Pháp Phương Tú",
        "dialogueIntro": "Tàng Kinh Các lưu giữ toàn bộ bí điển từ vựng của WILDLIFE CONSERVATION. Hãy lĩnh hội từng câu chữ để tích lũy công lực căn bản!"
      },
      {
        "id": "ho_phap_dang_tran_ha",
        "name": "Hộ Pháp Đặng Trần Hà",
        "title": "Hộ Pháp Ngữ Pháp & Thách Đấu",
        "elementColor": "#60a5fa",
        "spriteKey": "ho_phap_dang_tran_ha",
        "portraitPath": "/assets/game/characters/npc/portraits/ho_phap_dang_tran_ha.png",
        "x": 1850,
        "y": 560,
        "prompt": "[E] Bái Kiến Hộ Pháp Đặng Trần Hà",
        "dialogueIntro": "Ngữ pháp là xương sống của kiếm chiêu! Muốn phá phong ấn thạch trận của WILDLIFE CONSERVATION, tâm ý phải chuẩn xác, cú pháp không được sai lệch một ly!"
      },
      {
        "id": "ho_phap_hoang_van",
        "name": "Hộ Pháp Hoàng Vân",
        "title": "Hộ Pháp Nghe & Nhịp Điệu",
        "elementColor": "#fbbf24",
        "spriteKey": "ho_phap_hoang_van",
        "portraitPath": "/assets/game/characters/npc/portraits/ho_phap_hoang_van.png",
        "x": 2400,
        "y": 760,
        "prompt": "[E] Thỉnh Giáo Hộ Pháp Hoàng Vân",
        "dialogueIntro": "Lắng nghe âm điệu tự nhiên, nghe rõ từng ngữ âm để thấu suốt chiêu thức địch nhân. Hãy vào Võ Luyện Đài luyện tập cùng ta!"
      },
      {
        "id": "ho_phap_nguyet_nguyen",
        "name": "Hộ Pháp Nguyệt Nguyên",
        "title": "Hộ Pháp Đọc Hiểu & Minh Triết",
        "elementColor": "#38bdf8",
        "spriteKey": "ho_phap_nguyet_nguyen",
        "portraitPath": "/assets/game/characters/npc/portraits/ho_phap_nguyet_nguyen.png",
        "x": 660,
        "y": 1260,
        "prompt": "[E] Luận Đạo Hộ Pháp Nguyệt Nguyên",
        "dialogueIntro": "Minh Triết Các soi rọi chân lý. Khi đối mặt với thuật ngụy tạo và mê trận thông tin của WILDLIFE CONSERVATION, hãy tìm đúng câu bằng chứng để phá tan ảo ảnh!"
      }
    ],
    "props": [
        {
                "id": "g12-u08_theme_prop",
                "name": "ranger supply crate",
                "path": "/assets/game/units/grade-12/unit-08/props/theme_prop.png",
                "x": 1380,
                "y": 580,
                "size": [
                        160,
                        160
                ],
                "category": "vocab_discovery"
        },
        {
                "id": "g12-u08_secondary_prop",
                "name": "wildlife rescue bamboo cage left open",
                "path": "/assets/game/units/grade-12/unit-08/props/secondary_prop.png",
                "x": 860,
                "y": 1300,
                "size": [
                        160,
                        160
                ],
                "category": "quest_clue"
        }
      ],
    "enemies": [
        {
                "encounterId": "g12-u08_enc_scout",
                "enemyId": "scout",
                "name": "Săn Trộm Gian Tặc",
                "title": "Tà Binh Tuần Tra",
                "concept": "masked poacher scout carrying empty trap frame",
                "spritePath": "/assets/game/units/grade-12/unit-08/enemies/scout.png",
                "x": 1450,
                "y": 1050,
                "patrolRange": {
                        "minX": 1380,
                        "maxX": 1540
                },
                "hp": 200,
                "maxHp": 200,
                "attack": 24,
                "defense": 14,
                "xpReward": 144,
                "combatMode": "lost_word",
                "learningSkill": "Đoạt Lại Vong Từ (Từ Vựng & Cụm Từ Cốt Lõi)",
                "difficulty": "easy",
                "requiredQuestionsCount": 1,
                "winCondition": "Điền chính xác từ khuyết thiếu để đoạt lại vong từ",
                "tutorialBriefing": "Đoạt Lại Vong Từ: Kẻ địch che giấu một từ vựng trọng tâm. Dùng manh mối gợi ý và kiến thức để điền chính xác!"
        },
        {
                "encounterId": "g12-u08_enc_ranged",
                "enemyId": "ranged",
                "name": "Cạm Bẫy Xạ Thủ",
                "title": "Tà Binh Tuần Tra",
                "concept": "ranged poacher using bamboo dart launcher",
                "spritePath": "/assets/game/units/grade-12/unit-08/enemies/ranged.png",
                "x": 1950,
                "y": 1050,
                "patrolRange": {
                        "minX": 1870,
                        "maxX": 2030
                },
                "hp": 215,
                "maxHp": 215,
                "attack": 26,
                "defense": 15,
                "xpReward": 154,
                "combatMode": "listening_pursuit",
                "learningSkill": "Mê Âm Truy Kích (Luyện Nghe & Nhận Diện Ngữ Âm)",
                "difficulty": "easy",
                "requiredQuestionsCount": 1,
                "winCondition": "Lắng nghe thông điệp âm thanh và nhận diện chính xác yếu nghĩa",
                "tutorialBriefing": "Mê Âm Truy Kích: Kẻ địch truyền âm huyễn hoặc! Bấm nút Nghe để phát âm thanh khẩu quyết và giải mã ý nghĩa!"
        },
        {
                "encounterId": "g12-u08_enc_brute",
                "enemyId": "brute",
                "name": "Tàn Độc Thợ Săn",
                "title": "Tà Binh Tuần Tra",
                "concept": "chain-wielding habitat destroyer in dark field gear",
                "spritePath": "/assets/game/units/grade-12/unit-08/enemies/brute.png",
                "x": 2450,
                "y": 1150,
                "patrolRange": {
                        "minX": 2370,
                        "maxX": 2530
                },
                "hp": 230,
                "maxHp": 230,
                "attack": 28,
                "defense": 16,
                "xpReward": 164,
                "combatMode": "unseal",
                "learningSkill": "Phá Phong Ấn (Cấu Trúc Cú Pháp & Trật Tự Câu)",
                "difficulty": "medium",
                "requiredQuestionsCount": 1,
                "winCondition": "Sắp xếp các phiến đá từ ngữ thành câu đúng ngữ pháp",
                "tutorialBriefing": "Phá Phong Ấn: Giáp hộ thân của Thạch Nhân chỉ bị phá vỡ khi sắp xếp các từ ngữ theo đúng trật tự cú pháp!"
        },
        {
                "encounterId": "g12-u08_enc_construct",
                "enemyId": "construct",
                "name": "Lồng Sắt Khôi Lỗi",
                "title": "Tà Binh Tuần Tra",
                "concept": "animated iron cage and root golem",
                "spritePath": "/assets/game/units/grade-12/unit-08/enemies/construct.png",
                "x": 2850,
                "y": 1300,
                "patrolRange": {
                        "minX": 2770,
                        "maxX": 2930
                },
                "hp": 245,
                "maxHp": 245,
                "attack": 30,
                "defense": 17,
                "xpReward": 174,
                "combatMode": "deception_pierce",
                "learningSkill": "Thiên Diện Phá Ảo (Đọc Hiểu & Định Vị Câu Dẫn Chứng)",
                "difficulty": "medium",
                "requiredQuestionsCount": 1,
                "winCondition": "Chọn đáp án đúng VÀ định vị đúng câu dẫn chứng [1]-[4]",
                "tutorialBriefing": "Thiên Diện Phá Ảo: Ảo ảnh che mắt! Đọc kỹ đoạn văn bản, chọn đáp án đúng và bấm chọn đúng CÂU DẪN CHỨNG [1]-[4]!"
        },
        {
                "encounterId": "g12-u08_enc_spirit",
                "enemyId": "spirit",
                "name": "Tuyệt Chủng Oán Hồn",
                "title": "Tà Binh Tuần Tra",
                "concept": "injured forest habitat spirit with leaves and violet corruption",
                "spritePath": "/assets/game/units/grade-12/unit-08/enemies/spirit.png",
                "x": 1750,
                "y": 1380,
                "patrolRange": {
                        "minX": 1670,
                        "maxX": 1830
                },
                "hp": 260,
                "maxHp": 260,
                "attack": 32,
                "defense": 18,
                "xpReward": 184,
                "combatMode": "escort_dialogue",
                "learningSkill": "Hộ Tống Hội Thoại (Giao Tiếp Tình Huống & Phản Hồi Chiến Thuật)",
                "difficulty": "medium",
                "requiredQuestionsCount": 1,
                "winCondition": "Lựa chọn câu đối đáp thấu tình đạt lý, kích hoạt khiên hộ thể",
                "tutorialBriefing": "Hộ Tống Hội Thoại: Đối thủ dùng lời kích động tâm trí! Chọn phương án đối đáp chuẩn mực để kích hoạt khiên bảo hộ!"
        },
        {
                "encounterId": "g12-u08_enc_elite",
                "enemyId": "elite",
                "name": "Đồ Tể Rừng Già",
                "title": "Hộ Vệ Tinh Anh",
                "concept": "poacher captain with antler-shaped mask and net spear",
                "spritePath": "/assets/game/units/grade-12/unit-08/enemies/elite.png",
                "x": 2250,
                "y": 1450,
                "patrolRange": {
                        "minX": 2170,
                        "maxX": 2330
                },
                "hp": 340,
                "maxHp": 340,
                "attack": 40,
                "defense": 18,
                "xpReward": 300,
                "combatMode": "triple_combo",
                "learningSkill": "Liên Hoàn Tam Chiêu (Tổng Hợp Nghe - Hiểu - Xuất Chiêu)",
                "difficulty": "hard",
                "requiredQuestionsCount": 1,
                "winCondition": "Hoàn thành chuỗi 3 chiêu thức: Thính âm -> Luận giải -> Xuất chiêu phá trận",
                "tutorialBriefing": "Liên Hoàn Tam Chiêu: Hộ vệ tinh anh sở hữu kiếm pháp liên hoàn! Hoàn thành liên tiếp 3 chiêu thức để trảm địch!"
        },
        {
                "encounterId": "g12-u08_enc_snare_beast",
                "enemyId": "snare_beast",
                "name": "Cạm Bẫy Ma Thú",
                "title": "Hộ Vệ Tinh Anh",
                "concept": "a vine-covered wild boar spirit entangled in broken poacher traps",
                "spritePath": "/assets/game/units/grade-12/unit-08/enemies/snare_beast.png",
                "x": 1350,
                "y": 1450,
                "patrolRange": {
                        "minX": 1270,
                        "maxX": 1430
                },
                "hp": 340,
                "maxHp": 340,
                "attack": 40,
                "defense": 18,
                "xpReward": 300,
                "combatMode": "deception_pierce",
                "learningSkill": "Thiên Diện Phá Ảo (Đọc Hiểu & Phá Bẫy Ngụy Tạo)",
                "difficulty": "hard",
                "requiredQuestionsCount": 1,
                "winCondition": "Giải mã bản văn tịch cổ và chỉ ra câu bằng chứng",
                "tutorialBriefing": "Thiên Diện Phá Ảo: Chướng khí biến ảo khôn lường! Đọc văn tịch và xác định đúng câu dẫn chứng để trừ tà!"
        }
      ],
    "climax": {
      "hasRealBoss": false,
      "encounterId": "g12-u08_climax_8",
      "enemy": {
          "id": "climax_g12-u08",
        "name": "Thủ Trận Tinh Anh - WILDLIFE CONSERVATION",
        "title": "Trấn Thủ Trận Đỉnh Điểm",
        "spriteKey": "/assets/game/units/grade-12/unit-08/enemies/snare_beast.png",
        "hp": 440,
        "maxHp": 440,
        "attack": 42,
        "defense": 20,
        "xpReward": 520,
        "isBoss": false,
        "bossPhase": 1,
        "dialogueIntro": "“Ta là Thủ Trận Tinh Anh trấn giữ thạch trận đỉnh điểm của WILDLIFE CONSERVATION. Hãy dốc toàn lực chiến thắng để chứng minh sự tinh thông!”",
        "dialoguePhase2": "“Ngươi quả thực có thực lực! Đỡ chiêu biến hóa cuối cùng này!”",
        "combatMode": "triple_combo",
        "learningSkill": "Quyết Chiến Thủ Trận Tinh Anh (Thạch Trận Đỉnh Điểm)",
        "difficulty": "hard",
        "requiredQuestionsCount": 1,
        "winCondition": "Đánh bại Thủ Trận Tinh Anh để giải phóng toàn bộ Unit",
        "tutorialBriefing": "Phong Ấn Trận Đỉnh Điểm: Hoàn thành Liên Hoàn Tam Chiêu để phá tan kết giới, hoàn thành Unit và mở ra cảnh giới mới!"
        },
      "x": 1600,
      "y": 1720,
      "barrierPrompt": "🔒 Phong Ấn Trận Đỉnh Điểm (Cần >= 70% tiến độ)",
      "unlockedPrompt": "⚡ Phong Ấn Đỉnh Điểm ĐÃ MỞ! Thách đấu Thủ Trận Tinh Anh!"
    }
  },
  "g12-u09": {
    "unitId": "g12-u09",
    "grade": 12,
    "unitNumber": 9,
    "title": "CAREER PATHS",
    "topic": "Career Planning, Market Trends, Emerging Occupations and Professional Development",
    "mapWidth": 3200,
    "mapHeight": 2000,
    "ground": {
      "primaryPath": "/assets/game/units/grade-12/unit-09/ground/main_ground.png",
      "secondaryPath": "/assets/game/units/grade-12/unit-09/ground/side_ground.png",
      "tileable": false
    },
    "npcs": [
      {
        "id": "bang_chu",
        "name": "Hồng y tông chủ Hà Ánh Phượng",
        "title": "Lãnh Tụ Võ Lâm Chính Phái",
        "elementColor": "#fbe285",
        "spriteKey": "bang_chu_ha_anh_phuong",
        "portraitPath": "/assets/game/characters/npc/portraits/bang_chu_ha_anh_phuong.png",
        "x": 550,
        "y": 560,
        "prompt": "[E] Bái kiến Hồng y tông chủ Hà Ánh Phượng",
        "dialogueIntro": "Chào mừng thiếu hiệp! Hôm nay chúng ta cùng khám phá Unit 9: CAREER PATHS (Career Planning, Market Trends, Emerging Occupations and Professional Development). Hãy rèn luyện võ học, giải trừ ma chướng!"
      },
      {
        "id": "bach_khoa_thu_sinh",
        "name": "Bách Khoa thư Sinh Đinh Ngọc Khánh",
        "title": "Đại Sư Huynh Tông Môn",
        "elementColor": "#c084fc",
        "spriteKey": "bach_khoa_thu_sinh",
        "portraitPath": "/assets/game/characters/npc/portraits/bach_khoa_thu_sinh_v2.png",
        "x": 740,
        "y": 480,
        "prompt": "[E] Thỉnh Giáo Bách Khoa thư Sinh Đinh Ngọc Khánh",
        "dialogueIntro": "Chào sư đệ/sư muội! Đại học không nhàn như giang hồ đồn đâu các đệ... Nhưng qua được ải THPT này, thiên hạ sẽ mở rộng trước mắt! Có gì vướng mắc về bẫy thi cử hay kỹ năng thực chiến, cứ hỏi ta!"
      },
      {
        "id": "ho_phap_phuong_tu",
        "name": "Hộ Pháp Phương Tú",
        "title": "Hộ Pháp Từ Vựng & Trưởng Thành",
        "elementColor": "#59caa0",
        "spriteKey": "ho_phap_phuong_tu",
        "portraitPath": "/assets/game/characters/npc/portraits/ho_phap_phuong_tu.png",
        "x": 920,
        "y": 560,
        "prompt": "[E] Tham Vấn Hộ Pháp Phương Tú",
        "dialogueIntro": "Tàng Kinh Các lưu giữ toàn bộ bí điển từ vựng của CAREER PATHS. Hãy lĩnh hội từng câu chữ để tích lũy công lực căn bản!"
      },
      {
        "id": "ho_phap_dang_tran_ha",
        "name": "Hộ Pháp Đặng Trần Hà",
        "title": "Hộ Pháp Ngữ Pháp & Thách Đấu",
        "elementColor": "#60a5fa",
        "spriteKey": "ho_phap_dang_tran_ha",
        "portraitPath": "/assets/game/characters/npc/portraits/ho_phap_dang_tran_ha.png",
        "x": 1850,
        "y": 560,
        "prompt": "[E] Bái Kiến Hộ Pháp Đặng Trần Hà",
        "dialogueIntro": "Ngữ pháp là xương sống của kiếm chiêu! Muốn phá phong ấn thạch trận của CAREER PATHS, tâm ý phải chuẩn xác, cú pháp không được sai lệch một ly!"
      },
      {
        "id": "ho_phap_hoang_van",
        "name": "Hộ Pháp Hoàng Vân",
        "title": "Hộ Pháp Nghe & Nhịp Điệu",
        "elementColor": "#fbbf24",
        "spriteKey": "ho_phap_hoang_van",
        "portraitPath": "/assets/game/characters/npc/portraits/ho_phap_hoang_van.png",
        "x": 2400,
        "y": 760,
        "prompt": "[E] Thỉnh Giáo Hộ Pháp Hoàng Vân",
        "dialogueIntro": "Lắng nghe âm điệu tự nhiên, nghe rõ từng ngữ âm để thấu suốt chiêu thức địch nhân. Hãy vào Võ Luyện Đài luyện tập cùng ta!"
      },
      {
        "id": "ho_phap_nguyet_nguyen",
        "name": "Hộ Pháp Nguyệt Nguyên",
        "title": "Hộ Pháp Đọc Hiểu & Minh Triết",
        "elementColor": "#38bdf8",
        "spriteKey": "ho_phap_nguyet_nguyen",
        "portraitPath": "/assets/game/characters/npc/portraits/ho_phap_nguyet_nguyen.png",
        "x": 660,
        "y": 1260,
        "prompt": "[E] Luận Đạo Hộ Pháp Nguyệt Nguyên",
        "dialogueIntro": "Minh Triết Các soi rọi chân lý. Khi đối mặt với thuật ngụy tạo và mê trận thông tin của CAREER PATHS, hãy tìm đúng câu bằng chứng để phá tan ảo ảnh!"
      }
    ],
    "props": [
        {
                "id": "g12-u09_theme_prop",
                "name": "multi-craft signpost without text",
                "path": "/assets/game/units/grade-12/unit-09/props/theme_prop.png",
                "x": 1380,
                "y": 580,
                "size": [
                        160,
                        160
                ],
                "category": "vocab_discovery"
        },
        {
                "id": "g12-u09_secondary_prop",
                "name": "wooden apprenticeship toolkit and blank map",
                "path": "/assets/game/units/grade-12/unit-09/props/secondary_prop.png",
                "x": 860,
                "y": 1300,
                "size": [
                        160,
                        160
                ],
                "category": "quest_clue"
        }
      ],
    "enemies": [
        {
                "encounterId": "g12-u09_enc_scout",
                "enemyId": "scout",
                "name": "Mất Hướng Thám Tử",
                "title": "Tà Binh Tuần Tra",
                "concept": "deceptive false mentor wearing plain guild robes",
                "spritePath": "/assets/game/units/grade-12/unit-09/enemies/scout.png",
                "x": 1450,
                "y": 1050,
                "patrolRange": {
                        "minX": 1380,
                        "maxX": 1540
                },
                "hp": 210,
                "maxHp": 210,
                "attack": 25,
                "defense": 15,
                "xpReward": 152,
                "combatMode": "lost_word",
                "learningSkill": "Đoạt Lại Vong Từ (Từ Vựng & Cụm Từ Cốt Lõi)",
                "difficulty": "easy",
                "requiredQuestionsCount": 1,
                "winCondition": "Điền chính xác từ khuyết thiếu để đoạt lại vong từ",
                "tutorialBriefing": "Đoạt Lại Vong Từ: Kẻ địch che giấu một từ vựng trọng tâm. Dùng manh mối gợi ý và kiến thức để điền chính xác!"
        },
        {
                "encounterId": "g12-u09_enc_ranged",
                "enemyId": "ranged",
                "name": "Do Dự Cung Nhân",
                "title": "Tà Binh Tuần Tra",
                "concept": "certificate-dart hunter with blank paper scrolls",
                "spritePath": "/assets/game/units/grade-12/unit-09/enemies/ranged.png",
                "x": 1950,
                "y": 1050,
                "patrolRange": {
                        "minX": 1870,
                        "maxX": 2030
                },
                "hp": 225,
                "maxHp": 225,
                "attack": 27,
                "defense": 16,
                "xpReward": 162,
                "combatMode": "listening_pursuit",
                "learningSkill": "Mê Âm Truy Kích (Luyện Nghe & Nhận Diện Ngữ Âm)",
                "difficulty": "easy",
                "requiredQuestionsCount": 1,
                "winCondition": "Lắng nghe thông điệp âm thanh và nhận diện chính xác yếu nghĩa",
                "tutorialBriefing": "Mê Âm Truy Kích: Kẻ địch truyền âm huyễn hoặc! Bấm nút Nghe để phát âm thanh khẩu quyết và giải mã ý nghĩa!"
        },
        {
                "encounterId": "g12-u09_enc_brute",
                "enemyId": "brute",
                "name": "Trở Lực Đao Nhân",
                "title": "Tà Binh Tuần Tra",
                "concept": "heavy guild bruiser with false bronze insignia",
                "spritePath": "/assets/game/units/grade-12/unit-09/enemies/brute.png",
                "x": 2450,
                "y": 1150,
                "patrolRange": {
                        "minX": 2370,
                        "maxX": 2530
                },
                "hp": 240,
                "maxHp": 240,
                "attack": 29,
                "defense": 17,
                "xpReward": 172,
                "combatMode": "unseal",
                "learningSkill": "Phá Phong Ấn (Cấu Trúc Cú Pháp & Trật Tự Câu)",
                "difficulty": "medium",
                "requiredQuestionsCount": 1,
                "winCondition": "Sắp xếp các phiến đá từ ngữ thành câu đúng ngữ pháp",
                "tutorialBriefing": "Phá Phong Ấn: Giáp hộ thân của Thạch Nhân chỉ bị phá vỡ khi sắp xếp các từ ngữ theo đúng trật tự cú pháp!"
        },
        {
                "encounterId": "g12-u09_enc_construct",
                "enemyId": "construct",
                "name": "Kỳ Lộ Thiết Quái",
                "title": "Tà Binh Tuần Tra",
                "concept": "animated pile of guild badges and toolboxes",
                "spritePath": "/assets/game/units/grade-12/unit-09/enemies/construct.png",
                "x": 2850,
                "y": 1300,
                "patrolRange": {
                        "minX": 2770,
                        "maxX": 2930
                },
                "hp": 255,
                "maxHp": 255,
                "attack": 31,
                "defense": 18,
                "xpReward": 182,
                "combatMode": "deception_pierce",
                "learningSkill": "Thiên Diện Phá Ảo (Đọc Hiểu & Định Vị Câu Dẫn Chứng)",
                "difficulty": "medium",
                "requiredQuestionsCount": 1,
                "winCondition": "Chọn đáp án đúng VÀ định vị đúng câu dẫn chứng [1]-[4]",
                "tutorialBriefing": "Thiên Diện Phá Ảo: Ảo ảnh che mắt! Đọc kỹ đoạn văn bản, chọn đáp án đúng và bấm chọn đúng CÂU DẪN CHỨNG [1]-[4]!"
        },
        {
                "encounterId": "g12-u09_enc_spirit",
                "enemyId": "spirit",
                "name": "Bất Định U Hồn",
                "title": "Tà Binh Tuần Tra",
                "concept": "lost-path spirit formed from branching arrows",
                "spritePath": "/assets/game/units/grade-12/unit-09/enemies/spirit.png",
                "x": 1750,
                "y": 1380,
                "patrolRange": {
                        "minX": 1670,
                        "maxX": 1830
                },
                "hp": 270,
                "maxHp": 270,
                "attack": 33,
                "defense": 19,
                "xpReward": 192,
                "combatMode": "escort_dialogue",
                "learningSkill": "Hộ Tống Hội Thoại (Giao Tiếp Tình Huống & Phản Hồi Chiến Thuật)",
                "difficulty": "medium",
                "requiredQuestionsCount": 1,
                "winCondition": "Lựa chọn câu đối đáp thấu tình đạt lý, kích hoạt khiên hộ thể",
                "tutorialBriefing": "Hộ Tống Hội Thoại: Đối thủ dùng lời kích động tâm trí! Chọn phương án đối đáp chuẩn mực để kích hoạt khiên bảo hộ!"
        },
        {
                "encounterId": "g12-u09_enc_elite",
                "enemyId": "elite",
                "name": "Tiền Đồ Ma Sư",
                "title": "Hộ Vệ Tinh Anh",
                "concept": "false-path commander with many blank signposts on back",
                "spritePath": "/assets/game/units/grade-12/unit-09/enemies/elite.png",
                "x": 2250,
                "y": 1450,
                "patrolRange": {
                        "minX": 2170,
                        "maxX": 2330
                },
                "hp": 355,
                "maxHp": 355,
                "attack": 42,
                "defense": 19,
                "xpReward": 315,
                "combatMode": "triple_combo",
                "learningSkill": "Liên Hoàn Tam Chiêu (Tổng Hợp Nghe - Hiểu - Xuất Chiêu)",
                "difficulty": "hard",
                "requiredQuestionsCount": 1,
                "winCondition": "Hoàn thành chuỗi 3 chiêu thức: Thính âm -> Luận giải -> Xuất chiêu phá trận",
                "tutorialBriefing": "Liên Hoàn Tam Chiêu: Hộ vệ tinh anh sở hữu kiếm pháp liên hoàn! Hoàn thành liên tiếp 3 chiêu thức để trảm địch!"
        },
        {
                "encounterId": "g12-u09_enc_crossroads_illusion",
                "enemyId": "crossroads_illusion",
                "name": "Kỳ Lộ Mê Ảnh",
                "title": "Hộ Vệ Tinh Anh",
                "concept": "a shifting three-way signpost phantom with blank plaques and shadow legs",
                "spritePath": "/assets/game/units/grade-12/unit-09/enemies/crossroads_illusion.png",
                "x": 1350,
                "y": 1450,
                "patrolRange": {
                        "minX": 1270,
                        "maxX": 1430
                },
                "hp": 355,
                "maxHp": 355,
                "attack": 42,
                "defense": 19,
                "xpReward": 315,
                "combatMode": "deception_pierce",
                "learningSkill": "Thiên Diện Phá Ảo (Đọc Hiểu & Phá Bẫy Ngụy Tạo)",
                "difficulty": "hard",
                "requiredQuestionsCount": 1,
                "winCondition": "Giải mã bản văn tịch cổ và chỉ ra câu bằng chứng",
                "tutorialBriefing": "Thiên Diện Phá Ảo: Chướng khí biến ảo khôn lường! Đọc văn tịch và xác định đúng câu dẫn chứng để trừ tà!"
        }
      ],
    "climax": {
      "hasRealBoss": false,
      "encounterId": "g12-u09_climax_9",
      "enemy": {
          "id": "climax_g12-u09",
        "name": "Thủ Trận Tinh Anh - CAREER PATHS",
        "title": "Trấn Thủ Trận Đỉnh Điểm",
        "spriteKey": "/assets/game/units/grade-12/unit-09/enemies/crossroads_illusion.png",
        "hp": 460,
        "maxHp": 460,
        "attack": 44,
        "defense": 21,
        "xpReward": 545,
        "isBoss": false,
        "bossPhase": 1,
        "dialogueIntro": "“Ta là Thủ Trận Tinh Anh trấn giữ thạch trận đỉnh điểm của CAREER PATHS. Hãy dốc toàn lực chiến thắng để chứng minh sự tinh thông!”",
        "dialoguePhase2": "“Ngươi quả thực có thực lực! Đỡ chiêu biến hóa cuối cùng này!”",
        "combatMode": "triple_combo",
        "learningSkill": "Quyết Chiến Thủ Trận Tinh Anh (Thạch Trận Đỉnh Điểm)",
        "difficulty": "hard",
        "requiredQuestionsCount": 1,
        "winCondition": "Đánh bại Thủ Trận Tinh Anh để giải phóng toàn bộ Unit",
        "tutorialBriefing": "Phong Ấn Trận Đỉnh Điểm: Hoàn thành Liên Hoàn Tam Chiêu để phá tan kết giới, hoàn thành Unit và mở ra cảnh giới mới!"
        },
      "x": 1600,
      "y": 1720,
      "barrierPrompt": "🔒 Phong Ấn Trận Đỉnh Điểm (Cần >= 70% tiến độ)",
      "unlockedPrompt": "⚡ Phong Ấn Đỉnh Điểm ĐÃ MỞ! Thách đấu Thủ Trận Tinh Anh!"
    }
  },
  "g12-u10": {
    "unitId": "g12-u10",
    "grade": 12,
    "unitNumber": 10,
    "title": "LIFELONG LEARNING",
    "topic": "Continuous Education, Self-directed Learning, Digital Upskilling and Personal Growth",
    "mapWidth": 3200,
    "mapHeight": 2000,
    "ground": {
      "primaryPath": "/assets/game/units/grade-12/unit-10/ground/main_ground.png",
      "secondaryPath": "/assets/game/units/grade-12/unit-10/ground/side_ground.png",
      "tileable": false
    },
    "npcs": [
      {
        "id": "bang_chu",
        "name": "Hồng y tông chủ Hà Ánh Phượng",
        "title": "Lãnh Tụ Võ Lâm Chính Phái",
        "elementColor": "#fbe285",
        "spriteKey": "bang_chu_ha_anh_phuong",
        "portraitPath": "/assets/game/characters/npc/portraits/bang_chu_ha_anh_phuong.png",
        "x": 550,
        "y": 560,
        "prompt": "[E] Bái kiến Hồng y tông chủ Hà Ánh Phượng",
        "dialogueIntro": "Chào mừng thiếu hiệp! Hôm nay chúng ta cùng khám phá Unit 10: LIFELONG LEARNING (Continuous Education, Self-directed Learning, Digital Upskilling and Personal Growth). Hãy rèn luyện võ học, giải trừ ma chướng!"
      },
      {
        "id": "bach_khoa_thu_sinh",
        "name": "Bách Khoa thư Sinh Đinh Ngọc Khánh",
        "title": "Đại Sư Huynh Tông Môn",
        "elementColor": "#c084fc",
        "spriteKey": "bach_khoa_thu_sinh",
        "portraitPath": "/assets/game/characters/npc/portraits/bach_khoa_thu_sinh_v2.png",
        "x": 740,
        "y": 480,
        "prompt": "[E] Thỉnh Giáo Bách Khoa thư Sinh Đinh Ngọc Khánh",
        "dialogueIntro": "Chào sư đệ/sư muội! Đại học không nhàn như giang hồ đồn đâu các đệ... Nhưng qua được ải THPT này, thiên hạ sẽ mở rộng trước mắt! Có gì vướng mắc về bẫy thi cử hay kỹ năng thực chiến, cứ hỏi ta!"
      },
      {
        "id": "ho_phap_phuong_tu",
        "name": "Hộ Pháp Phương Tú",
        "title": "Hộ Pháp Từ Vựng & Trưởng Thành",
        "elementColor": "#59caa0",
        "spriteKey": "ho_phap_phuong_tu",
        "portraitPath": "/assets/game/characters/npc/portraits/ho_phap_phuong_tu.png",
        "x": 920,
        "y": 560,
        "prompt": "[E] Tham Vấn Hộ Pháp Phương Tú",
        "dialogueIntro": "Tàng Kinh Các lưu giữ toàn bộ bí điển từ vựng của LIFELONG LEARNING. Hãy lĩnh hội từng câu chữ để tích lũy công lực căn bản!"
      },
      {
        "id": "ho_phap_dang_tran_ha",
        "name": "Hộ Pháp Đặng Trần Hà",
        "title": "Hộ Pháp Ngữ Pháp & Thách Đấu",
        "elementColor": "#60a5fa",
        "spriteKey": "ho_phap_dang_tran_ha",
        "portraitPath": "/assets/game/characters/npc/portraits/ho_phap_dang_tran_ha.png",
        "x": 1850,
        "y": 560,
        "prompt": "[E] Bái Kiến Hộ Pháp Đặng Trần Hà",
        "dialogueIntro": "Ngữ pháp là xương sống của kiếm chiêu! Muốn phá phong ấn thạch trận của LIFELONG LEARNING, tâm ý phải chuẩn xác, cú pháp không được sai lệch một ly!"
      },
      {
        "id": "ho_phap_hoang_van",
        "name": "Hộ Pháp Hoàng Vân",
        "title": "Hộ Pháp Nghe & Nhịp Điệu",
        "elementColor": "#fbbf24",
        "spriteKey": "ho_phap_hoang_van",
        "portraitPath": "/assets/game/characters/npc/portraits/ho_phap_hoang_van.png",
        "x": 2400,
        "y": 760,
        "prompt": "[E] Thỉnh Giáo Hộ Pháp Hoàng Vân",
        "dialogueIntro": "Lắng nghe âm điệu tự nhiên, nghe rõ từng ngữ âm để thấu suốt chiêu thức địch nhân. Hãy vào Võ Luyện Đài luyện tập cùng ta!"
      },
      {
        "id": "ho_phap_nguyet_nguyen",
        "name": "Hộ Pháp Nguyệt Nguyên",
        "title": "Hộ Pháp Đọc Hiểu & Minh Triết",
        "elementColor": "#38bdf8",
        "spriteKey": "ho_phap_nguyet_nguyen",
        "portraitPath": "/assets/game/characters/npc/portraits/ho_phap_nguyet_nguyen.png",
        "x": 660,
        "y": 1260,
        "prompt": "[E] Luận Đạo Hộ Pháp Nguyệt Nguyên",
        "dialogueIntro": "Minh Triết Các soi rọi chân lý. Khi đối mặt với thuật ngụy tạo và mê trận thông tin của LIFELONG LEARNING, hãy tìm đúng câu bằng chứng để phá tan ảo ảnh!"
      }
    ],
    "props": [
        {
                "id": "g12-u10_theme_prop",
                "name": "open knowledge scroll stand",
                "path": "/assets/game/units/grade-12/unit-10/props/theme_prop.png",
                "x": 1380,
                "y": 580,
                "size": [
                        160,
                        160
                ],
                "category": "vocab_discovery"
        },
        {
                "id": "g12-u10_secondary_prop",
                "name": "small lantern-lit reading desk with blank open scroll",
                "path": "/assets/game/units/grade-12/unit-10/props/secondary_prop.png",
                "x": 860,
                "y": 1300,
                "size": [
                        160,
                        160
                ],
                "category": "reading_clue"
        }
      ],
    "enemies": [
        {
                "encounterId": "g12-u10_enc_scout",
                "enemyId": "scout",
                "name": "Hạn Hẹp Thám Đồ",
                "title": "Tà Binh Tuần Tra",
                "concept": "forgotten scholar disciple with broken scroll satchel",
                "spritePath": "/assets/game/units/grade-12/unit-10/enemies/scout.png",
                "x": 1450,
                "y": 1050,
                "patrolRange": {
                        "minX": 1380,
                        "maxX": 1540
                },
                "hp": 220,
                "maxHp": 220,
                "attack": 26,
                "defense": 16,
                "xpReward": 160,
                "combatMode": "lost_word",
                "learningSkill": "Đoạt Lại Vong Từ (Từ Vựng & Cụm Từ Cốt Lõi)",
                "difficulty": "easy",
                "requiredQuestionsCount": 1,
                "winCondition": "Điền chính xác từ khuyết thiếu để đoạt lại vong từ",
                "tutorialBriefing": "Đoạt Lại Vong Từ: Kẻ địch che giấu một từ vựng trọng tâm. Dùng manh mối gợi ý và kiến thức để điền chính xác!"
        },
        {
                "encounterId": "g12-u10_enc_ranged",
                "enemyId": "ranged",
                "name": "Bảo Thủ Xạ Thủ",
                "title": "Tà Binh Tuần Tra",
                "concept": "ink-dart archer firing dark droplets",
                "spritePath": "/assets/game/units/grade-12/unit-10/enemies/ranged.png",
                "x": 1950,
                "y": 1050,
                "patrolRange": {
                        "minX": 1870,
                        "maxX": 2030
                },
                "hp": 235,
                "maxHp": 235,
                "attack": 28,
                "defense": 17,
                "xpReward": 170,
                "combatMode": "listening_pursuit",
                "learningSkill": "Mê Âm Truy Kích (Luyện Nghe & Nhận Diện Ngữ Âm)",
                "difficulty": "easy",
                "requiredQuestionsCount": 1,
                "winCondition": "Lắng nghe thông điệp âm thanh và nhận diện chính xác yếu nghĩa",
                "tutorialBriefing": "Mê Âm Truy Kích: Kẻ địch truyền âm huyễn hoặc! Bấm nút Nghe để phát âm thanh khẩu quyết và giải mã ý nghĩa!"
        },
        {
                "encounterId": "g12-u10_enc_brute",
                "enemyId": "brute",
                "name": "Cố Bộ Ma Nhân",
                "title": "Tà Binh Tuần Tra",
                "concept": "heavy tome bruiser with giant sealed book shield",
                "spritePath": "/assets/game/units/grade-12/unit-10/enemies/brute.png",
                "x": 2450,
                "y": 1150,
                "patrolRange": {
                        "minX": 2370,
                        "maxX": 2530
                },
                "hp": 250,
                "maxHp": 250,
                "attack": 30,
                "defense": 18,
                "xpReward": 180,
                "combatMode": "unseal",
                "learningSkill": "Phá Phong Ấn (Cấu Trúc Cú Pháp & Trật Tự Câu)",
                "difficulty": "medium",
                "requiredQuestionsCount": 1,
                "winCondition": "Sắp xếp các phiến đá từ ngữ thành câu đúng ngữ pháp",
                "tutorialBriefing": "Phá Phong Ấn: Giáp hộ thân của Thạch Nhân chỉ bị phá vỡ khi sắp xếp các từ ngữ theo đúng trật tự cú pháp!"
        },
        {
                "encounterId": "g12-u10_enc_construct",
                "enemyId": "construct",
                "name": "Khóa Tri Khôi Lỗi",
                "title": "Tà Binh Tuần Tra",
                "concept": "animated stack of sealed books and bronze clasps",
                "spritePath": "/assets/game/units/grade-12/unit-10/enemies/construct.png",
                "x": 2850,
                "y": 1300,
                "patrolRange": {
                        "minX": 2770,
                        "maxX": 2930
                },
                "hp": 265,
                "maxHp": 265,
                "attack": 32,
                "defense": 19,
                "xpReward": 190,
                "combatMode": "deception_pierce",
                "learningSkill": "Thiên Diện Phá Ảo (Đọc Hiểu & Định Vị Câu Dẫn Chứng)",
                "difficulty": "medium",
                "requiredQuestionsCount": 1,
                "winCondition": "Chọn đáp án đúng VÀ định vị đúng câu dẫn chứng [1]-[4]",
                "tutorialBriefing": "Thiên Diện Phá Ảo: Ảo ảnh che mắt! Đọc kỹ đoạn văn bản, chọn đáp án đúng và bấm chọn đúng CÂU DẪN CHỨNG [1]-[4]!"
        },
        {
                "encounterId": "g12-u10_enc_spirit",
                "enemyId": "spirit",
                "name": "Vô Tri Oán Linh",
                "title": "Tà Binh Tuần Tra",
                "concept": "forgetting-mist spirit with fragmented blank pages",
                "spritePath": "/assets/game/units/grade-12/unit-10/enemies/spirit.png",
                "x": 1750,
                "y": 1380,
                "patrolRange": {
                        "minX": 1670,
                        "maxX": 1830
                },
                "hp": 280,
                "maxHp": 280,
                "attack": 34,
                "defense": 20,
                "xpReward": 200,
                "combatMode": "escort_dialogue",
                "learningSkill": "Hộ Tống Hội Thoại (Giao Tiếp Tình Huống & Phản Hồi Chiến Thuật)",
                "difficulty": "medium",
                "requiredQuestionsCount": 1,
                "winCondition": "Lựa chọn câu đối đáp thấu tình đạt lý, kích hoạt khiên hộ thể",
                "tutorialBriefing": "Hộ Tống Hội Thoại: Đối thủ dùng lời kích động tâm trí! Chọn phương án đối đáp chuẩn mực để kích hoạt khiên bảo hộ!"
        },
        {
                "encounterId": "g12-u10_enc_elite",
                "enemyId": "elite",
                "name": "Phong Trí Tôn Giả",
                "title": "Hộ Vệ Tinh Anh",
                "concept": "elite final disciple of Vô Ngôn Ma Tôn in black-red scholarly armor",
                "spritePath": "/assets/game/units/grade-12/unit-10/enemies/elite.png",
                "x": 2250,
                "y": 1450,
                "patrolRange": {
                        "minX": 2170,
                        "maxX": 2330
                },
                "hp": 370,
                "maxHp": 370,
                "attack": 44,
                "defense": 20,
                "xpReward": 330,
                "combatMode": "triple_combo",
                "learningSkill": "Liên Hoàn Tam Chiêu (Tổng Hợp Nghe - Hiểu - Xuất Chiêu)",
                "difficulty": "hard",
                "requiredQuestionsCount": 1,
                "winCondition": "Hoàn thành chuỗi 3 chiêu thức: Thính âm -> Luận giải -> Xuất chiêu phá trận",
                "tutorialBriefing": "Liên Hoàn Tam Chiêu: Hộ vệ tinh anh sở hữu kiếm pháp liên hoàn! Hoàn thành liên tiếp 3 chiêu thức để trảm địch!"
        },
        {
                "encounterId": "g12-u10_enc_ink_phoenix",
                "enemyId": "ink_phoenix",
                "name": "Hắc Mặc Huyễn Phượng",
                "title": "Hộ Vệ Tinh Anh",
                "concept": "a dark ink-and-paper bird spirit representing stolen language and learning",
                "spritePath": "/assets/game/units/grade-12/unit-10/enemies/ink_phoenix.png",
                "x": 1350,
                "y": 1450,
                "patrolRange": {
                        "minX": 1270,
                        "maxX": 1430
                },
                "hp": 370,
                "maxHp": 370,
                "attack": 44,
                "defense": 20,
                "xpReward": 330,
                "combatMode": "deception_pierce",
                "learningSkill": "Thiên Diện Phá Ảo (Đọc Hiểu & Phá Bẫy Ngụy Tạo)",
                "difficulty": "hard",
                "requiredQuestionsCount": 1,
                "winCondition": "Giải mã bản văn tịch cổ và chỉ ra câu bằng chứng",
                "tutorialBriefing": "Thiên Diện Phá Ảo: Chướng khí biến ảo khôn lường! Đọc văn tịch và xác định đúng câu dẫn chứng để trừ tà!"
        }
      ],
    "climax": {
      "hasRealBoss": true,
      "encounterId": "g12-u10_boss_10",
      "enemy": {
          "id": "boss_g12-u10",
        "name": "Vô Ngôn Ma Tôn",
        "title": "Tuyệt Đỉnh Ma Đầu Phong Tỏa Ngôn Từ",
        "spriteKey": "/assets/game/characters/bosses/vo_ngon_ma_ton.png",
        "hp": 590,
        "maxHp": 590,
        "attack": 62,
        "defense": 34,
        "xpReward": 850,
        "isBoss": true,
        "bossPhase": 1,
        "dialogueIntro": "“Khá khen tiểu bối dám bước vào Cấm Địa LIFELONG LEARNING! Hãy nếm thử kiếm khí của Vô Ngôn Ma Tôn!”",
        "dialoguePhase2": "“Cuồng Nộ Huyết Ma kích hoạt! Tuyệt kỹ LIFELONG LEARNING sẽ biến ngươi thành tro bụi!”",
        "combatMode": "triple_combo",
        "learningSkill": "Quyết Chiến Đại Ma Đầu (2 Phase Liên Hoàn Tam Chiêu)",
        "difficulty": "hard",
        "requiredQuestionsCount": 1,
        "winCondition": "Đánh bại Ma Đầu qua 2 Phase sinh tử",
        "tutorialBriefing": "Quyết Chiến Boss: Đại Ma Đầu sở hữu 2 Phase cuồng nộ! Hãy hoàn thành Liên Hoàn Tam Chiêu và vượt qua tốc độ xuất chiêu bão táp!"
        },
      "x": 1600,
      "y": 1720,
      "barrierPrompt": "🔒 Ma Khí Cấm Địa (Cần >= 70% tiến độ)",
      "unlockedPrompt": "⚡ Cổng Ma Giáo Cấm Địa ĐÃ MỞ! Quyết chiến Vô Ngôn Ma Tôn!"
    }
  }
};

export function getLevelConfig(unitId: string): LevelMapConfig {
  return ALL_LEVEL_CONFIGS[unitId] || ALL_LEVEL_CONFIGS['g10-u01'];
}
