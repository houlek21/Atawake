import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Header.css";

import logo from "../assets/logo.svg";
import shopIcon from "../assets/icons/shop.svg";
import favoriteIcon from "../assets/icons/favorite.svg";
import cartIcon from "../assets/icons/cart.svg";
import SearchBar from "./SearchBar";

import icc1 from "../assets/Header/1.svg";
import icc2 from "../assets/Header/2.svg";
import icc3 from "../assets/Header/3.png";
import icc4 from "../assets/Header/4.png";

const Header = () => {
  const navigate = useNavigate();
  const initialized = useRef(false)//for 1 useeffect from strictmode

  const handleSearch = (query) => {
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true
      loggedin()
    }
  });

  return (
    <nav className="navbar" id="header">
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


        <div onClick={accPop} id="log" className="login">
          <div id="login">login</div>
          <div className="profileacp" id="accp">
            <div className="rectangle-155acp"></div>
            <div className="ellipse-35">
            <img className="profim" src={icc1}></img>
            </div>
            <div id="popname" className="emily-carter">login</div>
            <a href="/dashboard" className="view-your-profile">View your profile</a>
            <div className="group-112">
              <img className="icons-8-settings-50-1" src={icc3} />
              <a href="/setting" className="account-setting">Account setting</a>
            </div>
            <div className="group-111">
              <img className="image-16" src={icc2} />
              <div className="sell">Sell</div>
            </div>
            <div className="line-45"></div>
            <div className="group-113">
              <div onClick={signout} className="sign-out">Sign out</div>
              <img className="image-17" src={icc4} />
            </div>
          </div>


        </div>

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

async function accPop() {

  let lo = localStorage.getItem('token');
  if (lo == null) {
    window.location.href = "http://localhost:5173/login"
    console.log("no token");
    return
  }
  else {
    let to = JSON.parse(atob(lo.split(".")[1]));

    if (Date.now() / 1000 >= to.exp) {
      window.location.href = "http://localhost:5173/login"
      return
    }
  }
    
  var pop = document.getElementById("accp");
  console.log(pop)
  pop.classList.toggle("show");
}


async function signout() {
  localStorage.removeItem('token')
}


async function loggedin() {
  let lo = localStorage.getItem('token');
  if (lo == null) {
    
    console.log("no token");  
  }
  else {
    let to = JSON.parse(atob(lo.split(".")[1]));
  
    if (Date.now() / 1000 >= to.exp) {
      return
    }
    else {
      console.log(to.id)

      try {
        var url = "http://localhost:5000/api/users/" + to.id;
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
          } 
        });

        const resjson = await response.json();

        if (!response.ok) {

          throw new Error(`Response status: ${response}`);
        }
      document.getElementById("login").innerHTML = resjson.first_name
      document.getElementById("popname").innerHTML = resjson.first_name
      document.getElementById("login").href = "/dashboard"
        

      } catch (error) {
        console.error(error.message);
      }

    }
  }
}

