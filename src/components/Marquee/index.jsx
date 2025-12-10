import React from "react";
import "./Marquee.css";

const logos1 = [
  "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
  //   "https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg",
  "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
];

const logos2 = [
  "https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/1/1b/Citi.svg",
];

const LogoItem = ({ src }) => (
  <div className="logo-item">
    <img src={src} alt="logo" />
  </div>
);

const MarqueeRow = ({ logos, direction }) => {
  const repeated = [...logos, ...logos, ...logos, ...logos];
  return (
    <div className={`marquee-track ${direction}`}>
      <div className="marquee-content">
        {repeated.map((src, i) => (
          <LogoItem key={i} src={src} />
        ))}
      </div>
      <div className="marquee-content">
        {repeated.map((src, i) => (
          <LogoItem key={`d-${i}`} src={src} />
        ))}
      </div>
    </div>
  );
};

const Marquee = () => {
  return (
    <section className="marquee-section">
      <div className="marquee-bg-text">
        <span>TRUSTED</span>
        <span>PARTNERS</span>
      </div>
      <div className="marquee-container">
        <div className="marquee-strip strip-top">
          <MarqueeRow logos={logos1} direction="left" />
        </div>
        <div className="marquee-strip strip-bottom">
          <MarqueeRow logos={logos2} direction="right" />
        </div>
      </div>
    </section>
  );
};

export default Marquee;
