import { DashboardHeader } from "@/components/DashboardHeader";
import { BillCard } from "@/components/BillCard";
import { SavingsCard } from "@/components/SavingsCard";
import { ActivityFeedItem } from "@/components/ActivityFeedItem";
import { WeekCalendar } from "@/components/WeekCalendar";
import { SettingsModal } from "@/components/SettingsModal";
import { StatsCard } from "@/components/StatsCard";
import { Card } from "@/components/ui/card";
import { Inbox, TrendingDown, Activity } from "lucide-react";
import { mockBills, mockSavings, mockActivities, mockWeekData, mockStats } from "@/lib/mockData";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <DashboardHeader />
      
      <main className="container mx-auto px-4 py-8">
        {/* Stats Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatsCard
            title="Total Bills This Month"
            value={mockStats.totalBillsThisMonth}
            icon="📊"
            trend="+2"
          />
          <StatsCard
            title="Upcoming Payments"
            value={mockStats.upcomingPayments}
            icon="⏰"
            variant="warning"
          />
          <StatsCard
            title="Potential Savings"
            value={`$${mockStats.potentialSavings}`}
            icon="✨"
            variant="success"
          />
          <StatsCard
            title="Bills Processed"
            value={`${mockStats.billsProcessed}%`}
            icon="🔍"
            progress={mockStats.billsProcessed}
          />
        </div>

        {/* Three-column grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          
          {/* LEFT COLUMN - Inbox Activity */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Inbox className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-bold text-foreground">Inbox Activity</h2>
              <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
            </div>
            
            <Card className="p-4 glass-effect border-primary/20">
              <div className="flex items-center gap-2 mb-2">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                  <span className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: "0.2s" }} />
                  <span className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: "0.4s" }} />
                </div>
                <p className="text-sm text-muted-foreground">Scanning inbox...</p>
              </div>
              <p className="text-lg font-semibold text-foreground">✓ Found {mockBills.length} bills</p>
            </Card>

            {mockBills.map((bill) => (
              <BillCard key={bill.id} {...bill} />
            ))}
          </div>

          {/* MIDDLE COLUMN - This Week's Bills */}
          <div>
            <WeekCalendar 
              weekData={mockWeekData} 
              totalOutflow={mockStats.totalOutflowThisWeek} 
            />
          </div>

          {/* RIGHT COLUMN - Smart Savings */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <TrendingDown className="h-5 w-5 text-success" />
              <h2 className="text-xl font-bold text-foreground">Smart Savings</h2>
              <span className="text-2xl">💡</span>
            </div>

            {mockSavings.map((rec) => (
              <SavingsCard key={rec.id} {...rec} />
            ))}
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
