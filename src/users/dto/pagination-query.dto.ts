import { IsNumber, IsOptional, IsPositive } from 'class-validator';

export class PaginationQueryDTO {
  @IsNumber()
  @IsPositive()
  @IsOptional()
  page: number;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  count: number;
}
