import type { ReactNode } from "react";
import { Breadcrumbs, type Crumb } from "./Breadcrumbs";

export function PageHeader({
  crumbs,
  label,
  title,
  intro,
  children,
  aside,
}: {
  crumbs: Crumb[];
  label?: string;
  title: ReactNode;
  intro?: ReactNode;
  children?: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <section className="border-b border-line">
      <div className="container-x pb-12 pt-8 sm:pb-16">
        <Breadcrumbs items={crumbs} />
        <div className={`mt-10 grid gap-10 ${aside ? "lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end lg:gap-16" : ""}`}>
          <div className="max-w-3xl">
            {label && <p className="label">{label}</p>}
            <h1 className="h-display mt-3">{title}</h1>
            {intro && <div className="lede mt-5 max-w-2xl">{intro}</div>}
            {children}
          </div>
          {aside}
        </div>
      </div>
    </section>
  );
}
