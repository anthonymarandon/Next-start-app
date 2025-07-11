/**
 * Composant FeaturesSection
 * Affiche la section des fonctionnalités principales
 */

import { FeatureCard } from "./FeatureCard";
import { 
  SiNextdotjs,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";

const mainFeatures = [
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

export function FeaturesSection() {
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