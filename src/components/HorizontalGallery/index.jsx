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
    // FIRST TAB: 2 CARDS
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
    // SECOND TAB: 1 CARD
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
    // THIRD TAB: 1 CARD
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

      // Function to calculate exactly how far we need to move left
      // Total Width of Content - Viewport Width
      const getScrollAmount = () => track.scrollWidth - window.innerWidth;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          // This ensures the vertical scroll distance matches the horizontal movement exactly
          // It pins the section until the horizontal scroll is 100% complete
          end: () => `+=${getScrollAmount()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true, // Recalculates on resize
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

    // Calculate the target scroll position based on the section's offset
    const section = trackRef.current.children[index];
    if (!section) return;

    const offset = section.offsetLeft;
    const maxScroll = trackRef.current.scrollWidth - window.innerWidth;

    // Clamp the offset to ensure we don't try to scroll past the end
    // (useful if the last section doesn't fully fill the viewport width remaining)
    const clampedOffset = Math.min(offset, maxScroll);

    // st.start represents 0 horizontal scroll
    // st.end represents max horizontal scroll
    // The mapping is 1:1 because of how the timeline is set up
    const targetScroll = st.start + clampedOffset;

    gsap.to(window, {
      scrollTo: targetScroll,
      duration: 1,
      ease: "power2.inOut",
    });
  };

  return (
    <section className="h-gallery-section" ref={containerRef}>
      {/* HEADER */}
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

      {/* TRACK */}
      <div className="h-track" ref={trackRef}>
        {galleryData.map((section) => (
          <div key={section.id} className="h-page">
            {/* TEXT INFO */}
            <div className="h-page-info">
              <h2>{section.title}</h2>
              <p>{section.description}</p>
            </div>

            {/* CARDS CONTAINER */}
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
