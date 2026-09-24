import Phaser from 'phaser';
import { eventBus } from '../EventBus';
import { Gender } from '../../types/game';

interface InteractiveZone {
  id: string;
  name: string;
  type: 'npc' | 'landmark' | 'mob' | 'boss_gate' | 'training';
  x: number;
  y: number;
  radius: number;
  prompt: string;
  data?: any;
}

export class WorldScene extends Phaser.Scene {
  private player!: Phaser.Physics.Arcade.Sprite;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private wasdKeys!: {
    W: Phaser.Input.Keyboard.Key;
    A: Phaser.Input.Keyboard.Key;
    S: Phaser.Input.Keyboard.Key;
    D: Phaser.Input.Keyboard.Key;
    E: Phaser.Input.Keyboard.Key;
    SHIFT?: Phaser.Input.Keyboard.Key;
  };
  private playerGender: Gender = 'male';
  private interactiveZones: InteractiveZone[] = [];
  private currentNearZone: InteractiveZone | null = null;
  private promptText!: Phaser.GameObjects.Text;
  private promptBox!: Phaser.GameObjects.Graphics;

  // Joystick state from React/touch
  private joystickVector: { x: number; y: number } = { x: 0, y: 0 };
  private isMovementLocked: boolean = false;

  // Mobs
  private mob1!: Phaser.Physics.Arcade.Sprite;
  private mob2!: Phaser.Physics.Arcade.Sprite;
  private mob1Direction: number = 1;
  private mob2Direction: number = -1;

  // Text tags for entities
  private playerNameTag!: Phaser.GameObjects.Text;
  private mob1Text!: Phaser.GameObjects.Text;
  private mob2Text!: Phaser.GameObjects.Text;

  // Boss barrier
  private bossBarrierText!: Phaser.GameObjects.Text;
  private unitProgress: number = 0;
  private defeatedEnemyIds: string[] = [];

  constructor() {
    super('WorldScene');
  }

  init(data: { gender?: Gender }) {
    if (data && data.gender) {
      this.playerGender = data.gender;
    }
  }

  create() {
    const mapWidth = 2400;
    const mapHeight = 1600;

    // Thiết lập giới hạn thế giới
    this.physics.world.setBounds(0, 0, mapWidth, mapHeight);

    // 1. Tầng nền đất (Ground)
    // Nền tự nhiên rừng trúc toàn bản đồ
    this.add.tileSprite(mapWidth / 2, mapHeight / 2, mapWidth, mapHeight, 'forest_earth').setDepth(0);

    // Sân đá tông môn chính (Sơn Môn & Tàng Kinh Các)
    const sectPlaza = this.add.tileSprite(850, 480, 1500, 750, 'courtyard_stone').setDepth(1);
    sectPlaza.setAlpha(0.95);

    // Sân đá luyện võ bao quanh Cọc Luyện Công (kết nối liền mạch với sân chính, loại bỏ đường cắt nham nhở)
    this.add.tileSprite(1650, 780, 260, 240, 'courtyard_stone').setDepth(1).setAlpha(0.92);

    // Đường đá dẫn từ sân tông môn xuống Ma Giáo Cấm Địa
    this.add.tileSprite(1150, 1025, 260, 360, 'courtyard_stone').setDepth(1).setAlpha(0.9);

    // Bệ đá quảng trường Ma Giáo Cấm Địa (bao trọn vẹn toàn bộ cổng, cột cấm địa và bậc thang đá)
    this.add.tileSprite(1150, 1370, 700, 420, 'courtyard_stone').setDepth(1).setAlpha(0.95);

    // 2. Địa danh (Landmarks)
    // Sơn Môn (Tọa độ 400, 380)
    const sonMon = this.physics.add.staticSprite(400, 380, 'son_mon');
    sonMon.setOrigin(0.5, 0.86).setDepth(380);
    sonMon.refreshBody();
    (sonMon.body as Phaser.Physics.Arcade.StaticBody).setSize(480, 140, false).setOffset(48, 255);

    // Tàng Kinh Các (Tọa độ 1150, 380)
    const tangKinhCac = this.physics.add.staticSprite(1150, 380, 'tang_kinh_cac');
    tangKinhCac.setOrigin(0.5, 0.88).setDepth(380);
    tangKinhCac.refreshBody();
    (tangKinhCac.body as Phaser.Physics.Arcade.StaticBody).setSize(480, 140, false).setOffset(48, 265);

    // Trúc Lâm (Tọa độ 1900, 680)
    const trucLam = this.physics.add.staticSprite(1900, 680, 'truc_lam');
    trucLam.setOrigin(0.5, 0.83).setDepth(680);
    trucLam.refreshBody();
    (trucLam.body as Phaser.Physics.Arcade.StaticBody).setSize(420, 140, false).setOffset(46, 190);

    // Ma Giáo Cấm Địa (Tọa độ 1150, 1380)
    const maGiaoCamDia = this.physics.add.staticSprite(1150, 1380, 'ma_giao_cam_dia');
    maGiaoCamDia.setOrigin(0.5, 0.86).setDepth(1380);
    maGiaoCamDia.refreshBody();
    (maGiaoCamDia.body as Phaser.Physics.Arcade.StaticBody).setSize(480, 150, false).setOffset(48, 250);

    // 3. Đạo cụ (Props)
    // Phong Ấn Tri Thức trước Tàng Kinh Các
    const knowledgeSeal = this.add.sprite(1150, 510, 'knowledge_seal').setDepth(510);
    this.tweens.add({
      targets: knowledgeSeal,
      y: 502,
      duration: 1800,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });

    // Cọc Luyện Công (Căn chỉnh đúng footprint chân cọc và tránh đi xuyên)
    const trainingDummy = this.physics.add.staticSprite(1650, 780, 'training_dummy');
    trainingDummy.setOrigin(0.5, 0.94).setDepth(780);
    trainingDummy.refreshBody();
    (trainingDummy.body as Phaser.Physics.Arcade.StaticBody).setSize(90, 60, false).setOffset(35, 130);
    this.add.text(1650, 575, '🎯 Cọc Luyện Công', {
      font: 'bold 13px "Cinzel", serif',
      color: '#e6b349',
      backgroundColor: '#1b140fcc',
      padding: { x: 6, y: 3 },
    }).setOrigin(0.5).setDepth(2000);

    // Đèn lồng đỏ trang trí dọc sân đá với chân đế có va chạm
    const lanternPositions = [220, 580, 970, 1330];
    const lanterns: Phaser.Physics.Arcade.Sprite[] = [];
    lanternPositions.forEach((lx) => {
      const lantern = this.physics.add.staticSprite(lx, 480, 'red_lantern');
      lantern.setOrigin(0.5, 0.92).setDepth(480);
      lantern.refreshBody();
      (lantern.body as Phaser.Physics.Arcade.StaticBody).setSize(32, 28, false).setOffset(48, 155);
      lanterns.push(lantern);
    });

    // 4. Điểm tương tác đặc biệt: Bang Chủ & Hộ Pháp
    // Hiệu ứng hào quang báo nhiệm vụ (nằm phía sau nhân vật với depth 469 để không che nhân vật)
    const bangChuGlow = this.add.sprite(520, 470, 'quest_glow').setDepth(469).setScale(1.2);
    this.tweens.add({
      targets: bangChuGlow,
      alpha: { from: 0.4, to: 0.9 },
      scale: { from: 1.1, to: 1.35 },
      duration: 1500,
      yoyo: true,
      repeat: -1,
    });

    // Nhân vật Bang Chủ Hà Ánh Phượng (160x192, origin [0.5, 0.94] theo manifest.json)
    const bangChu = this.physics.add.staticSprite(520, 470, 'bang_chu_ha_anh_phuong');
    bangChu.setOrigin(0.5, 0.94).setDepth(470);
    bangChu.refreshBody();
    (bangChu.body as Phaser.Physics.Arcade.StaticBody).setSize(60, 40, false).setOffset(50, 145);

    // Bảng tên và dấu hiệu nhiệm vụ đặt trên đầu nhân vật (y = 270)
    this.add.text(520, 270, '⚔️ [!] Bang Chủ Hà Ánh Phượng', {
      font: 'bold 15px "Cinzel", serif',
      color: '#fbe285',
      backgroundColor: '#271911cc',
      padding: { x: 8, y: 4 },
    }).setOrigin(0.5).setDepth(2000);

    // Điểm tương tác Hộ Pháp Phương Tú tại Tàng Kinh Các
    const hoPhapGlow = this.add.sprite(1150, 510, 'quest_glow').setDepth(509).setScale(1.1);
    this.tweens.add({
      targets: hoPhapGlow,
      alpha: { from: 0.3, to: 0.8 },
      duration: 1400,
      yoyo: true,
      repeat: -1,
    });
    this.add.text(1150, 440, '📜 [!] Hộ Pháp Phương Tú - Tàng Kinh Các', {
      font: 'bold 15px "Cinzel", serif',
      color: '#59caa0',
      backgroundColor: '#112217cc',
      padding: { x: 8, y: 4 },
    }).setOrigin(0.5).setDepth(2000);

    // Cổng Boss Barrier text (Đặt phía trên đỉnh tháp Ma Giáo Cấm Địa)
    this.bossBarrierText = this.add.text(1150, 960, '🔒 Ma Khí Cấm Địa (Cần >= 70% tiến độ)', {
      font: 'bold 15px "Cinzel", serif',
      color: '#c02c28',
      backgroundColor: '#1f1012ee',
      padding: { x: 10, y: 5 },
    }).setOrigin(0.5).setDepth(2000);

    // 5. Quái thường tuần tra Trúc Lâm
    // Mob 1: Ma Giáo Kiếm Đồ
    this.mob1 = this.physics.add.sprite(1780, 880, 'sword_disciple').setDepth(880);
    this.mob1.setOrigin(0.5, 0.94);
    (this.mob1.body as Phaser.Physics.Arcade.Body).setSize(70, 50).setOffset(45, 135);
    this.mob1Text = this.add.text(1780, 770, 'Ma Giáo Kiếm Đồ', {
      font: '13px "Cinzel", serif',
      color: '#ff9999',
      backgroundColor: '#200808bb',
      padding: { x: 6, y: 3 },
    }).setOrigin(0.5).setDepth(2000);

    // Mob 2: Hắc Khí Yêu Ma
    this.mob2 = this.physics.add.sprite(2020, 920, 'mist_demon').setDepth(920);
    this.mob2.setOrigin(0.5, 0.94);
    (this.mob2.body as Phaser.Physics.Arcade.Body).setSize(70, 50).setOffset(45, 135);
    this.mob2Text = this.add.text(2020, 810, 'Hắc Khí Yêu Ma', {
      font: '13px "Cinzel", serif',
      color: '#b28dff',
      backgroundColor: '#1a0d24bb',
      padding: { x: 6, y: 3 },
    }).setOrigin(0.5).setDepth(2000);

    // 6. Nhân vật người chơi (Player)
    const spriteKey = this.playerGender === 'female' ? 'player_female_4dir' : 'player_male_4dir';
    this.player = this.physics.add.sprite(400, 520, spriteKey, 0);
    this.player.setOrigin(0.5, 0.94);
    this.player.setScale(0.9);
    this.player.setDepth(520);
    this.player.setCollideWorldBounds(true);
    // Bounding box cho chân nhân vật (top-down perspective)
    (this.player.body as Phaser.Physics.Arcade.Body).setSize(60, 40).setOffset(50, 145);

    // Tên nhân vật trên đầu
    this.playerNameTag = this.add.text(400, 350, 'Thiếu Hiệp', {
      font: 'bold 14px "Cinzel", serif',
      color: '#f0e6d2',
      backgroundColor: '#17141add',
      padding: { x: 6, y: 2 },
    }).setOrigin(0.5).setDepth(2000);

    // Cập nhật thẻ tên theo nhân vật
    this.events.on('updatePlayerName', (name: string) => {
      this.playerNameTag.setText(name);
    });

    // 7. Thiết lập Camera bám theo nhân vật
    this.cameras.main.setBounds(0, 0, mapWidth, mapHeight);
    this.cameras.main.startFollow(this.player, true, 0.08, 0.08);
    this.cameras.main.setZoom(1.0);

    // 8. Va chạm (Colliders)
    this.physics.add.collider(this.player, sonMon);
    this.physics.add.collider(this.player, tangKinhCac);
    this.physics.add.collider(this.player, trucLam);
    this.physics.add.collider(this.player, maGiaoCamDia);
    this.physics.add.collider(this.player, trainingDummy);
    this.physics.add.collider(this.player, bangChu);
    lanterns.forEach((l) => this.physics.add.collider(this.player, l));

    // 9. Bàn phím điều khiển
    if (this.input.keyboard) {
      this.cursors = this.input.keyboard.createCursorKeys();
      this.wasdKeys = {
        W: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
        A: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
        S: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
        D: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
        E: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E),
        SHIFT: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT),
      };
    }

    // 10. Danh sách các vùng tương tác (Interactive Zones)
    this.interactiveZones = [
      {
        id: 'bang_chu',
        name: 'Bang Chủ Hà Ánh Phượng',
        type: 'npc',
        x: 520,
        y: 470,
        radius: 120,
        prompt: '[E] Bái kiến Bang Chủ',
      },
      {
        id: 'tang_kinh_cac_seal',
        name: 'Tàng Kinh Các',
        type: 'landmark',
        x: 1150,
        y: 510,
        radius: 130,
        prompt: '[E] Tra cứu Tàng Kinh Các & Phong Ấn',
      },
      {
        id: 'mob_sword_disciple',
        name: 'Ma Giáo Kiếm Đồ',
        type: 'mob',
        x: 1780,
        y: 880,
        radius: 110,
        prompt: '[E] Quyết đấu Kiếm Đồ',
        data: { enemyId: 'sword_disciple' },
      },
      {
        id: 'mob_mist_demon',
        name: 'Hắc Khí Yêu Ma',
        type: 'mob',
        x: 2020,
        y: 920,
        radius: 110,
        prompt: '[E] Trảm sát Yêu Ma',
        data: { enemyId: 'mist_demon' },
      },
      {
        id: 'training_dummy',
        name: 'Cọc Gỗ Trúc Lâm',
        type: 'training',
        x: 1650,
        y: 780,
        radius: 110,
        prompt: '[E] Luyện Công (Cọc Gỗ Trúc Lâm)',
      },
      {
        id: 'boss_gate',
        name: 'Ma Giáo Cấm Địa',
        type: 'boss_gate',
        x: 1150,
        y: 1390,
        radius: 150,
        prompt: '[E] Vào Ma Giáo Cấm Địa (Quyết chiến Boss)',
      },
    ];

    // Khung Prompt hiển thị trên đầu nhân vật
    this.promptBox = this.add.graphics().setDepth(2001);
    this.promptText = this.add.text(0, 0, '', {
      font: 'bold 14px "Cinzel", serif',
      color: '#fbe285',
      backgroundColor: '#1b140fee',
      padding: { x: 10, y: 5 },
    }).setOrigin(0.5).setDepth(2002).setVisible(false);

    // Lắng nghe sự kiện từ React
    this.setupEventBusListeners();
  }

  private setupEventBusListeners() {
    eventBus.on('lockMovement', (locked: boolean) => {
      this.isMovementLocked = locked;
      if (locked && this.player && this.player.body) {
        this.player.setVelocity(0, 0);
      }
    });

    eventBus.on('setJoystick', (vec: { x: number; y: number }) => {
      this.joystickVector = vec;
    });

    eventBus.on('interactAction', () => {
      this.triggerCurrentInteraction();
    });

    eventBus.on('updateUnitProgress', (prog: number) => {
      this.unitProgress = prog;
      if (this.bossBarrierText) {
        if (prog >= 70) {
          this.bossBarrierText.setText('⚡ Cổng Ma Giáo Cấm Địa ĐÃ MỞ! Tiến vào diệt Boss!').setColor('#59caa0');
        } else {
          this.bossBarrierText.setText(`🔒 Ma Khí Cấm Địa (Tiến độ: ${Math.round(prog)}%/70%)`).setColor('#c02c28');
        }
      }
    });

    eventBus.on('updateDefeatedEnemyIds', (ids: string[]) => {
      this.defeatedEnemyIds = ids || [];
      if (this.mob1 && this.defeatedEnemyIds.includes('sword_disciple')) {
        this.mob1.setAlpha(0.35);
      }
      if (this.mob2 && this.defeatedEnemyIds.includes('mist_demon')) {
        this.mob2.setAlpha(0.35);
      }
    });

    eventBus.on('changeGender', (gender: Gender) => {
      this.playerGender = gender;
      const key = gender === 'female' ? 'player_female_4dir' : 'player_male_4dir';
      if (this.player) {
        this.player.setTexture(key, 0);
      }
    });
  }

  private triggerCurrentInteraction() {
    if (!this.currentNearZone) return;

    if (this.currentNearZone.id === 'boss_gate') {
      if (this.unitProgress < 70) {
        eventBus.emit('showNotification', `Phong ấn Ma Giáo Cấm Địa chưa giải khai! Cần đạt 70% tiến độ Unit 1 (Hiện tại: ${Math.round(this.unitProgress)}%).`);
        return;
      }
      if (this.defeatedEnemyIds.includes('boss_disorder')) {
        eventBus.emit('showNotification', 'Loạn Ngữ Kiếm Ma đã bị trảm sát! Unit 1 đã hoàn toàn bình định.');
        return;
      }
      eventBus.emit('openBossCombat');
      return;
    }

    if (this.currentNearZone.id === 'bang_chu') {
      eventBus.emit('openDialogue', 'bang_chu');
    } else if (this.currentNearZone.id === 'tang_kinh_cac_seal') {
      eventBus.emit('openTangKinhCac');
    } else if (this.currentNearZone.id === 'mob_sword_disciple') {
      if (this.defeatedEnemyIds.includes('sword_disciple')) {
        eventBus.emit('showNotification', 'Ma Giáo Kiếm Đồ đã bị tiêu diệt! Không thể đánh lại để nhận thêm thưởng.');
        return;
      }
      eventBus.emit('openMobCombat', 'sword_disciple');
    } else if (this.currentNearZone.id === 'mob_mist_demon') {
      if (this.defeatedEnemyIds.includes('mist_demon')) {
        eventBus.emit('showNotification', 'Hắc Khí Yêu Ma đã bị tiêu diệt! Không thể đánh lại để nhận thêm thưởng.');
        return;
      }
      eventBus.emit('openMobCombat', 'mist_demon');
    } else if (this.currentNearZone.id === 'training_dummy') {
      eventBus.emit('openTraining');
    }
  }

  update(time: number, delta: number) {
    if (!this.player || !this.player.body) return;

    // Cập nhật Depth sorting theo trục Y (Y-sorting) cho người chơi
    this.player.setDepth(this.player.y);
    if (this.playerNameTag) {
      this.playerNameTag.setPosition(this.player.x, this.player.y - 170);
    }

    // Tuần tra quái (Mob patrol animation & dynamic Y-depth)
    if (this.mob1 && this.mob1.body) {
      this.mob1.x += this.mob1Direction * 0.4;
      if (this.mob1.x > 1850) this.mob1Direction = -1;
      else if (this.mob1.x < 1720) this.mob1Direction = 1;
      this.mob1.setDepth(this.mob1.y);
      if (this.mob1Text) {
        this.mob1Text.setPosition(this.mob1.x, this.mob1.y - 110);
      }
      // Cập nhật vị trí vùng tương tác theo quái
      const mob1Zone = this.interactiveZones.find((z) => z.id === 'mob_sword_disciple');
      if (mob1Zone) {
        mob1Zone.x = this.mob1.x;
        mob1Zone.y = this.mob1.y;
      }
    }

    if (this.mob2 && this.mob2.body) {
      this.mob2.x += this.mob2Direction * 0.5;
      if (this.mob2.x > 2100) this.mob2Direction = -1;
      else if (this.mob2.x < 1960) this.mob2Direction = 1;
      this.mob2.setDepth(this.mob2.y);
      if (this.mob2Text) {
        this.mob2Text.setPosition(this.mob2.x, this.mob2.y - 110);
      }
      const mob2Zone = this.interactiveZones.find((z) => z.id === 'mob_mist_demon');
      if (mob2Zone) {
        mob2Zone.x = this.mob2.x;
        mob2Zone.y = this.mob2.y;
      }
    }

    // Nếu chuyển động đang bị khóa (đang mở modal hội thoại, combat, từ vựng)
    if (this.isMovementLocked) {
      this.player.setVelocity(0, 0);
      this.promptText.setVisible(false);
      return;
    }

    // Xử lý di chuyển (Tăng tốc độ di chuyển từ 190 lên 320, hỗ trợ giữ phím Shift để khinh công 420)
    let vx = 0;
    let vy = 0;
    const isSprinting = Boolean(this.cursors?.shift?.isDown || this.wasdKeys?.SHIFT?.isDown);
    const speed = isSprinting ? 420 : 320;

    // 1. Phím bàn phím
    if (this.cursors && this.wasdKeys) {
      if (this.cursors.left?.isDown || this.wasdKeys.A.isDown) vx -= 1;
      if (this.cursors.right?.isDown || this.wasdKeys.D.isDown) vx += 1;
      if (this.cursors.up?.isDown || this.wasdKeys.W.isDown) vy -= 1;
      if (this.cursors.down?.isDown || this.wasdKeys.S.isDown) vy += 1;

      // Phím E để tương tác
      if (Phaser.Input.Keyboard.JustDown(this.wasdKeys.E)) {
        this.triggerCurrentInteraction();
      }
    }

    // 2. Joystick trên mobile / touch
    if (Math.abs(this.joystickVector.x) > 0.15 || Math.abs(this.joystickVector.y) > 0.15) {
      vx = this.joystickVector.x;
      vy = this.joystickVector.y;
    }

    // Chuẩn hóa vector di chuyển
    if (vx !== 0 || vy !== 0) {
      const len = Math.sqrt(vx * vx + vy * vy);
      const normVx = (vx / len) * speed;
      const normVy = (vy / len) * speed;
      this.player.setVelocity(normVx, normVy);

      // Cập nhật frame tĩnh 4 hướng theo quy định:
      // frame 0: down, 1: up, 2: left, 3: right (STATIC POSES)
      if (Math.abs(normVx) > Math.abs(normVy)) {
        if (normVx < 0) {
          this.player.setFrame(2); // Left
        } else {
          this.player.setFrame(3); // Right
        }
      } else {
        if (normVy < 0) {
          this.player.setFrame(1); // Up
        } else {
          this.player.setFrame(0); // Down
        }
      }
    } else {
      this.player.setVelocity(0, 0);
    }

    // Kiểm tra vùng tương tác gần nhất
    this.checkProximityToInteractiveZones();
  }

  private checkProximityToInteractiveZones() {
    const px = this.player.x;
    const py = this.player.y;

    let closestZone: InteractiveZone | null = null;
    let minDistance = 99999;

    for (const zone of this.interactiveZones) {
      const dist = Phaser.Math.Distance.Between(px, py, zone.x, zone.y);
      if (dist <= zone.radius && dist < minDistance) {
        minDistance = dist;
        closestZone = zone;
      }
    }

    this.currentNearZone = closestZone;

    if (closestZone) {
      let prompt = closestZone.prompt;
      if (closestZone.id === 'mob_sword_disciple' && this.defeatedEnemyIds.includes('sword_disciple')) {
        prompt = 'Ma Giáo Kiếm Đồ [ĐÃ BỊ HẠ]';
      } else if (closestZone.id === 'mob_mist_demon' && this.defeatedEnemyIds.includes('mist_demon')) {
        prompt = 'Hắc Khí Yêu Ma [ĐÃ BỊ HẠ]';
      } else if (closestZone.id === 'boss_gate' && this.defeatedEnemyIds.includes('boss_disorder')) {
        prompt = 'Ma Giáo Cấm Địa [BOSS ĐÃ BỊ TRẢM SÁT]';
      }
      this.promptText.setText(prompt);
      this.promptText.setPosition(this.player.x, this.player.y - 120);
      this.promptText.setVisible(true);
      eventBus.emit('nearInteractiveZone', { near: true, zone: { ...closestZone, prompt } });
    } else {
      this.promptText.setVisible(false);
      eventBus.emit('nearInteractiveZone', { near: false, zone: null });
    }
  }
}
