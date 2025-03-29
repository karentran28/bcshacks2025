import React, { useState } from 'react'

const MicPlayback = () => {
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null)
  const [micSource, setMicSource] = useState<MediaStreamAudioSourceNode | null>(null)
  const [isEnabled, setIsEnabled] = useState(false)

  const startMic = async () => {
    if (isEnabled) return
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: false,
        noiseSuppression: false,
        autoGainControl: false,
      },
    })
    const context = new AudioContext({
      latencyHint: 'playback',
      sampleRate: 48000,
    })
    const source = context.createMediaStreamSource(stream)
    source.connect(context.destination)

    setAudioContext(context)
    setMicSource(source)
    setIsEnabled(true)
  }

  const stopMic = () => {
    micSource?.disconnect()
    audioContext?.close()
    setMicSource(null)
    setAudioContext(null)
    setIsEnabled(false)
  }

  return (
    <div>
      <button onClick={startMic} disabled={isEnabled}>Start Mic</button>
      <button onClick={stopMic} disabled={!isEnabled}>Stop Mic</button>
    </div>
  )
}

export default MicPlayback
