import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { recipeService } from "../../services/recipeService";
import { FaStar } from "react-icons/fa";

interface RatingStarsProps {
  userRating: number;
  recipeId: string;
  onRatingChange: (newUserRating: number, newAverage: number) => void;
}

export const RatingStars: React.FC<RatingStarsProps> = ({
  userRating: initialUserRating,
  recipeId,
  onRatingChange,
}) => {
  const isLoggedIn = useAuth();
  const [hoverRating, setHoverRating] = useState(0);
  const [userRating, setUserRating] = useState(initialUserRating);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rateError, setRateError] = useState<string | null>(null);

  useEffect(() => {
    setUserRating(initialUserRating);
  }, [initialUserRating]);

  const handleRating = async (ratingValue: number) => {
    if (!isLoggedIn || isSubmitting) return;
    setIsSubmitting(true);
    setRateError(null);

    try {
      const averageRating = await recipeService.rate(recipeId, {
        rating: ratingValue,
      });
      setUserRating(ratingValue);
      onRatingChange(ratingValue, +averageRating);
    } catch (err) {
      console.error(err);
      setRateError("Помилка оцінювання. Спробуйте пізніше.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isLoggedIn) {
    return (
      <p className="text-gray-500 italic mt-2">Увійдіть, щоб оцінити рецепт.</p>
    );
  }

  return (
    <div className="mt-4 p-4 border rounded-lg bg-white shadow-md">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">Ваша оцінка:</h3>
      <div className="flex space-x-1 cursor-pointer">
        {[1, 2, 3, 4, 5].map((starValue) => (
          <FaStar
            key={starValue}
            size={30}
            className={
              starValue <= (hoverRating || userRating)
                ? "text-yellow-500 transition-colors"
                : "text-gray-300 transition-colors"
            }
            onMouseEnter={() => setHoverRating(starValue)}
            onMouseLeave={() => setHoverRating(0)}
            onClick={() => handleRating(starValue)}
            title={`Оцінити на ${starValue} зірок`}
          />
        ))}
      </div>
      {isSubmitting && <p className="text-green-600 mt-2">Оцінювання...</p>}
      {rateError && <p className="text-red-500 mt-2">{rateError}</p>}
      {!isSubmitting && !rateError && userRating > 0 && (
        <p className="text-gray-600 mt-2">Ви оцінили на {userRating} зірок.</p>
      )}
    </div>
  );
};
