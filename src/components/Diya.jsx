import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { soundManager } from '../utils/audio';

export const Diya = ({ 
  size = 'md', // sm, md, lg, xl
  isLit = true, 
  glowIntensity = 1, 
  onIgnite, 
  interactive = true,
  className = "" 
}) => {
  const [lit, setLit] = useState(isLit);
  const [hovered, setHovered] = useState(false);

  const sizeMap = {
    sm: { width: 48, height: 36, scale: 0.7 },
    md: { width: 72, height: 54, scale: 1 },
    lg: { width: 100, height: 74, scale: 1.35 },
    xl: { width: 130, height: 96, scale: 1.7 }
  };

  const currentSize = sizeMap[size] || sizeMap.md;

  const handleClick = () => {
    if (!interactive) return;
    if (!lit) {
      setLit(true);
      soundManager.playDiyaLight();
      if (onIgnite) onIgnite();
    } else {
      soundManager.playDiyaLight();
    }
  };

  return (
    <div 
      className={`relative inline-flex flex-col items-center justify-center select-none ${interactive ? 'cursor-pointer group' : ''} ${className}`}
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ width: currentSize.width, height: currentSize.height + 30 }}
    >
      {/* Ground Glow Shadow */}
      {lit && (
        <motion.div 
          animate={{
            opacity: [0.7 * glowIntensity, 0.95 * glowIntensity, 0.75 * glowIntensity],
            scale: [1, 1.12, 1]
          }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -bottom-2 w-full h-8 rounded-full blur-md pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(255, 170, 0, 0.65) 0%, rgba(255, 80, 0, 0.25) 50%, transparent 80%)'
          }}
        />
      )}

      {/* Flame Container */}
      <div className="relative flex flex-col items-center justify-end h-16 w-full -mb-3 z-10">
        {lit ? (
          <>
            {/* Ambient Large Flame Halo */}
            <motion.div 
              animate={{
                opacity: [0.5 * glowIntensity, 0.85 * glowIntensity, 0.55 * glowIntensity],
                scale: [0.95, 1.15, 0.98]
              }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute -top-3 w-16 h-16 rounded-full blur-xl pointer-events-none"
              style={{
                background: 'radial-gradient(circle, rgba(255, 200, 50, 0.8) 0%, rgba(255, 100, 0, 0.4) 50%, transparent 75%)'
              }}
            />

            {/* Sparkle particle orbiting flame */}
            <motion.div 
              animate={{
                y: [-6, -24, -30],
                opacity: [0, 0.9, 0],
                scale: [0.6, 1.2, 0.4],
                x: [-4, 6, -2]
              }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                ease: "easeOut"
              }}
              className="absolute top-1 w-1.5 h-1.5 bg-yellow-200 rounded-full blur-[0.5px]"
            />

            {/* Realistic Flickering Flame Layer */}
            <motion.div 
              animate={{
                scaleY: [1, 1.12, 0.96, 1.08, 1],
                scaleX: [1, 0.94, 1.06, 0.97, 1],
                skewX: [0, -3, 2.5, -1.5, 0],
                y: [0, -1, 1, -2, 0]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="relative flex flex-col items-center"
            >
              {/* Outer Golden Flame */}
              <div 
                className="w-5 h-9 rounded-full"
                style={{
                  borderRadius: '50% 50% 35% 35% / 80% 80% 25% 25%',
                  background: 'linear-gradient(to top, #ff3b00 0%, #ff8c00 40%, #ffeb3b 85%, #ffffff 100%)',
                  boxShadow: '0 0 16px #ff9900, 0 0 30px #ff5500'
                }}
              />

              {/* Inner Bright Teardrop Core */}
              <div 
                className="absolute bottom-1 w-2.5 h-5 rounded-full"
                style={{
                  borderRadius: '50% 50% 35% 35% / 80% 80% 25% 25%',
                  background: 'linear-gradient(to top, #0284c7 0%, #ffffff 50%, #fef08a 100%)',
                }}
              />

              {/* Ultra hot white center */}
              <div className="absolute bottom-1.5 w-1 h-2 bg-white rounded-full blur-[0.3px]" />
            </motion.div>
          </>
        ) : (
          /* Unlit Diya Smoke Thread */
          <div className="w-0.5 h-3 bg-stone-500/50 rounded-full mb-1" />
        )}

        {/* Cotton Wick (Baati) */}
        <div className="w-1.5 h-2.5 bg-gradient-to-t from-amber-950 via-stone-800 to-black rounded-t -mt-1 z-10" />
      </div>

      {/* Clay Diya Body (Mitti Ka Diya) */}
      <div className="relative w-full z-20">
        <svg 
          viewBox="0 0 100 50" 
          className="w-full drop-shadow-[0_8px_12px_rgba(0,0,0,0.6)]"
          style={{ overflow: 'visible' }}
        >
          <defs>
            {/* Clay Terracotta Gradient */}
            <linearGradient id="clayGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#bf5725" />
              <stop offset="35%" stopColor="#8d3813" />
              <stop offset="70%" stopColor="#672208" />
              <stop offset="100%" stopColor="#3d1203" />
            </linearGradient>

            {/* Gold Filigree Rim Gradient */}
            <linearGradient id="goldRimGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#eab308" />
              <stop offset="30%" stopColor="#fef08a" />
              <stop offset="60%" stopColor="#ca8a04" />
              <stop offset="85%" stopColor="#facc15" />
              <stop offset="100%" stopColor="#854d0e" />
            </linearGradient>

            {/* Inner Oil Glow */}
            <radialGradient id="oilGlow" cx="50%" cy="40%" r="50%">
              <stop offset="0%" stopColor="#ffb300" stopOpacity="0.8" />
              <stop offset="60%" stopColor="#e65100" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#4a1503" stopOpacity="0.9" />
            </radialGradient>
          </defs>

          {/* Diya Base and Clay Bowl */}
          <path 
            d="M 12 18 Q 50 48 88 18 Q 95 24 88 32 Q 50 54 12 32 Q 5 24 12 18 Z" 
            fill="url(#clayGrad)" 
            stroke="#a16207" 
            strokeWidth="0.8" 
          />

          {/* Diya Spout / Front Lip */}
          <path 
            d="M 42 16 Q 50 10 58 16 Q 50 20 42 16 Z" 
            fill="#d97706" 
          />

          {/* Diya Rim Upper Opening */}
          <ellipse 
            cx="50" 
            cy="18" 
            rx="38" 
            ry="9" 
            fill="url(#oilGlow)" 
            stroke="url(#goldRimGrad)" 
            strokeWidth="1.8" 
          />

          {/* Decorative Gold Filigree Dots on the Rim */}
          <g fill="#fde047">
            <circle cx="20" cy="18" r="1.3" />
            <circle cx="26" cy="21" r="1.3" />
            <circle cx="34" cy="23" r="1.3" />
            <circle cx="42" cy="24" r="1.3" />
            <circle cx="50" cy="24.5" r="1.5" />
            <circle cx="58" cy="24" r="1.3" />
            <circle cx="66" cy="23" r="1.3" />
            <circle cx="74" cy="21" r="1.3" />
            <circle cx="80" cy="18" r="1.3" />
          </g>

          {/* Delicate Side Carving Motif */}
          <path 
            d="M 30 28 Q 50 38 70 28" 
            stroke="url(#goldRimGrad)" 
            strokeWidth="1.2" 
            fill="none" 
            strokeDasharray="2 2" 
          />
        </svg>

        {/* Hover Highlight Ring */}
        {interactive && (
          <div className="absolute inset-0 rounded-full transition-opacity opacity-0 group-hover:opacity-100 ring-2 ring-yellow-400/40 blur-sm pointer-events-none" />
        )}
      </div>
    </div>
  );
};
