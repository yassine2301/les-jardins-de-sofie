'use client';

import { useState } from 'react';
import styles from '../services-form.module.css';

export default function EvenementsPage() {
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
              <p>Merci pour votre intérêt. Notre équipe vous contactera très bientôt pour discuter de la mise en scène végétale de votre événement.</p>
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
        <h1 className={styles.heading}>Location pour <em>événement</em></h1>
        <p className={styles.intro}>
          Sublimez vos événements avec nos compositions végétales. Nous créons des ambiances uniques pour mariages, lancements de marque, dîners et événements corporate.
        </p>

        <div className={styles.card}>
          <form onSubmit={handleSubmit} className={styles.form}>
            <h3 className={styles.blockTitle}>Informations générales</h3>

            <div className={styles.field}>
              <label>Nom & prénom <span className={styles.req}>*</span></label>
              <input type="text" required placeholder="Votre nom complet" />
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

            <div className={styles.checkGroup}>
              <label>Type d&apos;événement <span className={styles.req}>*</span></label>
              <label className={styles.checkOption}>
                <input type="radio" name="event-type" value="mariage" required /> Mariage
              </label>
              <label className={styles.checkOption}>
                <input type="radio" name="event-type" value="lancement" /> Lancement de marque
              </label>
              <label className={styles.checkOption}>
                <input type="radio" name="event-type" value="corporate" /> Événement corporate
              </label>
              <label className={styles.checkOption}>
                <input type="radio" name="event-type" value="diner" /> Dîner privé
              </label>
              <label className={styles.checkOption}>
                <input type="radio" name="event-type" value="autre" /> Autre
              </label>
            </div>

            <h3 className={styles.blockTitle}>Logistique</h3>

            <div className={styles.row}>
              <div className={styles.field}>
                <label>Date <span className={styles.req}>*</span></label>
                <input type="date" required />
              </div>
              <div className={styles.field}>
                <label>Lieu <span className={styles.req}>*</span></label>
                <input type="text" required placeholder="Nom ou adresse du lieu" />
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.field}>
                <label>Surface approximative</label>
                <input type="text" placeholder="Ex: 200 m²" />
              </div>
              <div className={styles.field}>
                <label>Intérieur / extérieur ?</label>
                <select>
                  <option value="">Sélectionner</option>
                  <option value="interieur">Intérieur</option>
                  <option value="exterieur">Extérieur</option>
                  <option value="les-deux">Les deux</option>
                </select>
              </div>
            </div>

            <h3 className={styles.blockTitle}>Ambiance</h3>

            <div className={styles.checkGroup}>
              <label>Style recherché</label>
              <label className={styles.checkOption}>
                <input type="radio" name="style" value="minimal" /> Minimal
              </label>
              <label className={styles.checkOption}>
                <input type="radio" name="style" value="organique" /> Organique
              </label>
              <label className={styles.checkOption}>
                <input type="radio" name="style" value="boheme" /> Bohème
              </label>
              <label className={styles.checkOption}>
                <input type="radio" name="style" value="moderne" /> Moderne
              </label>
              <label className={styles.checkOption}>
                <input type="radio" name="style" value="a-definir" /> À définir
              </label>
            </div>

            <div className={styles.field}>
              <label>Message ou précisions</label>
              <textarea placeholder="Décrivez votre vision, nombre d'invités, budget indicatif..." />
            </div>

            <button type="submit" className={styles.submit}>Envoyer ma demande</button>
          </form>
        </div>
      </div>
    </section>
  );
}
