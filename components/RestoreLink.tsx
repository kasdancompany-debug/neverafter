"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

export function RestoreLink({ url }: { url: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="mt-4 flex gap-2">
      <input readOnly value={url} onFocus={(e) => e.currentTarget.select()} aria-label="Private restore link" className="field font-mono !text-[0.78rem]" />
      <button
        type="button"
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 1800);
          } catch {
            /* select-and-copy still works */
          }
        }}
        className="btn-secondary shrink-0"
      >
        {copied ? <Check className="h-4 w-4" aria-hidden /> : <Copy className="h-4 w-4" aria-hidden />}
        {copied ? "Copied" : "Copy"}
      </button>
    </div>
  );
}
