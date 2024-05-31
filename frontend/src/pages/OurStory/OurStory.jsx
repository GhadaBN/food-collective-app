import React from "react";
import "./OurStory.css";
import { assets } from "../../assets/assets";

const OurStory = () => {
  return (
    <div className="sections-wrapper">
      <div className="left-container">
        <h1 className="title">OUR MISSION</h1>
        <div className="image-container">
          <img className="responsive-image" src={assets.our_story_img} />
        </div>
        <p className="description">Our Collective</p>
      </div>
      <div className="right-container">
        <div className="menu-wrapper"></div>
        <div className="text"></div>
      </div>
    </div>
  );
};

export default OurStory;
