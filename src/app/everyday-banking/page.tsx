import { EverydayBankingHero } from '@/components/sections/everyday-banking-hero';
import { FeaturesSection } from '@/components/sections/features-section';
import { ContactSection } from '@/components/sections/contact-section';
import { Footer } from '@/components/sections/footer';

export const metadata = {
  title: 'Everyday Banking | Juno Bank',
  description:
    'Tailored payment solutions for high net worth individuals. Secure and discrete execution of cross-border payments with personalized service.',
};

/**
 * Everyday Banking page for individual clients
 * Features tailored payment solutions and personal account services
 */
export default function EverydayBankingPage() {
  return (
    <main>
      <EverydayBankingHero />
      <FeaturesSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
