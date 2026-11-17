import { products } from "./products";

/**
 * Everything that can be bought, in one place.
 * `entitlements` are what a completed payment unlocks; access checks only ever look at entitlements.
 */
export type Entitlement = "studio" | "plus" | `guide:${string}`;

export type CatalogItem = {
  id: string;
  name: string;
  description: string;
  priceCad: number;
  mode: "payment" | "subscription";
  interval?: "month" | "year";
  available: boolean;
  entitlements: Entitlement[];
  /** Where to send the buyer after a successful purchase. */
  returnTo: string;
};

export const STUDIO_PRICE = 49;
export const PLUS_MONTHLY = 12;
export const PLUS_YEARLY = 99;

export const catalog: CatalogItem[] = [
  {
    id: "studio",
    name: "Parenting Plan Studio — lifetime access",
    description: "Export, print and save unlimited parenting plan drafts. One-time payment.",
    priceCad: STUDIO_PRICE,
    mode: "payment",
    available: true,
    entitlements: ["studio"],
    returnTo: "/parenting-plan-studio",
  },
  {
    id: "plus-monthly",
    name: "Never After Plus — monthly",
    description: "Parenting Plan Studio plus every Never After guide as it's released.",
    priceCad: PLUS_MONTHLY,
    mode: "subscription",
    interval: "month",
    available: true,
    entitlements: ["plus"],
    returnTo: "/access",
  },
  {
    id: "plus-yearly",
    name: "Never After Plus — yearly",
    description: "Parenting Plan Studio plus every Never After guide as it's released. Billed yearly.",
    priceCad: PLUS_YEARLY,
    mode: "subscription",
    interval: "year",
    available: true,
    entitlements: ["plus"],
    returnTo: "/access",
  },
  ...products.map(
    (p): CatalogItem => ({
      id: p.slug,
      name: p.title,
      description: p.tagline,
      priceCad: p.priceCad,
      mode: "payment",
      available: p.available,
      entitlements: [`guide:${p.slug}`],
      returnTo: `/resources/${p.slug}`,
    }),
  ),
];

export function getCatalogItem(id: string) {
  return catalog.find((c) => c.id === id);
}

export function hasAccess(entitlements: readonly string[], needed: Entitlement): boolean {
  if (entitlements.includes(needed)) return true;
  // Plus includes the Studio and every guide.
  return entitlements.includes("plus") && (needed === "studio" || needed.startsWith("guide:"));
}
