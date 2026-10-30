"use client";

import type { FormEvent } from "react";
import { POWODY } from "@/lib/form-options";
import { Icon, buttonClass } from "./ui";
import { useFormSubmit } from "./useFormSubmit";

const field =
  "w-full bg-paper border border-line px-s4 py-[0.95rem] text-base md:text-body-m outline-none placeholder:text-ink-60 focus:bg-white disabled:opacity-60";

export function ContactForm() {
  const { state, submit, reset } = useFormSubmit("/api/kontakt");
  const sending = state.status === "sending";

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const ok = await submit(Object.fromEntries(new FormData(form)));
    if (ok) form.reset();
  }

  if (state.status === "success") {
    return (
      <div className="border border-line p-s5" role="status">
        <p className="caption">Wiadomość wysłana ✓</p>
        <p className="mt-s3 text-body-l max-w-md">
          Dziękuję! Odpowiem zwykle w ciągu 24 godzin, na adres podany w formularzu.
        </p>
        <button type="button" onClick={reset} className={buttonClass("outline", "mt-s5 w-full sm:w-auto")}>
          <span>Napisz kolejną</span>
          <Icon name="arrow" className="w-5 h-5" />
        </button>
      </div>
    );
  }

  return (
    <form className="flex flex-col gap-s4" onSubmit={onSubmit}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-s4">
        <label className="flex flex-col gap-s2">
          <span className="caption">Imię</span>
          <input
            name="imie"
            required
            maxLength={100}
            type="text"
            autoComplete="given-name"
            placeholder="Agata"
            disabled={sending}
            className={field}
          />
        </label>
        <label className="flex flex-col gap-s2">
          <span className="caption">Email</span>
          <input
            name="email"
            required
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="ty@dom.pl"
            disabled={sending}
            className={field}
          />
        </label>
      </div>
      <label className="flex flex-col gap-s2">
        <span className="caption">Powód kontaktu</span>
        <select name="powod" disabled={sending} className={field}>
          {POWODY.map((p) => (
            <option key={p}>{p}</option>
          ))}
        </select>
      </label>
      <label className="flex flex-col gap-s2">
        <span className="caption">Wiadomość</span>
        <textarea
          name="wiadomosc"
          required
          minLength={5}
          maxLength={2000}
          rows={5}
          placeholder="Piszę w sprawie..."
          disabled={sending}
          className={field}
        />
      </label>
      {/* Honeypot — ukryte przed ludźmi */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

      <p aria-live="polite" className="text-body-m empty:hidden">
        {state.status === "error" ? state.message : ""}
      </p>

      <button
        type="submit"
        disabled={sending}
        className={buttonClass("solid", "w-full sm:w-auto sm:self-start disabled:opacity-60")}
      >
        <span>{sending ? "Wysyłam…" : "Wyślij"}</span>
        <Icon name="arrow" className="w-5 h-5" />
      </button>
    </form>
  );
}
