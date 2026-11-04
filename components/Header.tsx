"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/lib/cart";

const links = [
  { href: "/sklep", label: "sklep" },
  { href: "/pracownia", label: "pracownia" },
  { href: "/wiki", label: "wiki" },
  { href: "/zasady", label: "zasady" },
  { href: "/kontakt", label: "kontakt" },
];

export function Header() {
  const { count } = useCart();
  return (
    <header className="sticky top-0 z-20 bg-cream border-b border-ink">
      <div className="px-s5 py-s3 flex items-center justify-between gap-s5">
        <Link href="/" className="flex flex-col gap-1 leading-none" aria-label="Kręczkowska — Ceramineczka, strona główna">
          <Image
            src="/logotyp.svg"
            alt="Kręczkowska"
            width={160}
            height={24}
            priority
            className="h-5 md:h-6 w-auto"
          />
          <span className="caption text-ink-60">ceramineczka</span>
        </Link>
        <nav className="hidden md:flex gap-s5 caption">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="hover:italic">
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-s4 caption">
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
