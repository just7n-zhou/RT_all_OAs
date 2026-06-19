import { RecipeCard } from "../../recipes/components/RecipeCard";
import type { Recipe } from "../../recipes/types/recipe.types";
import styles from "./FeaturedRecipes.module.css";

export function FeaturedRecipes({ recipes }: { recipes: Recipe[] }) {
  return (
    <div className={styles.container}>
      <h2>Featured Recipes</h2>
      <div className={styles.grid}>
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
}
