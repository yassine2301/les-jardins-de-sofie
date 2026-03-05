'use client';

import { useState } from 'react';
import styles from './compte.module.css';

type Mode = 'register' | 'login';

export default function ComptePage() {
  const [mode, setMode] = useState<Mode>('register');
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    // TODO: Connect to backend
  }

  if (submitted) {
    return (
      <section className={styles.section}>
        <div className={styles.card}>
          <div className={styles.success}>
            <h2>Bienvenue chez Studio JDS !</h2>
            <p>Votre compte a bien été créé. Vous bénéficiez de <strong>-10% sur votre première commande</strong>.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.section}>
      <div className={styles.card}>
        <div className={styles.badge}>-10% offerts à l&apos;inscription</div>
        <h1 className={styles.heading}>
          {mode === 'register' ? <>Créer un <em>compte</em></> : <>Se <em>connecter</em></>}
        </h1>
        <p className={styles.desc}>
          {mode === 'register'
            ? 'Rejoignez Studio JDS et profitez d\'avantages exclusifs.'
            : 'Connectez-vous à votre compte Studio JDS.'}
        </p>

        <form onSubmit={handleSubmit} className={styles.form}>
          {mode === 'register' && (
            <>
              <div className={styles.field}>
                <label>Prénom <span className={styles.req}>*</span></label>
                <input type="text" required placeholder="Votre prénom" />
              </div>
              <div className={styles.field}>
                <label>Nom <span className={styles.req}>*</span></label>
                <input type="text" required placeholder="Votre nom" />
              </div>
            </>
          )}

          <div className={styles.field}>
            <label>Email <span className={styles.req}>*</span></label>
            <input type="email" required placeholder="votre@email.com" />
          </div>

          {mode === 'register' && (
            <div className={styles.field}>
              <label>Téléphone</label>
              <input type="tel" placeholder="+212 6XX XXX XXX" />
            </div>
          )}

          <div className={styles.field}>
            <label>Mot de passe <span className={styles.req}>*</span></label>
            <input type="password" required placeholder="Minimum 6 caractères" minLength={6} />
          </div>

          {mode === 'register' && (
            <div className={styles.field}>
              <label>Ville</label>
              <input type="text" placeholder="Ex: Casablanca, Rabat..." />
            </div>
          )}

          <button type="submit" className={styles.submit}>
            {mode === 'register' ? 'Créer mon compte' : 'Se connecter'}
          </button>
        </form>

        <p className={styles.toggle}>
          {mode === 'register' ? (
            <>Déjà un compte ? <button onClick={() => setMode('login')}>Se connecter</button></>
          ) : (
            <>Pas encore de compte ? <button onClick={() => setMode('register')}>Créer un compte</button></>
          )}
        </p>
      </div>
    </section>
  );
}
