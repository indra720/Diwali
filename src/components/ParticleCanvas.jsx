import React, { useEffect, useRef } from 'react';

export const ParticleCanvas = ({ mode = 'ambient', allowClickFireworks = true }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId;
    const isMobile = window.innerWidth < 768;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Optimized particle counts: keeps mobile butter-smooth (zero lag)
    const ambientCount = isMobile ? 22 : 45;
    const ambientParticles = [];
    for (let i = 0; i < ambientCount; i++) {
      ambientParticles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * (isMobile ? 1.8 : 2.4) + 0.8,
        vx: (Math.random() - 0.5) * 0.35,
        vy: -Math.random() * 0.4 - 0.15, // drifting upwards
        alpha: Math.random() * 0.6 + 0.25,
        pulseSpeed: Math.random() * 0.02 + 0.01,
        color: Math.random() > 0.4 ? '#fde047' : Math.random() > 0.5 ? '#f59e0b' : '#ffedd5',
      });
    }

    // Fireworks particles & rockets
    const rockets = [];
    const fireworks = [];

    const fireworkColors = [
      ['#ffd700', '#ffeb3b', '#fff59d'], // Gold
      ['#ff3366', '#ff6b8b', '#ffa4b6'], // Crimson Rose
      ['#ff9100', '#ffa726', '#ffe0b2'], // Saffron/Orange
      ['#00e676', '#69f0ae', '#b9f6ca'], // Emerald
      ['#e040fb', '#ea80fc', '#f3e5f5'], // Lotus violet
      ['#00e5ff', '#18ffff', '#84ffff'], // Cyan
    ];

    const createFirework = (targetX, targetY) => {
      const palette = fireworkColors[Math.floor(Math.random() * fireworkColors.length)];
      // Lower particle count on mobile for zero lag
      const count = isMobile ? 24 : 55;

      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * (isMobile ? 3.5 : 4.8) + 1.0;
        fireworks.push({
          x: targetX,
          y: targetY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          color: palette[Math.floor(Math.random() * palette.length)],
          alpha: 1,
          decay: Math.random() * 0.02 + 0.014,
          radius: Math.random() * 1.8 + 1,
          gravity: 0.055,
          friction: 0.965,
        });
      }
    };

    const launchRocket = (startX, targetX, targetY) => {
      const dist = Math.hypot(targetX - startX, targetY - height);
      const speed = isMobile ? 10 : 13;
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

    let lastAutoFirework = 0;
    const autoFireworkInterval = isMobile ? 2600 : 1800;

    const render = (time) => {
      ctx.clearRect(0, 0, width, height);

      // Render Ambient Golden Dust (FAST GPU path: no ctx.shadowBlur, no save/restore)
      for (let i = 0; i < ambientParticles.length; i++) {
        const p = ambientParticles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha += Math.sin(time * p.pulseSpeed) * 0.006;

        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        const effectiveAlpha = Math.max(0.1, Math.min(0.85, p.alpha));

        // Soft outer glow using fast 2-pass circle instead of expensive software blur
        ctx.fillStyle = p.color;
        ctx.globalAlpha = effectiveAlpha * 0.35;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 2, 0, Math.PI * 2);
        ctx.fill();

        // Crisp inner core
        ctx.globalAlpha = effectiveAlpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // Periodic fireworks in celebration mode
      if (mode === 'celebration' && time - lastAutoFirework > autoFireworkInterval) {
        lastAutoFirework = time;
        const tx = width * 0.15 + Math.random() * width * 0.7;
        const ty = height * 0.12 + Math.random() * height * 0.32;
        launchRocket(tx + (Math.random() - 0.5) * 60, tx, ty);
      }

      // Update & Draw Rockets
      for (let i = rockets.length - 1; i >= 0; i--) {
        const r = rockets[i];
        r.trail.push({ x: r.x, y: r.y });
        if (r.trail.length > 5) r.trail.shift();

        r.x += r.vx;
        r.y += r.vy;

        // Draw rocket trail
        ctx.fillStyle = '#ffaa00';
        for (let t = 0; t < r.trail.length; t++) {
          const pt = r.trail[t];
          ctx.globalAlpha = (t / r.trail.length) * 0.7;
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, 1.2 * (t / r.trail.length), 0, Math.PI * 2);
          ctx.fill();
        }

        // Rocket head
        ctx.fillStyle = '#ffffff';
        ctx.globalAlpha = 0.95;
        ctx.beginPath();
        ctx.arc(r.x, r.y, 2, 0, Math.PI * 2);
        ctx.fill();

        // Check if rocket reached altitude
        if (r.y <= r.targetY || r.vy >= 0) {
          createFirework(r.x, r.y);
          rockets.splice(i, 1);
        }
      }

      // Update & Draw Fireworks (High speed, zero lag)
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

        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1.0;
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    const handleCanvasClick = (e) => {
      if (!allowClickFireworks) return;
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX || (e.touches && e.touches[0]?.clientX) || width / 2) - rect.left;
      const y = (e.clientY || (e.touches && e.touches[0]?.clientY) || height / 3) - rect.top;
      launchRocket(x + (Math.random() - 0.5) * 40, x, y);
    };

    window.addEventListener('click', handleCanvasClick, { passive: true });
    window.addEventListener('touchstart', handleCanvasClick, { passive: true });

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('click', handleCanvasClick);
      window.removeEventListener('touchstart', handleCanvasClick);
    };
  }, [mode, allowClickFireworks]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10"
      style={{ width: '100%', height: '100%', transform: 'translateZ(0)' }}
    />
  );
};
