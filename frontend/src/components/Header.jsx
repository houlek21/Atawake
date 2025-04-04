import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Header.css";

import logo from "../assets/logo.svg";
import shopIcon from "../assets/icons/shop.svg";
import favoriteIcon from "../assets/icons/favorite.svg";
import cartIcon from "../assets/icons/cart.svg";
import profile from "../assets/icons/profile.svg";
import SearchBar from "./SearchBar";

import icc1 from "../assets/Header/1.svg";
import icc2 from "../assets/Header/2.svg";
import icc3 from "../assets/Header/3.png";
import icc4 from "../assets/Header/4.png";

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


    //account hover and name
    let lo = localStorage.getItem('token');
    
    if (lo == null) {
      
    }
    else {
      let to = JSON.parse(atob(lo.split(".")[1]));
      if (Date.now() / 1000 <= to.exp) {
      
      var pop = document.getElementById("accp");
      pop.style.setProperty('--profileacp-visibility', 'visible');
      
      loggedin(to)
      
    }
  }
      

    //document.getElementById("login").style.visibility = "visible"; 
    //console.log(pop.classList)
  }, []);

  const handleCategoryClick = (categoryId, categoryName) => {
    navigate(`/category/${categoryId}`, {
      state: { categoryName },
    });
  };

  return (
    <nav id="header" className="navbar">
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
        <div id="log" onClick={accPop} className="login">


        <div className="profileacp" id="accp">
            <div className="rectangle-155acppop"></div>
            <div className="ellipse-35pop">
            <img className="profimpop" src={icc1}></img>
            </div>
            <div id="popname" className="emily-carterpop">User</div>
            <a href="/dashboard" className="view-your-profilepop">View your profile</a>
            <div className="group-112pop">
              <img className="icons-8-settings-50-1pop" src={icc3} />
              <a href="/setting" className="account-settingpop">Account setting</a>
            </div>
            <div className="group-111pop">
              <img className="image-16pop" src={icc2} />
              <div className="sellpop">Sell</div>
            </div>
            <div className="line-45pop"></div>
            <div className="group-113pop">
              <div onClick={signout} className="sign-outpop">Sign out</div>
              <img className="image-17pop" src={icc4} />
            </div>
          </div>




          <img src={profile} alt="profile" className="icon" />
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
  }
  else {
    let to = JSON.parse(atob(lo.split(".")[1]));

    if (Date.now() / 1000 >= to.exp) {
      window.location.href = "http://localhost:5173/login"
    }

    window.location.href = "http://localhost:5173/dashboard"
  }
    
}



async function accPop1() {
  let lo = localStorage.getItem('token');
  var pop = document.getElementById("accp");
  console.log(pop.classList)
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
  console.log(pop.classList)
  pop.classList.toggle("show");
}



async function signout() {
  localStorage.removeItem('token')
}


async function loggedin(to) {
      
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
        console.log('sefse')
        const resjson = await response.json();

        if (!response.ok) {

          throw new Error(`Response status: ${response}`);
        }
      //document.getElementById("login").innerHTML = resjson.first_name
      document.getElementById("popname").innerHTML = resjson.first_name
      document.getElementById("login").href = "/dashboard"
        

      } catch (error) {
        console.error(error.message);
      }

    }
  
