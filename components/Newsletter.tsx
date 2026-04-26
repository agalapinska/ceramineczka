import { ItalicPlay } from "./ItalicPlay";

export function Newsletter() {
  return (
    <section className="bg-ink text-cream">
      <div className="px-s5 md:px-s6 py-s7 grid grid-cols-1 md:grid-cols-12 gap-s5">
        <div className="md:col-span-7">
          <p className="caption opacity-70">04 / dziennik wypałów</p>
          <h2 className="font-display font-medium text-display-l mt-s2 leading-[0.9] tracking-tight">
            <ItalicPlay text="pierwszy *wiesz*, gdy wychodzi z pieca." />
          </h2>
        </div>
        <form className="md:col-span-5 flex flex-col justify-end gap-s3">
          <label className="caption opacity-70">Twój email</label>
          <div className="flex border border-cream">
            <input
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
            Max 1 mail/miesiąc — nowy wypał, nowe sztuki. Bez spamu.
          </p>
        </form>
      </div>
    </section>
  );
}
