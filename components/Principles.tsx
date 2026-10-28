import { ItalicPlay } from "./ItalicPlay";
import { ButtonLink, Eyebrow } from "./ui";

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

function Column({ eyebrow, title, items }: { eyebrow: string; title: string; items: string[] }) {
  return (
    <div className="px-s4 md:px-s6 py-s6">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h3 className="mt-s4 mb-s5 font-display font-medium text-display-m">{title}</h3>
      <ul className="border-t border-line">
        {items.map((t, i) => (
          <li key={i} className="flex items-baseline gap-s4 border-b border-line py-s4">
            <span className="caption text-ink-60">{String(i + 1).padStart(2, "0")}</span>
            <span className="text-body-l first-letter:uppercase">
              <ItalicPlay text={t} />
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Principles({ showLink = false }: { showLink?: boolean }) {
  return (
    <section className="border-b border-line">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="border-b md:border-b-0 md:border-r border-line">
          <Column eyebrow="Tak" title="Zasady pracowni" items={yes} />
        </div>
        <div>
          <Column eyebrow="Nie" title="Nigdy w pracowni" items={no} />
        </div>
      </div>
      {showLink && (
        <div className="border-t border-line px-s4 md:px-s6 py-s5">
          <ButtonLink href="/zasady">Wszystkie zasady i FAQ</ButtonLink>
        </div>
      )}
    </section>
  );
}
