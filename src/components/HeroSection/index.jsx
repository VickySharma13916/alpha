import React from "react";
import "./HeroSection.css";

const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="aurora-bg">
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
      </div>
      <div className="hero-content">
        <h1>Agency.</h1>
        <p>Redefining Excellence.</p>
      </div>
    </section>
  );
};

export default HeroSection;
