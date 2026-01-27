import type { Metadata } from 'next';
import Link from 'next/link';
import { LegalPageLayout } from '@/components/sections/legal-page-layout';

export const metadata: Metadata = {
  title: 'Privacy Policy | Juno Bank',
  description:
    'Learn how Juno collects, uses, and protects your personal data.',
};

/**
 * Privacy Policy page
 * Displays comprehensive privacy information and data handling practices
 */
export default function PrivacyPolicyPage() {
  return (
    <LegalPageLayout title="Privacy Policy" lastUpdated="26 April 2023">
      <h2>Contents</h2>
      <ol>
        <li>Important information and who we are</li>
        <li>The data we collect about you</li>
        <li>How is your personal data collected?</li>
        <li>How we use your personal data?</li>
        <li>Disclosures of your personal data</li>
        <li>International transfers</li>
        <li>Data security</li>
        <li>Data retention</li>
        <li>Your legal rights</li>
        <li>Glossary</li>
      </ol>

      <h2>1. Important information and who we are</h2>
      <h3>Purpose of this privacy policy</h3>
      <p>
        This Privacy Policy (the &quot;Policy&quot;) is provided by Juno
        (&quot;Juno Pay Ltd&quot;, &quot;Juno&quot;, &quot;we&quot;,
        &quot;us&quot; and &quot;our&quot;) and Juno is made up of different
        companies. When you first apply or use a Juno product or service, the
        Juno company whose Terms and Conditions govern such product or service
        and which you agree to is the controller and is responsible for your
        personal data.
      </p>
      <p>
        This Policy (together with our{' '}
        <Link href="/terms-and-conditions">Terms and Conditions</Link> and any
        additional terms incorporated by reference into the T&amp;C&apos;s,
        together our &quot;Terms of Use&quot;) applies to your use of:
      </p>
      <ul>
        <li>The Juno app (the &quot;App&quot;);</li>
        <li>Our website at junomoney.com (the &quot;Website&quot;);</li>
        <li>
          Any of the services available to you through the App or Website (the
          &quot;Services&quot;).
        </li>
      </ul>
      <p>
        Juno Pay Ltd respects your privacy and is committed to protecting your
        personal data and this Policy aims to give you information on how Juno
        Pay Ltd collects and processes your personal data through your use of
        the App, Website, and our Services, as well as what rights you have in
        relation to your personal data.
      </p>
      <p>
        If you have any questions about this Policy, including any requests to
        exercise any legal rights you have in relation to your personal data
        please contact us by email at{' '}
        <a href="mailto:support@junomoney.com">support@junomoney.com</a>.
      </p>
      <p>
        You have the right to make a complaint at any time to your local data
        protection authority. In Canada, this is the Office of the Privacy
        Commissioner of Canada. We would, however, appreciate the chance to deal
        with your concerns before you approach the local data protection
        authority so please contact us in the first instance.
      </p>

      <h3>Changes to the privacy policy and your duty to inform us of changes</h3>
      <p>
        This Policy is kept under regular review and may be amended or updated
        from time to time to reflect changes in our practices with respect to
        the processing of personal data, or changes in applicable laws. We
        encourage you to read this Policy carefully, and to regularly check this
        page to review any changes we might make in accordance with the terms of
        this Policy.
      </p>
      <p>
        It is important that the personal data we hold about you is accurate and
        current. Please keep us informed if your personal data changes during
        your relationship with us.
      </p>

      <h3>Third-party links</h3>
      <p>
        This website may include links to third-party websites, plug-ins and
        applications. Clicking on those links or enabling those connections may
        allow third parties to collect or share data about you. We do not
        control these third-party websites and are not responsible for their
        privacy statements or practices.
      </p>

      <h2>2. The data we collect about you</h2>
      <p>
        Personal data, or personal information, means any information about an
        individual from which that person can be identified. It does not include
        data where the identity has been removed (anonymous data).
      </p>
      <p>
        We may collect, use, store and transfer different kinds of personal data
        about you which we have grouped together as follows:
      </p>
      <ul>
        <li>
          <strong>Identity Data</strong> includes first name, last name, title,
          date of birth, age, gender, nationality, language and country of
          residence and your image in photo or video form (where required as
          part of our Know-Your-Customer checks to verify your identity).
        </li>
        <li>
          <strong>Employment Data</strong> includes job title, employer,
          location, proof of salary and/or earnings.
        </li>
        <li>
          <strong>Financial Data</strong> includes bank account details such as
          account number and sort code, payment card details, invoices, payment
          records, transaction history and/or other relevant financial data.
        </li>
        <li>
          <strong>Transaction Data</strong> includes details about payments to
          and from your account and other details of transactions on our
          Services.
        </li>
        <li>
          <strong>Technical Data</strong> includes internet protocol (IP)
          address, your login data, browser type, settings and version, time
          zone setting and location, browser plug-in types and versions,
          operating system, device type and platform.
        </li>
        <li>
          <strong>Profile Data</strong> includes your account registration
          details, purchases or payments made by you, your interests,
          preferences, feedback and survey responses.
        </li>
        <li>
          <strong>Usage Data</strong> includes language settings, dates and
          times of connecting to the App and Website, usage statistics,
          settings, location data, and data on how you interact with and use our
          features.
        </li>
        <li>
          <strong>Marketing and Communications Data</strong> includes your
          preferences in receiving marketing from us and our third parties, your
          communication preferences, and any records of our discussions.
        </li>
      </ul>
      <p>
        We do not collect any <strong>Special Categories of Personal Data</strong>{' '}
        about you (this includes details about your race or ethnicity, religious
        or philosophical beliefs, sex life, sexual orientation, political
        opinions, trade union membership, information about your health, and
        genetic and biometric data).
      </p>

      <h2>3. How is your personal data collected?</h2>
      <p>We use different methods to collect data from and about you including:</p>
      <ul>
        <li>
          <strong>Direct interactions.</strong> You may give us your Identity,
          Contact and Financial Data by filling in forms or by corresponding
          with us by post, phone, email or otherwise.
        </li>
        <li>
          <strong>Automated technologies or interactions.</strong> As you
          interact with our website, we will automatically collect Technical and
          Usage Data about your equipment, browsing actions and patterns. We
          collect this personal data by using cookies and other similar
          technologies. Please see our{' '}
          <Link href="/cookies">Cookie Policy</Link> for further details.
        </li>
        <li>
          <strong>Third parties or publicly available sources.</strong> We will
          receive personal data about you from various third parties and public
          sources such as credit reference agencies, financial or credit
          institutions, official registers and databases, fraud prevention
          agencies, identity service providers, and partners who help us to
          provide our Services.
        </li>
      </ul>

      <h2>4. How we use your personal data?</h2>
      <p>
        We will only use your personal data when the law allows us to. Most
        commonly, we will use your personal data in the following circumstances:
      </p>
      <ul>
        <li>
          Where we need to perform the contract we are about to enter into or
          have entered into with you.
        </li>
        <li>
          Where it is necessary for our legitimate interests (or those of a
          third party) and your interests and fundamental rights do not override
          those interests.
        </li>
        <li>Where we need to comply with a legal obligation.</li>
        <li>
          Where you have given us your consent (you have the right to withdraw
          consent to marketing at any time by contacting us).
        </li>
      </ul>

      <h3>Marketing</h3>
      <p>
        We strive to provide you with choices regarding certain personal data
        uses, particularly around marketing and advertising. You will receive
        marketing communications from us if you have requested information from
        us or purchased goods or services from us and you have not opted out of
        receiving that marketing.
      </p>
      <p>
        We will get your express opt-in consent before we share your personal
        data with any third party for marketing purposes.
      </p>

      <h3>Opting out</h3>
      <p>
        You can ask us or third parties to stop sending you marketing messages
        at any time by following the opt-out links on any marketing message sent
        to you or by contacting us at any time.
      </p>

      <h2>5. Disclosures of your personal data</h2>
      <p>
        We may share your personal data with the parties set out below for the
        purposes set out in this policy:
      </p>
      <ul>
        <li>Internal Third Parties (other companies in the Juno group)</li>
        <li>
          External Third Parties (suppliers, banking partners, analytics
          providers, professional advisers)
        </li>
        <li>
          Third parties to whom we may choose to sell, transfer or merge parts
          of our business or our assets
        </li>
      </ul>
      <p>
        We require all third parties to respect the security of your personal
        data and to treat it in accordance with the law.
      </p>

      <h2>6. International transfers</h2>
      <p>
        As we provide an international service, we may share your personal data
        outside of the European Economic Area (EEA) to help us provide our
        services. Whenever we transfer your personal data out of the EEA, we
        ensure a sufficient degree of protection is afforded to it by ensuring
        appropriate safeguards are implemented.
      </p>

      <h2>7. Data security</h2>
      <p>
        We have put in place appropriate security measures to prevent your
        personal data from being accidentally lost, used or accessed in an
        unauthorised way, altered or disclosed. In addition, we limit access to
        your personal data to those employees, agents, contractors and other
        third parties who have a business need to know.
      </p>
      <p>
        We have put in place procedures to deal with any suspected personal data
        breach and will notify you and any applicable regulator of a breach
        where we are legally required to do so.
      </p>

      <h2>8. Data retention</h2>
      <p>
        We will only retain your personal data for as long as reasonably
        necessary to fulfil the purposes we collected it for, including for the
        purposes of satisfying any legal, regulatory, tax, accounting or
        reporting requirements.
      </p>
      <p>
        By law we have to keep basic information about our customers (including
        Contact, Identity, Financial and Transaction Data) for six years after
        they cease being customers.
      </p>

      <h2>9. Your legal rights</h2>
      <p>
        Under certain circumstances, you have rights under data protection laws
        in relation to your personal data. You have the right to:
      </p>
      <ul>
        <li>
          <strong>Request access</strong> to your personal data (commonly known
          as a &quot;data subject access request&quot;).
        </li>
        <li>
          <strong>Request correction</strong> of the personal data that we hold
          about you.
        </li>
        <li>
          <strong>Request erasure</strong> of your personal data.
        </li>
        <li>
          <strong>Object to processing</strong> of your personal data where we
          are relying on a legitimate interest.
        </li>
        <li>
          <strong>Request restriction</strong> of processing of your personal
          data.
        </li>
        <li>
          <strong>Request the transfer</strong> of your personal data to you or
          to a third party.
        </li>
        <li>
          <strong>Withdraw consent at any time</strong> where we are relying on
          consent to process your personal data.
        </li>
      </ul>
      <p>
        If you wish to exercise any of the rights set out above, please contact
        us at{' '}
        <a href="mailto:support@junomoney.com">support@junomoney.com</a>.
      </p>

      <h2>10. Glossary</h2>
      <h3>Lawful Basis</h3>
      <ul>
        <li>
          <strong>Legitimate Interest</strong> means the interest of our
          business in conducting and managing our business to enable us to give
          you the best service/product and the best and most secure experience.
        </li>
        <li>
          <strong>Performance of Contract</strong> means processing your data
          where it is necessary for the performance of a contract to which you
          are a party.
        </li>
        <li>
          <strong>Comply with a legal obligation</strong> means processing your
          personal data where it is necessary for compliance with a legal
          obligation that we are subject to.
        </li>
      </ul>

      <h3>Third Parties</h3>
      <ul>
        <li>
          <strong>Internal Third Parties:</strong> Other companies in the Juno
          group who help us to provide the best service to you and other
          customers.
        </li>
        <li>
          <strong>External Third Parties:</strong> Suppliers who provide us with
          payment, IT and delivery services; our banking and financial service
          partners; analytics providers; communication service providers;
          professional advisers.
        </li>
      </ul>

      <hr />

      <h2>How to contact us</h2>
      <p>
        If you have any questions about this privacy policy, please contact us:
      </p>
      <p>
        Email:{' '}
        <a href="mailto:support@junomoney.com">support@junomoney.com</a>
      </p>
      <p>
        Address: Suite #229, 6030 88ST NW, Edmonton, Alberta, Canada, T6E6G4.
      </p>
    </LegalPageLayout>
  );
}
