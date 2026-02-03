import type { Metadata } from 'next';
import { Geist, Geist_Mono, Prata } from 'next/font/google';
import { LOGO_SRC } from '@/lib/constants';
import SmoothScroll from '@/components/ui/smooth-scroll';
import { PageTransition } from '@/components/ui/page-transition';
import { HeaderWrapper } from '@/components/layout/header-wrapper';
import { Preloader } from '@/components/ui/preloader';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const prata = Prata({
  variable: '--font-prata',
  subsets: ['latin'],
  weight: ['400'],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://junomoney.com'),
  title: 'Juno Bank | Premium Banking Services',
  description:
    'Highly personalised banking services for corporate entities, institutions and high net worth individuals.',
  icons: {
    icon: [{ url: LOGO_SRC, type: 'image/svg+xml' }],
    apple: [{ url: LOGO_SRC, type: 'image/svg+xml', sizes: '180x180' }],
  },
  openGraph: {
    type: 'website',
    images: [{ url: '/opengraph-image?v=junomoney', width: 1200, height: 630, alt: 'Juno Money' }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/opengraph-image?v=junomoney'],
  },
};

/** Root layout that sets fonts, favicon, and global UI shell. */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${prata.variable} antialiased overflow-x-hidden`}
      >
        <Preloader />
        <SmoothScroll>
          <HeaderWrapper />
          <PageTransition>
            {children}
          </PageTransition>
        </SmoothScroll>
      </body>
    </html>
  );
}
