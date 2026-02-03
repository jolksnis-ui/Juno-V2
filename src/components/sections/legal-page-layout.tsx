import { cn } from '@/lib/utils';
import { Footer } from '@/components/sections/footer';
import { FONT } from '@/lib/constants';

interface LegalPageLayoutProps {
  /** Page title displayed in hero */
  title: string;
  /** Last updated date string */
  lastUpdated?: string;
  /** Page content as React children */
  children: React.ReactNode;
}

/**
 * Shared layout for legal pages (Privacy, Terms, Cookies)
 * Dark hero header with title, white prose content area, and footer
 */
export const LegalPageLayout = ({
  title,
  lastUpdated,
  children,
}: LegalPageLayoutProps) => {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-juno-900 px-3 pb-16 pt-32 md:px-6 lg:px-6 lg:pb-24 lg:pt-40">
        <div className="mx-auto max-w-4xl md:max-w-[600px] lg:max-w-4xl">
          <h1
            className={cn(
              'text-4xl leading-tight text-white lg:text-5xl xl:text-6xl',
              FONT.serif
            )}
          >
            {title}
          </h1>
          {lastUpdated && (
            <p className={cn('mt-4 text-sm text-juno-400', FONT.mono)}>
              Last updated: {lastUpdated}
            </p>
          )}
        </div>
      </section>

      {/* Content Section */}
      <section className="bg-white px-3 py-12 md:px-6 lg:px-6 lg:py-20">
        <article className="legal-content mx-auto max-w-4xl text-juno-800">
          {children}
        </article>
      </section>

      <Footer />
    </>
  );
};
