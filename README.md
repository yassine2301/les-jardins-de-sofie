# 🌿 Les Jardins de Sofie — Site web

Site e-commerce de **Studio JDS** : compositions végétales, plantes et pots artisanaux.

**🔗 Site en ligne :** https://les-jardins-de-sofie.vercel.app

---

## 📖 À lire en premier

Ce guide est écrit pour pouvoir modifier le site **sans être développeur**.

Il y a deux façons de travailler :

| Méthode | Pour qui | Difficulté |
|---|---|---|
| **A. Directement sur GitHub** (recommandé) | Changer un texte, un prix, une photo | ⭐ Facile |
| **B. Sur son ordinateur** | Voir les changements avant de publier | ⭐⭐⭐ Plus technique |

👉 **Commence par la méthode A.** Elle suffit pour 90 % des modifications.

---

## ⚡ Méthode A — Modifier directement sur GitHub

### Comment ça marche

Le site est **automatiquement republié** à chaque modification enregistrée sur la branche `main`.
Tu modifies → tu enregistres → **~2 minutes plus tard, c'est en ligne.**

### Modifier un texte ou un prix

1. Sur GitHub, ouvre le fichier concerné (voir le tableau [« Où modifier quoi »](#-où-modifier-quoi))
2. Clique sur l'icône **crayon ✏️** (en haut à droite du fichier)
3. Modifie le texte
4. En bas de page : écris une courte description (ex. « Nouveau prix olivier »)
5. Clique sur **Commit changes**
6. Attends ~2 min, puis rafraîchis le site

### Ajouter ou remplacer une photo

1. Va dans le dossier `public/images/` (ou un sous-dossier)
2. Clique sur **Add file → Upload files**
3. Glisse ta photo
4. Clique sur **Commit changes**

> ⚠️ **Pour remplacer une photo existante sans rien casser :** donne à la nouvelle photo **exactement le même nom** que l'ancienne (ex. `monstera.jpg`). Le site prendra la nouvelle automatiquement, sans aucune autre modification.

### ⛔ En cas d'erreur

Rien n'est jamais perdu : GitHub garde **tout l'historique**.
Onglet **Commits** → ouvre la modification fautive → bouton **Revert** pour l'annuler.

---

## 🗺️ Où modifier quoi

| Ce que tu veux changer | Fichier à ouvrir |
|---|---|
| **Texte d'accueil** (« Respirez votre intérieur ») | `src/components/sections/Hero.tsx` |
| **Bloc « Studio JDS »** sous l'accueil | `src/components/sections/BrandStory.tsx` |
| **Bandeau défilant** en haut du site | `src/components/sections/Marquee.tsx` |
| **Les 4 cartes catégories** (Compositions, Plantes, Pots, Jarres) | `src/components/sections/Categories.tsx` |
| **Bloc « Livraison / Savoir-faire / Conseils »** | `src/components/sections/Reassurance.tsx` |
| **Menu du haut** (rubriques et sous-rubriques) | `src/components/layout/Navbar.tsx` |
| **Bas de page** (liens, téléphone, email, réseaux) | `src/components/layout/Footer.tsx` |
| **Produits et prix** (mode démo) | `src/lib/demo-data.ts` |
| **Page Contact** | `src/app/contact/page.tsx` |
| **Page Notre histoire** | `src/app/notre-histoire/page.tsx` |
| **Page Studio JDS** (les 4 services) | `src/app/services/page.tsx` |
| **Formulaires** (corporate, événements, sur-mesure, jardins) | `src/app/services/<nom>/page.tsx` |
| **Couleurs et polices** du site | `src/styles/globals.css` |
| **Titre Google / SEO** | `src/app/layout.tsx` |

### 💡 Comment lire un fichier

Tu n'as **pas besoin de comprendre le code**. Cherche simplement le texte entre guillemets ou entre `>` et `<`, et remplace-le :

```jsx
<h1>Respirez votre intérieur.</h1>
     ↑ tu modifies uniquement ça
```

**Règles à respecter :**
- ✅ Ne touche qu'au texte visible
- ❌ Ne supprime jamais les `<`, `>`, `{`, `}`, `"` autour
- ⚠️ Pour une apostrophe, écris `&apos;` (ex. `d&apos;intérieur`)

---

## 📸 Gérer les images

### Où ranger quoi

```
public/
├── images/
│   ├── logo2.png            ← Logo du site (navbar)
│   ├── hero-garden.jpg      ← Image d'accueil (+ page Notre histoire)
│   ├── editorial.jpg
│   ├── corporate-lobby.jpg  ← Bloc éditorial de l'accueil
│   ├── categories/          ← Les 4 cartes catégories
│   │   ├── compositions.jpg
│   │   ├── plantes.jpg
│   │   ├── pots.jpg
│   │   └── grands-formats.jpg
│   ├── products/            ← Photos produits
│   │   ├── monstera.jpg
│   │   ├── erratum-olivier.jpg
│   │   └── ...
│   └── services/            ← Bannières des pages services
│       ├── corporate-full.jpg
│       ├── evenements-full.jpg
│       ├── sur-mesure-full.jpg
│       └── jardins-full.jpg
└── videos/
    └── hero.mp4             ← Vidéo de la page d'accueil
```

### Conseils pour les photos

| Type | Format conseillé | Poids max |
|---|---|---|
| Produits | 1200 × 1600 px (portrait) | 300 Ko |
| Catégories & bannières | 1600 × 1200 px (paysage) | 400 Ko |
| Logo | PNG **fond transparent** | 100 Ko |

> 🪶 **Toujours compresser avant d'envoyer** sur [squoosh.app](https://squoosh.app) ou [tinypng.com](https://tinypng.com).
> Une photo trop lourde ralentit le site et fait fuir les clients.

**Nom des fichiers :** en minuscules, sans accent ni espace → `pot-saxum-beige.jpg` ✅ / `Pot Saxum Beige.JPG` ❌

### Ajouter une nouvelle photo produit

C'est en **deux temps** :

**1.** Dépose la photo dans `public/images/products/` (ex. `nouveau-pot.jpg`)

**2.** Dans `src/lib/demo-data.ts`, indique au site de l'utiliser :

```js
images: { edges: [{ node: img(PRODUCTS + 'nouveau-pot.jpg') }] },
```

### Supprimer une photo

⚠️ Vérifie d'abord qu'**aucun fichier ne l'utilise**. Sur GitHub, utilise la barre de recherche du repo pour chercher son nom.

Si tu supprimes une photo encore utilisée : le site continue de fonctionner, mais **l'image apparaîtra cassée** à cet endroit.

---

## 💰 Gérer les produits et les prix

### ⚠️ Important à comprendre

Le site fonctionne actuellement en **mode démo** : les produits et les prix sont écrits dans le fichier `src/lib/demo-data.ts`.

Le jour où la boutique **Shopify** sera connectée, les produits et prix viendront automatiquement de Shopify, et ce fichier ne servira plus. *(voir [Connecter Shopify](#-connecter-shopify-plus-tard))*

### Modifier un prix

Ouvre `src/lib/demo-data.ts` et trouve le produit.

> 🚨 **Attention — le prix est écrit à 3 endroits pour chaque produit.** Il faut **les changer tous les trois**, sinon le panier affichera un montant différent de la fiche produit.

```js
{
  id: 'demo-1', handle: 'erratum-olivier', title: 'Erratum & Olivier',
  description: 'Pot Erratum greige 60cm + Olivier ~1m60.',

  priceRange: {
    minVariantPrice: { amount: '1890', currencyCode: 'MAD' },   // ← 1
    maxVariantPrice: { amount: '1890', currencyCode: 'MAD' }    // ← 2
  },

  variants: { edges: [{ node: {
    price: { amount: '1890', currencyCode: 'MAD' },             // ← 3
  }}]},
}
```

Écris les prix **sans espace ni symbole** : `'1890'` ✅ / `'1 890 MAD'` ❌

### Mettre un produit en promotion

Renseigne `compareAtPriceRange` avec **l'ancien prix** (le prix barré). Le badge `-15%` se calcule tout seul.

```js
priceRange:          { minVariantPrice: { amount: '1998', ... } },  // prix actuel
compareAtPriceRange: { minVariantPrice: { amount: '2350', ... } },  // prix barré
```

Pour **retirer** une promo : remets `amount: '0'` dans `compareAtPriceRange`.

### Indiquer un produit épuisé

```js
availableForSale: false,   // le bouton affichera « Épuisé »
```

### Les catégories d'un produit

Le champ `tags` détermine dans quelle rubrique le produit apparaît :

```js
tags: ['composition'],   // → rubrique Compositions
tags: ['plante'],        // → rubrique Plantes
tags: ['pot'],           // → rubrique Pots
```

---

## 🚚 Frais de livraison et code promo

Ces informations sont **affichées** à plusieurs endroits. Si tu changes un tarif, pense à modifier les **trois** fichiers :

| Fichier | Où ça s'affiche |
|---|---|
| `src/components/sections/Reassurance.tsx` | Bloc rassurance de l'accueil |
| `src/components/layout/CartDrawer.tsx` | Panier |
| `src/components/product/ProductDetail.tsx` | Fiche produit |

Tarifs actuels : **Rabat 100 MAD · Casablanca 150 MAD**

### Code promo `BIENVENUE10`

Il est **affiché** après la création d'un compte (`src/app/compte/page.tsx`).

> 🚨 Ce code est pour l'instant **purement visuel**. Pour qu'il fonctionne vraiment au paiement, il devra être créé dans **Shopify Admin → Réductions**.

---

## 🎨 Couleurs et polices

Tout est centralisé dans `src/styles/globals.css`, tout en haut du fichier :

```css
:root {
  --bordeaux:   #8C1C13;   /* couleur principale (boutons, titres) */
  --terracotta: #BF4342;   /* accents, petits labels */
  --sand:       #E7D7C1;
  --sand-pale:  #F8F4EE;   /* fond du site */
  --chocolate:  #735751;   /* texte courant */
}
```

Change un code couleur ici → il se met à jour **sur tout le site**.

**Polices actuelles :** Playfair Display (titres) + DM Sans (textes), chargées depuis Google Fonts.

> 📌 **En attente :** le passage à la police **Abiah** nécessite les fichiers de police (`.woff2`) **avec une licence web**. Abiah n'est pas disponible sur Google Fonts.

---

## 🛠️ Méthode B — Installer le site sur son ordinateur

Utile pour **tester les changements avant** de les publier.

### 1. Installer les outils (une seule fois)

- **Node.js** (version 18 minimum) → [nodejs.org](https://nodejs.org) *(prends la version « LTS »)*
- **Git** → [git-scm.com](https://git-scm.com)
- Un éditeur de texte : **VS Code** → [code.visualstudio.com](https://code.visualstudio.com)

### 2. Récupérer le site

Ouvre un terminal et tape :

```bash
git clone https://github.com/yassine2301/les-jardins-de-sofie.git
cd les-jardins-de-sofie
npm install
```

### 3. Lancer le site en local

```bash
npm run dev
```

Ouvre ensuite **http://localhost:3000** dans ton navigateur.
Chaque modification enregistrée s'affiche **instantanément**. Rien n'est publié en ligne.

Pour arrêter : `Ctrl + C` dans le terminal.

### 4. Publier les changements

```bash
git add .
git commit -m "Description de ce que j'ai changé"
git push
```

Le site se met à jour tout seul ~2 minutes plus tard.

### Commandes utiles

| Commande | À quoi ça sert |
|---|---|
| `npm run dev` | Lancer le site en local |
| `npm run build` | Vérifier qu'il n'y a **aucune erreur** avant de publier |
| `git pull` | Récupérer les modifications faites par quelqu'un d'autre |

> 💡 **Avant chaque `git push`, lance `npm run build`.** S'il affiche une erreur, corrige-la : sinon la mise en ligne échouera.

---

## 🛒 Connecter Shopify (plus tard)

Tant que les clés ne sont pas renseignées, le site tourne en **mode démo** avec les produits de `demo-data.ts`.

Pour connecter la vraie boutique :

1. **Shopify Admin** → Paramètres → Applications → *Développer des applications*
2. Créer une application, activer les **Storefront API scopes**
3. Copier le **Storefront access token**
4. Renseigner les valeurs dans **Vercel** → Settings → *Environment Variables* :

```
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN = ta-boutique.myshopify.com
NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN = le-token-copié
```

Une fois connecté, **produits, prix, stocks et paiement** sont gérés depuis Shopify.

---

## 📁 Structure du projet

```
les-jardins-de-sofie/
├── public/                     # 📸 Toutes les images et vidéos
│   ├── images/
│   └── videos/
├── src/
│   ├── app/                    # 📄 Les pages du site
│   │   ├── page.tsx            #    Accueil
│   │   ├── contact/            #    Contact
│   │   ├── compte/             #    Création de compte
│   │   ├── notre-histoire/     #    Notre histoire
│   │   ├── recherche/          #    Résultats de recherche
│   │   ├── services/           #    Studio JDS + 4 formulaires
│   │   ├── produit/[handle]/   #    Fiche produit (générée automatiquement)
│   │   └── categorie/[handle]/ #    Page catégorie (générée automatiquement)
│   ├── components/
│   │   ├── layout/             # 🧱 Navbar, Footer, Panier
│   │   ├── sections/           # 🧱 Blocs de l'accueil
│   │   └── product/            # 🧱 Cartes et fiches produit
│   ├── lib/
│   │   ├── demo-data.ts        # 💰 Produits et prix (mode démo)
│   │   ├── shopify.ts          # 🔌 Connexion Shopify
│   │   └── order-email.ts      # ✉️ Email de confirmation de commande
│   └── styles/
│       └── globals.css         # 🎨 Couleurs et polices
└── README.md                   # 📖 Ce guide
```

**Les dossiers à ne pas toucher :** `node_modules/`, `.next/`, `package-lock.json`.

---

## ⚠️ Les règles d'or

1. **Une modification à la fois**, puis on vérifie le site. Plus facile de retrouver l'erreur.
2. **Ne jamais supprimer un fichier** sans avoir vérifié qu'il n'est utilisé nulle part.
3. **Toujours compresser les images** avant de les envoyer.
4. **En cas de doute → demander.** Un `Revert` répare tout, mais autant éviter.
5. Le site se republie **automatiquement** : pas besoin de prévenir qui que ce soit.

---

## 📌 En attente / à faire

- [ ] **Police Abiah** — fichiers `.woff2` avec licence web à fournir
- [ ] **Photos des 4 services** — les cartes de la page Studio JDS affichent des icônes, pas des photos
- [ ] **Produits Méandre & Panier** — présents dans le menu, mais aucun produit associé pour l'instant
- [ ] **Code promo BIENVENUE10** — à créer dans Shopify pour qu'il fonctionne réellement
- [ ] **Email de confirmation** — le modèle existe, reste à brancher un service d'envoi (Resend ou SendGrid)
- [ ] **Connexion Shopify** — pour gérer produits, stocks et paiements

---

## 🆘 Un problème ?

| Symptôme | Que faire |
|---|---|
| Le site n'affiche pas mes changements | Attendre 2-3 min, puis rafraîchir avec `Ctrl + F5` |
| Une image est cassée | Vérifier que le **nom du fichier** correspond exactement (majuscules comprises) |
| La mise en ligne a échoué | Onglet **Commits** sur GitHub → croix rouge ❌ → lire l'erreur, ou faire **Revert** |
| J'ai tout cassé 😱 | **Revert** sur GitHub — l'historique complet est conservé |

---

## 🧰 Détails techniques

| | |
|---|---|
| **Framework** | Next.js 14 (App Router) |
| **Langage** | TypeScript + React 18 |
| **Styles** | CSS Modules |
| **E-commerce** | Shopify Storefront API *(mode démo actif)* |
| **Hébergement** | Vercel — déploiement auto depuis `main` |
| **Icônes** | lucide-react |
