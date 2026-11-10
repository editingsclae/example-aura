'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function CartDrawer() {
  const {
    isDrawerOpen,
    closeDrawer,
    cartRows,
    count,
    subtotal,
    setQty,
    removeItem
  } = useCart();

  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isDrawerOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isDrawerOpen) {
        closeDrawer();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isDrawerOpen, closeDrawer]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-[#1c1a17]/45 transition-opacity z-50 duration-300 ${
          isDrawerOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeDrawer}
        aria-hidden="true"
      />

      {/* Drawer */}
      <aside
        className={`fixed top-0 right-0 h-[100dvh] w-[min(420px,94vw)] bg-white z-50 flex flex-col shadow-2xl transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isDrawerOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-label="Shopping Cart Drawer"
        aria-hidden={!isDrawerOpen}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#e5ded3]">
          <h2 className="text-[12.5px] font-bold tracking-[0.14em] text-[#1c1a17] uppercase">
            YOUR CART ({count})
          </h2>
          <button
            type="button"
            onClick={closeDrawer}
            className="text-[#1c1a17] hover:opacity-60 transition-opacity p-1 cursor-pointer"
            aria-label="Close cart"
          >
            <X className="w-5 h-5 stroke-[2]" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-2 divide-y divide-[#f0ebe2]">
          {cartRows.length > 0 ? (
            cartRows.map((item) => (
              <div key={`${item.id}-${item.size}`} className="py-4 flex gap-4 items-center">
                <Link
                  href={`/product/${item.id}`}
                  onClick={closeDrawer}
                  className="relative w-18 h-20 bg-[#f2ece3] rounded overflow-hidden shrink-0 group"
                >
                  <Image
                    src={item.img}
                    alt={item.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform"
                    referrerPolicy="no-referrer"
                  />
                </Link>

                <div className="flex-1 min-w-0">
                  <p className="text-[9.5px] tracking-wider uppercase font-semibold text-[#7a756d]">
                    {item.cat}
                  </p>
                  <Link
                    href={`/product/${item.id}`}
                    onClick={closeDrawer}
                    className="text-xs font-bold tracking-wide text-[#1c1a17] uppercase hover:text-[#7a756d] transition-colors block truncate"
                  >
                    {item.name}
                  </Link>

                  {item.size && (
                    <p className="text-[9.5px] font-bold tracking-[0.1em] uppercase text-[#7a756d] mt-0.5">
                      SIZE / VOLUME {item.size.toUpperCase().replace(' ML', 'ML')}
                    </p>
                  )}

                  <div className="flex items-center justify-between mt-3">
                    {/* Stepper */}
                    <div className="flex items-center border border-[#d8d1c5] rounded bg-white">
                      <button
                        type="button"
                        onClick={() => setQty(item.id, item.qty - 1, item.size)}
                        className="w-7 h-7 flex items-center justify-center text-[#1c1a17] hover:opacity-60 transition-opacity"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3 stroke-[2]" />
                      </button>
                      <span className="w-7 text-center text-xs font-semibold text-[#1c1a17] select-none">
                        {item.qty}
                      </span>
                      <button
                        type="button"
                        onClick={() => setQty(item.id, item.qty + 1, item.size)}
                        className="w-7 h-7 flex items-center justify-center text-[#1c1a17] hover:opacity-60 transition-opacity"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3 stroke-[2]" />
                      </button>
                    </div>

                    <span className="text-xs font-bold text-[#1c1a17]">
                      {(item.price * item.qty).toFixed(2)} TND
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => removeItem(item.id, item.size)}
                  className="self-start text-[#b3ab9e] hover:text-[#1c1a17] p-1 transition-colors"
                  aria-label={`Remove ${item.name}`}
                >
                  <X className="w-4 h-4 stroke-[1.8]" />
                </button>
              </div>
            ))
          ) : (
            <div className="text-center py-20 flex flex-col items-center gap-3 text-[#7a756d]">
              <ShoppingBag className="w-12 h-12 stroke-[1.2] text-[#cfc8bb]" />
              <p className="text-sm">Your cart is empty.</p>
              <Link
                href="/shop"
                onClick={closeDrawer}
                className="mt-2 inline-flex items-center justify-center bg-[#1c1a17] text-white text-[10.5px] font-semibold tracking-[0.18em] uppercase px-6 py-3 hover:bg-[#3a352e] transition-colors"
              >
                CONTINUE SHOPPING
              </Link>
            </div>
          )}
        </div>

        {/* Footer */}
        {cartRows.length > 0 && (
          <div className="border-t border-[#e5ded3] p-6 bg-[#fbf9f6] space-y-3">
            <div className="flex items-center justify-between text-xs tracking-wider uppercase font-bold text-[#1c1a17]">
              <span>SUBTOTAL</span>
              <span className="text-base">{subtotal.toFixed(2)} TND</span>
            </div>
            <p className="text-[10.5px] text-[#7a756d]">
              Taxes and shipping calculated at checkout.
            </p>
            <div className="flex flex-col gap-2 pt-1">
              <Link
                href="/cart"
                onClick={closeDrawer}
                className="w-full inline-flex items-center justify-center border-1.5 border-[#1c1a17] text-[#1c1a17] bg-transparent text-[11px] font-semibold tracking-[0.18em] uppercase py-3.5 hover:bg-[#1c1a17] hover:text-white transition-colors"
              >
                VIEW CART
              </Link>
              <Link
                href="/checkout"
                onClick={closeDrawer}
                className="w-full inline-flex items-center justify-center bg-[#1c1a17] text-white text-[11px] font-semibold tracking-[0.18em] uppercase py-3.5 hover:bg-[#3a352e] transition-colors shadow-sm"
              >
                CHECKOUT
              </Link>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
