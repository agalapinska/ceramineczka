// Wspólne dla formularzy (klient) i API (serwer) — bez zależności od Notion.
export const POWODY = [
  "zamówienie indywidualne",
  "wizyta w pracowni",
  "współpraca / prasa",
  "pytanie o konkretną sztukę",
] as const;

export const ZRODLA = ["strona główna", "kontakt", "inne"] as const;
export type Zrodlo = (typeof ZRODLA)[number];
