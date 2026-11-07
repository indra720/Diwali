import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { motion } from 'framer-motion';

export const AudioController = ({ isMuted = false, onToggleMute }) => {
  return (
    <div className="fixed top-3 sm:top-4 right-3 sm:right-5 z-50 flex items-center">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onToggleMute}
        className="flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full backdrop-blur-md bg-stone-900/85 border border-yellow-500/50 text-yellow-300 shadow-[0_0_15px_rgba(234,179,8,0.25)] hover:border-yellow-400 hover:shadow-[0_0_20px_rgba(250,204,21,0.45)] transition-all cursor-pointer group"
        title={isMuted ? "Unmute Video Music" : "Mute Sound"}
      >
        {isMuted ? (
          <VolumeX className="w-4 h-4 text-stone-400 group-hover:text-yellow-300 transition-colors" />
        ) : (
          <div className="flex items-center gap-1.5">
            <Volume2 className="w-4 h-4 text-yellow-400" />
            <div className="flex items-end gap-0.5 h-3">
              {[0.4, 0.8, 0.5, 0.9].map((delay, idx) => (
                <motion.span
                  key={idx}
                  animate={{
                    height: ['2px', '12px', '5px', '10px', '2px'],
                  }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    delay: idx * 0.18,
                    ease: "easeInOut"
                  }}
                  className="w-0.5 bg-yellow-400 rounded-full"
                />
              ))}
            </div>
          </div>
        )}
        <span className="text-[11px] font-medium tracking-wider text-yellow-200">
          {isMuted ? "SOUND OFF" : "SOUND ON"}
        </span>
      </motion.button>
    </div>
  );
};
