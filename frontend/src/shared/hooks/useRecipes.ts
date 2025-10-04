import { useState, useEffect, useCallback } from "react";
import { recipeService } from "../../services/recipeService";
import type { Recipe } from "../types/recipe/recipe.types";
import { ResponseError } from "../exeptions/response-error";

export const useRecipes = (isMyRecipesView: boolean, searchTerm: string) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRecipes = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data: Recipe[] = isMyRecipesView
        ? await recipeService.getMy()
        : await recipeService.getAll(searchTerm);
      setRecipes(data);
    } catch (err: unknown) {
      if (err instanceof ResponseError) {
        setError(`Помилка: ${err.message}`);
      } else {
        setError("Не вдалося завантажити рецепти.");
      }
      setRecipes([]);
    } finally {
      setLoading(false);
    }
  }, [isMyRecipesView, searchTerm]);

  useEffect(() => {
    fetchRecipes();
  }, [fetchRecipes]);

  return { recipes, loading, error, refetch: fetchRecipes };
};
