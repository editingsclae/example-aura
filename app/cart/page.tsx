'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Minus, Plus, X, ShoppingBag, ArrowLeft } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { PRODUCTS } from '@/lib/products';
import { useHasMounted } from '@/hooks/use-mounted';
import ProductCard from '@/components/ProductCard';

export default function CartPage() {
  const hasMounted = useHasMounted();

  const {
    cartRows,
    count,
    subtotal,
    setQty,
    removeItem
  } = useCart();

  const isCartFilled = hasMounted && cartRows.length > 0;

  const shippingCost = subtotal === 0 ? 0 : 7;
  const orderTotal = subtotal + shippingCost;

  const related = PRODUCTS.filter((p) => [1, 3, 6, 8].includes(p.id));

  return (
    <main className="max-w-[1240px] mx-auto px-6 py-8 sm:py-12 min-h-screen">
      {/* ── Breadcrumb ── */}
      <p className="text-[10px] font-semibold tracking-[0.16em] uppercase text-[#7a756d] mb-6">
        <Link href="/" className="hover:text-[#1c1a17]">
          HOME
        </Link>{' '}
        / CART
      </p>

      <h1 className="text-lg sm:text-xl font-bold tracking-[0.14em] uppercase text-[#1c1a17] mb-8">
        YOUR CART{' '}
        {isCartFilled && (
          <span className="text-[#7a756d] font-semibold">
            ({count} {count === 1 ? 'ITEM' : 'ITEMS'})
          </span>
        )}
      </h1>

      {isCartFilled ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Cart Table */}
          <section className="lg:col-span-8">
            {/* Desktop Table Headers */}
            <div className="hidden sm:grid grid-cols-12 gap-4 pb-3 border-b-2 border-[#1c1a17] text-[9.5px] font-bold tracking-[0.14em] uppercase text-[#7a756d]">
              <span className="col-span-6">PRODUCT</span>
              <span className="col-span-2">PRICE</span>
              <span className="col-span-2 text-center">QTY</span>
              <span className="col-span-1 text-right">TOTAL</span>
              <span className="col-span-1" />
            </div>

            {/* Items */}
            <div className="divide-y divide-[#e5ded3]">
              {cartRows.map((item) => (
                <div
                  key={`${item.id}-${item.size}`}
                  className="py-5 grid grid-cols-1 sm:grid-cols-12 gap-4 items-center"
                >
                  {/* Product Info */}
                  <div className="sm:col-span-6 flex items-center gap-4">
                    <Link
                      href={`/product/${item.id}`}
                      className="relative w-20 h-24 bg-[#f2ece3] rounded overflow-hidden shrink-0 group"
                    >
                      <Image
                        src={item.img}
                        alt={item.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform"
                        referrerPolicy="no-referrer"
                      />
                    </Link>
                    <div>
                      <p className="text-[9.5px] font-semibold tracking-wider uppercase text-[#7a756d]">
                        {item.cat}
                      </p>
                      <Link
                        href={`/product/${item.id}`}
                        className="text-xs sm:text-sm font-bold uppercase text-[#1c1a17] hover:text-[#7a756d] transition-colors block"
                      >
                        {item.name}
                      </Link>
                      {item.size && (
                        <p className="text-[10.5px] font-bold tracking-[0.1em] uppercase text-[#7a756d] mt-0.5">
                          SIZE / VOLUME {item.size.toUpperCase().replace(' ML', 'ML')}
                        </p>
                      )}
                      <p className="text-[10.5px] font-medium text-emerald-700 mt-1">
                        In stock — Ready to ship
                      </p>
                    </div>
                  </div>

                  {/* Unit Price */}
                  <div className="sm:col-span-2 text-xs font-semibold text-[#1c1a17] hidden sm:block">
                    {item.price.toFixed(2)} TND
                  </div>

                  {/* Stepper */}
                  <div className="sm:col-span-2 flex items-center justify-start sm:justify-center">
                    <div className="flex items-center border border-[#d8d1c5] rounded bg-white">
                      <button
                        type="button"
                        onClick={() => setQty(item.id, item.qty - 1, item.size)}
                        className="w-8 h-8 flex items-center justify-center text-[#1c1a17] hover:opacity-60 transition-opacity"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-8 text-center text-xs font-semibold select-none">
                        {item.qty}
                      </span>
                      <button
                        type="button"
                        onClick={() => setQty(item.id, item.qty + 1, item.size)}
                        className="w-8 h-8 flex items-center justify-center text-[#1c1a17] hover:opacity-60 transition-opacity"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Line Total */}
                  <div className="sm:col-span-1 text-xs font-bold text-[#1c1a17] sm:text-right">
                    {(item.price * item.qty).toFixed(2)} TND
                  </div>

                  {/* Remove */}
                  <div className="sm:col-span-1 flex justify-end">
                    <button
                      type="button"
                      onClick={() => removeItem(item.id, item.size)}
                      className="text-[#b3ab9e] hover:text-[#1c1a17] p-1.5 transition-colors"
                      aria-label={`Remove ${item.name}`}
                    >
                      <X className="w-4 h-4 stroke-[1.8]" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-6">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#1c1a17] hover:opacity-60 transition-opacity"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>CONTINUE SHOPPING</span>
              </Link>
            </div>
          </section>

          {/* ── Order Summary Card ── */}
          <aside className="lg:col-span-4 bg-[#f7f4ef] border border-[#e5ded3] rounded-md p-6 lg:sticky lg:top-24 space-y-4">
            <h2 className="text-[12.5px] font-bold tracking-[0.14em] uppercase text-[#1c1a17]">
              ORDER SUMMARY
            </h2>

            <div className="space-y-3 pt-2 text-xs">
              <div className="flex justify-between text-[#7a756d]">
                <span>Subtotal</span>
                <b className="text-[#1c1a17] font-semibold">{subtotal.toFixed(2)} TND</b>
              </div>

              <div className="flex justify-between text-[#7a756d]">
                <span>Shipping</span>
                <b className="text-[#1c1a17] font-semibold">
                  {shippingCost === 0 ? 'FREE' : `${shippingCost.toFixed(2)} TND`}
                </b>
              </div>

              <div className="pt-4 border-t-2 border-[#1c1a17] flex justify-between items-baseline text-[#1c1a17]">
                <span className="text-xs font-bold tracking-[0.12em] uppercase">TOTAL</span>
                <b className="text-xl font-bold font-mono">{orderTotal.toFixed(2)} TND</b>
              </div>
            </div>

            <Link
              href="/checkout"
              className="w-full inline-flex items-center justify-center bg-[#1c1a17] text-white text-[11px] font-semibold tracking-[0.18em] uppercase py-4 px-6 hover:bg-[#3a352e] transition-colors shadow-sm"
            >
              PROCEED TO CHECKOUT
            </Link>

            <div className="flex items-center justify-center gap-2 pt-2 text-[9px] font-bold tracking-wider uppercase text-[#7a756d]">
              <span className="border border-[#e5ded3] bg-white px-2 py-1 rounded">
                CASH ON DELIVERY
              </span>
              <span className="border border-[#e5ded3] bg-white px-2 py-1 rounded">
                30-DAY RETURNS
              </span>
            </div>
          </aside>
        </div>
      ) : (
        /* Empty Cart State */
        <div className="py-20 text-center flex flex-col items-center gap-4 text-[#7a756d]">
          <ShoppingBag className="w-16 h-16 stroke-[1.1] text-[#cfc8bb]" />
          <h2 className="text-base font-bold tracking-[0.14em] uppercase text-[#1c1a17]">
            YOUR CART IS EMPTY
          </h2>
          <p className="text-xs sm:text-sm max-w-sm">
            Discover clean, clinically tested formulas made for your skin.
          </p>
          <Link
            href="/shop"
            className="mt-2 inline-flex items-center justify-center bg-[#1c1a17] text-white text-[11px] font-semibold tracking-[0.18em] uppercase py-3.5 px-8 hover:bg-[#3a352e] transition-colors shadow-sm"
          >
            CONTINUE SHOPPING
          </Link>
        </div>
      )}

      {/* ── Related Best Sellers ── */}
      <section className="mt-24 pt-12 border-t border-[#e5ded3]">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-base font-bold tracking-[0.12em] uppercase text-[#1c1a17]">
            BEST SELLERS
          </h2>
          <Link
            href="/shop"
            className="text-[10.5px] font-semibold tracking-[0.16em] uppercase text-[#7a756d] hover:text-[#1c1a17] transition-colors"
          >
            VIEW ALL →
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {related.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </main>
  );
}
