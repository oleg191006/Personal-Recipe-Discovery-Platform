import {
  IsString,
  IsNotEmpty,
  MaxLength,
  IsOptional,
  MinLength,
} from 'class-validator';

export class CreateRecipeDto {
  @IsString()
  @IsNotEmpty({ message: "Назва рецепту є обов'язковою." })
  @MaxLength(255)
  title: string;

  @IsString()
  @IsOptional()
  @MinLength(10)
  description?: string;

  @IsString()
  @IsNotEmpty({ message: "Інгредієнти є обов'язковими." })
  ingredients: string;

  @IsString()
  @IsNotEmpty({ message: "Інструкції є обов'язковими." })
  instructions: string;

  @IsString()
  @IsOptional()
  cuisineType?: string;
}
