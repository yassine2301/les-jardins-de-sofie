'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Heart, Minus, Plus, Truck, Shield, Leaf } from 'lucide-react';
import { useCart } from '@/lib/cart-context';
import {
  type ShopifyProduct,
  formatPrice,
  getProductImages,
  getFirstVariantId,
  hasDiscount,
  getDiscountPercent,
} from '@/lib/shopify';
import styles from './ProductDetail.module.css';

interface Props { product: ShopifyProduct; }

export function ProductDetail({ product }: Props) {
  const { addItem, isLoading } = useCart();
  const images = getProductImages(product);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const variantId = getFirstVariantId(product);
  const discount = hasDiscount(product);
  const discountPct = getDiscountPercent(product);

  const handleAdd = async () => {
    if (variantId && product.availableForSale) {
      for (let i = 0; i < quantity; i++) {
        await addItem(variantId);
      }
    }
  };

  return (
    <section className={styles.section}>
      <div className={styles.grid}>
        {/* Images */}
        <div className={styles.images}>
          <div className={styles.mainImg}>
            {images[selectedImage] && (
              <Image
                src={images[selectedImage].url}
                alt={images[selectedImage].altText || product.title}
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            )}
            {discount && (
              <span className={styles.badge}>-{discountPct}%</span>
            )}
          </div>
          {images.length > 1 && (
            <div className={styles.thumbs}>
              {images.map((img, i) => (
                <button
                  key={i}
                  className={`${styles.thumb} ${i === selectedImage ? styles.thumbActive : ''}`}
                  onClick={() => setSelectedImage(i)}
                >
                  <Image src={img.url} alt="" fill style={{ objectFit: 'cover' }} sizes="80px" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className={styles.info}>
          <h1 className={styles.title}>{product.title}</h1>
          <div className={styles.priceRow}>
            <span className={styles.price}>
              {formatPrice(product.priceRange.minVariantPrice)}
            </span>
            {discount && (
              <span className={styles.oldPrice}>
                {formatPrice(product.compareAtPriceRange.minVariantPrice)}
              </span>
            )}
          </div>

          <div className={styles.desc} dangerouslySetInnerHTML={{ __html: product.descriptionHtml }} />

          <div className={styles.actions}>
            <div className={styles.qty}>
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))}><Minus size={14} /></button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)}><Plus size={14} /></button>
            </div>
            <button
              className={styles.addBtn}
              onClick={handleAdd}
              disabled={!product.availableForSale || isLoading}
            >
              {!product.availableForSale ? 'Épuisé' : isLoading ? 'Ajout en cours...' : 'Ajouter au panier'}
            </button>
            <button className={styles.wishBtn} aria-label="Favoris">
              <Heart size={18} strokeWidth={1.5} />
            </button>
          </div>

          <div className={styles.features}>
            <div className={styles.feature}><Truck size={16} strokeWidth={1.3} /><span>Livraison : Rabat 100 MAD · Casablanca 150 MAD</span></div>
            <div className={styles.feature}><Shield size={16} strokeWidth={1.3} /><span>Pièce artisanale unique</span></div>
            <div className={styles.feature}><Leaf size={16} strokeWidth={1.3} /><span>Guide d&apos;entretien inclus</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}
