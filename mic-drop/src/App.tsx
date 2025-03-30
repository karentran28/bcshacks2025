import React, { useState } from 'react'
import KaraokePlayer from './components/karaokePlayer.tsx'

function App() {
  const [viewingLyrics, setViewingLyrics] = useState(true)

  return (
    <div>
      {viewingLyrics ? (
        <KaraokePlayer
          songTitle="That\'s What I Like - Bruno Mars"
          audioSrc="/1/That's What I Like - Bruno Mars.mp3"
          lrcSrc="/1/That's What I Like - Bruno Mars.lrc"
          albumArt="/1/That's What I Like - Bruno Mars.jpeg"
          onBack={() => setViewingLyrics(false)}
        />
      ) : (
        <button onClick={() => setViewingLyrics(true)}>Open Lyrics Player</button>
      )}
    </div>
  )
}

export default App
