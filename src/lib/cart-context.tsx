'use client';

import { createContext, useContext, useState, useCallback, useEffect, useRef, ReactNode } from 'react';
import { getCart, createCart, addToCart, removeFromCart, type ShopifyCart } from '@/lib/shopify';

interface CartContext {
  cart: ShopifyCart | null;
  isOpen: boolean;
  isLoading: boolean;
  error: string | null;
  openCart: () => void;
  closeCart: () => void;
  addItem: (variantId: string, quantity?: number) => Promise<void>;
  removeItem: (lineId: string) => Promise<void>;
  totalQuantity: number;
}

const CartContext = createContext<CartContext | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<ShopifyCart | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);
  const busy = useRef(false);
  const current = useRef<ShopifyCart | null>(null);
  const restoration = useRef<Promise<void>>(Promise.resolve());
  const restorationError = useRef<Error | null>(null);
  const storageKey = 'jds-cart:' + (process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || '');

  const saveCart = useCallback((value: ShopifyCart | null) => {
    current.current = value;
    setCart(value);
    try {
      if (value) localStorage.setItem(storageKey, value.id);
      else localStorage.removeItem(storageKey);
    } catch { /* Shopping remains available if browser storage is disabled. */ }
  }, [storageKey]);

  useEffect(() => {
    let id: string | null = null;
    try { id = localStorage.getItem(storageKey); } catch { return; }
    if (!id || !id.startsWith('gid://shopify/Cart/')) return;
    setIsLoading(true);
    restoration.current = getCart(id).then(value => { saveCart(value); }).catch(() => {
      restorationError.current = new Error('Votre panier n’a pas pu être chargé. Rechargez la page pour réessayer.');
      setError(restorationError.current.message);
    }).finally(() => setIsLoading(false));
  }, [saveCart, storageKey]);

  const addItem = useCallback(async (variantId: string, quantity = 1) => {
    if (busy.current) return;
    busy.current = true;
    setIsLoading(true);
    setError(null);
    setIsOpen(true);
    try {
      await restoration.current;
      if (restorationError.current) throw restorationError.current;
      const currentCart = current.current ?? await createCart();
      saveCart(currentCart);
      const updatedCart = await addToCart(currentCart.id, variantId, quantity);
      saveCart(updatedCart);
      setIsOpen(true); // Ouvre le panier après ajout
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Impossible d’ajouter cet article. Veuillez réessayer.');
    } finally {
      busy.current = false;
      setIsLoading(false);
    }
  }, [saveCart]);

  const removeItem = useCallback(async (lineId: string) => {
    if (busy.current) return;
    busy.current = true;
    setIsLoading(true);
    setError(null);
    try {
      await restoration.current;
      if (restorationError.current) throw restorationError.current;
      if (!current.current) return;
      const updatedCart = await removeFromCart(current.current.id, lineId);
      saveCart(updatedCart);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Impossible de retirer cet article. Veuillez réessayer.');
    } finally {
      busy.current = false;
      setIsLoading(false);
    }
  }, [saveCart]);

  return (
    <CartContext.Provider value={{
      cart,
      isOpen,
      isLoading,
      error,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
      addItem,
      removeItem,
      totalQuantity: cart?.totalQuantity ?? 0,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart doit être utilisé dans un CartProvider');
  return ctx;
}
