import { DashboardHeader } from "@/components/DashboardHeader";
import { BillCard } from "@/components/BillCard";
import { SavingsCard } from "@/components/SavingsCard";
import { ActivityFeedItem } from "@/components/ActivityFeedItem";
import { WeekCalendar } from "@/components/WeekCalendar";
import { SettingsModal } from "@/components/SettingsModal";
import { StatsCard } from "@/components/StatsCard";
import { Card } from "@/components/ui/card";
import { Inbox, TrendingDown, Activity, Loader2 } from "lucide-react";
import { useBills, useWeeklySummary, useRecommendations } from "@/hooks/useApi";
import { mockActivities } from "@/lib/mockData";
import { useMemo } from "react";

const Dashboard = () => {
  // Fetch data from API
  const { data: bills = [], isLoading: billsLoading, error: billsError } = useBills();
  const { data: weeklySummary = {}, isLoading: summaryLoading } = useWeeklySummary();
  const { data: recommendations = [], isLoading: recsLoading } = useRecommendations();

  // Calculate stats from API data
  const stats = useMemo(() => {
    const totalBills = bills.length;
    const upcomingBills = weeklySummary?.count || 0;
    const totalOutflow = weeklySummary?.total_outflow || 0;
    const potentialSavings = recommendations.reduce(
      (sum, rec) => sum + (rec.yearlySavings || rec.new_cost ? (rec.current_cost - rec.new_cost) * 12 : 0),
      0
    );

    return {
      totalBills,
      upcomingBills,
      potentialSavings: Math.round(potentialSavings),
      totalOutflow,
    };
  }, [bills, weeklySummary, recommendations]);

  // Transform bills data for week calendar
  const weekData = useMemo(() => {
    const today = new Date();
    const weekDates = Array.from({ length: 7 }, (_, i) => {
      const date = new Date(today);
      date.setDate(date.getDate() + i);
      return date;
    });

    return weekDates.map((date) => {
      const dateStr = date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
      const billsOnDate = bills.filter((bill) => {
        const billDate = new Date(bill.due_date);
        return billDate.toDateString() === date.toDateString();
      });

      return {
        date: dateStr,
        bills: billsOnDate.map((b) => ({
          id: b.id,
          vendor: b.vendor,
          amount: b.amount,
        })),
      };
    });
  }, [bills]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <DashboardHeader />
      
      <main className="container mx-auto px-4 py-8">
        {/* Error Message */}
        {billsError && (
          <Card className="p-4 mb-8 bg-destructive/10 border-destructive/50">
            <p className="text-destructive font-semibold">⚠️ Failed to load data</p>
            <p className="text-sm text-destructive/80">Make sure the backend is running at http://localhost:8080</p>
          </Card>
        )}

        {/* Stats Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatsCard
            title="Total Bills"
            value={billsLoading ? "..." : stats.totalBills}
            icon="📊"
          />
          <StatsCard
            title="Upcoming Payments"
            value={summaryLoading ? "..." : stats.upcomingBills}
            icon="⏰"
            variant="warning"
          />
          <StatsCard
            title="Potential Savings"
            value={recsLoading ? "..." : `$${stats.potentialSavings}`}
            icon="✨"
            variant="success"
          />
          <StatsCard
            title="This Week Total"
            value={summaryLoading ? "..." : `$${stats.totalOutflow.toFixed(2)}`}
            icon="💰"
          />
        </div>

        {/* Three-column grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          
          {/* LEFT COLUMN - Inbox Activity */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Inbox className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-bold text-foreground">Bills Inbox</h2>
              <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
            </div>
            
            {billsLoading ? (
              <Card className="p-4 glass-effect border-primary/20">
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin text-primary" />
                  <p className="text-sm text-muted-foreground">Loading bills...</p>
                </div>
              </Card>
            ) : (
              <>
                <Card className="p-4 glass-effect border-primary/20">
                  <p className="text-lg font-semibold text-foreground">✓ Found {bills.length} bills</p>
                </Card>

                {bills.length > 0 ? (
                  bills.map((bill) => (
                    <BillCard
                      key={bill.id}
                      id={bill.id}
                      vendor={bill.vendor}
                      amount={bill.amount}
                      dueDate={bill.due_date}
                      category={bill.category}
                      priceChange={bill.price_delta_vs_last_month}
                      logo={bill.vendor.charAt(0).toUpperCase()}
                      paid={false}
                      urgency={
                        bill.late_fee_risk === "high"
                          ? "high"
                          : bill.late_fee_risk === "medium"
                          ? "medium"
                          : "low"
                      }
                    />
                  ))
                ) : (
                  <Card className="p-4 glass-effect border-primary/20">
                    <p className="text-sm text-muted-foreground text-center">No bills found. Try ingesting sample data.</p>
                  </Card>
                )}
              </>
            )}
          </div>

          {/* MIDDLE COLUMN - This Week's Bills */}
          <div>
            {summaryLoading ? (
              <Card className="p-4 glass-effect">
                <div className="flex items-center gap-2 justify-center h-64">
                  <Loader2 className="h-4 w-4 animate-spin text-primary" />
                </div>
              </Card>
            ) : (
              <WeekCalendar 
                weekData={weekData}
                totalOutflow={stats.totalOutflow}
              />
            )}
          </div>

          {/* RIGHT COLUMN - Smart Savings */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <TrendingDown className="h-5 w-5 text-success" />
              <h2 className="text-xl font-bold text-foreground">Smart Savings</h2>
              <span className="text-2xl">💡</span>
            </div>

            {recsLoading ? (
              <Card className="p-4 glass-effect">
                <div className="flex items-center gap-2 justify-center h-32">
                  <Loader2 className="h-4 w-4 animate-spin text-primary" />
                </div>
              </Card>
            ) : recommendations.length > 0 ? (
              recommendations.map((rec) => (
                <SavingsCard
                  key={rec.id}
                  id={rec.id}
                  currentVendor={rec.current_vendor}
                  currentPrice={rec.current_cost}
                  alternativeVendor={rec.alternative_vendor}
                  alternativePrice={rec.new_cost}
                  yearlySavings={Math.round((rec.current_cost - rec.new_cost) * 12)}
                  confidenceScore={rec.confidence || 85}
                  reasoning={rec.reasoning || ["Cost savings", "Same quality"]}
                />
              ))
            ) : (
              <Card className="p-4 glass-effect border-primary/20">
                <p className="text-sm text-muted-foreground text-center">No savings recommendations yet.</p>
              </Card>
            )}
          </div>
        </div>

        {/* BOTTOM SECTION - Agent Activity Feed */}
        <div className="mt-8">
          <div className="flex items-center gap-2 mb-4">
            <Activity className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-bold text-foreground">Agent Activity Feed</h2>
            <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
            <span className="text-sm text-muted-foreground">Real-time updates</span>
          </div>
          
          <Card className="p-4 glass-effect">
            <div className="space-y-2">
              {mockActivities.map((activity) => (
                <ActivityFeedItem key={activity.id} {...activity} />
              ))}
            </div>
          </Card>
        </div>
      </main>

      <SettingsModal />
    </div>
  );
};

export default Dashboard;
