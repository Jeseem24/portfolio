'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface GlitchTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function GlitchText({ text, className = '', style }: GlitchTextProps) {
  const [displayText, setDisplayText] = useState('');
  const [hasRevealed, setHasRevealed] = useState(false);

  useEffect(() => {
    if (hasRevealed) return;

    const glitchChars = '!<>-_\\/[]{}—=+*^?#@$%&';
    let currentIndex = 0;
    let glitchIterations = 0;
    const maxGlitchPerChar = 4;

    const interval = setInterval(() => {
      if (currentIndex >= text.length) {
        clearInterval(interval);
        setDisplayText(text);
        setHasRevealed(true);
        return;
      }

      const revealed = text.slice(0, currentIndex);
      const currentCharGlitch =
        glitchChars[Math.floor(Math.random() * glitchChars.length)];
      const remaining = text
        .slice(currentIndex + 1)
        .split('')
        .map(() =>
          Math.random() > 0.7
            ? glitchChars[Math.floor(Math.random() * glitchChars.length)]
            : ' '
        )
        .join('');

      setDisplayText(revealed + currentCharGlitch + remaining);

      glitchIterations++;
      if (glitchIterations >= maxGlitchPerChar) {
        currentIndex++;
        glitchIterations = 0;
      }
    }, 50);

    return () => clearInterval(interval);
  }, [text, hasRevealed]);

  return (
    <motion.span className={`relative inline-block ${className}`} style={style}>
      {hasRevealed ? (
        <span>{text}</span>
      ) : (
        <span>{displayText}</span>
      )}
    </motion.span>
  );
}