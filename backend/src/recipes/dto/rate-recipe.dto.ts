import { IsNumber, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

export class RateRecipeDto {
  @Type(() => Number)
  @IsNumber({}, { message: 'Рейтинг має бути числом.' })
  @Min(1, { message: 'Рейтинг не може бути менше 1.' })
  @Max(5, { message: 'Рейтинг не може бути більше 5.' })
  rating: number;
}
