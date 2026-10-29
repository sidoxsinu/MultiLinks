'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface LanyardBadgeProps {
  name?: string;
  avatarUrl?: string;
  badgeId?: string;
  roles?: string[];
  className?: string;
}

export function LanyardBadge({
  name = 'MUHAMMED SINAN M',
  avatarUrl = '/images/profile_no_bg.png',
  badgeId = 'ID: SINAN-2026-ENG',
  roles = ['Full-Stack Developer', 'SDE Intern'],
  className = '',
}: LanyardBadgeProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    // 1. Natural pendulum settle on mount
    gsap.fromTo(
      card,
      {
        rotateZ: 14,
        rotateX: 4,
        rotateY: -6,
        transformOrigin: 'top center',
        opacity: 0,
        y: -30,
      },
      {
        rotateZ: 0,
        rotateX: 0,
        rotateY: 0,
        y: 0,
        opacity: 1,
        duration: 2.2,
        ease: 'elastic.out(1, 0.35)',
        delay: 0.3,
      }
    );

    // 2. Mouse Tilt Physics with Damping
    const onMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const cardCenterX = rect.left + rect.width / 2;
      const cardCenterY = rect.top + rect.height / 2;

      const dx = (e.clientX - cardCenterX) / (window.innerWidth / 2);
      const dy = (e.clientY - cardCenterY) / (window.innerHeight / 2);

      const rotZ = Math.max(-8, Math.min(8, dx * 7));
      const rotX = Math.max(-8, Math.min(8, -dy * 8));
      const rotY = Math.max(-10, Math.min(10, dx * 9));

      const mx = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
      const my = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));

      card.style.setProperty('--mx', `${mx.toFixed(1)}%`);
      card.style.setProperty('--my', `${my.toFixed(1)}%`);

      gsap.to(card, {
        rotateZ: rotZ,
        rotateX: rotX,
        rotateY: rotY,
        duration: 0.4,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    };

    const onMouseEnter = () => {
      card.classList.add('badge-hovered');
    };

    const onMouseLeave = () => {
      card.classList.remove('badge-hovered');
      gsap.to(card, {
        rotateZ: 0,
        rotateX: 0,
        rotateY: 0,
        duration: 1.4,
        ease: 'elastic.out(1, 0.4)',
        overwrite: 'auto',
      });
      card.style.setProperty('--mx', '50%');
      card.style.setProperty('--my', '50%');
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    card.addEventListener('mouseenter', onMouseEnter);
    card.addEventListener('mouseleave', onMouseLeave);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      card.removeEventListener('mouseenter', onMouseEnter);
      card.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return (
    <aside className={`lanyard-badge-column shrink-0 ${className}`} aria-label="Interactive 3D Engineering ID Badge">
      {/* Woven Fabric Strap */}
      <div className="lanyard-strap" aria-hidden="true" />

      {/* Metallic Clasp Hardware */}
      <div className="lanyard-hardware" aria-hidden="true">
        <div className="lanyard-clip-base" />
        <div className="lanyard-swivel-ring" />
        <div className="lanyard-hook" />
      </div>

      {/* Frosted Glass Badge Card */}
      <div
        ref={cardRef}
        className="lanyard-card"
        id="lanyard-badge-card"
        data-clickable="true"
        role="region"
        aria-label="Verification Badge"
      >
        {/* Holographic Sheen */}
        <div className="holographic-sheen" aria-hidden="true" />

        {/* Clip slot hole */}
        <div className="badge-slot-hole" aria-hidden="true" />

        {/* Card Header */}
        <div className="flex items-center justify-between mb-5 px-1">
          <div className="security-chip" title="Verified Engineering Chip" />
          <div className="font-mono text-[10px] tracking-widest text-neutral-400 uppercase">
            MEMBER BADGE <span className="text-[var(--accent-orange)]">//</span> DEV
          </div>
        </div>

        {/* Profile Avatar */}
        <div className="flex flex-col items-center text-center mb-4">
          <div className="relative mb-3">
            <div className="w-20 h-20 rounded-full p-1 bg-gradient-to-tr from-[var(--accent-orange)]/60 via-white/20 to-[var(--accent-orange)]/30 border border-white/20 shadow-[0_0_20px_rgba(229,77,46,0.25)]">
              <div className="w-full h-full rounded-full bg-[#181818] overflow-hidden flex items-center justify-center">
                <img
                  src={avatarUrl}
                  alt={name}
                  className="w-full h-full object-cover object-top"
                  width={76}
                  height={76}
                />
              </div>
            </div>
            <span className="absolute bottom-0 right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-[#161616]" />
          </div>

          <h2 className="font-heading text-lg font-bold tracking-tight text-white uppercase mb-1">
            {name}
          </h2>

          <div className="flex items-center gap-1.5 flex-wrap justify-center mt-1">
            {roles.map((r) => (
              <span key={r} className="tech-tag">
                {r}
              </span>
            ))}
          </div>
        </div>

        {/* Divider Line */}
        <div className="w-full border-t border-white/[0.08] my-3.5" />

        {/* Barcode & ID */}
        <div className="px-2">
          <svg className="w-full h-9 text-white/75" viewBox="0 0 180 32" fill="currentColor" aria-hidden="true">
            <rect x="0" y="0" width="2.5" height="32" />
            <rect x="5" y="0" width="1" height="32" />
            <rect x="8" y="0" width="3" height="32" />
            <rect x="13" y="0" width="2" height="32" />
            <rect x="17" y="0" width="4" height="32" />
            <rect x="23" y="0" width="1" height="32" />
            <rect x="26" y="0" width="2" height="32" />
            <rect x="30" y="0" width="3.5" height="32" />
            <rect x="36" y="0" width="1" height="32" />
            <rect x="39" y="0" width="4" height="32" />
            <rect x="45" y="0" width="2" height="32" />
            <rect x="49" y="0" width="1.5" height="32" />
            <rect x="52" y="0" width="3" height="32" />
            <rect x="57" y="0" width="2" height="32" />
            <rect x="61" y="0" width="4" height="32" />
            <rect x="67" y="0" width="1" height="32" />
            <rect x="70" y="0" width="2" height="32" />
            <rect x="74" y="0" width="4.5" height="32" />
            <rect x="81" y="0" width="1" height="32" />
            <rect x="84" y="0" width="3" height="32" />
            <rect x="89" y="0" width="2" height="32" />
            <rect x="93" y="0" width="1" height="32" />
            <rect x="96" y="0" width="4" height="32" />
            <rect x="102" y="0" width="2" height="32" />
            <rect x="106" y="0" width="3" height="32" />
            <rect x="111" y="0" width="1" height="32" />
            <rect x="114" y="0" width="2.5" height="32" />
            <rect x="119" y="0" width="4" height="32" />
            <rect x="125" y="0" width="1" height="32" />
            <rect x="128" y="0" width="3" height="32" />
            <rect x="133" y="0" width="2" height="32" />
            <rect x="137" y="0" width="4" height="32" />
            <rect x="143" y="0" width="1.5" height="32" />
            <rect x="146" y="0" width="2" height="32" />
            <rect x="150" y="0" width="3.5" height="32" />
            <rect x="155" y="0" width="1" height="32" />
            <rect x="158" y="0" width="4" height="32" />
            <rect x="164" y="0" width="2" height="32" />
            <rect x="168" y="0" width="1" height="32" />
            <rect x="171" y="0" width="3" height="32" />
            <rect x="176" y="0" width="4" height="32" />
          </svg>
          <p className="font-mono text-[10px] tracking-[0.25em] text-neutral-400 uppercase text-center mt-1.5 font-medium">
            {badgeId}
          </p>
        </div>

        <div className="mt-3 text-center">
          <span className="font-mono text-[9px] text-neutral-500 uppercase tracking-wider">
            [ HOVER / TILT INTERACTIVE ]
          </span>
        </div>
      </div>
    </aside>
  );
}
