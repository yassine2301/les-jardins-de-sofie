'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import { useCart } from '@/lib/cart-context';
import {
  type ShopifyProduct,
  formatPrice,
  getProductImages,
  getFirstVariantId,
  hasDiscount,
  getDiscountPercent,
} from '@/lib/shopify';
import styles from './ProductCard.module.css';

interface Props {
  product: ShopifyProduct;
}

export function ProductCard({ product }: Props) {
  const { addItem, isLoading } = useCart();
  const images = getProductImages(product);
  const mainImage = images[0];
  const hoverImage = images[1] || null;
  const variantId = getFirstVariantId(product);
  const discount = hasDiscount(product);
  const discountPct = getDiscountPercent(product);

  const handleQuickAdd = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (variantId && product.availableForSale) {
      await addItem(variantId);
    }
  };

  return (
    <Link href={`/produit/${product.handle}`} className={styles.card}>
      <div className={styles.imageWrap}>
        {mainImage && (
          <Image
            src={mainImage.url}
            alt={mainImage.altText || product.title}
            fill
            sizes="260px"
            className={`${styles.img} ${styles.imgMain}`}
          />
        )}
        {hoverImage && (
          <Image
            src={hoverImage.url}
            alt={hoverImage.altText || product.title}
            fill
            sizes="260px"
            className={`${styles.img} ${styles.imgHover}`}
          />
        )}

        {/* Badges */}
        {!product.availableForSale && (
          <span className={`${styles.badge} ${styles.badgeOut}`}>Épuisé</span>
        )}
        {discount && product.availableForSale && (
          <span className={`${styles.badge} ${styles.badgePromo}`}>-{discountPct}%</span>
        )}

        {/* Wishlist */}
        <button className={styles.wishlist} aria-label="Ajouter aux favoris">
          <Heart size={14} strokeWidth={1.5} />
        </button>

        {/* Quick add */}
        {product.availableForSale && (
          <button
            className={styles.quickAdd}
            onClick={handleQuickAdd}
            disabled={isLoading}
          >
            {isLoading ? 'Ajout...' : 'Ajout rapide'}
          </button>
        )}
      </div>

      <div className={styles.info}>
        <h3 className={styles.name}>{product.title}</h3>
        <p className={styles.sub}>{product.description?.slice(0, 60)}</p>
        <p className={styles.price}>
          {discount && (
            <span className={styles.oldPrice}>
              {formatPrice(product.compareAtPriceRange.minVariantPrice)}
            </span>
          )}
          {formatPrice(product.priceRange.minVariantPrice)}
        </p>
      </div>
    </Link>
  );
}
