'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface NastaliqRevealProps {
  text: string;
  fontSize?: string;
  color?: string;
  delay?: number;
  duration?: number;
  as?: 'span' | 'div' | 'p';
}

export function NastaliqReveal({
  text,
  fontSize = '2rem',
  color = '#c9a962',
  delay = 0,
  duration = 0.05,
  as: Component = 'span',
}: NastaliqRevealProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    setDisplayedText('');
    setIsAnimating(true);
    
    let currentIndex = 0;
    const timer = setInterval(() => {
      if (currentIndex <= text.length) {
        setDisplayedText(text.slice(0, currentIndex));
        currentIndex++;
      } else {
        setIsAnimating(false);
        clearInterval(timer);
      }
    }, duration * 1000);

    return () => clearInterval(timer);
  }, [text, duration]);

  return (
    <Component
      style={{
        fontFamily: '"Vazir", "Noto Naskh Arabic", serif',
        fontSize,
        color,
        direction: 'rtl',
        lineHeight: 2,
      }}
    >
      {displayedText}
      <motion.span
        animate={{ opacity: isAnimating ? [1, 0] : 1 }}
        transition={{ duration: 0.5, repeat: isAnimating ? Infinity : 0, repeatDelay: 0.5 }}
        style={{
          display: 'inline-block',
          width: '2px',
          height: '1.2em',
          backgroundColor: color,
          marginRight: '2px',
          verticalAlign: 'text-bottom',
        }}
      />
    </Component>
  );
}

interface VerseRevealProps {
  persian: string;
  english?: string;
  source?: string;
  showEnglish?: boolean;
}

export function VerseReveal({
  persian,
  english,
  source,
  showEnglish = true,
}: VerseRevealProps) {
  return (
    <div style={{ textAlign: 'right', direction: 'rtl' }}>
      <NastaliqReveal
        text={persian}
        fontSize="clamp(1.5rem, 4vw, 2.5rem)"
        color="#c9a962"
        delay={0.5}
        duration={0.03}
        as="p"
      />
      {showEnglish && english && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 0.8, y: 0 }}
          transition={{ delay: 2, duration: 0.8 }}
          style={{
            fontFamily: '"Vazir", serif',
            fontSize: 'clamp 2vw, 1.3(1rem,rem)',
            color: '#c9a962',
            opacity: 0.8,
            marginTop: '1rem',
          }}
        >
          {english}
        </motion.p>
      )}
      {source && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ delay: 2.5, duration: 0.8 }}
          style={{
            fontFamily: '"Vazir", serif',
            fontSize: '0.85rem',
            color: '#c9a962',
            marginTop: '1rem',
            letterSpacing: '0.2em',
          }}
        >
          — {source}
        </motion.p>
      )}
    </div>
  );
}

export default NastaliqReveal;
