import { PageShell } from "@/components/PageShell";
import { PageHero } from "@/components/PageHero";
import { Principles } from "@/components/Principles";
import { ItalicPlay } from "@/components/ItalicPlay";

export const metadata = { title: "Zasady · Ceramineczka" };

const faq = [
  {
    q: "*Dlaczego* ceramika jest droższa niż w sieciówce?",
    a: "Bo robiona przez jedną osobę, z jednej gliny, w jednym piecu. *18 godzin* wypału na sztukę. Nie skaluje się i nie ma skalować.",
  },
  {
    q: "Czy można *myć* w zmywarce?",
    a: "Tak, ale ja nie polecam. Szkliwo i glina *pracują* w temperaturach domowych dłużej żyją. Ręcznie, letnia woda, miękka gąbka.",
  },
  {
    q: "Co jeśli *pęknie*?",
    a: "Wymieniam bez pytań, jeśli to wada produkcyjna (do 14 dni). Jeśli pękło w użyciu — *kintsugi* za 80 zł, robię sama.",
  },
  {
    q: "Kiedy *następny* wypał?",
    a: "Zazwyczaj co *3 tygodnie*. Dokładny termin zawsze w dzienniku i newsletterze.",
  },
];

const gwarancje = [
  { n: "01", t: "14 dni na zwrot", d: "Bez pytań, jeśli pudełko nie jest rozpakowane brutalnie." },
  { n: "02", t: "Każda sztuka *sygnowana*", d: "Litera C pod dnem. Numer partii w środku." },
  { n: "03", t: "Wysyłka *we wtorki*", d: "Pakowane w słomę i karton. Zero plastiku." },
  { n: "04", t: "Kintsugi *na całe życie*", d: "Jeśli coś pęknie — naprawiam. Złotą spoiną." },
];

export default function Zasady() {
  return (
    <PageShell>
      <PageHero
        eyebrow="04 / zasady"
        title="tak */* nie"
        lead="Zasady pracowni. *Krótko*, na ścianie, obok pieca."
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
