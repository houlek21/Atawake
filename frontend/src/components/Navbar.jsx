import React from "react";
import "../css/Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <a href="/" className="logo">
          Atawake
        </a>
        <i className="fas fa-bars menu-icon"></i>
        <span>Shop</span>
      </div>

      <div className="search-container">
        <i className="fas fa-search"></i>
        <input type="text" placeholder="Search" />
      </div>

      <div className="navbar-right">
        <a href="/login">Log in</a>
        <i className="far fa-heart"></i>
        <i className="fas fa-shopping-cart"></i>
      </div>
    </nav>
  );
};

export default Navbar;
