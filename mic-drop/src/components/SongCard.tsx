import React from "react";
import "./SongCard.css";

export interface SongCardProps {
  title: string;
  artist: string;
  genre: string;
  year?: number;
  albumCoverUrl: string;
  onClick: () => void;
  buttonLabel?: string;
}

const SongCard: React.FC<SongCardProps> = ({
  title,
  artist,
  year,
  genre,
  albumCoverUrl,
  onClick,
  buttonLabel = "Sing",
}) => {
  return (
    <div className="song-card clickable" onClick={onClick}>
      <img src={albumCoverUrl} alt={title} className="album-cover" />

      <div className="song-info">
        <div className="song-meta">
          <div className="meta-item song-title">{title}</div>
          <div className="meta-item song-artist">{artist}</div>
          {year && <div className="meta-item song-year">{year}</div>}
          <div className="meta-item song-genre">{genre}</div>
        </div>
      </div>

      <button
        className="sing-button"
        onClick={(e) => {
          e.stopPropagation(); // stops double trigger
          onClick();
        }}
      >
        {buttonLabel}
      </button>
    </div>
  );
};

export default SongCard;
