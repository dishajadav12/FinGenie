/**
 * API Client for FinGenie Backend
 * Handles all HTTP requests to the backend API
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

/**
 * Generic fetch wrapper with error handling
 */
async function apiFetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  try {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`API request failed for ${endpoint}:`, error);
    throw error;
  }
}

/**
 * Fetch all bills from the backend
 * GET /api/bills
 */
export async function fetchBills() {
  return apiFetch("/api/bills");
}

/**
 * Fetch weekly summary (upcoming bills count and total outflow)
 * GET /api/summary/week
 */
export async function fetchWeeklySummary() {
  return apiFetch("/api/summary/week");
}

/**
 * Fetch cost-saving recommendations
 * GET /api/recommendations
 */
export async function fetchRecommendations() {
  return apiFetch("/api/recommendations");
}

/**
 * Ingest sample emails for testing
 * POST /demo/ingest
 */
export async function ingestSampleEmails() {
  return apiFetch("/demo/ingest", {
    method: "POST",
    body: JSON.stringify({}),
  });
}
