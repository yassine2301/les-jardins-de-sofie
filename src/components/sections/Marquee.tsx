import styles from './Marquee.module.css';

const items = [
  'Livraison Casablanca & environs',
  'Pots artisanaux en terre cuite',
  'Compositions sur mesure',
  "Conseils d'entretien inclus",
];

export function Marquee() {
  const repeated = [...items, ...items, ...items];
  return (
    <div className={styles.marquee}>
      <div className={styles.track}>
        {repeated.map((text, i) => (
          <span key={i} className={styles.item}>
            <span className={styles.dot} />
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}
