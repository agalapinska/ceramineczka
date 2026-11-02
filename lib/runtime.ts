// Tryb wdrożenia. Statyczny eksport (GitHub Pages) nie ma serwera: brak API,
// więc płatność i formularze przechodzą na wiadomość e-mail.
export const IS_STATIC = process.env.NEXT_PUBLIC_STATIC_EXPORT === "1";
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
export const SHOP_EMAIL = "sklep@ceramineczka.pl";

export function mailtoHref(subject: string, body: string, to = SHOP_EMAIL) {
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
