# Shopify storefront return patch — 23 October 2026

This directory contains a patch set for the store's Horizon theme, not an
independently installable complete theme. Unchanged Horizon dependencies kept
locally for Liquid validation are not part of this patch set.

The original live theme is Horizon, ID 186598261024. The Shopify connector
created a duplicate, **JDS — retours boutique — 23 octobre**, ID 192852164896,
with role UNPUBLISHED. It successfully wrote three files to that draft:

- `theme/layout/theme.liquid` invokes the new redirect snippet in the head.
- `theme/snippets/jds-storefront-redirect.liquid` returns store navigation to
  https://lesjardinsdesofie.com/ while preserving product, collection and search
  destinations. Shopify's theme editor and checkout are outside the redirect.
- `theme/templates/index.json` replaces the default English hero and links to
  the WordPress compositions category as a fallback.

The original layout and homepage template are retained under
`before-20261023/` for comparison and rollback. The new snippet did not exist
in the original theme. All three changed files passed the Shopify Liquid
validator with the existing Horizon dependency context.

This draft is **not published**. The connector does not support publishing or
writing to the live theme. Merchant admin sign-in is needed to review and
publish the draft. No checkout, shipping, payment method, subscription or plan
was changed. Staff order-notification recipients and real email delivery have
not been verified.
