import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { type ShopifyCollection } from '@/lib/shopify';
import styles from './Categories.module.css';

const fallbackCategories = [
  { handle: 'compositions', title: 'Compositions', desc: 'Pot + Plante, prêtes à vivre', image: '/images/categories/compositions.jpg' },
  { handle: 'plantes', title: 'Plantes', desc: 'Petites, standards & grandes', image: '/images/categories/plantes.jpg' },
  { handle: 'pots', title: 'Pots artisanaux', desc: 'Erratum, Saxum, Berceau, Naturalis', image: '/images/categories/pots.jpg' },
  { handle: 'grands-formats', title: 'Grands formats', desc: 'Pièces statement 1m50+', image: '/images/categories/grands-formats.jpg' },
];

interface Props { collections: ShopifyCollection[]; }

export function Categories({ collections }: Props) {
  const cats = collections.length > 0
    ? collections.slice(0, 4).map(c => ({
        handle: c.handle,
        title: c.title,
        desc: c.description || '',
        image: c.image?.url || null,
      }))
    : fallbackCategories.map(c => ({ ...c }));

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <span className="section-label">Explorer par univers</span>
        <h2 className="section-title">Nos univers</h2>
      </div>
      <div className={styles.grid}>
        {cats.map((cat) => (
          <Link key={cat.handle} href={`/categorie/${cat.handle}`} className={styles.card}>
            <div className={styles.imgWrap}>
              {cat.image ? (
                <Image src={cat.image} alt={cat.title} fill style={{ objectFit: 'cover' }} sizes="350px" />
              ) : (
                <div className={styles.placeholder} />
              )}
            </div>
            <div className={styles.overlay} />
            <div className={styles.info}>
              <h3 className={styles.name}>{cat.title}</h3>
              <span className={styles.desc}>{cat.desc}</span>
            </div>
            <div className={styles.arrow}>
              <ArrowRight size={14} strokeWidth={1.5} />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
