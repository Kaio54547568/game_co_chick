import React, { useState, useRef } from 'react';
import { eventBus } from '../game/EventBus';

export const VirtualJoystickUI: React.FC = () => {
  const [knobPos, setKnobPos] = useState({ x: 0, y: 0 });
  const baseRef = useRef<HTMLDivElement>(null);
  const touchIdRef = useRef<number | null>(null);

  const maxRadius = 45;

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.changedTouches[0];
    touchIdRef.current = touch.identifier;
    updateVector(touch.clientX, touch.clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchIdRef.current === null) return;
    for (let i = 0; i < e.changedTouches.length; i++) {
      if (e.changedTouches[i].identifier === touchIdRef.current) {
        updateVector(e.changedTouches[i].clientX, e.changedTouches[i].clientY);
        break;
      }
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    for (let i = 0; i < e.changedTouches.length; i++) {
      if (e.changedTouches[i].identifier === touchIdRef.current) {
        setKnobPos({ x: 0, y: 0 });
        touchIdRef.current = null;
        eventBus.emit('setJoystick', { x: 0, y: 0 });
        break;
      }
    }
  };

  const updateVector = (clientX: number, clientY: number) => {
    if (!baseRef.current) return;
    const rect = baseRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const dx = clientX - centerX;
    const dy = clientY - centerY;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist <= maxRadius) {
      setKnobPos({ x: dx, y: dy });
      eventBus.emit('setJoystick', { x: dx / maxRadius, y: dy / maxRadius });
    } else {
      const angle = Math.atan2(dy, dx);
      const clampedX = Math.cos(angle) * maxRadius;
      const clampedY = Math.sin(angle) * maxRadius;
      setKnobPos({ x: clampedX, y: clampedY });
      eventBus.emit('setJoystick', { x: Math.cos(angle), y: Math.sin(angle) });
    }
  };

  return (
    <div className="game-joystick absolute z-40">
      {/* Joystick Base */}
      <div
        ref={baseRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
        className="relative h-28 w-28 rounded-full bg-stone-900/60 border-2 border-amber-300/35 backdrop-blur-sm flex items-center justify-center touch-none select-none"
      >
        <img
          src="/assets/game/ui/controls/joystick_base.png"
          alt="Base"
          className="w-full h-full object-contain opacity-50 pointer-events-none"
        />
        {/* Joystick Knob */}
        <div
          className="absolute w-14 h-14 rounded-full bg-amber-500/80 border border-amber-300 shadow-wuxia-gold flex items-center justify-center transition-transform duration-75 pointer-events-none"
          style={{
            transform: `translate(${knobPos.x}px, ${knobPos.y}px)`,
          }}
        >
          <img
            src="/assets/game/ui/controls/joystick_knob.png"
            alt="Knob"
            className="w-8 h-8 object-contain"
          />
        </div>
      </div>
    </div>
  );
};
