import { Request, Response, NextFunction } from "express";
import { RecipeService } from "./recipe.service.js";

export class RecipeController {
  private service: RecipeService;

  constructor() {
    this.service = new RecipeService();
  }

  // fully implemented
  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const filters = {
        page: req.query.page ? parseInt(req.query.page as string) : undefined,
        limit: req.query.limit
          ? parseInt(req.query.limit as string)
          : undefined,
        search: req.query.search as string,
        cuisine: req.query.cuisine as string,
        difficulty: req.query.difficulty as string,
        isVegetarian:
          req.query.isVegetarian === "true"
            ? true
            : req.query.isVegetarian === "false"
              ? false
              : undefined,
        sortBy: req.query.sortBy as string,
        sortOrder: (req.query.sortOrder as "asc" | "desc") || "desc",
      };

      const result = await this.service.getAllRecipes(filters);
      res.json(result);
    } catch (error) {
      next(error);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id, 10);
      const recipe = await this.service.getRecipeById(id);
      res.json(recipe);
    } catch (error) {
      next(error);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const recipe = await this.service.createRecipe(req.body);
      res.status(201).json(recipe);
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id, 10);
      const recipe = await this.service.updateRecipe(id, req.body);
      res.json(recipe);
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id, 10);
      await this.service.deleteRecipe(id);
      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  };
}
