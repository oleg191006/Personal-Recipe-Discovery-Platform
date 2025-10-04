export interface Recipe {
  id: string;
  title: string;

  description: string | null;
  cuisineType: string | null;

  ingredients: string;
  instructions: string;

  averageRating: number;
  authorId: string;
  author: {
    email: string;
  };
}

export type CreateRecipeDto = Omit<
  Recipe,
  "id" | "authorId" | "averageRating" | "author"
>;

export interface RateRecipeDto {
  rating: number;
}
