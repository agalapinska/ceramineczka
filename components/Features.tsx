import { IconCard, type IconName } from "./ui";

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
            <IconCard
              icon={f.icon}
              index={String(i + 1).padStart(2, "0")}
              title={f.title}
              href={f.href}
            >
              {f.desc}
            </IconCard>
          </li>
        ))}
      </ul>
    </section>
  );
}
