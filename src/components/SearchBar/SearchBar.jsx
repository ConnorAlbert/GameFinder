import React from "react";
import './searchbar.css';

const SearchBar = ({
  searchTerm,
  setSearchTerm,
  handleSearch,
  genres,
  selectedGenre,
  handleGenreChange,
}) => {
  return (
    <div className="search">
      <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search for games"
      />

      <div className="dropdown">
        <select
          value={selectedGenre}
          onChange={(event) => handleGenreChange(event)}
          className="dropdown-select"
        >
          {genres.map((genre) => (
            <option value={genre} key={genre}>
              {genre.charAt(0).toUpperCase() + genre.slice(1)}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SearchBar;