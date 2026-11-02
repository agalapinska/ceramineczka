"use client";

import { useSearchParams } from "next/navigation";

export function CheckoutSessionId() {
  const id = useSearchParams().get("session_id");
  return id ? <p className="caption text-ink-60">numer sesji: {id}</p> : null;
}
