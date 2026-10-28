"use client";

import { useEffect, useState } from "react";
import { useCart, type CartItem } from "@/lib/cart";
import { Icon } from "./ui";

/**
 * Pasek „do koszyka” przyklejony do dołu ekranu na telefonie. Pokazuje się,
 * gdy główny przycisk zakupu (#buy-box) i stopka są poza ekranem.
 */
export function StickyBuyBar({
  product,
  disabled,
}: {
  product: Omit<CartItem, "qty">;
  disabled?: boolean;
}) {
  const { add } = useCart();
  const [visible, setVisible] = useState(false);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const targets = [document.getElementById("buy-box"), document.querySelector("footer")].filter(
      (el): el is HTMLElement => !!el
    );
    if (targets.length === 0) return;
    const onScreen = new Map<Element, boolean>();
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => onScreen.set(e.target, e.isIntersecting));
      setVisible(![...onScreen.values()].some(Boolean));
    });
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);

  if (disabled) return null;

  return (
    <div
      className={`md:hidden fixed inset-x-0 bottom-0 z-30 border-t border-line bg-paper px-s4 pt-s3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] flex items-center gap-s3 transition-transform duration-300 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
      aria-hidden={!visible}
    >
      <div className="min-w-0 flex-1">
        <p className="caption text-ink-60 truncate">{product.name}</p>
        <p className="font-display font-medium text-lg">{product.cena} zł</p>
      </div>
      <button
        type="button"
        tabIndex={visible ? 0 : -1}
        onClick={() => {
          add(product, 1);
          setAdded(true);
          setTimeout(() => setAdded(false), 1400);
        }}
        className="min-h-[3rem] inline-flex items-center gap-s3 border border-line bg-ink text-paper px-s4 caption"
      >
        {added ? "Dodano ✓" : "Do koszyka"}
        <Icon name="bag" className="w-5 h-5" />
      </button>
    </div>
  );
}
