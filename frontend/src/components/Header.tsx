import { Mail, Moon, Sun, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

export const Header = () => {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };

  // Mock data - replace with real data from backend
  const totalBillsThisMonth = 12;
  const upcomingPaymentsCount = 3;

  return (
    <header className="sticky top-0 z-50 glass-effect border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Zap className="h-8 w-8 text-primary fill-primary" />
              <div className="absolute -top-1 -right-1 h-3 w-3 bg-accent rounded-full animate-pulse" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                BillSense
              </h1>
              <p className="text-xs text-muted-foreground">AI-powered bill tracker</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Badge variant="secondary" className="hidden sm:flex items-center gap-1.5">
              📊 {totalBillsThisMonth} bills this month
            </Badge>
            <Badge variant="destructive" className="hidden sm:flex items-center gap-1.5 animate-pulse-glow">
              ⏰ {upcomingPaymentsCount} upcoming
            </Badge>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full"
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>

            <Button className="gradient-primary shadow-lg hover:shadow-xl hover:scale-105 transition-all">
              <Mail className="mr-2 h-4 w-4" />
              Connect Email
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
