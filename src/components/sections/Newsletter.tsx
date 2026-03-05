'use client';

import { useState } from 'react';
import styles from './Newsletter.module.css';

export function Newsletter() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Connect to Shopify customer API or Mailchimp
    console.log('Newsletter signup:', email);
    setEmail('');
    alert('Merci ! Vous êtes inscrit(e) 🌿');
  };

  return (
    <section className={styles.section}>
      <div className={styles.dots} />
      <div className={styles.inner}>
        <span className={styles.label}>Restez inspirés</span>
        <h2 className={styles.title}>
          Rejoignez notre <em>jardin</em>
        </h2>
        <p className={styles.desc}>
          Nouvelles compositions, conseils botaniques et offres exclusives —
          directement dans votre boîte mail.
        </p>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            type="email"
            className={styles.input}
            placeholder="Votre adresse email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" className={styles.btn}>
            S&apos;inscrire
          </button>
        </form>
      </div>
    </section>
  );
}
