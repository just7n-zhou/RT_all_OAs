import { useEffect, useState } from "react";
import { recipeApi } from "../api/recipeApi";
import type { Recipe } from "../types/recipe.types";
import type { PaginatedResponse } from "../../../shared/types/api.types";

interface UseRecipesParams {
  page?: number;
  limit?: number;
  search?: string;
  cuisine?: string;
  difficulty?: string;
  isVegetarian?: boolean;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export function useRecipes(params: UseRecipesParams) {
  const {
    page,
    limit,
    search,
    cuisine,
    difficulty,
    isVegetarian,
    sortBy,
    sortOrder,
  } = params;
  const [data, setData] = useState<PaginatedResponse<Recipe> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isActive = true;

    const fetchRecipes = async () => {
      try {
        setLoading(true);
        setError(null);
        const recipes = await recipeApi.getAll({
          page,
          limit,
          search,
          cuisine,
          difficulty,
          isVegetarian,
          sortBy,
          sortOrder,
        });

        if (isActive) {
          setData(recipes);
        }
      } catch (err) {
        if (isActive) {
          setError(
            err instanceof Error ? err.message : "Failed to fetch recipes",
          );
        }
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    };

    fetchRecipes();

    return () => {
      isActive = false;
    };
  }, [
    page,
    limit,
    search,
    cuisine,
    difficulty,
    isVegetarian,
    sortBy,
    sortOrder,
  ]);

  return { data, loading, error };
}
