'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  ChevronLeft,
  ChevronRight,
  Minus,
  Plus,
  ShoppingBag,
  Truck,
  RotateCcw,
  Sparkles,
  Check,
  Plus as PlusIcon,
  ArrowRight
} from 'lucide-react';
import { Product, PRODUCTS, BENEFITS_MAP, INGREDIENTS_MAP } from '@/lib/products';
import { useCart } from '@/context/CartContext';
import ProductCard from '@/components/ProductCard';

interface ProductDetailViewProps {
  product: Product;
}

export default function ProductDetailView({ product }: ProductDetailViewProps) {
  const router = useRouter();
  const { addToCart } = useCart();
  const gallery = product.gallery && product.gallery.length > 0 ? product.gallery : [product.img];

  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [qty, setQty] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string>('150 ml');
  const [openAccordion, setOpenAccordion] = useState<string | null>('desc');

  // Volume/Size options per category
  const sizeOptionsMap: Record<string, string[]> = {
    Cleansers: ['50 ml', '150 ml', '250 ml', '500 ml'],
    Serums: ['30 ml', '50 ml', '100 ml'],
    Moisturizers: ['50 ml', '100 ml', '200 ml'],
    'Sun Care': ['50 ml', '100 ml', '150 ml'],
    Masks: ['50 ml', '100 ml', '150 ml'],
    Toners: ['120 ml', '200 ml', '350 ml'],
    'Sets & Kits': ['Starter Kit', 'Deluxe Routine', 'Value Pack']
  };

  const sizes = sizeOptionsMap[product.cat] || ['50 ml', '150 ml', '250 ml'];

  const [prevProductId, setPrevProductId] = useState(product.id);
  if (product.id !== prevProductId) {
    setPrevProductId(product.id);
    setSelectedSize(sizes[0] || '150 ml');
    setCurrentImgIndex(0);
  }

  const benefits = BENEFITS_MAP[product.cat] || BENEFITS_MAP['Cleansers'];

  const prevImage = () => {
    setCurrentImgIndex((prev) => (prev - 1 + gallery.length) % gallery.length);
  };

  const nextImage = () => {
    setCurrentImgIndex((prev) => (prev + 1) % gallery.length);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        setCurrentImgIndex((prev) => (prev - 1 + gallery.length) % gallery.length);
      }
      if (e.key === 'ArrowRight') {
        setCurrentImgIndex((prev) => (prev + 1) % gallery.length);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gallery.length]);

  const handleAddToCart = () => {
    if (product.stock) {
      addToCart(product.id, qty, selectedSize);
    }
  };

  const handleBuyNow = () => {
    if (product.stock) {
      addToCart(product.id, qty, selectedSize);
      router.push('/checkout');
    }
  };

  const related = PRODUCTS.filter(
    (p) => p.id !== product.id && p.cat === product.cat
  )
    .concat(PRODUCTS.filter((p) => p.id !== product.id && p.cat !== product.cat))
    .slice(0, 4);

  return (
    <main className="max-w-[1240px] mx-auto px-6 py-8 sm:py-12">
      {/* ── Breadcrumb ── */}
      <p className="text-[10px] font-semibold tracking-[0.16em] uppercase text-[#7a756d] mb-8">
        <Link href="/" className="hover:text-[#1c1a17] transition-colors">
          HOME
        </Link>{' '}
        /{' '}
        <Link href="/shop" className="hover:text-[#1c1a17] transition-colors">
          {product.cat.toUpperCase()}
        </Link>{' '}
        / <span className="text-[#1c1a17]">{product.name}</span>
      </p>

      {/* ── Main Product Grid (Left: Photo + Thumbnails + Accordions; Right: Purchase Module) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* ══ LEFT COLUMN ══ */}
        <div className="lg:col-span-7 flex flex-col space-y-6">
          {/* Main Photo Frame */}
          <div className="relative w-full aspect-[4/4.5] sm:aspect-[4/4.6] bg-[#f2ece3] rounded-md overflow-hidden shadow-sm border border-[#e8e2d8]">
            <Image
              key={currentImgIndex}
              src={gallery[currentImgIndex]}
              alt={`${product.name} photo ${currentImgIndex + 1}`}
              fill
              priority
              className="object-cover fade-in"
              referrerPolicy="no-referrer"
            />

            {gallery.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={prevImage}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-[#1c1a17] shadow-md flex items-center justify-center transition-all cursor-pointer"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-4 h-4 stroke-[2]" />
                </button>
                <button
                  type="button"
                  onClick={nextImage}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-[#1c1a17] shadow-md flex items-center justify-center transition-all cursor-pointer"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-4 h-4 stroke-[2]" />
                </button>
                <span className="absolute bottom-3 right-3 bg-[#1c1a17]/70 text-white text-[10px] font-semibold tracking-wider px-2.5 py-1 rounded-full">
                  {currentImgIndex + 1} / {gallery.length}
                </span>
              </>
            )}
          </div>

          {/* Thumbnails Row (positioned directly under main photo frame) */}
          {gallery.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-1">
              {gallery.map((imgUrl, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setCurrentImgIndex(i)}
                  className={`relative w-16 sm:w-20 aspect-square rounded overflow-hidden border-2 transition-all cursor-pointer bg-[#f2ece3] shrink-0 ${
                    currentImgIndex === i
                      ? 'border-[#1c1a17]'
                      : 'border-transparent hover:border-[#b8ae9e]'
                  }`}
                  aria-label={`Show photo ${i + 1}`}
                >
                  <Image
                    src={imgUrl}
                    alt={`${product.name} thumbnail ${i + 1}`}
                    fill
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                </button>
              ))}
            </div>
          )}

          {/* Accordions Section (positioned directly under thumbnails in left column) */}
          <div className="pt-4 border-t border-[#e5ded3] divide-y divide-[#e5ded3]">
            {/* Description Accordion */}
            <div>
              <button
                type="button"
                onClick={() => setOpenAccordion(openAccordion === 'desc' ? null : 'desc')}
                className="w-full py-5 flex items-center justify-between text-left text-[11px] font-bold tracking-[0.16em] uppercase text-[#1c1a17] cursor-pointer"
              >
                <span>DESCRIPTION</span>
                <PlusIcon
                  className={`w-4 h-4 transition-transform duration-200 ${
                    openAccordion === 'desc' ? 'rotate-45' : 'rotate-0'
                  }`}
                />
              </button>
              {openAccordion === 'desc' && (
                <div className="pb-6 text-xs sm:text-sm leading-relaxed text-[#7a756d] space-y-3">
                  <p>
                    <b className="text-[#1c1a17]">{product.name}</b> — everyday pure skincare. {product.long}
                  </p>
                  <p className="text-xs text-[#7a756d]">
                    Formulated for all skin types. Lightweight texture absorbs seamlessly with zero sticky residue — leaves a healthy, refreshed finish.
                  </p>
                </div>
              )}
            </div>

            {/* Shipping & Cash on Delivery Accordion */}
            <div>
              <button
                type="button"
                onClick={() => setOpenAccordion(openAccordion === 'shipping' ? null : 'shipping')}
                className="w-full py-5 flex items-center justify-between text-left text-[11px] font-bold tracking-[0.16em] uppercase text-[#1c1a17] cursor-pointer"
              >
                <span>SHIPPING &amp; CASH ON DELIVERY</span>
                <PlusIcon
                  className={`w-4 h-4 transition-transform duration-200 ${
                    openAccordion === 'shipping' ? 'rotate-45' : 'rotate-0'
                  }`}
                />
              </button>
              {openAccordion === 'shipping' && (
                <div className="pb-6 text-xs sm:text-sm leading-relaxed text-[#7a756d]">
                  <ul className="space-y-2 list-disc list-inside">
                    <li>
                      <b className="text-[#1c1a17]">Cash on delivery</b> — pay the courier in cash on arrival. Nothing is charged online.
                    </li>
                    <li>Delivery options and rates are calculated at checkout.</li>
                    <li>Inspect your parcel on delivery.</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ══ RIGHT COLUMN (Sticky Purchase Panel) ══ */}
        <div className="lg:col-span-5 flex flex-col space-y-6 lg:sticky lg:top-24">
          <div>
            <p className="text-[10px] font-bold tracking-[0.16em] uppercase text-[#7a756d] mb-1">
              {product.cat}
            </p>

            <h1 className="font-serif text-3xl sm:text-4xl font-medium leading-tight text-[#1c1a17] mb-3">
              {product.name}
            </h1>

            {/* Price & Cash on delivery sublabel */}
            <div className="flex items-baseline gap-3 mb-2">
              <span className="text-2xl font-bold text-[#1c1a17] font-mono">
                {product.price.toFixed(2)} TND
              </span>
              <span className="text-xs text-[#7a756d]">
                Cash on delivery across Tunisia
              </span>
            </div>

            {/* Stock indicator */}
            <div className="flex items-center gap-2 text-[10.5px] font-bold tracking-[0.1em] text-[#7a756d] uppercase mb-5">
              <span
                className={`w-2 h-2 rounded-full inline-block ${
                  product.stock ? 'bg-emerald-600' : 'bg-rose-500'
                }`}
              />
              <span>{product.stock ? 'IN STOCK — SHIPS IN 1–2 DAYS' : 'SOLD OUT'}</span>
            </div>
          </div>

          {/* Size / Volume Selector */}
          <div className="pb-4 border-b border-[#f0ece5]">
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-[10px] font-bold tracking-[0.14em] uppercase text-[#1c1a17]">
                SELECT SIZE / VOLUME
              </span>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
              {sizes.map((sz) => (
                <button
                  key={sz}
                  type="button"
                  onClick={() => setSelectedSize(sz)}
                  className={`py-2 px-3 text-xs font-bold uppercase rounded transition-colors cursor-pointer text-center ${
                    selectedSize === sz
                      ? 'bg-[#1c1a17] text-white border border-[#1c1a17]'
                      : 'bg-white border border-[#d8d1c5] text-[#1c1a17] hover:border-[#1c1a17]'
                  }`}
                >
                  {sz}
                </button>
              ))}
            </div>
          </div>

          {/* Benefits Bullet List */}
          <ul className="space-y-2 pb-4 border-b border-[#f0ece5]">
            {benefits.map((benefit, i) => (
              <li key={i} className="flex items-center gap-2.5 text-xs text-[#403c35]">
                <Check className="w-4 h-4 text-emerald-600 stroke-[2.2] shrink-0" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>

          {/* Quantity & Buy Module */}
          <div className="space-y-3">
            <div className="flex gap-3">
              {/* Stepper */}
              <div className="flex items-center border border-[#d8d1c5] rounded bg-white shrink-0">
                <button
                  type="button"
                  onClick={() => setQty((prev) => Math.max(1, prev - 1))}
                  className="w-10 h-12 flex items-center justify-center text-[#1c1a17] hover:opacity-60 transition-opacity cursor-pointer"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <input
                  type="text"
                  value={qty}
                  readOnly
                  className="w-10 text-center font-semibold text-sm outline-none bg-transparent text-[#1c1a17]"
                  aria-label="Quantity"
                />
                <button
                  type="button"
                  onClick={() => setQty((prev) => Math.min(99, prev + 1))}
                  className="w-10 h-12 flex items-center justify-center text-[#1c1a17] hover:opacity-60 transition-opacity cursor-pointer"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Add To Cart */}
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={!product.stock}
                className="flex-1 inline-flex items-center justify-center gap-2.5 bg-[#1c1a17] text-white text-[11px] font-semibold tracking-[0.18em] uppercase py-3.5 px-6 hover:bg-[#3a352e] disabled:bg-[#c9c1b3] disabled:cursor-not-allowed transition-colors shadow-sm cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4 stroke-[1.8]" />
                <span>ADD TO CART</span>
              </button>
            </div>

            {/* Buy It Now */}
            <button
              type="button"
              onClick={handleBuyNow}
              disabled={!product.stock}
              className="w-full inline-flex items-center justify-center border-1.5 border-[#1c1a17] text-[#1c1a17] bg-transparent text-[11px] font-semibold tracking-[0.18em] uppercase py-3.5 hover:bg-[#1c1a17] hover:text-white disabled:border-[#c9c1b3] disabled:text-[#c9c1b3] disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              BUY IT NOW
            </button>
          </div>

          {/* Cash on Delivery Callout Banner Box */}
          <div className="bg-[#f7f4ef] border border-[#e5ded3] rounded p-4 flex items-start gap-3.5">
            <div className="w-8 h-8 rounded-full bg-white border border-[#e5ded3] flex items-center justify-center shrink-0 mt-0.5">
              <Truck className="w-4 h-4 text-[#1c1a17] stroke-[1.6]" />
            </div>
            <p className="text-xs text-[#7a756d] leading-relaxed">
              <b className="text-[#1c1a17] font-semibold">Pay the courier in cash.</b> Nothing is charged online — you hand over the money when the box arrives.
            </p>
          </div>

          {/* Assurances */}
          <div className="space-y-2.5 pt-4 border-t border-[#f0ece5] text-xs text-[#7a756d]">
            <div className="flex items-center gap-2.5">
              <Truck className="w-4 h-4 text-[#1c1a17] stroke-[1.4]" />
              <span>Standard delivery across Tunisia</span>
            </div>
            <div className="flex items-center gap-2.5">
              <RotateCcw className="w-4 h-4 text-[#1c1a17] stroke-[1.4]" />
              <span>30-day hassle-free money back guarantee</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-4 h-4 text-[#1c1a17] stroke-[1.4]" />
              <span>Clinically tested &amp; dermatologist approved</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── OTHERS IN THIS FAMILY SECTION ── */}
      <section className="mt-20 pt-12 border-t border-[#e5ded3]">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-[#7a756d] mb-1">
              COMPLETE THE LOOK
            </p>
            <h2 className="text-base font-bold tracking-[0.12em] uppercase text-[#1c1a17]">
              OTHERS IN THIS FAMILY
            </h2>
          </div>

          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-[10.5px] font-semibold tracking-[0.16em] uppercase text-[#7a756d] hover:text-[#1c1a17] transition-colors group"
          >
            <span>VIEW ALL</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
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
