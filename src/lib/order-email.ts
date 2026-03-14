/**
 * Génère le HTML de l'email de confirmation de commande
 */
interface OrderItem {
  name: string;
  quantity: number;
}

interface OrderEmailData {
  orderNumber: string;
  items: OrderItem[];
  totalAmount: string;
  shippingAddress: string;
  customerName: string;
}

export function generateOrderConfirmationEmail(data: OrderEmailData): string {
  const itemsList = data.items
    .map(
      (item) =>
        `<tr>
          <td style="padding: 8px 0; border-bottom: 1px solid #E7D7C1; font-family: 'DM Sans', Arial, sans-serif; font-size: 14px; color: #1E1714;">${item.name}</td>
          <td style="padding: 8px 0; border-bottom: 1px solid #E7D7C1; font-family: 'DM Sans', Arial, sans-serif; font-size: 14px; color: #1E1714; text-align: center;">${item.quantity}</td>
        </tr>`
    )
    .join('');

  return `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Confirmation de commande - Les Jardins de Sofie</title>
</head>
<body style="margin: 0; padding: 0; background-color: #F8F4EE; font-family: 'DM Sans', Arial, sans-serif;">
  <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color: #F8F4EE;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" cellpadding="0" cellspacing="0" width="600" style="max-width: 600px; background-color: #FFFFFF; border-radius: 18px; overflow: hidden; box-shadow: 0 10px 40px rgba(115, 87, 81, 0.06);">

          <!-- Header -->
          <tr>
            <td align="center" style="padding: 40px 40px 20px; background-color: #FFFFFF;">
              <h1 style="font-family: 'Playfair Display', Georgia, serif; font-weight: 400; font-size: 22px; color: #1E1714; margin: 0;">
                Les Jardins de Sofie 🌿
              </h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding: 20px 40px 40px;">
              <p style="font-family: 'DM Sans', Arial, sans-serif; font-size: 15px; color: #1E1714; line-height: 1.7; margin: 0 0 16px;">
                Bonjour${data.customerName ? ` ${data.customerName}` : ''},
              </p>
              <p style="font-family: 'DM Sans', Arial, sans-serif; font-size: 15px; color: #735751; line-height: 1.7; margin: 0 0 16px;">
                Merci beaucoup pour votre commande sur le site <strong style="color: #1E1714;">Les Jardins de Sofie</strong>.
              </p>
              <p style="font-family: 'DM Sans', Arial, sans-serif; font-size: 15px; color: #735751; line-height: 1.7; margin: 0 0 24px;">
                Nous préparons actuellement votre commande avec le plus grand soin dans notre atelier. Vous recevrez très prochainement un message de notre part pour vous informer de la livraison.
              </p>

              <!-- Order details -->
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color: #F8F4EE; border-radius: 12px; padding: 24px; margin-bottom: 24px;">
                <tr>
                  <td style="padding: 24px;">
                    <h2 style="font-family: 'Playfair Display', Georgia, serif; font-weight: 400; font-size: 18px; color: #1E1714; margin: 0 0 16px;">
                      Détails de votre commande
                    </h2>

                    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 16px;">
                      <tr>
                        <td style="font-family: 'DM Sans', Arial, sans-serif; font-size: 13px; font-weight: 500; color: #A78A7F; padding-bottom: 4px;">Numéro de commande</td>
                      </tr>
                      <tr>
                        <td style="font-family: 'DM Sans', Arial, sans-serif; font-size: 15px; font-weight: 500; color: #8C1C13; padding-bottom: 16px;">#${data.orderNumber}</td>
                      </tr>
                    </table>

                    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 16px;">
                      <tr>
                        <td style="font-family: 'DM Sans', Arial, sans-serif; font-size: 13px; font-weight: 500; color: #A78A7F; padding-bottom: 8px;">Produit(s)</td>
                        <td style="font-family: 'DM Sans', Arial, sans-serif; font-size: 13px; font-weight: 500; color: #A78A7F; padding-bottom: 8px; text-align: center;">Quantité</td>
                      </tr>
                      ${itemsList}
                    </table>

                    <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                      <tr>
                        <td style="font-family: 'DM Sans', Arial, sans-serif; font-size: 13px; font-weight: 500; color: #A78A7F; padding-bottom: 4px;">Montant total</td>
                      </tr>
                      <tr>
                        <td style="font-family: 'DM Sans', Arial, sans-serif; font-size: 18px; font-weight: 600; color: #1E1714; padding-bottom: 16px;">${data.totalAmount} MAD</td>
                      </tr>
                      <tr>
                        <td style="font-family: 'DM Sans', Arial, sans-serif; font-size: 13px; font-weight: 500; color: #A78A7F; padding-bottom: 4px;">Adresse de livraison</td>
                      </tr>
                      <tr>
                        <td style="font-family: 'DM Sans', Arial, sans-serif; font-size: 14px; color: #1E1714;">${data.shippingAddress}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <p style="font-family: 'DM Sans', Arial, sans-serif; font-size: 15px; color: #735751; line-height: 1.7; margin: 0 0 8px;">
                Encore merci pour votre confiance.
              </p>
              <p style="font-family: 'DM Sans', Arial, sans-serif; font-size: 15px; color: #735751; line-height: 1.7; margin: 0;">
                À très bientôt,
              </p>
              <p style="font-family: 'Playfair Display', Georgia, serif; font-size: 16px; color: #1E1714; margin: 8px 0 0;">
                Les Jardins de Sofie 🌿
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding: 20px 40px 30px; border-top: 1px solid #E7D7C1;">
              <p style="font-family: 'DM Sans', Arial, sans-serif; font-size: 12px; color: #9A918C; margin: 0;">
                © 2026 Les Jardins de Sofie. Tous droits réservés.
              </p>
              <p style="font-family: 'DM Sans', Arial, sans-serif; font-size: 12px; color: #9A918C; margin: 4px 0 0;">
                lesjardinsdesofie@gmail.com · +212 667-753611
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

/**
 * Génère la version texte de l'email
 */
export function generateOrderConfirmationText(data: OrderEmailData): string {
  const itemsList = data.items
    .map((item) => `- ${item.name} (x${item.quantity})`)
    .join('\n');

  return `
Bonjour${data.customerName ? ` ${data.customerName}` : ''},

Merci beaucoup pour votre commande sur le site Les Jardins de Sofie.

Nous préparons actuellement votre commande avec le plus grand soin dans notre atelier. Vous recevrez très prochainement un message de notre part pour vous informer de la livraison.

Détails de votre commande :
Numéro de commande : #${data.orderNumber}
Produit(s) :
${itemsList}
Montant total : ${data.totalAmount} MAD
Adresse de livraison : ${data.shippingAddress}

Encore merci pour votre confiance.

À très bientôt,
Les Jardins de Sofie 🌿
  `.trim();
}
