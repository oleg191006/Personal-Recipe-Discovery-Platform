// src/recipes/recipes.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { RateRecipeDto } from './dto/rate-recipe.dto';
import { Rating, Recipe } from 'generated/prisma';

type RecipeWithAuthorEmail = Recipe & { author: { email: string } };

@Injectable()
export class RecipesService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateRecipeDto, authorId: string): Promise<Recipe> {
    return this.prisma.recipe.create({
      data: {
        ...dto,
        authorId: authorId,
      },
    });
  }

  async findOne(id: string): Promise<RecipeWithAuthorEmail> {
    const recipe = await this.prisma.recipe.findUnique({
      where: { id },
      include: {
        author: { select: { email: true } },
      },
    });

    if (!recipe) {
      throw new NotFoundException(`Рецепт з ID ${id} не знайдено.`);
    }

    return recipe as RecipeWithAuthorEmail;
  }
  async findAll(searchTerm?: string): Promise<RecipeWithAuthorEmail[]> {
    return this.prisma.recipe.findMany({
      where: searchTerm
        ? {
            title: { contains: searchTerm, mode: 'insensitive' as const },
          }
        : {},
      include: { author: { select: { email: true } } },
    });
  }

  async findUserRecipes(userId: string): Promise<RecipeWithAuthorEmail[]> {
    return this.prisma.recipe.findMany({
      where: { authorId: userId },
      include: { author: { select: { email: true } } },
    });
  }

  async rateRecipe(
    recipeId: string,
    userId: string,
    dto: RateRecipeDto,
  ): Promise<Rating> {
    const { rating } = dto;

    const ratingRecord = await this.prisma.rating.upsert({
      where: {
        recipeId_userId: { recipeId, userId },
      },
      update: { value: rating },
      create: { recipeId, userId, value: rating },
    });

    await this.updateRecipeAverageRating(recipeId);

    return ratingRecord;
  }

  private async updateRecipeAverageRating(recipeId: string): Promise<void> {
    const result = await this.prisma.rating.aggregate({
      _avg: { value: true },
      where: { recipeId },
    });

    const averageRating = result._avg.value ?? 0;

    await this.prisma.recipe.update({
      where: { id: recipeId },
      data: { averageRating: parseFloat(averageRating.toFixed(2)) },
    });
  }

  async delete(recipeId: string, authorId: string): Promise<Recipe> {
    const recipe = await this.prisma.recipe.findUnique({
      where: { id: recipeId },
    });

    if (!recipe) {
      throw new NotFoundException('Рецепт не знайдено.');
    }
    if (recipe.authorId !== authorId) {
      throw new Error('Ви не є автором цього рецепту.');
    }

    return this.prisma.recipe.delete({ where: { id: recipeId } });
  }
}
