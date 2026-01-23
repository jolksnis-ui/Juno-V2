'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';
import { DotPattern } from '@/components/ui/dot-pattern';
import { FadeInView } from '@/components/ui/fade-in-view';
import { FONT, CONTAINER_MAX_WIDTH } from '@/lib/constants';

/** Props for the PageHero component */
interface PageHeroProps {
  /** Visual variant - light (default) or dark background */
  variant?: 'light' | 'dark';
  /** Main headline (supports JSX for line breaks) */
  title: React.ReactNode;
  /** Supporting description text */
  description: string;
  /** Hero image path */
  image: string;
  /** Alt text for the hero image */
  imageAlt: string;
}

/**
 * Reusable hero section for product pages
 * Supports light (bg-juno-25) and dark (bg-juno-900) variants
 */
const PageHero = ({
  variant = 'light',
  title,
  description,
  image,
  imageAlt,
}: PageHeroProps) => {
  const isDark = variant === 'dark';

  return (
    <section
      className={cn(
        'relative px-6 pb-24 pt-36',
        isDark ? 'bg-juno-900' : 'bg-juno-25'
      )}
    >
      <DotPattern color={isDark ? '#ffffff' : undefined} />

      <div
        className="relative mx-auto flex flex-col gap-16"
        style={{ maxWidth: CONTAINER_MAX_WIDTH }}
      >
        {/* Header: Headline + Description */}
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <FadeInView>
            <h1
              className={cn(
                'max-w-[700px] text-5xl leading-[1.1] md:text-6xl lg:text-[64px]',
                isDark ? 'text-white' : 'text-juno-900',
                FONT.serif
              )}
            >
              {title}
            </h1>
          </FadeInView>

          <FadeInView delay={0.1}>
            <p
              className={cn(
                'max-w-[480px] text-lg leading-normal',
                isDark ? 'text-juno-300' : 'text-juno-700'
              )}
            >
              {description}
            </p>
          </FadeInView>
        </div>

        {/* Hero Image */}
        <FadeInView delay={0.2}>
          <div
            className={cn(
              'relative aspect-[1392/640] w-full overflow-hidden rounded-md border',
              isDark ? 'border-juno-700' : 'border-juno-300'
            )}
          >
            <Image
              src={image}
              alt={imageAlt}
              fill
              className="object-cover"
              priority
            />
          </div>
        </FadeInView>
      </div>
    </section>
  );
};
PageHero.displayName = 'PageHero';

/**
 * Hero section for Everyday Banking page
 * Light background with dot pattern, headline, description, and full-width image
 */
const EverydayBankingHero = () => (
  <PageHero
    variant="light"
    title={
      <>
        Tailored, individual
        <br />
        payment solutions.
      </>
    }
    description="As a high net worth individual, if you're looking for a completely unique service that offers you secure and discrete execution of all of your financial affairs, then Juno Money has the solution."
    image="/images/everyday-banking-hero.jpg"
    imageAlt="Person working on laptop with warm lighting"
  />
);
EverydayBankingHero.displayName = 'EverydayBankingHero';

export { EverydayBankingHero, PageHero };
