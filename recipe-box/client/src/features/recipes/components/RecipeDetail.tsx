import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import { FavoriteButton } from "../../favorites/components/FavoriteButton";
import { CookTimer } from "./CookTimer";
import { formatTime } from "../../../shared/utils/formatters";
import { recipeApi } from "../api/recipeApi";
import { LoadingSpinner } from "../../../shared/components/LoadingSpinner";
import type { Recipe } from "../types/recipe.types";
import styles from "./RecipeDetail.module.css";

export function RecipeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isActive = true;

    const fetchRecipe = async () => {
      try {
        setLoading(true);
        setError(null);
        const recipeId = Number(id);
        const data = await recipeApi.getById(recipeId);

        if (isActive) {
          setRecipe(data);
        }
      } catch (err) {
        if (isActive) {
          setError(err instanceof Error ? err.message : "Failed to load recipe");
        }
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    };

    fetchRecipe();

    return () => {
      isActive = false;
    };
  }, [id]);

  const handleDelete = async () => {
    if (!recipe || !window.confirm("Delete this recipe?")) {
      return;
    }

    try {
      await recipeApi.delete(recipe.id);
      navigate("/recipes");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete recipe");
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error || !recipe) {
    return <div className={styles.error}>{error || "Recipe not found"}</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Link to="/recipes" className={styles.back}>
          ← Back to Recipes
        </Link>
        <div className={styles.actions}>
          <FavoriteButton recipeId={recipe.id} />
          <Link to={`/recipes/${recipe.id}/edit`} className={styles.editButton}>
            Edit
          </Link>
          <button onClick={handleDelete} className={styles.deleteButton}>
            Delete
          </button>
        </div>
      </div>

      {recipe.imageUrl && (
        <img
          src={recipe.imageUrl}
          alt={recipe.title}
          className={styles.image}
        />
      )}

      <h1>{recipe.title}</h1>
      <p className={styles.description}>{recipe.description}</p>

      <div className={styles.meta}>
        <span className={styles.badge}>{recipe.cuisine}</span>
        <span className={styles.badge}>{recipe.difficulty}</span>
        {recipe.isVegetarian && (
          <span className={styles.badge}>Vegetarian</span>
        )}
      </div>

      <div className={styles.info}>
        <div className={styles.infoItem}>
          <strong>Prep Time:</strong> {formatTime(recipe.prepTimeMinutes)}
        </div>
        <div className={styles.infoItem}>
          <strong>Cook Time:</strong> {formatTime(recipe.cookTimeMinutes)}
        </div>
        <div className={styles.infoItem}>
          <strong>Servings:</strong> {recipe.servings}
        </div>
      </div>

      <CookTimer initialMinutes={recipe.cookTimeMinutes} />

      <section className={styles.section}>
        <h2>Ingredients</h2>
        <ul className={styles.ingredients}>
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index}>
              <strong>{ingredient.amount}</strong> {ingredient.name}
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.section}>
        <h2>Instructions</h2>
        <p className={styles.instructions}>{recipe.instructions}</p>
      </section>
    </div>
  );
}
