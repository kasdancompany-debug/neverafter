import { Download } from "lucide-react";

export const STARTER_GUIDE = {
  href: "/guides/ontario-separation-starter-guide.pdf",
  pages: 16,
  size: "870 KB",
};

/** Direct download of the free Starter Guide (no email required). */
export function GuideDownload({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      <a href={STARTER_GUIDE.href} download className="btn-primary">
        <Download className="h-4 w-4" aria-hidden /> Download the free guide
      </a>
      <p className="mt-2 text-[0.78rem] text-muted">
        PDF · {STARTER_GUIDE.pages} pages · {STARTER_GUIDE.size} · No email required
      </p>
    </div>
  );
}
