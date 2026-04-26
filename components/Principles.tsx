import Link from "next/link";
import { ItalicPlay } from "./ItalicPlay";

const yes = [
  "glina *kamionkowa* z polskiej kopalni",
  "szkliwa *food-safe* bez ołowiu",
  "wypały w *małych* partiach, 20–40 szt.",
  "każda sztuka *sygnowana* od spodu",
];
const no = [
  "produkcji *masowej* i odlewów gipsowych",
  "*testów* na zwierzętach (oczywiste)",
  "*plastiku* w pakowaniu — tylko karton i słoma",
  "*pośpiechu* — wypał trwa 18 godzin",
];

export function Principles() {
  return (
    <section className="bg-cream border-y border-ink">
      <div className="grid grid-cols-1 md:grid-cols-2 divide-x divide-ink">
        <div className="p-s5 md:p-s6">
          <p className="caption">TAK</p>
          <h3 className="font-display font-medium text-display-m mt-s2 mb-s5">
            <ItalicPlay text="Zasady *pracowni*" />
          </h3>
          <ul className="space-y-s3">
            {yes.map((t, i) => (
              <li key={i} className="flex items-baseline gap-s3 border-b border-ink pb-s3">
                <span className="caption">0{i + 1}</span>
                <span className="text-body-l">
                  <ItalicPlay text={t} />
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="p-s5 md:p-s6 bg-ink text-cream">
          <p className="caption">NIE</p>
          <h3 className="font-display font-medium text-display-m mt-s2 mb-s5">
            <ItalicPlay text="*Nigdy* w pracowni" />
          </h3>
          <ul className="space-y-s3">
            {no.map((t, i) => (
              <li key={i} className="flex items-baseline gap-s3 border-b border-cream/30 pb-s3">
                <span className="caption opacity-60">0{i + 1}</span>
                <span className="text-body-l">
                  <ItalicPlay text={t} />
                </span>
              </li>
            ))}
          </ul>
          <Link href="/zasady" className="mt-s5 inline-block border border-cream caption px-s4 py-s3 hover:bg-cream hover:text-ink transition-colors">
            wszystkie zasady & FAQ →
          </Link>
        </div>
      </div>
    </section>
  );
}
