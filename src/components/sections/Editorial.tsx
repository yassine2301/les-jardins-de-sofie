import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import styles from './Editorial.module.css';

export function Editorial() {
  return (
    <section className={styles.section}>
      <div className={styles.bg} />
      <div className={styles.dots} />
      <div className={styles.content}>
        <div className={styles.text}>
          <span className={styles.label}>Savoir-faire</span>
          <h2 className={styles.title}>
            Chaque pot, une <em>signature</em>
          </h2>
          <p className={styles.desc}>
            Nos pots Erratum, Saxum, Berceau et Naturalis sont façonnés en terre
            cuite avec des formes organiques et imparfaites — chaque irrégularité
            est une signature d&apos;authenticité. Textures brutes, courbes
            asymétriques, finitions mates.
          </p>
          <Link href="/notre-histoire" className={styles.btn}>
            <span>Découvrir notre histoire</span>
            <ArrowRight size={15} strokeWidth={1.5} />
          </Link>
        </div>
        <div className={styles.visual}>
          <div className={styles.imgWrap}>
            {/* <Image src="/images/editorial.jpg" alt="Pot artisanal" fill style={{objectFit:'cover'}} /> */}
            <div className={styles.placeholder} />
          </div>
        </div>
      </div>
    </section>
  );
}
