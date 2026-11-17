import { SignupForm } from "./SignupForm";

export function NewsletterBand({ id = "newsletter" }: { id?: string }) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className="scroll-mt-20 border-t border-line bg-ivory">
      <div className="container-x grid gap-10 py-16 sm:py-20 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-20">
        <div>
          <h2 id={`${id}-heading`} className="hd-1">
            The Never After Brief
          </h2>
          <p className="mt-3 text-[1.1rem] text-navy">Clear explanations. Useful resources. Less noise.</p>
          <p className="mt-1 text-[0.95rem] text-muted">Weekly educational insights about separation, parenting and Ontario family law.</p>
        </div>
        <SignupForm list="newsletter" cta="Subscribe" />
      </div>
    </section>
  );
}
