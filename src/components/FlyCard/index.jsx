import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import "./FlyCard.css";

gsap.registerPlugin(ScrollTrigger);

// Added more data to demonstrate the infinite loop
const flyData = [
  {
    id: 1,
    title: "Brand Elevate",
    badge: "Strategy",
    description:
      "Craft a signature identity that resonates. We build brands that stand the test of time and market shifts.",
    tags: ["Identity", "Positioning"],
    color: "linear-gradient(135deg, #6366f1 0%, #a855f7 100%)",
    img: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2670&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Visual Core",
    badge: "Design",
    description:
      "Stunning visuals that capture attention. From UI/UX to print, we design with purpose and precision.",
    tags: ["UI/UX", "Art Direction"],
    color: "linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)",
    img: "https://images.unsplash.com/photo-1626785774573-4b799314346d?q=80&w=2670&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Tech Forge",
    badge: "Development",
    description:
      "Robust, scalable solutions powered by modern stacks. We turn complex requirements into seamless code.",
    tags: ["React", "Node.js", "Cloud"],
    color: "linear-gradient(135deg, #10b981 0%, #3b82f6 100%)",
    img: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=2670&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Market Deep",
    badge: "Marketing",
    description:
      "Data-driven campaigns that convert. Reach your audience with precision targeting and compelling messaging.",
    tags: ["SEO", "Social", "Growth"],
    color: "linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)",
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
  },
  {
    id: 5,
    title: "Data Pulse",
    badge: "Analytics",
    description:
      "Unlock insights from your data. We help you make informed decisions based on real-time metrics.",
    tags: ["BI", "Tracking"],
    color: "linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop",
  },
  {
    id: 6,
    title: "Search Peak",
    badge: "SEO",
    description:
      "Dominate search results. Our organic strategies ensure you're found by the right people at the right time.",
    tags: ["Audit", "Content", "Tech"],
    color: "linear-gradient(135deg, #14b8a6 0%, #0ea5e9 100%)",
    img: "https://images.unsplash.com/photo-1572021335469-31706a17aaef?q=80&w=2670&auto=format&fit=crop",
  },
  {
    id: 7,
    title: "Identity Lab",
    badge: "Branding",
    description:
      "More than just a logo. We create cohesive brand ecosystems that tell your unique story across all touchpoints.",
    tags: ["Logo", "System", "Voice"],
    color: "linear-gradient(135deg, #8b5cf6 0%, #d946ef 100%)",
    img: "https://images.unsplash.com/photo-1496200186974-4293800e2c20?q=80&w=2664&auto=format&fit=crop",
  },
  {
    id: 8,
    title: "Future Path",
    badge: "Consulting",
    description:
      "Navigate the future with confidence. Strategic advice to guide your digital transformation journey.",
    tags: ["Strategy", "Innovation"],
    color: "linear-gradient(135deg, #f97316 0%, #db2777 100%)",
    img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2670&auto=format&fit=crop",
  },
];

const FlyCard = () => {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      // Use GSAP's utility to select cards within the scope
      const cards = gsap.utils.toArray(".fly-card");

      // Ensure strict stacking order (Card 1 at bottom, Card 8 at top)
      gsap.set(cards, { zIndex: (i) => i + 1 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          // Calculate scroll length based on number of cards to keep speed consistent
          end: `+=${cards.length * 500}`,
          pin: true,
          scrub: 1,
        },
      });

      cards.forEach((card, i) => {
        // --- INFINITE CYCLE LOGIC ---
        // using % 4 ensures the pattern 0,1,2,3... repeats for any number of cards
        const direction = i % 4;

        let startX = 0;
        let startY = 0;
        const xOff = window.innerWidth;
        const yOff = window.innerHeight;

        // Assign start positions based on the cycle
        if (direction === 0) startX = -xOff; // Left
        if (direction === 1) startX = xOff; // Right
        if (direction === 2) startY = -yOff; // Top
        if (direction === 3) startY = yOff; // Bottom

        // --- ANIMATION ---
        tl.fromTo(
          card,
          {
            x: startX,
            y: startY,
            rotation: i % 2 === 0 ? -15 : 15,
            opacity: 0,
            scale: 0.5,
          },
          {
            x: 0,
            y: 0,
            rotation: Math.random() * 4 - 2, // Reduced rotation for cleaner look
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: "power3.out",
          },
          i * 0.5 // Stagger ensures they pile up one by one
        );
      });
    },
    { scope: containerRef }
  );

  return (
    <section className="fly-section" ref={containerRef}>
      <div className="fly-header">
        <h2>Our Capabilities</h2>
      </div>
      <div className="fly-wrapper">
        {flyData.map((item) => (
          <div
            key={item.id}
            className="fly-card"
            style={{ background: item.color }}
          >
            <div className="fly-card-left">
              <span className="fly-badge">{item.badge}</span>
              <h3>{item.title}</h3>
              <p className="fly-description">{item.description}</p>
              <div className="fly-tags">
                {item.tags.map((tag) => (
                  <span key={tag} className="fly-tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="fly-card-right">
              <img src={item.img} alt={item.title} />
              <div className="play-button">
                <div className="play-icon">▶</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FlyCard;
