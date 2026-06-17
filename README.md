#  Next-Shop - Plateforme de Gestion de Stock Moderne

## 1. Présentation du projet
L'agence digitale Next-Shop a conçu ce back-office moderne pour répondre aux besoins de modernisation d'une chaîne de boutiques locales. Finis les anciens systèmes PHP lents : cette application React offre une expérience **"Zero-Reload"** fluide, permettant de gérer un inventaire de produits (ajout, modification, suppression, consultation) de manière instantanée. L'application met l'accent sur une architecture robuste, une interface épurée et une persistance des données locale.

## 2. Installation et Lancement
Pour installer le projet dans votre environnement local, suivez ces étapes :

1. **Cloner le dépôt :**
   ```bash
   git clone https://github.com/bayebasse/Next-Shop-Plateforme.git
   cd Next-Shop-Plateforme
   ```
2. **Installer les dépendances :**
   ```bash
   npm install
   ```
3. **Lancer le serveur de développement :**
   ```bash
   npm run dev
   ```
L'application sera accessible sur `http://localhost:5173`.

### Lien de l'application en ligne  
L'application est également déployée sur Vercel et peut être consultée via le lien suivant : 
([Next-shop-sur Vercel](https://next-shop-plateforme.vercel.app/))

## 3. Architecture et Découpage
L'application suit une structure de composants hiérarchisée, distinguant les **Smart Components** (qui gèrent la logique) des **Dumb Components** (dédiés à l'affichage).

*   **Parent Global :** `App.jsx` (Gère le routage et l'enveloppe globale).
*   **Fournisseur de Données :** `ProductContext.jsx` (Centralise le State).
*   **Composants de Pages (Smart) :**
    *   `Dashboard` : Affiche les statistiques globales.
    *   `Catalogue` : Gère l'affichage de la liste.
    *   `ProductDetail` : Affiche les détails d'une référence via l'ID de l'URL.
    *   `AddProduct` / `EditProduct` : Formulaires de gestion.
*   **Composants d'Affichage (Dumb/Reusable) :**
    *   `ProductCard` : Carte individuelle de produit utilisée dans le catalogue.
    *   `StatCard` : Carte statistique utilisée dans le dashboard.

## 4. Gestion de la Donnée (Le State)
La donnée est centralisée via l'**API Context de React** (`ProductContext.js`). 
*   **Localisation :** Le state principal (`products`) réside dans le Context, permettant à n'importe quel composant de l'application d'accéder aux données sans "prop-drilling".
*   **Persistance :** Nous utilisons `localStorage` pour sauvegarder l'état du catalogue. À chaque modification du State, un `useEffect` synchronise les données avec le navigateur pour éviter toute perte au rafraîchissement.
*   **Immuabilité :** Pour mettre à jour les produits, nous utilisons systématiquement le **Spread Operator** (`...`). Cela garantit que React détecte les changements de référence et déclenche le re-rendu nécessaire de l'interface.

## 5. Wireframe Minimaliste
```text
_______________________________________________________
|  SIDEBAR           |  HEADER (Titre de la page)      |
|  [Next-Shop]       |_________________________________|
|                    |                                 |
|  - Dashboard       |  MAIN CONTENT                   |
|  - Catalogue       |  (Grille de produits, Formulaire|
|                    |   ou Détails du produit)        |
|                    |                                 |
|____________________|_________________________________|
```
### Lien du wireframe sur Balsamiq
Le wireframe de l'application est également disponible sur Balsamiq :
([Wireframe Balsamiq](https://balsamiq.cloud/s9u09by/pvrd35y))

## 6. Pistes de réflexion techniques

### Pourquoi utiliser `useEffect` ?
Le hook `useEffect` est utilisé pour charger les données initiales du `mockData.js` ou du `localStorage` au montage du composant. Il permet de gérer les effets secondaires (lecture/écriture disque) en dehors du cycle de rendu pur.

### L'importance de l'immuabilité
L'utilisation de `tableau.push()` est proscrite car React compare les références des objets pour savoir s'il doit mettre à jour l'écran. En créant un nouveau tableau avec `[...products, newProduct]`, on change la référence, forçant React à rafraîchir la vue.

### Lecture de l'ID via l'URL
Grâce à `react-router-dom`, nous utilisons le hook `useParams()`. En définissant une route `/produit/:id`, le hook extrait dynamiquement l'identifiant pour nous permettre de filtrer le produit correspondant dans notre State global.

---
**  Développé par :** [Alphonse Desire HABA et Bassirou DIEYE]  
**  Date de rendu :** Mercredi 17 juin 2026  
**  Technologie :** React JS / Vite / Tailwind CSS
