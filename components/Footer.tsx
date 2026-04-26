import Link from "next/link";
import { ItalicPlay } from "./ItalicPlay";

const columns: { title: string; items: { label: string; href: string }[] }[] = [
  {
    title: "sklep",
    items: [
      { label: "cała kolekcja", href: "/sklep" },
      { label: "kubki", href: "/sklep" },
      { label: "miski", href: "/sklep" },
      { label: "wazony", href: "/sklep" },
      { label: "na zamówienie", href: "/kontakt" },
    ],
  },
  {
    title: "pracownia",
    items: [
      { label: "o mnie", href: "/pracownia" },
      { label: "proces", href: "/pracownia" },
      { label: "dziennik wypałów", href: "/dziennik" },
      { label: "żywioły", href: "/dziennik" },
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
      { label: "pracownia", href: "/kontakt" },
      { label: "Instagram", href: "#" },
      { label: "Pinterest", href: "#" },
    ],
  },
];

export function Footer() {
  return (
    <footer id="kontakt" className="bg-cream border-t border-ink">
      <div className="px-s5 md:px-s6 pt-s7 pb-s5 grid grid-cols-2 md:grid-cols-5 gap-s5">
        <div className="col-span-2 md:col-span-1">
          <p className="font-display font-medium text-2xl">
            Cerami<span className="italic-accent">neczka</span>
          </p>
          <p className="italic-accent text-body-l mt-s3 max-w-xs">
            <ItalicPlay text="Ręcznie toczona ceramika *z Warszawy*." />
          </p>
        </div>
        {columns.map((c) => (
          <div key={c.title}>
            <p className="caption mb-s3">{c.title}</p>
            <ul className="space-y-s2">
              {c.items.map((it) => (
                <li key={it.label}>
                  <Link href={it.href} className="text-body-m hover:italic">
                    {it.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-ink px-s5 md:px-s6 py-s3 flex flex-wrap justify-between gap-s3 caption">
        <span>Ceramineczka · © 2026</span>
        <span className="italic-accent">do następnego wypału</span>
        <span>polityka prywatności · regulamin</span>
      </div>
    </footer>
  );
}
