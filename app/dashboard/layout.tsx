import DashboardHeader from "./header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <DashboardHeader />
      <main className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-6 sm:py-8">
        {children}
      </main>
    </div>
  );
} 