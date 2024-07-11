import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-links">
          <ul>
            <li>Github</li>
            <li>Linkedin</li>
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
