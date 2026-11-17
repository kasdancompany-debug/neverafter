"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, Search, X } from "lucide-react";
import { mainNav, site } from "@/lib/site";
import type { SearchItem } from "@/lib/search";
import { Logo } from "./Logo";
import { SearchPalette } from "./SearchPalette";

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header({ searchIndex }: { searchIndex: SearchItem[] }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMac, setIsMac] = useState(true);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setIsMac(/Mac|iPhone|iPad/.test(navigator.platform));
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const onKey = (e: KeyboardEvent) => {
      const typing = /INPUT|TEXTAREA|SELECT/.test((e.target as HTMLElement).tagName) || (e.target as HTMLElement).isContentEditable;
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || (e.key === "/" && !typing)) {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusables = () => Array.from(panelRef.current?.querySelectorAll<HTMLElement>("a[href], button") ?? []);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        toggleRef.current?.focus();
      }
      if (e.key === "Tab") {
        const els = [toggleRef.current!, ...focusables()];
        const first = els[0];
        const last = els[els.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={`sticky top-0 z-50 bg-paper/95 backdrop-blur-md transition-shadow ${
          scrolled || menuOpen ? "shadow-[0_1px_0_var(--color-line)]" : ""
        }`}
      >
        <div className="container-x flex h-16 items-center">
          <div className="shrink-0">
            <Logo />
          </div>

          <nav aria-label="Primary" className="ml-10 hidden h-full xl:block">
            <ul className="flex h-full items-center gap-6">
              {mainNav.map((item) => {
                const active = isActive(pathname, item.href);
                return (
                  <li key={item.href} className="h-full">
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={`relative flex h-full items-center whitespace-nowrap text-[0.85rem] font-medium transition-colors ${
                        active ? "text-navy" : "text-charcoal/65 hover:text-navy"
                      }`}
                    >
                      {item.label}
                      {active && <span className="absolute inset-x-0 bottom-0 h-[2px] bg-navy" aria-hidden />}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="ml-auto flex shrink-0 items-center gap-2 pl-6">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="flex h-9 w-9 items-center justify-center rounded-[3px] text-charcoal/70 transition-colors hover:bg-ivory hover:text-navy"
              aria-label="Search"
              title={`Search (${isMac ? "⌘K" : "Ctrl+K"})`}
              aria-keyshortcuts="Meta+K Control+K /"
            >
              <Search className="h-[18px] w-[18px]" aria-hidden />
            </button>
            <Link href="/start-here" className="btn-primary hidden !h-9 !px-4 !text-[0.84rem] sm:inline-flex">
              Find Your Starting Point
            </Link>
            <button
              ref={toggleRef}
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className="flex h-9 w-9 items-center justify-center rounded-[3px] border border-line text-navy xl:hidden"
            >
              {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div
            id="mobile-menu"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="anim-fade fixed inset-x-0 bottom-0 top-16 overflow-y-auto border-t border-line bg-paper xl:hidden"
          >
            <nav aria-label="Mobile" className="container-x flex min-h-full flex-col py-4">
              <ul className="divide-y divide-line border-b border-line">
                {mainNav.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={isActive(pathname, item.href) ? "page" : undefined}
                      className="flex items-baseline justify-between gap-4 py-4 aria-[current=page]:text-champagne-ink"
                    >
                      <span className="font-serif text-[1.5rem] font-medium text-navy">{item.label}</span>
                      <span className="text-right text-[0.8rem] text-muted">{item.description}</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <Link href="/start-here" className="btn-primary mt-6 w-full">
                Find Your Starting Point
              </Link>
              <p className="mt-auto pt-10 text-xs leading-relaxed text-muted">{site.disclaimer}</p>
            </nav>
          </div>
        )}
      </header>
      <SearchPalette index={searchIndex} open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
