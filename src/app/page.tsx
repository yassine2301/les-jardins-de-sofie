import { getAllCollections } from '@/lib/shopify';
import { Marquee } from '@/components/sections/Marquee';
import { Hero } from '@/components/sections/Hero';
import { BrandStory } from '@/components/sections/BrandStory';
import { Categories } from '@/components/sections/Categories';
import { Editorial } from '@/components/sections/Editorial';
import { Reassurance } from '@/components/sections/Reassurance';
import { Newsletter } from '@/components/sections/Newsletter';

// Revalidate every 60 seconds (ISR)
export const revalidate = 60;

export default async function HomePage() {
  const collections = await getAllCollections();

  return (
    <>
      <Marquee />
      <Hero />
      <BrandStory />
      <Categories collections={collections} />
      <Editorial />
      <Reassurance />
      <Newsletter />
    </>
  );
}
