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

export interface InteractiveCandidateSummary {
  id: string;
  name: string;
  type: string;
  icon: string;
  prompt: string;
  isSelected: boolean;
}

export interface InteractiveZone {
  id: string;
  name: string;
  type: 'npc' | 'landmark' | 'mob' | 'climax_gate' | 'training' | 'prop';
  x: number;
  y: number;
  radius: number;
  prompt: string;
  icon?: string;
  data?: any;
}

interface ActiveEnemyInstance {
  config: LevelEnemyConfig;
  sprite: Phaser.Physics.Arcade.Sprite;
  text: Phaser.GameObjects.Text;
  direction: number;
}

interface EntityLabelRecord {
  id: string;
  x: number;
  y: number;
  text: Phaser.GameObjects.Text;
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
  private tabKey?: Phaser.Input.Keyboard.Key;
  private qKey?: Phaser.Input.Keyboard.Key;
  private f2Key?: Phaser.Input.Keyboard.Key;
  private playerFacing: { x: number; y: number } = { x: 0, y: 1 };

  private playerGender: Gender = 'male';
  private currentUnitId: string = 'g10-u01';
  private unitProgress: number = 0;
  private defeatedEnemyIds: string[] = [];

  private currentLevelConfig!: LevelMapConfig;
  private levelObjects: Phaser.GameObjects.GameObject[] = [];
  private levelColliders: Phaser.Physics.Arcade.Collider[] = [];

  private activeEnemies: ActiveEnemyInstance[] = [];
  private interactiveZones: InteractiveZone[] = [];
  private candidateZones: InteractiveZone[] = [];
  private currentNearZone: InteractiveZone | null = null;
  private manualSelectedZoneId: string | null = null;

  private promptText!: Phaser.GameObjects.Text;
  private promptBox!: Phaser.GameObjects.Graphics;
  private playerNameTag!: Phaser.GameObjects.Text;
  private bossBarrierText!: Phaser.GameObjects.Text;

  // Visual selection indicators
  private selectionRingGraphics!: Phaser.GameObjects.Graphics;
  private selectionPointer!: Phaser.GameObjects.Text;
  private entityLabels: EntityLabelRecord[] = [];

  // Debug visualizer
  private isDebugMode: boolean = false;
  private debugGraphics!: Phaser.GameObjects.Graphics;
  private debugTexts: Phaser.GameObjects.Text[] = [];

  private joystickVector: { x: number; y: number } = { x: 0, y: 0 };
  private isMovementLocked: boolean = false;
  private hasInitializedLevel: boolean = false;
  private lastPlayerPosEmitTime: number = 0;
  private roadBraziers: Phaser.GameObjects.Sprite[] = [];

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
      this.tabKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TAB);
      this.qKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
      this.f2Key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F2);

      // Prevent default Tab navigation from stealing focus
      this.input.keyboard.addCapture([
        Phaser.Input.Keyboard.KeyCodes.TAB,
        Phaser.Input.Keyboard.KeyCodes.SPACE,
      ]);
    }

    // 2. Global Prompt Box & Text
    this.promptBox = this.add.graphics().setDepth(2001);
    this.promptText = this.add
      .text(0, 0, '', {
        font: 'bold 14px "Be Vietnam Pro", -apple-system, sans-serif',
        color: '#fbe285',
        backgroundColor: '#1b140fee',
        padding: { x: 12, y: 6 },
      })
      .setOrigin(0.5)
      .setDepth(2002)
      .setVisible(false);

    // 3. Selection visual indicators (Ground Ring & Overhead Pointer)
    this.selectionRingGraphics = this.add.graphics().setDepth(2001).setVisible(false);
    this.selectionPointer = this.add
      .text(0, 0, '▼', {
        font: 'bold 22px "Be Vietnam Pro", sans-serif',
        color: '#fbe285',
        stroke: '#451a03',
        strokeThickness: 4,
      })
      .setOrigin(0.5, 1)
      .setDepth(2002)
      .setVisible(false);

    // 4. Debug visualizer graphics
    this.debugGraphics = this.add.graphics().setDepth(3000).setVisible(false);
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('debug') === '1' || params.get('debug') === 'true') {
        this.isDebugMode = true;
        this.debugGraphics.setVisible(true);
      }
    }

    // 5. Register EventBus listeners
    this.setupEventBusListeners();

    // 6. Build level for current unit
    this.loadAndBuildLevel(this.currentUnitId);
  }

  private setupEventBusListeners() {
    eventBus.on('lockMovement', (locked: boolean) => {
      this.isMovementLocked = locked;
      if (locked) {
        if (this.player && this.player.body) {
          this.player.setVelocity(0, 0);
        }
        this.promptText?.setVisible(false);
        this.selectionRingGraphics?.setVisible(false);
        this.selectionPointer?.setVisible(false);
      }
    });

    eventBus.on('setJoystick', (vec: { x: number; y: number }) => {
      this.joystickVector = vec;
    });

    eventBus.on('interactAction', () => {
      this.triggerCurrentInteraction();
    });

    eventBus.on('selectInteractiveZone', (zoneId: string) => {
      const match = this.candidateZones.find((z) => z.id === zoneId);
      if (match) {
        this.manualSelectedZoneId = zoneId;
        this.currentNearZone = match;
        this.updateSelectionVisuals(this.time.now);
      }
    });

    eventBus.on('cycleInteractiveZone', () => {
      this.cycleNextCandidate();
    });

    eventBus.on('toggleDebugPhysics', (enabled?: boolean) => {
      this.toggleDebug(enabled);
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
        this.currentNearZone = null;
        this.candidateZones = [];
        this.manualSelectedZoneId = null;
        this.promptText?.setVisible(false);
        this.selectionRingGraphics?.setVisible(false);
        this.selectionPointer?.setVisible(false);
        eventBus.emit('nearInteractiveZone', {
          near: false,
          zone: null,
          candidates: [],
          selectedIndex: -1,
        });
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
    this.entityLabels = [];

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

    // Branch A: Minh Triết Trail & Loop (linking west avenue down to Minh Triết Các and eastwards)
    const branchATrail = this.add
      .tileSprite(800, 950, 160, 420, 'courtyard_stone')
      .setDepth(2)
      .setAlpha(0.86);
    this.levelObjects.push(branchATrail);

    const branchALoop = this.add
      .tileSprite(1150, 1380, 560, 140, 'courtyard_stone')
      .setDepth(2)
      .setAlpha(0.84);
    this.levelObjects.push(branchALoop);

    // Branch B: Trúc Lâm Scenic Trail & Loop (linking east courtyard southwards and westwards)
    const branchBTrail = this.add
      .tileSprite(2550, 1150, 160, 480, 'courtyard_stone')
      .setDepth(2)
      .setAlpha(0.86);
    this.levelObjects.push(branchBTrail);

    const branchBLoop = this.add
      .tileSprite(2150, 1380, 720, 140, 'courtyard_stone')
      .setDepth(2)
      .setAlpha(0.84);
    this.levelObjects.push(branchBLoop);

    // Natural Environmental Clues: Stone Lanterns at Key Road Forks
    const forkLanterns = [
      { x: 800, y: 680 },
      { x: 1600, y: 680 },
      { x: 2400, y: 680 },
    ];
    forkLanterns.forEach((fl) => {
      const lantern = this.add
        .sprite(fl.x, fl.y, 'quest_glow')
        .setDepth(fl.y)
        .setScale(0.65)
        .setTint(0xfbbf24)
        .setAlpha(0.65);
      this.tweens.add({
        targets: lantern,
        alpha: { from: 0.45, to: 0.85 },
        duration: 1600,
        yoyo: true,
        repeat: -1,
      });
      this.levelObjects.push(lantern);
    });

    // Natural Environmental Clues: Climax Approach Braziers flanking Grand South Avenue
    this.roadBraziers = [];
    const brazierPositions = [
      { x: 1460, y: 950 },
      { x: 1740, y: 950 },
      { x: 1460, y: 1200 },
      { x: 1740, y: 1200 },
      { x: 1460, y: 1450 },
      { x: 1740, y: 1450 },
    ];
    brazierPositions.forEach((pos) => {
      const brazier = this.add
        .sprite(pos.x, pos.y, 'quest_glow')
        .setDepth(pos.y - 1)
        .setScale(0.8)
        .setTint(this.unitProgress >= 70 ? 0x10b981 : 0xa855f7)
        .setAlpha(this.unitProgress >= 70 ? 0.85 : 0.4);

      this.tweens.add({
        targets: brazier,
        alpha: { from: 0.35, to: 0.85 },
        scale: { from: 0.75, to: 0.95 },
        duration: 1300 + Math.random() * 400,
        yoyo: true,
        repeat: -1,
      });
      this.levelObjects.push(brazier);
      this.roadBraziers.push(brazier);
    });

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
    // Training Dummy at Võ Luyện Đài (shifted east to separate clearly from Hoàng Vân)
    const trainingDummy = this.physics.add.staticSprite(2700, 760, 'training_dummy');
    trainingDummy.setOrigin(0.5, 0.94).setDepth(760);
    trainingDummy.refreshBody();
    (trainingDummy.body as Phaser.Physics.Arcade.StaticBody).setSize(90, 60, false).setOffset(35, 130);
    this.levelObjects.push(trainingDummy);

    const dummyText = this.add
      .text(2700, 610, '🎯 Cọc Luyện Công (Võ Luyện Đài)', {
        font: 'bold 13px "Be Vietnam Pro", -apple-system, sans-serif',
        color: '#fbbf24',
        backgroundColor: '#1b140fcc',
        padding: { x: 6, y: 3 },
      })
      .setOrigin(0.5)
      .setDepth(2000);
    this.levelObjects.push(dummyText);
    this.entityLabels.push({ id: 'training_dummy', x: 2700, y: 760, text: dummyText });

    // Knowledge Seal at Tàng Kinh Các
    const knowledgeSeal = this.add.sprite(1150, 520, 'knowledge_seal').setDepth(520);
    this.tweens.add({
      targets: knowledgeSeal,
      y: 512,
      duration: 1800,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });
    this.levelObjects.push(knowledgeSeal);

    // Unit-specific props
    config.props.forEach((prop) => {
      if (this.textures.exists(prop.id)) {
        const pSprite = this.physics.add.staticSprite(prop.x, prop.y, prop.id);
        pSprite.setOrigin(0.5, 0.92).setDepth(prop.y);
        pSprite.refreshBody();
        (pSprite.body as Phaser.Physics.Arcade.StaticBody)
          .setSize(Math.min(100, prop.size[0] * 0.6), 40, false)
          .setOffset(prop.size[0] * 0.2, prop.size[1] * 0.65);
        this.levelObjects.push(pSprite);

        // Pure decorative props DO NOT occupy interactive zones
        if (prop.category === 'decoration') {
          return;
        }

        const icon =
          prop.category === 'listening_clue'
            ? '🎧'
            : prop.category === 'reading_clue'
            ? '📜'
            : prop.category === 'dialogue'
            ? '💬'
            : prop.category === 'quest_clue'
            ? '🗺️'
            : '🔍';

        const actionText =
          prop.category === 'listening_clue'
            ? 'Thính âm'
            : prop.category === 'reading_clue'
            ? 'Giải mã'
            : prop.category === 'dialogue'
            ? 'Đàm đạo'
            : prop.category === 'quest_clue'
            ? 'Truy vết'
            : 'Khám phá';

        const pText = this.add
          .text(prop.x, prop.y - prop.size[1] * 0.6, `${icon} ${prop.name}`, {
            font: '12px "Be Vietnam Pro", -apple-system, sans-serif',
            color: '#a7f3d0',
            backgroundColor: '#0f291edd',
            padding: { x: 5, y: 2 },
          })
          .setOrigin(0.5)
          .setDepth(2000);
        this.levelObjects.push(pText);
        this.entityLabels.push({ id: prop.id, x: prop.x, y: prop.y, text: pText });

        // Add to interactive zones
        this.interactiveZones.push({
          id: `prop_${prop.id}`,
          name: prop.name,
          type: 'prop',
          x: prop.x,
          y: prop.y,
          radius: 95,
          icon: icon,
          prompt: `[E] ${actionText} ${prop.name}`,
          data: {
            propId: prop.id,
            category: prop.category,
          },
        });
      }
    });

    // Decorative Lanterns along pathways (spaced along southern edge of walkway away from NPCs)
    const lanternXPositions = [350, 720, 1600, 2150];
    const lanterns: Phaser.Physics.Arcade.Sprite[] = [];
    lanternXPositions.forEach((lx) => {
      const lantern = this.physics.add.staticSprite(lx, 680, 'red_lantern');
      lantern.setOrigin(0.5, 0.92).setDepth(680);
      lantern.refreshBody();
      (lantern.body as Phaser.Physics.Arcade.StaticBody).setSize(24, 20, false).setOffset(52, 160);
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
      this.entityLabels.push({ id: npc.id, x: npc.x, y: npc.y, text: tag });

      // Interactive zone
      this.interactiveZones.push({
        id: npc.id,
        name: npc.name,
        type: 'npc',
        x: npc.x,
        y: npc.y,
        radius: 105,
        icon: icon,
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
      this.entityLabels.push({ id: enemyCfg.encounterId, x: enemyCfg.x, y: enemyCfg.y, text: mobText });

      // Interactive zone for this enemy
      this.interactiveZones.push({
        id: enemyCfg.encounterId,
        name: enemyCfg.name,
        type: 'mob',
        x: enemyCfg.x,
        y: enemyCfg.y,
        radius: 100,
        icon: '⚔️',
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
      icon: '⚡',
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
      y: 520,
      radius: 105,
      icon: '📚',
      prompt: '[E] Tra cứu Tàng Kinh Các & Bí Điển',
    });

    this.interactiveZones.push({
      id: 'training_dummy',
      name: 'Cọc Luyện Công',
      type: 'training',
      x: 2700,
      y: 760,
      radius: 105,
      icon: '🎯',
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
      combatMode: enemyCfg.combatMode,
      learningSkill: enemyCfg.learningSkill,
      difficulty: enemyCfg.difficulty,
      winCondition: enemyCfg.winCondition,
      tutorialBriefing: enemyCfg.tutorialBriefing,
      requiredQuestionsCount: enemyCfg.requiredQuestionsCount,
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

    // Update Climax Approach Braziers along the Grand Avenue
    if (this.roadBraziers && this.roadBraziers.length > 0) {
      const isUnlocked = this.unitProgress >= 70;
      this.roadBraziers.forEach((b) => {
        b.setTint(isUnlocked ? 0x10b981 : 0xa855f7);
        b.setAlpha(isUnlocked ? 0.85 : 0.4);
      });
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
      const propConfig = this.currentLevelConfig?.props.find(
        (p) => `prop_${p.id}` === zone.id || p.id === zone.data?.propId
      );
      eventBus.emit('openPropActivity', {
        unitId: this.currentUnitId,
        propId: propConfig?.id || zone.data?.propId || zone.id.replace('prop_', ''),
        propName: zone.name,
        category: propConfig?.category || zone.data?.category || 'vocab_discovery',
      });
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
      this.selectionRingGraphics.setVisible(false);
      this.selectionPointer.setVisible(false);
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

      // Tab or Q to cycle interactive targets when multiple are nearby
      if (
        (this.tabKey && Phaser.Input.Keyboard.JustDown(this.tabKey)) ||
        (this.qKey && Phaser.Input.Keyboard.JustDown(this.qKey))
      ) {
        this.cycleNextCandidate();
      }

      // F2 to toggle debug hitbox / zone overlay
      if (this.f2Key && Phaser.Input.Keyboard.JustDown(this.f2Key)) {
        this.toggleDebug();
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

      // Frame 0: down, 1: up, 2: left, 3: right & update player facing vector
      if (Math.abs(normVx) > Math.abs(normVy)) {
        this.playerFacing = { x: normVx > 0 ? 1 : -1, y: 0 };
        if (normVx < 0) {
          this.player.setFrame(2);
        } else {
          this.player.setFrame(3);
        }
      } else {
        this.playerFacing = { x: 0, y: normVy > 0 ? 1 : -1 };
        if (normVy < 0) {
          this.player.setFrame(1);
        } else {
          this.player.setFrame(0);
        }
      }
    } else {
      this.player.setVelocity(0, 0);
    }

    // Interactive zone proximity check & dynamic multi-target selection
    this.checkProximityToInteractiveZones(time);

    // Emit player position for Minimap & HUD navigation guidance throttled to ~66ms
    if (this.player && this.player.body) {
      if (!this.lastPlayerPosEmitTime || time - this.lastPlayerPosEmitTime > 66) {
        this.lastPlayerPosEmitTime = time;
        eventBus.emit('playerMoved', {
          x: Math.round(this.player.x),
          y: Math.round(this.player.y),
        });
      }
    }

    // Development visual debug overlay
    if (this.isDebugMode) {
      this.renderDebugOverlay();
    }
  }

  private cycleNextCandidate() {
    if (this.candidateZones.length <= 1) return;
    const currentIdx = this.candidateZones.findIndex(
      (z) => z.id === this.currentNearZone?.id
    );
    const nextIdx = (currentIdx + 1) % this.candidateZones.length;
    const nextTarget = this.candidateZones[nextIdx];
    this.manualSelectedZoneId = nextTarget.id;
    this.currentNearZone = nextTarget;
    this.updateSelectionVisuals(this.time.now);
  }

  private toggleDebug(enabled?: boolean) {
    this.isDebugMode = enabled !== undefined ? enabled : !this.isDebugMode;
    this.debugGraphics.setVisible(this.isDebugMode);
    if (!this.isDebugMode) {
      this.debugGraphics.clear();
      this.debugTexts.forEach((t) => t.destroy());
      this.debugTexts = [];
    }
    eventBus.emit(
      'showNotification',
      `Chế độ Debug Hitbox & Vùng tương tác: ${this.isDebugMode ? 'BẬT' : 'TẮT'}`
    );
  }

  private checkProximityToInteractiveZones(time: number) {
    const px = this.player.x;
    const py = this.player.y;

    // 1. Gather all candidate zones where player is within radius
    interface ScoredCandidate {
      zone: InteractiveZone;
      dist: number;
      score: number;
    }

    const scoredCandidates: ScoredCandidate[] = [];

    for (const zone of this.interactiveZones) {
      const dist = Phaser.Math.Distance.Between(px, py, zone.x, zone.y);
      if (dist <= zone.radius) {
        // Calculate facing alignment dot product
        const dx = zone.x - px;
        const dy = zone.y - py;
        const normDx = dist > 0 ? dx / dist : 0;
        const normDy = dist > 0 ? dy / dist : 1;
        const dot = normDx * this.playerFacing.x + normDy * this.playerFacing.y;

        // Facing bonus: up to 45px advantage if facing directly towards target
        const facingBonus = Math.max(0, dot) * 45;

        // Priority bonus based on interaction category
        let typeBonus = 0;
        if (zone.type === 'npc') {
          typeBonus = 50;
        } else if (zone.type === 'landmark' || zone.type === 'training') {
          typeBonus = 45;
        } else if (zone.type === 'climax_gate') {
          typeBonus = 40;
        } else if (zone.type === 'mob') {
          const encId = zone.data?.encounterId || zone.id;
          const isDefeated = this.defeatedEnemyIds.includes(encId);
          // Strongly deprioritize defeated enemies so active NPCs/tasks are never blocked
          typeBonus = isDefeated ? -300 : 25;
        } else if (zone.type === 'prop') {
          typeBonus = 20;
        }

        // Hysteresis stickiness: prevent rapid flickering when standing near boundary
        const stickinessBonus = this.currentNearZone?.id === zone.id ? 35 : 0;

        // Composite score: closeness to center + facing bonus + type bonus + stickiness
        const score = zone.radius - dist + facingBonus + typeBonus + stickinessBonus;

        scoredCandidates.push({ zone, dist, score });
      }
    }

    if (scoredCandidates.length === 0) {
      this.currentNearZone = null;
      this.candidateZones = [];
      this.manualSelectedZoneId = null;
      this.promptText.setVisible(false);
      this.selectionRingGraphics.setVisible(false);
      this.selectionPointer.setVisible(false);

      // Restore all entity tags to standard visual state
      for (const item of this.entityLabels) {
        item.text.setDepth(2000).setScale(1.0).setAlpha(1.0);
      }

      eventBus.emit('nearInteractiveZone', {
        near: false,
        zone: null,
        candidates: [],
        selectedIndex: -1,
      });
      return;
    }

    // Sort candidates descending by score
    scoredCandidates.sort((a, b) => b.score - a.score);
    this.candidateZones = scoredCandidates.map((c) => c.zone);

    // Determine currently active target (support manual cycle selection)
    let selectedZone = this.candidateZones[0];
    if (this.manualSelectedZoneId) {
      const manualMatch = this.candidateZones.find(
        (z) => z.id === this.manualSelectedZoneId
      );
      if (manualMatch) {
        selectedZone = manualMatch;
      } else {
        // Player walked out of range of manual target, reset manual lock
        this.manualSelectedZoneId = null;
      }
    }

    this.currentNearZone = selectedZone;
    this.updateSelectionVisuals(time);
  }

  private updateSelectionVisuals(time: number) {
    if (!this.currentNearZone) return;

    const zone = this.currentNearZone;

    // Determine contextual prompt string
    let prompt = zone.prompt;
    if (zone.type === 'mob') {
      const encId = zone.data?.encounterId || zone.id;
      if (this.defeatedEnemyIds.includes(encId)) {
        prompt = `${zone.name} [Đã bị hạ]`;
      }
    } else if (zone.type === 'climax_gate') {
      const climax = this.currentLevelConfig?.climax;
      if (climax && this.defeatedEnemyIds.includes(climax.encounterId)) {
        prompt = `${climax.enemy.name} [Đã bị trảm sát]`;
      }
    }

    // 1. Selection reticle / ring on ground around chosen target
    this.selectionRingGraphics.clear();
    this.selectionRingGraphics.setVisible(true);
    const ringRadius = 40 + Math.sin(time / 200) * 3;

    // Glowing circle
    this.selectionRingGraphics.lineStyle(3, 0xfbe285, 0.85);
    this.selectionRingGraphics.strokeCircle(zone.x, zone.y, ringRadius);
    this.selectionRingGraphics.fillStyle(0xfbe285, 0.15);
    this.selectionRingGraphics.fillCircle(zone.x, zone.y, ringRadius);

    // 4 reticle corner tick marks
    this.selectionRingGraphics.lineStyle(2, 0xffe082, 0.95);
    this.selectionRingGraphics.lineBetween(
      zone.x,
      zone.y - ringRadius - 6,
      zone.x,
      zone.y - ringRadius + 2
    );
    this.selectionRingGraphics.lineBetween(
      zone.x,
      zone.y + ringRadius - 2,
      zone.x,
      zone.y + ringRadius + 6
    );
    this.selectionRingGraphics.lineBetween(
      zone.x - ringRadius - 6,
      zone.y,
      zone.x - ringRadius + 2,
      zone.y
    );
    this.selectionRingGraphics.lineBetween(
      zone.x + ringRadius - 2,
      zone.y,
      zone.x + ringRadius + 6,
      zone.y
    );

    // 2. Overhead Floating Pointer Arrow
    const pointerY = zone.y - 145 + Math.sin(time / 160) * 5;
    this.selectionPointer.setPosition(zone.x, pointerY);
    this.selectionPointer.setVisible(true);

    // 3. In-Game Prompt Text
    const selectedIdx = this.candidateZones.findIndex((z) => z.id === zone.id);
    const count = this.candidateZones.length;
    let bannerPrompt = prompt;
    if (count > 1) {
      bannerPrompt = `${zone.icon || '✨'} ${prompt} (${selectedIdx + 1}/${count} • [Tab] Đổi)`;
    }
    this.promptText.setText(bannerPrompt);
    this.promptText.setPosition(this.player.x, this.player.y - 120);
    this.promptText.setVisible(true);

    // 4. Smart Overhead Name Tags (highlight active, suppress crowd clutter)
    for (const item of this.entityLabels) {
      const isSelected =
        item.id === zone.id || item.id === zone.data?.encounterId;
      if (isSelected) {
        item.text.setDepth(2050).setScale(1.06).setAlpha(1.0);
      } else {
        const distToTarget = Phaser.Math.Distance.Between(
          zone.x,
          zone.y,
          item.x,
          item.y
        );
        if (distToTarget < 200) {
          item.text.setDepth(2000).setScale(1.0).setAlpha(0.35);
        } else {
          item.text.setDepth(2000).setScale(1.0).setAlpha(1.0);
        }
      }
    }

    // 5. Emit enriched event for React / Mobile controls
    const candidatesSummary: InteractiveCandidateSummary[] = this.candidateZones.map(
      (z) => ({
        id: z.id,
        name: z.name,
        type: z.type,
        icon: z.icon || '✨',
        prompt: z.prompt,
        isSelected: z.id === zone.id,
      })
    );

    eventBus.emit('nearInteractiveZone', {
      near: true,
      zone: { ...zone, prompt },
      candidates: candidatesSummary,
      selectedIndex: selectedIdx,
    });
  }

  private renderDebugOverlay() {
    if (!this.isDebugMode) return;

    this.debugGraphics.clear();
    this.debugTexts.forEach((t) => t.destroy());
    this.debugTexts = [];

    // 1. Draw Player hitbox & facing line
    if (this.player && this.player.body) {
      const b = this.player.body as Phaser.Physics.Arcade.Body;
      this.debugGraphics.lineStyle(2, 0x38bdf8, 1);
      this.debugGraphics.strokeRect(b.x, b.y, b.width, b.height);

      // Facing line
      this.debugGraphics.lineStyle(3, 0xfacc15, 1);
      this.debugGraphics.lineBetween(
        this.player.x,
        this.player.y - 20,
        this.player.x + this.playerFacing.x * 60,
        this.player.y - 20 + this.playerFacing.y * 60
      );
    }

    // 2. Draw Interactive Zones
    for (const zone of this.interactiveZones) {
      const isCurrent = this.currentNearZone?.id === zone.id;
      const isCandidate = this.candidateZones.some((c) => c.id === zone.id);

      let color = 0x59caa0; // NPC green
      if (zone.type === 'landmark') color = 0x60a5fa; // blue
      else if (zone.type === 'training') color = 0xfbbf24; // gold
      else if (zone.type === 'mob') color = 0xf87171; // red
      else if (zone.type === 'prop') color = 0xa78bfa; // purple
      else if (zone.type === 'climax_gate') color = 0xf43f5e; // rose

      // Zone boundary circle
      this.debugGraphics.lineStyle(
        isCurrent ? 3 : isCandidate ? 2 : 1,
        color,
        isCurrent ? 1.0 : isCandidate ? 0.7 : 0.35
      );
      this.debugGraphics.strokeCircle(zone.x, zone.y, zone.radius);

      // Center point
      this.debugGraphics.fillStyle(color, 0.9);
      this.debugGraphics.fillCircle(zone.x, zone.y, 4);

      // Distance & debug label when within 450px
      const dist = Phaser.Math.Distance.Between(
        this.player.x,
        this.player.y,
        zone.x,
        zone.y
      );
      if (dist < 450) {
        const t = this.add
          .text(
            zone.x,
            zone.y + 12,
            `${zone.name}\n(r=${zone.radius}, d=${Math.round(dist)})`,
            {
              font: '11px monospace',
              color: isCurrent ? '#fbe285' : '#ffffff',
              backgroundColor: '#000000bb',
              padding: { x: 3, y: 2 },
            }
          )
          .setOrigin(0.5, 0)
          .setDepth(3001);
        this.debugTexts.push(t);
      }
    }

    // 3. Draw Mob Patrol Paths
    for (const enemy of this.activeEnemies) {
      this.debugGraphics.lineStyle(2, 0xff5555, 0.7);
      this.debugGraphics.lineBetween(
        enemy.config.patrolRange.minX,
        enemy.config.y,
        enemy.config.patrolRange.maxX,
        enemy.config.y
      );
      this.debugGraphics.strokeCircle(
        enemy.config.patrolRange.minX,
        enemy.config.y,
        4
      );
      this.debugGraphics.strokeCircle(
        enemy.config.patrolRange.maxX,
        enemy.config.y,
        4
      );
    }
  }
}
