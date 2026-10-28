import { NewsletterForm } from "./Newsletter";
import { Dash, Eyebrow, TextLink } from "./ui";

const stats = [
  { v: "1240°C", l: "temperatura wypału" },
  { v: "18 h", l: "trwa jeden wypał" },
];

/** Dolny wiersz z referencji: liczby po lewej, wezwanie do działania po prawej. */
export function StatsCta() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr] border-b border-line">
      <div className="px-s4 md:px-s6 py-s6 border-b md:border-b-0 md:border-r border-line flex flex-col">
        <Eyebrow>Pracownia w liczbach</Eyebrow>
        <div className="mt-s5 grid grid-cols-2 gap-s5 max-w-xl">
          {stats.map((s) => (
            <div key={s.l}>
              <p className="font-display text-display-l">{s.v}</p>
              <p className="caption mt-s3">{s.l}</p>
              <Dash className="mt-s4" />
            </div>
          ))}
        </div>
        <p className="mt-s5 text-body-m text-ink-60 max-w-md">
          Maksymalnie 40 sztuk w partii. Wypał co trzy tygodnie, w jednym piecu, przez jedną osobę.
        </p>
        <div className="mt-s5 md:mt-auto md:pt-s5">
          <TextLink href="/pracownia">Zobacz proces</TextLink>
        </div>
      </div>

      <div className="px-s4 md:px-s6 py-s6 flex flex-col">
        <Eyebrow>Następny wypał już wkrótce</Eyebrow>
        <h2 className="mt-s4 font-display font-medium text-display-m">
          Nowe sztuki prosto na Twoją skrzynkę.
        </h2>
        <div className="mt-s5">
          <NewsletterForm />
        </div>
      </div>
    </section>
  );
}
