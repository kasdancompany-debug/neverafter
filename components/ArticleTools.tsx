"use client";

import { useEffect, useState } from "react";
import { Check, Link2, Printer, Share2 } from "lucide-react";

/** Copy link, native share (where supported) and print — the small things readers actually use. */
export function ArticleTools({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);
  const [canShare, setCanShare] = useState(false);
  useEffect(() => setCanShare(typeof navigator.share === "function"), []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(location.href.split("#")[0]);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable */
    }
  }

  const btn = "inline-flex items-center gap-1.5 rounded-[3px] px-2 py-1 text-[0.82rem] text-muted transition-colors hover:bg-ivory hover:text-navy";
  return (
    <div className="no-print flex items-center gap-1">
      <button type="button" onClick={copy} className={btn}>
        {copied ? <Check className="h-3.5 w-3.5" aria-hidden /> : <Link2 className="h-3.5 w-3.5" aria-hidden />}
        <span aria-live="polite">{copied ? "Copied" : "Copy link"}</span>
      </button>
      {canShare && (
        <button type="button" onClick={() => navigator.share({ title, url: location.href }).catch(() => {})} className={btn}>
          <Share2 className="h-3.5 w-3.5" aria-hidden /> Share
        </button>
      )}
      <button type="button" onClick={() => window.print()} className={btn}>
        <Printer className="h-3.5 w-3.5" aria-hidden /> Print
      </button>
    </div>
  );
}
