import React from "react";
import "./Header.css";
import { assets } from "../../assets/assets";

function Header() {
  return (
    <div className="header">
      <div className="header-content">
        <div className="img-container">
          <img src={assets.sticker_hot} className="sticker" />
          <img src="/header_text.png" className="header-img" />
        </div>
        <button>view Menu</button>
      </div>
    </div>
  );
}

export default Header;
