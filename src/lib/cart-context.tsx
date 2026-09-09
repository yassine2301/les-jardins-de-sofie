'use client';

import { createContext, useContext, useState, useCallback, useRef, ReactNode } from 'react';
import { createCart, addToCart, removeFromCart, type ShopifyCart } from '@/lib/shopify';

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

  const addItem = useCallback(async (variantId: string, quantity = 1) => {
    if (busy.current) return;
    busy.current = true;
    setIsLoading(true);
    setError(null);
    setIsOpen(true);
    try {
      const currentCart = cart ?? await createCart();
      setCart(currentCart);
      const updatedCart = await addToCart(currentCart.id, variantId, quantity);
      setCart(updatedCart);
      setIsOpen(true); // Ouvre le panier après ajout
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Impossible d’ajouter cet article. Veuillez réessayer.');
    } finally {
      busy.current = false;
      setIsLoading(false);
    }
  }, [cart]);

  const removeItem = useCallback(async (lineId: string) => {
    if (!cart || busy.current) return;
    busy.current = true;
    setIsLoading(true);
    setError(null);
    try {
      const updatedCart = await removeFromCart(cart.id, lineId);
      setCart(updatedCart);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Impossible de retirer cet article. Veuillez réessayer.');
    } finally {
      busy.current = false;
      setIsLoading(false);
    }
  }, [cart]);

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
