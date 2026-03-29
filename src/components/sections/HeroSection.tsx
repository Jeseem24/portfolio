'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  Github,
  Linkedin,
  Instagram,
  ChevronDown,
  ArrowDown,
} from 'lucide-react';
import Image from 'next/image';
import GlitchText from '../effects/GlitchText';
import Magnetic from '../effects/Magnetic';
import HorizontalMarquee from '../effects/HorizontalMarquee';

const roles = [
  'AI-Augmented Developer',
  'Prompt Engineer',
  'Full Stack Orchestrator',
  'Problem Solver',
  'LLM Integration Specialist',
];

export default function HeroSection() {
  const [currentRole, setCurrentRole] = useState(0);
  const [displayedRole, setDisplayedRole] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [mounted, setMounted] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const orbScale = useTransform(scrollYProgress, [0, 1], [1, 1.5]);
  const orbOpacity = useTransform(scrollYProgress, [0, 0.5], [0.15, 0]);

  useEffect(() => {
    const role = roles[currentRole] || '';
    let timeout: NodeJS.Timeout;

    if (isTyping) {
      if (displayedRole.length < role.length) {
        timeout = setTimeout(() => {
          setDisplayedRole(role.slice(0, displayedRole.length + 1));
        }, 80);
      } else {
        timeout = setTimeout(() => setIsTyping(false), 2500);
      }
    } else {
      if (displayedRole.length > 0) {
        timeout = setTimeout(() => {
          setDisplayedRole(displayedRole.slice(0, -1));
        }, 40);
      } else {
        setCurrentRole((prev) => (prev + 1) % roles.length);
        setIsTyping(true);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayedRole, isTyping, currentRole]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  const socials = [
    { icon: Github, href: 'https://github.com/Jeseem24', label: 'GitHub' },
    {
      icon: Linkedin,
      href: 'https://www.linkedin.com/in/jeseem24/',
      label: 'LinkedIn',
    },
    {
      icon: Instagram,
      href: 'https://instagram.com/jeseem._',
      label: 'Instagram',
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-transparent"
    >
      {/* Parallax Background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-[#050508]/80 via-[#0A0A0F]/50 to-transparent"
          style={{ y: bgY }}
        />

        <motion.div
          className="absolute top-1/4 left-[10%] w-[600px] h-[600px] rounded-full blur-[120px]"
          style={{
            background: 'radial-gradient(circle, #0066FF, transparent)',
            scale: orbScale,
            opacity: orbOpacity,
            y: bgY,
          }}
          animate={{
            x: [0, 80, 0],
            y: [0, -60, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-1/4 right-[10%] w-[600px] h-[600px] rounded-full blur-[120px]"
          style={{
            background: 'radial-gradient(circle, #FF0055, transparent)',
            scale: orbScale,
            opacity: orbOpacity,
            y: bgY,
          }}
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[150px]"
          style={{
            background: 'radial-gradient(circle, #00D4FF, transparent)',
            opacity: orbOpacity,
          }}
          animate={{
            scale: [0.8, 1.1, 0.8],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Grid */}
        <motion.div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
            y: useTransform(scrollYProgress, [0, 1], [0, 100]),
          }}
        />

        {/* Floating dots (Mounted only to prevent hydration mismatch) */}
        {mounted && [...Array(8)].map((_, i) => (
          <motion.div
            key={`hero-dot-${i}`}
            className="absolute w-1 h-1 rounded-full"
            style={{
              left: `${15 + i * 10}%`,
              top: `${20 + (i % 3) * 25}%`,
              background: i % 2 === 0 ? '#0066FF' : '#FF0055',
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0.2, 0.6, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 4 + i * 0.5, // Used deterministic index values here to be safe
              repeat: Infinity,
              delay: i * 0.3,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <motion.div
        className="relative z-10 text-center px-4 max-w-5xl mx-auto"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {/* Headshot */}
          <motion.div
            className="flex justify-center mb-10"
            initial={{ opacity: 0, scale: 0.5, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              delay: 0.3,
              duration: 1,
              type: 'spring',
              stiffness: 200,
            }}
          >
            <motion.div
              className="relative w-44 h-44 md:w-52 md:h-52"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              {/* Animated ring */}
              <motion.div
                className="absolute -inset-[3px] rounded-full"
                style={{
                  background:
                    'conic-gradient(from 0deg, #0066FF, #00D4FF, #FF0055, #FF3366, #0066FF)',
                  padding: '3px',
                }}
                animate={{ rotate: 360 }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              >
                <div className="w-full h-full rounded-full bg-[#050508]" />
              </motion.div>

              {/* Photo */}
              <div className="absolute inset-0 rounded-full overflow-hidden border-[3px] border-[#0A0A0A] shadow-[0_0_50px_rgba(0,102,255,0.2)]">
                <Image
                  src="/headshot.png"
                  alt="Jeseem"
                  fill
                  quality={100}
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0066FF]/10 to-transparent mix-blend-overlay" />
              </div>

              {/* Cinematic Glow */}
              <div className="absolute -inset-8 rounded-full bg-gradient-to-r from-[#0066FF]/20 via-transparent to-[#FF0055]/20 blur-3xl -z-10 opacity-60" />
            </motion.div>
          </motion.div>

          {/* Greeting */}
          <motion.p
            className="text-2xl md:text-3xl text-gray-400 mb-6 font-mono tracking-[0.25em]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            Hey there, I&apos;m
          </motion.p>

          {/* Name - Large, elegant panning gradient */}
          <motion.h1
            className="text-6xl sm:text-7xl md:text-8xl lg:text-[9rem] font-bold mb-8 leading-none tracking-[0.06em]"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1 }}
          >
            <motion.span
              className="inline-block bg-gradient-to-r from-white via-[#00D4FF] to-[#0066FF] bg-[length:200%_auto] bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                y: [0, -8, 0],
              }}
              transition={{
                backgroundPosition: { duration: 8, repeat: Infinity, ease: 'linear' },
                y: { duration: 4, repeat: Infinity, ease: 'easeInOut' }
              }}
            >
              JESEEM
            </motion.span>
          </motion.h1>

          {/* Typewriter role */}
          <motion.div
            className="h-10 md:h-12 flex items-center justify-center mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.8 }}
          >
            <span className="text-xl md:text-2xl lg:text-3xl text-[#00D4FF] font-mono tracking-widest">
              {displayedRole}
            </span>
            <motion.span
              className="inline-block w-2 md:w-3 h-6 md:h-8 ml-2 bg-[#00D4FF]"
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.6, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.8 }}
          >
            <Magnetic>
              <motion.button
                onClick={() =>
                  document
                    .getElementById('projects')
                    ?.scrollIntoView({ behavior: 'smooth' })
                }
                className="group relative px-8 py-3.5 bg-gradient-to-r from-[#0066FF] to-[#00D4FF] rounded-full text-white font-semibold tracking-wide overflow-hidden shadow-[0_0_20px_rgba(0,102,255,0.3)]"
                whileHover={{
                  scale: 1.05,
                  boxShadow: '0 0 50px rgba(0, 102, 255, 0.5)',
                }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  View My Work
                  <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-[#00D4FF] to-[#0066FF]"
                  initial={{ x: '100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            </Magnetic>

            <Magnetic>
              <motion.button
                onClick={() =>
                  document
                    .getElementById('contact')
                    ?.scrollIntoView({ behavior: 'smooth' })
                }
                className="px-8 py-3.5 border border-gray-700/50 rounded-full text-gray-300 font-semibold tracking-wide hover:border-[#FF0055]/50 hover:text-[#FF0055] transition-all duration-300 backdrop-blur-sm shadow-[0_0_20px_rgba(0,0,0,0.3)]"
                whileHover={{
                  scale: 1.05,
                  boxShadow: '0 0 30px rgba(255, 0, 85, 0.15)',
                }}
                whileTap={{ scale: 0.95 }}
              >
                Get In Touch
              </motion.button>
            </Magnetic>
          </motion.div>

          {/* Social Icons */}
          <motion.div
            className="flex items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 0.8 }}
          >
            {socials.map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="group relative p-3 rounded-xl border border-gray-800/50 hover:border-[#0066FF]/40 bg-white/[0.02] transition-all duration-300"
                whileHover={{
                  scale: 1.15,
                  y: -5,
                  boxShadow: '0 15px 30px rgba(0, 102, 255, 0.15)',
                }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.8 + index * 0.1, duration: 0.5 }}
              >
                <social.icon className="w-5 h-5 text-gray-500 group-hover:text-[#00D4FF] transition-colors" />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.button
        onClick={scrollToAbout}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 0.8 }}
      >
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-gray-600 text-xs uppercase tracking-[0.2em]">
            Scroll
          </span>
          <ChevronDown className="w-5 h-5 text-[#0066FF]" />
        </motion.div>
      </motion.button>

      {/* Infinite Scrolling Ticker at the base of the Hero */}
      <div className="absolute bottom-0 left-0 w-full z-10 hidden md:block">
        <HorizontalMarquee />
      </div>

      {/* Side decorative lines */}
      <motion.div
        className="hidden lg:block absolute left-8 top-1/2 -translate-y-1/2 z-10"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <div className="flex flex-col items-center gap-3">
          <div className="w-px h-24 bg-gradient-to-b from-transparent to-gray-700" />
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-[#0066FF]"
            animate={{
              boxShadow: [
                '0 0 5px #0066FF',
                '0 0 15px #0066FF',
                '0 0 5px #0066FF',
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <div className="w-px h-24 bg-gradient-to-b from-gray-700 to-transparent" />
        </div>
      </motion.div>

      <motion.div
        className="hidden lg:block absolute right-8 top-1/2 -translate-y-1/2 z-10"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <div className="flex flex-col items-center gap-3">
          <div className="w-px h-24 bg-gradient-to-b from-transparent to-gray-700" />
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-[#FF0055]"
            animate={{
              boxShadow: [
                '0 0 5px #FF0055',
                '0 0 15px #FF0055',
                '0 0 5px #FF0055',
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <div className="w-px h-24 bg-gradient-to-b from-gray-700 to-transparent" />
        </div>
      </motion.div>
    </section>
  );
}