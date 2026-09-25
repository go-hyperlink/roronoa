import { TOTAL_FRAMES } from "./constants";

export function getFrameUrl(index: number, format: "webp" | "png" = "webp"): string {
  const clamped = Math.max(1, Math.min(TOTAL_FRAMES, Math.round(index)));
  const pad = String(clamped).padStart(3, "0");
  if (format === "webp") {
    return `/frames/frame-${pad}.webp`;
  }
  return `/asset/ezgif-frame-${pad}.png`;
}

export type ProgressCallback = (loaded: number, total: number, progress: number) => void;

export class SequencePreloader {
  private images: (HTMLImageElement | null)[] = new Array(TOTAL_FRAMES).fill(null);
  private loadedMap: boolean[] = new Array(TOTAL_FRAMES).fill(false);
  private loadedCount = 0;
  private total = TOTAL_FRAMES;
  private subscribers: Set<ProgressCallback> = new Set();
  private isStarted = false;
  private criticalLoaded = false;
  private onCriticalReadyCallbacks: Set<() => void> = new Set();

  constructor() {}

  public subscribe(cb: ProgressCallback): () => void {
    this.subscribers.add(cb);
    cb(this.loadedCount, this.total, this.getProgress());
    return () => this.subscribers.delete(cb);
  }

  public onCriticalReady(cb: () => void): () => void {
    if (this.criticalLoaded) {
      cb();
    } else {
      this.onCriticalReadyCallbacks.add(cb);
    }
    return () => this.onCriticalReadyCallbacks.delete(cb);
  }

  public getProgress(): number {
    return this.total === 0 ? 0 : this.loadedCount / this.total;
  }

  public getLoadedCount(): number {
    return this.loadedCount;
  }

  public getTotal(): number {
    return this.total;
  }

  public getImage(index: number): HTMLImageElement | null {
    const clamped = Math.max(0, Math.min(this.total - 1, Math.floor(index)));
    return this.images[clamped];
  }

  /**
   * Returns the exact frame image if loaded, or searches for the nearest loaded frame.
   * Ensures the canvas never flickers or drops to black during rapid scrubbing.
   */
  public getNearestLoadedImage(index: number): HTMLImageElement | null {
    const clamped = Math.max(0, Math.min(this.total - 1, Math.floor(index)));
    if (this.images[clamped]) return this.images[clamped];

    // Search outwards
    for (let delta = 1; delta < this.total; delta++) {
      const left = clamped - delta;
      if (left >= 0 && this.images[left]) return this.images[left];
      const right = clamped + delta;
      if (right < this.total && this.images[right]) return this.images[right];
    }
    return null;
  }

  private notify() {
    const progress = this.getProgress();
    for (const cb of this.subscribers) {
      cb(this.loadedCount, this.total, progress);
    }

    // Critical threshold: 24 initial frames loaded OR at least 25% loaded
    if (!this.criticalLoaded && (this.loadedCount >= 24 || progress >= 0.2)) {
      this.criticalLoaded = true;
      for (const cb of this.onCriticalReadyCallbacks) {
        cb();
      }
      this.onCriticalReadyCallbacks.clear();
    }
  }

  private loadSingleImage(frameIndex0: number): Promise<HTMLImageElement> {
    return new Promise((resolve) => {
      if (this.images[frameIndex0]) {
        resolve(this.images[frameIndex0]!);
        return;
      }

      const img = new Image();
      img.decoding = "async";
      const webpUrl = getFrameUrl(frameIndex0 + 1, "webp");

      img.onload = () => {
        this.images[frameIndex0] = img;
        if (!this.loadedMap[frameIndex0]) {
          this.loadedMap[frameIndex0] = true;
          this.loadedCount++;
          this.notify();
        }
        resolve(img);
      };

      img.onerror = () => {
        // Fallback to png if webp fails
        const pngUrl = getFrameUrl(frameIndex0 + 1, "png");
        const fallbackImg = new Image();
        fallbackImg.decoding = "async";
        fallbackImg.onload = () => {
          this.images[frameIndex0] = fallbackImg;
          if (!this.loadedMap[frameIndex0]) {
            this.loadedMap[frameIndex0] = true;
            this.loadedCount++;
            this.notify();
          }
          resolve(fallbackImg);
        };
        fallbackImg.onerror = () => {
          // Resolve anyway to avoid blocking the queue
          resolve(img);
        };
        fallbackImg.src = pngUrl;
      };

      img.src = webpUrl;
    });
  }

  public async startPreloading(): Promise<void> {
    if (this.isStarted) return;
    this.isStarted = true;

    // Stage 1: Load initial 25 frames immediately for instant interactive intro
    const stage1Indices: number[] = [];
    for (let i = 0; i < Math.min(25, this.total); i++) {
      stage1Indices.push(i);
    }
    await Promise.all(stage1Indices.map((i) => this.loadSingleImage(i)));

    // Stage 2: Load keyframe mesh (every 5th frame across the entire timeline)
    // This guarantees smooth scrubbing across the entire sequence immediately
    const stage2Indices: number[] = [];
    for (let i = 25; i < this.total; i += 5) {
      if (!this.loadedMap[i]) stage2Indices.push(i);
    }
    await Promise.all(stage2Indices.map((i) => this.loadSingleImage(i)));

    // Stage 3: Load all remaining frames with controlled concurrency pool (6 concurrent)
    const remainingIndices: number[] = [];
    for (let i = 0; i < this.total; i++) {
      if (!this.loadedMap[i]) remainingIndices.push(i);
    }

    const CONCURRENCY = 6;
    let poolIndex = 0;
    const worker = async () => {
      while (poolIndex < remainingIndices.length) {
        const current = remainingIndices[poolIndex++];
        await this.loadSingleImage(current);
      }
    };

    const workers = Array.from({ length: CONCURRENCY }, () => worker());
    await Promise.all(workers);
  }
}

// Global preloader singleton instance
let preloaderInstance: SequencePreloader | null = null;

export function getSequencePreloader(): SequencePreloader {
  if (!preloaderInstance) {
    preloaderInstance = new SequencePreloader();
  }
  return preloaderInstance;
}

