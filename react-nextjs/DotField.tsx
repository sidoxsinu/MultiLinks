'use client';

import React, { useEffect, useRef } from 'react';

interface DotFieldProps {
  className?: string;
}

export function DotField({ className = '' }: DotFieldProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const config = {
      dotRadius: 1.5,
      dotSpacing: 14,
      cursorRadius: 500,
      cursorForce: 0.1,
      bulgeOnly: true,
      bulgeStrength: 67,
      sparkle: false,
      waveAmplitude: 0,
      gradientFrom: 'rgba(255, 255, 255, 0.18)',
      gradientTo: 'rgba(255, 255, 255, 0.05)',
    };

    const TWO_PI = Math.PI * 2;

    const canvas = document.createElement('canvas');
    canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;pointer-events:none;';
    container.appendChild(canvas);

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let dots: Array<{
      ax: number;
      ay: number;
      sx: number;
      sy: number;
      vx: number;
      vy: number;
      x: number;
      y: number;
    }> = [];
    const mouse = { x: -9999, y: -9999, prevX: -9999, prevY: -9999, speed: 0 };
    const size = { w: 0, h: 0, offsetX: 0, offsetY: 0 };
    let engagement = 0;
    let rafId: number;
    let resizeTimer: ReturnType<typeof setTimeout>;
    let frameCount = 0;

    function buildDots(w: number, h: number) {
      const step = config.dotRadius + config.dotSpacing;
      const cols = Math.floor(w / step);
      const rows = Math.floor(h / step);
      const padX = (w % step) / 2;
      const padY = (h % step) / 2;
      dots = new Array(rows * cols);
      let idx = 0;
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const ax = padX + col * step + step / 2;
          const ay = padY + row * step + step / 2;
          dots[idx++] = { ax, ay, sx: ax, sy: ay, vx: 0, vy: 0, x: ax, y: ay };
        }
      }
    }

    function doResize() {
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);
      size.w = w;
      size.h = h;
      size.offsetX = rect.left + window.scrollX;
      size.offsetY = rect.top + window.scrollY;
      buildDots(w, h);
    }

    function onResize() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(doResize, 100);
    }

    function onMouseMove(e: MouseEvent) {
      mouse.x = e.pageX - size.offsetX;
      mouse.y = e.pageY - size.offsetY;
    }

    function updateMouseSpeed() {
      const dx = mouse.prevX - mouse.x;
      const dy = mouse.prevY - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      mouse.speed += (dist - mouse.speed) * 0.5;
      if (mouse.speed < 0.001) mouse.speed = 0;
      mouse.prevX = mouse.x;
      mouse.prevY = mouse.y;
    }

    let isVisible = true;
    function tick() {
      if (!ctx || !isVisible) return;
      frameCount++;
      const len = dots.length;
      const { w, h } = size;
      const t = frameCount * 0.02;

      const targetEngagement = Math.min(mouse.speed / 5, 1);
      engagement += (targetEngagement - engagement) * 0.06;
      if (engagement < 0.001) engagement = 0;
      const eng = engagement;

      ctx.clearRect(0, 0, w, h);

      const grad = ctx.createLinearGradient(0, 0, w, h);
      grad.addColorStop(0, config.gradientFrom);
      grad.addColorStop(1, config.gradientTo);
      ctx.fillStyle = grad;

      const cr = config.cursorRadius;
      const crSq = cr * cr;
      const rad = config.dotRadius / 2;
      const isBulge = config.bulgeOnly;

      ctx.beginPath();

      for (let i = 0; i < len; i++) {
        const d = dots[i];
        const dx = mouse.x - d.ax;
        const dy = mouse.y - d.ay;
        const distSq = dx * dx + dy * dy;

        if (distSq < crSq && eng > 0.01) {
          const dist = Math.sqrt(distSq);
          if (isBulge) {
            const t2 = 1 - dist / cr;
            const push = t2 * t2 * config.bulgeStrength * eng;
            const angle = Math.atan2(dy, dx);
            d.sx += (d.ax - Math.cos(angle) * push - d.sx) * 0.15;
            d.sy += (d.ay - Math.sin(angle) * push - d.sy) * 0.15;
          } else {
            const angle = Math.atan2(dy, dx);
            const move = (500 / dist) * (mouse.speed * config.cursorForce);
            d.vx += Math.cos(angle) * -move;
            d.vy += Math.sin(angle) * -move;
          }
        } else if (isBulge) {
          d.sx += (d.ax - d.sx) * 0.1;
          d.sy += (d.ay - d.sy) * 0.1;
        }

        if (!isBulge) {
          d.vx *= 0.9;
          d.vy *= 0.9;
          d.x = d.ax + d.vx;
          d.y = d.ay + d.vy;
          d.sx += (d.x - d.sx) * 0.1;
          d.sy += (d.y - d.sy) * 0.1;
        }

        let drawX = d.sx;
        let drawY = d.sy;
        if (config.waveAmplitude > 0) {
          drawY += Math.sin(d.ax * 0.03 + t) * config.waveAmplitude;
          drawX += Math.cos(d.ay * 0.03 + t * 0.7) * config.waveAmplitude * 0.5;
        }

        ctx.moveTo(drawX + rad, drawY);
        ctx.arc(drawX, drawY, rad, 0, TWO_PI);
      }

      ctx.fill();
      rafId = requestAnimationFrame(tick);
    }

    doResize();
    const speedInterval = setInterval(updateMouseSpeed, 20);
    window.addEventListener('resize', onResize);
    window.addEventListener('mousemove', onMouseMove, { passive: true });

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          cancelAnimationFrame(rafId);
          rafId = requestAnimationFrame(tick);
        } else {
          cancelAnimationFrame(rafId);
        }
      },
      { threshold: 0.01 },
    );
    observer.observe(container);

    rafId = requestAnimationFrame(tick);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(rafId);
      clearInterval(speedInterval);
      clearTimeout(resizeTimer);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouseMove);
      if (container.contains(canvas)) container.removeChild(canvas);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      id="dot-field-bg"
      className={`fixed inset-0 pointer-events-none z-0 ${className}`}
      aria-hidden="true"
    />
  );
}
