'use client';

import { cn } from '@/lib/utils';
import { DotPattern } from '@/components/ui/dot-pattern';
import { GetStartedButton } from '@/components/ui/get-started-button';
import { FadeInView } from '@/components/ui/fade-in-view';
import { AppLink } from '@/components/ui/app-link';
import { CONTAINER_MAX_WIDTH, FONT, BUTTON_TEXT } from '@/lib/constants';

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
    { label: 'Contact us', href: '/contact-us' },
  ],
  Resources: [
    { label: 'Cookie Policy', href: '/cookies' },
    { label: 'Privacy Policy', href: '/privacy-policy' },
    { label: 'Terms and Conditions', href: '/terms-and-conditions' },
  ],
};

/**
 * Full-screen footer section
 * Features "Time is money" headline, navigation links, and legal info
 */
export const Footer = () => {
  return (
    <footer className="relative flex w-full flex-col gap-16 bg-juno-900 px-4 pb-8 pt-20 text-white md:min-h-[856px] md:h-screen md:justify-end md:gap-[96px] md:px-10 md:pt-[148px]">
      {/* Background Texture */}
      <DotPattern color="#ffffff" opacity={0.02} />

      {/* Main Content */}
      <div
        className="relative z-10 mx-auto flex w-full flex-col gap-10 md:gap-12"
        style={{ maxWidth: CONTAINER_MAX_WIDTH }}
      >
        {/* Top Section: Headline + Description */}
        <div className="flex flex-col items-center justify-between gap-8 text-center md:flex-row md:items-center md:gap-0 md:text-left">
          <FadeInView className={cn('w-full text-4xl font-light leading-[56px] text-white md:max-w-[440px] md:text-[60px] md:leading-[68px]', FONT.serif)}>
            Time is money.
            <br />
            Save both.
          </FadeInView>

          <FadeInView delay={0.1} className="w-full max-w-[320px] text-base leading-normal text-juno-300">
            Unlock a world of financial possibilities with us, open an account
            today and start experiencing unparalleled banking solutions tailored
            just for you.
          </FadeInView>
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-white/10" />

        {/* Links Section */}
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between md:gap-0">
          {/* Link Columns */}
          <div className="flex w-full flex-col gap-10 text-center md:w-auto md:flex-row md:gap-8 md:text-left">
            {Object.entries(FOOTER_LINKS).map(([category, links], idx) => (
              <FadeInView
                key={category}
                delay={0.2 + idx * 0.1}
                className="flex w-full flex-col gap-6 md:gap-8 md:w-[200px]"
              >
                <span className={cn('text-sm text-juno-400', FONT.mono)}>
                  {category}
                </span>
                <ul className="flex flex-col gap-4">
                  {links.map((link) => (
                    <li key={link.label}>
                      <AppLink
                        href={link.href}
                        className="text-base text-juno-25 transition-colors hover:text-white/70"
                      >
                        {link.label}
                      </AppLink>
                    </li>
                  ))}
                </ul>
              </FadeInView>
            ))}
          </div>

          {/* Open Account Button */}
          <FadeInView delay={0.4} className="w-full md:w-auto">
            <GetStartedButton
              label={BUTTON_TEXT.openAccount}
              variant="light"
              className="w-full md:w-auto"
            />
          </FadeInView>
        </div>
      </div>

      {/* Bottom Section: Logo + Legal */}
      <div
        className="relative z-10 mx-auto flex w-full flex-col items-center gap-8 text-center md:items-start md:text-left"
        style={{ maxWidth: CONTAINER_MAX_WIDTH }}
      >
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
