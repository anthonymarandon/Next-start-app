import { ComponentType } from "react";

export interface Metric {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: ComponentType<{ className?: string }>;
  color: string;
}

export interface ChartData {
  month: string;
  revenue: number;
  orders: number;
  users: number;
}

export interface RecentOrder {
  id: string;
  customer: string;
  product: string;
  amount: number;
  status: "completed" | "pending" | "cancelled";
  date: string;
}

export interface ActivityItem {
  id: string;
  type: "order" | "user" | "goal";
  title: string;
  description: string;
  time: string;
  icon: ComponentType<{ className?: string }>;
  bgColor: string;
  iconColor: string;
} 