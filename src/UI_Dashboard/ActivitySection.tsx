import { ActivityItem } from "./types";

interface ActivitySectionProps {
  activities: ActivityItem[];
}

export function ActivitySection({ activities }: ActivitySectionProps) {
  return (
    <section className="rounded-2xl border border-gray-200/80 bg-white/80 shadow-sm backdrop-blur-sm dark:border-gray-700/60 dark:bg-gray-900/60">
      <div className="flex items-center justify-between border-b border-gray-200/70 px-6 py-4 dark:border-gray-800">
        <div>
          <h3 className="text-base font-semibold tracking-tight text-gray-900 dark:text-white">
            Activité récente
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Derniers événements qui peuvent nécessiter votre attention
          </p>
        </div>
        <button
          type="button"
          className="rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-gray-700 transition-colors hover:border-gray-300 hover:text-gray-900 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:hover:border-gray-600"
        >
          Voir tout
        </button>
      </div>
      <ul className="space-y-3 px-6 py-5">
        {activities.map((activity, index) => {
          const IconComponent = activity.icon;
          const showTimeline = index !== activities.length - 1;

          return (
            <li key={activity.id} className="relative">
              {showTimeline && (
                <span
                  aria-hidden="true"
                  className="absolute left-5 top-12 z-[0] h-[calc(100%-3rem)] w-px bg-gray-200 dark:bg-gray-800"
                />
              )}
              <div className="relative z-[1] flex gap-4 rounded-xl border border-gray-200/70 bg-gray-50/80 px-4 py-3 transition-colors hover:border-gray-300 dark:border-gray-800 dark:bg-gray-900/60 dark:hover:border-gray-700">
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-full ${activity.bgColor} ring-1 ring-inset ring-white/70 dark:ring-gray-900`}
                >
                  <IconComponent className={`h-5 w-5 ${activity.iconColor}`} />
                </div>
                <div className="flex flex-1 flex-col justify-center">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {activity.title}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {activity.description}
                  </p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
