import './KaraokePage.css'
import { useNavigate } from "react-router-dom";
import KaraokePlayer from '../components/karaokePlayer';

const KaraokePage: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div className="karaoke-page">
      <div className="firefly-container">
      {Array.from({ length: 15 }).map((_, i) => {
        const x = Math.random() * window.innerWidth * (Math.random() > 0.5 ? 1 : -1)
        const y = Math.random() * window.innerHeight * (Math.random() > 0.5 ? 1 : -1)
        const duration = 60 + Math.random() * 60
        const size = 5 + Math.random() * 100

        return (
          <div
            key={i}
            className="firefly"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${size}px`,
              height: `${size}px`,
              '--x': `${x}px`,
              '--y': `${y}px`,
              animationDuration: `${duration}s, 2s`,
            } as React.CSSProperties}
          />
        )
      })}
      </div>

      <button className="back-button" onClick={() => navigate('/songList')}>← Back to Song List</button>
      <KaraokePlayer
        songTitle="That's What I Like - Bruno Mars"
        audioSrc="/assets/karaoke-assets/4/dont-stop-believin.mp3"
        lrcSrc="/assets/karaoke-assets/4/dont-stop-believin.lrc"
        albumArt="/assets/karaoke-assets/2/sorry.png"
      />
    </div>
  );
};

export default KaraokePage;
