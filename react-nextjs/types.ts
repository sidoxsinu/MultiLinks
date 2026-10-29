export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
  ariaLabel: string;
}

export interface ActionItem {
  id: string;
  title: string;
  description: string;
  href?: string;
  external?: boolean;
  isEmailCopy?: boolean;
  emailAddress?: string;
  badge?: string;
  badgeType?: 'live' | 'accent' | 'default';
  isPrimaryCta?: boolean;
  icon: 'whatsapp' | 'email' | 'phone' | 'portfolio' | 'github' | 'linkedin' | 'resume';
}

export interface ProfileData {
  name: string;
  roles: string[];
  statusText: string;
  avatarUrl: string;
  badgeId: string;
  technicalBadges: string[];
}
