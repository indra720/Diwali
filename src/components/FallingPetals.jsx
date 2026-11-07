import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

export const FallingPetals = ({ count = 22, active = true }) => {
  const petals = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const isMarigold = i % 3 !== 0; // 66% marigold, 33% rose
      return {
        id: i,
        x: Math.random() * 100, // percentage
        yStart: -20 - Math.random() * 40,
        size: 14 + Math.random() * 16,
        duration: 9 + Math.random() * 8,
        delay: Math.random() * 6,
        rotateStart: Math.random() * 360,
        rotateEnd: Math.random() * 360 + 720,
        swayAmplitude: 30 + Math.random() * 45,
        type: isMarigold ? (Math.random() > 0.5 ? 'marigold-yellow' : 'marigold-orange') : 'rose-red',
      };
    });
  }, [count]);

  if (!active) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-20 overflow-hidden">
      {petals.map((p) => {
        let bgStyle = '';
        if (p.type === 'marigold-yellow') {
          bgStyle = 'radial-gradient(circle at 40% 30%, #ffeb3b 0%, #fbc02d 50%, #f57f17 100%)';
        } else if (p.type === 'marigold-orange') {
          bgStyle = 'radial-gradient(circle at 40% 30%, #ffb74d 0%, #ff9800 50%, #e65100 100%)';
        } else {
          bgStyle = 'radial-gradient(circle at 40% 30%, #f43f5e 0%, #e11d48 50%, #881337 100%)';
        }

        return (
          <motion.div
            key={p.id}
            initial={{
              x: `${p.x}vw`,
              y: `${p.yStart}vh`,
              rotate: p.rotateStart,
              opacity: 0,
              scale: 0.8
            }}
            animate={{
              y: ['0vh', '110vh'],
              x: [
                `${p.x}vw`,
                `${p.x + (p.id % 2 === 0 ? 4 : -4)}vw`,
                `${p.x - (p.id % 2 === 0 ? 3 : -3)}vw`,
                `${p.x}vw`
              ],
              rotate: [p.rotateStart, p.rotateEnd],
              opacity: [0, 0.9, 0.9, 0],
              scale: [0.8, 1, 0.9]
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: "linear"
            }}
            className="absolute shadow-sm"
            style={{
              width: p.size,
              height: p.size * 1.3,
              background: bgStyle,
              borderRadius: '60% 40% 60% 40% / 70% 30% 70% 30%',
              boxShadow: '0 2px 6px rgba(0,0,0,0.25)',
              filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.15))'
            }}
          />
        );
      })}
    </div>
  );
};
