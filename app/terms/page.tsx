import type { Metadata } from "next";
import Link from "next/link";
import { LegalDoc } from "@/components/LegalDoc";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "The terms that apply to using the Never After website, tools and educational resources.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <LegalDoc
      crumb="Terms of Use"
      title="Terms of use"
      sections={[{"id":"purpose","label":"Educational purpose"},{"id":"use","label":"Acceptable use"},{"id":"ip","label":"Intellectual property"},{"id":"purchases","label":"Purchases, subscriptions and refunds"},{"id":"links","label":"External links"},{"id":"liability","label":"Limitation of liability"},{"id":"law","label":"Governing law"},{"id":"changes","label":"Changes"}]}
      updated="November 17, 2026"
      intro={<p>By using the Never After website, you agree to these terms. Please read them alongside our Legal Disclaimer and Privacy Policy.</p>}
    >
      <h2 id="purpose">1. Educational purpose</h2>
      <p>
        Never After publishes general legal information and educational resources. Nothing on this site is legal advice.
        Please read our <Link href="/legal-disclaimer">Legal Disclaimer</Link>.
      </p>
      <h2 id="use">2. Acceptable use</h2>
      <ul>
        <li>Use the site lawfully and respectfully.</li>
        <li>Do not attempt to disrupt, scrape at scale, or compromise the security of the site.</li>
        <li>Do not submit other people&apos;s personal information or private details about children through our forms.</li>
      </ul>
      <h2 id="ip">3. Intellectual property</h2>
      <p>
        Content, design, and branding on this site belong to Never After or its licensors. You may share links and short
        quotations with attribution. Purchased resources are licensed for personal, non-commercial use.
      </p>
      <h2 id="purchases">4. Purchases, subscriptions and refunds</h2>
      <p>
        Prices are shown in Canadian dollars. Payments are processed by Stripe; we do not receive or store card details.
        Parenting Plan Studio is a one-time purchase that unlocks export features in the browser where it was purchased,
        and on other devices through your private restore link. Never After Plus renews automatically each month or year
        until cancelled; you keep access until the end of the paid period. Guides still in development cannot be
        purchased.
      </p>
      <p>
        If something isn&apos;t right, contact us within 14 days of purchase and we will make it right, including a
        refund where appropriate. Nothing in these terms limits rights you have under Ontario consumer protection law.
      </p>
      <p>
        Parenting Plan Studio is an educational organizing tool. It does not draft legal documents, give legal advice, or
        create a binding agreement. Have any plan reviewed by a lawyer licensed in Ontario before relying on it.
      </p>
      <h2 id="links">5. External links</h2>
      <p>
        We link to government, court and other official resources. We are not responsible for the content or availability
        of external websites.
      </p>
      <h2 id="liability">6. Limitation of liability</h2>
      <p>
        To the extent permitted by law, Never After is not liable for any loss arising from reliance on information on
        this site. Always seek advice from a licensed lawyer about your circumstances.
      </p>
      <h2 id="law">7. Governing law</h2>
      <p>These terms are governed by the laws of the Province of Ontario and the federal laws of Canada applicable there.</p>
      <h2 id="changes">8. Changes</h2>
      <p>We may update these terms. The date at the top of this page shows when they were last changed.</p>
    </LegalDoc>
  );
}
