import { soundService } from './sound';

export interface SpeechOptions {
  lang?: string;
  rate?: number;
  pitch?: number;
  volume?: number;
  onStart?: () => void;
  onEnd?: () => void;
  onError?: (err?: unknown) => void;
}

function getGlobal(): any {
  if (typeof window !== 'undefined') return window;
  if (typeof globalThis !== 'undefined') return globalThis;
  return {};
}

/**
 * SpeechService provides high-reliability Text-to-Speech playback across browsers,
 * actively mitigating known Chromium and Windows bugs (GC collection of utterance,
 * stuck paused state, missing default voices, and unhandled async queue drops).
 */
class SpeechService {
  private voices: SpeechSynthesisVoice[] = [];
  private activeUtterances: Set<SpeechSynthesisUtterance> = new Set();
  private watchdogTimer: ReturnType<typeof setTimeout> | null = null;
  private isInitialized = false;

  constructor() {
    this.setupListeners();
  }

  private setupListeners() {
    const g = getGlobal();
    if (g && g.speechSynthesis) {
      this.refreshVoices();
      try {
        if (g.speechSynthesis.onvoiceschanged !== undefined) {
          g.speechSynthesis.onvoiceschanged = () => {
            this.refreshVoices();
          };
        }
      } catch {
        // Ignored in restricted environments
      }
    }
  }

  private refreshVoices() {
    const g = getGlobal();
    if (!g || !g.speechSynthesis) return;
    try {
      const available = g.speechSynthesis.getVoices();
      if (available && available.length > 0) {
        this.voices = available;
        this.isInitialized = true;
      }
    } catch {
      // Ignored
    }
  }

  public isSupported(): boolean {
    const g = getGlobal();
    return Boolean(g && g.speechSynthesis);
  }

  public getVoices(): SpeechSynthesisVoice[] {
    const g = getGlobal();
    if (!g || !g.speechSynthesis) return [];
    try {
      const latest = g.speechSynthesis.getVoices();
      if (latest && latest.length > 0) {
        this.voices = latest;
        this.isInitialized = true;
      }
    } catch {
      // Ignored
    }
    return this.voices;
  }

  /**
   * Find the optimal natural English voice available in the environment.
   */
  public getEnglishVoice(): SpeechSynthesisVoice | null {
    const list = this.getVoices();
    if (!list || list.length === 0) return null;

    // Prioritized list of high quality English voices (Edge / Windows / Chrome / Safari)
    const priorityKeywords = [
      'google us english',
      'microsoft jenny',
      'microsoft guy',
      'microsoft aria',
      'microsoft zira',
      'microsoft david',
      'samantha',
      'alex',
      'en-us',
      'en_us',
    ];

    for (const kw of priorityKeywords) {
      const match = list.find((v) =>
        v.name?.toLowerCase().includes(kw) || v.lang?.toLowerCase().includes(kw)
      );
      if (match) return match;
    }

    // Any English voice
    const anyEn = list.find((v) => v.lang?.toLowerCase().startsWith('en'));
    if (anyEn) return anyEn;

    // Default system voice
    return list.find((v) => v.default) || list[0] || null;
  }

  /**
   * Speak a text string with immediate acoustic chime, voice fallback,
   * unpausing, and memory retention to avoid garbage collection aborts.
   */
  public speak(text: string, options: SpeechOptions = {}): boolean {
    if (!text || text.trim() === '') {
      options.onEnd?.();
      return false;
    }

    // Play crisp wuxia chime for immediate auditory feedback
    soundService.playListeningCue();

    if (!this.isSupported()) {
      options.onStart?.();
      const fakeDuration = Math.min(2500, Math.max(1000, text.split(' ').length * 300));
      setTimeout(() => {
        options.onEnd?.();
      }, fakeDuration);
      return false;
    }

    const g = getGlobal();
    const synth: SpeechSynthesis = g.speechSynthesis;

    try {
      // Clear any prior watchdog timer
      if (this.watchdogTimer) {
        clearTimeout(this.watchdogTimer);
        this.watchdogTimer = null;
      }

      // Chromium bugfix: un-pause if stuck in paused state
      if (synth.paused && typeof synth.resume === 'function') {
        synth.resume();
      }

      // Cancel previous utterance cleanly
      if (typeof synth.cancel === 'function') {
        synth.cancel();
      }
      if (typeof synth.resume === 'function') {
        synth.resume();
      }

      const UtteranceClass = g.SpeechSynthesisUtterance || SpeechSynthesisUtterance;
      const utterance = new UtteranceClass(text.trim());
      utterance.lang = options.lang || 'en-US';
      utterance.rate = options.rate ?? 0.88;
      utterance.pitch = options.pitch ?? 1.0;
      utterance.volume = options.volume ?? (soundService.isMuted ? 0 : 1.0);

      const voice = this.getEnglishVoice();
      if (voice) {
        utterance.voice = voice;
      }

      let isFinished = false;
      const cleanup = () => {
        if (isFinished) return;
        isFinished = true;
        this.activeUtterances.delete(utterance);
        if (this.watchdogTimer) {
          clearTimeout(this.watchdogTimer);
          this.watchdogTimer = null;
        }
      };

      utterance.onstart = () => {
        options.onStart?.();
      };

      utterance.onend = () => {
        cleanup();
        options.onEnd?.();
      };

      utterance.onerror = (e: any) => {
        cleanup();
        options.onError?.(e);
        options.onEnd?.();
      };

      // CRITICAL CHROMIUM FIX: Keep active utterance in a persistent Set to prevent
      // V8 garbage collection from silencing speech before or during playback.
      this.activeUtterances.add(utterance);
      g.__activeSpeechUtterances = this.activeUtterances;

      // Safety watchdog: ensure UI never hangs if browser fails to trigger onend
      const estimatedWords = text.trim().split(/\s+/).length;
      const maxDurationMs = Math.max(3500, estimatedWords * 750 + 2500);
      this.watchdogTimer = setTimeout(() => {
        if (!isFinished) {
          cleanup();
          options.onEnd?.();
        }
      }, maxDurationMs);

      // Trigger speech synthesis
      synth.speak(utterance);

      // Windows Edge/Chrome: resume immediately to start queue if suspended
      if (synth.paused && typeof synth.resume === 'function') {
        synth.resume();
      }

      return true;
    } catch (err) {
      this.stop();
      options.onError?.(err);
      options.onEnd?.();
      return false;
    }
  }

  /**
   * Stop any active speech and reset state
   */
  public stop() {
    if (this.watchdogTimer) {
      clearTimeout(this.watchdogTimer);
      this.watchdogTimer = null;
    }
    this.activeUtterances.clear();
    const g = getGlobal();
    if (g && g.speechSynthesis && typeof g.speechSynthesis.cancel === 'function') {
      try {
        g.speechSynthesis.cancel();
      } catch {
        // Ignored
      }
    }
  }

  public isSpeaking(): boolean {
    const g = getGlobal();
    if (!g || !g.speechSynthesis) return false;
    return Boolean(g.speechSynthesis.speaking || this.activeUtterances.size > 0);
  }
}

export const speechService = new SpeechService();
