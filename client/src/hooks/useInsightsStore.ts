import { create } from "zustand";
import type { Insight } from "../schemas/insight.ts";

const API_URL = import.meta.env.VITE_SERVER_URL;

type InsightsStore = {
  insights: Insight[];
  fetchInsights: () => Promise<void>;
  removeInsight: (id: number) => void;
};

export const useInsightsStore = create<InsightsStore>((set) => ({
  insights: [],
  fetchInsights: async () => {
    const results = await fetch(`${API_URL}/insights`)
      .then((res) => res.json());
    set({ insights: results });
  },
  removeInsight: (id: number) => {
    set((state) => ({
      insights: state.insights.filter((insight) => insight.id !== id),
    }));
  },
}));
