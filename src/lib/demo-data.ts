// ==============================================
// Les Jardins de Sofie — Données de démonstration
// Utilisées quand Shopify n'est pas encore connecté
// ==============================================

import { type ShopifyProduct, type ShopifyCollection } from './shopify';

const img = (url: string) => ({ url, altText: null, width: 600, height: 800 });

// Real product images from /public/images/
const PRODUCTS = '/images/products/';
const CATEGORIES = '/images/categories/';

export const demoProducts: ShopifyProduct[] = [
  // --- COMPOSITIONS ---
  {
    id: 'demo-1', handle: 'erratum-olivier', title: 'Erratum & Olivier',
    description: 'Pot Erratum greige 60cm + Olivier ~1m60. Une composition élégante et intemporelle.',
    descriptionHtml: '<p>Pot Erratum greige 60cm + Olivier ~1m60. Une composition élégante et intemporelle.</p><p>Le pot Erratum, avec ses formes organiques et asymétriques, met en valeur l\'olivier dans toute sa splendeur méditerranéenne.</p>',
    availableForSale: true, tags: ['composition', 'nouveau'],
    priceRange: { minVariantPrice: { amount: '1890', currencyCode: 'MAD' }, maxVariantPrice: { amount: '1890', currencyCode: 'MAD' } },
    compareAtPriceRange: { minVariantPrice: { amount: '0', currencyCode: 'MAD' }, maxVariantPrice: { amount: '0', currencyCode: 'MAD' } },
    images: { edges: [{ node: img(PRODUCTS + 'erratum-olivier.jpg') }] },
    variants: { edges: [{ node: { id: 'v-1', title: 'Default Title', availableForSale: true, price: { amount: '1890', currencyCode: 'MAD' }, compareAtPrice: null, image: null } }] },
  },
  {
    id: 'demo-2', handle: 'saxum-lyrata', title: 'Saxum & Ficus Lyrata',
    description: 'Pot Saxum beige 40cm + Ficus Lyrata. Le mariage parfait entre rondeur et verticalité.',
    descriptionHtml: '<p>Pot Saxum beige 40cm + Ficus Lyrata. Le mariage parfait entre rondeur et verticalité.</p>',
    availableForSale: true, tags: ['composition'],
    priceRange: { minVariantPrice: { amount: '1850', currencyCode: 'MAD' }, maxVariantPrice: { amount: '1850', currencyCode: 'MAD' } },
    compareAtPriceRange: { minVariantPrice: { amount: '0', currencyCode: 'MAD' }, maxVariantPrice: { amount: '0', currencyCode: 'MAD' } },
    images: { edges: [{ node: img(PRODUCTS + 'saxum-lyrata.jpg') }] },
    variants: { edges: [{ node: { id: 'v-2', title: 'Default Title', availableForSale: true, price: { amount: '1850', currencyCode: 'MAD' }, compareAtPrice: null, image: null } }] },
  },
  {
    id: 'demo-3', handle: 'saxum-cycas', title: 'Saxum & Cycas',
    description: 'Pot Saxum blanc + Cycas. L\'alliance tropicale et sculpturale.',
    descriptionHtml: '<p>Pot Saxum blanc + Cycas. L\'alliance tropicale et sculpturale.</p>',
    availableForSale: true, tags: ['composition'],
    priceRange: { minVariantPrice: { amount: '1950', currencyCode: 'MAD' }, maxVariantPrice: { amount: '1950', currencyCode: 'MAD' } },
    compareAtPriceRange: { minVariantPrice: { amount: '0', currencyCode: 'MAD' }, maxVariantPrice: { amount: '0', currencyCode: 'MAD' } },
    images: { edges: [{ node: img(PRODUCTS + 'saxum-cycas.jpg') }] },
    variants: { edges: [{ node: { id: 'v-3', title: 'Default Title', availableForSale: true, price: { amount: '1950', currencyCode: 'MAD' }, compareAtPrice: null, image: null } }] },
  },
  {
    id: 'demo-4', handle: 'erratum-pachira', title: 'Erratum & Pachira',
    description: 'Pot Erratum noir + Pachira. Force et caractère.',
    descriptionHtml: '<p>Pot Erratum noir + Pachira. Force et caractère.</p>',
    availableForSale: true, tags: ['composition'],
    priceRange: { minVariantPrice: { amount: '1430', currencyCode: 'MAD' }, maxVariantPrice: { amount: '1430', currencyCode: 'MAD' } },
    compareAtPriceRange: { minVariantPrice: { amount: '0', currencyCode: 'MAD' }, maxVariantPrice: { amount: '0', currencyCode: 'MAD' } },
    images: { edges: [{ node: img(PRODUCTS + 'erratum-pachira.jpg') }] },
    variants: { edges: [{ node: { id: 'v-4', title: 'Default Title', availableForSale: true, price: { amount: '1430', currencyCode: 'MAD' }, compareAtPrice: null, image: null } }] },
  },
  {
    id: 'demo-5', handle: 'berceau-kentia', title: 'Berceau & Kentia',
    description: 'Pot Berceau gris + Kentia Palm. Hauteur totale ~1m50.',
    descriptionHtml: '<p>Pot Berceau gris + Kentia Palm. Hauteur totale ~1m50. Un duo tropical et apaisant.</p>',
    availableForSale: true, tags: ['composition'],
    priceRange: { minVariantPrice: { amount: '1998', currencyCode: 'MAD' }, maxVariantPrice: { amount: '1998', currencyCode: 'MAD' } },
    compareAtPriceRange: { minVariantPrice: { amount: '2350', currencyCode: 'MAD' }, maxVariantPrice: { amount: '2350', currencyCode: 'MAD' } },
    images: { edges: [{ node: img(PRODUCTS + 'strelitzia-classique.jpg') }] },
    variants: { edges: [{ node: { id: 'v-5', title: 'Default Title', availableForSale: true, price: { amount: '1998', currencyCode: 'MAD' }, compareAtPrice: { amount: '2350', currencyCode: 'MAD' }, image: null } }] },
  },
  {
    id: 'demo-6', handle: 'strelitzia-classique', title: 'Strelitzia Classique',
    description: 'Pot Classique noir + Strelitzia. Spectaculaire et graphique.',
    descriptionHtml: '<p>Pot Classique noir + Strelitzia. Spectaculaire et graphique. La plante oiseau de paradis dans toute sa majesté.</p>',
    availableForSale: true, tags: ['composition'],
    priceRange: { minVariantPrice: { amount: '2450', currencyCode: 'MAD' }, maxVariantPrice: { amount: '2450', currencyCode: 'MAD' } },
    compareAtPriceRange: { minVariantPrice: { amount: '0', currencyCode: 'MAD' }, maxVariantPrice: { amount: '0', currencyCode: 'MAD' } },
    images: { edges: [{ node: img(PRODUCTS + 'saxum-bonsai.jpg') }] },
    variants: { edges: [{ node: { id: 'v-6', title: 'Default Title', availableForSale: true, price: { amount: '2450', currencyCode: 'MAD' }, compareAtPrice: null, image: null } }] },
  },

  // --- PLANTES ---
  {
    id: 'demo-10', handle: 'monstera-deliciosa', title: 'Monstera Deliciosa',
    description: 'Grande plante d\'intérieur. Feuilles découpées iconiques.',
    descriptionHtml: '<p>La Monstera Deliciosa, aussi appelée "plante gruyère", est une plante tropicale emblématique. Ses grandes feuilles perforées apportent une touche jungle à tout intérieur.</p>',
    availableForSale: true, tags: ['plante'],
    priceRange: { minVariantPrice: { amount: '1200', currencyCode: 'MAD' }, maxVariantPrice: { amount: '1200', currencyCode: 'MAD' } },
    compareAtPriceRange: { minVariantPrice: { amount: '0', currencyCode: 'MAD' }, maxVariantPrice: { amount: '0', currencyCode: 'MAD' } },
    images: { edges: [{ node: img(PRODUCTS + 'monstera.jpg') }] },
    variants: { edges: [{ node: { id: 'v-10', title: 'Default Title', availableForSale: true, price: { amount: '1200', currencyCode: 'MAD' }, compareAtPrice: null, image: null } }] },
  },
  {
    id: 'demo-11', handle: 'ficus-lyrata', title: 'Ficus Lyrata',
    description: 'Grande plante d\'intérieur. Feuilles en forme de violon.',
    descriptionHtml: '<p>Le Ficus Lyrata est un arbre d\'intérieur majestueux, prisé pour ses grandes feuilles en forme de lyre. Idéal pour les espaces lumineux.</p>',
    availableForSale: true, tags: ['plante'],
    priceRange: { minVariantPrice: { amount: '3100', currencyCode: 'MAD' }, maxVariantPrice: { amount: '3100', currencyCode: 'MAD' } },
    compareAtPriceRange: { minVariantPrice: { amount: '0', currencyCode: 'MAD' }, maxVariantPrice: { amount: '0', currencyCode: 'MAD' } },
    images: { edges: [{ node: img(PRODUCTS + 'ficus-lyrata.jpg') }] },
    variants: { edges: [{ node: { id: 'v-11', title: 'Default Title', availableForSale: true, price: { amount: '3100', currencyCode: 'MAD' }, compareAtPrice: null, image: null } }] },
  },
  {
    id: 'demo-12', handle: 'olivier', title: 'Olivier',
    description: 'Arbre méditerranéen ~1m60. Symbole de paix.',
    descriptionHtml: '<p>L\'olivier, arbre millénaire et symbole de paix. Hauteur ~1m60, parfait pour sublimer un espace de vie lumineux.</p>',
    availableForSale: true, tags: ['plante'],
    priceRange: { minVariantPrice: { amount: '1460', currencyCode: 'MAD' }, maxVariantPrice: { amount: '1460', currencyCode: 'MAD' } },
    compareAtPriceRange: { minVariantPrice: { amount: '0', currencyCode: 'MAD' }, maxVariantPrice: { amount: '0', currencyCode: 'MAD' } },
    images: { edges: [{ node: img(PRODUCTS + 'strelitzia.jpg') }] },
    variants: { edges: [{ node: { id: 'v-12', title: 'Default Title', availableForSale: true, price: { amount: '1460', currencyCode: 'MAD' }, compareAtPrice: null, image: null } }] },
  },
  {
    id: 'demo-13', handle: 'strelitzia', title: 'Strelitzia',
    description: 'Plante oiseau de paradis. Tropicale et graphique.',
    descriptionHtml: '<p>Le Strelitzia, ou Oiseau de Paradis, apporte une touche exotique avec ses feuilles larges et son port élancé.</p>',
    availableForSale: true, tags: ['plante'],
    priceRange: { minVariantPrice: { amount: '660', currencyCode: 'MAD' }, maxVariantPrice: { amount: '660', currencyCode: 'MAD' } },
    compareAtPriceRange: { minVariantPrice: { amount: '0', currencyCode: 'MAD' }, maxVariantPrice: { amount: '0', currencyCode: 'MAD' } },
    images: { edges: [{ node: img(PRODUCTS + 'cycas.jpg') }] },
    variants: { edges: [{ node: { id: 'v-13', title: 'Default Title', availableForSale: true, price: { amount: '660', currencyCode: 'MAD' }, compareAtPrice: null, image: null } }] },
  },
  {
    id: 'demo-14', handle: 'bonsai-ficus-ginseng', title: 'Bonsaï Ficus Ginseng',
    description: 'Bonsaï sculptural aux racines aériennes.',
    descriptionHtml: '<p>Le Bonsaï Ficus Ginseng avec son tronc massif et ses racines aériennes est une pièce sculpturale vivante.</p>',
    availableForSale: true, tags: ['plante'],
    priceRange: { minVariantPrice: { amount: '660', currencyCode: 'MAD' }, maxVariantPrice: { amount: '660', currencyCode: 'MAD' } },
    compareAtPriceRange: { minVariantPrice: { amount: '0', currencyCode: 'MAD' }, maxVariantPrice: { amount: '0', currencyCode: 'MAD' } },
    images: { edges: [{ node: img(PRODUCTS + 'pachira.jpg') }] },
    variants: { edges: [{ node: { id: 'v-14', title: 'Default Title', availableForSale: true, price: { amount: '660', currencyCode: 'MAD' }, compareAtPrice: null, image: null } }] },
  },

  // --- POTS ---
  {
    id: 'demo-20', handle: 'saxum-beige-50', title: 'Saxum beige 50',
    description: 'Pot 50cm × 50cm · Terre cuite artisanale.',
    descriptionHtml: '<p>Le Saxum beige 50cm, pot en terre cuite aux formes rondes et organiques. Texture brute, finition mate. Signé JDS.</p>',
    availableForSale: true, tags: ['pot'],
    priceRange: { minVariantPrice: { amount: '1480', currencyCode: 'MAD' }, maxVariantPrice: { amount: '1480', currencyCode: 'MAD' } },
    compareAtPriceRange: { minVariantPrice: { amount: '0', currencyCode: 'MAD' }, maxVariantPrice: { amount: '0', currencyCode: 'MAD' } },
    images: { edges: [{ node: img(PRODUCTS + 'saxum-50.jpg') }] },
    variants: { edges: [{ node: { id: 'v-20', title: 'Default Title', availableForSale: true, price: { amount: '1480', currencyCode: 'MAD' }, compareAtPrice: null, image: null } }] },
  },
  {
    id: 'demo-21', handle: 'erratum-noir-60', title: 'Erratum noir 60',
    description: 'Pot 60cm × 60cm · Terre cuite noire mate.',
    descriptionHtml: '<p>L\'Erratum noir 60cm, pot monumental en terre cuite noire. Formes asymétriques, texture brute. Pièce statement.</p>',
    availableForSale: true, tags: ['pot'],
    priceRange: { minVariantPrice: { amount: '1580', currencyCode: 'MAD' }, maxVariantPrice: { amount: '1580', currencyCode: 'MAD' } },
    compareAtPriceRange: { minVariantPrice: { amount: '0', currencyCode: 'MAD' }, maxVariantPrice: { amount: '0', currencyCode: 'MAD' } },
    images: { edges: [{ node: img(PRODUCTS + 'erratum-noir-60.jpg') }] },
    variants: { edges: [{ node: { id: 'v-21', title: 'Default Title', availableForSale: true, price: { amount: '1580', currencyCode: 'MAD' }, compareAtPrice: null, image: null } }] },
  },
  {
    id: 'demo-22', handle: 'erratum-standard-noir', title: 'Erratum standard noir',
    description: 'Pot 35cm × 30cm · Terre cuite noire.',
    descriptionHtml: '<p>L\'Erratum standard noir 35cm. Compact et sculptural.</p>',
    availableForSale: true, tags: ['pot'],
    priceRange: { minVariantPrice: { amount: '780', currencyCode: 'MAD' }, maxVariantPrice: { amount: '780', currencyCode: 'MAD' } },
    compareAtPriceRange: { minVariantPrice: { amount: '0', currencyCode: 'MAD' }, maxVariantPrice: { amount: '0', currencyCode: 'MAD' } },
    images: { edges: [{ node: img(PRODUCTS + 'erratum-standard.jpg') }] },
    variants: { edges: [{ node: { id: 'v-22', title: 'Default Title', availableForSale: true, price: { amount: '780', currencyCode: 'MAD' }, compareAtPrice: null, image: null } }] },
  },
  {
    id: 'demo-23', handle: 'berceau-noir', title: 'Berceau noir',
    description: 'Pot Berceau 45cm × 25cm · Céramique réversible.',
    descriptionHtml: '<p>Le Berceau noir, pot en céramique réversible 45cm × 25cm. Design épuré, deux positions possibles.</p>',
    availableForSale: true, tags: ['pot'],
    priceRange: { minVariantPrice: { amount: '704', currencyCode: 'MAD' }, maxVariantPrice: { amount: '704', currencyCode: 'MAD' } },
    compareAtPriceRange: { minVariantPrice: { amount: '890', currencyCode: 'MAD' }, maxVariantPrice: { amount: '890', currencyCode: 'MAD' } },
    images: { edges: [{ node: img(PRODUCTS + 'erratum-duo.jpg') }] },
    variants: { edges: [{ node: { id: 'v-23', title: 'Default Title', availableForSale: true, price: { amount: '704', currencyCode: 'MAD' }, compareAtPrice: { amount: '890', currencyCode: 'MAD' }, image: null } }] },
  },
  {
    id: 'demo-24', handle: 'erratum-petit-noir', title: 'Erratum petit noir',
    description: 'Petit pot 15cm × 15cm · Terre cuite noire.',
    descriptionHtml: '<p>L\'Erratum petit noir 15cm × 15cm. Parfait pour les petites plantes et succulentes.</p>',
    availableForSale: true, tags: ['pot'],
    priceRange: { minVariantPrice: { amount: '400', currencyCode: 'MAD' }, maxVariantPrice: { amount: '400', currencyCode: 'MAD' } },
    compareAtPriceRange: { minVariantPrice: { amount: '0', currencyCode: 'MAD' }, maxVariantPrice: { amount: '0', currencyCode: 'MAD' } },
    images: { edges: [{ node: img(PRODUCTS + 'erratum-gris.jpg') }] },
    variants: { edges: [{ node: { id: 'v-24', title: 'Default Title', availableForSale: true, price: { amount: '400', currencyCode: 'MAD' }, compareAtPrice: null, image: null } }] },
  },
];

export const demoCollections: ShopifyCollection[] = [
  {
    id: 'col-1', handle: 'compositions', title: 'Compositions',
    description: 'Pot + Plante, prêtes à vivre',
    image: img(CATEGORIES + 'compositions.jpg'),
    products: { edges: demoProducts.filter(p => p.tags.includes('composition')).map(p => ({ node: p })) },
  },
  {
    id: 'col-2', handle: 'plantes', title: 'Plantes',
    description: 'Petites, standards & grandes',
    image: img(CATEGORIES + 'plantes.jpg'),
    products: { edges: demoProducts.filter(p => p.tags.includes('plante')).map(p => ({ node: p })) },
  },
  {
    id: 'col-3', handle: 'pots', title: 'Pots artisanaux',
    description: 'Erratum, Saxum, Berceau, Naturalis',
    image: img(CATEGORIES + 'pots.jpg'),
    products: { edges: demoProducts.filter(p => p.tags.includes('pot')).map(p => ({ node: p })) },
  },
  {
    id: 'col-4', handle: 'grands-formats', title: 'Grands formats',
    description: 'Pièces statement 1m50+',
    image: img(CATEGORIES + 'grands-formats.jpg'),
    products: { edges: [] },
  },
];
