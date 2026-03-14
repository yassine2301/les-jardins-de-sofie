import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import styles from './histoire.module.css';

export const metadata = {
  title: 'Notre histoire — Studio JDS',
  description: 'Découvrez l\'histoire des Jardins de Sofie, notre passion pour les plantes et les pots artisanaux en terre cuite faits main au Maroc.',
};

export default function NotreHistoirePage() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <span className={styles.label}>Notre histoire</span>
        <h1 className={styles.heading}>
          Des racines <em>profondes,</em><br />un savoir-faire <em>vivant.</em>
        </h1>
        <p className={styles.intro}>
          Les Jardins de Sofie, c&apos;est avant tout une histoire de passion.
          Celle de sublimer les espaces de vie à travers des compositions
          végétales uniques et des pots artisanaux en terre cuite, façonnés
          à la main au Maroc.
        </p>

        <div className={styles.grid}>
          <div className={styles.imageWrap}>
            <Image
              src="/images/hero-garden.jpg"
              alt="Atelier Les Jardins de Sofie"
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
          <div className={styles.story}>
            <h2 className={styles.subheading}>L&apos;amour du <em>végétal</em></h2>
            <p>
              Tout a commencé par un amour profond pour les plantes et l&apos;art
              de la terre cuite. Chaque composition est pensée comme une
              oeuvre : un équilibre entre la plante, le pot et l&apos;espace
              qu&apos;elle viendra habiter.
            </p>
            <p>
              Nos pots sont fabriqués artisanalement par des maîtres potiers
              marocains, perpétuant un savoir-faire ancestral. Chaque pièce
              est unique, avec ses nuances et ses imperfections qui font
              tout son charme.
            </p>
          </div>
        </div>

        <div className={styles.values}>
          <div className={styles.value}>
            <h3>Artisanat local</h3>
            <p>
              Nous travaillons avec des artisans marocains pour créer des pots
              en terre cuite uniques, dans le respect des techniques
              traditionnelles.
            </p>
          </div>
          <div className={styles.value}>
            <h3>Compositions sur mesure</h3>
            <p>
              Chaque projet est conçu selon vos envies et votre espace.
              Nous vous accompagnons du choix des plantes à la mise en scène
              finale.
            </p>
          </div>
          <div className={styles.value}>
            <h3>Engagement durable</h3>
            <p>
              Nous sélectionnons des plantes robustes et adaptées à votre
              environnement, avec un guide d&apos;entretien inclus pour
              chaque achat.
            </p>
          </div>
        </div>

        <div className={styles.cta}>
          <Link href="/categorie/compositions" className="btn-primary">
            <span>Découvrir nos compositions</span>
            <ArrowRight size={15} strokeWidth={1.5} />
          </Link>
          <Link href="/contact" className="btn-outline">
            Nous contacter
          </Link>
        </div>
      </div>
    </section>
  );
}
