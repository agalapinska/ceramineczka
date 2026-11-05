import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { PageHero } from "@/components/PageHero";
import { ItalicPlay } from "@/components/ItalicPlay";

export const metadata = {
  title: "Wiki · Ceramineczka",
  description:
    "Notatki i ciekawostki z pracowni Kręczkowska: o glinie, szkliwach, kaszubskim hafcie, kulturze rękodzieła.",
};

const notatki = [
  {
    tag: "glina",
    tytul: "*Sibelco WMS 2502* — dlaczego ta kamionka",
    tresc:
      "Z serii 1240.design. Plastyczna, niska absorpcja po wypale, dobrze trzyma szkliwo. W przyszłości dołączę *dziką glinę* — chcę się nauczyć ją wydobywać i uzdatniać sama.",
  },
  {
    tag: "kaszuby",
    tytul: "*Kaszubski haft* — skąd czerpię wzory",
    tresc:
      "Siedem kolorów, siedem znaczeń. *Modern pomeranian folk* to współczesna interpretacja — kompozycja i ruch zostają, kolor i skala idą w minimalizm.",
  },
  {
    tag: "szkliwa",
    tytul: "*Mayco i Amaco* — co to i czemu nie własne receptury",
    tresc:
      "Oba producenci dają karty food-safe i powtarzalny efekt. Własnych receptur jeszcze nie robię — zbieram praktykę i obserwuję, jak szkliwa „grają\" z Sibelco.",
  },
  {
    tag: "wypał",
    tytul: "*1240°C* i dlaczego jeżdżę do Ceramiqa",
    tresc:
      "Nie mam własnego pieca. Raz w tygodniu, we wtorek, wiozę prace do Ceramiqa w Gdyni. Zawożę do szkliwienia, odbieram poprzedni wypał. To rytm, który ustala cały tydzień.",
  },
  {
    tag: "rękodzieło",
    tytul: "Czym *różni się* unikat od serii limitowanej",
    tresc:
      "Unikat = jedna sztuka, już się nie powtórzy. Seria limitowana = kilka–kilkanaście sztuk z jednego pomysłu. *Individual* = projektowane pod klienta (zastawy, inicjały, forma).",
  },
  {
    tag: "pielęgnacja",
    tytul: "*Zmywarka* a ręka — co lepsze?",
    tresc:
      "Zmywarka OK, ale szkliwo i glina żyją dłużej myte ręcznie, w letniej wodzie. Unikaj szoków termicznych — z lodówki wprost na gorącą płytę nigdy nie jest dobrym pomysłem.",
  },
];

export default function Wiki() {
  return (
    <PageShell>
      <PageHero
        eyebrow="03 / wiki"
        title="*notatki* z pracowni"
        lead="Krótkie teksty o tym, z czego powstaje ceramika i co kryje się za decyzjami w pracowni. *Zapis uczenia się*, nie dziennik."
      />

      <section className="bg-cream border-b border-ink">
        <ul className="grid grid-cols-1 md:grid-cols-2 border-t border-ink overflow-hidden -mr-px -mb-px">
          {notatki.map((n) => (
            <li
              key={n.tytul}
              className="p-s5 md:p-s6 border-b border-r border-ink"
            >
              <p className="caption mb-s3">{n.tag.toUpperCase()}</p>
              <h2 className="font-display font-medium text-display-s tracking-tight mb-s3">
                <ItalicPlay text={n.tytul} />
              </h2>
              <p className="italic-accent text-body-l max-w-prose">
                <ItalicPlay text={n.tresc} />
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-ink text-cream px-s5 md:px-s6 py-s7">
        <div className="grid grid-cols-12 gap-s4 items-end">
          <div className="col-span-12 md:col-span-8">
            <p className="caption opacity-70">PROCES NA ŻYWO</p>
            <h2 className="font-display font-medium text-display-l mt-s2 tracking-tight">
              <ItalicPlay text="*codzienny* dziennik — na Instagramie" />
            </h2>
            <p className="italic-accent text-body-l mt-s3 max-w-xl opacity-80">
              <ItalicPlay text="Toczenie, suszenie, szkliwienie, wypał — *zdjęcia i video* w rolkach. Tam najszybciej zobaczysz, co dziś wychodzi z pracowni." />
            </p>
          </div>
          <a
            href="https://www.instagram.com/ceramineczka/"
            target="_blank"
            rel="noopener noreferrer"
            className="col-span-12 md:col-span-4 md:text-right"
          >
            <span className="inline-block border border-cream caption px-s5 py-s3 hover:bg-cream hover:text-ink transition-colors">
              @ceramineczka ↗
            </span>
          </a>
        </div>
      </section>

      <section className="bg-cream border-b border-ink px-s5 md:px-s6 py-s6">
        <p className="caption mb-s3">CIEKAWI CIĘ WIĘCEJ?</p>
        <p className="italic-accent text-body-l max-w-prose mb-s4">
          <ItalicPlay text="Zbieram pytania, które najczęściej dostaję — odpowiedzi trafią do kolejnych notatek. *Podeślij* swoje:" />
        </p>
        <Link
          href="/kontakt"
          className="inline-block border border-ink px-s5 py-s3 caption hover:bg-ink hover:text-cream transition-colors"
        >
          formularz kontaktowy →
        </Link>
      </section>
    </PageShell>
  );
}
