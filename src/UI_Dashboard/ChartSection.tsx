"use client";

const PIE_RADIUS = 72;
const PIE_DIAMETER = PIE_RADIUS * 2;
const CIRCUMFERENCE = 2 * Math.PI * PIE_RADIUS;

const chartSegments = [
  { id: "subscriptions", label: "Abonnements", value: 4200, color: "#3b82f6" },
  { id: "oneOff", label: "Ventes ponctuelles", value: 2800, color: "#8b5cf6" },
  { id: "services", label: "Services", value: 1900, color: "#22c55e" },
  { id: "affiliation", label: "Affiliation", value: 1100, color: "#f97316" }
];

function shiftColor(hex: string, percent: number) {
  const normalized = hex.replace("#", "");
  if (normalized.length !== 6) {
    return hex;
  }

  const num = parseInt(normalized, 16);
  const r = Math.min(255, Math.max(0, (num >> 16) + Math.round(255 * percent)));
  const g = Math.min(255, Math.max(0, ((num >> 8) & 0xff) + Math.round(255 * percent)));
  const b = Math.min(255, Math.max(0, (num & 0xff) + Math.round(255 * percent)));

  const newColor = (r << 16) | (g << 8) | b;
  return `#${newColor.toString(16).padStart(6, "0")}`;
}

const currencyFormatter = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

export function ChartSection() {
  const total = chartSegments.reduce((sum, segment) => sum + segment.value, 0);
  let accumulated = 0;

  return (
    <section className="rounded-2xl border border-gray-200/80 bg-white/80 shadow-sm backdrop-blur-sm dark:border-gray-700/60 dark:bg-gray-900/60">
      <header className="flex items-center justify-between border-b border-gray-200/70 px-6 py-4 dark:border-gray-800">
        <div>
          <h3 className="text-base font-semibold tracking-tight text-gray-900 dark:text-white">
            Répartition des revenus
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Vue d'ensemble des principales sources pour le dernier trimestre
          </p>
        </div>
      </header>

      <div className="flex flex-col gap-8 px-6 pb-6 pt-5 md:flex-row md:items-center md:justify-between">
        <div className="mx-auto flex flex-col items-center gap-3 md:mx-0 md:flex-none">
          <div className="relative flex h-60 w-60 items-center justify-center">
          <svg
            viewBox={`0 0 ${PIE_DIAMETER + 16} ${PIE_DIAMETER + 16}`}
            width={PIE_DIAMETER + 16}
            height={PIE_DIAMETER + 16}
            aria-label="Sources de revenus"
            role="img"
            className="transform-gpu"
          >
            <defs>
              <filter id="segmentShadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="#0f172a" floodOpacity="0.12" />
                <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#0f172a" floodOpacity="0.08" />
              </filter>
              {chartSegments.map((segment) => (
                <linearGradient
                  key={segment.id}
                  id={`gradient-${segment.id}`}
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor={shiftColor(segment.color, 0.18)} />
                  <stop offset="45%" stopColor={segment.color} />
                  <stop offset="100%" stopColor={shiftColor(segment.color, -0.18)} />
                </linearGradient>
              ))}
              <radialGradient id="innerGlow" r="72%">
                <stop offset="60%" stopColor="#ffffff" stopOpacity="0" />
                <stop offset="100%" stopColor="#0f172a" stopOpacity="0.12" />
              </radialGradient>
            </defs>
            <g transform="translate(8,8)">
              <circle
                cx={PIE_RADIUS}
                cy={PIE_RADIUS}
                r={PIE_RADIUS}
                fill="transparent"
                stroke="rgba(148, 163, 184, 0.2)"
                strokeWidth={16}
              />
              {chartSegments.map((segment) => {
                const segmentLength = (segment.value / total) * CIRCUMFERENCE;
                const dashArray = `${segmentLength} ${CIRCUMFERENCE - segmentLength}`;
                const dashOffset = -(accumulated) - CIRCUMFERENCE / 4;
                accumulated += segmentLength;

                return (
                  <circle
                    key={segment.id}
                    cx={PIE_RADIUS}
                    cy={PIE_RADIUS}
                    r={PIE_RADIUS}
                    fill="transparent"
                    stroke={`url(#gradient-${segment.id})`}
                    strokeWidth={18}
                    strokeDasharray={dashArray}
                    strokeDashoffset={dashOffset}
                    strokeLinecap="round"
                    className="transition-[stroke-dashoffset] duration-700 ease-out"
                    filter="url(#segmentShadow)"
                  >
                    <title>
                      {`${segment.label}: ${currencyFormatter.format(segment.value)} (${Math.round((segment.value / total) * 100)}%)`}
                    </title>
                  </circle>
                );
              })}
              <circle
                cx={PIE_RADIUS}
                cy={PIE_RADIUS}
                r={PIE_RADIUS - 18}
                fill="url(#innerGlow)"
              />
            </g>
          </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 text-center">
              <span className="text-xs font-medium uppercase tracking-wide text-gray-400 dark:text-gray-500">
                Total
              </span>
              <span className="text-2xl font-semibold text-gray-900 dark:text-white">
                {currencyFormatter.format(total)}
              </span>
            </div>
          </div>
          <span className="text-center text-xs text-gray-500 dark:text-gray-400">
            +9.3% vs. période précédente
          </span>
        </div>

        <div className="flex flex-1 flex-col gap-4">
          {chartSegments.map((segment) => {
            const percentage = (segment.value / total) * 100;
            return (
              <div key={segment.id} className="flex flex-col gap-2">
                <div className="flex items-center justify-between text-sm font-medium text-gray-900 dark:text-white">
                  <span className="flex items-center gap-2">
                    <span
                      aria-hidden="true"
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: segment.color }}
                    />
                    {segment.label}
                  </span>
                  <span>{currencyFormatter.format(segment.value)}</span>
                </div>
                <div className="relative h-2 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
                  <div
                    className="absolute inset-y-0 left-0 rounded-full"
                    style={{
                      width: `${percentage}%`,
                      backgroundColor: segment.color,
                    }}
                  />
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {percentage.toFixed(1)}% du total
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
