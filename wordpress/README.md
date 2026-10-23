# Studio JDS: WordPress deployment

This is a WordPress host adapter for the existing Next.js storefront, not an
iframe or reverse proxy to Vercel. It bundles the original React components,
CSS modules, category rules and Shopify client into browser assets served by
the WordPress PHP host. No WooCommerce or Node.js server is needed in production.

## Build

From this directory, run `npm ci`, `npm run build`, `npm run typecheck`, and `npm test`. Zip the
`theme/jds-studio` directory and upload it through Appearance → Themes → Add.
Do not activate an unconfigured theme. Use Live Preview and configure the two
options under **Catalogue Shopify JDS**. Verify the preview, then publish.

Only the existing **public Storefront token** belongs in these settings; never
use an Admin API token or a password. The token remains public by design, just
as in the previous `NEXT_PUBLIC_` client configuration. Secrets are not bundled.

## Scope and tradeoffs

- Pages, styles, navigation, category filters, product details and Shopify cart
  reuse the current source files.
- Category and product data remain fetched from Shopify, not copied into a
  second WordPress catalogue.
- Frontend navigation remains client-side, preserving the current cart.
- Unlike the Next.js site, this adapter renders catalogue pages in the browser;
  product-specific server-side SEO needs a separate enhancement if required.
- Theme 1.2.2 uses the native WordPress user database for customer sign-in.
  `/compte` has separate login and registration forms. Registration sends a
  personal password-setup link, proving address ownership before login. Password
  hashing, reset keys, revocation and authentication cookies are delegated to
  WordPress. The optional persistent cookie uses WordPress's default 14-day
  duration. No passwords or customer authentication tokens enter localStorage.
- Anonymous forms use a browser-specific nonce, secure HttpOnly cookie,
  same-origin POST checks and rate limits. New accounts can only be subscribers;
  staff must use their existing admin login. Customer profiles are loaded from
  a private, uncached same-origin endpoint and never embedded in cached HTML.
- WordPress identity is separate from Shopify checkout identity. Products,
  prices, availability, carts, checkout, order records and order notifications
  remain Shopify responsibilities. This does not provision Shopify customer
  credentials or mirror Shopify order history into WordPress. Order tracking
  remains available from Shopify's order-confirmation emails.
- The previous public Shopify account URL option remains for compatibility but
  is no longer used by the WordPress account page. The existing Next.js/Vercel
  account page is not deployed by this WordPress release.
- Shopify cart IDs are persisted in browser storage and revalidated against
  Shopify after a reload, so a normal account-form redirect preserves the cart.
- Existing prototype newsletter and service/contact forms retain their prior
  behavior. Their backend integrations are not implemented by this move.
- A Shopify development store is still only for testing; changing hosting does
  not turn it into a production store or enable real COD orders.
- The old WordPress database and theme remain intact. Switching the theme back
  restores the prior site through WordPress's normal theme-switching flow.

Vercel source and deployment settings are not changed by this adapter.
