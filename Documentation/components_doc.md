# Composants UI - Documentation

## Vue d'ensemble

L'application utilise des composants React modulaires et réutilisables, organisés dans des dossiers spécialisés pour une meilleure maintenabilité.

## 🧩 Structure des composants

### Organisation des dossiers
```
src/
├── components/           # Composants génériques
│   └── Providers.tsx    # Providers React (NextAuth, etc.)
└── UI_Dashboard/        # Composants spécifiques au dashboard
    ├── index.ts         # Export des composants
    ├── ActivitySection.tsx
    ├── ChartSection.tsx
    ├── MetricCard.tsx
    ├── RecentOrdersTable.tsx
    ├── data.ts          # Données fictives
    └── types.ts         # Types TypeScript
```

## 🎨 Composants Dashboard

### 1. MetricCard
**Fichier** : `src/UI_Dashboard/MetricCard.tsx`

**Fonctionnalités** :
- **Affichage de métriques** avec icônes
- **Design responsive** avec Tailwind CSS
- **Animations** et transitions fluides
- **Props typées** avec TypeScript

**Props** :
```typescript
interface MetricCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon: React.ReactNode;
  color?: string;
}
```

**Utilisation** :
```tsx
<MetricCard
  title="Revenus"
  value="$12,345"
  change={12.5}
  icon={<DollarIcon />}
  color="green"
/>
```

### 2. ChartSection
**Fichier** : `src/UI_Dashboard/ChartSection.tsx`

**Fonctionnalités** :
- **Graphiques interactifs** pour visualiser les données
- **Données fictives** pour démonstration
- **Responsive design** pour tous les écrans
- **Types de graphiques** configurables

**Types de graphiques** :
- Graphiques en barres
- Graphiques en lignes
- Graphiques en secteurs
- Graphiques mixtes

### 3. RecentOrdersTable
**Fichier** : `src/UI_Dashboard/RecentOrdersTable.tsx`

**Fonctionnalités** :
- **Tableau des commandes** récentes
- **Tri et filtrage** des données
- **Pagination** intégrée
- **Design moderne** avec Tailwind CSS

**Colonnes** :
- ID de commande
- Client
- Produit
- Montant
- Statut
- Date

### 4. ActivitySection
**Fichier** : `src/UI_Dashboard/ActivitySection.tsx`

**Fonctionnalités** :
- **Timeline d'activité** utilisateur
- **Notifications** en temps réel
- **Actions récentes** avec timestamps
- **Interface intuitive** et moderne

## 🔧 Composants génériques

### Providers
**Fichier** : `src/components/Providers.tsx`

**Fonctionnalités** :
- **Providers React** pour l'état global
- **NextAuth Provider** pour l'authentification
- **Theme Provider** (extensible)
- **Context Providers** personnalisés

**Utilisation** :
```tsx
// app/layout.tsx
import { Providers } from '@/components/Providers'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
```

## 📊 Types et interfaces

### Types communs
**Fichier** : `src/UI_Dashboard/types.ts`

```typescript
// Types pour les métriques
export interface Metric {
  id: string;
  title: string;
  value: string | number;
  change?: number;
  icon: string;
  color?: string;
}

// Types pour les commandes
export interface Order {
  id: string;
  customer: string;
  product: string;
  amount: number;
  status: 'pending' | 'completed' | 'cancelled';
  date: string;
}

// Types pour l'activité
export interface Activity {
  id: string;
  type: 'order' | 'login' | 'update';
  message: string;
  timestamp: string;
  user: string;
}
```

## 🎨 Styling et design

### Tailwind CSS 4
- **Classes utilitaires** pour le styling
- **Design system** cohérent
- **Responsive design** intégré
- **Dark mode** support (extensible)

### Thème et couleurs
```css
/* Variables CSS personnalisées */
:root {
  --primary-color: #3b82f6;
  --secondary-color: #64748b;
  --success-color: #10b981;
  --warning-color: #f59e0b;
  --error-color: #ef4444;
}
```

### Animations et transitions
- **Transitions fluides** avec Tailwind
- **Animations** au hover et focus
- **Loading states** pour les interactions
- **Micro-interactions** pour l'UX

## 🔄 État et props

### Props typées
```typescript
// Exemple de props bien typées
interface ComponentProps {
  title: string;
  data: Metric[];
  loading?: boolean;
  onRefresh?: () => void;
  className?: string;
}
```

### État local
```typescript
// Hooks React pour l'état
const [isLoading, setIsLoading] = useState(false);
const [data, setData] = useState<Metric[]>([]);
const [error, setError] = useState<string | null>(null);
```

## 🚀 Performance

### Optimisations
- **React.memo** pour éviter les re-renders
- **useMemo** pour les calculs coûteux
- **useCallback** pour les fonctions
- **Lazy loading** des composants lourds

### Code splitting
```typescript
// Import dynamique des composants
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <div>Chargement...</div>
});
```

## 📱 Responsive Design

### Breakpoints
```css
/* Mobile first approach */
.sm: { min-width: 640px }
.md: { min-width: 768px }
.lg: { min-width: 1024px }
.xl: { min-width: 1280px }
```

### Adaptations
- **Grid responsive** pour les métriques
- **Tableau scrollable** sur mobile
- **Menu hamburger** pour la navigation
- **Boutons tactiles** optimisés

## 🔧 Configuration

### Variables d'environnement
```env
# Configuration des composants
NEXT_PUBLIC_API_URL="http://localhost:3000/api"
NEXT_PUBLIC_APP_NAME="Starter App"
```

### Dépendances
```json
{
  "react-icons": "^5.5.0",
  "tailwindcss": "^4",
  "@types/react": "^19"
}
```

## 📈 Extensibilité

### Ajout de nouveaux composants
1. **Créer** le fichier dans le bon dossier
2. **Définir** les types TypeScript
3. **Styler** avec Tailwind CSS
4. **Tester** sur différents appareils
5. **Exporter** dans index.ts

### Patterns recommandés
- **Composition** plutôt qu'héritage
- **Props drilling** minimisé
- **Context API** pour l'état global
- **Custom hooks** pour la logique

## 🎯 Bonnes pratiques

### Naming conventions
- **PascalCase** pour les composants
- **camelCase** pour les props
- **kebab-case** pour les classes CSS
- **UPPER_CASE** pour les constantes

### Structure des fichiers
```
ComponentName/
├── index.tsx           # Export principal
├── ComponentName.tsx   # Composant principal
├── ComponentName.test.tsx # Tests
└── ComponentName.stories.tsx # Storybook
```

## 🔍 Testing

### Tests unitaires
- **Jest** pour les tests
- **React Testing Library** pour les tests d'intégration
- **Coverage** des composants critiques
- **Snapshots** pour les changements visuels

### Tests d'accessibilité
- **axe-core** pour l'accessibilité
- **Navigation** au clavier
- **Screen readers** supportés
- **Contraste** des couleurs

## 🎯 Améliorations futures

### Fonctionnalités possibles
- **Storybook** pour la documentation
- **Design tokens** pour la cohérence
- **Theme switching** (dark/light)
- **Internationalisation** (i18n)
- **Animations** avancées
- **Micro-interactions** sophistiquées 