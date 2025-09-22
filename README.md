# Starter Kit Next.js

> Un point de départ prêt à l'emploi pour découvrir Next.js 15 avec authentification, Prisma et une UI moderne.

## Pourquoi ce starter ?
- **Stack moderne** : Next.js App Router, React 19, TypeScript, Tailwind CSS 4 et React Icons.
- **Authentification intégrée** : NextAuth.js (credentials) + Prisma Adapter + protection des routes côté middleware.
- **Base de données prête** : schéma Prisma PostgreSQL, client généré dans `generated/prisma`.
- **Déploiement simplifié** : configuration Netlify incluse (`@netlify/plugin-nextjs`), compatible Vercel.
- **Dashboard complet** : composants réactifs (cards, graphiques, tableau d'activité) pour expérimenter rapidement.

## Prérequis
- Node.js 18.18+ (Next 15 recommande 18.18 minimum).
- PostgreSQL accessible (local ou distant).
- Gestionnaire de paquets JavaScript (pnpm recommandé, npm/yarn pris en charge).
- Une valeur sécurisée pour `NEXTAUTH_SECRET` (`openssl rand -base64 32`).

## Démarrage en 5 étapes
1. **Cloner le projet**
   ```bash
   git clone https://github.com/anthonymarandon/Next-start-app.git
   cd Next-start-app
   ```
2. **Installer les dépendances** (choisissez votre gestionnaire)
   ```bash
   pnpm install
   # ou npm install / yarn install
   ```
3. **Configurer l'environnement** : créez un fichier `.env` à la racine.
   ```env
   DATABASE_URL="postgresql://postgres:postgres@localhost:5432/ma_base"
   NEXTAUTH_SECRET="remplacez-moi"
   NEXTAUTH_URL="http://localhost:3000"
   ```
   - Adaptez `ma_base` au nom réel de votre base.
   - Ajoutez d'autres variables publiques via le préfixe `NEXT_PUBLIC_`.
4. **Préparer la base de données**
   ```bash
   npx prisma db push      # synchronise le schéma sans migration
   # ou : npx prisma migrate dev --name init  # crée une migration versionnée
   ```
5. **Lancer l'application**
   ```bash
   pnpm dev
   ```
   rendez-vous sur http://localhost:3000. Connectez-vous ou inscrivez-vous pour accéder au dashboard protégé.

## Scripts disponibles
| Script | Description |
| --- | --- |
| `pnpm dev` | Démarre le serveur de développement Next.js (http://localhost:3000). |
| `pnpm build` | Génère le client Prisma puis réalise le build de production. |
| `pnpm start` | Lance l'app en mode production (après `pnpm build`). |
| `pnpm lint` | Exécute ESLint avec la configuration Next.js. |

## Architecture
```
app/
├─ page.tsx                # Landing page (Server Component) + redirection session
├─ layout.tsx              # Layout racine + SessionProvider
├─ globals.css             # Styles globaux (Tailwind 4)
├─ auth/
│  ├─ signin/page.tsx      # Formulaire de connexion (Client Component)
│  └─ signup/page.tsx      # Inscription via l'API /api/auth/register
├─ dashboard/
│  ├─ layout.tsx           # Layout protégé + header
│  ├─ header.tsx           # Navigation responsive (Client Component)
│  ├─ page.tsx             # Dashboard principal (Server Component)
│  └─ profile/page.tsx     # Profil utilisateur (Server Component + Prisma)
└─ api/auth/
   ├─ [...nextauth]/route.ts  # Handler NextAuth (GET/POST)
   ├─ logout/route.ts         # Déconnexion facultative (POST)
   └─ register/route.ts       # Création d'utilisateur (POST)

src/
├─ components/              # Composants génériques (landing, Providers, etc.)
├─ UI_Dashboard/            # UI du dashboard (+ données de démonstration)
├─ lib/
│  ├─ auth.ts               # Configuration NextAuth (Credentials + Prisma)
│  └─ prisma.ts             # Client Prisma singleton
└─ types/                   # Types partagés

prisma/
├─ schema.prisma            # Modèles User/Account/Session/VerificationToken
└─ migrations/              # (se crée après `prisma migrate`)

generated/prisma/           # Prisma Client généré (ne pas modifier à la main)
```

## Composants serveur vs client
- **Composants serveur (par défaut)** : pas de `"use client"`. Idéal pour la récupération de données, l'accès à Prisma/NextAuth et les redirections (`app/page.tsx`, `app/dashboard/page.tsx`, `app/dashboard/profile/page.tsx`).
- **Composants client** : commencent par `"use client"` et peuvent utiliser l'état React, les hooks du navigateur ou les APIs NextAuth côté client (`app/auth/signin/page.tsx`, `app/dashboard/header.tsx`, `src/components/landing/OnboardingSection.tsx`).
- **Bonne pratique** : gardez les accès BDD/Auth dans les composants serveur ou les routes API. Les composants client se limitent à l'interactivité et consomment les données passées en props.

## Routage et authentification
- **Landing public** : `/` affiche la page d'accueil et redirige vers `/dashboard` lorsqu'une session est active.
- **Pages Auth** : `/auth/signin` et `/auth/signup` utilisent l'API credentials de NextAuth. L'inscription appelle `POST /api/auth/register` pour créer un utilisateur avec mot de passe hashé (bcrypt).
- **Zone protégée** : `/dashboard` et ses sous-routes. Le middleware (`middleware.ts`) vérifie la présence d'un token NextAuth et redirige vers `/auth/signin` si nécessaire.
- **Session côté client** : `src/components/Providers.tsx` embarque `SessionProvider` et rend la session disponible via `useSession()` dans les composants client.

## API et données
| Route | Méthode | Rôle |
| --- | --- | --- |
| `/api/auth/[...nextauth]` | GET/POST | Handler NextAuth (login credentials, callbacks, JWT). |
| `/api/auth/register` | POST | Crée un compte (`name`, `email`, `password`) et renvoie l'utilisateur sans mot de passe. |
| `/api/auth/logout` | POST | Point d'extension pour actions de déconnexion personnalisées. |

### Prisma & base de données
- Le schéma (`prisma/schema.prisma`) définit les modèles NextAuth standards (`User`, `Account`, `Session`, `VerificationToken`).
- `npx prisma db push` synchronise le schéma sur votre base en développement rapide.
- `npx prisma migrate dev --name <nom>` crée une migration versionnée pour le suivi en équipe.
- `npx prisma generate` (déjà inclus dans `pnpm build`) régénère le client TypeScript après toute modification du schéma.
- Pour inspecter les données, vous pouvez utiliser `npx prisma studio`.

## UI & styles
- Tailwind CSS 4 est préconfiguré via `postcss.config.mjs` et `app/globals.css`.
- Les composants du dashboard (`src/UI_Dashboard`) exposent à la fois les données mock (`data.ts`) et les composants (`MetricCard`, `ChartSection`, `RecentOrdersTable`, `ActivitySection`).
- React Icons fournit les pictogrammes (collection `react-icons/fi`).

## Déploiement
1. **Configurer les variables d'environnement** sur la plateforme (DATABASE_URL, NEXTAUTH_SECRET, NEXTAUTH_URL pointant vers l'URL publique).
2. **Netlify (recommandé)** : le fichier `netlify.toml` et le plugin `@netlify/plugin-nextjs` gèrent build & routing. Branchez simplement votre dépôt GitHub.
3. **Vercel** : importez le projet, conservez les mêmes variables. Aucun ajustement spécial n'est requis.
4. **Autres plateformes** : exécutez `pnpm build` puis `pnpm start`. Assurez-vous que Prisma accède à la base de production.

## Aller plus loin
- Ajouter un provider OAuth : complétez `providers` dans `src/lib/auth.ts` (Google, GitHub...).
- Étendre le schéma Prisma pour des entités métiers (ex. `Project`, `Task`) puis exécuter `npx prisma migrate dev`.
- Créer de nouvelles routes API dans `app/api/*/route.ts` pour exposer vos données.
- Transformer les données mock du dashboard en requêtes réelles (composants serveur) et passer les résultats aux composants client.
- Mettre en place des tests (ex. Playwright/Cypress pour l'auth, Jest/Testing Library pour la logique métier).

Bon build ! 🚀
