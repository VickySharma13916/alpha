import React from "react";
import "./HeroSection.css";

import AnimatedText from "../ui/AnimatedText";

const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="aurora-bg">
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
      </div>
      <div className="hero-content">
        <AnimatedText tag="h1" type="scramble" delay={0.5}>
          Vicky.
        </AnimatedText>
        <AnimatedText tag="p" type="split" delay={1.5}>
          Redefining Excellence.
        </AnimatedText>
      </div>
    </section>
  );
};

export default HeroSection;
