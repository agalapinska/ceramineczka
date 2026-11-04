"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/lib/cart";
import { photoForProduct } from "@/lib/photos";

// Płatności chwilowo wyłączone — ruszamy sprzedaż na początku 2026.
// Jak będziesz gotowa, ustaw NEXT_PUBLIC_PAYMENTS_ENABLED="true" + klucze Stripe.
const PAYMENTS_ENABLED = process.env.NEXT_PUBLIC_PAYMENTS_ENABLED === "true";

export function CartView() {
  const { items, total, count, setQty, remove } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleCheckout() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({ numer: i.numer, qty: i.qty })),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error ?? "Nie udało się rozpocząć płatności.");
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error("Brak adresu sesji Stripe.");
      }
    } catch (e: any) {
      setError(e.message ?? "Coś poszło nie tak.");
      setLoading(false);
    }
  }

  if (count === 0) {
    return (
      <section className="bg-cream border-b border-ink px-s5 py-s7">
        <div className="max-w-xl">
          <p className="text-body-l mb-s4">Koszyk jest pusty.</p>
          <Link
            href="/sklep"
            className="inline-block border border-ink px-s4 py-s3 caption hover:bg-ink hover:text-cream transition-colors"
          >
            wróć do sklepu
          </Link>
        </div>
      </section>
    );
  }

  const inquiryLines = [
    "Dzień dobry,",
    "",
    "chciał/a bym zamówić:",
    ...items.map(
      (i) => `· ${i.qty}× ${i.name} (${i.numer}) — ${i.cena} zł/szt. = ${i.cena * i.qty} zł`,
    ),
    "",
    `Razem produkty: ${total} zł`,
    "",
    "Proszę o informacje o płatności i wysyłce.",
    "",
    "Pozdrawiam,",
  ].join("\n");
  const mailto =
    `mailto:agata.kreczkowska@gmail.com` +
    `?subject=${encodeURIComponent("[Ceramineczka] zapytanie o zamówienie")}` +
    `&body=${encodeURIComponent(inquiryLines)}`;

  return (
    <section className="bg-cream border-b border-ink grid md:grid-cols-[1fr_360px]">
      <ul className="border-r border-ink">
        {items.map((it) => (
          <li
            key={it.numer}
            className="border-b border-ink px-s5 py-s4 flex items-start gap-s4"
          >
            <Link
              href={`/sklep/${it.slug}`}
              className="shrink-0 w-24 h-24 md:w-28 md:h-28 border border-ink flex items-center justify-center bg-cream"
              aria-label={`Zobacz ${it.name}`}
            >
              <img
                src={photoForProduct(it)}
                alt={it.name}
                className="max-h-full max-w-full object-contain mix-blend-multiply p-s2"
              />
            </Link>
            <div className="flex-1">
              <div className="caption mb-s2">
                {it.numer} · {it.typ}
              </div>
              <h3 className="font-display font-medium text-display-s mb-s3">
                <Link href={`/sklep/${it.slug}`} className="hover:italic">
                  {it.name}
                </Link>
              </h3>
              <div className="flex items-center gap-s3 caption">
                <button
                  className="border border-ink w-7 h-7 hover:bg-ink hover:text-cream transition-colors"
                  onClick={() => setQty(it.numer, it.qty - 1)}
                  aria-label="Zmniejsz"
                >
                  −
                </button>
                <span className="min-w-[2ch] text-center">{it.qty}</span>
                <button
                  className="border border-ink w-7 h-7 hover:bg-ink hover:text-cream transition-colors"
                  onClick={() => setQty(it.numer, it.qty + 1)}
                  aria-label="Zwiększ"
                >
                  +
                </button>
                <button
                  className="ml-s4 underline italic-accent"
                  onClick={() => remove(it.numer)}
                >
                  usuń
                </button>
              </div>
            </div>
            <div className="text-right">
              <div className="font-display font-medium text-xl">{it.cena * it.qty} zł</div>
              {it.qty > 1 && (
                <div className="caption text-ink-60">{it.cena} zł / szt.</div>
              )}
            </div>
          </li>
        ))}
      </ul>

      <aside className="px-s5 py-s5">
        <h2 className="font-display font-medium text-display-s mb-s4">podsumowanie</h2>
        <dl className="space-y-s2 text-body-m mb-s4">
          <div className="flex justify-between">
            <dt>suma częściowa</dt>
            <dd>{total} zł</dd>
          </div>
          <div className="flex justify-between">
            <dt>wysyłka</dt>
            <dd className="italic-accent">darmowa</dd>
          </div>
          <div className="flex justify-between border-t border-ink pt-s3 font-display font-medium text-xl">
            <dt>razem</dt>
            <dd>{total} zł</dd>
          </div>
        </dl>

        {error && (
          <p className="caption text-ink mb-s3 border border-ink p-s3 bg-cream">{error}</p>
        )}

        {PAYMENTS_ENABLED ? (
          <button
            onClick={handleCheckout}
            disabled={loading}
            className="w-full bg-ink text-cream px-s4 py-s3 caption hover:opacity-80 transition-opacity disabled:opacity-50"
          >
            {loading ? "przekierowywanie…" : "zapłać przez Stripe"}
          </button>
        ) : (
          <>
            <div className="border border-ink bg-cream p-s3 caption mb-s3">
              Sprzedaż startuje <span className="italic-accent">na początku 2026</span>. Na razie zbieram zapytania mailowo — odezwę się z informacją o płatności i wysyłce.
            </div>
            <a
              href={mailto}
              className="block text-center w-full bg-ink text-cream px-s4 py-s3 caption hover:opacity-80 transition-opacity"
            >
              wyślij zapytanie mailem →
            </a>
          </>
        )}

        <Link
          href="/sklep"
          className="block text-center mt-s3 caption underline italic-accent"
        >
          wróć do sklepu
        </Link>

        <p className="caption text-ink-60 mt-s5 leading-relaxed">
          Darmowa dostawa w Polsce. Prace na stanie: do 3 dni roboczych.
          Na zamówienie: do 14. Zagranica — koszt ustalę indywidualnie.
        </p>
      </aside>
    </section>
  );
}
