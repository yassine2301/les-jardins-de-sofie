# WordPress deployment history

## Current status — rollback on 24 October 2026

At the owner's request, the original JDS theme (`alukas`) is active again on
https://lesjardinsdesofie.com/. The WordPress theme administration confirmed
"Nouveau thème activé" and "Activé : JDS". The public homepage matches the
layout captured before migration. Studio JDS 1.2.2 remains installed but is
inactive; its account handlers and storefront routing are no longer loaded.

The old theme, original pages, product catalogue and settings were still on
the host. Reactivation was sufficient: no full database import or deletion
was needed. The original 22 October All-in-One WP Migration archive remains
present, 2.23 GB. The JavaScript storefront source is retained in this
repository. No new hosting migration, domain change or Shopify theme
publication is part of this rollback.

The post-rollback full export completed successfully. The backups screen lists
`lesjardinsdesofie.com-20261024-140605-814.wpress`, 2.22 GB, alongside the
original `lesjardinsdesofie.com-20261022-195500-473.wpress`, 2.23 GB. Both
archives remain on the WordPress host; neither is copied to the public source
repository. The presence and completed export were verified, not a separate
full-archive restoration test.

Public browser checks covered the homepage, Boutique, Anthurium product page,
Petites Plantes, Grand Pots, About and Contact. Categories show distinct
products. Adding one Anthurium at 300 MAD increased the existing cart from one
to two items and the total from 1,850 to 2,150 MAD; the test item was removed
and the original cart was preserved. The remaining pre-existing Erratum noir
& Ficus Lyrata is out of stock, and the native cart correctly reports that
checkout is blocked. Stock was not changed. No order, payment, customer
registration, password change or contact email was submitted.

Verification limits: transient 503 responses and a timeout occurred during
the full export. Contact subsequently loaded normally in the browser. Guest
HTTP checks after export confirmed the old theme and no React app root on
the homepage, shop, product, Grand Pots, About and Contact pages. Responses
were still slow (roughly 6–10 seconds); an anonymous Petites Plantes request
timed out despite that category rendering in the browser. Hosting reliability
and real order/email delivery are therefore not certified by this rollback.
A focused retry of that category then returned HTTP 200 with the old theme
in 5.45 seconds. All seven checked public routes have returned HTTP 200 after
the rollback; this is a point-in-time check, not a guarantee of availability.

## Startup flash correction — 24 October 2026

The owner reported an oversized, unstyled logo before the homepage layout
appeared. A fresh anonymous HTML response reproduced the cause: AirLift had
inlined critical CSS for the inactive `jds-studio/dist/jds-app.css?v=1.2.2`
while delaying all of the active Alukas theme's stylesheets and inline CSS.
The document initially had no regular stylesheet links. This was stale
optimization of the previous theme, not a separate landing page.

AirLift was deactivated through WordPress; its files and settings remain
available for rollback. LiteSpeed Cache was also deactivated after its own
Cache screen reported that page caching was unavailable on this server
without LiteSpeed or QUIC.cloud. Speed Optimizer remains active, with its
existing file-based cache enabled. Automatic Purge was changed from off to
on and its persisted checked state was verified after a fresh navigation.
Manual cache purge was invoked. Logged-in caching and preheating were not
enabled. No theme source, product, customer or order data was changed.

Final anonymous checks returned HTTP 200 twice, with 28 regular stylesheet
links, the Alukas base stylesheet in the head, no delayed AirLift CSS loader,
no reference to the inactive theme CSS, and no LiteSpeed output marker. HTML
was approximately 342 KB instead of 496 KB. Browser checks confirmed the
normal 170 x 165 header logo, working cart sidebar open/close and navigation
between the homepage and shop. The existing cart contents were retained.

This resolves the identified unstyled startup rendering path. It does not
establish a general speed improvement: final HTTP response-start waits were
8.69 and 6.43 seconds, including network/proxy overhead. Server processing
was not isolated. See `diagnostics/loading-20261024.json`. Further hosting
performance work may still be needed; no new hosting migration was started.

## Historical deployment — 22 October 2026

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
