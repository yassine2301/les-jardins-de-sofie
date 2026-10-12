import styles from './compte.module.css';

// Verified against this store's Shopify customerAccountsV2.url setting.
const customerAccountUrl = 'https://shopify.com/99186508064/account';

export default function ComptePage() {
  return (
    <section className={styles.section}>
      <div className={styles.card}>
        <h1 className={styles.heading}>Votre <em>compte</em></h1>
        <p className={styles.desc}>
          Connectez-vous pour consulter vos commandes et gérer vos informations.
          Saisissez votre adresse e-mail sur la page sécurisée Shopify, puis le
          code reçu par e-mail. Aucun mot de passe à retenir.
        </p>
        <a href={customerAccountUrl} className={styles.submit}>
          Se connecter ou créer un compte
        </a>
        <p className={styles.toggle}>
          Première visite ? Votre compte sera créé après vérification de votre
          adresse e-mail.
        </p>
      </div>
    </section>
  );
}
