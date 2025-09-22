import { PackageCard } from "./PackageCard";
import { 
  SiTailwindcss,
  SiTypescript,
  SiPrisma,
} from "react-icons/si";
import { 
  FiShield, 
  FiLock, 
  FiSmile, 
} from "react-icons/fi";

const readyToUsePackages = [
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

export function ReadyToUseSection() {
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
          <PackageCard key={index} pkg={pkg} />
        ))}
      </div>
    </section>
  );
} 