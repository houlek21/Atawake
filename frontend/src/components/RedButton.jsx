import React from "react";
import "../css/RedButton.css";

const RedButton = ({ text }) => {
  const handleClick = () => {
    alert("Button clicked!");
    // Replace with link to page
    // window.location.href = "/handmade-items";
  };

  return (
    <button className="red-button" onClick={handleClick}>
      {text}
    </button>
  );
};

export default RedButton;
