import { PageShell } from "@/components/PageShell";
import { PageHero } from "@/components/PageHero";
import { Principles } from "@/components/Principles";
import { ItalicPlay } from "@/components/ItalicPlay";

export const metadata = { title: "Zasady · Ceramineczka" };

const faq = [
  {
    q: "*Dlaczego* ceramika rękodzielnicza jest droższa?",
    a: "Bo robi ją jedna osoba, z jednej gliny, małymi partiami. Rękodzieło to *jakość i wykonanie przez człowieka* — nie maszynę. Kupujesz raz, zostaje na pokolenia.",
  },
  {
    q: "Jak *dbać* o ceramikę?",
    a: "Zmywarka OK, mikrofala OK. Unikaj *szoków termicznych* (z lodówki na rozgrzaną płytę). Ręcznie, z letnią wodą, szkliwo żyje dłużej.",
  },
  {
    q: "Jak długo *czekam* na zamówienie?",
    a: "Prace *na stanie*: do 3 dni roboczych. *Na zamówienie* (individual): do 14 dni roboczych od otrzymania wpłaty. Wypał odbiera się tylko we wtorki.",
  },
  {
    q: "Czy wysyłacie *za granicę*?",
    a: "Tak. Koszt ustalam indywidualnie w zależności od kraju i wagi paczki — napisz na agata.kreczkowska@gmail.com.",
  },
  {
    q: "Co jeśli coś się *potłukło* w transporcie?",
    a: "Napisz do mnie. Zwracam koszty, wysyłam nową sztukę, a reklamację z kurierem załatwiam ja. Zero formalności po Twojej stronie.",
  },
  {
    q: "Co jeśli chcę *zwrócić* zamówienie?",
    a: "14 dni na zwrot, bez podania przyczyny. Zwrot jest *darmowy* — koszt odsyłki po mojej stronie.",
  },
  {
    q: "Kiedy *następny* wypał?",
    a: "Raz w tygodniu wożę prace do *Ceramiqa* w Gdyni. Nowości i proces dzielę na Instagramie: *@ceramineczka*.",
  },
];

const gwarancje = [
  { n: "01", t: "darmowa *dostawa* zawsze", d: "W Polsce, bez progu zamówienia. Operator: paczkomat InPost lub kurier." },
  { n: "02", t: "14 dni na *zwrot*", d: "Bez pytań, zwrot darmowy. Odsyłka po mojej stronie." },
  { n: "03", t: "potłukło się? *moja sprawa*", d: "Zwracam koszty, wysyłam nową, reklamuję u kuriera sama." },
  { n: "04", t: "każda sztuka *sygnowana*", d: "Znak AK od spodu. Kolekcja i numer edycji opisane w karcie produktu." },
];

export default function Zasady() {
  return (
    <PageShell>
      <PageHero
        eyebrow="04 / zasady"
        title="tak */* nie"
        lead="Zasady pracowni Kręczkowska. *Krótko*, uczciwie, bez gwiazdek."
      />

      <Principles />

      {/* Gwarancje */}
      <section className="bg-cream border-b border-ink px-s5 md:px-s6 py-s6">
        <div className="grid grid-cols-12 gap-s4 mb-s5">
          <p className="caption col-span-12 md:col-span-2">GWARANCJE</p>
          <h2 className="col-span-12 md:col-span-10 font-display font-medium text-display-l tracking-tight">
            <ItalicPlay text="*cztery* obietnice" />
          </h2>
        </div>
        <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-ink">
          {gwarancje.map((g, i) => (
            <li
              key={g.n}
              className={`p-s5 border-b border-ink ${
                i < gwarancje.length - 1 ? "md:border-r" : ""
              }`}
            >
              <span className="font-display font-medium text-display-s italic-accent">{g.n}</span>
              <h3 className="font-display font-medium text-display-s mt-s3">
                <ItalicPlay text={g.t} />
              </h3>
              <p className="italic-accent mt-s3 text-body-l">
                <ItalicPlay text={g.d} />
              </p>
            </li>
          ))}
        </ol>
      </section>

      {/* Wysyłka tabela */}
      <section className="bg-cream border-b border-ink px-s5 md:px-s6 py-s6">
        <div className="grid grid-cols-12 gap-s4 mb-s5">
          <p className="caption col-span-12 md:col-span-2">WYSYŁKA</p>
          <h2 className="col-span-12 md:col-span-10 font-display font-medium text-display-l tracking-tight">
            <ItalicPlay text="*kiedy* dojdzie" />
          </h2>
        </div>
        <dl className="grid grid-cols-1 md:grid-cols-3 border-t border-ink">
          <div className="p-s5 border-b md:border-b-0 md:border-r border-ink">
            <dt className="caption mb-s2">PRACE NA STANIE</dt>
            <dd className="font-display font-medium text-display-s">do 3 dni roboczych</dd>
            <p className="italic-accent mt-s3 text-body-m">Pakowanie i wysyłka tego samego lub następnego dnia po zamówieniu.</p>
          </div>
          <div className="p-s5 border-b md:border-b-0 md:border-r border-ink">
            <dt className="caption mb-s2">NA ZAMÓWIENIE (INDIVIDUAL)</dt>
            <dd className="font-display font-medium text-display-s">do 14 dni roboczych</dd>
            <p className="italic-accent mt-s3 text-body-m">Toczenie, suszenie, biskwit, szkliwienie, wypał — cały cykl od zera.</p>
          </div>
          <div className="p-s5">
            <dt className="caption mb-s2">ZAGRANICA</dt>
            <dd className="font-display font-medium text-display-s">
              <span className="italic-accent">indywidualnie</span>
            </dd>
            <p className="italic-accent mt-s3 text-body-m">Napisz przed zamówieniem — wyliczę koszt wysyłki pod kraj i wagę.</p>
          </div>
        </dl>
      </section>

      {/* FAQ */}
      <section className="bg-ink text-cream px-s5 md:px-s6 py-s6">
        <div className="grid grid-cols-12 gap-s4 mb-s5">
          <p className="caption col-span-12 md:col-span-2 opacity-70">FAQ</p>
          <h2 className="col-span-12 md:col-span-10 font-display font-medium text-display-l tracking-tight">
            <ItalicPlay text="*pytania*, które padają" />
          </h2>
        </div>
        <dl className="divide-y divide-cream/30 border-y border-cream/30">
          {faq.map((f) => (
            <div key={f.q} className="grid grid-cols-12 gap-s4 py-s4">
              <dt className="col-span-12 md:col-span-5 font-display font-medium text-display-s">
                <ItalicPlay text={f.q} />
              </dt>
              <dd className="col-span-12 md:col-span-7 italic-accent text-body-l">
                <ItalicPlay text={f.a} />
              </dd>
            </div>
          ))}
        </dl>
      </section>
    </PageShell>
  );
}
