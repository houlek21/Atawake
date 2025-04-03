import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/Header.css";

import logo from "../assets/logo.svg";
import shopIcon from "../assets/icons/shop.svg";
import favoriteIcon from "../assets/icons/favorite.svg";
import cartIcon from "../assets/icons/cart.svg";
import profile from "../assets/icons/profile.svg";
import SearchBar from "./SearchBar";

const Header = () => {
  const navigate = useNavigate();

  const handleSearch = (query) => {
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <a href="/" className="logo-link">
          <img src={logo} alt="Logo" className="logo" />
        </a>

        <div className="shop-button">
          <img src={shopIcon} alt="Shop" className="shop-icon" />
          <span className="shop-text">Shop</span>

          <div className="dropdown-menu">
            <a href="/buy/all">All</a>
            <a href="/buy/popular">Popular Categories</a>
            <a href="/buy/favorites">Atawake Favorites</a>
            <a href="/buy/custom">Custom Orders</a>
            <a href="/buy/ready">Ready for You</a>
            <a href="/buy/handmade">Handmade Items</a>
            <a href="/buy/artists">Shop by Artists</a>
          </div>
        </div>
        <SearchBar onSearch={handleSearch} />
      </div>

      <div className="navbar-right">
        <a href="/login" className="login">
          <img src={profile} alt="profile" className="icon" />
        </a>
        <a href="/favorites">
          <img src={favoriteIcon} alt="Favorites" className="icon" />
        </a>
        <a href="/cart">
          <img src={cartIcon} alt="Cart" className="icon" />
        </a>
      </div>
    </nav>
  );
};

export default Header;
