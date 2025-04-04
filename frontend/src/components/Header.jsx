import React, { useEffect, useState } from "react";
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
  const [categories, setCategories] = useState([]);

  const handleSearch = (query) => {
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/categories");
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (categoryId, categoryName) => {
    navigate(`/category/${categoryId}`, {
      state: { categoryName },
    });
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
            {categories.map((cat) => (
              <div
                key={cat.id}
                onClick={() => handleCategoryClick(cat.id, cat.category_name)}
                className="dropdown-link"
              >
                {cat.category_name}
              </div>
            ))}
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
