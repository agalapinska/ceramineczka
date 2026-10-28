import { PageShell } from "@/components/PageShell";
import { PageHero } from "@/components/PageHero";
import { ItalicPlay } from "@/components/ItalicPlay";
import { ProductCard, ProductGrid } from "@/components/ProductCard";
import { ButtonLink, Dash, Eyebrow, IconBox, SectionHead, type IconName } from "@/components/ui";
import { getProducts } from "@/lib/notion";

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
  { v: "18 h", l: "długość wypału" },
  { v: "40", l: "sztuk w partii max." },
  { v: "100%", l: "toczone ręcznie" },
];

const proces: { icon: IconName; t: string; d: string }[] = [
  { icon: "hand", t: "Ugniatanie", d: "Glina odleżała 2 tygodnie. Ugniatam ją 80 razy — do *wyjścia* powietrza." },
  { icon: "cup", t: "Toczenie", d: "Na kole. *10 minut* na kubek, 30 na wazon. Każdy inny." },
  { icon: "clock", t: "Suszenie", d: "Najpierw pod płachtą, potem swobodnie. *7 dni*." },
  { icon: "flame", t: "Biskwit", d: "Pierwszy wypał, *980°C*. Po nim glina jest twarda, ale porowata." },
  { icon: "drop", t: "Szkliwienie", d: "Zanurzanie *dwa razy*, pod różnym kątem. Dno zostaje surowe." },
  { icon: "stamp", t: "Wypał", d: "18 godzin, 1240°C. Piec stygnie 12 godzin. *Otwarcie = prezent*." },
];

export default async function Pracownia() {
  const products = (await getProducts()).filter((p) => p.publikuj).slice(0, 3);

  return (
    <PageShell>
      <PageHero
        eyebrow="02 / pracownia"
        title="Od gliny do Twojej półki."
        lead="Jestem Agata. Toczę od 2019, sprzedaję od 2024. Ta strona to dziennik mojej pracowni."
        meta="Pracownia na Pradze · 28 m² · jeden piec · jedno koło · cztery szkliwa"
        image={{
          src: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=1400&q=80",
          alt: "Pracownia ceramiczna",
        }}
      />

      {/* Liczby */}
      <section className="border-b border-line overflow-hidden">
        <ul className="grid grid-cols-2 lg:grid-cols-4 -mr-px -mb-px">
          {liczby.map((l) => (
            <li key={l.l} className="border-r border-b border-line px-s4 md:px-s5 py-s6">
              <p className="font-display text-display-l">{l.v}</p>
              <p className="caption mt-s3">{l.l}</p>
              <Dash className="mt-s4" />
            </li>
          ))}
        </ul>
      </section>

      {/* Proces */}
      <section className="border-b border-line">
        <SectionHead
          eyebrow="Proces"
          title="Sześć kroków, trzy tygodnie."
        />
        <div className="overflow-hidden">
          <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 -mr-px -mb-px">
            {proces.map((p, i) => (
              <li key={p.t} className="border-r border-b border-line p-s4 md:p-s5">
                <IconBox name={p.icon} />
                <p className="caption mt-s5">
                  {String(i + 1).padStart(2, "0")} <span className="text-ink-60">/ 06</span>
                </p>
                <h3 className="label-title mt-s3">{p.t}</h3>
                <Dash className="mt-s4" />
                <p className="mt-s4 text-body-m text-ink-60 max-w-xs">
                  <ItalicPlay text={p.d} />
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Kalendarium */}
      <section className="border-b border-line">
        <SectionHead eyebrow="Kalendarium" title="Siedem lat, jeden piec." />
        <ul>
          {timeline.map((t) => (
            <li
              key={t.rok}
              className="grid grid-cols-[5rem_1fr] md:grid-cols-[12rem_1fr] border-b border-line last:border-b-0"
            >
              <span className="px-s4 md:px-s6 py-s4 border-r border-line font-display font-medium text-display-s">
                {t.rok}
              </span>
              <p className="px-s4 md:px-s5 py-s4 text-body-l self-center">
                <ItalicPlay text={t.tekst} />
              </p>
            </li>
          ))}
        </ul>
      </section>

      {/* Teaser sklepu */}
      <section className="border-b border-line">
        <SectionHead
          eyebrow="Z tej pracowni"
          title="Trzy świeże sztuki."
          action={<ButtonLink href="/sklep">Cały sklep</ButtonLink>}
        />
        <ProductGrid cols="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <ProductCard key={p.numer} product={p} />
          ))}
        </ProductGrid>
      </section>

      <section className="border-b border-line px-s4 md:px-s6 py-s6 flex flex-wrap items-center justify-between gap-s4">
        <div>
          <Eyebrow>Wizyty w pracowni</Eyebrow>
          <p className="mt-s3 text-body-l max-w-md">Czwartek–sobota, zawsze po wcześniejszym umówieniu.</p>
        </div>
        <ButtonLink href="/kontakt" variant="solid">Umów wizytę</ButtonLink>
      </section>
    </PageShell>
  );
}
