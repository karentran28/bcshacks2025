import React from "react";
import "./SidebarMenu.css";

// --- CHANGE 1: Updated the type to include "challenge" explicitly ---
interface SidebarMenuProps {
  selectedFilter: "suggested" | "all" | "challenge"; // Added "challenge"
  setSelectedFilter: (value: "suggested" | "all" | "challenge") => void; // Updated type
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  genres: string[];
  selectedGenre: string | null;
  setSelectedGenre: (value: string | null) => void;
}

const SidebarMenu: React.FC<SidebarMenuProps> = ({
  selectedFilter,
  setSelectedFilter,
  searchQuery,
  setSearchQuery,
  genres,
  selectedGenre,
  setSelectedGenre,
}) => (
  <aside className="sidebar">
    <input
      type="text"
      className="search-box"
      placeholder="Search songs"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
    />

    <ul className="menu">
      <li
        className={selectedFilter === "suggested" ? "active" : ""}
        onClick={() => {
          setSelectedFilter("suggested");
          setSelectedGenre(null);
        }}
      >
        Suggested Songs
      </li>
      <li
        className={selectedFilter === "all" && !selectedGenre ? "active" : ""}
        onClick={() => {
          setSelectedFilter("all");
          setSelectedGenre(null);
        }}
      >
        All Songs
      </li>
      {/* --- CHANGE 2: Added "Challenge Yourself" filter option --- */}
      <li
        className={selectedFilter === "challenge" ? "active" : ""}
        onClick={() => {
          setSelectedFilter("challenge");
          setSelectedGenre(null);
        }}
      >
        Challenge Yourself
      </li>
    </ul>

    {genres.length > 0 && (
      <>
        <h4 className="menu-section-title">Genres</h4>
        <ul className="menu">
          {genres.map((genre) => (
            <li
              key={genre}
              className={
                selectedFilter === "all" && selectedGenre === genre
                  ? "active"
                  : ""
              }
              onClick={() => {
                setSelectedFilter("all");
                setSelectedGenre(genre);
              }}
            >
              {genre}
            </li>
          ))}
        </ul>
      </>
    )}
  </aside>
);

export default SidebarMenu;