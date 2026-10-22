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
