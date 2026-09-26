import Phaser from 'phaser';
import { eventBus } from '../EventBus';
import { Gender, CombatEnemy } from '../../types/game';
import {
  getLevelConfig,
  LevelMapConfig,
  LevelEnemyConfig,
  LevelNpcConfig,
  LevelPropConfig,
} from '../levels/levelConfig';

interface InteractiveZone {
  id: string;
  name: string;
  type: 'npc' | 'landmark' | 'mob' | 'climax_gate' | 'training' | 'prop';
  x: number;
  y: number;
  radius: number;
  prompt: string;
  data?: any;
}

interface ActiveEnemyInstance {
  config: LevelEnemyConfig;
  sprite: Phaser.Physics.Arcade.Sprite;
  text: Phaser.GameObjects.Text;
  direction: number;
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
  private currentUnitId: string = 'g10-u01';
  private unitProgress: number = 0;
  private defeatedEnemyIds: string[] = [];

  private currentLevelConfig!: LevelMapConfig;
  private levelObjects: Phaser.GameObjects.GameObject[] = [];
  private levelColliders: Phaser.Physics.Arcade.Collider[] = [];

  private activeEnemies: ActiveEnemyInstance[] = [];
  private interactiveZones: InteractiveZone[] = [];
  private currentNearZone: InteractiveZone | null = null;

  private promptText!: Phaser.GameObjects.Text;
  private promptBox!: Phaser.GameObjects.Graphics;
  private playerNameTag!: Phaser.GameObjects.Text;
  private bossBarrierText!: Phaser.GameObjects.Text;

  private joystickVector: { x: number; y: number } = { x: 0, y: 0 };
  private isMovementLocked: boolean = false;
  private hasInitializedLevel: boolean = false;

  constructor() {
    super('WorldScene');
  }

  init(data: { gender?: Gender; unitId?: string }) {
    if (data?.gender) {
      this.playerGender = data.gender;
    }
    if (data?.unitId) {
      this.currentUnitId = data.unitId;
    }
  }

  create() {
    // 1. Controls setup
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

    // 2. Global Prompt Box & Text
    this.promptBox = this.add.graphics().setDepth(2001);
    this.promptText = this.add
      .text(0, 0, '', {
        font: 'bold 14px "Be Vietnam Pro", -apple-system, sans-serif',
        color: '#fbe285',
        backgroundColor: '#1b140fee',
        padding: { x: 10, y: 5 },
      })
      .setOrigin(0.5)
      .setDepth(2002)
      .setVisible(false);

    // 3. Register EventBus listeners
    this.setupEventBusListeners();

    // 4. Build level for current unit
    this.loadAndBuildLevel(this.currentUnitId);
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
      this.updateBarrierText();
    });

    eventBus.on('updateDefeatedEnemyIds', (ids: string[]) => {
      this.defeatedEnemyIds = ids || [];
      this.refreshEnemyVisuals();
    });

    eventBus.on('changeGender', (gender: Gender) => {
      this.playerGender = gender;
      const key = gender === 'female' ? 'player_female_4dir' : 'player_male_4dir';
      if (this.player) {
        this.player.setTexture(key, 0);
      }
    });

    eventBus.on(
      'changeUnit',
      (data: {
        unitId: string;
        grade: number;
        unitProgress: number;
        defeatedEnemyIds: string[];
      }) => {
        this.unitProgress = data.unitProgress || 0;
        this.defeatedEnemyIds = data.defeatedEnemyIds || [];
        this.loadAndBuildLevel(data.unitId);
      }
    );
  }

  /**
   * Dynamically loads textures for the specified unit and constructs the world
   */
  private loadAndBuildLevel(unitId: string) {
    this.currentUnitId = unitId;
    const config = getLevelConfig(unitId);
    this.currentLevelConfig = config;

    // Collect all textures needed for this level
    const texturesToLoad: { key: string; path: string }[] = [];

    // Ground textures
    const priGroundKey = `ground_${unitId}_pri`;
    if (config.ground.primaryPath) {
      texturesToLoad.push({ key: priGroundKey, path: config.ground.primaryPath });
    }
    if (config.ground.secondaryPath) {
      texturesToLoad.push({
        key: `ground_${unitId}_sec`,
        path: config.ground.secondaryPath,
      });
    }

    // Prop textures
    config.props.forEach((p) => {
      texturesToLoad.push({ key: p.id, path: p.path });
    });

    // Enemy textures
    config.enemies.forEach((e) => {
      texturesToLoad.push({ key: e.spritePath, path: e.spritePath });
    });

    // Climax enemy texture
    if (config.climax?.enemy?.spriteKey) {
      texturesToLoad.push({
        key: config.climax.enemy.spriteKey,
        path: config.climax.enemy.spriteKey,
      });
    }

    // Ensure textures are loaded before rendering
    this.ensureTextures(texturesToLoad, () => {
      this.renderLevel(config, priGroundKey);
    });
  }

  private ensureTextures(
    items: { key: string; path: string }[],
    onComplete: () => void
  ) {
    const missing = items.filter((item) => !this.textures.exists(item.key));
    if (missing.length === 0) {
      onComplete();
      return;
    }

    missing.forEach((item) => {
      this.load.image(item.key, item.path);
    });

    this.load.once(Phaser.Loader.Events.COMPLETE, () => {
      onComplete();
    });

    this.load.start();
  }

  /**
   * Destroys existing level objects and constructs the complete 3200x2000 explorable world
   */
  private renderLevel(config: LevelMapConfig, priGroundKey: string) {
    // 1. Clean up old level entities
    this.levelColliders.forEach((c) => c.destroy());
    this.levelColliders = [];

    this.levelObjects.forEach((obj) => obj.destroy());
    this.levelObjects = [];

    this.activeEnemies.forEach((e) => {
      e.sprite.destroy();
      e.text.destroy();
    });
    this.activeEnemies = [];
    this.interactiveZones = [];

    const mapWidth = config.mapWidth || 3200;
    const mapHeight = config.mapHeight || 2000;

    // Set world physics bounds
    this.physics.world.setBounds(0, 0, mapWidth, mapHeight);

    // 2. Ground Layers
    // Base natural layer
    const baseGround = this.add
      .tileSprite(mapWidth / 2, mapHeight / 2, mapWidth, mapHeight, 'forest_earth')
      .setDepth(0);
    this.levelObjects.push(baseGround);

    // Unit-themed ground overlay
    if (this.textures.exists(priGroundKey)) {
      const unitGround = this.add
        .tileSprite(mapWidth / 2, mapHeight / 2, mapWidth, mapHeight, priGroundKey)
        .setDepth(1)
        .setAlpha(0.92);
      this.levelObjects.push(unitGround);
    }

    // Zone 1 & 2: Main Sect Plaza (Sơn Môn & Tàng Kinh Các)
    const sectPlaza = this.add
      .tileSprite(700, 520, 1100, 500, 'courtyard_stone')
      .setDepth(2)
      .setAlpha(0.94);
    this.levelObjects.push(sectPlaza);

    // Zone 3: Phong Ấn Thạch Trận Courtyard
    const sealCourtyard = this.add
      .tileSprite(1850, 520, 650, 500, 'courtyard_stone')
      .setDepth(2)
      .setAlpha(0.94);
    this.levelObjects.push(sealCourtyard);

    // Zone 4: Võ Luyện Đài Courtyard
    const trainingCourtyard = this.add
      .tileSprite(2550, 780, 520, 420, 'courtyard_stone')
      .setDepth(2)
      .setAlpha(0.95);
    this.levelObjects.push(trainingCourtyard);

    // Zone 5: Minh Triết Các Courtyard
    const wisdomCourtyard = this.add
      .tileSprite(750, 1280, 520, 420, 'courtyard_stone')
      .setDepth(2)
      .setAlpha(0.92);
    this.levelObjects.push(wisdomCourtyard);

    // Main Avenue connecting west to east
    const mainAvenue = this.add
      .tileSprite(1600, 680, 2400, 180, 'courtyard_stone')
      .setDepth(2)
      .setAlpha(0.88);
    this.levelObjects.push(mainAvenue);

    // Grand Avenue leading south to Cấm Địa
    const southAvenue = this.add
      .tileSprite(1600, 1180, 280, 840, 'courtyard_stone')
      .setDepth(2)
      .setAlpha(0.9);
    this.levelObjects.push(southAvenue);

    // Zone 7: Cấm Địa Plaza
    const climaxPlaza = this.add
      .tileSprite(1600, 1720, 950, 520, 'courtyard_stone')
      .setDepth(2)
      .setAlpha(0.95);
    this.levelObjects.push(climaxPlaza);

    // 3. Landmarks
    // Sơn Môn (Safe portal & starting spawn)
    const sonMon = this.physics.add.staticSprite(450, 420, 'son_mon');
    sonMon.setOrigin(0.5, 0.86).setDepth(420);
    sonMon.refreshBody();
    (sonMon.body as Phaser.Physics.Arcade.StaticBody).setSize(480, 140, false).setOffset(48, 255);
    this.levelObjects.push(sonMon);

    // Tàng Kinh Các (Library)
    const tangKinhCac = this.physics.add.staticSprite(1150, 420, 'tang_kinh_cac');
    tangKinhCac.setOrigin(0.5, 0.88).setDepth(420);
    tangKinhCac.refreshBody();
    (tangKinhCac.body as Phaser.Physics.Arcade.StaticBody).setSize(480, 140, false).setOffset(48, 265);
    this.levelObjects.push(tangKinhCac);

    // Trúc Lâm (Võ Luyện Đài area)
    const trucLam = this.physics.add.staticSprite(2550, 660, 'truc_lam');
    trucLam.setOrigin(0.5, 0.83).setDepth(660);
    trucLam.refreshBody();
    (trucLam.body as Phaser.Physics.Arcade.StaticBody).setSize(420, 140, false).setOffset(46, 190);
    this.levelObjects.push(trucLam);

    // Ma Giáo Cấm Địa (Climax / Boss lair)
    const maGiaoCamDia = this.physics.add.staticSprite(1600, 1720, 'ma_giao_cam_dia');
    maGiaoCamDia.setOrigin(0.5, 0.86).setDepth(1720);
    maGiaoCamDia.refreshBody();
    (maGiaoCamDia.body as Phaser.Physics.Arcade.StaticBody).setSize(480, 150, false).setOffset(48, 250);
    this.levelObjects.push(maGiaoCamDia);

    // 4. Props
    // Training Dummy at Võ Luyện Đài
    const trainingDummy = this.physics.add.staticSprite(2550, 780, 'training_dummy');
    trainingDummy.setOrigin(0.5, 0.94).setDepth(780);
    trainingDummy.refreshBody();
    (trainingDummy.body as Phaser.Physics.Arcade.StaticBody).setSize(90, 60, false).setOffset(35, 130);
    this.levelObjects.push(trainingDummy);

    const dummyText = this.add
      .text(2550, 580, '🎯 Cọc Luyện Công (Võ Luyện Đài)', {
        font: 'bold 13px "Be Vietnam Pro", -apple-system, sans-serif',
        color: '#fbbf24',
        backgroundColor: '#1b140fcc',
        padding: { x: 6, y: 3 },
      })
      .setOrigin(0.5)
      .setDepth(2000);
    this.levelObjects.push(dummyText);

    // Knowledge Seal at Tàng Kinh Các
    const knowledgeSeal = this.add.sprite(1150, 540, 'knowledge_seal').setDepth(540);
    this.tweens.add({
      targets: knowledgeSeal,
      y: 532,
      duration: 1800,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });
    this.levelObjects.push(knowledgeSeal);

    // Unit-specific props
    config.props.forEach((prop, pIdx) => {
      if (this.textures.exists(prop.id)) {
        const pSprite = this.physics.add.staticSprite(prop.x, prop.y, prop.id);
        pSprite.setOrigin(0.5, 0.92).setDepth(prop.y);
        pSprite.refreshBody();
        (pSprite.body as Phaser.Physics.Arcade.StaticBody)
          .setSize(Math.min(100, prop.size[0] * 0.6), 40, false)
          .setOffset(prop.size[0] * 0.2, prop.size[1] * 0.65);
        this.levelObjects.push(pSprite);

        const pText = this.add
          .text(prop.x, prop.y - prop.size[1] * 0.6, `📦 ${prop.name}`, {
            font: '12px "Be Vietnam Pro", -apple-system, sans-serif',
            color: '#a7f3d0',
            backgroundColor: '#0f291edd',
            padding: { x: 5, y: 2 },
          })
          .setOrigin(0.5)
          .setDepth(2000);
        this.levelObjects.push(pText);

        // Add to interactive zones
        this.interactiveZones.push({
          id: `prop_${prop.id}`,
          name: prop.name,
          type: 'prop',
          x: prop.x,
          y: prop.y,
          radius: 110,
          prompt: `[E] Khám phá ${prop.name}`,
        });
      }
    });

    // Decorative Lanterns along pathways
    const lanternXPositions = [300, 750, 1200, 1550, 1950, 2350];
    const lanterns: Phaser.Physics.Arcade.Sprite[] = [];
    lanternXPositions.forEach((lx) => {
      const lantern = this.physics.add.staticSprite(lx, 600, 'red_lantern');
      lantern.setOrigin(0.5, 0.92).setDepth(600);
      lantern.refreshBody();
      (lantern.body as Phaser.Physics.Arcade.StaticBody).setSize(32, 28, false).setOffset(48, 155);
      lanterns.push(lantern);
      this.levelObjects.push(lantern);
    });

    // 5. Place 5 NPCs
    const npcs = config.npcs || [];
    const npcSprites: Phaser.Physics.Arcade.Sprite[] = [];

    npcs.forEach((npc) => {
      // Glow behind NPC
      const glowColor =
        npc.id === 'ho_phap_phuong_tu'
          ? 0x59caa0
          : npc.id === 'ho_phap_dang_tran_ha'
          ? 0x60a5fa
          : npc.id === 'ho_phap_hoang_van'
          ? 0xfbbf24
          : npc.id === 'ho_phap_nguyet_nguyen'
          ? 0x38bdf8
          : 0xfbe285;

      const glow = this.add
        .sprite(npc.x, npc.y, 'quest_glow')
        .setDepth(npc.y - 1)
        .setScale(1.2)
        .setTint(glowColor);
      this.tweens.add({
        targets: glow,
        alpha: { from: 0.35, to: 0.85 },
        scale: { from: 1.1, to: 1.35 },
        duration: 1500,
        yoyo: true,
        repeat: -1,
      });
      this.levelObjects.push(glow);

      // NPC Sprite
      const spriteKey = this.textures.exists(npc.spriteKey)
        ? npc.spriteKey
        : 'bang_chu_ha_anh_phuong';
      const npcSprite = this.physics.add.staticSprite(npc.x, npc.y, spriteKey);
      npcSprite.setOrigin(0.5, 0.94).setDepth(npc.y);
      npcSprite.refreshBody();
      (npcSprite.body as Phaser.Physics.Arcade.StaticBody).setSize(60, 40, false).setOffset(50, 145);
      npcSprites.push(npcSprite);
      this.levelObjects.push(npcSprite);

      // Overhead Name Tag
      const icon =
        npc.id === 'bang_chu'
          ? '⚔️'
          : npc.id === 'ho_phap_phuong_tu'
          ? '📜'
          : npc.id === 'ho_phap_dang_tran_ha'
          ? '⚡'
          : npc.id === 'ho_phap_hoang_van'
          ? '🎯'
          : '💎';

      const tag = this.add
        .text(npc.x, npc.y - 180, `${icon} [!] ${npc.name}`, {
          font: 'bold 14px "Be Vietnam Pro", -apple-system, sans-serif',
          color: npc.elementColor || '#fbe285',
          backgroundColor: '#1b140fee',
          padding: { x: 8, y: 4 },
        })
        .setOrigin(0.5)
        .setDepth(2000);
      this.levelObjects.push(tag);

      // Interactive zone
      this.interactiveZones.push({
        id: npc.id,
        name: npc.name,
        type: 'npc',
        x: npc.x,
        y: npc.y,
        radius: 120,
        prompt: npc.prompt,
      });
    });

    // 6. Enemies across danger zones (All 6 or 7 enemies of the unit)
    config.enemies.forEach((enemyCfg, idx) => {
      const spriteKey = this.textures.exists(enemyCfg.spritePath)
        ? enemyCfg.spritePath
        : 'sword_disciple';

      const mobSprite = this.physics.add.sprite(enemyCfg.x, enemyCfg.y, spriteKey);
      mobSprite.setOrigin(0.5, 0.94).setDepth(enemyCfg.y);
      (mobSprite.body as Phaser.Physics.Arcade.Body).setSize(70, 50).setOffset(45, 135);

      const isDefeated = this.defeatedEnemyIds.includes(enemyCfg.encounterId);
      if (isDefeated) {
        mobSprite.setAlpha(0.35);
      }

      const mobText = this.add
        .text(
          enemyCfg.x,
          enemyCfg.y - 110,
          isDefeated ? `${enemyCfg.name} [Đã bị hạ]` : enemyCfg.name,
          {
            font: '13px "Be Vietnam Pro", -apple-system, sans-serif',
            color: isDefeated ? '#888888' : '#ff9999',
            backgroundColor: '#200808bb',
            padding: { x: 6, y: 3 },
          }
        )
        .setOrigin(0.5)
        .setDepth(2000);

      this.activeEnemies.push({
        config: enemyCfg,
        sprite: mobSprite,
        text: mobText,
        direction: idx % 2 === 0 ? 1 : -1,
      });

      // Interactive zone for this enemy
      this.interactiveZones.push({
        id: enemyCfg.encounterId,
        name: enemyCfg.name,
        type: 'mob',
        x: enemyCfg.x,
        y: enemyCfg.y,
        radius: 110,
        prompt: isDefeated ? `${enemyCfg.name} [Đã bị hạ]` : `[E] Quyết đấu ${enemyCfg.name}`,
        data: {
          enemy: this.createCombatEnemyFromConfig(enemyCfg),
          encounterId: enemyCfg.encounterId,
        },
      });
    });

    // 7. Climax / Boss Barrier & Zone
    this.bossBarrierText = this.add
      .text(1600, 1530, '', {
        font: 'bold 15px "Be Vietnam Pro", -apple-system, sans-serif',
        color: '#c02c28',
        backgroundColor: '#1f1012ee',
        padding: { x: 10, y: 5 },
      })
      .setOrigin(0.5)
      .setDepth(2000);
    this.levelObjects.push(this.bossBarrierText);
    this.updateBarrierText();

    this.interactiveZones.push({
      id: 'climax_gate',
      name: config.climax.hasRealBoss ? 'Ma Giáo Cấm Địa' : 'Phong Ấn Trận Đỉnh Điểm',
      type: 'climax_gate',
      x: 1600,
      y: 1720,
      radius: 160,
      prompt: `[E] Tiến vào ${
        config.climax.hasRealBoss ? 'Cấm Địa Quyết Chiến Boss' : 'Phong Ấn Trận Đỉnh Điểm'
      }`,
      data: {
        climax: config.climax,
      },
    });

    // Common interactive zones
    this.interactiveZones.push({
      id: 'tang_kinh_cac_seal',
      name: 'Tàng Kinh Các',
      type: 'landmark',
      x: 1150,
      y: 540,
      radius: 130,
      prompt: '[E] Tra cứu Tàng Kinh Các & Phong Ấn',
    });

    this.interactiveZones.push({
      id: 'training_dummy',
      name: 'Cọc Luyện Công',
      type: 'training',
      x: 2550,
      y: 780,
      radius: 120,
      prompt: '[E] Luyện Công (Cọc Gỗ Võ Luyện Đài)',
    });

    // 8. Player Setup
    if (!this.player || !this.player.body) {
      const spriteKey =
        this.playerGender === 'female' ? 'player_female_4dir' : 'player_male_4dir';
      this.player = this.physics.add.sprite(450, 560, spriteKey, 0);
      this.player.setOrigin(0.5, 0.94);
      this.player.setScale(0.9);
      this.player.setDepth(560);
      this.player.setCollideWorldBounds(true);
      (this.player.body as Phaser.Physics.Arcade.Body).setSize(60, 40).setOffset(50, 145);

      this.playerNameTag = this.add
        .text(450, 390, 'Thiếu Hiệp', {
          font: 'bold 14px "Be Vietnam Pro", -apple-system, sans-serif',
          color: '#f0e6d2',
          backgroundColor: '#17141add',
          padding: { x: 6, y: 2 },
        })
        .setOrigin(0.5)
        .setDepth(2000);
    } else {
      // Reposition player to starting spawn if level switched
      this.player.setPosition(450, 560);
      this.player.setVelocity(0, 0);
    }

    // 9. Camera Follow
    this.cameras.main.setBounds(0, 0, mapWidth, mapHeight);
    this.cameras.main.startFollow(this.player, true, 0.08, 0.08);
    this.cameras.main.setZoom(1.0);

    // 10. Colliders
    this.levelColliders.push(this.physics.add.collider(this.player, sonMon));
    this.levelColliders.push(this.physics.add.collider(this.player, tangKinhCac));
    this.levelColliders.push(this.physics.add.collider(this.player, trucLam));
    this.levelColliders.push(this.physics.add.collider(this.player, maGiaoCamDia));
    this.levelColliders.push(this.physics.add.collider(this.player, trainingDummy));
    npcSprites.forEach((ns) => {
      this.levelColliders.push(this.physics.add.collider(this.player, ns));
    });
    lanterns.forEach((l) => {
      this.levelColliders.push(this.physics.add.collider(this.player, l));
    });

    this.hasInitializedLevel = true;
  }

  private createCombatEnemyFromConfig(enemyCfg: LevelEnemyConfig): CombatEnemy {
    return {
      id: enemyCfg.enemyId,
      name: enemyCfg.name,
      title: enemyCfg.title,
      spriteKey: enemyCfg.spritePath,
      hp: enemyCfg.hp,
      maxHp: enemyCfg.maxHp,
      attack: enemyCfg.attack,
      defense: enemyCfg.defense,
      xpReward: enemyCfg.xpReward,
      isBoss: false,
    };
  }

  private updateBarrierText() {
    if (!this.bossBarrierText || !this.currentLevelConfig) return;
    const climax = this.currentLevelConfig.climax;
    const isDefeated = this.defeatedEnemyIds.includes(climax.encounterId);

    if (isDefeated) {
      this.bossBarrierText
        .setText(`⚡ ${climax.enemy.name} [Đã bị trảm sát] (Unit đã bình định)`)
        .setColor('#fbe285');
    } else if (this.unitProgress >= 70) {
      this.bossBarrierText
        .setText(
          climax.unlockedPrompt ||
            '⚡ Cổng Cấm Địa đã mở! Tiến vào quyết chiến đỉnh điểm!'
        )
        .setColor('#59caa0');
    } else {
      this.bossBarrierText
        .setText(
          `🔒 ${climax.barrierPrompt} (Tiến độ: ${Math.round(this.unitProgress)}%/70%)`
        )
        .setColor('#c02c28');
    }
  }

  private refreshEnemyVisuals() {
    this.activeEnemies.forEach((e) => {
      const isDefeated = this.defeatedEnemyIds.includes(e.config.encounterId);
      if (isDefeated) {
        e.sprite.setAlpha(0.35);
        e.text.setText(`${e.config.name} [Đã bị hạ]`).setColor('#888888');
      } else {
        e.sprite.setAlpha(1.0);
        e.text.setText(e.config.name).setColor('#ff9999');
      }
    });
    this.updateBarrierText();
  }

  private triggerCurrentInteraction() {
    if (!this.currentNearZone) return;

    const zone = this.currentNearZone;

    if (zone.type === 'climax_gate') {
      const climax = this.currentLevelConfig?.climax;
      if (!climax) return;

      if (this.unitProgress < 70) {
        eventBus.emit(
          'showNotification',
          `Phong ấn chưa giải khai! Cần đạt 70% tiến độ Unit (Hiện tại: ${Math.round(
            this.unitProgress
          )}%).`
        );
        return;
      }
      if (this.defeatedEnemyIds.includes(climax.encounterId)) {
        eventBus.emit(
          'showNotification',
          'Trận chiến đỉnh điểm đã hoàn tất! Unit đã hoàn toàn bình định.'
        );
        return;
      }
      eventBus.emit('openBossCombat', {
        enemy: climax.enemy,
        encounterId: climax.encounterId,
      });
      return;
    }

    if (zone.type === 'npc') {
      eventBus.emit('openDialogue', zone.id);
      return;
    }

    if (zone.id === 'tang_kinh_cac_seal') {
      eventBus.emit('openTangKinhCac');
      return;
    }

    if (zone.id === 'training_dummy') {
      eventBus.emit('openTraining');
      return;
    }

    if (zone.type === 'mob') {
      const encId = zone.data?.encounterId || zone.id;
      if (this.defeatedEnemyIds.includes(encId)) {
        eventBus.emit(
          'showNotification',
          `${zone.name} đã bị tiêu diệt! Không thể đánh lại để nhận thêm thưởng.`
        );
        return;
      }
      eventBus.emit('openMobCombat', {
        enemy: zone.data?.enemy,
        encounterId: encId,
      });
      return;
    }

    if (zone.type === 'prop') {
      eventBus.emit('showNotification', `Bạn phát hiện đạo cụ: ${zone.name}`);
      return;
    }
  }

  update(time: number, delta: number) {
    if (!this.player || !this.player.body || !this.hasInitializedLevel) return;

    // Player depth sorting
    this.player.setDepth(this.player.y);
    if (this.playerNameTag) {
      this.playerNameTag.setPosition(this.player.x, this.player.y - 170);
    }

    // Active Enemies patrol and position update
    this.activeEnemies.forEach((e) => {
      if (e.sprite && e.sprite.body) {
        e.sprite.x += e.direction * 0.45;
        if (e.sprite.x > e.config.patrolRange.maxX) {
          e.direction = -1;
          e.sprite.setFlipX(true);
        } else if (e.sprite.x < e.config.patrolRange.minX) {
          e.direction = 1;
          e.sprite.setFlipX(false);
        }

        e.sprite.setDepth(e.sprite.y);
        e.text.setPosition(e.sprite.x, e.sprite.y - 110);

        // Update interactive zone coordinates
        const zone = this.interactiveZones.find((z) => z.id === e.config.encounterId);
        if (zone) {
          zone.x = e.sprite.x;
          zone.y = e.sprite.y;
        }
      }
    });

    // Locked movement check
    if (this.isMovementLocked) {
      this.player.setVelocity(0, 0);
      this.promptText.setVisible(false);
      return;
    }

    // Velocity calculation
    let vx = 0;
    let vy = 0;
    const isSprinting = Boolean(
      this.cursors?.shift?.isDown || this.wasdKeys?.SHIFT?.isDown
    );
    const speed = isSprinting ? 420 : 320;

    if (this.cursors && this.wasdKeys) {
      if (this.cursors.left?.isDown || this.wasdKeys.A.isDown) vx -= 1;
      if (this.cursors.right?.isDown || this.wasdKeys.D.isDown) vx += 1;
      if (this.cursors.up?.isDown || this.wasdKeys.W.isDown) vy -= 1;
      if (this.cursors.down?.isDown || this.wasdKeys.S.isDown) vy += 1;

      if (Phaser.Input.Keyboard.JustDown(this.wasdKeys.E)) {
        this.triggerCurrentInteraction();
      }
    }

    // Joystick input
    if (
      Math.abs(this.joystickVector.x) > 0.15 ||
      Math.abs(this.joystickVector.y) > 0.15
    ) {
      vx = this.joystickVector.x;
      vy = this.joystickVector.y;
    }

    // Normalize velocity vector
    if (vx !== 0 || vy !== 0) {
      const len = Math.sqrt(vx * vx + vy * vy);
      const normVx = (vx / len) * speed;
      const normVy = (vy / len) * speed;
      this.player.setVelocity(normVx, normVy);

      // Frame 0: down, 1: up, 2: left, 3: right
      if (Math.abs(normVx) > Math.abs(normVy)) {
        if (normVx < 0) {
          this.player.setFrame(2);
        } else {
          this.player.setFrame(3);
        }
      } else {
        if (normVy < 0) {
          this.player.setFrame(1);
        } else {
          this.player.setFrame(0);
        }
      }
    } else {
      this.player.setVelocity(0, 0);
    }

    // Interactive zone proximity check
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
      if (closestZone.type === 'mob') {
        const encId = closestZone.data?.encounterId || closestZone.id;
        if (this.defeatedEnemyIds.includes(encId)) {
          prompt = `${closestZone.name} [Đã bị hạ]`;
        }
      } else if (closestZone.type === 'climax_gate') {
        const climax = this.currentLevelConfig?.climax;
        if (climax && this.defeatedEnemyIds.includes(climax.encounterId)) {
          prompt = `${climax.enemy.name} [Đã bị trảm sát]`;
        }
      }

      this.promptText.setText(prompt);
      this.promptText.setPosition(this.player.x, this.player.y - 120);
      this.promptText.setVisible(true);
      eventBus.emit('nearInteractiveZone', {
        near: true,
        zone: { ...closestZone, prompt },
      });
    } else {
      this.promptText.setVisible(false);
      eventBus.emit('nearInteractiveZone', { near: false, zone: null });
    }
  }
}
