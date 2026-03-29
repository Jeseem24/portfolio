'use client';

import { motion } from 'framer-motion';

export default function HorizontalMarquee() {
  const skills = [
    'REACT', 'NEXT.JS', 'TYPESCRIPT', 'TAILWIND', 'NODE.JS', 
    'FLUTTER', 'PYTHON', 'FIGMA', 'AWS', 'FIREBASE', 'GIT',
    'JAVA', 'C++', 'UI/UX'
  ];

  // Duplicated array to create a seamless infinite loop
  const duplicatedSkills = [...skills, ...skills, ...skills, ...skills];

  return (
    <div className="relative flex w-full overflow-hidden border-y border-white/[0.05] py-5 mt-auto bg-black/50 backdrop-blur-sm z-20">
      {/* Gradient masks for smooth fading on screen edges */}
      <div className="absolute left-0 top-0 bottom-0 w-20 md:w-40 z-10 bg-gradient-to-r from-background to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 md:w-40 z-10 bg-gradient-to-l from-background to-transparent pointer-events-none" />

      <motion.div
        className="flex whitespace-nowrap items-center gap-10 md:gap-16"
        animate={{
          x: ['0%', '-50%'],
        }}
        transition={{
          repeat: Infinity,
          ease: 'linear',
          duration: 40,
        }}
      >
        {duplicatedSkills.map((skill, index) => (
          <div key={`${skill}-${index}`} className="flex items-center gap-10 md:gap-16 text-xl md:text-2xl font-bold font-orbitron text-white/10 uppercase tracking-widest hover:text-white/40 transition-colors cursor-default">
            <span>{skill}</span>
            <span className="text-[#00D4FF]/30 text-lg">✦</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
