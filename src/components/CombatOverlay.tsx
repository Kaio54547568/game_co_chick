import React, { useState, useEffect, useRef } from 'react';
import {
  PlayerProfile,
  CombatEnemy,
  CombatQuestion,
  CombatMode,
  DialogueTacticalChoice,
  ComboStepItem,
} from '../types/game';
import { UnitContentService } from '../services/unitContentService';
import { soundService } from '../services/sound';
import { speechService } from '../services/speechService';
import { CombatEngine, CombatTurnResult, CombatTurnModifiers } from '../services/combatEngine';
import { MasteryEngine } from '../services/masteryEngine';
import { RemediationAdvisor } from '../data/progressionBalance';
import {
  Timer,
  Zap,
  Flame,
  Shield,
  X,
  RotateCcw,
  Award,
  Volume2,
  Eye,
  HelpCircle,
  Lightbulb,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
} from 'lucide-react';

interface CombatOverlayProps {
  profile: PlayerProfile;
  enemyType: 'sword_disciple' | 'mist_demon' | 'boss_disorder' | string;
  combatEnemy?: CombatEnemy | null;
  encounterId?: string;
  onCombatVictory: (enemy: CombatEnemy, isBossPhase2Defeated: boolean, remainingPlayerHp: number) => void;
  onPlayerTakeDamage: (damage: number) => void;
  onSyncHp: (hp: number) => void;
  onAnswerKnowledge?: (knowledgeItemIds: string[], isCorrect: boolean, responseTimeSec: number) => void;
  onClose: () => void;
}

export const CombatOverlay: React.FC<CombatOverlayProps> = ({
  profile,
  enemyType,
  combatEnemy,
  encounterId,
  onCombatVictory,
  onPlayerTakeDamage,
  onSyncHp,
  onAnswerKnowledge,
  onClose,
}) => {
  const isBoss = combatEnemy
    ? Boolean(combatEnemy.isBoss)
    : enemyType === 'boss_disorder' || enemyType.startsWith('boss');
  const activeUnitId = profile.selectedUnitId || 'g10-u01';

  // Load enemies customized for this active unit
  const unitEnemies = useRef(UnitContentService.getUnitEnemies(activeUnitId)).current;

  const [bossPhase, setBossPhase] = useState<number>(1);
  const [isPhaseTransitioning, setIsPhaseTransitioning] = useState<boolean>(false);

  const initialEnemy = useRef<CombatEnemy>(
    combatEnemy ||
      (isBoss
        ? unitEnemies.boss
        : unitEnemies.allMobs?.find((m) => m.id === enemyType) ||
          (enemyType === 'mist_demon' ? unitEnemies.mob2 : unitEnemies.mob1))
  ).current;

  const [enemyHp, setEnemyHp] = useState<number>(initialEnemy.hp);
  const [enemyMaxHp, setEnemyMaxHp] = useState<number>(initialEnemy.maxHp);
  const [playerHp, setPlayerHp] = useState<number>(profile.stats.hp);

  // Question pool from active unit, prioritizing the enemy's specific assigned combatMode
  const allUnitQuestions = useRef(UnitContentService.getUnitCombatQuestions(activeUnitId)).current;
  const questionPool = useRef<CombatQuestion[]>([]);

  if (questionPool.current.length === 0) {
    const enemyMode = initialEnemy.combatMode;
    const modeQuestions = enemyMode
      ? allUnitQuestions.filter((q) => q.combatMode === enemyMode)
      : [];

    if (modeQuestions.length > 0) {
      questionPool.current = modeQuestions;
    } else {
      questionPool.current = MasteryEngine.selectAdaptiveQuestions(
        allUnitQuestions,
        profile.knowledgeMastery || {},
        10
      );
    }
  }

  const [questionIdx, setQuestionIdx] = useState<number>(0);
  const currentQuestion: CombatQuestion =
    questionPool.current[questionIdx % questionPool.current.length] || allUnitQuestions[0];

  const currentMode: CombatMode = currentQuestion.combatMode || initialEnemy.combatMode || 'standard';
  const questionTimeLimit = bossPhase === 2 ? 20 : Math.max(currentMode === 'triple_combo' ? 45 : 30, currentQuestion.timeLimit || 0);

  // Tactical Briefing before combat begins
  const [showBriefing, setShowBriefing] = useState<boolean>(
    Boolean(initialEnemy.tutorialBriefing || initialEnemy.winCondition)
  );

  // Combat State
  const [timeLeft, setTimeLeft] = useState<number>(questionTimeLimit);
  const [startTime, setStartTime] = useState<number>(Date.now());
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [turnResult, setTurnResult] = useState<CombatTurnResult | null>(null);
  const [combo, setCombo] = useState<number>(0);

  // Mode 1: Phá Phong Ấn (Unseal) Word Tiles State
  const [availableWords, setAvailableWords] = useState<string[]>([]);
  const [orderedWords, setOrderedWords] = useState<string[]>([]);

  // Mode 2: Đoạt Lại Vong Từ (Hint State)
  const [isHintUsed, setIsHintUsed] = useState<boolean>(false);
  const [showHintText, setShowHintText] = useState<boolean>(false);

  // Mode 3: Mê Âm Truy Kích (Listening State)
  const [replaysLeft, setReplaysLeft] = useState<number>(currentQuestion.maxReplays || 3);
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);
  const [showTranscript, setShowTranscript] = useState<boolean>(false);

  // Mode 4: Thiên Diện Phá Ảo (Evidence Anchor State)
  const [selectedEvidenceIndex, setSelectedEvidenceIndex] = useState<number | null>(null);
  const [deceptionError, setDeceptionError] = useState<string | null>(null);

  // Mode 5: Hộ Tống Hội Thoại (Tactical Dialogue State)
  const [tacticalBuffNotice, setTacticalBuffNotice] = useState<string | null>(null);
  const [damageMultiplier, setDamageMultiplier] = useState<number>(1.0);
  const [enemyAttackMultiplier, setEnemyAttackMultiplier] = useState<number>(1.0);

  // Mode 6: Liên Hoàn Tam Chiêu (3-Phase Combo State)
  const [comboStepIndex, setComboStepIndex] = useState<number>(0);
  const [comboStepOrderedWords, setComboStepOrderedWords] = useState<string[]>([]);
  const [comboStepAvailWords, setComboStepAvailWords] = useState<string[]>([]);

  // Visual Effects
  const [vfxSpark, setVfxSpark] = useState<'critical' | 'hit' | null>(null);
  const [shakeScreen, setShakeScreen] = useState<boolean>(false);
  const [playerFlashRed, setPlayerFlashRed] = useState<boolean>(false);
  const [enemyFlashRed, setEnemyFlashRed] = useState<boolean>(false);
  const [floatingDamage, setFloatingDamage] = useState<{ text: string; isCrit: boolean; isPlayer: boolean } | null>(null);

  // Game End State
  const [combatOutcome, setCombatOutcome] = useState<'victory' | 'defeat' | null>(null);

  // Setup per-question mode state whenever currentQuestion changes
  useEffect(() => {
    setIsAnswered(false);
    setSelectedOption(null);
    setTurnResult(null);
    setDeceptionError(null);
    setTacticalBuffNotice(null);
    setIsHintUsed(false);
    setShowHintText(false);
    setShowTranscript(false);
    setSelectedEvidenceIndex(null);
    setComboStepIndex(0);

    setTimeLeft(questionTimeLimit);
    setStartTime(Date.now());

    // Word order setup for Mode 1
    if (currentMode === 'unseal' && currentQuestion.wordsToOrder) {
      setAvailableWords([...currentQuestion.wordsToOrder].sort(() => Math.random() - 0.5));
      setOrderedWords([]);
    }

    // Stop any previous speech synthesis
    speechService.stop();
    setIsAudioPlaying(false);

    // Audio setup for Mode 3
    if (currentMode === 'listening_pursuit') {
      setReplaysLeft(currentQuestion.maxReplays || 3);
      // Auto-play initial listening clip (courtesy play, doesn't deduct replay)
      if (currentQuestion.listeningScript) {
        setTimeout(() => {
          handlePlayAudio(currentQuestion.listeningScript!, false);
        }, 500);
      }
    }

    // Combo steps setup for Mode 6
    if (currentMode === 'triple_combo' && currentQuestion.comboSteps?.[0]) {
      setComboStepIndex(0);
      setReplaysLeft(3);
      const s1 = currentQuestion.comboSteps[0];
      if (s1.wordsToOrder) {
        setComboStepAvailWords([...s1.wordsToOrder].sort(() => Math.random() - 0.5));
        setComboStepOrderedWords([]);
      }
      if (s1.stepType === 'listen' && s1.listeningScript) {
        setTimeout(() => {
          handlePlayAudio(s1.listeningScript!, false);
        }, 500);
      }
    }
  }, [questionIdx, bossPhase]);

  // Cleanup speech synthesis on component unmount
  useEffect(() => {
    return () => {
      speechService.stop();
    };
  }, []);

  // Audio Playback handler (Web Speech API via speechService)
  const handlePlayAudio = (text: string, isReplay: boolean = true) => {
    if (isAudioPlaying) return;
    if (isReplay && replaysLeft <= 0) return;
    if (isReplay) {
      setReplaysLeft((prev) => Math.max(0, prev - 1));
    }
    setIsAudioPlaying(true);

    speechService.speak(text, {
      onStart: () => {
        setIsAudioPlaying(true);
      },
      onEnd: () => {
        setIsAudioPlaying(false);
      },
      onError: () => {
        setIsAudioPlaying(false);
      },
    });
  };

  // Timer Countdown: PAUSES while audio is playing or briefing is open (Crucial requirement!)
  useEffect(() => {
    if (isAnswered || combatOutcome || isPhaseTransitioning || isAudioPlaying || showBriefing) return;

    if (timeLeft <= 0) {
      handleTimeout();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isAnswered, combatOutcome, isPhaseTransitioning, isAudioPlaying, showBriefing]);

  // Keyboard listener for Tactical Briefing dismiss (Enter / Space)
  useEffect(() => {
    if (!showBriefing) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        soundService.playHit();
        setShowBriefing(false);
        setStartTime(Date.now());
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showBriefing]);

  const handleTimeout = () => {
    processAnswerResult(false, questionTimeLimit, null);
  };

  // --- MODE 1: Phá Phong Ấn (Unseal) Handlers ---
  const handleAddWordToOrder = (word: string, index: number) => {
    soundService.playClick();
    const newAvail = [...availableWords];
    newAvail.splice(index, 1);
    setAvailableWords(newAvail);
    setOrderedWords((prev) => [...prev, word]);
  };

  const handleRemoveWordFromOrder = (word: string, index: number) => {
    soundService.playClick();
    const newOrdered = [...orderedWords];
    newOrdered.splice(index, 1);
    setOrderedWords(newOrdered);
    setAvailableWords((prev) => [...prev, word]);
  };

  const handleResetWords = () => {
    soundService.playClick();
    if (currentQuestion.wordsToOrder) {
      setAvailableWords([...currentQuestion.wordsToOrder]);
      setOrderedWords([]);
    }
  };

  const handleUndoWord = () => {
    if (orderedWords.length === 0) return;
    soundService.playClick();
    const lastWord = orderedWords[orderedWords.length - 1];
    setOrderedWords((prev) => prev.slice(0, -1));
    setAvailableWords((prev) => [...prev, lastWord]);
  };

  const handleSubmitUnseal = () => {
    if (orderedWords.length === 0 || isAnswered) return;
    const responseTimeSec = Math.max(0.5, (Date.now() - startTime) / 1000);
    const formedSentence = orderedWords.join(' ');

    const cleanFormed = formedSentence.replace(/[.,!?]/g, '').trim().toLowerCase();
    const cleanTarget = currentQuestion.correctAnswer.replace(/[.,!?]/g, '').trim().toLowerCase();
    const isCorrect = cleanFormed === cleanTarget;

    setSelectedOption(formedSentence);
    processAnswerResult(isCorrect, responseTimeSec, formedSentence);
  };

  // --- MODE 4: Thiên Diện Phá Ảo (Evidence Anchor) Submit ---
  const handleSubmitDeception = () => {
    if (!selectedOption || selectedEvidenceIndex === null || isAnswered) return;
    const responseTimeSec = Math.max(0.5, (Date.now() - startTime) / 1000);

    const isOptCorrect = selectedOption === currentQuestion.correctAnswer;
    const isEvCorrect = selectedEvidenceIndex === currentQuestion.evidenceSentenceIndex;
    const isBothCorrect = isOptCorrect && isEvCorrect;

    if (!isBothCorrect) {
      if (!isOptCorrect) {
        setDeceptionError('Đáp án chưa chuẩn xác, bị ảo ảnh mê hoặc!');
      } else {
        setDeceptionError(
          currentQuestion.trapExplanation ||
            'Đáp án đúng nhưng chọn sai câu dẫn chứng! Khiên ảo ảnh chưa phá vỡ!'
        );
      }
    }

    processAnswerResult(isBothCorrect, responseTimeSec, selectedOption);
  };

  // --- MODE 5: Hộ Tống Hội Thoại Handler ---
  const handleSelectTacticalChoice = (choice: DialogueTacticalChoice) => {
    if (isAnswered || combatOutcome || isPhaseTransitioning) return;
    const responseTimeSec = Math.max(0.5, (Date.now() - startTime) / 1000);

    setSelectedOption(choice.text);
    setTacticalBuffNotice(choice.buffDescription);

    let dMult = 1.0;
    let eMult = 1.0;

    if (choice.buffEffect === 'shield') {
      const newHp = Math.min(profile.stats.maxHp, playerHp + choice.buffValue);
      setPlayerHp(newHp);
      onSyncHp(newHp);
    } else if (choice.buffEffect === 'atk_boost') {
      dMult = 1.5;
      setDamageMultiplier(1.5);
    } else if (choice.buffEffect === 'weaken') {
      eMult = 0.8;
      setEnemyAttackMultiplier(0.8);
    }

    const isCorrect = choice.isOptimal !== false;
    processAnswerResult(isCorrect, responseTimeSec, choice.text, {
      damageMultiplier: dMult,
      enemyAttackMultiplier: eMult,
    });
  };

  // --- MODE 6: Liên Hoàn Tam Chiêu Handler ---
  const handleComboStepSelectOption = (opt: string) => {
    if (isAnswered || !currentQuestion.comboSteps) return;
    const steps = currentQuestion.comboSteps;
    const activeStep = steps[comboStepIndex];

    const isCorrect = opt === activeStep.correctAnswer;
    if (isCorrect) {
      soundService.playHit();
      if (comboStepIndex + 1 < steps.length) {
        speechService.stop();
        setIsAudioPlaying(false);
        setShowTranscript(false);
        setComboStepIndex((prev) => prev + 1);
        const nextStep = steps[comboStepIndex + 1];
        if (nextStep.wordsToOrder) {
          setComboStepAvailWords([...nextStep.wordsToOrder].sort(() => Math.random() - 0.5));
          setComboStepOrderedWords([]);
        }
        if (nextStep.stepType === 'listen' && nextStep.listeningScript) {
          setReplaysLeft(3);
          setTimeout(() => {
            handlePlayAudio(nextStep.listeningScript!, false);
          }, 400);
        }
      } else {
        // Hoàn thành cả 3 chiêu!
        speechService.stop();
        setIsAudioPlaying(false);
        const responseTimeSec = Math.max(0.5, (Date.now() - startTime) / 1000);
        processAnswerResult(true, responseTimeSec, 'Tam Chiêu Hoàn Hảo');
      }
    } else {
      soundService.playError();
      const responseTimeSec = Math.max(0.5, (Date.now() - startTime) / 1000);
      processAnswerResult(false, responseTimeSec, opt);
    }
  };

  const handleAddComboWord = (word: string, index: number) => {
    soundService.playClick();
    const newAvail = [...comboStepAvailWords];
    newAvail.splice(index, 1);
    setComboStepAvailWords(newAvail);
    setComboStepOrderedWords((prev) => [...prev, word]);
  };

  const handleRemoveComboWord = (word: string, index: number) => {
    soundService.playClick();
    const newOrdered = [...comboStepOrderedWords];
    newOrdered.splice(index, 1);
    setComboStepOrderedWords(newOrdered);
    setComboStepAvailWords((prev) => [...prev, word]);
  };

  const handleResetComboWords = () => {
    soundService.playClick();
    const activeStep = currentQuestion.comboSteps?.[comboStepIndex];
    if (activeStep?.wordsToOrder) {
      setComboStepAvailWords([...activeStep.wordsToOrder]);
      setComboStepOrderedWords([]);
    }
  };

  const handleSubmitComboWords = () => {
    if (comboStepOrderedWords.length === 0 || isAnswered || !currentQuestion.comboSteps) return;
    const activeStep = currentQuestion.comboSteps[comboStepIndex];
    const formedSentence = comboStepOrderedWords.join(' ');
    const cleanFormed = formedSentence.replace(/[.,!?]/g, '').trim().toLowerCase();
    const cleanTarget = activeStep.correctAnswer.replace(/[.,!?]/g, '').trim().toLowerCase();
    const isCorrect = cleanFormed === cleanTarget;

    if (isCorrect) {
      soundService.playHit();
      speechService.stop();
      setIsAudioPlaying(false);
      const responseTimeSec = Math.max(0.5, (Date.now() - startTime) / 1000);
      processAnswerResult(true, responseTimeSec, 'Tam Chiêu Hoàn Hảo');
    } else {
      soundService.playError();
      const responseTimeSec = Math.max(0.5, (Date.now() - startTime) / 1000);
      processAnswerResult(false, responseTimeSec, formedSentence);
    }
  };

  // --- Standard Multiple Choice Handler ---
  const handleSelectOption = (opt: string) => {
    if (isAnswered || combatOutcome || isPhaseTransitioning) return;
    const responseTimeSec = Math.max(0.2, (Date.now() - startTime) / 1000);
    setSelectedOption(opt);

    const isCorrect = opt === currentQuestion.correctAnswer;
    processAnswerResult(isCorrect, responseTimeSec, opt, {
      hintUsed: isHintUsed,
    });
  };

  // Core Combat Processing
  const processAnswerResult = (
    isCorrect: boolean,
    responseTimeSec: number,
    selected: string | null,
    extraMods?: CombatTurnModifiers
  ) => {
    setIsAnswered(true);

    if (onAnswerKnowledge && currentQuestion.knowledgeItemIds) {
      onAnswerKnowledge(currentQuestion.knowledgeItemIds, isCorrect, responseTimeSec);
    }

    const mods: CombatTurnModifiers = {
      hintUsed: isHintUsed || extraMods?.hintUsed,
      damageMultiplier: extraMods?.damageMultiplier ?? damageMultiplier,
      enemyAttackMultiplier: extraMods?.enemyAttackMultiplier ?? enemyAttackMultiplier,
    };

    const result = CombatEngine.processTurn(
      isCorrect,
      responseTimeSec,
      combo,
      profile.stats,
      profile.equipment,
      { ...initialEnemy, hp: enemyHp, maxHp: enemyMaxHp },
      mods
    );

    setTurnResult(result);
    setCombo(result.comboCount);

    if (result.isCorrect) {
      if (result.isCritical) {
        soundService.playCritical();
        setVfxSpark('critical');
        setShakeScreen(true);
        setTimeout(() => setShakeScreen(false), 400);
      } else {
        soundService.playHit();
        setVfxSpark('hit');
      }

      setEnemyFlashRed(true);
      setTimeout(() => {
        setEnemyFlashRed(false);
        setVfxSpark(null);
      }, 350);

      const requiredQs = initialEnemy.requiredQuestionsCount || 1;
      const damagePerQuestion = Math.ceil(initialEnemy.maxHp / requiredQs);
      const effectiveDamage = Math.max(result.damageToEnemy, damagePerQuestion);

      const nextEnemyHp = Math.max(0, enemyHp - effectiveDamage);
      setEnemyHp(nextEnemyHp);
      setFloatingDamage({
        text: `-${effectiveDamage} ${result.isCritical ? 'CRITICAL!' : ''}`,
        isCrit: result.isCritical,
        isPlayer: false,
      });

      if (nextEnemyHp <= 0) {
        if (isBoss && bossPhase === 1) {
          handleBossPhaseTransition();
          return;
        } else {
          setTimeout(() => {
            soundService.playVictory();
            setCombatOutcome('victory');
          }, 600);
          return;
        }
      }
    } else {
      soundService.playError();
      setPlayerFlashRed(true);
      setShakeScreen(true);
      setTimeout(() => {
        setPlayerFlashRed(false);
        setShakeScreen(false);
      }, 350);

      const nextPlayerHp = Math.max(0, playerHp - result.damageToPlayer);
      setPlayerHp(nextPlayerHp);
      onPlayerTakeDamage(result.damageToPlayer);

      setFloatingDamage({
        text: `-${result.damageToPlayer}`,
        isCrit: false,
        isPlayer: true,
      });

      if (nextPlayerHp <= 0) {
        setTimeout(() => {
          setCombatOutcome('defeat');
        }, 600);
        return;
      }
    }

    setTimeout(() => {
      setFloatingDamage(null);
    }, 1200);
  };

  // Boss Phase Transition
  const handleBossPhaseTransition = () => {
    setIsPhaseTransitioning(true);
    soundService.playGong();

    setTimeout(() => {
      setBossPhase(2);
      setEnemyMaxHp(initialEnemy.maxHp + 80);
      setEnemyHp(initialEnemy.maxHp + 80);
      setQuestionIdx((prev) => prev + 1);
      setIsPhaseTransitioning(false);
      setIsAnswered(false);
      setSelectedOption(null);
      setTurnResult(null);
      setTimeLeft(8);
      setStartTime(Date.now());
      soundService.playCritical();
    }, 2400);
  };

  const handleNextQuestion = () => {
    setIsAnswered(false);
    setSelectedOption(null);
    setTurnResult(null);
    setVfxSpark(null);
    setFloatingDamage(null);
    setDamageMultiplier(1.0);
    setEnemyAttackMultiplier(1.0);

    const nextIdx = questionIdx + 1;
    setQuestionIdx(nextIdx);
  };

  const handleRetryCurrentQuestion = () => {
    setIsAnswered(false);
    setSelectedOption(null);
    setTurnResult(null);
    setDeceptionError(null);
    setTacticalBuffNotice(null);
    setIsHintUsed(false);
    setShowHintText(false);
    setShowTranscript(false);
    setSelectedEvidenceIndex(null);
    setComboStepIndex(0);
    setTimeLeft(questionTimeLimit);
    setStartTime(Date.now());

    if (currentMode === 'unseal' && currentQuestion.wordsToOrder) {
      setAvailableWords([...currentQuestion.wordsToOrder].sort(() => Math.random() - 0.5));
      setOrderedWords([]);
    }

    if (currentMode === 'listening_pursuit') {
      setReplaysLeft(currentQuestion.maxReplays || 3);
      if (currentQuestion.listeningScript) {
        setTimeout(() => {
          handlePlayAudio(currentQuestion.listeningScript!, false);
        }, 300);
      }
    }

    if (currentMode === 'triple_combo' && currentQuestion.comboSteps?.[0]) {
      setReplaysLeft(3);
      const s1 = currentQuestion.comboSteps[0];
      if (s1.wordsToOrder) {
        setComboStepAvailWords([...s1.wordsToOrder].sort(() => Math.random() - 0.5));
        setComboStepOrderedWords([]);
      }
      if (s1.stepType === 'listen' && s1.listeningScript) {
        setTimeout(() => {
          handlePlayAudio(s1.listeningScript!, false);
        }, 300);
      }
    }
  };

  const handleClaimVictory = () => {
    onCombatVictory(initialEnemy, isBoss ? bossPhase === 2 : true, playerHp);
    onClose();
  };

  const handleRetreat = () => {
    onSyncHp(Math.max(1, playerHp));
    onClose();
  };

  const handleRetry = () => {
    onSyncHp(profile.stats.maxHp);
    setPlayerHp(profile.stats.maxHp);
    setEnemyHp(initialEnemy.hp);
    setBossPhase(1);
    setQuestionIdx(0);
    setCombatOutcome(null);
    setIsAnswered(false);
    setSelectedOption(null);
    setTurnResult(null);
    setCombo(0);
    setTimeLeft(questionTimeLimit);
    setStartTime(Date.now());
  };

  const enemyHpPercent = Math.min(100, Math.max(0, (enemyHp / enemyMaxHp) * 100));
  const playerHpPercent = Math.min(100, Math.max(0, (playerHp / profile.stats.maxHp) * 100));

  const getModeBadge = (mode: CombatMode) => {
    switch (mode) {
      case 'unseal':
        return { label: 'Phá phong ấn', color: 'bg-amber-500/20 text-amber-300 border-amber-500/50' };
      case 'lost_word':
        return { label: 'Đoạt lại vong từ', color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50' };
      case 'listening_pursuit':
        return { label: 'Mê âm truy kích', color: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50' };
      case 'deception_pierce':
        return { label: 'Thiên diện phá ảo', color: 'bg-purple-500/20 text-purple-300 border-purple-500/50' };
      case 'escort_dialogue':
        return { label: 'Hộ tống hội thoại', color: 'bg-blue-500/20 text-blue-300 border-blue-500/50' };
      case 'triple_combo':
        return { label: 'Liên hoàn tam chiêu', color: 'bg-rose-500/20 text-rose-300 border-rose-500/50' };
      default:
        return { label: 'Quyết đấu tri thức', color: 'bg-stone-800 text-stone-300 border-stone-600' };
    }
  };

  const modeBadge = getModeBadge(currentMode);
  const remediationAdvice = RemediationAdvisor.getAdvice(
    initialEnemy.learningSkill || currentQuestion?.knowledgeItemIds?.join(' ') || initialEnemy.name,
    profile.selectedUnitId || ''
  );

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/90 select-none overflow-hidden ${
        shakeScreen ? 'animate-screen-shake' : ''
      }`}
    >
      {/* Arena Background */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-40 filter contrast-125"
        style={{ backgroundImage: 'url(/assets/game/combat/courtyard_arena.jpg)' }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/80 to-transparent" />

      {/* Main Combat Stage */}
      <div className="relative z-10 w-full max-w-4xl h-full max-h-[96vh] flex flex-col justify-between">
        {/* Top Header: Combat Mode & Info */}
        <div className="flex items-center justify-between px-2 pt-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`text-xs font-bold px-2 py-0.5 rounded border ${modeBadge.color}`}>
              {modeBadge.label}
            </span>

            {isBoss && (
              <span
                className={`text-xs font-bold px-2.5 py-0.5 rounded border ${
                  bossPhase === 2
                    ? 'bg-red-950/90 border-red-500 text-red-300 animate-pulse'
                    : 'bg-amber-950/90 border-amber-500 text-amber-300'
                }`}
              >
                Boss giai đoạn {bossPhase}: {bossPhase === 2 ? 'Cuồng nộ' : 'Trấn thủ'}
              </span>
            )}

            {combo >= 2 && (
              <div className="flex items-center gap-1 text-xs font-black text-amber-300 bg-amber-950/80 px-2 py-0.5 rounded-full border border-amber-400 shadow-wuxia-gold animate-bounce-subtle">
                <Flame className="w-3.5 h-3.5 text-orange-400 fill-current" />
                COMBO x{combo}!
              </div>
            )}
          </div>

          <button
            onClick={handleRetreat}
            className="p-1 rounded bg-stone-900/80 hover:bg-stone-800 text-stone-400 hover:text-stone-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Middle: Fighters Stage */}
        <div className="relative flex items-center justify-between px-4 sm:px-12 my-auto">
          {/* Left Fighter: Player */}
          <div className="flex flex-col items-center">
            <div className="w-32 sm:w-44 mb-2 bg-stone-950/90 border border-amber-600/50 rounded-lg p-1.5 shadow-lg">
              <div className="flex justify-between text-[11px] font-bold text-amber-200 mb-0.5">
                <span>{profile.name}</span>
                <span>
                  {playerHp}/{profile.stats.maxHp}
                </span>
              </div>
              <div className="w-full h-2.5 bg-stone-900 rounded-full overflow-hidden border border-red-950">
                <div
                  className="h-full bg-gradient-to-r from-red-600 to-rose-400 transition-all duration-300"
                  style={{ width: `${playerHpPercent}%` }}
                />
              </div>
            </div>

            <div
              className={`relative transition duration-200 ${
                playerFlashRed ? 'filter drop-shadow-[0_0_15px_rgba(255,0,0,0.8)] scale-95' : ''
              }`}
            >
              <img
                src={
                  profile.gender === 'female'
                    ? '/assets/game/characters/player/female_idle.png'
                    : '/assets/game/characters/player/male_idle.png'
                }
                alt="Player"
                className="w-28 sm:w-36 h-36 sm:h-44 object-contain filter drop-shadow-2xl"
              />
            </div>
          </div>

          {/* Floating Damage Text */}
          {floatingDamage && (
            <div
              className={`absolute top-1/3 ${
                floatingDamage.isPlayer ? 'left-1/4' : 'right-1/4'
              } transform -translate-y-8 text-2xl sm:text-4xl font-black italic tracking-wider animate-bounce drop-shadow-[0_4px_10px_rgba(0,0,0,1)] ${
                floatingDamage.isCrit
                  ? 'text-yellow-300 drop-shadow-[0_0_12px_rgba(255,215,0,0.9)]'
                  : floatingDamage.isPlayer
                  ? 'text-red-500'
                  : 'text-amber-400'
              }`}
            >
              {floatingDamage.text}
            </div>
          )}

          {/* Spark VFX */}
          {vfxSpark && (
            <div className="absolute right-1/4 top-1/3 transform -translate-y-6 pointer-events-none animate-slash-flash">
              <img
                src={
                  vfxSpark === 'critical'
                    ? '/assets/game/vfx/critical_spark.png'
                    : '/assets/game/vfx/hit_spark.png'
                }
                alt="VFX"
                className="w-28 sm:w-40 h-28 sm:h-40 object-contain"
              />
            </div>
          )}

          {/* Right Fighter: Enemy / Boss */}
          <div className="flex flex-col items-center">
            <div className="w-32 sm:w-48 mb-2 bg-stone-950/90 border border-red-700/60 rounded-lg p-1.5 shadow-lg">
              <div className="flex justify-between text-[11px] font-bold text-red-200 mb-0.5">
                <span className="truncate max-w-[100px]">{initialEnemy.name}</span>
                <span>
                  {enemyHp}/{enemyMaxHp}
                </span>
              </div>
              <div className="w-full h-2.5 bg-stone-900 rounded-full overflow-hidden border border-red-950">
                <div
                  className="h-full bg-gradient-to-r from-red-700 to-amber-500 transition-all duration-300"
                  style={{ width: `${enemyHpPercent}%` }}
                />
              </div>
            </div>

            <div
              className={`relative transition duration-200 ${
                enemyFlashRed ? 'filter drop-shadow-[0_0_20px_rgba(255,0,0,0.9)] scale-95' : ''
              } ${bossPhase === 2 ? 'filter drop-shadow-[0_0_25px_rgba(255,50,50,0.8)]' : ''}`}
            >
              <img
                src={initialEnemy.spriteKey}
                alt={initialEnemy.name}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/assets/game/characters/bosses/loan_ngu_kiem_ma.png';
                }}
                className={`object-contain filter drop-shadow-2xl ${
                  isBoss ? 'w-36 sm:w-52 h-44 sm:h-56' : 'w-28 sm:w-36 h-36 sm:h-44'
                }`}
              />
            </div>
          </div>
        </div>

        {/* Phase Transition Cutscene Banner */}
        {isPhaseTransitioning && (
          <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/85 backdrop-blur-md animate-fadeIn">
            <div className="text-center p-6 space-y-3">
              <div className="text-red-500 text-sm font-extrabold animate-pulse">
                Cảnh báo: Hắc khí bùng nổ!
              </div>
              <h3 className="text-2xl sm:text-4xl font-black text-red-400 font-wuxia drop-shadow-md">
                "{initialEnemy.dialoguePhase2 || 'Khá khen tiểu bối! Hãy nếm thử Cuồng Nộ Ma Kiếm!'}"
              </h3>
              <p className="text-stone-300 text-sm italic">
                Tiến vào Phase 2: Thời gian thi triển chiêu thức chỉ còn 8 giây!
              </p>
            </div>
          </div>
        )}

        {/* Bottom Question & Interactive Mode Controls */}
        {!combatOutcome && !isPhaseTransitioning && (
          <div className="bg-stone-900/95 border-t-2 border-amber-600/70 rounded-t-2xl p-3 sm:p-5 shadow-2xl flex flex-col gap-3">
            {/* Timer Bar & Audio playback banner */}
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-1.5 text-xs text-amber-400 font-bold">
                <Timer className="w-4 h-4 text-amber-400" />
                <span>Thời gian: {timeLeft}s</span>
                {isAudioPlaying && (
                  <span className="text-cyan-400 text-[11px] animate-pulse ml-2 font-bold">
                    🔊 Đang phát tiếng... (tạm dừng)
                  </span>
                )}
              </div>

              <div className="flex-1 max-w-xs h-2 bg-stone-950 rounded-full overflow-hidden border border-stone-700">
                <div
                  className={`h-full transition-all duration-300 ${
                    timeLeft <= 3 ? 'bg-red-500' : timeLeft <= 6 ? 'bg-yellow-500' : 'bg-emerald-500'
                  }`}
                  style={{
                    width: `${(timeLeft / questionTimeLimit) * 100}%`,
                  }}
                />
              </div>
            </div>

            {/* Prompt Box */}
            <div className="bg-stone-950/90 border border-stone-800 rounded-xl p-3 sm:p-4">
              <p className="text-sm sm:text-base font-bold text-amber-100 whitespace-pre-line">
                {currentQuestion.prompt}
              </p>
            </div>

            {/* ----------------- MODE 1: PHÁ PHONG ẤN UI ----------------- */}
            {currentMode === 'unseal' && (
              <div className="flex flex-col gap-2.5">
                {/* Sentence assembly drop slot */}
                <div className="min-h-12 p-2.5 rounded-xl border-2 border-dashed border-amber-500/60 bg-stone-950/70 flex flex-wrap gap-2 items-center">
                  {orderedWords.length === 0 ? (
                    <span className="text-xs text-stone-500 italic">
                      Nhấn vào các mảnh từ bên dưới để sắp xếp kiếm quyết...
                    </span>
                  ) : (
                    orderedWords.map((word, idx) => (
                      <button
                        key={idx}
                        disabled={isAnswered}
                        onClick={() => handleRemoveWordFromOrder(word, idx)}
                        className="px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs shadow transition active:scale-95 flex items-center gap-1"
                      >
                        <span>{word}</span>
                        <X className="w-3 h-3 text-stone-900" />
                      </button>
                    ))
                  )}
                </div>

                {/* Available word tiles pool */}
                <div className="p-2 rounded-xl bg-stone-950/50 border border-stone-800 flex flex-wrap gap-2 min-h-10 items-center">
                  {availableWords.map((word, idx) => (
                    <button
                      key={idx}
                      disabled={isAnswered}
                      onClick={() => handleAddWordToOrder(word, idx)}
                      className="px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-amber-200 border border-amber-500/40 font-semibold text-xs transition active:scale-95"
                    >
                      {word}
                    </button>
                  ))}
                </div>

                {/* Action buttons: Reset, Undo, Submit */}
                <div className="flex gap-2 justify-end pt-1">
                  <button
                    disabled={isAnswered || orderedWords.length === 0}
                    onClick={handleUndoWord}
                    className="px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-bold border border-stone-700 transition"
                  >
                    Hoàn Tác
                  </button>
                  <button
                    disabled={isAnswered || orderedWords.length === 0}
                    onClick={handleResetWords}
                    className="px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-bold border border-stone-700 transition"
                  >
                    Làm Lại
                  </button>
                  <button
                    disabled={isAnswered || orderedWords.length === 0}
                    onClick={handleSubmitUnseal}
                    className="px-5 py-1.5 rounded-lg bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-500 text-stone-950 text-xs font-black shadow transition active:scale-95"
                  >
                    Xuất Chiêu Phá Ấn ⚡
                  </button>
                </div>
              </div>
            )}

            {/* ----------------- MODE 2: ĐOẠT LẠI VONG TỪ UI ----------------- */}
            {currentMode === 'lost_word' && (
              <div className="flex flex-col gap-2.5">
                {/* Hint Toggle Button & Warning */}
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => {
                      soundService.playClick();
                      setShowHintText(!showHintText);
                      setIsHintUsed(true);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 border transition ${
                      isHintUsed
                        ? 'bg-amber-950/80 border-amber-500 text-amber-300'
                        : 'bg-stone-800/80 border-stone-700 text-stone-300 hover:border-amber-400'
                    }`}
                  >
                    <Lightbulb className="w-3.5 h-3.5 text-yellow-400" />
                    <span>{showHintText ? 'Ẩn Gợi Ý' : 'Dùng Gợi Ý Chiêu Thức (-40% Sát Thương)'}</span>
                  </button>

                  {isHintUsed && (
                    <span className="text-[11px] text-amber-400 italic">
                      ⚠️ Đang kích hoạt gợi ý: Giảm 40% sát thương đòn đánh!
                    </span>
                  )}
                </div>

                {/* Hint Box */}
                {showHintText && currentQuestion.hintText && (
                  <div className="p-2.5 rounded-xl bg-amber-950/40 border border-amber-500/40 text-amber-200 text-xs animate-fadeIn">
                    {currentQuestion.hintText}
                  </div>
                )}

                {/* Options */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {currentQuestion.options.map((opt, idx) => (
                    <button
                      key={idx}
                      disabled={isAnswered}
                      onClick={() => handleSelectOption(opt)}
                      className="w-full p-2.5 sm:p-3 rounded-xl border text-left text-xs sm:text-sm font-semibold transition flex items-center justify-between bg-stone-800/90 border-stone-700 hover:border-amber-400 text-stone-100"
                    >
                      <span>{opt}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* ----------------- MODE 3: MÊ ÂM TRUY KÍCH UI ----------------- */}
            {currentMode === 'listening_pursuit' && (
              <div className="flex flex-col gap-2.5">
                {/* Audio controls banner */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-stone-950 border border-cyan-500/40">
                  <div className="flex items-center gap-3">
                    <button
                      disabled={replaysLeft <= 0 || isAudioPlaying}
                      onClick={() =>
                        handlePlayAudio(
                          currentQuestion.listeningScript || currentQuestion.prompt,
                          true
                        )
                      }
                      className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 shadow transition active:scale-95 ${
                        replaysLeft > 0 && !isAudioPlaying
                          ? 'bg-cyan-600 hover:bg-cyan-500 text-stone-950 font-bold'
                          : 'bg-stone-800 text-stone-500 cursor-not-allowed'
                      }`}
                    >
                      <Volume2 className={`w-4 h-4 ${isAudioPlaying ? 'animate-bounce text-amber-300' : ''}`} />
                      <span>{isAudioPlaying ? 'Đang Truyền Khẩu Quyết...' : 'Phát Lại Khẩu Quyết'}</span>
                    </button>

                    <span className="text-xs text-stone-300 font-semibold">
                      Lượt nghe còn lại: <b className="text-cyan-400">{replaysLeft}/3</b>
                    </span>
                  </div>

                  {/* Transcript Fallback Toggle */}
                  <button
                    onClick={() => {
                      soundService.playClick();
                      setShowTranscript(!showTranscript);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-semibold border border-stone-700 flex items-center gap-1.5"
                  >
                    <Eye className="w-3.5 h-3.5 text-stone-400" />
                    <span>{showTranscript ? 'Ẩn Lời Thoại' : 'Bản Chép Lời'}</span>
                  </button>
                </div>

                {/* Transcript Box */}
                {showTranscript && currentQuestion.transcriptFallback && (
                  <div className="p-3 rounded-xl bg-cyan-950/40 border border-cyan-600/40 text-cyan-200 text-xs italic animate-fadeIn">
                    {currentQuestion.transcriptFallback}
                  </div>
                )}

                {/* Multiple choice options */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {currentQuestion.options.map((opt, idx) => (
                    <button
                      key={idx}
                      disabled={isAnswered}
                      onClick={() => handleSelectOption(opt)}
                      className="w-full p-2.5 sm:p-3 rounded-xl border text-left text-xs sm:text-sm font-semibold transition flex items-center justify-between bg-stone-800/90 border-stone-700 hover:border-cyan-400 text-stone-100"
                    >
                      <span>{opt}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* ----------------- MODE 4: THIÊN DIỆN PHÁ ẢO UI ----------------- */}
            {currentMode === 'deception_pierce' && (
              <div className="flex flex-col gap-2.5">
                {/* Passage with clickable numbered sentences */}
                <div className="p-3 rounded-xl bg-stone-950 border border-purple-500/40 space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-bold text-purple-300">
                    <span>Văn bản trích đoạn (Bấm vào câu chứa dẫn chứng xác thực):</span>
                    {selectedEvidenceIndex !== null && (
                      <span className="text-emerald-400">Đã chọn dẫn chứng: Câu [{selectedEvidenceIndex}]</span>
                    )}
                  </div>

                  <div className="text-xs text-stone-200 leading-relaxed flex flex-wrap gap-1.5">
                    {currentQuestion.passageSentences ? (
                      currentQuestion.passageSentences.map((sent, idx) => {
                        const sNum = idx + 1;
                        const isSelected = selectedEvidenceIndex === sNum;
                        return (
                          <span
                            key={idx}
                            onClick={() => {
                              soundService.playClick();
                              setSelectedEvidenceIndex(sNum);
                            }}
                            className={`p-1 rounded cursor-pointer transition ${
                              isSelected
                                ? 'bg-purple-900/90 border border-purple-400 text-purple-200 font-bold'
                                : 'hover:bg-stone-800/80 text-stone-300'
                            }`}
                          >
                            <b className="text-purple-400 mr-1">[{sNum}]</b>
                            {sent}
                          </span>
                        );
                      })
                    ) : (
                      <span>{currentQuestion.readingPassage}</span>
                    )}
                  </div>
                </div>

                {/* Error distractor explanation if failed */}
                {deceptionError && (
                  <div className="p-2.5 rounded-xl bg-red-950/70 border border-red-500 text-red-200 text-xs flex items-center gap-2 animate-fadeIn">
                    <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0" />
                    <span>{deceptionError}</span>
                  </div>
                )}

                {/* Option Choice Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {currentQuestion.options.map((opt, idx) => {
                    const isSelected = selectedOption === opt;
                    return (
                      <button
                        key={idx}
                        disabled={isAnswered}
                        onClick={() => setSelectedOption(opt)}
                        className={`w-full p-2.5 sm:p-3 rounded-xl border text-left text-xs sm:text-sm font-semibold transition flex items-center justify-between ${
                          isSelected
                            ? 'bg-purple-950 border-purple-400 text-purple-200 shadow-wuxia-gold'
                            : 'bg-stone-800/90 border-stone-700 hover:border-purple-400 text-stone-100'
                        }`}
                      >
                        <span>{opt}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Confirm Button */}
                <button
                  disabled={!selectedOption || selectedEvidenceIndex === null || isAnswered}
                  onClick={handleSubmitDeception}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 text-stone-100 font-bold text-xs shadow transition disabled:opacity-50"
                >
                  Phá Khiên Ảo Ảnh (Xác Nhận Cả Đáp Án & Dẫn Chứng) 🗡️
                </button>
              </div>
            )}

            {/* ----------------- MODE 5: HỘ TỐNG HỘI THOẠI UI ----------------- */}
            {currentMode === 'escort_dialogue' && (
              <div className="flex flex-col gap-2.5">
                {tacticalBuffNotice && (
                  <div className="p-2.5 rounded-xl bg-emerald-950/80 border border-emerald-500 text-emerald-300 text-xs font-bold animate-fadeIn">
                    {tacticalBuffNotice}
                  </div>
                )}

                <div className="flex flex-col gap-2">
                  {currentQuestion.dialogueChoices?.map((choice, idx) => (
                    <button
                      key={idx}
                      disabled={isAnswered}
                      onClick={() => handleSelectTacticalChoice(choice)}
                      className="w-full p-3 rounded-xl border border-stone-700 hover:border-blue-400 bg-stone-800/90 hover:bg-stone-800 text-left text-xs sm:text-sm transition flex flex-col sm:flex-row justify-between sm:items-center gap-1.5"
                    >
                      <span className="font-semibold text-stone-100">{choice.text}</span>
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-blue-950 border border-blue-500 text-blue-300 self-start sm:self-auto">
                        {choice.buffDescription}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* ----------------- MODE 6: LIÊN HOÀN TAM CHIÊU UI ----------------- */}
            {currentMode === 'triple_combo' && currentQuestion.comboSteps && (
              <div className="flex flex-col gap-2.5">
                {/* 3 Steps Pipeline Indicator */}
                <div className="flex items-center justify-between p-2 rounded-xl bg-stone-950 border border-rose-500/40">
                  {currentQuestion.comboSteps.map((step, idx) => (
                    <div
                      key={idx}
                      className={`flex-1 text-center text-xs font-bold py-1 px-2 rounded-lg transition ${
                        comboStepIndex === idx
                          ? 'bg-rose-950 border border-rose-500 text-rose-300'
                          : comboStepIndex > idx
                          ? 'bg-emerald-950/80 text-emerald-400'
                          : 'text-stone-500'
                      }`}
                    >
                      {step.title}
                    </div>
                  ))}
                </div>

                {/* Active Step Question */}
                {(() => {
                  const activeStep = currentQuestion.comboSteps[comboStepIndex];
                  if (!activeStep) return null;
                  return (
                    <div className="p-3 rounded-xl bg-stone-950/80 border border-stone-800 space-y-3">
                      <p className="text-xs sm:text-sm font-bold text-rose-200">{activeStep.prompt}</p>

                      {/* Audio Controls for Listen Step */}
                      {(activeStep.stepType === 'listen' || activeStep.listeningScript) && (
                        <div className="p-3 rounded-xl bg-stone-950 border border-rose-500/40 flex flex-col sm:flex-row items-center justify-between gap-2.5">
                          <div className="flex items-center gap-3 w-full sm:w-auto">
                            <button
                              disabled={replaysLeft <= 0 || isAudioPlaying}
                              onClick={() =>
                                handlePlayAudio(
                                  activeStep.listeningScript || activeStep.prompt,
                                  true
                                )
                              }
                              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 shadow transition active:scale-95 ${
                                replaysLeft > 0 && !isAudioPlaying
                                  ? 'bg-rose-600 hover:bg-rose-500 text-stone-950 font-bold'
                                  : 'bg-stone-800 text-stone-500 cursor-not-allowed'
                              }`}
                            >
                              <Volume2 className={`w-4 h-4 ${isAudioPlaying ? 'animate-bounce text-amber-300' : ''}`} />
                              <span>{isAudioPlaying ? 'Đang Truyền Khẩu Quyết...' : 'Phát Lại Khẩu Quyết'}</span>
                            </button>

                            <span className="text-xs text-stone-300 font-semibold whitespace-nowrap">
                              Lượt nghe: <b className="text-rose-400">{replaysLeft}/3</b>
                            </span>
                          </div>

                          {/* Hint / Transcript Fallback Toggle */}
                          <button
                            onClick={() => {
                              soundService.playClick();
                              setShowTranscript(!showTranscript);
                            }}
                            className="px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-semibold border border-stone-700 flex items-center gap-1.5 self-end sm:self-auto"
                          >
                            <Eye className="w-3.5 h-3.5 text-stone-400" />
                            <span>{showTranscript ? 'Ẩn Gợi Ý' : 'Gợi Ý / Khẩu Quyết'}</span>
                          </button>
                        </div>
                      )}

                      {/* Hint / Transcript Box */}
                      {showTranscript && (activeStep.hint || activeStep.listeningScript) && (
                        <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-600/40 text-rose-200 text-xs italic animate-fadeIn">
                          💡 <b>Gợi ý:</b> {activeStep.hint || `Từ phát âm: "${activeStep.listeningScript}"`}
                        </div>
                      )}

                      {/* Step 3 Word Unseal Puzzle (if activeStep has wordsToOrder) */}
                      {activeStep.wordsToOrder && comboStepAvailWords && comboStepAvailWords.length > 0 ? (
                        <div className="space-y-3">
                          {/* Assembled Sentence Area */}
                          <div className="min-h-[50px] p-3 rounded-xl bg-stone-900 border-2 border-dashed border-rose-500/50 flex flex-wrap gap-1.5 items-center">
                            {comboStepOrderedWords.length === 0 ? (
                              <span className="text-xs text-stone-500 italic">
                                Bấm các từ bên dưới để ghép thành kiếm chiêu hoàn chỉnh...
                              </span>
                            ) : (
                              comboStepOrderedWords.map((word, wIdx) => (
                                <button
                                  key={wIdx}
                                  disabled={isAnswered}
                                  onClick={() => handleRemoveComboWord(word, wIdx)}
                                  className="px-2.5 py-1 rounded-lg bg-rose-900/80 border border-rose-500 text-rose-200 text-xs font-semibold hover:bg-rose-800 transition"
                                >
                                  {word} ✕
                                </button>
                              ))
                            )}
                          </div>

                          {/* Available Word Pool */}
                          <div className="flex flex-wrap gap-2">
                            {comboStepAvailWords.map((word, wIdx) => (
                              <button
                                key={wIdx}
                                disabled={isAnswered}
                                onClick={() => handleAddComboWord(word, wIdx)}
                                className="px-3 py-1.5 rounded-lg bg-stone-800 border border-stone-700 hover:border-rose-400 hover:bg-stone-700 text-stone-200 text-xs font-semibold transition active:scale-95"
                              >
                                {word}
                              </button>
                            ))}
                          </div>

                          {/* Action controls for Unseal Step */}
                          <div className="flex items-center justify-between pt-1">
                            <button
                              disabled={comboStepOrderedWords.length === 0 || isAnswered}
                              onClick={handleResetComboWords}
                              className="px-3 py-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-400 text-xs"
                            >
                              Xếp lại từ đầu
                            </button>

                            <button
                              disabled={comboStepOrderedWords.length === 0 || isAnswered}
                              onClick={handleSubmitComboWords}
                              className="px-4 py-2 rounded-xl bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 text-stone-950 font-bold text-xs shadow active:scale-95 transition"
                            >
                              Xuất Chiêu Phá Trận ⚔️
                            </button>
                          </div>
                        </div>
                      ) : (
                        /* Options fallback for non-unseal steps or multiple choice */
                        activeStep.options && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {activeStep.options.map((opt, oIdx) => (
                              <button
                                key={oIdx}
                                disabled={isAnswered}
                                onClick={() => handleComboStepSelectOption(opt)}
                                className="w-full p-2.5 rounded-xl border border-stone-700 hover:border-rose-400 bg-stone-800 text-left text-xs sm:text-sm font-semibold text-stone-100 transition"
                              >
                                {opt}
                              </button>
                            ))}
                          </div>
                        )
                      )}
                    </div>
                  );
                })()}
              </div>
            )}

            {/* ----------------- STANDARD MODE / FALLBACK ----------------- */}
            {currentMode === 'standard' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {currentQuestion.options.map((opt, idx) => (
                  <button
                    key={idx}
                    disabled={isAnswered}
                    onClick={() => handleSelectOption(opt)}
                    className="w-full p-2.5 sm:p-3 rounded-xl border text-left text-xs sm:text-sm font-semibold transition flex items-center justify-between bg-stone-800/90 border-stone-700 hover:border-amber-400 text-stone-100"
                  >
                    <span>{opt}</span>
                  </button>
                ))}
              </div>
            )}

            {/* Turn Feedback & Next Button */}
            {isAnswered && turnResult && (
              <div className="bg-stone-950 border border-stone-800 rounded-xl p-3 flex flex-col sm:flex-row items-center justify-between gap-2 animate-fadeIn">
                <div className="text-xs text-stone-300 flex-1">
                  <span
                    className={`font-bold mr-2 ${
                      turnResult.isCorrect ? 'text-emerald-400' : 'text-red-400'
                    }`}
                  >
                    {turnResult.feedbackText}
                  </span>
                  <span className="text-[11px] text-stone-400 italic block mt-0.5">
                    {currentQuestion.explanation}
                  </span>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  {!turnResult.isCorrect && (
                    <button
                      onClick={handleRetryCurrentQuestion}
                      className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-amber-300 border border-amber-600/40 font-bold text-xs shadow whitespace-nowrap active:scale-95 transition flex items-center gap-1.5"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Luyện Lại Chiêu Này</span>
                    </button>
                  )}

                  <button
                    onClick={handleNextQuestion}
                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-500 text-stone-950 font-bold text-xs shadow whitespace-nowrap active:scale-95 transition"
                  >
                    Kiếm Chiêu Tiếp Theo &gt;
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tactical Briefing Modal (Before Combat) */}
        {showBriefing && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-fadeIn">
            <div className="max-w-lg w-full bg-stone-900/95 border-2 border-amber-500/80 rounded-2xl p-5 sm:p-6 shadow-2xl flex flex-col gap-4">
              <div className="flex items-center justify-between border-b border-stone-800 pb-3">
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-bold px-2 py-0.5 rounded border ${modeBadge.color}`}>
                    {modeBadge.label}
                  </span>
                  {initialEnemy.difficulty && (
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                      initialEnemy.difficulty === 'hard'
                        ? 'bg-rose-950 text-rose-300 border border-rose-600/50'
                        : initialEnemy.difficulty === 'medium'
                        ? 'bg-amber-950 text-amber-300 border border-amber-600/50'
                        : 'bg-emerald-950 text-emerald-300 border border-emerald-600/50'
                    }`}>
                      {initialEnemy.difficulty}
                    </span>
                  )}
                </div>
                <div className="text-xs text-stone-400 font-mono">
                  Mục tiêu: {initialEnemy.name}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-16 h-16 rounded-xl bg-stone-950 border border-amber-600/40 p-1 flex items-center justify-center shrink-0">
                  <img
                    src={initialEnemy.spriteKey}
                    alt={initialEnemy.name}
                    className="w-full h-full object-contain filter drop-shadow"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/assets/game/characters/bosses/loan_ngu_kiem_ma.png';
                    }}
                  />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-amber-200 font-wuxia">
                    {initialEnemy.name}
                  </h3>
                  {initialEnemy.learningSkill && (
                    <p className="text-xs text-cyan-300 font-semibold mt-0.5 flex items-center gap-1">
                      <span>Võ học trọng tâm:</span>
                      <span className="text-stone-200 font-normal">{initialEnemy.learningSkill}</span>
                    </p>
                  )}
                </div>
              </div>

              {initialEnemy.tutorialBriefing && (
                <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-500/40 text-xs text-amber-100 leading-relaxed">
                  <div className="font-bold text-amber-400 mb-1 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Chiến Thuật Khắc Chế:</span>
                  </div>
                  <p>{initialEnemy.tutorialBriefing}</p>
                </div>
              )}

              {initialEnemy.winCondition && (
                <div className="p-2.5 rounded-lg bg-stone-950/80 border border-stone-800 text-xs text-stone-300 flex items-center justify-between">
                  <span className="text-stone-400">Điều kiện chiến thắng:</span>
                  <span className="font-bold text-emerald-400">{initialEnemy.winCondition}</span>
                </div>
              )}

              <button
                onClick={() => {
                  soundService.playHit();
                  setShowBriefing(false);
                  setStartTime(Date.now());
                }}
                className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-500 text-stone-950 font-bold text-sm shadow-lg active:scale-95 transition flex items-center justify-center gap-2"
              >
                <span>Vào Trận Quyết Đấu (Nhấn Space/Enter)</span>
              </button>
            </div>
          </div>
        )}

        {/* Victory Screen */}
        {combatOutcome === 'victory' && (
          <div className="absolute inset-0 z-40 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-fadeIn">
            <div className="max-w-md w-full bg-stone-900/95 border-2 border-amber-500 rounded-2xl p-6 shadow-2xl flex flex-col items-center text-center gap-4">
              <div className="w-16 h-16 rounded-full bg-amber-500/20 border-2 border-amber-400 flex items-center justify-center text-amber-300 shadow-wuxia-gold animate-wuxia-float">
                <Award className="w-8 h-8" />
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-600 font-wuxia">
                  Đại Thắng Quyết Đấu!
                </h3>
                <p className="text-xs text-stone-300 mt-1">
                  Đã tiêu diệt thành công <b>{initialEnemy.name}</b>. Khí thế ngút trời, võ công tăng tiến!
                </p>
              </div>

              {/* Weakness analysis summary if Boss / Triple Combo */}
              {currentQuestion.weaknessAnalysis && (
                <div className="w-full p-2.5 rounded-xl bg-amber-950/40 border border-amber-500/40 text-left text-xs text-amber-200">
                  <div className="font-bold flex items-center gap-1.5 mb-1 text-amber-300">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Tổng Kết Điểm Yếu & Yếu Quyết:</span>
                  </div>
                  <p className="text-[11px] text-stone-300 italic">{currentQuestion.weaknessAnalysis}</p>
                </div>
              )}

              <div className="w-full bg-stone-950/80 border border-stone-800 rounded-xl p-3 flex justify-around text-xs">
                <div>
                  <span className="text-stone-400 block">Điểm</span>
                  <span className="font-bold text-amber-300">+{initialEnemy.xpReward} XP</span>
                </div>
                {isBoss && (
                  <div>
                    <span className="text-stone-400 block">Chiến Lợi Phẩm</span>
                    <span className="font-bold text-emerald-400">Rương Cấm Địa</span>
                  </div>
                )}
              </div>

              <button
                onClick={handleClaimVictory}
                className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-500 text-stone-950 font-bold text-sm shadow-lg active:scale-95 transition"
              >
                Thu Nhận Chiến Lợi Phẩm
              </button>
            </div>
          </div>
        )}

        {/* Defeat Screen */}
        {combatOutcome === 'defeat' && (
          <div className="absolute inset-0 z-40 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-fadeIn">
            <div className="max-w-md w-full bg-stone-900/95 border-2 border-red-700 rounded-2xl p-6 shadow-2xl flex flex-col items-center text-center gap-4">
              <div className="w-16 h-16 rounded-full bg-red-950 border-2 border-red-500 flex items-center justify-center text-red-400">
                <X className="w-8 h-8" />
              </div>

              <div>
                <h3 className="text-2xl font-black text-red-400 font-wuxia">
                  Kiếm Thế Bị Bẻ Gãy!
                </h3>
                <p className="text-xs text-stone-300 mt-1">
                  Sinh lực đã cạn kiệt trước tà công của đối thủ. Hãy dưỡng sức và củng cố tri thức trước khi thử thách lại!
                </p>
              </div>

              {/* Targeted Pedagogical Remediation Card */}
              {remediationAdvice && (
                <div className="w-full p-3 rounded-xl bg-amber-950/40 border border-amber-500/50 text-left text-xs text-stone-200 flex flex-col gap-1.5 shadow-inner">
                  <div className="flex items-center gap-1.5 text-amber-300 font-bold">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>Chỉ Dẫn Ôn Tập Sư Môn:</span>
                  </div>
                  <p className="text-[11px] text-cyan-300">
                    <b>{remediationAdvice.actionPrompt}</b>
                  </p>
                  <p className="text-[11px] text-stone-300 italic">
                    💡 {remediationAdvice.pedagogicalAdvice}
                  </p>
                </div>
              )}

              <div className="flex gap-3 w-full">
                <button
                  onClick={handleRetry}
                  className="flex-1 py-3 px-4 rounded-xl bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs shadow flex items-center justify-center gap-1.5 active:scale-95 transition"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Quyết Đấu Lại</span>
                </button>
                <button
                  onClick={handleRetreat}
                  className="flex-1 py-3 px-4 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 font-bold text-xs border border-stone-600 active:scale-95 transition"
                >
                  Tạm Rút Lui
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default CombatOverlay;
