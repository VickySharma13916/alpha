import { useEffect, useRef } from "react";

import AnimatedText from "../ui/AnimatedText";

import "./HeroSection.css";

class Star {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.x = (Math.random() - 0.5) * width * 2;
    this.y = (Math.random() - 0.5) * height * 2;
    this.z = Math.random() * width;
    this.size = Math.random() * 2 + 0.5;
    this.color = Math.random() > 0.8 ? "#a5f3fc" : "#fff";
  }

  update(speedMultiplier, width, height, baseSpeed) {
    this.z -= baseSpeed * speedMultiplier;

    if (this.z < 1) {
      this.width = width;
      this.height = height;
      this.z = width;
      this.x = (Math.random() - 0.5) * width * 2;
      this.y = (Math.random() - 0.5) * height * 2;
    }
  }

  draw(ctx, width, height, mouse, fov, baseSpeed) {
    const x =
      ((this.x - (mouse.x - width / 2) * 0.5) / this.z) * fov + width / 2;
    const y =
      ((this.y - (mouse.y - height / 2) * 0.5) / this.z) * fov + height / 2;

    const radius = Math.max(0, (1 - this.z / width) * this.size * 2);

    const alpha = Math.min(1, (1 - this.z / width) * 1.5);
    if (alpha <= 0) return;

    if (this.z < width / 1.5) {
      const prevZ = this.z + baseSpeed * 2;
      const prevX =
        ((this.x - (mouse.x - width / 2) * 0.5) / prevZ) * fov + width / 2;
      const prevY =
        ((this.y - (mouse.y - height / 2) * 0.5) / prevZ) * fov + height / 2;

      ctx.beginPath();
      ctx.moveTo(prevX, prevY);
      ctx.lineTo(x, y);
      ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.5})`;
      ctx.lineWidth = radius;
      ctx.stroke();
    }

    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;

    ctx.globalAlpha = alpha;
    ctx.fill();
    ctx.globalAlpha = 1;
  }
}

class Meteor {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.activationTimer = null;
    this.reset();
  }

  reset() {
    if (this.activationTimer) {
      clearTimeout(this.activationTimer);
    }
    this.x = Math.random() * this.width;
    this.y = Math.random() * this.height * 0.5;
    this.length = Math.random() * 80 + 20;
    this.speed = Math.random() * 10 + 5;
    this.angle = Math.PI / 4;
    this.opacity = 0;
    this.active = false;

    this.activationTimer = setTimeout(() => {
      this.active = true;
      this.opacity = 1;
    }, Math.random() * 5000);
  }

  update(width, height) {
    this.width = width;
    this.height = height;

    if (!this.active) return;

    this.x += this.speed;
    this.y += this.speed;

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

    const isMobile = window.innerWidth < 768;
    const STAR_COUNT = isMobile ? 250 : 450;
    const BASE_SPEED = 2;
    const FOV = 400;
    let mouse = { x: width / 2, y: height / 2 };

    const stars = Array.from(
      { length: STAR_COUNT },
      () => new Star(width, height)
    );
    const meteors = Array.from({ length: 4 }, () => new Meteor(width, height));

    let animationFrame;
    const animate = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.4)";
      ctx.fillRect(0, 0, width, height);

      const scrollSpeed = window.scrollY > 100 ? 5 : 1;

      stars.forEach((star) => {
        star.update(scrollSpeed, width, height, BASE_SPEED);
        star.draw(ctx, width, height, mouse, FOV, BASE_SPEED);
      });

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
