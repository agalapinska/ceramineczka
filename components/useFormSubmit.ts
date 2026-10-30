"use client";

import { useState } from "react";

export type FormState =
  | { status: "idle" }
  | { status: "sending" }
  | { status: "success"; already?: boolean }
  | { status: "error"; message: string };

/** Wysyła JSON do endpointu API i zwraca stan formularza. */
export function useFormSubmit(endpoint: string) {
  const [state, setState] = useState<FormState>({ status: "idle" });

  async function submit(payload: Record<string, unknown>) {
    setState({ status: "sending" });
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error ?? "Coś poszło nie tak. Spróbuj ponownie.");
      setState({ status: "success", already: Boolean(data?.already) });
      return true;
    } catch (e) {
      setState({
        status: "error",
        message: e instanceof Error ? e.message : "Coś poszło nie tak. Spróbuj ponownie.",
      });
      return false;
    }
  }

  return { state, submit, reset: () => setState({ status: "idle" }) };
}
