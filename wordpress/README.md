# Studio JDS: WordPress deployment

This is a WordPress host adapter for the existing Next.js storefront, not an
iframe or reverse proxy to Vercel. It bundles the original React components,
CSS modules, category rules and Shopify client into browser assets served by
the WordPress PHP host. No WooCommerce or Node.js server is needed in production.

## Build

From this directory, run `npm ci`, `npm run build`, and `npm test`. Zip the
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
- Existing prototype account, newsletter and service/contact forms retain their
  prior behavior. Their backend integrations are not implemented by this move.
- A Shopify development store is still only for testing; changing hosting does
  not turn it into a production store or enable real COD orders.
- The old WordPress database and theme remain intact. Switching the theme back
  restores the prior site through WordPress's normal theme-switching flow.

Vercel source and deployment settings are not changed by this adapter.
