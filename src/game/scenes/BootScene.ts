import Phaser from 'phaser';

export class BootScene extends Phaser.Scene {
  private playerGender: string = 'male';

  constructor() {
    super('BootScene');
  }

  init(data: { gender?: string }) {
    if (data?.gender) {
      this.playerGender = data.gender;
    }
  }

  preload() {
    // Thanh tiến trình tải tài nguyên
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();
    progressBox.fillStyle(0x221c16, 0.8);
    progressBox.fillRect(width / 2 - 160, height / 2 - 25, 320, 50);

    const loadingText = this.add.text(width / 2, height / 2 - 50, 'Đang chuẩn bị bước vào Võ Lâm...', {
      font: '16px "Cinzel", serif',
      color: '#e6b349',
    }).setOrigin(0.5);

    this.load.on('progress', (value: number) => {
      progressBar.clear();
      progressBar.fillStyle(0xe6b349, 1);
      progressBar.fillRect(width / 2 - 150, height / 2 - 15, 300 * value, 30);
    });

    this.load.on('complete', () => {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
    });

    // 1. Nhân vật 4 hướng (Spritesheet 160x192, 4 frames: down, up, left, right)
    this.load.spritesheet('player_male_4dir', '/assets/game/characters/player/directional/male_4dir.png', {
      frameWidth: 160,
      frameHeight: 192,
    });
    this.load.spritesheet('player_female_4dir', '/assets/game/characters/player/directional/female_4dir.png', {
      frameWidth: 160,
      frameHeight: 192,
    });

    // Avatar tĩnh
    this.load.image('player_male_idle', '/assets/game/characters/player/male_idle.png');
    this.load.image('player_female_idle', '/assets/game/characters/player/female_idle.png');

    // NPC: Bang Chủ Hà Ánh Phượng (Sprite & Portrait)
    this.load.image('bang_chu_ha_anh_phuong', '/assets/game/characters/npc/bang_chu_ha_anh_phuong.png');
    this.load.image('bang_chu_ha_anh_phuong_portrait', '/assets/game/characters/npc/portraits/bang_chu_ha_anh_phuong.png');

    // 2. Kẻ địch & Boss
    this.load.image('sword_disciple', '/assets/game/characters/enemies/sword_disciple.png');
    this.load.image('mist_demon', '/assets/game/characters/enemies/mist_demon.png');
    this.load.image('elite_disciple', '/assets/game/characters/enemies/elite_disciple.png');
    this.load.image('boss_disorder', '/assets/game/characters/bosses/loan_ngu_kiem_ma.png');

    // 3. Công trình & Địa danh (Landmarks)
    this.load.image('son_mon', '/assets/game/world/landmarks/son_mon.png');
    this.load.image('tang_kinh_cac', '/assets/game/world/landmarks/tang_kinh_cac.png');
    this.load.image('truc_lam', '/assets/game/world/landmarks/truc_lam.png');
    this.load.image('ma_giao_cam_dia', '/assets/game/world/landmarks/ma_giao_cam_dia.png');

    // 4. Nền đất (Ground)
    this.load.image('courtyard_stone', '/assets/game/world/ground/courtyard_stone.png');
    this.load.image('forest_earth', '/assets/game/world/ground/forest_earth.png');

    // 5. Đạo cụ (Props)
    this.load.image('knowledge_seal', '/assets/game/world/props/knowledge_seal.png');
    this.load.image('training_dummy', '/assets/game/world/props/training_dummy.png');
    this.load.image('red_lantern', '/assets/game/world/props/red_lantern.png');

    // 6. Hiệu ứng (VFX)
    this.load.image('hit_spark', '/assets/game/vfx/hit_spark.png');
    this.load.image('critical_spark', '/assets/game/vfx/critical_spark.png');
    this.load.image('quest_glow', '/assets/game/vfx/quest_glow.png');

    // 7. Đấu trường (Combat arena)
    this.load.image('courtyard_arena', '/assets/game/combat/courtyard_arena.jpg');

    // 8. Điều khiển ảo (Controls)
    this.load.image('joystick_base', '/assets/game/ui/controls/joystick_base.png');
    this.load.image('joystick_knob', '/assets/game/ui/controls/joystick_knob.png');
    this.load.image('attack_button', '/assets/game/ui/controls/attack_button.png');
  }

  create() {
    this.scene.start('WorldScene', { gender: this.playerGender });
  }
}
