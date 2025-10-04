import React from "react";
import { FaUser, FaStar, FaGlobe } from "react-icons/fa";
import type { Recipe } from "../types/recipe/recipe.types";

interface RecipeMetaProps {
  recipe: Recipe;
}

export const RecipeMeta: React.FC<RecipeMetaProps> = ({ recipe }) => (
  <div className="flex items-center space-x-6 text-gray-600 mb-6">
    <div className="flex items-center">
      <FaUser className="mr-2 text-green-600" />
      <span className="font-semibold">Автор:</span>{" "}
      {recipe.author?.email || "Невідомо"}
    </div>
    <div className="flex items-center">
      <FaStar className="mr-2 text-yellow-500" />
      <span className="font-semibold">Рейтинг:</span>{" "}
      {recipe.averageRating?.toFixed(1) || "0"} / 5
    </div>
    {recipe.cuisineType && (
      <div className="flex items-center">
        <FaGlobe className="mr-2 text-blue-500" />
        <span className="font-semibold">Кухня:</span> {recipe.cuisineType}
      </div>
    )}
  </div>
);
