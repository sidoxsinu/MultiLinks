import type { ActionItem, ProfileData, SocialLink } from '@/types';

export const PROFILE: ProfileData = {
  name: 'MUHAMMED SINAN M',
  roles: ['Full-Stack Engineer', 'Software Engineering Intern', 'AI Builder'],
  statusText: '// STATUS: OPEN FOR NEW PROJECTS & COLLABORATION',
  avatarUrl: '/images/profile_no_bg.png',
  badgeId: 'ID: SINAN-2026-ENG',
  technicalBadges: ['Full-Stack Developer', 'SDE Intern'],
};

export const SOCIAL_LINKS: SocialLink[] = [
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
    icon: 'email',
    ariaLabel: 'Send Email',
  },
  {
    platform: 'Portfolio',
    url: 'https://muhammedsinan.in',
    icon: 'portfolio',
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
  {
    platform: 'X',
    url: 'https://x.com/sidoxsinu',
    icon: 'x',
    ariaLabel: 'X / Twitter Profile',
  },
];

export const ACTION_ITEMS: ActionItem[] = [
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
