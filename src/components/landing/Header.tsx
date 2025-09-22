import Link from "next/link";
import Image from "next/image";

export function Header() {
  return (
    <header className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo et titre */}
        <div className="flex items-center space-x-3">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
            Starter Kit
          </h1>
          <div className="bg-white dark:bg-white border border-gray-300 dark:border-gray-600 rounded-[10px] p-1">
            <Image 
              src="/next.svg" 
              alt="Next.js Logo" 
              width={100} 
              height={24} 
              className="h-6 w-auto"
            />
          </div>
        </div>
        
        {/* Navigation */}
        <nav className="flex items-center space-x-4">
          <Link 
            href="/auth/signin"
            className="px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors font-medium"
          >
            Connexion
          </Link>
          <Link 
            href="/auth/signup"
            className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-medium text-sm sm:text-base shadow-lg hover:shadow-xl"
          >
            Inscription
          </Link>
        </nav>
      </div>
    </header>
  );
} 