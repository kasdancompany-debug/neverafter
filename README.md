# NEVER AFTER.

**The fairytale ends. Life doesn't.** — Divorce, Separation & Family Law, Explained. (Ontario first.)

A Next.js (App Router) + React 19 + TypeScript + Tailwind CSS 4 educational media site. Type: Newsreader (headlines, reading) + Instrument Sans (interface). Motion is CSS-only and respects reduced-motion.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (all pages prerender statically)
npm run start      # serve the production build
npm run typecheck
```

Requires Node 20.9+.

## Deploy

Any Next.js host works. On **Vercel**: import the repo, set the environment variables below, deploy.
Self-hosting: `npm run build && npm run start` behind a reverse proxy.

Copy `.env.example` to `.env.local` and set:

| Variable | Purpose | If unset |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical URLs, sitemap, Open Graph | Defaults to `https://www.neverafter.ca` (placeholder domain — confirm) |
| `NEWSLETTER_WEBHOOK_URL` | Newsletter + Starter Guide signups (JSON POST) | Forms show **"Demo mode — not subscribed"**; nothing is stored |
| `CONTACT_WEBHOOK_URL` | Contact form delivery (JSON POST) | Form shows **"Demo mode — message not sent"** |
| `STRIPE_SECRET_KEY` | Stripe Checkout sessions | Purchase shows **"No purchase was made"** |

## Integration points (what needs external configuration)

- **Email provider** — `app/api/subscribe/route.ts`. Forwards `{ email, list, consent, consentText, timestamp }` to a webhook. Point it at Buttondown/ConvertKit/Mailchimp (directly or via Zapier/Make). Use double opt-in (CASL). The Starter Guide PDF itself still needs to be written and attached to the provider's welcome email.
- **Contact** — `app/api/contact/route.ts`, same pattern.
- **Payments** — `app/api/checkout/route.ts` creates a Stripe Checkout Session via the REST API (no SDK). Checkout only proceeds when `STRIPE_SECRET_KEY` is set **and** the product has `available: true` in `lib/products.ts`. Still to build before selling: a Stripe webhook (`checkout.session.completed`) that delivers the file, a refund policy, and Stripe Tax configuration.
- **CMS** — all article/topic data lives in `lib/articles.ts` and `lib/topics.ts`, and pages read it only through `lib/content.ts`. Replace those helpers with CMS queries (Sanity, Contentful, Payload…) — the body is already a portable block array.

## Structure

```
app/                     routes (/, /start-here, /family-law, /parenting, /high-conflict, /support,
                         /family-court, /evidence, /relevant-or-not, /articles, /articles/[slug],
                         /resources, /resources/[slug], /about, /editorial-standards, /contact,
                         /legal-disclaimer, /privacy, /terms) + api/, sitemap.ts, robots.ts, OG image
components/              Header + SearchPalette (⌘K), Footer, WhatMatters, RelevantOrNot, StartingPoint, ArticleLibrary,
                         OnThisPage (scroll-synced nav), ReadingProgress, ArticleTools,
                         SignupForm, ContactForm, CheckoutButton, TopicPage, ProductCover, …
lib/site.ts              brand, navigation, official source registry (single source of truth for links)
lib/topics.ts            six topic guides
lib/articles.ts          article content model + 9 articles
lib/tools.ts             "What Actually Matters?", "Relevant or Not?" scenarios, Starting Point pathways
lib/products.ts          proposed resource catalogue
```

## Privacy by design

- The interactive tools run entirely in the browser; selections are never sent or stored.
- Forms collect only what's needed and warn users not to include details about children, allegations or court files.
- No analytics or third-party trackers are installed.

## Content requiring Ontario legal review before launch

All articles are labelled **"Editorial draft"** (`legalReview: "pending"`) until reviewed. Priority items:

1. **All 9 articles** in `lib/articles.ts` — especially: OCL intake/services and report-dispute process; settlement-conference confidentiality and judge-recusal rule; the "status quo" discussion; limitation periods for equalization; shared-parenting (40%) child-support description; affidavit "information and belief" rules.
2. **Topic pages** (`lib/topics.ts`) — best-interests factor list wording, relocation summary, unmarried-spouse definition for support, court jurisdiction (OCJ / SCJ / Family Court branch), Mandatory Information Program description.
3. **Interactive tools** (`lib/tools.ts`) — every scenario's "issue / why it matters / misunderstanding" text, and the offer-to-settle cost consequences statement.
4. **Legal pages** — Legal Disclaimer, Privacy Policy (PIPEDA/CASL, service-provider list, privacy contact), Terms of Use (refunds, liability). Each carries a visible draft banner.
5. **Products** — descriptions and preview excerpts are drafts; none of the products exist yet.
6. **Placeholders to confirm** — domain (`neverafter.ca`), `hello@neverafter.ca` contact inbox (not displayed), reviewer panel (shown as open positions; no identities invented).

Official URLs were checked on 2026-11-17; `lso.ca` blocks automated checks and should be verified by hand.
