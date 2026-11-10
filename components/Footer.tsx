'use client';

import React from 'react';
import Link from 'next/link';
import { Truck, RotateCcw, ShieldCheck, Instagram, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="footer" className="bg-[#f7f4ef] border-t border-[#e5ded3] text-[#1c1a17]">
      {/* Top Section */}
      <div className="max-w-[1240px] mx-auto px-6 pt-14 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12">
          {/* Brand info */}
          <div className="lg:col-span-3">
            <Link href="/" className="inline-flex flex-col items-start leading-none mb-5 group">
              <span className="font-serif text-3xl font-medium tracking-[0.14em]">
                A U R A
              </span>
              <span className="text-[8.5px] font-bold tracking-[0.5em] mt-1 text-[#1c1a17]">
                SKINCARE
              </span>
            </Link>
            <p className="text-xs leading-relaxed text-[#7a756d] mb-6 max-w-[240px]">
              Elevated skincare made with clean ingredients and backed by science.
            </p>
            <div className="flex items-center gap-4 text-[#1c1a17]">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="hover:opacity-60 transition-opacity"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4 stroke-[1.6]" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="hover:opacity-60 transition-opacity"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4 stroke-[1.6]" />
              </a>
            </div>
          </div>

          {/* Nav columns */}
          <div className="lg:col-span-6 grid grid-cols-2 sm:grid-cols-4 gap-8">
            <div>
              <h4 className="text-[11px] font-bold tracking-[0.12em] uppercase mb-4 text-[#1c1a17]">
                SHOP
              </h4>
              <ul className="space-y-2.5 text-xs text-[#7a756d]">
                <li>
                  <Link href="/shop" className="hover:text-[#1c1a17] transition-colors">
                    All Products
                  </Link>
                </li>
                <li>
                  <Link href="/#best-sellers" className="hover:text-[#1c1a17] transition-colors">
                    Bestsellers
                  </Link>
                </li>
                <li>
                  <Link href="/shop" className="hover:text-[#1c1a17] transition-colors">
                    New Arrivals
                  </Link>
                </li>
                <li>
                  <Link href="/shop?category=Sets%20%26%20Kits" className="hover:text-[#1c1a17] transition-colors">
                    Sets & Kits
                  </Link>
                </li>
                <li>
                  <span className="cursor-default opacity-70">Gift Cards</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-[11px] font-bold tracking-[0.12em] uppercase mb-4 text-[#1c1a17]">
                COLLECTIONS
              </h4>
              <ul className="space-y-2.5 text-xs text-[#7a756d]">
                <li>
                  <Link href="/shop?category=Serums" className="hover:text-[#1c1a17] transition-colors">
                    Hydration
                  </Link>
                </li>
                <li>
                  <Link href="/shop?category=Serums" className="hover:text-[#1c1a17] transition-colors">
                    Brightening
                  </Link>
                </li>
                <li>
                  <Link href="/shop?category=Moisturizers" className="hover:text-[#1c1a17] transition-colors">
                    Anti-Aging
                  </Link>
                </li>
                <li>
                  <Link href="/shop?category=Cleansers" className="hover:text-[#1c1a17] transition-colors">
                    Sensitive Skin
                  </Link>
                </li>
                <li>
                  <Link href="/shop?category=Masks" className="hover:text-[#1c1a17] transition-colors">
                    Clear Skin
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-[11px] font-bold tracking-[0.12em] uppercase mb-4 text-[#1c1a17]">
                ABOUT
              </h4>
              <ul className="space-y-2.5 text-xs text-[#7a756d]">
                <li>
                  <Link href="/#about" className="hover:text-[#1c1a17] transition-colors">
                    Our Story
                  </Link>
                </li>
                <li>
                  <Link href="/#about" className="hover:text-[#1c1a17] transition-colors">
                    Ingredients
                  </Link>
                </li>
                <li>
                  <span className="cursor-default opacity-70">Sustainability</span>
                </li>
                <li>
                  <Link href="/#press" className="hover:text-[#1c1a17] transition-colors">
                    Press
                  </Link>
                </li>
                <li>
                  <span className="cursor-default opacity-70">Careers</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-[11px] font-bold tracking-[0.12em] uppercase mb-4 text-[#1c1a17]">
                HELP
              </h4>
              <ul className="space-y-2.5 text-xs text-[#7a756d]">
                <li>
                  <Link href="/shipping" className="hover:text-[#1c1a17] transition-colors">
                    Shipping Policy
                  </Link>
                </li>
                <li>
                  <Link href="/returns" className="hover:text-[#1c1a17] transition-colors">
                    Returns &amp; Refunds
                  </Link>
                </li>
                <li>
                  <Link href="/account?tab=orders" className="hover:text-[#1c1a17] transition-colors">
                    Track Order
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-[#1c1a17] transition-colors">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-[#1c1a17] transition-colors">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Perks */}
          <div className="lg:col-span-3 flex flex-col gap-5 sm:gap-6">
            <div className="flex items-start gap-3.5">
              <Truck className="w-5 h-5 text-[#1c1a17] stroke-[1.4] shrink-0 mt-0.5" />
              <div>
                <h5 className="text-[10.5px] font-bold tracking-[0.1em] uppercase mb-0.5 text-[#1c1a17]">
                  EXPRESS DELIVERY
                </h5>
                <p className="text-[11px] text-[#7a756d]">Across Tunisia</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <RotateCcw className="w-5 h-5 text-[#1c1a17] stroke-[1.4] shrink-0 mt-0.5" />
              <div>
                <h5 className="text-[10.5px] font-bold tracking-[0.1em] uppercase mb-0.5 text-[#1c1a17]">
                  7 DAY RETURNS
                </h5>
                <p className="text-[11px] text-[#7a756d]">Hassle free returns</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <ShieldCheck className="w-5 h-5 text-[#1c1a17] stroke-[1.4] shrink-0 mt-0.5" />
              <div>
                <h5 className="text-[10.5px] font-bold tracking-[0.1em] uppercase mb-0.5 text-[#1c1a17]">
                  SECURE PAYMENT
                </h5>
                <p className="text-[11px] text-[#7a756d]">100% secure checkout &amp; COD</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Legal Bar */}
      <div className="border-t border-[#e5ded3] py-4">
        <div className="max-w-[1240px] mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#7a756d]">
          <span>© 2026 AURA Skincare. All rights reserved.</span>
          <div className="flex items-center gap-3">
            <Link href="/terms" className="hover:text-[#1c1a17] transition-colors">
              Terms of Service
            </Link>
            <span className="text-[#cfc8bb]">|</span>
            <Link href="/privacy" className="hover:text-[#1c1a17] transition-colors">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
