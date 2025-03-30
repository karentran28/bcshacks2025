import { useState, useRef } from 'react'; // Remove React import if not needed

const MicPlayback = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const micSourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startMic = async () => {
    if (isPlaying) return;

    // Request microphone access
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: false,
        noiseSuppression: false,
        autoGainControl: false,
      },
    });
    streamRef.current = stream;

    // Get the microphone's sample rate
    const audioTrack = stream.getAudioTracks()[0];
    const settings = audioTrack.getSettings();
    const sampleRate = settings.sampleRate;

    // Create AudioContext with low-latency settings
    const context = new AudioContext({
      latencyHint: 'interactive', // Prioritize low latency
      sampleRate: sampleRate,     // Match microphone sample rate
    });

    // Connect the microphone to the speakers
    const micSource = context.createMediaStreamSource(stream);
    micSource.connect(context.destination);

    // Store references for cleanup
    audioContextRef.current = context;
    micSourceRef.current = micSource;
    setIsPlaying(true);
  };

  const stopMic = () => {
    // Disconnect and clean up
    micSourceRef.current?.disconnect();
    audioContextRef.current?.close();
    streamRef.current?.getTracks().forEach((track: MediaStreamTrack) => track.stop());

    micSourceRef.current = null;
    audioContextRef.current = null;
    streamRef.current = null;
    setIsPlaying(false);
  };

  return (
    <div>
      <button onClick={startMic} disabled={isPlaying}>
        Start Mic
      </button>
      <button onClick={stopMic} disabled={!isPlaying}>
        Stop Mic
      </button>
    </div>
  );
};

export default MicPlayback;