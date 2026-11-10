'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, User, ShoppingBag, Menu, X } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useHasMounted } from '@/hooks/use-mounted';
import SearchModal from './SearchModal';

export default function Navbar() {
  const pathname = usePathname();
  const { count, openDrawer } = useCart();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const hasMounted = useHasMounted();

  // Minimal header for authentication pages
  const isAuthPage =
    pathname === '/login' || pathname === '/signup' || pathname === '/forgot-password';

  if (isAuthPage) {
    return (
      <header className="bg-white border-b border-[#f0ece5] sticky top-0 z-40">
        <div className="max-w-[1240px] mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex flex-col items-start leading-none group">
            <span className="font-serif text-3xl font-medium tracking-[0.14em] text-[#1c1a17]">
              A U R A
            </span>
            <span className="text-[8.5px] font-bold tracking-[0.5em] text-[#1c1a17] mt-1">
              SKINCARE
            </span>
          </Link>
          <Link
            href="/"
            className="text-[11.5px] font-semibold tracking-wider text-[#1c1a17] hover:opacity-60 transition-opacity"
          >
            ← BACK TO STORE
          </Link>
        </div>
      </header>
    );
  }

  return (
    <>
      <header className="bg-white border-b border-[#f0ece5] sticky top-0 z-40">
        <div className="max-w-[1240px] mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex flex-col items-start leading-none group shrink-0">
            <span className="font-serif text-2xl sm:text-3xl font-medium tracking-[0.14em] text-[#1c1a17]">
              A U R A
            </span>
            <span className="text-[8px] sm:text-[8.5px] font-bold tracking-[0.45em] sm:tracking-[0.5em] text-[#1c1a17] mt-1">
              SKINCARE
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link
              href="/shop"
              className={`text-[11.5px] font-semibold tracking-wider uppercase transition-opacity hover:opacity-60 ${
                pathname === '/shop' ? 'border-b-2 border-[#1c1a17] pb-0.5' : ''
              }`}
            >
              SHOP
            </Link>
            <Link
              href="/shop?category=Cleansers"
              className="text-[11.5px] font-semibold tracking-wider uppercase transition-opacity hover:opacity-60"
            >
              CLEANSERS
            </Link>
            <Link
              href="/shop?category=Serums"
              className="text-[11.5px] font-semibold tracking-wider uppercase transition-opacity hover:opacity-60"
            >
              SERUMS
            </Link>
            <Link
              href="/shop?category=Moisturizers"
              className="text-[11.5px] font-semibold tracking-wider uppercase transition-opacity hover:opacity-60"
            >
              MOISTURIZERS
            </Link>
            <Link
              href="/shop?category=Sun Care"
              className="text-[11.5px] font-semibold tracking-wider uppercase transition-opacity hover:opacity-60"
            >
              SUN CARE
            </Link>
          </nav>

          {/* Icons */}
          <div className="flex items-center gap-4 sm:gap-5 shrink-0">
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              className="p-1 text-[#1c1a17] hover:opacity-60 transition-opacity"
              aria-label="Search formulas"
            >
              <Search className="w-5 h-5 stroke-[1.6]" />
            </button>

            <Link
              href="/account"
              className={`p-1 text-[#1c1a17] hover:opacity-60 transition-opacity ${
                pathname === '/account' ? 'border-b-2 border-[#1c1a17]' : ''
              }`}
              aria-label="Account"
            >
              <User className="w-5 h-5 stroke-[1.6]" />
            </Link>

            <button
              type="button"
              onClick={openDrawer}
              className="relative p-1 text-[#1c1a17] hover:opacity-60 transition-opacity"
              aria-label="View shopping cart"
            >
              <ShoppingBag className="w-5 h-5 stroke-[1.6]" />
              {hasMounted && count > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#1c1a17] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {count}
                </span>
              )}
            </button>

            {/* Mobile menu trigger */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-1 text-[#1c1a17]"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 stroke-[1.6]" />
              ) : (
                <Menu className="w-6 h-6 stroke-[1.6]" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-[#f0ece5] bg-white px-6 py-6 space-y-4">
            <Link
              href="/shop"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-sm font-semibold tracking-wider uppercase text-[#1c1a17]"
            >
              Shop All Products
            </Link>
            <Link
              href="/shop?category=Cleansers"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-sm font-semibold tracking-wider uppercase text-[#7a756d]"
            >
              Cleansers
            </Link>
            <Link
              href="/shop?category=Serums"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-sm font-semibold tracking-wider uppercase text-[#7a756d]"
            >
              Serums
            </Link>
            <Link
              href="/shop?category=Moisturizers"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-sm font-semibold tracking-wider uppercase text-[#7a756d]"
            >
              Moisturizers
            </Link>
            <Link
              href="/shop?category=Sun Care"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-sm font-semibold tracking-wider uppercase text-[#7a756d]"
            >
              Sun Care
            </Link>
            <Link
              href="/shop?category=Sets & Kits"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-sm font-semibold tracking-wider uppercase text-[#7a756d]"
            >
              Sets & Kits
            </Link>
            <div className="pt-4 border-t border-[#f0ece5] flex items-center justify-between">
              <Link
                href="/account"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-xs uppercase font-bold tracking-wider text-[#1c1a17]"
              >
                My Account
              </Link>
              <Link
                href="/cart"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-xs uppercase font-bold tracking-wider text-[#1c1a17]"
              >
                Cart {hasMounted ? `(${count})` : ''}
              </Link>
            </div>
          </div>
        )}
      </header>

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
