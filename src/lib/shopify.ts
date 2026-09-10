// ==============================================
// Les Jardins de Sofie — Shopify Storefront API
// Catalogue, panier et paiement alimentés uniquement par Shopify
// ==============================================

const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || '';
const storefrontToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN || '';
const endpoint = `https://${domain}/api/2026-07/graphql.json`;

// Check if Shopify is configured
export const isShopifyConfigured = domain.length > 5 && storefrontToken.length > 5;

// ---- GraphQL Fetch ----
async function shopifyFetch<T>({ query, variables }: { query: string; variables?: Record<string, unknown> }): Promise<T> {
  if (!isShopifyConfigured) {
    throw new Error('Shopify n’est pas configuré. Vérifiez les variables d’environnement.');
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
  warnings?: string[];
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
    variants(first: 250) {
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
export async function getAllProducts(first = 250): Promise<ShopifyProduct[]> {
  const data = await shopifyFetch<{ products: { edges: Array<{ node: ShopifyProduct }> } }>({
    query: `${PRODUCT_FRAGMENT} query($first:Int!){products(first:$first,sortKey:BEST_SELLING){edges{node{...ProductFields}}}}`,
    variables: { first },
  });
  return data.products.edges.map((e) => e.node);
}

export async function getProductByHandle(handle: string): Promise<ShopifyProduct | null> {
  const data = await shopifyFetch<{ product: ShopifyProduct | null }>({
    query: `${PRODUCT_FRAGMENT} query($handle:String!){product(handle:$handle){...ProductFields}}`,
    variables: { handle },
  });
  return data.product;
}

export async function getProductsByCollection(handle: string, first = 250): Promise<ShopifyProduct[]> {
  const data = await shopifyFetch<{ collection: { products: { edges: Array<{ node: ShopifyProduct }> } } | null }>({
    query: `${PRODUCT_FRAGMENT} query($handle:String!,$first:Int!){collection(handle:$handle){products(first:$first,sortKey:BEST_SELLING){edges{node{...ProductFields}}}}}`,
    variables: { handle, first },
  });
  return data.collection?.products.edges.map((e) => e.node) ?? [];
}

// ---- Queries: Collections ----
export async function getAllCollections(): Promise<ShopifyCollection[]> {
  const data = await shopifyFetch<{ collections: { edges: Array<{ node: ShopifyCollection }> } }>({
    query: `${PRODUCT_FRAGMENT} query{collections(first:20){edges{node{id handle title description image{url altText width height} products(first:8){edges{node{...ProductFields}}}}}}}`,
  });
  return data.collections.edges.map((e) => e.node);
}

const CART_FRAGMENT = `
  fragment CartFields on Cart {
    id checkoutUrl totalQuantity
    cost { totalAmount { amount currencyCode } subtotalAmount { amount currencyCode } }
    lines(first: 250) { edges { node {
      id quantity
      merchandise { ... on ProductVariant {
        id title price { amount currencyCode }
        image { url altText width height }
        product { title handle images(first: 1) { edges { node { url altText width height } } } }
      } }
    } } }
  }
`;

type CartResult = {
  cart: ShopifyCart | null;
  userErrors: Array<{ message: string }>;
  warnings: Array<{ message: string }>;
};

function checkedCart(result: CartResult): ShopifyCart {
  if (result.userErrors.length) throw new Error(result.userErrors.map(e => e.message).join(' '));
  if (!result.cart) throw new Error('Le panier est indisponible. Veuillez réessayer.');
  return { ...result.cart, warnings: result.warnings.map(w => w.message) };
}

// ---- Cart ----
export async function createCart(): Promise<ShopifyCart> {
  const data = await shopifyFetch<{ cartCreate: CartResult }>({
    query: `${CART_FRAGMENT} mutation{cartCreate{cart{...CartFields}userErrors{message}warnings{message}}}`,
  });
  return checkedCart(data.cartCreate);
}

export async function addToCart(cartId: string, variantId: string, quantity = 1): Promise<ShopifyCart> {
  if (!variantId || !Number.isInteger(quantity) || quantity < 1) {
    throw new Error('Choisissez un article et une quantité valide.');
  }
  const data = await shopifyFetch<{ cartLinesAdd: CartResult }>({
    query: `${CART_FRAGMENT} mutation($cartId:ID!,$lines:[CartLineInput!]!){cartLinesAdd(cartId:$cartId,lines:$lines){cart{...CartFields}userErrors{message}warnings{message}}}`,
    variables: { cartId, lines: [{ merchandiseId: variantId, quantity }] },
  });
  return checkedCart(data.cartLinesAdd);
}

export async function removeFromCart(cartId: string, lineId: string): Promise<ShopifyCart> {
  const data = await shopifyFetch<{ cartLinesRemove: CartResult }>({
    query: `${CART_FRAGMENT} mutation($cartId:ID!,$lineIds:[ID!]!){cartLinesRemove(cartId:$cartId,lineIds:$lineIds){cart{...CartFields}userErrors{message}warnings{message}}}`,
    variables: { cartId, lineIds: [lineId] },
  });
  return checkedCart(data.cartLinesRemove);
}

// ---- Helpers ----
export function formatPrice(price: ShopifyPrice): string {
  const amount = parseFloat(price.amount);
  return `${amount.toLocaleString('fr-FR')} ${price.currencyCode}`;
}

export function getProductImages(product: ShopifyProduct): ShopifyImage[] {
  return product.images.edges.map((e) => e.node);
}

export function getFirstVariantId(product: ShopifyProduct): string {
  return product.variants.edges.find(e => e.node.availableForSale)?.node.id ?? '';
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
