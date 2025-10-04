import { useState } from "react";
import { recipeService } from "../../services/recipeService";
import type { CreateRecipeDto } from "../types/recipe/recipe.types";
import { useNavigate } from "react-router-dom";
import { ResponseError } from "../exeptions/response-error";

export const useCreateRecipe = () => {
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState<string>("");
  const navigate = useNavigate();

  const createRecipe = async (values: CreateRecipeDto) => {
    setLoading(true);
    setServerError("");
    try {
      const newRecipe = await recipeService.create(values);
      navigate("/recipes", { replace: true });
      return newRecipe;
    } catch (error: unknown) {
      if (error instanceof ResponseError) {
        setServerError(error.message);
      } else {
        setServerError("Виникла невідома помилка мережі. Спробуйте пізніше.");
      }
    } finally {
      setLoading(false);
    }
  };

  return { createRecipe, loading, serverError };
};
