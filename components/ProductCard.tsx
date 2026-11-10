'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Plus } from 'lucide-react';
import { Product } from '@/lib/products';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (product.stock) {
      addToCart(product.id, 1);
    }
  };

  return (
    <article className="group bg-white rounded overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_16px_34px_rgba(60,50,35,0.08)] flex flex-col h-full border border-[#f0ece5]">
      {/* Media */}
      <Link
        href={`/product/${product.id}`}
        className="relative block aspect-square bg-[#f2ece3] overflow-hidden"
      >
        <Image
          src={product.img}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          referrerPolicy="no-referrer"
        />

        {!product.stock && (
          <>
            <span className="absolute top-3 left-3 bg-white text-[#1c1a17] text-[9px] font-bold tracking-wider px-2.5 py-1 rounded-full border border-[#e5ded3] shadow-sm z-10">
              SOLD OUT
            </span>
            <div className="absolute inset-0 bg-[#f7f4ef]/55 backdrop-blur-[0.5px]" />
          </>
        )}
      </Link>

      {/* Body */}
      <div className="p-4 sm:p-5 flex flex-col flex-1">
        <p className="text-[9px] font-bold tracking-[0.16em] uppercase text-[#7a756d] mb-1">
          {product.cat}
        </p>

        <h3 className="text-xs sm:text-[13px] font-bold tracking-[0.06em] uppercase text-[#1c1a17] mb-1.5 group-hover:text-[#5c564c] transition-colors">
          <Link href={`/product/${product.id}`}>{product.name}</Link>
        </h3>

        <p className="text-[11px] sm:text-xs leading-relaxed text-[#7a756d] line-clamp-2 mb-4 flex-1">
          {product.desc}
        </p>

        <div className="flex items-center justify-between pt-2 border-t border-[#f7f4ef] mt-auto">
          <span className="text-[13.5px] font-bold text-[#1c1a17]">
            {product.price.toFixed(2)} TND
          </span>

          <button
            type="button"
            onClick={handleAdd}
            disabled={!product.stock}
            aria-label={`Add ${product.name} to cart`}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
              product.stock
                ? 'bg-[#1c1a17] text-white hover:scale-110 active:scale-95 cursor-pointer shadow-sm'
                : 'bg-[#d8d1c5] text-white cursor-not-allowed opacity-60'
            }`}
          >
            <Plus className="w-3.5 h-3.5 stroke-[2.2]" />
          </button>
        </div>
      </div>
    </article>
  );
}
