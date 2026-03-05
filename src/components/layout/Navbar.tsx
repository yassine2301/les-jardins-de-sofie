'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, User, ShoppingBag, Menu, X } from 'lucide-react';
import { useCart } from '@/lib/cart-context';
import styles from './Navbar.module.css';

const links = [
  { href: '/categorie/compositions', label: 'Compositions' },
  { href: '/categorie/plantes', label: 'Plantes' },
  { href: '/categorie/pots', label: 'Pots' },
  { href: '/notre-histoire', label: 'Notre histoire' },
  { href: '/contact', label: 'Contact' },
];

export function Navbar() {
  const [elevated, setElevated] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { openCart, totalQuantity } = useCart();

  useEffect(() => {
    const onScroll = () => setElevated(window.scrollY > 8);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`${styles.nav} ${elevated ? styles.elevated : ''}`}>
      <div className={styles.inner}>
        <div className={styles.left}>
          <button
            className={styles.hamburger}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          <Link href="/" className={styles.brand}>
            {/* Replace with your logo: */}
            {/* <Image src="/images/logo.png" alt="Les Jardins de Sofie" width={120} height={40} /> */}
            <span className={styles.logoText}>
              Les Jardins de <em>Sofie</em>
            </span>
          </Link>

          <ul className={`${styles.links} ${mobileOpen ? styles.linksOpen : ''}`}>
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} onClick={() => setMobileOpen(false)}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.right}>
          <button className={styles.icon} aria-label="Rechercher">
            <Search size={17} strokeWidth={1.5} />
          </button>
          <button className={styles.icon} aria-label="Compte">
            <User size={17} strokeWidth={1.5} />
          </button>
          <button className={styles.icon} aria-label="Panier" onClick={openCart}>
            <ShoppingBag size={17} strokeWidth={1.5} />
            {totalQuantity > 0 && (
              <span className={styles.badge}>{totalQuantity}</span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}
