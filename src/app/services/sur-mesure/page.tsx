'use client';

import { useState } from 'react';
import styles from '../services-form.module.css';

export default function SurMesurePage() {
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
              <p>Merci pour votre projet. Notre artisan vous contactera très bientôt pour discuter de votre création sur mesure.</p>
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
        <h1 className={styles.heading}>Création <em>sur mesure</em></h1>
        <p className={styles.intro}>
          Chaque pièce est unique. Parlez-nous de votre projet et nous créerons ensemble une pièce artisanale qui correspond parfaitement à votre vision.
        </p>

        <div className={styles.card}>
          <form onSubmit={handleSubmit} className={styles.form}>
            <h3 className={styles.blockTitle}>Contact</h3>

            <div className={styles.field}>
              <label>Nom <span className={styles.req}>*</span></label>
              <input type="text" required placeholder="Votre nom" />
            </div>

            <div className={styles.row}>
              <div className={styles.field}>
                <label>Email <span className={styles.req}>*</span></label>
                <input type="email" required placeholder="votre@email.com" />
              </div>
              <div className={styles.field}>
                <label>Téléphone <span className={styles.req}>*</span></label>
                <input type="tel" required placeholder="+212 6XX XXX XXX" />
              </div>
            </div>

            <h3 className={styles.blockTitle}>Projet</h3>

            <div className={styles.checkGroup}>
              <label>Type de pièce <span className={styles.req}>*</span></label>
              <label className={styles.checkOption}>
                <input type="radio" name="piece-type" value="pot" required /> Pot
              </label>
              <label className={styles.checkOption}>
                <input type="radio" name="piece-type" value="jarre" /> Jarre
              </label>
              <label className={styles.checkOption}>
                <input type="radio" name="piece-type" value="serie" /> Série
              </label>
              <label className={styles.checkOption}>
                <input type="radio" name="piece-type" value="projet-complet" /> Projet complet
              </label>
            </div>

            <div className={styles.field}>
              <label>Dimensions souhaitées</label>
              <input type="text" placeholder="Ex: 40cm x 30cm, ou hauteur souhaitée..." />
            </div>

            <div className={styles.checkGroup}>
              <label>Usage</label>
              <label className={styles.checkOption}>
                <input type="checkbox" name="usage" value="interieur" /> Intérieur
              </label>
              <label className={styles.checkOption}>
                <input type="checkbox" name="usage" value="exterieur" /> Extérieur
              </label>
              <label className={styles.checkOption}>
                <input type="checkbox" name="usage" value="hotel-restaurant" /> Hôtel / restaurant
              </label>
              <label className={styles.checkOption}>
                <input type="checkbox" name="usage" value="residentiel" /> Résidentiel
              </label>
            </div>

            <h3 className={styles.blockTitle}>Esthétique</h3>

            <div className={styles.field}>
              <label>Couleur / texture souhaitée</label>
              <input type="text" placeholder="Ex: Terre naturelle, blanc mat, texturé..." />
            </div>

            <div className={styles.field}>
              <label>Inspiration (image)</label>
              <input type="file" accept="image/*" />
            </div>

            <div className={styles.field}>
              <label>Message ou précisions</label>
              <textarea placeholder="Décrivez votre vision, contexte d'utilisation..." />
            </div>

            <button type="submit" className={styles.submit}>Envoyer ma demande</button>
          </form>
        </div>
      </div>
    </section>
  );
}
