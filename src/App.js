import React, { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar/SearchBar";
import GameList from "./components/GameList/GameList";
import "./App.css";
import axios from 'axios';


const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    searchGames();
  }, [selectedGenre, searchTerm]);

  const searchGames = async () => {
    setLoading(true);
    setError(null);
  
    let url = "https://free-to-play-games-database.p.rapidapi.com/api/games";
    if (selectedGenre !== "all") {
      url += `?category=${selectedGenre}`;
    }
  
    const options = {
      url,
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "e940ce013cmsh4dedc84e941c490p1fdaa8jsn48776e4b9675",
        "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
      },
    };
  
    try {
      const response = await axios(options);
  
      if (response.status === 200) {
        const data = response.data;
        let filteredData = data;
        if (searchTerm) {
          filteredData = data.filter((game) =>
            game.title.toLowerCase().includes(searchTerm.toLowerCase())
          );
        }
        setGames(filteredData);
      } else {
        setError("Something went wrong. Please try again later.");
      }
    } catch (error) {
      setError("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    searchGames();
  };

  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value);
  };

  // List of genres for the dropdown
  const genres = [
    "all",
    "shooter",
    "strategy",
    "sports",
    "racing",
    "mmo",
    "moba",
    "fighting",
    "action",
  ];

  return (
    <div className={`app ${selectedGenre}`}>
      <h1>F2P Games</h1>

      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedGenre={selectedGenre}
        handleGenreChange={handleGenreChange}
        genres={genres}
      />

      {loading && (
        <div className="loading">
          <p>Loading...</p>
        </div>
      )}

      {error && (
        <div className="error">
          <p>{error}</p>
        </div>
      )}

      {!loading && !error && games?.length > 0 ? (
        <GameList games={games} selectedGenre={selectedGenre} />
      ) : (
        <div className="empty">
          {!loading && <h2>No games found</h2>}
        </div>
      )}
    </div>
  );
};

export default App;