import Link from "next/link";
import { ItalicPlay } from "./ItalicPlay";

const columns: { title: string; items: { label: string; href: string; external?: boolean }[] }[] = [
  {
    title: "sklep",
    items: [
      { label: "cała kolekcja", href: "/sklep" },
      { label: "modern pomeranian folk", href: "/sklep" },
      { label: "basic", href: "/sklep" },
      { label: "outlet", href: "/sklep" },
      { label: "na zamówienie (individual)", href: "/kontakt" },
    ],
  },
  {
    title: "pracownia",
    items: [
      { label: "o mnie", href: "/pracownia" },
      { label: "proces", href: "/pracownia" },
      { label: "wiki — notatki i ciekawostki", href: "/wiki" },
    ],
  },
  {
    title: "dla klienta",
    items: [
      { label: "zasady", href: "/zasady" },
      { label: "FAQ", href: "/zasady" },
      { label: "wysyłka & zwroty", href: "/zasady" },
      { label: "pielęgnacja", href: "/zasady" },
    ],
  },
  {
    title: "kontakt",
    items: [
      { label: "formularz", href: "/kontakt" },
      { label: "agata.kreczkowska@gmail.com", href: "mailto:agata.kreczkowska@gmail.com" },
      { label: "Instagram @ceramineczka", href: "https://www.instagram.com/ceramineczka/", external: true },
    ],
  },
];

export function Footer() {
  return (
    <footer id="kontakt" className="bg-cream border-t border-ink">
      <div className="px-s5 md:px-s6 pt-s7 pb-s5 grid grid-cols-2 md:grid-cols-5 gap-s5">
        <div className="col-span-2 md:col-span-1">
          <p className="font-display font-medium text-2xl">
            Kręcz<span className="italic-accent">kowska</span>
          </p>
          <p className="caption mt-s1 text-ink-60">ceramineczka</p>
          <p className="italic-accent text-body-l mt-s3 max-w-xs">
            <ItalicPlay text="Ręcznie toczona ceramika *z Gdyni*. Modern pomeranian folk." />
          </p>
        </div>
        {columns.map((c) => (
          <div key={c.title}>
            <p className="caption mb-s3">{c.title}</p>
            <ul className="space-y-s2">
              {c.items.map((it) => (
                <li key={it.label}>
                  {it.external ? (
                    <a
                      href={it.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-body-m hover:italic"
                    >
                      {it.label} ↗
                    </a>
                  ) : (
                    <Link href={it.href} className="text-body-m hover:italic">
                      {it.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-ink px-s5 md:px-s6 py-s3 flex flex-wrap justify-between gap-s3 caption">
        <span>Ceramineczka · Agata Kręczkowska · Gdynia · © {new Date().getFullYear()}</span>
        <span className="italic-accent">do następnego wypału</span>
        <Link href="/zasady" className="hover:italic">polityka prywatności · regulamin</Link>
      </div>
    </footer>
  );
}
