"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2 } from "lucide-react";

export function AccessActions({ hasBilling, hasSubscription }: { hasBilling: boolean; hasSubscription: boolean }) {
  const router = useRouter();
  const [busy, setBusy] = useState<string | null>(null);
  const [msg, setMsg] = useState<string | null>(null);

  async function run(kind: "portal" | "refresh" | "forget") {
    setBusy(kind);
    setMsg(null);
    try {
      if (kind === "forget" && !confirm("Remove access from this browser? You can restore it later with your private link.")) return;
      const res = await fetch(kind === "portal" ? "/api/billing/portal" : `/api/access/${kind}`, { method: "POST" });
      const data = (await res.json().catch(() => ({}))) as { url?: string; message?: string; active?: boolean };
      if (kind === "portal" && data.url) return window.location.assign(data.url);
      if (kind === "refresh") setMsg(data.active ? "Subscription is active — access updated." : data.message ?? "No active subscription found.");
      else if (!res.ok) setMsg(data.message ?? "Something went wrong.");
      router.refresh();
    } finally {
      setBusy(null);
    }
  }

  const spin = (k: string) => busy === k && <Loader2 className="h-4 w-4 animate-spin" aria-hidden />;
  return (
    <div className="mt-6">
      <div className="flex flex-wrap gap-2">
        {hasBilling && (
          <button type="button" onClick={() => run("portal")} className="btn-primary" disabled={!!busy}>
            {spin("portal")} Manage billing
          </button>
        )}
        {hasSubscription && (
          <button type="button" onClick={() => run("refresh")} className="btn-secondary" disabled={!!busy}>
            {spin("refresh")} Check subscription
          </button>
        )}
        <button type="button" onClick={() => run("forget")} className="btn-secondary" disabled={!!busy}>
          {spin("forget")} Remove from this browser
        </button>
      </div>
      <p aria-live="polite" className="mt-3 text-[0.85rem] text-muted">
        {msg}
      </p>
      {hasBilling && <p className="text-[0.78rem] text-muted">Billing opens Stripe&apos;s secure portal: update your card, download invoices or cancel Plus.</p>}
    </div>
  );
}
