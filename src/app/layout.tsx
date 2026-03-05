import type { Metadata } from 'next';
import { CartProvider } from '@/lib/cart-context';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/layout/CartDrawer';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'Studio JDS — Respirez votre intérieur',
  description:
    'Cadeaux corporate, événements, sur-mesure et jardins. Des projets pensés ensemble. Plantes d\'intérieur et pots artisanaux en terre cuite.',
  keywords: ['plantes intérieur', 'pots artisanaux', 'terre cuite', 'décoration', 'cadeaux corporate', 'événements', 'sur-mesure', 'jardins', 'Casablanca', 'Maroc'],
  openGraph: {
    title: 'Studio JDS',
    description: 'Cadeaux corporate, événements, sur-mesure et jardins. Des projets pensés ensemble.',
    url: 'https://lesjardinsdesofie.com',
    siteName: 'Studio JDS',
    locale: 'fr_FR',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <CartProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
