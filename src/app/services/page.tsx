import Link from 'next/link';
import { Gift, Calendar, Paintbrush, TreePine, ArrowRight } from 'lucide-react';
import styles from './services.module.css';

export const metadata = {
  title: 'Studio JDS — Nos services',
  description: 'Cadeaux corporate, location pour événements, créations sur mesure et conception de jardins. Découvrez tous les services du Studio JDS.',
};

const services = [
  {
    href: '/services/corporate',
    icon: Gift,
    title: 'Cadeaux corporate',
    description: 'Offrez des cadeaux uniques et artisanaux à vos collaborateurs, clients ou partenaires. Coffrets sur mesure pour vos événements d\'entreprise.',
  },
  {
    href: '/services/evenements',
    icon: Calendar,
    title: 'Location événements',
    description: 'Sublimez vos événements avec nos compositions végétales. Location de plantes et mise en scène pour mariages, séminaires et réceptions.',
  },
  {
    href: '/services/sur-mesure',
    icon: Paintbrush,
    title: 'Créations sur mesure',
    description: 'Une composition unique pensée pour votre espace. Nous créons des pièces personnalisées selon vos envies, couleurs et dimensions.',
  },
  {
    href: '/services/jardins',
    icon: TreePine,
    title: 'Conception de jardins',
    description: 'De la terrasse au jardin complet, nous concevons des espaces verts harmonieux adaptés au climat marocain.',
  },
];

export default function ServicesPage() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <span className={styles.label}>Studio JDS</span>
        <h1 className={styles.heading}>
          Nos <em>services</em>
        </h1>
        <p className={styles.intro}>
          Au-delà de nos compositions et pots artisanaux, le Studio JDS
          vous accompagne dans tous vos projets végétaux. Cadeaux
          d&apos;entreprise, événements, créations sur mesure ou conception
          de jardins — chaque projet est unique.
        </p>

        <div className={styles.grid}>
          {services.map((service) => (
            <Link key={service.href} href={service.href} className={styles.card}>
              <div className={styles.iconWrap}>
                <service.icon size={22} strokeWidth={1.3} />
              </div>
              <h2 className={styles.cardTitle}>{service.title}</h2>
              <p className={styles.cardDesc}>{service.description}</p>
              <span className={styles.cardLink}>
                Découvrir
                <ArrowRight size={13} strokeWidth={1.5} />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
