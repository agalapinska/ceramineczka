import { PageShell } from "@/components/PageShell";
import { PageHero } from "@/components/PageHero";
import { ItalicPlay } from "@/components/ItalicPlay";
import { getProducts } from "@/lib/notion";
import Link from "next/link";

export const revalidate = 600;

const timeline = [
  { rok: "2025", tekst: "Pierwsze toczenie na kole. Pracownia *Ceramineczka* w Gdyni rusza." },
  { rok: "2026", tekst: "Pierwszy wypał na sprzedaż. *Modern pomeranian folk* — nowoczesna interpretacja wzorów kaszubskich." },
  { rok: "później", tekst: "Nauka wydobywania *dzikiej gliny*. Własne receptury szkliw. Większe formy i rzeźby." },
];

const liczby = [
  { v: "1x/tydz", l: "wypał w Ceramiqa" },
  { v: "1240°C", l: "temperatura wypału" },
  { v: "AK", l: "sygnatura od spodu" },
  { v: "100%", l: "ręcznie, bez odlewów" },
];

export default async function Pracownia() {
  const products = (await getProducts()).filter((p) => p.publikuj).slice(0, 3);

  return (
    <PageShell>
      <PageHero
        eyebrow="02 / pracownia"
        title="od *gliny* do Twojej półki"
        lead="Jestem *Agata Kręczkowska*. Toczę i lepię od 2025 roku w Gdyni. Ta strona to zapis mojej drogi od pierwszej bryły gliny."
      />

      {/* Split — photo + intro */}
      <section className="grid grid-cols-1 md:grid-cols-2 border-b border-ink">
        <div className="relative min-h-[60vh] overflow-hidden bg-ink border-r border-ink">
          <img
            src="/foto/ceramika-6.jpg"
            alt="Ręka trzymająca kubek — pracownia Kręczkowska"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
        <div className="p-s5 md:p-s6 flex flex-col justify-between gap-s5">
          <p className="caption">WIZYTÓWKA · 01</p>
          <p
            className="font-display font-medium text-display-m leading-[0.95] tracking-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            <ItalicPlay text="Pracownia w *Gdyni*. Toczę na kole i lepię. Nie mam jeszcze własnego pieca — wożę prace do *Ceramiqa*." />
          </p>
          <p className="italic-accent text-body-l max-w-xl">
            <ItalicPlay text="Każdy wtorek jadę z nowym transportem: zawożę do szkliwienia, odbieram poprzedni wypał. *Wysyłka* do 7 dni roboczych od otrzymania prac." />
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

      {/* Co robię */}
      <section className="px-s5 md:px-s6 py-s7 bg-cream border-b border-ink">
        <div className="grid grid-cols-12 gap-s4 mb-s6">
          <p className="caption col-span-12 md:col-span-2">CO ROBIĘ · 02</p>
          <h2 className="col-span-12 md:col-span-10 font-display font-medium text-display-l tracking-tight">
            <ItalicPlay text="*sześć* kolekcji, jedna ręka" />
          </h2>
        </div>
        <ol className="grid grid-cols-1 md:grid-cols-2 gap-0 border-t border-ink">
          {[
            ["01", "modern pomeranian folk", "Malowane *nowoczesne* interpretacje wzorów kaszubskiego haftu. Główna linia."],
            ["02", "basic", "Prace bez wzorów, same *szkliwa*. Codzienność bez ozdób."],
            ["03", "outlet", "Egzemplarze z *lekkim uszczerbkiem* albo eksperymenty. Po niższej cenie."],
            ["04", "future", "To, nad czym *aktualnie pracuję*. Linki do Instagrama z procesem."],
            ["05", "individual", "Zamówienia *na miarę* — zastawy, kubki z inicjałami, projekt pod klienta."],
            ["06", "art", "Większe formy, *rzeźby*, prace pojedyncze."],
          ].map(([n, t, d], i) => (
            <li
              key={n}
              className={`p-s5 border-b border-ink ${i % 2 === 0 ? "md:border-r" : ""}`}
            >
              <div className="flex items-baseline justify-between mb-s3">
                <span className="font-display font-medium text-display-s italic-accent">{n}</span>
                <span className="caption">kolekcja {i + 1}/6</span>
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

      {/* Materiały */}
      <section className="bg-cream border-b border-ink px-s5 md:px-s6 py-s6">
        <div className="grid grid-cols-12 gap-s4 mb-s5">
          <p className="caption col-span-12 md:col-span-2">MATERIAŁY · 03</p>
          <h2 className="col-span-12 md:col-span-10 font-display font-medium text-display-l tracking-tight">
            <ItalicPlay text="*co* trzymam w pracowni" />
          </h2>
        </div>
        <dl className="grid grid-cols-1 md:grid-cols-3 border-t border-ink">
          <div className="p-s5 border-b md:border-b-0 md:border-r border-ink">
            <dt className="caption mb-s2">GLINA</dt>
            <dd className="font-display font-medium text-display-s">
              Sibelco WMS 2502
            </dd>
            <p className="italic-accent mt-s3 text-body-m">
              Kamionka z serii <a href="https://1240.design/pl/masy-i-surowce/masy-ceramiczne/glina-do-ceramiki/glina-sibelco-wms-2502.html" target="_blank" rel="noopener noreferrer" className="underline">1240.design</a>. Plastyczna, przewidywalna, dobrze przyjmuje szkliwa.
            </p>
          </div>
          <div className="p-s5 border-b md:border-b-0 md:border-r border-ink">
            <dt className="caption mb-s2">SZKLIWA</dt>
            <dd className="font-display font-medium text-display-s">
              Mayco <span className="italic-accent">&</span> Amaco
            </dd>
            <p className="italic-accent mt-s3 text-body-m">
              Food-safe, bez ołowiu, z pełnymi kartami właściwości od producenta.
            </p>
          </div>
          <div className="p-s5">
            <dt className="caption mb-s2">WYPAŁ</dt>
            <dd className="font-display font-medium text-display-s">
              <span className="italic-accent">Ceramiqa</span> · Gdynia
            </dd>
            <p className="italic-accent mt-s3 text-body-m">
              Nie mam jeszcze własnego pieca. Raz w tygodniu, we wtorek, jadę z transportem.
            </p>
          </div>
        </dl>
      </section>

      {/* Timeline */}
      <section className="bg-cream border-b border-ink">
        <div className="px-s5 md:px-s6 py-s6 grid grid-cols-12 gap-s4">
          <p className="caption col-span-12 md:col-span-2">KALENDARIUM · 04</p>
          <h2 className="col-span-12 md:col-span-10 font-display font-medium text-display-l tracking-tight">
            <ItalicPlay text="*świeża* pracownia" />
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
      {products.length > 0 && (
        <section className="bg-ink text-cream px-s5 md:px-s6 py-s7 border-b border-ink">
          <div className="grid grid-cols-12 gap-s4 mb-s5">
            <p className="caption col-span-12 md:col-span-2 opacity-70">Z TEJ PRACOWNI</p>
            <h2 className="col-span-12 md:col-span-10 font-display font-medium text-display-l tracking-tight">
              <ItalicPlay text="*pierwsze* sztuki" />
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
      )}
    </PageShell>
  );
}
