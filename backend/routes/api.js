import express from "express";
import db from "../config/db.js";
import crypto from "crypto";
import { bestAlternative } from "../agents/recommender.js";

const router = express.Router();

// List all bills (for Lovable UI)
router.get("/bills", (req, res) => {
  const rows = db.prepare("SELECT * FROM bills ORDER BY due_date, created_at DESC").all();
  res.json(rows);
});

// Summary for next 7 days
router.get("/summary/week", (req, res) => {
  const row = db.prepare(`
    SELECT COUNT(*) as count, IFNULL(SUM(amount),0) as total_outflow
    FROM bills
    WHERE (due_date != '' AND date(due_date) BETWEEN date('now') AND date('now','+7 day'))
  `).get();
  res.json(row);
});

// Generate recommendations (on the fly) for each bill
router.get("/recommendations", (req, res) => {
  const bills = db.prepare("SELECT * FROM bills").all();
  const recs = [];
  for (const b of bills) {
    const alt = bestAlternative(b);
    if (!alt) continue;
    recs.push({
      id: crypto.randomUUID(),
      bill_id: b.id,
      ...alt
    });
  }
  res.json(recs);
});

export default router;
