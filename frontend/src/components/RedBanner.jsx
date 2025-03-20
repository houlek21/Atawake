import React from "react";
import "../css/RedBanner.css";
import RedButton from "./RedButton";

function RedBanner() {
  return (
    <div className="banner">
      <div className="banner-text">
        <h2>Your Vision, Their Craft</h2>
        <p>
          Work with Indigenous artisans to create a custom, one-of-a-kind piece
          made just for you.
        </p>
      </div>
      <RedButton
        text="Browse Custom Goods"
        style={{
          border: "1px solid white",
          color: "white",
        }}
      />
    </div>
  );
}

export default RedBanner;
