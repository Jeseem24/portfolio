'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import AnimatedCounter from '../effects/AnimatedCounter';
import TiltCard from '../effects/TiltCard';

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'start center'],
  });

  // Photo morph: circle → rounded square as you scroll into view
  const photoScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 0.85, 1]);
  const photoOpacity = useTransform(scrollYProgress, [0, 0.3, 0.5], [0, 0.6, 1]);
  const photoBorderRadius = useTransform(
    scrollYProgress,
    [0, 0.4, 1],
    [100, 40, 16]
  );
  const photoY = useTransform(scrollYProgress, [0, 0.5, 1], [-80, -20, 0]);
  const photoRotate = useTransform(scrollYProgress, [0, 0.5, 1], [8, 2, 0]);

  const stats = [
    { value: 2027, suffix: '', label: 'Graduating', prefix: '' },
    { value: 10, suffix: '+', label: 'Technologies', prefix: '' },
    { value: 2, suffix: '+', label: 'Major Projects', prefix: '' },
    { value: 5, suffix: '+', label: 'Hackathons', prefix: '' },
  ];

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-16 md:py-20 px-4 overflow-hidden bg-transparent"
    >
      {/* Background Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -right-20 w-60 h-60 rounded-full bg-[#0066FF]/5 blur-[100px]" />
        <div className="absolute bottom-1/4 -left-20 w-60 h-60 rounded-full bg-[#FF0055]/5 blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header (Cinematic Text Reveal updated in next step) */}
        <motion.div
          className="text-center mb-16 md:mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-sm uppercase tracking-[0.3em] text-[#0066FF] font-mono mb-4 block">
            About Me
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 font-orbitron tracking-wide">
            <span className="gradient-text">Who I Am</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#0066FF] to-[#00D4FF] mx-auto rounded-full" />
        </motion.div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-5 gap-10 lg:gap-14 items-center">
          {/* Photo with morph animation */}
          <motion.div className="lg:col-span-2 flex justify-center">
            <TiltCard
              className="w-64 h-64 md:w-72 md:h-72 lg:w-80 lg:h-80"
              intensity={12}
            >
              <motion.div
                className="relative w-full h-full overflow-hidden"
                style={{
                  scale: photoScale,
                  opacity: photoOpacity,
                  y: photoY,
                  rotate: photoRotate,
                  borderRadius: photoBorderRadius,
                }}
              >
                {/* Gradient border wrapper */}
                <motion.div
                  className="absolute -inset-[3px] overflow-hidden"
                  style={{
                    borderRadius: photoBorderRadius,
                    background:
                      'linear-gradient(135deg, #0066FF, #00D4FF, #FF0055, #FF3366, #0066FF)',
                    backgroundSize: '300% 300%',
                  }}
                  animate={{
                    backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
                  }}
                  transition={{ duration: 5, repeat: Infinity }}
                />

                {/* Image */}
                <motion.div
                  className="absolute inset-0 overflow-hidden border-[1px] border-[#0A0A0A]"
                  style={{ borderRadius: photoBorderRadius }}
                >
                  <Image
                    src="/headshot_square.png"
                    alt="Jeseem"
                    width={3080}
                    height={3080}
                    className="w-full h-full object-cover "
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/30 via-transparent to-transparent" />
                </motion.div>
              </motion.div>
            </TiltCard>
          </motion.div>

          {/* Text Content */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="space-y-5">
              <motion.p
                className="text-xl md:text-2xl text-white font-light leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                I&apos;m{' '}
                <span className="font-semibold gradient-text-blue">
                  Jeseem
                </span>
                , a{' '}
                <span className="text-[#00D4FF]">
                  B.Tech Information Technology
                </span>{' '}
                student with a relentless drive to build things that matter.
              </motion.p>

              <motion.p
                className="text-base md:text-lg text-gray-400 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                From architecting full-stack web apps to designing IoT systems
                and shipping mobile applications — I love the entire spectrum
                of development. I don&apos;t just write code; I craft
                experiences, solve real problems, and constantly push my own
                limits.
              </motion.p>

              <motion.p
                className="text-base md:text-lg text-gray-400 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              >
                Whether it&apos;s competing in hackathons under pressure,
                picking up a new framework over a weekend, or debugging at 3
                AM — I thrive when the challenge is real. Technology evolves
                fast, and I make sure I evolve faster.
              </motion.p>

              {/* Signature line */}
              <motion.div
                className="pt-3 flex items-center gap-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
              >
                <div className="w-12 h-[2px] bg-gradient-to-r from-[#0066FF] to-[#00D4FF] rounded-full" />
                <span className="text-gray-500 text-sm italic font-mono">
                  Always building, always learning.
                </span>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Stats with TiltCard */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 mt-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {stats.map((stat, index) => (
            <TiltCard key={stat.label} intensity={8}>
              <motion.div
                className="group relative glass rounded-2xl p-6 text-center overflow-hidden shimmer h-full"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                whileHover={{
                  y: -8,
                  boxShadow: '0 20px 40px rgba(0, 102, 255, 0.1)',
                }}
              >
                <div className="relative z-10">
                  <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                    <AnimatedCounter
                      value={stat.value}
                      suffix={stat.suffix}
                      prefix={stat.prefix}
                    />
                  </div>
                  <div className="text-gray-500 text-xs uppercase tracking-[0.15em]">
                    {stat.label}
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-[#0066FF]/5 to-[#FF0055]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
            </TiltCard>
          ))}
        </motion.div>
      </div>
    </section>
  );
}