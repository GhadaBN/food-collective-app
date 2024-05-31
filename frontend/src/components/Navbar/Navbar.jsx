import React, { useState, useContext } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import { Link } from "react-router-dom";

function Navbar({ setShowLogin }) {
  const [menu, setMenu] = useState("home");
  const [showLogout, setShowLogout] = useState(false);
  const { getTotalCartAmount, isLoggedIn, setToken, setIsLoggedIn } =
    useContext(StoreContext);

  const handleLogout = () => {
    setToken("");
    setIsLoggedIn(false);
    setShowLogout(false);
  };

  return (
    <div className="navbar">
      <div className="logo">
        <Link to="/">
          <p className="logo">TOMATO</p>
          {/* <img src={assets.logo} alt="" className="logo" /> */}
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
            <img src={assets.basket_icon} className="basket-icon" alt="Cart" />
          </Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>
        {isLoggedIn ? (
          <div
            onClick={() => setShowLogout(!showLogout)}
            style={{ position: "relative" }}
          >
            <img src={assets.user_logged} className="user-icon" alt="User" />
            <div className={`logout-notification ${showLogout ? "show" : ""}`}>
              <p onClick={handleLogout}>Logout</p>
            </div>
          </div>
        ) : (
          <img
            onClick={() => setShowLogin(true)}
            src={assets.user_icon}
            className="user-icon"
            alt="User"
          />
        )}
      </div>
    </div>
  );
}

export default Navbar;
