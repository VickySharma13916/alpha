import "./App.css";

import AlternatingSection from "./components/AlternatingSection";
import Cursor from "./components/Cursor";
import FlyCard from "./components/FlyCard";
import HeroSection from "./components/HeroSection";
import HorizontalGallery from "./components/HorizontalGallery";
import HybridGallery from "./components/HybridGallery";
import Marquee from "./components/Marquee";
import Stack from "./components/Stack";

const App = () => {
  return (
    <div className="main-wrapper">
      <Cursor />
      <HeroSection />
      <Stack />
      <Marquee />
      <FlyCard />
      <HybridGallery />
      <AlternatingSection />
      <HorizontalGallery />
      <Marquee />

      <section className="footer">
        <h2>Let's Work Together</h2>
      </section>
    </div>
  );
};

export default App;
