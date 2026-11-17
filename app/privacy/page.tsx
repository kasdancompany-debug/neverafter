import type { Metadata } from "next";
import Link from "next/link";
import { LegalDoc } from "@/components/LegalDoc";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Never After collects, uses and protects personal information — and why we deliberately collect as little as possible.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <LegalDoc
      crumb="Privacy Policy"
      title="Privacy policy"
      sections={[{"id":"what","label":"What we collect"},{"id":"not-collected","label":"What we deliberately don't collect"},{"id":"use","label":"How we use information"},{"id":"consent","label":"Consent and unsubscribing"},{"id":"providers","label":"Service providers"},{"id":"rights","label":"Your choices and rights"},{"id":"analytics","label":"Cookies and analytics"},{"id":"contact","label":"Contact"}]}
      updated="November 17, 2026"
      intro={
        <p>
          People come to Never After during difficult moments. Our approach to privacy is simple: we collect as little
          personal information as possible, and we never ask for details about your family, children or court matters.
        </p>
      }
    >
      <h2 id="what">What we collect</h2>
      <ul>
        <li>
          <strong>Email address</strong> — if you subscribe to the newsletter or request the Starter Guide, along with a
          record of your consent.
        </li>
        <li>
          <strong>Contact form details</strong> — your name, email, the topic you select and your message, if you choose
          to contact us.
        </li>
        <li>
          <strong>Purchase information</strong> — when resource sales launch, payments will be processed by a third-party
          payment provider. We will not receive or store your full card details.
        </li>
        <li>
          <strong>Basic technical data</strong> — standard server logs (such as IP address and browser type) maintained by
          our hosting provider for security and reliability.
        </li>
      </ul>
      <h2 id="not-collected">What we deliberately don&apos;t collect</h2>
      <p>
        Our interactive tools — <em>Find Your Starting Point</em> and <em>Relevant or Not?</em> — run entirely in your
        browser. Your selections are not sent to us or stored. We do not ask for names or ages of children, allegations,
        court file numbers or other private family information, and we ask you not to send them.
      </p>
      <h2 id="use">How we use information</h2>
      <p>
        We use your information only to send what you asked for (such as the newsletter), respond to your message,
        deliver purchased resources, and keep the site secure. We do not sell personal information.
      </p>
      <h2 id="consent">Consent and unsubscribing</h2>
      <p>
        We send marketing or newsletter emails only with your express consent, consistent with Canada&apos;s anti-spam
        legislation. Every email includes an unsubscribe link, and you can withdraw consent at any time.
      </p>
      <h2 id="providers">Service providers</h2>
      <p>
        We may use trusted service providers for hosting, email delivery and payments. Some may store data outside
        Canada. Where that happens, information may be subject to the laws of those jurisdictions. A current list of
        providers will be published here before launch.
      </p>
      <h2 id="rights">Your choices and rights</h2>
      <p>
        You may request access to, or correction of, personal information we hold about you, and ask us to delete it
        where we are not required to keep it. Never After intends to handle personal information in accordance with
        applicable Canadian privacy law, including the <em>Personal Information Protection and Electronic Documents Act</em>{" "}
        (PIPEDA).
      </p>
      <h2 id="analytics">Cookies and analytics</h2>
      <p>
        This site does not currently use advertising cookies or third-party tracking. If we add privacy-respecting
        analytics in the future, we will update this policy first.
      </p>
      <h2 id="contact">Contact</h2>
      <p>
        Questions or requests about privacy can be sent through our <Link href="/contact">contact page</Link>. A named
        privacy contact will be designated before launch.
      </p>
    </LegalDoc>
  );
}
