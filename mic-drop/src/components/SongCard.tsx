import React from 'react'
import './SongCard.css'

export interface SongCardProps {
  title: string
  artist: string
  year?: number
  albumCoverUrl: string
  onClick: () => void
  buttonLabel?: string
}

const SongCard: React.FC<SongCardProps> = ({
  title,
  artist,
  year,
  albumCoverUrl,
  onClick,
  buttonLabel = 'Sing',
}) => {
  return (
    <div className="song-card">
      <img src={albumCoverUrl} alt={title} className="album-cover" />

      <div className="song-info">
        <h3 className="song-title">{title}</h3>
        <p className="song-artist">{artist}</p>
        {year && <p className="song-year">{year}</p>}
      </div>

      <button className="sing-button" onClick={onClick}>
        {buttonLabel}
      </button>
    </div>
  )
}

export default SongCard
