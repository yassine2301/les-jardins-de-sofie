import { getAllProducts, getAllCollections } from '@/lib/shopify';
import { Marquee } from '@/components/sections/Marquee';
import { Hero } from '@/components/sections/Hero';
import { BrandStory } from '@/components/sections/BrandStory';
import { Categories } from '@/components/sections/Categories';
import { ProductCarousel } from '@/components/sections/ProductCarousel';
import { Editorial } from '@/components/sections/Editorial';
import { Reassurance } from '@/components/sections/Reassurance';
import { Newsletter } from '@/components/sections/Newsletter';

// Revalidate every 60 seconds (ISR)
export const revalidate = 60;

export default async function HomePage() {
  // Fetch data from Shopify at build time / ISR
  const [products, collections] = await Promise.all([
    getAllProducts(50),
    getAllCollections(),
  ]);

  // Split products by collection or tag for different carousels
  const compositions = products.filter(
    (p) => p.tags.includes('composition') || collections.find((c) => c.handle === 'nos-compositions')?.products.edges.some((e) => e.node.id === p.id)
  );
  const plantes = products.filter(
    (p) => p.tags.includes('plante') || p.tags.includes('plantes')
  );
  const pots = products.filter(
    (p) => p.tags.includes('pot') || p.tags.includes('pots')
  );

  // Fallback: if tags aren't set, show all products in first carousel
  const mainProducts = compositions.length > 0 ? compositions : products.slice(0, 12);
  const plantProducts = plantes.length > 0 ? plantes : products.slice(4, 12);
  const potProducts = pots.length > 0 ? pots : products.slice(8, 16);

  return (
    <>
      <Marquee />
      <Hero />
      <BrandStory />
      <Categories collections={collections} />

      <ProductCarousel
        label="Les plus demandées"
        title="Nos compositions"
        products={mainProducts}
        id="compositions"
      />

      <ProductCarousel
        label="Vertes & vivantes"
        title="Nos plantes"
        products={plantProducts}
        id="plantes"
      />

      <ProductCarousel
        label="Faits main en terre cuite"
        title="Nos pots artisanaux"
        products={potProducts}
        id="pots"
      />

      <Editorial />
      <Reassurance />
      <Newsletter />
    </>
  );
}
