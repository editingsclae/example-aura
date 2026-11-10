'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Search, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { PRODUCTS, CATEGORIES, Product } from '@/lib/products';
import ProductCard from '@/components/ProductCard';

const PER_PAGE = 8;
const MAX_PRICE = 100;

function ShopContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || '';
  const initialQuery = searchParams.get('q') || '';

  const [search, setSearch] = useState(initialQuery);
  const [selectedCats, setSelectedCats] = useState<string[]>(
    initialCategory ? [initialCategory] : []
  );
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(MAX_PRICE);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState('featured');
  const [page, setPage] = useState(1);

  const [prevCategory, setPrevCategory] = useState(initialCategory);
  if (initialCategory !== prevCategory) {
    setPrevCategory(initialCategory);
    setSelectedCats(initialCategory ? [initialCategory] : []);
  }

  const [prevQuery, setPrevQuery] = useState(initialQuery);
  if (initialQuery !== prevQuery) {
    setPrevQuery(initialQuery);
    setSearch(initialQuery);
  }

  const toggleCategory = (cat: string) => {
    setSelectedCats((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
    setPage(1);
  };

  const handleClearAll = () => {
    setSearch('');
    setSelectedCats([]);
    setMinPrice(0);
    setMaxPrice(MAX_PRICE);
    setInStockOnly(false);
    setSortBy('featured');
    setPage(1);
  };

  // Filtered & Sorted list
  const filteredProducts = useMemo(() => {
    const q = search.trim().toLowerCase();

    let list = PRODUCTS.filter((p) => {
      // Search
      if (q && !(p.name + ' ' + p.desc + ' ' + p.cat).toLowerCase().includes(q)) {
        return false;
      }
      // Categories
      if (selectedCats.length > 0 && !selectedCats.includes(p.cat)) {
        return false;
      }
      // Price
      if (p.price < minPrice || p.price > maxPrice) {
        return false;
      }
      // Stock
      if (inStockOnly && !p.stock) {
        return false;
      }
      return true;
    });

    // Sort
    if (sortBy === 'price-asc') {
      list = [...list].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      list = [...list].sort((a, b) => b.price - a.price);
    } else if (sortBy === 'name') {
      list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    }

    return list;
  }, [search, selectedCats, minPrice, maxPrice, inStockOnly, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const paginatedList = useMemo(() => {
    const start = (currentPage - 1) * PER_PAGE;
    return filteredProducts.slice(start, start + PER_PAGE);
  }, [filteredProducts, currentPage]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 180, behavior: 'smooth' });
  };

  const fillLeft = `${(minPrice / MAX_PRICE) * 100}%`;
  const fillWidth = `${((maxPrice - minPrice) / MAX_PRICE) * 100}%`;

  return (
    <main className="min-h-screen">
      {/* ══ Hero ══ */}
      <section className="bg-[#f3ede5] py-12 text-center border-b border-[#e5ded3]/60">
        <div className="max-w-[1240px] mx-auto px-6">
          <p className="text-[10px] font-semibold tracking-[0.16em] uppercase text-[#7a756d] mb-3">
            <Link href="/" className="hover:text-[#1c1a17]">
              HOME
            </Link>{' '}
            / SHOP
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl font-medium text-[#1c1a17] mb-2">
            Shop All
          </h1>
          <p className="text-xs sm:text-sm text-[#7a756d]">
            Clean, clinically tested formulas for every step of your ritual.
          </p>
        </div>
      </section>

      {/* ══ Shop Layout ══ */}
      <div className="max-w-[1240px] mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* ── Sidebar Filters ── */}
          <aside className="lg:col-span-3 lg:sticky lg:top-24 bg-white border border-[#e5ded3] rounded-md p-6 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-[#f0ece5]">
              <h2 className="text-[13px] font-bold tracking-[0.14em] uppercase text-[#1c1a17]">
                FILTERS
              </h2>
              <button
                type="button"
                onClick={handleClearAll}
                className="text-[10.5px] font-semibold tracking-wider text-[#7a756d] hover:text-[#1c1a17] underline underline-offset-4 cursor-pointer"
              >
                Clear all
              </button>
            </div>

            {/* Search */}
            <div>
              <label
                htmlFor="shopSearch"
                className="block text-[10px] font-bold tracking-[0.16em] uppercase text-[#1c1a17] mb-2.5"
              >
                SEARCH
              </label>
              <div className="relative flex items-center">
                <Search className="w-4 h-4 text-[#a49d90] absolute left-3 pointer-events-none" />
                <input
                  id="shopSearch"
                  type="text"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                  }}
                  placeholder="Search products…"
                  className="w-full bg-[#fdfcfa] border border-[#d8d1c5] rounded px-9 py-2 text-xs outline-none focus:border-[#1c1a17] text-[#1c1a17] placeholder:text-[#a49d90]"
                />
                {search && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearch('');
                      setPage(1);
                    }}
                    className="absolute right-2.5 text-[#7a756d] hover:text-[#1c1a17] p-1"
                    aria-label="Clear search"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Categories */}
            <div className="pt-3 border-t border-[#f0ece5]">
              <p className="text-[10px] font-bold tracking-[0.16em] uppercase text-[#1c1a17] mb-3">
                CATEGORIES
              </p>
              <div className="space-y-1.5">
                {CATEGORIES.map((cat) => {
                  const count = PRODUCTS.filter((p) => p.cat === cat).length;
                  const isChecked = selectedCats.includes(cat);
                  return (
                    <label
                      key={cat}
                      className="flex items-center gap-2.5 py-1 text-xs cursor-pointer group select-none"
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleCategory(cat)}
                        className="sr-only"
                      />
                      <div
                        className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                          isChecked
                            ? 'bg-[#1c1a17] border-[#1c1a17] text-white'
                            : 'border-[#c9c1b3] bg-white group-hover:border-[#1c1a17]'
                        }`}
                      >
                        {isChecked && (
                          <svg
                            className="w-2.5 h-2.5 stroke-[3] fill-none stroke-current"
                            viewBox="0 0 24 24"
                          >
                            <path d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      <span className="text-[11.5px] font-semibold tracking-wider uppercase text-[#1c1a17] flex-1">
                        {cat}
                      </span>
                      <span className="text-[10px] text-[#7a756d]">{count}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Price Range */}
            <div className="pt-3 border-t border-[#f0ece5]">
              <p className="text-[10px] font-bold tracking-[0.16em] uppercase text-[#1c1a17] mb-2">
                PRICE RANGE
              </p>
              <div className="flex justify-between text-xs text-[#7a756d] mb-2 font-mono">
                <span>
                  <b className="text-[#1c1a17] font-semibold">{minPrice}</b> TND
                </span>
                <span>
                  <b className="text-[#1c1a17] font-semibold">{maxPrice}</b> TND
                </span>
              </div>
              <div className="relative h-6 flex items-center">
                <div className="absolute inset-x-0 h-1 bg-[#e7e0d4] rounded" />
                <div
                  className="absolute h-1 bg-[#1c1a17] rounded"
                  style={{ left: fillLeft, width: fillWidth }}
                />
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="2"
                  value={minPrice}
                  onChange={(e) => {
                    const val = Math.min(Number(e.target.value), maxPrice - 4);
                    setMinPrice(val);
                    setPage(1);
                  }}
                  className="absolute inset-0 w-full opacity-0 cursor-pointer pointer-events-auto"
                  aria-label="Minimum price"
                />
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="2"
                  value={maxPrice}
                  onChange={(e) => {
                    const val = Math.max(Number(e.target.value), minPrice + 4);
                    setMaxPrice(val);
                    setPage(1);
                  }}
                  className="absolute inset-0 w-full opacity-0 cursor-pointer pointer-events-auto"
                  aria-label="Maximum price"
                />
              </div>
            </div>

            {/* In Stock Only */}
            <div className="pt-3 border-t border-[#f0ece5]">
              <label className="flex items-center gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => {
                    setInStockOnly(e.target.checked);
                    setPage(1);
                  }}
                  className="sr-only"
                />
                <div
                  className={`w-9 h-5 rounded-full p-0.5 transition-colors relative ${
                    inStockOnly ? 'bg-[#1c1a17]' : 'bg-[#ddd5c8]'
                  }`}
                >
                  <div
                    className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${
                      inStockOnly ? 'translate-x-4' : 'translate-x-0'
                    }`}
                  />
                </div>
                <span className="text-[10.5px] font-bold tracking-[0.14em] uppercase text-[#1c1a17]">
                  IN STOCK ONLY
                </span>
              </label>
            </div>
          </aside>

          {/* ── Main Catalog ── */}
          <section className="lg:col-span-9">
            {/* Toolbar */}
            <div className="flex items-center justify-between pb-6 mb-6 border-b border-[#f0ece5]">
              <p className="text-xs text-[#7a756d]">
                {filteredProducts.length === 1
                  ? '1 product'
                  : `${filteredProducts.length} products`}
              </p>

              <label className="flex items-center gap-2.5 text-[10px] font-bold tracking-[0.14em] uppercase text-[#1c1a17]">
                <span>SORT BY</span>
                <select
                  value={sortBy}
                  onChange={(e) => {
                    setSortBy(e.target.value);
                    setPage(1);
                  }}
                  className="text-xs font-medium font-sans border border-[#d8d1c5] rounded bg-white px-2.5 py-1.5 outline-none focus:border-[#1c1a17] cursor-pointer"
                >
                  <option value="featured">Featured</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="name">Name: A–Z</option>
                </select>
              </label>
            </div>

            {/* Grid */}
            {paginatedList.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedList.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-24 flex flex-col items-center gap-4 text-[#7a756d]">
                <p className="text-sm">No products match your selected filters.</p>
                <button
                  type="button"
                  onClick={handleClearAll}
                  className="inline-flex items-center justify-center text-xs font-bold tracking-[0.16em] uppercase text-[#1c1a17] underline underline-offset-4 hover:opacity-70 transition-opacity"
                >
                  RESET FILTERS
                </button>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <nav
                className="flex items-center justify-center gap-2 mt-12 pt-6 border-t border-[#f0ece5]"
                aria-label="Pagination"
              >
                <button
                  type="button"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="w-9 h-9 flex items-center justify-center border border-[#e5ded3] rounded bg-white text-[#1c1a17] hover:border-[#1c1a17] disabled:opacity-30 disabled:pointer-events-none transition-colors"
                  aria-label="Previous page"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pNum) => (
                  <button
                    key={pNum}
                    type="button"
                    onClick={() => handlePageChange(pNum)}
                    className={`w-9 h-9 text-xs font-semibold rounded border transition-colors ${
                      pNum === currentPage
                        ? 'bg-[#1c1a17] border-[#1c1a17] text-white'
                        : 'bg-white border-[#e5ded3] text-[#1c1a17] hover:border-[#1c1a17]'
                    }`}
                  >
                    {pNum}
                  </button>
                ))}

                <button
                  type="button"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="w-9 h-9 flex items-center justify-center border border-[#e5ded3] rounded bg-white text-[#1c1a17] hover:border-[#1c1a17] disabled:opacity-30 disabled:pointer-events-none transition-colors"
                  aria-label="Next page"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </nav>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center text-xs tracking-widest uppercase font-semibold text-[#7a756d]">
          Loading AURA catalog...
        </div>
      }
    >
      <ShopContent />
    </Suspense>
  );
}
