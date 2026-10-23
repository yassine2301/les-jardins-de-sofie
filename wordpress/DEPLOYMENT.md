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

## Integrated customer accounts — theme 1.2.2, 23 October 2026

The active WordPress theme now has its own email/password customer interface at
`/compte`, replacing the Shopify-portal button described above. Authentication
uses native WordPress users and secure cookies. Separate registration and
password-recovery forms send a password-setup link; an account stays pending
until the recipient uses that link. Optional persistent sessions use the native
WordPress remember setting. Staff keep their existing administration sign-in.

Shopify continues to supply products, prices, availability, carts, checkout and
order records. WordPress login is not Shopify SSO: this release does not create
Shopify credentials, pre-authenticate checkout or display Shopify order history
inside the WordPress profile.

The WordPress upload UI confirmed the theme update to 1.2.2. Public checks:

- Existing signed-in profile survives page reload and catalogue navigation.
- Logout returns `signed-out` and shows the guest login form after reload.
- Login, registration and password-recovery views render on the same domain.
- Monstera Andesonii remains 760 MAD; adding one creates a Shopify cart.
- The cart survives a full page reload; the test item was then removed (zero).
- Checkout continues to link to the connected Shopify store. No order was placed.

The live logout test caught a referrer-policy interaction: `no-referrer` made
Chrome submit an opaque Origin. The final policy is `same-origin`, preserving
the form's Origin while keeping reset-link URLs off external origins. Opaque
and foreign origins remain rejected. Session reads also use a unique query
parameter to avoid cached nonces.

Build and TypeScript checks pass. Twelve test cases pass, including a PHP-Wasm
harness with 21 authentication scenarios. These checks do not establish real
mail delivery: no new customer password, inbox link or real order was tested.

The Shopify Admin API still reports `partnerDevelopment: true`, despite the
Basic display label. Live COD has not been enabled or verified. Actual staff
notification recipients also remain unverified because merchant administration
requires sign-in. No plan change or purchase was made.

The English Shopify home belongs to the separate published Horizon theme.
Its replacement/return links are prepared in unpublished theme
`JDS — retours boutique — 23 octobre` (192852164896). It is not published by
this release; see `../shopify/README.md`.
