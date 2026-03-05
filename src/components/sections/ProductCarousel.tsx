'use client';

import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { type ShopifyProduct } from '@/lib/shopify';
import { ProductCard } from '@/components/product/ProductCard';
import styles from './ProductCarousel.module.css';

interface Props {
  label: string;
  title: string;
  products: ShopifyProduct[];
  id: string;
}

export function ProductCarousel({ label, title, products, id }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: number) => {
    trackRef.current?.scrollBy({ left: dir * 280, behavior: 'smooth' });
  };

  if (products.length === 0) return null;

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <div>
          <span className="section-label">{label}</span>
          <h2 className="section-title">{title}</h2>
        </div>
        <div className={styles.nav}>
          <button className={styles.navBtn} onClick={() => scroll(-1)} aria-label="Précédent">
            <ChevronLeft size={14} strokeWidth={1.5} />
          </button>
          <button className={styles.navBtn} onClick={() => scroll(1)} aria-label="Suivant">
            <ChevronRight size={14} strokeWidth={1.5} />
          </button>
        </div>
      </div>
      <div className={styles.track} ref={trackRef}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
