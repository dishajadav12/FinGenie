import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, DollarSign } from "lucide-react";

interface WeekBill {
  date: string;
  bills: Array<{
    vendor: string;
    amount: number;
  }>;
}

interface WeekCalendarProps {
  weekData: WeekBill[];
  totalOutflow: number;
}

export const WeekCalendar = ({ weekData, totalOutflow }: WeekCalendarProps) => {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <Card className="p-5 glass-effect h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold text-foreground">This Week's Bills</h2>
        </div>
        <Badge variant="destructive" className="text-lg px-3 py-1">
          <DollarSign className="h-4 w-4 mr-1" />
          {totalOutflow.toFixed(0)}
        </Badge>
      </div>

      <div className="grid grid-cols-7 gap-2 mb-4">
        {days.map((day, idx) => (
          <div key={day} className="text-center">
            <p className="text-xs font-medium text-muted-foreground mb-2">{day}</p>
            <div className={`aspect-square rounded-xl border-2 p-2 transition-all ${
              weekData[idx]?.bills.length > 0
                ? "border-primary bg-primary/5 hover:bg-primary/10"
                : "border-border bg-muted/20"
            }`}>
              {weekData[idx]?.bills.length > 0 ? (
                <div className="flex flex-col items-center justify-center h-full">
                  <span className="text-2xl font-bold text-primary">
                    {weekData[idx].bills.length}
                  </span>
                  <span className="text-xs text-muted-foreground mt-1">
                    ${weekData[idx].bills.reduce((sum, b) => sum + b.amount, 0).toFixed(0)}
                  </span>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  —
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-2 max-h-64 overflow-y-auto">
        {weekData.flatMap((day, dayIdx) =>
          day.bills.map((bill, billIdx) => (
            <div
              key={`${dayIdx}-${billIdx}`}
              className="flex items-center justify-between p-3 rounded-lg glass-effect hover:bg-muted/50 transition-smooth"
            >
              <div>
                <p className="font-medium text-foreground">{bill.vendor}</p>
                <p className="text-xs text-muted-foreground">{day.date}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-foreground">${bill.amount}</span>
                <Button size="sm" variant="ghost" className="h-8">
                  Pay
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </Card>
  );
};
