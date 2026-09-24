import React, { useState, useEffect, useRef } from 'react';
import {
  PlayerProfile,
  CombatEnemy,
  CombatQuestion,
} from '../types/game';
import {
  MOB_SWORD_DISCIPLE_QUESTIONS,
  MOB_MIST_DEMON_QUESTIONS,
  BOSS_PHASE_1_QUESTIONS,
  BOSS_PHASE_2_QUESTIONS,
} from '../data/demoLearningData';
import { soundService } from '../services/sound';
import { CombatEngine, CombatTurnResult } from '../services/combatEngine';
import { MasteryEngine } from '../services/masteryEngine';
import { Timer, Zap, Flame, Shield, X, RotateCcw, Award } from 'lucide-react';

interface CombatOverlayProps {
  profile: PlayerProfile;
  enemyType: 'sword_disciple' | 'mist_demon' | 'boss_disorder';
  onCombatVictory: (enemy: CombatEnemy, isBossPhase2Defeated: boolean, remainingPlayerHp: number) => void;
  onPlayerTakeDamage: (damage: number) => void;
  onSyncHp: (hp: number) => void;
  onAnswerKnowledge?: (knowledgeItemIds: string[], isCorrect: boolean, responseTimeSec: number) => void;
  onClose: () => void;
}

export const CombatOverlay: React.FC<CombatOverlayProps> = ({
  profile,
  enemyType,
  onCombatVictory,
  onPlayerTakeDamage,
  onSyncHp,
  onAnswerKnowledge,
  onClose,
}) => {
  // Xác định cấu hình kẻ địch ban đầu
  const isBoss = enemyType === 'boss_disorder';

  const [bossPhase, setBossPhase] = useState<number>(1);
  const [isPhaseTransitioning, setIsPhaseTransitioning] = useState<boolean>(false);

  const initialEnemy = useRef<CombatEnemy>(
    isBoss
      ? {
          id: 'boss_disorder',
          name: 'Loạn Ngữ Kiếm Ma',
          title: 'Ma Đầu Trấn Giữ Cấm Địa',
          spriteKey: '/assets/game/characters/bosses/loan_ngu_kiem_ma.png',
          hp: 280,
          maxHp: 280,
          attack: 28,
          defense: 10,
          xpReward: 350,
          isBoss: true,
          bossPhase: 1,
        }
      : enemyType === 'sword_disciple'
      ? {
          id: 'sword_disciple',
          name: 'Ma Giáo Kiếm Đồ',
          title: 'Đệ tử tiền trạm',
          spriteKey: '/assets/game/characters/enemies/sword_disciple.png',
          hp: 120,
          maxHp: 120,
          attack: 16,
          defense: 6,
          xpReward: 80,
        }
      : {
          id: 'mist_demon',
          name: 'Hắc Khí Yêu Ma',
          title: 'Yêu vật tà phái',
          spriteKey: '/assets/game/characters/enemies/mist_demon.png',
          hp: 160,
          maxHp: 160,
          attack: 22,
          defense: 8,
          xpReward: 120,
        }
  ).current;

  const [enemyHp, setEnemyHp] = useState<number>(initialEnemy.hp);
  const [enemyMaxHp, setEnemyMaxHp] = useState<number>(initialEnemy.maxHp);
  const [playerHp, setPlayerHp] = useState<number>(profile.stats.hp);

  // Danh sách câu hỏi thích ứng theo đối thủ và điểm yếu của người chơi
  const questionPool = useRef<CombatQuestion[]>(
    MasteryEngine.selectAdaptiveQuestions(
      isBoss
        ? BOSS_PHASE_1_QUESTIONS
        : enemyType === 'sword_disciple'
        ? MOB_SWORD_DISCIPLE_QUESTIONS
        : MOB_MIST_DEMON_QUESTIONS,
      profile.knowledgeMastery || {},
      10
    )
  );

  const [questionIdx, setQuestionIdx] = useState<number>(0);
  const currentQuestion = questionPool.current[questionIdx % questionPool.current.length];

  // Combat State
  const [timeLeft, setTimeLeft] = useState<number>(currentQuestion.timeLimit);
  const [startTime, setStartTime] = useState<number>(Date.now());
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [turnResult, setTurnResult] = useState<CombatTurnResult | null>(null);
  const [combo, setCombo] = useState<number>(0);

  // Visual Effects
  const [vfxSpark, setVfxSpark] = useState<'critical' | 'hit' | null>(null);
  const [shakeScreen, setShakeScreen] = useState<boolean>(false);
  const [playerFlashRed, setPlayerFlashRed] = useState<boolean>(false);
  const [enemyFlashRed, setEnemyFlashRed] = useState<boolean>(false);
  const [floatingDamage, setFloatingDamage] = useState<{ text: string; isCrit: boolean; isPlayer: boolean } | null>(null);

  // Game End State
  const [combatOutcome, setCombatOutcome] = useState<'victory' | 'defeat' | null>(null);

  // Timer Countdown
  useEffect(() => {
    if (isAnswered || combatOutcome || isPhaseTransitioning) return;

    if (timeLeft <= 0) {
      handleTimeout();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isAnswered, combatOutcome, isPhaseTransitioning]);

  const handleTimeout = () => {
    processAnswerResult(false, currentQuestion.timeLimit, null);
  };

  const handleSelectOption = (opt: string) => {
    if (isAnswered || combatOutcome || isPhaseTransitioning) return;

    const responseTimeSec = Math.max(0.2, (Date.now() - startTime) / 1000);
    setSelectedOption(opt);

    const isCorrect = opt === currentQuestion.correctAnswer;
    processAnswerResult(isCorrect, responseTimeSec, opt);
  };

  const processAnswerResult = (isCorrect: boolean, responseTimeSec: number, selected: string | null) => {
    setIsAnswered(true);

    if (onAnswerKnowledge && currentQuestion.knowledgeItemIds) {
      onAnswerKnowledge(currentQuestion.knowledgeItemIds, isCorrect, responseTimeSec);
    }

    const result = CombatEngine.processTurn(
      isCorrect,
      responseTimeSec,
      combo,
      profile.stats,
      profile.equipment,
      { ...initialEnemy, hp: enemyHp, maxHp: enemyMaxHp }
    );

    setTurnResult(result);
    setCombo(result.comboCount);

    if (result.isCorrect) {
      // Đòn đánh trúng địch
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

      const nextEnemyHp = Math.max(0, enemyHp - result.damageToEnemy);
      setEnemyHp(nextEnemyHp);
      setFloatingDamage({
        text: `-${result.damageToEnemy} ${result.isCritical ? 'CRITICAL!' : ''}`,
        isCrit: result.isCritical,
        isPlayer: false,
      });

      // Kiểm tra địch chết
      if (nextEnemyHp <= 0) {
        if (isBoss && bossPhase === 1) {
          // Boss chuyển dạng Phase 2!
          handleBossPhaseTransition();
          return;
        } else {
          // Kết thúc trận chiến thắng!
          setTimeout(() => {
            soundService.playVictory();
            setCombatOutcome('victory');
          }, 600);
          return;
        }
      }
    } else {
      // Địch đánh người chơi
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

      // Kiểm tra người chơi thua
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

  // Chuyển sang Phase 2 của Boss
  const handleBossPhaseTransition = () => {
    setIsPhaseTransitioning(true);
    soundService.playGong();

    setTimeout(() => {
      setBossPhase(2);
      setEnemyMaxHp(340);
      setEnemyHp(340);
      questionPool.current = MasteryEngine.selectAdaptiveQuestions(
        BOSS_PHASE_2_QUESTIONS,
        profile.knowledgeMastery || {},
        10
      );
      setQuestionIdx(0);
      setIsPhaseTransitioning(false);
      setIsAnswered(false);
      setSelectedOption(null);
      setTurnResult(null);
      setTimeLeft(7); // Rút ngắn còn 7s ở Phase 2
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

    const nextIdx = questionIdx + 1;
    setQuestionIdx(nextIdx);
    const nextQ = questionPool.current[nextIdx % questionPool.current.length];
    setTimeLeft(bossPhase === 2 ? 7 : nextQ.timeLimit);
    setStartTime(Date.now());
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
    // Phục hồi đầy đủ sinh lực để tái đấu và đồng bộ vào profile
    onSyncHp(profile.stats.maxHp);
    setPlayerHp(profile.stats.maxHp);
    setEnemyHp(initialEnemy.hp);
    setBossPhase(1);
    questionPool.current = isBoss
      ? [...BOSS_PHASE_1_QUESTIONS]
      : enemyType === 'sword_disciple'
      ? [...MOB_SWORD_DISCIPLE_QUESTIONS]
      : [...MOB_MIST_DEMON_QUESTIONS];
    setQuestionIdx(0);
    setCombatOutcome(null);
    setIsAnswered(false);
    setSelectedOption(null);
    setTurnResult(null);
    setCombo(0);
    setTimeLeft(questionPool.current[0].timeLimit);
    setStartTime(Date.now());
  };

  const enemyHpPercent = Math.min(100, Math.max(0, (enemyHp / enemyMaxHp) * 100));
  const playerHpPercent = Math.min(100, Math.max(0, (playerHp / profile.stats.maxHp) * 100));

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
        {/* Top Header: Combat Info & Close */}
        <div className="flex items-center justify-between px-2 pt-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/40">
              DEMO COMBAT
            </span>
            {isBoss && (
              <span
                className={`text-xs font-extrabold px-2.5 py-0.5 rounded border ${
                  bossPhase === 2
                    ? 'bg-red-950/90 border-red-500 text-red-300 animate-pulse'
                    : 'bg-amber-950/90 border-amber-500 text-amber-300'
                }`}
              >
                BOSS PHASE {bossPhase}: {bossPhase === 2 ? 'CUỒNG NỘ MA KIẾM' : 'MA KIẾM LOẠN NGỮ'}
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
            {/* HP Bar */}
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

            {/* Sprite */}
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
            {/* Enemy HP Bar */}
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

            {/* Sprite */}
            <div
              className={`relative transition duration-200 ${
                enemyFlashRed ? 'filter drop-shadow-[0_0_20px_rgba(255,0,0,0.9)] scale-95' : ''
              } ${bossPhase === 2 ? 'filter drop-shadow-[0_0_25px_rgba(255,50,50,0.8)]' : ''}`}
            >
              <img
                src={initialEnemy.spriteKey}
                alt={initialEnemy.name}
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
              <div className="text-red-500 text-sm font-extrabold tracking-widest uppercase animate-pulse">
                CẢNH BÁO: HẮC KHÍ BÙNG NỔ!
              </div>
              <h3 className="text-2xl sm:text-4xl font-black text-red-400 font-wuxia drop-shadow-md">
                "Khá khen tiểu bối! Hãy nếm thử Cuồng Nộ Ma Kiếm!"
              </h3>
              <p className="text-stone-300 text-sm italic">
                Loạn Ngữ Kiếm Ma tiến vào Phase 2: Thời gian thi triển chiêu thức chỉ còn 7 giây!
              </p>
            </div>
          </div>
        )}

        {/* Bottom Question & Controls Area */}
        {!combatOutcome && !isPhaseTransitioning && (
          <div className="bg-stone-900/95 border-t-2 border-amber-600/70 rounded-t-2xl p-3 sm:p-5 shadow-2xl flex flex-col gap-3">
            {/* Timer bar & Critical Strike Window Indicator */}
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-1.5 text-xs text-amber-400 font-bold">
                <Timer className="w-4 h-4 text-amber-400" />
                <span>Thời gian: {timeLeft}s</span>
                <span className="text-[10px] text-stone-400 ml-2 hidden sm:inline">
                  (Trả lời &lt; 3s = Bạo Kích 1.8x sát thương!)
                </span>
              </div>

              {/* Visual Timer Progress */}
              <div className="flex-1 max-w-xs h-2 bg-stone-950 rounded-full overflow-hidden border border-stone-700">
                <div
                  className={`h-full transition-all duration-300 ${
                    timeLeft <= 3
                      ? 'bg-red-500'
                      : timeLeft <= 6
                      ? 'bg-yellow-500'
                      : 'bg-emerald-500'
                  }`}
                  style={{
                    width: `${(timeLeft / (bossPhase === 2 ? 7 : currentQuestion.timeLimit)) * 100}%`,
                  }}
                />
              </div>
            </div>

            {/* Question Prompt */}
            <div className="bg-stone-950/90 border border-stone-800 rounded-xl p-3 sm:p-4">
              <p className="text-sm sm:text-base font-bold text-amber-100">
                {currentQuestion.prompt}
              </p>
            </div>

            {/* Options Grid (4 Buttons) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {currentQuestion.options.map((opt, idx) => {
                let btnStyle =
                  'bg-stone-800/90 border-stone-700 hover:border-amber-400 hover:bg-stone-800 text-stone-100';
                if (isAnswered) {
                  if (opt === currentQuestion.correctAnswer) {
                    btnStyle =
                      'bg-emerald-950 border-emerald-400 text-emerald-200 shadow-wuxia-jade font-bold';
                  } else if (selectedOption === opt) {
                    btnStyle = 'bg-red-950 border-red-500 text-red-200';
                  } else {
                    btnStyle = 'bg-stone-900/60 border-stone-800 text-stone-500 opacity-50';
                  }
                }

                return (
                  <button
                    key={idx}
                    disabled={isAnswered}
                    onClick={() => handleSelectOption(opt)}
                    className={`w-full p-2.5 sm:p-3 rounded-xl border text-left text-xs sm:text-sm font-semibold transition flex items-center justify-between active:scale-98 ${btnStyle}`}
                  >
                    <span>{opt}</span>
                    {isAnswered && opt === currentQuestion.correctAnswer && (
                      <span className="text-xs text-emerald-400 font-bold">✓ Đúng</span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Turn Feedback & Next Button */}
            {isAnswered && turnResult && (
              <div className="bg-stone-950 border border-stone-800 rounded-xl p-3 flex flex-col sm:flex-row items-center justify-between gap-2 animate-fadeIn">
                <div className="text-xs text-stone-300">
                  <span
                    className={`font-bold mr-2 ${
                      turnResult.isCorrect ? 'text-emerald-400' : 'text-red-400'
                    }`}
                  >
                    {turnResult.feedbackText}
                  </span>
                  <span className="text-[11px] text-stone-400 italic">
                    {currentQuestion.explanation}
                  </span>
                </div>

                <button
                  onClick={handleNextQuestion}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-500 text-stone-950 font-bold text-xs tracking-wider shadow whitespace-nowrap active:scale-95 transition"
                >
                  Kiếm Chiêu Tiếp Theo &gt;
                </button>
              </div>
            )}
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
                  ĐẠI THẮNG QUYẾT ĐẤU!
                </h3>
                <p className="text-xs text-stone-300 mt-1">
                  Đã tiêu diệt thành công <b>{initialEnemy.name}</b>. Khí thế ngút trời, võ công tăng tiến!
                </p>
              </div>

              <div className="w-full bg-stone-950/80 border border-stone-800 rounded-xl p-3 flex justify-around text-xs">
                <div>
                  <span className="text-stone-400 block">Tu Vi (XP)</span>
                  <span className="font-bold text-amber-300">+{initialEnemy.xpReward} XP</span>
                </div>
                {isBoss && (
                  <div>
                    <span className="text-stone-400 block">Chiến Lợi Phẩm</span>
                    <span className="font-bold text-emerald-400">Rương Ma Giáo</span>
                  </div>
                )}
              </div>

              <button
                onClick={handleClaimVictory}
                className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-500 text-stone-950 font-bold text-sm tracking-wider shadow-lg active:scale-95 transition"
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
                  KIẾM THẾ BỊ BẺ GÃY!
                </h3>
                <p className="text-xs text-stone-300 mt-1">
                  Sinh lực đã cạn kiệt trước tà công của đối thủ. Hãy dưỡng sức và thử thách lại một lần nữa!
                </p>
              </div>

              <div className="flex gap-3 w-full">
                <button
                  onClick={handleRetry}
                  className="flex-1 py-3 px-4 rounded-xl bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs tracking-wider shadow flex items-center justify-center gap-1.5 active:scale-95 transition"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Quyết Đấu Lại</span>
                </button>
                <button
                  onClick={handleRetreat}
                  className="flex-1 py-3 px-4 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 font-bold text-xs tracking-wider border border-stone-600 active:scale-95 transition"
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
