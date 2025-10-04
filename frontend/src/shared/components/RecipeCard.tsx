import { Link } from "react-router-dom";
import type { Recipe } from "../types/recipe/recipe.types";

interface RecipeCardProps {
  recipe: Recipe;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => (
  <div className="bg-white rounded-lg shadow-lg overflow-hidden transition duration-300 hover:shadow-xl">
    <div className="p-6">
      <h3 className="text-xl font-bold text-gray-900 truncate mb-2">
        {recipe.title}
      </h3>

      <p className="text-gray-700 line-clamp-3 mb-4">
        {recipe.instructions || "Опис відсутній."}
      </p>

      <Link
        to={`/recipes/${recipe.id}`}
        className="text-blue-600 hover:text-blue-700 font-medium transition duration-150 ease-in-out"
      >
        Переглянути рецепт
      </Link>
    </div>
  </div>
);
