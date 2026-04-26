"use client";

import { useState } from "react";
import { useCart, type CartItem } from "@/lib/cart";

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
        "border border-ink px-s3 py-s2 caption hover:bg-ink hover:text-cream transition-colors"
      }
      aria-label={`Dodaj ${product.name} do koszyka`}
    >
      {added ? "dodano ✓" : "do koszyka"}
    </button>
  );
}
