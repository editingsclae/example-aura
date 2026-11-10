'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Check, ShieldCheck, Phone, CheckCircle2, ArrowLeft } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { useOrders } from '@/context/OrderContext';

export default function CheckoutPage() {
  const router = useRouter();
  const { cartRows, subtotal, clearCart } = useCart();
  const { user } = useAuth();
  const { createOrder } = useOrders();

  const [email, setEmail] = useState(user?.email || '979adriaens@fldubai.com');
  const [fname, setFname] = useState(user?.fname || 'alouini');
  const [lname, setLname] = useState(user?.lname || 'firas');
  const [address, setAddress] = useState(user?.address || 'Av Monji Slim');
  const [city, setCity] = useState(user?.city || 'Tunis');
  const [zip, setZip] = useState(user?.zip || '1000');
  const [country, setCountry] = useState('TN');
  const [phone, setPhone] = useState(user?.phone || '20514118');

  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express' | 'pickup'>('standard');
  const [paymentMethod] = useState<'cod'>('cod');

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [placedOrder, setPlacedOrder] = useState<{
    number: string | number;
    name: string;
    phone: string;
    total: string;
    eta: string;
  } | null>(null);

  const shippingCost = shippingMethod === 'express' ? 15 : 0;
  const orderTotal = subtotal + shippingCost;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) errs.email = 'Please enter a valid email address.';
    if (!fname.trim()) errs.fname = 'First name is required.';
    if (!lname.trim()) errs.lname = 'Last name is required.';
    if (!address.trim() || address.length < 3) errs.address = 'Please enter your shipping address.';
    if (!city.trim()) errs.city = 'City is required.';
    if (!zip.trim()) errs.zip = 'Enter a 4-digit postal code.';
    if (!phone.trim()) errs.phone = 'Enter a valid phone number.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    if (cartRows.length === 0 && !placedOrder) {
      router.push('/shop');
      return;
    }

    const etaMap = {
      standard: 'Arrives in 2–5 business days.',
      express: 'Arrives in 1–2 business days.',
      pickup: 'Ready for pickup in 4 hours.'
    };

    const newOrder = createOrder({
      itemsCount: cartRows.length,
      qty: cartRows.reduce((sum, item) => sum + item.qty, 0),
      items: cartRows.map((item) => ({
        id: item.id,
        name: item.name,
        qty: item.qty,
        unitPrice: item.price,
        totalPrice: item.price * item.qty,
        img: item.img,
        cat: item.cat,
        size: item.size
      })),
      subtotal,
      shippingCost,
      total: orderTotal,
      currency: 'TND',
      shippingInfo: {
        name: `${fname.trim()} ${lname.trim()}`,
        address: `${address.trim()}, ${city.trim()}, ${zip.trim()}`,
        method: shippingMethod === 'standard' ? 'Standard Delivery' : shippingMethod === 'express' ? 'Express Delivery' : 'Store Pickup',
        phone: `+216 ${phone.trim()}`
      },
      paymentInfo: {
        merchant: 'AURA Skincare',
        paymentMethod: 'Cash on delivery',
        fulfillment: 'ORDER PLACED',
        email: email.trim()
      }
    });

    setPlacedOrder({
      number: newOrder.number,
      name: fname.trim(),
      phone: `+216 ${phone.trim()}`,
      total: `${orderTotal.toFixed(2)} TND`,
      eta: etaMap[shippingMethod]
    });

    clearCart();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (placedOrder) {
    return (
      <main className="max-w-[1240px] mx-auto px-6 py-16 sm:py-24">
        <div className="max-w-xl mx-auto text-center bg-[#f7f4ef] border border-[#e5ded3] rounded-lg p-10 sm:p-14 flex flex-col items-center gap-4 shadow-sm animate-in fade-in">
          <div className="w-14 h-14 rounded-full bg-emerald-700 text-white flex items-center justify-center">
            <Check className="w-7 h-7 stroke-[2.5]" />
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl font-medium text-[#1c1a17]">
            Thank you, {placedOrder.name}!
          </h1>

          <p className="text-sm text-[#1c1a17]">
            Order <b className="font-mono">{placedOrder.number}</b> has been placed.
          </p>

          <p className="text-xs sm:text-[13px] leading-relaxed text-[#7a756d]">
            We&apos;ll call you on <b>{placedOrder.phone}</b> before delivery. Pay <b>{placedOrder.total}</b> in cash upon delivery — no payment needed now.
          </p>

          <p className="text-xs font-semibold text-[#1c1a17] bg-white px-4 py-2 rounded border border-[#e5ded3]">
            {placedOrder.eta}
          </p>

          <div className="flex gap-4 mt-4">
            <Link
              href="/account?tab=orders"
              className="inline-flex items-center justify-center border-1.5 border-[#1c1a17] text-[#1c1a17] text-[11px] font-semibold tracking-[0.18em] uppercase px-6 py-3.5 hover:bg-[#1c1a17] hover:text-white transition-colors"
            >
              VIEW MY ORDERS
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center bg-[#1c1a17] text-white text-[11px] font-semibold tracking-[0.18em] uppercase px-6 py-3.5 hover:bg-[#3a352e] transition-colors"
            >
              CONTINUE SHOPPING
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-[1240px] mx-auto px-6 py-8 sm:py-12 min-h-screen">
      {/* ── Breadcrumb ── */}
      <p className="text-[10px] font-semibold tracking-[0.16em] uppercase text-[#7a756d] mb-6">
        <Link href="/" className="hover:text-[#1c1a17]">
          HOME
        </Link>{' '}
        /{' '}
        <Link href="/cart" className="hover:text-[#1c1a17]">
          CART
        </Link>{' '}
        / CHECKOUT
      </p>

      <h1 className="text-lg sm:text-xl font-bold tracking-[0.14em] uppercase text-[#1c1a17] mb-10">
        CHECKOUT
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Checkout Form */}
        <form onSubmit={handleSubmit} noValidate className="lg:col-span-7 space-y-10">
          {/* 1. Contact & Shipping Address */}
          <section className="space-y-5">
            <h2 className="flex items-center gap-3 text-[12.5px] font-bold tracking-[0.14em] uppercase text-[#1c1a17]">
              <i className="w-6 h-6 rounded-full bg-[#1c1a17] text-white not-italic text-[11px] font-bold flex items-center justify-center shrink-0">
                1
              </i>
              <span>CONTACT &amp; SHIPPING ADDRESS</span>
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-[9.5px] font-bold tracking-[0.14em] uppercase text-[#57524a] mb-1.5">
                  EMAIL ADDRESS
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className={`w-full border rounded px-3.5 py-3 text-xs outline-none bg-white text-[#1c1a17] ${
                    errors.email ? 'border-rose-500' : 'border-[#d8d1c5] focus:border-[#1c1a17]'
                  }`}
                />
                {errors.email && <p className="text-[10.5px] text-rose-600 mt-1">{errors.email}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[9.5px] font-bold tracking-[0.14em] uppercase text-[#57524a] mb-1.5">
                    FIRST NAME
                  </label>
                  <input
                    type="text"
                    value={fname}
                    onChange={(e) => setFname(e.target.value)}
                    className={`w-full border rounded px-3.5 py-3 text-xs outline-none bg-white text-[#1c1a17] ${
                      errors.fname ? 'border-rose-500' : 'border-[#d8d1c5] focus:border-[#1c1a17]'
                    }`}
                  />
                  {errors.fname && <p className="text-[10.5px] text-rose-600 mt-1">{errors.fname}</p>}
                </div>
                <div>
                  <label className="block text-[9.5px] font-bold tracking-[0.14em] uppercase text-[#57524a] mb-1.5">
                    LAST NAME
                  </label>
                  <input
                    type="text"
                    value={lname}
                    onChange={(e) => setLname(e.target.value)}
                    className={`w-full border rounded px-3.5 py-3 text-xs outline-none bg-white text-[#1c1a17] ${
                      errors.lname ? 'border-rose-500' : 'border-[#d8d1c5] focus:border-[#1c1a17]'
                    }`}
                  />
                  {errors.lname && <p className="text-[10.5px] text-rose-600 mt-1">{errors.lname}</p>}
                </div>
              </div>

              <div>
                <label className="block text-[9.5px] font-bold tracking-[0.14em] uppercase text-[#57524a] mb-1.5">
                  ADDRESS
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Street, building, apartment"
                  className={`w-full border rounded px-3.5 py-3 text-xs outline-none bg-white text-[#1c1a17] ${
                    errors.address ? 'border-rose-500' : 'border-[#d8d1c5] focus:border-[#1c1a17]'
                  }`}
                />
                {errors.address && <p className="text-[10.5px] text-rose-600 mt-1">{errors.address}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[9.5px] font-bold tracking-[0.14em] uppercase text-[#57524a] mb-1.5">
                    CITY
                  </label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="e.g. Tunis"
                    className={`w-full border rounded px-3.5 py-3 text-xs outline-none bg-white text-[#1c1a17] ${
                      errors.city ? 'border-rose-500' : 'border-[#d8d1c5] focus:border-[#1c1a17]'
                    }`}
                  />
                  {errors.city && <p className="text-[10.5px] text-rose-600 mt-1">{errors.city}</p>}
                </div>

                <div>
                  <label className="block text-[9.5px] font-bold tracking-[0.14em] uppercase text-[#57524a] mb-1.5">
                    POSTAL CODE
                  </label>
                  <input
                    type="text"
                    value={zip}
                    onChange={(e) => setZip(e.target.value)}
                    placeholder="e.g. 1002"
                    maxLength={4}
                    className={`w-full border rounded px-3.5 py-3 text-xs outline-none bg-white text-[#1c1a17] ${
                      errors.zip ? 'border-rose-500' : 'border-[#d8d1c5] focus:border-[#1c1a17]'
                    }`}
                  />
                  {errors.zip && <p className="text-[10.5px] text-rose-600 mt-1">{errors.zip}</p>}
                </div>

                <div>
                  <label className="block text-[9.5px] font-bold tracking-[0.14em] uppercase text-[#57524a] mb-1.5">
                    COUNTRY
                  </label>
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full border border-[#d8d1c5] rounded px-3.5 py-3 text-xs outline-none bg-white text-[#1c1a17] focus:border-[#1c1a17] cursor-pointer"
                  >
                    <option value="TN">Tunisia (TN)</option>
                    <option value="US">United States (US)</option>
                    <option value="FR">France (FR)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[9.5px] font-bold tracking-[0.14em] uppercase text-[#57524a] mb-1.5">
                  PHONE NUMBER
                </label>
                <div className="flex gap-2">
                  <span className="flex items-center gap-1.5 bg-[#f7f4ef] border border-[#d8d1c5] rounded px-3 py-3 text-xs font-semibold text-[#1c1a17] shrink-0">
                    <Phone className="w-3.5 h-3.5 text-[#7a756d]" />
                    +216
                  </span>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="12 345 678"
                    className={`flex-1 border rounded px-3.5 py-3 text-xs outline-none bg-white text-[#1c1a17] ${
                      errors.phone ? 'border-rose-500' : 'border-[#d8d1c5] focus:border-[#1c1a17]'
                    }`}
                  />
                </div>
                {errors.phone && <p className="text-[10.5px] text-rose-600 mt-1">{errors.phone}</p>}
              </div>
            </div>
          </section>

          {/* 2. Shipping Option */}
          <section className="space-y-4 pt-6 border-t border-[#f0ece5]">
            <h2 className="flex items-center gap-3 text-[12.5px] font-bold tracking-[0.14em] uppercase text-[#1c1a17]">
              <i className="w-6 h-6 rounded-full bg-[#1c1a17] text-white not-italic text-[11px] font-bold flex items-center justify-center shrink-0">
                2
              </i>
              <span>SHIPPING OPTION</span>
            </h2>

            <div className="space-y-2.5">
              <label
                onClick={() => setShippingMethod('standard')}
                className={`block border-1.5 rounded-md p-4 cursor-pointer transition-all bg-white ${
                  shippingMethod === 'standard'
                    ? 'border-[#1c1a17] ring-1 ring-[#1c1a17]'
                    : 'border-[#e0d9cd] hover:border-[#b8ae9e]'
                }`}
              >
                <div className="flex justify-between items-center text-xs font-bold mb-1">
                  <span>Standard Delivery</span>
                  <span className="text-emerald-700 font-bold">FREE</span>
                </div>
                <p className="text-[11px] text-[#7a756d]">
                  2–5 business days · Tunis, Sfax, Sousse, Bizerte &amp; all governorates
                </p>
              </label>

              <label
                onClick={() => setShippingMethod('express')}
                className={`block border-1.5 rounded-md p-4 cursor-pointer transition-all bg-white ${
                  shippingMethod === 'express'
                    ? 'border-[#1c1a17] ring-1 ring-[#1c1a17]'
                    : 'border-[#e0d9cd] hover:border-[#b8ae9e]'
                }`}
              >
                <div className="flex justify-between items-center text-xs font-bold mb-1">
                  <span>Express Delivery</span>
                  <span className="font-mono">15.00 TND</span>
                </div>
                <p className="text-[11px] text-[#7a756d]">
                  1–2 business days · next-day in Greater Tunis
                </p>
              </label>

              <label
                onClick={() => setShippingMethod('pickup')}
                className={`block border-1.5 rounded-md p-4 cursor-pointer transition-all bg-white ${
                  shippingMethod === 'pickup'
                    ? 'border-[#1c1a17] ring-1 ring-[#1c1a17]'
                    : 'border-[#e0d9cd] hover:border-[#b8ae9e]'
                }`}
              >
                <div className="flex justify-between items-center text-xs font-bold mb-1">
                  <span>Store Pickup</span>
                  <span className="text-emerald-700 font-bold">FREE</span>
                </div>
                <p className="text-[11px] text-[#7a756d]">
                  Ready in 4 hours · AURA Boutique, Avenue Habib Bourguiba, Tunis
                </p>
              </label>
            </div>
          </section>

          {/* 3. Payment & Order Placement */}
          <section className="space-y-4 pt-6 border-t border-[#f0ece5]">
            <h2 className="flex items-center gap-3 text-[12.5px] font-bold tracking-[0.14em] uppercase text-[#1c1a17]">
              <i className="w-6 h-6 rounded-full bg-[#1c1a17] text-white not-italic text-[11px] font-bold flex items-center justify-center shrink-0">
                3
              </i>
              <span>PAYMENT &amp; ORDER PLACEMENT</span>
            </h2>

            <div className="border-1.5 border-[#1c1a17] ring-1 ring-[#1c1a17] rounded-md p-4 bg-white flex items-center gap-4">
              <div className="w-10 h-10 rounded bg-[#f2ece3] flex items-center justify-center shrink-0 text-[#1c1a17]">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
                  <rect x="2" y="6" width="20" height="12" rx="2" />
                  <circle cx="12" cy="12" r="3" />
                  <path d="M6 9v6M18 9v6" />
                </svg>
              </div>
              <div className="flex-1">
                <b className="text-xs font-bold text-[#1c1a17] block">Cash on Delivery</b>
                <span className="text-[11.5px] text-[#7a756d]">
                  Pay in cash (TND) when your order arrives at your door.
                </span>
              </div>
              <div className="w-5 h-5 rounded-full bg-[#1c1a17] text-white flex items-center justify-center">
                <Check className="w-3 h-3 stroke-[3]" />
              </div>
            </div>

            <p className="bg-[#faf7f1] border border-[#e5ded3] rounded-md p-3.5 text-[11.5px] text-[#7a756d] leading-relaxed flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#7a756d] shrink-0 mt-0.5" />
              <span>
                Please prepare the exact amount in Tunisian Dinars. Our courier will call you (+216 number) before arriving. Orders are held for pickup 7 days.
              </span>
            </p>

            <button
              type="submit"
              className="w-full inline-flex items-center justify-center bg-[#1c1a17] text-white text-[12px] font-semibold tracking-[0.18em] uppercase py-4 px-6 hover:bg-[#3a352e] transition-colors shadow-sm"
            >
              PLACE ORDER — {orderTotal.toFixed(2)} TND
            </button>

            <div>
              <Link
                href="/cart"
                className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider text-[#7a756d] hover:text-[#1c1a17] uppercase"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>RETURN TO CART</span>
              </Link>
            </div>
          </section>
        </form>

        {/* ── Order Summary Sidebar ── */}
        <aside className="lg:col-span-5 bg-[#f7f4ef] border border-[#e5ded3] rounded-md p-6 lg:sticky lg:top-24 space-y-4">
          <h2 className="text-[12.5px] font-bold tracking-[0.14em] uppercase text-[#1c1a17]">
            ORDER SUMMARY
          </h2>

          <div className="divide-y divide-[#efeae1] max-h-72 overflow-y-auto">
            {cartRows.map((item) => (
              <div key={`${item.id}-${item.size}`} className="py-3 flex items-center gap-3">
                <div className="relative w-14 h-16 bg-[#f2ece3] rounded overflow-hidden shrink-0">
                  <Image
                    src={item.img}
                    alt={item.name}
                    fill
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute -top-1 -right-1 bg-[#1c1a17] text-white text-[9.5px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {item.qty}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-[#1c1a17] truncate">{item.name}</p>
                  <span className="text-[10px] uppercase text-[#7a756d] block">{item.cat}</span>
                  {item.size && (
                    <span className="text-[9.5px] font-bold tracking-wider uppercase text-[#7a756d] block mt-0.5">
                      SIZE / VOLUME {item.size.toUpperCase().replace(' ML', 'ML')}
                    </span>
                  )}
                </div>
                <span className="text-xs font-semibold font-mono text-[#1c1a17]">
                  {(item.price * item.qty).toFixed(2)} TND
                </span>
              </div>
            ))}
          </div>

          <div className="space-y-2.5 pt-3 border-t border-[#e5ded3] text-xs">
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
            <div className="pt-3 border-t-2 border-[#1c1a17] flex justify-between items-baseline text-[#1c1a17]">
              <span className="text-xs font-bold uppercase tracking-wider">TOTAL</span>
              <b className="text-xl font-bold font-mono">{orderTotal.toFixed(2)} TND</b>
            </div>
          </div>

          <div className="pt-3 border-t border-[#e5ded3] flex items-center gap-2 text-[10.5px] text-[#7a756d]">
            <ShieldCheck className="w-4 h-4 text-[#1c1a17] shrink-0" />
            <span>Secure checkout · 30-day returns · Cash on delivery</span>
          </div>
        </aside>
      </div>
    </main>
  );
}
