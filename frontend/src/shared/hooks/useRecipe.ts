import { useState, useEffect, useCallback } from "react";
import { recipeService } from "../../services/recipeService";
import type { Recipe } from "../types/recipe/recipe.types";

export const useRecipe = (id?: string) => {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRecipe = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    setError(null);
    try {
      const data = await recipeService.getById(id);
      setRecipe(data);
    } catch {
      setError("Не вдалося завантажити рецепт.");
      setRecipe(null);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchRecipe();
  }, [fetchRecipe]);

  return { recipe, setRecipe, loading, error, refetch: fetchRecipe };
};
