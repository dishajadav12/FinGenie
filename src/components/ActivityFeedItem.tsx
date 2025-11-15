import { Bot, Sparkles, Bell, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface ActivityFeedItemProps {
  agentNumber: 1 | 2 | 3;
  action: string;
  timestamp: string;
  type: "scan" | "reminder" | "savings";
}

export const ActivityFeedItem = ({ agentNumber, action, timestamp, type }: ActivityFeedItemProps) => {
  const agentColors = {
    1: "from-primary to-secondary",
    2: "from-warning to-destructive",
    3: "from-success to-accent",
  };

  const agentIcons = {
    scan: Bot,
    reminder: Bell,
    savings: TrendingDown,
  };

  const Icon = agentIcons[type];

  const agentEmojis = {
    1: "🔍",
    2: "📅",
    3: "💡",
  };

  return (
    <div className="flex items-start gap-3 p-3 rounded-xl glass-effect hover:bg-muted/50 transition-smooth animate-slide-up group">
      <div className={cn(
        "w-10 h-10 rounded-full flex items-center justify-center text-lg shrink-0 bg-gradient-to-br",
        agentColors[agentNumber]
      )}>
        {agentEmojis[agentNumber]}
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <Icon className="h-4 w-4 text-muted-foreground" />
          <span className="text-xs font-medium text-muted-foreground">Agent {agentNumber}</span>
          <span className="text-xs text-muted-foreground">•</span>
          <span className="text-xs text-muted-foreground">{timestamp}</span>
        </div>
        <p className="text-sm text-foreground group-hover:text-primary transition-colors">
          {action}
        </p>
      </div>

      {type === "savings" && (
        <Sparkles className="h-4 w-4 text-success animate-pulse" />
      )}
    </div>
  );
};
