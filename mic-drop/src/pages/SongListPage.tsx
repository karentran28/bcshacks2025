import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Add this
import SongCard from "../components/SongCard";
import SidebarMenu from "../components/SideBarMenu";
import { supabase } from "../supabaseClient";
import logo from "/assets/logo.webp";

import "./SongListPage.css";

interface Song {
  title: string;
  artist: string;
  year: number;
  genre: string;
  albumCoverUrl: string;
  lowestPitch: number;
  highestPitch: number;
  LRC: string;
  instrumental: string;
  songID: number; // ✅ Ensure this exists in your Supabase
}

const SongListPage: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState("suggested");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [allSongs, setAllSongs] = useState<Song[]>([]);
  const [genres, setGenres] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // ✅

  const userLowestPitch = parseFloat(localStorage.getItem("lowFreq") || "0");
  const userHighestPitch = parseFloat(localStorage.getItem("highFreq") || "0");

  useEffect(() => {
    const fetchSongs = async () => {
      const { data, error } = await supabase.from("Songs").select("*");

      if (error) {
        console.error("Error fetching songs:", error);
      } else {
        const sortedSongs = (data || []).sort((a, b) =>
          a.title.localeCompare(b.title)
        );
        setAllSongs(sortedSongs);

        const uniqueGenres = Array.from(
          new Set(
            data
              ?.map((song) => song.genre?.trim().toLowerCase())
              .filter(Boolean)
          )
        )
          .sort((a, b) => a.localeCompare(b))
          .map((genre) => genre.charAt(0).toUpperCase() + genre.slice(1));

        setGenres(uniqueGenres);
      }

      setLoading(false);
    };

    fetchSongs();
  }, []);

  const filteredSongs = allSongs.filter((song) => {
    const matchesSearch = song.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const matchesGenre = selectedGenre
      ? song.genre.toLowerCase() === selectedGenre.toLowerCase()
      : true;

    const withinUserRange =
      userLowestPitch > 0 &&
      userHighestPitch > 0 &&
      song.lowestPitch >= userLowestPitch &&
      song.highestPitch <= userHighestPitch;

    if (selectedFilter === "suggested") {
      return withinUserRange && matchesSearch && matchesGenre;
    }

    return matchesSearch && matchesGenre;
  });

  return (
    <div className="song-list-page">
      <div className="background-glow"></div>
      <aside className="sidebar">
        <div className="logo-container" onClick={() => navigate("/")}>
          <img src={logo} alt="MicDrop Logo" className="logo-img" />
          <span className="logo-text">mic-drop</span>
        </div>

        <SidebarMenu
          selectedFilter={selectedFilter}
          setSelectedFilter={setSelectedFilter}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          genres={genres}
          selectedGenre={selectedGenre}
          setSelectedGenre={setSelectedGenre}
        />

        <div className="redo-button-container">
          <button className="redo-button" onClick={() => navigate("/low")}>
            Redo Pitch Test
          </button>
        </div>
      </aside>

      <div className="divider" />

      <main className="song-list">
        {loading ? (
          <p>Loading songs...</p>
        ) : filteredSongs.length === 0 ? (
          <p>No songs found.</p>
        ) : (
          <>
            <div className="song-card-label">
              <div className="label-spacer" />
              <div className="label-meta">
                <span className="label-title">Title</span>
                <span className="label-artist">Artist</span>
                <span className="label-year">Year</span>
                <span className="label-genre">Genre</span>
              </div>
            </div>

            {filteredSongs.map((song, index) => (
              <SongCard
                key={index}
                title={song.title}
                artist={song.artist}
                albumCoverUrl={song.albumCoverUrl?.trim() || ""}
                genre={song.genre}
                year={song.year}
                onClick={() =>
                  navigate("/karaoke", {
                    state: {
                      songTitle: song.title,
                      audioSrc: song.instrumental,
                      lrcSrc: song.LRC,
                      albumArt: song.albumCoverUrl?.trim() || "",
                    },
                  })
                }
              />
            ))}
          </>
        )}
      </main>
    </div>
  );
};

export default SongListPage;
