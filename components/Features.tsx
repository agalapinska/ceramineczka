import Link from "next/link";
import { ArrowBox, Dash, IconBox, type IconName } from "./ui";

const features: { icon: IconName; title: string; desc: string; href: string }[] = [
  {
    icon: "hand",
    title: "Toczone ręcznie",
    desc: "Każda sztuka powstaje na kole w pracowni na Pradze. Żadnych odlewów.",
    href: "/pracownia",
  },
  {
    icon: "flame",
    title: "Małe wypały",
    desc: "20–40 sztuk w partii. 18 godzin w piecu, 1240°C.",
    href: "/dziennik",
  },
  {
    icon: "drop",
    title: "Szkliwa food-safe",
    desc: "Własne receptury bez ołowiu. Bezpieczne na co dzień.",
    href: "/zasady",
  },
  {
    icon: "stamp",
    title: "Sygnowane sztuki",
    desc: "Litera C pod dnem i numer partii. Każdy egzemplarz jest jeden.",
    href: "/sklep",
  },
];

export function Features() {
  return (
    <section className="border-b border-line overflow-hidden">
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 -mr-px -mb-px">
        {features.map((f, i) => (
          <li key={f.title} className="border-r border-b border-line">
            <Link href={f.href} className="group h-full p-s4 md:p-s5 flex flex-col">
              <IconBox name={f.icon} />
              <p className="caption mt-s5">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="label-title mt-s3">{f.title}</h3>
              <Dash className="mt-s4" />
              <div className="mt-s4 flex-1 flex items-end justify-between gap-s4">
                <p className="text-body-m text-ink-60 max-w-[15rem]">{f.desc}</p>
                <ArrowBox />
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
