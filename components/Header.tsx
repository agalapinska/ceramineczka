"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart";

const links = [
  { href: "/sklep", label: "sklep" },
  { href: "/pracownia", label: "pracownia" },
  { href: "/dziennik", label: "dziennik" },
  { href: "/zasady", label: "zasady" },
  { href: "/kontakt", label: "kontakt" },
];

export function Header() {
  const { count } = useCart();
  return (
    <header className="sticky top-0 z-20 bg-cream border-b border-ink">
      <div className="px-s5 py-s3 flex items-center justify-between gap-s5">
        <Link href="/" className="font-display font-medium text-xl tracking-tight">
          Cerami<span className="italic-accent">neczka</span>
        </Link>
        <nav className="hidden md:flex gap-s5 caption">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="hover:italic">
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-s4 caption">
          <button aria-label="Szukaj">szukaj</button>
          <Link href="/kontakt" aria-label="Konto">konto</Link>
          <Link
            href="/koszyk"
            className="hairline px-s3 py-s2 hover:bg-ink hover:text-cream transition-colors"
          >
            koszyk ({count})
          </Link>
        </div>
      </div>
    </header>
  );
}
