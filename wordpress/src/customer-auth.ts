export type CustomerProfile = { name: string; email: string; firstName: string; lastName: string };
export type CustomerSession = { csrf: string; user: CustomerProfile | null };

export async function loadCustomerSession(): Promise<CustomerSession> {
  const url = window.__JDS_CONFIG__.customerStateUrl;
  if (!url || new URL(url, window.location.origin).origin !== window.location.origin) throw new Error('Session indisponible');
  const requestUrl = new URL(url, window.location.origin);
  requestUrl.searchParams.set('_jds', crypto.randomUUID());
  const response = await fetch(requestUrl.href, { credentials: 'same-origin', cache: 'no-store' });
  if (!response.ok) throw new Error('Session indisponible');
  const body = await response.json();
  if (!body.success || typeof body.data?.csrf !== 'string') throw new Error('Session indisponible');
  return body.data;
}

export const accountMessages: Record<string, { text: string; error?: boolean }> = {
  'email-sent': { text: 'Si cette adresse peut être utilisée, un lien pour choisir votre mot de passe vous est envoyé. Consultez aussi vos courriers indésirables. Si vous avez déjà un compte, connectez-vous ou utilisez « Mot de passe oublié ».' },
  'invalid-login': { text: 'Connexion impossible. Vérifiez votre e-mail et votre mot de passe, ou utilisez « Mot de passe oublié ».', error: true },
  'invalid-details': { text: 'Vérifiez les informations saisies.', error: true },
  'invalid-password': { text: 'Utilisez au moins 12 caractères et confirmez le même mot de passe.', error: true },
  'expired-link': { text: 'Ce lien a expiré ou a déjà été utilisé. Demandez un nouveau lien.', error: true },
  'password-saved': { text: 'Votre mot de passe est enregistré. Vous pouvez maintenant vous connecter.' },
  'session-expired': { text: 'Le formulaire a expiré. Rechargez la page puis réessayez.', error: true },
  'post-required': { text: 'Le formulaire n’a pas pu être envoyé. Rechargez la page puis réessayez.', error: true },
  'https-required': { text: 'Une connexion sécurisée est nécessaire. Rechargez la page puis réessayez.', error: true },
  'origin-expired': { text: 'Le formulaire n’a pas pu être validé. Ouvrez à nouveau la page Compte puis réessayez.', error: true },
  'rate-limited': { text: 'Trop de tentatives. Patientez 15 minutes avant de réessayer.', error: true },
  'mail-failed': { text: 'L’e-mail n’a pas pu être envoyé. Réessayez plus tard ou contactez-nous.', error: true },
  unavailable: { text: 'Le service est momentanément indisponible. Réessayez dans quelques instants.', error: true },
  welcome: { text: 'Vous êtes connecté à votre espace client.' },
  'signed-out': { text: 'Vous êtes déconnecté.' },
};
