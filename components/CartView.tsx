"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/lib/cart";
import { photoForProduct } from "@/lib/photos";
import { Photo } from "./Photo";
import { ButtonLink, Eyebrow, Icon, TextLink } from "./ui";

const SHIPPING_PLN = 19;

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
      <section className="border-b border-line px-s4 md:px-s6 py-s7">
        <div className="max-w-xl">
          <p className="text-body-l mb-s5">Koszyk jest pusty.</p>
          <ButtonLink href="/sklep">Wróć do sklepu</ButtonLink>
        </div>
      </section>
    );
  }

  const shipping = SHIPPING_PLN;
  const grand = total + shipping;

  return (
    <section className="border-b border-line grid grid-cols-1 md:grid-cols-[1fr_24rem]">
      <ul className="border-b md:border-b-0 md:border-r border-line">
        {items.map((it) => (
          <li
            key={it.numer}
            className="border-b border-line last:border-b-0 p-s4 md:px-s6 flex items-start gap-s4"
          >
            <Link
              href={`/sklep/${it.slug}`}
              className="inset-photo relative shrink-0 w-24 h-24 md:w-32 md:h-32"
              aria-label={`Zobacz ${it.name}`}
            >
              <Photo src={photoForProduct(it)} alt={it.name} sizes="128px" />
            </Link>
            <div className="flex-1 min-w-0">
              <div className="caption text-ink-60 mb-s2">
                {it.numer} · {it.typ}
              </div>
              <h3 className="label-title text-[1rem] sm:text-display-s mb-s2 sm:mb-s4">
                <Link href={`/sklep/${it.slug}`} className="hover:opacity-60 transition-opacity">
                  {it.name}
                </Link>
              </h3>
              <p className="sm:hidden font-display font-medium text-lg mb-s3">
                {it.cena * it.qty} zł
              </p>
              <div className="flex flex-wrap items-center gap-s4 caption">
                <div className="flex items-stretch border border-line">
                <button
                  className="w-11 h-11 sm:w-9 sm:h-9 hover:bg-ink hover:text-paper transition-colors"
                  onClick={() => setQty(it.numer, it.qty - 1)}
                  aria-label="Zmniejsz"
                >
                  −
                </button>
                <span className="w-10 sm:w-9 border-x border-line inline-flex items-center justify-center">{it.qty}</span>
                <button
                  className="w-11 h-11 sm:w-9 sm:h-9 hover:bg-ink hover:text-paper transition-colors"
                  onClick={() => setQty(it.numer, it.qty + 1)}
                  aria-label="Zwiększ"
                >
                  +
                </button>
                </div>
                <button
                  className="py-s2 underline underline-offset-4 text-ink-60 hover:text-ink transition-colors"
                  onClick={() => remove(it.numer)}
                >
                  usuń
                </button>
              </div>
            </div>
            <div className="hidden sm:block text-right">
              <div className="font-display font-medium text-xl">{it.cena * it.qty} zł</div>
              {it.qty > 1 && (
                <div className="caption text-ink-60">{it.cena} zł / szt.</div>
              )}
            </div>
          </li>
        ))}
      </ul>

      <aside className="px-s4 md:px-s5 py-s6 pb-[calc(var(--space-6)+env(safe-area-inset-bottom))] md:pb-s6">
        <Eyebrow className="mb-s4">Podsumowanie</Eyebrow>
        <dl className="border-t border-line text-body-m mb-s5">
          <div className="flex justify-between border-b border-line py-s3">
            <dt className="text-ink-60">Suma częściowa</dt>
            <dd>{total} zł</dd>
          </div>
          <div className="flex justify-between border-b border-line py-s3">
            <dt className="text-ink-60">Wysyłka (paczkomat)</dt>
            <dd>{shipping} zł</dd>
          </div>
          <div className="flex justify-between border-b border-line py-s3 font-display font-medium text-xl">
            <dt>Razem</dt>
            <dd>{grand} zł</dd>
          </div>
        </dl>

        {error && (
          <p className="text-body-m mb-s3 border border-line p-s3">
            {error}
          </p>
        )}

        <button
          onClick={handleCheckout}
          disabled={loading}
          className="w-full inline-flex items-center justify-between gap-s4 border border-line bg-ink text-paper px-s4 py-[1.05rem] caption hover:bg-paper hover:text-ink transition-colors disabled:opacity-50"
        >
          <span>{loading ? "Przekierowywanie…" : "Zapłać przez Stripe"}</span>
          <Icon name="arrow" className="w-5 h-5" />
        </button>

        <div className="mt-s4">
          <TextLink href="/sklep">Wróć do sklepu</TextLink>
        </div>

        <p className="text-body-m text-ink-60 mt-s5">
          Płatność realizowana przez Stripe. Wysyłka po opłaceniu zamówienia.
          Czas wypału — do 7 dni roboczych.
        </p>
      </aside>
    </section>
  );
}
