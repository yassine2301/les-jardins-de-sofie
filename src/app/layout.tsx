import type { Metadata } from 'next';
import { CartProvider } from '@/lib/cart-context';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/layout/CartDrawer';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'Les Jardins de Sofie — Respirez votre intérieur',
  description:
    'Compositions uniques de plantes d\'intérieur et pots artisanaux en terre cuite. Chaque pièce est conçue pour sublimer votre espace de vie.',
  keywords: ['plantes intérieur', 'pots artisanaux', 'terre cuite', 'décoration', 'Casablanca', 'Maroc'],
  openGraph: {
    title: 'Les Jardins de Sofie',
    description: 'Respirez votre intérieur — Plantes & pots artisanaux',
    url: 'https://lesjardinsdesofie.com',
    siteName: 'Les Jardins de Sofie',
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
