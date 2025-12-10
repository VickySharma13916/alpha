import React, { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, ScrambleTextPlugin, SplitText);

const AnimatedText = ({
  children,
  tag = "div",
  className = "",
  type = "split", // 'split', 'scramble'
  delay = 0,
}) => {
  const Component = tag;
  const comp = useRef(null);

  useGSAP(
    () => {
      const el = comp.current;

      // Ensure we have content to animate
      if (!el) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top 85%", // Start when element is near bottom of viewport
          toggleActions: "play none none reverse",
        },
        delay: delay,
      });

      if (type === "scramble") {
        // Scramble Effect (Good for Headers)
        tl.to(el, {
          duration: 1.5,
          scrambleText: {
            text: children, // Ensure it resolves to the correct text
            chars: "upperCase",
            revealDelay: 0.5,
            speed: 0.3,
          },
        });
      } else if (type === "split") {
        // SplitText Effect (Good for Paragraphs/Headings)
        const split = new SplitText(el, { type: "lines,words,chars" });

        tl.from(split.chars, {
          duration: 0.8,
          opacity: 0,
          scale: 0.5,
          y: 20,
          rotationX: 90,
          transformOrigin: "0% 50% -50",
          ease: "back",
          stagger: 0.02,
        });

        return () => {
          split.revert();
        };
      }
    },
    { scope: comp, dependencies: [children, type, delay] }
  );

  return (
    <Component ref={comp} className={className}>
      {children}
    </Component>
  );
};

export default AnimatedText;
