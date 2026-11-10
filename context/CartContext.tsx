'use client';

import React, { createContext, useContext, useState, useMemo, useSyncExternalStore, ReactNode } from 'react';
import { PRODUCTS, Product, getDefaultSizeForCategory } from '@/lib/products';
import { useToast } from './ToastContext';
import {
  CartItem,
  subscribeCart,
  getCartSnapshot,
  getCartServerSnapshot,
  writeCartToStorage
} from '@/lib/storage';

export type { CartItem };

export interface CartProduct extends Product {
  qty: number;
  size: string;
}

export interface CartContextType {
  cart: CartItem[];
  cartRows: CartProduct[];
  count: number;
  subtotal: number;
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  addToCart: (id: number, qty?: number, size?: string) => void;
  setQty: (id: number, qty: number, size?: string) => void;
  removeItem: (id: number, size?: string) => void;
  clearCart: () => void;
  freeShippingThreshold: number;
  remainingForFreeShipping: number;
  freeShippingProgress: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);
const FREE_SHIPPING_THRESHOLD = 75;

export function CartProvider({ children }: { children: ReactNode }) {
  const cart = useSyncExternalStore(subscribeCart, getCartSnapshot, getCartServerSnapshot);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { toast } = useToast();

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  const addToCart = (id: number, qty = 1, size?: string) => {
    const prod = PRODUCTS.find((p) => p.id === id);
    const targetSize = size || getDefaultSizeForCategory(prod?.cat);

    const existing = cart.find(
      (item) => item.id === id && (item.size || getDefaultSizeForCategory(prod?.cat)) === targetSize
    );
    let updated: CartItem[];
    if (existing) {
      updated = cart.map((item) => {
        const itemSize = item.size || getDefaultSizeForCategory(prod?.cat);
        return item.id === id && itemSize === targetSize
          ? { ...item, size: targetSize, qty: Math.min(99, item.qty + qty) }
          : item;
      });
    } else {
      updated = [...cart, { id, qty, size: targetSize }];
    }
    writeCartToStorage(updated);
    openDrawer();
    toast('Added to cart');
  };

  const setQty = (id: number, qty: number, size?: string) => {
    let updated: CartItem[];
    if (qty <= 0) {
      updated = cart.filter(
        (item) => !(item.id === id && (size === undefined || item.size === size))
      );
    } else {
      updated = cart.map((item) => {
        if (item.id === id && (size === undefined || item.size === size)) {
          return { ...item, qty: Math.min(99, qty) };
        }
        return item;
      });
    }
    writeCartToStorage(updated);
  };

  const removeItem = (id: number, size?: string) => {
    const updated = cart.filter(
      (item) => !(item.id === id && (size === undefined || item.size === size))
    );
    writeCartToStorage(updated);
    toast('Item removed from cart');
  };

  const clearCart = () => {
    writeCartToStorage([]);
  };

  const cartRows: CartProduct[] = useMemo(() => {
    return cart
      .map((item) => {
        const prod = PRODUCTS.find((p) => p.id === item.id);
        if (!prod) return null;
        return {
          ...prod,
          qty: item.qty,
          size: item.size || getDefaultSizeForCategory(prod.cat)
        };
      })
      .filter((item): item is CartProduct => item !== null);
  }, [cart]);

  const count = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.qty, 0);
  }, [cart]);

  const subtotal = useMemo(() => {
    return cartRows.reduce((sum, item) => sum + item.price * item.qty, 0);
  }, [cartRows]);

  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const freeShippingProgress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  return (
    <CartContext.Provider
      value={{
        cart,
        cartRows,
        count,
        subtotal,
        isDrawerOpen,
        openDrawer,
        closeDrawer,
        addToCart,
        setQty,
        removeItem,
        clearCart,
        freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
        remainingForFreeShipping,
        freeShippingProgress
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
