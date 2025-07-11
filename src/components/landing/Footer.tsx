/**
 * Composant Footer
 * Affiche le pied de page avec les informations de l'auteur
 */

export function Footer() {
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