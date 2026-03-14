import { MapPin, Shield, Leaf, Users } from 'lucide-react';
import styles from './Reassurance.module.css';

const items = [
  { icon: MapPin, title: 'Livraison soignée', desc: 'Rabat : 100 MAD · Casablanca : 150 MAD. Emballage protecteur premium.' },
  { icon: Shield, title: 'Artisanat garanti', desc: 'Pots en terre cuite, chaque pièce est unique.' },
  { icon: Leaf,   title: 'Conseils inclus', desc: "Guide d'entretien détaillé avec chaque plante." },
  { icon: Users,  title: 'Service attentionné', desc: 'Joignable par WhatsApp & téléphone.' },
];

export function Reassurance() {
  return (
    <section className={styles.section}>
      <div className={styles.grid}>
        {items.map((item) => (
          <div key={item.title} className={styles.card}>
            <div className={styles.icon}>
              <item.icon size={22} strokeWidth={1.2} />
            </div>
            <h4 className={styles.title}>{item.title}</h4>
            <p className={styles.desc}>{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
