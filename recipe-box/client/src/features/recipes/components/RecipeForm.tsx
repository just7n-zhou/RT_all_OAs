import { useEffect, useState, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { recipeApi } from "../api/recipeApi";
import { LoadingSpinner } from "../../../shared/components/LoadingSpinner";
import type { Ingredient, RecipeFormData } from "../types/recipe.types";
import styles from "./RecipeForm.module.css";

const cuisineOptions = [
  "Chinese",
  "Japanese",
  "Italian",
  "Mexican",
  "American",
  "Indian",
  "French",
  "Thai",
  "Other",
];

const difficultyOptions = ["Easy", "Medium", "Hard"];

const emptyForm: RecipeFormData = {
  title: "",
  description: "",
  cuisine: "Other",
  difficulty: "Medium",
  prepTimeMinutes: 1,
  cookTimeMinutes: 0,
  servings: 1,
  isVegetarian: false,
  ingredients: [{ amount: "", name: "" }],
  instructions: "",
  imageUrl: "",
};

export function RecipeForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState<RecipeFormData>(emptyForm);
  const [loading, setLoading] = useState(isEditing);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!isEditing || !id) {
      return;
    }

    let isActive = true;

    const fetchRecipe = async () => {
      try {
        setLoading(true);
        setError(null);
        const recipe = await recipeApi.getById(Number(id));

        if (isActive) {
          setFormData({
            title: recipe.title,
            description: recipe.description,
            cuisine: recipe.cuisine,
            difficulty: recipe.difficulty,
            prepTimeMinutes: recipe.prepTimeMinutes,
            cookTimeMinutes: recipe.cookTimeMinutes,
            servings: recipe.servings,
            isVegetarian: recipe.isVegetarian,
            ingredients: recipe.ingredients,
            instructions: recipe.instructions,
            imageUrl: recipe.imageUrl || "",
          });
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
  }, [id, isEditing]);

  const updateField = <K extends keyof RecipeFormData>(
    key: K,
    value: RecipeFormData[K],
  ) => {
    setFormData((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: "" }));
  };

  const updateIngredient = (
    index: number,
    key: keyof Ingredient,
    value: string,
  ) => {
    setFormData((current) => ({
      ...current,
      ingredients: current.ingredients.map((ingredient, ingredientIndex) =>
        ingredientIndex === index
          ? { ...ingredient, [key]: value }
          : ingredient,
      ),
    }));
    setErrors((current) => ({ ...current, ingredients: "" }));
  };

  const addIngredient = () => {
    setFormData((current) => ({
      ...current,
      ingredients: [...current.ingredients, { amount: "", name: "" }],
    }));
  };

  const removeIngredient = (index: number) => {
    setFormData((current) => ({
      ...current,
      ingredients:
        current.ingredients.length === 1
          ? current.ingredients
          : current.ingredients.filter((_, ingredientIndex) => ingredientIndex !== index),
    }));
  };

  const validateForm = () => {
    const nextErrors: Record<string, string> = {};

    if (formData.title.trim().length < 3) {
      nextErrors.title = "Title must be at least 3 characters";
    }
    if (!formData.description.trim()) {
      nextErrors.description = "Description is required";
    }
    if (formData.prepTimeMinutes < 1) {
      nextErrors.prepTimeMinutes = "Prep time must be positive";
    }
    if (formData.cookTimeMinutes < 0) {
      nextErrors.cookTimeMinutes = "Cook time must be non-negative";
    }
    if (formData.servings < 1) {
      nextErrors.servings = "Servings must be positive";
    }
    if (
      formData.ingredients.length === 0 ||
      formData.ingredients.some(
        (ingredient) => !ingredient.amount.trim() || !ingredient.name.trim(),
      )
    ) {
      nextErrors.ingredients = "Each ingredient needs an amount and name";
    }
    if (!formData.instructions.trim()) {
      nextErrors.instructions = "Instructions are required";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    const payload: RecipeFormData = {
      ...formData,
      title: formData.title.trim(),
      description: formData.description.trim(),
      ingredients: formData.ingredients.map((ingredient) => ({
        amount: ingredient.amount.trim(),
        name: ingredient.name.trim(),
      })),
      instructions: formData.instructions.trim(),
      imageUrl: formData.imageUrl.trim(),
    };

    try {
      setSubmitting(true);
      setError(null);
      const recipe = isEditing && id
        ? await recipeApi.update(Number(id), payload)
        : await recipeApi.create(payload);
      navigate(`/recipes/${recipe.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save recipe");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className={styles.container}>
      <h1>{isEditing ? "Edit Recipe" : "Create Recipe"}</h1>

      {error && <span className={styles.error}>{error}</span>}

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.field}>
          <label htmlFor="title">Title *</label>
          <input
            id="title"
            type="text"
            value={formData.title}
            onChange={(event) => updateField("title", event.target.value)}
            className={errors.title ? styles.inputError : undefined}
          />
          {errors.title && <span className={styles.error}>{errors.title}</span>}
        </div>

        <div className={styles.field}>
          <label htmlFor="description">Description *</label>
          <textarea
            id="description"
            value={formData.description}
            onChange={(event) => updateField("description", event.target.value)}
            rows={3}
            className={errors.description ? styles.inputError : undefined}
          />
          {errors.description && (
            <span className={styles.error}>{errors.description}</span>
          )}
        </div>

        <div className={styles.row}>
          <div className={styles.field}>
            <label htmlFor="cuisine">Cuisine *</label>
            <select
              id="cuisine"
              value={formData.cuisine}
              onChange={(event) => updateField("cuisine", event.target.value)}
            >
              {cuisineOptions.map((cuisine) => (
                <option key={cuisine} value={cuisine}>
                  {cuisine}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.field}>
            <label htmlFor="difficulty">Difficulty *</label>
            <select
              id="difficulty"
              value={formData.difficulty}
              onChange={(event) => updateField("difficulty", event.target.value)}
            >
              {difficultyOptions.map((difficulty) => (
                <option key={difficulty} value={difficulty}>
                  {difficulty}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.field}>
            <label htmlFor="prepTime">Prep Time (minutes) *</label>
            <input
              id="prepTime"
              type="number"
              min="1"
              value={formData.prepTimeMinutes}
              onChange={(event) =>
                updateField("prepTimeMinutes", Number(event.target.value))
              }
              className={errors.prepTimeMinutes ? styles.inputError : undefined}
            />
            {errors.prepTimeMinutes && (
              <span className={styles.error}>{errors.prepTimeMinutes}</span>
            )}
          </div>

          <div className={styles.field}>
            <label htmlFor="cookTime">Cook Time (minutes) *</label>
            <input
              id="cookTime"
              type="number"
              min="0"
              value={formData.cookTimeMinutes}
              onChange={(event) =>
                updateField("cookTimeMinutes", Number(event.target.value))
              }
              className={errors.cookTimeMinutes ? styles.inputError : undefined}
            />
            {errors.cookTimeMinutes && (
              <span className={styles.error}>{errors.cookTimeMinutes}</span>
            )}
          </div>

          <div className={styles.field}>
            <label htmlFor="servings">Servings *</label>
            <input
              id="servings"
              type="number"
              min="1"
              value={formData.servings}
              onChange={(event) =>
                updateField("servings", Number(event.target.value))
              }
              className={errors.servings ? styles.inputError : undefined}
            />
            {errors.servings && (
              <span className={styles.error}>{errors.servings}</span>
            )}
          </div>
        </div>

        <div className={styles.field}>
          <label>
            <input
              type="checkbox"
              checked={formData.isVegetarian}
              onChange={(event) =>
                updateField("isVegetarian", event.target.checked)
              }
            />{" "}
            Vegetarian
          </label>
        </div>

        <div className={styles.field}>
          <label>Ingredients *</label>
          {formData.ingredients.map((ingredient, index) => (
            <div key={index} className={styles.ingredientRow}>
              <input
                type="text"
                placeholder="Amount"
                value={ingredient.amount}
                onChange={(event) =>
                  updateIngredient(index, "amount", event.target.value)
                }
                className={styles.ingredientInput}
              />
              <input
                type="text"
                placeholder="Ingredient name"
                value={ingredient.name}
                onChange={(event) =>
                  updateIngredient(index, "name", event.target.value)
                }
                className={styles.ingredientInput}
              />
              {formData.ingredients.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeIngredient(index)}
                  className={styles.removeButton}
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          {errors.ingredients && (
            <span className={styles.error}>{errors.ingredients}</span>
          )}
          <button type="button" onClick={addIngredient} className={styles.addButton}>
            Add Ingredient
          </button>
        </div>

        <div className={styles.field}>
          <label htmlFor="instructions">Instructions *</label>
          <textarea
            id="instructions"
            value={formData.instructions}
            onChange={(event) => updateField("instructions", event.target.value)}
            rows={6}
            className={errors.instructions ? styles.inputError : undefined}
          />
          {errors.instructions && (
            <span className={styles.error}>{errors.instructions}</span>
          )}
        </div>

        <div className={styles.field}>
          <label htmlFor="imageUrl">Image URL (optional)</label>
          <input
            id="imageUrl"
            type="text"
            value={formData.imageUrl}
            onChange={(event) => updateField("imageUrl", event.target.value)}
          />
        </div>

        <div className={styles.actions}>
          <button type="submit" disabled={submitting} className={styles.submitButton}>
            {submitting
              ? "Saving..."
              : isEditing
                ? "Update Recipe"
                : "Create Recipe"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/recipes")}
            className={styles.cancelButton}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
