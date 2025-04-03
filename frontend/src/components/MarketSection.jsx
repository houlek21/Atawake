import React from "react";
import MarketCard from "./MarketCard";
import "../css/MarketSection.css";

const MarketSection = () => {
  const markets = [
    { name: "City Market", image: "Markets/CityMarket.png" },
    { name: "Holiday Market", image: "Markets/HolidayMarket.png" },
    { name: "Spirit of the Land", image: "Markets/TownSquareMarket.png" },
    { name: "Heritage Market", image: "Markets/VillageMarket.png" },
  ];

  return (
    <section className="markets-section">
      <h2 className="markets-title">Discover community markets</h2>
      <div className="markets-grid">
        {markets.map((market, index) => (
          <MarketCard key={index} name={market.name} image={market.image} />
        ))}
      </div>
    </section>
  );
};

export default MarketSection;
