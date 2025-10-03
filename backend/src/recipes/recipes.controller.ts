import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RecipesService } from './recipes.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { RateRecipeDto } from './dto/rate-recipe.dto';
import { User } from '../shared/decorators/user.decorator';

@Controller('recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @Get('my')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('jwt'))
  async findUserRecipes(@User('id') userId: string) {
    return this.recipesService.findUserRecipes(userId);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(@Query('search') searchTerm?: string) {
    return this.recipesService.findAll(searchTerm);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string) {
    return this.recipesService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AuthGuard('jwt'))
  async create(@Body() dto: CreateRecipeDto, @User('id') authorId: string) {
    return this.recipesService.create(dto, authorId);
  }

  @Post(':id/rate')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('jwt'))
  async rateRecipe(
    @Param('id') recipeId: string,
    @Body() dto: RateRecipeDto,
    @User('id') userId: string,
  ) {
    return this.recipesService.rateRecipe(recipeId, userId, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AuthGuard('jwt'))
  async delete(@Param('id') recipeId: string, @User('id') userId: string) {
    return this.recipesService.delete(recipeId, userId);
  }
}
