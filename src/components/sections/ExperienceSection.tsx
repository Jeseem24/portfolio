'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Briefcase, Trophy, MapPin, Calendar } from 'lucide-react';
import TiltCard from '../effects/TiltCard';

const experiences = [
  {
    title: 'IoT Intern',
    company: 'KELTRON',
    location: 'Trivandrum',
    period: 'Internship',
    description:
      'Gained hands-on experience in Internet of Things development, working on real-world IoT projects and sensor integration systems.',
    icon: Briefcase,
    gradient: 'from-[#0066FF] to-[#00D4FF]',
    color: '#0066FF',
    glowColor: 'rgba(0, 102, 255, 0.15)',
  },
  {
    title: 'Hackathon Competitor',
    company: 'Multiple Events',
    location: 'Various',
    period: 'Ongoing',
    description:
      'Active participant in multiple hackathons, building innovative solutions under pressure. Every hackathon sharpens the blade — win or learn, never lose.',
    icon: Trophy,
    gradient: 'from-[#FF0055] to-[#FF3366]',
    color: '#FF0055',
    glowColor: 'rgba(255, 0, 85, 0.15)',
  },
];

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const lineHeight = useTransform(scrollYProgress, [0.1, 0.8], ['0%', '100%']);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative py-16 md:py-20 px-4 overflow-hidden bg-transparent"
    >
      {/* Background Orbs */}

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-sm uppercase tracking-[0.3em] text-[#0066FF] font-mono mb-4 block">
            Journey
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 font-orbitron tracking-wide">
            <span className="gradient-text">Experience</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#0066FF] to-[#00D4FF] mx-auto rounded-full" />
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-gray-800/50">
            <motion.div
              className="w-full bg-gradient-to-b from-[#0066FF] via-[#FF0055] to-[#0066FF]"
              style={{ height: lineHeight }}
            />
          </div>

          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.title}
                className="relative pl-16 md:pl-20"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                {/* Dot */}
                <motion.div
                  className="absolute left-6 md:left-8 top-8 w-4 h-4 -translate-x-1/2 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: exp.color }}
                  whileInView={{
                    boxShadow: [
                      `0 0 0 0 ${exp.color}40`,
                      `0 0 0 14px ${exp.color}00`,
                    ],
                  }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <div className="w-2 h-2 bg-white rounded-full" />
                </motion.div>

                <TiltCard intensity={6}>
                  <motion.div
                    className="group glass rounded-2xl p-6 md:p-8 overflow-hidden relative"
                    whileHover={{ boxShadow: `0 25px 50px ${exp.glowColor}` }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${exp.gradient}`} />

                    <div className="flex items-start gap-4 mb-3">
                      <motion.div
                        className={`p-2.5 rounded-xl bg-gradient-to-r ${exp.gradient} flex-shrink-0`}
                        whileHover={{ rotate: 10, scale: 1.1 }}
                        style={{ boxShadow: `0 8px 20px ${exp.glowColor}` }}
                      >
                        <exp.icon className="w-5 h-5 text-white" />
                      </motion.div>
                      <div className="flex-1">
                        <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-[#00D4FF] transition-colors">
                          {exp.title}
                        </h3>
                        <div className="flex flex-wrap items-center gap-3 mt-2">
                          <span style={{ color: exp.color }} className="text-sm font-medium">
                            {exp.company}
                          </span>
                          <span className="flex items-center gap-1 text-sm text-gray-500">
                            <MapPin className="w-3 h-3" />
                            {exp.location}
                          </span>
                          <span className="flex items-center gap-1 text-sm text-gray-500">
                            <Calendar className="w-3 h-3" />
                            {exp.period}
                          </span>
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-400 leading-relaxed">{exp.description}</p>

                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                      style={{
                        background: `radial-gradient(circle at 0% 0%, ${exp.color}06, transparent 50%)`,
                      }}
                    />
                  </motion.div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}