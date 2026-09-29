import { soundService } from './sound';
import { EnglishAccent } from '../types/pronunciation';

export interface SpeechOptions {
  lang?: string;
  accent?: EnglishAccent;
  useStandardAudio?: boolean; // When true (default in browser), attempts standard native audio first
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
 * SpeechService provides high-reliability, standard-source English pronunciation
 * with a Dual-Layer Architecture:
 * 1. Primary Layer: High-fidelity standard studio native audio stream (Google/Standard TTS CDN)
 *    supporting both UK (en-GB) and US (en-US) standards for authentic Global Success curriculum.
 * 2. Fallback Layer: Optimized browser Web Speech API (speechSynthesis) with active Chromium/Windows
 *    bug mitigations (GC retention, unpausing, and queue recovery).
 */
class SpeechService {
  private voices: SpeechSynthesisVoice[] = [];
  private activeUtterances: Set<SpeechSynthesisUtterance> = new Set();
  private watchdogTimer: ReturnType<typeof setTimeout> | null = null;
  private isInitialized = false;
  private currentAudio: any = null;
  private preferredAccent: EnglishAccent = 'en-US';

  constructor() {
    this.setupListeners();
    this.loadSavedAccent();
  }

  private loadSavedAccent() {
    try {
      if (typeof localStorage !== 'undefined') {
        const saved = localStorage.getItem('gsw_speech_accent');
        if (saved === 'en-US' || saved === 'en-GB') {
          this.preferredAccent = saved;
        }
      }
    } catch {
      // Ignored
    }
  }

  public getAccent(): EnglishAccent {
    return this.preferredAccent;
  }

  public setAccent(accent: EnglishAccent) {
    this.preferredAccent = accent;
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('gsw_speech_accent', accent);
      }
    } catch {
      // Ignored
    }
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
    return Boolean((g && g.speechSynthesis) || typeof Audio !== 'undefined');
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
  public getEnglishVoice(targetAccent?: EnglishAccent): SpeechSynthesisVoice | null {
    const list = this.getVoices();
    if (!list || list.length === 0) return null;

    const accent = targetAccent || this.preferredAccent;
    const accentPrefix = accent === 'en-GB' ? 'en-gb' : 'en-us';

    // Prioritized list of high quality English voices (Edge / Windows / Chrome / Safari)
    const priorityKeywords = accent === 'en-GB'
      ? ['google uk english female', 'google uk english male', 'george', 'hazel', 'susan', 'en-gb', 'en_gb', 'british']
      : [
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

    // Match matching accent
    const accentMatch = list.find((v) => v.lang?.toLowerCase().startsWith(accentPrefix));
    if (accentMatch) return accentMatch;

    // Any English voice
    const anyEn = list.find((v) => v.lang?.toLowerCase().startsWith('en'));
    if (anyEn) return anyEn;

    // Default system voice
    return list.find((v) => v.default) || list[0] || null;
  }

  /**
   * Build standard audio URL for native British or American pronunciation
   */
  public getStandardAudioUrl(text: string, accent?: EnglishAccent): string {
    const acc = accent || this.preferredAccent;
    const clean = encodeURIComponent(text.trim());
    return `https://translate.google.com/translate_tts?ie=UTF-8&tl=${acc}&client=tw-ob&q=${clean}`;
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

    // Stop previous audio playback if any
    this.stopAudioElement();

    const g = getGlobal();
    const hasAudio = typeof Audio !== 'undefined';
    const isBrowser = typeof window !== 'undefined' && typeof window.document !== 'undefined';
    const targetAccent = options.accent || this.preferredAccent;
    const isShortText = text.trim().length < 150;

    // In a real browser with Audio support and standard audio not explicitly disabled,
    // use high-definition native pronunciation stream
    if (hasAudio && isBrowser && options.useStandardAudio !== false && isShortText) {
      try {
        const audioUrl = this.getStandardAudioUrl(text, targetAccent);
        const audio = new Audio(audioUrl);
        audio.volume = options.volume ?? (soundService.isMuted ? 0 : 1.0);
        this.currentAudio = audio;

        let hasStarted = false;
        audio.onplay = () => {
          hasStarted = true;
          options.onStart?.();
        };

        audio.onended = () => {
          this.currentAudio = null;
          options.onEnd?.();
        };

        audio.onerror = () => {
          // Fallback to speechSynthesis if network stream fails
          this.currentAudio = null;
          this.speakSynthesis(text, options);
        };

        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            // Autoplay policy or offline -> fallback immediately to speechSynthesis
            this.currentAudio = null;
            this.speakSynthesis(text, options);
          });
        }
        return true;
      } catch {
        // Fallback to speechSynthesis
        return this.speakSynthesis(text, options);
      }
    }

    return this.speakSynthesis(text, options);
  }

  /**
   * Speak using browser SpeechSynthesis with full error recovery & watchdog
   */
  public speakSynthesis(text: string, options: SpeechOptions = {}): boolean {
    const g = getGlobal();
    const synth: SpeechSynthesis | undefined = g?.speechSynthesis;

    if (!synth) {
      options.onStart?.();
      const fakeDuration = Math.min(2500, Math.max(1000, text.split(' ').length * 300));
      setTimeout(() => {
        options.onEnd?.();
      }, fakeDuration);
      return false;
    }

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

      const targetAccent = options.accent || this.preferredAccent;
      const UtteranceClass = g.SpeechSynthesisUtterance || SpeechSynthesisUtterance;
      const utterance = new UtteranceClass(text.trim());
      utterance.lang = options.lang || targetAccent;
      utterance.rate = options.rate ?? 0.88;
      utterance.pitch = options.pitch ?? 1.0;
      utterance.volume = options.volume ?? (soundService.isMuted ? 0 : 1.0);

      const voice = this.getEnglishVoice(targetAccent);
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

  private stopAudioElement() {
    if (this.currentAudio) {
      try {
        this.currentAudio.pause();
        this.currentAudio.currentTime = 0;
      } catch {
        // Ignored
      }
      this.currentAudio = null;
    }
  }

  /**
   * Stop any active speech and reset state
   */
  public stop() {
    this.stopAudioElement();

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
    if (this.currentAudio && !this.currentAudio.paused) return true;
    const g = getGlobal();
    if (!g || !g.speechSynthesis) return false;
    return Boolean(g.speechSynthesis.speaking || this.activeUtterances.size > 0);
  }
}

export const speechService = new SpeechService();
