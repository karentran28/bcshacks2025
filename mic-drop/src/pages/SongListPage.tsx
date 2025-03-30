import React, { useState, useEffect } from "react";
import SongCard from "../components/SongCard";
import SidebarMenu from "../components/SideBarMenu";
import { supabase } from "../supabaseClient";
import "./SongListPage.css";

interface Song {
  title: string;
  artist: string;
  year: number;
  genre: string;
  // duration: duration;
  albumCoverUrl: string;
}

const SongListPage: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState("suggested");
  const [searchQuery, setSearchQuery] = useState("");
  const [allSongs, setAllSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSongs = async () => {
      if (selectedFilter === "all") {
        setLoading(true);
        const { data, error } = await supabase.from("Songs").select("*");

        console.log("Supabase Data:", data);
        console.log("Supabase Error:", error);

        if (error) {
          console.error("Error fetching songs:", error);
        } else {
          setAllSongs(data || []);
        }

        setLoading(false);
      }
    };

    fetchSongs();
  }, [selectedFilter]);

  const filteredSongs =
    selectedFilter === "suggested"
      ? allSongs.filter((song) => song.year > 2015)
      : allSongs.filter((song) =>
          song.title.toLowerCase().includes(searchQuery.toLowerCase())
        );

  return (
    <div className="song-list-page">
      <SidebarMenu
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <div className="divider" />

      <main className="song-list">
        {loading ? (
          <p>Loading songs...</p>
        ) : filteredSongs.length === 0 ? (
          <p>No songs found.</p>
        ) : (
          <>
            {/* Aligned label row */}
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
                // duration={song.duration}
                albumCoverUrl={song.albumCoverUrl?.trim() || ""}
                genre={song.genre}
                year={song.year}
                onClick={() => alert(`Selected: ${song.title}`)}
              />
            ))}
          </>
        )}
      </main>
    </div>
  );
};

export default SongListPage;
