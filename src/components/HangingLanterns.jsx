import React from 'react';

export const HangingLanterns = () => {
  const lanterns = [
    { x: '4%', height: 160, scale: 0.85, delay: '0s' },
    { x: '16%', height: 110, scale: 0.7, delay: '1s' },
    { x: '84%', height: 120, scale: 0.75, delay: '1.5s' },
    { x: '96%', height: 180, scale: 0.9, delay: '0.5s' },
  ];

  return (
    <div className="absolute top-0 left-0 right-0 pointer-events-none z-30 overflow-hidden h-72 sm:h-96">
      {lanterns.map((l, index) => (
        <div
          key={index}
          className={`absolute top-0 flex flex-col items-center animate-lantern-sway ${index === 1 || index === 2 ? 'hidden sm:flex' : ''}`}
          style={{ 
            left: l.x, 
            animationDelay: l.delay,
            transform: 'translateZ(0)'
          }}
        >
          {/* Hanging Thread */}
          <div 
            className="w-0.5 bg-gradient-to-b from-amber-200/20 via-amber-400 to-amber-600 shadow-[0_0_6px_rgba(250,204,21,0.4)]" 
            style={{ height: l.height }} 
          />

          {/* Lantern Head Bracket */}
          <div className="w-5 h-2 bg-gradient-to-r from-amber-700 via-yellow-400 to-amber-800 rounded-sm shadow-md -mt-0.5" />

          {/* Lantern Body (Akash Kandil) */}
          <div className="relative flex flex-col items-center" style={{ transform: `scale(${l.scale})` }}>
            {/* Ambient Internal Glow */}
            <div
              className="absolute inset-0 w-20 h-20 -left-5 -top-2 rounded-full blur-md bg-gradient-to-r from-amber-400/35 via-yellow-400/40 to-orange-500/35 pointer-events-none animate-diya-glow"
            />

            {/* Geometric Diamond Lantern Body */}
            <div className="relative w-12 sm:w-14 h-14 sm:h-16 bg-gradient-to-br from-amber-500 via-rose-700 to-amber-900 rounded-lg border border-yellow-300/60 shadow-[0_0_20px_rgba(255,180,0,0.4)] flex items-center justify-center overflow-hidden">
              {/* Internal glowing diamond */}
              <div className="w-7 h-7 rotate-45 border border-yellow-200/50 bg-gradient-to-br from-yellow-300/40 to-transparent flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_10px_#fff]" />
              </div>

              {/* Gold Filigree Lattice Patterns */}
              <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(#ffd700_1px,transparent_1px)] [background-size:6px_6px] opacity-35" />
            </div>

            {/* Lantern Bottom Gold Cap */}
            <div className="w-5 h-2 bg-gradient-to-r from-amber-800 via-yellow-400 to-amber-800 rounded-sm -mt-0.5" />

            {/* Silk Tassels */}
            <div className="flex justify-center gap-1 mt-0.5">
              {[0, 1, 2, 3, 4].map((t) => (
                <div
                  key={t}
                  className="w-0.5 bg-gradient-to-b from-yellow-400 via-amber-500 to-red-600 rounded-b shadow-[0_0_4px_rgba(250,204,21,0.5)]"
                  style={{ height: 24 + (t === 2 ? 10 : t === 1 || t === 3 ? 6 : 0) }}
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
