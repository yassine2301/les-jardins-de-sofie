// ==============================================
// Les Jardins de Sofie — Shopify Storefront API
// Tombe en mode DEMO si Shopify n'est pas configuré
// ==============================================

import { demoProducts, demoCollections } from './demo-data';

const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || '';
const storefrontToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN || '';
const endpoint = `https://${domain}/api/2024-01/graphql.json`;

// Check if Shopify is configured
const isShopifyConfigured = domain.length > 5 && storefrontToken.length > 5;

// ---- GraphQL Fetch ----
async function shopifyFetch<T>({ query, variables }: { query: string; variables?: Record<string, unknown> }): Promise<T> {
  if (!isShopifyConfigured) {
    throw new Error('Shopify not configured — using demo data');
  }

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': storefrontToken,
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!res.ok) {
    throw new Error(`Shopify API error: ${res.status} ${res.statusText}`);
  }

  const json = await res.json();
  if (json.errors) {
    throw new Error(json.errors.map((e: any) => e.message).join(', '));
  }

  return json.data;
}

// ---- Types ----
export interface ShopifyImage {
  url: string;
  altText: string | null;
  width: number;
  height: number;
}

export interface ShopifyPrice {
  amount: string;
  currencyCode: string;
}

export interface ShopifyProduct {
  id: string;
  handle: string;
  title: string;
  description: string;
  descriptionHtml: string;
  availableForSale: boolean;
  tags: string[];
  priceRange: {
    minVariantPrice: ShopifyPrice;
    maxVariantPrice: ShopifyPrice;
  };
  compareAtPriceRange: {
    minVariantPrice: ShopifyPrice;
    maxVariantPrice: ShopifyPrice;
  };
  images: {
    edges: Array<{ node: ShopifyImage }>;
  };
  variants: {
    edges: Array<{
      node: {
        id: string;
        title: string;
        availableForSale: boolean;
        price: ShopifyPrice;
        compareAtPrice: ShopifyPrice | null;
        image: ShopifyImage | null;
      };
    }>;
  };
}

export interface ShopifyCollection {
  id: string;
  handle: string;
  title: string;
  description: string;
  image: ShopifyImage | null;
  products: {
    edges: Array<{ node: ShopifyProduct }>;
  };
}

export interface ShopifyCart {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: {
    totalAmount: ShopifyPrice;
    subtotalAmount: ShopifyPrice;
  };
  lines: {
    edges: Array<{
      node: {
        id: string;
        quantity: number;
        merchandise: {
          id: string;
          title: string;
          product: {
            title: string;
            handle: string;
            images: { edges: Array<{ node: ShopifyImage }> };
          };
          price: ShopifyPrice;
          image: ShopifyImage | null;
        };
      };
    }>;
  };
}

// ---- Fragments GraphQL ----
const PRODUCT_FRAGMENT = `
  fragment ProductFields on Product {
    id handle title description descriptionHtml availableForSale tags
    priceRange {
      minVariantPrice { amount currencyCode }
      maxVariantPrice { amount currencyCode }
    }
    compareAtPriceRange {
      minVariantPrice { amount currencyCode }
      maxVariantPrice { amount currencyCode }
    }
    images(first: 10) { edges { node { url altText width height } } }
    variants(first: 10) {
      edges { node {
        id title availableForSale
        price { amount currencyCode }
        compareAtPrice { amount currencyCode }
        image { url altText width height }
      } }
    }
  }
`;

// ---- Queries: Products ----
export async function getAllProducts(first = 50): Promise<ShopifyProduct[]> {
  try {
    const data = await shopifyFetch<{ products: { edges: Array<{ node: ShopifyProduct }> } }>({
      query: `${PRODUCT_FRAGMENT} query($first:Int!){products(first:$first,sortKey:BEST_SELLING){edges{node{...ProductFields}}}}`,
      variables: { first },
    });
    return data.products.edges.map((e) => e.node);
  } catch {
    console.log('⚡ Mode DEMO — Shopify non connecté');
    return demoProducts;
  }
}

export async function getProductByHandle(handle: string): Promise<ShopifyProduct | null> {
  try {
    const data = await shopifyFetch<{ product: ShopifyProduct | null }>({
      query: `${PRODUCT_FRAGMENT} query($handle:String!){product(handle:$handle){...ProductFields}}`,
      variables: { handle },
    });
    return data.product;
  } catch {
    return demoProducts.find((p) => p.handle === handle) || null;
  }
}

export async function getProductsByCollection(handle: string, first = 20): Promise<ShopifyProduct[]> {
  try {
    const data = await shopifyFetch<{ collection: { products: { edges: Array<{ node: ShopifyProduct }> } } | null }>({
      query: `${PRODUCT_FRAGMENT} query($handle:String!,$first:Int!){collection(handle:$handle){products(first:$first,sortKey:BEST_SELLING){edges{node{...ProductFields}}}}}`,
      variables: { handle, first },
    });
    return data.collection?.products.edges.map((e) => e.node) ?? [];
  } catch {
    const col = demoCollections.find((c) => c.handle === handle);
    return col?.products.edges.map((e) => e.node) ?? [];
  }
}

// ---- Queries: Collections ----
export async function getAllCollections(): Promise<ShopifyCollection[]> {
  try {
    const data = await shopifyFetch<{ collections: { edges: Array<{ node: ShopifyCollection }> } }>({
      query: `${PRODUCT_FRAGMENT} query{collections(first:20){edges{node{id handle title description image{url altText width height} products(first:8){edges{node{...ProductFields}}}}}}}`,
    });
    return data.collections.edges.map((e) => e.node);
  } catch {
    return demoCollections;
  }
}

// ---- Cart ----
// En mode démo, le panier fonctionne localement sans Shopify
let demoCart: ShopifyCart = {
  id: 'demo-cart',
  checkoutUrl: '#',
  totalQuantity: 0,
  cost: { totalAmount: { amount: '0', currencyCode: 'MAD' }, subtotalAmount: { amount: '0', currencyCode: 'MAD' } },
  lines: { edges: [] },
};

export async function createCart(): Promise<ShopifyCart> {
  if (!isShopifyConfigured) {
    return demoCart;
  }

  const data = await shopifyFetch<{ cartCreate: { cart: ShopifyCart } }>({
    query: `mutation{cartCreate{cart{id checkoutUrl totalQuantity cost{totalAmount{amount currencyCode}subtotalAmount{amount currencyCode}}lines(first:50){edges{node{id quantity merchandise{...on ProductVariant{id title product{title handle images(first:1){edges{node{url altText width height}}}}price{amount currencyCode}image{url altText width height}}}}}}}}}`,
  });
  return data.cartCreate.cart;
}

export async function addToCart(cartId: string, variantId: string, quantity = 1): Promise<ShopifyCart> {
  if (!isShopifyConfigured) {
    // Simuler l'ajout au panier en mode démo
    const product = demoProducts.find(p => p.variants.edges[0]?.node.id === variantId);
    if (product) {
      const existing = demoCart.lines.edges.find(e => e.node.merchandise.id === variantId);
      if (existing) {
        existing.node.quantity += quantity;
      } else {
        demoCart.lines.edges.push({
          node: {
            id: `line-${Date.now()}`,
            quantity,
            merchandise: {
              id: variantId,
              title: 'Default Title',
              product: { title: product.title, handle: product.handle, images: product.images },
              price: product.priceRange.minVariantPrice,
              image: product.images.edges[0]?.node || null,
            },
          },
        });
      }
      demoCart.totalQuantity = demoCart.lines.edges.reduce((sum, e) => sum + e.node.quantity, 0);
      const total = demoCart.lines.edges.reduce((sum, e) => sum + parseFloat(e.node.merchandise.price.amount) * e.node.quantity, 0);
      demoCart.cost.totalAmount.amount = String(total);
      demoCart.cost.subtotalAmount.amount = String(total);
    }
    return { ...demoCart };
  }

  const data = await shopifyFetch<{ cartLinesAdd: { cart: ShopifyCart } }>({
    query: `mutation($cartId:ID!,$lines:[CartLineInput!]!){cartLinesAdd(cartId:$cartId,lines:$lines){cart{id checkoutUrl totalQuantity cost{totalAmount{amount currencyCode}subtotalAmount{amount currencyCode}}lines(first:50){edges{node{id quantity merchandise{...on ProductVariant{id title product{title handle images(first:1){edges{node{url altText width height}}}}price{amount currencyCode}image{url altText width height}}}}}}}}}`,
    variables: { cartId, lines: [{ merchandiseId: variantId, quantity }] },
  });
  return data.cartLinesAdd.cart;
}

export async function removeFromCart(cartId: string, lineId: string): Promise<ShopifyCart> {
  if (!isShopifyConfigured) {
    demoCart.lines.edges = demoCart.lines.edges.filter(e => e.node.id !== lineId);
    demoCart.totalQuantity = demoCart.lines.edges.reduce((sum, e) => sum + e.node.quantity, 0);
    const total = demoCart.lines.edges.reduce((sum, e) => sum + parseFloat(e.node.merchandise.price.amount) * e.node.quantity, 0);
    demoCart.cost.totalAmount.amount = String(total);
    demoCart.cost.subtotalAmount.amount = String(total);
    return { ...demoCart };
  }

  const data = await shopifyFetch<{ cartLinesRemove: { cart: ShopifyCart } }>({
    query: `mutation($cartId:ID!,$lineIds:[ID!]!){cartLinesRemove(cartId:$cartId,lineIds:$lineIds){cart{id checkoutUrl totalQuantity cost{totalAmount{amount currencyCode}subtotalAmount{amount currencyCode}}lines(first:50){edges{node{id quantity merchandise{...on ProductVariant{id title product{title handle images(first:1){edges{node{url altText width height}}}}price{amount currencyCode}image{url altText width height}}}}}}}}}`,
    variables: { cartId, lineIds: [lineId] },
  });
  return data.cartLinesRemove.cart;
}

// ---- Helpers ----
export function formatPrice(price: ShopifyPrice): string {
  const amount = parseFloat(price.amount);
  return `${amount.toLocaleString('fr-FR')} MAD`;
}

export function getProductImages(product: ShopifyProduct): ShopifyImage[] {
  return product.images.edges.map((e) => e.node);
}

export function getFirstVariantId(product: ShopifyProduct): string {
  return product.variants.edges[0]?.node.id ?? '';
}

export function hasDiscount(product: ShopifyProduct): boolean {
  const compare = parseFloat(product.compareAtPriceRange.minVariantPrice.amount);
  const current = parseFloat(product.priceRange.minVariantPrice.amount);
  return compare > 0 && compare > current;
}

export function getDiscountPercent(product: ShopifyProduct): number {
  const compare = parseFloat(product.compareAtPriceRange.minVariantPrice.amount);
  const current = parseFloat(product.priceRange.minVariantPrice.amount);
  if (compare <= 0 || compare <= current) return 0;
  return Math.round(((compare - current) / compare) * 100);
}
