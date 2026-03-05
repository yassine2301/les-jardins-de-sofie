import styles from './Marquee.module.css';

const items = [
  'Pots artisanaux faits à la main',
  'Compositions sur mesure',
  'Cadeaux corporate',
  'Conception de jardins',
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
