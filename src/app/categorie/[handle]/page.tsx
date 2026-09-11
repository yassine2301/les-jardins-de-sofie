import { getProductsByCollection, getAllCollections, type ShopifyProduct } from '@/lib/shopify';
import { ProductCard } from '@/components/product/ProductCard';
import styles from './categorie.module.css';

export const revalidate = 60;

type SearchParams = {
  size?: string | string[];
  col?: string | string[];
};

function firstParam(value?: string | string[]) {
  return Array.isArray(value) ? value[0] : value;
}

function normalize(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

function priceOf(product: ShopifyProduct) {
  return Number.parseFloat(product.priceRange.minVariantPrice.amount);
}

function hasTag(product: ShopifyProduct, tag: string) {
  const expected = normalize(tag);
  return product.tags.some((value) => normalize(value) === expected);
}

function isUntaggedPlant(product: ShopifyProduct) {
  return !['petites-plantes', 'plantes-standards', 'grandes-plantes'].some((tag) =>
    hasTag(product, tag)
  );
}

function isUntaggedPot(product: ShopifyProduct) {
  return !['erratum-mini', 'pot-standard', 'grand-format'].some((tag) =>
    hasTag(product, tag)
  );
}

function matchesSize(product: ShopifyProduct, handle: string, size: string) {
  const price = priceOf(product);

  if (handle === 'compositions') {
    if (size === 'petite') return price < 800;
    if (size === 'standard') return price >= 800 && price < 1600;
    if (size === 'grande') return price >= 1600;
  }

  if (handle === 'plantes') {
    if (size === 'petite') {
      return hasTag(product, 'petites-plantes') || (isUntaggedPlant(product) && price <= 500);
    }
    if (size === 'standard') {
      return hasTag(product, 'plantes-standards') || (isUntaggedPlant(product) && price > 500 && price <= 900);
    }
    if (size === 'grande') {
      return hasTag(product, 'grandes-plantes') || (isUntaggedPlant(product) && price > 900);
    }
  }

  if (handle === 'pots') {
    if (size === 'petit') {
      return hasTag(product, 'erratum-mini') || (isUntaggedPot(product) && price <= 500);
    }
    if (size === 'moyen') {
      return hasTag(product, 'pot-standard') || (isUntaggedPot(product) && price > 500 && price < 800);
    }
    if (size === 'grand') {
      return (hasTag(product, 'grand-format') && price < 1200) ||
        (isUntaggedPot(product) && price >= 800 && price < 1200);
    }
    if (size === 'jarre') {
      return (hasTag(product, 'grand-format') && price >= 1200) ||
        (isUntaggedPot(product) && price >= 1200);
    }
  }

  return true;
}

function filterProducts(
  products: ShopifyProduct[],
  handle: string,
  size?: string,
  collectionName?: string
) {
  let filtered = products;

  if (size) {
    filtered = filtered.filter((product) => matchesSize(product, handle, normalize(size)));
  }

  if (handle === 'pots' && collectionName) {
    const expected = normalize(collectionName);
    filtered = filtered.filter((product) => {
      const searchableName = normalize(`${product.title} ${product.handle}`);
      return searchableName.includes(expected);
    });
  }

  return filtered;
}

export async function generateStaticParams() {
  const collections = await getAllCollections();
  return collections.map((c) => ({ handle: c.handle }));
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ handle: string }>;
  searchParams: Promise<SearchParams>;
}) {
  const [{ handle }, query] = await Promise.all([params, searchParams]);
  const collections = await getAllCollections();
  const collection = collections.find((c) => c.handle === handle);
  const products = await getProductsByCollection(handle);
  const filteredProducts = filterProducts(
    products,
    handle,
    firstParam(query.size),
    firstParam(query.col)
  );

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h1 className="section-title">{collection?.title || handle}</h1>
      </div>
      <div className={styles.grid}>
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {filteredProducts.length === 0 && (
        <p className={styles.empty}>Aucun produit dans cette collection pour le moment.</p>
      )}
    </section>
  );
}
