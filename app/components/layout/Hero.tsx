import HimHero from "@/components/ui/him-hero";
// import Link from "next/link";
// import { ArrowRightIcon } from "lucide-react";
import React, { useRef, useEffect } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  type: "coin" | "mouse";
  vx: number;
  vy: number;
  rotation: number;
}

const Hero = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles: Particle[] = [];
    const mouse = { x: 0, y: 0 };

    // coin + mouse particle generator
    function generateParticles() {
      const types: ("coin" | "mouse")[] = ["coin", "mouse"];
      const type = types[Math.floor(Math.random() * types.length)];

      for (let i = 0; i < 4; i++) {
        const size = Math.random() * 12 + 6;
        const speed = Math.random() * 1 + 0.5;

        particles.push({
          x: mouse.x,
          y: mouse.y,
          size,
          type,
          vx: (Math.random() - 0.5) * speed * 2,
          vy: (Math.random() - 0.5) * speed * 2,
          rotation: Math.random() * Math.PI * 2
        });
      }
    }

    // Shiny coin renderer
    function drawCoin(x, y, size, rotation, vx, vy) {
      ctx.save();
      ctx.beginPath();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.scale(1 + vx * 0.1, 1 + vy * 0.1);

      const gradient = ctx.createRadialGradient(0, 0, size * 0.2, 0, 0, size);
      gradient.addColorStop(0, "#FFD700");
      gradient.addColorStop(1, "#E6B800");
      ctx.fillStyle = gradient;
      ctx.shadowBlur = 15;
      ctx.shadowColor = "rgba(255,215,0,0.4)";

      ctx.arc(0, 0, size, 0, Math.PI * 2);
      ctx.fill();

      ctx.shadowBlur = 0;
      ctx.shadowColor = "transparent";
      ctx.restore();
    }

    // graffiti-style mouse with glow trail + ear twitch animation
    function drawMouse(x, y, size, rotation, vx, vy) {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation + Math.sin(x * 0.05) * 0.2);
      ctx.scale(1 + vx * 0.1, 1 + vy * 0.1);

      ctx.lineWidth = 2;
      ctx.strokeStyle = "rgba(255,105,180,1)";
      ctx.shadowBlur = 20;
      ctx.shadowColor = "rgba(255,105,180,0.5)";

      // Body
      ctx.beginPath();
      ctx.ellipse(0, 0, size * 1.2, size * 0.8, 0, 0, Math.PI * 2);
      ctx.stroke();

      // Ears
      ctx.beginPath();
      ctx.arc(-size * 0.5, -size * 0.6, size * 0.4, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(size * 0.5, -size * 0.6, size * 0.4, 0, Math.PI * 2);
      ctx.stroke();

      // Tail
      ctx.beginPath();
      ctx.moveTo(size * 1.2, 0);
      ctx.quadraticCurveTo(size * 2, size, size * 2.5, size * 0.2);
      ctx.stroke();

      ctx.shadowBlur = 0;
      ctx.shadowColor = "transparent";
      ctx.restore();
    }

    // Mousemove event
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      generateParticles();
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Animation loop
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, index) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.rotation += 0.02;
        particle.size *= 0.98;

        if (particle.size <= 0.8) particles.splice(index, 1);

        if (particle.type === "coin") {
          drawCoin(
            particle.x,
            particle.y,
            particle.size,
            particle.rotation,
            particle.vx,
            particle.vy
          );
        } else {
          drawMouse(
            particle.x,
            particle.y,
            particle.size,
            particle.rotation,
            particle.vx,
            particle.vy
          );
        }
      });

      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center bg-black overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      <span
        ref={textRef}
        className="relative z-10 text-[10rem] font-black tracking-tighter uppercase text-white drop-shadow-[0_0_25px_rgba(255,255,255,0.8)]"
      >
        VIBE
      </span>
    </section>
  );
};

export default Hero;
