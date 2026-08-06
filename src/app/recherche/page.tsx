import { getAllProducts } from '@/lib/shopify';
import { ProductCard } from '@/components/product/ProductCard';
import styles from './recherche.module.css';

export const revalidate = 60;

export const metadata = {
  title: 'Recherche — Les Jardins de Sofie',
};

export default async function RecherchePage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q: rawQuery } = await searchParams;
  const query = (rawQuery || '').trim();
  const products = await getAllProducts(100);

  const normalize = (s: string) =>
    s
      .toLowerCase()
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '');

  const q = normalize(query);
  const results =
    q.length === 0
      ? []
      : products.filter((p) => {
          const haystack = normalize(
            [p.title, p.description ?? '', ...(p.tags ?? [])].join(' ')
          );
          return haystack.includes(q);
        });

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h1 className={styles.heading}>Recherche</h1>

        <form action="/recherche" method="get" className={styles.searchForm}>
          <input
            type="search"
            name="q"
            defaultValue={query}
            placeholder="Rechercher une plante, un pot, une composition…"
            className={styles.searchInput}
            autoFocus
          />
          <button type="submit" className={styles.searchBtn}>
            Rechercher
          </button>
        </form>

        {query.length === 0 ? (
          <p className={styles.empty}>
            Tapez un mot-clé pour trouver des plantes, pots ou compositions.
          </p>
        ) : results.length === 0 ? (
          <p className={styles.empty}>
            Aucun résultat pour <strong>« {query} »</strong>.
          </p>
        ) : (
          <>
            <p className={styles.count}>
              {results.length} résultat{results.length > 1 ? 's' : ''} pour{' '}
              <strong>« {query} »</strong>
            </p>
            <div className={styles.grid}>
              {results.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
