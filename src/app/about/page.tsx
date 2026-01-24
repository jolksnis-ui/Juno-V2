import { AboutHeroSection } from '@/components/sections/about-hero-section';
import { MissionVisionSection } from '@/components/sections/mission-vision-section';
import { ValuesSection } from '@/components/sections/values-section';
import { WhatWeDoSection } from '@/components/sections/what-we-do-section';
import { InfrastructureSection } from '@/components/sections/infrastructure-section';
import { LeadershipSection } from '@/components/sections/leadership-section';
import { ContactSection } from '@/components/sections/contact-section';
import { Footer } from '@/components/sections/footer';

export const metadata = {
  title: 'About Us | Juno Bank',
  description:
    'Learn about Juno Bank - our mission, values, leadership team, and commitment to secure, compliant financial services for individuals and corporate clients.',
};

/**
 * About Us page showcasing company mission, values, services, and leadership
 */
export default function AboutPage() {
  return (
    <main className="overflow-x-hidden">
      <AboutHeroSection />
      <MissionVisionSection />
      <ValuesSection />
      <WhatWeDoSection />
      <InfrastructureSection />
      <LeadershipSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
