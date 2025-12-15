import { useEffect, useRef } from "react";

import AnimatedText from "../ui/AnimatedText";

import "./HeroSection.css";

class Star {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.x = (Math.random() - 0.5) * width * 2; // Spread wider than viewport
    this.y = (Math.random() - 0.5) * height * 2;
    this.z = Math.random() * width; // Depth
    this.size = Math.random() * 2 + 0.5;
    this.color = Math.random() > 0.8 ? "#a5f3fc" : "#fff"; // Occasional cyan tint
  }

  update(speedMultiplier, width, height, baseSpeed) {
    // Move star towards camera (decrease Z)
    this.z -= baseSpeed * speedMultiplier;

    // Reset if passed camera
    if (this.z < 1) {
      this.width = width; // Update dimensions reference if resize happened
      this.height = height;
      this.z = width;
      this.x = (Math.random() - 0.5) * width * 2;
      this.y = (Math.random() - 0.5) * height * 2;
    }
  }

  draw(ctx, width, height, mouse, fov, baseSpeed) {
    // Projection math
    // Simple perspective projection: x' = x / z
    // We adjust logic to incorporate mouse "feeling" like a camera pan
    const x =
      ((this.x - (mouse.x - width / 2) * 0.5) / this.z) * fov + width / 2;
    const y =
      ((this.y - (mouse.y - height / 2) * 0.5) / this.z) * fov + height / 2;

    // Calculate size based on proximity
    const radius = Math.max(0, (1 - this.z / width) * this.size * 2);

    // Draw Trail (Motion Blur effect)
    // We calculate a "previous" position by pretending Z was further away
    const prevZ = this.z + baseSpeed * 2;
    const prevX =
      ((this.x - (mouse.x - width / 2) * 0.5) / prevZ) * fov + width / 2;
    const prevY =
      ((this.y - (mouse.y - height / 2) * 0.5) / prevZ) * fov + height / 2;

    ctx.beginPath();
    ctx.moveTo(prevX, prevY);
    ctx.lineTo(x, y);
    ctx.strokeStyle = `rgba(255, 255, 255, ${Math.min(
      1,
      (1 - this.z / width) * 0.5
    )})`;
    ctx.lineWidth = radius;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;

    // Fade in based on distance
    ctx.globalAlpha = Math.min(1, (1 - this.z / width) * 1.5);
    ctx.fill();
    ctx.globalAlpha = 1;
  }
}

class Meteor {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.activationTimer = null; // Initialize timer property
    this.reset();
  }

  reset() {
    if (this.activationTimer) {
      clearTimeout(this.activationTimer);
    }
    this.x = Math.random() * this.width;
    this.y = Math.random() * this.height * 0.5; // Start in top half
    this.length = Math.random() * 80 + 20;
    this.speed = Math.random() * 10 + 5;
    this.angle = Math.PI / 4; // 45 degrees
    this.opacity = 0;
    this.active = false;

    // Random activation
    this.activationTimer = setTimeout(() => {
      this.active = true;
      this.opacity = 1;
    }, Math.random() * 5000);
  }

  update(width, height) {
    // Update ref coords if resized
    this.width = width;
    this.height = height;

    if (!this.active) return;

    this.x += this.speed; // Move Right
    this.y += this.speed; // Move Down

    this.opacity -= 0.01;

    if (this.x > width || this.y > height || this.opacity <= 0) {
      this.active = false;
      this.reset();
    }
  }

  draw(ctx) {
    if (!this.active) return;

    const tailX = this.x - this.length * Math.cos(this.angle);
    const tailY = this.y - this.length * Math.sin(this.angle);

    // Simple gradient for tail
    const gradient = ctx.createLinearGradient(this.x, this.y, tailX, tailY);
    gradient.addColorStop(0, "white");
    gradient.addColorStop(1, "transparent");

    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(tailX, tailY);
    ctx.strokeStyle = gradient;
    ctx.lineWidth = 2;
    ctx.globalAlpha = this.opacity;
    ctx.stroke();
    ctx.globalAlpha = 1;
  }
}

const HeroSection = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // --- CONFIGURATION ---
    const STAR_COUNT = 800;
    const BASE_SPEED = 2; // Forward speed
    const FOV = 400; // Field of view

    // Mouse interaction similar to parallax
    let mouse = { x: width / 2, y: height / 2 };

    const stars = Array.from(
      { length: STAR_COUNT },
      () => new Star(width, height)
    );
    const meteors = Array.from({ length: 5 }, () => new Meteor(width, height));

    // Loop
    let animationFrame;
    const animate = () => {
      // Clear with trail effect for "speed"
      ctx.fillStyle = "rgba(0, 0, 0, 0.4)"; // Determines trail length/fade
      ctx.fillRect(0, 0, width, height);

      // Stars
      // Increase speed slightly on scroll
      const scrollSpeed = window.scrollY > 100 ? 5 : 1;

      stars.forEach((star) => {
        star.update(scrollSpeed, width, height, BASE_SPEED);
        star.draw(ctx, width, height, mouse, FOV, BASE_SPEED);
      });

      // Meteors
      meteors.forEach((meteor) => {
        meteor.update(width, height);
        meteor.draw(ctx);
      });

      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);

      // Cleanup meteor timers
      meteors.forEach((m) => {
        if (m.activationTimer) {
          clearTimeout(m.activationTimer);
        }
      });
    };
  }, []);

  return (
    <section className="hero-section" ref={containerRef}>
      <canvas ref={canvasRef} className="hero-canvas" />
      <div className="hero-vignette"></div>
      <div className="hero-grain"></div>

      <div className="hero-content">
        <div className="hero-title">Vicky.</div>
        <AnimatedText
          tag="p"
          type="scramble"
          delay="1"
          className="hero-subtitle"
        >
          Redefining Excellence.
        </AnimatedText>
        <div className="hero-line"></div>
      </div>
    </section>
  );
};

export default HeroSection;
