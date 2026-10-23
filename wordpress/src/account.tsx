import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Leaf, LockKeyhole, LogOut, Mail } from 'lucide-react';
import { accountMessages, loadCustomerSession, type CustomerSession } from './customer-auth';
import styles from './account.module.css';

export default function AccountPage() {
  const [session, setSession] = useState<CustomerSession | null>(null);
  const [failed, setFailed] = useState(false);
  const params = new URLSearchParams(window.location.search);
  const requestedView = params.get('view') ?? 'login';
  const [view, setView] = useState(['login', 'register', 'forgot', 'reset'].includes(requestedView) ? requestedView : 'login');
  const [sending, setSending] = useState(false);
  const message = accountMessages[params.get('message') ?? ''];
  const reset = view === 'reset';
  const register = view === 'register';
  const forgot = view === 'forgot';

  useEffect(() => {
    let active = true;
    loadCustomerSession().then(value => { if (active) setSession(value); })
      .catch(() => { if (active) setFailed(true); });
    return () => { active = false; };
  }, []);

  function switchView(next: string) {
    setView(next);
    setSending(false);
    const url = new URL(window.location.href);
    url.search = '';
    if (next !== 'login') url.searchParams.set('view', next);
    window.history.replaceState(null, '', url.pathname + url.search);
  }

  const action = reset ? 'reset' : register ? 'register' : forgot ? 'forgot' : 'login';
  return <section className={styles.section}>
    <aside className={styles.intro}>
      <Leaf size={28} strokeWidth={1.2} aria-hidden="true" />
      <span className={styles.eyebrow}>LES JARDINS DE SOFIE</span>
      <h1>Un espace<br />rien qu’à <em>vous.</em></h1>
      <p>Retrouvez votre compte et poursuivez vos envies végétales, à votre rythme.</p>
      <Link href="/categorie/compositions" className={styles.explore}>Découvrir les compositions <ArrowRight size={16} aria-hidden="true" /></Link>
    </aside>
    <div className={styles.card}>
      {message && <p role={message.error ? 'alert' : 'status'} className={`${styles.message} ${message.error ? styles.error : ''}`}>{message.text}</p>}
      {failed ? <div role="alert"><h2>Connexion indisponible</h2><p>La connexion n’a pas pu être chargée.</p><button className={styles.submit} onClick={() => window.location.reload()}>Réessayer</button></div> :
      !session ? <p role="status">Chargement de votre espace…</p> :
      session.user && !reset ? <>
        <span className={styles.secure}><LockKeyhole size={14} aria-hidden="true" /> Session ouverte</span>
        <h2>Bonjour{session.user.firstName ? ` ${session.user.firstName}` : ''}.</h2>
        <p className={styles.description}>Bienvenue dans votre espace Les Jardins de Sofie.</p>
        <dl className={styles.profile}><dt>Nom</dt><dd>{session.user.name}</dd><dt>Adresse e-mail</dt><dd>{session.user.email}</dd></dl>
        <Link href="/categorie/compositions" className={styles.submit}>Continuer mes achats <ArrowRight size={16} aria-hidden="true" /></Link>
        <div className={styles.orderNote}><Mail size={19} aria-hidden="true" /><p>Après chaque commande, retrouvez sa confirmation et son lien de suivi dans votre boîte e-mail.</p></div>
        <form action={window.__JDS_CONFIG__.customerActionUrl} method="post">
          <input type="hidden" name="action" value="jds_customer_logout" />
          <input type="hidden" name="jds_nonce" value={session.csrf} />
          <button className={styles.textButton} type="submit"><LogOut size={15} aria-hidden="true" /> Se déconnecter</button>
        </form>
      </> : <>
        {!forgot && !reset && <div className={styles.tabs} role="group" aria-label="Accès à votre compte">
          <button type="button" aria-pressed={!register} className={!register ? styles.active : ''} onClick={() => switchView('login')}>Se connecter</button>
          <button type="button" aria-pressed={register} className={register ? styles.active : ''} onClick={() => switchView('register')}>S’inscrire</button>
        </div>}
        <h2>{reset ? 'Votre mot de passe' : forgot ? 'Mot de passe oublié ?' : register ? 'Bienvenue au jardin.' : 'Heureux de vous revoir.'}</h2>
        <p className={styles.description}>{reset ? 'Choisissez un mot de passe d’au moins 12 caractères.' : forgot ? 'Recevez un lien personnel pour choisir un nouveau mot de passe.' : register ? 'Créez votre compte. Un lien vous permettra de choisir votre mot de passe et de confirmer votre adresse e-mail.' : 'Connectez-vous avec votre adresse e-mail et votre mot de passe.'}</p>
        <form action={window.__JDS_CONFIG__.customerActionUrl} method="post" onSubmit={(event) => {
          if (reset) {
            const data = new FormData(event.currentTarget);
            if (data.get('password') !== data.get('password_confirm')) {
              event.preventDefault();
              const confirmation = event.currentTarget.elements.namedItem('password_confirm') as HTMLInputElement;
              confirmation.setCustomValidity('Les mots de passe doivent être identiques.');
              confirmation.reportValidity();
              return;
            }
          }
          setSending(true);
        }}>
          <input type="hidden" name="action" value={`jds_customer_${action}`} />
          <input type="hidden" name="jds_nonce" value={session.csrf} />
          {register && <div className={styles.nameFields}>
            <label>Prénom<input name="first_name" autoComplete="given-name" maxLength={100} required /></label>
            <label>Nom<input name="last_name" autoComplete="family-name" maxLength={100} /></label>
          </div>}
          {!reset && <label>Adresse e-mail<input name="email" type="email" autoComplete="email" maxLength={254} required /></label>}
          {(reset || (!register && !forgot)) && <label>Mot de passe<input name="password" type="password" autoComplete={reset ? 'new-password' : 'current-password'} minLength={reset ? 12 : undefined} maxLength={reset ? 128 : 4096} required /></label>}
          {reset && <>
            <input type="hidden" name="key" value={params.get('key') ?? ''} />
            <input type="hidden" name="login" value={params.get('login') ?? ''} />
            <label>Confirmer le mot de passe<input name="password_confirm" type="password" autoComplete="new-password" minLength={12} maxLength={128} required onInput={(event) => event.currentTarget.setCustomValidity('')} /></label>
          </>}
          {!register && !forgot && !reset && <div className={styles.options}>
            <label className={styles.remember}><input type="checkbox" name="remember" value="1" defaultChecked /> Rester connecté</label>
            <button type="button" className={styles.textButton} onClick={() => switchView('forgot')}>Mot de passe oublié ?</button>
          </div>}
          <button type="submit" className={styles.submit} disabled={sending}>{sending ? 'Un instant…' : reset ? 'Enregistrer mon mot de passe' : forgot ? 'Recevoir le lien' : register ? 'Créer mon compte' : 'Se connecter'} <ArrowRight size={16} aria-hidden="true" /></button>
        </form>
        {(forgot || reset) && <button type="button" className={styles.back} onClick={() => switchView('login')}>Retour à la connexion</button>}
        <p className={styles.secure}><LockKeyhole size={13} aria-hidden="true" /> Vos informations restent privées.</p>
      </>}
      <p className={styles.help}>Besoin d’aide ? <Link href="/contact">Contactez-nous</Link></p>
    </div>
  </section>;
}
