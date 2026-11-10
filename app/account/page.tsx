'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { User as UserIcon, ShoppingBag, LogOut, Check, ArrowLeft, Package } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useOrders, Order } from '@/context/OrderContext';
import { useToast } from '@/context/ToastContext';

function AccountContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialTab = searchParams.get('tab') || 'profile';

  const { user, logout } = useAuth();
  const { orders } = useOrders();

  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'detail'>(
    initialTab === 'orders' ? 'orders' : 'profile'
  );
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const [fullname, setFullname] = useState(`${user?.fname || ''} ${user?.lname || ''}`.trim());
  const [email, setEmail] = useState(user?.email || '');

  const [prevUser, setPrevUser] = useState(user);
  if (user !== prevUser) {
    setPrevUser(user);
    if (user) {
      setFullname(`${user.fname} ${user.lname}`.trim());
      setEmail(user.email);
    }
  }

  const initials = (fullname || 'FA')
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const viewOrderDetail = (order: Order) => {
    setSelectedOrder(order);
    setActiveTab('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="max-w-[1240px] mx-auto px-6 py-8 sm:py-12 min-h-screen">
      {/* ── Breadcrumb ── */}
      <p className="text-[10px] font-semibold tracking-[0.16em] uppercase text-[#7a756d] mb-6">
        <Link href="/" className="hover:text-[#1c1a17]">
          HOME
        </Link>{' '}
        / MY ACCOUNT
      </p>

      <h1 className="text-lg sm:text-xl font-bold tracking-[0.14em] uppercase text-[#1c1a17] mb-8">
        MY ACCOUNT
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* ── Sidebar ── */}
        <aside className="lg:col-span-3 space-y-4 lg:sticky lg:top-24">
          {/* Identity card */}
          <div className="bg-white border border-[#e5ded3] rounded-md p-4 flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-full bg-[#1c1a17] text-white text-xs font-bold flex items-center justify-center shrink-0">
              {initials}
            </div>
            <div className="min-w-0">
              <b className="block text-xs font-bold text-[#1c1a17] truncate">{fullname}</b>
              <span className="text-[10.5px] text-[#7a756d] truncate block">{email}</span>
            </div>
          </div>

          {/* Nav Links */}
          <nav className="bg-white border border-[#e5ded3] rounded-md p-2 flex flex-col space-y-1">
            <button
              type="button"
              onClick={() => setActiveTab('profile')}
              className={`w-full flex items-center gap-3 px-3.5 py-3 rounded text-[10.5px] font-bold tracking-[0.12em] uppercase transition-colors text-left ${
                activeTab === 'profile'
                  ? 'bg-[#1c1a17] text-white'
                  : 'text-[#1c1a17] hover:bg-[#f7f4ef]'
              }`}
            >
              <UserIcon className="w-4 h-4 stroke-[1.6]" />
              <span>PROFILE</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('orders')}
              className={`w-full flex items-center gap-3 px-3.5 py-3 rounded text-[10.5px] font-bold tracking-[0.12em] uppercase transition-colors text-left ${
                activeTab === 'orders' || activeTab === 'detail'
                  ? 'bg-[#1c1a17] text-white'
                  : 'text-[#1c1a17] hover:bg-[#f7f4ef]'
              }`}
            >
              <ShoppingBag className="w-4 h-4 stroke-[1.6]" />
              <span className="flex-1">MY ORDERS</span>
              <span
                className={`text-[9.5px] px-2 py-0.5 rounded-full ${
                  activeTab === 'orders' || activeTab === 'detail'
                    ? 'bg-white/20 text-white'
                    : 'bg-[#f2ece3] text-[#7a756d]'
                }`}
              >
                {orders.length}
              </span>
            </button>

            <button
              type="button"
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3.5 py-3 rounded text-[10.5px] font-bold tracking-[0.12em] uppercase text-[#7a756d] hover:text-rose-600 hover:bg-rose-50 transition-colors text-left"
            >
              <LogOut className="w-4 h-4 stroke-[1.6]" />
              <span>LOG OUT</span>
            </button>
          </nav>
        </aside>

        {/* ── Main Panel Content ── */}
        <section className="lg:col-span-9">
          {/* PROFILE TAB */}
          {activeTab === 'profile' && (
            <div className="bg-white border border-[#e5ded3] rounded-md p-6 sm:p-8 space-y-6">
              <h2 className="text-[12.5px] font-bold tracking-[0.14em] uppercase text-[#1c1a17]">
                PROFILE
              </h2>

              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[9.5px] font-bold tracking-[0.14em] uppercase text-[#57524a] mb-1.5">
                      USER FULLNAME
                    </label>
                    <div className="w-full border border-[#e5ded3] bg-[#faf7f2] rounded px-3.5 py-3 text-xs text-[#1c1a17] font-semibold flex items-center justify-between select-none">
                      <span>{fullname}</span>
                      <span className="text-[9px] font-bold text-[#7a756d] uppercase tracking-wider bg-[#ece5d9] px-2 py-0.5 rounded">
                        READ ONLY
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[9.5px] font-bold tracking-[0.14em] uppercase text-[#57524a] mb-1.5">
                      EMAIL
                    </label>
                    <div className="w-full border border-[#e5ded3] bg-[#faf7f2] rounded px-3.5 py-3 text-xs text-[#1c1a17] font-semibold flex items-center justify-between select-none">
                      <span>{email}</span>
                      <span className="text-[9px] font-bold text-[#7a756d] uppercase tracking-wider bg-[#ece5d9] px-2 py-0.5 rounded">
                        READ ONLY
                      </span>
                    </div>
                  </div>
                </div>

                {/* Email Confirmed badge */}
                <div className="bg-[#f2f7f1] border border-[#d8e6d5] rounded-md p-4 flex items-center gap-3.5">
                  <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
                    <Check className="w-4 h-4 stroke-[2.5]" />
                  </div>
                  <div className="flex-1">
                    <b className="text-[10.5px] font-bold tracking-[0.1em] text-[#1c1a17] uppercase block mb-0.5">
                      EMAIL CONFIRMED
                    </b>
                    <p className="text-[11px] text-[#7a756d]">
                      Your email address has been verified — order updates and delivery notifications are enabled.
                    </p>
                  </div>
                  <span className="text-[9px] font-bold tracking-wider text-emerald-800 bg-[#e3efe1] px-2.5 py-1 rounded-full uppercase shrink-0">
                    CONFIRMED
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* ORDERS LIST TAB */}
          {activeTab === 'orders' && (
            <div className="bg-white border border-[#e5ded3] rounded-md p-6 sm:p-8 space-y-6">
              <h2 className="text-[12.5px] font-bold tracking-[0.14em] uppercase text-[#1c1a17]">
                MY ORDERS
              </h2>

              {orders.length > 0 ? (
                <div>
                  {/* Table headers */}
                  <div className="hidden sm:grid grid-cols-12 gap-4 pb-3 border-b-2 border-[#1c1a17] text-[9px] font-bold tracking-[0.14em] uppercase text-[#7a756d]">
                    <span className="col-span-3">ORDER</span>
                    <span className="col-span-2">PLACED</span>
                    <span className="col-span-2">ITEMS</span>
                    <span className="col-span-2">TOTAL</span>
                    <span className="col-span-2">STATUS</span>
                    <span className="col-span-1" />
                  </div>

                  {/* Orders rows */}
                  <div className="divide-y divide-[#e5ded3]">
                    {orders.map((o) => (
                      <div
                        key={o.number}
                        className="py-4 grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-4 items-center text-xs text-[#7a756d]"
                      >
                        <span className="sm:col-span-3 font-bold text-[#1c1a17] tracking-wide">
                          ORDER #{o.number}
                        </span>
                        <span className="sm:col-span-2">{o.placed}</span>
                        <span className="sm:col-span-2">
                          {o.itemsCount} {o.itemsCount === 1 ? 'item' : 'items'}
                        </span>
                        <b className="sm:col-span-2 text-[#1c1a17] font-mono">
                          {o.total.toFixed(2)} TND
                        </b>
                        <div className="sm:col-span-2">
                          <span className="inline-block text-[9px] font-bold tracking-wider text-[#9a7b3f] bg-[#f6efe2] px-2.5 py-1 rounded-full uppercase">
                            {o.status}
                          </span>
                        </div>
                        <div className="sm:col-span-1 sm:text-right">
                          <button
                            type="button"
                            onClick={() => viewOrderDetail(o)}
                            className="text-[10.5px] font-semibold text-[#1c1a17] hover:underline uppercase whitespace-nowrap"
                          >
                            VIEW DETAILS →
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-16 text-[#7a756d] space-y-3">
                  <p className="text-xs">You have not placed any orders yet.</p>
                  <Link
                    href="/shop"
                    className="inline-block text-xs font-bold uppercase tracking-wider text-[#1c1a17] underline"
                  >
                    Start Shopping
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* ORDER DETAIL TAB */}
          {activeTab === 'detail' && selectedOrder && (
            <div className="space-y-6">
              <button
                type="button"
                onClick={() => setActiveTab('orders')}
                className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-[#1c1a17] hover:opacity-60 uppercase transition-opacity"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>BACK TO ORDERS</span>
              </button>

              {/* Order Status Header */}
              <div className="bg-white border border-[#e5ded3] rounded-md p-6 flex items-center justify-between">
                <div>
                  <p className="text-[9.5px] font-bold tracking-[0.16em] uppercase text-[#7a756d]">
                    ORDER PLACED
                  </p>
                  <h2 className="font-serif text-2xl font-medium text-[#1c1a17] mt-0.5 mb-1">
                    ORDER #{selectedOrder.number}
                  </h2>
                  <p className="text-xs text-[#7a756d]">
                    {selectedOrder.placed} • {selectedOrder.qty} {selectedOrder.qty === 1 ? 'item' : 'items'}
                  </p>
                </div>
                <span className="text-[9.5px] font-bold tracking-wider text-[#9a7b3f] bg-[#f6efe2] px-3 py-1 rounded-full uppercase">
                  {selectedOrder.status}
                </span>
              </div>

              {/* Detail 2 Columns */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                {/* Col 1: Items & Shipping */}
                <div className="space-y-6">
                  {/* Items list */}
                  <div className="bg-white border border-[#e5ded3] rounded-md p-6 space-y-4">
                    <h3 className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#1c1a17]">
                      ITEMS ({selectedOrder.items.length})
                    </h3>

                    <div className="divide-y divide-[#f0ece5]">
                      {selectedOrder.items.map((item, idx) => (
                        <div key={idx} className="py-3 flex items-center gap-3">
                          <div className="w-12 h-14 bg-[#f2ece3] rounded overflow-hidden flex items-center justify-center shrink-0">
                            {item.img ? (
                              <Image
                                src={item.img}
                                alt={item.name}
                                width={48}
                                height={56}
                                className="object-cover w-full h-full"
                                referrerPolicy="no-referrer"
                              />
                            ) : (
                              <Package className="w-5 h-5 text-[#a49d90]" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <b className="text-xs text-[#1c1a17] block truncate">{item.name}</b>
                            {item.size && (
                              <span className="text-[9.5px] font-bold tracking-wider uppercase text-[#7a756d] block mt-0.5">
                                SIZE / VOLUME {item.size.toUpperCase().replace(' ML', 'ML')}
                              </span>
                            )}
                            <span className="text-[11px] text-[#7a756d] block mt-0.5">
                              Qty: {item.qty} • Unit: {item.unitPrice.toFixed(2)} TND
                            </span>
                          </div>
                          <b className="text-xs font-mono text-[#1c1a17]">
                            {item.totalPrice.toFixed(2)} TND
                          </b>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Shipping Info */}
                  <div className="bg-white border border-[#e5ded3] rounded-md p-6 space-y-3">
                    <h3 className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#1c1a17]">
                      SHIPPING INFORMATION
                    </h3>
                    <dl className="divide-y divide-[#f0ebe2] text-xs">
                      <div className="py-2.5 flex justify-between">
                        <dt className="text-[#7a756d] font-semibold">Name</dt>
                        <dd className="text-[#1c1a17] font-medium">{selectedOrder.shippingInfo.name}</dd>
                      </div>
                      <div className="py-2.5 flex justify-between">
                        <dt className="text-[#7a756d] font-semibold">Address</dt>
                        <dd className="text-[#1c1a17] font-medium">{selectedOrder.shippingInfo.address}</dd>
                      </div>
                      <div className="py-2.5 flex justify-between">
                        <dt className="text-[#7a756d] font-semibold">Method</dt>
                        <dd className="text-[#1c1a17] font-medium">{selectedOrder.shippingInfo.method}</dd>
                      </div>
                      <div className="py-2.5 flex justify-between">
                        <dt className="text-[#7a756d] font-semibold">Phone</dt>
                        <dd className="text-[#1c1a17] font-medium">{selectedOrder.shippingInfo.phone}</dd>
                      </div>
                    </dl>
                  </div>
                </div>

                {/* Col 2: Payment & Totals */}
                <div className="space-y-6">
                  {/* Payment & fulfillment */}
                  <div className="bg-white border border-[#e5ded3] rounded-md p-6 space-y-3">
                    <h3 className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#1c1a17]">
                      PAYMENT &amp; FULFILLMENT
                    </h3>
                    <dl className="divide-y divide-[#f0ebe2] text-xs">
                      <div className="py-2.5 flex justify-between">
                        <dt className="text-[#7a756d] font-semibold">Merchant</dt>
                        <dd className="text-[#1c1a17] font-medium">{selectedOrder.paymentInfo.merchant}</dd>
                      </div>
                      <div className="py-2.5 flex justify-between">
                        <dt className="text-[#7a756d] font-semibold">Payment</dt>
                        <dd className="text-[#1c1a17] font-medium">{selectedOrder.paymentInfo.paymentMethod}</dd>
                      </div>
                      <div className="py-2.5 flex justify-between">
                        <dt className="text-[#7a756d] font-semibold">Fulfillment</dt>
                        <dd className="text-[#1c1a17] font-medium">
                          <span className="text-[9px] font-bold text-[#9a7b3f] bg-[#f6efe2] px-2 py-0.5 rounded-full uppercase">
                            {selectedOrder.paymentInfo.fulfillment}
                          </span>
                        </dd>
                      </div>
                      <div className="py-2.5 flex justify-between">
                        <dt className="text-[#7a756d] font-semibold">Contact</dt>
                        <dd className="text-[#1c1a17] font-medium">
                          <a href={`mailto:${selectedOrder.paymentInfo.email}`} className="underline">
                            {selectedOrder.paymentInfo.email}
                          </a>
                        </dd>
                      </div>
                    </dl>
                  </div>

                  {/* Summary */}
                  <div className="bg-white border border-[#e5ded3] rounded-md p-6 space-y-3">
                    <h3 className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#1c1a17]">
                      ORDER SUMMARY
                    </h3>
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between text-[#7a756d]">
                        <span>Items</span>
                        <b className="text-[#1c1a17] font-mono">
                          {selectedOrder.subtotal.toFixed(2)} TND
                        </b>
                      </div>
                      <div className="flex justify-between text-[#7a756d]">
                        <span>Shipping</span>
                        <b className="text-[#1c1a17] font-mono">
                          {selectedOrder.shippingCost.toFixed(2)} TND
                        </b>
                      </div>
                      <div className="pt-3 border-t-2 border-[#1c1a17] flex justify-between items-baseline text-[#1c1a17]">
                        <span className="text-xs font-bold uppercase tracking-wider">TOTAL</span>
                        <b className="text-lg font-bold font-mono">
                          {selectedOrder.total.toFixed(2)} TND
                        </b>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

export default function AccountPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center text-xs tracking-widest uppercase font-semibold text-[#7a756d]">
          Loading account profile...
        </div>
      }
    >
      <AccountContent />
    </Suspense>
  );
}
