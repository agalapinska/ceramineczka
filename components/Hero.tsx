import Link from "next/link";
import { ItalicPlay } from "./ItalicPlay";

export function Hero() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 border-b border-ink">
      {/* Left: typographic */}
      <div className="relative bg-cream px-s5 md:px-s6 py-s7 flex flex-col justify-between min-h-[70vh] border-r border-ink">
        <p className="caption">01 / pracownia od 2025 · gdynia</p>

        <h1 className="font-display font-medium leading-[0.9] tracking-[-0.03em] text-[clamp(3.5rem,9vw,8rem)]">
          <ItalicPlay text="ceramika, która *nie udaje*" />
          <br />
          <ItalicPlay text="*perfekcji*." />
        </h1>

        <div className="flex flex-wrap items-end justify-between gap-s4 max-w-xl">
          <p className="text-body-l" style={{ fontFamily: "var(--font-accent)" }}>
            <ItalicPlay text="*Modern pomeranian folk* — nowoczesne interpretacje kaszubskiego haftu. Każda sztuka toczona i malowana *ręcznie*." />
          </p>
          <Link
            href="/sklep"
            className="hairline px-s4 py-s3 caption hover:bg-ink hover:text-cream transition-colors"
          >
            zobacz kolekcję ↘
          </Link>
        </div>
      </div>

      {/* Right: product photo with overlay manifest */}
      <div className="relative bg-ink text-cream overflow-hidden min-h-[70vh]">
        <img
          src="/foto/ceramika-2.jpg"
          alt="Czarka z czerwonymi łukami na kremowej kamionce — Kręczkowska"
          className="absolute inset-0 w-full h-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/50 via-transparent to-ink/80" />
        <div className="relative z-10 p-s5 md:p-s6 flex flex-col justify-between h-full min-h-[70vh]">
          <div className="flex items-center justify-between caption opacity-90">
            <span>manifest</span>
            <span>Nº 01</span>
          </div>
          <p className="italic-accent text-display-s md:text-display-m leading-[1.05] max-w-xl drop-shadow-lg">
            <ItalicPlay
              text="*Jakość i wykonanie przez człowieka*, a nie maszynę, sprawiają, że to towar premium — kupiony raz, zostaje *na pokolenia*."
            />
          </p>
          <div className="flex items-end justify-between gap-s3">
            <p className="caption opacity-90 max-w-xs">
              <ItalicPlay text="sprzedaż ruszamy z początkiem *2026* — zapisz się na info o pierwszym wypale" />
            </p>
            <Link
              href="/pracownia"
              className="border border-cream text-cream caption px-s3 py-s2 hover:bg-cream hover:text-ink transition-colors whitespace-nowrap"
            >
              o mnie ↗
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
