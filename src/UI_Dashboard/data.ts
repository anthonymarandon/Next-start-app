import { 
  FiTrendingUp, 
  FiUsers, 
  FiDollarSign, 
  FiShoppingCart,
  FiActivity,
  FiTarget
} from "react-icons/fi";
import { Metric, ChartData, RecentOrder, ActivityItem } from "./types";

export const metrics: Metric[] = [
  {
    title: "Chiffre d'affaires",
    value: "€124,567",
    change: "+12.5%",
    isPositive: true,
    icon: FiDollarSign,
    color: "text-green-600 bg-green-100 dark:bg-green-900"
  },
  {
    title: "Commandes",
    value: "1,234",
    change: "+8.2%",
    isPositive: true,
    icon: FiShoppingCart,
    color: "text-blue-600 bg-blue-100 dark:bg-blue-900"
  },
  {
    title: "Utilisateurs actifs",
    value: "8,456",
    change: "+15.3%",
    isPositive: true,
    icon: FiUsers,
    color: "text-purple-600 bg-purple-100 dark:bg-purple-900"
  },
  {
    title: "Taux de conversion",
    value: "3.2%",
    change: "-0.8%",
    isPositive: false,
    icon: FiTarget,
    color: "text-orange-600 bg-orange-100 dark:bg-orange-900"
  }
];

export const chartData: ChartData[] = [
  { month: "Jan", revenue: 45000, orders: 320, users: 1200 },
  { month: "Fév", revenue: 52000, orders: 380, users: 1350 },
  { month: "Mar", revenue: 48000, orders: 350, users: 1280 },
  { month: "Avr", revenue: 61000, orders: 420, users: 1500 },
  { month: "Mai", revenue: 55000, orders: 390, users: 1420 },
  { month: "Juin", revenue: 67000, orders: 450, users: 1650 }
];

export const recentOrders: RecentOrder[] = [
  {
    id: "#ORD-001",
    customer: "Marie Dubois",
    product: "Formation Premium",
    amount: 299,
    status: "completed",
    date: "2024-01-15"
  },
  {
    id: "#ORD-002",
    customer: "Jean Martin",
    product: "Pack Starter",
    amount: 149,
    status: "pending",
    date: "2024-01-14"
  },
  {
    id: "#ORD-003",
    customer: "Sophie Bernard",
    product: "Consultation",
    amount: 199,
    status: "completed",
    date: "2024-01-13"
  },
  {
    id: "#ORD-004",
    customer: "Pierre Durand",
    product: "Formation Avancée",
    amount: 399,
    status: "cancelled",
    date: "2024-01-12"
  }
];

export const activityItems: ActivityItem[] = [
  {
    id: "1",
    type: "order",
    title: "Nouvelle commande reçue",
    description: "#ORD-005 - €299 - Il y a 2 heures",
    time: "Il y a 2 heures",
    icon: FiTrendingUp,
    bgColor: "bg-green-100 dark:bg-green-900",
    iconColor: "text-green-600"
  },
  {
    id: "2",
    type: "user",
    title: "Nouveau client inscrit",
    description: "Sophie Martin - Il y a 4 heures",
    time: "Il y a 4 heures",
    icon: FiUsers,
    bgColor: "bg-blue-100 dark:bg-blue-900",
    iconColor: "text-blue-600"
  },
  {
    id: "3",
    type: "goal",
    title: "Objectif mensuel atteint",
    description: "120% de l'objectif - Il y a 1 jour",
    time: "Il y a 1 jour",
    icon: FiActivity,
    bgColor: "bg-purple-100 dark:bg-purple-900",
    iconColor: "text-purple-600"
  }
]; 