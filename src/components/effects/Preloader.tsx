'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const bootSequence = [
  { text: 'INIT SYSTEM BOOT...', delay: 0.2 },
  { text: 'LOADING KERNEL MODULES', delay: 0.4 },
  { text: 'ESTABLISHING SECURE CONNECTION', delay: 0.6 },
  { text: 'MOUNTING VIRTUAL DOM [100%]', delay: 0.8 },
  { text: 'DECRYPTING PORTFOLIO ASSETS', delay: 1.1 },
  { text: 'BYPASSING MAINFRAME ENCRYPTION', delay: 1.3 },
  { text: 'ACCESS GRANTED.', delay: 1.6, isSuccess: true },
  { text: 'WELCOME, JESEEM.OS v2.0', delay: 1.8, isSuccess: true }
];

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [lines, setLines] = useState<{text: string; isSuccess?: boolean}[]>([]);
  const [loadingComplete, setLoadingComplete] = useState(false);

  useEffect(() => {
    let timeouts: NodeJS.Timeout[] = [];
    
    bootSequence.forEach((line) => {
      const timeout = setTimeout(() => {
        setLines(prev => [...prev, line]);
      }, line.delay * 1000);
      timeouts.push(timeout);
    });

    // Flash and disappear after full boot
    const finishTimeout = setTimeout(() => {
      setLoadingComplete(true);
      setTimeout(onComplete, 800); // 800ms for exit animation
    }, (bootSequence[bootSequence.length - 1]!.delay + 0.6) * 1000);

    return () => {
      timeouts.forEach(clearTimeout);
      clearTimeout(finishTimeout);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!loadingComplete && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-[#050508] flex items-center justify-center font-mono overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0, 
            scale: 1.1, 
            filter: 'blur(10px)',
            transition: { duration: 0.8, ease: "easeInOut" }
          }}
        >
          {/* subtle scanline overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] pointer-events-none opacity-50" />
          
          <div className="w-full max-w-2xl p-8 relative z-10">
            {lines.map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className={`text-sm md:text-base lg:text-lg mb-2 ${line.isSuccess ? 'text-[#00FF41] font-bold' : 'text-[#00D4FF]'}`}
              >
                <span className="opacity-50 mr-2 text-gray-500">{`[${(i * 0.123).toFixed(3)}]`}</span>
                {line.text}
              </motion.div>
            ))}
            
            {/* Blinking cursor at the bottom */}
            <motion.div 
              className="w-3 h-5 bg-[#00D4FF] mt-2 inline-block"
              animate={{ opacity: [1, 0] }}
              transition={{ repeat: Infinity, duration: 0.6, ease: "linear" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
