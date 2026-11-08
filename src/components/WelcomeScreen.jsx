import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ChevronRight, Calendar } from 'lucide-react';
import { Diya } from './Diya';
import { HangingLanterns } from './HangingLanterns';

export const WelcomeScreen = ({ onProceed }) => {
  return (
    <div className="relative h-screen max-h-[100dvh] w-full flex flex-col justify-between items-center px-4 py-4 sm:py-6 overflow-hidden select-none">
      {/* Hanging Festive Lanterns */}
      <HangingLanterns />

      {/* Radial Center Glow */}
      <div className="absolute w-[450px] h-[450px] rounded-full blur-[100px] bg-amber-500/15 pointer-events-none -translate-y-10" />

      {/* TOP SPACER */}
      <div className="h-10 sm:h-12 shrink-0" />

      {/* MAIN CONTENT CARD */}
      <motion.div 
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-30 max-w-lg w-full mx-auto text-center flex flex-col items-center my-auto py-2"
      >
        {/* Date & Sacred Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-yellow-500/40 bg-yellow-500/15 backdrop-blur-md mb-3 sm:mb-4 shadow-[0_0_15px_rgba(234,179,8,0.2)]"
        >
          <Calendar className="w-3.5 h-3.5 text-yellow-300" />
          <span className="text-[11px] sm:text-xs font-semibold tracking-wider uppercase text-yellow-200">
            8 November 2026 • Royal Diwali Surprise
          </span>
          <Sparkles className="w-3 h-3 text-yellow-300 animate-pulse" />
        </motion.div>

        {/* Personalized Recipient Greeting: Both Riya & Hemant Together */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.9 }}
          className="mb-2"
        >
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-1 flex items-center justify-center flex-wrap gap-x-2">
            <span>Hey,</span>
            <span className="gold-text-shine font-serif font-extrabold drop-shadow-[0_4px_25px_rgba(250,204,21,0.6)]">
              Riya & Hemant!
            </span>
            <motion.span
              animate={{ scale: [1, 1.25, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              className="inline-block text-red-500 text-2xl sm:text-4xl"
            >
              ❤️
            </motion.span>
          </h1>
        </motion.div>

        {/* Subtitle Message */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-sm sm:text-lg text-yellow-100/90 font-light max-w-md mx-auto mb-5 sm:mb-8 leading-relaxed font-sans px-2"
        >
          Someone has prepared a little surprise for you...
        </motion.p>

        {/* Central Glowing Diya Composition */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="relative mb-5 sm:mb-8 flex items-center justify-center"
        >
          <div className="absolute w-36 h-36 rounded-full bg-amber-500/25 blur-xl pointer-events-none" />

          {/* Triad of Diya Lights */}
          <div className="flex items-center justify-center gap-4 sm:gap-8">
            <Diya size="sm" glowIntensity={0.85} className="-translate-y-1.5" />
            <Diya size="lg" glowIntensity={1.3} className="z-10" />
            <Diya size="sm" glowIntensity={0.85} className="-translate-y-1.5" />
          </div>
        </motion.div>

        {/* Glowing Golden Action Button: OPEN YOUR DIWALI SURPRISE ✨ */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.8 }}
          className="relative group mt-1"
        >
          <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-300 opacity-70 blur-md group-hover:opacity-100 transition duration-500 group-hover:scale-105 animate-pulse" />

          <button
            onClick={onProceed}
            className="relative px-7 sm:px-11 py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 text-stone-950 font-bold text-sm sm:text-base tracking-wider uppercase shadow-[0_0_30px_rgba(250,204,21,0.65)] hover:shadow-[0_0_45px_rgba(250,204,21,0.9)] transform transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2.5 cursor-pointer border-2 border-yellow-200"
          >
            <Sparkles className="w-4 h-4 text-stone-900 animate-spin-slow" />
            <span className="font-extrabold drop-shadow-sm font-sans">
              OPEN YOUR DIWALI SURPRISE ✨
            </span>
            <ChevronRight className="w-4 h-4 text-stone-900 group-hover:translate-x-1.5 transition-transform" />
          </button>
        </motion.div>

        {/* Sender Attribution */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.9 }}
          className="mt-3.5 sm:mt-5 text-sm sm:text-base text-yellow-300/80 font-cursive text-lg sm:text-2xl"
        >
          Handcrafted with festive warmth by Indrajeet
        </motion.p>
      </motion.div>

      {/* BOTTOM FOOTER */}
      <div className="relative z-30 flex items-center justify-center gap-6 pb-2 text-yellow-400/50 text-[10px] uppercase tracking-widest shrink-0">
        <div className="h-[1px] w-14 bg-gradient-to-r from-transparent via-yellow-500 to-transparent" />
        <span>शुभ दीपावली • 8 NOV 2026</span>
        <div className="h-[1px] w-14 bg-gradient-to-r from-transparent via-yellow-500 to-transparent" />
      </div>
    </div>
  );
};
