"use client";

import { useState } from "react";
import { Info, Loader2 } from "lucide-react";
import { formatCad } from "@/lib/products";

/**
 * Starts a Stripe Checkout session via /api/checkout.
 * The API refuses (and this explains why) while Stripe isn't configured or the product isn't released —
 * no purchase is ever simulated.
 */
export function CheckoutButton({ slug, price, title }: { slug: string; price: number; title: string }) {
  const [state, setState] = useState<{ kind: "idle" | "loading" } | { kind: "notice"; message: string }>({ kind: "idle" });

  async function start() {
    setState({ kind: "loading" });
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug }),
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
      <button type="button" onClick={start} disabled={state.kind === "loading"} className="btn-primary w-full sm:w-auto disabled:opacity-60">
        {state.kind === "loading" && <Loader2 className="h-4 w-4 animate-spin" aria-hidden />}
        Buy — {formatCad(price)} CAD
      </button>
      <p className="mt-2 text-[0.78rem] text-muted">Secure checkout by Stripe. Taxes calculated at checkout.</p>
      <div aria-live="polite">
        {state.kind === "notice" && (
          <p className="anim-fade-up mt-4 flex gap-2.5 border-l-2 border-champagne bg-ivory px-4 py-3 text-[0.88rem] leading-relaxed">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-champagne-ink" aria-hidden />
            <span>
              <strong className="font-semibold text-navy">No purchase was made.</strong> {state.message}{" "}
              <a href="#newsletter" className="underline underline-offset-2">
                Get notified
              </a>{" "}
              when {title} is released.
            </span>
          </p>
        )}
      </div>
    </div>
  );
}
