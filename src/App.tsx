import React, { useState, useEffect, useRef } from 'react';
import Phaser from 'phaser';
import { createPhaserGame } from './game/config';
import { eventBus } from './game/EventBus';
import {
  PlayerProfile,
  Gender,
  InventoryItem,
  CombatEnemy,
  PropActivityData,
  PropCategory,
} from './types/game';
import {
  StorageService,
  createDefaultProfile,
  calculateCongLuc,
} from './services/storage';
import { soundService } from './services/sound';
import { CombatEngine } from './services/combatEngine';
import { ProgressionEngine } from './services/progressionEngine';
import { PropActivityService } from './services/propActivityService';
import { INITIAL_ITEMS } from './data/itemsData';

// UI Components
import { StartScreen } from './components/StartScreen';
import { TopHUD } from './components/TopHUD';
import { BottomNav } from './components/BottomNav';
import { DialogueModal } from './components/DialogueModal';
import { VocabularyModal } from './components/VocabularyModal';
import { ChallengeModal } from './components/ChallengeModal';
import { CombatOverlay } from './components/CombatOverlay';
import { InventoryModal } from './components/InventoryModal';
import { QuestListModal } from './components/QuestListModal';
import { VictoryModal } from './components/VictoryModal';
import { SettingsModal } from './components/SettingsModal';
import { TrainingModal } from './components/TrainingModal';
import { VirtualJoystickUI } from './components/VirtualJoystickUI';
import { UnitSelectModal } from './components/UnitSelectModal';
import { PropActivityModal } from './components/PropActivityModal';
import { Minimap } from './components/Minimap';
import { createUnitQuests } from './data/questsData';
import { evaluateUnitUnlocks } from './data/progressionBalance';

export const App: React.FC = () => {
  const [profile, setProfile] = useState<PlayerProfile | null>(() => StorageService.loadProfile());
  const [isGameStarted, setIsGameStarted] = useState<boolean>(false);

  // Modals
  const [showDialogue, setShowDialogue] = useState<boolean>(false);
  const [dialogueNpc, setDialogueNpc] = useState<string>('bang_chu');
  const [showVocabulary, setShowVocabulary] = useState<boolean>(false);
  const [showChallenge, setShowChallenge] = useState<boolean>(false);
  const [showCombat, setShowCombat] = useState<boolean>(false);
  const [combatEnemyType, setCombatEnemyType] = useState<
    'sword_disciple' | 'mist_demon' | 'boss_disorder' | string
  >('sword_disciple');
  const [activeCombatEnemy, setActiveCombatEnemy] = useState<CombatEnemy | null>(null);
  const [activeEncounterId, setActiveEncounterId] = useState<string | null>(null);
  const [showTraining, setShowTraining] = useState<boolean>(false);
  const [showInventory, setShowInventory] = useState<boolean>(false);
  const [showQuests, setShowQuests] = useState<boolean>(false);
  const [showVictory, setShowVictory] = useState<boolean>(false);
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [showUnitSelect, setShowUnitSelect] = useState<boolean>(false);
  const [showPropActivity, setShowPropActivity] = useState<boolean>(false);
  const [currentPropActivity, setCurrentPropActivity] = useState<PropActivityData | null>(null);

  // Interactive near zone status
  const [isNearZone, setIsNearZone] = useState<boolean>(false);
  const [nearZonePrompt, setNearZonePrompt] = useState<string>('');
  const [nearbyCandidates, setNearbyCandidates] = useState<any[]>([]);
  const [selectedCandidateIndex, setSelectedCandidateIndex] = useState<number>(0);

  // Notification Toast
  const [notification, setNotification] = useState<string | null>(null);

  // Phaser instance reference
  const phaserGameRef = useRef<Phaser.Game | null>(null);
  const gameContainerRef = useRef<HTMLDivElement>(null);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification((curr) => (curr === msg ? null : curr));
    }, 3000);
  };

  // Tự động lưu tiến độ vào localStorage khi profile thay đổi
  useEffect(() => {
    if (profile) {
      StorageService.saveProfile(profile);
      eventBus.emit('updateUnitProgress', profile.unitProgress);
      eventBus.emit('updateDefeatedEnemyIds', profile.defeatedEnemyIds || []);
    }
  }, [profile]);

  // Khóa di chuyển khi có bất kỳ modal nào mở
  const isAnyModalOpen =
    !isGameStarted ||
    showDialogue ||
    showVocabulary ||
    showChallenge ||
    showCombat ||
    showTraining ||
    showInventory ||
    showQuests ||
    showVictory ||
    showSettings ||
    showUnitSelect ||
    showPropActivity;

  useEffect(() => {
    eventBus.emit('lockMovement', isAnyModalOpen);
  }, [isAnyModalOpen]);

  // Lắng nghe sự kiện từ Phaser EventBus
  useEffect(() => {
    const unsubDialogue = eventBus.on('openDialogue', (npcId: string) => {
      setDialogueNpc(npcId);
      setShowDialogue(true);
    });

    const unsubTangKinhCac = eventBus.on('openTangKinhCac', () => {
      setShowVocabulary(true);
    });

    const unsubTraining = eventBus.on('openTraining', () => {
      setShowTraining(true);
    });

    const unsubMobCombat = eventBus.on('openMobCombat', (payload: any) => {
      if (payload && typeof payload === 'object' && payload.enemy) {
        setActiveCombatEnemy(payload.enemy);
        setActiveEncounterId(payload.encounterId || null);
        setCombatEnemyType(payload.enemy.id);
      } else {
        const enemyId = typeof payload === 'string' ? payload : 'sword_disciple';
        setActiveCombatEnemy(null);
        setActiveEncounterId(`${profile?.selectedUnitId || 'g10-u01'}_enc_${enemyId}`);
        setCombatEnemyType(enemyId);
      }
      setShowCombat(true);
    });

    const unsubBossCombat = eventBus.on('openBossCombat', (payload?: any) => {
      if (payload && payload.enemy) {
        setActiveCombatEnemy(payload.enemy);
        setActiveEncounterId(payload.encounterId || null);
        setCombatEnemyType(payload.enemy.id);
      } else {
        setActiveCombatEnemy(null);
        setActiveEncounterId(`${profile?.selectedUnitId || 'g10-u01'}_boss`);
        setCombatEnemyType('boss_disorder');
      }
      setShowCombat(true);
    });

    const unsubNearZone = eventBus.on(
      'nearInteractiveZone',
      (data: {
        near: boolean;
        zone: any;
        candidates?: any[];
        selectedIndex?: number;
      }) => {
        setIsNearZone(data.near);
        setNearZonePrompt(data.zone?.prompt || '');
        setNearbyCandidates(data.candidates || []);
        setSelectedCandidateIndex(data.selectedIndex ?? 0);
      }
    );

    const unsubNotify = eventBus.on('showNotification', (msg: string) => {
      showNotification(msg);
    });

    const unsubPropActivity = eventBus.on(
      'openPropActivity',
      (data: { unitId: string; propId: string; propName: string; category?: PropCategory }) => {
        const activity = PropActivityService.getPropActivity(data.unitId, data.propId);
        if (activity) {
          setCurrentPropActivity(activity);
          setShowPropActivity(true);
        } else {
          showNotification(`Không có dữ liệu bài học cho đạo cụ: ${data.propName}`);
        }
      }
    );

    return () => {
      unsubDialogue();
      unsubTangKinhCac();
      unsubTraining();
      unsubMobCombat();
      unsubBossCombat();
      unsubNearZone();
      unsubNotify();
      unsubPropActivity();
    };
  }, []);

  // Khởi tạo game Phaser khi người chơi bắt đầu
  const initGame = (prof: PlayerProfile) => {
    setProfile(prof);
    setIsGameStarted(true);

    if (!phaserGameRef.current && gameContainerRef.current) {
      phaserGameRef.current = createPhaserGame(gameContainerRef.current, prof.gender);
    } else if (phaserGameRef.current) {
      eventBus.emit('changeGender', prof.gender);
    }

    eventBus.emit('updateUnitProgress', prof.unitProgress);
    eventBus.emit('updateDefeatedEnemyIds', prof.defeatedEnemyIds || []);
  };

  const handleStartNewGame = (name: string, gender: Gender) => {
    const newProf = createDefaultProfile(name, gender);
    initGame(newProf);
    showNotification('Chào mừng thiếu hiệp bước vào thế giới Võ Lâm!');
  };

  const handleResumeGame = () => {
    if (profile) {
      initGame(profile);
      showNotification(`Chào mừng trở lại, ${profile.name}!`);
    }
  };

  const handleResetProgress = () => {
    setProfile(null);
    setIsGameStarted(false);
    if (phaserGameRef.current) {
      phaserGameRef.current.destroy(true);
      phaserGameRef.current = null;
    }
  };

  const handleSelectUnit = (unitId: string, grade: 10 | 11 | 12) => {
    setProfile((prev) => {
      if (!prev) return prev;
      const currentUnitId = prev.selectedUnitId || 'g10-u01';
      const updatedStates = { ...(prev.unitStates || {}) };

      // Sync active unit fields into unitStates
      if (updatedStates[currentUnitId]) {
        updatedStates[currentUnitId] = {
          ...updatedStates[currentUnitId],
          progress: prev.unitProgress,
          quests: prev.quests,
          currentQuestIndex: prev.currentQuestIndex,
          defeatedMobs: prev.defeatedMobs,
          defeatedEnemyIds: prev.defeatedEnemyIds,
          bossDefeated: prev.bossDefeated,
          learnedVocabIds: prev.learnedVocabIds,
          completedPropIds: prev.completedPropIds || updatedStates[currentUnitId].completedPropIds || [],
          guardianQuestStates: (prev.guardianQuestStates && prev.guardianQuestStates[currentUnitId]) || updatedStates[currentUnitId].guardianQuestStates || {},
          isCompleted: prev.bossDefeated || prev.unitProgress >= 100,
          lastPlayedAt: Date.now(),
        };
      }

      const evaluatedStates = evaluateUnitUnlocks(updatedStates);

      const uNum = parseInt(unitId.split('-u')[1] || '1', 10);
      const targetState = evaluatedStates[unitId] || {
        unitId,
        grade,
        unitNumber: uNum,
        progress: 0,
        isUnlocked: true,
        isCompleted: false,
        quests: createUnitQuests(unitId, uNum, `Unit ${uNum}`),
        currentQuestIndex: 0,
        defeatedMobs: 0,
        defeatedEnemyIds: [],
        bossDefeated: false,
        learnedVocabIds: [],
        completedPropIds: [],
        guardianQuestStates: {},
        lastPlayedAt: Date.now(),
      };
      evaluatedStates[unitId] = targetState;

      const updatedProfile: PlayerProfile = {
        ...prev,
        selectedGrade: grade,
        selectedUnitId: unitId,
        unitStates: evaluatedStates,
        unitProgress: targetState.progress,
        quests: targetState.quests,
        currentQuestIndex: targetState.currentQuestIndex,
        defeatedMobs: targetState.defeatedMobs,
        defeatedEnemyIds: targetState.defeatedEnemyIds,
        bossDefeated: targetState.bossDefeated,
        learnedVocabIds: targetState.learnedVocabIds,
      };

      eventBus.emit('changeUnit', {
        unitId,
        grade,
        unitProgress: targetState.progress,
        defeatedEnemyIds: targetState.defeatedEnemyIds,
      });
      eventBus.emit('updateUnitProgress', targetState.progress);
      eventBus.emit('updateDefeatedEnemyIds', targetState.defeatedEnemyIds);

      showNotification(`Đã chuyển sang ${unitId.toUpperCase()} (Lớp ${grade})!`);
      return updatedProfile;
    });
  };


  // Xử lý tiến trình nhiệm vụ (Quest progression)
  const currentQuest = profile?.quests.find(
    (q) => q.status === 'available' || q.status === 'in_progress'
  );

  const advanceQuest = (questId: string) => {
    setProfile((prev) => {
      if (!prev) return prev;
      const res = ProgressionEngine.advanceQuest(prev, questId);
      if (res.profile === prev) return prev;

      soundService.playGong();
      showNotification(
        `Hoàn thành: ${res.questCompletedTitle} (+${res.progressGain}% tiến độ, +${res.xpGained} XP)!`
      );

      if (res.didLevelUp) {
        soundService.playLevelUp();
        showNotification(`ĐỘT PHÁ CẢNH GIỚI! Chúc mừng thăng cấp ${res.profile.stats.level}!`);
      }

      return res.profile;
    });
  };

  // Học từ vựng tại Tàng Kinh Các
  const handleLearnVocab = (vocabId: string) => {
    setProfile((prev) => {
      if (!prev) return prev;
      const res = ProgressionEngine.learnVocab(prev, vocabId);
      if (res.profile === prev) return prev;

      if (res.didCompleteQuest2) {
        soundService.playGong();
        showNotification(`Hoàn thành: Khai Ngộ Tàng Kinh Các (+20% tiến độ, +80 XP)! Hãy phá Phong Ấn.`);
      }

      if (res.didLevelUp) {
        soundService.playLevelUp();
        showNotification(`Đột phá cảnh giới! Chúc mừng thăng cấp ${res.profile.stats.level}!`);
      }

      return res.profile;
    });
  };

  // Hoàn thành thử thách Phong Ấn Tri Thức (Quest 3)
  const handleCompleteChallenge = () => {
    setProfile((prev) => {
      if (!prev) return prev;
      const res = ProgressionEngine.completeChallenge(prev);
      if (res.profile === prev) return prev;

      soundService.playGong();
      showNotification(`Hoàn thành: Phá Giải Phong Ấn Tri Thức (+20% tiến độ, +120 XP)! Nhận Thanh Phong Kiếm.`);

      if (res.didLevelUp) {
        soundService.playLevelUp();
        showNotification(`Đột phá cảnh giới! Chúc mừng thăng cấp ${res.profile.stats.level}!`);
      }

      return res.profile;
    });
  };

  // Khi thắng quái hoặc Boss
  const handleCombatVictory = (
    enemy: CombatEnemy,
    isBossPhase2Defeated: boolean,
    remainingPlayerHp: number
  ) => {
    setProfile((prev) => {
      if (!prev) return prev;
      const res = ProgressionEngine.processCombatVictory(
        prev,
        enemy,
        isBossPhase2Defeated,
        remainingPlayerHp,
        activeEncounterId || undefined
      );
      if (res.wasAlreadyDefeated) return prev;

      if (res.didLevelUp) {
        soundService.playLevelUp();
        showNotification(`Đột phá cảnh giới! Cấp ${res.profile.stats.level}! Sinh lực hồi phục đầy đủ.`);
      }

      if (res.didCompleteQuest4) {
        soundService.playGong();
        showNotification(`Hoàn thành: Thanh Trừng Trúc Lâm (+25% tiến độ)! Nhận Ngọc Bội & Bí Điển. Cổng Boss đã giải phong ấn!`);
      }

      if (res.didCompleteBoss) {
        soundService.playVictory();
        setShowVictory(true);
      } else if (!res.didCompleteQuest4) {
        showNotification(`Chiến thắng ${enemy.name}! Nhận +${enemy.xpReward} XP.`);
      }

      return res.profile;
    });
  };

  const handleSyncHp = (hp: number) => {
    setProfile((prev) => (prev ? ProgressionEngine.syncHp(prev, hp) : prev));
  };

  const handlePlayerTakeDamage = (damage: number) => {
    setProfile((prev) => (prev ? ProgressionEngine.takeDamage(prev, damage) : prev));
  };

  const handleAnswerKnowledge = (
    knowledgeItemIds: string[],
    isCorrect: boolean,
    responseTimeSec: number
  ) => {
    setProfile((prev) => {
      if (!prev) return prev;
      return ProgressionEngine.recordKnowledgeAnswer(
        prev,
        knowledgeItemIds,
        isCorrect,
        responseTimeSec
      );
    });
  };

  const handleCompleteTraining = () => {
    setProfile((prev) => {
      if (!prev) return prev;
      const res = ProgressionEngine.completeTrainingSession(prev, 25);
      if (res.didLevelUp) {
        soundService.playLevelUp();
        showNotification(`Đột phá cảnh giới! Chúc mừng thăng cấp ${res.profile.stats.level}!`);
      } else {
        showNotification('Hoàn thành buổi Luyện Công (+25 Tu Vi)!');
      }
      return res.profile;
    });
  };

  // Hoàn thành tương tác học tập đạo cụ (Prop Activity)
  const handleCompletePropActivity = (activity: PropActivityData) => {
    setProfile((prev) => {
      if (!prev) return prev;
      const res = ProgressionEngine.completePropActivity(
        prev,
        activity.unitId,
        activity.propId,
        activity.reward.xp,
        activity.reward.unitProgressGain,
        activity.question.knowledgeItemIds || []
      );

      if (res.isFirstCompletion) {
        showNotification(
          `Lĩnh hội ${activity.propName}: +${res.xpGained} Tu Vi và +${res.progressGain}% Tiến độ Unit!`
        );
        if (res.didLevelUp) {
          soundService.playLevelUp();
          showNotification(
            `Đột phá cảnh giới! Chúc mừng thăng cấp ${res.profile.stats.level}!`
          );
        }
      }
      return res.profile;
    });
  };

  // Trang bị vật phẩm
  const handleEquipItem = (item: InventoryItem) => {
    setProfile((prev) => {
      if (!prev) return prev;
      const updated = ProgressionEngine.equipItem(prev, item);
      showNotification(`Đã trang bị ${item.name}! Công Lực tăng lên ${updated.stats.congLuc}.`);
      return updated;
    });
  };

  // Tháo trang bị
  const handleUnequipItem = (slot: 'weapon' | 'accessory' | 'manual') => {
    setProfile((prev) => {
      if (!prev) return prev;
      const itemToUnequip = prev.equipment[slot];
      if (!itemToUnequip) return prev;
      const updated = ProgressionEngine.unequipItem(prev, slot);
      showNotification(`Đã tháo ${itemToUnequip.name}.`);
      return updated;
    });
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#0c0d10] font-sans">
      {/* Phaser Canvas Root */}
      <div ref={gameContainerRef} id="game-container" className="w-full h-full absolute inset-0 z-0" />

      {/* In-Game HUD Elements (when playing) */}
      {isGameStarted && profile && (
        <>
          <TopHUD
            profile={profile}
            currentQuest={currentQuest}
            onOpenQuestModal={() => setShowQuests(true)}
            onOpenUnitSelect={() => setShowUnitSelect(true)}
          />

          <Minimap
            profile={profile}
            currentQuest={currentQuest}
            onOpenQuestModal={() => setShowQuests(true)}
          />

          <BottomNav
            onOpenQuests={() => setShowQuests(true)}
            onOpenVocabulary={() => setShowVocabulary(true)}
            onOpenInventory={() => setShowInventory(true)}
            onOpenSettings={() => setShowSettings(true)}
            isNearZone={isNearZone}
            nearZonePrompt={nearZonePrompt}
            candidates={nearbyCandidates}
            selectedIndex={selectedCandidateIndex}
          />

          {/* Virtual Joystick for Touch Devices */}
          <VirtualJoystickUI />
        </>
      )}

      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 pointer-events-none animate-fadeIn">
          <div className="px-4 py-2 rounded-xl bg-amber-950/90 border border-amber-500/80 shadow-wuxia-gold text-amber-200 text-xs sm:text-sm font-bold backdrop-blur-md">
            {notification}
          </div>
        </div>
      )}

      {/* Start Screen */}
      {!isGameStarted && (
        <StartScreen
          existingProfile={profile}
          onStartNewGame={handleStartNewGame}
          onResumeGame={handleResumeGame}
        />
      )}

      {/* Dialogue Modal */}
      {showDialogue && profile && (
        <DialogueModal
          npcId={dialogueNpc}
          selectedUnitId={profile.selectedUnitId || 'g10-u01'}
          currentQuest={currentQuest}
          profile={profile}
          onUpdateProfile={(updated) => setProfile(updated)}
          onAdvanceQuest={advanceQuest}
          onOpenVocabulary={() => setShowVocabulary(true)}
          onOpenChallenge={() => setShowChallenge(true)}
          onOpenTraining={() => setShowTraining(true)}
          onAnswerKnowledge={handleAnswerKnowledge}
          onClose={() => setShowDialogue(false)}
        />
      )}

      {/* Vocabulary Modal (Bí Điển Tri Thức) */}
      {showVocabulary && profile && (
        <VocabularyModal
          currentQuest={currentQuest}
          learnedVocabIds={profile.learnedVocabIds}
          knowledgeMastery={profile.knowledgeMastery || {}}
          selectedUnitId={profile.selectedUnitId || 'g10-u01'}
          onLearnVocab={handleLearnVocab}
          onAdvanceQuest={advanceQuest}
          onStartChallenge={() => {
            setShowVocabulary(false);
            setShowChallenge(true);
          }}
          onClose={() => setShowVocabulary(false)}
        />
      )}

      {/* Challenge Modal (Phong Ấn Tri Thức) */}
      {showChallenge && profile && (
        <ChallengeModal
          currentQuest={currentQuest}
          knowledgeMastery={profile.knowledgeMastery || {}}
          selectedUnitId={profile.selectedUnitId || 'g10-u01'}
          onCompleteChallenge={handleCompleteChallenge}
          onAnswerKnowledge={handleAnswerKnowledge}
          onClose={() => setShowChallenge(false)}
        />
      )}

      {/* Combat Overlay (Combat arena) */}
      {showCombat && profile && (
        <CombatOverlay
          profile={profile}
          enemyType={combatEnemyType}
          combatEnemy={activeCombatEnemy}
          encounterId={activeEncounterId || undefined}
          onCombatVictory={handleCombatVictory}
          onPlayerTakeDamage={handlePlayerTakeDamage}
          onSyncHp={handleSyncHp}
          onAnswerKnowledge={handleAnswerKnowledge}
          onClose={() => setShowCombat(false)}
        />
      )}

      {/* Training Modal (Cọc Luyện Công Trúc Lâm) */}
      {showTraining && profile && (
        <TrainingModal
          profile={profile}
          isOpen={showTraining}
          onClose={() => setShowTraining(false)}
          onAnswerKnowledge={handleAnswerKnowledge}
          onCompleteTraining={handleCompleteTraining}
        />
      )}

      {/* Inventory Modal */}
      {showInventory && profile && (
        <InventoryModal
          profile={profile}
          onEquipItem={handleEquipItem}
          onUnequipItem={handleUnequipItem}
          onClose={() => setShowInventory(false)}
        />
      )}

      {/* Quest List Modal */}
      {showQuests && profile && (
        <QuestListModal profile={profile} onClose={() => setShowQuests(false)} />
      )}

      {/* Unit Selection Modal */}
      {showUnitSelect && profile && (
        <UnitSelectModal
          profile={profile}
          isOpen={showUnitSelect}
          onClose={() => setShowUnitSelect(false)}
          onSelectUnit={handleSelectUnit}
        />
      )}

      {/* Victory Celebration Modal */}
      {showVictory && profile && (
        <VictoryModal
          profile={profile}
          onContinue={() => setShowVictory(false)}
          onOpenInventory={() => {
            setShowVictory(false);
            setShowInventory(true);
          }}
        />
      )}

      {/* Settings Modal */}
      {showSettings && (
        <SettingsModal
          onResetProgress={handleResetProgress}
          onClose={() => setShowSettings(false)}
        />
      )}

      {/* Prop Learning Activity Modal */}
      {showPropActivity && currentPropActivity && profile && (
        <PropActivityModal
          activity={currentPropActivity}
          profile={profile}
          isOpen={showPropActivity}
          onClose={() => setShowPropActivity(false)}
          onComplete={handleCompletePropActivity}
        />
      )}
    </div>
  );
};
export default App;
