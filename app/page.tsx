'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PRODUCTS } from '@/lib/products';
import ProductCard from '@/components/ProductCard';
import { useToast } from '@/context/ToastContext';

export default function HomePage() {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { toast } = useToast();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !/^\S+@\S+\.\S+$/.test(newsletterEmail)) {
      toast('Please enter a valid email address');
      return;
    }
    setSubscribed(true);
    toast('Welcome! Check your inbox for 15% off');
  };

  const featuredProductIds = [3, 6, 13, 8];
  const featuredProducts = PRODUCTS.filter((p) => featuredProductIds.includes(p.id));

  const bestSellerIds = [1, 2, 5, 7, 12];
  const bestSellers = PRODUCTS.filter((p) => bestSellerIds.includes(p.id));

  const newArrivalIds = [10, 11, 14, 9];
  const newArrivals = PRODUCTS.filter((p) => newArrivalIds.includes(p.id));

  return (
    <main className="min-h-screen">
      {/* ══ Hero ══ */}
      <section className="bg-[#f3ede5] pb-14 overflow-hidden">
        <div className="max-w-[1240px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[44%_56%] items-center gap-8 lg:gap-10 pt-10 sm:pt-16">
            {/* Left Column Content */}
            <div className="z-10 py-4">
              <p className="text-[11px] font-semibold tracking-[0.28em] uppercase text-[#1c1a17] mb-[18px]">
                Glow Naturally
              </p>

              <h1 className="font-serif text-[44px] sm:text-[54px] lg:text-[60px] font-medium leading-[1.12] tracking-[0.01em] text-[#1c1a17] mb-[26px]">
                Pure Ingredients.
                <br />
                Visible Results.
              </h1>

              <p className="text-[14.5px] leading-[1.75] text-[#7a756d] mb-[34px] max-w-md">
                Thoughtfully formulated skincare
                <br />
                that nourishes, protects and
                <br />
                enhances your natural glow.
              </p>

              <Link
                href="/shop"
                className="inline-flex items-center gap-2.5 bg-[#1c1a17] text-white text-[11px] font-semibold tracking-[0.18em] uppercase px-[30px] py-[16px] hover:bg-[#3a352e] transition-colors group"
              >
                <span>SHOP NOW</span>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="w-[15px] h-[15px] group-hover:translate-x-1 transition-transform"
                >
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Link>

              {/* Trust Badges */}
              <ul className="flex items-center gap-8 sm:gap-9 mt-[52px]">
                <li className="flex items-center gap-3">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    className="w-[30px] h-[30px] text-[#1c1a17] shrink-0"
                  >
                    <path d="M20 4c-9 0-14 5-14 11 0 2 .6 3.7 1.7 5C8 19 10 18 12 18c6 0 8-6 8-14zM4 20c2-2 4-3.5 7-4.5" />
                  </svg>
                  <span className="text-[9.5px] font-bold tracking-[0.1em] leading-[1.5] text-[#1c1a17] uppercase">
                    CLEAN
                    <br />
                    INGREDIENTS
                  </span>
                </li>

                <li className="flex items-center gap-3">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    className="w-[30px] h-[30px] text-[#1c1a17] shrink-0"
                  >
                    <path d="M10 3v6L4.5 18a2.5 2.5 0 0 0 2.2 3.5h10.6a2.5 2.5 0 0 0 2.2-3.5L14 9V3M8.5 3h7M7 14h10" />
                  </svg>
                  <span className="text-[9.5px] font-bold tracking-[0.1em] leading-[1.5] text-[#1c1a17] uppercase">
                    CLINICALLY
                    <br />
                    TESTED
                  </span>
                </li>

                <li className="flex items-center gap-3">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    className="w-[30px] h-[30px] text-[#1c1a17] shrink-0"
                  >
                    <path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z" />
                  </svg>
                  <span className="text-[9.5px] font-bold tracking-[0.1em] leading-[1.5] text-[#1c1a17] uppercase">
                    SUITABLE FOR
                    <br />
                    SENSITIVE SKIN
                  </span>
                </li>
              </ul>
            </div>

            {/* Right Column Media */}
            <div
              className="relative w-full h-[380px] sm:h-[480px] lg:h-[560px] overflow-hidden"
              style={{
                marginRight: 'min(0px, calc(596px - 50vw))'
              }}
            >
              <Image
                src="/assets/aistudio/hero_13c12f2b.png"
                alt="AURA Skincare product collection on marble tray"
                fill
                priority
                className="object-cover object-[72%_50%] rounded-[2px]"
                style={{
                  maskImage:
                    'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.85) 48px, black 120px, black 100%)',
                  WebkitMaskImage:
                    'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.85) 48px, black 120px, black 100%)'
                }}
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>

        {/* ══ Floating Category Strip ══ */}
        <div className="max-w-[1240px] mx-auto px-6">
          <div className="bg-white rounded-[6px] shadow-[0_14px_40px_rgba(60,50,35,0.09)] -mt-[34px] relative z-20 py-[26px] px-2 flex flex-wrap sm:flex-nowrap items-center">
            <Link
              href="/shop?category=Cleansers"
              className="flex-1 basis-1/4 sm:basis-auto flex flex-col items-center gap-3 py-2 px-1 hover:opacity-55 transition-opacity group text-center"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                className="w-[30px] h-[30px] text-[#1c1a17]"
              >
                <path d="M8 8h8v12a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2V8zM9 8V5a3 3 0 0 1 6 0v3M8 12h8" />
              </svg>
              <span className="text-[9.5px] font-bold tracking-[0.12em] uppercase text-[#1c1a17]">
                CLEANSERS
              </span>
            </Link>

            <Link
              href="/shop?category=Serums"
              className="flex-1 basis-1/4 sm:basis-auto flex flex-col items-center gap-3 py-2 px-1 hover:opacity-55 transition-opacity group text-center"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                className="w-[30px] h-[30px] text-[#1c1a17]"
              >
                <path d="M10 6h4v14a2 2 0 0 1-2 2 2 2 0 0 1-2-2V6zM11 6V3h2v3M10 11h4" />
              </svg>
              <span className="text-[9.5px] font-bold tracking-[0.12em] uppercase text-[#1c1a17]">
                SERUMS
              </span>
            </Link>

            <Link
              href="/shop?category=Moisturizers"
              className="flex-1 basis-1/4 sm:basis-auto flex flex-col items-center gap-3 py-2 px-1 hover:opacity-55 transition-opacity group text-center"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                className="w-[30px] h-[30px] text-[#1c1a17]"
              >
                <path d="M5 10h14v8a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3v-8zM5 10l1.5-4h11L19 10M5 14h14" />
              </svg>
              <span className="text-[9.5px] font-bold tracking-[0.12em] uppercase text-[#1c1a17]">
                MOISTURIZERS
              </span>
            </Link>

            <Link
              href="/shop?category=Sun Care"
              className="flex-1 basis-1/4 sm:basis-auto flex flex-col items-center gap-3 py-2 px-1 hover:opacity-55 transition-opacity group text-center"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                className="w-[30px] h-[30px] text-[#1c1a17]"
              >
                <path d="M8 7h8v13a1.5 1.5 0 0 1-1.5 1.5h-5A1.5 1.5 0 0 1 8 20V7zM8 7l1-3h6l1 3M8 11c1.5 1.2 6.5 1.2 8 0" />
              </svg>
              <span className="text-[9.5px] font-bold tracking-[0.12em] uppercase text-[#1c1a17]">
                SUN CARE
              </span>
            </Link>

            <Link
              href="/shop?category=Masks"
              className="flex-1 basis-1/4 sm:basis-auto flex flex-col items-center gap-3 py-2 px-1 hover:opacity-55 transition-opacity group text-center"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                className="w-[30px] h-[30px] text-[#1c1a17]"
              >
                <path d="M4 10c0-3.3 3.6-6 8-6s8 2.7 8 6c0 2-.9 3.6-2.4 4.8L18 20l-3-1.5c-.9.3-1.9.5-3 .5s-2.1-.2-3-.5L6 20l.4-3.6C5 14.6 4 12.7 4 10zM9 10h.01M15 10h.01M9.5 13.5c1.5 1 3.5 1 5 0" />
              </svg>
              <span className="text-[9.5px] font-bold tracking-[0.12em] uppercase text-[#1c1a17]">
                MASKS
              </span>
            </Link>

            <Link
              href="/shop?category=Sets%20%26%20Kits"
              className="flex-1 basis-1/4 sm:basis-auto flex flex-col items-center gap-3 py-2 px-1 hover:opacity-55 transition-opacity group text-center"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                className="w-[30px] h-[30px] text-[#1c1a17]"
              >
                <path d="M4 9h16v11a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9zM3 6h18v3H3zM12 6v15M12 6S9.5 2 7.5 3.5 9 6 12 6zM12 6s2.5-4 4.5-2.5S15 6 12 6z" />
              </svg>
              <span className="text-[9.5px] font-bold tracking-[0.12em] uppercase text-[#1c1a17]">
                SETS & KITS
              </span>
            </Link>

            <Link
              href="/shop"
              className="flex-1 basis-1/4 sm:basis-auto flex flex-col items-center gap-3 py-2 px-1 hover:opacity-55 transition-opacity group text-center"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                className="w-[30px] h-[30px] text-[#1c1a17]"
              >
                <path d="M3 11V4h7l11 11-7 7L3 11zM7.5 7.5h.01" />
              </svg>
              <span className="text-[9.5px] font-bold tracking-[0.12em] uppercase text-[#1c1a17]">
                NEW ARRIVALS
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ══ Featured Products ══ */}
      <section id="featured-products" className="bg-white pt-16 pb-14 border-b border-[#e5ded3]">
        <div className="max-w-[1240px] mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-[#7a756d] mb-1">
                CURATED SELECTION
              </p>
              <h2 className="text-[17px] font-bold tracking-[0.12em] uppercase text-[#1c1a17]">
                FEATURED PRODUCTS
              </h2>
            </div>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 text-[10.5px] font-semibold tracking-[0.16em] uppercase text-[#7a756d] hover:text-[#1c1a17] transition-colors group"
            >
              <span>EXPLORE ALL</span>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="w-[15px] h-[15px] group-hover:translate-x-1 transition-transform"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ══ Best Sellers ══ */}
      <section id="best-sellers" className="bg-[#f7f4ef] pt-16 pb-20">
        <div className="max-w-[1240px] mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-[17px] font-bold tracking-[0.12em] uppercase text-[#1c1a17]">
              BEST SELLERS
            </h2>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 text-[10.5px] font-semibold tracking-[0.16em] uppercase text-[#7a756d] hover:text-[#1c1a17] transition-colors group"
            >
              <span>VIEW ALL</span>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="w-[15px] h-[15px] group-hover:translate-x-1 transition-transform"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
            {bestSellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ══ New Arrivals ══ */}
      <section id="new-arrivals" className="bg-white pt-16 pb-16 border-t border-b border-[#e5ded3]">
        <div className="max-w-[1240px] mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-[#7a756d] mb-1">
                JUST ARRIVED
              </p>
              <h2 className="text-[17px] font-bold tracking-[0.12em] uppercase text-[#1c1a17]">
                NEW ARRIVALS
              </h2>
            </div>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 text-[10.5px] font-semibold tracking-[0.16em] uppercase text-[#7a756d] hover:text-[#1c1a17] transition-colors group"
            >
              <span>VIEW ALL</span>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="w-[15px] h-[15px] group-hover:translate-x-1 transition-transform"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ══ Promo Panels: The Ritual & Our Promise ══ */}
      <section id="about" className="py-16 sm:py-20 bg-white">
        <div className="max-w-[1240px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Panel 1: The Ritual */}
            <div className="relative rounded-[6px] overflow-hidden min-h-[360px] sm:min-h-[380px] bg-[#cfd6d2] group flex flex-col justify-center shadow-xs">
              {/* Background photography with water caustics & products */}
              <Image
                src="/assets/aistudio/promo-ritual_5c7b5e78.png"
                alt="AURA Skincare soothing ritual"
                fill
                className="object-cover object-[75%_50%]"
                referrerPolicy="no-referrer"
              />
              {/* Soft left gradient scrim for crisp text legibility matching original design */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    'linear-gradient(90deg, rgba(244,240,232,0.92) 0%, rgba(244,240,232,0.55) 30%, rgba(244,240,232,0) 50%)'
                }}
              />

              <div className="relative z-10 p-8 sm:p-10 max-w-[380px]">
                <p className="text-[11px] font-semibold tracking-[0.28em] uppercase text-[#4b463d] mb-4">
                  The Ritual
                </p>
                <h2 className="font-serif text-[30px] sm:text-[36px] font-medium leading-[1.18] text-[#26221c] mb-4">
                  Skincare that
                  <br />
                  becomes a ritual.
                </h2>
                <p className="text-[12.5px] leading-[1.75] text-[#5c564c] mb-7">
                  Simple steps. Powerful results.
                  <br />
                  Made to fit effortlessly
                  <br />
                  into your everyday.
                </p>
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.18em] uppercase text-[#26221c] hover:opacity-60 transition-opacity group"
                >
                  <span>EXPLORE COLLECTION</span>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="w-[15px] h-[15px] group-hover:translate-x-1 transition-transform"
                  >
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Panel 2: Our Promise */}
            <div className="relative rounded-[6px] overflow-hidden min-h-[360px] sm:min-h-[380px] bg-[#ede2da] flex flex-col justify-center shadow-xs">
              <div className="relative z-10 p-8 sm:p-10 max-w-[320px] sm:max-w-[340px]">
                <p className="text-[11px] font-semibold tracking-[0.28em] uppercase text-[#1c1a17] mb-6">
                  Our Promise
                </p>

                <ul className="flex flex-col gap-[26px]">
                  <li className="flex items-start gap-4">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      className="w-[26px] h-[26px] mt-0.5 text-[#1c1a17] shrink-0"
                    >
                      <path d="M12 21C7.5 17.5 5 14 5 10.5 5 7 7.5 5 10 5c.8 0 1.6.2 2 .6.4-.4 1.2-.6 2-.6 2.5 0 5 2 5 5.5C21 14 18.5 17.5 14 21l-1 .8zM12 7v8M9.5 10.5 12 12l2.5-1.5" />
                    </svg>
                    <div>
                      <h4 className="text-[12.5px] font-bold text-[#1c1a17] mb-1">
                        Clean & Safe
                      </h4>
                      <p className="text-[11.5px] text-[#7a756d]">
                        No harmful chemicals
                      </p>
                    </div>
                  </li>

                  <li className="flex items-start gap-4">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      className="w-[26px] h-[26px] mt-0.5 text-[#1c1a17] shrink-0"
                    >
                      <path d="M7 19a7 7 0 1 1 12-5M19 19h-4v-4M19 19l2-6M5 5l2 4" />
                    </svg>
                    <div>
                      <h4 className="text-[12.5px] font-bold text-[#1c1a17] mb-1">
                        Sustainable
                      </h4>
                      <p className="text-[11.5px] text-[#7a756d]">
                        Eco-friendly packaging
                      </p>
                    </div>
                  </li>

                  <li className="flex items-start gap-4">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      className="w-[26px] h-[26px] mt-0.5 text-[#1c1a17] shrink-0"
                    >
                      <path d="M8 21c0-4 1-6 3-8M8 21h9M11 13c-2-2-3-4-3-6a3 3 0 0 1 6 0M14 7c0-2.5 1-4.5 2.5-4.5S19 4.5 19 7s-1.5 4.5-3.5 5.5" />
                    </svg>
                    <div>
                      <h4 className="text-[12.5px] font-bold text-[#1c1a17] mb-1">
                        Cruelty Free
                      </h4>
                      <p className="text-[11.5px] text-[#7a756d]">
                        Never tested on animals
                      </p>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Model Image placed on the right */}
              <div className="absolute right-0 bottom-0 top-0 w-[48%] sm:w-[50%] pointer-events-none overflow-hidden">
                <Image
                  src="/assets/aistudio/promo-glow_e8fc64ea.png"
                  alt="Woman with glowing skin"
                  fill
                  className="object-cover object-[90%_25%]"
                  style={{
                    maskImage:
                      'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.5) 14%, black 32%, black 100%)',
                    WebkitMaskImage:
                      'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.5) 14%, black 32%, black 100%)'
                  }}
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ Email Newsletter ══ */}
      <section id="press" className="border-t border-[#e5ded3] bg-[#fbf9f6] py-14 sm:py-16">
        <div className="max-w-[1240px] mx-auto px-6 flex flex-col items-center text-center">
          <div className="max-w-lg w-full flex flex-col items-center">
            {/* Plant SVG illustration above title */}
            <div className="mb-3">
              <svg
                viewBox="0 0 120 140"
                fill="none"
                stroke="#8a9a7a"
                strokeWidth="1.4"
                className="w-[56px] h-[70px] mx-auto opacity-80"
              >
                <path d="M60 140V70" stroke="#7d8b6d" />
                <path
                  d="M60 90c-12-4-22-2-28 6 10 4 22 2 28-6zM60 78c10-6 22-6 28 2-10 4-22 2-28-2zM60 62c-8-8-8-18-2-26 8 6 8 18 2 26zM62 66c10-4 20 0 24 8-10 2-20-2-24-8zM58 52c-6-10-2-18 6-22 4 8 0 18-6 22z"
                  fill="#eef0e6"
                />
                <path d="M44 108h32l-4 32H48z" fill="#f3efe7" stroke="#b9ad97" />
              </svg>
            </div>

            <h3 className="text-[13px] font-bold tracking-[0.14em] uppercase text-[#1c1a17] mb-2">
              LET&apos;S GLOW TOGETHER
            </h3>
            <p className="text-[13px] text-[#7a756d] mb-6">
              Subscribe to get 15% off your first order
            </p>

            {subscribed ? (
              <div className="w-full text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-6 py-3.5 rounded text-center">
                You&apos;re subscribed! Check your inbox for your 15% off code.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2.5 w-full justify-center">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 min-w-0 bg-white border border-[#d8d1c5] rounded-none px-4 py-3 text-[12px] outline-none focus:border-[#1c1a17] text-[#1c1a17] placeholder:text-[#a49d90] text-center sm:text-left"
                  required
                />
                <button
                  type="submit"
                  className="bg-[#1c1a17] text-white text-[11px] font-semibold tracking-[0.18em] uppercase px-[28px] py-[13px] hover:bg-[#3a352e] transition-colors shrink-0 cursor-pointer"
                >
                  SUBSCRIBE
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
