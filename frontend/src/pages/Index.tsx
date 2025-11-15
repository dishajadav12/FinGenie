import { Header } from "@/components/Header";
import { BillCard } from "@/components/BillCard";
import { SavingsCard } from "@/components/SavingsCard";
import { ActivityFeedItem } from "@/components/ActivityFeedItem";
import { WeekCalendar } from "@/components/WeekCalendar";
import { SettingsModal } from "@/components/SettingsModal";
import { Card } from "@/components/ui/card";
import { Inbox, TrendingDown, Activity } from "lucide-react";

const Index = () => {
  // MOCK DATA - Replace with real API data from your backend agents
  
  // AGENT 1 DATA ENDPOINT - Email scanning results
  const inboxBills = [
    {
      vendor: "Mint Mobile",
      amount: 55.00,
      dueDate: "May 20, 2024",
      category: "phone",
      urgency: "medium" as const,
      priceChanged: true,
    },
    {
      vendor: "Netflix",
      amount: 15.99,
      dueDate: "May 18, 2024",
      category: "subscriptions",
      urgency: "high" as const,
    },
    {
      vendor: "Electric Company",
      amount: 125.50,
      dueDate: "May 25, 2024",
      category: "utilities",
      urgency: "low" as const,
    },
  ];

  // AGENT 2 DATA ENDPOINT - Calendar and bill schedule
  const weekData = [
    { date: "May 13", bills: [] },
    { date: "May 14", bills: [] },
    { date: "May 15", bills: [{ vendor: "Spotify", amount: 9.99 }] },
    { date: "May 16", bills: [] },
    { date: "May 17", bills: [{ vendor: "Netflix", amount: 15.99 }, { vendor: "Adobe", amount: 54.99 }] },
    { date: "May 18", bills: [] },
    { date: "May 19", bills: [{ vendor: "Mint Mobile", amount: 55.00 }] },
  ];

  const totalOutflow = weekData.reduce(
    (sum, day) => sum + day.bills.reduce((daySum, bill) => daySum + bill.amount, 0),
    0
  );

  // AGENT 3 DATA ENDPOINT - Savings recommendations
  const savingsRecommendations = [
    {
      currentVendor: "Mint Mobile",
      currentPrice: 55,
      alternativeVendor: "Visible",
      alternativePrice: 25,
      yearlySavings: 360,
      confidenceScore: 92,
    },
    {
      currentVendor: "Netflix Standard",
      currentPrice: 15.99,
      alternativeVendor: "Netflix Basic",
      alternativePrice: 9.99,
      yearlySavings: 72,
      confidenceScore: 85,
    },
  ];

  // ALL AGENTS ACTIVITY FEED DATA ENDPOINT
  const activityFeed = [
    {
      agentNumber: 3 as const,
      action: "Found cheaper alternative for Mint Mobile - save $360/year",
      timestamp: "2 min ago",
      type: "savings" as const,
    },
    {
      agentNumber: 2 as const,
      action: "Created calendar reminder for Netflix payment on 5/18",
      timestamp: "5 min ago",
      type: "reminder" as const,
    },
    {
      agentNumber: 1 as const,
      action: "Extracted bill from Electric Company - $125.50 due 5/25",
      timestamp: "12 min ago",
      type: "scan" as const,
    },
    {
      agentNumber: 1 as const,
      action: "Scanning inbox... Found 3 new bills",
      timestamp: "15 min ago",
      type: "scan" as const,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
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
              <p className="text-sm text-muted-foreground mb-2">🔍 Scanning inbox...</p>
              <p className="text-lg font-semibold text-foreground">Found {inboxBills.length} bills</p>
            </Card>

            {inboxBills.map((bill, idx) => (
              <BillCard key={idx} {...bill} />
            ))}
          </div>

          {/* MIDDLE COLUMN - This Week's Bills */}
          <div>
            <WeekCalendar weekData={weekData} totalOutflow={totalOutflow} />
          </div>

          {/* RIGHT COLUMN - Smart Savings */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <TrendingDown className="h-5 w-5 text-success" />
              <h2 className="text-xl font-bold text-foreground">Smart Savings</h2>
              <span className="text-2xl">💡</span>
            </div>

            {savingsRecommendations.map((rec, idx) => (
              <SavingsCard key={idx} {...rec} />
            ))}
          </div>
        </div>

        {/* BOTTOM SECTION - Agent Activity Feed */}
        <div className="mt-8">
          <div className="flex items-center gap-2 mb-4">
            <Activity className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-bold text-foreground">Agent Activity Feed</h2>
            <span className="text-sm text-muted-foreground">Real-time updates</span>
          </div>
          
          <Card className="p-4 glass-effect">
            <div className="space-y-2">
              {activityFeed.map((activity, idx) => (
                <ActivityFeedItem key={idx} {...activity} />
              ))}
            </div>
          </Card>
        </div>
      </main>

      <SettingsModal />
    </div>
  );
};

export default Index;
