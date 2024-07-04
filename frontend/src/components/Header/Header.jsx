import React from "react";
import "./Header.css";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="header">
      <div className="header-content">
        <div className="header-text-container">
          <p className="header-text">TOMATO SOCIAL</p>
          <p to="/restaurants" className="club-sticker">
            Club
          </p>
        </div>
        <img src={assets.sticker_hot} className="hot_sticker" />
        <img src={assets.heart_sticker} className="heart_sticker" />
        <Link to="/restaurants" className="header-button">
          Explore Restaurants
        </Link>
      </div>
    </div>
  );
}

export default Header;
