import styles from './BrandStory.module.css';

export function BrandStory() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <span className="section-label">Notre philosophie</span>
        <h2 className="section-title">
          Inspiré d&apos;une nature<br /><em>féconde et généreuse</em>
        </h2>
        <p className="section-desc" style={{ maxWidth: 460, margin: '0 auto 2rem' }}>
          Les Jardins de Sofie sont nés d&apos;une envie de se sentir bien chez soi,
          dans un environnement apaisant et bienveillant. Nos compositions allient
          nature et minimalisme — des pièces conçues pour traverser le temps.
        </p>
        <div className="divider" style={{ margin: '0 auto' }} />
      </div>
    </section>
  );
}
