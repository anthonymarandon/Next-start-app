# Système d'Authentification

## Vue d'ensemble

L'application utilise **NextAuth.js 4.24.11** pour gérer l'authentification avec une base de données PostgreSQL via Prisma.

## 🔐 Configuration NextAuth

### Fichiers de configuration
- `src/lib/auth.ts` - Configuration principale de NextAuth
- `app/api/auth/[...nextauth]/route.ts` - Route API NextAuth
- `src/types/next-auth.d.ts` - Types TypeScript étendus

### Providers supportés
- **Credentials** - Authentification par email/mot de passe
- **OAuth** - Configurable (Google, GitHub, etc.)

## 📁 Structure des routes d'authentification

```
app/auth/
├── signin/
│   └── page.tsx          # Page de connexion
└── signup/
    └── page.tsx          # Page d'inscription

app/api/auth/
├── [...nextauth]/
│   └── route.ts          # Route NextAuth principale
├── logout/
│   └── route.ts          # Déconnexion personnalisée
└── register/
    └── route.ts          # Inscription personnalisée
```

## 🛡️ Sécurité

### Middleware de protection
```typescript
// middleware.ts
- Protection automatique de /dashboard/*
- Redirection vers /auth/signin si non authentifié
- Gestion des tokens JWT
```

### Hachage des mots de passe
- **bcrypt 6.0.0** pour le hachage sécurisé
- Salt automatique pour chaque utilisateur
- Protection contre les attaques par force brute

## 🗄️ Modèles de base de données

### User
```prisma
model User {
  id            String    @id @default(cuid())
  name          String?
  email         String    @unique
  emailVerified DateTime?
  image         String?
  password      String?   // Haché avec bcrypt
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  accounts      Account[]
  sessions      Session[]
}
```

### Session
```prisma
model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}
```

### Account (OAuth)
```prisma
model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  // ... autres champs OAuth
  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
}
```

## 🔄 Flux d'authentification

### 1. Inscription
1. Utilisateur remplit le formulaire d'inscription
2. Validation côté client et serveur
3. Hachage du mot de passe avec bcrypt
4. Création de l'utilisateur en base
5. Redirection vers le dashboard

### 2. Connexion
1. Utilisateur saisit email/mot de passe
2. Vérification des credentials
3. Comparaison du mot de passe haché
4. Création de session NextAuth
5. Redirection vers la page demandée

### 3. Protection des routes
1. Middleware intercepte les requêtes `/dashboard/*`
2. Vérification du token JWT
3. Redirection si non authentifié
4. Accès autorisé si authentifié

## 🎨 Interface utilisateur

### Pages d'authentification
- **Design moderne** avec Tailwind CSS
- **Formulaires responsifs** et accessibles
- **Gestion d'erreurs** utilisateur-friendly
- **Validation en temps réel**

### Composants
- Formulaires de connexion/inscription
- Messages d'erreur et de succès
- Indicateurs de chargement
- Navigation entre les pages

## 🔧 Configuration requise

### Variables d'environnement
```env
DATABASE_URL="postgresql://..."
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"
```

### Dépendances
```json
{
  "next-auth": "^4.24.11",
  "@auth/prisma-adapter": "^2.10.0",
  "bcrypt": "^6.0.0",
  "@types/bcrypt": "^5.0.2"
}
```

## 🚀 Fonctionnalités avancées

### Sessions persistantes
- Stockage en base de données
- Expiration automatique
- Régénération sécurisée

### Gestion des erreurs
- Messages d'erreur localisés
- Logs de sécurité
- Protection contre les attaques

### Extensibilité
- Support OAuth facile à ajouter
- Hooks personnalisables
- Middleware extensible 