import { RecipeRepository } from "./recipe.repository.js";
import { RecipeFilters } from "./recipe.types.js";
import { NotFoundError } from "../../shared/errors.js";
import { PaginatedResponse } from "../../shared/types.js";
import { Recipe } from "../../db/schema.js";
import { createRecipeSchema, updateRecipeSchema } from "./recipe.schema.js";

export class RecipeService {
  private repository: RecipeRepository;

  constructor() {
    this.repository = new RecipeRepository();
  }

  async getAllRecipes(
    filters: RecipeFilters,
  ): Promise<PaginatedResponse<Recipe>> {
    const page = Math.max(1, filters.page || 1);
    const limit = Math.min(50, Math.max(1, filters.limit || 10));

    const sanitizedFilters = {
      ...filters,
      page,
      limit,
    };

    const { data, totalCount } =
      await this.repository.findAll(sanitizedFilters);
    const totalPages = Math.ceil(totalCount / limit);

    return {
      data,
      page,
      limit,
      totalPages,
      totalCount,
    };
  }

  async getRecipeById(id: number): Promise<Recipe> {
    const recipe = await this.repository.findById(id);

    if (!recipe) {
      throw new NotFoundError(`Recipe with ID ${id} not found`);
    }

    return recipe;
  }

  async createRecipe(data: any): Promise<Recipe> {
    const validatedData = createRecipeSchema.parse(data);
    const now = new Date();

    return this.repository.create({
      ...validatedData,
      createdAt: now,
      updatedAt: now,
    });
  }

  async updateRecipe(id: number, data: any): Promise<Recipe> {
    await this.getRecipeById(id);

    const validatedData = updateRecipeSchema.parse(data);

    return this.repository.update(id, {
      ...validatedData,
      updatedAt: new Date(),
    });
  }

  async deleteRecipe(id: number): Promise<void> {
    await this.getRecipeById(id);
    await this.repository.delete(id);
  }
}
