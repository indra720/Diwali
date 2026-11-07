import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Sparkles, X } from 'lucide-react';
import { soundManager } from '../utils/audio';

export const SkyLanterns = ({ recipientName = "Riya Saini" }) => {
  const [lanterns, setLanterns] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customWish, setCustomWish] = useState("");

  const presetWishes = [
    "Infinite Happiness & Golden Health 🌟",
    "Big Career Success & Joy in 2026-27 🚀",
    "Lifelong Friendship & Beautiful Memories ❤️",
    "May All Your Dreams Come True ✨"
  ];

  const releaseLantern = (wishText) => {
    const textToUse = wishText || customWish || "Peace & Happiness 🪔";
    const newLantern = {
      id: Date.now() + Math.random(),
      wish: textToUse,
      startX: 20 + Math.random() * 60, // percentage across width
      duration: 14 + Math.random() * 8,
      driftX: (Math.random() - 0.5) * 120,
      scale: 0.85 + Math.random() * 0.35,
    };

    setLanterns((prev) => [...prev, newLantern]);
    soundManager.playWhoosh();
    soundManager.playBell(1567.98); // High G bell
    setCustomWish("");
    setIsModalOpen(false);

    // Auto cleanup after float completes
    setTimeout(() => {
      setLanterns((prev) => prev.filter((l) => l.id !== newLantern.id));
    }, 24000);
  };

  return (
    <>
      {/* Floating Sky Lanterns in Background */}
      <div className="fixed inset-0 pointer-events-none z-20 overflow-hidden">
        {lanterns.map((l) => (
          <motion.div
            key={l.id}
            initial={{
              x: `${l.startX}vw`,
              y: '105vh',
              opacity: 0,
              scale: l.scale * 0.7,
            }}
            animate={{
              y: '-20vh',
              x: `calc(${l.startX}vw + ${l.driftX}px)`,
              opacity: [0, 0.95, 0.95, 0.7, 0],
              scale: [l.scale * 0.7, l.scale, l.scale * 0.5],
            }}
            transition={{
              duration: l.duration,
              ease: "easeOut",
            }}
            className="absolute flex flex-col items-center select-none"
          >
            {/* Lantern Glowing Body */}
            <div className="relative flex flex-col items-center">
              {/* Outer Golden/Amber Halo */}
              <div 
                className="w-14 sm:w-16 h-20 sm:h-22 rounded-t-2xl rounded-b-lg border border-yellow-300/60 shadow-[0_0_35px_rgba(255,160,0,0.85)] flex flex-col items-center justify-between p-2 relative overflow-hidden"
                style={{
                  background: 'linear-gradient(to bottom, rgba(255, 140, 0, 0.9) 0%, rgba(255, 200, 50, 0.95) 60%, rgba(255, 100, 0, 0.85) 100%)',
                }}
              >
                {/* Internal Candle Flame */}
                <motion.div 
                  animate={{
                    scale: [0.9, 1.15, 0.95],
                    opacity: [0.8, 1, 0.85]
                  }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  className="w-3.5 h-6 rounded-full bg-white blur-[0.8px] shadow-[0_0_15px_#fff]"
                />

                {/* Lantern Base Frame */}
                <div className="w-8 h-1 bg-amber-950 rounded-full" />
              </div>

              {/* Wish Attached Tag */}
              <div className="mt-1 px-2 py-0.5 rounded bg-black/60 border border-yellow-400/40 backdrop-blur-xs text-[10px] text-yellow-200 tracking-wide whitespace-nowrap shadow-md">
                {l.wish}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Floating Trigger Button: "Release a Wish Lantern 🏮" */}
      <div className="fixed bottom-16 right-4 sm:right-6 z-40">
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsModalOpen(true)}
          className="px-3.5 py-2 rounded-full bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-700 text-stone-950 font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(250,204,21,0.5)] hover:shadow-[0_0_30px_rgba(250,204,21,0.7)] flex items-center gap-1.5 cursor-pointer border border-yellow-200"
        >
          <span className="text-base">🏮</span>
          <span className="hidden sm:inline">Release Wish Lantern</span>
          <span className="sm:hidden">Wish Lantern</span>
        </motion.button>
      </div>

      {/* Release Lantern Dialog Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 15 }}
              className="relative w-full max-w-sm rounded-2xl border border-yellow-500/50 bg-gradient-to-b from-[#151a3d] to-[#07091a] p-5 text-left shadow-[0_0_50px_rgba(234,179,8,0.3)]"
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-3.5 right-3.5 p-1 text-stone-400 hover:text-yellow-200 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2 mb-1">
                <span className="text-2xl">🏮</span>
                <h4 className="text-lg font-serif font-bold text-yellow-100">
                  Release a Diwali Wish Lantern
                </h4>
              </div>
              <p className="text-xs text-yellow-200/70 mb-4">
                Send your prayers & wishes into the starry Diwali night sky for {recipientName}!
              </p>

              {/* Quick Wishes */}
              <div className="space-y-1.5 mb-4">
                <span className="text-[10px] uppercase tracking-wider text-yellow-400/90 font-semibold block">
                  Choose a blessing:
                </span>
                {presetWishes.map((w, i) => (
                  <button
                    key={i}
                    onClick={() => releaseLantern(w)}
                    className="w-full text-left text-xs px-3 py-1.5 rounded-lg border border-yellow-500/25 bg-yellow-500/10 text-yellow-100 hover:bg-yellow-500/20 hover:border-yellow-400 transition-all cursor-pointer truncate"
                  >
                    {w}
                  </button>
                ))}
              </div>

              {/* Custom Wish Input */}
              <div className="space-y-2">
                <span className="text-[10px] uppercase tracking-wider text-yellow-400/90 font-semibold block">
                  Or write your own wish:
                </span>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={customWish}
                    onChange={(e) => setCustomWish(e.target.value)}
                    placeholder="e.g. Always be happy..."
                    className="flex-1 px-3 py-1.5 rounded-lg bg-stone-900 border border-yellow-500/40 text-yellow-100 text-xs focus:outline-none focus:border-yellow-400"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') releaseLantern(customWish);
                    }}
                  />
                  <button
                    onClick={() => releaseLantern(customWish)}
                    className="px-3.5 py-1.5 rounded-lg bg-yellow-500 hover:bg-yellow-400 text-stone-950 font-bold text-xs flex items-center gap-1 cursor-pointer"
                  >
                    <Send className="w-3 h-3" />
                    <span>Fly</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
