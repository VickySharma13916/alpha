import React, { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import "./HybridGallery.css";

gsap.registerPlugin(ScrollTrigger);

const data = [
  {
    id: "section-design",
    label: "DESIGN",
    title: "Visual Systems",
    description: "Aesthetic engineering for brands.",
    cards: [
      {
        title: "UI Components",
        img: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=2000&auto=format&fit=crop",
      },
      {
        title: "Brand Identity",
        img: "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2000&auto=format&fit=crop",
      },
      {
        title: "UI Components",
        img: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=2000&auto=format&fit=crop",
      },
    ],
  },
  {
    id: "section-dev",
    label: "DEVELOPMENT",
    title: "Tech Architecture",
    description: "Robust, scalable solutions.",
    cards: [
      {
        title: "React Ecosystem",
        img: "https://images.unsplash.com/photo-1605379399642-870262d3d051?q=80&w=2000&auto=format&fit=crop",
      },
      {
        title: "UI Components",
        img: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=2000&auto=format&fit=crop",
      },
      {
        title: "UI Components",
        img: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=2000&auto=format&fit=crop",
      },
    ],
  },
  {
    id: "section-marketing",
    label: "MARKETING",
    title: "Global Growth",
    description: "Data-driven campaigns.",
    cards: [
      {
        title: "SEO Strategy",
        img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2000&auto=format&fit=crop",
      },
      {
        title: "UI Components",
        img: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=2000&auto=format&fit=crop",
      },
      {
        title: "UI Components",
        img: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=2000&auto=format&fit=crop",
      },
    ],
  },
];

const HybridSection = ({ section, index, setActiveTab }) => {
  const containerRef = useRef(null);
  const trackRef = useRef(null);

  useGSAP(
    () => {
      const track = trackRef.current;

      const getScrollAmount = () => {
        return track.scrollWidth - window.innerWidth;
      };

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: () => `+=${Math.max(getScrollAmount(), 0) * 2}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          onEnter: () => setActiveTab(section.id),
          onEnterBack: () => setActiveTab(section.id),
        },
      });

      tl.to(track, {
        x: () => -Math.max(getScrollAmount(), 0),
        ease: "none",
      });
    },
    { scope: containerRef }
  );

  return (
    <div
      id={section.id}
      className="hybrid-section-wrapper"
      ref={containerRef}
      style={{ zIndex: index + 1 }}
    >
      <div className="hybrid-track" ref={trackRef}>
        <div className="hybrid-intro-slide">
          <div className="intro-content">
            <span className="hybrid-number">0{index + 1}</span>
            <h2>{section.title}</h2>
            <p>{section.description}</p>
          </div>
        </div>

        {section.cards.map((card, i) => (
          <div key={i} className="hybrid-card-slide">
            <div className="hybrid-card">
              <div className="h-img-wrap">
                <img src={card.img} alt={card.title} />
              </div>
              <div className="hybrid-card-overlay">
                <h3>{card.title}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const HybridGallery = () => {
  const [activeTab, setActiveTab] = useState(data[0].id);
  const navRef = useRef(null);
  const galleryRef = useRef(null);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  useGSAP(
    () => {
      ScrollTrigger.create({
        trigger: galleryRef.current,
        start: "top center",
        end: "bottom center",
        onEnter: () =>
          gsap.to(navRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
          }),
        onLeave: () =>
          gsap.to(navRef.current, {
            opacity: 0,
            y: -20,
            duration: 0.5,
            ease: "power2.out",
          }),
        onEnterBack: () =>
          gsap.to(navRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
          }),
        onLeaveBack: () =>
          gsap.to(navRef.current, {
            opacity: 0,
            y: -20,
            duration: 0.5,
            ease: "power2.out",
          }),
      });
    },
    { scope: galleryRef }
  );

  return (
    <div className="hybrid-gallery-container" ref={galleryRef}>
      <nav className="hybrid-top-nav" ref={navRef}>
        {data.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            className={`hybrid-pill ${activeTab === item.id ? "active" : ""}`}
          >
            {activeTab === item.id && <span className="pill-dot"></span>}
            {item.label}
          </button>
        ))}
      </nav>

      {data.map((section, index) => (
        <HybridSection
          key={section.id}
          section={section}
          index={index}
          setActiveTab={setActiveTab}
        />
      ))}
    </div>
  );
};

export default HybridGallery;
