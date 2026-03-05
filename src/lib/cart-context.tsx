'use client';

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { createCart, addToCart, removeFromCart, type ShopifyCart } from '@/lib/shopify';

interface CartContext {
  cart: ShopifyCart | null;
  isOpen: boolean;
  isLoading: boolean;
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

  // Initialise le panier
  useEffect(() => {
    const initCart = async () => {
      try {
        const newCart = await createCart();
        setCart(newCart);
      } catch (err) {
        console.error('Erreur création panier:', err);
      }
    };
    initCart();
  }, []);

  const addItem = useCallback(async (variantId: string, quantity = 1) => {
    if (!cart) return;
    setIsLoading(true);
    try {
      const updatedCart = await addToCart(cart.id, variantId, quantity);
      setCart(updatedCart);
      setIsOpen(true); // Ouvre le panier après ajout
    } catch (err) {
      console.error('Erreur ajout au panier:', err);
    } finally {
      setIsLoading(false);
    }
  }, [cart]);

  const removeItem = useCallback(async (lineId: string) => {
    if (!cart) return;
    setIsLoading(true);
    try {
      const updatedCart = await removeFromCart(cart.id, lineId);
      setCart(updatedCart);
    } catch (err) {
      console.error('Erreur suppression:', err);
    } finally {
      setIsLoading(false);
    }
  }, [cart]);

  return (
    <CartContext.Provider value={{
      cart,
      isOpen,
      isLoading,
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
