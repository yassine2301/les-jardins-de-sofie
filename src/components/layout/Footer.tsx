import Link from 'next/link';
import { Instagram, Music, MessageCircle, Facebook } from 'lucide-react';
import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.grid}>
        <div>
          <Link href="/" className={styles.brand}>
            Studio <em>JDS</em>
          </Link>
          <p className={styles.desc}>
            Cadeaux corporate, événements, sur-mesure et jardins.
            Des projets pensés ensemble.
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
          <h4>Services</h4>
          <ul>
            <li><Link href="/services/corporate">Cadeaux corporate</Link></li>
            <li><Link href="/services/evenements">Location événements</Link></li>
            <li><Link href="/services/sur-mesure">Créations sur mesure</Link></li>
            <li><Link href="/services/jardins">Conception de jardins</Link></li>
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
        <p className={styles.copy}>&copy; 2026 Studio JDS. Tous droits réservés.</p>
        <div className={styles.payments}>
          <span className={styles.pay}>VISA</span>
          <span className={styles.pay}>MC</span>
          <span className={styles.pay}>CMI</span>
        </div>
      </div>
    </footer>
  );
}
