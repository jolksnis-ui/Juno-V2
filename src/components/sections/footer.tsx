'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { DotPattern } from '@/components/ui/dot-pattern';
import { GetStartedButton } from '@/components/ui/get-started-button';
import { FadeInView } from '@/components/ui/fade-in-view';
import { FONT, BUTTON_TEXT } from '@/lib/constants';

/** Footer link interface */
interface FooterLink {
  label: string;
  href: string;
}

/** Footer section data - two columns as per Figma */
const FOOTER_LINKS: Record<string, FooterLink[]> = {
  Company: [
    { label: 'About us', href: '/about' },
    { label: 'Everyday banking', href: '/everyday-banking' },
    { label: 'Corporate account', href: '/corporate-account' },
    { label: 'Contact us', href: '#' },
  ],
  Resources: [
    { label: 'Cookie Policy', href: '#' },
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms and Conditions', href: '#' },
  ],
};

/**
 * Full-screen footer section
 * Features "Time is money" headline, navigation links, and legal info
 */
export const Footer = () => {
  return (
    <footer className="relative flex min-h-screen w-full flex-col justify-between bg-juno-900 px-10 pb-8 pt-[148px] text-white">
      {/* Background Texture */}
      <DotPattern color="#ffffff" opacity={0.02} />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col gap-12">
        {/* Top Section: Headline + Description */}
        <div className="flex items-center justify-between">
          <FadeInView className={cn('w-[440px] text-[60px] font-light leading-[68px] text-white', FONT.serif)}>
            Time is money.
            <br />
            Save both.
          </FadeInView>

          <FadeInView delay={0.1} className="w-[320px] text-base leading-normal text-juno-300">
            Unlock a world of financial possibilities with us, open an account
            today and start experiencing unparalleled banking solutions tailored
            just for you.
          </FadeInView>
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-white/10" />

        {/* Links Section */}
        <div className="flex items-start justify-between">
          {/* Link Columns */}
          <div className="flex gap-8">
            {Object.entries(FOOTER_LINKS).map(([category, links], idx) => (
              <FadeInView
                key={category}
                delay={0.2 + idx * 0.1}
                className="flex w-[200px] flex-col gap-8"
              >
                <span className={cn('text-sm text-juno-400', FONT.mono)}>
                  {category}
                </span>
                <ul className="flex flex-col gap-4">
                  {links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-base text-juno-25 transition-colors hover:text-white/70"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </FadeInView>
            ))}
          </div>

          {/* Open Account Button */}
          <FadeInView delay={0.4}>
            <GetStartedButton label={BUTTON_TEXT.openAccount} variant="light" />
          </FadeInView>
        </div>
      </div>

      {/* Bottom Section: Logo + Legal */}
      <div className="relative z-10 flex flex-col gap-8">
        {/* Juno Logo */}
        <FadeInView delay={0.5} direction="up" distance={0}>
          <span className={cn('text-[32px] font-light text-white', FONT.serif)}>
            juno
          </span>
        </FadeInView>

        {/* Divider */}
        <div className="h-px w-full bg-white/10" />

        {/* Legal Text */}
        <div className={cn('flex flex-col gap-6 text-sm text-juno-400', FONT.mono)}>
          <p>© Juno Money Ltd {new Date().getFullYear()} | All rights reserved.</p>
          <p className="max-w-full leading-normal">
            Juno Money Ltd - (Company Number: 2024801421), with its registered
            office at Suite #229, 6030 88ST NW, Edmonton, Alberta, T6E6G4, Canada.
            Juno Money Ltd is authorised by FINTRAC as a Money Service Business
            (MSB No. M23335654).
          </p>
        </div>
      </div>
    </footer>
  );
};
