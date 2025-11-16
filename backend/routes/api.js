import express from "express";
import crypto from "crypto";

const router = express.Router();

// Mock data for bills
const mockBills = [
  {
    id: crypto.randomUUID(),
    user_email: 'demo@user.com',
    vendor: 'Xfinity',
    amount: 75.0,
    currency: 'USD',
    due_date: '2025-11-17',
    category: 'utilities',
    late_fee_risk: 'medium',
    price_delta_vs_last_month: 0,
    source_email_id: 'eml-001'
  },
  {
    id: crypto.randomUUID(),
    user_email: 'demo@user.com',
    vendor: 'Mint Mobile',
    amount: 55.0,
    currency: 'USD',
    due_date: '2025-11-19',
    category: 'mobile',
    late_fee_risk: 'low',
    price_delta_vs_last_month: 0,
    source_email_id: 'eml-002'
  },
  {
    id: crypto.randomUUID(),
    user_email: 'demo@user.com',
    vendor: 'PG&E',
    amount: 120.0,
    currency: 'USD',
    due_date: '2025-11-21',
    category: 'utilities',
    late_fee_risk: 'high',
    price_delta_vs_last_month: 10,
    source_email_id: 'eml-003'
  },
  {
    id: crypto.randomUUID(),
    user_email: 'demo@user.com',
    vendor: 'Netflix',
    amount: 15.99,
    currency: 'USD',
    due_date: '2025-11-25',
    category: 'entertainment',
    late_fee_risk: 'low',
    price_delta_vs_last_month: 0,
    source_email_id: 'eml-004'
  },
  {
    id: crypto.randomUUID(),
    user_email: 'demo@user.com',
    vendor: 'Spotify',
    amount: 9.99,
    currency: 'USD',
    due_date: '2025-11-22',
    category: 'entertainment',
    late_fee_risk: 'low',
    price_delta_vs_last_month: 0,
    source_email_id: 'eml-005'
  },
  {
    id: crypto.randomUUID(),
    user_email: 'demo@user.com',
    vendor: 'AT&T Internet',
    amount: 65.0,
    currency: 'USD',
    due_date: '2025-11-18',
    category: 'internet',
    late_fee_risk: 'high',
    price_delta_vs_last_month: 10,
    source_email_id: 'eml-006'
  },
  {
    id: crypto.randomUUID(),
    user_email: 'demo@user.com',
    vendor: 'Chase Card',
    amount: 210.45,
    currency: 'USD',
    due_date: '2025-11-20',
    category: 'credit',
    late_fee_risk: 'medium',
    price_delta_vs_last_month: -5,
    source_email_id: 'eml-007'
  }
];

// Mock data for recommendations
const mockRecommendations = [
  {
    id: crypto.randomUUID(),
    current_vendor: 'Mint Mobile',
    current_cost: 55,
    alternative_vendor: 'Lyka Mobile',
    new_cost: 35,
    confidence: 95,
    reasoning: ['Same T-Mobile coverage', '20GB data included', 'No contract required']
  },
  {
    id: crypto.randomUUID(),
    current_vendor: 'Netflix',
    current_cost: 15.99,
    alternative_vendor: 'Netflix Basic',
    new_cost: 9.99,
    confidence: 82,
    reasoning: ['Still HD quality', 'Same content library', 'Easy downgrade']
  }
];

// List all bills (returns mock data)
router.get("/bills", (req, res) => {
  res.json(mockBills);
});

// Summary for next 7 days (returns mock data)
router.get("/summary/week", (req, res) => {
  const today = new Date();
  const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
  
  const billsThisWeek = mockBills.filter(bill => {
    const dueDate = new Date(bill.due_date);
    return dueDate >= today && dueDate <= nextWeek;
  });
  
  const totalOutflow = billsThisWeek.reduce((sum, bill) => sum + bill.amount, 0);
  
  res.json({
    count: billsThisWeek.length,
    total_outflow: totalOutflow
  });
});

// Generate recommendations (returns mock data)
router.get("/recommendations", (req, res) => {
  res.json(mockRecommendations);
});

export default router;
