import React, { useState } from 'react';

export const Diya = ({ 
  size = 'md', // sm, md, lg, xl
  isLit = true, 
  glowIntensity = 1, 
  onIgnite, 
  interactive = true,
  className = "" 
}) => {
  const [lit, setLit] = useState(isLit);

  const sizeMap = {
    sm: { width: 48, height: 36 },
    md: { width: 72, height: 54 },
    lg: { width: 100, height: 74 },
    xl: { width: 130, height: 96 }
  };

  const currentSize = sizeMap[size] || sizeMap.md;

  const handleClick = () => {
    if (!interactive) return;
    if (!lit) {
      setLit(true);
      if (onIgnite) onIgnite();
    }
  };

  return (
    <div 
      className={`relative inline-flex flex-col items-center justify-center select-none ${interactive ? 'cursor-pointer group' : ''} ${className}`}
      onClick={handleClick}
      style={{ width: currentSize.width, height: currentSize.height + 26 }}
    >
      {/* Ground Glow Shadow (Hardware CSS accelerated) */}
      {lit && (
        <div 
          className="absolute -bottom-1 w-full h-6 rounded-full animate-diya-glow pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(255, 170, 0, 0.6) 0%, rgba(255, 80, 0, 0.2) 50%, transparent 80%)',
            opacity: 0.85 * glowIntensity,
            transform: 'translateZ(0)',
          }}
        />
      )}

      {/* Flame Container */}
      <div className="relative flex flex-col items-center justify-end h-14 w-full -mb-2.5 z-10">
        {lit ? (
          <>
            {/* Ambient Flame Halo (Lightweight GPU radial) */}
            <div 
              className="absolute -top-2 w-14 h-14 rounded-full animate-diya-glow pointer-events-none"
              style={{
                background: 'radial-gradient(circle, rgba(255, 200, 50, 0.6) 0%, rgba(255, 100, 0, 0.25) 50%, transparent 75%)',
                opacity: 0.75 * glowIntensity,
                transform: 'translateZ(0)',
              }}
            />

            {/* Realistic Flickering Flame Layer (GPU CSS keyframe) */}
            <div className="relative flex flex-col items-center animate-flame">
              {/* Outer Golden Flame */}
              <div 
                className="w-4 sm:w-5 h-8 sm:h-9 rounded-full"
                style={{
                  borderRadius: '50% 50% 35% 35% / 80% 80% 25% 25%',
                  background: 'linear-gradient(to top, #ff3b00 0%, #ff8c00 40%, #ffeb3b 85%, #ffffff 100%)',
                  boxShadow: '0 0 12px #ff9900, 0 0 24px #ff5500',
                  transform: 'translateZ(0)'
                }}
              />

              {/* Inner Bright Teardrop Core */}
              <div 
                className="absolute bottom-1 w-2 sm:w-2.5 h-4 sm:h-5 rounded-full"
                style={{
                  borderRadius: '50% 50% 35% 35% / 80% 80% 25% 25%',
                  background: 'linear-gradient(to top, #0284c7 0%, #ffffff 50%, #fef08a 100%)',
                  transform: 'translateZ(0)'
                }}
              />

              {/* Ultra hot white center */}
              <div className="absolute bottom-1.5 w-1 h-2 bg-white rounded-full opacity-90" />
            </div>
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
          className="w-full drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]"
          style={{ overflow: 'visible' }}
        >
          <defs>
            <linearGradient id={`clayGrad-${size}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#bf5725" />
              <stop offset="35%" stopColor="#8d3813" />
              <stop offset="70%" stopColor="#672208" />
              <stop offset="100%" stopColor="#3d1203" />
            </linearGradient>

            <linearGradient id={`goldRimGrad-${size}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#eab308" />
              <stop offset="30%" stopColor="#fef08a" />
              <stop offset="60%" stopColor="#ca8a04" />
              <stop offset="85%" stopColor="#facc15" />
              <stop offset="100%" stopColor="#854d0e" />
            </linearGradient>

            <radialGradient id={`oilGlow-${size}`} cx="50%" cy="40%" r="50%">
              <stop offset="0%" stopColor="#ffb300" stopOpacity="0.8" />
              <stop offset="60%" stopColor="#e65100" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#4a1503" stopOpacity="0.9" />
            </radialGradient>
          </defs>

          {/* Diya Base and Clay Bowl */}
          <path 
            d="M 12 18 Q 50 48 88 18 Q 95 24 88 32 Q 50 54 12 32 Q 5 24 12 18 Z" 
            fill={`url(#clayGrad-${size})`} 
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
            fill={`url(#oilGlow-${size})`} 
            stroke={`url(#goldRimGrad-${size})`} 
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
            stroke={`url(#goldRimGrad-${size})`} 
            strokeWidth="1.2" 
            fill="none" 
            strokeDasharray="2 2" 
          />
        </svg>

        {interactive && (
          <div className="absolute inset-0 rounded-full transition-opacity opacity-0 group-hover:opacity-100 ring-2 ring-yellow-400/40 blur-sm pointer-events-none" />
        )}
      </div>
    </div>
  );
};
