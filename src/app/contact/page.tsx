'use client';

import { useState } from 'react';
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react';
import styles from './contact.module.css';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <span className={styles.label}>Contact</span>
        <h1 className={styles.heading}>
          Parlons de votre <em>projet</em>
        </h1>
        <p className={styles.intro}>
          Une question, une demande de devis ou simplement envie de discuter
          de votre projet ? Contactez-nous par le moyen qui vous convient.
        </p>

        <div className={styles.grid}>
          <div className={styles.info}>
            <div className={styles.infoCard}>
              <div className={styles.infoIcon}>
                <Phone size={18} strokeWidth={1.3} />
              </div>
              <div>
                <h3>Téléphone</h3>
                <a href="tel:+212667753611">+212 667-753611</a>
              </div>
            </div>

            <div className={styles.infoCard}>
              <div className={styles.infoIcon}>
                <Mail size={18} strokeWidth={1.3} />
              </div>
              <div>
                <h3>Email</h3>
                <a href="mailto:lesjardinsdesofie@gmail.com">lesjardinsdesofie@gmail.com</a>
              </div>
            </div>

            <div className={styles.infoCard}>
              <div className={styles.infoIcon}>
                <MessageCircle size={18} strokeWidth={1.3} />
              </div>
              <div>
                <h3>WhatsApp</h3>
                <a href="https://wa.me/212667753611" target="_blank" rel="noopener noreferrer">Envoyer un message</a>
              </div>
            </div>

            <div className={styles.infoCard}>
              <div className={styles.infoIcon}>
                <MapPin size={18} strokeWidth={1.3} />
              </div>
              <div>
                <h3>Adresse</h3>
                <p>Rabat, Maroc</p>
              </div>
            </div>
          </div>

          <div className={styles.formCard}>
            {submitted ? (
              <div className={styles.success}>
                <h2>Message envoyé !</h2>
                <p>Merci pour votre message. Nous vous répondrons dans les plus brefs délais.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.row}>
                  <div className={styles.field}>
                    <label>Nom & prénom <span className={styles.req}>*</span></label>
                    <input type="text" required placeholder="Votre nom complet" />
                  </div>
                  <div className={styles.field}>
                    <label>Téléphone</label>
                    <input type="tel" placeholder="+212 6XX XXX XXX" />
                  </div>
                </div>

                <div className={styles.field}>
                  <label>Email <span className={styles.req}>*</span></label>
                  <input type="email" required placeholder="votre@email.com" />
                </div>

                <div className={styles.field}>
                  <label>Sujet</label>
                  <select defaultValue="">
                    <option value="" disabled>Choisir un sujet</option>
                    <option value="commande">Question sur une commande</option>
                    <option value="devis">Demande de devis</option>
                    <option value="corporate">Cadeaux corporate</option>
                    <option value="evenement">Location événement</option>
                    <option value="sur-mesure">Création sur mesure</option>
                    <option value="jardin">Conception de jardin</option>
                    <option value="autre">Autre</option>
                  </select>
                </div>

                <div className={styles.field}>
                  <label>Message <span className={styles.req}>*</span></label>
                  <textarea required placeholder="Décrivez votre demande..." />
                </div>

                <button type="submit" className={styles.submit}>Envoyer le message</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
