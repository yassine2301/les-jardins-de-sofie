'use client';

import { useState } from 'react';
import styles from '../services-form.module.css';

export default function JardinsPage() {
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
              <p>Merci pour votre projet. Notre paysagiste vous contactera très bientôt pour discuter de la conception de votre jardin.</p>
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
        <h1 className={styles.heading}>Conception de <em>jardins</em></h1>
        <p className={styles.intro}>
          Du jardin privé au projet immobilier, nous concevons des espaces verts sur mesure qui reflètent votre style et s&apos;adaptent à votre environnement.
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

            <h3 className={styles.blockTitle}>Type de projet</h3>

            <div className={styles.checkGroup}>
              <label>Type de projet <span className={styles.req}>*</span></label>
              <label className={styles.checkOption}>
                <input type="radio" name="project-type" value="jardin-prive" required /> Jardin privé
              </label>
              <label className={styles.checkOption}>
                <input type="radio" name="project-type" value="terrasse" /> Terrasse
              </label>
              <label className={styles.checkOption}>
                <input type="radio" name="project-type" value="rooftop" /> Rooftop
              </label>
              <label className={styles.checkOption}>
                <input type="radio" name="project-type" value="hotel-restaurant" /> Hôtel / restaurant
              </label>
            </div>
            <div className={styles.checkGroup}>
              <label className={styles.checkOption}>
                <input type="radio" name="project-type" value="immobilier" /> Projet immobilier
              </label>
            </div>

            <h3 className={styles.blockTitle}>Informations techniques</h3>

            <div className={styles.row}>
              <div className={styles.field}>
                <label>Surface approximative (m²)</label>
                <input type="text" placeholder="Ex: 150 m²" />
              </div>
              <div className={styles.field}>
                <label>Ville</label>
                <input type="text" placeholder="Ex: Casablanca, Rabat..." />
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.field}>
                <label>Exposition (si connue)</label>
                <input type="text" placeholder="Ex: Sud, Est..." />
              </div>
              <div className={styles.field}>
                <label>Système d&apos;irrigation existant ?</label>
                <select>
                  <option value="">Sélectionner</option>
                  <option value="oui">Oui</option>
                  <option value="non">Non</option>
                </select>
              </div>
            </div>

            <h3 className={styles.blockTitle}>Vision</h3>

            <div className={styles.checkGroup}>
              <label>Style souhaité</label>
              <label className={styles.checkOption}>
                <input type="radio" name="garden-style" value="mediterraneen" /> Méditerranéen
              </label>
              <label className={styles.checkOption}>
                <input type="radio" name="garden-style" value="minimal" /> Minimal
              </label>
              <label className={styles.checkOption}>
                <input type="radio" name="garden-style" value="luxuriant" /> Luxuriant
              </label>
              <label className={styles.checkOption}>
                <input type="radio" name="garden-style" value="contemporain" /> Contemporain
              </label>
            </div>
            <div className={styles.checkGroup}>
              <label className={styles.checkOption}>
                <input type="radio" name="garden-style" value="a-definir" /> À définir
              </label>
            </div>

            <div className={styles.field}>
              <label>Message ou précisions</label>
              <textarea placeholder="Décrivez votre vision, contraintes, budget indicatif..." />
            </div>

            <button type="submit" className={styles.submit}>Envoyer ma demande</button>
          </form>
        </div>
      </div>
    </section>
  );
}
