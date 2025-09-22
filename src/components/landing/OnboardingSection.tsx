"use client";

import { useEffect, useRef, useState } from "react";
import { FiCheck, FiClipboard, FiDatabase, FiLock, FiLink, FiSettings } from "react-icons/fi";

export function OnboardingSection() {
  const [packageManager, setPackageManager] = useState('pnpm');
  const [copied, setCopied] = useState(false);
  const copyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const highlightClass = "inline-flex items-center rounded-md bg-gray-200 dark:bg-gray-800 px-2 py-1 font-mono text-xs sm:text-sm";
  const steps = [
    {
      number: 1,
      title: "Installez les dépendances",
      description: (
        <>
          Lancez{' '}
          <span className="font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
            {packageManager === 'pnpm' && 'pnpm install'}
            {packageManager === 'npm' && 'npm install'}
            {packageManager === 'yarn' && 'yarn install'}
          </span>
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
          <span className="font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
            {packageManager === 'pnpm' && 'pnpm dev'}
            {packageManager === 'npm' && 'npm run dev'}
            {packageManager === 'yarn' && 'yarn dev'}
          </span>
          {' '}et codez immédiatement !
        </>
      )
    }
  ];

  const envVariables = `DATABASE_URL="postgresql://postgres:postgres@localhost:5432/db"
NEXTAUTH_SECRET="cle-secrete-custom"
NEXTAUTH_URL="http://localhost:3000"`;

  const handleCopyEnv = async () => {
    try {
      await navigator.clipboard.writeText(envVariables);
      setCopied(true);
      if (copyTimeoutRef.current) {
        clearTimeout(copyTimeoutRef.current);
      }
      copyTimeoutRef.current = setTimeout(() => {
        setCopied(false);
        copyTimeoutRef.current = null;
      }, 2000);
    } catch (error) {
      console.error('Unable to copy environment variables', error);
    }
  };

  useEffect(() => {
    return () => {
      if (copyTimeoutRef.current) {
        clearTimeout(copyTimeoutRef.current);
      }
    };
  }, []);

  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col items-center">
      <h2 className="text-4xl sm:text-5xl font-bold text-center text-gray-900 dark:text-white mb-8">
        Lancez votre projet en 3 étapes simples
      </h2>

      <div className="flex justify-center space-x-4 mb-8">
        <button
          onClick={() => setPackageManager('pnpm')}
          className={`px-4 py-2 rounded-md ${packageManager === 'pnpm' ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
        >
          pnpm
        </button>
        <button
          onClick={() => setPackageManager('npm')}
          className={`px-4 py-2 rounded-md ${packageManager === 'npm' ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
        >
          npm
        </button>
        <button
          onClick={() => setPackageManager('yarn')}
          className={`px-4 py-2 rounded-md ${packageManager === 'yarn' ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
        >
          yarn
        </button>
      </div>
      
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

      <div className="mt-12 w-full max-w-3xl rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-6 shadow-lg">
        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <FiSettings className="h-6 w-6 text-blue-600" aria-hidden="true" />
          <span>Configurez vos variables d'environnement</span>
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Ajoutez un fichier <span className={highlightClass}>.env</span> à la racine du projet avec les valeurs ci-dessous. Pensez à remplacer <span className={highlightClass}>db</span> par le nom de votre base de données dans <span className={highlightClass}>DATABASE_URL</span>.
        </p>
        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleCopyEnv}
            className="inline-flex items-center gap-2 rounded-md border border-blue-600 bg-blue-600 px-3 py-1 text-sm font-medium text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900"
            aria-label="Copier les variables d'environnement"
          >
            {copied ? (
              <>
                <FiCheck className="h-4 w-4" aria-hidden="true" />
                Copié !
              </>
            ) : (
              <>
                <FiClipboard className="h-4 w-4" aria-hidden="true" />
                Copier
              </>
            )}
          </button>
        </div>
        <pre className="mt-3 bg-black text-gray-100 p-4 rounded-lg overflow-auto text-sm">
          <code className="language-bash text-green-300">{envVariables}</code>
        </pre>
        <ul className="mt-4 space-y-3 text-gray-600 dark:text-gray-300">
          <li className="flex items-start gap-3">
            <FiDatabase className="mt-1 h-5 w-5 text-blue-600" aria-hidden="true" />
            <span><span className="font-semibold">Base de données :</span> adaptez <span className={highlightClass}>DATABASE_URL</span> avec le nom de votre base.</span>
          </li>
          <li className="flex items-start gap-3">
            <FiLock className="mt-1 h-5 w-5 text-blue-600" aria-hidden="true" />
            <span><span className="font-semibold">Secret :</span> utilisez <span className={highlightClass}>openssl rand -base64 32</span> pour générer une clé unique pour <span className={highlightClass}>NEXTAUTH_SECRET</span>.</span>
          </li>
          <li className="flex items-start gap-3">
            <FiLink className="mt-1 h-5 w-5 text-blue-600" aria-hidden="true" />
            <span><span className="font-semibold">URL :</span> gardez <span className={highlightClass}>http://localhost:3000</span> pour votre environnement de développement.</span>
          </li>
        </ul>
      </div>
    </section>
  );
}
