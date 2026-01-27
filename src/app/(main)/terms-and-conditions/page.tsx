import type { Metadata } from 'next';
import Link from 'next/link';
import { LegalPageLayout } from '@/components/sections/legal-page-layout';

export const metadata: Metadata = {
  title: 'Terms and Conditions | Juno Bank',
  description:
    'Read the terms and conditions governing the use of Juno Money services.',
};

/**
 * Terms and Conditions page
 * Displays the full terms of service for Juno Money
 */
export default function TermsPage() {
  return (
    <LegalPageLayout
      title="Terms and Conditions"
      lastUpdated="September 2023 Version 1.20"
    >
      <p>
        Juno Money is a trading name of Juno Pay Ltd a private limited company
        incorporated in Alberta, Canada under company number 2024801421 and with
        its registered office at Suite #229, 6030 88ST NW, Edmonton, Alberta,
        Canada, T6E6G4. Juno is authorised by FINTRAC as a Money Service
        Business (MSB No. M23335654).
      </p>
      <p>
        <strong>IMPORTANT INFORMATION:</strong> These terms and conditions
        (&quot;Terms&quot;) govern the use of the Services (as defined below)
        provided by Juno (&quot;we&quot; or &quot;us&quot;) to any person whose
        application we approve (&quot;you&quot; or &quot;your&quot;).
      </p>
      <p>
        By activating your eWallet (as defined below) with us, you confirm that
        you have read, understood and agree to these Terms. We recommend that
        you print a copy of these terms for future reference.
      </p>
      <p>
        These Terms refer to the following additional terms, which also apply to
        your use of the Services:
      </p>
      <ol>
        <li>
          Our <Link href="/privacy-policy">Privacy Policy</Link> which sets out
          the terms on which we process your personal data.
        </li>
        <li>
          Our <Link href="/cookies">Cookie Policy</Link> which sets out
          information about the cookies used on our website.
        </li>
      </ol>
      <p>
        The value stored in your eWallet is E-Money only. Your eWallet is not a
        deposit account, which means that your funds will not be protected by
        the Canada Deposit Insurance Incorporation. However, we will hold funds
        received in exchange for E-Money in a designated safekeeping account
        with a regulated financial institution and will keep those funds
        separated from our own funds.
      </p>

      <h2>1. Definitions &amp; Interpretation</h2>
      <p>
        In these Terms, words and expressions have the following meanings,
        unless otherwise stated:
      </p>
      <ul>
        <li>
          <strong>&quot;App&quot;</strong> means the Juno Mobile Application and
          any other software offered by us.
        </li>
        <li>
          <strong>&quot;Available Balance&quot;</strong> means the amount of
          E-Money issued by Juno to you and held in your eWallet, which you have
          not yet spent or redeemed.
        </li>
        <li>
          <strong>&quot;Business Day&quot;</strong> means a day (other than a
          Saturday or Sunday or a public holiday) when commercial banks are open
          for ordinary banking business in England.
        </li>
        <li>
          <strong>&quot;E-Money&quot;</strong> means electronic money issued by
          Juno to you where each unit represents an equivalent value in the
          currency selected, for use by you in making Transactions.
        </li>
        <li>
          <strong>&quot;eWallet&quot;</strong> means a digital E-Money account
          on our systems that is specific to you, denominated in an available
          currency of your choice.
        </li>
        <li>
          <strong>&quot;Services&quot;</strong> has the meaning given to it in
          Clause 4.
        </li>
        <li>
          <strong>&quot;Transactions&quot;</strong> means either or both an
          Outbound Transaction and an Inbound Transaction.
        </li>
        <li>
          <strong>&quot;Website&quot;</strong> means junomoney.com.
        </li>
      </ul>

      <h2>2. Changes to these Terms</h2>
      <p>
        We may update or amend these Terms from time to time by giving you two
        (2) months&apos; prior notice before the date on which the updates or
        amendments are to take effect. Reasons why we may change these Terms may
        include:
      </p>
      <ul>
        <li>Changes to the services we provide</li>
        <li>Changes in market conditions or operating costs</li>
        <li>Changes in technology or payment methods</li>
        <li>Changes in Applicable Laws</li>
        <li>To make them clearer or more favourable to you</li>
      </ul>

      <h2>3. Registration and Eligibility</h2>
      <p>
        You may register for a Juno eWallet via the App or other means that we
        may in the future prescribe. If you choose to register for an eWallet,
        you agree to provide us with true, accurate, current and complete
        information about yourself.
      </p>
      <p>
        In order to enter these Terms and receive the Services, you warrant that
        you are legally deemed as having full capacity, are a resident in a
        jurisdiction where Juno provides services and you are at least 18 years
        of age.
      </p>
      <p>
        Your eWallet will not be activated unless we have been provided with the
        required information so that we may identify you and comply with all
        applicable know-your-customer (&quot;KYC&quot;) requirements.
      </p>

      <h2>4. Services</h2>
      <p>
        We will provide the following services to you (collectively, the
        &quot;Services&quot;):
      </p>
      <ul>
        <li>
          Hosting a digital account (eWallet) enabling you to store E-Money
        </li>
        <li>
          Exchanging funds received from you by us for E-Money and exchanging
          E-Money for funds to be paid to you
        </li>
        <li>
          Exchange E-Money contained in your eWallet from one currency to
          another available currency
        </li>
        <li>Managing Transactions in your eWallet</li>
        <li>
          Certain payment services enabling you to send and receive E-Money
        </li>
      </ul>
      <p>
        Your eligibility to access certain Services may depend on the country in
        which you reside. You shall not attempt to access or make use of the
        Services from or in any jurisdiction where such access or use is
        prohibited by Applicable Laws.
      </p>

      <h2>5. Access to your Juno eWallet</h2>
      <p>
        You may access your eWallet by logging into the App or on the Website.
        From here, you will be able to see your eWallet history and Transaction
        activity, and view your personal details.
      </p>
      <p>
        A notification will be sent to your mobile device or by email each time
        an Inbound or Outbound Transaction is made in your eWallet.
      </p>

      <h2>6. Loading your Juno eWallet</h2>
      <p>
        Following activation of your eWallet, you will be able to send funds to
        us, and as an E-Money issuer, we will credit your eWallet with an
        equivalent amount in E-Money once we receive your funds.
      </p>
      <p>
        E-Money will be available on your eWallet after we receive the funds
        which could take several days depending on the method and currency used
        to load your eWallet.
      </p>
      <p>
        You must not load your eWallet through a payment card or other payment
        instrument if you are not the named holder of that payment instrument.
      </p>

      <h2>7. Making Outbound Transactions</h2>
      <p>
        An Outbound Transaction will be regarded as authorised when you (either
        directly or via Payment Initiation Service Provider):
      </p>
      <ul>
        <li>
          Enter a password or other Security Credentials we have issued to you
          on the App or the Website
        </li>
        <li>
          Use your fingerprint scanner or facial recognition on your mobile
          device
        </li>
      </ul>
      <p>
        You cannot change or cancel your instruction for an Outbound Transaction
        after it has been received by us.
      </p>

      <h2>8. Currency Exchange</h2>
      <p>
        When you request a Currency Exchange, we will use a variable exchange
        spot rate which is linked to foreign exchange markets. You accept that
        such conversion shall be entirely at your own cost and risk including as
        a result of any fluctuation or difference between the indicative rate of
        exchange displayed.
      </p>
      <p>
        The eWallet must not be used to trade in foreign currencies for
        speculative purposes.
      </p>

      <h2>9. Fees</h2>
      <p>
        In order to open your eWallet and use the Services, you agree that we
        may charge you the Fees that shall be set out in the Fees schedule, and
        any Fees and other amounts due will be deducted from your eWallet
        without notice.
      </p>
      <p>
        You acknowledge that it is your responsibility to check the Fees before
        making a Transaction, a Currency Exchange or using any Services.
      </p>

      <h2>10. Security of your Juno eWallet</h2>
      <p>
        You are responsible for the use of your eWallet, for ensuring that use
        of the Services or access to your eWallet complies fully with these
        Terms and for keeping your Security Credentials safe and secure.
      </p>
      <p>You must not:</p>
      <ul>
        <li>Disclose your Security Credentials to anyone</li>
        <li>
          Allow any other person to use the eWallet and/or any devices used to
          access your eWallet
        </li>
      </ul>
      <p>
        If your Security Credentials or other eWallet details are lost, stolen
        or compromised, you must contact us immediately. We will take reasonable
        steps to stop any unauthorised use of your eWallet.
      </p>

      <h2>11. Liability for Unauthorised or Incorrect Transactions</h2>
      <p>
        You may be entitled to a refund of unauthorised or incorrectly executed
        Transactions provided that you have notified us without undue delay and
        in any case within 13 months from when it was debited to your eWallet.
      </p>

      <h2>12. Proprietary Rights</h2>
      <p>
        All rights, title and interest in, and to, the Intellectual Property
        Rights subsisting in the App, Website and the Services is retained by us
        and protected under applicable Intellectual Property Rights.
      </p>

      <h2>13. Third Party Access</h2>
      <p>
        You may instruct a TPP (Third Party Provider) to access information on
        your eWallet or to initiate certain payments from your eWallet provided
        such TPP is authorised by the appropriate regulator in their
        jurisdiction.
      </p>

      <h2>14. Right to Cancel</h2>
      <p>
        You have the right to cancel your eWallet and these Terms for any reason
        within a &apos;cooling-off&apos; period of fourteen (14) days from the
        date on which your eWallet is registered. We will then cancel your
        eWallet and reimburse your Available Balance within fourteen (14)
        Business Days.
      </p>

      <h2>15. Termination and Suspension</h2>
      <p>
        You can terminate your eWallet and these Terms at any time by informing
        us through the App or by contacting us.
      </p>
      <p>
        We may terminate or suspend your eWallet, your use of the Services
        and/or terminate these Terms immediately in the event that:
      </p>
      <ul>
        <li>You have used the Services in breach of any of these Terms</li>
        <li>
          We reasonably believe you are involved in fraudulent activity, money
          laundering, terrorism financing, or other criminal activity
        </li>
        <li>We are unable to verify your identity</li>
        <li>We are required to do so by Applicable Laws</li>
      </ul>

      <h2>16. Redemption</h2>
      <p>
        You are able to redeem, either in part or in full, the monetary value of
        the Available Balance on your eWallet, at any time, at par value, by
        providing instructions to us.
      </p>
      <p>
        You must be the named account holder of the account to which you
        instruct us to transfer the funds.
      </p>

      <h2>17. Liability</h2>
      <p>Nothing in these Terms shall limit or exclude our liability:</p>
      <ul>
        <li>For fraud or fraudulent misrepresentation</li>
        <li>For death or personal injury caused by our negligence</li>
        <li>
          Where such limitation or exclusion would be contrary to Applicable
          Laws
        </li>
      </ul>
      <p>
        The Services are provided on an &quot;as is&quot; and &quot;as
        available&quot; basis.
      </p>

      <h2>18. Force Majeure</h2>
      <p>
        We shall not be liable for any default, or be deemed to be in breach of
        these Terms where the default or breach is due to abnormal or
        unforeseeable circumstances beyond our control.
      </p>

      <h2>19. Contact Details</h2>
      <p>
        If you have any questions or concerns about the Services, please contact
        us through the &apos;chat&apos; communication tool within your mobile
        App.
      </p>
      <p>
        You can also contact us by email at{' '}
        <a href="mailto:support@junomoney.com">support@junomoney.com</a>
      </p>
      <p>
        Alternatively, you can write to us at our registered address: Suite
        #229, 6030 88ST NW, Edmonton, Alberta, Canada, T6E6G4.
      </p>

      <h2>20. Complaints</h2>
      <p>
        If you wish to make a complaint about the Services, you can email us at{' '}
        <a href="mailto:support@junomoney.com">support@junomoney.com</a>.
      </p>
      <p>
        We will provide you a full response to your complaint by email within
        fifteen (15) Business Days after the date we receive your complaint.
      </p>

      <h2>21. Governing Law</h2>
      <p>
        These Terms, and any dispute or claim arising out of or in connection
        with these Terms, are governed by and shall be construed in accordance
        with the provincial laws of Alberta.
      </p>

      <h2>22. Jurisdiction</h2>
      <p>
        Each party irrevocably agrees that the provincial courts of Alberta
        shall have exclusive jurisdiction to settle any dispute or claim arising
        out of or in connection with these Terms.
      </p>
    </LegalPageLayout>
  );
}
