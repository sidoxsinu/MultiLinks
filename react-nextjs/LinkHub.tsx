'use client';

import React, { useEffect, useState } from 'react';
import gsap from 'gsap';

import { ActionCard } from './ActionCard';
import { CustomCursor } from './CustomCursor';
import { DotField } from './DotField';
import { LanyardBadge } from './LanyardBadge';
import type { ActionItem, ProfileData, SocialLink } from './types';

const DEFAULT_PROFILE: ProfileData = {
  name: 'MUHAMMED SINAN M',
  roles: ['Full-Stack Engineer', 'Software Engineering Intern', 'AI Builder'],
  statusText: '// STATUS: OPEN FOR NEW PROJECTS & COLLABORATION',
  avatarUrl: '/images/profile_no_bg.png',
  badgeId: 'ID: SINAN-2026-ENG',
  technicalBadges: ['Full-Stack Developer', 'SDE Intern'],
};

const DEFAULT_SOCIALS: SocialLink[] = [
  {
    platform: 'WhatsApp',
    url: 'https://wa.me/918590568566?text=Hi%20Muhammed%20Sinan%2C%20I%20visited%20your%20Link%20Hub%20and%20wanted%20to%20connect%21',
    icon: 'whatsapp',
    ariaLabel: 'WhatsApp Chat',
  },
  {
    platform: 'Call',
    url: 'tel:+918590568566',
    icon: 'phone',
    ariaLabel: 'Direct Phone Call',
  },
  {
    platform: 'Email',
    url: 'mailto:muhammedsinan.m67@gmail.com',
    icon: 'mail',
    ariaLabel: 'Send Email',
  },
  {
    platform: 'Portfolio',
    url: 'https://muhammedsinan.in',
    icon: 'globe',
    ariaLabel: 'Main Portfolio Website',
  },
  {
    platform: 'LinkedIn',
    url: 'https://linkedin.com/in/sidoxsinu',
    icon: 'linkedin',
    ariaLabel: 'LinkedIn Profile',
  },
  {
    platform: 'GitHub',
    url: 'https://github.com/sidoxsinu',
    icon: 'github',
    ariaLabel: 'GitHub Repositories',
  },
];

const DEFAULT_ACTIONS: ActionItem[] = [
  {
    id: 'whatsapp',
    title: 'WhatsApp',
    description: 'Direct chat & inquiry',
    href: 'https://wa.me/918590568566?text=Hi%20Muhammed%20Sinan%2C%20I%20visited%20your%20Link%20Hub%20and%20wanted%20to%20connect%21',
    external: true,
    icon: 'whatsapp',
  },
  {
    id: 'email',
    title: 'Email',
    description: 'muhammedsinan.m67@gmail.com',
    isEmailCopy: true,
    emailAddress: 'muhammedsinan.m67@gmail.com',
    icon: 'email',
  },
  {
    id: 'call',
    title: 'Schedule a Call',
    description: 'Direct phone & voice',
    href: 'tel:+918590568566',
    icon: 'phone',
  },
  {
    id: 'portfolio',
    title: 'Main Portfolio',
    description: 'muhammedsinan.in',
    href: 'https://muhammedsinan.in',
    external: true,
    badge: 'LIVE',
    icon: 'portfolio',
  },
  {
    id: 'github',
    title: 'GitHub',
    description: '@sidoxsinu · Repos & AI',
    href: 'https://github.com/sidoxsinu',
    external: true,
    icon: 'github',
  },
  {
    id: 'linkedin',
    title: 'LinkedIn',
    description: 'Professional Network',
    href: 'https://linkedin.com/in/sidoxsinu',
    external: true,
    icon: 'linkedin',
  },
  {
    id: 'resume',
    title: 'Download Resume (PDF)',
    description: 'Engineering, Architecture & AI Project Track Records',
    href: '/Muhammed_Sinan_M.pdf',
    isPrimaryCta: true,
    icon: 'resume',
  },
];

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

  return (
    <div className="relative min-h-screen w-full bg-[#111111] text-white selection:bg-[#E54D2E] selection:text-white">
      {/* Background Dot Canvas */}
      <DotField />

      {/* Custom Blend-mode Cursor */}
      <CustomCursor />

      {/* Main Container */}
      <div className="relative z-10 flex min-h-screen w-full flex-col items-center justify-between px-4 py-8 sm:py-12 md:px-8">
        
        {/* Top Minimal Navigation Bar */}
        <header className="w-full max-w-5xl flex justify-between items-center py-2 mb-2 sm:mb-4">
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
        <main className="w-full max-w-5xl flex flex-col lg:flex-row items-center lg:items-start justify-center gap-8 lg:gap-14 my-auto">
          
          {/* Left Column: Glassmorphic Hub Panel */}
          <section className="w-full max-w-xl flex flex-col items-center sm:items-stretch glass-panel p-6 sm:p-9 rounded-3xl">
            
            {/* Status Pill */}
            <div className="anim-header self-center mb-6">
              <div className="pulse-badge" data-clickable="true">
                <span className="pulse-dot">
                  <span className="pulse-dot-ping" />
                  <span className="pulse-dot-solid" />
                </span>
                <span>{DEFAULT_PROFILE.statusText}</span>
              </div>
            </div>

            {/* Profile Info */}
            <div className="anim-header flex flex-col items-center text-center mb-7">
              <div className="relative mb-5 group" data-clickable="true">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl p-1 bg-gradient-to-b from-white/15 to-white/5 border border-white/10 shadow-xl overflow-hidden transition-transform duration-300 group-hover:scale-105">
                  <div className="w-full h-full rounded-xl bg-neutral-900 flex items-center justify-center overflow-hidden">
                    <img
                      src={DEFAULT_PROFILE.avatarUrl}
                      alt={DEFAULT_PROFILE.name}
                      className="w-full h-full object-cover object-top"
                      width={112}
                      height={112}
                    />
                  </div>
                </div>
                <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-[#161616] flex items-center justify-center shadow-lg">
                  <span className="w-2 h-2 rounded-full bg-white" />
                </span>
              </div>

              <h1 className="font-heading text-2xl sm:text-3xl font-semibold tracking-[-0.03em] uppercase text-white mb-2">
                {DEFAULT_PROFILE.name}
              </h1>
              <p className="font-mono text-xs sm:text-sm text-neutral-400 font-normal tracking-wide">
                {DEFAULT_PROFILE.roles.join(' · ')}
              </p>

              {/* Quick Social Buttons */}
              <div className="flex items-center justify-center gap-2.5 mt-5 flex-wrap">
                {DEFAULT_SOCIALS.map((s) => (
                  <a
                    key={s.platform}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="anim-social-btn social-icon-btn magnetic-btn"
                    aria-label={s.ariaLabel}
                    data-clickable="true"
                  >
                    <span className="text-xs font-mono font-medium">{s.platform[0]}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Section Heading */}
            <div className="anim-section-title flex items-center justify-between mb-4 px-1 border-t border-white/[0.08] pt-5">
              <span className="font-mono text-[11px] tracking-wider text-neutral-400 uppercase flex items-center gap-1.5">
                <span className="text-[var(--accent-orange)]">//</span> DIRECT COMMUNICATION & ECOSYSTEM
              </span>
              <span className="font-mono text-[10px] text-neutral-500">2-COLUMN GRID</span>
            </div>

            {/* 2-Column Action Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 w-full">
              {DEFAULT_ACTIONS.map((item) => (
                <ActionCard key={item.id} item={item} onToast={showToast} />
              ))}
            </div>

          </section>

          {/* Right Column: Lanyard 3D Badge */}
          <LanyardBadge
            name={DEFAULT_PROFILE.name}
            avatarUrl={DEFAULT_PROFILE.avatarUrl}
            badgeId={DEFAULT_PROFILE.badgeId}
            roles={DEFAULT_PROFILE.technicalBadges}
          />

        </main>

        {/* Footer */}
        <footer className="anim-footer w-full max-w-5xl flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left py-6 mt-4 border-t border-white/[0.06]">
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
