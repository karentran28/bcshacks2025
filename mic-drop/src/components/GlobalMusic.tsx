import { useEffect, useRef } from 'react';

interface Props {
  isRecording: boolean;
}

const GlobalMusic: React.FC<Props> = ({ isRecording }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeIntervalRef = useRef<number | null>(null);

  // Fade volume smoothly
  const fadeToVolume = (targetVolume: number) => {
    const audio = audioRef.current;
    if (!audio) return;

    if (fadeIntervalRef.current) {
      clearInterval(fadeIntervalRef.current);
    }

    fadeIntervalRef.current = window.setInterval(() => {
      if (!audio) return;

      const current = audio.volume;
      const step = 0.01;
      if (Math.abs(current - targetVolume) < step) {
        audio.volume = targetVolume;
        clearInterval(fadeIntervalRef.current!);
        return;
      }

      audio.volume += current < targetVolume ? step : -step;
    }, 50); // smooth step every 50ms
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.loop = true;

    const playAudio = () => {
      if (audio.paused) {
        audio.play().catch((e) => console.warn("Autoplay blocked:", e));
      }
    };

    document.addEventListener("click", playAudio, { once: true });

    return () => {
      document.removeEventListener("click", playAudio);
      clearInterval(fadeIntervalRef.current!);
    };
  }, []);

  // 🔊 Trigger fade on isRecording toggle
  useEffect(() => {
    fadeToVolume(isRecording ? 0 : 0.4);
  }, [isRecording]);

  return <audio ref={audioRef} src="/rooftop-live.mp3" />;
};

export default GlobalMusic;
