'use client';

import Link from 'next/link';
import { ArrowUpRight, Mail, MapPin, Package, ShieldCheck } from 'lucide-react';
import { getCustomerAccountUrl } from '@/lib/customer-account';
import styles from './compte.module.css';

export default function ComptePage() {
  const accountUrl = getCustomerAccountUrl();

  return (
    <section className={styles.section}>
      <div className={styles.card}>
        <span className={styles.badge}><ShieldCheck size={14} aria-hidden="true" /> Espace client sécurisé</span>
        <h1 className={styles.heading}>Votre <em>compte</em></h1>
        <p className={styles.desc}>
          Retrouvez vos commandes et vos informations dans votre espace Les Jardins de Sofie.
        </p>

        <div className={styles.signInInfo}>
          <Mail size={22} strokeWidth={1.5} aria-hidden="true" />
          <div>
            <h2>Une adresse e-mail suffit</h2>
            <p>Recevez un code de connexion par e-mail. Aucun mot de passe à retenir.</p>
          </div>
        </div>

        {accountUrl ? (
          <>
            <a href={accountUrl} className={styles.submit} rel="nofollow" aria-describedby="account-first-visit">
              Se connecter / Créer mon compte <ArrowUpRight size={17} aria-hidden="true" />
            </a>
            <p id="account-first-visit" className={styles.firstVisit}>
              Première visite ? Votre compte est créé automatiquement après la validation du code.
            </p>
          </>
        ) : (
          <p role="alert" className={styles.unavailable}>
            L’espace client est momentanément indisponible. <Link href="/contact">Contactez-nous</Link> pour être accompagné.
          </p>
        )}

        <ul className={styles.features} aria-label="Dans votre espace client">
          <li><Package size={18} strokeWidth={1.5} aria-hidden="true" /> Vos commandes et leur suivi</li>
          <li><MapPin size={18} strokeWidth={1.5} aria-hidden="true" /> Vos coordonnées et adresses</li>
        </ul>

        <p className={styles.note}>La connexion et vos données clients sont gérées par Shopify.</p>
        <p className={styles.help}>Besoin d’aide ? <Link href="/contact">Nous contacter</Link></p>
      </div>
    </section>
  );
}
