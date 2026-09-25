/**
 * Audio Engine for Zoro Experience.
 * Plays /audio/audio.mp3 in loop when unmuted and supports procedural samurai SFX.
 */

class SoundEngine {
  private bgm: HTMLAudioElement | null = null;
  private ctx: AudioContext | null = null;
  private isMutedState = true;
  private masterGain: GainNode | null = null;
  private lastBladeTime = 0;
  private lastSwishTime = 0;

  constructor() {}

  private initBgm() {
    if (this.bgm || typeof window === "undefined") return;
    try {
      this.bgm = new Audio("/audio/audio.mp3");
      this.bgm.loop = true;
      this.bgm.volume = 0.7;
      this.bgm.preload = "auto";

      // Fallback safeguard for browsers that quirk on loop property
      this.bgm.addEventListener("ended", () => {
        if (!this.isMutedState && this.bgm) {
          this.bgm.currentTime = 0;
          this.bgm.play().catch(() => {});
        }
      });
    } catch (e) {
      console.warn("Failed to initialize BGM:", e);
    }
  }

  private initContext() {
    if (this.ctx || typeof window === "undefined") return;
    try {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.isMutedState ? 0 : 0.35, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    } catch {
      // Audio not supported or blocked
    }
  }

  public toggleMute(): boolean {
    this.initBgm();
    this.initContext();

    this.isMutedState = !this.isMutedState;

    // Handle BGM playback
    if (this.bgm) {
      if (!this.isMutedState) {
        this.bgm.play().catch((err) => {
          console.warn("Audio playback blocked by browser:", err);
        });
      } else {
        this.bgm.pause();
      }
    }

    // Handle Web Audio SFX gain & state
    if (this.ctx && this.masterGain) {
      if (this.ctx.state === "suspended") {
        this.ctx.resume().catch(() => {});
      }
      const now = this.ctx.currentTime;
      this.masterGain.gain.cancelScheduledValues(now);
      this.masterGain.gain.linearRampToValueAtTime(this.isMutedState ? 0 : 0.35, now + 0.15);

      if (!this.isMutedState) {
        this.triggerBladeRing(0.5);
      }
    }

    return this.isMutedState;
  }

  public isMuted(): boolean {
    return this.isMutedState;
  }

  /**
   * Metallic Katana edge ring / sheen effect
   */
  public triggerBladeRing(intensity = 0.5) {
    if (this.isMutedState || !this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;
    if (now - this.lastBladeTime < 0.25) return;
    this.lastBladeTime = now;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = "sine";
      const baseFreq = 2200 + Math.random() * 400;
      osc.frequency.setValueAtTime(baseFreq, now);
      osc.frequency.exponentialRampToValueAtTime(baseFreq * 0.85, now + 0.8);

      filter.type = "bandpass";
      filter.frequency.setValueAtTime(baseFreq, now);
      filter.Q.setValueAtTime(12, now);

      const amp = Math.min(0.25, 0.08 * intensity);
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(amp, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.00001, now + 0.7);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.8);
    } catch {
      // Ignore
    }
  }

  /**
   * Ink brush swish / wind rush sound
   */
  public triggerSwish(velocity = 0.5) {
    if (this.isMutedState || !this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;
    if (now - this.lastSwishTime < 0.12) return;
    this.lastSwishTime = now;

    try {
      const bufferSize = Math.floor(this.ctx.sampleRate * 0.25);
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = "bandpass";
      const startFreq = 400 + velocity * 600;
      filter.frequency.setValueAtTime(startFreq, now);
      filter.frequency.exponentialRampToValueAtTime(startFreq * 1.5, now + 0.2);
      filter.Q.setValueAtTime(3.5, now);

      const gain = this.ctx.createGain();
      const amp = Math.min(0.15, 0.04 * velocity);
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(amp, now + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.25);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      noise.start(now);
      noise.stop(now + 0.25);
    } catch {
      // Ignore
    }
  }

  /**
   * Optional atmosphere modulation
   */
  public updateAtmosphere(_progress: number) {
    // Retained for API compatibility
  }
}

export const soundEngine = typeof window !== "undefined" ? new SoundEngine() : null;
