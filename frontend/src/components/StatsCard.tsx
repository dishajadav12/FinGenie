import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: string;
  trend?: string;
  variant?: "default" | "success" | "warning";
  progress?: number;
}

export const StatsCard = ({ title, value, icon, trend, variant = "default", progress }: StatsCardProps) => {
  const variantStyles = {
    default: "border-primary/20",
    success: "border-success/30 bg-success/5",
    warning: "border-warning/30 bg-warning/5"
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -4 }}
    >
      <Card className={cn("p-4 glass-effect hover-lift", variantStyles[variant])}>
        <div className="flex items-start justify-between mb-2">
          <p className="text-sm text-muted-foreground">{title}</p>
          <span className="text-2xl">{icon}</span>
        </div>
        
        <div className="flex items-end justify-between">
          <p className="text-3xl font-bold text-foreground">{value}</p>
          {trend && (
            <span className="text-xs text-success font-medium">
              {trend}
            </span>
          )}
        </div>
        
        {progress !== undefined && (
          <Progress value={progress} className="h-2 mt-3" />
        )}
      </Card>
    </motion.div>
  );
};
