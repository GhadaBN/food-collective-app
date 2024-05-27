import React, { useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import { Link } from "react-router-dom";

function Navbar({ setShowLogin }) {
  const [menu, setMenu] = useState("home");

  return (
    <div className="navbar">
      <div className="logo">
        <Link to="/">
          <img src={assets.logo} alt="" className="logo" />
        </Link>
      </div>
      <ul className="navbar-menu">
        <li className={menu === "home" ? "active" : ""}>
          <Link to="/" onClick={() => setMenu("home")} className="nav-link">
            HOME
          </Link>
        </li>
        <li className={menu === "restaurants" ? "active" : ""}>
          <Link
            to="/restaurants"
            onClick={() => setMenu("restaurants")}
            className="nav-link"
          >
            RESTAURANTS
          </Link>
        </li>
        <li className={menu === "our-story" ? "active" : ""}>
          <Link
            to="/our-story"
            onClick={() => setMenu("our-story")}
            className="nav-link"
          >
            OUR STORY
          </Link>
        </li>
      </ul>
      <div className="navbar-right">
        <div className="basket-container">
          <Link to="/cart">
            <img src={assets.basket_icon} className="basket-icon" />
          </Link>
          <div className="dot"></div>
        </div>
        <img
          onClick={() => setShowLogin(true)}
          src={assets.user_icon}
          className="user-icon"
        />
      </div>
    </div>
  );
}

export default Navbar;
