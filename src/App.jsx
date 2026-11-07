import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { WelcomeScreen } from './components/WelcomeScreen';
import { BookScene } from './components/BookScene';
import { AnimatedGreetingSequence } from './components/AnimatedGreetingSequence';
import { BackgroundVideo } from './components/BackgroundVideo';
import { ParticleCanvas } from './components/ParticleCanvas';
import { FallingPetals } from './components/FallingPetals';
import { AudioController } from './components/AudioController';

export default function App() {
  // Journey Stages: 'welcome' | 'book' | 'celebration'
  const [stage, setStage] = useState('welcome');
  const [isStarted, setIsStarted] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  // Toggle sound for video
  const handleToggleMute = () => {
    setIsMuted(!isMuted);
    setIsStarted(true);
  };

  // Handler for starting the journey from Welcome Screen
  const handleProceedFromWelcome = () => {
    setIsStarted(true);
    setStage('book');
  };

  // Handler when the 3D book finishes opening (immediately enters celebration)
  const handleBookOpened = () => {
    setStage('celebration');
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden text-white font-sans bg-[#040614]">
      {/* Background WhatsApp Video with Audio */}
      <BackgroundVideo isMuted={isMuted} isStarted={isStarted} />

      {/* Background Interactive Particle Canvas */}
      <ParticleCanvas 
        mode={stage === 'celebration' ? 'celebration' : 'ambient'} 
        allowClickFireworks={stage === 'celebration'} 
      />

      {/* Floating Marigold & Rose Petals */}
      <FallingPetals 
        count={stage === 'celebration' ? 24 : 14} 
        active={true} 
      />

      {/* ============================================================== */}
      {/* UNIFIED TOP BAR (ZERO COLLISIONS ON MOBILE & DESKTOP)          */}
      {/* ============================================================== */}
      <header className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-3.5 sm:px-6 py-2.5 sm:py-3.5 pointer-events-none">
        {/* Brand Logo & Auspicious Date */}
        <div className="pointer-events-auto flex items-center gap-2 px-3 py-1.5 rounded-full bg-stone-900/80 backdrop-blur-md border border-yellow-500/40 shadow-sm">
          <span className="text-lg sm:text-xl">🪔</span>
          <div className="flex flex-col">
            <span className="text-[11px] sm:text-xs font-bold tracking-widest uppercase font-cinzel text-yellow-300 leading-none">
              Diwali Magic
            </span>
            <span className="text-[9px] text-yellow-400/80 font-sans tracking-wider leading-tight">
              8 Nov 2026
            </span>
          </div>
        </div>

        {/* Audio Controller (Controls the WhatsApp video music) */}
        <div className="pointer-events-auto">
          <AudioController isMuted={isMuted} onToggleMute={handleToggleMute} />
        </div>
      </header>

      {/* Journey Stages Transitions */}
      <AnimatePresence mode="wait">
        {stage === 'welcome' && (
          <motion.div
            key="welcome-stage"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.6 }}
            className="w-full h-screen"
          >
            <WelcomeScreen onProceed={handleProceedFromWelcome} />
          </motion.div>
        )}

        {stage === 'book' && (
          <motion.div
            key="book-stage"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full h-screen"
          >
            <BookScene onBookOpened={handleBookOpened} />
          </motion.div>
        )}

        {stage === 'celebration' && (
          <motion.div
            key="celebration-stage"
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-screen"
          >
            <AnimatedGreetingSequence />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
