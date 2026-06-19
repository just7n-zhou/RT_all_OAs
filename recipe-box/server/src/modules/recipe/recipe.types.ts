export interface Ingredient {
  name: string;
  amount: string;
}

export interface RecipeFilters {
  page?: number;
  limit?: number;
  search?: string;
  cuisine?: string;
  difficulty?: string;
  isVegetarian?: boolean;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}
