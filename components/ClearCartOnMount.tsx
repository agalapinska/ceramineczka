"use client";

import { useEffect, useRef } from "react";
import { useCart } from "@/lib/cart";

export function ClearCartOnMount() {
  const { clear } = useCart();
  const done = useRef(false);
  useEffect(() => {
    if (done.current) return;
    done.current = true;
    clear();
  }, [clear]);
  return null;
}
