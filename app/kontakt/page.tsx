import { PageShell } from "@/components/PageShell";
import { PageHero } from "@/components/PageHero";
import { Newsletter } from "@/components/Newsletter";
import { Eyebrow, Icon, IconBox, SectionHead, buttonClass } from "@/components/ui";

export const metadata = { title: "Kontakt · Ceramineczka" };

const kontakty = [
  { rola: "sklep i zamówienia", adres: "sklep@ceramineczka.pl", czas: "odp. w 24h" },
  { rola: "pracownia i wizyty", adres: "pracownia@ceramineczka.pl", czas: "czw–sob, 10–18" },
  { rola: "prasa i współpraca", adres: "press@ceramineczka.pl", czas: "odp. w 48h" },
];

const godziny = [
  ["pn–śr", "pracownia zamknięta"],
  ["czw–pt", "12:00 – 19:00"],
  ["sob", "10:00 – 16:00"],
  ["niedz", "zamknięte"],
];

const field =
  "w-full bg-paper border border-line px-s4 py-[0.95rem] text-base md:text-body-m outline-none placeholder:text-ink-60 focus:bg-white";

export default function Kontakt() {
  return (
    <PageShell>
      <PageHero
        eyebrow="05 / kontakt"
        title="Napisz, zadzwoń, przyjdź."
        lead="Pracownia przy ul. Brzeskiej 14 na warszawskiej Pradze. Wizyta zawsze po umówieniu."
      />

      {/* Split: form + address */}
      <section className="grid grid-cols-1 md:grid-cols-[1.3fr_1fr] border-b border-line">
        {/* Form */}
        <div className="px-s4 md:px-s6 py-s6 border-b md:border-b-0 md:border-r border-line">
          <Eyebrow>01 · Napisz</Eyebrow>
          <h2 className="mt-s4 mb-s5 font-display font-medium text-display-m">Zaplanujmy rozmowę.</h2>
          <form className="flex flex-col gap-s4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-s4">
              <label className="flex flex-col gap-s2">
                <span className="caption">Imię</span>
                <input required type="text" autoComplete="given-name" placeholder="Agata" className={field} />
              </label>
              <label className="flex flex-col gap-s2">
                <span className="caption">Email</span>
                <input required type="email" inputMode="email" autoComplete="email" placeholder="ty@dom.pl" className={field} />
              </label>
            </div>
            <label className="flex flex-col gap-s2">
              <span className="caption">Powód kontaktu</span>
              <select className={field}>
                <option>zamówienie indywidualne</option>
                <option>wizyta w pracowni</option>
                <option>współpraca / prasa</option>
                <option>pytanie o konkretną sztukę</option>
              </select>
            </label>
            <label className="flex flex-col gap-s2">
              <span className="caption">Wiadomość</span>
              <textarea required rows={5} placeholder="Piszę w sprawie..." className={field} />
            </label>
            <button type="submit" className={buttonClass("solid", "w-full sm:w-auto sm:self-start")}>
              <span>Wyślij</span>
              <Icon name="arrow" className="w-5 h-5" />
            </button>
          </form>
        </div>

        {/* Sidebar: address + hours + socials */}
        <div className="flex flex-col">
          <div className="px-s4 md:px-s5 py-s6 border-b border-line flex gap-s4">
            <IconBox name="pin" />
            <div>
              <Eyebrow>02 · Pracownia</Eyebrow>
              <p className="mt-s3 font-display font-medium text-display-s">
                ul. Brzeska 14
                <br />
                03-737 Warszawa
              </p>
              <p className="mt-s3 text-body-m text-ink-60 max-w-sm">
                Praga-Północ, 5 min pieszo od Dw. Warszawa Wschodnia. Wejście od podwórka, drugie drzwi.
              </p>
            </div>
          </div>

          <div className="px-s4 md:px-s5 py-s6 border-b border-line flex gap-s4">
            <IconBox name="clock" />
            <div className="flex-1">
              <Eyebrow>03 · Godziny</Eyebrow>
              <dl className="mt-s3 border-t border-line">
                {godziny.map(([d, h]) => (
                  <div key={d} className="flex justify-between gap-s3 border-b border-line py-s2">
                    <dt className="caption self-center">{d}</dt>
                    <dd className="text-body-m text-ink-60">{h}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          <div className="px-s4 md:px-s5 py-s6">
            <Eyebrow>04 · Znajdź mnie</Eyebrow>
            <ul className="mt-s4 flex flex-wrap gap-s2 caption">
              {["Instagram", "Pinterest", "TikTok", "Mail"].map((s) => (
                <li key={s}>
                  <a
                    href="#"
                    className="inline-flex items-center gap-s2 border border-line px-s3 py-s2 hover:bg-ink hover:text-paper transition-colors"
                  >
                    {s}
                    <Icon name="arrow" className="w-4 h-4" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Direct contact list */}
      <section className="border-b border-line">
        <SectionHead eyebrow="Maile bezpośrednie" title="Napisz od razu do właściwej skrzynki." />
        <ul>
          {kontakty.map((k) => (
            <li key={k.adres} className="border-b border-line last:border-b-0">
              <a
                href={`mailto:${k.adres}`}
                className="group px-s4 md:px-s6 py-s5 grid grid-cols-1 md:grid-cols-[14rem_1fr_auto] items-center gap-s3 md:gap-s5 hover:bg-ink-20 transition-colors"
              >
                <span className="caption text-ink-60">{k.rola}</span>
                <span className="font-display font-medium text-display-s break-all">{k.adres}</span>
                <span className="flex items-center gap-s4">
                  <span className="text-body-m text-ink-60">{k.czas}</span>
                  <span className="hairline inline-flex w-11 h-11 items-center justify-center group-hover:bg-ink group-hover:text-paper transition-colors">
                    <Icon name="mail" className="w-5 h-5" />
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <Newsletter />
    </PageShell>
  );
}
