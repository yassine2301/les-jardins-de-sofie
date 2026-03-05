import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import styles from './Editorial.module.css';

export function Editorial() {
  return (
    <section className={styles.section}>
      <div className={styles.bg} />
      <div className={styles.dots} />
      <div className={styles.content}>
        <div className={styles.text}>
          <span className={styles.label}>Nos services</span>
          <h2 className={styles.title}>
            Des projets pensés <em>ensemble</em>
          </h2>
          <p className={styles.desc}>
            Cadeaux corporate, événements, sur-mesure et jardins.
            Chaque projet est une collaboration unique — nous concevons
            des espaces végétaux qui reflètent votre identité et vos ambitions.
          </p>
          <Link href="/services/corporate" className={styles.btn}>
            <span>Découvrir nos services</span>
            <ArrowRight size={15} strokeWidth={1.5} />
          </Link>
        </div>
        <div className={styles.visual}>
          <div className={styles.imgWrap}>
            <Image src="/images/corporate-lobby.jpg" alt="Espace corporate avec plantes" fill style={{objectFit:'cover'}} />
          </div>
        </div>
      </div>
    </section>
  );
}
