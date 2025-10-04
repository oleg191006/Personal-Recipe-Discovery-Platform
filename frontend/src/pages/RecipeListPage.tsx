import React, { useState } from "react";
import { RecipeCard } from "../shared/components/RecipeCard";

import { SearchInput } from "../shared/components/SearchInput";
import type { Recipe } from "../shared/types/recipe/recipe.types";
import { useRecipes } from "../shared/hooks/useRecipes";
import { useDebounce } from "../shared/hooks/useDebounse";

interface RecipeListPageProps {
  isMyRecipesView?: boolean;
}

const RecipeListPage: React.FC<RecipeListPageProps> = ({
  isMyRecipesView = false,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const { recipes, loading, error } = useRecipes(
    isMyRecipesView,
    debouncedSearchTerm
  );

  const title = isMyRecipesView ? "Мої Рецепти" : "Всі Рецепти";

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">
        {title}
      </h1>

      <SearchInput
        value={searchTerm}
        onChange={setSearchTerm}
        placeholder="Пошук за назвою..."
      />

      {loading ? (
        <p className="text-center text-blue-600 text-lg">
          Завантаження рецептів...
        </p>
      ) : error ? (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mx-auto max-w-md"
          role="alert"
        >
          {error}
        </div>
      ) : recipes.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          {isMyRecipesView
            ? "У вас ще немає жодного рецепту."
            : "На жаль, рецепти за вашим запитом не знайдено."}
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recipes.map((recipe: Recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  );
};

export default RecipeListPage;
