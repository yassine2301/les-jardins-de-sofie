import { NextRequest, NextResponse } from 'next/server';
import { generateOrderConfirmationEmail, generateOrderConfirmationText } from '@/lib/order-email';

/**
 * API route pour envoyer un email de confirmation de commande.
 *
 * À connecter avec un service d'envoi d'emails (Resend, SendGrid, Nodemailer, etc.)
 * Pour l'instant, retourne le HTML généré du mail.
 *
 * POST /api/order-confirmation
 * Body: { orderNumber, items: [{ name, quantity }], totalAmount, shippingAddress, customerName, customerEmail }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { orderNumber, items, totalAmount, shippingAddress, customerName, customerEmail } = body;

    if (!orderNumber || !items || !totalAmount || !shippingAddress || !customerEmail) {
      return NextResponse.json(
        { error: 'Champs requis manquants : orderNumber, items, totalAmount, shippingAddress, customerEmail' },
        { status: 400 }
      );
    }

    const emailHtml = generateOrderConfirmationEmail({
      orderNumber,
      items,
      totalAmount,
      shippingAddress,
      customerName: customerName || '',
    });

    const emailText = generateOrderConfirmationText({
      orderNumber,
      items,
      totalAmount,
      shippingAddress,
      customerName: customerName || '',
    });

    // TODO: Intégrer un service d'envoi d'email
    // Exemple avec Resend :
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from: 'Les Jardins de Sofie <commandes@lesjardinsdesofie.com>',
    //   to: customerEmail,
    //   subject: `Confirmation de votre commande #${orderNumber} — Les Jardins de Sofie`,
    //   html: emailHtml,
    //   text: emailText,
    // });

    return NextResponse.json({
      success: true,
      message: 'Email de confirmation généré avec succès',
      preview: {
        to: customerEmail,
        subject: `Confirmation de votre commande #${orderNumber} — Les Jardins de Sofie`,
        html: emailHtml,
        text: emailText,
      },
    });
  } catch (error) {
    console.error('Erreur envoi email confirmation:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la génération de l\'email' },
      { status: 500 }
    );
  }
}
