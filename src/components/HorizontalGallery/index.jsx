import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useGSAP } from "@gsap/react";
import "./HorizontalGallery.css";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const galleryData = [
  {
    id: "tab1",
    title: "DESIGN",
    description: "Crafting visual systems.",
    cards: [
      {
        title: "UI Components",
        tag: "System",
        img: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=2000&auto=format&fit=crop",
      },
      {
        title: "Brand Guidelines",
        tag: "Identity",
        img: "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2000&auto=format&fit=crop",
      },
    ],
  },
  {
    id: "tab2",
    title: "DEVELOPMENT",
    description: "Building scalable tech.",
    cards: [
      {
        title: "React Architecture",
        tag: "Frontend",
        img: "https://images.unsplash.com/photo-1605379399642-870262d3d051?q=80&w=2000&auto=format&fit=crop",
      },
    ],
  },
  {
    id: "tab3",
    title: "MARKETING",
    description: "Driving global growth.",
    cards: [
      {
        title: "SEO Strategy",
        tag: "Search",
        img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2000&auto=format&fit=crop",
      },
    ],
  },
];

const HorizontalGallery = () => {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const triggerRef = useRef(null);

  useGSAP(
    () => {
      const track = trackRef.current;

      const getScrollAmount = () => track.scrollWidth - window.innerWidth;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: () => `+=${getScrollAmount()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.to(track, {
        x: () => -getScrollAmount(),
        ease: "none",
      });

      triggerRef.current = tl.scrollTrigger;
    },
    { scope: containerRef }
  );

  const handleTabClick = (index) => {
    const st = triggerRef.current;
    if (!st || !trackRef.current) return;

    const section = trackRef.current.children[index];
    if (!section) return;

    const offset = section.offsetLeft;
    const maxScroll = trackRef.current.scrollWidth - window.innerWidth;

    const clampedOffset = Math.min(offset, maxScroll);
    const targetScroll = st.start + clampedOffset;

    gsap.to(window, {
      scrollTo: targetScroll,
      duration: 1,
      ease: "power2.inOut",
    });
  };

  return (
    <section className="h-gallery-section" ref={containerRef}>
      <div className="h-header">
        <div className="h-tabs">
          {galleryData.map((tab, index) => (
            <div
              key={tab.id}
              className="h-pill"
              onClick={() => handleTabClick(index)}
              style={{ cursor: "pointer" }}
            >
              <span className="h-dot"></span>
              {tab.title}
            </div>
          ))}
        </div>
      </div>

      <div className="h-track" ref={trackRef}>
        {galleryData.map((section) => (
          <div key={section.id} className="h-page">
            <div className="h-page-info">
              <h2>{section.title}</h2>
              <p>{section.description}</p>
            </div>

            <div
              className={`h-cards-container ${
                section.cards.length === 1 ? "single-mode" : ""
              }`}
            >
              {section.cards.map((card, i) => (
                <div key={i} className="h-card">
                  <div className="h-card-inner">
                    <div className="h-card-img">
                      <img src={card.img} alt={card.title} />
                    </div>
                    <div className="h-card-overlay">
                      <span className="h-tag">{card.tag}</span>
                      <h3>{card.title}</h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HorizontalGallery;
