import { useState, useRef } from 'react';

const MicPlayback = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const audioContextRef = useRef<AudioContext | null>(null);
  const micSourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // You can change this value to boost more or less
  const VOLUME_BOOST = 2.0; // 2x louder

  const toggleMic = async () => {
    if (!isPlaying) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: {
            echoCancellation: false,
            noiseSuppression: false,
            autoGainControl: false,
          },
        });
        streamRef.current = stream;

        const context = new AudioContext({
          latencyHint: 'interactive',
        });

        const micSource = context.createMediaStreamSource(stream);
        const gainNode = context.createGain();
        gainNode.gain.value = VOLUME_BOOST;

        micSource.connect(gainNode);
        gainNode.connect(context.destination);

        audioContextRef.current = context;
        micSourceRef.current = micSource;
        gainNodeRef.current = gainNode;
        setIsPlaying(true);
      } catch (err) {
        console.error('Mic access error:', err);
      }
    } else {
      micSourceRef.current?.disconnect();
      gainNodeRef.current?.disconnect();
      audioContextRef.current?.close();
      streamRef.current?.getTracks().forEach((track) => track.stop());

      micSourceRef.current = null;
      gainNodeRef.current = null;
      audioContextRef.current = null;
      streamRef.current = null;
      setIsPlaying(false);
    }
  };

  return (
    <div>
      <button onClick={toggleMic}>
        {isPlaying ? 'Mute Mic' : 'Unmute Mic'}
      </button>
    </div>
  );
};

export default MicPlayback;
