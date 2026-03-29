'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  vx: number;
  vy: number;
}

export default function ClickParticles() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const colors = ['#0066FF', '#00D4FF', '#FF0055'];
      const newParticles: Particle[] = [];
      const count = Math.floor(Math.random() * 8) + 6; // 6 to 14 particles

      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 80 + 30; // Random spread
        
        newParticles.push({
          id: Date.now() + i + Math.random(),
          x: e.clientX,
          y: e.clientY,
          size: Math.random() * 5 + 2,
          color: colors[Math.floor(Math.random() * colors.length)],
          vx: Math.cos(angle) * velocity,
          vy: Math.sin(angle) * velocity,
        });
      }

      setParticles((prev) => [...prev, ...newParticles].slice(-50)); // Keep max 50 trailing
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9990]">
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 1, scale: 1, x: p.x, y: p.y }}
            animate={{
              opacity: 0,
              scale: 0,
              x: p.x + p.vx,
              y: p.y + p.vy,
            }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            onAnimationComplete={() => {
              setParticles((prev) => prev.filter((particle) => particle.id !== p.id));
            }}
            className="absolute rounded-full"
            style={{
              width: p.size,
              height: p.size,
              backgroundColor: p.color,
              boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
              marginLeft: -p.size / 2,
              marginTop: -p.size / 2,
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
