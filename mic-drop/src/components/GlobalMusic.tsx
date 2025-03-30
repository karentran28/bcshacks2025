// GlobalMusic.tsx
import { useEffect, useRef } from 'react';

interface Props {
  isRecording: boolean;
}

const GlobalMusic: React.FC<Props> = ({ isRecording }) => {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.loop = true;
    audio.volume = isRecording ? 0.1 : 0.4; // 👈 Duck volume on recording

    const playAudio = () => {
      audio.play().catch((e) => console.warn('Autoplay blocked:', e));
    };
    const tryPlay = async () => {
        try {
          await audio.play();
          console.log("Music is playing!");
        } catch (err) {
          console.warn("Autoplay blocked:", err);
        }
      };

    // Auto-play once user interacts
    tryPlay(); // Just try immediately

    return () => {
      document.removeEventListener('click', playAudio, true);
      audio.pause();
    };
  }, [isRecording]);

  return <audio ref={audioRef} src="/rooftop-live.mp3" />;
};

export default GlobalMusic;
