import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Moon, Check } from "lucide-react";
import styles from "./Hero.module.css";

export function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.bg} />
      <div className={styles.dots} />
      <div className={styles.content}>
        <div className={styles.text}>
          <div className={styles.tag}>
            <Moon size={13} strokeWidth={1.5} />
            Nouvelles compositions
          </div>
          <h1 className={styles.heading}>
            Respirez<br />votre <em>intérieur.</em>
          </h1>
          <p className={styles.sub}>
            Compositions uniques de plantes d&apos;intérieur et pots artisanaux
            en terre cuite. Chaque pièce est conçue pour sublimer votre espace
            de vie.
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
            {/* Replace with your hero image: */}
            {/* <Image src="/images/hero.jpg" alt="Berceau Monstera" fill style={{objectFit:'cover'}} priority /> */}
            <div className={styles.placeholder} />
          </div>
          <div className={`${styles.floatCard} ${styles.fc1}`}>
            <div className={`${styles.fcIcon} ${styles.fcGreen}`}>
              <Moon size={16} strokeWidth={1.5} />
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
