import React, { useRef } from "react";
import "./AlternatingSection.css";
import AnimatedText from "../ui/AnimatedText";

const sectionData = [
  {
    id: 1,
    eyebrow: "Production",
    splitText: "BRUNSOHN",
    title: "DIGITAL VIDEO STUDIO.",
    text: "We craft bold, modern visuals that define your brand. Our strategies align with your long-term goals and market opportunities.",
    img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 2,
    eyebrow: "Identity",
    splitText: "IDENTITY",
    title: "DESIGN THAT RESONATES.",
    text: "From logos to design systems, we build visual identities that connect with your audience and stand the test of time.",
    img: "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2000&auto=format&fit=crop",
  },
  {
    id: 3,
    eyebrow: "Experience",
    splitText: "DIGITAL",
    title: "IMMERSIVE WEB.",
    text: "We create websites and applications that are not only beautiful but also intuitive, fast, and performance-driven.",
    img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 4,
    eyebrow: "Growth",
    splitText: "GLOBAL",
    title: "DATA DRIVEN.",
    text: "Marketing campaigns that drive real engagement across borders. We tell your story through compelling content.",
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop",
  },
];

const AlternatingSection = () => {
  const container = useRef(null);

  // Note: We removed the GSAP Pinning logic here because CSS 'position: sticky'
  // handles the stacking effect much smoother for this specific layout.

  return (
    <section className="alternating-section" ref={container}>
      {sectionData.map((item, index) => {
        // Calculate if this is an even row (0, 2, 4...)
        const isEven = index % 2 === 0;

        return (
          <div
            key={item.id}
            className={`alt-row ${isEven ? "row-normal" : "row-reversed"}`}
            style={{ zIndex: index + 1 }} // Ensure proper stacking order
          >
            {/* GIANT OVERLAY TEXT */}
            <div className="split-text-container">
              <AnimatedText tag="h1" className="split-text" type="split">
                {item.splitText}
              </AnimatedText>
            </div>

            {/* TEXT COLUMN */}
            <div className="alt-col text-col">
              <div className="alt-content">
                <span className="eyebrow">{item.eyebrow}</span>
                <AnimatedText tag="h3" type="split">
                  {item.title}
                </AnimatedText>
                <AnimatedText tag="p" type="split">
                  {item.text}
                </AnimatedText>
                <button className="alt-btn">See Our Work</button>
              </div>
            </div>

            {/* IMAGE COLUMN */}
            <div className="alt-col img-col">
              <div className="alt-img-wrapper">
                <img src={item.img} alt={item.title} />
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default AlternatingSection;
