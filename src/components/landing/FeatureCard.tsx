/**
 * Composant FeatureCard
 * Affiche une carte de fonctionnalité avec icône, titre et description
 */

interface Feature {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  bgColor: string;
  iconColor: string;
}

export function FeatureCard({ feature }: { feature: Feature }) {
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