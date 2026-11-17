"use client";

import { useState } from "react";
import { Info, Loader2, Lock } from "lucide-react";

/**
 * Sends the buyer to Stripe-hosted Checkout via /api/checkout.
 * If payments aren't configured or the item isn't released, it explains why — no purchase is ever simulated.
 */
export function CheckoutButton({
  item,
  label,
  title,
  variant = "primary",
  configured = true,
  full = false,
}: {
  item: string;
  label: string;
  title: string;
  variant?: "primary" | "secondary";
  configured?: boolean;
  full?: boolean;
}) {
  const [state, setState] = useState<{ kind: "idle" | "loading" } | { kind: "notice"; message: string }>({ kind: "idle" });

  async function start() {
    setState({ kind: "loading" });
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ item }),
      });
      const data = (await res.json().catch(() => ({}))) as { url?: string; message?: string };
      if (res.ok && data.url) {
        window.location.assign(data.url);
        return;
      }
      setState({ kind: "notice", message: data.message ?? "Checkout is unavailable right now." });
    } catch {
      setState({ kind: "notice", message: "We couldn't reach the checkout service. Please try again later." });
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={start}
        disabled={state.kind === "loading"}
        className={`${variant === "primary" ? "btn-primary" : "btn-secondary"} ${full ? "w-full" : "w-full sm:w-auto"} disabled:opacity-60`}
      >
        {state.kind === "loading" ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : <Lock className="h-3.5 w-3.5" aria-hidden />}
        {label}
      </button>
      <p className="mt-2 text-[0.75rem] text-muted">
        {configured ? "Secure card payment by Stripe. We never see your card details." : "Payments are not connected yet on this site."}
      </p>
      <div aria-live="polite">
        {state.kind === "notice" && (
          <p className="anim-fade-up mt-3 flex gap-2.5 border-l-2 border-champagne bg-ivory px-3.5 py-3 text-[0.85rem] leading-relaxed">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-champagne-ink" aria-hidden />
            <span>
              <strong className="font-semibold text-navy">No payment was taken.</strong> {state.message}{" "}
              {!/configured|connected/.test(state.message) && <>Want to know when {title} is available? </>}
              <a href="#newsletter" className="underline underline-offset-2">
                Get updates
              </a>
              .
            </span>
          </p>
        )}
      </div>
    </div>
  );
}
