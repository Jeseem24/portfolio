'use client';

import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  pulseSpeed: number;
  pulsePhase: number;
  type: 'dot' | 'ring' | 'glow';
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const animationRef = useRef<number>(0);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const particleCount = Math.min(
      120,
      Math.max(40, Math.floor((window.innerWidth * window.innerHeight) / 12000))
    );
    const colors = ['#0066FF', '#00D4FF', '#FF0055', '#FF3366', '#FFFFFF'];
    const types: ('dot' | 'ring' | 'glow')[] = ['dot', 'dot', 'dot', 'ring', 'glow'];

    particlesRef.current = Array.from({ length: particleCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      size: Math.random() * 2.5 + 0.5,
      color: colors[Math.floor(Math.random() * colors.length)]!,
      alpha: Math.random() * 0.5 + 0.1,
      pulseSpeed: Math.random() * 0.02 + 0.005,
      pulsePhase: Math.random() * Math.PI * 2,
      type: types[Math.floor(Math.random() * types.length)]!,
    }));

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const animate = () => {
      if (!ctx || !canvas) return;
      timeRef.current += 1;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((particle, i) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Mouse interaction
        const dx = mouseRef.current.x - particle.x;
        const dy = mouseRef.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 200 && distance > 0) {
          const force = (200 - distance) / 200;
          const forceCubed = force * force * force;
          particle.vx -= (dx / distance) * forceCubed * 0.5;
          particle.vy -= (dy / distance) * forceCubed * 0.5;
        }

        // Very gentle drift
        particle.vx += (Math.random() - 0.5) * 0.01;
        particle.vy += (Math.random() - 0.5) * 0.01;

        // Wrap around
        if (particle.x < -20) particle.x = canvas.width + 20;
        if (particle.x > canvas.width + 20) particle.x = -20;
        if (particle.y < -20) particle.y = canvas.height + 20;
        if (particle.y > canvas.height + 20) particle.y = -20;

        // Friction
        particle.vx *= 0.998;
        particle.vy *= 0.998;
        const speed = Math.sqrt(particle.vx ** 2 + particle.vy ** 2);
        if (speed > 1.2) {
          particle.vx = (particle.vx / speed) * 1.2;
          particle.vy = (particle.vy / speed) * 1.2;
        }

        // Pulsing
        const pulseAlpha =
          particle.alpha +
          Math.sin(timeRef.current * particle.pulseSpeed + particle.pulsePhase) * 0.15;
        const alpha = Math.max(0.03, Math.min(0.8, pulseAlpha));

        // Draw based on type
        if (particle.type === 'ring') {
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2);
          ctx.strokeStyle = particle.color;
          ctx.globalAlpha = alpha * 0.5;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        } else if (particle.type === 'glow') {
          // Glow
          const gradient = ctx.createRadialGradient(
            particle.x, particle.y, 0,
            particle.x, particle.y, particle.size * 4
          );
          gradient.addColorStop(0, particle.color);
          gradient.addColorStop(1, 'transparent');
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size * 4, 0, Math.PI * 2);
          ctx.fillStyle = gradient;
          ctx.globalAlpha = alpha * 0.3;
          ctx.fill();
        } else {
          // Dot
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fillStyle = particle.color;
          ctx.globalAlpha = alpha;
          ctx.fill();

          // Subtle glow for bigger dots
          if (particle.size > 1.5) {
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size * 3, 0, Math.PI * 2);
            ctx.fillStyle = particle.color;
            ctx.globalAlpha = alpha * 0.08;
            ctx.fill();
          }
        }

        // Connections between particles
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const p2 = particlesRef.current[j]!;
          const dx2 = particle.x - p2.x;
          const dy2 = particle.y - p2.y;
          const dist = Math.sqrt(dx2 * dx2 + dy2 * dy2);

          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = particle.color;
            ctx.globalAlpha = (1 - dist / 130) * 0.1;
            ctx.lineWidth = 0.4;
            ctx.stroke();
          }
        }

        // Mouse connections
        if (distance < 250) {
          ctx.beginPath();
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(mouseRef.current.x, mouseRef.current.y);
          ctx.strokeStyle = '#00D4FF';
          ctx.globalAlpha = (1 - distance / 250) * 0.12;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      });

      ctx.globalAlpha = 1;
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <canvas
      id="particle-canvas"
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
    />
  );
}