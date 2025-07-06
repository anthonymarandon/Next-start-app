import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { prisma } from "@/src/lib/prisma";
import { authOptions } from "@/src/lib/auth";
import { FiUser, FiMail, FiCalendar, FiClock, FiEdit3 } from "react-icons/fi";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect("/auth/signin");
  }

  // Récupérer les informations complètes de l'utilisateur depuis la base de données
  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
    include: {
      accounts: true,
      sessions: true,
    },
  });

  if (!user) {
    redirect("/auth/signin");
  }

  // Formater les dates
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  return (
    <div className="w-full max-w-none">
      {/* En-tête du profil */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Mon Profil
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Gérez vos informations personnelles et vos paramètres de compte
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Informations principales */}
        <div className="lg:col-span-2 space-y-6">
          {/* Carte d'informations personnelles */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
                <FiUser className="w-5 h-5 mr-2" />
                Informations Personnelles
              </h2>
              <button className="flex items-center space-x-2 px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <FiEdit3 className="w-4 h-4" />
                <span>Modifier</span>
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Nom complet
                  </label>
                  <p className="text-gray-900 dark:text-white font-medium">
                    {user.name || "Non renseigné"}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Adresse email
                  </label>
                  <p className="text-gray-900 dark:text-white font-medium flex items-center">
                    <FiMail className="w-4 h-4 mr-2" />
                    {user.email}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Date de création
                  </label>
                  <p className="text-gray-900 dark:text-white font-medium flex items-center">
                    <FiCalendar className="w-4 h-4 mr-2" />
                    {formatDate(user.createdAt)}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Dernière mise à jour
                  </label>
                  <p className="text-gray-900 dark:text-white font-medium flex items-center">
                    <FiClock className="w-4 h-4 mr-2" />
                    {formatDate(user.updatedAt)}
                  </p>
                </div>
              </div>

              {user.emailVerified && (
                <div className="flex items-center space-x-2 text-green-600 dark:text-green-400">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium">Email vérifié</span>
                </div>
              )}
            </div>
          </div>

          {/* Carte des comptes connectés */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Comptes Connectés
            </h2>
            
            {user.accounts.length > 0 ? (
              <div className="space-y-3">
                {user.accounts.map((account) => (
                  <div key={account.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-sm">
                          {account.provider.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {account.provider}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {account.providerAccountId}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded-full">
                      Connecté
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                Aucun compte externe connecté
              </p>
            )}
          </div>

          {/* Carte des sessions actives */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Sessions Actives
            </h2>
            
            {user.sessions.length > 0 ? (
              <div className="space-y-3">
                {user.sessions.map((session) => (
                  <div key={session.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        Session {session.id.slice(-8)}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Expire le {formatDate(session.expires)}
                      </p>
                    </div>
                    <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full">
                      Active
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                Aucune session active
              </p>
            )}
          </div>
        </div>

        {/* Sidebar avec statistiques */}
        <div className="space-y-6">
          {/* Carte de statistiques */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Statistiques
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">Comptes connectés</span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {user.accounts.length}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">Sessions actives</span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {user.sessions.length}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">Membre depuis</span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {Math.floor((Date.now() - user.createdAt.getTime()) / (1000 * 60 * 60 * 24))} jours
                </span>
              </div>
            </div>
          </div>

          {/* Carte d'actions rapides */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Actions Rapides
            </h2>
            
            <div className="space-y-3">
              <button className="w-full flex items-center justify-center space-x-2 px-4 py-3 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <FiEdit3 className="w-4 h-4" />
                <span>Modifier le profil</span>
              </button>
              
              <button className="w-full flex items-center justify-center space-x-2 px-4 py-3 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                <FiUser className="w-4 h-4" />
                <span>Changer le mot de passe</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 