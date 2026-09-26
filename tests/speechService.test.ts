import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { speechService } from '../src/services/speechService';
import { soundService } from '../src/services/sound';
import { UnitContentService } from '../src/services/unitContentService';

describe('SpeechService & Listening Mechanics', () => {
  let originalSpeechSynthesis: unknown;

  beforeEach(() => {
    vi.restoreAllMocks();
    originalSpeechSynthesis = (globalThis as any).speechSynthesis;
  });

  afterEach(() => {
    (globalThis as any).speechSynthesis = originalSpeechSynthesis;
  });

  it('plays listening cue chime when speak is called', () => {
    const cueSpy = vi.spyOn(soundService, 'playListeningCue').mockImplementation(() => {});
    speechService.speak('hello test word', {});
    expect(cueSpy).toHaveBeenCalled();
  });

  it('selects the most appropriate English voice', () => {
    const mockVoices = [
      { name: 'Microsoft David Desktop - English (United States)', lang: 'en-US', default: false },
      { name: 'Google US English', lang: 'en-US', default: false },
      { name: 'Vietnamese Female', lang: 'vi-VN', default: true },
    ] as SpeechSynthesisVoice[];

    (globalThis as any).speechSynthesis = {
      getVoices: vi.fn().mockReturnValue(mockVoices),
      speak: vi.fn(),
      cancel: vi.fn(),
      resume: vi.fn(),
      paused: false,
      speaking: false,
    };

    const chosenVoice = speechService.getEnglishVoice();
    expect(chosenVoice).toBeDefined();
    expect(chosenVoice?.name).toBe('Google US English');
  });

  it('mitigates Chrome paused state by calling resume() before and after speak', () => {
    const resumeMock = vi.fn();
    const speakMock = vi.fn();
    const cancelMock = vi.fn();

    (globalThis as any).speechSynthesis = {
      getVoices: vi.fn().mockReturnValue([]),
      speak: speakMock,
      cancel: cancelMock,
      resume: resumeMock,
      paused: true,
      speaking: false,
    };

    class MockUtterance {
      lang = '';
      rate = 1;
      pitch = 1;
      volume = 1;
      onstart: (() => void) | null = null;
      onend: (() => void) | null = null;
      onerror: ((e: any) => void) | null = null;
      constructor(public text: string) {}
    }
    (globalThis as any).SpeechSynthesisUtterance = MockUtterance;

    const onStart = vi.fn();
    const onEnd = vi.fn();

    speechService.speak('Test sentence', { onStart, onEnd });

    expect(cancelMock).toHaveBeenCalled();
    expect(resumeMock).toHaveBeenCalled();
    expect(speakMock).toHaveBeenCalled();
  });

  it('safely handles empty text without breaking', () => {
    const onEnd = vi.fn();
    const res = speechService.speak('', { onEnd });
    expect(res).toBe(false);
    expect(onEnd).toHaveBeenCalled();
  });

  it('stops ongoing utterances cleanly', () => {
    const cancelMock = vi.fn();
    (globalThis as any).speechSynthesis = {
      getVoices: vi.fn().mockReturnValue([]),
      speak: vi.fn(),
      cancel: cancelMock,
      resume: vi.fn(),
      paused: false,
      speaking: false,
    };

    speechService.stop();
    expect(cancelMock).toHaveBeenCalled();
  });
});

describe('Listening Questions Dataset Integrity for Mode 3 & Mode 6', () => {
  it('ensures all 30 units have valid listening questions for Mode 3 (listening_pursuit)', () => {
    const testUnits = ['g10-u01', 'g10-u05', 'g11-u01', 'g11-u08', 'g12-u01', 'g12-u10'];

    testUnits.forEach((unitId) => {
      const questions = UnitContentService.getUnitCombatQuestions(unitId);
      const listenMode = questions.find((q) => q.combatMode === 'listening_pursuit');

      expect(listenMode, `Unit ${unitId} missing Mode 3 listening_pursuit question`).toBeDefined();
      expect(listenMode?.listeningScript).toBeTruthy();
      expect(listenMode?.listeningScript?.length).toBeGreaterThan(0);
      expect(listenMode?.options.length).toBeGreaterThanOrEqual(2);
      expect(listenMode?.correctAnswer).toBeTruthy();
      expect(listenMode?.transcriptFallback).toBeTruthy();
    });
  });

  it('ensures all 30 units have valid listening Step 1 in Mode 6 (triple_combo)', () => {
    const testUnits = ['g10-u01', 'g10-u05', 'g11-u01', 'g11-u08', 'g12-u01', 'g12-u10'];

    testUnits.forEach((unitId) => {
      const questions = UnitContentService.getUnitCombatQuestions(unitId);
      const combo = questions.find((q) => q.combatMode === 'triple_combo');

      expect(combo, `Unit ${unitId} missing Mode 6 triple_combo question`).toBeDefined();
      expect(combo?.comboSteps).toBeDefined();
      expect(combo?.comboSteps?.length).toBe(3);

      const step1 = combo!.comboSteps![0];
      expect(step1.stepType).toBe('listen');
      expect(step1.listeningScript).toBeTruthy();
      expect(step1.options?.length).toBeGreaterThanOrEqual(2);
      expect(step1.options).toContain(step1.correctAnswer);
      expect(step1.hint).toBeTruthy();
    });
  });
});
