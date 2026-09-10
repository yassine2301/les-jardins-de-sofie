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
} from '@/lib/shopify';
import styles from './ProductDetail.module.css';

interface Props { product: ShopifyProduct; }

export function ProductDetail({ product }: Props) {
  const { addItem, isLoading } = useCart();
  const images = getProductImages(product);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [variantId, setVariantId] = useState(getFirstVariantId(product));
  const variant = product.variants.edges.find(e => e.node.id === variantId)?.node;
  const canBuy = Boolean(variant?.availableForSale);

  const currentPrice = Number(variant?.price.amount ?? 0);
  const comparePrice = Number(variant?.compareAtPrice?.amount ?? 0);
  const discount = comparePrice > currentPrice && currentPrice > 0;
  const discountPct = discount ? Math.round((1 - currentPrice / comparePrice) * 100) : 0;

  const handleAdd = async () => {
    if (variantId && canBuy) {
      await addItem(variantId, quantity);
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
              {formatPrice(variant?.price ?? product.priceRange.minVariantPrice)}
            </span>
            {discount && (
              <span className={styles.oldPrice}>
                {formatPrice(variant!.compareAtPrice!)}
              </span>
            )}
          </div>

          <div className={styles.desc} dangerouslySetInnerHTML={{ __html: product.descriptionHtml }} />

          {product.variants.edges.length > 1 && (
            <label>
              Choisir une option
              <select value={variantId} onChange={e => setVariantId(e.target.value)} disabled={isLoading}>
                {!variantId && <option value="">Indisponible</option>}
                {product.variants.edges.map(({ node }) => (
                  <option key={node.id} value={node.id} disabled={!node.availableForSale}>
                    {node.title} — {formatPrice(node.price)}{node.availableForSale ? '' : ' — Épuisé'}
                  </option>
                ))}
              </select>
            </label>
          )}
          <div className={styles.actions}>
            <div className={styles.qty}>
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))}><Minus size={14} /></button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)}><Plus size={14} /></button>
            </div>
            <button
              className={styles.addBtn}
              onClick={handleAdd}
              disabled={!canBuy || isLoading}
            >
              {!canBuy ? 'Épuisé' : isLoading ? 'Ajout en cours...' : 'Ajouter au panier'}
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
