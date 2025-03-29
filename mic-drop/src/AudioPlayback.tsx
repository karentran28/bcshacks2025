import React, { useEffect, useState } from 'react'

const MicPlayback = () => {
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const startMic = async () => {
    if (isPlaying) return
    const stream = await navigator.mediaDevices.getUserMedia({ 
      audio: {
        echoCancellation: false,
        noiseSuppression: false,
        autoGainControl: false,
      } 
    })
    const context = new AudioContext({
      latencyHint: 0.001, sampleRate: 48000
    })
    const source = context.createMediaStreamSource(stream)
    const gainNode = context.createGain()
    gainNode.gain.value = 1.0

    source.connect(gainNode).connect(context.destination)
    setAudioContext(context)
    setIsPlaying(true)
  }

  const stopMic = () => {
    if (audioContext) {
      audioContext.close()
      setAudioContext(null)
    }
    setIsPlaying(false)
  }

  return (
    <div>
      <button onClick={startMic} disabled={isPlaying}>Start Mic</button>
      <button onClick={stopMic} disabled={!isPlaying}>Stop Mic</button>
    </div>
  )
}

export default MicPlayback
