# Déploiement et Configuration

## Vue d'ensemble

Guide complet pour déployer l'application Next.js avec authentification et base de données PostgreSQL.

## 🚀 Environnements de déploiement

### Développement local
```bash
# Installation des dépendances
pnpm install

# Variables d'environnement
cp .env.example .env.local

# Base de données locale
pnpm prisma:generate
pnpm prisma:migrate

# Serveur de développement
pnpm dev
```

### Production
- **Vercel** (recommandé pour Next.js)
- **Netlify** (alternative)
- **AWS** (pour des besoins spécifiques)
- **Docker** (pour des environnements personnalisés)

## 🔧 Configuration requise

### Variables d'environnement

#### Développement (.env.local)
```env
# Base de données
DATABASE_URL="postgresql://user:password@localhost:5432/starter_app"

# NextAuth
NEXTAUTH_SECRET="your-development-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# Application
NEXT_PUBLIC_APP_NAME="Starter App"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

#### Production (.env.production)
```env
# Base de données
DATABASE_URL="postgresql://user:password@host:5432/database"

# NextAuth
NEXTAUTH_SECRET="your-production-secret-key"
NEXTAUTH_URL="https://your-domain.com"

# Application
NEXT_PUBLIC_APP_NAME="Starter App"
NEXT_PUBLIC_APP_URL="https://your-domain.com"
```

## 🗄️ Configuration de la base de données

### PostgreSQL en production

#### Options recommandées
1. **Supabase** - PostgreSQL géré avec interface
2. **Neon** - PostgreSQL serverless
3. **Railway** - Déploiement facile
4. **AWS RDS** - Pour les besoins d'entreprise

#### Configuration Supabase
```bash
# 1. Créer un projet Supabase
# 2. Récupérer l'URL de connexion
DATABASE_URL="postgresql://postgres:[password]@db.[project].supabase.co:5432/postgres"

# 3. Appliquer les migrations
pnpm prisma:migrate
```

### Migrations en production
```bash
# Générer le client Prisma
pnpm prisma:generate

# Appliquer les migrations
pnpm prisma:migrate

# Vérifier le statut
pnpm prisma migrate status
```

## 🌐 Déploiement sur Vercel

### Configuration Vercel

#### 1. Connexion au projet
```bash
# Installer Vercel CLI
npm i -g vercel

# Connexion
vercel login

# Déploiement
vercel
```

#### 2. Variables d'environnement Vercel
```env
# Dans l'interface Vercel
DATABASE_URL="postgresql://..."
NEXTAUTH_SECRET="your-secret"
NEXTAUTH_URL="https://your-app.vercel.app"
```

#### 3. Configuration automatique
```json
// vercel.json (optionnel)
{
  "buildCommand": "pnpm build",
  "installCommand": "pnpm install",
  "framework": "nextjs"
}
```

## 🐳 Déploiement avec Docker

### Dockerfile
```dockerfile
# Dockerfile
FROM node:18-alpine AS base

# Installer pnpm
RUN npm install -g pnpm

# Dépendances
FROM base AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Build
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm prisma:generate
RUN pnpm build

# Production
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```

### Docker Compose
```yaml
# docker-compose.yml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://user:password@db:5432/starter_app
      - NEXTAUTH_SECRET=your-secret
      - NEXTAUTH_URL=http://localhost:3000
    depends_on:
      - db

  db:
    image: postgres:15
    environment:
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=password
      - POSTGRES_DB=starter_app
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

volumes:
  postgres_data:
```

## 🔐 Sécurité en production

### Variables d'environnement sécurisées
- **NEXTAUTH_SECRET** - Générer une clé forte
- **DATABASE_URL** - Utiliser SSL en production
- **API Keys** - Ne jamais commiter dans le code

### Génération de secrets
```bash
# Générer un secret NextAuth
openssl rand -base64 32

# Ou utiliser un générateur en ligne
# https://generate-secret.vercel.app/32
```

### Configuration SSL
```env
# Base de données avec SSL
DATABASE_URL="postgresql://user:password@host:5432/database?sslmode=require"
```

## 📊 Monitoring et logs

### Logs d'application
```typescript
// Configuration des logs
import { NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
  console.log(`[${new Date().toISOString()}] ${request.method} ${request.url}`)
  // ... reste du middleware
}
```

### Métriques de performance
- **Vercel Analytics** - Métriques automatiques
- **Google Analytics** - Tracking utilisateur
- **Sentry** - Monitoring d'erreurs
- **LogRocket** - Session replay

## 🔄 CI/CD Pipeline

### GitHub Actions
```yaml
# .github/workflows/deploy.yml
name: Deploy to Vercel

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Setup pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 8
          
      - name: Install dependencies
        run: pnpm install
        
      - name: Generate Prisma client
        run: pnpm prisma:generate
        
      - name: Build application
        run: pnpm build
        
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

## 🧪 Tests avant déploiement

### Tests locaux
```bash
# Tests unitaires
pnpm test

# Tests de build
pnpm build

# Tests de linting
pnpm lint

# Tests de types
pnpm type-check
```

### Checklist de déploiement
- [ ] **Variables d'environnement** configurées
- [ ] **Base de données** migrée
- [ ] **Build** réussi
- [ ] **Tests** passés
- [ ] **SSL** configuré
- [ ] **Domain** configuré
- [ ] **Monitoring** activé

## 🔧 Configuration avancée

### Optimisations Next.js
```javascript
// next.config.ts
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['your-domain.com'],
  },
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
}

export default nextConfig
```

### Configuration Prisma
```typescript
// prisma.config.ts
import { defineConfig } from 'prisma'

export default defineConfig({
  schema: './src/prisma/schema.prisma',
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
})
```

## 🚨 Troubleshooting

### Problèmes courants

#### Erreur de base de données
```bash
# Vérifier la connexion
pnpm prisma db push

# Réinitialiser la base (développement)
pnpm prisma migrate reset
```

#### Erreur de build
```bash
# Nettoyer le cache
rm -rf .next
pnpm build
```

#### Erreur d'authentification
```bash
# Vérifier les variables d'environnement
echo $NEXTAUTH_SECRET
echo $NEXTAUTH_URL
```

## 📈 Scaling et performance

### Optimisations recommandées
- **CDN** pour les assets statiques
- **Caching** avec Redis
- **Database pooling** configuré
- **Image optimization** activé
- **Compression** gzip/brotli

### Monitoring de performance
- **Core Web Vitals** optimisés
- **Lighthouse** scores élevés
- **Bundle analyzer** pour optimiser
- **Database query** monitoring 