import { useState } from "react";
import { AlertCircle, Calendar, ChevronDown, ChevronUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface BillCardProps {
  vendor: string;
  amount: number;
  dueDate: string;
  category: string;
  urgency: "low" | "medium" | "high";
  priceChanged?: number | boolean;
}

export const BillCard = ({ vendor, amount, dueDate, category, urgency, priceChanged }: BillCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const urgencyColors = {
    low: "bg-success/10 text-success border-success/20",
    medium: "bg-warning/10 text-warning border-warning/20",
    high: "bg-destructive/10 text-destructive border-destructive/20",
  };

  const categoryEmojis: Record<string, string> = {
    utilities: "💡",
    subscriptions: "📺",
    phone: "📱",
    internet: "🌐",
    insurance: "🛡️",
  };

  const getDaysUntilDue = () => {
    const due = new Date(dueDate);
    const today = new Date();
    const diff = Math.ceil((due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return diff;
  };

  const daysUntil = getDaysUntilDue();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card 
        className="p-4 hover-lift glass-effect cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-2xl">
              {categoryEmojis[category] || "💳"}
            </div>
            <div>
              <h3 className="font-semibold text-foreground">{vendor}</h3>
              <Badge variant="secondary" className="text-xs mt-1">
                {category}
              </Badge>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {priceChanged && (
              <AlertCircle className="h-5 w-5 text-warning animate-pulse" />
            )}
            {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </div>
        </div>

        <div className="flex items-end justify-between">
          <div>
            <p className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              ${amount.toFixed(2)}
            </p>
            <div className="flex items-center gap-1.5 mt-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className={cn(
                "text-sm font-medium",
                daysUntil <= 2 ? "text-destructive" : "text-muted-foreground"
              )}>
                {daysUntil > 0 ? `Due in ${daysUntil} days` : daysUntil === 0 ? "Due today" : "Overdue"}
              </span>
            </div>
          </div>
          <Badge className={cn("border", urgencyColors[urgency])}>
            {urgency === "high" ? "🔥 Urgent" : urgency === "medium" ? "⚠️ Soon" : "✅ Ok"}
          </Badge>
        </div>

        {priceChanged && typeof priceChanged === 'number' && (
          <div className="mt-3 pt-3 border-t border-border">
            <p className="text-xs text-warning flex items-center gap-1">
              <AlertCircle className="h-3 w-3" />
              Price increased by ${priceChanged.toFixed(2)} from last month
            </p>
          </div>
        )}

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="mt-4 pt-4 border-t border-border space-y-2">
                <Button variant="default" className="w-full" size="sm">
                  Mark as Paid
                </Button>
                <Button variant="ghost" className="w-full" size="sm">
                  View in Gmail
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  );
};
