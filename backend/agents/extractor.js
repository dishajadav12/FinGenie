import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();

/**
 * Set to true to bypass LiquidMetal and use a lightweight regex/date parser.
 * Useful if you don't have an API key during development.
 */
const MOCK_EXTRACTOR = false;

function regexFallback(email) {
  // Tiny heuristic extractor for demo
  const body = `${email.subject}\n${email.body}`;
  const amtMatch = body.match(/(?:USD|\$)\s?([0-9][0-9,]*\.?[0-9]*)/i);
  const amount = amtMatch ? parseFloat(amtMatch[1].replace(/,/g, "")) : null;

  const dueLine = (body.match(/(due[^.\n]*[0-9]{1,2}[^0-9a-zA-Z]{0,3}(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec|[0-9]{1,2})[^.\n]*)/i) || [])[1] || "";
  // Very rough date guess; for demo you can just return as-is
  const due_date = (body.match(/\b(20[2-5][0-9]-[01][0-9]-[0-3][0-9])\b/) || [])[1] || "";

  const known = {
    "comcast": ["internet","Comcast"],
    "xfinity": ["internet","Comcast"],
    "pg&e": ["utilities","PG&E"],
    "pge": ["utilities","PG&E"],
    "mint": ["phone","Mint Mobile"],
    "t-mobile": ["phone","T-Mobile"],
    "netflix": ["streaming","Netflix"]
  };

  let vendor = "Unknown", category = "other";
  for (const k of Object.keys(known)) {
    if (body.toLowerCase().includes(k)) {
      category = known[k][0];
      vendor = known[k][1];
      break;
    }
  }

  const late_fee_risk = due_date ? "low" : "medium";

  return {
    vendor,
    amount: amount ?? 0,
    currency: "USD",
    due_date,               // empty string is OK in demo
    category,
    late_fee_risk,
    price_delta_vs_last_month: 0.0
  };
}

export async function extractBill(email) {
  if (MOCK_EXTRACTOR || !process.env.LIQUIDMETAL_API_KEY) {
    return { ...regexFallback(email), source_email_id: email.id };
  }

  const prompt = `
Extract bill details from this email and return JSON:
{"vendor":"","amount":0.0,"currency":"USD","due_date":"","category":"","late_fee_risk":"","price_delta_vs_last_month":0.0}
- due_date must be YYYY-MM-DD if possible, else "".
Email:
From: ${email.from}
Subject: ${email.subject}
Body:
${email.body}
  `.trim();

  const resp = await fetch(`${process.env.LIQUIDMETAL_URL}/v1/extract`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.LIQUIDMETAL_API_KEY}`
    },
    body: JSON.stringify({
      instruction: "bill_extraction_v1",
      input: prompt
    })
  });

  if (!resp.ok) {
    console.error("LiquidMetal error, falling back to regex...");
    return { ...regexFallback(email), source_email_id: email.id };
  }

  const data = await resp.json();
  return { ...data, source_email_id: email.id };
}
