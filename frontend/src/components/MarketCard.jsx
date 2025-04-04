import React from "react";
import "../css/MarketCard.css";
import { formatURL } from "../formatURL";

const MarketCard = ({ name, image }) => {
  const link = `/markets/${formatURL(name)}`;

  return (
    <a href={link} className="market-card-link">
      <div className="market-card">
        <img className="market-image" src={image} alt={name} />
        <div className="market-info">
          <h1 className="market-name">{name}</h1>
        </div>
      </div>
    </a>
  );
};

export default MarketCard;
