'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import TiltCard from '../effects/TiltCard';
import AnimatedCounter from '../effects/AnimatedCounter';

const techCategories = [
  {
    name: 'Languages',
    items: ['Python', 'Java', 'C', 'JavaScript', 'TypeScript', 'HTML/CSS'],
    gradient: 'from-[#0066FF] to-[#00D4FF]',
    color: '#0066FF',
    count: 6,
  },
  {
    name: 'Frameworks',
    items: ['React', 'Next.js', 'Node.js', 'Flutter', 'Tailwind'],
    gradient: 'from-[#00D4FF] to-[#0066FF]',
    color: '#00D4FF',
    count: 5,
  },
  {
    name: 'Tools & Workflows',
    items: ['Git', 'VS Code', 'Cursor', 'Figma', 'Firebase'],
    gradient: 'from-[#FF3366] to-[#FF0055]',
    color: '#FF3366',
    count: 5,
  },
  {
    name: 'Domains',
    items: ['Web Development', 'Mobile Apps', 'IoT', 'UI/UX'],
    gradient: 'from-[#0066FF] to-[#FF0055]',
    color: '#00D4FF',
    count: 4,
  },
];

export default function TechStackSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <section
      ref={sectionRef}
      id="techstack"
      className="relative py-16 md:py-24 px-4 overflow-hidden bg-transparent"
    >
      {/* Parallax Background */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ y: bgY }}>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0D0D10]/40 to-transparent" />
      </motion.div>

      {/* Soft Gradient Orbs */}
      <div className="absolute top-1/4 -left-24 w-48 h-48 rounded-full bg-[#0066FF]/10 blur-[100px]" />
      <div className="absolute bottom-1/4 -right-24 w-48 h-48 rounded-full bg-[#FF0055]/10 blur-[100px]" />

      {/* Section Content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16 md:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-sm uppercase tracking-[0.3em] text-[#0066FF] font-mono block mb-4">
            Tech Stack
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-orbitron tracking-wide">
            <span className="gradient-text">Skills & Tools</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#0066FF] to-[#FF0055] mx-auto rounded-full mb-5" />
          <p className="text-gray-400 max-w-xl mx-auto text-base md:text-lg">
            Technologies I work with to bring ideas to life
          </p>
        </motion.div>

        {/* Tech Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {techCategories.map((category, ci) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: ci * 0.15 }}
            >
              <TiltCard intensity={7}>
                <motion.div
                  className="group relative glass rounded-2xl p-6 h-full flex flex-col justify-between overflow-hidden"
                  whileHover={{ boxShadow: `0 20px 50px ${category.color}30` }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Gradient Top Bar */}
                  <div
                    className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${category.gradient} opacity-40 group-hover:opacity-100 transition-opacity`}
                  />

                  {/* Header */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-1.5 h-8 rounded-full bg-gradient-to-b ${category.gradient}`}
                      />
                      <h3 className="text-lg font-bold text-white">{category.name}</h3>
                    </div>
                    <div className="text-xs text-gray-500 font-mono">
                      <AnimatedCounter value={category.count} duration={1} />
                    </div>
                  </div>

                  {/* Skills Tags */}
                  <div className="flex flex-wrap gap-2 mt-2">
                    {category.items.map((item, ii) => (
                      <motion.span
                        key={item}
                        className="px-3 py-1.5 text-sm bg-[#00D4FF]/[0.05] text-[#00D4FF] rounded-lg border border-[#00D4FF]/20 hover:border-[#00D4FF]/50 hover:bg-[#00D4FF]/10 hover:text-white transition-all cursor-default shadow-[0_0_10px_rgba(0,212,255,0.05)]"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.3,
                          delay: ci * 0.1 + ii * 0.05,
                        }}
                        whileHover={{
                          scale: 1.08,
                          y: -3,
                          boxShadow: '0 8px 20px rgba(0, 212, 255, 0.25)',
                        }}
                      >
                        {item}
                      </motion.span>
                    ))}
                  </div>

                  {/* Card Hover Gradient */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500`}
                  />
                </motion.div>
              </TiltCard>
            </motion.div>
          ))}
        </div>

        {/* Bottom Orbit / Decorative */}
        <motion.div
          className="flex justify-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="flex items-center gap-6">
            <div className="w-24 h-px bg-gradient-to-r from-transparent to-gray-800" />
            <motion.div
              className="relative w-12 h-12"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            >
              <div className="absolute inset-0 border border-dashed border-gray-800 rounded-full" />
              <motion.div
                className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-[#0066FF] rounded-full"
                animate={{
                  boxShadow: [
                    '0 0 5px #0066FF',
                    '0 0 15px #00D4FF',
                    '0 0 5px #0066FF',
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-[#FF0055] rounded-full"
                animate={{
                  boxShadow: [
                    '0 0 5px #FF0055',
                    '0 0 15px #FF3366',
                    '0 0 5px #FF0055',
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              />
            </motion.div>
            <div className="w-24 h-px bg-gradient-to-r from-gray-800 to-transparent" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}