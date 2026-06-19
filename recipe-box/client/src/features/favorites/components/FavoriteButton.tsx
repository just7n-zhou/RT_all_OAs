import { useFavorites } from '../context/useFavorites';
import styles from './FavoriteButton.module.css';

interface FavoriteButtonProps {
  recipeId: number;
}

export function FavoriteButton({ recipeId }: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorited = isFavorite(recipeId);
  
  return (
    <button
      onClick={() => toggleFavorite(recipeId)}
      className={`${styles.button} ${favorited ? styles.favorited : ""}`}
      aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
      type="button"
    >
      {favorited ? "★" : "☆"}
    </button>
  );
}
