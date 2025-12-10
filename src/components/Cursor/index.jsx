import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import "./Cursor.css";

const Cursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useGSAP(() => {
    const moveX = gsap.quickTo(dotRef.current, "x", { duration: 0.1 });
    const moveY = gsap.quickTo(dotRef.current, "y", { duration: 0.1 });
    const ringX = gsap.quickTo(ringRef.current, "x", { duration: 0.5 });
    const ringY = gsap.quickTo(ringRef.current, "y", { duration: 0.5 });

    window.addEventListener("mousemove", (e) => {
      moveX(e.clientX);
      moveY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
    });
  });

  return (
    <>
      <div className="cursor-dot" ref={dotRef}></div>
      <div className="cursor-ring" ref={ringRef}></div>
    </>
  );
};

export default Cursor;
