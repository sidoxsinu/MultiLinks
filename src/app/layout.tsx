import type { Metadata, Viewport } from 'next';
import './globals.css';

export const viewport: Viewport = {
  themeColor: '#111111',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://contact.muhammedsinan.in'),
  title: 'Muhammed Sinan M // Contact & Link Hub',
  description:
    'Official contact portal and links directory of Muhammed Sinan M — Full-Stack Engineer, Software Engineering Intern, and AI Systems Builder.',
  authors: [{ name: 'Muhammed Sinan M' }],
  creator: 'Muhammed Sinan M',
  alternates: {
    canonical: 'https://contact.muhammedsinan.in',
  },
  openGraph: {
    type: 'profile',
    url: 'https://contact.muhammedsinan.in',
    title: 'Muhammed Sinan M // Contact & Link Hub',
    description:
      'Full-Stack Engineer, Software Engineering Intern & AI Systems Builder. Connect directly, schedule calls, or view portfolios.',
    images: [
      {
        url: 'https://muhammedsinan.in/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Muhammed Sinan M - Contact & Link Hub',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@sidoxsinu',
    creator: '@sidoxsinu',
    title: 'Muhammed Sinan M // Contact & Link Hub',
    description: 'Full-Stack Engineer, Software Engineering Intern & AI Systems Builder.',
  },
  icons: {
    icon: '/images/profile_no_bg.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=general-sans@400,500,600,700&f[]=space-grotesk@400,500,600,700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          rel="preload"
          as="image"
          href="/images/profile_no_bg.png"
          type="image/png"
        />
      </head>
      <body className="bg-[#111111] text-white selection:bg-[#E54D2E] selection:text-white">
        {children}
      </body>
    </html>
  );
}
