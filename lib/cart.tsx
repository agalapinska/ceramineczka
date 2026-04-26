"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type CartItem = {
  numer: string;
  slug: string;
  name: string;
  cena: number;
  typ: string;
  zdjecie?: string;
  qty: number;
};

type CartState = {
  items: CartItem[];
  count: number;
  total: number;
  add: (item: Omit<CartItem, "qty">, qty?: number) => void;
  remove: (numer: string) => void;
  setQty: (numer: string, qty: number) => void;
  clear: () => void;
};

const STORAGE_KEY = "ceramineczka.cart.v1";

const CartContext = createContext<CartState | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  const value = useMemo<CartState>(() => {
    const count = items.reduce((s, i) => s + i.qty, 0);
    const total = items.reduce((s, i) => s + i.qty * i.cena, 0);
    return {
      items,
      count,
      total,
      add: (item, qty = 1) =>
        setItems((prev) => {
          const found = prev.find((p) => p.numer === item.numer);
          if (found) {
            return prev.map((p) =>
              p.numer === item.numer ? { ...p, qty: p.qty + qty } : p,
            );
          }
          return [...prev, { ...item, qty }];
        }),
      remove: (numer) => setItems((prev) => prev.filter((p) => p.numer !== numer)),
      setQty: (numer, qty) =>
        setItems((prev) =>
          qty <= 0
            ? prev.filter((p) => p.numer !== numer)
            : prev.map((p) => (p.numer === numer ? { ...p, qty } : p)),
        ),
      clear: () => setItems([]),
    };
  }, [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartState {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
