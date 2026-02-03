'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';
import { DotPattern } from '@/components/ui/dot-pattern';
import { FadeInView } from '@/components/ui/fade-in-view';
import { FONT, CONTAINER_MAX_WIDTH, IMAGES, VIDEOS } from '@/lib/constants';

/** Props for the PageHero component */
interface PageHeroProps {
  /** Visual variant - light (default) or dark background */
  variant?: 'light' | 'dark';
  /** Main headline (supports JSX for line breaks) */
  title: React.ReactNode;
  /** Supporting description text */
  description: string;
  /** Hero image path (used when video is not provided) */
  image: string;
  /** Alt text for the hero image */
  imageAlt: string;
  /** Optional hero video path – when set, video is shown instead of image */
  video?: string;
  /** Whether to center the headline and description */
  centered?: boolean;
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
  video,
  centered = false,
}: PageHeroProps) => {
  const isDark = variant === 'dark';

  return (
    <section
      className={cn(
        // Mobile/tablet spacing:
        // - top: 116px (mobile/tablet)
        // - title↔body: 24px
        // - header↔video: 40px (mobile/tablet); space below video: 64px
        'relative px-3 pb-16 pt-[116px] md:px-6 lg:pt-36 lg:pb-24',
        isDark ? 'bg-juno-900' : 'bg-juno-25'
      )}
    >
      <DotPattern color={isDark ? '#ffffff' : undefined} />

      <div
        className="relative mx-auto flex flex-col gap-10 lg:gap-16"
        style={{ maxWidth: CONTAINER_MAX_WIDTH }}
      >
        {/* Header: Headline + Description – tablet only: max-w 600px for title and body */}
        <div
          className={cn(
            'flex flex-col gap-6 lg:gap-8 md:mx-auto md:max-w-[600px]',
            centered
              ? 'items-center text-center'
              : 'items-center text-center lg:flex-row lg:justify-between lg:text-left lg:items-center lg:mx-0 lg:max-w-none'
          )}
        >
          <FadeInView className="md:max-w-[600px] md:w-full lg:max-w-none">
            <h1
              className={cn(
                'w-full max-w-[700px] text-[46px] leading-[50px] md:max-w-[600px] lg:max-w-[700px] lg:text-[64px] lg:leading-[68px]',
                isDark ? 'text-white' : 'text-juno-900',
                FONT.serif
              )}
            >
              {title}
            </h1>
          </FadeInView>

          <FadeInView delay={0.1} className="md:max-w-[600px] lg:max-w-none">
            <p
              className={cn(
                'max-w-[480px] text-base leading-normal md:max-w-[600px] lg:max-w-[480px]',
                isDark ? 'text-juno-300' : 'text-juno-700'
              )}
            >
              {description}
            </p>
          </FadeInView>
        </div>

        {/* Hero Image or Video – mobile/tablet: 300px height; desktop: aspect ratio */}
        <FadeInView delay={0.2}>
          <div
            className={cn(
              'relative h-[300px] w-full overflow-hidden rounded-md border lg:h-auto lg:aspect-[1392/640]',
              isDark ? 'border-juno-700' : 'border-juno-300'
            )}
          >
            {video ? (
              <video
                src={video}
                className="absolute inset-0 size-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                disablePictureInPicture
                aria-hidden
              />
            ) : (
              <Image
                src={image}
                alt={imageAlt}
                fill
                className="object-cover"
                priority
              />
            )}
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
    centered
    title={
      <>
        Tailored, individual
        <br />
        payment solutions.
      </>
    }
    description="As a high net worth individual, if you're looking for a completely unique service that offers you secure and discrete execution of all of your financial affairs, then Juno Money has the solution."
    image={IMAGES.everydayBankingHero}
    imageAlt="Person working on laptop with warm lighting"
    video={VIDEOS.individualHero}
  />
);
EverydayBankingHero.displayName = 'EverydayBankingHero';

export { EverydayBankingHero, PageHero };
