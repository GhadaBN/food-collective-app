import React, { useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";

function Navbar({ setShowLogin }) {
  const [menu, setMenu] = useState("home");
  // const { token, setToken } = useContext(StoreContext);
  return (
    <div className="navbar">
      <div className="logo">
        <img src={assets.logo} alt="" className="logo" />
      </div>
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
