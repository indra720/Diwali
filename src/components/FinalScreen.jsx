import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart, RotateCcw, Share2, PlusCircle } from 'lucide-react';
import { Diya } from './Diya';
import { soundManager } from '../utils/audio';

export const FinalScreen = ({
  recipientName = "Friend",
  senderName = "A Well Wisher",
  onReplay,
  onOpenShareModal,
  onCustomizeOwn
}) => {
  const handleReplayClick = () => {
    soundManager.playBell(1046.5);
    soundManager.playWhoosh();
    onReplay();
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center px-4 overflow-hidden bg-gradient-to-b from-[#040618] via-[#090d28] to-[#040514] select-none">
      {/* Background Mandala & Ambient Lighting */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-25 bg-center bg-cover mix-blend-screen"
        style={{ backgroundImage: `url('/assets/diwali-mandala-diyas.jpg')` }}
      />

      {/* Center Golden Warm Halo */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-amber-500/15 blur-[100px] pointer-events-none" />

      {/* Main Content Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-30 max-w-xl w-full mx-auto text-center flex flex-col items-center py-10 px-6 rounded-3xl border border-yellow-500/40 bg-gradient-to-b from-[#101438]/80 via-[#0a0d26]/85 to-[#06081a]/95 backdrop-blur-2xl shadow-[0_0_60px_rgba(234,179,8,0.25)]"
      >
        {/* Top Floating Diya */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="mb-6"
        >
          <Diya size="lg" glowIntensity={1.4} />
        </motion.div>

        {/* Primary Message */}
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.9 }}
          className="text-2xl sm:text-4xl font-serif font-extrabold text-white mb-3 leading-snug"
        >
          <span>One Little Surprise,</span>
          <br />
          <span className="gold-text-shine">Endless Happiness</span>
          <motion.span
            animate={{ scale: [1, 1.25, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="inline-block text-red-500 ml-2"
          >
            ❤️
          </motion.span>
        </motion.h2>

        {/* Secondary Warm Note */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.9 }}
          className="text-base sm:text-xl text-yellow-100/90 font-light mb-8 max-w-md mx-auto"
        >
          Hope this brought a smile to your face! Wishing you and your family a luminous, peaceful and prosperous Diwali.
        </motion.p>

        {/* Recipient & Sender Tag */}
        <div className="mb-8 px-5 py-2 rounded-full border border-yellow-500/30 bg-yellow-500/10">
          <span className="text-xs sm:text-sm text-yellow-200 font-medium">
            With love for <strong className="text-yellow-300">{recipientName}</strong> from <strong className="text-yellow-300">{senderName}</strong>
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
          {/* Glowing Replay Button: "REPLAY THE MAGIC ✨" */}
          <button
            onClick={handleReplayClick}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-yellow-500 via-amber-400 to-yellow-600 text-stone-950 font-bold text-sm sm:text-base tracking-wider uppercase shadow-[0_0_30px_rgba(250,204,21,0.6)] hover:shadow-[0_0_50px_rgba(250,204,21,0.85)] hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer border border-yellow-200"
          >
            <RotateCcw className="w-5 h-5 text-stone-950" />
            <span className="font-extrabold tracking-widest font-sans">
              REPLAY THE MAGIC ✨
            </span>
          </button>

          {/* Share Button: "SHARE THIS SURPRISE" */}
          <button
            onClick={onOpenShareModal}
            className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-stone-900/90 border border-yellow-500/50 text-yellow-300 hover:text-yellow-100 hover:border-yellow-400 hover:bg-stone-800 transition-all text-sm sm:text-base font-semibold tracking-wider uppercase flex items-center justify-center gap-2.5 cursor-pointer shadow-md"
          >
            <Share2 className="w-5 h-5 text-yellow-400" />
            <span>SHARE THIS SURPRISE</span>
          </button>
        </div>

        {/* Create Your Own Custom Surprise Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="mt-8 pt-6 border-t border-yellow-500/20 w-full"
        >
          <button
            onClick={onCustomizeOwn}
            className="text-xs sm:text-sm text-yellow-300/80 hover:text-yellow-100 flex items-center justify-center gap-2 mx-auto transition-colors cursor-pointer group"
          >
            <PlusCircle className="w-4 h-4 text-yellow-400 group-hover:scale-110 transition-transform" />
            <span className="underline underline-offset-4 decoration-yellow-500/50">
              Want to send a personalized surprise to someone else? Click here
            </span>
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};
