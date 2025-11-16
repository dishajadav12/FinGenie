import db from "../config/db.js";
import { extractBill } from "./extractor.js";
import crypto from "crypto";

export async function processEmail(email) {
  const bill = await extractBill(email);

  // Ensure required fields exist
  const row = {
    id: crypto.randomUUID(),
    user_email: email.email || "demo@user.com",
    vendor: bill.vendor || "Unknown",
    amount: Number(bill.amount ?? 0),
    currency: bill.currency || "USD",
    due_date: bill.due_date || "",
    category: bill.category || "other",
    late_fee_risk: bill.late_fee_risk || "low",
    price_delta_vs_last_month: Number(bill.price_delta_vs_last_month ?? 0),
    source_email_id: email.id
  };

  const stmt = db.prepare(`
    INSERT OR IGNORE INTO bills
    (id, user_email, vendor, amount, currency, due_date, category, late_fee_risk, price_delta_vs_last_month, source_email_id)
    VALUES (@id, @user_email, @vendor, @amount, @currency, @due_date, @category, @late_fee_risk, @price_delta_vs_last_month, @source_email_id)
  `);
  stmt.run(row);

  console.log("✅ Bill saved:", row.vendor, `$${row.amount}`);
  return row;
}
