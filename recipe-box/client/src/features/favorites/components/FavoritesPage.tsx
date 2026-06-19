import { useEffect, useState } from 'react';
import { RecipeCard } from '../../recipes/components/RecipeCard';
import { recipeApi } from '../../recipes/api/recipeApi';
import { useFavorites } from '../context/useFavorites';
import { LoadingSpinner } from '../../../shared/components/LoadingSpinner';
import type { Recipe } from '../../recipes/types/recipe.types';
import styles from './FavoritesPage.module.css';

export function FavoritesPage() {
  const { favorites } = useFavorites();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isActive = true;

    const fetchFavorites = async () => {
      if (favorites.length === 0) {
        setRecipes([]);
        setLoading(false);
        setError(null);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const favoriteRecipes = await Promise.all(
          favorites.map((id) => recipeApi.getById(id)),
        );

        if (isActive) {
          setRecipes(favoriteRecipes);
        }
      } catch (err) {
        if (isActive) {
          setError(
            err instanceof Error
              ? err.message
              : 'Failed to load favorite recipes',
          );
        }
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    };

    fetchFavorites();

    return () => {
      isActive = false;
    };
  }, [favorites]);
  
  return (
    <div className={styles.container}>
      <h1>Favorite Recipes</h1>

      {error && <div className={styles.error}>{error}</div>}

      {loading ? (
        <LoadingSpinner />
      ) : recipes.length > 0 ? (
        <div className={styles.grid}>
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      ) : (
        <div className={styles.empty}>
          <p>No favorite recipes yet</p>
          <p>Click the star icon on any recipe to add it to your favorites!</p>
        </div>
      )}
    </div>
  );
}
