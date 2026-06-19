import axios from "axios";
import type { Recipe, RecipeFormData } from "../types/recipe.types";
import type { PaginatedResponse } from "../../../shared/types/api.types";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

export const recipeApi = {
  getAll: async (params?: {
    page?: number;
    limit?: number;
    search?: string;
    cuisine?: string;
    difficulty?: string;
    isVegetarian?: boolean;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
  }): Promise<PaginatedResponse<Recipe>> => {
    const response = await axios.get<PaginatedResponse<Recipe>>(
      `${API_URL}/recipes`,
      { params },
    );
    return response.data;
  },

  getById: async (id: number): Promise<Recipe> => {
    const response = await axios.get<Recipe>(`${API_URL}/recipes/${id}`);
    return response.data;
  },

  create: async (data: RecipeFormData): Promise<Recipe> => {
    const response = await axios.post<Recipe>(`${API_URL}/recipes`, data);
    return response.data;
  },

  update: async (
    id: number,
    data: Partial<RecipeFormData>,
  ): Promise<Recipe> => {
    const response = await axios.put<Recipe>(`${API_URL}/recipes/${id}`, data);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}/recipes/${id}`);
  },
};
