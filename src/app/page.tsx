import { HeroSection } from '@/components/sections/hero-section';
import { SecuritySection } from '@/components/sections/security-section';
import { AccountSection } from '@/components/sections/account-section';
import { FeaturesSection } from '@/components/sections/features-section';
import { CorporateSection } from '@/components/sections/corporate-section';
import { ContactSection } from '@/components/sections/contact-section';
import { Footer } from '@/components/sections/footer';

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
