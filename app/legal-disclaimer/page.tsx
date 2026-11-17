import type { Metadata } from "next";
import Link from "next/link";
import { LegalDoc } from "@/components/LegalDoc";
import { officialSources, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Legal Disclaimer",
  description: "Never After provides general legal information and educational resources. It is not a law firm and does not provide legal advice.",
  alternates: { canonical: "/legal-disclaimer" },
};

export default function DisclaimerPage() {
  return (
    <LegalDoc
      crumb="Legal Disclaimer"
      title="Legal disclaimer"
      sections={[{"id":"information","label":"General legal information"},{"id":"no-relationship","label":"No lawyer–client relationship"},{"id":"no-outcomes","label":"No predictions or guarantees"},{"id":"jurisdiction","label":"Jurisdiction and currency"},{"id":"get-advice","label":"Getting advice"},{"id":"emergencies","label":"Emergencies"}]}
      updated="November 17, 2026"
      intro={<p>{site.disclaimer}</p>}
    >
      <h2 id="information">General legal information</h2>
      <p>
        Everything published by Never After — including articles, topic guides, interactive tools such as{" "}
        <em>Find Your Starting Point</em> and <em>Relevant or Not?</em>, newsletters and downloadable resources — is
        general legal information for educational purposes. It is not legal advice and should not be relied on as a
        substitute for advice from a lawyer licensed in your jurisdiction.
      </p>
      <h2 id="no-relationship">No lawyer–client relationship</h2>
      <p>
        Using this website, subscribing to our newsletter, purchasing a resource or contacting us does not create a
        lawyer–client relationship. Never After is not a law firm, does not employ lawyers to act for the public, and does
        not provide legal representation.
      </p>
      <h2 id="no-outcomes">No predictions or guarantees</h2>
      <p>
        Family law is highly fact-specific. Our content describes how the law and court processes generally work. It does
        not predict the outcome of any case, recommend a litigation strategy, or tell anyone what they should do in their
        circumstances. Our interactive tools are educational and do not assess individual situations.
      </p>
      <h2 id="jurisdiction">Jurisdiction and currency</h2>
      <p>
        Our content focuses on Ontario, Canada, and on federal Canadian law where relevant. Laws, regulations, court rules
        and practices change. While we review content regularly and show review dates, we cannot guarantee that every
        page reflects the most current law at the moment you read it. Always check official sources, such as{" "}
        <a href={officialSources.eLaws.url} target="_blank" rel="noopener noreferrer">
          Ontario e-Laws
        </a>{" "}
        and the{" "}
        <a href={officialSources.divorceAct.url} target="_blank" rel="noopener noreferrer">
          Justice Laws Website
        </a>
        .
      </p>
      <h2 id="get-advice">Getting advice</h2>
      <p>
        For advice about your situation, consult a lawyer licensed by the Law Society of Ontario. The Law Society provides
        information about{" "}
        <a href={officialSources.lso.url} target="_blank" rel="noopener noreferrer">
          finding a lawyer or paralegal
        </a>
        , and{" "}
        <a href={officialSources.legalAid.url} target="_blank" rel="noopener noreferrer">
          Legal Aid Ontario
        </a>{" "}
        may be able to help if you are eligible.
      </p>
      <h2 id="emergencies">Emergencies</h2>
      <p>
        If you or a child are in immediate danger, call 911. Never After cannot respond to urgent or safety-related
        matters.
      </p>
      <p>
        Questions about this disclaimer? <Link href="/contact">Contact us</Link>.
      </p>
    </LegalDoc>
  );
}
