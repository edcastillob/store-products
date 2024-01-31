import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ProductType } from 'src/constants/product.type';

export class ProductDTO {

  @IsNotEmpty()
  @IsString()
  name: string;
  
  @IsNotEmpty()
  @IsNumber()
  price: number;
  
  @IsNotEmpty()
  @IsEnum(ProductType)
  type: ProductType;
}

export class ProductUpdateDTO {

  @IsOptional()
  @IsString()
  name: string;
  
  @IsOptional()
  @IsNumber()
  price: number;
  
  @IsOptional()
  @IsEnum(ProductType)
  type: ProductType;
}
