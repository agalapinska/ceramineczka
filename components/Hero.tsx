import Link from "next/link";
import { ItalicPlay } from "./ItalicPlay";

export function Hero() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 border-b border-ink">
      {/* Left: typographic */}
      <div className="relative bg-cream px-s5 md:px-s6 py-s7 flex flex-col justify-between min-h-[70vh] border-r border-ink">
        <p className="caption">01 / wypał II · kwiecień 2026</p>

        <h1 className="font-display font-medium leading-[0.9] tracking-[-0.03em] text-[clamp(3.5rem,9vw,8rem)]">
          <ItalicPlay text="ceramika *na dziś*," />
          <br />
          <ItalicPlay text="nie *na później*." />
        </h1>

        <div className="flex flex-wrap items-end justify-between gap-s4 max-w-xl">
          <p className="text-body-l" style={{ fontFamily: "var(--font-accent)" }}>
            <ItalicPlay text="Małe wypały, *jednorazowe* edycje. Toczone ręcznie w Warszawie." />
          </p>
          <Link
            href="/sklep"
            className="hairline px-s4 py-s3 caption hover:bg-ink hover:text-cream transition-colors"
          >
            zobacz kolekcję ↘
          </Link>
        </div>
      </div>

      {/* Right: product image */}
      <div className="relative bg-ink text-cream overflow-hidden min-h-[70vh]">
        <img
          src="https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=1600&q=80"
          alt="Miska z gliny na wodzie"
          className="absolute inset-0 w-full h-full object-cover opacity-95"
        />
        <div className="relative z-10 p-s5 flex flex-col justify-between h-full">
          <div className="flex items-center justify-between caption text-cream">
            <span>Nº 04</span>
            <span>miska · edycja jednorazowa</span>
          </div>
          <div>
            <p className="italic-accent text-3xl text-cream">180 zł</p>
            <Link
              href="/sklep"
              className="mt-s3 inline-block border border-cream text-cream caption px-s3 py-s2 hover:bg-cream hover:text-ink transition-colors"
            >
              dodaj do koszyka
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
