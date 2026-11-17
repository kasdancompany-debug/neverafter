"use client";

import { useEffect, useState, type FormEvent } from "react";
import { AlertCircle, Info, Loader2, Send } from "lucide-react";

type Fields = { name: string; email: string; topic: string; message: string };
type Errors = Partial<Record<keyof Fields, string>>;

const topics = [
  "General question about the site",
  "Report an error or suggest a correction",
  "Media or partnership enquiry",
  "Resource or newsletter question",
];

function validate(f: Fields): Errors {
  const e: Errors = {};
  if (!f.name.trim()) e.name = "Please enter your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.trim())) e.email = "Please enter a valid email address.";
  if (!topics.includes(f.topic)) e.topic = "Please choose a topic.";
  if (f.message.trim().length < 10) e.message = "Please write a short message (at least 10 characters).";
  if (f.message.length > 2000) e.message = "Please keep your message under 2,000 characters.";
  return e;
}

export function ContactForm() {
  const [fields, setFields] = useState<Fields>({ name: "", email: "", topic: "", message: "" });

  // Allow links like /contact?topic=partnership to preselect the topic.
  useEffect(() => {
    const t = new URLSearchParams(location.search).get("topic");
    const map: Record<string, string> = { partnership: topics[2], correction: topics[1], resources: topics[3] };
    if (t && map[t]) setFields((f) => ({ ...f, topic: map[t] }));
  }, []);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<
    { kind: "idle" | "submitting" } | { kind: "demo" | "success" | "error"; message: string }
  >({ kind: "idle" });

  const set = (k: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setFields((f) => ({ ...f, [k]: e.target.value }));

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const errs = validate(fields);
    setErrors(errs);
    if (Object.keys(errs).length) {
      const first = Object.keys(errs)[0];
      (e.currentTarget.elements.namedItem(first) as HTMLElement | null)?.focus();
      return;
    }
    setStatus({ kind: "submitting" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      });
      const data = (await res.json().catch(() => ({}))) as { message?: string; demo?: boolean };
      if (data.demo) setStatus({ kind: "demo", message: data.message ?? "" });
      else if (res.ok) {
        setStatus({ kind: "success", message: data.message ?? "Thank you — your message was sent." });
        setFields({ name: "", email: "", topic: "", message: "" });
      } else setStatus({ kind: "error", message: data.message ?? "Something went wrong. Please try again." });
    } catch {
      setStatus({ kind: "error", message: "We couldn't reach the server. Please try again." });
    }
  }

  const input = "field mt-1.5";
  const Err = ({ k }: { k: keyof Fields }) =>
    errors[k] ? (
      <p id={`${k}-err`} className="mt-1.5 flex items-center gap-1.5 text-sm text-[#9b3b2a]">
        <AlertCircle className="h-3.5 w-3.5" aria-hidden /> {errors[k]}
      </p>
    ) : null;

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="text-[0.85rem] font-semibold text-navy">
            Name
          </label>
          <input id="name" name="name" autoComplete="name" value={fields.name} onChange={set("name")} aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-err" : undefined} className={`${input}`} />
          <Err k="name" />
        </div>
        <div>
          <label htmlFor="email" className="text-[0.85rem] font-semibold text-navy">
            Email
          </label>
          <input id="email" name="email" type="email" autoComplete="email" value={fields.email} onChange={set("email")} aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-err" : undefined} className={`${input}`} />
          <Err k="email" />
        </div>
      </div>
      <div>
        <label htmlFor="topic" className="text-[0.85rem] font-semibold text-navy">
          What is this about?
        </label>
        <select id="topic" name="topic" value={fields.topic} onChange={set("topic")} aria-invalid={!!errors.topic} aria-describedby={errors.topic ? "topic-err" : undefined} className={`${input}`}>
          <option value="">Choose a topic</option>
          {topics.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
        <Err k="topic" />
      </div>
      <div>
        <label htmlFor="message" className="text-[0.85rem] font-semibold text-navy">
          Message
        </label>
        <p id="message-hint" className="mt-1 text-xs leading-relaxed text-muted">
          Please don&apos;t include names, ages or details about children, allegations, court file numbers or other private
          family information. We can&apos;t provide legal advice or comment on individual cases.
        </p>
        <textarea
          id="message"
          name="message"
          rows={6}
          maxLength={2000}
          value={fields.message}
          onChange={set("message")}
          aria-invalid={!!errors.message}
          aria-describedby={`message-hint${errors.message ? " message-err" : ""}`}
          className={`${input} !h-auto resize-y py-3`}
        />
        <div className="flex justify-between">
          <Err k="message" />
          <span className="ml-auto mt-1.5 text-xs text-muted">{fields.message.length}/2000</span>
        </div>
      </div>
      <button type="submit" disabled={status.kind === "submitting"} className="btn-primary disabled:opacity-60">
        {status.kind === "submitting" ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : <Send className="h-4 w-4" aria-hidden />}
        Send message
      </button>
      <div aria-live="polite">
        {status.kind === "demo" && (
          <div className="anim-fade-up flex gap-2.5 border-l-2 border-champagne bg-ivory px-4 py-3 text-[0.88rem] leading-relaxed">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-champagne-ink" aria-hidden />
            <p>
              <strong className="font-semibold text-navy">Demo mode — message not sent.</strong> {status.message}
            </p>
          </div>
        )}
        {status.kind === "success" && <p className="border-l-2 border-sage-ink px-4 py-3 text-sm">{status.message}</p>}
        {status.kind === "error" && <p className="text-sm text-[#9b3b2a]">{status.message}</p>}
      </div>
    </form>
  );
}
