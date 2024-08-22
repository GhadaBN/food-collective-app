import React from "react";
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
                LinkedIn
              </a>
            </li>
            <li>About us</li>
          </ul>
          <hr className="footer-hr" />
        </div>
        <p className="footer-button">Contact us</p>
      </div>
    </div>
  );
}

export default Footer;
