/**
 * Page d'accueil du Starter Kit
 * 
 * Cette page présente les fonctionnalités principales du starter kit
 * avec une interface moderne et responsive.
 */

import { getServerSession } from "next-auth";
import { authOptions } from "@/src/lib/auth";
import { redirect } from "next/navigation";

import { Header } from "@/src/components/landing/Header";
import { OnboardingSection } from "@/src/components/landing/OnboardingSection";
import { FeaturesSection } from "@/src/components/landing/FeaturesSection";
import { ReadyToUseSection } from "@/src/components/landing/ReadyToUseSection";
import { Footer } from "@/src/components/landing/Footer";

/**
 * Composant principal de la page d'accueil
 * Assemble tous les composants dans une mise en page responsive
 */
export default async function Home() {
  const session = await getServerSession(authOptions);
  
  if (session) {
    redirect("/dashboard");
  }

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
