import express from "express";
import fs from "fs";
import { processEmail } from "../agents/processEmail.js";

const router = express.Router();

/**
 * POST /demo/ingest
 * Reads data/sample_emails.json and processes each email through the extractor.
 */
router.post("/demo/ingest", async (req, res) => {
  const raw = fs.readFileSync("data/sample_emails.json", "utf-8");
  const emails = JSON.parse(raw);
  const results = [];
  for (const e of emails) {
    const row = await processEmail(e);
    results.push(row);
  }
  res.json({ ingested: results.length, bills: results });
});

/**
 * POST /demo/reset
 * Deletes the SQLite file (fresh start).
 */
router.post("/demo/reset", (req, res) => {
  try {
    fs.existsSync("fin_genie.db") && fs.unlinkSync("fin_genie.db");
    res.json({ ok: true, message: "Database removed. Restart the server to re-create tables." });
  } catch (e) {
    res.status(500).json({ ok: false, error: String(e) });
  }
});

export default router;
