"use client";

import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { FiMenu, FiX, FiHome, FiSettings, FiUser, FiLogIn, FiUserPlus, FiLogOut } from "react-icons/fi";
import Link from "next/link";

export default function DashboardHeader() {
  const { data: session, status } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const handleSignOut = () => {
    signOut({ callbackUrl: "/auth/signin" });
    setUserMenuOpen(false);
    setMenuOpen(false);
  };

  const handleMenuClose = () => {
    setMenuOpen(false);
    setUserMenuOpen(false);
  };

  return (
    <header className="w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-md sticky top-0 z-30 transition-all">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-4">
        <div className="flex items-center justify-between">
          {/* Logo et titre */}
          <div className="flex items-center space-x-3">
            <Link href="/dashboard" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white select-none">
                Dashboard
              </h1>
            </Link>
          </div>

          {/* Navigation Desktop - affichage à partir de lg au lieu de md */}
          <nav className="hidden lg:flex items-center space-x-6">
            <Link
              href="/dashboard"
              className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors font-medium"
            >
              <FiHome className="w-4 h-4" />
              <span>Accueil</span>
            </Link>
            <Link
              href="/dashboard/profile"
              className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors font-medium"
            >
              <FiSettings className="w-4 h-4" />
              <span>Paramètres</span>
            </Link>
          </nav>

          {/* Auth Section Desktop - affichage à partir de lg au lieu de md */}
          <div className="hidden lg:block">
            {status === "loading" ? (
              <div className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-400 dark:text-gray-500">
                <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
                <span>Chargement...</span>
              </div>
            ) : session ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                  <FiUser className="w-4 h-4" />
                  <span>Bonjour, {session.user?.name || session.user?.email}</span>
                </div>
                <button
                  onClick={handleSignOut}
                  className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors font-medium hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                >
                  <FiLogOut className="w-4 h-4" />
                  <span>Déconnexion</span>
                </button>
              </div>
            ) : (
              <div className="flex space-x-3">
                <Link
                  href="/auth/signin"
                  className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors font-medium hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                >
                  <FiLogIn className="w-4 h-4" />
                  <span>Connexion</span>
                </Link>
                <Link
                  href="/auth/signup"
                  className="flex items-center space-x-2 px-4 py-2 text-sm bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg"
                >
                  <FiUserPlus className="w-4 h-4" />
                  <span>Inscription</span>
                </Link>
              </div>
            )}
          </div>

          {/* Hamburger menu bouton - affichage jusqu'à lg au lieu de md */}
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? (
              <FiX className="w-7 h-7 text-gray-900 dark:text-white" />
            ) : (
              <FiMenu className="w-7 h-7 text-gray-900 dark:text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Menu mobile - affichage jusqu'à lg au lieu de md */}
      {menuOpen && (
        <div className="lg:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 shadow-lg animate-fade-in-down">
          <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-4">
            {/* Auth Section Mobile - en premier */}
            <div className="mb-6">
              {status === "loading" ? (
                <div className="flex items-center space-x-2 px-4 py-3 text-sm text-gray-400 dark:text-gray-500">
                  <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
                  <span>Chargement...</span>
                </div>
              ) : session ? (
                <div className="space-y-3">
                  {/* Profil utilisateur */}
                  <div className="flex items-center space-x-3 px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                      <FiUser className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {session.user?.name || "Utilisateur"}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                        {session.user?.email}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <Link
                    href="/auth/signin"
                    className="flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors rounded-lg"
                    onClick={handleMenuClose}
                  >
                    <FiLogIn className="w-4 h-4" />
                    <span>Connexion</span>
                  </Link>
                  
                  <Link
                    href="/auth/signup"
                    className="flex items-center space-x-3 px-4 py-3 text-sm bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg"
                    onClick={handleMenuClose}
                  >
                    <FiUserPlus className="w-4 h-4" />
                    <span>Inscription</span>
                  </Link>
                </div>
              )}
            </div>

            {/* Navigation mobile - au milieu */}
            <nav className="mb-6">
              <div className="space-y-2">
                <Link
                  href="/dashboard"
                  className="flex items-center space-x-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                  onClick={handleMenuClose}
                >
                  <FiHome className="w-5 h-5" />
                  <span>Accueil</span>
                </Link>
                <Link
                  href="/dashboard/profile"
                  className="flex items-center space-x-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                  onClick={handleMenuClose}
                >
                  <FiSettings className="w-5 h-5" />
                  <span>Paramètres</span>
                </Link>
              </div>
            </nav>
            
            {/* Bouton déconnexion - en dernier (seulement si connecté) */}
            {session && (
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <button
                  onClick={handleSignOut}
                  className="flex items-center space-x-3 px-4 py-3 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors w-full text-left rounded-lg"
                >
                  <FiLogOut className="w-4 h-4" />
                  <span>Déconnexion</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
      <style jsx global>{`
        @keyframes fade-in-down {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-down {
          animation: fade-in-down 0.2s ease;
        }
      `}</style>
    </header>
  );
} 