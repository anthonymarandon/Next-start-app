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

      <div className="space-y-6">
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
      </div>
    </div>
  );
} 