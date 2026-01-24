import type { Metadata } from 'next';
import { Geist, Geist_Mono, Prata } from 'next/font/google';
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
  title: 'Juno Bank | Premium Banking Services',
  description:
    'Highly personalised banking services for corporate entities, institutions and high net worth individuals.',
  icons: {
    icon: [
      {
        url: '/images/Favicon@2x.png',
        sizes: '32x32',
        type: 'image/png',
      },
    ],
    apple: [
      {
        url: '/images/Favicon@2x.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
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
        className={`${geistSans.variable} ${geistMono.variable} ${prata.variable} antialiased`}
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
