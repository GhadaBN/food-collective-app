import React, { useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";

function Navbar() {
  const [menu, setMenu] = useState("home");
  return (
    <div className="navbar">
      <div className="logo">Logo</div>
      <ul className="navbar-menu">
        <li
          onClick={() => setMenu("home")}
          className={menu === "home" ? "active" : ""}
        >
          HOME
        </li>
        <li
          onClick={() => setMenu("restaurants")}
          className={menu === "restaurants" ? "active" : ""}
        >
          RESTAURANTS
        </li>
        <li
          onClick={() => setMenu("our-story")}
          className={menu === "our-story" ? "active" : ""}
        >
          OUR STORY
        </li>
      </ul>
      <div className="navbar-right">
        <div className="basket-container">
          <img src={assets.basket_icon} className="basket-icon" />
          <div className="dot"></div>
        </div>
        <img src={assets.user_icon} className="user-icon" />
      </div>
    </div>
  );
}

export default Navbar;
