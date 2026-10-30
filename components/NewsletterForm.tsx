"use client";

import { useId, type FormEvent } from "react";
import type { Zrodlo } from "@/lib/form-options";
import { Icon } from "./ui";
import { useFormSubmit } from "./useFormSubmit";

export function NewsletterForm({ zrodlo = "inne" }: { zrodlo?: Zrodlo }) {
  const id = useId();
  const { state, submit } = useFormSubmit("/api/newsletter");
  const sending = state.status === "sending";

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    await submit({ email: fd.get("email"), website: fd.get("website"), zrodlo });
  }

  if (state.status === "success") {
    return (
      <div className="border border-line p-s4" role="status">
        <p className="caption">{state.already ? "Już jesteś na liście" : "Zapisano ✓"}</p>
        <p className="mt-s2 text-body-m text-ink-60">
          {state.already
            ? "Ten adres jest już zapisany. Napiszę, gdy wyjdzie nowy wypał."
            : "Dzięki! Napiszę, gdy z pieca wyjdzie nowy wypał."}
        </p>
      </div>
    );
  }

  return (
    <form className="flex flex-col gap-s3" onSubmit={onSubmit}>
      <label htmlFor={`${id}-email`} className="caption text-ink-60">
        Twój email
      </label>
      <div className="flex border border-line bg-paper">
        <input
          id={`${id}-email`}
          name="email"
          type="email"
          required
          placeholder="ty@dom.pl"
          inputMode="email"
          autoComplete="email"
          disabled={sending}
          aria-invalid={state.status === "error" || undefined}
          aria-describedby={`${id}-msg`}
          className="flex-1 min-w-0 bg-transparent px-s4 py-[1.05rem] text-base md:text-body-m placeholder:text-ink-60 outline-none"
        />
        {/* Honeypot — ukryte przed ludźmi */}
        <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
        <button
          type="submit"
          disabled={sending}
          className="border-l border-line caption px-s4 min-h-[3.25rem] inline-flex items-center gap-s3 hover:bg-ink hover:text-paper transition-colors disabled:opacity-60"
        >
          {sending ? "Zapisuję…" : "Zapisz"}
          <Icon name="arrow" className="w-5 h-5" />
        </button>
      </div>
      <p
        id={`${id}-msg`}
        aria-live="polite"
        className={`caption normal-case tracking-normal font-normal ${
          state.status === "error" ? "text-ink" : "text-ink-60"
        }`}
      >
        {state.status === "error"
          ? state.message
          : "Max 1 mail w miesiącu — nowy wypał, nowe sztuki. Bez spamu."}
      </p>
    </form>
  );
}
