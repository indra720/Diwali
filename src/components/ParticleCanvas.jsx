import React, { useEffect, useRef } from 'react';
import { soundManager } from '../utils/audio';

export const ParticleCanvas = ({ mode = 'ambient', allowClickFireworks = true }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Ambient floating golden dust & bokeh
    const ambientCount = 65;
    const ambientParticles = [];
    for (let i = 0; i < ambientCount; i++) {
      ambientParticles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2.5 + 0.8,
        vx: (Math.random() - 0.5) * 0.4,
        vy: -Math.random() * 0.5 - 0.2, // drifting upwards
        alpha: Math.random() * 0.7 + 0.2,
        pulseSpeed: Math.random() * 0.02 + 0.01,
        color: Math.random() > 0.4 ? '#fde047' : Math.random() > 0.5 ? '#f59e0b' : '#ffedd5',
      });
    }

    // Fireworks particles & rockets
    const rockets = [];
    const fireworks = [];

    const fireworkColors = [
      ['#ffd700', '#ffeb3b', '#fff59d'], // Gold
      ['#ff1744', '#ff5252', '#ff8a80'], // Crimson
      ['#ff9100', '#ffa726', '#ffe0b2'], // Saffron/Orange
      ['#00e676', '#69f0ae', '#b9f6ca'], // Emerald
      ['#e040fb', '#ea80fc', '#f3e5f5'], // Lotus violet
      ['#00e5ff', '#18ffff', '#84ffff'], // Cyan
    ];

    const createFirework = (targetX, targetY) => {
      const palette = fireworkColors[Math.floor(Math.random() * fireworkColors.length)];
      const particleCount = 75 + Math.floor(Math.random() * 45);

      for (let i = 0; i < particleCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 5.5 + 1.2;
        fireworks.push({
          x: targetX,
          y: targetY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          color: palette[Math.floor(Math.random() * palette.length)],
          alpha: 1,
          decay: Math.random() * 0.018 + 0.012,
          radius: Math.random() * 2.2 + 1,
          gravity: 0.065,
          friction: 0.965,
          flicker: Math.random() > 0.3
        });
      }
    };

    const launchRocket = (startX, targetX, targetY) => {
      const angle = Math.atan2(targetY - height, targetX - startX);
      const dist = Math.hypot(targetX - startX, targetY - height);
      const speed = 12 + Math.random() * 4;
      rockets.push({
        x: startX,
        y: height,
        targetX,
        targetY,
        vx: (targetX - startX) / (dist / speed),
        vy: (targetY - height) / (dist / speed),
        trail: [],
        color: '#ffeb3b'
      });
    };

    // Auto fireworks in celebration mode
    let lastAutoFirework = 0;

    const render = (time) => {
      ctx.clearRect(0, 0, width, height);

      // Render Ambient Golden Dust
      for (let i = 0; i < ambientParticles.length; i++) {
        const p = ambientParticles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha += Math.sin(time * p.pulseSpeed) * 0.008;

        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0.1, Math.min(0.9, p.alpha));
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.restore();
      }

      // If celebration mode, launch periodic fireworks
      if (mode === 'celebration' && time - lastAutoFirework > 1600) {
        lastAutoFirework = time;
        const tx = width * 0.15 + Math.random() * width * 0.7;
        const ty = height * 0.12 + Math.random() * height * 0.38;
        launchRocket(tx + (Math.random() - 0.5) * 80, tx, ty);
      }

      // Update & Draw Rockets
      for (let i = rockets.length - 1; i >= 0; i--) {
        const r = rockets[i];
        r.trail.push({ x: r.x, y: r.y });
        if (r.trail.length > 7) r.trail.shift();

        r.x += r.vx;
        r.y += r.vy;

        // Draw rocket trail
        ctx.save();
        for (let t = 0; t < r.trail.length; t++) {
          const pt = r.trail[t];
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, 1.5 * (t / r.trail.length), 0, Math.PI * 2);
          ctx.fillStyle = '#ffaa00';
          ctx.globalAlpha = t / r.trail.length;
          ctx.fill();
        }

        // Rocket head
        ctx.beginPath();
        ctx.arc(r.x, r.y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = '#fff';
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#ffeb3b';
        ctx.fill();
        ctx.restore();

        // Check if rocket reached altitude
        if (r.y <= r.targetY || r.vy >= 0) {
          createFirework(r.x, r.y);
          soundManager.playFireworkBurst();
          rockets.splice(i, 1);
        }
      }

      // Update & Draw Fireworks
      for (let i = fireworks.length - 1; i >= 0; i--) {
        const p = fireworks[i];
        p.vx *= p.friction;
        p.vy *= p.friction;
        p.vy += p.gravity;
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          fireworks.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.flicker && Math.random() > 0.4 ? p.alpha * 0.4 : p.alpha;
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    const handleCanvasClick = (e) => {
      if (!allowClickFireworks) return;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      launchRocket(x + (Math.random() - 0.5) * 40, x, y);
    };

    window.addEventListener('click', handleCanvasClick);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('click', handleCanvasClick);
    };
  }, [mode, allowClickFireworks]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10"
      style={{ width: '100%', height: '100%' }}
    />
  );
};
