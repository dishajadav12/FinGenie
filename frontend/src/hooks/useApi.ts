/**
 * Custom React Query Hooks for FinGenie API
 * These hooks handle data fetching, caching, and state management
 */

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchBills, fetchRecommendations, fetchWeeklySummary, ingestSampleEmails } from "./api";

// Query keys
export const queryKeys = {
  bills: ["bills"],
  weeklySummary: ["weeklySummary"],
  recommendations: ["recommendations"],
  all: ["api"],
};

/**
 * Hook to fetch bills
 * Refetch every 30 seconds for real-time updates
 */
export const useBills = () => {
  return useQuery({
    queryKey: queryKeys.bills,
    queryFn: fetchBills,
    refetchInterval: 30000, // Refetch every 30 seconds
    staleTime: 25000, // Data is fresh for 25 seconds
  });
};

/**
 * Hook to fetch weekly summary
 */
export const useWeeklySummary = () => {
  return useQuery({
    queryKey: queryKeys.weeklySummary,
    queryFn: fetchWeeklySummary,
    refetchInterval: 30000,
    staleTime: 25000,
  });
};

/**
 * Hook to fetch recommendations
 * Refetch every 1 minute
 */
export const useRecommendations = () => {
  return useQuery({
    queryKey: queryKeys.recommendations,
    queryFn: fetchRecommendations,
    refetchInterval: 60000, // Refetch every 1 minute
    staleTime: 55000, // Data is fresh for 55 seconds
  });
};

/**
 * Hook to ingest sample emails (mutation)
 * Use this to trigger sample data import
 */
export const useIngestSampleEmails = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ingestSampleEmails,
    onSuccess: () => {
      // Invalidate all queries to refetch fresh data
      queryClient.invalidateQueries({ queryKey: queryKeys.all });
    },
  });
};
