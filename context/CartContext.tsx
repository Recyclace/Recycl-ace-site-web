"use client";
import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from "react";

export type CartItem = {
  key: string;        // productId + color
  productId: string;
  slug: string;
  name: string;
  price: number;      // en euros
  color: string;
  colorHex: string;
  image: string;
  qty: number;
};

type CartCtx = {
  items: CartItem[];
  count: number;
  subtotal: number;
  isOpen: boolean;
  open: () => void;
  close: () => void;
  add: (item: Omit<CartItem, "key" | "qty">, qty?: number) => void;
  remove: (key: string) => void;
  setQty: (key: string, qty: number) => void;
  clear: () => void;
};

const CartContext = createContext<CartCtx | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("ra_cart");
      if (raw) setItems(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    try { localStorage.setItem("ra_cart", JSON.stringify(items)); } catch {}
  }, [items]);

  const add: CartCtx["add"] = (item, qty = 1) => {
    const key = `${item.productId}__${item.color}`;
    setItems((prev) => {
      const found = prev.find((i) => i.key === key);
      if (found) return prev.map((i) => (i.key === key ? { ...i, qty: i.qty + qty } : i));
      return [...prev, { ...item, key, qty }];
    });
    setIsOpen(true);
  };

  const remove = (key: string) => setItems((p) => p.filter((i) => i.key !== key));
  const setQty = (key: string, qty: number) =>
    setItems((p) => p.map((i) => (i.key === key ? { ...i, qty: Math.max(1, qty) } : i)).filter((i) => i.qty > 0));
  const clear = () => setItems([]);

  const count = useMemo(() => items.reduce((s, i) => s + i.qty, 0), [items]);
  const subtotal = useMemo(() => items.reduce((s, i) => s + i.qty * i.price, 0), [items]);

  return (
    <CartContext.Provider
      value={{ items, count, subtotal, isOpen, open: () => setIsOpen(true), close: () => setIsOpen(false), add, remove, setQty, clear }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart doit être utilisé dans <CartProvider>");
  return ctx;
}
