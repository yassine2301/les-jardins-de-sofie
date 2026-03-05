import styles from './BrandStory.module.css';

export function BrandStory() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <span className="section-label">Notre philosophie</span>
        <h2 className="section-title">
          Cadeaux corporate, événements,<br /><em>sur-mesure et jardins.</em>
        </h2>
        <p className="section-desc" style={{ maxWidth: 460, margin: '0 auto 2rem' }}>
          Des projets pensés ensemble. Studio JDS conçoit des espaces végétaux
          uniques — pour les entreprises, les événements et les particuliers.
          Chaque création est une collaboration sur mesure.
        </p>
        <div className="divider" style={{ margin: '0 auto' }} />
      </div>
    </section>
  );
}
