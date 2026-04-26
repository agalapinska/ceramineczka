import Link from "next/link";
import { ItalicPlay } from "./ItalicPlay";

const steps = [
  {
    n: "I",
    name: "glina",
    desc: "Kamionka wydobywana pod Bolesławcem. *Plastyczna*, cierpliwa.",
    img: "https://images.unsplash.com/photo-1528283648649-33347faa5d9e?auto=format&fit=crop&w=1200&q=80",
  },
  {
    n: "II",
    name: "ogień",
    desc: "Piec gazowy, *1240°C*, atmosfera redukcyjna. Dzień i noc.",
    img: "https://images.unsplash.com/photo-1515405295579-ba7b45403062?auto=format&fit=crop&w=1200&q=80",
  },
  {
    n: "III",
    name: "szkliwo",
    desc: "Własne receptury. *Miód*, matowa biel, surowa glina.",
    img: "https://images.unsplash.com/photo-1617196038574-9a2b8a1b6f9e?auto=format&fit=crop&w=1200&q=80",
  },
];

export function Ingredients() {
  return (
    <section id="dziennik" className="bg-cream border-b border-ink">
      <div className="px-s5 md:px-s6 py-s6">
        <div className="flex items-end justify-between gap-s4">
          <div>
            <p className="caption">03 / z czego powstaje</p>
            <h2 className="font-display font-medium text-display-l mt-s2 max-w-3xl">
              <ItalicPlay text="trzy *składniki*, żadnych skrótów." />
            </h2>
          </div>
          <Link href="/dziennik" className="caption underline underline-offset-4 whitespace-nowrap">
            czytaj dziennik →
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 border-t border-ink">
        {steps.map((s, i) => (
          <article
            key={s.n}
            className={`flex flex-col ${i < steps.length - 1 ? "md:border-r border-ink" : ""}`}
          >
            <div className="aspect-[4/3] overflow-hidden">
              <img src={s.img} alt={s.name} className="w-full h-full object-cover" />
            </div>
            <div className="p-s5 flex-1 flex flex-col justify-between gap-s4">
              <div className="flex items-baseline justify-between">
                <span className="font-display font-medium text-6xl italic-accent">{s.n}</span>
                <span className="caption">składnik</span>
              </div>
              <div>
                <h3 className="font-display font-medium text-display-s">
                  <ItalicPlay text={`*${s.name}*`} />
                </h3>
                <p className="mt-s2 text-body-l italic-accent">
                  <ItalicPlay text={s.desc} />
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
