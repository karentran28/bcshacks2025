import React, { useState, useRef } from 'react'

const MicPlayback = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioContextRef = useRef<AudioContext | null>(null)
  const micSourceRef = useRef<MediaStreamAudioSourceNode | null>(null)

  const startMic = async () => {
    if (isPlaying) return

    const stream = await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: false,
        noiseSuppression: false,
        autoGainControl: false,
      },
    })

    const context = new AudioContext({
      latencyHint: 'playback',
    })

    const micSource = context.createMediaStreamSource(stream)
    micSource.connect(context.destination)

    audioContextRef.current = context
    micSourceRef.current = micSource
    setIsPlaying(true)
  }

  const stopMic = () => {
    micSourceRef.current?.disconnect()
    audioContextRef.current?.close()

    micSourceRef.current = null
    audioContextRef.current = null
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
