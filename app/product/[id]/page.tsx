import { notFound } from 'next/navigation';
import { getProductById, PRODUCTS } from '@/lib/products';
import ProductDetailView from '@/components/ProductDetailView';

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({
    id: String(p.id),
  }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    notFound();
  }

  return <ProductDetailView product={product} />;
}
