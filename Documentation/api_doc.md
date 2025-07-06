# API Routes - Documentation

## Vue d'ensemble

L'application utilise l'architecture **App Router** de Next.js 15.3.5 avec des API Routes pour gérer les requêtes backend.

## 🛣️ Structure des API Routes

```
app/api/
└── auth/
    ├── [...nextauth]/
    │   └── route.ts          # Route NextAuth principale
    ├── logout/
    │   └── route.ts          # Déconnexion personnalisée
    └── register/
        └── route.ts          # Inscription personnalisée
```

## 🔐 Routes d'authentification

### 1. NextAuth Route (`/api/auth/[...nextauth]`)

**Fichier** : `app/api/auth/[...nextauth]/route.ts`

**Fonctionnalités** :
- **Gestion complète** de l'authentification NextAuth
- **Support des providers** OAuth et Credentials
- **Sessions sécurisées** avec JWT
- **Adapter Prisma** pour la persistance

**Endpoints automatiques** :
```
GET  /api/auth/signin          # Page de connexion
POST /api/auth/signin          # Connexion
GET  /api/auth/signout         # Déconnexion
GET  /api/auth/session         # Session actuelle
GET  /api/auth/csrf            # Protection CSRF
GET  /api/auth/providers       # Providers disponibles
```

### 2. Route de déconnexion (`/api/auth/logout`)

**Fichier** : `app/api/auth/logout/route.ts`

**Fonctionnalités** :
- **Déconnexion personnalisée**
- **Nettoyage des sessions**
- **Redirection** après déconnexion
- **Sécurité renforcée**

**Méthode** : `POST`

**Réponse** :
```json
{
  "success": true,
  "message": "Déconnexion réussie"
}
```

### 3. Route d'inscription (`/api/auth/register`)

**Fichier** : `app/api/auth/register/route.ts`

**Fonctionnalités** :
- **Inscription personnalisée**
- **Validation des données**
- **Hachage des mots de passe**
- **Création d'utilisateur**

**Méthode** : `POST`

**Body** :
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword"
}
```

**Réponse** :
```json
{
  "success": true,
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

## 🔧 Configuration des routes

### Middleware de protection
```typescript
// middleware.ts
export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
    if (!token) {
      return NextResponse.redirect(new URL("/auth/signin", request.url));
    }
  }
  return NextResponse.next();
}
```

### Variables d'environnement requises
```env
# NextAuth
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# Base de données
DATABASE_URL="postgresql://..."

# Providers OAuth (optionnel)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

## 🛡️ Sécurité des API

### Protection CSRF
- **Tokens CSRF** automatiques avec NextAuth
- **Validation** côté serveur
- **Protection** contre les attaques CSRF

### Validation des données
```typescript
// Exemple de validation
const { name, email, password } = await request.json();

if (!name || !email || !password) {
  return NextResponse.json(
    { error: "Tous les champs sont requis" },
    { status: 400 }
  );
}

// Validation email
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailRegex.test(email)) {
  return NextResponse.json(
    { error: "Email invalide" },
    { status: 400 }
  );
}
```

### Gestion des erreurs
```typescript
try {
  // Logique de l'API
} catch (error) {
  console.error('API Error:', error);
  return NextResponse.json(
    { error: "Erreur interne du serveur" },
    { status: 500 }
  );
}
```

## 📊 Types de réponses

### Réponse de succès
```typescript
return NextResponse.json({
  success: true,
  data: result,
  message: "Opération réussie"
});
```

### Réponse d'erreur
```typescript
return NextResponse.json({
  success: false,
  error: "Message d'erreur",
  code: "ERROR_CODE"
}, { status: 400 });
```

## 🔄 Flux de données

### 1. Authentification
```
Client → /api/auth/signin → NextAuth → Prisma → PostgreSQL
```

### 2. Inscription
```
Client → /api/auth/register → Validation → bcrypt → Prisma → PostgreSQL
```

### 3. Déconnexion
```
Client → /api/auth/logout → NextAuth → Nettoyage session → Réponse
```

## 🚀 Performance et optimisation

### Optimisations Next.js
- **API Routes** optimisées automatiquement
- **Code splitting** des routes
- **Caching** intelligent
- **Compression** automatique

### Bonnes pratiques
- **Validation** côté serveur
- **Gestion d'erreurs** complète
- **Logs** appropriés
- **Rate limiting** (extensible)

## 📈 Extensibilité

### Ajout de nouvelles routes
1. **Créer** le dossier dans `app/api/`
2. **Ajouter** le fichier `route.ts`
3. **Implémenter** les méthodes HTTP
4. **Tester** avec des outils comme Postman

### Exemple de nouvelle route
```typescript
// app/api/users/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  // Logique pour récupérer les utilisateurs
}

export async function POST(request: NextRequest) {
  // Logique pour créer un utilisateur
}
```

## 🔍 Monitoring et debugging

### Logs de développement
- **Console logs** pour le debugging
- **Erreurs** détaillées en développement
- **Performance** monitoring

### Outils recommandés
- **Postman** pour tester les API
- **Next.js DevTools** pour le debugging
- **Prisma Studio** pour la base de données

## 🎯 Fonctionnalités futures

### Améliorations possibles
- **Rate limiting** avec Redis
- **Caching** avec Redis/Memcached
- **Webhooks** pour les événements
- **API versioning** (v1, v2, etc.)
- **Documentation** automatique (Swagger)
- **Tests** automatisés des API 