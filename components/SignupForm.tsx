"use client";

import { useId, useState, type FormEvent } from "react";
import { Check, Info, Loader2 } from "lucide-react";

type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "error"; message: string }
  | { kind: "demo"; message: string }
  | { kind: "success"; message: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Email signup used for both the newsletter and the Starter Guide.
 * Collects only an email address and consent — never details about a family situation.
 * Posts to /api/subscribe, which reports `demo: true` until an email provider is configured.
 */
export function SignupForm({ list, cta = "Subscribe" }: { list: "newsletter" | "starter-guide"; cta?: string }) {
  const id = useId();
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  const emailError = !email.trim()
    ? "Enter your email address."
    : !EMAIL_RE.test(email.trim())
      ? "Enter a valid email address, like name@example.com."
      : null;
  const consentError = consent ? null : "Please confirm you'd like to receive these emails.";
  const showEmailErr = submitted && emailError;
  const showConsentErr = submitted && consentError;

  const consentText =
    list === "newsletter"
      ? "Send me The Never After Brief. I can unsubscribe at any time."
      : "Send me the Starter Guide and occasional related emails. I can unsubscribe at any time.";

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    if (emailError || consentError) return;
    setStatus({ kind: "submitting" });
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), list, consent, consentText }),
      });
      const data = (await res.json().catch(() => ({}))) as { message?: string; demo?: boolean };
      if (data.demo) setStatus({ kind: "demo", message: data.message ?? "Demo mode." });
      else if (res.ok) {
        setStatus({ kind: "success", message: data.message ?? "Check your inbox to confirm." });
        setEmail("");
        setConsent(false);
        setSubmitted(false);
      } else setStatus({ kind: "error", message: data.message ?? "Something went wrong. Please try again." });
    } catch {
      setStatus({ kind: "error", message: "We couldn't reach the server. Check your connection and try again." });
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate className="w-full">
      <label htmlFor={`${id}-email`} className="text-[0.85rem] font-semibold text-navy">
        Email address
      </label>
      <div className="mt-1.5 flex flex-col gap-2 sm:flex-row">
        <input
          id={`${id}-email`}
          type="email"
          name="email"
          autoComplete="email"
          inputMode="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-invalid={Boolean(showEmailErr)}
          aria-describedby={`${showEmailErr ? `${id}-email-err ` : ""}${id}-privacy`}
          className="field sm:flex-1"
        />
        <button type="submit" disabled={status.kind === "submitting"} className="btn-primary disabled:opacity-60">
          {status.kind === "submitting" && <Loader2 className="h-4 w-4 animate-spin" aria-hidden />}
          {cta}
        </button>
      </div>
      {showEmailErr && (
        <p id={`${id}-email-err`} className="mt-1.5 text-[0.85rem] text-[#9b3b2a]">
          {emailError}
        </p>
      )}

      <div className="mt-3 flex items-start gap-2.5">
        <input
          id={`${id}-consent`}
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          aria-invalid={Boolean(showConsentErr)}
          aria-describedby={showConsentErr ? `${id}-consent-err` : undefined}
          className="mt-[3px] h-4 w-4 shrink-0 accent-[#182B30]"
        />
        <label htmlFor={`${id}-consent`} className="text-[0.85rem] leading-relaxed text-charcoal/80">
          {consentText}
        </label>
      </div>
      {showConsentErr && (
        <p id={`${id}-consent-err`} className="mt-1 pl-[26px] text-[0.85rem] text-[#9b3b2a]">
          {consentError}
        </p>
      )}

      <p id={`${id}-privacy`} className="mt-3 text-[0.78rem] leading-relaxed text-muted">
        We only ask for your email. Please don&apos;t send details about your family or court matters.{" "}
        <a href="/privacy" className="underline underline-offset-2 hover:text-navy">
          Privacy policy
        </a>
      </p>

      <div aria-live="polite">
        {status.kind === "demo" && (
          <p className="anim-fade-up mt-4 flex gap-2.5 border-l-2 border-champagne bg-paper px-4 py-3 text-[0.88rem] leading-relaxed">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-champagne-ink" aria-hidden />
            <span>
              <strong className="font-semibold text-navy">Demo mode — not subscribed.</strong> {status.message}
            </span>
          </p>
        )}
        {status.kind === "success" && (
          <p className="anim-fade-up mt-4 flex gap-2.5 border-l-2 border-sage-ink px-4 py-3 text-[0.88rem]">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-sage-ink" aria-hidden /> {status.message}
          </p>
        )}
        {status.kind === "error" && <p className="mt-3 text-[0.85rem] text-[#9b3b2a]">{status.message}</p>}
      </div>
    </form>
  );
}
