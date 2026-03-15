'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, User, ShoppingBag, Menu, X, ChevronDown } from 'lucide-react';
import { useCart } from '@/lib/cart-context';
import styles from './Navbar.module.css';

interface SubLink {
  href: string;
  label: string;
}

interface MenuColumn {
  heading: string;
  links: SubLink[];
}

interface NavItem {
  href: string;
  label: string;
  dropdown?: MenuColumn[];
}

const navItems: NavItem[] = [
  { href: '/', label: 'Accueil' },
  {
    href: '/categorie/compositions',
    label: 'Compositions',
    dropdown: [
      {
        heading: 'Par type',
        links: [
          { href: '/categorie/compositions', label: 'Toutes les compositions' },
          { href: '/categorie/compositions?size=petite', label: 'Petites compositions' },
          { href: '/categorie/compositions?size=standard', label: 'Standards' },
          { href: '/categorie/compositions?size=grande', label: 'Grandes compositions' },
        ],
      },
      {
        heading: 'Par style',
        links: [
          { href: '/categorie/compositions?style=minimaliste', label: 'Minimaliste' },
          { href: '/categorie/compositions?style=tropical', label: 'Tropical' },
          { href: '/categorie/compositions?style=mediterraneen', label: 'Méditerranéen' },
        ],
      },
      {
        heading: 'Sélection',
        links: [
          { href: '/categorie/compositions?tag=best-sellers', label: 'Best-sellers' },
          { href: '/categorie/compositions?tag=nouveautes', label: 'Nouveautés' },
          { href: '/categorie/grands-formats', label: 'Grands formats' },
        ],
      },
    ],
  },
  {
    href: '/categorie/plantes',
    label: 'Plantes',
    dropdown: [
      {
        heading: 'Par taille',
        links: [
          { href: '/categorie/plantes', label: 'Toutes les plantes' },
          { href: '/categorie/plantes?size=petite', label: 'Petites plantes' },
          { href: '/categorie/plantes?size=standard', label: 'Standards' },
          { href: '/categorie/plantes?size=grande', label: 'Grandes plantes' },
        ],
      },
      {
        heading: 'Par type',
        links: [
          { href: '/categorie/plantes?type=vertes', label: 'Plantes vertes' },
          { href: '/categorie/plantes?type=grasses', label: 'Plantes grasses' },
          { href: '/categorie/plantes?type=oliviers', label: 'Oliviers & palmiers' },
          { href: '/categorie/plantes?type=facile', label: 'Faciles d\'entretien' },
        ],
      },
      {
        heading: 'Sélection',
        links: [
          { href: '/categorie/plantes?tag=best-sellers', label: 'Best-sellers' },
          { href: '/categorie/plantes?tag=nouveautes', label: 'Nouveautés' },
        ],
      },
    ],
  },
  {
    href: '/categorie/pots',
    label: 'Pots artisanaux',
    dropdown: [
      {
        heading: 'Par collection',
        links: [
          { href: '/categorie/pots', label: 'Tous les pots' },
          { href: '/categorie/pots?col=erratum', label: 'Erratum' },
          { href: '/categorie/pots?col=saxum', label: 'Saxum' },
          { href: '/categorie/pots?col=berceau', label: 'Berceau' },
          { href: '/categorie/pots?col=naturalis', label: 'Naturalis' },
        ],
      },
      {
        heading: 'Par taille',
        links: [
          { href: '/categorie/pots?size=petit', label: 'Petits pots' },
          { href: '/categorie/pots?size=moyen', label: 'Moyens' },
          { href: '/categorie/pots?size=grand', label: 'Grands pots' },
          { href: '/categorie/pots?size=jarre', label: 'Jarres & XXL' },
        ],
      },
    ],
  },
  {
    href: '/services',
    label: 'Studio JDS',
    dropdown: [
      {
        heading: 'Nos services',
        links: [
          { href: '/services/corporate', label: 'Cadeaux corporate' },
          { href: '/services/evenements', label: 'Location événements' },
          { href: '/services/sur-mesure', label: 'Créations sur mesure' },
          { href: '/services/jardins', label: 'Conception de jardins' },
        ],
      },
    ],
  },
  { href: '/contact', label: 'Contact' },
];

export function Navbar() {
  const [elevated, setElevated] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { openCart, totalQuantity } = useCart();

  useEffect(() => {
    const onScroll = () => setElevated(window.scrollY > 8);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  function handleMouseEnter(label: string) {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown(label);
  }

  function handleMouseLeave() {
    timeoutRef.current = setTimeout(() => setActiveDropdown(null), 150);
  }

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
            <Image src="/images/logo2.png" alt="Les Jardins de Sofie" width={140} height={48} priority />
          </Link>
        </div>

        {/* Desktop nav links */}
        <ul className={styles.links}>
          {navItems.map((item) => (
            <li
              key={item.label}
              className={styles.navItem}
              onMouseEnter={() => item.dropdown && handleMouseEnter(item.label)}
              onMouseLeave={handleMouseLeave}
            >
              <Link href={item.href} className={styles.navLink}>
                {item.label}
                {item.dropdown && <ChevronDown size={12} strokeWidth={1.5} />}
              </Link>

              {item.dropdown && activeDropdown === item.label && (
                <div className={styles.megaMenu}>
                  <div className={styles.megaInner}>
                    {item.dropdown.map((col) => (
                      <div key={col.heading} className={styles.megaCol}>
                        <h4 className={styles.megaHeading}>{col.heading}</h4>
                        <ul className={styles.megaLinks}>
                          {col.links.map((link) => (
                            <li key={link.href}>
                              <Link
                                href={link.href}
                                className={styles.megaLink}
                                onClick={() => setActiveDropdown(null)}
                              >
                                {link.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>

        <div className={styles.right}>
          <button className={styles.icon} aria-label="Rechercher">
            <Search size={17} strokeWidth={1.5} />
          </button>
          <Link href="/compte" className={styles.icon} aria-label="Compte">
            <User size={17} strokeWidth={1.5} />
          </Link>
          <button className={styles.icon} aria-label="Panier" onClick={openCart}>
            <ShoppingBag size={17} strokeWidth={1.5} />
            {totalQuantity > 0 && (
              <span className={styles.badge}>{totalQuantity}</span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className={styles.mobileMenu}>
          {navItems.map((item) => (
            <div key={item.label} className={styles.mobileItem}>
              <Link
                href={item.href}
                className={styles.mobileLink}
                onClick={() => !item.dropdown && setMobileOpen(false)}
              >
                {item.label}
              </Link>
              {item.dropdown && (
                <div className={styles.mobileSubmenu}>
                  {item.dropdown.map((col) => (
                    <div key={col.heading}>
                      <span className={styles.mobileSubHeading}>{col.heading}</span>
                      {col.links.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className={styles.mobileSubLink}
                          onClick={() => setMobileOpen(false)}
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </nav>
  );
}
