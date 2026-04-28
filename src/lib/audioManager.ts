/**
 * Audio Manager — Singleton that persists audio state across page navigations.
 * Uses sessionStorage to remember playing state across full page reloads.
 */

const STORAGE_KEY = "nuad-audio-playing";
const VOLUME_KEY = "nuad-audio-volume";

class AudioManager {
  private audio: HTMLAudioElement | null = null;
  private fadeInterval: ReturnType<typeof setInterval> | null = null;

  getAudio(): HTMLAudioElement {
    if (this.audio) return this.audio;

    this.audio = new Audio("/audio/ambient.mp3");
    this.audio.loop = true;
    this.audio.volume = 0;
    this.audio.preload = "auto";

    return this.audio;
  }

  isPlaying(): boolean {
    if (this.audio && !this.audio.paused) return true;
    return sessionStorage.getItem(STORAGE_KEY) === "true";
  }

  getStoredVolume(): number {
    const vol = sessionStorage.getItem(VOLUME_KEY);
    return vol ? parseFloat(vol) : 0.3;
  }

  private saveState(playing: boolean, volume?: number) {
    sessionStorage.setItem(STORAGE_KEY, String(playing));
    if (volume !== undefined) {
      sessionStorage.setItem(VOLUME_KEY, String(volume));
    }
  }

  fadeIn(targetVolume: number = 0.3, duration: number = 1500): Promise<void> {
    return new Promise((resolve) => {
      const audio = this.getAudio();
      if (this.fadeInterval) clearInterval(this.fadeInterval);

      const steps = 30;
      const stepDuration = duration / steps;
      const volumeStep = (targetVolume - audio.volume) / steps;
      let currentStep = 0;

      this.fadeInterval = setInterval(() => {
        currentStep++;
        audio.volume = Math.max(0, Math.min(1, audio.volume + volumeStep));
        if (currentStep >= steps) {
          clearInterval(this.fadeInterval!);
          this.fadeInterval = null;
          audio.volume = targetVolume;
          this.saveState(true, targetVolume);
          resolve();
        }
      }, stepDuration);
    });
  }

  fadeOut(duration: number = 1500): Promise<void> {
    return new Promise((resolve) => {
      const audio = this.getAudio();
      if (this.fadeInterval) clearInterval(this.fadeInterval);

      const steps = 30;
      const stepDuration = duration / steps;
      const volumeStep = (0 - audio.volume) / steps;
      let currentStep = 0;

      this.fadeInterval = setInterval(() => {
        currentStep++;
        audio.volume = Math.max(0, Math.min(1, audio.volume + volumeStep));
        if (currentStep >= steps) {
          clearInterval(this.fadeInterval!);
          this.fadeInterval = null;
          audio.volume = 0;
          audio.pause();
          this.saveState(false);
          resolve();
        }
      }, stepDuration);
    });
  }

  async play(targetVolume?: number): Promise<boolean> {
    const audio = this.getAudio();
    const vol = targetVolume ?? this.getStoredVolume();
    try {
      await audio.play();
      this.fadeIn(vol);
      return true;
    } catch {
      return false;
    }
  }

  pause() {
    this.fadeOut();
  }

  async toggle(): Promise<boolean> {
    const audio = this.getAudio();
    if (!audio.paused) {
      this.pause();
      return false;
    } else {
      return this.play();
    }
  }

  /**
   * Resume playback if it was playing before page navigation.
   * Call this on mount in AudioToggle.
   */
  async resumeIfNeeded(): Promise<boolean> {
    if (sessionStorage.getItem(STORAGE_KEY) === "true") {
      const audio = this.getAudio();
      const vol = this.getStoredVolume();
      try {
        audio.volume = vol;
        await audio.play();
        this.saveState(true, vol);
        return true;
      } catch {
        // Browser blocked autoplay — will need user interaction
        return false;
      }
    }
    return false;
  }

  destroy() {
    if (this.fadeInterval) clearInterval(this.fadeInterval);
    if (this.audio) {
      this.audio.pause();
      this.audio.src = "";
      this.audio = null;
    }
  }
}

// Singleton instance
const audioManager = new AudioManager();
export default audioManager;
