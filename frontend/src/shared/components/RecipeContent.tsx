import React from "react";
import type { Recipe } from "../types/recipe/recipe.types";

interface RecipeContentProps {
  recipe: Recipe;
}

export const RecipeContent: React.FC<RecipeContentProps> = ({ recipe }) => (
  <>
    {recipe.description && (
      <p className="text-gray-700 mb-4">{recipe.description}</p>
    )}

    <div className="mb-4">
      <h2 className="text-2xl font-semibold mb-2">Інгредієнти:</h2>
      <p className="text-gray-700 whitespace-pre-line">{recipe.ingredients}</p>
    </div>

    <div className="mb-4">
      <h2 className="text-2xl font-semibold mb-2">Інструкції:</h2>
      <p className="text-gray-700 whitespace-pre-line">{recipe.instructions}</p>
    </div>
  </>
);
