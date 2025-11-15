// ============================================
// MOCK DATA FOR FINGINIE APP
// Replace these with real API calls to your backend
// ============================================

// MOCK USER DATA
export const mockUser = {
  name: "Alex Chen",
  email: "alex@gmail.com",
  connected: true,
  lastSync: "2 minutes ago",
  notificationCount: 3
};

// MOCK BILLS DATA
// AGENT 1 DATA ENDPOINT
// Replace with: GET /api/bills
// Expected format: [{ id, vendor, amount, dueDate, category, priceChange, logoUrl, paid }]
export const mockBills = [
  {
    id: 1,
    vendor: "Mint Mobile",
    amount: 55.00,
    dueDate: "2024-11-20",
    category: "phone",
    priceChange: 5.00,
    logo: "M",
    paid: false,
    urgency: "medium" as const
  },
  {
    id: 2,
    vendor: "PG&E",
    amount: 128.50,
    dueDate: "2024-11-18",
    category: "utilities",
    priceChange: null,
    logo: "P",
    paid: false,
    urgency: "high" as const
  },
  {
    id: 3,
    vendor: "Netflix",
    amount: 15.99,
    dueDate: "2024-11-25",
    category: "subscriptions",
    priceChange: null,
    logo: "N",
    paid: false,
    urgency: "low" as const
  },
  {
    id: 4,
    vendor: "Spotify",
    amount: 9.99,
    dueDate: "2024-11-22",
    category: "subscriptions",
    priceChange: null,
    logo: "S",
    paid: false,
    urgency: "low" as const
  },
  {
    id: 5,
    vendor: "AT&T Internet",
    amount: 65.00,
    dueDate: "2024-11-19",
    category: "internet",
    priceChange: 10.00,
    logo: "A",
    paid: false,
    urgency: "high" as const
  }
];

// AGENT 2 CALENDAR ENDPOINT
// Replace with: GET /api/calendar-events
// Expected format: [{ id, billId, vendor, amount, dueDate, paid, snoozed }]
export const mockWeekData = [
  { date: "Nov 18", bills: [{ id: 2, vendor: "PG&E", amount: 128.50 }] },
  { date: "Nov 19", bills: [{ id: 5, vendor: "AT&T Internet", amount: 65.00 }] },
  { date: "Nov 20", bills: [{ id: 1, vendor: "Mint Mobile", amount: 55.00 }] },
  { date: "Nov 21", bills: [] },
  { date: "Nov 22", bills: [{ id: 4, vendor: "Spotify", amount: 9.99 }] },
  { date: "Nov 23", bills: [] },
  { date: "Nov 24", bills: [] }
];

// MOCK SAVINGS DATA
// AGENT 3 SAVINGS ENDPOINT
// Replace with: GET /api/savings
// Expected format: [{ id, currentVendor, currentCost, alternative, newCost, yearlySavings, confidence, reasoning }]
export const mockSavings = [
  {
    id: 1,
    currentVendor: "Mint Mobile",
    currentPrice: 55,
    alternativeVendor: "Lyka Mobile",
    alternativePrice: 35,
    yearlySavings: 240,
    confidenceScore: 95,
    reasoning: ["Same T-Mobile coverage", "20GB data included", "No contract required", "Free international calls"]
  },
  {
    id: 2,
    currentVendor: "AT&T Internet",
    currentPrice: 65,
    alternativeVendor: "T-Mobile Home Internet",
    alternativePrice: 50,
    yearlySavings: 180,
    confidenceScore: 88,
    reasoning: ["Same speed tier", "No installation fees", "Price lock guarantee", "Free router included"]
  },
  {
    id: 3,
    currentVendor: "Netflix Standard",
    currentPrice: 15.99,
    alternativeVendor: "Netflix Basic",
    alternativePrice: 9.99,
    yearlySavings: 72,
    confidenceScore: 82,
    reasoning: ["Still HD quality", "Same content library", "Easy downgrade", "Can upgrade anytime"]
  }
];

// MOCK ACTIVITY DATA
// ACTIVITY FEED - REAL-TIME CONNECTION
// Replace with WebSocket: wss://your-backend/activity
// Or use polling: setInterval(fetchActivities, 5000)
// Consider using Campfire API for real-time feed
export const mockActivities = [
  {
    id: 1,
    agentNumber: 3 as const,
    action: "Found cheaper alternative for Mint Mobile - save $240/year",
    timestamp: "2 minutes ago",
    type: "savings" as const
  },
  {
    id: 2,
    agentNumber: 2 as const,
    action: "Created calendar reminder for PG&E payment on Nov 18",
    timestamp: "5 minutes ago",
    type: "reminder" as const
  },
  {
    id: 3,
    agentNumber: 1 as const,
    action: "Extracted bill from AT&T Internet - $65.00 due Nov 19",
    timestamp: "8 minutes ago",
    type: "scan" as const
  },
  {
    id: 4,
    agentNumber: 3 as const,
    action: "Analyzing AT&T Internet for better deals...",
    timestamp: "10 minutes ago",
    type: "savings" as const
  },
  {
    id: 5,
    agentNumber: 1 as const,
    action: "Scanning inbox... Found 5 new bills",
    timestamp: "15 minutes ago",
    type: "scan" as const
  },
  {
    id: 6,
    agentNumber: 2 as const,
    action: "Synced 3 bills with your Google Calendar",
    timestamp: "18 minutes ago",
    type: "reminder" as const
  }
];

// MOCK STATS DATA
export const mockStats = {
  totalBillsThisMonth: 12,
  upcomingPayments: 5,
  potentialSavings: 492,
  billsProcessed: 85, // percentage
  totalOutflowThisWeek: 258.49
};
