'use client';

import React, { ReactNode } from 'react';
import { ToastProvider } from '@/context/ToastContext';
import { AuthProvider } from '@/context/AuthContext';
import { CartProvider } from '@/context/CartContext';
import { OrderProvider } from '@/context/OrderContext';
import Navbar from './Navbar';
import CartDrawer from './CartDrawer';
import Footer from './Footer';

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ToastProvider>
      <AuthProvider>
        <CartProvider>
          <OrderProvider>
            <div className="min-h-screen flex flex-col bg-white">
              <Navbar />
              <div className="flex-1">
                {children}
              </div>
              <Footer />
              <CartDrawer />
            </div>
          </OrderProvider>
        </CartProvider>
      </AuthProvider>
    </ToastProvider>
  );
}
