'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  Mail,
  Github,
  Linkedin,
  Instagram,
  ArrowUpRight,
  MessageSquare,
  Send,
} from 'lucide-react';
import TiltCard from '../effects/TiltCard';

export default function ContactSection() {
  const email = 'jeseem.502329@sxcce.edu.in';
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, -50]);

  const socials = [
    { name: 'GitHub', icon: Github, href: 'https://github.com/Jeseem24', color: '#FFFFFF', description: 'Check out my code' },
    { name: 'LinkedIn', icon: Linkedin, href: 'https://www.linkedin.com/in/jeseem24/', color: '#0A66C2', description: 'Connect professionally' },
    { name: 'Instagram', icon: Instagram, href: 'https://www.instagram.com/jeseem._/', color: '#E1306C', description: '@jeseem._' },
    { name: 'Email', icon: Mail, href: `mailto:${email}`, color: '#00D4FF', description: 'Drop me a line' },
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-16 md:py-20 px-4 overflow-hidden bg-transparent"
    >
      <motion.div className="absolute inset-0 pointer-events-none" style={{ y: bgY }}>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0D0D10]/40 to-transparent" />
      </motion.div>

      {/* Ambient Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/3 left-1/4 w-64 h-64 rounded-full bg-[#0066FF]/5 blur-[100px]"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 5, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/4 w-64 h-64 rounded-full bg-[#FF0055]/5 blur-[100px]"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 5, repeat: Infinity, delay: 2 }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-sm uppercase tracking-[0.3em] text-[#0066FF] font-mono mb-4 block">
            What's Next?
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 font-orbitron tracking-wide">
            <span className="gradient-text">Get In Touch</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#0066FF] to-[#00D4FF] mx-auto rounded-full" />
          <p className="text-gray-500 mt-5 max-w-lg mx-auto text-base md:text-lg">
            Have a project in mind or just want to chat? I&apos;m always open to new conversations and opportunities.
          </p>
        </motion.div>

        {/* Social Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {socials.map((social, index) => (
            <motion.div
              key={social.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <motion.a
                href={social.href}
                target={social.name !== 'Email' ? '_blank' : undefined}
                rel={social.name !== 'Email' ? 'noopener noreferrer' : undefined}
                className="block h-full w-full outline-none"
              >
                <TiltCard intensity={10} className="h-full w-full">
                  <div
                    className="group glass rounded-2xl p-5 text-center transition-all duration-300 h-full w-full flex flex-col items-center justify-center relative cursor-pointer hover:shadow-[0_20px_40px_rgba(255,255,255,0.05)]"
                    style={{ borderColor: 'rgba(255, 255, 255, 0.05)' }}
                  >
                    <motion.div
                      className="w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center border border-white/[0.06] bg-white/[0.02] group-hover:border-white/10 transition-colors"
                      whileHover={{ rotate: 10, scale: 1.1 }}
                    >
                      <social.icon className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                    </motion.div>
                    <h3 className="text-sm font-semibold text-white mb-1">{social.name}</h3>
                    <p className="text-xs text-gray-500 group-hover:text-gray-400 transition-colors">
                      {social.description}
                    </p>
                    <ArrowUpRight className="absolute top-4 right-4 w-4 h-4 text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </TiltCard>
              </motion.a>
            </motion.div>
          ))}
        </div>

        {/* Fallback CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <motion.a
            href={`mailto:${email}`}
            className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#0066FF] to-[#00D4FF] rounded-full text-white font-semibold text-lg relative overflow-hidden"
            whileHover={{
              scale: 1.05,
              boxShadow: '0 0 50px rgba(0, 102, 255, 0.3)',
            }}
            whileTap={{ scale: 0.95 }}
          >
            <MessageSquare className="w-5 h-5 relative z-10" />
            <span className="relative z-10">Say Hello</span>
            <Send className="w-4 h-4 relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-[#00D4FF] to-[#FF0055]"
              initial={{ x: '100%' }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.4 }}
            />
          </motion.a>
          <p className="text-gray-600 text-sm mt-4">I typically respond within 24 hours</p>
        </motion.div>
      </div>
    </section>
  );
}