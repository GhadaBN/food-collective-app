import React from "react";
import "./Header.css";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="header">
      <div className="header-content">
        <div className="img-container">
          <img src="/header_text.png" className="header-img" />
        </div>

        <img src={assets.sticker_hot} className="hot-sticker" />
        <img src={assets.heart_sticker} className="heart-sticker" />
        <Link to="/restaurants" className="header-button">
          Explore Restaurants
        </Link>
      </div>
    </div>
  );
}

export default Header;
