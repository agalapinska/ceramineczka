"use client";

import { useState } from "react";
import { useCart, type CartItem } from "@/lib/cart";
import { Icon } from "./ui";

type Props = {
  product: Omit<CartItem, "qty">;
  className?: string;
};

export function AddToCartButton({ product, className }: Props) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);

  return (
    <button
      type="button"
      onClick={() => {
        add(product);
        setAdded(true);
        setTimeout(() => setAdded(false), 1400);
      }}
      className={
        className ??
        "w-full min-h-[2.75rem] inline-flex items-center justify-between gap-s2 border border-line px-s3 sm:px-s4 py-s2 sm:py-s3 caption hover:bg-ink hover:text-paper transition-colors"
      }
      aria-label={`Dodaj ${product.name} do koszyka`}
    >
      <span>{added ? "Dodano ✓" : "Do koszyka"}</span>
      <Icon name="bag" className="w-5 h-5 shrink-0" />
    </button>
  );
}
