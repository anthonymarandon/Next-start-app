import { Metric } from "./types";

interface MetricCardProps {
  metric: Metric;
}

export function MetricCard({ metric }: MetricCardProps) {
  const IconComponent = metric.icon;

  return (
    <article className="flex h-full flex-col justify-between rounded-2xl border border-gray-200/80 bg-white/80 p-6 shadow-sm backdrop-blur-sm dark:border-gray-700/60 dark:bg-gray-900/60">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
            {metric.title}
          </p>
          <p className="text-3xl font-semibold text-gray-900 dark:text-white">
            {metric.value}
          </p>
        </div>
        <span
          className={`flex h-11 w-11 items-center justify-center rounded-xl ${metric.color} ring-1 ring-inset ring-gray-200/70 dark:ring-white/10`}
        >
          <IconComponent className="h-5 w-5" />
        </span>
      </div>
      <div className="mt-6 flex items-center gap-3 text-sm">
        <span
          className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ring-1 ring-inset ${
            metric.isPositive
              ? "bg-green-50 text-green-700 ring-green-600/20 dark:bg-green-900/40 dark:text-green-300 dark:ring-green-500/50"
              : "bg-red-50 text-red-700 ring-red-600/20 dark:bg-red-900/40 dark:text-red-300 dark:ring-red-500/50"
          }`}
        >
          {metric.change}
        </span>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          vs mois dernier
        </span>
      </div>
    </article>
  );
}
