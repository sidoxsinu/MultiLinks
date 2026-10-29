'use client';

import React, { useState } from 'react';
import type { ActionItem } from '@/types';

interface ActionCardProps {
  item: ActionItem;
  onToast?: (message: string) => void;
}

export function ActionCard({ item, onToast }: ActionCardProps) {
  const [copied, setCopied] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--card-x', `${x}px`);
    e.currentTarget.style.setProperty('--card-y', `${y}px`);
  };

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    const email = item.emailAddress || 'muhammedsinan.m67@gmail.com';
    navigator.clipboard.writeText(email).then(() => {
      setCopied(true);
      if (onToast) onToast(`Email copied to clipboard: ${email}`);
      setTimeout(() => setCopied(false), 2400);
    });
  };

  const renderIcon = () => {
    switch (item.icon) {
      case 'whatsapp':
        return (
          <svg className="w-5 h-5 text-[#25D366]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
          </svg>
        );
      case 'email':
        return copied ? (
          <svg className="w-5 h-5 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6 9 17l-5-5"/>
          </svg>
        ) : (
          <svg className="w-5 h-5 text-neutral-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="20" height="16" x="2" y="4" rx="2"/>
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
          </svg>
        );
      case 'phone':
        return (
          <svg className="w-5 h-5 text-neutral-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
          </svg>
        );
      case 'portfolio':
        return (
          <svg className="w-5 h-5 text-[var(--accent-orange)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/>
            <path d="M2 12h20"/>
          </svg>
        );
      case 'github':
        return (
          <svg className="w-5 h-5 text-neutral-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
            <path d="M9 18c-4.51 2-5-2-7-2"/>
          </svg>
        );
      case 'linkedin':
        return (
          <svg className="w-5 h-5 text-[#0A66C2]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
            <rect width="4" height="12" x="2" y="9"/>
            <circle cx="4" cy="4" r="2"/>
          </svg>
        );
      case 'resume':
        return (
          <svg className="w-5 h-5 text-[var(--accent-orange)] cta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/>
            <path d="M14 2v4a2 2 0 0 0 2 2h4"/>
            <path d="M12 18v-6"/>
            <path d="m9 15 3 3 3-3"/>
          </svg>
        );
    }
  };

  // Primary CTA (Full width)
  if (item.isPrimaryCta) {
    return (
      <a
        href={item.href}
        download="Muhammed_Sinan_M.pdf"
        onMouseMove={handleMouseMove}
        className="anim-card action-card cta-resume-card group col-span-1 sm:col-span-2 !py-4"
        data-clickable="true"
      >
        <div className="flex items-center gap-4 min-w-0">
          <div className="w-11 h-11 rounded-xl bg-[var(--accent-orange)]/15 border border-[var(--accent-orange)]/40 flex items-center justify-center shrink-0 group-hover:bg-white/20 transition-colors">
            {renderIcon()}
          </div>
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-heading text-base font-semibold text-white cta-text-title transition-colors">
                {item.title}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-wider text-orange-300 font-semibold bg-orange-500/20 px-2 py-0.5 rounded border border-orange-500/30">
                UPDATED 2026
              </span>
            </div>
            <span className="font-mono text-xs text-neutral-300 cta-text-sub transition-colors truncate">
              {item.description}
            </span>
          </div>
        </div>
        <div className="shrink-0 flex items-center gap-1 font-mono text-xs font-semibold px-3 py-1.5 rounded-lg bg-white/10 group-hover:bg-white text-white group-hover:text-black transition-colors">
          <span>PDF ⤓</span>
        </div>
      </a>
    );
  }

  // Email Card (One-click copy)
  if (item.isEmailCopy) {
    return (
      <div
        role="button"
        tabIndex={0}
        onClick={handleCopyEmail}
        onMouseMove={handleMouseMove}
        className={`anim-card action-card group cursor-pointer ${
          copied ? 'border-emerald-500/60 bg-emerald-950/20' : ''
        }`}
        data-clickable="true"
        title="Click to copy email address"
      >
        <div className="flex items-center gap-3.5 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center shrink-0 group-hover:border-[var(--accent-orange)]/40 group-hover:bg-[var(--accent-orange)]/10 transition-colors">
            {renderIcon()}
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-heading text-sm font-medium text-white group-hover:text-[var(--accent-orange)] transition-colors">
              {copied ? 'Copied to Clipboard!' : item.title}
            </span>
            <span className="font-mono text-[11px] text-neutral-400 email-card-sub truncate">
              {copied ? '✓ Ready to paste anywhere' : item.description}
            </span>
          </div>
        </div>
        <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-500 group-hover:text-white shrink-0 border border-white/10 px-2 py-0.5 rounded">
          {copied ? 'DONE' : 'COPY'}
        </span>
      </div>
    );
  }

  // Standard Action Card
  return (
    <a
      href={item.href}
      target={item.external ? '_blank' : undefined}
      rel={item.external ? 'noopener noreferrer' : undefined}
      onMouseMove={handleMouseMove}
      className="anim-card action-card group"
      data-clickable="true"
    >
      <div className="flex items-center gap-3.5 min-w-0">
        <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center shrink-0 group-hover:border-[var(--accent-orange)]/40 group-hover:bg-[var(--accent-orange)]/10 transition-colors">
          {renderIcon()}
        </div>
        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="font-heading text-sm font-medium text-white group-hover:text-[var(--accent-orange)] transition-colors">
              {item.title}
            </span>
            {item.badge === 'LIVE' && (
              <span className="inline-flex items-center gap-1 font-mono text-[9px] text-emerald-400 font-semibold bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                LIVE
              </span>
            )}
          </div>
          <span className="font-mono text-[11px] text-neutral-400 truncate">
            {item.description}
          </span>
        </div>
      </div>
      <svg className="w-4 h-4 text-neutral-500 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 17 17 7"/>
        <path d="M7 7h10v10"/>
      </svg>
    </a>
  );
}
