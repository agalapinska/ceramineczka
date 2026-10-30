import Link from "next/link";

const columns: { title: string; items: { label: string; href: string }[] }[] = [
  {
    title: "sklep",
    items: [
      { label: "Cała kolekcja", href: "/sklep" },
      { label: "Kubki", href: "/sklep?typ=kubki" },
      { label: "Miski", href: "/sklep?typ=miski" },
      { label: "Wazony", href: "/sklep?typ=wazony" },
      { label: "Na zamówienie", href: "/kontakt" },
    ],
  },
  {
    title: "pracownia",
    items: [
      { label: "O mnie", href: "/pracownia" },
      { label: "Proces", href: "/pracownia" },
      { label: "Dziennik wypałów", href: "/dziennik" },
      { label: "Żywioły", href: "/dziennik" },
    ],
  },
  {
    title: "dla klienta",
    items: [
      { label: "Zasady", href: "/zasady" },
      { label: "FAQ", href: "/zasady" },
      { label: "Wysyłka i zwroty", href: "/zasady" },
      { label: "Pielęgnacja", href: "/zasady" },
    ],
  },
  {
    title: "kontakt",
    items: [
      { label: "Formularz", href: "/kontakt" },
      { label: "Pracownia", href: "/kontakt" },
      { label: "Instagram", href: "#" },
      { label: "Pinterest", href: "#" },
    ],
  },
];

export function Footer() {
  return (
    <footer id="kontakt" className="border-t border-line">
      {/* Telefon: zwijane sekcje zamiast czterech długich kolumn. */}
      <div className="md:hidden">
        {columns.map((c) => (
          <details key={c.title} className="group border-b border-line">
            <summary className="list-none cursor-pointer px-s4 py-s4 flex items-center justify-between caption [&::-webkit-details-marker]:hidden">
              {c.title}
              <span className="text-lg leading-none transition-transform group-open:rotate-45" aria-hidden>
                +
              </span>
            </summary>
            <ul className="px-s4 pb-s3">
              {c.items.map((it) => (
                <li key={it.label}>
                  <Link href={it.href} className="block py-s2 text-body-l text-ink-60">
                    {it.label}
                  </Link>
                </li>
              ))}
            </ul>
          </details>
        ))}
      </div>

      <div className="hidden md:block overflow-hidden">
        <div className="grid grid-cols-2 lg:grid-cols-4 -mr-px -mb-px">
          {columns.map((c) => (
            <div key={c.title} className="border-r border-b border-line px-s4 md:px-s5 py-s6">
              <p className="caption mb-s4">{c.title}</p>
              <ul className="space-y-s2">
                {c.items.map((it) => (
                  <li key={it.label}>
                    <Link href={it.href} className="text-body-m text-ink-60 hover:text-ink transition-colors">
                      {it.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr] md:border-t border-line">
        <div className="px-s4 md:px-s5 py-s5 md:py-s6 border-b md:border-b-0 md:border-r border-line">
          <p className="font-display uppercase text-[clamp(2rem,4.6vw,3.75rem)] leading-none tracking-[-0.03em]">
            Ceramineczka
          </p>
        </div>
        <div className="px-s4 md:px-s5 py-s5 pb-[calc(var(--space-5)+env(safe-area-inset-bottom))] md:pb-s5 flex flex-col justify-center gap-s2 caption text-ink-60">
          <span className="text-ink">Ręcznie toczona ceramika z Warszawy</span>
          <span>© 2026 · Polityka prywatności · Regulamin</span>
        </div>
      </div>
    </footer>
  );
}
