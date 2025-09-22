import { 
  MetricCard, 
  ChartSection, 
  RecentOrdersTable, 
  ActivitySection,
  metrics,
  recentOrders,
  activityItems
} from "@/src/UI_Dashboard";

export default function Dashboard() {
  return (
    <div className="w-full max-w-none">
      {/* Métriques principales */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
        {metrics.map((metric, index) => (
          <MetricCard key={index} metric={metric} />
        ))}
      </div>

      {/* Graphiques et tableaux */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 sm:gap-8 mb-6 sm:mb-8">
        <ChartSection />
        <RecentOrdersTable orders={recentOrders} />
      </div>

      {/* Section d'activité récente */}
      <div className="w-full">
        <ActivitySection activities={activityItems} />
      </div>
    </div>
  );
}
