type CustomerAccountConfig = {
  accountUrl?: string;
  storeDomain?: string;
};

/** Only navigate to a Shopify account entry point, never an OAuth callback. */
export function getCustomerAccountUrl({
  accountUrl = process.env.NEXT_PUBLIC_SHOPIFY_CUSTOMER_ACCOUNT_URL,
  storeDomain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN,
}: CustomerAccountConfig = {}): string | null {
  const domain = (storeDomain ?? '').trim().toLowerCase();
  const validDomain = /^[a-z0-9][a-z0-9-]*\.myshopify\.com$/.test(domain);
  const configuredUrl = (accountUrl ?? '').trim();
  if (!configuredUrl && !validDomain) return null;

  try {
    const url = new URL(configuredUrl || `https://${domain}/account`);
    if (url.protocol !== 'https:' || url.username || url.password || url.port || url.search || url.hash) return null;
    const hostedAccount = url.hostname === 'shopify.com' && /^\/\d+\/account\/?$/.test(url.pathname);
    const storeAccount = validDomain && url.hostname === domain && /^\/account(?:\/login)?\/?$/.test(url.pathname);
    if (!hostedAccount && !storeAccount) return null;
    url.searchParams.set('locale', 'fr');
    return url.href;
  } catch {
    return null;
  }
}
