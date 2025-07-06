import { Metric } from "./types";

interface MetricCardProps {
  metric: Metric;
}

export function MetricCard({ metric }: MetricCardProps) {
  const IconComponent = metric.icon;
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
            {metric.title}
          </p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
            {metric.value}
          </p>
        </div>
        <div className={`p-3 rounded-lg ${metric.color}`}>
          <IconComponent className="w-6 h-6" />
        </div>
      </div>
      <div className="mt-4 flex items-center">
        <span className={`text-sm font-medium ${
          metric.isPositive ? 'text-green-600' : 'text-red-600'
        }`}>
          {metric.change}
        </span>
        <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">
          vs mois dernier
        </span>
      </div>
    </div>
  );
} 