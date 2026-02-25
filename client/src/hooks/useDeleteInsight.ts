import { useInsightsStore } from "./useInsightsStore.ts";

const API_URL = import.meta.env.VITE_SERVER_URL;

export type DeleteInsightParams = {
  id: number;
};

export const useDeleteInsight = () => {
  const { removeInsight } = useInsightsStore();
  const deleteInsight = async ({ id }: DeleteInsightParams) => {
    await fetch(`${API_URL}/insights/${id}`, {
      method: "DELETE",
    });
    removeInsight(id);
  };

  return {
    deleteInsight,
  };
};
