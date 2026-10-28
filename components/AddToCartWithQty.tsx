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
    <div className="flex flex-wrap items-stretch gap-s3">
      <div className="flex items-stretch border border-line" aria-label="Wybierz ilość">
        <button
          type="button"
          onClick={() => setQty((q) => Math.max(1, q - 1))}
          className="w-12 caption hover:bg-ink hover:text-paper transition-colors"
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
          className="w-12 caption hover:bg-ink hover:text-paper transition-colors"
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
        className="flex-1 inline-flex items-center justify-between gap-s4 border border-line bg-ink text-paper px-s4 py-[1.05rem] caption hover:bg-paper hover:text-ink transition-colors disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-ink disabled:hover:text-paper"
      >
        <span>
          {disabled
            ? (disabledLabel ?? "niedostępna")
            : added
              ? "Dodano ✓"
              : `Dodaj do koszyka · ${qty * product.cena} zł`}
        </span>
        <Icon name="arrow" className="w-5 h-5" />
      </button>
    </div>
  );
}
