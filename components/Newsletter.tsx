import { ItalicPlay } from "./ItalicPlay";

// Newsletter obsługiwany przez MailerLite. Żeby podpiąć realny formularz:
// 1. Załóż darmowe konto na mailerlite.com (do 1000 subskrybentów za darmo).
// 2. Utwórz Group "Ceramineczka" i Form typu "Embedded".
// 3. Z dashboardu skopiuj URL action formularza (na końcu ma /subscribe lub podobne).
// 4. Wstaw go do NEXT_PUBLIC_MAILERLITE_FORM_ACTION w .env.local i zrestartuj build.
const MAILERLITE_ACTION = process.env.NEXT_PUBLIC_MAILERLITE_FORM_ACTION;

export function Newsletter() {
  return (
    <section className="bg-ink text-cream">
      <div className="px-s5 md:px-s6 py-s7 grid grid-cols-1 md:grid-cols-12 gap-s5">
        <div className="md:col-span-7">
          <p className="caption opacity-70">04 / newsletter</p>
          <h2 className="font-display font-medium text-display-l mt-s2 leading-[0.9] tracking-tight">
            <ItalicPlay text="pierwszy *wiesz*, gdy wychodzi z pieca." />
          </h2>
          <p className="italic-accent text-body-l mt-s4 max-w-xl opacity-80">
            <ItalicPlay text="Biorąc wypał w dłonie czujesz, że *trzymasz coś*, co jest bliskie sercu — fragment ziemi." />
          </p>
        </div>
        <form
          action={MAILERLITE_ACTION || undefined}
          method={MAILERLITE_ACTION ? "post" : undefined}
          className="md:col-span-5 flex flex-col justify-end gap-s3"
        >
          <label className="caption opacity-70" htmlFor="newsletter-email">
            Twój email
          </label>
          <div className="flex border border-cream">
            <input
              id="newsletter-email"
              name="fields[email]"
              type="email"
              required
              placeholder="ty@dom.pl"
              className="flex-1 bg-transparent px-s3 py-s3 text-cream placeholder:text-cream/40 outline-none"
            />
            <button
              type="submit"
              className="border-l border-cream caption px-s4 hover:bg-cream hover:text-ink transition-colors"
            >
              zapisz →
            </button>
          </div>
          <p className="caption opacity-60">
            {MAILERLITE_ACTION
              ? "Max 1 mail / miesiąc — info o nowym wypale. Bez spamu."
              : "Newsletter wkrótce. Napisz tymczasem na agata.kreczkowska@gmail.com."}
          </p>
        </form>
      </div>
    </section>
  );
}
