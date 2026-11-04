import Link from "next/link";
import { ItalicPlay } from "./ItalicPlay";

const steps = [
  {
    n: "I",
    name: "glina",
    desc: "Sibelco WMS 2502 z serii *1240.design* — kamionka, uczy się pod ręką. Docelowo też *dzika* glina.",
    img: "/foto/ceramika-7.jpg",
  },
  {
    n: "II",
    name: "wypał",
    desc: "Raz w tygodniu wożę prace do *Ceramiqa* w Gdyni. Wtorek — zawiozę i odbiorę.",
    img: "/foto/ceramika-5.jpg",
  },
  {
    n: "III",
    name: "szkliwo",
    desc: "*Mayco* i *Amaco* — food-safe, z kartami właściwości. Kolory dobieram pod wzór kaszubski.",
    img: "/foto/ceramika-4.jpg",
  },
];

export function Ingredients() {
  return (
    <section id="skladniki" className="bg-cream border-b border-ink">
      <div className="px-s5 md:px-s6 py-s6">
        <div className="flex items-end justify-between gap-s4">
          <div>
            <p className="caption">03 / z czego powstaje</p>
            <h2 className="font-display font-medium text-display-l mt-s2 max-w-3xl">
              <ItalicPlay text="trzy *składniki*, żadnych skrótów." />
            </h2>
          </div>
          <Link href="/pracownia" className="caption underline underline-offset-4 whitespace-nowrap">
            cały proces →
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
