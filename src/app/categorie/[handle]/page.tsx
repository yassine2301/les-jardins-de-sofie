import { getProductsByCollection, getAllCollections } from '@/lib/shopify';
import { ProductCard } from '@/components/product/ProductCard';
import styles from './categorie.module.css';

export const revalidate = 60;

export async function generateStaticParams() {
  const collections = await getAllCollections();
  return collections.map((c) => ({ handle: c.handle }));
}

export default async function CategoryPage({ params }: { params: { handle: string } }) {
  const collections = await getAllCollections();
  const collection = collections.find((c) => c.handle === params.handle);
  const products = await getProductsByCollection(params.handle, 50);

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <span className="section-label">Collection</span>
        <h1 className="section-title">{collection?.title || params.handle}</h1>
        {collection?.description && (
          <p className="section-desc">{collection.description}</p>
        )}
      </div>
      <div className={styles.grid}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {products.length === 0 && (
        <p className={styles.empty}>Aucun produit dans cette collection pour le moment.</p>
      )}
    </section>
  );
}
