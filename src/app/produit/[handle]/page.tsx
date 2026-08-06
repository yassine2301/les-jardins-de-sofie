import { notFound } from 'next/navigation';
import { getProductByHandle, getAllProducts } from '@/lib/shopify';
import { ProductDetail } from '@/components/product/ProductDetail';

export const revalidate = 60;

// Generate static paths for all products
export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map((p) => ({ handle: p.handle }));
}

export default async function ProductPage({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params;
  const product = await getProductByHandle(handle);
  if (!product) notFound();

  return <ProductDetail product={product} />;
}
