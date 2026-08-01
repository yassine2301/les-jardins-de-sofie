# 🌿 Les Jardins de Sofie — Site web

Site e-commerce de **Studio JDS** : compositions végétales, plantes et pots artisanaux.

**🔗 Site en ligne :** https://les-jardins-de-sofie.vercel.app

---

## 🚦 État actuel du site — à savoir absolument

> ### ⚠️ Le site est une **vitrine**. On ne peut pas encore y acheter.
>
> La boutique **Shopify n'est pas connectée**. Concrètement :
>
> | Ce qui fonctionne | Ce qui ne fonctionne pas encore |
> |---|---|
> | ✅ Navigation, menus, recherche | ❌ **Aucun paiement possible** |
> | ✅ Fiches produits, photos, prix affichés | ❌ Le bouton « Procéder au paiement » ne mène nulle part |
> | ✅ Ajout au panier (visuel uniquement) | ❌ Aucune commande n'arrive nulle part |
> | ✅ Formulaires de contact et de services | ❌ Les formulaires n'envoient **aucun email** |
> | ✅ Création de compte (affichage) | ❌ Aucun compte n'est réellement enregistré |
>
> **Les produits et prix affichés sont des données de démonstration**, écrites dans
> `src/lib/demo-data.ts`. Ce ne sont pas de vrais produits en stock.
>
> 👉 Pour vendre pour de vrai, il faut [connecter Shopify](#-connecter-shopify-pour-vendre-réellement).

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
│   └── services/            ← Photos des services (cartes + bannières)
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

Le jour où la boutique **Shopify** sera connectée, les produits et prix viendront automatiquement de Shopify, et ce fichier ne servira plus. *(voir [Connecter Shopify](#-connecter-shopify-pour-vendre-réellement))*

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

### 2 bis. Se présenter à Git (une seule fois)

Pour que tes modifications soient signées à ton nom :

```bash
git config user.name "ton-pseudo-github"
git config user.email "ton-email@exemple.com"
```

> ⚠️ Utilise **le même email que ton compte GitHub**, sinon tes commits
> n'apparaîtront pas à ton nom dans l'historique du projet.

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

## 🛒 Connecter Shopify (pour vendre réellement)

### Pourquoi c'est nécessaire

Aujourd'hui le site tourne en **mode démo** : il affiche les produits écrits dans
`src/lib/demo-data.ts` et **aucune vente n'est possible**.

Le site est construit en « **headless** » : Next.js gère l'apparence, Shopify gère
le commerce. Les deux sont indépendants — il suffit de les relier.

### Ce que Shopify prendra en charge une fois connecté

- Le catalogue produits, les photos et les prix *(plus besoin de toucher au code)*
- Les stocks et les variantes (tailles, couleurs)
- **Le paiement** — page sécurisée hébergée par Shopify (CB, CMI…)
- Les commandes, les factures et les emails de confirmation
- Les codes promo, dont `BIENVENUE10`
- Les frais de livraison réels, calculés au paiement

### Les étapes

1. Avoir une **boutique Shopify** avec un abonnement actif
2. **Shopify Admin** → Paramètres → Applications → *Développer des applications*
3. Créer une application, activer les **Storefront API scopes** *(lecture produits + gestion panier)*
4. Copier le **Storefront access token**
5. Dans **Vercel** → ton projet → Settings → *Environment Variables*, ajouter :

```
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN = ta-boutique.myshopify.com
NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN = le-token-copié
```

6. **Redéployer** le site (Vercel → Deployments → *Redeploy*)

> ⚠️ Les variables ne sont prises en compte qu'**après un nouveau déploiement**.

### Comment vérifier que ça a marché

Le site bascule automatiquement : dès que les deux clés sont valides, il arrête
d'utiliser `demo-data.ts` et affiche les vrais produits Shopify.

Signe le plus simple : le bouton **« Procéder au paiement »** du panier renvoie
vers une page `…myshopify.com/checkout` au lieu de ne rien faire.

### À configurer aussi dans Shopify

| Élément | Où |
|---|---|
| Frais de livraison (Rabat 100 MAD · Casablanca 150 MAD) | Paramètres → Expédition |
| Code promo `BIENVENUE10` (−10 %) | Réductions |
| Emails de confirmation de commande | Paramètres → Notifications |
| Tags produits `composition` / `plante` / `pot` | Sur chaque produit |

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

### 🔴 Bloquant pour vendre

- [ ] **Connexion Shopify** — sans elle, **aucune vente n'est possible**. C'est la priorité n°1.
- [ ] **Frais de livraison réels** — à paramétrer dans Shopify (actuellement juste affichés en texte)
- [ ] **Code promo BIENVENUE10** — à créer dans Shopify, sinon il ne réduit rien

### 🟠 Important

- [ ] **Formulaires de contact et de services** — ils affichent « Message envoyé » mais **n'envoient rien**.
      À brancher sur un service d'envoi (Resend, SendGrid) ou sur un outil type Formspree.
- [ ] **Email de confirmation de commande** — le modèle existe (`src/lib/order-email.ts`),
      reste à brancher un service d'envoi
- [ ] **Comptes clients** — la page affiche une confirmation, mais aucun compte n'est enregistré
      *(Shopify gère les comptes clients nativement une fois connecté)*

### 🟡 Contenu à fournir

- [ ] **Police Abiah** — fichiers `.woff2` **avec licence web** (absente de Google Fonts)
- [ ] **2 photos de services à remplacer** — chaque service utilise **un seul fichier**,
      affiché à la fois sur la carte de la page Studio JDS et en bannière de sa page :

      | Fichier à remplacer | Photo attendue | État |
      |---|---|---|
      | `corporate-full.jpg` | Coffret JDS bordeaux & crème | ⚠️ mauvaise photo, 333×500 |
      | `sur-mesure-full.jpg` | Vases rayés noir et blanc | ⚠️ mauvaise photo, 333×500 |
      | `evenements-full.jpg` | Hall en marbre | ✅ correcte |
      | `jardins-full.jpg` | Olivier en pot | ✅ correcte |

      Les deux photos à remplacer sont en **portrait basse résolution** alors qu'elles
      sont affichées en large → elles apparaissent **floues**. Fournir du **paysage
      ~1600×900**, compressé sous 300 Ko. Garder exactement le même nom de fichier.
- [ ] **Produits Méandre & Panier** — présents dans le menu, mais aucun produit associé

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
