const API_URL = import.meta.env.VITE_SERVER_URL;

export type AddInsightParams = {
  brandId: number;
  text: string;
};

export const useAddInsight = () => {
  const addInsight = async (newInsight: AddInsightParams) => {
    await fetch(`${API_URL}/insights`, {
      method: "POST",
      body: JSON.stringify(newInsight),
    });
  };

  return {
    addInsight,
  };
};
