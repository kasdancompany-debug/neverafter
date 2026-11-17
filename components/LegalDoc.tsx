import type { ReactNode } from "react";
import { PageHeader } from "./PageHeader";
import { DraftNotice } from "./LegalNote";
import { OnThisPage } from "./OnThisPage";

export function LegalDoc({
  title,
  crumb,
  intro,
  updated,
  sections,
  children,
}: {
  title: string;
  crumb: string;
  intro: ReactNode;
  updated: string;
  sections: { id: string; label: string }[];
  children: ReactNode;
}) {
  return (
    <>
      <PageHeader crumbs={[{ label: crumb }]} title={title} intro={intro}>
        <p className="mt-5 text-[0.82rem] text-muted">Last updated {updated}</p>
      </PageHeader>
      <div className="container-x grid gap-12 py-12 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16">
        <aside className="hidden lg:sticky lg:top-24 lg:block lg:self-start">
          <OnThisPage items={sections} />
        </aside>
        <div className="max-w-[700px]">
          <DraftNotice>
            This document is a working draft and must be reviewed by qualified Ontario counsel before Never After operates
            commercially.
          </DraftNotice>
          <div className="prose-na mt-4 [&_h2]:scroll-mt-24">{children}</div>
        </div>
      </div>
    </>
  );
}
