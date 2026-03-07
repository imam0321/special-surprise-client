import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  iconColorClass?: string;
  bgColorClass?: string;
  description?: string;
}

export default function StatCard({
  title,
  value,
  icon: Icon,
  iconColorClass = "text-surprise-pink",
  bgColorClass = "bg-surprise-pink/20",
  description,
}: StatCardProps) {
  return (
    <Card className="overflow-hidden border-none shadow-md hover:shadow-lg transition-shadow duration-300">
      <CardContent className="flex items-center p-6 bg-white dark:bg-slate-900">
        <div className={`${bgColorClass} p-4 rounded-2xl mr-5 transition-transform duration-300 hover:scale-110`}>
          <Icon size={26} className={iconColorClass} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400 truncate">{title}</p>
          <div className="flex items-baseline gap-1">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white truncate">
              {value}
            </h3>
          </div>
          {description && (
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-1 truncate">
              {description}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
