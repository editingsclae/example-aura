'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { getProductById, PRODUCTS } from '@/lib/products';
import ProductDetailView from '@/components/ProductDetailView';

function ProductQueryContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const product = getProductById(id || '1') || PRODUCTS[0];

  return <ProductDetailView product={product} />;
}

export default function ProductQueryPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center text-xs tracking-widest uppercase font-semibold text-[#7a756d]">
          Loading product details...
        </div>
      }
    >
      <ProductQueryContent />
    </Suspense>
  );
}
