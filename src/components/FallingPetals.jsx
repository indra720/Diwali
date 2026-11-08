import React, { useMemo } from 'react';

export const FallingPetals = ({ count = 16, active = true }) => {
  const isMobile = typeof window !== 'undefined' ? window.innerWidth < 768 : false;
  // Reduce petal count on mobile for buttery smooth 60fps
  const effectiveCount = isMobile ? 8 : count;

  const petals = useMemo(() => {
    return Array.from({ length: effectiveCount }, (_, i) => {
      const isMarigold = i % 3 !== 0; // 66% marigold, 33% rose
      return {
        id: i,
        left: `${(i * (100 / effectiveCount) + (Math.random() * 8 - 4)).toFixed(1)}%`,
        size: Math.floor(12 + (i % 4) * 3),
        duration: (8 + (i % 5) * 1.5).toFixed(1),
        delay: (i * 0.7).toFixed(1),
        type: isMarigold ? (i % 2 === 0 ? 'marigold-yellow' : 'marigold-orange') : 'rose-red',
      };
    });
  }, [effectiveCount]);

  if (!active) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-20 overflow-hidden">
      {petals.map((p) => {
        let bgStyle = '';
        if (p.type === 'marigold-yellow') {
          bgStyle = 'radial-gradient(circle at 40% 30%, #ffeb3b 0%, #fbc02d 50%, #f57f17 100%)';
        } else if (p.type === 'marigold-orange') {
          bgStyle = 'radial-gradient(circle at 40% 30%, #ffb74d 0%, #ff9800 50%, #e65100 100%)';
        } else {
          bgStyle = 'radial-gradient(circle at 40% 30%, #f43f5e 0%, #e11d48 50%, #881337 100%)';
        }

        return (
          <div
            key={p.id}
            className="absolute rounded-[60%_40%_60%_40%/70%_30%_70%_30%]"
            style={{
              left: p.left,
              top: '-5vh',
              width: p.size,
              height: p.size * 1.25,
              background: bgStyle,
              animation: `fallPetal ${p.duration}s linear infinite`,
              animationDelay: `${p.delay}s`,
              willChange: 'transform, opacity',
              transform: 'translateZ(0)',
            }}
          />
        );
      })}
    </div>
  );
};
