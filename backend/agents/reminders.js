export function buildEventFromBill(bill) {
  // Simulate a calendar event (you can persist to DB if you add an `events` table)
  const title = `Pay ${bill.vendor} $${bill.amount}`;
  const date = bill.due_date || "(no date parsed)";
  const reminders = ["48h before"];
  if (bill.late_fee_risk === "high") reminders.push("12h before");
  return { title, date, reminders };
}
