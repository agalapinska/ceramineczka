import { Eyebrow, Icon } from "./ui";

export function NewsletterForm() {
  return (
    <form className="flex flex-col gap-s3">
      <label htmlFor="newsletter-email" className="caption text-ink-60">
        Twój email
      </label>
      <div className="flex border border-line bg-paper">
        <input
          id="newsletter-email"
          type="email"
          required
          placeholder="ty@dom.pl"
          inputMode="email"
          autoComplete="email"
          className="flex-1 min-w-0 bg-transparent px-s4 py-[1.05rem] text-base md:text-body-m placeholder:text-ink-60 outline-none"
        />
        <button
          type="submit"
          className="border-l border-line caption px-s4 min-h-[3.25rem] inline-flex items-center gap-s3 hover:bg-ink hover:text-paper transition-colors"
        >
          Zapisz
          <Icon name="arrow" className="w-5 h-5" />
        </button>
      </div>
      <p className="caption text-ink-60 normal-case tracking-normal font-normal">
        Max 1 mail w miesiącu — nowy wypał, nowe sztuki. Bez spamu.
      </p>
    </form>
  );
}

export function Newsletter() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 border-b border-line">
      <div className="px-s4 md:px-s6 py-s6 border-b md:border-b-0 md:border-r border-line">
        <Eyebrow>Dziennik wypałów</Eyebrow>
        <h2 className="mt-s4 font-display font-medium text-display-m max-w-md">
          Nowy wypał prosto na Twoją skrzynkę.
        </h2>
      </div>
      <div className="px-s4 md:px-s6 py-s6 flex flex-col justify-end">
        <NewsletterForm />
      </div>
    </section>
  );
}
