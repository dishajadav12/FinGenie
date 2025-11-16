import fs from "fs";

const PRICE_DB = JSON.parse(fs.readFileSync("data/prices.json", "utf-8"));

export function bestAlternative(bill) {
  const options = PRICE_DB[bill.category] || [];
  const cheaper = options.filter(o => o.vendor !== bill.vendor && o.price < bill.amount);
  if (!cheaper.length) return null;

  const alt = cheaper.reduce((m, x) => (x.price < m.price ? x : m), cheaper[0]);
  const monthly = +(bill.amount - alt.price).toFixed(2);
  const yearly = +(monthly * 12).toFixed(2);

  return {
    alt_vendor: alt.vendor,
    plan: alt.plan,
    alt_price: alt.price,
    monthly_savings: monthly,
    yearly_savings: yearly
  };
}
