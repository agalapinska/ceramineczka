import { Fragment } from "react";
import { PageShell } from "@/components/PageShell";
import { PageHero } from "@/components/PageHero";
import { Newsletter } from "@/components/Newsletter";
import { ItalicPlay } from "@/components/ItalicPlay";

export const metadata = { title: "Kontakt · Ceramineczka" };

const kontakty = [
  { rola: "sklep & zamówienia", adres: "sklep@ceramineczka.pl", czas: "odp. w 24h" },
  { rola: "pracownia & wizyty", adres: "pracownia@ceramineczka.pl", czas: "czw–sob, 10–18" },
  { rola: "prasa & współpraca", adres: "press@ceramineczka.pl", czas: "odp. w 48h" },
];

export default function Kontakt() {
  return (
    <PageShell>
      <PageHero
        eyebrow="05 / kontakt"
        title="napisz, *zadzwoń*, przyjdź"
        lead="Pracownia przy ul. *Brzeskiej 14* na warszawskiej Pradze. Wizyta zawsze po umówieniu."
      />

      {/* Split: form + address */}
      <section className="grid grid-cols-1 md:grid-cols-2 border-b border-ink">
        {/* Form */}
        <div className="p-s5 md:p-s6 border-r border-ink">
          <p className="caption mb-s3">01 · NAPISZ</p>
          <h2 className="font-display font-medium text-display-m mb-s5 tracking-tight">
            <ItalicPlay text="*zaplanujmy* rozmowę" />
          </h2>
          <form className="flex flex-col gap-s4">
            <label className="flex flex-col gap-s2">
              <span className="caption">Imię</span>
              <input
                required
                type="text"
                placeholder="Agata"
                className="bg-transparent border border-ink px-s3 py-s3 outline-none focus:bg-ink focus:text-cream"
              />
            </label>
            <label className="flex flex-col gap-s2">
              <span className="caption">Email</span>
              <input
                required
                type="email"
                placeholder="ty@dom.pl"
                className="bg-transparent border border-ink px-s3 py-s3 outline-none focus:bg-ink focus:text-cream"
              />
            </label>
            <label className="flex flex-col gap-s2">
              <span className="caption">Powód kontaktu</span>
              <select className="bg-transparent border border-ink px-s3 py-s3 outline-none">
                <option>zamówienie indywidualne</option>
                <option>wizyta w pracowni</option>
                <option>współpraca / prasa</option>
                <option>pytanie o konkretną sztukę</option>
              </select>
            </label>
            <label className="flex flex-col gap-s2">
              <span className="caption">Wiadomość</span>
              <textarea
                required
                rows={5}
                placeholder="Piszę w sprawie..."
                className="bg-transparent border border-ink px-s3 py-s3 outline-none focus:bg-ink focus:text-cream"
              />
            </label>
            <button
              type="submit"
              className="self-start border border-ink bg-ink text-cream caption px-s5 py-s3 hover:bg-cream hover:text-ink transition-colors"
            >
              wyślij →
            </button>
          </form>
        </div>

        {/* Sidebar: address + hours + socials */}
        <div className="bg-ink text-cream p-s5 md:p-s6 flex flex-col gap-s6">
          <div>
            <p className="caption opacity-70 mb-s3">02 · PRACOWNIA</p>
            <p className="font-display font-medium text-display-m leading-[0.95] tracking-tight">
              <ItalicPlay text="ul. Brzeska *14*" />
              <br />
              <ItalicPlay text="03-737 *Warszawa*" />
            </p>
            <p className="italic-accent text-body-l mt-s3 max-w-md">
              <ItalicPlay text="Praga-Północ, 5 min pieszo od Dw. *Warszawa Wschodnia*. Wejście od podwórka, drugie drzwi." />
            </p>
          </div>

          <div>
            <p className="caption opacity-70 mb-s3">03 · GODZINY</p>
            <dl className="grid grid-cols-2 gap-y-s2 text-body-l">
              {[
                ["pn–śr", "pracownia zamknięta"],
                ["czw–pt", "12:00 – 19:00"],
                ["sob", "10:00 – 16:00"],
                ["niedz", "zamknięte"],
              ].map(([d, h]) => (
                <Fragment key={d}>
                  <dt className="caption self-center">{d}</dt>
                  <dd className="italic-accent">{h}</dd>
                </Fragment>
              ))}
            </dl>
          </div>

          <div>
            <p className="caption opacity-70 mb-s3">04 · ZNAJDŹ MNIE</p>
            <ul className="flex flex-wrap gap-s3 caption">
              {["Instagram", "Pinterest", "TikTok", "Mail"].map((s) => (
                <li key={s}>
                  <a
                    href="#"
                    className="border border-cream px-s3 py-s2 hover:bg-cream hover:text-ink transition-colors"
                  >
                    {s} →
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Direct contact list */}
      <section className="bg-cream border-b border-ink">
        <div className="px-s5 md:px-s6 py-s6 grid grid-cols-12 gap-s4">
          <p className="caption col-span-12 md:col-span-2">MAILE BEZPOŚREDNIE</p>
          <div className="col-span-12 md:col-span-10 divide-y divide-ink border-y border-ink">
            {kontakty.map((k) => (
              <div key={k.adres} className="grid grid-cols-12 gap-s3 py-s4">
                <span className="col-span-12 md:col-span-4 caption self-center">{k.rola}</span>
                <a
                  href={`mailto:${k.adres}`}
                  className="col-span-12 md:col-span-5 font-display font-medium text-display-s hover:italic-accent"
                >
                  {k.adres}
                </a>
                <span className="col-span-12 md:col-span-3 italic-accent text-body-l self-center md:text-right">
                  {k.czas}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Newsletter />
    </PageShell>
  );
}
