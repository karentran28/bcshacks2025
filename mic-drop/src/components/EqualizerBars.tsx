import { useEffect, useRef, useState } from 'react';
import './EqualizerBars.css';
import '../index.css'

const BAR_COUNT = 20;
const MIN_FREQ = 75;  // Hz
const MAX_FREQ = 1100; // Hz

const EqualizerBars: React.FC = () => {
  const [heights, setHeights] = useState<number[]>(Array(BAR_COUNT).fill(1));
  const animationRef = useRef<number | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    const setupMic = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const context = new AudioContext();
      await context.resume(); // Ensure the audio context is running

      const source = context.createMediaStreamSource(stream);
      const analyser = context.createAnalyser();

      analyser.fftSize = 4096; // Higher resolution: ~11.7 Hz per bin
      const bufferLength = analyser.frequencyBinCount; // 2048 bins
      const dataArray = new Uint8Array(bufferLength);

      source.connect(analyser);

      analyserRef.current = analyser;
      dataArrayRef.current = dataArray;
      sourceRef.current = source;
      audioContextRef.current = context;

      const sampleRate = context.sampleRate; // e.g., 48000 Hz
      const binWidth = sampleRate / analyser.fftSize; // ~11.7 Hz
      const minBin = Math.floor(MIN_FREQ / binWidth); // ~6
      const maxBin = Math.floor(MAX_FREQ / binWidth); // ~42
      const binRange = maxBin - minBin; // ~36 bins
      console.log(dataArray.slice(minBin, maxBin + 1));
      const draw = () => {
        if (!analyserRef.current || !dataArrayRef.current) return;

        const analyser = analyserRef.current;
        const dataArray = dataArrayRef.current;
        analyser.getByteFrequencyData(dataArray);

        const bars = Array.from({ length: BAR_COUNT }, (_, i) => {
          // Linearly map bins to bars
          const startBin = minBin + Math.floor((i / BAR_COUNT) * binRange);
          const endBin = minBin + Math.floor(((i + 1) / BAR_COUNT) * binRange);
          let sum = 0;
          let count = 0;
          for (let j = startBin; j < endBin; j++) {
            sum += dataArray[j];
            count++;
          }
          const avg = count > 0 ? sum / count : 0;
          return (avg / 255) * 100; // Scale to 0-100%
        });

        setHeights(bars);
        animationRef.current = requestAnimationFrame(draw);
      };

      draw();
    };

    setupMic();

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      audioContextRef.current?.close();
    };
  }, []);

  return (
    <div className="equalizer-container">
      {heights.map((h, i) => (
        <div key={i} className="equalizer-bar" style={{ height: `${h}%` }} />
      ))}
    </div>
  );
};

export default EqualizerBars;