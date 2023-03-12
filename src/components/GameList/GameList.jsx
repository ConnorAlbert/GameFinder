import React from "react";
import './gamelist.css';
import GameCard from '../GameCard/GameCard.jsx';

const GameList = ({ loading, error, games, selectedGenre }) => {
  return (
    <>
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
        <div className={`container ${selectedGenre}`}>
          {games.map((game) => (
            <GameCard game={game} key={game.id} />
          ))}
        </div>
      ) : (
        <div className="empty">
          {!loading && <h2>No games found</h2>}
        </div>
      )}
    </>
  );
};

export default GameList;
