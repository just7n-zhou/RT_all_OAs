import axios from "axios";
import type { DashboardStats } from "../types/dashboard.types";
import type { Recipe } from "../../recipes/types/recipe.types";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

export const dashboardApi = {
  getStats: async (): Promise<DashboardStats> => {
    const response = await fetch(`${API_URL}/stats`);

    if (!response.ok) {
      throw new Error("Failed to fetch dashboard stats");
    }

    return response.json();
  },

  getFeatured: async (): Promise<Recipe[]> => {
    const response = await axios.get<Recipe[]>(`${API_URL}/stats/featured`);
    return response.data;
  },
};
