import React from "react";
import "../css/ArtistCard.css";

const ArtistCard = ({ name, location, image, link }) => {
  return (
    <a href={link} className="artist-card-link">
      <div className="artist-card">
        <img className="artist-image" src={image} alt={name} />
        <div className="artist-info">
          <h2 className="artist-name">{name}</h2>
          <p className="artist-location">{location}</p>
        </div>
      </div>
    </a>
  );
};

export default ArtistCard;
