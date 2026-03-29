'use client';

import { motion } from 'framer-motion';
import { Github, Linkedin, Instagram, Heart, ArrowUp } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const socials = [
    { icon: Github, href: 'https://github.com/Jeseem24', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/jeseem24/', label: 'LinkedIn' },
    { icon: Instagram, href: 'https://instagram.com/jeseem._', label: 'Instagram' },
  ];

  return (
    <footer className="relative py-8 px-4 overflow-hidden bg-transparent">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="flex flex-col items-center">
          <motion.button
            onClick={scrollToTop}
            className="group mb-5 p-3 rounded-full border border-gray-800 hover:border-[#0066FF]/50 transition-colors"
            whileHover={{ y: -5, boxShadow: '0 10px 30px rgba(0, 102, 255, 0.1)' }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <ArrowUp className="w-5 h-5 text-gray-500 group-hover:text-[#00D4FF] transition-colors" />
          </motion.button>

          <motion.h3
            className="text-2xl font-bold gradient-text tracking-wider mb-3"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            JESEEM
          </motion.h3>

          {/* Attribution Removed */}

          <motion.div
            className="flex items-center gap-3 mb-5"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {socials.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="p-2.5 rounded-lg text-gray-600 hover:text-[#00D4FF] hover:bg-white/[0.03] transition-all"
                whileHover={{ y: -3, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <social.icon className="w-4 h-4" />
              </motion.a>
            ))}
          </motion.div>

          <div className="w-full max-w-xs h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent mb-4" />

          <p className="text-gray-700 text-xs tracking-wider">
            © {currentYear} Jeseem. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}