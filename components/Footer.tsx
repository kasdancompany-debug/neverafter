import Link from "next/link";
import { footerNav, officialSources, site } from "@/lib/site";
import { Logo } from "./Logo";

export function Footer() {
  const official = [officialSources.ontarioFamilyLaw, officialSources.eLaws, officialSources.dojFamilyLaw];
  return (
    <footer className="on-dark bg-navy text-paper">
      <div className="container-x pb-10 pt-16">
        <div className="grid gap-12 lg:grid-cols-[1fr_2fr]">
          <div>
            <Logo tone="light" height={64} />
            <p className="mt-5 max-w-xs font-serif text-[1.35rem] leading-snug text-paper/90">
              The fairytale ends. Life doesn&apos;t.
            </p>
            <p className="mt-3 max-w-xs text-sm text-paper/55">Divorce, separation and family law, explained. Ontario first.</p>
          </div>
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            {footerNav.map((col) => (
              <div key={col.heading}>
                <h2 className="text-[0.75rem] font-semibold uppercase tracking-[0.08em] text-paper/50">{col.heading}</h2>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="text-[0.9rem] text-paper/80 hover:text-paper hover:underline hover:underline-offset-4">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 grid gap-8 border-t border-paper/15 pt-8 lg:grid-cols-[2fr_1fr]">
          <p className="max-w-2xl text-[0.9rem] leading-relaxed text-paper/75">
            <span className="text-paper">{site.disclaimer}</span> Using this website does not create a lawyer–client
            relationship. For advice about your situation, consult a lawyer licensed in Ontario. If you or a child are in
            immediate danger, call 911.
          </p>
          <ul className="space-y-1.5 text-[0.85rem]">
            {official.map((s) => (
              <li key={s.url}>
                <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-paper/70 hover:text-paper hover:underline hover:underline-offset-4">
                  {s.label} <span className="text-paper/45">— {s.publisher}</span>
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-10 text-xs text-paper/45">© {new Date().getFullYear()} Never After. Educational media, made in Canada.</p>
      </div>
    </footer>
  );
}
