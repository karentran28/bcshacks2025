import React from "react";
import "./SidebarMenu.css"; // Optional: create this for styles

interface SidebarMenuProps {
  selectedFilter: string;
  setSelectedFilter: (val: string) => void;
  searchQuery: string;
  setSearchQuery: (val: string) => void;
}

const SidebarMenu: React.FC<SidebarMenuProps> = ({
  selectedFilter,
  setSelectedFilter,
  searchQuery,
  setSearchQuery,
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
        onClick={() => setSelectedFilter("suggested")}
      >
        Suggested Songs
      </li>
      <li
        className={selectedFilter === "all" ? "active" : ""}
        onClick={() => setSelectedFilter("all")}
      >
        All Songs
      </li>
    </ul>
  </aside>
);

export default SidebarMenu;
