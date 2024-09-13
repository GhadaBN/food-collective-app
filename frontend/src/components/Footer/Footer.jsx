import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-links">
          <ul>
            <li>
              <a
                href="https://github.com/GhadaBN/food-collective-app"
                target="_blank"
                rel="noopener noreferrer"
              >
                Github
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/ghadabennasr-web-developer-designer/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Linkedin
              </a>
            </li>
            <li>
              <Link to="/our-story">About us</Link>
            </li>
          </ul>
          <hr className="footer-hr" />
        </div>
        <p className="footer-button">Contact us</p>
      </div>
    </div>
  );
}

export default Footer;
