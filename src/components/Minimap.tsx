import React, { useState, useEffect, useRef } from 'react';
import { PlayerProfile, Quest } from '../types/game';
import { getLevelConfig } from '../game/levels/levelConfig';
import { eventBus } from '../game/EventBus';
import { soundService } from '../services/sound';
import {
  Compass,
  MapPin,
  Maximize2,
  Minimize2,
  ChevronDown,
  ChevronUp,
  Shield,
  Award,
  Sparkles,
  Target,
} from 'lucide-react';

interface MinimapProps {
  profile: PlayerProfile;
  currentQuest?: Quest;
  onOpenQuestModal: () => void;
}

export const Minimap: React.FC<MinimapProps> = ({
  profile,
  currentQuest,
  onOpenQuestModal,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(() => typeof window !== 'undefined' && window.innerWidth < 768);
  const [playerPos, setPlayerPos] = useState<{ x: number; y: number }>({ x: 550, y: 560 });

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const currentUnitId = profile.selectedUnitId || 'g10-u01';
  const levelConfig = getLevelConfig(currentUnitId);

  // Listen for player movement from WorldScene
  useEffect(() => {
    const handlePlayerMoved = (data: { x: number; y: number }) => {
      setPlayerPos(data);
    };

    eventBus.on('playerMoved', handlePlayerMoved);
    return () => {
      eventBus.off('playerMoved', handlePlayerMoved);
    };
  }, []);

  // Keyboard shortcut: 'M' toggles Minimap
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      if (e.key === 'm' || e.key === 'M') {
        e.preventDefault();
        soundService.playClick();
        setIsExpanded((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Draw the 2D Minimap Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const mapW = levelConfig.mapWidth || 3200;
    const mapH = levelConfig.mapHeight || 2000;
    const cvsW = canvas.width;
    const cvsH = canvas.height;

    const scaleX = cvsW / mapW;
    const scaleY = cvsH / mapH;

    // 1. Clear background terrain
    const grade = levelConfig.grade || 10;
    const bgColor =
      grade === 12 ? '#101018' : grade === 11 ? '#181210' : '#0e1713';
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, cvsW, cvsH);

    // 2. Draw roads, avenues and plazas
    ctx.fillStyle = 'rgba(78, 68, 60, 0.75)';

    // Main Avenue
    ctx.fillRect(
      (1600 - 1200) * scaleX,
      (680 - 90) * scaleY,
      2400 * scaleX,
      180 * scaleY
    );

    // Grand South Avenue
    ctx.fillRect(
      (1600 - 140) * scaleX,
      (1180 - 420) * scaleY,
      280 * scaleX,
      840 * scaleY
    );

    // Plazas
    // Sơn Môn & Tàng Kinh Các
    ctx.fillRect((700 - 550) * scaleX, (520 - 250) * scaleY, 1100 * scaleX, 500 * scaleY);
    // Phong Ấn
    ctx.fillRect((1850 - 325) * scaleX, (520 - 250) * scaleY, 650 * scaleX, 500 * scaleY);
    // Võ Luyện Đài
    ctx.fillRect((2550 - 260) * scaleX, (780 - 210) * scaleY, 520 * scaleX, 420 * scaleY);
    // Minh Triết Các
    ctx.fillRect((750 - 260) * scaleX, (1280 - 210) * scaleY, 520 * scaleX, 420 * scaleY);
    // Cấm Địa Plaza
    ctx.fillRect((1600 - 475) * scaleX, (1720 - 260) * scaleY, 950 * scaleX, 520 * scaleY);

    // Exploration Branch A (Minh Triết Trail & Loop)
    ctx.fillStyle = 'rgba(68, 60, 52, 0.6)';
    ctx.fillRect((800 - 80) * scaleX, 680 * scaleY, 160 * scaleX, 500 * scaleY);
    ctx.fillRect(750 * scaleX, (1380 - 50) * scaleY, 550 * scaleX, 100 * scaleY);

    // Exploration Branch B (Trúc Lâm Trail & Loop)
    ctx.fillRect((2450 - 80) * scaleX, 780 * scaleY, 160 * scaleX, 550 * scaleY);
    ctx.fillRect((1740) * scaleX, (1330 - 50) * scaleY, 710 * scaleX, 100 * scaleY);

    // 3. Danger Patrol Corridors (soft red tint)
    ctx.fillStyle = 'rgba(239, 68, 68, 0.15)';
    ctx.fillRect(950 * scaleX, 950 * scaleY, 1400 * scaleX, 140 * scaleY);
    ctx.fillRect(1000 * scaleX, 1350 * scaleY, 450 * scaleX, 180 * scaleY);
    ctx.fillRect(1750 * scaleX, 1350 * scaleY, 500 * scaleX, 180 * scaleY);

    // 4. Safe Spawn Haven (Green circle at Sơn Môn)
    ctx.strokeStyle = 'rgba(16, 185, 129, 0.6)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(550 * scaleX, 560 * scaleY, 180 * scaleX, 0, Math.PI * 2);
    ctx.stroke();

    // 5. Props (active discovery items as emerald diamonds)
    levelConfig.props.forEach((prop) => {
      if (prop.category === 'decoration') return;
      const px = prop.x * scaleX;
      const py = prop.y * scaleY;
      ctx.fillStyle = '#10b981';
      ctx.beginPath();
      ctx.moveTo(px, py - 3.5);
      ctx.lineTo(px + 3.5, py);
      ctx.lineTo(px, py + 3.5);
      ctx.lineTo(px - 3.5, py);
      ctx.closePath();
      ctx.fill();
    });

    // 6. NPCs markers
    levelConfig.npcs.forEach((npc) => {
      const nx = npc.x * scaleX;
      const ny = npc.y * scaleY;
      let dotColor = '#fbbf24';
      if (npc.id === 'ho_phap_phuong_tu') dotColor = '#10b981';
      if (npc.id === 'ho_phap_dang_tran_ha') dotColor = '#3b82f6';
      if (npc.id === 'ho_phap_hoang_van') dotColor = '#f59e0b';
      if (npc.id === 'ho_phap_nguyet_nguyen') dotColor = '#06b6d4';

      ctx.fillStyle = dotColor;
      ctx.beginPath();
      ctx.arc(nx, ny, 3.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 1;
      ctx.stroke();
    });

    // 7. Climax Gate / Boss Icon
    const cx = 1600 * scaleX;
    const cy = 1720 * scaleY;
    const isUnlocked = profile.unitProgress >= 70;
    ctx.fillStyle = isUnlocked ? '#10b981' : '#ef4444';
    ctx.beginPath();
    ctx.arc(cx, cy, 4.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = isUnlocked ? '#34d399' : '#b91c1c';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // 8. Real-time Player Position (pulsing gold ring)
    const plX = playerPos.x * scaleX;
    const plY = playerPos.y * scaleY;

    ctx.fillStyle = '#fde047';
    ctx.beginPath();
    ctx.arc(plX, plY, 4, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = 'rgba(253, 224, 71, 0.8)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(plX, plY, 7, 0, Math.PI * 2);
    ctx.stroke();
  }, [playerPos, levelConfig, isExpanded, profile.unitProgress]);

  // Compute distance and direction to active quest objective target
  const getNextWaypointHint = () => {
    if (!currentQuest) return { targetName: 'Sơn Môn', distance: 0, dir: '' };

    let targetX = 550;
    let targetY = 560;
    let targetName = 'Sơn Môn (Bang Chủ)';

    if (currentQuest.step === 2) {
      targetX = 920;
      targetY = 560;
      targetName = 'Tàng Kinh Các (Cô Phương Tú)';
    } else if (currentQuest.step === 3) {
      targetX = 1850;
      targetY = 560;
      targetName = 'Phong Ấn Thạch Trận (Thầy Đặng Trần Hà)';
    } else if (currentQuest.step === 4) {
      targetX = 1600;
      targetY = 1000;
      targetName = 'Dã Ngoại Trúc Lâm (Trảm Ma)';
    } else if (currentQuest.step === 5) {
      targetX = 1600;
      targetY = 1720;
      targetName = 'Ma Giáo Cấm Địa (Quyết Chiến)';
    }

    const dx = targetX - playerPos.x;
    const dy = targetY - playerPos.y;
    const dist = Math.round(Math.hypot(dx, dy));

    let dir = '';
    if (Math.abs(dy) > 100) dir += dy > 0 ? 'Nam ' : 'Bắc ';
    if (Math.abs(dx) > 100) dir += dx > 0 ? 'Đông' : 'Tây';
    if (!dir) dir = 'Gần kề';

    return { targetName, distance: dist, dir: dir.trim() };
  };

  const waypoint = getNextWaypointHint();

  return (
    <div className="absolute top-28 sm:top-36 right-2 sm:right-4 z-40 flex flex-col items-end gap-1.5 pointer-events-none select-none">
      {/* Floating Toggle Pill */}
      <div className="pointer-events-auto flex items-center gap-1.5">
        <button
          onClick={() => {
            soundService.playClick();
            setIsCollapsed(!isCollapsed);
          }}
          className="px-2.5 py-1 rounded-xl bg-stone-900/90 hover:bg-stone-800 border border-amber-600/50 text-amber-300 text-[11px] font-bold shadow-lg backdrop-blur-md flex items-center gap-1 active:scale-95 transition"
        >
          <Compass className="w-3.5 h-3.5 text-amber-400" />
          <span>{isCollapsed ? 'Mở Bản Đồ [M]' : 'Bản Đồ'}</span>
          {isCollapsed ? <ChevronDown className="w-3 h-3" /> : <ChevronUp className="w-3 h-3" />}
        </button>

        {!isCollapsed && (
          <button
            onClick={() => {
              soundService.playClick();
              setIsExpanded(!isExpanded);
            }}
            className="p-1.5 rounded-xl bg-stone-900/90 hover:bg-stone-800 border border-amber-600/50 text-stone-300 hover:text-amber-300 shadow-lg backdrop-blur-md active:scale-95 transition"
            title={isExpanded ? 'Thu nhỏ bản đồ' : 'Phóng to bản đồ'}
          >
            {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
        )}
      </div>

      {/* Main Minimap Canvas Box */}
      {!isCollapsed && (
        <div
          className={`pointer-events-auto bg-stone-950/95 border-2 border-amber-600/70 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-md transition-all duration-300 flex flex-col ${
            isExpanded ? 'w-80 sm:w-96' : 'w-48 sm:w-56'
          }`}
        >
          {/* Header */}
          <div className="px-2.5 py-1.5 bg-stone-900/90 border-b border-stone-800 flex items-center justify-between text-[11px] font-bold text-amber-200">
            <span className="truncate max-w-[150px] sm:max-w-[200px]">
              {levelConfig.title || 'Bản Đồ Giang Hồ'}
            </span>
            <span className="text-[10px] text-stone-400 font-mono">
              ({playerPos.x}, {playerPos.y})
            </span>
          </div>

          {/* Canvas Rendering Area */}
          <div className="relative bg-stone-950 flex items-center justify-center p-1">
            <canvas
              ref={canvasRef}
              width={isExpanded ? 360 : 210}
              height={isExpanded ? 225 : 131}
              className="rounded-lg border border-stone-800 w-full object-contain"
            />

            {/* Quick Legend Overlay (when expanded) */}
            {isExpanded && (
              <div className="absolute bottom-2 left-2 bg-stone-950/85 border border-stone-800 rounded-md p-1 text-[9px] text-stone-300 flex flex-wrap gap-2 pointer-events-none">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" /> Hộ Pháp
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-amber-400" /> Cọc/Võ Đài
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-red-500" /> Cấm Địa
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-yellow-300 animate-ping" /> Bạn
                </span>
              </div>
            )}
          </div>

          {/* Compact Objective & Waypoint Navigation Guide */}
          <div
            onClick={onOpenQuestModal}
            className="p-2 bg-stone-900/95 hover:bg-stone-850 border-t border-stone-800 cursor-pointer transition group"
          >
            <div className="flex items-center justify-between text-[10px] text-amber-400 font-bold mb-0.5">
              <span className="flex items-center gap-1">
                <Target className="w-3 h-3 text-amber-400 shrink-0" />
                <span>{currentQuest ? `Mục tiêu #${currentQuest.step}` : 'Tự do hành tẩu'}</span>
              </span>
              <span className="text-stone-400 group-hover:text-amber-300">Chi tiết &gt;</span>
            </div>

            <div className="text-[11px] font-bold text-stone-200 line-clamp-1 group-hover:text-amber-200">
              {currentQuest?.title || 'Khám phá giang hồ và rèn luyện'}
            </div>

            {/* Direction & Distance Hint */}
            <div className="flex items-center justify-between text-[10px] text-cyan-300 mt-1">
              <span className="flex items-center gap-1 truncate max-w-[140px]">
                <MapPin className="w-3 h-3 text-cyan-400 shrink-0" />
                <span className="truncate">{waypoint.targetName}</span>
              </span>
              <span className="font-mono text-stone-300 font-bold shrink-0">
                {waypoint.distance}px ({waypoint.dir})
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Minimap;
