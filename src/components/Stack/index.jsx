import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import "./Stack.css";

import AnimatedText from "../ui/AnimatedText";

gsap.registerPlugin(ScrollTrigger);

const stackData = [
  {
    id: 1,
    tag: "Tailored Offer",
    title: "Elevate Your Brand",
    text: "Craft a signature identity.",
    tags: ["Brand", "Art"],
    img: "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?q=80&w=2070&auto=format&fit=crop",
    theme: "linear-gradient(135deg, #4f46e5 0%, #9333ea 100%)",
  },
  {
    id: 2,
    tag: "Exclusive Access",
    title: "Curated Journeys",
    text: "World's most coveted destinations.",
    tags: ["Travel", "Concierge"],
    img: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070&auto=format&fit=crop",
    theme: "linear-gradient(135deg, #5e6168ff 0%, #0ea5e9 100%)",
  },
  {
    id: 3,
    tag: "Culinary Arts",
    title: "Taste Extraordinary",
    text: "Artistry of Michelin chefs.",
    tags: ["Dining", "Winery"],
    img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070&auto=format&fit=crop",
    theme: "linear-gradient(135deg, #c2410c 0%, #ef4444 100%)",
  },
  {
    id: 4,
    tag: "Wellness",
    title: "Restore & Rejuvenate",
    text: "Holistic wellness retreats.",
    tags: ["Spa", "Mind"],
    img: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=2070&auto=format&fit=crop",
    theme: "linear-gradient(135deg, #064e3b 0%, #10b981 100%)",
  },
];

const Stack = () => {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  useGSAP(
    () => {
      const cards = cardsRef.current.filter((c) => c !== null);

      gsap.set(cards, {
        y: (i) => (i === 0 ? 0 : window.innerHeight),
        zIndex: (i) => i + 1,
        transformOrigin: "center top",
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: `+=${window.innerHeight * cards.length}`,
          pin: true,
          scrub: 1,
        },
      });

      cards.forEach((card, i) => {
        if (i === 0) return;

        const startAt = i - 1;

        tl.to(card, { y: 0, ease: "none", duration: 1 }, startAt);

        if (cards[i - 1]) {
          tl.to(
            cards[i - 1],
            {
              scale: 0.92,
              duration: 1,
            },
            startAt
          );
        }
      });
    },
    { scope: containerRef }
  );

  return (
    <section className="stack-section" ref={containerRef}>
      <div className="stack-wrapper">
        {stackData.map((card, index) => (
          <div
            key={card.id}
            className="stack-card"
            ref={(el) => (cardsRef.current[index] = el)}
            style={{ background: card.theme }}
          >
            <div className="stack-pattern pat-1"></div>
            <div className="stack-pattern pat-2"></div>

            <div className="stack-left">
              <AnimatedText className="stack-tag" type="scramble">
                {card.tag}
              </AnimatedText>
              <AnimatedText tag="h2" type="split">
                {card.title}
              </AnimatedText>
              <AnimatedText tag="p" type="split">
                {card.text}
              </AnimatedText>
              <div className="stack-pills">
                {card.tags.map((t) => (
                  <span key={t} className="pill">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="stack-right">
              <div className="stack-image-container">
                <img src={card.img} alt={card.title} />
                <div className="play-btn">▶</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Stack;
