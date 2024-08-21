// src/PopupNote.js
import React, { useState, useEffect } from "react";
import "./PopUpNote.css";
import { assets } from "../../assets/assets";

const PopupNote = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show the pop-up only if it hasn't been dismissed in the current session
    const hasSeenPopup = sessionStorage.getItem("hasSeenPopup");
    if (!hasSeenPopup) {
      setIsVisible(true);
    }
  }, []);

  const closePopup = () => {
    setIsVisible(false);
    sessionStorage.setItem("hasSeenPopup", "true"); // Store in session storage to prevent showing again in the same session
  };

  return (
    isVisible && (
      <div className="popup">
        <div className="popup-content">
          <img
            onClick={closePopup}
            src={assets.cross_icon}
            alt="close"
            className="close-button"
          />
          <p>
            Note: Our server is hosted on Render's free tier. This means the
            server may take up to 50 seconds to respond after a period of
            inactivity. Please be patient while we fetch your data. Thank you
            for your understanding!
          </p>
        </div>
      </div>
    )
  );
};

export default PopupNote;
