// import { useState } from 'react'
import './App.css'
import LandingPage from './pages/LandingPage.tsx'
import React, { useState } from 'react'
import KaraokePlayer from './components/karaokePlayer.tsx'
import audioFile from './assets/karaoke-assets/1/That\'s What I Like - Bruno Mars.mp3'
import lrcFile from './assets/karaoke-assets/1/That\'s What I Like - Bruno Mars.lrc'

function App() {
  const [viewingLyrics, setViewingLyrics] = useState(true)

  return (
    <div>
      {viewingLyrics ? (
        <KaraokePlayer
          audioSrc={audioFile}
          lrcSrc={lrcFile}
          onBack={() => setViewingLyrics(false)}
        />
      ) : (
        <button onClick={() => setViewingLyrics(true)}>Open Lyrics Player</button>
      )}
    </div>
  )
}

export default App
