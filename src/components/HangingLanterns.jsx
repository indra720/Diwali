import React from 'react';
import { motion } from 'framer-motion';

export const HangingLanterns = () => {
  const lanterns = [
    { x: '6%', height: 180, delay: 0, scale: 0.9, duration: 4.8 },
    { x: '18%', height: 130, delay: 0.8, scale: 0.75, duration: 5.4 },
    { x: '82%', height: 140, delay: 1.2, scale: 0.8, duration: 5.1 },
    { x: '94%', height: 200, delay: 0.4, scale: 0.95, duration: 4.5 },
  ];

  return (
    <div className="absolute top-0 left-0 right-0 pointer-events-none z-30 overflow-hidden h-96">
      {lanterns.map((l, index) => (
        <motion.div
          key={index}
          className="absolute top-0 flex flex-col items-center"
          style={{ left: l.x }}
          animate={{
            rotate: [-2.5, 2.5, -2.5],
            transformOrigin: 'top center'
          }}
          transition={{
            duration: l.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: l.delay
          }}
        >
          {/* Hanging Thread */}
          <div 
            className="w-0.5 bg-gradient-to-b from-amber-200/20 via-amber-400 to-amber-600 shadow-[0_0_8px_rgba(250,204,21,0.5)]" 
            style={{ height: l.height }} 
          />

          {/* Lantern Head Bracket */}
          <div className="w-5 h-2 bg-gradient-to-r from-amber-700 via-yellow-400 to-amber-800 rounded-sm shadow-md -mt-0.5" />

          {/* Lantern Body (Akash Kandil) */}
          <div className="relative flex flex-col items-center" style={{ transform: `scale(${l.scale})` }}>
            {/* Ambient Internal Glow */}
            <motion.div
              animate={{
                opacity: [0.6, 0.95, 0.65],
                scale: [0.95, 1.15, 0.98]
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: l.delay
              }}
              className="absolute inset-0 w-24 h-24 -left-6 -top-2 rounded-full blur-xl bg-gradient-to-r from-amber-400/40 via-yellow-400/50 to-orange-500/40 pointer-events-none"
            />

            {/* Geometric Diamond Lantern Body */}
            <div className="relative w-14 h-16 bg-gradient-to-br from-amber-500 via-rose-700 to-amber-900 rounded-lg border border-yellow-300/60 shadow-[0_0_25px_rgba(255,180,0,0.45)] flex items-center justify-center overflow-hidden">
              {/* Internal glowing diamond */}
              <div className="w-8 h-8 rotate-45 border border-yellow-200/50 bg-gradient-to-br from-yellow-300/40 to-transparent flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-white blur-[1px] shadow-[0_0_12px_#fff]" />
              </div>

              {/* Gold Filigree Lattice Patterns */}
              <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(#ffd700_1px,transparent_1px)] [background-size:6px_6px] opacity-35" />
            </div>

            {/* Lantern Bottom Gold Cap */}
            <div className="w-6 h-2 bg-gradient-to-r from-amber-800 via-yellow-400 to-amber-800 rounded-sm -mt-0.5" />

            {/* Swaying Silk Tassels */}
            <div className="flex justify-center gap-1 mt-0.5">
              {[0, 1, 2, 3, 4].map((t) => (
                <motion.div
                  key={t}
                  animate={{
                    skewX: [-4 + t, 4 - t, -4 + t],
                  }}
                  transition={{
                    duration: 3 + t * 0.3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="w-0.5 bg-gradient-to-b from-yellow-400 via-amber-500 to-red-600 rounded-b shadow-[0_0_6px_rgba(250,204,21,0.6)]"
                  style={{ height: 28 + (t === 2 ? 14 : t === 1 || t === 3 ? 8 : 0) }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
