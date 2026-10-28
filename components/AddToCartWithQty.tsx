"use client";

import { useState } from "react";
import { useCart, type CartItem } from "@/lib/cart";
import { Icon } from "./ui";

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
    <div className="flex items-stretch gap-s2 sm:gap-s3">
      <div className="flex items-stretch border border-line" aria-label="Wybierz ilość">
        <button
          type="button"
          onClick={() => setQty((q) => Math.max(1, q - 1))}
          className="w-11 sm:w-12 caption hover:bg-ink hover:text-paper transition-colors"
          aria-label="Zmniejsz ilość"
        >
          −
        </button>
        <span className="w-10 border-x border-line self-stretch inline-flex items-center justify-center font-display">
          {qty}
        </span>
        <button
          type="button"
          onClick={() => setQty((q) => Math.min(10, q + 1))}
          className="w-11 sm:w-12 caption hover:bg-ink hover:text-paper transition-colors"
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
        className="flex-1 min-w-0 min-h-[3.25rem] inline-flex items-center justify-between gap-s3 border border-line bg-ink text-paper px-s3 sm:px-s4 py-s3 caption hover:bg-paper hover:text-ink transition-colors disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-ink disabled:hover:text-paper"
      >
        <span>
          {disabled
            ? (disabledLabel ?? "niedostępna")
            : added
              ? "Dodano ✓"
              : (
                <>
                  <span className="hidden sm:inline">Dodaj do koszyka</span>
                  <span className="sm:hidden">Do koszyka</span>
                  {` · ${qty * product.cena} zł`}
                </>
              )}
        </span>
        <Icon name="arrow" className="hidden sm:block w-5 h-5 shrink-0" />
      </button>
    </div>
  );
}
