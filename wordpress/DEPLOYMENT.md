# WordPress production deployment — 22 October 2026

The Studio JDS theme is active on https://lesjardinsdesofie.com/.
WordPress Customizer confirmed publication, and the new homepage was checked
at the public URL after a full reload. Assets are served by the WordPress
host; the application is not embedded from, or proxied through, Vercel.

The existing public Shopify Storefront configuration is stored in WordPress
options via the theme Customizer. No token, admin credential or customer data
is committed to this repository.

## Verified on the deployed site

- Homepage layout, logo and pottery video render correctly.
- Direct category navigation and full reload work.
- Collections: 51 compositions, 26 plants, 37 pots, 23 jarres. Jarres also
  appear in Pots; these counts represent the same 114-product catalogue.
- Monstera Andesonii product detail shows 760 MAD.
- Adding one item creates a Shopify cart and displays its checkout link on
  the existing Shopify domain. No order or payment was submitted.
- The six adapter build/source checks passed before theme installation.

## Previous WordPress site

A complete 2.23 GB All-in-One WP Migration backup was created and its presence
verified in WordPress → All-in-One WP Migration → Sauvegardes before activation.
It remains on the WordPress host. The old JDS/alukas theme and database content
also remain intact. No full-archive restoration test was performed.

The public GitHub branch `backup/wordpress-avant-migration-20261022` contains
a read-only visual snapshot of the old homepage. It is explicitly a partial
snapshot, not the full database/theme/media archive.

The existing limitations described in README.md still apply, including the
prototype forms and the Shopify development-store status.

## Customer accounts — theme 1.1.0

The prototype `/compte` form has been replaced with the store's real
Shopify-hosted customer account entry point. The connected store already has
`NEW_CUSTOMER_ACCOUNTS` enabled. Its root account URL was read from the Shopify
Admin API, stored as a public WordPress setting, and verified in the browser.
The sign-in screen opens in French and offers both sign-in and account creation.

Shopify handles the email-code authentication, customer profiles, addresses and
order history. This change adds no WordPress customer database, password form,
OAuth callback handler or local customer-token storage. The unverified welcome
discount and the prototype success message have been removed.

Nine technical checks passed, including untrusted URL rejection and the prior
catalogue regression checks. The theme update and account URL setting were
published, and the button was clicked from the production `/compte` page through
to Shopify's actual sign-in form. No real customer account was created during
verification, and no email code, profile change or real order was submitted.

Newsletter and service/contact forms remain prototypes. This account change
does not alter the Shopify development-store plan or enable live orders.
