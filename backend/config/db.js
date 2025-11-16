import Database from "better-sqlite3";
const db = new Database("fin_genie.db");

db.exec(`
CREATE TABLE IF NOT EXISTS bills (
  id TEXT PRIMARY KEY,
  user_email TEXT,
  vendor TEXT, amount REAL, currency TEXT,
  due_date TEXT, category TEXT,
  late_fee_risk TEXT,
  price_delta_vs_last_month REAL,
  source_email_id TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);
`);

export default db;
