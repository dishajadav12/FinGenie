/**
 * API Service for FinGenie Backend
 * Handles all communication with the backend server
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

/**
 * Fetch bills from backend
 * GET /api/bills
 */
export const fetchBills = async () => {
  const response = await fetch(`${API_BASE_URL}/api/bills`);
  if (!response.ok) throw new Error("Failed to fetch bills");
  return response.json();
};

/**
 * Fetch weekly summary (upcoming payments in next 7 days)
 * GET /api/summary/week
 */
export const fetchWeeklySummary = async () => {
  const response = await fetch(`${API_BASE_URL}/api/summary/week`);
  if (!response.ok) throw new Error("Failed to fetch weekly summary");
  return response.json();
};

/**
 * Fetch recommendations for bills
 * GET /api/recommendations
 */
export const fetchRecommendations = async () => {
  const response = await fetch(`${API_BASE_URL}/api/recommendations`);
  if (!response.ok) throw new Error("Failed to fetch recommendations");
  return response.json();
};

/**
 * Ingest sample emails (for testing)
 * POST /demo/ingest
 */
export const ingestSampleEmails = async () => {
  const response = await fetch(`${API_BASE_URL}/demo/ingest`, {
    method: "POST",
  });
  if (!response.ok) throw new Error("Failed to ingest sample emails");
  return response.json();
};
