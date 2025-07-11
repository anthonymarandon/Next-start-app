/**
 * Composant OnboardingSection
 * Affiche les étapes pour démarrer le projet
 */

export function OnboardingSection() {
  const steps = [
    {
      number: 1,
      title: "Installez les dépendances",
      description: (
        <>
          Lancez{' '}
          <span className="font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">pnpm install</span>
          {' '}pour tout configurer.
        </>
      )
    },
    {
      number: 2,
      title: "Générez le schéma Prisma",
      description: (
        <>
          Lancez{' '}
          <span className="font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">npx prisma generate</span>
          {' '}pour initialiser le schéma Prisma.
        </>
      )
    },
    {
      number: 3,
      title: "Démarrez le projet",
      description: (
        <>
          Lancez{' '}
          <span className="font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">pnpm dev</span>
          {' '}et codez immédiatement !
        </>
      )
    }
  ];

  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col items-center">
      <h2 className="text-4xl sm:text-5xl font-bold text-center text-gray-900 dark:text-white mb-8">
        Lancez votre projet en 3 étapes simples
      </h2>
      
      <ol className="flex flex-col md:flex-row gap-8 md:gap-12 items-center justify-center w-full max-w-4xl">
        {steps.map((step) => (
          <li key={step.number} className="flex flex-col items-center text-center flex-1">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center mb-4 shadow-lg">
              <span className="text-white text-2xl font-bold">
                {step.number}
              </span>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
              {step.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-base">
              {step.description}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
} 