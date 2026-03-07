import { LucideIcon } from "lucide-react";
import StatCard from "./StatCard";

export interface DashboardStat {
  title: string;
  value: string | number;
  icon: LucideIcon;
  iconColorClass?: string;
  bgColorClass?: string;
  description?: string;
}

interface StatsGridProps {
  stats: DashboardStat[];
  gridCols?: string;
}

export default function StatsGrid({
  stats,
  gridCols = "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
}: StatsGridProps) {
  return (
    <div className={`grid ${gridCols} gap-6 mb-8`}>
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
}
