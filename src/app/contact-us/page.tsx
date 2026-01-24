import type { Metadata } from 'next';
import { ContactSection } from '@/components/sections/contact-section';
import { Footer } from '@/components/sections/footer';

export const metadata: Metadata = {
  title: 'Contact Us | Juno Bank',
  description:
    'Contact Juno Bank to discuss premium banking solutions tailored for individuals and corporate clients.',
};

/**
 * Contact Us page with the main contact section only
 */
export default function ContactUsPage() {
  return (
    <main>
      <ContactSection />
      <Footer />
    </main>
  );
}
