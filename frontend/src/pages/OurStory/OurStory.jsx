import React from "react";
import "./OurStory.css";
import { assets } from "../../assets/assets";

const OurStory = () => {
  return (
    <div className="sections-wrapper">
      <div className="left-container">
        <h1 className="title">OUR MISSION</h1>
        <div className="photo-container">
          <img className="responsive-image" src={assets.our_story} />
        </div>
      </div>
      <div className="right-container-collective">
        <div className="text-wrapper">
          <p className="text-collective">
            We are a passionate group dedicated to revolutionizing the way you
            experience food delivery. Our story is rooted in a commitment to
            sustainability, community, and equality.
          </p>
          <p className="text-collective">
            Our collective is built on the principal of flat hierarchy which
            fosters collaboration and shared responsibility, ensuring everyone's
            voice is valued.
          </p>
          <p className="text-collective">
            By choosing pedal power over fossil fuels, we minimize our
            environmental impact and contribute to cleaner, greener streets.
          </p>
          <p className="text-collective">
            We thrive on connections with our customers, partners, and each
            other, believing in giving back and supporting local initiatives
            that align with our mission. Together, we aim to deliver delicious
            meals while making a positive impact on our community and the
            environment.
          </p>
        </div>
      </div>
    </div>
  );
};

export default OurStory;
