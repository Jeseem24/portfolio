'use client';

import { motion } from 'framer-motion';
import MatrixRain from '../effects/MatrixRain';

const quotes = [
  {
    text: "I don't memorize syntax — I harness AI to write it.",
    icon: "⚡",
  },
  {
    text: "I don't limit myself to known stacks — I master new ones on-demand.",
    icon: "🚀",
  },
  {
    text: "I don't code alone — I collaborate with intelligence.",
    icon: "🤖",
  },
  {
    text: "The future isn't about knowing everything — it's about building anything.",
    icon: "✨",
  },
];

export default function PhilosophySection() {
  return (
    <section id="philosophy" className="relative py-24 px-4 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[#0A0A0A]" />
      <MatrixRain />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Title */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Why I Build Differently</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#0066FF] to-[#FF0055] mx-auto rounded-full" />
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            My philosophy is simple: leverage the power of AI to transcend traditional development limitations.
          </p>
        </motion.div>

        {/* Quote Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {quotes.map((quote, index) => (
            <motion.div
              key={index}
              className={`
                relative overflow-hidden rounded-2xl p-8
                ${index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'}
              `}
              initial={{ 
                opacity: 0, 
                x: index % 2 === 0 ? -50 : 50 
              }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
            >
              {/* Glass morphism card */}
              <div className="glass rounded-2xl p-8 h-full relative overflow-hidden group">
                {/* Animated gradient border */}
                <motion.div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: 'linear-gradient(135deg, rgba(0, 102, 255, 0.3), rgba(255, 0, 85, 0.3))',
                  }}
                />
                
                {/* Content */}
                <div className="relative z-10">
                  <motion.span
                    className="text-4xl block mb-4"
                    animate={{ 
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, -5, 0],
                    }}
                    transition={{ 
                      duration: 3, 
                      repeat: Infinity,
                      delay: index * 0.5,
                    }}
                  >
                    {quote.icon}
                  </motion.span>
                  <p className="text-xl md:text-2xl text-white font-medium leading-relaxed">
                    &ldquo;{quote.text}&rdquo;
                  </p>
                </div>

                {/* Decorative elements */}
                <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full opacity-10">
                  <div className="w-full h-full bg-gradient-to-br from-[#0066FF] to-[#FF0055]" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom decoration */}
        <motion.div
          className="flex justify-center mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-px bg-gradient-to-r from-transparent to-[#0066FF]" />
            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-[#0066FF] to-[#FF0055]" />
            <div className="w-16 h-px bg-gradient-to-l from-transparent to-[#FF0055]" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
