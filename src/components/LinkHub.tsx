'use client';

import React, { useEffect, useState } from 'react';
import gsap from 'gsap';

import { ActionCard } from '@/components/ActionCard';
import { LanyardBadge } from '@/components/LanyardBadge';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { DotField } from '@/components/ui/DotField';
import { ACTION_ITEMS, PROFILE, SOCIAL_LINKS } from '@/data/links';

export function LinkHub() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

    tl.fromTo(
      '.anim-header',
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.08 }
    );

    tl.fromTo(
      '.anim-social-btn',
      { opacity: 0, scale: 0.75, y: 12 },
      { opacity: 1, scale: 1, y: 0, duration: 0.35, stagger: 0.05, ease: 'back.out(1.5)' },
      '-=0.2'
    );

    tl.fromTo(
      '.anim-section-title',
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.4 },
      '-=0.15'
    );

    tl.fromTo(
      '.anim-card',
      { opacity: 0, y: 25 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'power2.out' },
      '-=0.2'
    );

    tl.fromTo('.anim-footer', { opacity: 0 }, { opacity: 1, duration: 0.6 }, '-=0.1');
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const renderSocialIcon = (platform: string) => {
    switch (platform) {
      case 'WhatsApp':
        return (
          <svg className="w-4 h-4 text-neutral-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
          </svg>
        );
      case 'Call':
        return (
          <svg className="w-4 h-4 text-neutral-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
          </svg>
        );
      case 'Email':
        return (
          <svg className="w-4 h-4 text-neutral-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="20" height="16" x="2" y="4" rx="2"/>
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
          </svg>
        );
      case 'Portfolio':
        return (
          <svg className="w-4 h-4 text-neutral-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/>
            <path d="M2 12h20"/>
          </svg>
        );
      case 'LinkedIn':
        return (
          <svg className="w-4 h-4 text-neutral-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
            <rect width="4" height="12" x="2" y="9"/>
            <circle cx="4" cy="4" r="2"/>
          </svg>
        );
      case 'GitHub':
        return (
          <svg className="w-4 h-4 text-neutral-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
            <path d="M9 18c-4.51 2-5-2-7-2"/>
          </svg>
        );
      case 'X':
        return (
          <svg className="w-4 h-4 text-neutral-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4l11.733 16h4.267l-11.733 -16z"/>
            <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"/>
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-[#111111] text-white selection:bg-[#E54D2E] selection:text-white">
      {/* Background Dot Canvas */}
      <DotField />

      {/* Custom Blend-mode Cursor */}
      <CustomCursor />

      {/* Main Container */}
      <div className="relative z-10 flex min-h-screen w-full flex-col items-center justify-between px-3 py-6 sm:px-6 sm:py-10 md:px-8">
        
        {/* Top Minimal Navigation Bar */}
        <header className="w-full max-w-6xl flex justify-between items-center py-2 mb-2 sm:mb-4 px-1">
          <a
            href="https://muhammedsinan.in"
            className="group flex items-center gap-2 font-mono text-xs text-neutral-400 hover:text-white transition-colors"
            data-clickable="true"
          >
            <span className="text-[var(--accent-orange)] font-semibold">//</span>
            <span>muhammedsinan.in</span>
            <span className="text-neutral-600 group-hover:text-neutral-400 transition-colors">↗</span>
          </a>

          <div className="flex items-center gap-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono text-[11px] tracking-wider text-neutral-400 uppercase hidden sm:inline-block">
              HUB ONLINE
            </span>
          </div>
        </header>

        {/* 2-Column Responsive Layout Stage */}
        <main className="w-full max-w-6xl flex flex-col lg:flex-row items-center lg:items-start justify-center gap-8 lg:gap-12 my-auto">
          
          {/* Left Column: Glassmorphic Hub Panel */}
          <section className="w-full max-w-2xl flex flex-col items-center sm:items-stretch glass-panel p-5 sm:p-8 md:p-9 rounded-3xl" aria-label="Profile and Contact Directory">
            
            {/* Status Pill */}
            <div className="anim-header self-center mb-6">
              <div className="pulse-badge" data-clickable="true">
                <span className="pulse-dot">
                  <span className="pulse-dot-ping" />
                  <span className="pulse-dot-solid" />
                </span>
                <span>{PROFILE.statusText}</span>
              </div>
            </div>

            {/* Profile Info */}
            <div className="anim-header flex flex-col items-center text-center mb-7">
              <div className="relative mb-5 group" data-clickable="true">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl p-1 bg-gradient-to-b from-white/15 to-white/5 border border-white/10 shadow-xl overflow-hidden transition-transform duration-300 group-hover:scale-105">
                  <div className="w-full h-full rounded-xl bg-neutral-900 flex items-center justify-center overflow-hidden">
                    <img
                      src={PROFILE.avatarUrl}
                      alt={PROFILE.name}
                      className="w-full h-full object-cover object-top"
                      width={112}
                      height={112}
                    />
                  </div>
                </div>
                <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-[#161616] flex items-center justify-center shadow-lg" title="Online & Available">
                  <span className="w-2 h-2 rounded-full bg-white" />
                </span>
              </div>

              <h1 className="font-heading text-2xl sm:text-3xl font-semibold tracking-[-0.03em] uppercase text-white mb-2">
                {PROFILE.name}
              </h1>
              <p className="font-mono text-xs sm:text-sm text-neutral-400 font-normal tracking-wide max-w-md sm:max-w-none">
                {PROFILE.roles.join(' · ')}
              </p>

              {/* Quick Social Buttons (Single Row) */}
              <div className="flex items-center justify-center gap-1.5 sm:gap-2.5 mt-5" aria-label="Quick Social Channels">
                {SOCIAL_LINKS.map((s) => (
                  <a
                    key={s.platform}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="anim-social-btn social-icon-btn magnetic-btn"
                    aria-label={s.ariaLabel}
                    title={s.platform}
                    data-clickable="true"
                  >
                    {renderSocialIcon(s.platform)}
                  </a>
                ))}
              </div>
            </div>

            {/* Section Heading */}
            <div className="anim-section-title flex items-center justify-between mb-4 px-1 border-t border-white/[0.08] pt-5">
              <span className="font-mono text-[11px] tracking-wider text-neutral-400 uppercase flex items-center gap-1.5">
                <span className="text-[var(--accent-orange)]">//</span> DIRECT COMMUNICATION & ECOSYSTEM
              </span>
              <span className="font-mono text-[10px] text-neutral-500 hidden sm:inline-block">2-COLUMN GRID</span>
            </div>

            {/* 2-Column Action Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 w-full">
              {ACTION_ITEMS.map((item) => (
                <ActionCard key={item.id} item={item} onToast={showToast} />
              ))}
            </div>

          </section>

          {/* Right Column: Lanyard 3D Badge */}
          <LanyardBadge
            name={PROFILE.name}
            avatarUrl={PROFILE.avatarUrl}
            badgeId={PROFILE.badgeId}
            roles={PROFILE.technicalBadges}
          />

        </main>

        {/* Footer */}
        <footer className="anim-footer w-full max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left py-6 mt-4 border-t border-white/[0.06] px-1">
          <p className="font-mono text-xs text-neutral-500">
            © {new Date().getFullYear()} Muhammed Sinan M. All rights reserved.
          </p>
          <div className="flex items-center gap-4 font-mono text-xs text-neutral-500">
            <a href="https://muhammedsinan.in" className="hover:text-[var(--accent-orange)] transition-colors" data-clickable="true">
              Portfolio ↗
            </a>
            <span>·</span>
            <a href="https://github.com/sidoxsinu" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--accent-orange)] transition-colors" data-clickable="true">
              GitHub ↗
            </a>
            <span>·</span>
            <a href="https://linkedin.com/in/sidoxsinu" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--accent-orange)] transition-colors" data-clickable="true">
              LinkedIn ↗
            </a>
          </div>
        </footer>

      </div>

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="toast-container show" role="status" aria-live="polite">
          <svg className="w-4 h-4 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6 9 17l-5-5" />
          </svg>
          <span className="toast-msg">{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
