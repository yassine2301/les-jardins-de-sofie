'use client';

import { useState } from 'react';
import styles from '../services-form.module.css';

export default function CorporatePage() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.card}>
            <div className={styles.success}>
              <h2>Demande envoyée !</h2>
              <p>Merci pour votre intérêt. Notre équipe vous contactera dans les plus brefs délais pour discuter de votre projet de cadeaux corporate.</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <span className={styles.label}>Studio JDS</span>
        <h1 className={styles.heading}>Cadeaux <em>corporate</em></h1>
        <p className={styles.intro}>
          Offrez des cadeaux uniques et artisanaux à vos collaborateurs, clients ou partenaires. Nous créons des coffrets sur mesure pour vos événements d&apos;entreprise.
        </p>

        <div className={styles.card}>
          <form onSubmit={handleSubmit} className={styles.form}>
            <h3 className={styles.blockTitle}>Informations entreprise</h3>

            <div className={styles.field}>
              <label>Nom de l&apos;entreprise <span className={styles.req}>*</span></label>
              <input type="text" required placeholder="Nom de votre entreprise" />
            </div>

            <div className={styles.field}>
              <label>Secteur d&apos;activité</label>
              <input type="text" placeholder="Ex: Finance, Tech, Hôtellerie..." />
            </div>

            <div className={styles.row}>
              <div className={styles.field}>
                <label>Nom & prénom <span className={styles.req}>*</span></label>
                <input type="text" required placeholder="Votre nom complet" />
              </div>
              <div className={styles.field}>
                <label>Téléphone <span className={styles.req}>*</span></label>
                <input type="tel" required placeholder="+212 6XX XXX XXX" />
              </div>
            </div>

            <div className={styles.field}>
              <label>Email professionnel <span className={styles.req}>*</span></label>
              <input type="email" required placeholder="votre@entreprise.com" />
            </div>

            <h3 className={styles.blockTitle}>Détails du projet</h3>

            <div className={styles.checkGroup}>
              <label>Type de cadeau souhaité <span className={styles.req}>*</span></label>
              <label className={styles.checkOption}>
                <input type="checkbox" name="type" value="coffret" /> Coffret plante & bougie
              </label>
              <label className={styles.checkOption}>
                <input type="checkbox" name="type" value="plantes" /> Plantes seules
              </label>
              <label className={styles.checkOption}>
                <input type="checkbox" name="type" value="bougies" /> Bougies
              </label>
              <label className={styles.checkOption}>
                <input type="checkbox" name="type" value="a-definir" /> À définir ensemble
              </label>
            </div>

            <div className={styles.row}>
              <div className={styles.field}>
                <label>Quantité estimée <span className={styles.req}>*</span></label>
                <input type="number" required min="1" placeholder="Ex: 50" />
              </div>
              <div className={styles.field}>
                <label>Date souhaitée de livraison</label>
                <input type="date" />
              </div>
            </div>

            <div className={styles.field}>
              <label>Message ou précisions</label>
              <textarea placeholder="Décrivez votre projet, budget indicatif, occasion..." />
            </div>

            <button type="submit" className={styles.submit}>Envoyer ma demande</button>
          </form>
        </div>
      </div>
    </section>
  );
}
