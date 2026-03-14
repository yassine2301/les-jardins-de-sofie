'use client';

import Image from 'next/image';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useCart } from '@/lib/cart-context';
import { formatPrice } from '@/lib/shopify';
import styles from './CartDrawer.module.css';

export function CartDrawer() {
  const { cart, isOpen, closeCart, removeItem, isLoading } = useCart();
  const lines = cart?.lines.edges.map((e) => e.node) ?? [];

  return (
    <>
      {/* Overlay */}
      <div
        className={`${styles.overlay} ${isOpen ? styles.overlayOpen : ''}`}
        onClick={closeCart}
      />

      {/* Drawer */}
      <div className={`${styles.drawer} ${isOpen ? styles.drawerOpen : ''}`}>
        <div className={styles.header}>
          <h3 className={styles.title}>
            <ShoppingBag size={18} strokeWidth={1.5} />
            Votre panier ({cart?.totalQuantity ?? 0})
          </h3>
          <button onClick={closeCart} className={styles.close}>
            <X size={20} strokeWidth={1.5} />
          </button>
        </div>

        <div className={styles.body}>
          {lines.length === 0 ? (
            <div className={styles.empty}>
              <p>Votre panier est vide</p>
              <button onClick={closeCart} className="btn-primary" style={{ fontSize: '0.7rem' }}>
                Continuer mes achats
              </button>
            </div>
          ) : (
            lines.map((line) => {
              const img = line.merchandise.image || line.merchandise.product.images.edges[0]?.node;
              return (
                <div key={line.id} className={styles.item}>
                  <div className={styles.itemImg}>
                    {img && (
                      <Image src={img.url} alt={line.merchandise.product.title} fill style={{ objectFit: 'cover' }} sizes="80px" />
                    )}
                  </div>
                  <div className={styles.itemInfo}>
                    <h4>{line.merchandise.product.title}</h4>
                    {line.merchandise.title !== 'Default Title' && (
                      <p className={styles.variant}>{line.merchandise.title}</p>
                    )}
                    <p className={styles.itemPrice}>
                      {formatPrice(line.merchandise.price)} × {line.quantity}
                    </p>
                  </div>
                  <button
                    className={styles.remove}
                    onClick={() => removeItem(line.id)}
                    disabled={isLoading}
                  >
                    <X size={14} />
                  </button>
                </div>
              );
            })
          )}
        </div>

        {lines.length > 0 && cart && (
          <div className={styles.footer}>
            <div className={styles.total}>
              <span>Total</span>
              <strong>{formatPrice(cart.cost.totalAmount)}</strong>
            </div>
            <a href={cart.checkoutUrl} className={styles.checkout}>
              Procéder au paiement
            </a>
            <p className={styles.note}>Livraison : Rabat 100 MAD · Casablanca 150 MAD</p>
          </div>
        )}
      </div>
    </>
  );
}
