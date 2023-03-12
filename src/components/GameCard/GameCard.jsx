import React from "react";
import './gamecard.css';

const GameCard = ({
  game: { id, title, thumbnail, short_description, genre, freetogame_profile_url },
}) => {
  const openGameLink = () => {
    window.open(freetogame_profile_url, "_blank");
  };

  return (
    <div className="game" key={id}>
      <div>
        <img
          src={thumbnail}
          alt={title}
          style={{ textDecoration: "none", cursor: "pointer" }}
          onClick={openGameLink}
        />
      </div>

      <div>
        <h3>{title}</h3>
        <p>Genre: {genre}</p>
        <p>{short_description}</p>
      </div>
    </div>
  );
};

export default GameCard;