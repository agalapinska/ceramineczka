import { ItalicPlay } from "./ItalicPlay";
import { Dash, IconBox, SectionHead, TextLink, type IconName } from "./ui";

const steps: { n: string; name: string; icon: IconName; desc: string; img: string }[] = [
  {
    n: "I",
    name: "Glina",
    icon: "hand",
    desc: "Kamionka wydobywana pod Bolesławcem. *Plastyczna*, cierpliwa.",
    img: "https://images.unsplash.com/photo-1528283648649-33347faa5d9e?auto=format&fit=crop&w=1200&q=80",
  },
  {
    n: "II",
    name: "Ogień",
    icon: "flame",
    desc: "Piec gazowy, *1240°C*, atmosfera redukcyjna. Dzień i noc.",
    img: "https://images.unsplash.com/photo-1515405295579-ba7b45403062?auto=format&fit=crop&w=1200&q=80",
  },
  {
    n: "III",
    name: "Szkliwo",
    icon: "drop",
    desc: "Własne receptury. *Miód*, matowa biel, surowa glina.",
    img: "https://images.unsplash.com/photo-1617196038574-9a2b8a1b6f9e?auto=format&fit=crop&w=1200&q=80",
  },
];

export function Ingredients() {
  return (
    <section id="dziennik" className="border-b border-line">
      <SectionHead
        eyebrow="Z czego powstaje"
        title="Trzy składniki, żadnych skrótów."
        action={<TextLink href="/dziennik">Czytaj dziennik</TextLink>}
      />
      <div className="overflow-hidden">
        <ul className="grid grid-cols-1 md:grid-cols-3 -mr-px -mb-px">
          {steps.map((s) => (
            <li key={s.n} className="border-r border-b border-line p-s4 flex flex-col">
              <div className="inset-photo relative aspect-[4/3]">
                <img src={s.img} alt={s.name} className="absolute inset-0" />
              </div>
              <div className="mt-s4 flex items-start justify-between gap-s4">
                <div>
                  <p className="caption text-ink-60">{s.n} · składnik</p>
                  <h3 className="label-title mt-s3">{s.name}</h3>
                </div>
                <IconBox name={s.icon} />
              </div>
              <Dash className="mt-s4" />
              <p className="mt-s4 text-body-m text-ink-60">
                <ItalicPlay text={s.desc} />
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
