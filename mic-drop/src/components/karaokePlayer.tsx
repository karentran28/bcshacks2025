import React, { useEffect, useRef, useState } from 'react'
import { parseLRC, LrcLine } from './parseLRC'

interface Props {
  audioSrc: string
  lrcSrc: string
  onBack: () => void
}

const KaraokePlayer: React.FC<Props> = ({ audioSrc, lrcSrc, onBack }) => {
  const [lines, setLines] = useState<LrcLine[]>([])
  const [currentLine, setCurrentLine] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  const audioRef = useRef<HTMLAudioElement>(null)

  // Load LRC on mount
  useEffect(() => {
    const loadLRC = async () => {
      const res = await fetch(lrcSrc)
      const text = await res.text()
      const parsed = parseLRC(text)
      setLines(parsed)
    }
    loadLRC()
  }, [lrcSrc])

  // Track current lyric line
  useEffect(() => {
    const interval = setInterval(() => {
      const audio = audioRef.current
      if (!audio || !lines.length) return
      const time = audio.currentTime
      const index = lines.findIndex((line, i) => {
        const next = lines[i + 1]
        return time >= line.time && (!next || time < next.time)
      })
      if (index !== -1 && index !== currentLine) {
        setCurrentLine(index)
      }
    }, 100)

    return () => clearInterval(interval)
  }, [lines, currentLine])

  const togglePlay = () => {
    const audio = audioRef.current
    if (!audio) return
    if (isPlaying) {
      audio.pause()
    } else {
      audio.play()
    }
    setIsPlaying(!isPlaying)
  }

  return (
    <div className="p-4 bg-black text-white min-h-screen flex flex-col items-center justify-center">
      <audio ref={audioRef} src={audioSrc} preload="auto" />
      
      <div className="mb-4">
        <button onClick={onBack} className="px-4 py-2 bg-gray-700 rounded mr-2">← Back</button>
        <button onClick={togglePlay} className="px-4 py-2 bg-blue-600 rounded">
          {isPlaying ? '⏸ Pause' : '▶️ Play'}
        </button>
      </div>

      <div className="text-center mt-6 space-y-2 font-mono text-lg leading-relaxed">
        {lines.map((line, i) => (
          <div key={i} className={i === currentLine ? 'text-yellow-300' : 'text-gray-400'}>
            {line.text}
          </div>
        ))}
      </div>
    </div>
  )
}

export default KaraokePlayer