import Link from 'next/link';
import { Instagram, Music, MessageCircle, Facebook } from 'lucide-react';
import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.grid}>
        <div>
          <Link href="/" className={styles.brand}>
            Les Jardins de <em>Sofie</em>
          </Link>
          <p className={styles.desc}>
            Compositions uniques de plantes d&apos;intérieur &amp; pots artisanaux en
            terre cuite. Respirez votre intérieur.
          </p>
          <div className={styles.socials}>
            <a href="https://instagram.com" className={styles.social} aria-label="Instagram" target="_blank" rel="noopener noreferrer">
              <Instagram size={14} strokeWidth={1.3} />
            </a>
            <a href="#" className={styles.social} aria-label="TikTok" target="_blank" rel="noopener noreferrer">
              <Music size={14} strokeWidth={1.3} />
            </a>
            <a href="https://wa.me/212667753611" className={styles.social} aria-label="WhatsApp" target="_blank" rel="noopener noreferrer">
              <MessageCircle size={14} strokeWidth={1.3} />
            </a>
            <a href="#" className={styles.social} aria-label="Facebook" target="_blank" rel="noopener noreferrer">
              <Facebook size={14} strokeWidth={1.3} />
            </a>
          </div>
        </div>
        <div className={styles.col}>
          <h4>Boutique</h4>
          <ul>
            <li><Link href="/categorie/compositions">Compositions</Link></li>
            <li><Link href="/categorie/plantes">Plantes</Link></li>
            <li><Link href="/categorie/pots">Pots artisanaux</Link></li>
            <li><Link href="/categorie/grands-formats">Grands formats</Link></li>
          </ul>
        </div>
        <div className={styles.col}>
          <h4>Informations</h4>
          <ul>
            <li><Link href="/notre-histoire">Notre histoire</Link></li>
            <li><Link href="#">Livraison</Link></li>
            <li><Link href="#">FAQ</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>
        <div className={styles.col}>
          <h4>Contact</h4>
          <ul>
            <li><a href="tel:+212667753611">+212 667-753611</a></li>
            <li><a href="mailto:lesjardinsdesofie@gmail.com">lesjardinsdesofie@gmail.com</a></li>
            <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>
            <li><a href="https://wa.me/212667753611" target="_blank" rel="noopener noreferrer">WhatsApp</a></li>
          </ul>
        </div>
      </div>
      <div className={styles.bottom}>
        <p className={styles.copy}>&copy; 2026 Les Jardins de Sofie. Tous droits réservés.</p>
        <div className={styles.payments}>
          <span className={styles.pay}>VISA</span>
          <span className={styles.pay}>MC</span>
          <span className={styles.pay}>CMI</span>
        </div>
      </div>
    </footer>
  );
}
