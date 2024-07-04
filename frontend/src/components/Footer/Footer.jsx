import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";
import { assets } from "../../assets/assets";
function Footer() {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <p className="text-logo">Tomato Social Club</p>
          <div className="social-icons">
            <img src={assets.github_icon} />
            <img src={assets.linkedin_icon} />
          </div>
        </div>
        <div className="footer-content-center">
          <p>Company</p>
          <ul>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            {/* <li>Privacy policy</li> */}
          </ul>
        </div>
        <div className="footer-content-right">
          <p>Contact us</p>
          <ul>
            <li>contact@tomato.com</li>
            <li>phone number</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Footer;
