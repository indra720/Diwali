// Global helper for managing background video and audio playback reliably
let videoElement = null;

export const registerVideoElement = (el) => {
  videoElement = el;
};

export const playAudio = () => {
  if (videoElement) {
    try {
      videoElement.muted = false;
      videoElement.volume = 1.0;
      const promise = videoElement.play();
      if (promise !== undefined) {
        promise.catch((err) => {
          console.log("Audio play pending user interaction:", err);
        });
      }
    } catch (e) {
      console.warn("Could not play video audio", e);
    }
  }
};
