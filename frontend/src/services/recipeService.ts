import { baseService } from "./baseService";

import { API_URLS } from "../shared/constants/request";
import { getFullUrl } from "../shared/utils/get-full-url";
import type {
  CreateRecipeDto,
  RateRecipeDto,
  Recipe,
} from "../shared/types/recipe/recipe.types";

export const recipeService = {
  getAll: async (searchTerm: string = ""): Promise<Recipe[]> => {
    return baseService.request<Recipe[]>({
      method: "GET",
      url: API_URLS.recipes.getAll,
      params: searchTerm ? { search: searchTerm } : undefined,
    });
  },

  getMy: async (): Promise<Recipe[]> => {
    return baseService.request<Recipe[]>({
      method: "GET",
      url: API_URLS.recipes.getMy,
    });
  },

  getById: async (recipeId: string): Promise<Recipe> => {
    return baseService.request<Recipe>({
      method: "GET",
      url: getFullUrl({
        pathname: API_URLS.recipes.getById,
        parameters: { id: recipeId },
      }),
    });
  },

  create: async (data: CreateRecipeDto): Promise<Recipe> => {
    return baseService.request<Recipe>({
      method: "POST",
      url: API_URLS.recipes.create,
      data,
    });
  },

  rate: async (recipeId: string, data: RateRecipeDto) => {
    return baseService.request<void>({
      method: "POST",
      url: getFullUrl({
        pathname: API_URLS.recipes.rate,
        parameters: { id: recipeId },
      }),
      data,
    });
  },

  delete: async (recipeId: string): Promise<void> => {
    return baseService.request<void>({
      method: "DELETE",
      url: getFullUrl({
        pathname: API_URLS.recipes.delete,
        parameters: { id: recipeId },
      }),
    });
  },
};
