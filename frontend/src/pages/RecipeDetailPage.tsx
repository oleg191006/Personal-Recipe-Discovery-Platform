import { useParams } from "react-router-dom";
import { RecipeMeta } from "../shared/components/RecipeMeta";
import { RecipeContent } from "../shared/components/RecipeContent";
import { RecipeRating } from "../shared/components/RecipeRating";
import { useRecipe } from "../shared/hooks/useRecipe";

export const RecipeDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { recipe, setRecipe, loading, error } = useRecipe(id);

  if (loading) return <h1>Завантаження...</h1>;
  if (error) return <h1 className="text-red-500">{error}</h1>;
  if (!recipe) return <h1>Рецепт не знайдено</h1>;

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="max-w-5xl mx-auto bg-white p-6 rounded-xl shadow-2xl">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-4 border-b pb-2">
          {recipe.title}
        </h1>

        <RecipeMeta recipe={recipe} />
        <RecipeContent recipe={recipe} />
        <RecipeRating
          recipe={recipe}
          onRatingChange={(userRating, averageRating) =>
            setRecipe((prev) =>
              prev ? { ...prev, userRating, averageRating } : prev
            )
          }
        />
      </div>
    </div>
  );
};
