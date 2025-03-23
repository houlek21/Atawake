import React, { useRef } from "react";
import MarketCard from "./MarketCard";
import "../css/MarketSection.css";

const MarketSection = () => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const markets = [
    { name: "City Market", image: "Markets/CityMarket.png" },
    { name: "Holiday Market", image: "Markets/HolidayMarket.png" },
    { name: "The Village Market", image: "Markets/VillageMarket.png" },
    { name: "Town Square Market", image: "Markets/TownSquareMarket.png" },
  ];

  return (
    <section className="markets-section">
      <h2 className="markets-title">Discover community markets</h2>
      <div className="scroll-wrapper">
        <button className="scroll-btn left" onClick={() => scroll("left")}>
          ‹
        </button>
        <div className="markets-scroll" ref={scrollRef}>
          {markets.map((market, index) => (
            <MarketCard
              key={index}
              name={market.name}
              image={market.image}
            />
          ))}
        </div>
        <button className="scroll-btn right" onClick={() => scroll("right")}>
          ›
        </button>
      </div>
    </section>
  );
};

export default MarketSection;
