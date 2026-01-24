import { HeroSection } from '@/components/sections/hero-section';
import { SecuritySection } from '@/components/sections/security-section';
import { AccountSection } from '@/components/sections/account-section';
import { FeaturesSection } from '@/components/sections/features-section';
import { CorporateSection } from '@/components/sections/corporate-section';
import { ContactSection } from '@/components/sections/contact-section';
import { Footer } from '@/components/sections/footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Juno Bank - Premium Banking for High Net Worth Individuals',
  description: 'Tailored payment solutions and corporate accounts for high net worth individuals and businesses. Secure, discrete execution of your financial affairs.',
};

/**
 * Homepage - showcases Juno Bank services for individual and corporate clients
 */
export default function Home() {
  return (
    <main>
      <HeroSection />
      <SecuritySection />
      <AccountSection />
      <FeaturesSection />
      <CorporateSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
