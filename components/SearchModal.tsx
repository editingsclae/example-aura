'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, X } from 'lucide-react';
import { PRODUCTS, Product } from '@/lib/products';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClose = useCallback(() => {
    setQuery('');
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
      return () => {
        clearTimeout(timer);
        document.body.style.overflow = '';
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleClose]);

  if (!isOpen) return null;

  const results: Product[] = query.trim()
    ? PRODUCTS.filter((p) =>
        (p.name + ' ' + p.desc + ' ' + p.cat)
          .toLowerCase()
          .includes(query.trim().toLowerCase())
      ).slice(0, 5)
    : [];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-24 px-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#1c1a17]/50 backdrop-blur-sm transition-opacity"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-white rounded-lg shadow-2xl border border-[#e5ded3] overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200">
        <div className="p-4 sm:p-6 border-b border-[#e5ded3] flex items-center gap-3">
          <Search className="w-5 h-5 text-[#7a756d] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search clean skincare formulas, toners, serums..."
            className="w-full text-base sm:text-lg font-sans placeholder:text-[#a49d90] outline-none text-[#1c1a17] bg-transparent"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="text-[#7a756d] hover:text-[#1c1a17] p-1"
              aria-label="Clear query"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            type="button"
            onClick={handleClose}
            className="text-xs uppercase tracking-wider font-semibold text-[#7a756d] hover:text-[#1c1a17] px-2 py-1"
          >
            ESC
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 max-h-[60vh] overflow-y-auto">
          {query.trim() === '' ? (
            <div>
              <p className="text-[11px] uppercase tracking-widest font-bold text-[#7a756d] mb-3">
                POPULAR SEARCHES
              </p>
              <div className="flex flex-wrap gap-2">
                {['Radiance Serum', 'Cream Cleanser', 'Mineral Sunscreen', 'Toners', 'Sets & Kits'].map(
                  (term) => (
                    <button
                      key={term}
                      type="button"
                      onClick={() => setQuery(term)}
                      className="text-xs px-3 py-1.5 bg-[#f7f4ef] hover:bg-[#ece5d8] text-[#1c1a17] rounded transition-colors"
                    >
                      {term}
                    </button>
                  )
                )}
              </div>
            </div>
          ) : results.length > 0 ? (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-[11px] uppercase tracking-widest font-bold text-[#7a756d]">
                  PRODUCTS ({results.length})
                </p>
                <Link
                  href={`/shop?q=${encodeURIComponent(query)}`}
                  onClick={handleClose}
                  className="text-xs font-semibold text-[#1c1a17] hover:underline"
                >
                  View all in shop →
                </Link>
              </div>
              <div className="divide-y divide-[#f0ece5]">
                {results.map((p) => (
                  <Link
                    key={p.id}
                    href={`/product/${p.id}`}
                    onClick={handleClose}
                    className="flex items-center gap-4 py-3 group hover:bg-[#fbf9f6] px-2 rounded transition-colors"
                  >
                    <div className="relative w-14 h-16 bg-[#f2ece3] rounded overflow-hidden shrink-0">
                      <Image
                        src={p.img}
                        alt={p.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] tracking-widest uppercase font-semibold text-[#7a756d]">
                        {p.cat}
                      </p>
                      <h4 className="text-sm font-semibold text-[#1c1a17] truncate group-hover:text-[#57524a]">
                        {p.name}
                      </h4>
                      <p className="text-xs text-[#7a756d] truncate">{p.desc}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-sm font-bold text-[#1c1a17]">
                        {p.price.toFixed(2)} TND
                      </span>
                      {!p.stock && (
                        <p className="text-[9px] uppercase tracking-wider text-rose-600 font-bold">
                          Sold Out
                        </p>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-[#7a756d]">
              <p className="text-sm">No formulas found matching &quot;{query}&quot;</p>
              <Link
                href="/shop"
                onClick={handleClose}
                className="inline-block mt-3 text-xs font-semibold uppercase tracking-wider text-[#1c1a17] underline"
              >
                Browse All Products
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
