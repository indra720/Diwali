import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { Diya } from './Diya';

export const AnimatedGreetingSequence = () => {
  // Left & Right flanking diyas data for desktop/tablet
  const leftDiyas = [
    { id: 'l1', size: 'sm' },
    { id: 'l2', size: 'md' },
    { id: 'l3', size: 'lg' },
  ];

  const rightDiyas = [
    { id: 'r1', size: 'sm' },
    { id: 'r2', size: 'md' },
    { id: 'r3', size: 'lg' },
  ];

  return (
    <div className="relative h-screen max-h-[100dvh] w-full flex flex-col justify-between items-center px-3 sm:px-6 py-4 overflow-hidden select-none">
      {/* Glossy Reflective Courtyard Floor Gradient */}
      <div 
        className="absolute bottom-0 inset-x-0 h-[40vh] pointer-events-none"
        style={{
          background: 'linear-gradient(to top, rgba(4, 6, 21, 0.95) 0%, rgba(9, 13, 38, 0.7) 60%, transparent 100%)'
        }}
      />

      {/* Golden Light Pillar in center background (GPU accelerated without heavy filter blur) */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 sm:w-80 h-full pointer-events-none animate-diya-glow"
        style={{
          background: 'radial-gradient(ellipse at 50% 100%, rgba(255, 215, 0, 0.35) 0%, rgba(255, 140, 0, 0.12) 40%, transparent 80%)',
          transform: 'translateZ(0)'
        }}
      />

      {/* ============================================================== */}
      {/* LEFT FLANKING DIYAS (Desktop/Tablet)                           */}
      {/* ============================================================== */}
      <div className="hidden md:flex absolute left-4 lg:left-8 top-0 bottom-0 w-20 pointer-events-none z-30 flex-col justify-around py-16">
        {leftDiyas.map((diya, index) => (
          <motion.div
            key={diya.id}
            initial={{ opacity: 0, x: -30, scale: 0.7 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            className="flex flex-col items-center pointer-events-auto"
          >
            <Diya
              size={diya.size}
              isLit={true}
              glowIntensity={1.3}
              interactive={true}
            />
          </motion.div>
        ))}
      </div>

      {/* ============================================================== */}
      {/* RIGHT FLANKING DIYAS (Desktop/Tablet)                          */}
      {/* ============================================================== */}
      <div className="hidden md:flex absolute right-4 lg:right-8 top-0 bottom-0 w-20 pointer-events-none z-30 flex-col justify-around py-16">
        {rightDiyas.map((diya, index) => (
          <motion.div
            key={diya.id}
            initial={{ opacity: 0, x: 30, scale: 0.7 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            className="flex flex-col items-center pointer-events-auto"
          >
            <Diya
              size={diya.size}
              isLit={true}
              glowIntensity={1.3}
              interactive={true}
            />
          </motion.div>
        ))}
      </div>

      {/* TOP SPACER (keeps distance from the fixed top bar) */}
      <div className="h-10 sm:h-12 shrink-0" />

      {/* ============================================================== */}
      {/* CENTER CELEBRATION CONTENT (IMMEDIATELY SHOWN UPON OPENING)    */}
      {/* ============================================================== */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-30 max-w-xl w-full mx-auto my-auto text-center flex flex-col items-center py-2 px-2"
      >
        {/* Sacred Shubh Dipawali Date Badge */}
        <div className="text-yellow-400 font-cinzel text-[10px] sm:text-xs tracking-[0.25em] uppercase mb-1.5 flex items-center justify-center gap-1.5">
          <span>✦</span>
          <span>शुभ दीपावली • 8 NOVEMBER 2026</span>
          <span>✦</span>
        </div>

        {/* MAIN HEADING: ✨ HAPPY DIWALI ✨ WITH MOBILE FLANKING DIYAS */}
        <div className="mb-2 relative w-full flex items-center justify-center gap-2 sm:gap-4">
          {/* Mobile Left Diya */}
          <div className="md:hidden shrink-0">
            <Diya size="sm" isLit={true} glowIntensity={1.2} />
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-amber-400/20 blur-2xl rounded-full pointer-events-none" />
            <h1 className="relative font-serif font-black text-2xl sm:text-4xl md:text-5xl tracking-wider leading-none">
              <span className="gold-text-shine drop-shadow-[0_4px_25px_rgba(250,204,21,0.7)]">
                HAPPY DIWALI
              </span>
            </h1>
          </div>

          {/* Mobile Right Diya */}
          <div className="md:hidden shrink-0">
            <Diya size="sm" isLit={true} glowIntensity={1.2} />
          </div>
        </div>

        {/* PERSONALIZED RECIPIENT BLESSING CARD: RIYA (NO SURNAME) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="w-full px-4 sm:px-7 py-4 sm:py-6 rounded-2xl border border-yellow-500/40 bg-[#0d102e]/95 sm:bg-[#111638]/85 backdrop-blur-none sm:backdrop-blur-xl shadow-[0_0_35px_rgba(234,179,8,0.25)] relative overflow-hidden my-2"
        >
          {/* Corner Ornaments */}
          <div className="absolute top-2 left-2 text-yellow-500/50 text-xs">✦</div>
          <div className="absolute top-2 right-2 text-yellow-500/50 text-xs">✦</div>
          <div className="absolute bottom-2 left-2 text-yellow-500/50 text-xs">✦</div>
          <div className="absolute bottom-2 right-2 text-yellow-500/50 text-xs">✦</div>

          {/* Recipient Salutation: Riya */}
          <h2 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-yellow-200 mb-2.5 flex items-center justify-center gap-1.5 flex-wrap">
            <span>Dear</span>
            <span className="gold-text-gradient underline decoration-yellow-500/50 underline-offset-4 font-extrabold">
              Riya
            </span>
            <span>,</span>
          </h2>

          {/* Heartfelt College Friendship Diwali Wishes */}
          <div className="space-y-2 text-xs sm:text-sm md:text-base text-yellow-50/95 font-sans font-normal leading-relaxed">
            <p>
              To my most wonderful college friend — may this Diwali bring you boundless happiness, laughter, cherished memories, and unstoppable success in everything you do!
            </p>
            <p className="text-yellow-300 font-serif italic text-xs sm:text-sm">
              "May every diya bring a new reason to smile! ✨"
            </p>
          </div>

          {/* Sender Signature */}
          <div className="mt-4 pt-3 border-t border-yellow-500/30 flex flex-col items-center">
            <p className="font-cursive text-lg sm:text-2xl text-yellow-200 mb-0.5 flex items-center gap-1.5">
              <span>Lots of Love & Best Wishes</span>
              <span className="text-red-500">❤️</span>
            </p>
            <p className="text-[11px] sm:text-xs text-yellow-400 font-semibold tracking-wider font-sans uppercase">
              FROM: INDRAJEET
            </p>
          </div>
        </motion.div>

        {/* Tap Sky Hint */}
        <motion.p
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2.5, repeat: Infinity }}
          className="text-[10px] sm:text-xs text-yellow-300/80 font-sans tracking-wide mt-2 flex items-center justify-center gap-1"
        >
          <Sparkles className="w-3 h-3 text-yellow-400" />
          <span>Tap anywhere in the night sky to launch fireworks!</span>
          <Sparkles className="w-3 h-3 text-yellow-400" />
        </motion.p>
      </motion.div>

      {/* BOTTOM SPACING */}
      <div className="h-4 sm:h-6 shrink-0" />
    </div>
  );
};
