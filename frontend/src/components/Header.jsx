import React from "react";
import "../css/Header.css";

//onClick={() => catSel(6)}

const Header = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <a href="/" className="logo">
          Atawake
        </a>
        <i className="fas fa-bars menu-icon">popup

          <span className="categorypopup"> Shop Categories:
            <a href="http://localhost:5173/buy/jewelry">
              <div className="categoryname">Jewelry and Accessories</div></a>
            <a href="http://localhost:5173/buy/clothing">
              <div className="categoryname" >Clothing and Textiles</div></a>
            <a href="http://localhost:5173/buy/sculpture">
              <div className="categoryname" >Carvings and Sculptures</div></a>
            <a href="http://localhost:5173/buy/home">
              <div className="categoryname" >Home Decor</div></a>
            <a href="http://localhost:5173/buy/pottery">
              <div className="categoryname" >Pottery & Ceramics</div></a>
            <a href="http://localhost:5173/buy/beadwork">
              <div className="categoryname" >Beadwork & Quillwork</div></a>

          </span>
        </i>

        <a href="http://localhost:5173/buy">
          <span>Shop</span>
        </a>
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

export default Header;



