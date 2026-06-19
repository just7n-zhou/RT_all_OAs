import { Link } from "react-router-dom";
import { FavoriteButton } from "../../favorites/components/FavoriteButton";
import { formatTime } from "../../../shared/utils/formatters";
import type { Recipe } from "../types/recipe.types";
import styles from "./RecipeCard.module.css";

export function RecipeCard({ recipe }: { recipe: Recipe }) {
  return (
    <div className={styles.card}>
      {recipe.imageUrl && (
        <img src={recipe.imageUrl} alt={recipe.title} className={styles.image} />
      )}
      <div className={styles.content}>
        <div className={styles.header}>
          <h3 className={styles.title}>
            <Link to={`/recipes/${recipe.id}`}>{recipe.title}</Link>
          </h3>
          <FavoriteButton recipeId={recipe.id} />
        </div>
        <p className={styles.description}>{recipe.description}</p>
        <div className={styles.meta}>
          <span className={styles.badge}>{recipe.cuisine}</span>
          <span className={styles.badge}>{recipe.difficulty}</span>
          {recipe.isVegetarian && (
            <span className={styles.badge}>Vegetarian</span>
          )}
        </div>
        <div className={styles.time}>
          <span>Prep: {formatTime(recipe.prepTimeMinutes)}</span>
          <span>Cook: {formatTime(recipe.cookTimeMinutes)}</span>
          <span>Servings: {recipe.servings}</span>
        </div>
      </div>
    </div>
  );
}
