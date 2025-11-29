import React, { useRef, useEffect, useState } from "react";
import { ArrowDown } from "lucide-react";
import { Particle, ParticleType } from "../types";

const Hero: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }
    };

    window.addEventListener("resize", updateDimensions);
    updateDimensions();

    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || dimensions.width === 0) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = dimensions.width;
    canvas.height = dimensions.height;

    const particles: Particle[] = [];
    let animationFrameId: number;
    const mouse = { x: -1000, y: -1000 };
    
    // Physics Config for "Subtle & Elegant"
    const gravity = 0.12; // Reduced gravity for more float
    const friction = 0.99; // Less air resistance (smoother glide)
    const bounceDamping = -0.4; // Soft bounce

    // Helper to spawn a particle
    const createParticle = (x: number, y: number, forceType?: ParticleType): Particle => {
      const types: ParticleType[] = ["coin", "mouse"];
      const type = forceType || types[Math.floor(Math.random() * types.length)];
      
      const angle = Math.random() * Math.PI * 2;
      // Drastically reduced speed for elegance
      const speed = Math.random() * 1.0 + 0.3; 

      return {
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 0.5, // Very slight upward drift bias
        size: Math.random() * 15 + 8, 
        color: type === "coin" ? "#FFD700" : "#FF00FF",
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.03, // Slower, graceful rotation
        life: 1.0,
        decay: Math.random() * 0.005 + 0.003, // Longer lifespan
        type,
        bounceCount: 0,
      };
    };

    // Draw functions
    const drawCoin = (ctx: CanvasRenderingContext2D, p: Particle) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      
      // Global opacity reduction (1/2 opacity + fade out)
      ctx.globalAlpha = 0.5 * p.life;
      
      // Slower, smoother 3D spin simulation
      const scaleX = Math.abs(Math.cos(p.rotation)); 
      ctx.scale(scaleX, 1);

      // Glow
      ctx.shadowBlur = 20;
      ctx.shadowColor = "rgba(255, 215, 0, 0.6)";

      // Outer Ring
      ctx.beginPath();
      ctx.arc(0, 0, p.size, 0, Math.PI * 2);
      const gradient = ctx.createLinearGradient(-p.size, -p.size, p.size, p.size);
      gradient.addColorStop(0, "#FFD700");
      gradient.addColorStop(0.5, "#FFF8DC");
      gradient.addColorStop(1, "#DAA520");
      ctx.fillStyle = gradient;
      ctx.fill();

      // Inner Detail
      ctx.beginPath();
      ctx.arc(0, 0, p.size * 0.7, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(184, 134, 11, 0.8)";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Shine effect
      ctx.beginPath();
      ctx.arc(-p.size * 0.3, -p.size * 0.3, p.size * 0.1, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
      ctx.fill();

      ctx.restore();
    };

    const drawMouse = (ctx: CanvasRenderingContext2D, p: Particle) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      // Smoother drift
      ctx.rotate(p.rotation + Math.sin(Date.now() * 0.001) * 0.1); 
      
      // Global opacity reduction (1/2 opacity + fade out)
      ctx.globalAlpha = 0.5 * p.life;
      
      // Elegant Neon Glow
      ctx.shadowBlur = 25;
      ctx.shadowColor = "rgba(255, 20, 147, 0.6)"; 
      ctx.strokeStyle = `rgba(255, 105, 180, 1)`;
      ctx.lineWidth = 2;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      // Head
      ctx.beginPath();
      ctx.ellipse(0, 0, p.size * 0.8, p.size * 0.6, 0, 0, Math.PI * 2);
      ctx.stroke();
      
      // Ears
      ctx.beginPath();
      ctx.arc(-p.size * 0.6, -p.size * 0.6, p.size * 0.4, 0, Math.PI * 2);
      ctx.stroke();
      
      ctx.beginPath();
      ctx.arc(p.size * 0.6, -p.size * 0.6, p.size * 0.4, 0, Math.PI * 2);
      ctx.stroke();

      // Tail (Slower, organic wave)
      ctx.beginPath();
      ctx.moveTo(p.size * 0.8, 0);
      ctx.bezierCurveTo(
        p.size * 1.5, 
        p.size * 0.5 + Math.sin(Date.now() * 0.002 + p.x * 0.01) * 3, 
        p.size * 1.5, 
        -p.size * 0.5, 
        p.size * 2.2, 
        -p.size * 0.2
      );
      ctx.stroke();

      // Eyes
      ctx.fillStyle = `rgba(255, 255, 255, 1)`;
      ctx.shadowColor = "transparent";
      ctx.beginPath();
      ctx.arc(-p.size * 0.2, -p.size * 0.1, 1.5, 0, Math.PI * 2);
      ctx.arc(p.size * 0.2, -p.size * 0.1, 1.5, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    };

    const render = () => {
      // Clear with longer trail for "liquid" feel
      ctx.fillStyle = "rgba(0, 0, 0, 0.15)"; 
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Background ambient particles (gentle dust)
      if (Math.random() < 0.03) {
        const x = Math.random() * canvas.width;
        const y = canvas.height + 20;
        const p = createParticle(x, y);
        p.vy = -Math.random() * 1 - 0.5; // Slow float up
        p.vx = (Math.random() - 0.5) * 0.5;
        p.life = 1;
        p.decay = 0.003;
        particles.push(p);
      }

      // Physics Update Loop
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];

        p.x += p.vx;
        p.y += p.vy;
        p.vx *= friction;
        p.vy *= friction;
        
        // Very subtle gravity
        p.vy += gravity * 0.05; 
        
        p.rotation += p.rotationSpeed;
        p.life -= p.decay;

        // Soft floor bounce
        if (p.y + p.size > canvas.height) {
            p.y = canvas.height - p.size;
            p.vy *= bounceDamping; 
            p.vx *= 0.9; // Friction on floor
            p.bounceCount++;
        }
        
        // Soft wall bounce
        if (p.x + p.size > canvas.width || p.x - p.size < 0) {
            p.vx *= -0.8;
        }

        if (p.life <= 0 || p.bounceCount > 2) { // Allow fewer bounces before fading
            particles.splice(i, 1);
            continue;
        }

        if (p.type === "coin") {
          drawCoin(ctx, p);
        } else {
          drawMouse(ctx, p);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    // Interaction - Throttled spawn for elegance
    let lastMove = 0;
    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      mouse.x = e.clientX;
      mouse.y = e.clientY;

      // Limit particle generation rate on move (60ms throttle)
      if (now - lastMove > 60) { 
        particles.push(createParticle(mouse.x, mouse.y));
        lastMove = now;
      }
    };

    const handleInteraction = (x: number, y: number) => {
        // Gentle burst
        for (let i = 0; i < 8; i++) {
            particles.push(createParticle(x, y));
        }
    }

    const handleMouseDown = (e: MouseEvent) => handleInteraction(e.clientX, e.clientY);
    const handleTouchStart = (e: TouchEvent) => handleInteraction(e.touches[0].clientX, e.touches[0].clientY);


    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("touchstart", handleTouchStart);
    
    // Start loop
    render();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("touchstart", handleTouchStart);
      cancelAnimationFrame(animationFrameId);
    };
  }, [dimensions]);

  return (
    <section 
        ref={containerRef}
        className="relative w-full h-screen flex flex-col items-center justify-center bg-black overflow-hidden selection:bg-pink-500 selection:text-white"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block z-0"
        style={{ mixBlendMode: 'screen' }} 
      />

      {/* Vignette Overlay for depth */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,0.8)_100%)] z-10" />

      {/* Content */}
      <div className="relative z-20 text-center px-4 mix-blend-normal">
        <div className="mb-2 flex items-center justify-center space-x-2 animate-pulse">
            <span className="h-2 w-2 rounded-full bg-green-500 shadow-[0_0_10px_#22c55e]" />
            <span className="text-xs uppercase tracking-widest text-green-400 font-bold font-mono">Online Store</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-2 font-mono">
          Welcome to iimpkzml
        </h1>

        <div className="mt-8 flex flex-col items-center gap-6">
            <p className="text-2xl md:text-4xl font-bold text-white/90 tracking-wide font-mono">
                It&apos;s a <span className="text-yellow-400 inline-block drop-shadow-[0_0_15px_rgba(250,204,21,0.8)]">ZAR</span> thing
            </p>
            
            <button className="group relative px-8 py-4 bg-white/5 backdrop-blur-md border border-white/20 rounded-full overflow-hidden hover:bg-white/10 transition-all duration-300 hover:scale-105 active:scale-95">
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-yellow-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10 text-white font-bold tracking-widest text-sm uppercase flex items-center gap-2">
                    Shop Now
                </span>
            </button>
        </div>
      </div>

      <div className="absolute bottom-10 z-20 animate-bounce text-white/30">
        <ArrowDown size={32} />
      </div>
    </section>
  );
};

export default Hero;