import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles, BookOpen, Star, Calendar } from 'lucide-react';

export const BookScene = ({ onBookOpened }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [pageTurnStep, setPageTurnStep] = useState(0);

  const handleOpenBook = () => {
    if (isOpen) return;
    setIsOpen(true);

    // Trigger golden star & sparkle confetti burst
    try {
      confetti({
        particleCount: 85,
        spread: 100,
        origin: { y: 0.55 },
        colors: ['#ffd700', '#ffeb3b', '#ffa000', '#fff8e1', '#ff5722'],
        shapes: ['circle'],
        scalar: 1.2
      });
    } catch (e) {}

    // Staggered page turn steps
    setTimeout(() => {
      setPageTurnStep(1);
    }, 450);

    setTimeout(() => {
      setPageTurnStep(2);
    }, 1100);

    // Zoom into celebration
    setTimeout(() => {
      if (onBookOpened) onBookOpened();
    }, 2400);
  };

  return (
    <div className="relative h-screen max-h-[100dvh] w-full flex flex-col justify-between items-center px-4 py-3 sm:py-5 overflow-hidden select-none perspective-2000">
      {/* Background Starfield and Floating Stars */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 24 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0.2 }}
            animate={{
              opacity: [0.2, 0.9, 0.2],
              scale: [0.8, 1.4, 0.8],
            }}
            transition={{
              duration: 2 + (i % 5),
              repeat: Infinity,
              delay: (i % 7) * 0.4
            }}
            className="absolute rounded-full bg-yellow-200"
            style={{
              top: `${(i * 23) % 100}%`,
              left: `${(i * 31) % 100}%`,
              width: (i % 3) + 2,
              height: (i % 3) + 2,
              boxShadow: '0 0 6px #fde047'
            }}
          />
        ))}
      </div>

      {/* TOP SPACER (keeps distance from the fixed top bar) */}
      <div className="h-10 sm:h-12 shrink-0" />

      {/* COMPACT TOP HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: isOpen ? 0 : 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center z-30 shrink-0"
      >
        <div className="inline-flex items-center gap-1.5 text-yellow-400 font-semibold tracking-widest text-[10px] sm:text-xs uppercase bg-yellow-500/10 px-3.5 py-1 rounded-full border border-yellow-500/30">
          <Calendar className="w-3 h-3 text-yellow-300" />
          <span>8 NOVEMBER 2026 • DIWALI SPECIAL</span>
        </div>
        <h2 className="text-lg sm:text-2xl font-serif text-yellow-100 mt-1 font-semibold">
          Your Personalized Diwali Storybook
        </h2>
      </motion.div>

      {/* 3D BOOK STAGE WRAPPER WITH DYNAMIC CAMERA ZOOM */}
      <motion.div
        animate={isOpen ? {
          scale: [1, 1.05, 2.3],
          z: [0, 50, 450],
          opacity: [1, 1, 0.1],
          transition: { duration: 2.3, ease: [0.65, 0, 0.35, 1], times: [0, 0.3, 1] }
        } : {
          y: [-5, 5, -5],
          rotateX: [2, 0, 2],
          rotateZ: [-0.5, 0.5, -0.5],
          transition: { duration: 5, repeat: Infinity, ease: "easeInOut" }
        }}
        className="relative z-20 flex items-center justify-center cursor-pointer select-none my-auto"
        onClick={handleOpenBook}
        style={{ perspective: '1600px', transformStyle: 'preserve-3d' }}
      >
        {/* Under-Book Volumetric Golden Light Beam that erupts on open */}
        {isOpen && (
          <motion.div
            initial={{ scale: 0.2, opacity: 0 }}
            animate={{ scale: [0.2, 2.8], opacity: [0, 1, 0.9] }}
            transition={{ duration: 1.8, ease: "easeOut" }}
            className="absolute z-50 pointer-events-none w-80 h-80 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(255, 240, 160, 0.95) 0%, rgba(255, 180, 20, 0.75) 30%, rgba(255, 90, 0, 0.4) 60%, transparent 80%)',
              filter: 'blur(30px)'
            }}
          />
        )}

        {/* 3D Realistic Book Container (Responsive sizing: fits inside 100vh on mobile and desktop) */}
        <div 
          className="relative w-[230px] sm:w-[280px] md:w-[310px] h-[315px] sm:h-[380px] md:h-[420px] rounded-r-2xl preserve-3d"
          style={{
            boxShadow: isOpen 
              ? '0 30px 80px rgba(255, 190, 0, 0.6), 0 0 120px rgba(255, 100, 0, 0.4)' 
              : '0 20px 50px -10px rgba(0, 0, 0, 0.9), 0 10px 25px rgba(218, 165, 32, 0.25)'
          }}
        >
          {/* Book Spine (Left side thickness) */}
          <div 
            className="absolute left-0 top-0 bottom-0 w-7 bg-gradient-to-r from-[#2a040a] via-[#4a0812] to-[#2a040a] rounded-l-md -translate-x-full origin-right"
            style={{
              transform: 'rotateY(-90deg)',
              boxShadow: 'inset 0 0 10px rgba(0,0,0,0.8)'
            }}
          />

          {/* Book Back Cover */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#4a0812] via-[#2f040b] to-[#1a0206] border-2 border-yellow-600/50" />

          {/* Gold Gilded Page Edges */}
          <div className="absolute inset-y-1.5 right-0 w-5 bg-gradient-to-r from-[#ca8a04] via-[#fef08a] to-[#a16207] rounded-r-md shadow-md border-y border-r border-yellow-500/60" />

          {/* INSIDE SPREAD (Visible when book opens) */}
          <div className="absolute inset-0 flex rounded-2xl overflow-hidden preserve-3d bg-[#fffdf0] border-2 border-yellow-600/40">
            {/* Left Page */}
            <div className="w-1/2 h-full bg-gradient-to-r from-[#f5ebd7] via-[#fffbf2] to-[#f7eedc] p-3 sm:p-5 flex flex-col justify-between border-r border-amber-900/15 relative">
              <div className="absolute top-2 left-2 text-amber-700/60 font-serif text-sm">❖</div>
              <div className="absolute top-2 right-2 text-amber-700/60 font-serif text-sm">❖</div>
              <div className="absolute bottom-2 left-2 text-amber-700/60 font-serif text-sm">❖</div>
              <div className="absolute bottom-2 right-2 text-amber-700/60 font-serif text-sm">❖</div>

              <div className="text-center mt-2">
                <span className="text-amber-700 font-cinzel text-[9px] sm:text-[10px] tracking-widest uppercase">8 Nov 2026</span>
                <h4 className="text-amber-950 font-serif font-bold text-xs sm:text-base mt-0.5">Festival of Lights</h4>
                <div className="w-10 h-0.5 bg-amber-600 mx-auto my-1.5" />
              </div>

              <div className="text-center text-amber-900/80 font-serif italic text-[11px] sm:text-xs leading-relaxed px-1">
                "May this holy Diwali illuminate your life with infinite joy, laughter and success."
              </div>

              <div className="text-center text-amber-800 text-[10px] sm:text-xs font-semibold pb-1">
                Dedicated to Riya & Hemant
              </div>
            </div>

            {/* Right Page (Bursting with Golden Radiance) */}
            <div className="w-1/2 h-full bg-gradient-to-l from-[#f5ebd7] via-[#fff8eb] to-[#fbf4e2] p-3 sm:p-4 flex flex-col items-center justify-center relative overflow-hidden">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="w-20 sm:w-28 h-20 sm:h-28 rounded-full border-2 border-dashed border-yellow-500/50 flex items-center justify-center"
              >
                <div className="w-14 sm:w-16 h-14 sm:h-16 rounded-full bg-gradient-to-tr from-amber-400/40 to-yellow-200/60 flex items-center justify-center">
                  <Sparkles className="w-7 h-7 text-amber-600 animate-pulse" />
                </div>
              </motion.div>
              <p className="text-amber-900 font-serif font-semibold text-[11px] sm:text-xs mt-2.5 text-center">
                Entering Celebration...
              </p>
            </div>
          </div>

          {/* INNER FLIPPING PAGES */}
          <motion.div
            initial={false}
            animate={{
              rotateY: pageTurnStep >= 1 ? -170 : 0
            }}
            transition={{ duration: 1.4, ease: [0.25, 1, 0.5, 1] }}
            className="absolute inset-0 origin-left preserve-3d rounded-r-2xl pointer-events-none"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Front of inner page */}
            <div className="absolute inset-0 bg-[#fbf5e5] rounded-r-2xl border-l border-amber-900/30 p-4 backface-hidden shadow-xl flex flex-col justify-center items-center">
              <div className="w-12 h-12 rounded-full border border-amber-600/40 flex items-center justify-center">
                <Star className="w-5 h-5 text-amber-600 fill-amber-500" />
              </div>
              <p className="text-amber-900 font-serif text-[11px] mt-2 italic text-center">
                Lighting up your path...
              </p>
            </div>
            {/* Back of inner page */}
            <div 
              className="absolute inset-0 bg-[#f5ebd7] rounded-l-2xl border-r border-amber-900/30 p-4 backface-hidden shadow-xl"
              style={{ transform: 'rotateY(180deg)' }}
            />
          </motion.div>

          {/* FRONT COVER: Luxury Crimson & Gold with "FOR: RIYA & HEMANT" (NO SURNAME) */}
          <motion.div
            initial={false}
            animate={{
              rotateY: isOpen ? -180 : 0
            }}
            transition={{ duration: 1.5, ease: [0.35, 0, 0.25, 1] }}
            className="absolute inset-0 origin-left preserve-3d rounded-r-2xl backface-hidden z-30"
            style={{
              transformStyle: 'preserve-3d',
              background: 'linear-gradient(135deg, #640d14 0%, #4a0812 40%, #2f040b 100%)',
            }}
          >
            <div className="absolute inset-2.5 sm:inset-4 rounded-r-xl border-2 border-yellow-500/70 shadow-[inset_0_0_15px_rgba(234,179,8,0.25)] flex flex-col justify-between p-3 sm:p-5 text-center overflow-hidden">
              <div className="absolute inset-1.5 border border-yellow-400/30 rounded-r-lg pointer-events-none" />

              {/* Ornate Gold Filigree Corners */}
              <div className="absolute top-1.5 left-1.5 w-4 h-4 border-t-2 border-l-2 border-yellow-300" />
              <div className="absolute top-1.5 right-1.5 w-4 h-4 border-t-2 border-r-2 border-yellow-300" />
              <div className="absolute bottom-1.5 left-1.5 w-4 h-4 border-b-2 border-l-2 border-yellow-300" />
              <div className="absolute bottom-1.5 right-1.5 w-4 h-4 border-b-2 border-r-2 border-yellow-300" />

              {/* Top Cover Embossed Header */}
              <div className="relative z-10 pt-1">
                <span className="text-yellow-400/90 text-[9px] sm:text-xs font-cinzel font-bold tracking-[0.2em] uppercase block">
                  ✦ DIWALI • 8 NOV 2026 ✦
                </span>
                <div className="w-10 h-0.5 bg-gradient-to-r from-transparent via-yellow-400 to-transparent mx-auto mt-1" />
              </div>

              {/* Center Cover Titles & Gold Diya Medallion */}
              <div className="relative z-10 flex flex-col items-center my-auto py-1">
                <div className="relative w-16 sm:w-20 h-16 sm:h-20 rounded-full border-2 border-yellow-400/80 bg-gradient-to-br from-amber-600/40 via-yellow-500/20 to-transparent flex items-center justify-center shadow-[0_0_15px_rgba(250,204,21,0.4)] mb-1.5">
                  <div className="w-12 sm:w-14 h-12 sm:h-14 rounded-full border border-dashed border-yellow-300/70 flex items-center justify-center">
                    <div className="text-xl sm:text-2xl text-yellow-300 drop-shadow-[0_0_10px_#ffd700]">
                      🪔
                    </div>
                  </div>
                </div>

                <h3 className="font-serif font-extrabold text-base sm:text-xl gold-text-shine leading-tight tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                  A Little Book of Happiness
                </h3>

                <p className="font-cursive text-base sm:text-lg text-yellow-200 mt-0.5 tracking-wide">
                  Specially Made For You
                </p>

                {/* Recipient Gold Badge: FOR: RIYA & HEMANT (NO SURNAMES) */}
                <div className="mt-2 px-3 py-1 rounded-full bg-gradient-to-r from-yellow-500/25 via-yellow-400/35 to-yellow-500/25 border border-yellow-400/70 shadow-sm">
                  <span className="text-[10px] sm:text-xs font-bold tracking-wider text-yellow-100 font-sans uppercase">
                    FOR: RIYA & HEMANT
                  </span>
                </div>
              </div>

              {/* Bottom Cover Subtle Ornament */}
              <div className="relative z-10 pb-0.5">
                <div className="flex items-center justify-center gap-1.5 text-yellow-400/80 text-[9px] sm:text-[10px]">
                  <span>✦</span>
                  <span className="tracking-widest font-sans uppercase">Open With Love</span>
                  <span>✦</span>
                </div>
              </div>
            </div>

            {/* Glowing Golden Book Edge */}
            <div className="absolute right-0 inset-y-0 w-2 bg-gradient-to-b from-yellow-300 via-amber-400 to-yellow-500 shadow-[0_0_10px_#fde047]" />
          </motion.div>
        </div>
      </motion.div>

      {/* COMPACT INTERACTIVE BUTTON: "OPEN THE BOOK ✨" */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: isOpen ? 0 : 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.7 }}
        className="z-30 pb-2 sm:pb-3 shrink-0"
      >
        <button
          onClick={handleOpenBook}
          className="px-7 sm:px-9 py-3 sm:py-3.5 rounded-full bg-gradient-to-r from-yellow-500 via-amber-400 to-yellow-600 text-stone-950 font-bold text-xs sm:text-sm tracking-wider uppercase shadow-[0_0_25px_rgba(250,204,21,0.6)] hover:shadow-[0_0_40px_rgba(250,204,21,0.85)] hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2 cursor-pointer border border-yellow-200"
        >
          <BookOpen className="w-4 h-4 text-stone-950" />
          <span className="font-extrabold tracking-widest font-sans">
            OPEN THE BOOK ✨
          </span>
          <Sparkles className="w-3.5 h-3.5 text-stone-950 animate-spin-slow" />
        </button>
      </motion.div>
    </div>
  );
};
