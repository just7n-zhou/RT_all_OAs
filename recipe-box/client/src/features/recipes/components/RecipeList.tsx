import { Link, useSearchParams } from "react-router-dom";
import { RecipeCard } from "./RecipeCard";
import { RecipeFilter } from "./RecipeFilter";
import { useRecipes } from "../hooks/useRecipes";
import { useDebouncedValue } from "../../../shared/hooks/useDebouncedValue";
import { LoadingSpinner } from "../../../shared/components/LoadingSpinner";
import styles from "./RecipeList.module.css";

export function RecipeList() {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Math.max(1, Number(searchParams.get("page") || "1"));
  const search = searchParams.get("search") || "";
  const cuisine = searchParams.get("cuisine") || "";
  const difficulty = searchParams.get("difficulty") || "";
  const isVegetarian = searchParams.get("isVegetarian") || "";
  const sortBy = searchParams.get("sortBy") || "createdAt";
  const sortOrder = (searchParams.get("sortOrder") || "desc") as
    | "asc"
    | "desc";
  const debouncedSearch = useDebouncedValue(search, 300);

  const { data, loading, error } = useRecipes({
    page,
    limit: 9,
    search: debouncedSearch || undefined,
    cuisine: cuisine || undefined,
    difficulty: difficulty || undefined,
    isVegetarian:
      isVegetarian === "true"
        ? true
        : isVegetarian === "false"
          ? false
          : undefined,
    sortBy,
    sortOrder,
  });

  const updateParam = (key: string, value: string, resetPage = true) => {
    const nextParams = new URLSearchParams(searchParams);

    if (value) {
      nextParams.set(key, value);
    } else {
      nextParams.delete(key);
    }

    if (resetPage) {
      nextParams.delete("page");
    }

    setSearchParams(nextParams);
  };

  const goToPage = (nextPage: number) => {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.set("page", String(nextPage));
    setSearchParams(nextParams);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Recipes</h1>
        <Link to="/recipes/new" className={styles.createButton}>
          Create Recipe
        </Link>
      </div>

      <RecipeFilter
        search={search}
        cuisine={cuisine}
        difficulty={difficulty}
        isVegetarian={isVegetarian}
        sortBy={sortBy}
        sortOrder={sortOrder}
        onSearchChange={(value) => updateParam("search", value)}
        onCuisineChange={(value) => updateParam("cuisine", value)}
        onDifficultyChange={(value) => updateParam("difficulty", value)}
        onVegetarianChange={(value) => updateParam("isVegetarian", value)}
        onSortByChange={(value) => updateParam("sortBy", value)}
        onSortOrderChange={(value) => updateParam("sortOrder", value)}
      />

      {error && <div className={styles.error}>{error}</div>}

      {loading ? (
        <LoadingSpinner />
      ) : data && data.data.length > 0 ? (
        <div className={styles.grid}>
          {data.data.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      ) : (
        <div className={styles.empty}>No recipes found</div>
      )}

      {data && data.totalPages > 1 && (
        <div className={styles.pagination}>
          <button
            disabled={data.page <= 1}
            className={styles.pageButton}
            onClick={() => goToPage(data.page - 1)}
          >
            Previous
          </button>
          <span className={styles.pageInfo}>
            Page {data.page} of {data.totalPages}
          </span>
          <button
            disabled={data.page >= data.totalPages}
            className={styles.pageButton}
            onClick={() => goToPage(data.page + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
