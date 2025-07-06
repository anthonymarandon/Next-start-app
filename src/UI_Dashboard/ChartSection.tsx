import { ChartData } from "./types";

interface ChartSectionProps {
  data: ChartData[];
}

export function ChartSection({ data }: ChartSectionProps) {
  const maxRevenue = Math.max(...data.map(d => d.revenue));
  const maxOrders = Math.max(...data.map(d => d.orders));
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Évolution des ventes
        </h3>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-sm text-gray-600 dark:text-gray-400">Revenus</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
            <span className="text-sm text-gray-600 dark:text-gray-400">Commandes</span>
          </div>
        </div>
      </div>
      
      <div className="flex items-end justify-between h-48 space-x-2">
        {data.map((chartData, index) => (
          <div key={index} className="flex flex-col items-center flex-1">
            <div className="flex items-end space-x-1 w-full">
              <div 
                className="bg-blue-500 rounded-t w-full"
                style={{ height: `${(chartData.revenue / maxRevenue) * 100}%` }}
              ></div>
              <div 
                className="bg-purple-500 rounded-t w-full"
                style={{ height: `${(chartData.orders / maxOrders) * 60}%` }}
              ></div>
            </div>
            <span className="text-xs text-gray-600 dark:text-gray-400 mt-2">
              {chartData.month}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
} 