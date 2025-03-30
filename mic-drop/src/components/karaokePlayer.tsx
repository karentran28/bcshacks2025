import React, { useEffect, useRef, useState } from "react";
import { parseLRC, LrcLine } from "./parseLRC";
import "./KaraokePlayer.css";

interface Props {
  songTitle: string;
  audioSrc: string;
  lrcSrc: string;
  albumArt: string;
  onBack: () => void;
}

const KaraokePlayer: React.FC<Props> = ({
  songTitle,
  audioSrc,
  lrcSrc,
  albumArt,
}) => {
  const [lines, setLines] = useState<LrcLine[]>([]);
  const [currentLine, setCurrentLine] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const audioRef = useRef<HTMLAudioElement>(null);
  const currentLineRef = useRef(0);
  const lineRefs = useRef<HTMLDivElement[]>([]);

  // Load LRC on mount
  useEffect(() => {
    const loadLRC = async () => {
      const res = await fetch(lrcSrc);
      const text = await res.text();
      const parsed = parseLRC(text);
      setLines(parsed);
    };
    loadLRC();
  }, [lrcSrc]);

  // Keep currentLineRef in sync
  useEffect(() => {
    currentLineRef.current = currentLine;
  }, [currentLine]);

  // Track current lyric line with updated ref
  useEffect(() => {
    const interval = setInterval(() => {
      const audio = audioRef.current;
      if (!audio || !lines.length) return;
      const time = audio.currentTime;
      const index = lines.findIndex((line, i) => {
        const next = lines[i + 1];
        return time >= line.time && (!next || time < next.time);
      });
      if (index !== -1 && index !== currentLineRef.current) {
        console.log("Updating line to:", index);
        setCurrentLine(index);
      }
      if (audio.duration) {
        const percent = (audio.currentTime / audio.duration) * 100;
        setProgress(percent);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [lines]);

  // Scroll to current line
  useEffect(() => {
    console.log("Scrolling to line:", currentLine);
    const activeLine = lineRefs.current[currentLine];
    if (activeLine) {
      activeLine.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [currentLine]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio || !audio.duration) return;
    const value = Number(e.target.value);
    const newTime = (value / 100) * audio.duration;
    audio.currentTime = newTime;
    setProgress(value);
  };

  return (
    <div className="karaoke-wrapper">
      <audio ref={audioRef} src={audioSrc} preload="auto" />

      <div className="karaoke-header">
        <h1 className="song-title">{songTitle}</h1>
        <img src={albumArt} alt="Album Art" className="album-art" />
      </div>

      <div className="lyrics-container">
        {lines.map((line, i) => {
          const distance = Math.abs(i - currentLine);
          if (distance > 3) return null;

          let className = "lyric-line";
          if (i === currentLine) className += " active";
          else if (currentLine !== -1 && Math.abs(i - currentLine) <= 3)
            className += " visible";

          return (
            <div
              key={`line-${i}`}
              ref={(el) => {
                lineRefs.current[i] = el!;
              }}
              className={className}
            >
              {line.text}
            </div>
          );
        })}
      </div>

      <div className="controls-container">
        <input
          type="range"
          min={0}
          max={100}
          value={progress}
          onChange={handleSeek}
          className="progress-bar"
        />

        <button onClick={togglePlay} className="play-button">
          {isPlaying ? "⏸" : "▶"}
        </button>
      </div>
    </div>
  );
};

export default KaraokePlayer;
