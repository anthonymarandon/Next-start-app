import { RecentOrder } from "./types";

interface RecentOrdersTableProps {
  orders: RecentOrder[];
}

export function RecentOrdersTable({ orders }: RecentOrdersTableProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-50 text-green-700 ring-green-600/20 dark:bg-green-900/40 dark:text-green-300 dark:ring-green-500/40";
      case "pending":
        return "bg-yellow-50 text-yellow-700 ring-yellow-600/20 dark:bg-yellow-900/40 dark:text-yellow-300 dark:ring-yellow-500/40";
      case "cancelled":
        return "bg-red-50 text-red-700 ring-red-600/20 dark:bg-red-900/40 dark:text-red-300 dark:ring-red-500/40";
      default:
        return "bg-gray-100 text-gray-700 ring-gray-400/20 dark:bg-gray-900/40 dark:text-gray-300 dark:ring-gray-600/40";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return "Terminé";
      case "pending":
        return "En attente";
      case "cancelled":
        return "Annulé";
      default:
        return status;
    }
  };

  const currencyFormatter = new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  });

  const dateFormatter = new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <section className="rounded-2xl border border-gray-200/80 bg-white/80 shadow-sm backdrop-blur-sm dark:border-gray-700/60 dark:bg-gray-900/60">
      <header className="border-b border-gray-200/70 px-6 py-4 dark:border-gray-800">
        <h3 className="text-base font-semibold tracking-tight text-gray-900 dark:text-white">
          Commandes récentes
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Aperçu des derniers achats effectués par vos clients
        </p>
      </header>

      <div className="px-6 py-5">
        <div className="overflow-hidden rounded-xl border border-gray-200/70 dark:border-gray-800/60">
          <table className="min-w-full divide-y divide-gray-200/70 text-sm dark:divide-gray-800/60">
            <thead className="bg-gray-50/80 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:bg-gray-900/40 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-4 py-3">
                  ID
                </th>
                <th scope="col" className="px-4 py-3">
                  Client
                </th>
                <th scope="col" className="px-4 py-3">
                  Produit
                </th>
                <th scope="col" className="px-4 py-3">
                  Montant
                </th>
                <th scope="col" className="px-4 py-3">
                  Statut
                </th>
                <th scope="col" className="px-4 py-3">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200/60 bg-white/60 dark:divide-gray-800/60 dark:bg-gray-900/40">
              {orders.map((order) => (
                <tr
                  key={order.id}
                  className="transition-colors hover:bg-gray-50/80 dark:hover:bg-gray-900/70"
                >
                  <td className="px-4 py-3 font-mono text-xs font-medium text-gray-700 dark:text-gray-300">
                    {order.id}
                  </td>
                  <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">
                    {order.customer}
                  </td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-400">
                    {order.product}
                  </td>
                  <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">
                    {currencyFormatter.format(order.amount)}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium ring-1 ring-inset ${getStatusColor(order.status)}`}
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />
                      {getStatusText(order.status)}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-400">
                    {dateFormatter.format(new Date(order.date))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
