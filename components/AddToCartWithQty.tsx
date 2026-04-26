"use client";

import { useState } from "react";
import { useCart, type CartItem } from "@/lib/cart";

type Props = {
  product: Omit<CartItem, "qty">;
  disabled?: boolean;
  disabledLabel?: string;
};

export function AddToCartWithQty({ product, disabled, disabledLabel }: Props) {
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  return (
    <div className="flex flex-wrap items-stretch gap-s3">
      <div
        className="flex items-stretch border border-ink"
        aria-label="Wybierz ilość"
      >
        <button
          type="button"
          onClick={() => setQty((q) => Math.max(1, q - 1))}
          className="px-s3 caption hover:bg-ink hover:text-cream transition-colors"
          aria-label="Zmniejsz ilość"
        >
          −
        </button>
        <span className="px-s3 self-center min-w-[2ch] text-center font-display">
          {qty}
        </span>
        <button
          type="button"
          onClick={() => setQty((q) => Math.min(10, q + 1))}
          className="px-s3 caption hover:bg-ink hover:text-cream transition-colors"
          aria-label="Zwiększ ilość"
        >
          +
        </button>
      </div>

      <button
        type="button"
        disabled={disabled}
        onClick={() => {
          add(product, qty);
          setAdded(true);
          setTimeout(() => setAdded(false), 1400);
        }}
        className="flex-1 bg-ink text-cream px-s4 py-s3 caption hover:opacity-80 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {disabled
          ? (disabledLabel ?? "niedostępna")
          : added
            ? "dodano ✓"
            : `dodaj do koszyka · ${qty * product.cena} zł`}
      </button>
    </div>
  );
}
