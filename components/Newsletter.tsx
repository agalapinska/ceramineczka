import { NewsletterForm } from "./NewsletterForm";
import { Eyebrow } from "./ui";

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
        <NewsletterForm zrodlo="kontakt" />
      </div>
    </section>
  );
}
