import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Header.css";

const Header = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      setQuery(""); // Clear input after navigation (optional)
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <a href="/" className="logo">
          Atawake
        </a>
        <i className="fas fa-bars menu-icon"></i>
        <span>Shop</span>
      </div>

      <form className="search-container" onSubmit={handleSearchSubmit}>
        <i className="fas fa-search"></i>
        <input
          type="text"
          placeholder="Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-input"
        />
      </form>

      <div className="navbar-right">
        <a href="/login">Log in</a>
        <i className="far fa-heart"></i>
        <i className="fas fa-shopping-cart"></i>
      </div>
    </nav>
  );
};

export default Header;
