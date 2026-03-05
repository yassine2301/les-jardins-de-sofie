# Les Jardins de Sofie — Next.js + Shopify Headless

## 🚀 Démarrage rapide

### 1. Installe les dépendances
```bash
npm install
```

### 2. Configure Shopify
Copie le fichier d'environnement :
```bash
cp .env.local.example .env.local
```

Puis remplis avec tes clés Shopify :
- Va dans **Shopify Admin** → Settings → Apps → Develop apps
- Crée une app, active les **Storefront API scopes**
- Copie le **Storefront access token** dans `.env.local`

### 3. Lance le serveur de dev
```bash
npm run dev
```
Ouvre [http://localhost:3000](http://localhost:3000)

### 4. Déploie sur Vercel
```bash
npx vercel
```
Ou connecte ton repo GitHub à [vercel.com](https://vercel.com) pour un déploiement automatique.

## 📁 Structure du projet

```
src/
├── app/                    # Pages (Next.js App Router)
│   ├── page.tsx            # Homepage
│   ├── layout.tsx          # Root layout
│   ├── produit/[handle]/   # Pages produit dynamiques
│   └── categorie/[handle]/ # Pages catégorie
├── components/
│   ├── layout/             # Navbar, Footer, CartDrawer
│   ├── sections/           # Hero, Categories, ProductCarousel...
│   ├── product/            # ProductCard, ProductDetail
│   └── ui/                 # Composants réutilisables
├── lib/
│   ├── shopify.ts          # API Shopify Storefront (GraphQL)
│   └── cart-context.tsx    # Gestion du panier (React Context)
└── styles/
    └── globals.css         # Design system (couleurs, typo, boutons)
```

## 🎨 Design System
- **Palette** : Bordeaux #8C1C13 · Terracotta #BF4342 · Sable #E7D7C1 · Taupe #A78A7F · Chocolat #735751
- **Typo** : Playfair Display (titres) + DM Sans (body)
- **Boutons** : Pill-shaped (border-radius: 100px)

## 🔗 Connexion Shopify
Le fichier `src/lib/shopify.ts` gère toute la communication avec l'API :
- `getAllProducts()` — Récupère tous les produits
- `getProductByHandle()` — Détail d'un produit
- `getProductsByCollection()` — Produits par collection
- `createCart()` / `addToCart()` / `removeFromCart()` — Gestion panier
- Le checkout est géré par Shopify (redirection sécurisée)

## 📝 Prochaines étapes
1. Ajouter tes images dans `/public/images/`
2. Configurer les tags Shopify (composition, plante, pot)
3. Personnaliser les métadonnées SEO
4. Connecter la newsletter (Mailchimp/Klaviyo)
5. Ajouter les pages statiques (Notre histoire, FAQ, CGV)
