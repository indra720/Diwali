// Audio manager disabled in favor of the user's custom WhatsApp video soundtrack
class SoundManager {
  constructor() {
    this.isMuted = true;
  }
  init() {}
  toggleMute() { return true; }
  setMute() {}
  playBell() {}
  playWhoosh() {}
  playFireworkBurst() {}
  playDiyaLight() {}
  startAmbientMusic() {}
  stopAmbientMusic() {}
}

export const soundManager = new SoundManager();
