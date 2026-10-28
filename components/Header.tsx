"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useCart } from "@/lib/cart";
import { Icon } from "./ui";

const links = [
  { href: "/sklep", label: "sklep" },
  { href: "/pracownia", label: "pracownia" },
  { href: "/dziennik", label: "dziennik" },
  { href: "/zasady", label: "zasady" },
  { href: "/kontakt", label: "kontakt" },
];

export function Header() {
  const { count } = useCart();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-30 bg-paper border-b border-line">
      <div className="h-[4.5rem] md:h-[5.5rem] px-s4 md:px-s5 flex items-center justify-between gap-s4">
        <Link
          href="/"
          className="font-display font-semibold uppercase tracking-[0.06em] text-[1.0625rem]"
        >
          Ceramineczka
        </Link>

        <nav className="hidden lg:flex items-center gap-s6 caption">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              aria-current={isActive(l.href) ? "page" : undefined}
              className={`border-b pb-[2px] transition-colors ${
                isActive(l.href) ? "border-line" : "border-transparent hover:border-line"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-stretch gap-s2">
          <Link
            href="/koszyk"
            className="group hairline inline-flex items-center justify-between gap-s4 caption px-s3 md:px-s4 py-s3 md:min-w-[12.5rem] hover:bg-ink hover:text-paper transition-colors"
          >
            <span className="whitespace-nowrap">Koszyk ({count})</span>
            <Icon name="arrow" className="hidden sm:block w-5 h-5" />
          </Link>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Zamknij menu" : "Otwórz menu"}
            className="lg:hidden hairline w-12 inline-flex items-center justify-center hover:bg-ink hover:text-paper transition-colors"
          >
            <Icon name="menu" className="w-5 h-5" />
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" className="lg:hidden border-t border-line">
          <ul>
            {links.map((l) => (
              <li key={l.href} className="border-b border-line last:border-b-0">
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between px-s4 py-s4 caption hover:bg-ink hover:text-paper transition-colors"
                >
                  {l.label}
                  <Icon name="arrow" className="w-4 h-4" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
