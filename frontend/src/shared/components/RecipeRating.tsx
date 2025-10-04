import React from "react";

import type { Recipe } from "../types/recipe/recipe.types";
import { RatingStars } from "./RatingStars";

interface RecipeRatingProps {
  recipe: Recipe;
  onRatingChange: (userRating: number, averageRating: number) => void;
}

export const RecipeRating: React.FC<RecipeRatingProps> = ({
  recipe,
  onRatingChange,
}) => (
  <RatingStars
    recipeId={recipe.id}
    userRating={recipe.averageRating || 0}
    onRatingChange={onRatingChange}
  />
);
