import type { Metadata } from 'next';
import Link from 'next/link';
import { LegalPageLayout } from '@/components/sections/legal-page-layout';

export const metadata: Metadata = {
  title: 'Cookie Policy | Juno Bank',
  description:
    'Learn about how Juno uses cookies and similar technologies on our website and services.',
};

/**
 * Cookie Policy page
 * Displays cookie usage information and management options
 */
export default function CookiesPage() {
  return (
    <LegalPageLayout title="Cookies" lastUpdated="26 April 2023">
      <p>
        When you visit or interact with our site, services, applications, tools
        or messages, we or our authorized service providers and third parties
        may use cookies and other similar technologies. These technologies allow
        our sites, services, applications, and tools to store relevant
        information in your browser or device. Our authorized service providers
        and third parties may place cookies on your device via our services.
      </p>
      <p>
        Service providers are companies that help us with various aspects of our
        business, such as site operations, services, applications, advertisements
        and tools. We use some authorized service providers to help us to serve
        you relevant ads on our services and other places on the internet. These
        service providers may also place cookies on your device via our services
        (third party cookies). They may also collect information that helps them
        identify your device, such as IP-address or other unique or device
        identifiers.
      </p>

      <h2>1. What are cookies?</h2>
      <p>
        The specific names and types of the cookies, web beacons, and other
        similar technologies we use may change from time to time. In order to
        help you better understand this Policy and our use of such technologies
        we have provided the following limited terminology and definitions:
      </p>
      <p>
        Cookies are text files placed on your computer to collect standard
        Internet log information and visitor behaviour information. When you
        visit our websites, we may collect information from you automatically
        through cookies or similar technology. There are several types of
        cookies:
      </p>
      <ul>
        <li>
          <strong>Session cookies</strong> expire at the end of your browser
          session and allow us to link your actions during that browser session.
          They remain on your device only for the duration of the browser
          session.
        </li>
        <li>
          <strong>Persistent cookies</strong> are stored on your device in
          between browser sessions, allowing us to remember your preferences or
          actions across multiple sites. They remain on your device for a longer
          period.
        </li>
        <li>
          <strong>First-party cookies</strong> are set by the site you are
          visiting.
        </li>
        <li>
          <strong>Third-party cookies</strong> are set by third-party sites
          separate from the site you are visiting.
        </li>
      </ul>
      <p>
        In addition, we may also use web beacons (or clear GIFs) and other
        similar technologies in addition to, or in combination with, cookies. A
        web beacon is typically a transparent graphic image (usually 1 pixel x 1
        pixel) that is placed on a website or in an email and it helps us to
        understand the behaviour of visitors to our Site.
      </p>

      <h2>2. How do we use cookies?</h2>
      <p>
        We use cookies in a range of ways to collect information and improve
        your experience on our website. They are either necessary for the
        functioning of our services, help us improve our performance and/or give
        you extra functionalities. The information collected by cookies we use
        includes those such as:
      </p>
      <ul>
        <li>
          <strong>Technical Usage Data.</strong> Information about response time
          for web pages, download errors and date and time when you access the
          service, such as your IP address, statistics regarding how pages are
          loaded or viewed, the websites you visited before coming to the site
          and other usage and browsing information collected through Cookie.
        </li>
        <li>
          <strong>Information from your device.</strong> Information about your
          language settings, IP address, browser ID, device ID, cookie
          preferences, time zone, operating system, platform, screen resolution
          and similar information about your device settings, and data collected
          from cookies.
        </li>
        <li>
          <strong>Location Information.</strong> Information from IP-based
          geolocation such as latitude and longitude data, and Global
          Positioning System (GPS) information when you give us permission
          through your device settings.
        </li>
      </ul>
      <p>Our uses of cookies fall into the following general categories:</p>
      <ul>
        <li>
          <strong>Essential.</strong> Some cookies are necessary for the
          operation of our site, services, applications, and tools. This
          includes technologies that allow you access to our sites, services,
          applications, and tools; that are required to identify irregular site
          behaviour, prevent fraudulent activity and improve security; or that
          allow you to make use of our functions such as shopping-carts, saved
          search, or similar functions.
        </li>
        <li>
          <strong>Performance.</strong> We may use cookies to assess the
          performance of our websites, applications, services, and tools,
          including as part of our analytic practices to help us understand how
          our visitors use our websites, determine if you have interacted with
          our messaging, determine whether you have viewed an item or link, or
          to improve our website content, applications, services, or tools.
        </li>
        <li>
          <strong>Functionality.</strong> We may use cookies that allow us to
          offer you enhanced functionality when accessing or using our sites,
          services, applications, or tools. This may include identifying you
          when you sign into our sites or keeping track of your specified
          preferences, interests, or past items viewed, what language you prefer
          and location you are in so that we may enhance the presentation of
          content on our sites.
        </li>
      </ul>

      <h2>3. Third Party Cookies</h2>
      <p>
        We may work with third-party companies, commonly known as service
        providers, who are authorized to place third-party cookies or similar
        technologies for storing information on our site or in our services,
        applications, and tools with our permission. These service providers
        help us to provide you with a better, faster, and safer experience.
      </p>
      <p>
        These service providers may use these technologies to help us deliver
        our own content and advertising and compile anonymous site metrics and
        analytics. We do not permit any of these service providers to collect
        any of your personal information on our sites or in our services,
        applications, or tools for their own purposes. These service providers
        are subject to confidentiality agreements with us and other legal
        restrictions on their use or collection of any personal information.
        Third party cookies are covered by the third-parties&apos; privacy
        policy.
      </p>
      <p>
        The Site uses Google Analytics, a web analytics service provided by
        Google, Inc. (&quot;Google&quot;). Google Analytics uses
        &quot;cookies&quot;, which are text files placed on your device, to help
        our Site analyse how users use the site.
      </p>

      <h3>Cookie Overview</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Duration</th>
            <th>Purpose</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>_dc_gtm_UA-*</td>
            <td>Third party (Google Tag Manager)</td>
            <td>10 minutes</td>
            <td>Site analytics - visitor identification</td>
          </tr>
          <tr>
            <td>_ga</td>
            <td>Third party (Google Analytics)</td>
            <td>2 years</td>
            <td>Site analytics - visitor identification</td>
          </tr>
          <tr>
            <td>_gat</td>
            <td>Third party (Google Analytics)</td>
            <td>1 minute</td>
            <td>Limiting request rate</td>
          </tr>
          <tr>
            <td>_gid</td>
            <td>Third party (Google Analytics)</td>
            <td>24 hours</td>
            <td>Site analytics - visitor identification</td>
          </tr>
          <tr>
            <td>cookie_consent</td>
            <td>First party</td>
            <td>1 week</td>
            <td>Recording user cookie consent</td>
          </tr>
        </tbody>
      </table>

      <h2>4. How to manage cookies</h2>
      <p>
        You can set your browser not to accept cookies. However, in a few cases,
        some of our website features may not function as a result.
      </p>
      <p>
        Most internet browsers are set to automatically accept cookies.
        Depending on your browser, you can set your browser to warn you before
        accepting cookies, or you can set it to refuse them. Please refer to the
        &apos;help&apos; button (or similar) on your browser to learn more about
        how you can do this.
      </p>
      <p>
        Disabling cookies may impact your experience on our Site. If you use
        different devices to access our Site, you will need to ensure that each
        browser of each device is set to your cookie preference.
      </p>

      <h2>5. Privacy policies of other websites</h2>
      <p>
        Our website may contain links to other websites. Our privacy policy
        applies only to our website, so if you click on a link to another
        website, you should read their privacy policy.
      </p>

      <h2>6. Changes to our privacy policy</h2>
      <p>
        We keep our privacy policy under regular review and place any updates on
        this website. This privacy policy was last updated on 26 April 2023.
      </p>

      <h2>How to contact us</h2>
      <p>
        If you have any questions about our privacy policy, the data we hold on
        you, or you would like to exercise one of your data protection rights,
        please do not hesitate to contact us.
      </p>
      <p>
        Email us at:{' '}
        <a href="mailto:support@junomoney.com">support@junomoney.com</a>
      </p>
      <p>
        Or write to us: Suite #229, 6030 88ST NW, Edmonton, Alberta, Canada,
        T6E6G4.
      </p>
    </LegalPageLayout>
  );
}
