/**
 * Page d'accueil du Starter Kit
 * 
 * Cette page présente les fonctionnalités principales du starter kit
 * avec une interface moderne et responsive.
 */

import { 
  SiNextdotjs,
  SiTailwindcss,
  SiTypescript,
  SiPrisma,
} from "react-icons/si";
import { 
  FiShield, 
  FiLock, 
  FiSmile, 
} from "react-icons/fi";


// Types pour les données des fonctionnalités
interface Feature {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  bgColor: string;
  iconColor: string;
}

interface Package {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  bgColor: string;
  iconColor: string;
}

// Données des fonctionnalités principales
const mainFeatures: Feature[] = [
  {
    icon: SiNextdotjs,
    title: "Performance optimisée",
    description: "Next.js 15 avec App Router pour des performances exceptionnelles.",
    bgColor: "bg-blue-100 dark:bg-blue-900",
    iconColor: "text-blue-600 dark:text-blue-400"
  },
  {
    icon: SiTailwindcss,
    title: "Design moderne",
    description: "Tailwind CSS pour un design responsive et des composants personnalisables.",
    bgColor: "bg-purple-100 dark:bg-purple-900",
    iconColor: "text-purple-600 dark:text-purple-400"
  },
  {
    icon: SiTypescript,
    title: "TypeScript intégré",
    description: "Configuration TypeScript complète pour un développement plus sûr et productif.",
    bgColor: "bg-green-100 dark:bg-green-900",
    iconColor: "text-green-600 dark:text-green-400"
  }
];

// Données des packages prêts à l'emploi
const readyToUsePackages: Package[] = [
  {
    icon: FiShield,
    title: "NextAuth.js",
    description: "Authentification complète avec providers multiples",
    bgColor: "bg-blue-100 dark:bg-blue-900",
    iconColor: "text-blue-600 dark:text-blue-400"
  },
  {
    icon: SiPrisma,
    title: "Prisma ORM",
    description: "Base de données type-safe avec migrations",
    bgColor: "bg-green-100 dark:bg-green-900",
    iconColor: "text-green-600 dark:text-green-400"
  },
  {
    icon: FiLock,
    title: "bcrypt",
    description: "Hachage sécurisé des mots de passe",
    bgColor: "bg-purple-100 dark:bg-purple-900",
    iconColor: "text-purple-600 dark:text-purple-400"
  },
  {
    icon: FiSmile,
    title: "React Icons",
    description: "Bibliothèque d'icônes complète",
    bgColor: "bg-pink-100 dark:bg-pink-900",
    iconColor: "text-pink-600 dark:text-pink-400"
  },
  {
    icon: SiTypescript,
    title: "TypeScript",
    description: "Typage statique pour un code plus sûr",
    bgColor: "bg-teal-100 dark:bg-teal-900",
    iconColor: "text-teal-600 dark:text-teal-400"
  },
  {
    icon: SiTailwindcss,
    title: "Tailwind CSS 4",
    description: "Framework CSS utilitaire moderne",
    bgColor: "bg-yellow-100 dark:bg-yellow-900",
    iconColor: "text-yellow-600 dark:text-yellow-400"
  }
];

/**
 * Composant Header
 * Affiche le logo, le titre et les boutons de navigation
 */
function Header() {
  return (
    <header className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo et titre */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-xl">S</span>
          </div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
            Starter Kit
          </h1>
        </div>
        
        {/* Navigation */}
        <nav className="flex items-center space-x-4">
          <a 
            href="/auth/signin"
            className="px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors font-medium"
          >
            Connexion
          </a>
          <a 
            href="/auth/signup"
            className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-medium text-sm sm:text-base shadow-lg hover:shadow-xl"
          >
            Inscription
          </a>
        </nav>
      </div>
    </header>
  );
}

/**
 * Composant Onboarding
 * Affiche les étapes pour démarrer le projet
 */
function OnboardingSection() {
  const steps = [
    {
      number: 1,
      title: "Installez les dépendances",
      description: "Lancez pnpm install pour tout configurer."
    },
    {
      number: 2,
      title: "Démarrez le projet",
      description: "Lancez pnpm dev et commencez à coder !"
    }
  ];

  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col items-center">
      <h2 className="text-4xl sm:text-5xl font-bold text-center text-gray-900 dark:text-white mb-8">
        Lancez votre projet en 2 étapes simples
      </h2>
      
      <ol className="flex flex-col md:flex-row gap-8 md:gap-12 items-center justify-center w-full max-w-4xl">
        {steps.map((step) => (
          <li key={step.number} className="flex flex-col items-center text-center flex-1">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center mb-4 shadow-lg">
              <span className="text-white text-2xl font-bold">{step.number}</span>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
              {step.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-base">
              {step.description.split(' ').map((word, index) => 
                word.startsWith('pnpm') ? (
                  <span key={index} className="font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                    {word}
                  </span>
                ) : (
                  <span key={index}> {word}</span>
                )
              )}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}

/**
 * Composant FeatureCard
 * Affiche une carte de fonctionnalité avec icône, titre et description
 */
function FeatureCard({ feature }: { feature: Feature }) {
  const IconComponent = feature.icon;
  
  return (
    <div className="flex flex-col items-center justify-center h-full bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
      <div className={`flex items-center justify-center w-14 h-14 ${feature.bgColor} rounded-xl mb-6`}>
        <IconComponent className={`w-7 h-7 ${feature.iconColor}`} />
      </div>
      <h4 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center">
        {feature.title}
      </h4>
      <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed text-center">
        {feature.description}
      </p>
    </div>
  );
}

/**
 * Composant PackageCard
 * Affiche une carte de package avec icône, titre et description
 */
function PackageCard({ package: pkg }: { package: Package }) {
  const IconComponent = pkg.icon;
  
  return (
    <div className="flex flex-col items-center justify-center h-full bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className={`flex items-center justify-center w-12 h-12 ${pkg.bgColor} rounded-lg mb-4`}>
        <IconComponent className={`w-6 h-6 ${pkg.iconColor}`} />
      </div>
      <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2 text-center">
        {pkg.title}
      </h4>
      <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed text-center">
        {pkg.description}
      </p>
    </div>
  );
}

/**
 * Composant FeaturesSection
 * Affiche la section des fonctionnalités principales
 */
function FeaturesSection() {
  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
      <div className="text-center mb-16 sm:mb-20 max-w-4xl mx-auto">
        <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
          Tout ce dont vous avez besoin
        </h3>
        <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed">
          Une base solide pour vos projets web modernes
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 max-w-7xl mx-auto">
        {mainFeatures.map((feature, index) => (
          <FeatureCard key={index} feature={feature} />
        ))}
      </div>
    </section>
  );
}

/**
 * Composant ReadyToUseSection
 * Affiche la section des packages prêts à l'emploi
 */
function ReadyToUseSection() {
  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
      <div className="text-center mb-16 sm:mb-20 max-w-4xl mx-auto">
        <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
          Fonctions prêtes à l'emploi
        </h3>
        <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed">
          Tous les packages nécessaires sont déjà configurés
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto">
        {readyToUsePackages.map((pkg, index) => (
          <PackageCard key={index} package={pkg} />
        ))}
      </div>
    </section>
  );
}

/**
 * Composant Footer
 * Affiche le pied de page avec les informations de l'auteur
 */
function Footer() {
  return (
    <footer className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 border-t border-gray-200 dark:border-gray-700">
      <div className="flex flex-col items-center justify-center max-w-7xl mx-auto">
        <div className="flex items-center space-x-3">
          <span className="text-lg text-gray-600 dark:text-gray-300 font-medium">
            Made by{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-bold">
              Anthony Marandon
            </span>
          </span>
        </div>
      </div>
    </footer>
  );
}

/**
 * Composant principal de la page d'accueil
 * Assemble tous les composants dans une mise en page responsive
 */
export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Header />
      <OnboardingSection />
      <FeaturesSection />
      <ReadyToUseSection />
      <Footer />
    </div>
  );
}
