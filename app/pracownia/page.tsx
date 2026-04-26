import { PageShell } from "@/components/PageShell";
import { PageHero } from "@/components/PageHero";
import { ItalicPlay } from "@/components/ItalicPlay";
import { getProducts } from "@/lib/notion";
import Link from "next/link";

export const revalidate = 600;

const timeline = [
  { rok: "2019", tekst: "Pierwsze zajęcia garncarskie w Dzielnicowym Centrum Kultury na Pradze." },
  { rok: "2021", tekst: "*Własne* koło w piwnicy. Wypały w zaprzyjaźnionej pracowni." },
  { rok: "2023", tekst: "Własny piec gazowy. Pierwsza mała partia dla znajomych." },
  { rok: "2024", tekst: "*Pracownia* przy ul. Brzeskiej. Pierwszy wypał na sprzedaż." },
  { rok: "2026", tekst: "Sklep online. Ty czytasz tę stronę. *Dziękuję*." },
];

const liczby = [
  { v: "1240°C", l: "temperatura wypału" },
  { v: "18h", l: "długość wypału" },
  { v: "40", l: "sztuk w partii max." },
  { v: "100%", l: "toczone ręcznie" },
];

export default async function Pracownia() {
  const products = (await getProducts()).filter((p) => p.publikuj).slice(0, 3);

  return (
    <PageShell>
      <PageHero
        eyebrow="02 / pracownia"
        title="od *gliny* do Twojej półki"
        lead="Jestem *Agata*. Toczę od 2019, sprzedaję od 2024. Ta strona to dziennik mojej pracowni."
      />

      {/* Split — photo + intro */}
      <section className="grid grid-cols-1 md:grid-cols-2 border-b border-ink">
        <div className="relative min-h-[60vh] overflow-hidden bg-ink border-r border-ink">
          <img
            src="https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=1400&q=80"
            alt="Pracownia"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
        <div className="p-s5 md:p-s6 flex flex-col justify-between gap-s5">
          <p className="caption">WIZYTÓWKA · 01</p>
          <p
            className="font-display font-medium text-display-m leading-[0.95] tracking-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            <ItalicPlay text="Pracownia na *Pradze*, 28 m², jeden piec, jedno koło, *cztery* szkliwa." />
          </p>
          <p className="italic-accent text-body-l max-w-xl">
            <ItalicPlay text="Wypał co 3 tygodnie. Dzień planuję na każdym kroku — od *ugniatania* gliny, przez *toczenie*, *suszenie*, *biskwit*, *szkliwienie*, aż po *wypał* finalny." />
          </p>
        </div>
      </section>

      {/* Liczby — bento row */}
      <section className="grid grid-cols-2 md:grid-cols-4 bg-ink text-cream border-b border-ink">
        {liczby.map((l, i) => (
          <div
            key={l.l}
            className={`p-s5 ${i < liczby.length - 1 ? "md:border-r border-cream/30" : ""} ${
              i < 2 ? "border-b md:border-b-0 border-cream/30" : ""
            }`}
          >
            <p className="font-display font-medium text-display-m leading-none italic-accent">{l.v}</p>
            <p className="caption mt-s3 opacity-70">{l.l}</p>
          </div>
        ))}
      </section>

      {/* Proces — 6-step manifesto inspired by Stretch "precious ingredients" */}
      <section className="px-s5 md:px-s6 py-s7 bg-cream border-b border-ink">
        <div className="grid grid-cols-12 gap-s4 mb-s6">
          <p className="caption col-span-12 md:col-span-2">PROCES · 02</p>
          <h2 className="col-span-12 md:col-span-10 font-display font-medium text-display-l tracking-tight">
            <ItalicPlay text="*sześć* kroków, trzy tygodnie" />
          </h2>
        </div>
        <ol className="grid grid-cols-1 md:grid-cols-2 gap-0 border-t border-ink">
          {[
            ["01", "ugniatanie", "Glina odleżała 2 tygodnie. Ugniatam ją 80 razy — do *wyjścia* powietrza."],
            ["02", "toczenie", "Na kole. *10 minut* na kubek, 30 na wazon. Każdy inny."],
            ["03", "suszenie", "Najpierw pod płachtą, potem swobodnie. *7 dni*."],
            ["04", "biskwit", "Pierwszy wypał, *980°C*. Po nim glina jest twarda ale porowata."],
            ["05", "szkliwienie", "Zanurzanie *dwa razy*, pod różnym kątem. Dno zostaje surowe."],
            ["06", "wypał", "18 godzin, 1240°C. Piec stygnie 12 godzin. *Otwarcie = prezent*."],
          ].map(([n, t, d], i) => (
            <li
              key={n}
              className={`p-s5 border-b border-ink ${i % 2 === 0 ? "md:border-r" : ""}`}
            >
              <div className="flex items-baseline justify-between mb-s3">
                <span className="font-display font-medium text-display-s italic-accent">{n}</span>
                <span className="caption">krok {i + 1}/6</span>
              </div>
              <h3
                className="font-display font-medium text-display-s mt-s2"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {t}
              </h3>
              <p className="italic-accent mt-s3 text-body-l">
                <ItalicPlay text={d} />
              </p>
            </li>
          ))}
        </ol>
      </section>

      {/* Timeline */}
      <section className="bg-cream border-b border-ink">
        <div className="px-s5 md:px-s6 py-s6 grid grid-cols-12 gap-s4">
          <p className="caption col-span-12 md:col-span-2">KALENDARIUM · 03</p>
          <h2 className="col-span-12 md:col-span-10 font-display font-medium text-display-l tracking-tight">
            <ItalicPlay text="*siedem* lat, jeden piec" />
          </h2>
        </div>
        <ul className="divide-y divide-ink border-t border-ink">
          {timeline.map((t) => (
            <li key={t.rok} className="grid grid-cols-12 gap-s4 px-s5 md:px-s6 py-s4">
              <span className="col-span-3 md:col-span-2 font-display font-medium text-display-s italic-accent">
                {t.rok}
              </span>
              <p className="col-span-9 md:col-span-10 text-body-l">
                <ItalicPlay text={t.tekst} />
              </p>
            </li>
          ))}
        </ul>
      </section>

      {/* Teaser shop */}
      <section className="bg-ink text-cream px-s5 md:px-s6 py-s7 border-b border-ink">
        <div className="grid grid-cols-12 gap-s4 mb-s5">
          <p className="caption col-span-12 md:col-span-2 opacity-70">Z TEJ PRACOWNI</p>
          <h2 className="col-span-12 md:col-span-10 font-display font-medium text-display-l tracking-tight">
            <ItalicPlay text="*trzy* świeże sztuki" />
          </h2>
        </div>
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-s3">
          {products.map((p) => (
            <li key={p.numer} className="border border-cream/30 p-s4 aspect-square flex flex-col justify-between">
              <span className="caption opacity-70">{p.numer} · {p.typ}</span>
              <div>
                <p className="italic-accent text-2xl"><ItalicPlay text={p.opisKursywa} /></p>
                <p className="font-display font-medium text-xl mt-s2">{p.cena} zł</p>
              </div>
            </li>
          ))}
        </ul>
        <Link href="/sklep" className="mt-s5 inline-block border border-cream caption px-s5 py-s3 hover:bg-cream hover:text-ink transition-colors">
          cały sklep →
        </Link>
      </section>
    </PageShell>
  );
}
