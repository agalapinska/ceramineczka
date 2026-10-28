import { PageShell } from "@/components/PageShell";
import { PageHero } from "@/components/PageHero";
import { Principles } from "@/components/Principles";
import { ItalicPlay } from "@/components/ItalicPlay";
import { Icon, IconCard, SectionHead, type IconName } from "@/components/ui";

export const metadata = { title: "Zasady · Ceramineczka" };

const faq = [
  {
    q: "Dlaczego ceramika jest droższa niż w sieciówce?",
    a: "Bo robiona przez jedną osobę, z jednej gliny, w jednym piecu. *18 godzin* wypału na sztukę. Nie skaluje się i nie ma skalować.",
  },
  {
    q: "Czy można myć w zmywarce?",
    a: "Tak, ale ja nie polecam. Szkliwo i glina *pracują* w temperaturach domowych dłużej żyją. Ręcznie, letnia woda, miękka gąbka.",
  },
  {
    q: "Co jeśli pęknie?",
    a: "Wymieniam bez pytań, jeśli to wada produkcyjna (do 14 dni). Jeśli pękło w użyciu — *kintsugi* za 80 zł, robię sama.",
  },
  {
    q: "Kiedy następny wypał?",
    a: "Zazwyczaj co *3 tygodnie*. Dokładny termin zawsze w dzienniku i newsletterze.",
  },
];

const gwarancje: { icon: IconName; t: string; d: string }[] = [
  { icon: "clock", t: "14 dni na zwrot", d: "Bez pytań, jeśli pudełko nie jest rozpakowane brutalnie." },
  { icon: "stamp", t: "Każda sztuka sygnowana", d: "Litera C pod dnem. Numer partii w środku." },
  { icon: "box", t: "Wysyłka we wtorki", d: "Pakowane w słomę i karton. Zero plastiku." },
  { icon: "leaf", t: "Kintsugi na całe życie", d: "Jeśli coś pęknie — naprawiam. Złotą spoiną." },
];

export default function Zasady() {
  return (
    <PageShell>
      <PageHero
        eyebrow="04 / zasady"
        title="Tak / nie."
        lead="Zasady pracowni. Krótko, na ścianie, obok pieca."
      />

      <Principles />

      {/* Gwarancje */}
      <section className="border-b border-line">
        <SectionHead eyebrow="Gwarancje" title="Cztery obietnice." />
        <div className="overflow-hidden">
          <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 -mr-px -mb-px">
            {gwarancje.map((g, i) => (
              <li key={g.t} className="border-r border-b border-line">
                <IconCard icon={g.icon} index={String(i + 1).padStart(2, "0")} title={g.t}>
                  {g.d}
                </IconCard>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-b border-line">
        <SectionHead eyebrow="FAQ" title="Pytania, które padają." />
        <div>
          {faq.map((f, i) => (
            <details key={f.q} className="group border-b border-line last:border-b-0" open={i === 0}>
              <summary className="list-none cursor-pointer px-s4 md:px-s6 py-s4 md:py-s5 flex items-center justify-between gap-s4 [&::-webkit-details-marker]:hidden">
                <span className="flex items-baseline gap-s4">
                  <span className="caption text-ink-60">{String(i + 1).padStart(2, "0")}</span>
                  <span className="font-display font-medium text-[1.125rem] md:text-display-s">{f.q}</span>
                </span>
                <span className="hairline inline-flex w-10 h-10 md:w-11 md:h-11 shrink-0 items-center justify-center transition-transform group-open:rotate-90">
                  <Icon name="arrow" className="w-5 h-5" />
                </span>
              </summary>
              <p className="px-s4 md:px-s6 pb-s5 md:pl-[5.5rem] text-body-m md:text-body-l text-ink-60 max-w-3xl">
                <ItalicPlay text={f.a} />
              </p>
            </details>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
