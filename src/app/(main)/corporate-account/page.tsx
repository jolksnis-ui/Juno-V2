import type { Metadata } from 'next';
import { PageHero } from '@/components/sections/everyday-banking-hero';
import { CorporateSection } from '@/components/sections/corporate-section';
import { ContactSection } from '@/components/sections/contact-section';
import { Footer } from '@/components/sections/footer';
import { IMAGES } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Corporate Account | Juno Bank',
  description:
    'Multi-currency accounts, instant internal transfers and international online payments — all in one platform for corporate clients.',
};

/**
 * Corporate Account page for business clients
 * Features multi-currency accounts and corporate payment solutions
 */
export default function CorporateAccountPage() {
  return (
    <main>
      <PageHero
        variant="dark"
        title={
          <>
            Grow beyond borders
            <br />
            with a corporate account.
          </>
        }
        description="Multi-currency accounts, instant internal transfers and international online payments — all in one platform. Juno Money offers everything your business needs to simplify your global payments and financial operations."
        image={IMAGES.corporateBg}
        imageAlt="Corporate team discussing financial strategy"
      />
      <CorporateSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
