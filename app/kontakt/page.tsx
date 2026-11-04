"use client";

import { useState } from "react";
import { PageShell } from "@/components/PageShell";
import { PageHero } from "@/components/PageHero";
import { ItalicPlay } from "@/components/ItalicPlay";

const EMAIL = "agata.kreczkowska@gmail.com";
// Jeśli masz publiczny link do rezerwacji w Google Calendar (Appointment schedule)
// wklej go do NEXT_PUBLIC_CALENDAR_BOOKING_URL w .env.local.
const CALENDAR_URL =
  process.env.NEXT_PUBLIC_CALENDAR_BOOKING_URL ||
  "https://calendar.google.com/calendar/u/0/appointments";

export default function Kontakt() {
  const [reason, setReason] = useState("zamówienie indywidualne");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const subject = `[Ceramineczka] ${reason}`;
  const body =
    `Imię: ${name || "—"}\n` +
    `Email: ${email || "—"}\n` +
    `Powód: ${reason}\n\n` +
    `${message}`;
  const mailtoHref =
    `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}` +
    `&body=${encodeURIComponent(body)}`;

  return (
    <PageShell>
      <PageHero
        eyebrow="05 / kontakt"
        title="napisz albo *umów* 20-min rozmowę"
        lead="Zamówienie indywidualne, pytanie o konkretną sztukę, rozmowa o projekcie — wszystko leci do mnie bezpośrednio."
      />

      {/* Split: form + calendar */}
      <section className="grid grid-cols-1 md:grid-cols-2 border-b border-ink">
        {/* Form */}
        <div className="p-s5 md:p-s6 border-r border-ink">
          <p className="caption mb-s3">01 · NAPISZ</p>
          <h2 className="font-display font-medium text-display-m mb-s5 tracking-tight">
            <ItalicPlay text="*formularz* kontaktowy" />
          </h2>
          <form
            action={mailtoHref}
            method="post"
            encType="text/plain"
            className="flex flex-col gap-s4"
            onSubmit={(e) => {
              // Mailto nie wysyła bez interakcji — otwiera klienta pocztowego.
              // Nic specjalnego tu nie robimy, przeglądarka wywoła mailto.
              if (!email || !message) {
                e.preventDefault();
              }
            }}
          >
            <label className="flex flex-col gap-s2">
              <span className="caption">Imię</span>
              <input
                required
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jak mam do Ciebie mówić?"
                className="bg-transparent border border-ink px-s3 py-s3 outline-none focus:bg-ink focus:text-cream"
              />
            </label>
            <label className="flex flex-col gap-s2">
              <span className="caption">Twój email</span>
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ty@dom.pl"
                className="bg-transparent border border-ink px-s3 py-s3 outline-none focus:bg-ink focus:text-cream"
              />
            </label>
            <label className="flex flex-col gap-s2">
              <span className="caption">Powód kontaktu</span>
              <select
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="bg-transparent border border-ink px-s3 py-s3 outline-none"
              >
                <option>zamówienie indywidualne</option>
                <option>pytanie o konkretną sztukę</option>
                <option>zwrot / reklamacja</option>
                <option>współpraca / prasa</option>
                <option>inne</option>
              </select>
            </label>
            <label className="flex flex-col gap-s2">
              <span className="caption">Wiadomość</span>
              <textarea
                required
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Piszę w sprawie..."
                className="bg-transparent border border-ink px-s3 py-s3 outline-none focus:bg-ink focus:text-cream"
              />
            </label>
            <button
              type="submit"
              className="self-start border border-ink bg-ink text-cream caption px-s5 py-s3 hover:bg-cream hover:text-ink transition-colors"
            >
              wyślij → otwiera Twój mail
            </button>
            <p className="caption text-ink-60">
              Formularz otworzy Twój program pocztowy z gotowym mailem do {" "}
              <a href={`mailto:${EMAIL}`} className="underline">{EMAIL}</a>.
            </p>
          </form>
        </div>

        {/* Sidebar: calendar booking + contact */}
        <div className="bg-ink text-cream p-s5 md:p-s6 flex flex-col gap-s6">
          <div>
            <p className="caption opacity-70 mb-s3">02 · 20-MIN ROZMOWA</p>
            <p className="font-display font-medium text-display-m leading-[0.95] tracking-tight">
              <ItalicPlay text="*porozmawiajmy* o projekcie" />
            </p>
            <p className="italic-accent text-body-l mt-s3 max-w-md opacity-80">
              <ItalicPlay text="Zamówienie *indywidualne*, zastawa, kubki z inicjałami, cokolwiek na miarę — zacznijmy od 20 minut przez Google Meet." />
            </p>
            <a
              href={CALENDAR_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-s4 inline-block border border-cream caption px-s5 py-s3 hover:bg-cream hover:text-ink transition-colors"
            >
              zarezerwuj 20 min ↗
            </a>
          </div>

          <div>
            <p className="caption opacity-70 mb-s3">03 · BEZPOŚREDNIO</p>
            <ul className="space-y-s2 text-body-l">
              <li>
                <span className="caption opacity-60">mail · </span>
                <a href={`mailto:${EMAIL}`} className="italic-accent underline">
                  {EMAIL}
                </a>
              </li>
              <li>
                <span className="caption opacity-60">instagram · </span>
                <a
                  href="https://www.instagram.com/ceramineczka/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="italic-accent underline"
                >
                  @ceramineczka ↗
                </a>
              </li>
              <li>
                <span className="caption opacity-60">pracownia · </span>
                <span className="italic-accent">Gdynia</span>
              </li>
            </ul>
          </div>

          <div>
            <p className="caption opacity-70 mb-s3">04 · CZAS ODPOWIEDZI</p>
            <p className="italic-accent text-body-l max-w-md opacity-80">
              <ItalicPlay text="Zwykle *do 48 godzin*. W dzień wypału (wtorek) bywa, że odpiszę wieczorem." />
            </p>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
