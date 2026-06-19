import { z } from 'zod';

const ingredientSchema = z.object({
  name: z.string().min(1, 'Ingredient name is required'),
  amount: z.string().min(1, 'Ingredient amount is required'),
});

export const createRecipeSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(1, 'Description is required'),
  cuisine: z.enum(['Chinese', 'Japanese', 'Italian', 'Mexican', 'American', 'Indian', 'French', 'Thai', 'Other']),
  difficulty: z.enum(['Easy', 'Medium', 'Hard']),
  prepTimeMinutes: z.number().int().positive('Prep time must be positive'),
  cookTimeMinutes: z.number().int().min(0, 'Cook time must be non-negative'),
  servings: z.number().int().positive('Servings must be positive'),
  isVegetarian: z.boolean().default(false),
  ingredients: z.array(ingredientSchema).min(1, 'At least one ingredient is required'),
  instructions: z.string().min(1, 'Instructions are required'),
  imageUrl: z.string().url().optional().or(z.literal('')),
});

export const updateRecipeSchema = createRecipeSchema.partial();
