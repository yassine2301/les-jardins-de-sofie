import { Component, useCallback, useEffect, useSyncExternalStore, type ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import { CartProvider } from '@/lib/cart-context';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/layout/CartDrawer';
import { Marquee } from '@/components/sections/Marquee';
import { Hero } from '@/components/sections/Hero';
import { BrandStory } from '@/components/sections/BrandStory';
import { Categories } from '@/components/sections/Categories';
import { Editorial } from '@/components/sections/Editorial';
import { Reassurance } from '@/components/sections/Reassurance';
import { Newsletter } from '@/components/sections/Newsletter';
import { ProductCard } from '@/components/product/ProductCard';
import { ProductDetail } from '@/components/product/ProductDetail';
import HistoryPage from '@/app/notre-histoire/page';
import ContactPage from '@/app/contact/page';
import AccountPage from '@/app/compte/page';
import ServicesPage from '@/app/services/page';
import CorporatePage from '@/app/services/corporate/page';
import EventsPage from '@/app/services/evenements/page';
import GardensPage from '@/app/services/jardins/page';
import CustomPage from '@/app/services/sur-mesure/page';
import { getAllCollections, getAllProducts, getProductByHandle, getProductsByCollection } from '@/lib/shopify';
import { filterProducts } from '../generated/catalog-filters';
import { navigate, routeSnapshot, subscribeRoute } from './runtime';
import { useResource } from './resources';
import categoryStyles from '@/app/categorie/[handle]/categorie.module.css';
import searchStyles from '@/app/recherche/recherche.module.css';
import '@/styles/globals.css';
import './wordpress.css';

function Notice({ children, error = false }: { children: ReactNode; error?: boolean }) {
  return <div className="jds-notice" role={error ? 'alert' : 'status'}>{children}</div>;
}

function Home() {
  const { data: collections = [] } = useResource('collections', getAllCollections);
  return <><Marquee /><Hero /><BrandStory /><Categories collections={collections} />
    <Editorial /><Reassurance /><Newsletter /></>;
}

function Category({ handle, query }: { handle: string; query: URLSearchParams }) {
  const load = useCallback(async () => {
    const [collections, products] = await Promise.all([getAllCollections(), getProductsByCollection(handle)]);
    return { collection: collections.find(item => item.handle === handle), products };
  }, [handle]);
  const { data, pending, error } = useResource('category:' + handle, load);
  const products = filterProducts(data?.products ?? [], handle, query.get('size') ?? undefined, query.get('col') ?? undefined);
  useEffect(() => {
    document.title = `${data?.collection?.title ?? handle} — Les Jardins de Sofie`;
  }, [handle, data?.collection?.title]);
  return <section className={categoryStyles.section}>
    <div className={categoryStyles.header}><h1 className="section-title">{data?.collection?.title ?? handle}</h1></div>
    {pending ? <Notice>Chargement de la collection…</Notice> : error ?
      <Notice error>Le catalogue est momentanément indisponible. <button onClick={() => window.location.reload()}>Réessayer</button></Notice> :
      <><div className={categoryStyles.grid}>{products.map(product => <ProductCard key={product.id} product={product} />)}</div>
      {products.length === 0 && <p className={categoryStyles.empty}>Aucun produit dans cette collection pour le moment.</p>}</>}
  </section>;
}

function Product({ handle }: { handle: string }) {
  const load = useCallback(() => getProductByHandle(handle), [handle]);
  const { data, pending, error } = useResource('product:' + handle, load);
  useEffect(() => { if (data) document.title = `${data.title} — Les Jardins de Sofie`; }, [data]);
  if (pending) return <Notice>Chargement du produit…</Notice>;
  if (error) return <Notice error>Le produit est momentanément indisponible. <button onClick={() => window.location.reload()}>Réessayer</button></Notice>;
  if (!data) return <NotFound />;
  return <ProductDetail key={data.id} product={data} />;
}

function normalize(value: string) { return value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ''); }

function SearchPage({ query }: { query: string }) {
  const { data: products = [], pending, error } = useResource('products', getAllProducts);
  const normalizedQuery = normalize(query.trim());
  const results = normalizedQuery ? products.filter(product => normalize(
    [product.title, product.description ?? '', ...(product.tags ?? [])].join(' ')
  ).includes(normalizedQuery)) : [];
  return <section className={searchStyles.section}><div className={searchStyles.container}>
    <h1 className={searchStyles.heading}>Recherche</h1>
    <form action="/recherche" method="get" className={searchStyles.searchForm} onSubmit={event => {
      event.preventDefault();
      const form = new FormData(event.currentTarget);
      navigate('/recherche?q=' + encodeURIComponent(String(form.get('q') ?? '').trim()));
    }}>
      <input key={query} type="search" name="q" defaultValue={query} placeholder="Rechercher une plante, un pot, une composition…" className={searchStyles.searchInput} autoFocus />
      <button type="submit" className={searchStyles.searchBtn}>Rechercher</button>
    </form>
    {!query.trim() ? <p className={searchStyles.empty}>Tapez un mot-clé pour trouver des plantes, pots ou compositions.</p> :
      pending ? <Notice>Recherche en cours…</Notice> : error ? <Notice error>La recherche est momentanément indisponible.</Notice> :
      results.length === 0 ? <p className={searchStyles.empty}>Aucun résultat pour <strong>« {query} »</strong>.</p> :
      <><p className={searchStyles.count}>{results.length} résultat{results.length > 1 ? 's' : ''} pour <strong>« {query} »</strong></p>
      <div className={searchStyles.grid}>{results.map(product => <ProductCard key={product.id} product={product} />)}</div></>}
  </div></section>;
}

function NotFound() {
  return <section className="jds-not-found"><h1 className="section-title">Cette page est introuvable.</h1>
    <a href="/" className="btn-primary" onClick={event => { event.preventDefault(); navigate('/'); }}>Retour à l’accueil</a></section>;
}

const pages: Record<string, { component: () => ReactNode; title: string }> = {
  '/': { component: Home, title: 'Studio JDS — Respirez votre intérieur' },
  '/notre-histoire': { component: HistoryPage, title: 'Notre histoire — Les Jardins de Sofie' },
  '/contact': { component: ContactPage, title: 'Contact — Les Jardins de Sofie' },
  '/compte': { component: AccountPage, title: 'Mon compte — Les Jardins de Sofie' },
  '/services': { component: ServicesPage, title: 'Studio JDS — Nos services' },
  '/services/corporate': { component: CorporatePage, title: 'Cadeaux corporate — Studio JDS' },
  '/services/evenements': { component: EventsPage, title: 'Événements — Studio JDS' },
  '/services/jardins': { component: GardensPage, title: 'Jardins — Studio JDS' },
  '/services/sur-mesure': { component: CustomPage, title: 'Sur mesure — Studio JDS' },
};

function Page() {
  const current = useSyncExternalStore(subscribeRoute, routeSnapshot, () => '/');
  const url = new URL(current, window.location.origin);
  const path = url.pathname.replace(/\/+$/, '') || '/';
  const page = pages[path];
  useEffect(() => { if (page) document.title = page.title; }, [path, page]);
  if (page) { const Content = page.component; return <Content key={path} />; }
  const category = path.match(/^\/categorie\/([^/]+)$/);
  if (category) return <Category handle={decodeURIComponent(category[1])} query={url.searchParams} />;
  const product = path.match(/^\/produit\/([^/]+)$/);
  if (product) return <Product handle={decodeURIComponent(product[1])} />;
  if (path === '/recherche') return <SearchPage query={url.searchParams.get('q') ?? ''} />;
  return <NotFound />;
}

class AppBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() {
    if (this.state.failed) return <Notice error>Cette page n’a pas pu être chargée. <a href="/">Revenir à l’accueil</a></Notice>;
    return this.props.children;
  }
}

const root = document.getElementById('jds-root');
if (!root) throw new Error('Le thème WordPress JDS est incomplet.');
createRoot(root).render(<AppBoundary><CartProvider><Navbar /><main><Page /></main><Footer /><CartDrawer /></CartProvider></AppBoundary>);
