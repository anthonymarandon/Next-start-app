# Architecture du Projet

## Vue d'ensemble

Cette application est construite avec **Next.js 15.3.5** et utilise l'architecture App Router pour une structure moderne et performante.

## 🏗️ Structure du projet

```
starter-app/
├── app/                    # Pages et routes (App Router)
│   ├── api/               # API Routes
│   ├── auth/              # Pages d'authentification
│   ├── dashboard/         # Interface utilisateur
│   └── layout.tsx         # Layout principal
├── src/
│   ├── components/        # Composants réutilisables
│   ├── lib/              # Utilitaires et configurations
│   ├── prisma/           # Schéma et migrations DB
│   ├── types/            # Définitions TypeScript
│   └── UI_Dashboard/     # Composants spécifiques dashboard
├── public/               # Assets statiques
└── Documentation/        # Documentation du projet
```

## 🔧 Technologies principales

### Framework
- **Next.js 15.3.5** - Framework React avec App Router
- **React 19.0.0** - Bibliothèque UI
- **TypeScript 5** - Typage statique

### Authentification
- **NextAuth.js 4.24.11** - Gestion des sessions et authentification
- **bcrypt 6.0.0** - Hachage sécurisé des mots de passe

### Base de données
- **Prisma 6.11.1** - ORM moderne
- **PostgreSQL** - Base de données relationnelle
- **@auth/prisma-adapter** - Adapter NextAuth pour Prisma

### Styling
- **Tailwind CSS 4** - Framework CSS utilitaire
- **React Icons 5.5.0** - Bibliothèque d'icônes

## 🔐 Sécurité

### Middleware de protection
- Protection automatique des routes `/dashboard/*`
- Redirection vers `/auth/signin` si non authentifié
- Gestion des tokens JWT avec NextAuth

### Authentification
- Sessions sécurisées avec NextAuth
- Hachage des mots de passe avec bcrypt
- Support des comptes OAuth (configurable)

## 📊 Fonctionnalités principales

1. **Système d'authentification complet**
   - Inscription/Connexion
   - Sessions sécurisées
   - Protection des routes

2. **Dashboard utilisateur**
   - Métriques en temps réel
   - Graphiques interactifs
   - Tableaux de données
   - Profil utilisateur

3. **API RESTful**
   - Routes d'authentification
   - Gestion des sessions
   - Endpoints sécurisés

## 🚀 Scripts disponibles

```bash
# Développement
pnpm dev              # Serveur de développement
pnpm build            # Build de production
pnpm start            # Serveur de production

# Base de données
pnpm prisma:generate  # Générer le client Prisma
pnpm prisma:migrate   # Exécuter les migrations
pnpm prisma:push      # Pousser le schéma vers la DB
pnpm prisma:studio    # Interface d'administration DB
``` 