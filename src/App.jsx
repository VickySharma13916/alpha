import Cursor from "./components/Cursor";
import FlyCard from "./components/FlyCard";
import HeroSection from "./components/HeroSection";
import Marquee from "./components/Marquee";
import Stack from "./components/Stack";
import AlternatingSection from "./components/AlternatingSection";

import "./App.css";

const App = () => {
  return (
    <div className="main-wrapper">
      <Cursor />
      <HeroSection />
      <Stack />
      <Marquee />
      <FlyCard />
      <AlternatingSection />
      <Marquee />

      {/* Simple Footer inline for brevity, or make a component */}
      <section
        className="footer"
        style={{
          height: "50vh",
          background: "#000",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h2>Let's Work Together</h2>
      </section>
    </div>
  );
};

export default App;
