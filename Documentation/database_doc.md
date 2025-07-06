# Base de Données et Prisma

## Vue d'ensemble

L'application utilise **PostgreSQL** comme base de données principale avec **Prisma 6.11.1** comme ORM moderne et type-safe.

## 🗄️ Configuration Prisma

### Fichiers de configuration
```
src/prisma/
├── schema.prisma        # Schéma de base de données
├── migrations/          # Migrations automatiques
│   └── 20250706110345_init/
│       └── migration.sql
└── migration_lock.toml  # Verrou des migrations
```

### Configuration du client
```prisma
generator client {
  provider = "prisma-client-js"
  output   = "../generated/prisma"  // Client généré personnalisé
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

## 📊 Modèles de données

### User (Utilisateur)
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
  
  // Relations
  accounts      Account[]
  sessions      Session[]
}
```

### Session (Sessions NextAuth)
```prisma
model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}
```

### Account (Comptes OAuth)
```prisma
model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String? @db.Text
  access_token      String? @db.Text
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String? @db.Text
  session_state     String?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
}
```

### VerificationToken (Tokens de vérification)
```prisma
model VerificationToken {
  identifier String
  token      String   @unique
  expires    DateTime

  @@unique([identifier, token])
}
```

## 🔧 Configuration du client Prisma

### Fichier de configuration
```typescript
// src/lib/prisma.ts
import { PrismaClient } from '../generated/prisma'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
```

### Adapter NextAuth
```typescript
// src/lib/auth.ts
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "./prisma"

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  // ... autres configurations
}
```

## 🚀 Scripts de gestion de base de données

### Commandes disponibles
```bash
# Génération du client Prisma
pnpm prisma:generate

# Création et application des migrations
pnpm prisma:migrate

# Synchronisation du schéma (développement)
pnpm prisma:push

# Interface d'administration
pnpm prisma:studio
```

### Workflow de développement
1. **Modifier le schéma** dans `schema.prisma`
2. **Générer le client** : `pnpm prisma:generate`
3. **Créer une migration** : `pnpm prisma:migrate`
4. **Appliquer les changements** : `pnpm prisma:push`

## 🔐 Sécurité et bonnes pratiques

### Hachage des mots de passe
- **bcrypt** pour le hachage sécurisé
- Salt automatique pour chaque utilisateur
- Protection contre les attaques par force brute

### Relations et contraintes
- **Cascade delete** pour les sessions
- **Contraintes d'unicité** sur les emails
- **Index automatiques** sur les clés primaires

### Validation des données
- **Validation côté serveur** avec Prisma
- **Types TypeScript** générés automatiquement
- **Protection contre les injections SQL**

## 📈 Performance et optimisation

### Requêtes optimisées
- **Sélection de champs** spécifiques
- **Relations préchargées** avec `include`
- **Pagination** intégrée
- **Requêtes groupées** avec `groupBy`

### Index et contraintes
```prisma
// Index automatiques
@@id([id])                    // Clé primaire
@@unique([email])             // Email unique
@@unique([sessionToken])      // Token de session unique
@@unique([provider, providerAccountId]) // Compte OAuth unique
```

## 🔄 Migrations et versioning

### Système de migrations
- **Migrations automatiques** avec Prisma
- **Versioning** des schémas
- **Rollback** possible des migrations
- **Lock file** pour la cohérence

### Exemple de migration
```sql
-- Migration: 20250706110345_init
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,
    "password" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
```

## 🛠️ Outils de développement

### Prisma Studio
- **Interface graphique** pour la base de données
- **Édition des données** en temps réel
- **Visualisation** des relations
- **Requêtes** interactives

### Commandes utiles
```bash
# Ouvrir Prisma Studio
pnpm prisma:studio

# Réinitialiser la base (développement)
pnpm prisma migrate reset

# Voir le statut des migrations
pnpm prisma migrate status

# Générer les types TypeScript
pnpm prisma generate
```

## 🔧 Configuration de production

### Variables d'environnement
```env
# Base de données PostgreSQL
DATABASE_URL="postgresql://user:password@host:port/database"

# Pool de connexions (optionnel)
DATABASE_POOL_SIZE="10"
DATABASE_POOL_TIMEOUT="20"
```

### Optimisations production
- **Connection pooling** configuré
- **Requêtes optimisées** avec Prisma
- **Index** sur les champs fréquemment utilisés
- **Monitoring** des performances

## 📊 Monitoring et maintenance

### Métriques importantes
- **Temps de réponse** des requêtes
- **Utilisation** du pool de connexions
- **Taille** de la base de données
- **Performance** des migrations

### Maintenance
- **Backup** régulier de la base
- **Nettoyage** des sessions expirées
- **Optimisation** des index
- **Mise à jour** de Prisma 