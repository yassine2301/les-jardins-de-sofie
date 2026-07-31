import Link from "next/link";
import { ArrowRight, Paintbrush, Check } from "lucide-react";
import styles from "./Hero.module.css";

export function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.bg} />
      <div className={styles.dots} />
      <div className={styles.content}>
        <div className={styles.text}>
          <h1 className={styles.heading}>
            Respirez<br />votre <em>intérieur.</em>
          </h1>
          <p className={styles.sub}>
            Compositions végétales et pots façonnés à la main en terre cuite
            et céramique, pensés dans une esthétique brute et organique pour
            apporter une présence naturelle et authentique à vos espaces.
          </p>
          <div className={styles.actions}>
            <Link href="/categorie/compositions" className="btn-primary">
              <span>Voir les compositions</span>
              <ArrowRight size={15} strokeWidth={1.5} />
            </Link>
            <Link href="/notre-histoire" className="btn-outline">
              Notre histoire
            </Link>
          </div>
        </div>
        <div className={styles.visual}>
          <div className={styles.imgWrap}>
            <video
              className={styles.heroVideo}
              src="/videos/hero.mp4"
              poster="/images/hero-garden.jpg"
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              aria-label="Présentation Les Jardins de Sofie"
            />
          </div>
          <div className={`${styles.floatCard} ${styles.fc1}`}>
            <div className={`${styles.fcIcon} ${styles.fcGreen}`}>
              <Paintbrush size={16} strokeWidth={1.5} />
            </div>
            <div className={styles.fcText}>
              <strong>Terre cuite artisanale</strong>
              Fait main au Maroc
            </div>
          </div>
          <div className={`${styles.floatCard} ${styles.fc2}`}>
            <div className={`${styles.fcIcon} ${styles.fcTerra}`}>
              <Check size={16} strokeWidth={1.5} />
            </div>
            <div className={styles.fcText}>
              <strong>Guide d&apos;entretien</strong>
              Inclus avec chaque plante
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
